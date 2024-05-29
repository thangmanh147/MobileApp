import React, { useState, useEffect, useRef } from 'react';
import {
    Alert,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image, Platform,
    KeyboardAvoidingView, Animated,
    ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { Color, colorText, colorTitle, URL, nameApp, textDisable, colorNote, colorBoxBorder1, colorBoxBorder, TxtColor, colorBackground } from '../../config/System';
import { connect } from 'react-redux';
import Input from './components/Input';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import InputSelect from './components/InputSelect';
import TotalFee from './TotalFee';
import SimpleToast from 'react-native-simple-toast';
import ModalMotorType from './components/ModalMotorType';
import ModalExpMotor from './components/ModalExpMotor';
import ModalInsuraceMoney from './components/ModalInsuranceMoney';

import moment from 'moment';
import { checkLeapYear, checkMonth } from '../../components/Functions';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { formatVND, formatVNDTNDSCAR } from '../../components/Functions'

import { saveFeeTNDSCar, saveDurationTNDSCar, saveFeeLXPXCar } from './actions/tndsCarActions'
import { checkCarIsTruck } from './helpers'
import {heightPercentageToDP, widthPercentageToDP} from '../../config/ConfigResponsive';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { convertMonthDay, roundNumber } from '../../utils/Util'
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import SelectCompany from '../../components/listCompanySelect/SelectCompany';
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT} from '../../utils/Util';
import { saveLogContract, logEventContract } from '../../actions/logContract';
import DateFill from '../../components/dateTimeFill/DateFill';
import { ERROR_DATE_CURRENT } from '../../config/ErrorMessage';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconCalculatorSvg from '../../config/images/icons/IconCalculatorSvg';
import IconCheckboxBlurSvg from '../../config/images/icons/IconCheckboxBlurSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import Svg, { LinearGradient, Defs, Stop, Rect } from 'react-native-svg';

function PackageTNDSCar({ 
    saveLogContract, 
    contractLog, 
    saveFeeTNDSCar, 
    saveFeeLXPXCar, 
    infoCar, 
    saveDurationTNDSCar, 
    durationCar, 
    idComSelected,
    codeSelected,
    logEventContract,
    orgCodeUser,
    dataTokenInsur,
}) {
    const offset = useRef(new Animated.Value(0)).current;
    const [type, setType] = useState(1);
    const [modalMotorType, setModalMotorType] = useState(null)
    const [modalExpMotor, setModalExpMotor] = useState(null)
    const [modalInsuranceMoney, setModalInsuranceMoney] = useState(null)
    const [motorType, setMotorType] = useState('')
    const [duration, setDuration] = useState()
    const [feeTNDS, setFeeTNDS] = useState('')
    const [rawfeeTNDS, setrawfeeTNDS] = useState('')
    const [insuranceMoney, setInsuranceMoney] = useState(0)
    const [insuranceMoneyTNLXPX, setinsuranceMoneyTNLXPX] = useState('')
    const [seatParent, setSeatParent] = useState('')
    const [errorSeatParent, setErrorSeatParent] = useState('')
    const [check, setCheck] = useState(false)
    const [errorContent, setErrorContent] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [dateTo, setDateTo] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [currentDate, setCurrentDate] = useState('')
    const [showValidMoney, setshowValidMoney] = useState(false)
    const [timerCount,setTimerCount] = useState(moment().valueOf());
    const [valueCom, setValueCom] = useState(0);
    const [valueComC3, setValueComC3] = useState(0);
    const [statusAlert, setStatusAlert] = useState(false);

    useEffect(() => {
        if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
            getValueCom();
        }
    }, [feeTNDS]);

    useEffect(() => {
        if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
            if (check) {
                getValueComC3();
            }
        }
    }, [check, insuranceMoney]);

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
              "product": "C1",
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
  
    const getValueComC3 = () => {
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
                "contractValue": insuranceMoney?.feeVat || 0,
                "product": "C3",
                "B": `${insuranceMoney?.fee || 0}`,
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
                    setValueComC3(res?.data?.commission || 0);
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        });
    };
    
    useEffect(() => {
        if (durationCar) {
            setinsuranceMoneyTNLXPX(durationCar?.insuranceMoneyTNLXPX)
            setInsuranceMoney(durationCar?.insuranceMoney)
            setSeatParent(durationCar?.seatParent)
            setCheck(durationCar?.check)
            if (moment().diff(moment(durationCar?.dateFrom, 'DD/MM/YYYY'), 'days') > 0) {
                setDateFrom(moment().format('DD/MM/YYYY'))
                setDateTo(moment().add(12, 'months').format('DD/MM/YYYY'))
            } else {
                setDateFrom(durationCar?.dateFrom)
                setDateTo(durationCar?.dateTo)
            }
        } else {
            setDateFrom(moment().format('DD/MM/YYYY'))
            setDateTo(moment().add(12, 'months').format('DD/MM/YYYY'))
        }
    }, [durationCar])

    useEffect(() => {
        if (dateFrom && dateTo && infoCar?.typeCar?.code) {
            const isTruck = checkCarIsTruck(infoCar?.typeCar?.code)
            new Store().getSession(Const.TOKEN).then(token => {
                if (codeSelected === 'VNI') {
                    let url = `${URL}/api/contract/v1/fee-car-tnds`
                    let body = {
                        groupCar: infoCar?.typeCar?.code,
                        purpose: infoCar?.purpose_car?.value,
                        numberSeat: parseFloat(infoCar?.seat),
                        tonnage: isTruck && infoCar?.loadCapacity ? parseFloat(infoCar?.loadCapacity) : 0,
                        effectiveAt: dateFrom,
                        expiredAt: dateTo
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
                                    carTypeCode: res?.data?.data?.MaLoaiXe,
                                    vatTyle: res?.data?.data?.Vat,
                                })
                            } else {
                                if (!statusAlert) {
                                    setStatusAlert(true);
                                    Alert.alert('Thông báo', 'Không có gói bảo hiểm phù hợp,\nxin mời kiểm tra lại thông tin xe!', [
                                        {
                                            text: 'OK',
                                            onPress: () => {
                                                Actions.InfomationCar();
                                            },
                                        },
                                    ]);
                                }
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                } else {
                    // let url = `${URL}/api/premium/v1/car-premium/liability?supplierCode=${codeSelected}`
                    const dataToken = jwt_decode(token);
                    let url;
                    if (codeSelected === 'AAA') {
                        url = `${URL}/api/premium/v1/aaa/car-premium/liability-v2?organizationId=${dataToken?.organizationId || ''}&supplierCode=${codeSelected || ''}`
                    } else {
                        url = `${URL}/api/premium/v1/car-premium/liability-v2?organizationId=${dataToken?.organizationId || ''}&supplierCode=${codeSelected || ''}`
                    }
                    let body = {
                        car_type: infoCar?.typeCar?.code,
                        car_purpose: infoCar?.purpose_car?.value,
                        car_seat_number: parseFloat(infoCar?.seat),
                        car_manufacture_year: parseFloat(infoCar?.year),
                        car_weight: isTruck && infoCar?.loadCapacity ? parseFloat(infoCar?.loadCapacity) : 0,
                        start_date: dateFrom,
                        end_date: dateTo
                    }
                    console.log('======BODYCar:  ', body)
                    console.log('======URLCar:  ', url)
                    axios.post(url, body, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then((res) => {
                            console.log('======RES-API:  ', res?.data)
                            if (res.data.code == "000") {
                                setFeeTNDS(res?.data)
                            } else {
                                if (!statusAlert) {
                                    setStatusAlert(true);
                                    Alert.alert('Thông báo', 'Không có gói bảo hiểm phù hợp,\nxin mời kiểm tra lại thông tin xe!', [
                                        {
                                            text: 'OK',
                                            onPress: () => {
                                                Actions.InfomationCar();
                                            },
                                        },
                                    ]);
                                }
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            })
        }
    }, [dateFrom, dateTo, codeSelected])

    useEffect(() => {
        if (dateFrom) {
            callApiGetFee();
        }
    }, [codeSelected, dateFrom])

    useEffect(() => {
        const date = new Date();
        const parsedDate = moment(date, 'DD/MM/YYYY');
        const a = parsedDate.format('MM/DD/YYYY');
        setCurrentDate(a)
    }, [])

    const checkLength = (values) => {
        if (values?.length == 10) {
            return true
        } if (0 < values?.length < 10) {
            return false
        } else {
            return false
        }
    }

    const validation = Yup.object().shape({
        dateFrom: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),
        dateTo: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),
    });

    useEffect(() => {
        if (check == false) {
            if (!motorType && !duration) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        } else if (check == true) {
            if (!motorType && !duration && !insuranceMoney) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        }
    }, [motorType, duration, insuranceMoney, check])

    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);
    // const FormikCheck = handleTextInput(InputSelect);

    const onChangeBuyerBirthday = (formik, text) => {
        formik.setFieldValue('dateFrom', text);
        changeDateTo(formik, text);

    };

    // const onChagneDateTo = (formik, text) => {
    //     let str = text;
    //     if (text.length === 2 && formik.values.dateTo.charAt(2) !== '/') {
    //         let a = str.slice(0, 2);
    //         formik.setFieldValue('dateTo', (text += '/'));
    //         if (parseInt(a) > 31 || parseInt(a) == 0) {
    //             SimpleToast.show('Ngày không hợp lệ');
    //             formik.setFieldValue('dateTo', '');
    //         }
    //     } else if (
    //         text.length === 5 &&
    //         formik.values.dateTo.charAt(5) !== '/'
    //     ) {
    //         let a = str.slice(3, 5);
    //         formik.setFieldValue('dateTo', (text += '/'));
    //         if (parseInt(a) > 12 || parseInt(a) == 0) {
    //             SimpleToast.show('Tháng không hợp lệ');
    //             formik.setFieldValue(
    //                 'dateTo',
    //                 formik.values.dateTo.slice(0, 3),
    //             );
    //         }
    //     } else {
    //         formik.setFieldValue('dateTo', text);
    //     }
    // };
    /*
        @param
        @param string format DD/MM/YYYY
        @return
    */
    const changeDateTo = (formik, dateFromInput) => {
        let c = moment(dateFromInput, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY')
        formik.setFieldValue('dateTo', c)
        setDateTo(c)
    }

    const changeExp = (formik) => {
        formik.setFieldValue('motorExp', convertMonthDay(moment(formik?.values?.dateFrom, 'DD/MM/YYYY'), moment(formik?.values?.dateTo, 'DD/MM/YYYY')))
    }

    const hanldeChangeMotorType = (formik, data) => {
        formik.setFieldValue('motorType', data.value);
        setMotorType(data)
    }
    const hanldeChangeExpMotor = (formik, data) => {
        formik.setFieldValue('motorExp', data.name);
        // setFeeTNDS(data.id * rawfeeTNDS)
        setDuration(data)
    }
    const hanldeChangeInsuranceMoney = (formik, data) => {
        formik.setFieldValue('insuranceMoney', data.name);
        setInsuranceMoney(data)
    }
    const hanldeChangeInsuranceMoneyInput = (data) => {
        setinsuranceMoneyTNLXPX(data)
        // formik.setFieldValue('insuranceMoney', data.name);
        let dataInsuMoney = typeof data !== 'number' ? parseInt(data?.replace(/\./g, '')) : data
        if (!dataInsuMoney || dataInsuMoney === '') {
            setErrorContent('Bạn phải nhập số tiền bảo hiểm')
        } else if (dataInsuMoney % 1000 !== 0) {
            setErrorContent('Số tiền bảo hiểm không hợp lệ (phải là bội của 1000)')
        } else if (dataInsuMoney < 10000000) {
            setErrorContent('Số tiền bảo hiểm không nhỏ hơn 10.000.000VNĐ')
        } else {
            setErrorContent('')
        }
    }

    const handleChangeSeatParent = (text) => {
        setSeatParent(text);
        if (!text || text === '') {
            setErrorSeatParent('Bạn phải nhập số chỗ ngồi được bảo hiểm')
        } else if (infoCar?.seat < text) {
            setErrorSeatParent('Số chỗ ngồi được bảo hiểm vượt quá số chỗ ngồi của xe')
        } else {
            setErrorSeatParent('')
        }
    }

    const handleNext = (props) => {
        let dataInsuMoney = typeof insuranceMoneyTNLXPX !== 'number' ? parseInt(insuranceMoneyTNLXPX?.replace(/\./g, '')) : insuranceMoneyTNLXPX

        let dura = {
            info: props?.values,
            insuranceMoneyTNLXPX: dataInsuMoney,
            seatParent,
            valueCom,
            valueComC3,
            duration: {
                name: '12 tháng',
                id: 1,
                value:12
            }, check, type, feeTNDS, dateTo: dateTo, dateFrom: dateFrom, insuranceMoney,
        }
        console.log('NeXT --- ', dura);
        contractLog.key = 'BuyerCar';
        contractLog.priceInsur = check ?  (feeTNDS?.feeVat + insuranceMoney?.feeVat) : (feeTNDS?.feeVat);
        contractLog.commission = check ?  (valueCom + valueComC3) : valueCom; 
        saveLogContract('C1', contractLog);
        Actions.BuyerCar()
        saveFeeTNDSCar(feeTNDS)
        // saveFeeLXPXCar(insuranceMoney)
        saveDurationTNDSCar(dura)
        logging(feeTNDS, {
            type, dateTo: props?.values?.dateTo, dateFrom: props?.values?.dateFrom
        });
    }

    const logging = (feeTNDS, dura) => {
        const timeEnd = moment().valueOf();
        const count = moment(timeEnd).diff(moment(timerCount), 'milliseconds');
        logEventContract(
            `${nameApp}_TNDS_OTO_EVENT_PHI_BAO_HIEM`,
            {
                fee: feeTNDS,
                infoFee: dura,
                timerCounting: count / 1000,
            }
        );
    }

    const callApiGetFee = () => {
        let dataInsuMoney = typeof insuranceMoneyTNLXPX !== 'number' ? parseInt(insuranceMoneyTNLXPX?.replace(/\./g, '')) : insuranceMoneyTNLXPX
        if (
            dataInsuMoney >= 10000000 &&
            ((infoCar?.typeCar?.value?.toUpperCase()?.includes('TAXI') && seatParent > 0) ||
            (!infoCar?.typeCar?.value?.toUpperCase()?.includes('TAXI') && seatParent === ''))
        ) {
            // setshowValidMoney(false)
            new Store().getSession(Const.TOKEN).then(token => {
                if (codeSelected === 'VNI') {
                    let body = {
                        insuranceValue: parseInt(dataInsuMoney),
                        numberSeat: parseInt(seatParent) || parseInt(infoCar?.seat),
                        effectiveAt: dateFrom,
                        expiredAt: dateTo,
                    }
                    let url = `${URL}/api/contract/v1/fee-car-tnlp`
                    console.log('BODY LXPX VNI:', body);
                    console.log('URL LXPX VNI:', url);
                    axios.post(url, body, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': dataTokenInsur?.token || token,
                        }
                    })
                        .then((res) => {
                            console.log('RES LXPX VNI:', res);
                            if (res?.data?.errorCode == "00") {
                                setInsuranceMoney({
                                    fee: res?.data?.data?.PhiChuaVat,
                                    feeVat: res?.data?.data?.PhiCoVat,
                                    vat: res?.data?.data?.PhiCoVat - res?.data?.data?.PhiChuaVat,
                                    tyle: res?.data?.data?.Tyle
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                } else {
                    let body = {
                        "insurance_value": parseInt(dataInsuMoney),
                        "car_seat_number": parseInt(seatParent) || parseInt(infoCar?.seat),
                        "start_date": dateFrom,
                        "end_date": dateTo
                    }
                    let url = `${URL}/api/premium/v1/car-premium/accident?supplierCode=${codeSelected}`
                    console.log('BODY LXPX:', body);
                    console.log('URL LXPX:', url);
                    axios.post(url, body, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then((res) => {
                            if (res.data.code == "000") {
                                console.log('RES LXPX:', res.data);
                                setInsuranceMoney(res.data)
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            })
        }
    }


    const checkTNLX = () => {
        // if (insuranceMoneyTNLXPX == '') {
        //     setinsuranceMoneyTNLXPX(10000000)
        // }
        // callApiGetFee()
        setinsuranceMoneyTNLXPX('')
        setInsuranceMoney(0)
        setSeatParent('')
        setErrorContent('Bạn phải nhập số tiền bảo hiểm')
        setErrorSeatParent('Bạn phải nhập số chỗ ngồi được bảo hiểm')
        setCheck(!check)
    }


    const disabledButton = (formik) => {
        if (check == false) {
            return !formik.isValid && feeTNDS?.feeVat > 0
        } else if (check == true) {
            if (
                !formik.isValid ||
                insuranceMoneyTNLXPX === ''||
                errorContent?.length > 0 ||
                (infoCar?.typeCar?.value?.toUpperCase()?.includes('TAXI') &&
                    (seatParent === '' || errorSeatParent?.length > 0))
            ) {
                return true;
            } else {
                return false;
            }
        }
    }

    const renderInitValuesExp = () => {
        let a = moment().format()
        let b = moment(a).format('DD/MM/YYYY')
        if (durationCar?.info?.motorExp) {
            return durationCar?.info?.motorExp
        } else {
            if (moment(infoCar?.registrationExp, 'DD/MM/YYYY').diff(moment().format(), 'months', true) <= 12) {
                return '12 tháng'
            } else {
                return convertMonthDay(moment(b,'DD/MM/YYYY'), moment(infoCar?.registrationExp, 'DD/MM/YYYY'))
            }
        }
    }

    const renderInitDateTo = () => {
        if (durationCar?.dateTo) {
            return durationCar?.dateTo
        } else {
            return moment(moment().format()).add(12, 'months').format('DD/MM/YYYY')
        }
    }

    return (
        <View style={styles.container}>
            {/* <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{flex: 1}}> */}
                <View style={{zIndex: 1002}}>
                    <ImageHeaderScroll code={'C1'} offset={offset} anchorHeader />
                </View>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2012
                }}>
                    <TouchableOpacity
                        onPress={() => Actions.InfomationCar()}
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
                    <HeaderScroll code={'C1'} offset={offset} anchorHeader />
                </View>
                <View style={[styles.contentContainer, {zIndex: 1000, marginTop: HEADER_MIN_HEIGHT}]}>
                    <SelectCompany productCode={'C1'} showShadow />
                    <Formik
                        initialValues={{
                            dateFrom: durationCar?.dateFrom || moment().format('DD/MM/YYYY'),
                            dateTo: renderInitDateTo() || '',
                            licensePlate: durationCar?.info?.licensePlate || '',
                            motorExp: renderInitValuesExp()
                        }}
                        validationSchema={validation}>
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
                                        <ModalMotorType
                                            open={modalMotorType}
                                            onClosed={() => setModalMotorType(null)}
                                            setSex={data => hanldeChangeMotorType(props, data)}
                                            onOpened={() => setModalMotorType(true)}
                                        />
                                        {/* <ModalExpMotor
                                        open={modalExpMotor}
                                        onClosed={() => setModalExpMotor(null)}
                                        setSex={data => hanldeChangeExpMotor(props, data)}
                                        onOpened={() => setModalExpMotor(true)}
                                    /> */}
                                        <ModalInsuraceMoney
                                            open={modalInsuranceMoney}
                                            onClosed={() => setModalInsuranceMoney(null)}
                                            setSex={data => hanldeChangeInsuranceMoney(props, data)}
                                            onOpened={() => setModalInsuranceMoney(true)}
                                        />
                                        <View style={[styles.titleContainer, {
                                            paddingTop: nameApp === 'IAGENT' || nameApp === 'INSO' ? 4 : 0
                                        }]}>
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
                                                alignItems: 'center',
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
                                                    }}>{formatVND(feeTNDS?.feeVat)}VNĐ</Text>
                                                </View>
                                            </View>
                                            <View style={{ paddingHorizontal: 12, marginTop: 5 }}>
                                                <FormikInput
                                                    label={'Số tháng hiệu lực'}
                                                    value={'12 tháng'}
                                                    editable={false}
                                                    baseColor={textDisable}
                                                    textColor={textDisable}
                                                />
                                            </View>
                                            <View style={{ flexDirection: 'row', paddingHorizontal: 12 }}>
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
                                                            maxLength={10}
                                                            editable={false}
                                                        />
                                                    </ModalTimePicker> */}
                                                    <DateFill
                                                        value={props.values.dateFrom}
                                                        onChange={(text, err) => {
                                                            setDateFrom(text);
                                                            props.setFieldValue('dateFrom', text);
                                                            props.setFieldValue('errDateFrom', err);
                                                            if (!err) {
                                                                changeDateTo(props, text);
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
                                                    <FormikInput
                                                        label={'Thời hạn đến'}
                                                        name={'dateTo'}
                                                        keyboardType={'number-pad'}
                                                        placeholder={'dd/mm/yyyy'}
                                                        // onChangeText={text => onChagneDateTo(props, text)}
                                                        // onBlur={() => handleOnblurDateTo(props)}
                                                        editable={false}
                                                        baseColor={textDisable}
                                                        textColor={textDisable}
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
                                                    Chú ý: Thời hạn hiệu lực bảo hiểm tai nạn lái xe, phụ xe, người ngồi trên xe luôn bằng với thời hạn hiệu lực bảo hiểm Trách nhiệm dân sự bắt buộc
                                                </Text>
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
                                                <TouchableOpacity onPress={() => checkTNLX()} style={{ flexDirection: 'row', flex: 0.5, alignItems: 'center' }}>
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
                                                    }}>Bảo hiểm TNLXPX và người ngồi trên xe</Text>
                                                </TouchableOpacity>
                                                <View style={{ flex: 0.5 }}>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        textAlign: 'right',
                                                    }}>{check == true ? formatVND(insuranceMoney?.feeVat, '.') : '0'}VNĐ</Text>
                                                </View>
                                            </View>
                                            {
                                                infoCar?.typeCar?.value?.toUpperCase()?.includes('TAXI') ? (
                                                    <View style={{ flexDirection: 'row', paddingHorizontal: 12 }}>
                                                        <View style={{ flex: 1, marginTop: 5 }}>
                                                            <Input
                                                                label={`Số chỗ ngồi được bảo hiểm${check ? ' *' : ''}`}
                                                                name={'seatParent'}
                                                                value={seatParent}
                                                                onChangeText={(e) => handleChangeSeatParent(e)}
                                                                keyboardType={'number-pad'}
                                                                onBlur={() => callApiGetFee()}
                                                                maxLength={2}
                                                                error={check == true && errorSeatParent}
                                                                editable={check == true ? true : false}
                                                                baseColor={check ? colorText : textDisable}
                                                            />
                                                        </View>
                                                    </View>
                                                ) : null
                                            }
                                            <View style={{ flexDirection: 'row', paddingHorizontal: 12 }}>
                                                <View style={{ flex: 1, marginTop: 5 }}>
                                                    <Input
                                                        currency
                                                        label={`Số tiền bảo hiểm/người/mọi vụ${check ? ' *' : ''}`}
                                                        name={'insuranceMoney'}
                                                        value={formatVNDTNDSCAR(insuranceMoneyTNLXPX, '.')}
                                                        // value={insuranceMoneyTNLXPX}
                                                        onChangeText={(e) => hanldeChangeInsuranceMoneyInput(e)}
                                                        keyboardType={'number-pad'}
                                                        onBlur={() => callApiGetFee()}
                                                        error={check == true && errorContent}
                                                        // showValidMoney={showValidMoney}
                                                        editable={check == true ? true : false}
                                                        blurCurrency={!check}
                                                        // placeholder={'10.000.000'}
                                                        baseColor={check ? colorText : textDisable}    
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', paddingHorizontal: 12 }}>
                                                <View style={{ flex: 1 }}>
                                                    <Input
                                                        label={'Thời hạn từ'}
                                                        editable={false}
                                                        placeholder={'dd/mm/yyyy'}
                                                        value={props?.values?.dateFrom}
                                                        baseColor={textDisable}
                                                        textColor={textDisable}
                                                    />
                                                </View>
                                                <View style={{width: 24}} />
                                                <View style={{ flex: 1 }}>
                                                    <Input
                                                        label={'Thời hạn đến'}
                                                        editable={false}
                                                        placeholder={'dd/mm/yyyy'}
                                                        value={props?.values?.dateTo}
                                                        baseColor={textDisable}
                                                        textColor={textDisable}
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
                                                    Chú ý: Thời hạn hiệu lực bảo hiểm tai nạn lái xe, phụ xe, người ngồi trên xe luôn bằng với thời hạn hiệu lực bảo hiểm Trách nhiệm dân sự bắt buộc
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 2 }}>
                                            <TotalFee feeTNDS={feeTNDS} duration={duration} insuranceMoney={insuranceMoney} check={check} />
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
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>Thanh toán</Text>
                                                            </View>
                                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                <Text style={{ color: colorNote, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
                                                                    {formatVND(check ? feeTNDS?.feeVat + insuranceMoney?.feeVat : feeTNDS?.feeVat)}VNĐ
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
                                                                    <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>{check ? roundNumber(valueCom + valueComC3) / 1000 : roundNumber(valueCom) / 1000}</Text>
                                                                </View>
                                                            ) : null
                                                        }
                                                        <FooterButton >
                                                            <Button
                                                                label={'TIẾP TỤC'}
                                                                marginTop={10}
                                                                onPress={() => handleNext(props)}
                                                                disabled={
                                                                    props.values.errDateFrom ||
                                                                    disabledButton(props)
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
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>Thanh toán</Text>
                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ color: colorNote, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
                                                                {formatVND(check ? feeTNDS?.feeVat + insuranceMoney?.feeVat : feeTNDS?.feeVat)}VNĐ
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
                                                                <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>{check ? roundNumber(valueCom + valueComC3) / 1000 : roundNumber(valueCom) / 1000}</Text>
                                                            </View>
                                                        ) : null
                                                    }
                                                    <FooterButton >
                                                        <Button
                                                            label={'TIẾP TỤC'}
                                                            marginTop={10}
                                                            onPress={() => handleNext(props)}
                                                            disabled={
                                                                props.values.errDateFrom ||
                                                                disabledButton(props)
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
        paddingTop: 10
    },
    styleTab: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center',
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
    const listCompany = state.selectCompany.listCompany['C1'];
    const idComSelected = state.selectCompany.idComSelected['C1'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        idComSelected,
        codeSelected: obj?.insurOrg?.code || '',
        infoCar: state?.tndsCar?.infoCar,
        durationCar: state?.tndsCar?.durationCar,
        contractLog: state.logContract.logContract['C1'] || {},
        orgCodeUser: state.userInfo.orgCodeUser,
        dataTokenInsur: state.insurance.tokenInsur['C1'],
    };
};

export default connect(mapStateToProps, {
    saveFeeTNDSCar, saveDurationTNDSCar,
    saveFeeLXPXCar, saveLogContract,
    logEventContract
})(PackageTNDSCar);


