import React, { useState, useEffect, useRef } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image, Dimensions,
    Platform,
    KeyboardAvoidingView,
    Animated,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, colorText, colorTitle, NewColor, URL, nameApp, TxtColor, textDisable, colorPlaceholder, colorNote, errValidColor, colorBoxBorder1, colorBoxBorder, colorBackground } from '../../config/System';
import { connect } from 'react-redux';
import Input from './components/Input';
import { validationPackage } from './components/Validate';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import InputSelect from './components/InputSelect';
import TotalFee from './TotalFee';
import SimpleToast from 'react-native-simple-toast';
import ModalMotorType from './components/ModalMotorType';
import ModalExpMotor from './components/ModalExpMotor';
import ModalInsuraceMoney from './components/ModalInsuranceMoney';
import {
    ERROR_ADDRESS_REQUIRED,
    ERROR_BIRTHDAY_FORMAT,
    ERROR_BIRTHDAY_REQUIRED,
    ERROR_COMPANY_TAXCODE_REQUIRED, ERROR_DATE_CURRENT, ERROR_NAME_FORMAT, ERROR_NAME_REQUIRED,
} from '../../config/ErrorMessage';
import moment from 'moment';
import { checkLeapYear, checkMonth, isNewLicenseNumber } from '../../components/Functions';
import axios from 'axios';
import { formatVND } from '../../components/Functions';
import DatePicker from 'react-native-datepicker';

import { saveMotorType, saveFeeMotor, saveBuyerMotor, saveImageOcr } from './actions/motorActions';
import { validateName, validateIdentity, validateNumber } from '../../config/Validation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RNCamera } from 'react-native-camera';
import DeviceInfo from 'react-native-device-info';
import jwt_decode from "jwt-decode";
import Loading from '../../components/Loading';
import Store from '../../services/Store';
import Const from '../../services/Const';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import DateFill from '../../components/dateTimeFill/DateFill';
import SelectCompany from '../../components/listCompanySelect/SelectCompany';
import { getDistrict } from '../CarInsurance/actions/car_Buy';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import { isMotorLicenseNumber } from '../MotorPhysical/helpers';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, makeId, roundNumber } from '../../utils/Util';
import { saveLogContract, logEventContract } from '../../actions/logContract';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconCameraBlurSvg from '../../config/images/icons/IconCameraBlurSvg';
import IconCalculatorSvg from '../../config/images/icons/IconCalculatorSvg';
import IconCheckboxBlurSvg from '../../config/images/icons/IconCheckboxBlurSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconOCRCameraSvg from '../../config/images/icons/IconOCRCameraSvg';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';
import Svg, { LinearGradient, Defs, Stop, Rect } from 'react-native-svg';

let { width, height } = Dimensions.get('window');

function Package({
    saveLogContract, 
    contractLog, 
    saveMotorType, 
    saveFeeMotor, 
    infoMotor, 
    ocrImg, 
    camera, 
    saveImageOcr, 
    getDistrict, 
    idComSelected,
    codeSelected,
    logEventContract,
    orgCodeUser,
    dataTokenInsur,
    promotionPrice,
}) {
    const offset = useRef(new Animated.Value(0)).current;


    const [type, setType] = useState(1);
    const [modalMotorType, setModalMotorType] = useState(null);
    const [modalExpMotor, setModalExpMotor] = useState(null);
    const [modalInsuranceMoney, setModalInsuranceMoney] = useState(null);
    const [motorType, setMotorType] = useState('');
    const [duration, setDuration] = useState('');
    const [feeTNDS, setFeeTNDS] = useState('');
    const [insuranceMoney, setInsuranceMoney] = useState('');
    const [check, setCheck] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [dateTo, setDateTo] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [dataOcr, setDataOcr] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [frameNumber, setFrameNumber] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalProvince, setModalProvince] = useState(null);
    const [modalDistrict, setModalDistrict] = useState(null);
    const [timerCount,setTimerCount] = useState(moment().valueOf());
    const [valueCom, setValueCom] = useState(0);
    const [valueComM2, setValueComM2] = useState(0);
    const [showModalImg, setShowModalImg] = useState(false);
    const [isLibrary, setIsLibrary] = useState(false);

    useEffect(() => {
        if (infoMotor) {
            setType(infoMotor?.type);
            setCheck(infoMotor?.check);
            setDateFrom(infoMotor?.info?.dateFrom);
            // formik.setFieldValue('dateFrom', infoMotor?.info?.dateFrom);
        }
    }, [infoMotor]);

    useEffect(() => {
        if (motorType && duration) {
            new Store().getSession(Const.TOKEN).then(token => {
                if (codeSelected === 'VNI') {
                    let url = `${URL}/api/contract/v1/vni/fee_motor`
                    let body = {
                        range: 'MVH',
                        motorType: motorType?.code,
                        numberSeat: 2,
                        duration: duration?.value,
                        value: "0"
                    }
                    console.log('======BODY-VNI:  ', body)
                    console.log('======URL-VNI:  ', url)
                    axios.post(url, body, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': dataTokenInsur?.token || token,
                        }
                    })
                        .then((res) => {
                            console.log('======RES-VNI:  ', res)
                            if (res?.data?.errorCode == "00" && res?.data?.data?.PhiCoVat > 0) {
                                setFeeTNDS({
                                    fee: res?.data?.data?.PhiChuaVat,
                                    feeVat: res?.data?.data?.PhiCoVat,
                                    vat: res?.data?.data?.PhiCoVat - res?.data?.data?.PhiChuaVat,
                                    tyle: res?.data?.data?.Tyle,
                                    vatTyle: res?.data?.data?.Vat,
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    callFeeLXPX();
                } else {
                    let url;
                    if (codeSelected === 'AAA') {
                        url = `${URL}/api/premium/v1/motor-premium/aaa/liability`;
                    } else {
                        url = `${URL}/api/premium/v1/motor-premium/liability?supplierCode=${codeSelected}`;
                    }
                    let body = {
                        'motor_type': motorType?.code,
                        'duration': duration?.value,
                    };
                    console.log('Body00:  ', body)
                    console.log('Url00:  ', url)
                    axios.post(url, body, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((res) => {
                            if (res.status == 200) {
                                console.log('Res00:  ', res?.data)
                                setFeeTNDS(res?.data);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
        }
    }, [motorType, duration, codeSelected]);

    useEffect(() => {
        if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
            getValueCom();
        }
    }, [feeTNDS]);

    useEffect(() => {
        if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
            if (check) {
                getValueComM2();
            }
        }
    }, [check, insuranceMoney, duration]);

    useEffect(() => {

        if ((ocrImg && camera) || (ocrImg && isLibrary)) {
            setLoading(true);
            new Store().getSession(Const.URL_ORC).then(urlORC => {
                new Store().getSession(Const.TOKEN).then(token => {
                    let img = {
                        uri: ocrImg.uri,
                        name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
                        type: 'image/jpeg',
                    };
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
                                getDataOcr(res?.data.data?.name);
                            } else setLoading(false);
                        })
                        .catch(error => {
                            setLoading(false);
                        });
                });
            })
        }
    }, [ocrImg]);

    const getValueCom = () => {
      new Store().getSession(Const.TOKEN).then(token => {
        const dataToken = jwt_decode(dataTokenInsur?.token || token);
        let url;
        if (nameApp.includes('MAILINH') || nameApp.includes('YCHI') || orgCodeUser === 'INSO' || orgCodeUser === 'DLJSC') {
            url = `${URL}/api/commission/v2/commissions/value`;
        } else {
            url = `${URL}/api/commission/v3/commissions/saler`;
        }
        let body = {
            "channelId": dataToken?.channelId || '',
            "supplierId": idComSelected || '',
            "agentId": dataToken?.organizationId || '',
            "userId": dataToken?.sub || '',
            "contractValue": feeTNDS?.feeVat || 0,
            "product": "M1",
            "B": `${feeTNDS?.fee || 0}`,
            "V": `${feeTNDS?.feeVat - feeTNDS?.fee}`,
            "D": "0"
        }
        console.log('======URL', url)
        console.log('======BODY', body)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: dataTokenInsur?.token || token,
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('======res', res)
                if (res.status == 200 || res.status == 'success') {
                  setValueCom(res?.data?.commission || 0);
                }
            })
            .catch((error) => {
                console.log(error)
            })
      });
    };

    const getValueComM2 = () => {
      new Store().getSession(Const.TOKEN).then(token => {
        const dataToken = jwt_decode(dataTokenInsur?.token || token);
        let url;
        if (nameApp.includes('MAILINH') || nameApp.includes('YCHI') || orgCodeUser === 'INSO' || orgCodeUser === 'DLJSC') {
            url = `${URL}/api/commission/v2/commissions/value`;
        } else {
            url = `${URL}/api/commission/v3/commissions/saler`;
        }
          let body = {
            "channelId": dataToken?.channelId || '',
            "supplierId": idComSelected || '',
            "agentId": dataToken?.organizationId || '',
            "userId": dataToken?.sub || '',
            "contractValue": insuranceMoney?.price * duration?.id || 0,
            "product": "M2",
            "B": `${insuranceMoney?.price * duration?.id || 0}`,
            "V": "0",
            "D": "0"
        }
        console.log('======URL11', url)
        console.log('======BODY11', body)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: dataTokenInsur?.token || token,
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('======res11', res)
                if (res.status == 200 || res.status == 'success') {
                  setValueComM2(res?.data?.commission || 0);
                }
            })
            .catch((error) => {
                console.log(error)
            })
      });
    };
  
    const getDataOcr = (nameImg) => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            new Store().getSession(Const.TOKEN).then(token => {
                let url = `${urlORC || URL}/api/ocr/v1/buckets/cloud-vision-inspection-certificate/images/${nameImg}/text?type=dangkyxemay`;
                console.log('urrr', url);
                fetch(url, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': dataTokenInsur?.token || token,
                    },
                })
                    .then(res => res.json())
                    .then(res => {
                        //console.log(res)
                        if (res.data) {
                            // setFeeTNDS(res?.data);
                            setDataOcr(res?.data);
                            setLoading(false);
                        } else setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        console.log(error);
                    });
            });
        })
    };


    useEffect(() => {
        if (dataOcr?.registrationNumber) {
            let a = dataOcr?.registrationNumber;
            let regex = /[^a-z0-9]/gi;
            setLicensePlate(a.replace(regex, ''));
        }

    }, [dataOcr?.registrationNumber]);

    useEffect(() => {
        if (dataOcr?.engineNumber) {
            let a = dataOcr?.engineNumber;
            let regex = /[^a-z0-9]/gi;
            setVehicleNumber(a.replace(regex, ''));
        }

    }, [dataOcr?.engineNumber]);

    useEffect(() => {
        if (dataOcr?.chassisNumber) {
            let a = dataOcr?.chassisNumber;
            let regex = /[^a-z0-9]/gi;
            setFrameNumber(a.replace(regex, ''));
        }

    }, [dataOcr?.chassisNumber]);

    useEffect(() => {
        const date = new Date();
        const parsedDate = moment(date, 'DD/MM/YYYY');
        const a = parsedDate.format('MM/DD/YYYY');
        setCurrentDate(a);
    }, []);

    const isMotorbikeLicenseNumber = (value) => {
        if (!value) {
            return false;
        }
        const regex = /^[0-9]{2}[a-zA-Z]{1}[0-9]{5,6}$/;
        return regex.test(value);
    };

    const validNumber = (value) => {
        if (!value) {
            return false;
        }
        const regex = /[^a-zA-Z0-9]/;
        return regex.test(value);
    };

    const validateDays = (value) => {
        let a = moment(value, 'DD/MM/YYYY').diff(moment(new Date), 'days');
        if (a < 0) {
            return false;
        } else {
            return true;
        }
    };

    const validation = Yup.object().shape({
        // fullName: Yup.string()
        //     .strict(false)
        //     .trim()
        //     .test(
        //         'fullName',
        //         ERROR_NAME_FORMAT,
        //         values => !validateName.test(values), // => validate tên người mua, check ký tự đặc biệt và chữ số
        //     )
        //     .required(ERROR_NAME_REQUIRED),
        // licensePlate: Yup.string().required('Không được để trống'),
        // licensePlate: Yup.string().when('check', {
        //     is: 1,
        //     then: Yup.string().required('Không được để trống')
        //         .test('licensePlate', 'Chỉ điền chữ cái và số, không bao gồm khoảng trắng và ký tự đặc biệt.', (
        //             values,
        //         ) => isNewLicenseNumber(values)),
        // }),
        // frameNumber: Yup.string().when('check', {
        //     is: 2,
        //     then: Yup.string().required('Không được để trống')
        //         .test(
        //             'frameNumber',
        //             'Sai định dạng',
        //             values => !validateNumber.test(values),
        //         ),
        // }),
        // vehicleNumber: Yup.string().when('check', {
        //     is: 2,
        //     then: Yup.string().required('Không được để trống')
        //         .test(
        //             'vehicleNumber',
        //             'Sai định dạng',
        //             values => !validateNumber.test(values),
        //         ),
        // }),
        licensePlate: Yup.string()
            .test('licensePlate', 'Chỉ điền chữ cái và số, không bao gồm khoảng trắng và ký tự đặc biệt.', (
                values,
            ) => isNewLicenseNumber(values)),
        frameNumber: Yup.string()
            .test(
                'frameNumber',
                'Sai định dạng',
                values => !validateNumber.test(values),
            ),
        vehicleNumber: Yup.string()
            .test(
                'vehicleNumber',
                'Sai định dạng',
                values => !validateNumber.test(values),
            ),
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
        dateFrom: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),

    });


    useEffect(() => {
        if (check == false) {
            if (!motorType || !duration) {
                setDisabled(true);
            } else {
                setDisabled(false);
            }
        } else if (check == true) {
            if (!motorType || !duration || !insuranceMoney) {
                setDisabled(true);
            } else {
                setDisabled(false);
            }
        }
    }, [motorType, duration, insuranceMoney, check]);

    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);
    // const FormikCheck = handleTextInput(InputSelect);

    const onChangeBuyerBirthday = (formik, text) => {
        formik.setFieldValue('dateFrom', text);
        changeDateTo(formik, text);
        setDateFrom(text);
    };

    const changeDateTo = (formik, text) => {
        let a = text;
        let b = moment(a, 'DD/MM/YYYY').add(duration?.value, 'months').format('DD/MM/YYYY');
        setDateTo(b);

    };

    useEffect(() => {
        if (dateFrom !== '') {
            let b = moment(dateFrom, 'DD/MM/YYYY').add(duration?.value, 'months').format('DD/MM/YYYY');
            setDateTo(b);
        }
    }, [duration]);

    const hanldeChangeMotorType = (formik, data) => {
        formik.setFieldValue('motorType', data.value || data.name);
        setMotorType(data);
    };
    const hanldeChangeExpMotor = (formik, data) => {
        formik.setFieldValue('motorExp', data.name);
        setDuration(data);
        changeDate(data?.value, formik);
    };
    const hanldeChangeInsuranceMoney = (formik, data) => {
        formik.setFieldValue('insuranceMoney', data?.name);
        setInsuranceMoney(data);
    };
    const onSubmit = (props) => {
        let params = {
            info: props?.values,
            valueCom,
            valueComM2,
            motorType, duration, insuranceMoney, check, type, feeTNDS, dateTo, isValidPackage: true,
        };
        contractLog.key = 'Buyer';
        contractLog.code = 'M1';
        contractLog.idLog = makeId(15);
        contractLog.statusCar = type === 1 ? 'Y' : 'N';
        contractLog.chassisNumber = props?.values?.frameNumber;
        contractLog.machineNumber = props?.values?.vehicleNumber;
        contractLog.licenseNumber = props?.values?.licensePlate;
        contractLog.priceInsur = check ?  (feeTNDS?.feeVat + insuranceMoney?.price*duration?.id) : (feeTNDS?.feeVat);
        contractLog.commission = check ?  (valueCom + valueComM2) : valueCom;
        saveLogContract('M1', contractLog);
        Actions.Buyer();
        saveMotorType(params);
        saveFeeMotor(feeTNDS);
        logging(params, feeTNDS);
    };

    const handleNext = (props) => {
        if (
            props.values.licensePlate?.length > 0 ||
            (props.values.frameNumber?.length > 0 && props.values.vehicleNumber?.length > 0)
        ) {
            props.setFieldValue('checkNf', false);
            onSubmit(props);
        } else {
            props.setFieldValue('checkNf', true);
        }
    };

    const logging = (params, feeTNDS) => {
        const timeEnd = moment().valueOf();
        const count = moment(timeEnd).diff(moment(timerCount), 'milliseconds');
        logEventContract(
            `${nameApp}_TNDS_XE_MAY_EVENT_THONG_TIN_XE_VA_PHI_BH`,
            {
                motorbikeInfo: params,
                fee: feeTNDS,
                timerCounting: count / 1000,
            }
        );
    }

    const changeDate = (data, formik) => {
        if (dateFrom !== '' && formik?.values?.dateFrom.length == 10) {
            if (validateDays(formik?.values?.dateFrom) == true) {
                let b = moment(formik?.values?.dateFrom, 'DD/MM/YYYY').add(data, 'months').format('DD/MM/YYYY');
                setDateTo(b);
            } else {
                formik.setFieldError('dateFrom', 'Phải lớn hơn hoặc bằng ngày hiện tại');
                setDateTo('');
                setDateFrom('');
            }

        }
    };

    const handleChangeType = (props, name) => {
        if (name == 'type1') {
            props.setFieldValue('check', 1);
            setType(1);
        } else if (name == 'type2') {
            props.setFieldValue('check', 2);
            setType(2);
        }
    };

    const handleOnblur = (formik) => {
        if (formik?.values?.dateFrom.length > 0 && formik?.values?.dateFrom.length !== 10) {
            formik.setFieldError('dateFrom', 'Sai định dạng');
        } else if (validateDays(formik?.values?.dateFrom) == false && formik?.values?.dateFrom.length == 10) {
            formik.setFieldError('dateFrom', 'Phải lớn hơn hoặc bằng ngày hiện tại');
            setDateTo('');
            setDateFrom('');
        }
    };

    const handlePressTakePhoto = (formik) => {
        let params = {
            info: formik?.values,
            motorType,
            duration,
            insuranceMoney,
            check,
            type,
            feeTNDS,
            dateTo,
            isValidPackage: !formik?.values?.dateFrom ? false : true,
        };
        saveMotorType(params);
        saveFeeMotor(feeTNDS);
        Actions.Camera();
    };

    const callFeeLXPX = () => {
        new Store().getSession(Const.TOKEN).then(token => {
            let url = `${URL}/api/contract/v1/vni/fee_motor`
            let body = {
                range: 'MVA',
                motorType: motorType?.code,
                numberSeat: 2,
                duration: 12,
                value: 10000000
            }
            console.log('======BODY-VNI-NNTX:  ', body)
            console.log('======URL-VNI-NNTX:  ', url)
            axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': dataTokenInsur?.token || token,
                }
            })
                .then((res) => {
                    console.log('======RES-VNI-NNTX: ', res)
                    if (res?.data?.errorCode == "00" && res?.data?.data?.PhiCoVat > 0) {
                        setInsuranceMoney({
                            price: res?.data?.data?.PhiChuaVat,
                            tyle: res?.data?.data?.Tyle,
                            vatTyle: res?.data?.data?.Vat,
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }

    // // chọn tỉnh/tp
    // const setProvince = async (data, props) => {
    //     if (props.values.ownerProvince !== data._name) {
    //         await props.setFieldValue('ownerProvince', data._name);
    //         await props.setFieldValue('ownerDistrict', '');
    //     }
    //     await getDistrict(data.id);
    // };

    // // chọn quận/huyện
    // const setDistrict = async (data, props) => {
    //     if (props.values.ownerDistrict !== data._name) {
    //         await props.setFieldValue('ownerDistrict', data._name);
    //     }
    // };

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
                await saveImageOcr({uri: image.path});
            })
            .catch();
    };
    
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
            {/* <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}> */}
                <View style={{zIndex: 1002}}>
                    <ImageHeaderScroll code={'M1'} offset={offset} anchorHeader />
                </View>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2012
                }}>
                    <TouchableOpacity
                        onPress={() => Actions.Introduction()}
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
                    <HeaderScroll code={'M1'} offset={offset} anchorHeader />
                </View>
                <View style={[styles.contentContainer, {zIndex: 1000, marginTop: HEADER_MIN_HEIGHT}]}>
                    <SelectCompany productCode={'M1'} showShadow />
                    <Formik
                        initialValues={{
                            dateFrom: infoMotor?.info?.dateFrom || '',
                            check: infoMotor?.info?.check || 1,
                            // fullName: dataOcr?.ownerFullname || infoMotor?.info?.fullName || '',
                            licensePlate: licensePlate || infoMotor?.info?.licensePlate || '',
                            motorExp: infoMotor?.info?.motorExp || '',
                            insuranceMoney: infoMotor?.info?.insuranceMoney || '',
                            motorType: infoMotor?.info?.motorType || '',
                            frameNumber: frameNumber || infoMotor?.info?.frameNumber || '',
                            vehicleNumber: vehicleNumber || infoMotor?.info?.vehicleNumber || '',
                            // ownerAddress: dataOcr?.ownerAddress || infoMotor?.info?.ownerAddress,
                            // ownerProvince: infoMotor?.info?.ownerProvince || '',
                            // ownerDistrict: infoMotor?.info?.ownerDistrict || '',
                        }}
                        enableReinitialize={true}
                        validationSchema={validation}
                        isInitialValid={infoMotor?.isValidPackage || false}>
                        {props => {
                            return (
                                <View style={{flex: 1}}>
                                    <ScrollView
                                        contentContainerStyle={{
                                            paddingHorizontal: 24
                                        }}
                                        scrollEventThrottle={16}
                                        onScroll={Animated.event(
                                            [{ nativeEvent: { contentOffset: { y: offset } } }],
                                            { useNativeDriver: false }
                                        )}>
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
                                                        handlePressTakePhoto(props);
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
                                            ocrImg ? 
                                            <View style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                paddingTop: nameApp === 'IAGENT' || nameApp === 'INSO' ? 8 : 0
                                            }}>
                                                <Image source={{ uri: ocrImg.uri }}
                                                    style={{
                                                        width: '100%',
                                                        borderRadius: 15,
                                                        overflow: 'hidden',
                                                        height: heightPercentageToDP('30'),
                                                    }} />
                                                <TouchableOpacity onPress={() => setShowModalImg(true)} style={{
                                                    position: 'absolute',
                                                }}>
                                                    <IconCameraBlurSvg width={64} height={64} />
                                                </TouchableOpacity>
                                            </View> : 
                                            <View>
                                                <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: -10, paddingBottom: 20 }}
                                                    onPress={() => setShowModalImg(true)}>
                                                    <IconOCRCameraSvg width={64} height={64} style={{marginBottom: 4}} />
                                                    <Text style={{
                                                        color: TxtColor,
                                                        fontSize: 14,
                                                        // fontWeight: 'bold',
                                                        // marginLeft: 10,
                                                        // paddingHorizontal:10,
                                                        textAlign: 'center',
                                                    }}>Chụp giấy đăng ký để hoàn tất thông tin nhanh hơn</Text>
                                                </TouchableOpacity>
                                                <View style={{
                                                    width: widthPercentageToDP('100'),
                                                    height: 8,
                                                    backgroundColor: '#F6F5F6',
                                                    left: -24,
                                                }} />
                                                <View style={{
                                                    paddingHorizontal: 24,
                                                    paddingTop: 20,
                                                    alignItems: 'center',
                                                }}>
                                                    <Text style={{ fontSize: 14, color: colorTitle }}>hoặc điền thông tin vào bảng dưới đây</Text>
                                                </View>
                                            </View>
                                        }

                                        {/* <ModalProvince
                                            open={modalProvince}
                                            onClosed={() => setModalProvince(null)}
                                            setProvince={data => setProvince(data, props)}
                                            onOpened={() => setModalProvince(true)}
                                            nameSelected={props.values.ownerProvince}
                                        />
                                        <ModalDistrict
                                            open={modalDistrict}
                                            onClosed={() => setModalDistrict(null)}
                                            setDistrict={data => setDistrict(data, props)}
                                            onOpened={() => setModalDistrict(true)}
                                            nameSelected={props.values.ownerDistrict}
                                        /> */}
                                        <ModalMotorType
                                            open={modalMotorType}
                                            onClosed={() => setModalMotorType(null)}
                                            setSex={data => hanldeChangeMotorType(props, data)}
                                            onOpened={() => setModalMotorType(true)}
                                            nameSelected={props.values.motorType}
                                            codeSelected={codeSelected}
                                        />
                                        <ModalExpMotor
                                            open={modalExpMotor}
                                            onClosed={() => setModalExpMotor(null)}
                                            setSex={data => hanldeChangeExpMotor(props, data)}
                                            onOpened={() => setModalExpMotor(true)}
                                            nameSelected={props.values.motorExp}
                                        />
                                        <ModalInsuraceMoney
                                            open={modalInsuranceMoney}
                                            onClosed={() => setModalInsuranceMoney(null)}
                                            setSex={data => hanldeChangeInsuranceMoney(props, data)}
                                            onOpened={() => setModalInsuranceMoney(true)}
                                            codeSelected={codeSelected}
                                            nameSelected={props.values.insuranceMoney}
                                        />
                                        {/* <FormikInput
                                            label={'Họ và tên chủ xe *'}
                                            name={'fullName'}
                                            autoCapitalize={'characters'}
                                        /> */}
                                        <View style={{ marginTop: 7 }}>
                                            <FormikSelect
                                                label={'Loại xe *'}
                                                name={'motorType'}
                                                openModal={() => setModalMotorType(true)}
                                            />
                                        </View>
                                        {/* <View style={{ marginTop: 8 }}>
                                            <View>
                                                <Text style={{ color: TxtColor, fontSize: 14 }}>Nhập thông tin *</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => handleChangeType(props, 'type1')}
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                        }}>
                                                        {
                                                            type == 1 ? (
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
                                                    onPress={() => handleChangeType(props, 'type2')}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        flex: 1,
                                                    }}>
                                                    {
                                                        type == 2 ? (
                                                            <IconRadioBtnActiveSvg width={15} height={15} />
                                                        ) : (
                                                            <IconRadioBtnSvg width={15} height={15} />
                                                        )
                                                    }
                                                    <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14 }} numberOfLines={1}>Số khung, số máy</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View> */}
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <FormikInput 
                                                    label={'Số khung'}
                                                    name={'frameNumber'}
                                                    autoCapitalize={'characters'}
                                                    onChangeText={() => props.setFieldValue('checkNf', false)}
                                                    onBlur={() => {
                                                        props.setFieldValue('frameNumber', props.values.frameNumber.toUpperCase());
                                                    }}
                                                />
                                            </View>
                                            <View style={{width: 24}} />
                                            <View style={{ flex: 1 }}>
                                                <FormikInput
                                                    label={'Số máy'}
                                                    name={'vehicleNumber'}
                                                    autoCapitalize={'characters'}
                                                    onChangeText={() => props.setFieldValue('checkNf', false)}
                                                    onBlur={() => {
                                                        props.setFieldValue('vehicleNumber', props.values.vehicleNumber.toUpperCase());
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <FormikInput
                                            label={'Biển số xe'}
                                            name={'licensePlate'}
                                            maxLength={20}
                                            autoCapitalize={'characters'}
                                            onChangeText={() => props.setFieldValue('checkNf', false)}
                                            onBlur={() => {
                                                props.setFieldValue('licensePlate', props.values.licensePlate.toUpperCase());
                                            }}
                                        />
                                        {
                                            props.values.checkNf ?
                                                <Text style={{ color: errValidColor, fontSize: 14 }}>
                                                    Bạn phải điền Biển số xe hoặc Số khung-số máy
                                                </Text>
                                                : null
                                        }
                                        {/* {
                                            type == 1 ? 
                                                <View style={{ marginTop: 5 }}>
                                                    <FormikInput label={'Biển số xe *'} name={'licensePlate'}
                                                        maxLength={20} autoCapitalize={'characters'} />
                                                </View> :
                                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                    <View style={{ flex: 1 }}>
                                                        <FormikInput label={'Số khung *'} name={'frameNumber'}
                                                            autoCapitalize={'characters'} />
                                                    </View>
                                                    <View style={{width: 24}} />
                                                    <View style={{ flex: 1 }}>
                                                        <FormikInput label={'Số máy *'} name={'vehicleNumber'}
                                                            autoCapitalize={'characters'} />
                                                    </View>
                                                </View>
                                        } */}
                                        {/* <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1, paddingRight: 5 }}>
                                                <FormikSelect
                                                    label={'Tỉnh/Thành phố *'}
                                                    name={'ownerProvince'}
                                                    openModal={() => setModalProvince(true)}
                                                />
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: 5 }}>
                                                <FormikSelect
                                                    label={`Quận/Huyện${props.values.ownerProvince ? ' *' : ''}`}
                                                    name={'ownerDistrict'}
                                                    openModal={() => setModalDistrict(true)}
                                                    checkDisabled={!props.values.ownerProvince}
                                                    hideIcon={!props.values.ownerProvince}
                                                    baseColor={props.values.ownerProvince ? colorText : textDisable}
                                                />
                                            </View>
                                        </View>
                                        <FormikInput
                                            label={'Địa chỉ theo đăng ký xe (Số nhà, phường, xã) *'}
                                            name={'ownerAddress'}
                                        /> */}
                                        <View style={styles.titleContainer}>
                                            <IconCalculatorSvg width={15} height={15} />
                                            <Text style={styles.titleStyle}>Chọn gói bảo hiểm và tính phí</Text>
                                        </View>
                                        <View style={styles.viewTable}>
                                            <View style={{
                                                flexDirection: 'row',
                                                paddingHorizontal: 12,
                                                paddingVertical: 8,
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                                backgroundColor: Color,
                                                alignItems: 'center'
                                            }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                                                    <IconCheckboxBlurSvg width={20} height={20} />
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        marginLeft: 8,
                                                    }}>Bảo hiểm TNDS bắt buộc</Text>
                                                </View>
                                                <View style={{ flex: 0.5 }}>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        textAlign: 'right',
                                                    }}>{formatVND(feeTNDS?.feeVat, '.')}VNĐ</Text>
                                                </View>
                                            </View>
                                            <View style={{ paddingHorizontal: 12, marginTop: 5 }}>
                                                <FormikSelect
                                                    label={'Hiệu lực *'}
                                                    name={'motorExp'}
                                                    openModal={() => setModalExpMotor(true)}
                                                />
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                paddingHorizontal: 12,
                                                paddingBottom: 10,
                                                justifyContent: 'space-between',
                                            }}>
                                                <View style={{ flex: 1 }}>
                                                    {/* <ModalTimePicker
                                                        dateDefault={new Date()}
                                                        minimumDate={new Date()}
                                                        onPicker={(text) => onChangeBuyerBirthday(props, text)}
                                                        onCancelPicker={() => handleOnblur(props)}
                                                    >
                                                        <FormikInput
                                                            label={'Thời hạn từ *'}
                                                            name={'dateFrom'}
                                                            keyboardType={'number-pad'}
                                                            placeholder={'dd/mm/yyyy'}
                                                            placeholderTextColor={colorPlaceholder}
                                                            maxLength={10}
                                                            editable={false}
                                                        />
                                                    </ModalTimePicker> */}
                                                    <DateFill
                                                        value={props.values.dateFrom}
                                                        onChange={(text, err) => {
                                                            props.setFieldValue('dateFrom', text);
                                                            props.setFieldValue('errDateFrom', err);
                                                            if (!err) {
                                                                changeDateTo(props, text);
                                                                setDateFrom(text);
                                                            }
                                                        }}
                                                        label={'Thời hạn từ *'}
                                                        minimumDate={moment().format('DD/MM/YYYY')}
                                                        errMinimum={ERROR_DATE_CURRENT}
                                                        requireFill
                                                    />
                                                </View>
                                                <View style={{width: 24}} />
                                                <View style={{ flex: 1 }}>
                                                    <Input label={'Thời hạn đến'} keyboardType={'number-pad'}
                                                        baseColor={textDisable}
                                                        textColor={textDisable}
                                                        placeholderTextColor={textDisable}
                                                        placeholder={'dd/mm/yyyy'}
                                                        editable={false}
                                                        value={dateTo}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[styles.viewTable, { marginTop: 16 }]}>
                                            <View style={{
                                                flexDirection: 'row',
                                                paddingHorizontal: 12,
                                                paddingVertical: 8,
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                                backgroundColor: Color,
                                                alignItems: 'center',
                                            }}>
                                                <TouchableOpacity onPress={() => setCheck(!check)} style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    flex: 0.5,
                                                }}>
                                                    {
                                                        check
                                                            ? <IconCheckedBoxSvg width={20} height={20} color={colorBoxBorder1} />
                                                            : <IconBoxSvg width={20} height={20} color={colorBoxBorder} />
                                                    }
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        marginLeft: 8,
                                                    }}>Bảo hiểm tai nạn người ngồi trên xe</Text>
                                                </TouchableOpacity>
                                                <View style={{ flex: 0.5 }}>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        textAlign: 'right',
                                                    }}>{check == true ? formatVND(insuranceMoney?.price * duration?.id, '.') : '0'}VNĐ</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingHorizontal: 12,
                                                    alignItems: 'center',
                                                    marginTop: 5,
                                                    justifyContent: 'space-between',
                                                }}>
                                                    <View style={{ flex: 1 }}>
                                                        {
                                                            codeSelected === 'VNI' ? (
                                                                <FormikSelect
                                                                    label={'Số tiền bảo hiểm *'}
                                                                    name={'insuranceMoney'}
                                                                    value={'10.000.000VNĐ'}
                                                                    checkDisabled
                                                                    // baseColor={textDisable}
                                                                    // textColor={textDisable}
                                                                    hideIcon
                                                                />
                                                            ) : (
                                                                <FormikSelect
                                                                    label={'Số tiền bảo hiểm *'}
                                                                    name={'insuranceMoney'}
                                                                    openModal={() => setModalInsuranceMoney(true)}
                                                                    checkDisabled={check == false ? true : false}
                                                                    baseColor={check ? colorText : textDisable}
                                                                    textColor={check ? TxtColor : textDisable}
                                                                    hideIcon={!check}
                                                                />
                                                            )
                                                        }
                                                    </View>
                                                    <View style={{width: 24}} />
                                                    <View style={{ flex: 1 }}>
                                                        <Input label={'Số người được bảo hiểm'} value={'2 người'}
                                                            baseColor={textDisable}
                                                            textColor={textDisable}
                                                            editable={false} />
                                                    </View>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingHorizontal: 12,
                                                    justifyContent: 'space-between',
                                                }}>
                                                    <View style={{ flex: 1 }}>
                                                        <Input label={'Thời hạn từ'} editable={false}
                                                            baseColor={textDisable}
                                                            textColor={textDisable}
                                                            placeholder={'dd/mm/yyyy'}
                                                            placeholderTextColor={textDisable}
                                                            value={dateFrom}
                                                        />
                                                    </View>
                                                    <View style={{width: 24}} />
                                                    <View style={{ flex: 1 }}>
                                                        <Input label={'Thời hạn đến'} editable={false}
                                                            baseColor={textDisable}
                                                            textColor={textDisable}
                                                            placeholder={'dd/mm/yyyy'}
                                                            placeholderTextColor={textDisable}
                                                            value={dateTo}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{ paddingHorizontal: 12, marginTop: 4, marginBottom: 16 }}>
                                                    <Text style={{
                                                        fontSize: 14,
                                                        lineHeight: 17.5,
                                                        color: colorNote,
                                                        fontStyle: nameApp.includes('YCHI') ? 'italic' : 'normal'
                                                    }}>
                                                        Chú ý: Thời hạn mua bảo hiểm người ngồi trên xe luôn bằng với thời gian mua bảo hiểm trách nhiệm dân sự bắt buộc    
                                                    </Text>
                                                </View>
                                            </View>

                                        </View>
                                        <View style={{ marginTop: 2 }}>
                                            <TotalFee feeTNDS={feeTNDS} duration={duration}
                                                promotionPrice={promotionPrice}
                                                insuranceMoney={insuranceMoney} check={check} />
                                        </View>
                                        {
                                            Platform.OS === 'android' ? (
                                                <View style={{marginHorizontal: -24}}>
                                                    <Svg height="8" width="100%" style={{ zIndex: 1 }}>
                                                        <Defs>
                                                            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                                                <Stop offset="0" stopColor="#e6e6e6" stopOpacity="1" />
                                                                <Stop offset="1" stopColor="#e6e6e6" stopOpacity="0.01" />
                                                            </LinearGradient>
                                                        </Defs>
                                                        <Rect height="8" width="100%" fill="url(#grad)" />
                                                    </Svg>
                                                    <View style={{paddingHorizontal: 24}}>
                                                        <View style={{ marginTop: -8, paddingTop: 12, backgroundColor: colorBackground, paddingHorizontal: 12, flexDirection: 'row', paddingBottom: 16 }}>
                                                            <View style={{flex:1}}>
                                                                <Text style={{color:TxtColor,fontSize:14,fontWeight:'bold'}}>Thanh toán</Text>
                                                            </View>
                                                            <View style={{flex:1,alignItems:'flex-end'}}>
                                                                <Text style={{color:colorNote,fontSize:14,fontWeight:'bold', textAlign: 'right'}}>
                                                                    {formatVND(check ? (feeTNDS?.feeVat - promotionPrice?.price || 0) + insuranceMoney?.price * duration?.id : (feeTNDS?.feeVat - promotionPrice?.price || 0))}VNĐ
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        {
                                                            !nameApp.includes('EPTI') && !nameApp.includes('INSO') ? (
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'space-between',
                                                                    paddingVertical: 16,
                                                                    paddingHorizontal: 12,
                                                                    marginTop: 24,
                                                                    borderRadius: 10,
                                                                    borderWidth: 1,
                                                                    borderColor: '#D9D9D9',
                                                                    borderStyle: 'dashed',
                                                                }}>
                                                                    <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>Điểm</Text>
                                                                    <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>{check ? roundNumber(valueCom + valueComM2) / 1000 : roundNumber(valueCom) / 1000}</Text>
                                                                </View>
                                                            ) : null
                                                        }
                                                        <FooterButton>
                                                            <Button
                                                                label={'TIẾP TỤC'}
                                                                marginTop={10}
                                                                width={'100%'}
                                                                onPress={() => handleNext(props)}
                                                                disabled={
                                                                    props.values.errDateFrom ||
                                                                    (props.isValid == true &&
                                                                    disabled == false ? false : true)
                                                                }
                                                            />
                                                        </FooterButton>
                                                    </View>
                                                </View>
                                            ) : null
                                        }
                                    </ScrollView>
                                    {
                                        Platform.OS === 'ios' ? (
                                            <>
                                                <Svg height="8" width="100%" style={{ zIndex: 1 }}>
                                                    <Defs>
                                                        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                                            <Stop offset="0" stopColor="#e6e6e6" stopOpacity="1" />
                                                            <Stop offset="1" stopColor="#e6e6e6" stopOpacity="0.01" />
                                                        </LinearGradient>
                                                    </Defs>
                                                    <Rect height="8" width="100%" fill="url(#grad)" />
                                                </Svg>
                                                <View style={{paddingHorizontal: 24}}>
                                                    <View style={{ marginTop: -8, paddingTop: 12, backgroundColor: colorBackground, paddingHorizontal: 12, flexDirection: 'row', paddingBottom: 16 }}>
                                                        <View style={{flex:1}}>
                                                            <Text style={{color:TxtColor,fontSize:14,fontWeight:'bold'}}>Thanh toán</Text>
                                                        </View>
                                                        <View style={{flex:1,alignItems:'flex-end'}}>
                                                            <Text style={{color:colorNote,fontSize:14,fontWeight:'bold', textAlign: 'right'}}>
                                                            {formatVND(check ? (feeTNDS?.feeVat - promotionPrice?.price || 0) + insuranceMoney?.price * duration?.id : (feeTNDS?.feeVat - promotionPrice?.price || 0))}VNĐ
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    {
                                                        !nameApp.includes('EPTI') && !nameApp.includes('INSO') ? (
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                                paddingVertical: 16,
                                                                paddingHorizontal: 12,
                                                                marginTop: 24,
                                                                borderRadius: 10,
                                                                borderWidth: 1,
                                                                borderColor: '#D9D9D9',
                                                                borderStyle: 'dashed',
                                                            }}>
                                                                <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>Điểm</Text>
                                                                <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>{check ? roundNumber(valueCom + valueComM2) / 1000 : roundNumber(valueCom) / 1000}</Text>
                                                            </View>
                                                        ) : null
                                                    }
                                                    <FooterButton>
                                                        <Button
                                                            label={'TIẾP TỤC'}
                                                            marginTop={10}
                                                            width={'100%'}
                                                            onPress={() => handleNext(props)}
                                                            disabled={
                                                                props.values.errDateFrom ||
                                                                (props.isValid == true &&
                                                                disabled == false ? false : true)
                                                            }
                                                        />
                                                    </FooterButton>
                                                </View>
                                            </>
                                        ) : null
                                    }
                                </View>
                            );
                        }}
                    </Formik>
                </View>
            {/* </KeyboardAvoidingView> */}
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        paddingBottom: 12,
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
        backgroundColor: '#ffff',
        paddingTop: 10,
    },
    viewTable: {
        backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
});


const mapStateToProps = state => {
    const listCompany = state.selectCompany.listCompany['M1'];
    const idComSelected = state.selectCompany.idComSelected['M1'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        infoMotor: state?.motor?.infoMotor,
        ocrImg: state?.motor?.ocrImg,
        idComSelected,
        codeSelected: obj?.insurOrg?.code || '',
        contractLog: state.logContract.logContract['M1'] || {},
        orgCodeUser: state.userInfo.orgCodeUser,
        dataTokenInsur: state.insurance.tokenInsur['M1'],
        promotionPrice: state.promotion.promotionPrice['M1'],
    };
};

export default connect(mapStateToProps, {
    saveMotorType, 
    saveFeeMotor, 
    saveBuyerMotor, 
    saveImageOcr, 
    getDistrict, 
    saveLogContract,
    logEventContract
})(Package);


