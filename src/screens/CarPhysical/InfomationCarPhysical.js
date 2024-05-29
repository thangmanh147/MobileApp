import React, { useState, useEffect, useRef } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image, Platform, Keyboard,
    KeyboardAvoidingView,
    Animated,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { nameApp, Color, colorText, colorTitle, NewColor, NewColorDisable, TxtColor, URL, colorPlaceholder, errValidColor } from '../../config/System';
import { connect } from 'react-redux';
import _ from 'lodash';
import PhoneInput from '../Agent/PaymentMethod/TextInputInfo/PhoneInput';
import Input from './components/Input';
import NewModalTypeCarTNDS from '../../components/buy/NewModalTypeCarTNDS';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NewModalGetPurpose from '../../components/buy/NewModalGetPurpose';
import NewModalProducer from '../../components/buy/NewModalProducer';
import NewModalModel from '../../components/buy/NewModalModel';
import NewModalGetStatus from '../../components/buy/NewModalGetStatus';
import { saveCarPhysicalType, saveImageCarPhysical, saveCHECK_OCR_AGAIN_PHYSICAL } from './actions/carPhysical';
import { checkCarIsTruck, convertToNumber } from './helpers';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
import axios from 'axios';
import { getDistrict } from '../CarInsurance/actions/car_Buy';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import ModalBox from 'react-native-modalbox';
import {
    validateInformationCar,
    validateInformationCarSeat,
    validateInformationCarchassisNumber,
    validateLoadCapacity,
    validateInformationCarLicenseNumber,
    validationPackage, validationTextName,
    validationValueCashCar,
    validationPhonePopup
} from './components/Validate';
import { getCarTypeSuccess } from '../CarInsurance/actions/car_Buy';
import Loading from '../../components/Loading';
import Promotion from '../../components/promotion/Promotion';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import { checkLeapYear, checkMonth, formatVND, renderVND, isPhoneAccident } from '../../components/Functions';
import { diffMonth } from '../../utils/Validate';
import InputSelect from "../../components/buy/InputSelect";
import TotalFee from "./TotalFee";
import { ERROR_DATE_CURRENT, ERROR_NAME_FORMAT, ERROR_NAME_REQUIRED, ERROR_PHONE_FORMAT, ERROR_PHONE_REQUIRED, } from "../../config/ErrorMessage";
import { validateName, validateNumOnly } from "../../config/Validation";
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, makeId } from '../../utils/Util';
import Modal from 'react-native-modal';
import { screen, TxtBlack, primaryColor, fontNormal, fontBold } from '../../config/System';
import ButtonNoColor from '../../components/ButtonNoColor'
import jwt_decode from 'jwt-decode';
import { saveLogContract, logEventContract } from '../../actions/logContract';
import DateFill from '../../components/dateTimeFill/DateFill';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import IconCameraBlurSvg from '../../config/images/icons/IconCameraBlurSvg';
import IconCarSvg from '../../config/images/icons/IconCarSvg';
import IconOCRCameraSvg from '../../config/images/icons/IconOCRCameraSvg';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';

const DATA = [
    { code: "vc", name: "Phí cơ bản", value: 3800000, disable: true, defaultStatus: true },
    { code: "bs02", name: "BS02 - BH thay thế mới", value: 200000, disable: false },
    { code: "bs04", name: "BS04 - BH xe bị mất trộm cướp bộ phận", value: 400000, disable: false },
    { code: "bs05", name: "BS05 - BH lựa chọn cơ sở sửa chữa", value: 400000, disable: false },
    { code: "bs06", name: "BS06 - BH tổn thất về động cơ khi xe hoạt động trong khu vực bị ngập nước", value: 0, disable: true, defaultStatus: true },
    { code: "bs07", name: "BS07 - BH thay thế xe mới trong năm đầu tiên", value: 0, disable: false },
    { code: "bs09", name: "BS09 - BH thuê xe trong thời gian sửa chữa", value: 600000, disable: false },
    { code: "bs13", name: "BS13 - BH cho thiết bị lắp thêm", value: 200000, disable: false },
    { code: "bs14", name: "BS14 - BH mất trộm, cướp chìa khoá xe", value: 200000, disable: false },
]

function InfomationCarPhysical({ 
    saveLogContract, 
    contractLog, 
    saveCarPhysicalType, 
    saveCHECK_OCR_AGAIN_PHYSICAL, 
    checkOcr, 
    saveImageCarPhysical, 
    imgOcrCar, 
    infoCar, 
    promotionPrice, 
    getDistrict,
    logEventContract,
    contractCarId,
    dataTokenInsur,
}) {
    const offset = useRef(new Animated.Value(0)).current;
    const [typeCar, settypeCar] = useState('');
    const [purpose_car, setpurpose_car] = useState('');
    const [carBrand, setcarBrand] = useState('');
    const [carBrandId, setcarBrandId] = useState('');
    const [carModel, setcarModel] = useState('');
    const [carStatus, setcarStatus] = useState({ value: "Y", label: "Đã có biển số" });
    const [loadCapacity, setloadCapacity] = useState('');
    const [year, setyear] = useState('');
    const [seat, setseat] = useState('');
    const [opentypeCar, setopentypeCar] = useState(false);
    const [openGetPurpose, setopenGetPurpose] = useState(false);
    const [opencarBrand, setopencarBrand] = useState(false);
    const [opencarModel, setopencarModel] = useState(false);
    const [opencarStatus, setopencarStatus] = useState(false);
    const [checkSoChoNgoi, setcheckSoChoNgoi] = useState(false);
    const [dateTo, setDateTo] = useState('')
    const [errors, setErrors] = useState({})
    const [errors1, setErrors1] = useState({})
    const [errors2, setErrors2] = useState({})
    const [errors3, setErrors3] = useState({})
    const [errors4, setErrors4] = useState({})
    const [errors5, setErrors5] = useState({})
    const [errors7, setErrors7] = useState({})
    const [errors8, setErrors8] = useState({})
    const [licensePlate, setlicensePlate] = useState('')
    const [frameNumber, setframeNumber] = useState('')
    const [vehicleNumber, setvehicleNumber] = useState('')
    const [loading, setLoading] = useState(false);
    const [ownerAddress, setOwnerAddress] = useState('');
    const [fullName, setfullName] = useState('');
    const [valueCar, setvalueCar] = useState('');
    const [valueCashCar, setvalueCashCar] = useState('');
    const [renderPackage, setrenderPackage] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [moneyDiscount, setmoneyDiscount] = useState(0);
    const [dataPackage, setdataPackage] = useState(DATA)
    const [dataPackageApi, setdataPackageApi] = useState([]);
    const [changeByInfoCar, setchangeByInfoCar] = useState(false);
    const [valueModalErr, setValueModalErr] = useState(0);
    const [modalErr, setModalErr] = useState(false);
    const [phoneModal, setPhoneModal] = useState('');
    const [errPhoneModal, setErrPhoneModal] = useState([]);
    const [modalProvince, setModalProvince] = useState(null);
    const [modalDistrict, setModalDistrict] = useState(null);
    const [ownerProvince, setOwnerProvince] = useState('');
    const [ownerDistrict, setOwnerDistrict] = useState('');
    const [registrationExp, setRegistrationExp] = useState('');
    const [insuranceValueMax, setInsuranceValueMax] = useState(0);
    const [timerCount,setTimerCount] = useState(moment().valueOf());
    const [orgCode, setOrgCode] = useState('');
    const [showModalImg, setShowModalImg] = useState(false);
    const [isLibrary, setIsLibrary] = useState(false);


    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);

    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
            const decode = jwt_decode(dataTokenInsur?.token || token);
            setOrgCode(decode?.organizationCode);
        })
        if (!infoCar) {
            getCurrentDate()
        }
    }, []);
    const getCurrentDate = () => {
        const date = new Date();
        const parsedDate = moment(date, 'DD/MM/YYYY');
        const today = parsedDate.format('DD/MM/YYYY');
        let dt = moment(parsedDate, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY');
        setDateFrom(today)
        setDateTo(dt)
    };
    useEffect(() => {
        if (infoCar) {
            setchangeByInfoCar(false);
            setyear(infoCar?.year);
            setseat(infoCar?.seat);
            settypeCar(infoCar?.typeCar);
            setpurpose_car(infoCar?.purpose_car);
            setcarBrand(infoCar?.carBrand);
            setcarBrandId(infoCar?.carBrand?.id);
            setcarModel(infoCar?.carModel);
            setcarStatus(infoCar?.carStatus);
            setfullName(infoCar?.fullName?.toUpperCase() ?? '');
            setvalueCashCar(infoCar?.valueCashCar);
            setvalueCar(infoCar?.valueCar);
            setloadCapacity(infoCar?.loadCapacity);
            setOwnerAddress(infoCar?.ownerAddress)
            setOwnerProvince(infoCar?.ownerProvince)
            setOwnerDistrict(infoCar?.ownerDistrict)
            setDateFrom(infoCar?.dateFrom)
            setRegistrationExp(infoCar?.registrationExp)
            setDateTo(infoCar?.dateTo)
            if (dataPackageApi) {
                setdataPackageApi(infoCar?.dataPackage)
            } else {
                setdataPackage(infoCar?.dataPackage)
            }
            setframeNumber(infoCar?.frameNumber || '');
            setvehicleNumber(infoCar?.vehicleNumber || '');
            setlicensePlate(infoCar?.licensePlate);
            const validateValueCar = _.isEmpty(validationPackage(valueCar, 'valueCar'), true)
            console.log('validateValueCar', validateValueCar)
            if (validateValueCar && renderPackage == true && valueCashCar != '' && valueCar != ''
                && typeCar != '' && purpose_car != ''
                && carBrand != '' && seat != ''
            ) {
                setrenderPackage(true)
            }
        } else {
            setpurpose_car({ value: "K", label: "Không kinh doanh" });
        }
    }, [infoCar]);

    const checkFormatDate = (value) => {
        return moment(value, 'DD/MM/YYYY', true).diff(moment(new Date), 'days')
    }

    const checkOpenModal = (condition) => {
        switch (condition) {
            case 'purpose':
                setopenGetPurpose(true);
                break;
            case 'typeCar':
                setopentypeCar(true);
                break;
            case 'carBrand':
                setopencarBrand(true);
                break;

            case 'carModel':
                setopencarModel(true);
                break;
            case 'carStatus':
                setopencarStatus(true);
                break;
            default:
                Alert.alert('NUMBER NOT FOUND');

        }
    };
    useEffect(() => {
        if ((imgOcrCar && !checkOcr) || (imgOcrCar && isLibrary)) {
            setLoading(true);
            new Store().getSession(Const.TOKEN).then(token => {
                let img = { uri: imgOcrCar.uri, name: 'image.jpg', type: 'image/jpeg' }
                let url = `${URL}/api/ocr/v1/buckets/cloud-vision-inspection-certificate/images`;
                let bodyFormData = new FormData();
                bodyFormData.append('file', img);
                axios.post(url, bodyFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': dataTokenInsur?.token || token,
                    },
                })
                    .then((res) => {
                        if (res.status == 200) {
                            getDataOcr(res?.data.data?.name)
                        } else setLoading(false)
                    })
                    .catch(error => {
                        setLoading(false)
                    });
            })

        }
    }, [imgOcrCar]);
    const getDataOcr = (nameImg) => {
        let nameImg2 = `processed_1617181304829.jpeg`
        let url = `${URL}/api/ocr/v1/buckets/cloud-vision-inspection-certificate/images/${nameImg}/text?type=dangkiem`;
        console.log("urrr", url)
        new Store().getSession(Const.TOKEN).then(token => {

            fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': dataTokenInsur?.token || token,
                },
            })
                .then(res => res.json())
                .then(res => {
                    let data = res.data;
                    if (res.data) {
                        if (data.carType) {
                            checkDatacarType(data.carType)
                        }
                        if (data.carMark) {
                            checkDatacarMark(data.carMark)
                        }
                        if (data.modelCode) {
                            checkDatacarModal(data.modelCode)
                        }
                        if (data.manufacturedYear) {
                            setyear(data.manufacturedYear);
                            let a = validateInformationCar(data.manufacturedYear, 'year')
                            let errs = { ...a }
                            setErrors(errs)

                        }
                        if (data?.seatNumber) {
                            let regex = /[^a-z0-9]/gi;
                            setseat(data?.seatNumber.replace(regex, ''));

                            let a = validateInformationCarSeat(data?.seatNumber, 'seat')
                            let errs = { ...a }
                            setErrors1(errs)
                        }
                        if (data.registrationNumber) {
                            setcarStatus({ value: "Y", label: "Đã có biển số" })
                            let regex = /[^a-z0-9]/gi;
                            setlicensePlate(data.registrationNumber.replace(regex, ''));
                            let a = validateInformationCarLicenseNumber(data.registrationNumber.replace(regex, ''), 'licensePlate')
                            let errs = { ...a }
                            setErrors3(errs)
                        }
                        if (!data.registrationNumber) {
                            if (data.engineNumber) {
                                let regex = /[^a-z0-9]/gi;
                                setvehicleNumber(data.engineNumber.replace(regex, ''))
                                let a = validateInformationCarchassisNumber(data.vehicleNumber.replace(regex, ''), 'vehicleNumber')
                                let errs = { ...a }
                                setErrors5(errs)
                            }
                            if (data.chassisNumber) {
                                let regex = /[^a-z0-9]/gi;
                                setframeNumber(data.chassisNumber.replace(regex, ''));
                                let a = validateInformationCarchassisNumber(data.chassisNumber.replace(regex, ''), 'frameNumber')
                                let errs = { ...a }
                                setErrors4(errs)
                            }
                            setcarStatus({ value: "N", label: "Chưa có biển số" });
                            setlicensePlate('')
                        }
                        setLoading(false)
                    } else setLoading(false)
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false)

                });
        })

    }

    const validateDays = (value) => {
        let a = moment(value, 'DD/MM/YYYY', true).diff(moment(new Date), 'days')
        if (a < 0) {
            return false
        } else {
            return true
        }
    }

    const checkDatacarModal = (name) => {
        let name2 = 'con'
        let url = `${URL}/api/master-data/v1/cars/models?carName=${name}`
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.data?.length > 0) {
                    setcarModel(res.data[0]);
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
    const checkDatacarMark = (name) => {
        let name2 = 'con'
        let url = `${URL}/api/master-data/v1/cars/brands?limit=400&brandName=${name}`
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.data?.length > 0) {
                    setcarBrand(res.data[0]);
                    setcarBrandId(res.data[0].id);

                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
    const checkDatacarType = (name) => {
        let name2 = 'con'
        let url = `${URL}/api/attribute/v1/car-types?limit=200&name=${name2}`
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.data?.length > 0) {
                    settypeCar(res?.data[0]);
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
    const closedModal = (condition) => {
        switch (condition) {
            case 'purpose':
                setopenGetPurpose(false);
                break;
            case 'typeCar':
                setopentypeCar(false);
                break;
            case 'carBrand':
                setopencarBrand(false);
                break;
            case 'carModel':
                setopencarModel(false);
                break;
            case 'carStatus':
                setopencarStatus(false);
                break;
            default:
                Alert.alert('NUMBER NOT FOUND');

        }
    };
    const setType = (data, condition) => {

        switch (condition) {
            case 'purpose':
                setpurpose_car(data);
                calFee(null, null, data.value);
                break;
            case 'typeCar':
                settypeCar(data);
                calFee(data.code);
                if (valueCar) {
                    let a = validationPackage(valueCar, 'valueCar', data)
                    let errs = { ...a }
                    setErrors8(errs)
                }
                break;
            case 'carBrand':
                setcarModel('');
                setcarBrand(data);
                setcarBrandId(data.id);
                setchangeByInfoCar(false);
                calFee(null, data.name);
                break;
            case 'carModel':
                setcarModel(data);
                setchangeByInfoCar(false)
                break;
            case 'carStatus':
                setcarStatus(data);
                break;
            default:
                Alert.alert('NUMBER NOT FOUND');

        }
    };
    const changeTextYear = (txt) => {
        setyear(txt);
        let a = validateInformationCar(txt, 'year')
        let errs = { ...a }
        setErrors(errs)

    };
    const changeTextSeat = (txt) => {
        setchangeByInfoCar(false)
        setseat(txt);
        let a = validateInformationCarSeat(txt, 'seat')
        let errs = { ...a }
        setErrors1(errs)
    };
    const changeLicensePlate = (txt) => {
        setlicensePlate(txt)
        let a = validateInformationCarLicenseNumber(txt, 'licensePlate')
        let errs = { ...a }
        setErrors3(errs)
    }
    const changeFrameNumber = (txt) => {
        setframeNumber(txt);
        let a = validateInformationCarchassisNumber(txt, 'frameNumber')
        let errs = { ...a }
        setErrors4(errs)
    }
    const changevehicleNumber = (txt) => {
        setvehicleNumber(txt)
        let a = validateInformationCarchassisNumber(txt, 'vehicleNumber')
        let errs = { ...a }
        setErrors5(errs)
    }
    const changeloadCapacity = (txt) => {
        setloadCapacity(txt);
        let a = validateLoadCapacity(txt)
        let errs = { ...a }
        setErrors2(errs)
    };

    const changeNumberValueCar = (txt) => {
        setvalueCar(convertToNumber(txt));
        changeNumberValueCashCar(txt, convertToNumber(txt));
        let a = validationPackage(txt, 'valueCar', typeCar)
        let errs = { ...a }
        setErrors8(errs)
    };
    const changeNumberValueCashCar = (txt, carValue) => {
        setvalueCashCar(convertToNumber(txt));
        if (txt) {
            let a = validationValueCashCar(txt, 'valueCashCar', carValue || valueCar)
            let errs = { ...a }
            if (errs.valueCashCar === 'Số tiền bảo hiểm không lớn hơn 200.000.000.000VNĐ') {
                if (valueModalErr === 0) {
                    setModalErr(true);
                }
                setValueModalErr(1);
            }
            setErrors7(errs)
        }
    };

    function checkValidButtonNext(formik) {
        console.log('formik', formik)
        if (valueCashCar == '' || valueCar == '' || typeCar == '' || purpose_car == '' || carBrand == '' ||
            carModel == '' || seat == '' || year == '' || carStatus == '' ||
            // carStatus.value == 'Y' && licensePlate == '' ||
            // carStatus.value == 'N' && frameNumber == '' ||
            // carStatus.value == 'N' && vehicleNumber == '' ||
            checkCarIsTruck(typeCar?.code) && loadCapacity == '' ||
            Object.keys(errors).length > 0 || Object.keys(errors1).length > 0 || Object.keys(errors7).length > 0 || Object.keys(errors8).length > 0 ||
            checkCarIsTruck(typeCar?.code) && Object.keys(errors2).length > 0 ||
            Object.keys(errors3).length > 0 ||
            Object.keys(errors4).length > 0 ||
            Object.keys(errors5).length > 0
        ) {
            return true;
        } else if (typeCar !== '' && purpose_car !== '' && carBrand !== ''
            && carModel !== '' && seat !== '' && year !== '' && carStatus !== '' && valueCashCar !== '' && valueCar !== ''
            && Object.keys(errors).length == 0 && Object.keys(errors1).length == 0
            && Object.keys(errors2).length == 0
            && Object.keys(errors7).length == 0 && Object.keys(errors8).length == 0
            && Object.keys(errors3).length == 0
            && Object.keys(errors4).length == 0
            && Object.keys(errors5).length == 0
        ) {
            return false;
        }
    }

    const onSubmit = (formik) => {
        let params = {
            typeCar, purpose_car, carBrand, carModel, seat: seat, year, carStatus, loadCapacity,
            valueCar, valueCashCar, fullName: formik?.values?.fullName?.toUpperCase() ?? '',
            vehicleNumber, frameNumber, licensePlate, isValidInfo: true,
            registrationExp: formik?.values?.registrationExp
        };
        console.log("params", params)
        saveCarPhysicalType(params);
        saveCHECK_OCR_AGAIN_PHYSICAL(true);
        if (!contractCarId) {
            contractLog.key = 'PackageCarPhysical';
            contractLog.code = 'C2';
            contractLog.idLog = makeId(15);
            contractLog.statusCar = carStatus.value;
            contractLog.chassisNumber = frameNumber;
            contractLog.machineNumber = vehicleNumber;
            contractLog.licenseNumber = licensePlate;
            saveLogContract('C2', contractLog);
        }
        logging(params);
        Actions.PackageCarPhysical();
        // Actions.BuyerCarPhysical();
    };

    const saveAndNext = (formik) => {
        if (
            licensePlate?.length > 0 ||
            (frameNumber?.length > 0 && vehicleNumber?.length > 0)
        ) {
            formik.setFieldValue('checkNf', false);
            onSubmit(formik);
        } else {
            formik.setFieldValue('checkNf', true);
        }
    };

    const logging = (params) => {
        const timeEnd = moment().valueOf();
        const count = moment(timeEnd).diff(moment(timerCount), 'milliseconds');
        logEventContract(
            `${nameApp}_VCX_OTO_EVENT_THONG_TIN_XE`,
            {
                carInfo: params,
                timerCounting: count / 1000,
            }
        );
    }

    const calFee = (typeCarCode, carBrandName, purposeValue) => {
        const getYear = moment().year()
        const diffYear = Number(getYear) - Number(year)
        new Store().getSession(Const.TOKEN).then(token => {
            const _carType = typeCarCode || typeCar?.code;
            const _carBrandName = carBrandName || carBrand?.name;
            const _carPurpose = purposeValue || purpose_car?.value;
            const decode = jwt_decode(dataTokenInsur?.token || token);
            const resp = {
                carType: _carType,
                carBrand: _carBrandName,
                purpose: _carPurpose,
                numberSeat: seat,
                usedYear: diffYear,
                carValue: convertToNumber(valueCar),
                insuranceValue: 200000000,
                tonnage:
                    checkCarIsTruck(_carType) ? (loadCapacity || '') : '',
                organizationId: decode?.organizationId,
                carMode: carModel?.name,
                package: []
            }
            console.log("resp", resp)
            let url = `${URL}/api/premium/v1/car-premium/physical-organization`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": dataTokenInsur?.token || token

                },
                body: JSON.stringify(resp)
            })
                .then(res => res.json())
                .then(res => {
                    console.log('000000000',res)
                    if (res.code == "000") {
                        setInsuranceValueMax(res?.data?.insuranceValueMax)
                    }

                })

        })
        new Store().getSession(Const.TOKEN).then(token => {
            const _carType = typeCarCode || typeCar?.code;
            const _carBrandName = carBrandName || carBrand?.name;
            const _carPurpose = purposeValue || purpose_car?.value;
            const decode = jwt_decode(dataTokenInsur?.token || token);
            const resp = {
                carType: _carType,
                carBrand: _carBrandName,
                purpose: _carPurpose,
                numberSeat: seat,
                usedYear: diffYear,
                carValue: convertToNumber(valueCar),
                insuranceValue: convertToNumber(valueCashCar),
                tonnage:
                    checkCarIsTruck(_carType) ? (loadCapacity || '') : '',
                organizationId: decode?.organizationId,
                carMode: carModel?.name,
                package: []
            }
            console.log("resp", resp)
            let url = `${URL}/api/premium/v1/car-premium/physical-organization`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": dataTokenInsur?.token || token

                },
                body: JSON.stringify(resp)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.code == "409") {
                        setModalErr(true)
                    }
                    if (res.code == "000") {

                    }

                })

        })


    }

    const handlePressTakePhoto = (formik) => {
        let params = {
            typeCar, purpose_car, carBrand, carModel, seat, year, carStatus, loadCapacity,
            valueCar, valueCashCar, fullName: formik?.values?.fullName,
            vehicleNumber, frameNumber, licensePlate, isValidInfo: true, ownerAddress: formik?.values?.ownerAddress,
            dateFrom: formik?.values?.dateFrom, dateTo: formik?.values?.dateTo, dataPackage: dataPackageApi ? dataPackageApi : dataPackage,
            registrationExp: formik?.values?.registrationExp
        };
        saveCarPhysicalType(params);
        saveCHECK_OCR_AGAIN_PHYSICAL(false)

        Actions.CameraCarPhysical();

    };
    const getBack = () => {
        Actions.IntroductionCarPhysical()
    }
    const handleChangeType = (name) => {
        if (name == 'Y') {
            setcarStatus({ value: "Y", label: "Đã có biển số" });
        } else if (name == 'N') {
            setcarStatus({ value: "N", label: "Chưa có biển số" });
        }
    };

    const validation = Yup.object().shape({
        // registrationExp: Yup.string()
        //     .strict(false)
        //     .trim()
        //     .required('Không được bỏ trống'),
        // phone: Yup.string() // validate số điện thoại người mua
        //     .strict(false)
        //     .required(ERROR_PHONE_REQUIRED)
        //     .test('phone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)),
    });
    const handleOnblurvalueCar = () => {
        if (!valueCar) {
            setErrors8({ valueCar: 'Không được bỏ trống' })
        } else {
            calFee();
        }
    }

    const handleOnblurvalueCashCar = () => {
        if (!valueCashCar) {
            setErrors7({ valueCashCar: 'Không được bỏ trống' })
        } else {
            calFee();
        }
    }

    const handleOnblurYear = () => {
        if (!year) {
            setErrors({ year: 'Không được bỏ trống' })
        } else {
            calFee();
        }
    }

    const handleOnblurSeat = () => {
        if (!seat) {
            setErrors1({ seat: 'Không được bỏ trống' })
        } else {
            calFee();
        }
    }
    // const handleOnblurLicensePlate = () => {
    //     if (!licensePlate) {
    //         setErrors3({ licensePlate: 'Không được bỏ trống' })
    //     }
    // }

    // const handleOnblurFrameNumber = () => {
    //     if (!frameNumber) {
    //         setErrors4({ frameNumber: 'Không được bỏ trống' })
    //     }
    // }

    // const handleOnblurVehicleNumber = () => {
    //     if (!vehicleNumber) {
    //         setErrors5({ vehicleNumber: 'Không được bỏ trống' })
    //     }
    // }

    const handleOnblurLoadCapacity = () => {
        if (!loadCapacity) {
            setErrors2({ loadCapacity: 'Không được bỏ trống' })
        } else {
            calFee();
        }
    }

    const sendEmail = () => {
        const resp = {
            purpose: purpose_car?.value || 'N',
            licenseStatus: carStatus.value || '',
            ownerFullName: fullName || '',
            ownerAddress: ownerAddress || '',
            carType: typeCar?.value || '',
            carBrand: carBrand?.name || '',
            carModel: carModel?.name || '',
            manufactureYear: year || '',
            numberSeat: seat || '',
            licenseNumber: licensePlate || '',
            chassisNumber: frameNumber || '',
            machineNumber: vehicleNumber || '',
            declarationPrice: valueCar || '',
            insuranceValue: valueCashCar || '',
            phone: phoneModal || '',
        }
        let url = `${URL}/api/contract/v1/car-contracts/send-mail-10b5`;
        console.log("URL", url)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(resp)
        })
            .then(res => {
                console.log("ress", res)
            })
        setModalErr(false);
    }

    // chọn tỉnh/tp
    const setProvince = async (data, formik) => {
        if (formik.values.ownerProvince !== data._name) {
            await formik.setFieldValue('ownerProvince', data._name);
            await formik.setFieldValue('ownerDistrict', '');
        }
        await getDistrict(data.id);
    };

    // chọn quận/huyện
    const setDistrict = async (data, formik) => {
        if (formik.values.ownerDistrict !== data._name) {
            await formik.setFieldValue('ownerDistrict', data._name);
        }
    };

    const onShowLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
            cropperCircleOverlay: false,
            sortOrder: 'none',
            compressImageMaxWidth: 720,
            compressImageMaxHeight: 720,
            compressImageQuality: Platform.OS === 'ios' ? 0.2 : 0.4,
            includeExif: true,
        })
            .then(async (image) => {
                await setShowModalImg(false);
                await setIsLibrary(true);
                await saveImageCarPhysical({uri: image.path});
            })
            .catch();
    };

    const headerZIndex = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [999, 1001, 1002],
            extrapolate: 'clamp'
        });
    
    const onChangeRegistrationExp = (formik, text) => {
        formik.setFieldValue('registrationExp', text);
    };
    // const handleOnblur = (formik) => {
    //     if (formik?.values?.registrationExp?.length === 0) {
    //         formik.setFieldError('registrationExp', 'Không được bỏ trống')
    //     }
    // }
    const handleChangePurpose = (name) => {
        if (name == 'C') {
            setpurpose_car({ value: "C", label: "Kinh doanh" });
            calFee(null, null, "C");
        } else if (name == 'K') {
            setpurpose_car({ value: "K", label: "Không kinh doanh" });
            calFee(null, null, "K");
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}>
                <Formik
                    initialValues={{
                        // seat:seat,
                        dateFrom: dateFrom,
                        dateTo: dateTo,
                        registrationExp: infoCar?.registrationExp || registrationExp,

                    }}
                    validationSchema={validation}
                    isInitialValid={infoCar?.isValidInfo || false}
                    enableReinitialize={true}
                >
                    {formik => {
                        const packageArr = dataPackageApi ? [...dataPackageApi] : dataPackage
                        return (
                            <View style={styles.container}>
                                {
                                    loading ? (
                                        <View style={{
                                        flex: 1,
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: '#e8e8e8',
                                        justifyContent: 'center',
                                        opacity: 0.3,
                                        zIndex: 2200,
                                        }}>
                                            <ActivityIndicator
                                                size="large"
                                                color={Color}
                                            />
                                        </View>
                                    ) : null
                                }
                                <ModalProvince
                                    open={modalProvince}
                                    onClosed={() => setModalProvince(null)}
                                    setProvince={data => setProvince(data, formik)}
                                    onOpened={() => setModalProvince(true)}
                                />
                                <ModalDistrict
                                    open={modalDistrict}
                                    onClosed={() => setModalDistrict(null)}
                                    setDistrict={data => setDistrict(data, formik)}
                                    onOpened={() => setModalDistrict(true)}
                                />
                                <Animated.View style={{zIndex: headerZIndex}}>
                                    <ImageHeaderScroll code={'C2'} offset={offset} />
                                </Animated.View>
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: 2012
                                }}>
                                    <TouchableOpacity
                                        onPress={() => getBack()}
                                        style={{
                                            paddingHorizontal: 24,
                                            paddingTop: 43,
                                            zIndex: 2012
                                        }}>
                                        <FastImage
                                            style={{
                                                height: 15,
                                                width: (15 * 21) / 39,
                                            }}
                                            source={require('../../icons/ic_back.png')}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{zIndex: 2011}}>
                                    <HeaderScroll code={'C2'} offset={offset} />
                                </View>
                                {openGetPurpose ? (
                                    <NewModalGetPurpose
                                        open={openGetPurpose}
                                        onClosed={() => closedModal('purpose')}
                                        setGetPurpose={data => setType(data, 'purpose')}
                                    />
                                ) : null}
                                {opentypeCar ? (
                                    <NewModalTypeCarTNDS
                                        open={opentypeCar}
                                        onClosed={() => closedModal('typeCar')}
                                        setType={data => setType(data, 'typeCar')}
                                        typeCar={typeCar}
                                        orgCode={orgCode}
                                    />
                                ) : null}
                                {opencarBrand ? (
                                    <NewModalProducer
                                        open={opencarBrand}
                                        onClosed={() => closedModal('carBrand')}
                                        setProducer={data => setType(data, 'carBrand')}
                                        carBrand={carBrand}
                                    />
                                ) : null}
                                {opencarModel ? (
                                    <NewModalModel
                                        idProducer={carBrandId}
                                        open={opencarModel}
                                        onClosed={() => closedModal('carModel')}
                                        setModel={data => setType(data, 'carModel')}
                                        carModel={carModel}
                                    />
                                ) : null}
                                {opencarStatus ? (
                                    <NewModalGetStatus
                                        open={opencarStatus}
                                        onClosed={() => closedModal('carStatus')}
                                        setGetPurpose={data => setType(data, 'carStatus')}
                                    />
                                ) : null}
                                <ScrollView
                                    style={{ zIndex: 1000 }}
                                    contentContainerStyle={{
                                        paddingTop: HEADER_MAX_HEIGHT
                                    }}
                                    scrollEventThrottle={16}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { y: offset } } }],
                                        { useNativeDriver: false }
                                    )}>
                                    <View style={styles.contentContainer}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingTop: 24,
                                            paddingHorizontal: 24,
                                        }}>
                                            <IconCarSvg width={15} height={15} />
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                color: colorTitle,
                                                marginLeft: 8,
                                            }}>
                                                Thông tin xe được bảo hiểm</Text>
                                        </View>
                                        <Modal
                                            isVisible={showModalImg}
                                            style={{ margin: 0, justifyContent: 'flex-end' }}
                                            onBackButtonPress={() => setShowModalImg(false)}
                                            onBackdropPress={() => setShowModalImg(false)}
                                            animationInTiming={200}
                                            animationOutTiming={200}
                                            backdropTransitionInTiming={0}
                                            backdropTransitionOutTiming={0}
                                        >
                                            <View
                                                style={{
                                                    backgroundColor: '#fff',
                                                    borderTopLeftRadius: 20,
                                                    borderTopRightRadius: 20,
                                                    paddingTop: 24,
                                                    paddingHorizontal: 24,
                                                    paddingBottom: 32,
                                                }}>
                                                    <TouchableOpacity onPress={() => {
                                                        setShowModalImg(false);
                                                        handlePressTakePhoto(formik);
                                                    }}>
                                                    <Text style={{ fontSize: 15, color: TxtColor }}>
                                                        Chụp ảnh
                                                    </Text>
                                                    </TouchableOpacity>
                                                    <View style={{marginVertical: 16, height: 1, backgroundColor: '#D9D9D9'}} />
                                                    <TouchableOpacity onPress={() => onShowLibrary()}>
                                                    <Text style={{ fontSize: 15, color: TxtColor }}>
                                                        Chọn ảnh từ thư viện
                                                    </Text>
                                                    </TouchableOpacity>
                                            </View>
                                        </Modal>
                                        {
                                            imgOcrCar ?
                                                <View style={{ marginHorizontal: 24, marginTop: 24, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={{ uri: imgOcrCar.uri }} style={{
                                                        width: '100%',
                                                        borderRadius: 15,
                                                        overflow: "hidden",
                                                        height: heightPercentageToDP('30')
                                                    }} />
                                                    <TouchableOpacity onPress={() => setShowModalImg(true)} style={{ position: 'absolute' }}>
                                                        <IconCameraBlurSvg width={64} height={64} />
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View>
                                                    <TouchableOpacity style={{ alignItems: 'center', paddingTop: 24, paddingBottom: 20, zIndex: 9999 }}
                                                        onPress={() => setShowModalImg(true)}>
                                                        <IconOCRCameraSvg width={64} height={64} style={{marginBottom: 4}} />
                                                        <Text style={{
                                                            color: TxtColor,
                                                            fontSize: 14,
                                                            textAlign: 'center',
                                                        }}>Chụp giấy đăng kiểm để hoàn tất thông tin nhanh hơn</Text>
                                                    </TouchableOpacity>
                                                    <View style={{
                                                        width: widthPercentageToDP('100'),
                                                        height: 8,
                                                        backgroundColor: '#f5f6f5',
                                                    }} />
                                                    <View style={{ paddingHorizontal: 24, paddingTop: 20, alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 14, color: colorTitle }}>hoặc điền thông tin vào bảng dưới đây</Text>
                                                    </View>
                                                </View>
                                        }

                                        <View style={{ marginHorizontal: 24, marginTop: 24 }}>
                                            <View>
                                                <Text style={{ color: TxtColor, fontSize: 14 }}>Mục đích sử dụng *</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity
                                                        onPress={() => handleChangePurpose('K')}
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            paddingTop: 10,
                                                            flex: 1,
                                                        }}>
                                                        {
                                                            purpose_car.value == 'K' ? (
                                                                <IconRadioBtnActiveSvg width={15} height={15} />
                                                            ) : (
                                                                <IconRadioBtnSvg width={15} height={15} />
                                                            )
                                                        }
                                                        <Text style={{ marginLeft: 8, color: TxtColor }}>Không kinh doanh</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => handleChangePurpose('C')}
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            paddingTop: 10,
                                                            paddingLeft: 14,
                                                            flex: 1,
                                                        }}>
                                                        {
                                                            purpose_car.value == 'C' ? (
                                                                <IconRadioBtnActiveSvg width={15} height={15} />
                                                            ) : (
                                                                <IconRadioBtnSvg width={15} height={15} />
                                                            )
                                                        }
                                                        <Text style={{ marginLeft: 8, color: TxtColor }}>Kinh doanh</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 10 }}>
                                                <FormikSelect
                                                    label={'Loại xe *'}
                                                    openModal={() => checkOpenModal('typeCar')}
                                                    value={typeCar?.value}
                                                />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <View style={{ flex: 0.9 }}>
                                                    <FormikSelect
                                                        label={'Hãng xe *'}
                                                        openModal={() => checkOpenModal('carBrand')}
                                                        value={carBrand?.name}

                                                    />
                                                </View>
                                                <View style={{ flex: 0.1 }}>

                                                </View>
                                                <View style={{ flex: 0.9 }}>
                                                    <FormikSelect
                                                        checkDisabled={carBrandId ? false : true}
                                                        label={`Dòng xe${carBrandId ? ' *' : ''}`}
                                                        openModal={() => checkOpenModal('carModel')}
                                                        value={carModel ? carModel?.name : ''}
                                                        hideIcon={!carBrandId}
                                                        baseColor={carBrandId ? colorText : '#8D8C8D'}
                                                    />
                                                </View>
                                            </View>


                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <View style={{ flex: 0.9 }}>
                                                    <Input
                                                        label={'Năm sản xuất *'}
                                                        value={year}
                                                        maxLength={4}
                                                        keyboardType={'number-pad'}
                                                        onChangeText={(e) => changeTextYear(e)}
                                                        onBlur={() => handleOnblurYear()}
                                                        error={errors?.year}
                                                    />
                                                </View>
                                                <View style={{ flex: 0.1 }}>

                                                </View>
                                                <View style={{ flex: 0.9 }}>
                                                    <View style={{}}>
                                                        <Input
                                                            label={'Số chỗ ngồi *'}
                                                            value={seat}
                                                            // name={'seat'}
                                                            onBlur={() => handleOnblurSeat()}

                                                            keyboardType={'number-pad'}
                                                            maxLength={2}
                                                            onChangeText={(e) => changeTextSeat(e)}
                                                            showSoChoNgoi={checkSoChoNgoi}
                                                            error={errors1?.seat}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {/* <Text style={{ color: '#404142', paddingTop: 10 }}>Nhập thông tin *</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    paddingTop: 10,
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => handleChangeType('Y')}
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                        }}>
                                                        {
                                                            carStatus.value == 'Y' ? (
                                                                <IconRadioBtnActiveSvg width={15} height={15} />
                                                            ) : (
                                                                <IconRadioBtnSvg width={15} height={15} />
                                                            )
                                                        }
                                                        <Text style={{ marginLeft: 8, color: TxtColor }} numberOfLines={1}>Biển số xe</Text>
                                                    </TouchableOpacity>
                                                    <Text style={{ textAlign: 'right', color: colorText, fontSize: 14 }} numberOfLines={1}>hoặc</Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => handleChangeType('N')}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        paddingTop: 10,
                                                        paddingLeft: 14,
                                                        flex: 1,
                                                    }}>
                                                    {
                                                        carStatus.value == 'N' ? (
                                                            <IconRadioBtnActiveSvg width={15} height={15} />
                                                        ) : (
                                                            <IconRadioBtnSvg width={15} height={15} />
                                                        )
                                                    }
                                                    <Text style={{ marginLeft: 8, color: TxtColor }} numberOfLines={1}>Số khung, số máy</Text>
                                                </TouchableOpacity>
                                            </View> */}
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 0.9 }}>
                                                    <Input label={'Số khung'}
                                                        onBlur={() => {
                                                            setframeNumber(frameNumber.toUpperCase());
                                                        }}
                                                        onChangeText={(e) => {
                                                            formik.setFieldValue('checkNf', false);
                                                            changeFrameNumber(e);
                                                        }}
                                                        error={errors4?.frameNumber}
                                                        value={frameNumber} autoCapitalize={'characters'} />
                                                </View>
                                                <View style={{ flex: 0.1 }} />
                                                <View style={{ flex: 0.9 }}>
                                                    <Input label={'Số máy'}
                                                        onBlur={() => {
                                                            setvehicleNumber(vehicleNumber.toUpperCase());
                                                        }}
                                                        onChangeText={(e) => {
                                                            formik.setFieldValue('checkNf', false);
                                                            changevehicleNumber(e);
                                                        }}
                                                        error={errors5?.vehicleNumber}
                                                        value={vehicleNumber}
                                                        autoCapitalize={'characters'} />
                                                </View>
                                            </View>
                                            <Input label={'Biển số xe'}
                                                onChangeText={(e) => {
                                                    formik.setFieldValue('checkNf', false);
                                                    changeLicensePlate(e);
                                                }}
                                                onBlur={() => {
                                                    setlicensePlate(licensePlate.toUpperCase());
                                                }}
                                                value={licensePlate}
                                                maxLength={20}
                                                error={errors3?.licensePlate}
                                                autoCapitalize={'characters'}
                                            />
                                            {
                                                formik.values.checkNf ?
                                                    <Text style={{ color: errValidColor, fontSize: 14 }}>
                                                        Bạn phải điền Biển số xe hoặc Số khung-số máy
                                                    </Text>
                                                    : null
                                            }
                                            {/* {
                                                carStatus?.value == 'Y' && (
                                                    <View style={{ paddingTop: 5 }}>
                                                        <Input label={'Biển số xe *'}
                                                            onChangeText={(e) => changeLicensePlate(e)}
                                                            onBlur={() => handleOnblurLicensePlate()}
                                                            value={licensePlate}
                                                            maxLength={20}
                                                            error={errors3?.licensePlate}
                                                            autoCapitalize={'characters'}
                                                        />
                                                    </View>
                                                )
                                            }
                                            {
                                                carStatus?.value == 'N' && (
                                                    <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                                        <View style={{ flex: 0.9 }}>
                                                            <Input label={'Số khung *'}
                                                                onBlur={() => handleOnblurFrameNumber()}
                                                                onChangeText={(e) => changeFrameNumber(e)}
                                                                error={errors4?.frameNumber}
                                                                value={frameNumber} autoCapitalize={'characters'} />
                                                        </View>
                                                        <View style={{ flex: 0.1 }} />
                                                        <View style={{ flex: 0.9 }}>
                                                            <Input label={'Số máy *'}
                                                                onBlur={() => handleOnblurVehicleNumber()}
                                                                onChangeText={(e) => changevehicleNumber(e)}
                                                                error={errors5?.vehicleNumber}
                                                                value={vehicleNumber}
                                                                autoCapitalize={'characters'} />
                                                        </View>
                                                    </View>
                                                )
                                            } */}
                                            {
                                                checkCarIsTruck(typeCar?.code) && (
                                                    <View>
                                                        <Input
                                                            label={'Trọng tải *'}
                                                            value={loadCapacity}
                                                            onBlur={() => handleOnblurLoadCapacity()}
                                                            maxLength={5}
                                                            onChangeText={(e) => changeloadCapacity(e)}
                                                            error={errors2?.loadCapacity}
                                                            loadCapacity
                                                        />
                                                    </View>
                                                )
                                            }
                                            {/* <ModalTimePicker
                                                dateDefault={new Date()}
                                                minimumDate={new Date()}
                                                onPicker={(text) => onChangeRegistrationExp(formik, text)}
                                                // onCancelPicker={() => handleOnblur(formik)}
                                            >
                                                <View>
                                                    <FormikInput
                                                        label={'Ngày hết hạn đăng kiểm'}
                                                        name={'registrationExp'}
                                                        keyboardType={'number-pad'}
                                                        placeholder={'dd/mm/yyyy'}
                                                        placeholderTextColor={colorPlaceholder}
                                                        maxLength={10}
                                                        editable={false}
                                                    />
                                                </View>
                                            </ModalTimePicker> */}
                                            <DateFill
                                                value={formik.values.registrationExp}
                                                onChange={(text, err) => {
                                                    formik.setFieldValue('registrationExp', text);
                                                    formik.setFieldValue('errRegistrationExp', err);
                                                }}
                                                label={'Ngày hết hạn đăng kiểm'}
                                                minimumDate={moment().format('DD/MM/YYYY')}
                                                errMinimum={ERROR_DATE_CURRENT}
                                            />
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 0.9 }}>
                                                    <Input
                                                        label={'Giá trị xe *'}
                                                        onBlur={() => handleOnblurvalueCar()}
                                                        value={renderVND(valueCar?.toString())}
                                                        error={errors8?.valueCar}
                                                        maxLength={17}
                                                        onChangeText={(e) => changeNumberValueCar(e)}

                                                        keyboardType={'number-pad'}
                                                        currency
                                                    />
                                                </View>
                                                <View style={{ flex: 0.1 }}>

                                                </View>
                                                <View style={{ flex: 0.9 }}>
                                                    <Input
                                                        label={'Số tiền bảo hiểm *'}
                                                        maxLength={17}
                                                        onBlur={() => handleOnblurvalueCashCar()}
                                                        value={renderVND(valueCashCar?.toString())}
                                                        error={errors7?.valueCashCar}
                                                        onChangeText={(e) => changeNumberValueCashCar(e)}
                                                        keyboardType={'number-pad'}
                                                        currency
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ marginBottom: 16 }}>
                                            <FooterButton>
                                                <Button
                                                    // disabled={!typeCar || !carStatus || !seat || !year || !carModel || carBrand || purpose_car}
                                                    disabled={
                                                        formik.values.errRegistrationExp ||
                                                        checkValidButtonNext(formik)
                                                    }
                                                    label={'TIẾP TỤC'}
                                                    marginTop={10}
                                                    onPress={() => saveAndNext(formik)}
                                                />
                                            </FooterButton>
                                        </View>
                                    </View>
                                </ScrollView>
                                <ScrollView>
                                    <ModalBox
                                        isOpen={modalErr}
                                        entry={'bottom'}
                                        position={'bottom'}
                                        swipeToClose={false}
                                        onClosed={() => setModalErr(false)}
                                        coverScreen={true}
                                        style={styles.ctModal}
                                    >
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ paddingTop: 20, paddingHorizontal: 16 }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={{marginBottom: 25}}>
                                                        <NotifyRingSvg width={53} height={60} />
                                                    </View>
                                                </View>
                                                <Text style={{ fontSize: 14, color: TxtColor }}>
                                                    Với số tiền bảo hiểm lớn hơn <Text style={{ fontWeight: 'bold' }}>{formatVND(insuranceValueMax, '.')}VNĐ</Text>,{'\n'}vui lòng nhập số điện thoại để được tư vấn trực tiếp</Text>
                                                {/* <FormikInput
                                                label={'Số điện thoại *'}
                                                name={'phone'}
                                                error={errorPhone.phone}
                                                maxLength={12}
                                                keyboardType={'number-pad'}
                                                onChangeText={(e) => changePhone(e)}
                                            /> */}
                                                <PhoneInput
                                                    value={phoneModal}
                                                    onChange={(value, err) => {
                                                        console.log('value, err', value, err)
                                                        setPhoneModal(value);
                                                        setErrPhoneModal(err);
                                                    }}
                                                />
                                            </View>
                                            <Button
                                                label={'GỬI'}
                                                width={screen.width - 40}
                                                marginTop={15}
                                                borderRadius={10}
                                                onPress={() => sendEmail()}
                                                disabled={!phoneModal || errPhoneModal}
                                            />
                                            <ButtonNoColor
                                                label={'HỦY'}
                                                width={screen.width - 40}
                                                borderRadius={10}
                                                color={Color}
                                                onPress={() => setModalErr(false)}
                                            />
                                        </View>
                                    </ModalBox>
                                </ScrollView>
                            </View>
                        )
                    }}

                </Formik>

            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
    },
    viewTable: {
        shadowColor: '#F4F4F4',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 7.00,

        elevation: 3, backgroundColor: '#F6F5F6', borderTopLeftRadius: 10, borderTopRightRadius: 10,
    },
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.55,
        borderTopLeftRadius: 20, borderTopRightRadius: 20
    },
});

const mapStateToProps = (state, ownProps) => {
    return ({
        infoCar: state?.carPhysical?.infoCarPhysical,
        imgOcrCar: state?.carPhysical?.imgOcrCarPhysical,
        checkOcr: state?.carPhysical?.checkOcrPhysical,
        promotionPrice: state?.promotion?.promotionPrice['C2'],
        contractLog: state.logContract.logContract['C2'] || {},
        contractCarId: state?.carPhysical?.contractCarId,
        dataTokenInsur: state.insurance.tokenInsur['C2'],
    })
};

export default connect(mapStateToProps, {
    saveCarPhysicalType, 
    saveImageCarPhysical, 
    saveCHECK_OCR_AGAIN_PHYSICAL, 
    getDistrict, 
    saveLogContract,
    logEventContract
})(InfomationCarPhysical);
