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
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, colorText, colorTitle, nameApp, NewColor, TxtColor, URL } from '../../config/System';
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
import ModalMotorBrand from './components/ModalMotorBrand';
import ModalMotorModel from './components/ModalMotorModel';
import ModalExpMotor from './components/ModalExpMotor';
import ModalInsuraceMoney from './components/ModalInsuranceMoney';
import {
    ERROR_ADDRESS_REQUIRED,
    ERROR_BIRTHDAY_FORMAT,
    ERROR_BIRTHDAY_REQUIRED,
    ERROR_COMPANY_TAXCODE_REQUIRED, ERROR_NAME_FORMAT, ERROR_NAME_REQUIRED, ERROR_NEXT_DATE,
} from '../../config/ErrorMessage';
import moment from 'moment';
import { checkLeapYear, checkMonth, renderVND, isFullNameExpand, isNewLicenseNumber } from '../../components/Functions';
import axios from 'axios';
import { formatVND } from '../../components/Functions';
import DatePicker from 'react-native-datepicker';

import { getMotorModelList, saveMotorTypePhysical } from './actions/motorActions';
import { validateName, validateIdentity, validateNumber } from '../../config/Validation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RNCamera } from 'react-native-camera';
import DeviceInfo from 'react-native-device-info';
import Loading from '../../components/Loading';
import Store from '../../services/Store';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";
import BaseModal from '../../components/BaseModal';
import { checkExpToken } from '../../config/decodeToken';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import DateFill from '../../components/dateTimeFill/DateFill';
import { convertToNumber, isMotorLicenseNumber } from './helpers';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX, roundNumber } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import { getDistrict } from '../CarInsurance/actions/car_Buy';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import IconCameraBlurSvg from '../../config/images/icons/IconCameraBlurSvg';
import IconCalculatorSvg from '../../config/images/icons/IconCalculatorSvg';
import IconOCRCameraSvg from '../../config/images/icons/IconOCRCameraSvg';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';
import SelectCompany from '../../components/listCompanySelect/SelectCompany';

let { width, height } = Dimensions.get('window');

function Package({ orgCodeUser, saveMotorTypePhysical, infoMotor, ocrImg, camera, getMotorModelList, getDistrict, idComSelected }) {
    const offset = useRef(new Animated.Value(0)).current;

    const [type, setType] = useState(1);
    const [modalMotorType, setModalMotorType] = useState(null);
    const [modalMotorBrand, setModalMotorBrand] = useState(null);
    const [modalMotorModel, setModalMotorModel] = useState(null);
    const [modalExpMotor, setModalExpMotor] = useState(null);
    const [modalInsuranceMoney, setModalInsuranceMoney] = useState(null);
    const [motorType, setMotorType] = useState('');
    const [duration, setDuration] = useState('');
    const [feeTNDS, setFeeTNDS] = useState('');
    const [insuranceMoney, setInsuranceMoney] = useState('');
    const [check, setCheck] = useState(false);
    const [dateTo, setDateTo] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [dataOcr, setDataOcr] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [frameNumber, setFrameNumber] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalProvince, setModalProvince] = useState(null);
    const [modalDistrict, setModalDistrict] = useState(null);
    const [valueCom, setValueCom] = useState(0);

    useEffect(() => {
        if (infoMotor) {
            setType(infoMotor?.type);
            setCheck(infoMotor?.check);
            setDateFrom(infoMotor?.info?.dateFrom);
            // formik.setFieldValue('dateFrom', infoMotor?.info?.dateFrom);
        }
    }, [infoMotor]);

    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
            if (checkExpToken(token) == false) {
                setOpenModal(true);
            }
        });
    }, []);

    useEffect(() => {

        if (ocrImg && camera) {
            new Store().getSession(Const.TOKEN).then(token => {
                let img = {
                    uri: ocrImg.uri,
                    name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
                    type: 'image/jpeg',
                };
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
                            getDataOcr(res?.data.data?.name);
                            setLoading(true);
                        }
                    })
                    .catch(error => {
                        setLoading(false);
                    });
            });
        }
    }, [ocrImg]);
    const getDataOcr = (nameImg) => {
        new Store().getSession(Const.TOKEN).then(token => {
            let url = `${URL}/api/ocr/v1/buckets/cloud-vision-inspection-certificate/images/${nameImg}/text?type=dangkyxemay`;
            console.log('urrr', url);
            fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
                .then(res => res.json())
                .then(res => {
                    //console.log(res)
                    if (res.data) {
                        // setFeeTNDS(res?.data);
                        setDataOcr(res?.data);
                        setLoading(false);
                    }
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
        });

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

    const validateYear = (values) => {
        let a = moment(new Date()).format('YYYY')
        if (values?.length == 4 && (Number(a) - Number(values)) < 0) {
            return false;
        }
        return true;
    };

    const validateLimitYear = (values) => {
        let a = moment(new Date()).format('YYYY');
        if (values?.length == 4 && (Number(a) - Number(values)) > 15) {
            return false
        }
        return true;
    };

    const validateValueCar = (values) => {
        if (convertToNumber(values) % 1000 !== 0) {
            return false;
        }
        return true;
    };

    const checkValidInsurMotor = (formik, valueInsurMotor, valueMotor) => {
        if (valueInsurMotor === '') {
            formik.setFieldValue('errInsurMotor', 'Không được bỏ trống');
        } else if (convertToNumber(valueInsurMotor) % 1000 !== 0) {
            formik.setFieldValue('errInsurMotor', 'Phải là bội của 1000');
        } else if (valueMotor > 0 && convertToNumber(valueInsurMotor) > convertToNumber(valueMotor)) {
            formik.setFieldValue('errInsurMotor', 'Số tiền bảo hiểm không lớn hơn giá trị xe');
        } else {
            formik.setFieldValue('errInsurMotor', '');
        }
    };

    const checkValidMotor = (formik, valueMotor, valueDefault) => {
        if (valueMotor === '') {
            formik.setFieldValue('errMotor', 'Không được bỏ trống');
        }
        // else if (convertToNumber(valueMotor) % 1000 !== 0) {
        //     formik.setFieldValue('errMotor', 'Phải là bội của 1000');
        // } 
        else if (valueDefault > 0 &&
            (((convertToNumber(valueMotor) - valueDefault) > 0.1 * valueDefault) ||
                ((valueDefault - convertToNumber(valueMotor)) > 0.1 * valueDefault))
        ) {
            formik.setFieldValue('errMotor', `Chênh lệch không quá 10% của giá trị xe dự tính: ${renderVND(valueDefault)}VNĐ`);
        } else {
            formik.setFieldValue('errMotor', '');
        }
    };

    const validation = Yup.object().shape({
        fullName: Yup.string()
            .strict(false)
            .trim()
            .test(
                'fullName',
                ERROR_NAME_FORMAT,
                values => isFullNameExpand(values), // => validate tên người mua, check ký tự đặc biệt
            )
            .required(ERROR_NAME_REQUIRED),
        licensePlate: Yup.string().when('check', {
            is: 1,
            then: Yup.string().required('Không được để trống')
                .test('licensePlate', 'Chỉ điền chữ cái và số, không bao gồm khoảng trắng và ký tự đặc biệt.', (
                    values,
                ) => isNewLicenseNumber(values)),
        }),
        frameNumber: Yup.string().when('check', {
            is: 2,
            then: Yup.string().required('Không được để trống')
                .test(
                    'frameNumber',
                    'Sai định dạng',
                    values => !validateNumber.test(values),
                ),
        }),
        vehicleNumber: Yup.string().when('check', {
            is: 2,
            then: Yup.string().required('Không được để trống')
                .test(
                    'vehicleNumber',
                    'Sai định dạng',
                    values => !validateNumber.test(values),
                ),
        }),
        ownerAddress: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),
        ownerProvince: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),
        ownerDistrict: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),
        motorBrand: Yup.string().required('Không được bỏ trống'),
        motorModel: Yup.string().required('Không được bỏ trống'),
        firstYearRegister: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('firstYearRegister', 'Sai định dạng', (
                values,
            ) => values?.length === 4)
            .test('firstYearRegister', 'Không lớn hơn năm hiện tại', (
                values,
            ) => validateYear(values))
            .test('firstYearRegister', 'Không được quá 15 năm', (
                values,
            ) => validateLimitYear(values)),
        dateFrom: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),

    });

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

    const hanldeChangeMotorType = (formik, data, status) => {
        formik.setFieldValue('motorType', data.value);
        if (status === 'reset') {
            formik.setFieldValue('motorBrand', '');
            formik.setFieldValue('motorBrandId', '');
            formik.setFieldValue('motorModel', '');
            formik.setFieldValue('motorModelId', '');
        }
        setMotorType(data);
    };
    const hanldeChangeMotorBrand = (formik, data) => {
        console.log('Brand ::: ', data);
        formik.setFieldValue('motorBrand', data.name);
        formik.setFieldValue('motorBrandId', data.id);
        formik.setFieldValue('motorModel', '');
        formik.setFieldValue('motorModelId', '');
        getMotorModelList(data.id, motorType);
    };
    const hanldeChangeMotorModel = (formik, data) => {
        console.log('Model ::: ', data);
        formik.setFieldValue('motorModel', data.name);
        formik.setFieldValue('motorModelId', data.id);
        if (formik.values.firstYearRegister?.length === 4) {
            let url = `${URL}/api/premium/v1/motor-value/model/${data.id}/year/${formik.values.firstYearRegister}`;
            axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    console.log('Gia xe may -:', res?.data);
                    if (res?.data?.code == '000') {
                        formik.setFieldValue('valueMotor', res?.data?.value);
                        formik.setFieldValue('valueInsurMotor', Math.floor(res?.data?.value / 1000) * 1000);
                        formik.setFieldValue('valueDefault', res?.data?.value);
                        formik.setFieldValue('errMotor', '');
                        formik.setFieldValue('errInsurMotor', '');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
    const hanldeBlurFirstYear = (formik) => {
        if (formik.values.firstYearRegister?.length === 4) {
            let url = `${URL}/api/premium/v1/motor-value/model/${formik.values.motorModelId}/year/${formik.values.firstYearRegister}`;
            axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    if (res?.data?.code == '000') {
                        formik.setFieldValue('valueMotor', res?.data?.value);
                        formik.setFieldValue('valueInsurMotor', Math.floor(res?.data?.value / 1000) * 1000);
                        formik.setFieldValue('valueDefault', res?.data?.value);
                        formik.setFieldValue('errMotor', '');
                        formik.setFieldValue('errInsurMotor', '');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
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
    const handleNext = (props) => {
        let params = {
            info: props?.values,
            valueCom,
            motorType: motorType || infoMotor?.motorType, duration, insuranceMoney, check, type, feeTNDS, dateTo, isValidPackage: true,
        };
        params.info.fullName = props.values.fullName.normalize().toUpperCase();
        Actions.BuyerMotorPhysical();
        saveMotorTypePhysical(params);
    };

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

    const gotoLogin = () => {
        setOpenModal(false);
        new Store().storeSession(Const.TOKEN, null);
        new Store().storeSession(Const.IS_LOGIN, null);
        Actions.LoginNew();
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
        saveMotorTypePhysical(params);
        Actions.CameraPhysical();
    };

    const renderHeight = () => {
        let a = DeviceInfo.getDeviceId();
        if (a.indexOf('iPhone') > -1) {
            let b = a.split('');
            b.splice(0, 6);
            let c = b.join('');
            if (c >= '10,6') {
                return 30;
            } else {
                return 15;
            }
        } else {
            return 15;
        }
    };

    // chọn tỉnh/tp
    const setProvince = async (data, props) => {
        if (props.values.ownerProvince !== data._name) {
            await props.setFieldValue('ownerProvince', data._name);
            await props.setFieldValue('ownerDistrict', '');
        }
        await getDistrict(data.id);
    };

    // chọn quận/huyện
    const setDistrict = async (data, props) => {
        if (props.values.ownerDistrict !== data._name) {
            await props.setFieldValue('ownerDistrict', data._name);
        }
    };

    const setDataFee = (data, props) => {
        props.setFieldValue('dataFee', data);
        getValueCom(data);
    };

    const getValueCom = (data) => {
        if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
            console.log('Phi xe may -:', data)
            new Store().getSession(Const.TOKEN).then(token => {
                const dataToken = jwt_decode(token);
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
                  "userId": dataToken?.userId || '',
                  "contractValue": data?.feeVat || 0,
                  "product": "M3",
                  "B": `${data?.fee || 0}`,
                  "V": `${data?.vat || 0}`,
                  "D": "0"
              }
              console.log('======URL', url)
              console.log('======BODY', body)
              fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: token,
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
        }
      };
  
    const headerZIndex = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [999, 1001, 1002],
            extrapolate: 'clamp'
        });

    return (
        <View style={styles.container}>
            {
                loading ? <Loading /> : null
            }
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}>
                <Animated.View style={{zIndex: headerZIndex}}>
                    <ImageHeaderScroll code={'M3'} offset={offset} />
                </Animated.View>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2012
                }}>
                    <TouchableOpacity
                        onPress={() => Actions.pop()}
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
                    <HeaderScroll code={'M3'} offset={offset} />
                </View>
                <ScrollView
                    style={{ zIndex: 1000 }}
                    contentContainerStyle={{
                        paddingTop: HEADER_MAX_HEIGHT
                    }}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: offset } } }]
                    )}>
                    <View style={styles.contentContainer}>
                        <Formik
                            initialValues={{
                                dateFrom: infoMotor?.info?.dateFrom || '',
                                check: infoMotor?.info?.check || 1,
                                fullName: dataOcr?.ownerFullname || infoMotor?.info?.fullName || '',
                                licensePlate: licensePlate || infoMotor?.info?.licensePlate || '',
                                motorExp: infoMotor?.info?.motorExp || '',
                                insuranceMoney: infoMotor?.info?.insuranceMoney || '',
                                motorType: infoMotor?.info?.motorType || '',
                                frameNumber: frameNumber || infoMotor?.info?.frameNumber || '',
                                vehicleNumber: vehicleNumber || infoMotor?.info?.vehicleNumber || '',
                                ownerAddress: dataOcr?.ownerAddress || infoMotor?.info?.ownerAddress,
                                ownerProvince: infoMotor?.info?.ownerProvince || '',
                                ownerDistrict: infoMotor?.info?.ownerDistrict || '',
                                valueDefault: infoMotor?.info?.valueDefault || '',
                                valueMotor: infoMotor?.info?.valueMotor || '',
                                valueInsurMotor: infoMotor?.info?.valueInsurMotor || '',
                                motorBrand: infoMotor?.info?.motorBrand || '',
                                motorBrandId: infoMotor?.info?.motorBrandId || 0,
                                motorModel: infoMotor?.info?.motorModel || 0,
                                motorModelId: infoMotor?.info?.motorModelId || 0,
                                firstYearRegister: infoMotor?.info?.firstYearRegister || 0,
                                errInsurMotor: '',
                                errMotor: '',
                                errModelTxt: '',
                                dataFee: infoMotor?.info?.dataFee || { fee01Status: 'active', fee02Status: 'active', fee03Status: 'active' },
                            }}
                            enableReinitialize={true}
                            validationSchema={validation}
                            isInitialValid={infoMotor?.isValidPackage || false}>
                            {props => {
                                return (
                                    <View>
                                        <SelectCompany productCode={'M3'} valueMargin />
                                        {
                                            ocrImg ? <View>
                                                <Image source={{ uri: ocrImg.uri }}
                                                    style={{
                                                        width: '100%',
                                                        borderRadius: 15,
                                                        overflow: 'hidden',
                                                        height: heightPercentageToDP('30'),
                                                    }} />
                                                <TouchableOpacity onPress={() => handlePressTakePhoto(props)} style={{
                                                    position: 'absolute',
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    height: heightPercentageToDP('30'),
                                                }}>
                                                    <IconCameraBlurSvg width={64} height={64} />
                                                </TouchableOpacity>
                                            </View> : <View>
                                                <TouchableOpacity style={{ alignItems: 'center', paddingBottom: 20 }}
                                                    onPress={() => handlePressTakePhoto(props)}>
                                                    <IconOCRCameraSvg width={64} height={64} style={{marginBottom: 4}} />
                                                    <Text style={{
                                                        color: TxtColor,
                                                        fontSize: 14,
                                                        width: widthPercentageToDP('100'),
                                                        textAlign: 'center',
                                                    }}>Chụp giấy đăng ký xe để hoàn tất thông tin nhanh hơn</Text>
                                                </TouchableOpacity>
                                                <View style={{
                                                    width: widthPercentageToDP('100'),
                                                    height: 8,
                                                    backgroundColor: '#f5f6f5',
                                                    left: -24,
                                                }} />
                                                <View style={{
                                                    paddingHorizontal: 24,
                                                    paddingTop: 18,
                                                    alignItems: 'center',
                                                }}>
                                                    <Text style={{ fontSize: 14, color: colorTitle }}>hoặc điền thông tin vào bảng dưới đây</Text>
                                                </View>
                                            </View>
                                        }

                                        <ModalProvince
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
                                        />
                                        <ModalMotorBrand
                                            open={modalMotorBrand}
                                            onClosed={() => setModalMotorBrand(null)}
                                            setMotorBrand={data => hanldeChangeMotorBrand(props, data)}
                                            onOpened={() => setModalMotorBrand(true)}
                                            brandId={props.values?.motorBrandId}
                                        />
                                        <ModalMotorModel
                                            open={modalMotorModel}
                                            onClosed={() => setModalMotorModel(null)}
                                            setMotorModel={data => hanldeChangeMotorModel(props, data)}
                                            onOpened={() => setModalMotorModel(true)}
                                            brandId={props.values?.motorBrandId}
                                            modelId={props.values?.motorModelId}
                                            motorType={motorType}
                                            setErrModel={(txt) => {
                                                console.log('motorModelErr:  ', txt)
                                                props.setFieldValue('errModelTxt', txt);
                                            }}
                                        />
                                        <ModalMotorType
                                            open={modalMotorType}
                                            onClosed={() => setModalMotorType(null)}
                                            setSex={(data, status) => hanldeChangeMotorType(props, data, status)}
                                            onOpened={() => setModalMotorType(true)}
                                        />
                                        <ModalExpMotor
                                            open={modalExpMotor}
                                            onClosed={() => setModalExpMotor(null)}
                                            setSex={data => hanldeChangeExpMotor(props, data)}
                                            onOpened={() => setModalExpMotor(true)}
                                        />
                                        <ModalInsuraceMoney
                                            open={modalInsuranceMoney}
                                            onClosed={() => setModalInsuranceMoney(null)}
                                            setSex={data => hanldeChangeInsuranceMoney(props, data)}
                                            onOpened={() => setModalInsuranceMoney(true)}
                                        />
                                        <FormikInput
                                            label={'Họ và tên chủ xe theo đăng ký *'}
                                            name={'fullName'}
                                            autoCapitalize={"characters"}
                                            onBlur={() => {
                                                props.setFieldValue('fullName', props.values.fullName.toUpperCase());
                                            }}
                                        />
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{flex: 1, paddingRight: 5}}>
                                                <FormikSelect
                                                    label={'Tỉnh/Thành phố *'}
                                                    name={'ownerProvince'}
                                                    openModal={() => setModalProvince(true)}
                                                />
                                            </View>
                                            <View style={{flex: 1, paddingLeft: 5}}>
                                                <FormikSelect
                                                    label={`Quận/Huyện${props.values.ownerProvince ? ' *' : ''}`}
                                                    name={'ownerDistrict'}
                                                    openModal={() => setModalDistrict(true)}
                                                    checkDisabled={!props.values.ownerProvince}
                                                    hideIcon={!props.values.ownerProvince}
                                                    baseColor={props.values.ownerProvince ? colorText : '#8D8C8D'}
                                                />
                                            </View>
                                        </View>
                                        <FormikInput
                                            label={'Địa chỉ theo đăng ký xe (Số nhà, phường, xã) *'}
                                            name={'ownerAddress'}
                                        />
                                        <FormikInput
                                            label={'Năm đăng ký lần đầu *'}
                                            name={'firstYearRegister'}
                                            maxLength={4}
                                            keyboardType={'number-pad'}
                                            onBlur={() => hanldeBlurFirstYear(props)}
                                        />
                                        <FormikSelect
                                            label={'Loại xe *'}
                                            name={'motorType'}
                                            openModal={() => setModalMotorType(true)}
                                        />
                                        <FormikSelect
                                            label={'Hãng xe *'}
                                            name={'motorBrand'}
                                            openModal={() => setModalMotorBrand(true)}
                                        />
                                        <FormikSelect
                                            label={'Hiệu xe *'}
                                            name={'motorModel'}
                                            openModal={() => setModalMotorModel(true)}
                                            checkDisabled={!props.values?.motorBrandId}
                                            hideIcon={!props.values?.motorBrandId}
                                            baseColor={props.values?.motorBrandId ? colorText : '#8D8C8D'}
                                        />
                                        {
                                            props.values.errModelTxt ?
                                                <Text style={{ color: 'rgb(213, 0, 0)', fontSize: 12 }}>{props.values.errModelTxt}</Text> : null
                                        }
                                        <View style={{ marginTop: 15 }}>
                                            <View>
                                                <Text style={{ color: colorText }}>Nhập thông tin *</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity
                                                    onPress={() => handleChangeType(props, 'type1')}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        paddingTop: 10,
                                                        flex: 1,
                                                    }}>
                                                    {
                                                        type == 1 ? (
                                                            <IconRadioBtnActiveSvg width={15} height={15} />
                                                        ) : (
                                                            <IconRadioBtnSvg width={15} height={15} />
                                                        )
                                                    }
                                                    <Text style={{ marginLeft: 8, color: TxtColor }}>Biển kiểm
                                                        soát</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => handleChangeType(props, 'type2')}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        paddingTop: 10,
                                                        flex: 1,
                                                    }}>
                                                    {
                                                        type == 2 ? (
                                                            <IconRadioBtnActiveSvg width={15} height={15} />
                                                        ) : (
                                                            <IconRadioBtnSvg width={15} height={15} />
                                                        )
                                                    }
                                                    <Text style={{ marginLeft: 8, color: TxtColor }}>Số khung, số
                                                        máy</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {
                                            type == 1 ?
                                                <FormikInput
                                                    label={'Biển kiểm soát *'}
                                                    name={'licensePlate'}
                                                    maxLength={10}
                                                    autoCapitalize={'characters'}
                                                    onBlur={() => {
                                                        props.setFieldValue('licensePlate', props.values.licensePlate.toUpperCase());
                                                    }}
                                                /> :
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 1, paddingRight: 5 }}>
                                                        <FormikInput
                                                            label={'Số khung *'}
                                                            name={'frameNumber'}
                                                            autoCapitalize={'characters'}
                                                            onBlur={() => {
                                                                props.setFieldValue('frameNumber', props.values.frameNumber.toUpperCase());
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={{ flex: 1, paddingLeft: 5 }}>
                                                        <FormikInput
                                                            label={'Số máy *'}
                                                            name={'vehicleNumber'}
                                                            autoCapitalize={'characters'}
                                                            onBlur={() => {
                                                                props.setFieldValue('vehicleNumber', props.values.vehicleNumber.toUpperCase());
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                        }
                                        <FormikInput
                                            label={'Giá trị xe *'}
                                            name={'valueMotor'}
                                            value={renderVND(props.values?.valueMotor)}
                                            onChangeText={(txt) => {
                                                props.setFieldValue('valueMotor', convertToNumber(txt));
                                                props.setFieldValue('valueInsurMotor', Math.floor(convertToNumber(txt) / 1000) * 1000);
                                                props.setFieldValue('errInsurMotor', '');
                                            }}
                                            onBlur={() => {
                                                checkValidMotor(props, props.values?.valueMotor, props.values?.valueDefault);
                                            }}
                                            error={props.values?.errMotor}
                                            keyboardType={'number-pad'}
                                            currency
                                        />
                                        <FormikInput
                                            label={'Số tiền bảo hiểm *'}
                                            name={'valueInsurMotor'}
                                            value={renderVND(props.values?.valueInsurMotor)}
                                            onChangeText={(txt) => {
                                                props.setFieldValue('valueInsurMotor', convertToNumber(txt));
                                            }}
                                            onBlur={() => {
                                                checkValidInsurMotor(props, props.values?.valueInsurMotor, props.values?.valueMotor);
                                            }}
                                            error={props.values?.errInsurMotor}
                                            keyboardType={'number-pad'}
                                            currency
                                        />
                                        <View style={styles.titleContainer}>
                                            <IconCalculatorSvg width={15} height={15} />
                                            <Text style={styles.titleStyle}>Chọn quyền lợi bảo hiểm và tính phí</Text>
                                        </View>
                                        <View>
                                            <FormikSelect
                                                label={'Hiệu lực *'}
                                                name={'motorExp'}
                                                openModal={() => setModalExpMotor(true)}
                                            />
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingBottom: 10,
                                            justifyContent: 'space-between',
                                        }}>
                                            <View style={{ width: '46%' }}>
                                                {/* <ModalTimePicker
                                                    dateDefault={new Date(moment().add(1, 'days').valueOf())}
                                                    minimumDate={new Date(moment().add(1, 'days').valueOf())}
                                                    onPicker={(text) => onChangeBuyerBirthday(props, text)}
                                                    onCancelPicker={() => handleOnblur(props)}
                                                >
                                                    <FormikInput
                                                        label={'Thời hạn từ *'}
                                                        name={'dateFrom'}
                                                        keyboardType={'number-pad'}
                                                        placeholder={'dd/mm/yyyy'}
                                                        placeholderTextColor={'black'}
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
                                                    minimumDate={moment().add(1, 'days').format('DD/MM/YYYY')}
                                                    errMinimum={ERROR_NEXT_DATE}
                                                    requireFill
                                                />
                                            </View>
                                            <View style={{ width: '46%' }}>
                                                <Input label={'Thời hạn đến'} keyboardType={'number-pad'}
                                                    baseColor={'#B3B2B3'}
                                                    textColor={'#8D8C8D'}
                                                    placeholder={'dd/mm/yyyy'} editable={false} value={dateTo} />
                                            </View>
                                        </View>
                                        <View style={{ paddingBottom: 20 }}>
                                            <TotalFee
                                                duration={duration}
                                                valueInsurMotor={props.values.valueInsurMotor}
                                                onSetFee={(data) => setDataFee(data, props)}
                                                dataFee={props.values.dataFee}
                                            />
                                        </View>
                                        {
                                            !nameApp.includes('EPTI') && !nameApp.includes('INSO') ? (
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    paddingVertical: 16,
                                                    paddingHorizontal: 12,
                                                    marginTop: 4,
                                                    marginBottom: 14,
                                                    borderRadius: 10,
                                                    borderWidth: 1,
                                                    borderColor: '#D9D9D9',
                                                    borderStyle: 'dashed',
                                                }}>
                                                    <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>Điểm</Text>
                                                    <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>{roundNumber(valueCom) / 1000}</Text>
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
                                                    !props.isValid ||
                                                    props.values.errDateFrom ||
                                                    !duration ||
                                                    props.values.errMotor.length > 0 ||
                                                    props.values.errInsurMotor.length > 0 ||
                                                    (props.values.dataFee?.fee01Status === '' && props.values.dataFee?.fee02Status === '' && props.values.dataFee?.fee03Status === '')
                                                }
                                            />
                                        </FooterButton>
                                    </View>
                                );
                            }}
                        </Formik>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <BaseModal
                open={openModal}
                forceUpdate={true}
                onPress={() => gotoLogin()}
                label={'ĐỒNG Ý'}
                text="Phiên bản đăng nhập đã hết hạn. Mời bạn đăng nhập lại."
            />

        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 24,
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
    animatedHeaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContent: {
        marginTop: isIPhoneX ? 15 : 5,
        padding: 24,
        position: 'absolute',
        left: 0,
        zIndex: 2012,
    },
    ctBack: {
        zIndex: 1002,
    },
    icBack: {
        height: 15,
        width: (15 * 21) / 39,
    },
    title: {
        flex: 1,
        zIndex: 1,
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
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    styleTab: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center',
    },
    viewTable: {
        shadowColor: '#c7c7c7',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.50,

        elevation: 1, backgroundColor: '#F6F5F6', borderTopLeftRadius: 10, borderTopRightRadius: 10,
    },
});


const mapStateToProps = state => {
    const idComSelected = state.selectCompany.idComSelected['M3'];
    return {
        idComSelected,
        infoMotor: state?.motorPhysical?.infoMotor,
        ocrImg: state?.motorPhysical?.ocrImg,
        orgCodeUser: state.userInfo.orgCodeUser,
    }
};

export default connect(mapStateToProps, {
    saveMotorTypePhysical, getMotorModelList, getDistrict
})(Package);


