import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image,Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { formatVND, formatVNDTNDSCAR, renderVND } from '../../components/Functions'
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import {Color, NewColor, URL, TxtColor} from '../../config/System';
import { connect } from 'react-redux';
import { SceneMap, TabView } from 'react-native-tab-view';
import HeaderIntroductionCarPhysical from './components/HeaderIntroductionCarPhysical';
import InputSelectCar from './components/InputSelectCar';
import TotalFee from './TotalFee';
import Input from './components/Input';
import NewModalTypeCarTNDS from '../../components/buy/NewModalTypeCarTNDS';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NewModalGetPurpose from '../../components/buy/NewModalGetPurpose';
import NewModalProducer from '../../components/buy/NewModalProducer';
import NewModalModel from '../../components/buy/NewModalModel';
import NewModalGetStatus from '../../components/buy/NewModalGetStatus';
import ModalMonth from './components/ModalMonth';
import { saveTNDSCarType, saveFeeMotor, saveImageOcrCar, saveCHECK_OCR_AGAIN } from './actions/tndsCarActions';
import PackageTNDSCar from './Package';
import { checkCarIsTruck } from './helpers';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
import axios from 'axios';

import { validationTextName, validationText, validationPackage, validateInformationCar, validateInformationCarSeat, validateInformationCarchassisNumber, validateLoadCapacity, validateInformationCarLicenseNumber } from './components/Validate';
import {convertToNumber} from './helpers';
import { getCarTypeSuccess } from './actions/car_Buy';
import Loading from '../../components/Loading';
import Store from '../../services/Store';
import Const from '../../services/Const';
import BaseModal from '../../components/BaseModal';
import { checkExpToken } from '../../config/decodeToken';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import { checkLeapYear, checkMonth } from '../../components/Functions';
import InputSelect from '../../components/buy/InputSelect';
import { diffMonth } from '../../utils/Validate';
import IconCameraBlurSvg from '../../config/images/icons/IconCameraBlurSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconOCRCameraSvg from '../../config/images/icons/IconOCRCameraSvg';

function InfomationCarPhysical({ saveTNDSCadurationrType, saveCHECK_OCR_AGAIN, checkOcr, saveImageOcrCar,saveTNDSCarType, imgOcrCar, infoCar }) {
    const [index, setIndex] = useState(0);
    const [typeCar, settypeCar] = useState('');
    const [purpose_car, setpurpose_car] = useState('');
    const [carBrand, setcarBrand] = useState('');
    const [carBrandId, setcarBrandId] = useState('');
    const [carModel, setcarModel] = useState('');
    const [check, setcheck] = useState([0]);
    const [feeTNDS, setfeeTNDS] = useState(3800000);
    const [duration, setDuration] = useState();
    const [insuranceMoney, setInsuranceMoney] = useState('')
    const [carStatus, setcarStatus] = useState({ value: "Y", label: "Đã có biển số" });
    const [loadCapacity, setloadCapacity] = useState('');
    const [fullName, setfullName] = useState('');
    const [carRegistAddress, setCarRegistAddress] = useState('');
    const [valueCar, setvalueCar] = useState('');
    const [valueCashCar, setvalueCashCar] = useState('');
    const [openMonth, setopenMonth] = useState(false);
    const [formDate, setformDate] = useState(false);
    const [year, setyear] = useState('');
    const [seat, setseat] = useState('');
    const [opentypeCar, setopentypeCar] = useState(false);
    const [openGetPurpose, setopenGetPurpose] = useState(false);
    const [opencarBrand, setopencarBrand] = useState(false);
    const [opencarModel, setopencarModel] = useState(false);
    const [opencarStatus, setopencarStatus] = useState(false);
    const [checkSoChoNgoi, setcheckSoChoNgoi] = useState(false);
    const [errors, setErrors] = useState({})
    const [errors1, setErrors1] = useState({})
    const [errors2, setErrors2] = useState({})
    const [errors3, setErrors3] = useState({})
    const [errors4, setErrors4] = useState({})
    const [errors5, setErrors5] = useState({})
    const [licensePlate, setlicensePlate] = useState('')
    const [frameNumber, setframeNumber] = useState('')
    const [vehicleNumber, setvehicleNumber] = useState('')
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [registrationExp, setRegistrationExp] = useState('');
    const [ownerAddress, setOwnerAddress] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [durationCar, setdurationCar] = useState('12 tháng');

    const [dataPackage, setdataPackage] = useState([
        {
            "id": 144,
            "code": "bs02",
            "name": "Phí cơ bản",
            "description": "",
            "price":3800000,
            "insuranceValue": 0,
            "unit": "",
            "image": null,
            "type": "CAR",
            "subType": "PHYSICAL",
            "currency": "VND",
            "priority": 0,
            "deductibleValue": null,
            "isDeleted": false,
            "benefits": null,
            "areaCodeApplied": null,
            "createdAt": "2021-03-31T15:43:01.000Z",
            "updatedAt": "2021-03-31T15:43:01.000Z"
        },
        {
            "id": 121,
            "code": "bs02",
            "name": "BS02 - Bảo hiểm thay thế mới",
            "description": "",
            "price": 0,
            "insuranceValue": 0,
            "unit": "",
            "image": null,
            "type": "CAR",
            "subType": "PHYSICAL",
            "currency": "VND",
            "priority": 1,
            "deductibleValue": null,
            "isDeleted": false,
            "benefits": null,
            "areaCodeApplied": null,
            "createdAt": "2021-03-31T15:43:01.000Z",
            "updatedAt": "2021-03-31T15:43:01.000Z"
        },
        {
            "id": 122,
            "code": "bs04",
            "name": "BS04 - Bảo hiểm xe bị mất trộm, cướp bộ phận",
            "description": "",
            "price": 0,
            "insuranceValue": 0,
            "unit": "",
            "image": null,
            "type": "CAR",
            "subType": "PHYSICAL",
            "currency": "VND",
            "priority": 2,
            "deductibleValue": null,
            "isDeleted": false,
            "benefits": null,
            "areaCodeApplied": null,
            "createdAt": "2021-03-31T15:43:01.000Z",
            "updatedAt": "2021-03-31T15:43:01.000Z"
        },
        {
            "id": 123,
            "code": "bs05",
            "name": "BS05 - Bảo hiểm lựa chọn cơ sở sửa chữa",
            "description": "",
            "price": 0,
            "insuranceValue": 0,
            "unit": "",
            "image": null,
            "type": "CAR",
            "subType": "PHYSICAL",
            "currency": "VND",
            "priority": 2,
            "deductibleValue": null,
            "isDeleted": false,
            "benefits": null,
            "areaCodeApplied": null,
            "createdAt": "2021-03-31T15:43:01.000Z",
            "updatedAt": "2021-03-31T15:43:01.000Z"
        },
        {
            "id": 125,
            "code": "bs09",
            "name": "BS09 - Bảo hiểm thuê xe trong thời gian sửa chữa",
            "description": "",
            "price": 0,
            "insuranceValue": 0,
            "unit": "",
            "image": null,
            "type": "CAR",
            "subType": "PHYSICAL",
            "currency": "VND",
            "priority": 2,
            "deductibleValue": null,
            "isDeleted": false,
            "benefits": null,
            "areaCodeApplied": null,
            "createdAt": "2021-03-31T15:43:01.000Z",
            "updatedAt": "2021-03-31T15:43:01.000Z"
        },
        {
            "id": 124,
            "code": "bs06",
            "name": "BS06 - Bảo hiểm tổn thất về động cơ khi xe hoạt động trong khu vực bị ngập nước",
            "description": "",
            "price": 0,
            "insuranceValue": 0,
            "unit": "",
            "image": null,
            "type": "CAR",
            "subType": "PHYSICAL",
            "currency": "VND",
            "priority": 2,
            "deductibleValue": null,
            "isDeleted": false,
            "benefits": null,
            "areaCodeApplied": null,
            "createdAt": "2021-03-31T15:43:01.000Z",
            "updatedAt": "2021-03-31T15:43:01.000Z"
        },
        {
            "id": 126,
            "code": "bs13",
            "name": "BS13 - Bảo hiểm cho thiết bị lắp thêm",
            "description": "",
            "price": 0,
            "insuranceValue": 0,
            "unit": "",
            "image": null,
            "type": "CAR",
            "subType": "PHYSICAL",
            "currency": "VND",
            "priority": 3,
            "deductibleValue": null,
            "isDeleted": false,
            "benefits": null,
            "areaCodeApplied": null,
            "createdAt": "2021-03-31T15:43:01.000Z",
            "updatedAt": "2021-03-31T15:43:01.000Z"
        },
        {
            "id": 127,
            "code": "bs14",
            "name": "BS14 - Bảo hiểm mất trộm, cướp chìa khóa xe",
            "description": "",
            "price": 0,
            "insuranceValue": 0,
            "unit": "",
            "image": null,
            "type": "CAR",
            "subType": "PHYSICAL",
            "currency": "VND",
            "priority": 3,
            "deductibleValue": null,
            "isDeleted": false,
            "benefits": null,
            "areaCodeApplied": null,
            "createdAt": "2021-03-31T15:43:01.000Z",
            "updatedAt": "2021-03-31T15:43:01.000Z"
        }
    ]);
    const FormikInput = handleTextInput(Input);


    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
            if (checkExpToken(token) == false) {
                setOpenModal(true)
            }
        })
    }, []);

    useEffect(() => {
        if (infoCar) {

            setfullName(infoCar?.fullName);
            setyear(infoCar?.year);
            setseat(infoCar?.seat);
            settypeCar(infoCar?.typeCar);
            setpurpose_car(infoCar?.purpose_car);
            setcarBrand(infoCar?.carBrand);
            setcarBrandId(infoCar?.carBrand?.id);
            setcarModel(infoCar?.carModel);
            setcarStatus(infoCar?.carStatus);
            setloadCapacity(infoCar?.loadCapacity);
            setRegistrationExp(infoCar?.registrationExp)
            setOwnerAddress(infoCar?.ownerAddress)
            if (infoCar?.carStatus.value == 'N') {
                setframeNumber(infoCar?.frameNumber || '');
                setvehicleNumber(infoCar?.vehicleNumber || '');
            } else {
                setlicensePlate(infoCar?.licensePlate);
            }

        }
    }, [infoCar]);

    const validation = Yup.object().shape({
        registrationExp: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('registrationExp', 'Sai định dạng', (
                values, // check validate ngày 31 tháng có 30 ngày
            ) => checkMonth(values == undefined ? '' : values))
            .test('registrationExp', 'Sai định dạng', (
                values, // check validate ngày 29/02 năm nhuận
            ) => checkLeapYear(values == undefined ? '' : values))
            .test('registrationExp', 'Sai định dạng', (
                values, // check validate ngày 29/02 năm nhuận
            ) => moment(values == undefined ? '' : values))
            .test('registrationExp', 'Không được lớn hơn 30 tháng', (values) => diffMonth(moment(values, 'DD/MM/YYYY'), moment().format(), 30))
            .test('registrationExp', 'Sai định dạng', (
                values,
            ) => checkFormatDate(values))
            .test('registrationExp', 'Lớn hơn hoặc bằng ngày hiện tại', (
                values,
            ) => validateDays(values)),

        ownerAddress: Yup.string().required('Không được bỏ trống'),


    });

    const checkFormatDate = (value) => {
        return moment(value, 'DD/MM/YYYY',true).diff(moment(new Date), 'days')
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
            case 'feeTNDS':
                setopenMonth(true);
                break;
            default:
                Alert.alert('NUMBER NOT FOUND');

        }
    };
    useEffect(() => {
        if (imgOcrCar && !checkOcr) {
            new Store().getSession(Const.TOKEN).then(token => {

                let img = { uri: imgOcrCar.uri, name: 'image.jpg', type: 'image/jpeg' }
                let url = `${URL}/api/ocr/v1/buckets/cloud-vision-inspection-certificate/images`;
                let bodyFormData = new FormData();
                bodyFormData.append('file', img);
                axios.post(url, bodyFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': token,
                    },
                })
                    .then((res) => {
                        if (res.status == 200) {
                            // setFeeTNDS(res?.data);
                            getDataOcr(res?.data.data?.name)
                            setLoading(true)

                        }
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
                    'Authorization': token,
                },
            })
                .then(res => res.json())
                .then(res => {
                    // let data = {
                    //     "registrationNumber": "30A82210",
                    //     "carType": "ô tô con",
                    //     "carMark": "TOYOTA",
                    //     "modelCode": "",
                    //     "engineNumber": "1NZZ342190",
                    //     "chassisNumber": "RL4BT9F30F4017762",
                    //     "manufacturedYear": "2020",
                    //     "manufacturedCountry": "Việt Nam",
                    //     "seatNumber": "5",
                    //     "expiredDate": "10/02/2018"
                    // }
                    let data = res.data;
                    if (res.data) {
                        // setFeeTNDS(res?.data);
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
                        if (data?.expiredDate) {
                            setRegistrationExp(data.expiredDate)
                        }
                        if (data?.ownerAddress) {
                            setOwnerAddress(data?.ownerAddress)
                        }
                        setLoading(false)
                    }
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false)

                });
        })

    }

    const gotoLogin = () => {
        setOpenModal(false)
        new Store().storeSession(Const.TOKEN, null)
        new Store().storeSession(Const.IS_LOGIN, null)
        Actions.LoginNew()
    }
    const validateDays = (value) => {
        let a = moment(value, 'DD/MM/YYYY',true).diff(moment(new Date), 'days')
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
        console.log('data',data)
        switch (condition) {
            case 'purpose':
                setpurpose_car(data);
                break;
            case 'typeCar':
                settypeCar(data);
                break;
            case 'carBrand':
                setcarModel('');
                setcarBrand(data);
                setcarBrandId(data.id);
                break;
            case 'carModel':
                setcarModel(data);
                break;
            case 'carStatus':
                setcarStatus(data);
                break;
            case 'carStatus':
                setvalueCashCar(data);
                break;
            case 'carStatus':
                setvalueCar(data);
                break;
            default:
                Alert.alert('NUMBER NOT FOUND');
        }
    };

    const checkTNLX = (value) => {

        console.log('value1',value)
        //
        // let ar =  [...check,...value]
        // setcheck(ar)
        if(check.includes(value) ){
            console.log("Abc")
            check.splice(value, 1);
            const temp = [...check];

            // removing the element using splice
            temp.splice(value, 1);

            // updating the list
            setcheck(temp);
        }else{
            setcheck(oldArray => [...oldArray, value]);
        }

    }
    const changeTextFullName = (txt) => {
        setfullName(txt);
        let a = validationTextName(txt)
        let errs = { ...a }
        setErrors(errs)
    };
    const changeTextCarRegistAddress = (txt) => {
        setCarRegistAddress(txt);
        let a = validationText(txt)
        let errs = { ...a }
        setErrors(errs)
    };
    const changeNumberValueCar = (txt) => {
        setvalueCar(convertToNumber(txt));
        let a = validationPackage(txt, 'valueCar')
        let errs = { ...a }
        setErrors(errs)
    };
    const changeNumberValueCashCar = (txt) => {
        setvalueCashCar(convertToNumber(txt));
        let a = validationPackage(txt, 'valueCashCar')
        let errs = { ...a }
        setErrors(errs)
    };
    const changeTextYear = (txt) => {
        setyear(txt);
        let a = validateInformationCar(txt, 'year')
        let errs = { ...a }
        setErrors(errs)
    };
    const changeTextSeat = (txt) => {
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
        let regex = /[^a-z0-9]/gi;
        setframeNumber(txt.replace(regex, ''));
        let a = validateInformationCarchassisNumber(txt.replace(regex, ''), 'frameNumber')
        let errs = { ...a }
        setErrors4(errs)
        // setframeNumber(txt)
    }
    const changevehicleNumber = (txt) => {
        let regex = /[^a-z0-9]/gi;
        setvehicleNumber(txt.replace(regex, ''))
        let a = validateInformationCarchassisNumber(txt.replace(regex, ''), 'vehicleNumber')
        let errs = { ...a }
        setErrors5(errs)
    }
    const changeloadCapacity = (txt) => {
        setloadCapacity(txt);
        let a = validateLoadCapacity(txt)
        let errs = { ...a }
        setErrors2(errs)
    };
    const onChangeBuyerBirthday = (formik, text) => {
        let str = text;
        if (text.length === 2 && formik.values.dateFrom.charAt(2) !== '/') {
            let a = str.slice(0, 2);
            formik.setFieldValue('dateFrom', (text += '/'));
            if (parseInt(a) > 31 || parseInt(a) == 0) {
                SimpleToast.show('Ngày không hợp lệ');
                formik.setFieldValue('dateFrom', '');
            }
        } else if (
            text.length === 5 &&
            formik.values.dateFrom.charAt(5) !== '/'
        ) {
            let a = str.slice(3, 5);
            formik.setFieldValue('dateFrom', (text += '/'));
            if (parseInt(a) > 12 || parseInt(a) == 0) {
                SimpleToast.show('Tháng không hợp lệ');
                formik.setFieldValue(
                    'dateFrom',
                    formik.values.dateFrom.slice(0, 3),
                );
            }
        } else {
            formik.setFieldValue('dateFrom', text);
        }
        if (text.length == 10) {
            if (validateDays(text) == true) {
                changeDateTo(formik, text)
                // setDateFrom(text)
            }

        }

    };
    const disableDateTo = () => {
        if (moment(infoCar?.registrationExp, 'DD/MM/YYYY').diff(moment().format(), 'months', true) <= 12) {
            return false
        } else {
            return true
        }
    }


    function checkValidButtonNext(formik) {
        if (valueCar  == '' ||  valueCashCar == '' || carRegistAddress == '' || fullName == '' || typeCar == '' || purpose_car == '' || carBrand == '' ||
            carModel == '' || seat == '' || year == '' || carStatus == '' ||
            carStatus.value == 'Y' && licensePlate == '' ||
            carStatus.value == 'N' && frameNumber == '' ||
            carStatus.value == 'N' && vehicleNumber == '' ||
            checkCarIsTruck(typeCar?.code) && loadCapacity == '' ||
            Object.keys(errors).length > 0 || Object.keys(errors1).length > 0 ||
            checkCarIsTruck(typeCar?.code) && Object.keys(errors2).length > 0 || carStatus.value == 'Y' && Object.keys(errors3).length > 0 || formik.isValid == false) {
            return true;
        } else if (valueCar !== '' && valueCashCar !== '' && carRegistAddress !== '' && fullName !== '' && typeCar !== '' && purpose_car !== '' && carBrand !== ''
            && carModel !== '' && seat !== '' && year !== '' && carStatus !== ''
            && Object.keys(errors).length == 0 && Object.keys(errors1).length == 0
            && Object.keys(errors2).length == 0 && formik.isValid == true) {
            if (carStatus.value == 'Y' && Object.keys(errors3).length == 0) {
                return false;
            }else if (carStatus.value == 'N' && Object.keys(errors4).length == 0 && Object.keys(errors5).length == 0) {
                return false;
            }
        }
    }
    const handleOnblur = (formik) => {
        if (formik?.values?.registrationExp?.length > 0 && formik?.values?.registrationExp?.length !== 10) {
            formik.setFieldError('registrationExp', 'Sai định dạng')
        }
    }
    const saveAndNext = (formik) => {
        let params = {
            valueCashCar, valueCar, fullName,carRegistAddress, typeCar, purpose_car, carBrand, carModel, seat, year, carStatus, loadCapacity,
            vehicleNumber, frameNumber, licensePlate, registrationExp: formik?.values?.registrationExp, isValidInfo: true, ownerAddress:formik?.values?.ownerAddress
        };
        console.log('params',params)
        saveTNDSCarType(params);
        // saveCHECK_OCR_AGAIN(true)
        Actions.BuyerCarPhysical();


    };
    const handlePressTakePhoto = () => {
        let params = {
            typeCar, purpose_car, carBrand, carModel, seat, year, carStatus, loadCapacity,
            vehicleNumber, frameNumber, licensePlate
        };
        saveTNDSCarType(params);
        saveCHECK_OCR_AGAIN(false)

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
    const setMonth  = (data)=>{
        console.log("daya2",data)
    }
    return (

        <>
            <KeyboardAwareScrollView style={{ backgroundColor: '#FFFFFF' }}>
                <Formik
                    initialValues={{
                        registrationExp: registrationExp,
                        ownerAddress: ownerAddress
                    }}
                    validationSchema={validation}
                    isInitialValid={infoCar?.isValidInfo || false}
                    enableReinitialize={true}
                >
                    {formik => {
                        console.log('formik',formik)

                        return (
                            <View style={styles.container}>
                                {
                                    loading ? <Loading /> : null
                                }
                                <HeaderIntroductionCarPhysical getBack={() => getBack()} />
                                {openGetPurpose ? (
                                    <NewModalGetPurpose
                                        open={openGetPurpose}
                                        onClosed={() => closedModal('purpose')}
                                        setGetPurpose={data => setType(data, 'purpose')}
                                    />
                                ) : null}
                                {openMonth ? (
                                    <ModalMonth
                                        open={openMonth}
                                        onClosed={() => setopenMonth(false)}
                                        setMonth={data => setMonth(data)}
                                    />
                                ): null
                                }


                                {opentypeCar ? (
                                    <NewModalTypeCarTNDS
                                        open={opentypeCar}
                                        onClosed={() => closedModal('typeCar')}
                                        setType={data => setType(data, 'typeCar')}
                                        typeCar={typeCar}
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
                                <View style={styles.contentContainer}>
                                    <KeyboardAwareScrollView style={{ flex: 1, }}>

                                        {
                                            imgOcrCar ?
                                                <View style={{ paddingTop: 10, paddingHorizontal: 20, borderRadius: 20 }}>
                                                    <Image source={{ uri: imgOcrCar.uri }} style={{
                                                        width: '100%',
                                                        borderRadius: 15,
                                                        overflow: "hidden",
                                                        height: heightPercentageToDP('30')
                                                    }} />
                                                    <TouchableOpacity onPress={() => handlePressTakePhoto()} style={{ position: 'absolute', flex: 1, justifyContent: 'center', alignSelf: 'center', height: heightPercentageToDP('30') }}>
                                                        <IconCameraBlurSvg width={64} height={64} />
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View>
                                                    <TouchableOpacity style={{ alignItems: 'center', paddingVertical: 20 }}
                                                                      onPress={() => handlePressTakePhoto()}>
                                                        <IconOCRCameraSvg width={64} height={64} style={{marginBottom: 5}} />
                                                        <Text style={{
                                                            color: TxtColor,
                                                            fontSize: 13,
                                                            textAlign: 'center',
                                                        }}>Chụp giấy đăng kiểm để hoàn tất thông tin nhanh hơn</Text>
                                                    </TouchableOpacity>
                                                    <View style={{
                                                        width: widthPercentageToDP('100'),
                                                        height: 8,
                                                        backgroundColor: '#f5f6f5',
                                                        left: -24,
                                                    }} />
                                                    <View style={{ paddingHorizontal: 24, paddingVertical: 10, alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 14, color: NewColor }}>Hoặc</Text>
                                                    </View>
                                                </View>
                                        }
                                        {/* <View style={{ marginHorizontal: 20 }}>
                                                <Text style={{  fontSize: 14, paddingTop: 10 }}>Điền thông tin: </Text>
                                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                                    <TouchableOpacity
                                                        onPress={() => handleChangeType('Y')}
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            paddingTop: 10,
                                                            flex: 1,
                                                        }}>
                                                        <Image
                                                            style={{ height: 15, width: 15 }}
                                                            resizeMode={'contain'}
                                                            source={
                                                                carStatus.value == 'Y'
                                                                    ? require('../../icons/iconAgent/single_select_active.png')
                                                                    : require('../../icons/iconAgent/single_select.png')
                                                            }
                                                        />
                                                        <Text style={{ marginLeft: 8, color: TxtColor }}>Kinh doanh</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => handleChangeType('N')}
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            paddingTop: 10,
                                                            flex: 1,
                                                        }}>
                                                        <Image
                                                            style={{ height: 15, width: 15 }}
                                                            resizeMode={'contain'}
                                                            source={
                                                                carStatus.value == 'N'
                                                                    ? require('../../icons/iconAgent/single_select_active.png')
                                                                    : require('../../icons/iconAgent/single_select.png')
                                                            }
                                                        />
                                                        <Text style={{ marginLeft: 8, color: TxtColor }}>Không kinh doanh</Text>
                                                    </TouchableOpacity>
                                            </View>
                                        </View> */}
                                        <View style={{ marginHorizontal: 20, marginTop: -10 }}>
                                            <Input
                                                baseColor={Color}
                                                label={'Họ tên chủ xe *'}
                                                value={fullName}
                                                keyboardType={'default'}
                                                error={errors?.fullName}
                                                onChangeText={(e) => changeTextFullName(e)}
                                            />
                                            <View style={{marginTop: -10}}>
                                                <Input
                                                    baseColor={Color}
                                                    label={'Địa chỉ đăng ký xe *'}
                                                    value={carRegistAddress}
                                                    keyboardType={'default'}
                                                    error={errors?.carRegistAddress}
                                                    onChangeText={(e) => changeTextCarRegistAddress(e)}
                                                />
                                            </View>

                                            <InputSelect
                                                label={'Mục đích sử dụng *'}
                                                openModal={() => checkOpenModal('purpose')}
                                                value={purpose_car?.label}
                                            />
                                            <InputSelect
                                                label={'Loại xe *'}
                                                openModal={() => checkOpenModal('typeCar')}
                                                value={typeCar?.value}
                                            />
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <View style={{ flex: 0.9 }}>
                                                    <InputSelect
                                                        label={'Hãng xe *'}
                                                        openModal={() => checkOpenModal('carBrand')}
                                                        value={carBrand?.name}
                                                    />
                                                </View>
                                                <View style={{ flex: 0.1 }}>

                                                </View>
                                                <View style={{ flex: 0.9 }}>
                                                    <InputSelect
                                                        checkDisabled={carBrandId ? false : true}
                                                        label={'Dòng xe *'}
                                                        openModal={() => checkOpenModal('carModel')}
                                                        value={carModel ? carModel?.name : ''}
                                                    />
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 0.9 }}>
                                                    <Input
                                                        label={'Năm sản xuất *'}
                                                        baseColor={Color}
                                                        value={year}
                                                        maxLength={4}
                                                        keyboardType={'number-pad'}
                                                        onChangeText={(e) => changeTextYear(e)}
                                                        error={errors?.year}
                                                    />
                                                </View>
                                                <View style={{ flex: 0.1 }}>

                                                </View>
                                                <View style={{ flex: 0.9 }}>
                                                    <Input
                                                        label={'Số chỗ ngồi *'}
                                                        value={seat}
                                                        baseColor={Color}
                                                        keyboardType={'number-pad'}
                                                        maxLength={2}
                                                        onChangeText={(e) => changeTextSeat(e)}
                                                        showSoChoNgoi={checkSoChoNgoi}
                                                        error={errors1?.seat}
                                                    />
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', marginTop: 10}}>
                                                <View style={{ flex: 0.9, marginTop: 5}}>
                                                    <InputSelect
                                                        label={'Tình trạng xe *'}
                                                        openModal={() => checkOpenModal('carStatus')}
                                                        value={carStatus?.label}
                                                    />
                                                </View>
                                                <View style={{ flex: 0.1 }}>

                                                </View>
                                                <View style={{ flex: 0.9 }}>
                                                    <Input label={'Biển số xe *'}
                                                           baseColor={Color}
                                                           onChangeText={(e) => changeLicensePlate(e)}
                                                           value={licensePlate}
                                                           error={errors3?.licensePlate}
                                                           autoCapitalize={'characters'} />
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row'}}>
                                                <View style={{ flex: 1, paddingRight: 5 }}>
                                                    <Input
                                                        baseColor={Color}
                                                        label={'Giá trị xe *'}
                                                        value={renderVND(valueCar)}
                                                        error={errors?.valueCar}
                                                        onChangeText={(e) => changeNumberValueCar(e)}
                                                        keyboardType={'number-pad'}
                                                        currency
                                                    />
                                                </View>
                                                <View style={{ flex: 0.1 }}></View>
                                                <View style={{ flex: 1, paddingRight: 5 }}>
                                                    <Input
                                                        baseColor={Color}
                                                        label={'Số tiền bảo hiểm *'}
                                                        value={renderVND(valueCashCar)}
                                                        error={errors?.valueCashCar}
                                                        onChangeText={(e) => changeNumberValueCashCar(e)}
                                                        keyboardType={'number-pad'}
                                                        currency
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
                                                <Image
                                                    style={{ height: 21, width: 21 }}
                                                    resizeMode={'contain'}
                                                    source={require('./assets/image/calculator.png')}
                                                />
                                                <Text style={{ color: TxtColor, fontSize: 18, fontWeight: 'bold', left: 10 }}>
                                                    Chọn gói bảo hiểm và tính phí:</Text>
                                            </View>
                                            <View style={styles.viewTable}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    padding: 10,
                                                    paddingVertical: 15,
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    backgroundColor: '#007CC4',

                                                }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 2 }}>
                                                        <Text style={{
                                                            color: '#ffffff',
                                                            fontSize: 14,
                                                            fontWeight: Platform === 'ios' ? 'bold' : 'bold',
                                                            marginLeft: 10,
                                                        }}>Bảo hiểm vật chất xe</Text>
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{
                                                            color: '#ffffff',
                                                            fontSize: 14,
                                                            fontWeight: Platform === 'ios' ? 'bold' : 'bold',
                                                            textAlign: 'right',
                                                        }}>
                                                            {formatVND(3800000)}đ
                                                        </Text>

                                                    </View>
                                                </View>

                                                <View style={{ paddingHorizontal: 10 }}>
                                                    <InputSelect
                                                        label={'Hiệu lực'}
                                                        checkDisabled={true}
                                                        value={durationCar}
                                                        openModal={() => checkOpenModal('feeTNDS')}
                                                    />
                                                </View>
                                                <View style={{ flexDirection: 'row', paddingHorizontal: 10, }}>
                                                    <View style={{ flex: 1, paddingRight: 5 }}>
                                                        <Input
                                                            baseColor={Color}
                                                            label={'Thời hạn từ *'}
                                                            name={'dateFrom'}
                                                            onChangeText={text => onChangeBuyerBirthday(formik, text)}
                                                            keyboardType={'number-pad'}
                                                            placeholder={'dd/mm/yyyy'}
                                                            maxLength={10}
                                                            value={formDate}
                                                        />
                                                    </View>
                                                    <View style={{ flex: 1, paddingLeft: 5 }}>
                                                        <FormikInput
                                                            baseColor={Color}
                                                            label={'Thời hạn đến *'}
                                                            name={'dateTo'}
                                                            keyboardType={'number-pad'}
                                                            placeholder={'dd/mm/yyyy'}
                                                            editable={false}
                                                            // onChangeText={text => onChagneDateTo(props, text)}
                                                            // onBlur={() => handleOnblurDateTo(props)}
                                                            disableColor={disableDateTo() == false ? '#F6F5F6' : ''}
                                                        />
                                                    </View>
                                                </View>



                                                {dataPackage.map((item, index) => {
                                                    return (
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            padding: 10,
                                                            paddingVertical: 15,
                                                            borderTopLeftRadius: 10,
                                                            borderTopRightRadius: 10,
                                                        }}>
                                                            <TouchableOpacity disabled={item.priority == 0 ? true : false}  onPress={() => checkTNLX(index)} style={{ flexDirection: 'row', flex: 2 }}>
                                                                {
                                                                    check.includes(index)
                                                                        ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                                                        : <IconBoxSvg width={20} height={20} color={NewColor} />
                                                                }
                                                                <Text style={{
                                                                    color: TxtColor,
                                                                    fontSize: 14,
                                                                    marginLeft: 10,
                                                                    marginTop: 3
                                                                }}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={{
                                                                    color: TxtColor,
                                                                    fontSize: 14,
                                                                    textAlign: 'right',
                                                                    marginTop: 3
                                                                }}>
                                                                    {formatVND(item.price, '.')}
                                                                    {/* {check == true ? formatVND(insuranceMoney?.feeVat, '.') : '0'} */}
                                                                    đ</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                })}
                                                {/* <View style={{ paddingHorizontal: 10, paddingVertical: 10, paddingBottom: 15 }}>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        // textAlign: 'justify',
                                                        color: TxtColor,
                                                        fontStyle: 'italic',
                                                    }}>Chú ý: Căn cứ theo Nghị định 03/2021/NĐ-CP ngày 15/01/2021, Thời hạn bảo hiểm TNDS Bắt buộc tối thiểu bằng 1 năm, tối đa bằng thời hạn đăng kiểm.</Text>
                                                </View> */}
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
                                                <Image
                                                    style={{ height: 21, width: 21 }}
                                                    resizeMode={'contain'}
                                                    source={require('./assets/image/discountPercentage.png')}
                                                />
                                                <Text style={{ color: '#007CC4', fontSize: 18, fontWeight: 'bold', left: 10 }}>
                                                    Chọn chương trình khuyến mãi:</Text>
                                            </View>

                                            <InputSelect
                                                label={'Chọn chương trình khuyến mãi *'}
                                                // openModal={() => checkOpenModal('purpose')}
                                                value={purpose_car?.label}
                                            />
                                            <View style={{marginTop: -10}}>
                                                <Input
                                                    baseColor={Color}
                                                    label={'Mã khuyến mãi *'}
                                                    value={year}
                                                    error={errors?.year}
                                                    onChangeText={(e) => changeTextYear(e)}
                                                />
                                            </View>
                                            <View style={{ paddingVertical: 20 }}>
                                                <TotalFee feeTNDS={feeTNDS} duration={duration} insuranceMoney={insuranceMoney} check={check} />
                                            </View>
                                        </View>
                                        <FooterButton>
                                            <Button
                                                // disabled={!typeCar || !carStatus || !seat || !year || !carModel || carBrand || purpose_car}
                                                // disabled={checkValidButtonNext(formik)}
                                                label={'TIẾP TỤC'}
                                                marginTop={10}
                                                onPress={() => saveAndNext(formik)}
                                            />
                                        </FooterButton>
                                    </KeyboardAwareScrollView>
                                </View>

                                <BaseModal
                                    open={openModal}
                                    forceUpdate={true}
                                    onPress={() => gotoLogin()}
                                    label={'ĐỒNG Ý'}
                                    text="Phiên bản đăng nhập đã hết hạn. Mời bạn đăng nhập lại."
                                />
                            </View>
                        )
                    }}
                </Formik>
            </KeyboardAwareScrollView>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ctBack: {
        marginTop: 25,
        padding: 24,
        position: 'absolute',
        left: 0,
    },
    icBack: {
        height: 15,
        width: (15 * 21) / 39,
    },
    title: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        height: 38,
        marginLeft: 30,
        marginBottom: 40,
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

        elevation: 3, backgroundColor: '#D9D9D9', borderTopLeftRadius: 10, borderTopRightRadius: 10,
    },
});

const mapStateToProps = state => ({
    state,
    infoCar: state?.tndsCar?.infoCar,
    imgOcrCar: state?.tndsCar?.imgOcrCar,
    checkOcr: state?.tndsCar?.checkOcr,
});

export default connect(mapStateToProps, {
    saveTNDSCarType, saveImageOcrCar, saveCHECK_OCR_AGAIN
})(InfomationCarPhysical);
