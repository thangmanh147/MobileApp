import React, { useState, useEffect, useRef } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image, Platform,
    KeyboardAvoidingView, Animated,
    ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import {Color, colorPlaceholder, colorText, colorTitle, errValidColor, nameApp, textDisable, TxtColor, URL} from '../../config/System';
import { connect } from 'react-redux';
import Input from './components/Input';
import InputSelect from './components/InputSelect';
import NewModalTypeCarTNDS from '../../components/buy/NewModalTypeCarTNDS';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NewModalGetPurpose from '../../components/buy/NewModalGetPurpose';
import NewModalProducer from '../../components/buy/NewModalProducer';
import NewModalModel from '../../components/buy/NewModalModel';
import NewModalGetStatus from '../../components/buy/NewModalGetStatus';
import { saveTNDSCarType, saveFeeMotor, saveImageOcrCar, saveCHECK_OCR_AGAIN } from './actions/tndsCarActions';
import PackageTNDSCar from './Package';
import { checkCarIsTruck } from './helpers';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { validateInformationCar, validateInformationCarSeat, validateInformationCarchassisNumber, validateLoadCapacity, validateInformationCarLicenseNumber } from './components/Validate';
import { getCarTypeSuccess } from '../CarInsurance/actions/car_Buy';
import Loading from '../../components/Loading';
import Store from '../../services/Store';
import Const from '../../services/Const';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import { checkLeapYear, checkMonth } from '../../components/Functions';
import { diffMonth } from '../../utils/Validate';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import {ERROR_DATE_CURRENT, ERROR_NAME_FORMAT} from '../../config/ErrorMessage';
import {validateName} from '../../config/Validation';
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, makeId} from '../../utils/Util';
import { getDistrict } from '../CarInsurance/actions/car_Buy';
import { saveLogContract, logEventContract } from '../../actions/logContract';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import DateFill from '../../components/dateTimeFill/DateFill';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconCameraBlurSvg from '../../config/images/icons/IconCameraBlurSvg';
import IconCarSvg from '../../config/images/icons/IconCarSvg';
import IconOCRCameraSvg from '../../config/images/icons/IconOCRCameraSvg';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';

function InfomationCar({ 
    saveTNDSCarType, 
    saveCHECK_OCR_AGAIN, 
    checkOcr, 
    saveImageOcrCar, 
    imgOcrCar, 
    infoCar, 
    getDistrict, 
    saveLogContract, 
    contractLog,
    logEventContract,
    dataTokenInsur
}) {
    const offset = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0);
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
    const [registrationExp, setRegistrationExp] = useState('');
    // const [ownerAddress, setOwnerAddress] = useState('');
    // const [modalProvince, setModalProvince] = useState(null);
    // const [modalDistrict, setModalDistrict] = useState(null);
    // const [ownerProvince, setOwnerProvince] = useState('');
    // const [ownerDistrict, setOwnerDistrict] = useState('');
    // const [ownerFullName, setOwnerFullName] = useState('');
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
    }, []);

    useEffect(() => {
        if (infoCar) {
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
            // setOwnerAddress(infoCar?.ownerAddress)
            // setOwnerProvince(infoCar?.ownerProvince)
            // setOwnerDistrict(infoCar?.ownerDistrict)
            // setOwnerFullName(infoCar?.ownerFullName)
            setframeNumber(infoCar?.frameNumber || '');
            setvehicleNumber(infoCar?.vehicleNumber || '');
            setlicensePlate(infoCar?.licensePlate);

        } else {
            setpurpose_car({ value: 'N', label: 'Không kinh doanh' });
        }
    }, [infoCar]);
    const validation = Yup.object().shape({
        // registrationExp: Yup.string()
        //     .strict(false)
        //     .trim()
        //     .required('Không được bỏ trống'),

        // ownerAddress: Yup.string()
        //     .strict(false)
        //     .trim()
        //     .required('Không được bỏ trống'),
        // ownerProvince: Yup.string()
        //     .strict(false)
        //     .trim()
        //     .required('Không được bỏ trống'),
        // ownerDistrict: Yup.string()
        //     .strict(false)
        //     .trim()
        //     .required('Không được bỏ trống'),
        // ownerFullName: Yup.string()
        //     .strict(false)
        //     .trim()
        //     .test(
        //         'ownerFullName',
        //         ERROR_NAME_FORMAT,
        //         values => !validateName.test(values), // => validate tên người mua, check ký tự đặc biệt và chữ số
        //     )
        //     .required('Không được bỏ trống'),


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
            default:
                Alert.alert('NUMBER NOT FOUND');

        }
    };
    useEffect(() => {
        if ((imgOcrCar && !checkOcr) || (imgOcrCar && isLibrary)) {
            setLoading(true);
            new Store().getSession(Const.URL_ORC).then(urlORC => {
                new Store().getSession(Const.TOKEN).then(token => {
    
                    let img = { uri: imgOcrCar.uri, name: 'image.jpg', type: 'image/jpeg' }
                    let url = `${urlORC || URL}/api/ocr/v1/buckets/cloud-vision-inspection-certificate/images`;
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
                                // setFeeTNDS(res?.data);
                                getDataOcr(res?.data.data?.name)
                            } else setLoading(false)
                        })
                        .catch(error => {
                            setLoading(false)
    
                        });
                })
            })
        }
    }, [imgOcrCar]);
    const getDataOcr = (nameImg) => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/ocr/v1/buckets/cloud-vision-inspection-certificate/images/${nameImg}/text?type=dangkiem`;
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
                            // if (data?.ownerAddress) {
                            //     setOwnerAddress(data?.ownerAddress)
                            // }
                            // if (data?.ownerFullName) {
                            //     setOwnerFullName(data?.ownerFullName)
                            // }
                            setLoading(false)
                        } else setLoading(false)
                    })
                    .catch(error => {
                        console.log(error);
                        setLoading(false)
    
                    });
            })
        })
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
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/master-data/v1/cars/models?carName=${name}`
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
        })
    }
    const checkDatacarMark = (name) => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/master-data/v1/cars/brands?limit=400&brandName=${name}`
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
        })
    }
    const checkDatacarType = (name) => {
        let name2 = 'con'
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/attribute/v1/car-types?limit=200&name=${name2}`
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
        })
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
    const onChangeBuyerBirthday = (formik, text) => {
        formik.setFieldValue('registrationExp', text);
    };


    function checkValidButtonNext(formik) {
        if (typeCar == '' || purpose_car == '' || carBrand == '' ||
            carModel == '' || seat == '' || year == '' || carStatus == '' ||
            // carStatus.value == 'Y' && licensePlate == '' ||
            // carStatus.value == 'N' && frameNumber == '' ||
            // carStatus.value == 'N' && vehicleNumber == '' ||
            checkCarIsTruck(typeCar?.code) && loadCapacity == '' ||
            Object.keys(errors).length > 0 || Object.keys(errors1).length > 0 ||
            checkCarIsTruck(typeCar?.code) && Object.keys(errors2).length > 0 ||
            Object.keys(errors3).length > 0 ||
            Object.keys(errors4).length > 0 ||
            Object.keys(errors5).length > 0
        ) {
            return true;
        } else if (typeCar !== '' && purpose_car !== '' && carBrand !== ''
            && carModel !== '' && seat !== '' && year !== '' && carStatus !== ''
            && Object.keys(errors).length == 0 && Object.keys(errors1).length == 0
            && Object.keys(errors2).length == 0
            && Object.keys(errors3).length == 0
            && Object.keys(errors4).length == 0
            && Object.keys(errors5).length == 0) {
                return false;
        }
    }
    // const handleOnblur = (formik) => {
    //     if (formik?.values?.registrationExp?.length === 0) {
    //         formik.setFieldError('registrationExp', 'Không được bỏ trống')
    //     }
    // }

    const onSubmit = (formik) => {
        let params = {
            typeCar, purpose_car, carBrand, carModel, seat, year, carStatus, loadCapacity,
            vehicleNumber, frameNumber, licensePlate, registrationExp: formik?.values?.registrationExp, isValidInfo: true,
            // ownerAddress:formik?.values?.ownerAddress,
            // ownerProvince:formik?.values?.ownerProvince,
            // ownerDistrict:formik?.values?.ownerDistrict,
            // ownerFullName:formik?.values?.ownerFullName,
        };
        // params.ownerFullName = formik?.values?.ownerFullName.toUpperCase();
        saveTNDSCarType(params);
        saveCHECK_OCR_AGAIN(true);
        contractLog.key = 'PackageTNDSCar';
        contractLog.code = 'C1';
        contractLog.idLog = makeId(15);
        contractLog.statusCar = carStatus.value;
        contractLog.chassisNumber = frameNumber;
        contractLog.machineNumber = vehicleNumber;
        contractLog.licenseNumber = licensePlate;
        saveLogContract('C1', contractLog);
        logging(params);
        Actions.PackageTNDSCar();
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
            `${nameApp}_TNDS_OTO_EVENT_THONG_TIN_XE`,
            {
                carInfo: params,
                timerCounting: count / 1000,
            }
        );
    }

    const handlePressTakePhoto = () => {
        let params = {
            typeCar, purpose_car, carBrand, carModel, seat, year, carStatus, loadCapacity,
            vehicleNumber, frameNumber, licensePlate, registrationExp
        };
        saveTNDSCarType(params);
        saveCHECK_OCR_AGAIN(false)

        Actions.CameraCar();

    };
    const getBack = () => {
        Actions.IntroductionTNDSCar()
    }
    const handleChangeType = (name) => {
        if (name == 'Y') {
            setcarStatus({ value: "Y", label: "Đã có biển số" });
        } else if (name == 'N') {
            setcarStatus({ value: "N", label: "Chưa có biển số" });
        }
    };

//   // chọn tỉnh/tp
//   const setProvince = async (data, formik) => {
//     if (formik.values.ownerProvince !== data._name) {
//         await formik.setFieldValue('ownerProvince', data._name);
//         await formik.setFieldValue('ownerDistrict', '');
//       }
//     await getDistrict(data.id);
//   };

//   // chọn quận/huyện
//   const setDistrict = async (data, formik) => {
//     if (formik.values.ownerDistrict !== data._name) {
//         await formik.setFieldValue('ownerDistrict', data._name);
//       }
//   };

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
                await saveImageOcrCar({uri: image.path});
            })
            .catch();
    };

    const headerZIndex = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [999, 1001, 1002],
            extrapolate: 'clamp'
        });

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{flex: 1}}>
                <Formik
                    initialValues={{
                        registrationExp: registrationExp,
                        // ownerAddress: ownerAddress,
                        // ownerProvince: ownerProvince,
                        // ownerDistrict: ownerDistrict,
                        // ownerFullName: ownerFullName,
                    }}
                    validationSchema={validation}
                    isInitialValid={infoCar?.isValidInfo || false}
                    enableReinitialize={true}
                >
                    {formik => {
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
                                {/* <ModalProvince
                                  open={modalProvince}
                                  onClosed={() => setModalProvince(null)}
                                  setProvince={data => setProvince(data, formik)}
                                  onOpened={() => setModalProvince(true)}
                                  nameSelected={formik.values.ownerProvince}
                                />
                                <ModalDistrict
                                  open={modalDistrict}
                                  onClosed={() => setModalDistrict(null)}
                                  setDistrict={data => setDistrict(data, formik)}
                                  onOpened={() => setModalDistrict(true)}
                                  nameSelected={formik.values.ownerDistrict}
                                /> */}
                                <Animated.View style={{zIndex: headerZIndex}}>
                                    <ImageHeaderScroll code={'C1'} offset={offset} />
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
                                    <HeaderScroll code={'C1'} offset={offset} />
                                </View>
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
                                    style={{zIndex: 1000}}
                                    contentContainerStyle={{
                                        paddingTop: HEADER_MAX_HEIGHT
                                    }}
                                    scrollEventThrottle={16}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { y: offset } } }],
                                        { useNativeDriver: false }
                                    )}>
                                    <View style={styles.contentContainer}>
                                        <View style={styles.titleContainer}>
                                            <IconCarSvg width={15} height={15} />
                                            <Text style={styles.titleStyle}>Thông tin xe được bảo hiểm</Text>
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
                                                        handlePressTakePhoto();
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
                                                    <TouchableOpacity style={{ alignItems: 'center', paddingTop: 24, paddingBottom: 20 }}
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
                                                        backgroundColor: '#F6F5F6',
                                                    }} />
                                                    <View style={{ paddingHorizontal: 24, paddingTop: 20, alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 14, color: colorTitle }}>hoặc điền thông tin vào bảng dưới đây</Text>
                                                    </View>
                                                </View>
                                        }
                                        <View style={{ marginHorizontal: 24, marginTop: 24 }}>
                                            <Text style={{ color: TxtColor, fontSize: 14 }}>Mục đích sử dụng *</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                <TouchableOpacity
                                                    onPress={() => setType({ value: 'N', label: 'Không kinh doanh' }, 'purpose')}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        flex: 1,
                                                    }}>
                                                    {
                                                        purpose_car?.value == 'N' ? (
                                                            <IconRadioBtnActiveSvg width={15} height={15} />
                                                        ) : (
                                                            <IconRadioBtnSvg width={15} height={15} />
                                                        )
                                                    }
                                                    <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14 }}>Không kinh doanh</Text>
                                                </TouchableOpacity>
                                                <View style={{width: 24}} />
                                                <TouchableOpacity
                                                    onPress={() => setType({ value: 'Y', label: 'Kinh doanh' }, 'purpose')}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        flex: 1,
                                                    }}>
                                                    {
                                                        purpose_car?.value == 'Y' ? (
                                                            <IconRadioBtnActiveSvg width={15} height={15} />
                                                        ) : (
                                                            <IconRadioBtnSvg width={15} height={15} />
                                                        )
                                                    }
                                                    <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14 }}>Kinh doanh</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{marginTop: 5}}>
                                                <FormikSelect
                                                    label={'Loại xe *'}
                                                    openModal={() => checkOpenModal('typeCar')}
                                                    value={typeCar?.value}
                                                />
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <View style={{flex: 1}}>
                                                    <FormikSelect
                                                        label={'Hãng xe *'}
                                                        openModal={() => checkOpenModal('carBrand')}
                                                        value={carBrand?.name}
                                                    />
                                                </View>
                                                <View style={{width: 24}} />
                                                <View style={{flex: 1}}>
                                                    <FormikSelect
                                                        checkDisabled={carBrandId ? false : true}
                                                        hideIcon={!carBrandId}
                                                        baseColor={carBrandId ? colorText : textDisable}
                                                        label={'Dòng xe *'}
                                                        openModal={() => checkOpenModal('carModel')}
                                                        value={carModel ? carModel?.name : ''}
                                                    />
                                                </View>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <View style={{flex: 1}}>
                                                    <Input
                                                        label={'Năm sản xuất *'}
                                                        value={year}
                                                        maxLength={4}
                                                        keyboardType={'number-pad'}
                                                        onChangeText={(e) => changeTextYear(e)}
                                                        error={errors?.year}
                                                    />
                                                </View>
                                                <View style={{width: 24}} />
                                                <View style={{flex: 1}}>
                                                    <Input
                                                        label={'Số chỗ ngồi *'}
                                                        value={seat}
                                                        keyboardType={'number-pad'}
                                                        maxLength={2}
                                                        onChangeText={(e) => changeTextSeat(e)}
                                                        showSoChoNgoi={checkSoChoNgoi}
                                                        error={errors1?.seat}
                                                    />
                                                </View>
                                            </View>
                                            {/* <Text style={{ marginTop: 10, color: TxtColor, fontSize: 14 }}>Nhập thông tin *</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between'
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
                                                        <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14 }} numberOfLines={1}>Biển số xe</Text>
                                                    </TouchableOpacity>
                                                    <Text style={{ textAlign: 'right', color: colorText, fontSize: 14 }} numberOfLines={1}>hoặc</Text>
                                                </View>
                                                <View style={{width: 24}} />
                                                <TouchableOpacity
                                                    onPress={() => handleChangeType('N')}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        flex: 1,
                                                    }}>
                                                    {
                                                        carStatus.value == 'N' ? (
                                                            <IconRadioBtnActiveSvg width={15} height={15} />
                                                        ) : (
                                                            <IconRadioBtnSvg width={15} height={15} />
                                                        )
                                                    }
                                                    <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14 }} numberOfLines={1}>Số khung, số máy</Text>
                                                </TouchableOpacity>
                                            </View> */}
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 1 }}>
                                                    <Input
                                                        label={'Số khung'}
                                                        onChangeText={(e) => {
                                                            formik.setFieldValue('checkNf', false);
                                                            changeFrameNumber(e);
                                                        }}
                                                        error={errors4?.frameNumber}
                                                        value={frameNumber}
                                                        autoCapitalize={'characters'}
                                                        onBlur={() => {
                                                            setframeNumber(frameNumber.toUpperCase());
                                                        }}
                                                    />
                                                </View>
                                                <View style={{width: 24}} />
                                                <View style={{ flex: 1 }}>
                                                    <Input
                                                        label={'Số máy'}
                                                        onChangeText={(e) => {
                                                            formik.setFieldValue('checkNf', false);
                                                            changevehicleNumber(e);
                                                        }}
                                                        error={errors5?.vehicleNumber}
                                                        value={vehicleNumber}
                                                        autoCapitalize={'characters'}
                                                        onBlur={() => {
                                                            setvehicleNumber(vehicleNumber.toUpperCase());
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                            <Input
                                                label={'Biển số xe'}
                                                onChangeText={(e) => {
                                                    formik.setFieldValue('checkNf', false);
                                                    changeLicensePlate(e);
                                                }}
                                                value={licensePlate}
                                                maxLength={20}
                                                error={errors3?.licensePlate}
                                                autoCapitalize={'characters'}
                                                onBlur={() => {
                                                    setlicensePlate(licensePlate.toUpperCase());
                                                }}
                                            />
                                            {
                                                formik.values.checkNf ?
                                                    <Text style={{ color: errValidColor, fontSize: 14 }}>
                                                        Bạn phải điền Biển số xe hoặc Số khung-số máy
                                                    </Text>
                                                    : null
                                            }
                                            {/* {
                                                carStatus?.value == 'Y' ? (
                                                    <View style={{ marginTop: 5 }}>
                                                        <Input label={'Biển số xe *'}
                                                           onChangeText={(e) => changeLicensePlate(e)}
                                                           value={licensePlate}
                                                           maxLength={20}
                                                           error={errors3?.licensePlate}
                                                           autoCapitalize={'characters'}
                                                        />
                                                    </View>
                                                ) : null
                                            }
                                            {
                                                carStatus?.value == 'N' ? (
                                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                        <View style={{ flex: 1 }}>
                                                            <Input label={'Số khung *'}
                                                                onChangeText={(e) => changeFrameNumber(e)}
                                                                error={errors4?.frameNumber}
                                                                value={frameNumber} autoCapitalize={'characters'} />
                                                        </View>
                                                        <View style={{width: 24}} />
                                                        <View style={{ flex: 1 }}>
                                                            <Input label={'Số máy *'}
                                                                onChangeText={(e) => changevehicleNumber(e)}
                                                                error={errors5?.vehicleNumber}
                                                                value={vehicleNumber} autoCapitalize={'characters'} />
                                                        </View>
                                                    </View>
                                                ) : null
                                            } */}
                                            {
                                                typeCar ?
                                                    checkCarIsTruck(typeCar?.code) ?
                                                        <View>
                                                            <Input
                                                                label={'Trọng tải *'}
                                                                value={loadCapacity}
                                                                maxLength={5}
                                                                onChangeText={(e) => changeloadCapacity(e)}
                                                                error={errors2?.loadCapacity}
                                                                loadCapacity
                                                            />
                                                        </View> : null : null
                                            }
                                            {/* <ModalTimePicker
                                                dateDefault={new Date()}
                                                minimumDate={new Date()}
                                                onPicker={(text) => onChangeBuyerBirthday(formik, text)}
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
                                            {/* <View style={{marginTop: -10}}>
                                                <FormikInput
                                                    label={'Họ tên chủ xe *'}
                                                    name={'ownerFullName'}
                                                    autoCapitalize={"characters"}
                                                />
                                            </View> */}
                                            {/* <View style={{ flexDirection: 'row', marginTop: -10 }}>
                                                <View style={{ flex: 0.9 }}>
                                                    <FormikSelect
                                                        label={'Tỉnh/Thành phố *'}
                                                        name={'ownerProvince'}
                                                        openModal={() => setModalProvince(true)}
                                                    />
                                                </View>
                                                <View style={{ flex: 0.1 }}>

                                                </View>
                                                <View style={{ flex: 0.9 }}>
                                                    <FormikSelect
                                                        label={`Quận/Huyện${formik.values.ownerProvince ? ' *' : ''}`}
                                                        name={'ownerDistrict'}
                                                        openModal={() => setModalDistrict(true)}
                                                        checkDisabled={!formik.values.ownerProvince}
                                                        hideIcon={!formik.values.ownerProvince}
                                                        baseColor={formik.values.ownerProvince ? colorText : textDisable}
                                                    />
                                                </View>
                                            </View> */}
                                            {/* <View style={{marginTop: -10}}>
                                                <FormikInput
                                                    label={'Địa chỉ theo đăng ký xe (Số nhà, phường, xã) *'}
                                                    name={'ownerAddress'}
                                                />
                                            </View> */}
                                        </View>
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
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 24,
        paddingHorizontal: 24,
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTitle,
        marginLeft: 8,
    },
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
});

const mapStateToProps = state => ({
    state,
    infoCar: state?.tndsCar?.infoCar,
    imgOcrCar: state?.tndsCar?.imgOcrCar,
    checkOcr: state?.tndsCar?.checkOcr,
    contractLog: state.logContract.logContract['C1'] || {},
    dataTokenInsur: state.insurance.tokenInsur['C1'],
});

export default connect(mapStateToProps, {
    saveTNDSCarType, 
    saveImageOcrCar, 
    saveCHECK_OCR_AGAIN, 
    getDistrict, 
    saveLogContract,
    logEventContract
})(InfomationCar);
