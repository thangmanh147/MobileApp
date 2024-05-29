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
    ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, colorBackground, colorBoxBorder, colorBoxBorder1, colorNote, colorText, colorTitle, nameApp, NewColor, NewColorDisable, textDisable, TxtColor, URL } from '../../config/System';
import { connect } from 'react-redux';
import _ from 'lodash';
import Input from './components/Input';
import { changeDataPackage } from './actions/carPhysical';
import { checkCarIsTruck, convertToNumber } from './helpers';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
import axios from 'axios';
import { getDistrict } from '../CarInsurance/actions/car_Buy';
import Promotion from '../../components/promotion/Promotion';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { checkExpToken } from '../../config/decodeToken';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import { checkLeapYear, checkMonth, formatVND, renderVND, isToManySpace } from '../../components/Functions';
import InputSelect from "../../components/buy/InputSelect";
import TotalFee from "./TotalFee";
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, roundNumber } from '../../utils/Util';
import jwt_decode from 'jwt-decode';
import RenderPackage from './components/RenderPackage';
import { saveLogContract, logEventContract } from '../../actions/logContract';
import DateFill from '../../components/dateTimeFill/DateFill';
import { ERROR_DATE_CURRENT } from '../../config/ErrorMessage';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconCalculatorSvg from '../../config/images/icons/IconCalculatorSvg';
import IconCheckboxBlurSvg from '../../config/images/icons/IconCheckboxBlurSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import SelectCompany from '../../components/listCompanySelect/SelectCompany';
import Svg, { LinearGradient, Defs, Stop, Rect } from 'react-native-svg';

const DATA = [
    { code: "vc", name: "Phí cơ bản", value: 3800000, disable: true, defaultStatus: true },
    { code: "bs02", name: "BS02 - BH thay thế mới", value: 200000, disable: false },
    { code: "bs04", name: "BS04 - BH xe bị mất trộm cướp bộ phận", value: 400000, disable: false },
    { code: "bs05", name: "BS05 - BH lựa chọn cơ sở sửa chữa", value: 400000, disable: false },
    { code: "bs06", name: "BS06 - BH tổn thất về động cơ khi xe hoạt động trong khu vực bị ngập nước", value: 0, disable: true, defaultStatus: true },
    // { code: "bs07", name: "BS07 - BH thay thế xe mới trong năm đầu tiên", value: 0, disable: false },
    // { code: "bs09", name: "BS09 - BH thuê xe trong thời gian sửa chữa", value: 600000, disable: false },
    { code: "bs13", name: "BS13 - BH cho thiết bị lắp thêm", value: 200000, disable: false },
    // { code: "bs14", name: "BS14 - BH mất trộm, cướp chìa khoá xe", value: 200000, disable: false },
]

function InfomationCarPhysical({ 
    saveLogContract, 
    contractLog, 
    changeDataPackage, 
    dataStep2, 
    infoCar, 
    promotionPrice,
    logEventContract,
    idComSelected,
    codeSelected,
    contractCarId,
    orgCodeUser,
    dataTokenInsur
}) {
    const offset = useRef(new Animated.Value(0)).current;
    const [errorContent, setErrorContent] = useState('')
    const [dateTo, setDateTo] = useState('');
    const [checkTNDS, setCheckTNDS] = useState(false);
    const [checkTNLX, setCheckTNLX] = useState(false);
    const [durationCar, setdurationCar] = useState('12 tháng');
    const [feeTNDS, setFeeTNDS] = useState(0);
    const [duration, setDuration] = useState();
    const [insuranceMoney, setInsuranceMoney] = useState('')
    const [seatParent, setSeatParent] = useState('')
    const [errorSeatParent, setErrorSeatParent] = useState('')
    const [dateFrom, setDateFrom] = useState('');
    const [total, settotal] = useState(0);
    const [moneyDiscount, setmoneyDiscount] = useState(0);
    const [statusAlert, setStatusAlert] = useState(false);
    const [errPhysical, setErrPhysical] = useState(false);
    const [insuranceValues, setInsuranceValues] = useState('');
    const [dateFromTNDS, setDateFromTNDS] = useState('');
    const [dateToTNDS, setDateToTNDS] = useState('');
    const [timerCount, setTimerCount] = useState(moment().valueOf());
    const [listPackage, setListPackage] = useState({})
    const [feeVc, setFeeVc] = useState(0)
    const [listBs, setListBs] = useState([])
    const [valueCom, setValueCom] = useState(0);
    const [valueComC1, setValueComC1] = useState(0);
    const [valueComC3, setValueComC3] = useState(0);
    const [listPkgsVNI, setListPkgsVNI] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);
    useEffect(() => {
        if (promotionPrice) {
            if (promotionPrice?.price > 100) {
                setmoneyDiscount(total - promotionPrice?.price)
            } else {
                setmoneyDiscount(total * (promotionPrice?.price / 100))
            }
        }
    }, [promotionPrice]);

    useEffect(() => {
        if (dataStep2) {
            setCheckTNDS(dataStep2?.checkTNDS)
            setCheckTNLX(dataStep2?.checkTNLX)
            setInsuranceValues(dataStep2?.insuranceValues)
            setInsuranceMoney(dataStep2?.insuranceMoney)
            setSeatParent(dataStep2?.seatParent)
            setListBs(dataStep2?.listBs)
            setListPackage(dataStep2?.listPackage)
            setFeeVc(dataStep2?.dataPackage)
            setListPkgsVNI(dataStep2?.listPkgsVNI)
            if (moment().diff(moment(dataStep2?.dateFrom, 'DD/MM/YYYY'), 'days') > 0) {
                setDateFrom(moment().format('DD/MM/YYYY'))
                setDateTo(moment().add(12, 'months').format('DD/MM/YYYY'))
            } else {
                setDateFrom(dataStep2?.dateFrom);
                setDateTo(dataStep2?.dateTo);
            }
            if (moment().diff(moment(dataStep2?.dateFromTNDS, 'DD/MM/YYYY'), 'days') > 0) {
                setDateFromTNDS(moment().format('DD/MM/YYYY'))
                setDateToTNDS(moment().add(12, 'months').format('DD/MM/YYYY'))
            } else {
                setDateFromTNDS(dataStep2?.dateFromTNDS);
                setDateToTNDS(dataStep2?.dateToTNDS);
            }
        } else {
            getCurrentDate()
        }
    }, [dataStep2]);

    useEffect(() => {
        if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
            getValueCom();
        }
    }, [feeVc]);

    useEffect(() => {
        if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
            if (checkTNDS) {
                getValueComC1();
            }
        }
    }, [checkTNDS, feeTNDS]);

    useEffect(() => {
        if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
            if (checkTNLX) {
                getValueComC3();
            }
        }
    }, [checkTNLX, insuranceMoney]);

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
              "contractValue": feeVc?.fee || 0,
              "product": "C2",
              "B": `${(feeVc?.feeBase || feeVc?.fee || 0) / 1.1}`,
              "V": `${(feeVc?.feeBase || feeVc?.fee || 0) / 1.1 * 0.1}`,
              "D": `${feeVc?.discountValue || 0}`
          }
          console.log('======URL C2', url)
          console.log('======BODY C2', body)
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
                console.log('======RES C2', res)
                  if (res.status == 200 || res.status == 'success') {
                    setValueCom(res?.data?.commission || 0);
                  }
              })
              .catch((error) => {
                  console.log(error)
              })
        });
      };
  
      const getValueComC1 = () => {
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
          console.log('======URL C1', url)
          console.log('======BODY C1', body)
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
                console.log('======RES C1', res)
                  if (res.status == 200 || res.status == 'success') {
                    setValueComC1(res?.data?.commission || 0);
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
            console.log('======URL C3', url)
            console.log('======BODY C3', body)
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
                    console.log('======RES C3', res)
                    if (res.status == 200 || res.status == 'success') {
                    setValueComC3(res?.data?.commission || 0);
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        });
    };
    
    const getCurrentDate = () => {
        const date = new Date();
        const parsedDate = moment(date, 'DD/MM/YYYY');
        const today = parsedDate.format('DD/MM/YYYY');
        let dt = moment(parsedDate, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY');
        setDateFromTNDS(today)
        setDateToTNDS(dt)
        setDateFrom(today)
        setDateTo(dt)
    };

    function checkValidButtonNext() {
        if (checkTNLX) {
            if (
                !insuranceValues ||
                errorContent ||
                (infoCar?.typeCar?.value?.toUpperCase()?.includes('TAXI') &&
                    (seatParent === '' || errorSeatParent?.length > 0))
            ) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const saveAndNext = (formik) => {
        let params = {
            dateFrom: formik?.values?.dateFrom,
            dateTo: formik?.values?.dateTo,
            dateFromTNDS: formik?.values?.dateFromTNDS,
            dateToTNDS: formik?.values?.dateToTNDS,
            moneyDiscount,
            feeTNDS,
            insuranceMoney,
            duration: 12,
            checkTNDS,
            checkTNLX,
            dataPackage: feeVc,
            infoCar,
            insuranceValues,
            listBs,
            valueComC1,
            valueComC3,
            valueCom,
            seatParent,
            listPkgsVNI,
            listPackage,
        };
        changeDataPackage(params);
        if (!contractCarId) {
            contractLog.key = 'BuyerCarPhysical';
            contractLog.priceInsur = feeVc?.fee + (checkTNDS ? feeTNDS?.feeVat : 0) + ((checkTNLX && insuranceMoney) ? insuranceMoney?.feeVat : 0);
            contractLog.commission = valueCom + (checkTNDS ? valueComC1 : 0) + ((checkTNLX && insuranceMoney) ? valueComC3 : 0);
            saveLogContract('C2', contractLog);
        }
        logging({
            dateFrom: formik?.values?.dateFrom,
            dateTo: formik?.values?.dateTo,
            dateFromTNDS: formik?.values?.dateFromTNDS,
            dateToTNDS: formik?.values?.dateToTNDS,
            feeTNDS,
            checkTNDS,
            checkTNLX,
            listBs
        });
        Actions.BuyerCarPhysical();
    };

    const logging = (data) => {
        const timeEnd = moment().valueOf();
        const count = moment(timeEnd).diff(moment(timerCount), 'milliseconds');
        logEventContract(
            `${nameApp}_VCX_OTO_EVENT_PHI_BAO_HIEM`,
            {
                infoFee: data,
                timerCounting: count / 1000,
            }
        );
    }


    const hanldeChangeInsuranceMoneyInput = (data) => {
        setInsuranceValues(convertToNumber(data))
        // formik.setFieldValue('insuranceMoney', data.name);
        let dataInsuMoney = typeof data !== 'number' ? parseInt(data?.replace(/\./g, '')) : data
        if (!dataInsuMoney || dataInsuMoney === '') {
            setErrorContent('Bạn phải nhập số tiền bảo hiểm')
        } else if (dataInsuMoney % 1000 !== 0) {
            setErrorContent('Số tiền bảo hiểm không hợp lệ (phải là bội của 1000)')
        } else if (dataInsuMoney < 10000000) {
            setErrorContent('Số tiền bảo hiểm không nhỏ hơn 10.000.000VNĐ')
        } else if (dataInsuMoney > 1645000000) {
            setErrorContent('Số tiền bảo hiểm tối đa 1 người là 1.645.000.000VNĐ và tổng số tiền bảo hiểm cho tất cả người ngồi trên xe tối đa là 11.750.000.000VNĐ')
        } else if ((dataInsuMoney * Number(infoCar?.seat)) > (1645000000 * Number(infoCar?.seat))) {
            setErrorContent('Số tiền bảo hiểm tối đa 1 người là 1.645.000.000VNĐ và tổng số tiền bảo hiểm cho tất cả người ngồi trên xe tối đa là 11.750.000.000VNĐ')
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

    const callApiGetFee = () => {
        let dataInsuMoney = typeof insuranceValues !== 'number' ? parseInt(insuranceValues?.replace(/\./g, '')) : insuranceValues
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
                        effectiveAt: dateFromTNDS,
                        expiredAt: dateToTNDS,
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
                        "start_date": dateFromTNDS,
                        "end_date": dateToTNDS
                    }
                    let url = `${URL}/api/premium/v1/car-premium/accident`
                    axios.post(url, body, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then((res) => {
                            console.log('RES LXPX:', res.data);
                            if (res.data.code == "000") {
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

    useEffect(() => {
        if (infoCar && dateFrom) {
            setLoading(true);
            callFee();
        }
    }, [infoCar, codeSelected, dateFrom])

    const onSelectPkg = (index) => {
        const arr = [...listPkgsVNI];
        if (arr[index].isSelect) {
            arr[index].isSelect = false;
        } else {
            arr[index].isSelect = true;
        }
        setListPkgsVNI(arr);
        callFee();
    }

    const callFee = (pkgs) => {
        new Store().getSession(Const.TOKEN).then(token => {
            const _carType = infoCar?.typeCar?.code;
            const _carPurpose = infoCar?.purpose_car?.value;
            if (codeSelected === 'VNI') {
                const body = {
                    groupCar: _carType,
                    purpose: _carPurpose == "C" ? "Y" : "N",
                    numberSeat: Number(infoCar?.seat),
                    manufactureYear: Number(infoCar?.year),
                    manufactureMonth: 1,
                    declarationPrice: convertToNumber(infoCar?.valueCar),
                    insuredValue: convertToNumber(infoCar?.valueCashCar),
                    effectiveAt: dateFrom,
                    expiredAt: dateTo,
                    tonnage: checkCarIsTruck(_carType) && infoCar?.loadCapacity ? parseFloat(infoCar?.loadCapacity) : 0,
                    duration: 12,
                    packages: listPkgsVNI.filter(item => item?.isSelect).map(item => item.CODE).toString()
                }
                let url = `${URL}/api/contract/v1/fee-car-vcx`;
                console.log('BODY VCX VNI:', body);
                console.log('URL VCX VNI:', url);
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": dataTokenInsur?.token || token
    
                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log('RES VCX VNI -:', res);
                        if (res?.errorCode == "00") {
                            setLoading(false);
                            setErrPhysical(false);
                            if (listPkgsVNI.length === 0) {
                                const arr = res?.data?.DKBS.map((item) => {
                                    if (item.PHI_DKBS == 0) {
                                        item.isSelect = true;
                                    }
                                    return item;
                                })
                                setListPkgsVNI(arr);
                            }
                            setFeeVc({
                                fee: res?.data?.TotalFee,
                                vc: res?.data?.PhiCoVat,
                                carTypeCode: res?.data?.MaNhomXe,
                                tyle: res?.data?.Tyle,
                                vatTyle: res?.data?.Vat
                            });
                        } else {
                            setLoading(false);
                            if (!statusAlert) {
                                setStatusAlert(true);
                                setErrPhysical(true);
                                Alert.alert('Thông báo', res?.message, [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            Actions.InfomationCarPhysical();
                                        },
                                    },
                                ]);
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        setLoading(false);
                        setFeeVc({fee: 0, vc: 0, carTypeCode: 0});
                    })
            } else {
                const getYear = moment().year()
                const diffYear = Number(getYear) - Number(infoCar?.year)
                const _carBrandName = infoCar?.carBrand?.name;
                const decode = jwt_decode(dataTokenInsur?.token || token);
                const _pkgs = pkgs || listBs
                const resp = {
                    carType: _carType,
                    carBrand: _carBrandName,
                    purpose: _carPurpose,
                    numberSeat: Number(infoCar?.seat),
                    usedYear: diffYear,
                    carValue: convertToNumber(infoCar?.valueCar),
                    insuranceValue: convertToNumber(infoCar?.valueCashCar),
                    tonnage:
                        checkCarIsTruck(_carType) && infoCar?.loadCapacity ? parseFloat(infoCar?.loadCapacity) : 0,
                    organizationId: decode?.organizationId,
                    carMode: infoCar?.carModel?.name,
                    packages: _pkgs.length > 0 ? _pkgs : null
                }
                let url = `${URL}/api/premium/v1/car-premium/physical-organization`;
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": token
    
                    },
                    body: JSON.stringify(resp)
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log('RES PTI -:', res);
                        if (res.code == "000") {
                            let arrRaw = res.data;
                            if (arrRaw?.insuranceValueMax && Number(arrRaw?.insuranceValueMax) < Number(infoCar?.valueCashCar)) {
                                setLoading(false);
                                if (!statusAlert) {
                                    setStatusAlert(true);
                                    setErrPhysical(true);
                                    Alert.alert('Thông báo', `Số tiền bảo hiểm xe không được lớn hơn ${arrRaw?.insuranceValueMax}`, [
                                        {
                                            text: 'OK',
                                            onPress: () => {
                                                Actions.InfomationCarPhysical();
                                            },
                                        },
                                    ]);
                                }
                            } else {
                                setLoading(false);
                                setErrPhysical(false);
                                if (listBs.length === 0) {
                                    setListPackage(arrRaw);
                                    const arr = Object.keys(arrRaw).filter((item) => arrRaw[item] == 0 && item.includes('bs'));
                                    setListBs(arr);
                                }
                                setFeeVc(arrRaw);
                            }
                        } else {
                            setLoading(false);
                            if (!statusAlert) {
                                console.log('Alert -:', statusAlert);
                                setStatusAlert(true);
                                setErrPhysical(true);
                                Alert.alert('Thông báo', res?.message, [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            Actions.InfomationCarPhysical();
                                        },
                                    },
                                ]);
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        setLoading(false);
                        setFeeVc({});
                    })
            }
        })
    }

    const checkFeeBs = (type) => {
        const listFeeBs = [...listBs]
        let findBs = listFeeBs.find(bs => bs == type)
        if (!findBs) {
            listFeeBs.push(type)
        } else {
            listFeeBs.forEach((item, index) => {
                if (item == type) {
                    listFeeBs.splice(index, 1)
                }
            })
        }
        setListBs(listFeeBs);
        callFee(listFeeBs);
    }

    useEffect(() => {
        if (checkTNDS && dateFromTNDS && dateToTNDS) {
            const isTruck = checkCarIsTruck(infoCar?.typeCar?.code)
            new Store().getSession(Const.TOKEN).then(token => {
                if (codeSelected === 'VNI') {
                    let url = `${URL}/api/contract/v1/fee-car-tnds`
                    let body = {
                        groupCar: infoCar?.typeCar?.code,
                        purpose: infoCar?.purpose_car?.value == "C" ? "Y" : "N",
                        numberSeat: parseFloat(infoCar?.seat),
                        tonnage: isTruck && infoCar?.loadCapacity ? parseFloat(infoCar?.loadCapacity) : 0,
                        effectiveAt: dateFromTNDS,
                        expiredAt: dateToTNDS
                    }
                    console.log('BODY-VNI:  ', body)
                    console.log('URL-VNI:  ', url)
                    axios.post(url, body, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': dataTokenInsur?.token || token,
                        }
                    })
                        .then((res) => {
                            console.log('RES-VNI:  ', res)
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
                                            onPress: () => setCheckTNDS(false),
                                        },
                                    ]);
                                }
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                } else {
                    const dataToken = jwt_decode(dataTokenInsur?.token || token);
                    // let url = `${URL}/api/premium/v1/car-premium/liability`
                    let url = `${URL}/api/premium/v1/car-premium/liability-v2?organizationId=${dataToken?.organizationId || ''}`
                    let body = {
                        car_type: infoCar?.typeCar?.code,
                        car_purpose: infoCar?.purpose_car?.value == "K" ? "N" : "Y",
                        car_seat_number: parseFloat(infoCar?.seat),
                        car_manufacture_year: parseFloat(infoCar?.year),
                        car_weight: isTruck && infoCar?.loadCapacity ? parseFloat(infoCar?.loadCapacity) : 0,
                        start_date: dateFromTNDS,
                        end_date: dateToTNDS
                    }
                    axios.post(url, body, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then((res) => {
                            console.log('======RES-TNDS-BB:  ', res?.data)
                            if (res.data.code == "000") {
                                setFeeTNDS(res?.data)
                            }
                            if (res.data.code == "001") {
                                if (!statusAlert) {
                                    setStatusAlert(true);
                                    Alert.alert('Thông báo', 'Không có gói bảo hiểm phù hợp,\nxin mời kiểm tra lại thông tin xe!', [
                                        {
                                            text: 'OK',
                                            onPress: () => setCheckTNDS(false),
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
    }, [dateFromTNDS, dateToTNDS, checkTNDS, codeSelected])

    useEffect(() => {
        if (dateFromTNDS) {
            callApiGetFee();
        }
    }, [codeSelected, dateFromTNDS])

    const getBack = () => {
        Actions.InfomationCarPhysical()
    }

    const onChangeBuyerBirthday = (formik, text, name) => {
        let str = text;
        formik.setFieldValue(name, text);
        if (name == 'dateFrom') {
            formik.setFieldValue('dateTo', moment(text, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY'));
        } else if (name == 'dateFromTNDS') {
            formik.setFieldValue('dateToTNDS', moment(text, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY'));
            setDateFromTNDS(text)
            setDateToTNDS(moment(text, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY'))
        }
    };
    const validation = Yup.object().shape({
        dateFrom: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),
    });

    const checkedTNLX = (formik) => {
        setCheckTNLX(!checkTNLX)
        setInsuranceValues('')
        setInsuranceMoney('')
        setSeatParent('')
        setErrorContent('Bạn phải nhập số tiền bảo hiểm')
        setErrorSeatParent('Bạn phải nhập số chỗ ngồi được bảo hiểm')
    }
    const handleOnblurvalueCar = () => {
        callApiGetFee()
    }

    const changeCheckTNDS = (formik) => {
        setCheckTNLX(false)
        if (checkTNDS) {
            setCheckTNDS(false);
            const today = moment().format('DD/MM/YYYY');
            let dt = moment(today, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY');
            formik.setFieldValue('dateFromTNDS', today);
            formik.setFieldValue('dateToTNDS', dt);
            formik.setFieldValue('errDateFromTNDS', '');
            setDateFromTNDS(today);
            setDateToTNDS(dt);
        } else {
            setCheckTNDS(true);
        }
    }

    const checkPackage = () => {
        if (
            infoCar?.carBrand?.name?.toUpperCase()?.includes('TOYOTA') &&
            infoCar?.carModel?.name?.toUpperCase()?.includes('WIGO')
        ) {
            return false;
        } else {
            if (
                (infoCar?.typeCar?.code === '03' && infoCar?.purpose_car?.value === 'C') ||
                infoCar?.typeCar?.code === '05' ||
                infoCar?.typeCar?.code === '24' ||
                infoCar?.typeCar?.code === '25' ||
                infoCar?.typeCar?.code === '26'
            ) return false;
            else return true;
        }
    }

    return (
        <View style={styles.container}>
            {/* <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}> */}
                <View style={{zIndex: 1002}}>
                    <ImageHeaderScroll code={'C2'} offset={offset} anchorHeader />
                </View>
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
                    <HeaderScroll code={'C2'} offset={offset} anchorHeader />
                </View>
                <View style={[styles.contentContainer, {zIndex: 1000, marginTop: HEADER_MIN_HEIGHT}]}>
                    <SelectCompany productCode={'C2'} showShadow />
                    <Formik
                        initialValues={{
                            dateFrom: dateFrom,
                            dateTo: dateTo,
                            dateFromTNDS: dateFromTNDS,
                            dateToTNDS: dateToTNDS,
    
                        }}
                        validationSchema={validation}
                        isInitialValid={infoCar?.isValidInfo || false}
                        enableReinitialize={true}
                    >
                        {formik => {
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
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingBottom: 12,
                                            paddingTop: nameApp === 'IAGENT' || nameApp === 'INSO' ? 4 : 0
                                        }}>
                                            <IconCalculatorSvg width={15} height={15} />
                                            <Text style={{ color: colorTitle, fontSize: 16, fontWeight: 'bold', marginLeft: 8 }}>
                                                Chọn gói bảo hiểm và tính phí</Text>
                                        </View>
                                        <View style={styles.viewTable}>
                                            <View style={{
                                                flexDirection: 'row',
                                                padding: 10,
                                                paddingVertical: 15,
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                                backgroundColor: Color,

                                            }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                                    <IconCheckboxBlurSvg width={20} height={20} />
                                                    <Text style={{
                                                        color: '#ffffff',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        marginLeft: 10,
                                                    }}>Bảo hiểm vật chất xe</Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{
                                                        color: '#ffffff',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        textAlign: 'right',
                                                    }}>
                                                        {formatVND(feeVc?.feeBase || feeVc?.fee)}VNĐ
                                                    </Text>

                                                </View>
                                            </View>

                                            <View style={{
                                                backgroundColor: '#FFFFFF',
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 1,
                                                },
                                                shadowOpacity: 0.20,
                                                shadowRadius: 1.41,

                                                elevation: 2,
                                            }}>
                                                <View style={{ paddingHorizontal: 10 }}>
                                                    <InputSelect
                                                        label={'Hiệu lực'}
                                                        checkDisabled={true}
                                                        baseColor={textDisable}
                                                        textColor={textDisable}
                                                        hideIcon
                                                        value={durationCar}
                                                        openModal={() => checkOpenModal('feeTNDS')}
                                                    />
                                                </View>
                                                <View style={{ flexDirection: 'row', paddingHorizontal: 10, }}>
                                                    <View style={{ flex: 1, paddingRight: 5 }}>
                                                        {/* <ModalTimePicker
                                                            dateDefault={new Date()}
                                                            minimumDate={new Date()}
                                                            onPicker={(text) => onChangeBuyerBirthday(formik, text, 'dateFrom')}
                                                        >
                                                            <FormikInput
                                                                label={'Thời hạn từ *'}
                                                                name={'dateFrom'}
                                                                keyboardType={'number-pad'}
                                                                placeholder={'dd/mm/yyyy'}
                                                                maxLength={10}
                                                                editable={false}
                                                            // value={dateFrom}
                                                            />
                                                        </ModalTimePicker> */}
                                                        <DateFill
                                                            value={formik.values.dateFrom}
                                                            onChange={(text, err) => {
                                                                setDateFrom(text);
                                                                formik.setFieldValue('dateFrom', text);
                                                                formik.setFieldValue('errDateFrom', err);
                                                                if (!err) {
                                                                    formik.setFieldValue('dateTo', moment(text, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY'));
                                                                    setDateTo(moment(text, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY'));
                                                                }
                                                            }}
                                                            label={'Thời hạn từ *'}
                                                            minimumDate={moment().format('DD/MM/YYYY')}
                                                            errMinimum={ERROR_DATE_CURRENT}
                                                            requireFill
                                                        />
                                                    </View>
                                                    <View style={{ flex: 1, paddingLeft: 5 }}>
                                                        <FormikInput
                                                            label={'Thời hạn đến'}
                                                            name={'dateTo'}
                                                            keyboardType={'number-pad'}
                                                            placeholder={'dd/mm/yyyy'}
                                                            editable={false}
                                                            baseColor={textDisable}
                                                            textColor={textDisable}
                                                        />
                                                    </View>
                                                </View>

                                                <RenderPackage name={'Phí cơ bản'} disabled={true} value={feeVc?.vc} checked={true} />
                                                {codeSelected !== 'VNI' && (listPackage && listPackage?.bs02 >= 0) ? <RenderPackage name={'BS02 - BH thay thế mới'} disabled={listPackage?.bs02 == 0 || checkPackage()} onPress={() => checkFeeBs('bs02')} value={listPackage?.bs02} checked={listBs.includes('bs02')} /> : null}
                                                {codeSelected !== 'VNI' && (listPackage && listPackage?.bs04 >= 0) ? <RenderPackage name={'BS04 - BH xe bị mất trộm cướp bộ phận'} onPress={() => checkFeeBs('bs04')} value={listPackage?.bs04} checked={listBs.includes('bs04')} /> : null}
                                                {codeSelected !== 'VNI' && (listPackage && listPackage?.bs05 >= 0) ? <RenderPackage name={'BS05 - BH lựa chọn cơ sở sửa chữa'} disabled={checkPackage()} onPress={() => checkFeeBs('bs05')} value={listPackage?.bs05} checked={listBs.includes('bs05')} /> : null}
                                                {codeSelected !== 'VNI' && (listPackage && listPackage?.bs06 >= 0) ? <RenderPackage name={'BS06 - BH tổn thất về động cơ khi xe hoạt động trong khu vực bị ngập nước'} disabled={checkPackage()} onPress={() => checkFeeBs('bs06')} value={listPackage?.bs06} checked={listBs.includes('bs06')} /> : null}
                                                {codeSelected !== 'VNI' && (listPackage && listPackage?.bs13 >= 0) ? <RenderPackage name={'BS13 - BH cho thiết bị lắp thêm'} onPress={() => checkFeeBs('bs13')} value={listPackage?.bs13} checked={listBs.includes('bs13')} /> : null}
                                                {
                                                    codeSelected === 'VNI' && listPkgsVNI.map((item, index) => (
                                                        <RenderPackage
                                                            name={item.NAME}
                                                            onPress={() => onSelectPkg(index)}
                                                            value={item.PHI_DKBS}
                                                            checked={item.isSelect}
                                                            disabled={item.PHI_DKBS == 0}
                                                        />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View style={{ paddingTop: 16 }}>
                                            <View>
                                                <View style={styles.viewTable}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        padding: 10,
                                                        paddingVertical: 15,
                                                        borderTopLeftRadius: 10,
                                                        borderTopRightRadius: 10,
                                                        backgroundColor: Color,

                                                    }}>
                                                        <TouchableOpacity
                                                            style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                                                            onPress={() => changeCheckTNDS(formik)}
                                                        >
                                                            {
                                                                checkTNDS
                                                                    ? <IconCheckedBoxSvg width={20} height={20} color={colorBoxBorder1} />
                                                                    : <IconBoxSvg width={20} height={20} color={colorBoxBorder} />
                                                            }
                                                            <Text style={{
                                                                color: '#ffffff',
                                                                fontSize: 14,
                                                                fontWeight: 'bold',
                                                                marginLeft: 10,
                                                            }}>Bảo hiểm TNDS bắt buộc</Text>
                                                        </TouchableOpacity>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{
                                                                color: '#ffffff',
                                                                fontSize: 14,
                                                                fontWeight: 'bold',
                                                                textAlign: 'right',
                                                            }}>
                                                                { }
                                                                {formatVND(feeTNDS?.feeVat)}VNĐ
                                                                </Text>

                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        backgroundColor: '#FFFFFF',
                                                        shadowColor: "#000",
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 1,
                                                        },
                                                        shadowOpacity: 0.20,
                                                        shadowRadius: 1.41,

                                                        elevation: 2,
                                                    }}>
                                                        <View style={{ paddingHorizontal: 10 }}>
                                                            <InputSelect
                                                                label={'Số tháng hiệu lực'}
                                                                checkDisabled={true}
                                                                baseColor={textDisable}
                                                                textColor={textDisable}
                                                                hideIcon
                                                                value={durationCar}
                                                                openModal={() => checkOpenModal('feeTNDS')}
                                                            />
                                                        </View>
                                                        <View style={{ flexDirection: 'row', paddingHorizontal: 10, }}>
                                                            {!checkTNDS ?
                                                                <View style={{ flex: 1, paddingRight: 5 }}>
                                                                    <FormikInput
                                                                        label={'Thời hạn từ *'}
                                                                        name={'dateFromTNDS'}
                                                                        keyboardType={'number-pad'}
                                                                        placeholder={'dd/mm/yyyy'}
                                                                        maxLength={10}
                                                                        editable={false}
                                                                        baseColor={textDisable}
                                                                        textColor={textDisable}
                                                                    />
                                                                </View>
                                                                :
                                                                <View style={{ flex: 1, paddingRight: 5 }}>
                                                                    {/* <ModalTimePicker
                                                                        dateDefault={new Date()}
                                                                        minimumDate={new Date()}
                                                                        onPicker={(text) => onChangeBuyerBirthday(formik, text, 'dateFromTNDS')}
                                                                    >
                                                                        <FormikInput
                                                                            label={'Thời hạn từ *'}
                                                                            name={'dateFromTNDS'}
                                                                            keyboardType={'number-pad'}
                                                                            placeholder={'dd/mm/yyyy'}
                                                                            maxLength={10}
                                                                            editable={false}
                                                                        />
                                                                    </ModalTimePicker> */}
                                                                    <DateFill
                                                                        value={formik.values.dateFromTNDS}
                                                                        onChange={(text, err) => {
                                                                            formik.setFieldValue('dateFromTNDS', text);
                                                                            formik.setFieldValue('errDateFromTNDS', err);
                                                                            if (!err) {
                                                                                formik.setFieldValue('dateToTNDS', moment(text, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY'));
                                                                                setDateFromTNDS(text);
                                                                                setDateToTNDS(moment(text, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY'));
                                                                            }
                                                                        }}
                                                                        label={'Thời hạn từ *'}
                                                                        minimumDate={moment().format('DD/MM/YYYY')}
                                                                        errMinimum={ERROR_DATE_CURRENT}
                                                                        requireFill
                                                                    />
                                                                </View>
                                                            }

                                                            <View style={{ flex: 1, paddingLeft: 5 }}>
                                                                <FormikInput
                                                                    label={'Thời hạn đến'}
                                                                    name={'dateToTNDS'}
                                                                    keyboardType={'number-pad'}
                                                                    placeholder={'dd/mm/yyyy'}
                                                                    editable={false}
                                                                    baseColor={textDisable}
                                                                    textColor={textDisable}
                                                                />
                                                            </View>
                                                        </View>
                                                        <View style={{ paddingHorizontal: 10, marginTop: 4, paddingBottom: 16 }}>
                                                            <Text style={{
                                                                fontSize: 14,
                                                                lineHeight: 17.5,
                                                                color: colorNote,
                                                                fontStyle: nameApp.includes('YCHI') ? 'italic' : 'normal'
                                                            }}>Chú ý: Căn cứ theo Nghị định 03/2021/NĐ-CP ngày 15/01/2021, Thời hạn bảo hiểm TNDS Bắt buộc tối thiểu bằng 1 năm, tối đa bằng thời hạn đăng kiểm.</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ paddingTop: 16 }}>
                                            <View>
                                                <View style={styles.viewTable}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        padding: 10,
                                                        paddingVertical: 15,
                                                        borderTopLeftRadius: 10,
                                                        borderTopRightRadius: 10,
                                                        backgroundColor: Color,

                                                    }}>
                                                        <TouchableOpacity
                                                            style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                                                            onPress={() => checkedTNLX(formik)}
                                                            disabled={!checkTNDS}
                                                        >
                                                            {
                                                                checkTNLX
                                                                    ? <IconCheckedBoxSvg width={20} height={20} color={colorBoxBorder1} />
                                                                    : <IconBoxSvg width={20} height={20} color={colorBoxBorder} />
                                                            }
                                                            <Text style={{
                                                                color: '#ffffff',
                                                                fontSize: 14,
                                                                fontWeight: 'bold',
                                                                marginLeft: 10,
                                                            }}>Bảo hiểm TNLXPX và người ngồi trên xe</Text>
                                                        </TouchableOpacity>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{
                                                                color: '#ffffff',
                                                                fontSize: 14,
                                                                fontWeight: 'bold',
                                                                textAlign: 'right',
                                                            }}>
                                                                { }
                                                                {formatVND(checkTNLX == true ? formatVND(insuranceMoney?.feeVat, '.') : '0')}VNĐ
                                                                </Text>

                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        backgroundColor: '#FFFFFF',
                                                        shadowColor: "#000",
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 1,
                                                        },
                                                        shadowOpacity: 0.20,
                                                        shadowRadius: 1.41,

                                                        elevation: 2,
                                                    }}>
                                                        {
                                                            infoCar?.typeCar?.value?.toUpperCase()?.includes('TAXI') ? (
                                                                <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                                                                    <View style={{ flex: 1, marginTop: 5 }}>
                                                                        <Input
                                                                            label={`Số chỗ ngồi được bảo hiểm${checkTNLX ? ' *' : ''}`}
                                                                            name={'seatParent'}
                                                                            value={seatParent}
                                                                            onChangeText={(e) => handleChangeSeatParent(e)}
                                                                            keyboardType={'number-pad'}
                                                                            onBlur={() => handleOnblurvalueCar()}
                                                                            maxLength={2}
                                                                            error={checkTNLX == true && errorSeatParent}
                                                                            editable={checkTNLX == true ? true : false}
                                                                            baseColor={checkTNLX ? colorText : textDisable}
                                                                        />
                                                                    </View>
                                                                </View>
                                                            ) : null
                                                        }
                                                        <View style={{ paddingHorizontal: 10 }}>
                                                            <Input
                                                                label={`Số tiền bảo hiểm/người/mọi vụ${checkTNLX ? ' *' : ''}`}
                                                                onBlur={() => handleOnblurvalueCar()}
                                                                value={insuranceValues ? renderVND(insuranceValues?.toString()) : ''}
                                                                error={checkTNLX && errorContent}
                                                                maxLength={17}
                                                                onChangeText={(e) => hanldeChangeInsuranceMoneyInput(e)}
                                                                keyboardType={'number-pad'}
                                                                editable={checkTNLX}
                                                                baseColor={checkTNLX ? colorText : textDisable}
                                                                currency
                                                            />
                                                        </View>
                                                        <View style={{ flexDirection: 'row', paddingHorizontal: 10, }}>
                                                            <View style={{ flex: 1, paddingRight: 5 }}>
                                                                <FormikInput
                                                                    label={'Thời hạn từ *'}
                                                                    name={'dateFromTNDS'}
                                                                    keyboardType={'number-pad'}
                                                                    placeholder={'dd/mm/yyyy'}
                                                                    editable={false}
                                                                    baseColor={textDisable}
                                                                    textColor={textDisable}
                                                                />
                                                            </View>
                                                            <View style={{ flex: 1, paddingLeft: 5 }}>
                                                                <FormikInput
                                                                    label={'Thời hạn đến'}
                                                                    name={'dateToTNDS'}
                                                                    keyboardType={'number-pad'}
                                                                    placeholder={'dd/mm/yyyy'}
                                                                    editable={false}
                                                                    baseColor={textDisable}
                                                                    textColor={textDisable}
                                                                />
                                                            </View>
                                                        </View>
                                                        <View style={{ paddingHorizontal: 10, marginTop: 4, paddingBottom: 16 }}>
                                                            <Text style={{
                                                                fontSize: 14,
                                                                lineHeight: 17.5,
                                                                color: colorNote,
                                                                fontStyle: nameApp.includes('YCHI') ? 'italic' : 'normal'
                                                            }}>Chú ý: Thời hạn hiệu lực bảo hiểm tai nạn lái xe, phụ xe, người ngồi trên xe luôn bằng với thời hạn hiệu lực bảo hiểm vật chất xe.</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <Promotion
                                            totalPrice={total}
                                            insurProductCode={'C2'}
                                        />
                                        <View style={{ paddingTop: 20 }}>
                                            <TotalFee
                                                purpose_car={infoCar?.purpose_car}
                                                seat={infoCar?.seat}
                                                dataPackage={feeVc} feeTNDS={feeTNDS} duration={duration}
                                                insuranceMoney={insuranceMoney}
                                                moneyDiscount={moneyDiscount} promotionPrice={promotionPrice}
                                                checkTNDS={checkTNDS}
                                                checkTNLX={checkTNLX}
                                                listBs={listBs}
                                                codeSelected={codeSelected}
                                                listPkgsVNI={listPkgsVNI}
                                            />
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
                                                        <View style={{ marginTop: -8, paddingTop: 12, backgroundColor: colorBackground, paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 16 }}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={{ color: '#404142', fontSize: 14, fontWeight: 'bold' }}>Thanh toán:</Text>
                                                            </View>
                                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                <Text style={{ textAlign: 'right', color: colorNote, fontSize: 14, fontWeight: 'bold' }}>
                                                                    {formatVND(feeVc?.fee + (checkTNDS ? feeTNDS?.feeVat : 0) + ((checkTNLX && insuranceMoney) ? insuranceMoney?.feeVat : 0))}VNĐ
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
                                                                    <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>
                                                                        {roundNumber(valueCom + (checkTNDS ? valueComC1 : 0) + (checkTNLX ? valueComC3 : 0)) / 1000}
                                                                    </Text>
                                                                </View>
                                                            ) : null
                                                        }
                                                        <FooterButton>
                                                            <Button
                                                                disabled={
                                                                    formik.values.errDateFrom ||
                                                                    (checkTNDS && formik.values.errDateFromTNDS) ||
                                                                    checkValidButtonNext()
                                                                }
                                                                label={'TIẾP TỤC'}
                                                                marginTop={10}
                                                                onPress={() => saveAndNext(formik)}
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
                                                    <View style={{ marginTop: -8, paddingTop: 12, backgroundColor: colorBackground, paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 16 }}>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ color: '#404142', fontSize: 14, fontWeight: 'bold' }}>Thanh toán:</Text>
                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ textAlign: 'right', color: colorNote, fontSize: 14, fontWeight: 'bold' }}>
                                                                {formatVND(feeVc?.fee + (checkTNDS ? feeTNDS?.feeVat : 0) + ((checkTNLX && insuranceMoney) ? insuranceMoney?.feeVat : 0))}VNĐ
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
                                                                <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>
                                                                    {roundNumber(valueCom + (checkTNDS ? valueComC1 : 0) + (checkTNLX ? valueComC3 : 0)) / 1000}
                                                                </Text>
                                                            </View>
                                                        ) : null
                                                    }
                                                    <FooterButton>
                                                        <Button
                                                            disabled={
                                                                errPhysical ||
                                                                formik.values.errDateFrom ||
                                                                (checkTNDS && formik.values.errDateFromTNDS) ||
                                                                checkValidButtonNext()
                                                            }
                                                            label={'TIẾP TỤC'}
                                                            marginTop={10}
                                                            onPress={() => saveAndNext(formik)}
                                                        />
                                                    </FooterButton>
                                                </View>
                                            </>
                                        ) : null
                                    }
                                </View>
                            )
                        }}
                    </Formik>
                </View>
            {/* </KeyboardAvoidingView> */}
                {
                    isLoading ? (
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
        backgroundColor: '#ffff',
        paddingTop: 10,
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
});

const mapStateToProps = (state, ownProps) => {
    const listCompany = state.selectCompany.listCompany['C2'];
    const idComSelected = state.selectCompany.idComSelected['C2'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return ({
        idComSelected,
        codeSelected: obj?.insurOrg?.code || '',
        infoCar: state?.carPhysical?.infoCarPhysical,
        imgOcrCar: state?.carPhysical?.imgOcrCarPhysical,
        checkOcr: state?.carPhysical?.checkOcrPhysical,
        promotionPrice: state?.promotion?.promotionPrice['C2'],
        dataStep2: state?.carPhysical?.dataPackage,
        contractLog: state.logContract.logContract['C2'] || {},
        contractCarId: state?.carPhysical?.contractCarId,
        orgCodeUser: state.userInfo.orgCodeUser,
        dataTokenInsur: state.insurance.tokenInsur['C2'],
    })
};

export default connect(mapStateToProps, {
    changeDataPackage, 
    saveLogContract, 
    logEventContract
})(InfomationCarPhysical);

