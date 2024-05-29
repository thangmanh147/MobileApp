import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Platform,
    KeyboardAvoidingView,
    Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { widthPercentageToDP } from '../../config/ConfigResponsive';
import { Color, colorBoxBorder1, colorText, colorTitle, nameApp, NewColor, TxtColor, URL } from '../../config/System';
import { connect } from 'react-redux';
import Input from './components/Input';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import InputSelect from '../../components/buy/InputSelect';
import TotalFee from './TotalFee';
import ModalHouseType from './components/ModalHouseType';
import ModalInHouseType from './components/ModalInHouseType';
import ModalExpHouse from './components/ModalExpHouse';
import moment from 'moment';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { formatVND } from '../../components/Functions';
import { getDistrict } from '../CarInsurance/actions/car_Buy';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';

import { saveHousePackages } from './actions/houseActions';
import Loading from '../../components/Loading';
import Store from '../../services/Store';
import Const from '../../services/Const';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import DateFill from '../../components/dateTimeFill/DateFill';
import { convertToNumber } from './helpers';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX, roundNumber } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconCalculatorSvg from '../../config/images/icons/IconCalculatorSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconCheckboxBlurSvg from '../../config/images/icons/IconCheckboxBlurSvg';
import { ERROR_DATE_CURRENT } from '../../config/ErrorMessage';
import SelectCompany from '../../components/listCompanySelect/SelectCompany';

function Package({ dataTokenInsur, saveHousePackages, infoHouse, getDistrict, orgCodeUser, idComSelected }) {
    const offset = useRef(new Animated.Value(0)).current;
    const [modalProvince, setModalProvince] = useState(null);
    const [modalDistrict, setModalDistrict] = useState(null);
    const [unitHouse, setUnitHouse] = useState(0);
    const [unitInHouse, setUnitInHouse] = useState(0);
    const [feeHouse, setFeeHouse] = useState(0);
    const [feeInHouse, setFeeInHouse] = useState(0);
    const [modalHouseType, setModalHouseType] = useState(null);
    const [modalInHouseType, setModalInHouseType] = useState(null);

    const [modalExpHouse, setModalExpHouse] = useState(null);
    const [duration, setDuration] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [loading, setLoading] = useState(false);
    const [codeHouse, setCodeHouse] = useState('');
    const [valueCom, setValueCom] = useState(0);
    const [valueComInHouse, setValueComInHouse] = useState(0);

    useEffect(() => {
        if (infoHouse) {
            setDateTo(infoHouse.dateTo);
            setFeeHouse(infoHouse.feeHouse);
            setFeeInHouse(infoHouse.feeInHouse);
            setDuration(infoHouse.duration);
            setUnitHouse(infoHouse.unitHouse);
            setUnitInHouse(infoHouse.unitInHouse);
        }
    }, [infoHouse]);

    useEffect(() => {
        if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
            getValueCom();
        }
    }, [codeHouse, feeHouse]);

    useEffect(() => {
        if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
            getValueComInHouse();
        }
    }, [codeHouse, feeInHouse]);

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
              "contractValue": feeHouse || 0,
              "product": codeHouse === 'APARTMENT' ? 'H2' : 'H1',
              "B": `${feeHouse / 1.1 || 0}`,
              "V": `${feeHouse / 1.1 * 0.1 || 0}`,
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
  
      const getValueComInHouse = () => {
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
              "contractValue": feeInHouse || 0,
              "product": codeHouse === 'APARTMENT' ? 'H2' : 'H1',
              "B": `${feeInHouse / 1.1 || 0}`,
              "V": `${feeInHouse / 1.1 * 0.1 || 0}`,
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
                    setValueComInHouse(res?.data?.commission || 0);
                  }
              })
              .catch((error) => {
                  console.log(error)
              })
        });
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
        if (values?.length == 4 && (Number(a) - Number(values)) > 30) {
            return false
        }
        return true;
    };

    const validateValueHouse = (values) => {
        if (convertToNumber(values) > 45000000000) {
            return false;
        }
        return true;
    };

    const setValueUnitHouse = (id, valueHouse) => {
        if (convertToNumber(valueHouse) > 0 && id?.length > 0) {
            new Store().getSession(Const.TOKEN).then(token => {
                let url = `${URL}/api/contract/v1/insur-deductible?insurObjectTypeId=${id}&valueInsur=${convertToNumber(valueHouse)}`;
                axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': dataTokenInsur?.token || token,
                    },
                })
                    .then((res) => {
                        console.log('Gia tri khung nha: ', res);
                        if (res?.status === 200) {
                            setUnitHouse(res?.data?.data?.value);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }
    };

    const getFeeHouse = (housePrice, feeRate, insurPeriodMonth) => {
        if (convertToNumber(housePrice) > 0 && feeRate > 0 && insurPeriodMonth > 0) {
            new Store().getSession(Const.TOKEN).then(token => {
                let url = `${URL}/api/contract/v1/house-contracts-fee?housePrice=${convertToNumber(housePrice)}&feeRate=${feeRate}&insurPeriodMonth=${insurPeriodMonth}`;
                axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': dataTokenInsur?.token || token,
                    },
                })
                    .then((res) => {
                        console.log('Fee nha: ', res?.data?.data);
                        if (res?.status === 200) {
                            setFeeHouse(res?.data?.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }
    };

    const getFeeInHouse = (price, insurPeriodMonth) => {
        if (price > 0) {
            new Store().getSession(Const.TOKEN).then(token => {
                let url = `${URL}/api/contract/v1/house-contracts-fee-inhouse?inHouseFee=${price}&insurPeriodMonth=${insurPeriodMonth || ''}`;
                axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': dataTokenInsur?.token || token,
                    },
                })
                    .then((res) => {
                        console.log('Gia trong nha: ', res?.data?.data);
                        if (res?.status === 200) {
                            setFeeInHouse(res?.data?.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }
    };

    const validation = Yup.object().shape({
        packAddress: Yup.string().trim().required('Không được bỏ trống'),
        packHouseType: Yup.string().required('Không được bỏ trống'),
        inHouseType: Yup.string().when('check', {
            is: true,
            then: Yup.string().required('Không được bỏ trống')
        }),
        packProvince: Yup.string().required('Không được bỏ trống'),
        packDistrict: Yup.string().required('Không được bỏ trống'),
        finishYear: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('finishYear', 'Sai định dạng', (
                values,
            ) => values?.length === 4)
            .test('finishYear', 'Không lớn hơn năm hiện tại', (
                values,
            ) => validateYear(values))
            .test('finishYear', 'Không được quá 30 năm', (
                values,
            ) => validateLimitYear(values)),
        valueHouse: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('valueHouse', 'Không hợp lệ', (
                values,
            ) => convertToNumber(values) > 0)
            .test('valueHouse', 'Với Số tiền bảo hiểm lớn hơn 45 tỷ đồng, xin vui lòng liên hệ Hotline: 1900545475 để PTI hỗ trợ tốt nhất cho bạn!', (
                values,
            ) => validateValueHouse(values)),
        dateFrom: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),

    });

    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);

    const onChangeBuyerBirthday = (formik, text) => {
        formik.setFieldValue('dateFrom', text);
        changeDateTo(text);
        setDateFrom(text);
    };

    const changeDateTo = (text) => {
        if (duration?.value) {
            let a = text;
            let b = moment(a, 'DD/MM/YYYY').add(duration?.value, 'months').format('DD/MM/YYYY');
            setDateTo(b);
        }

    };

    useEffect(() => {
        if (dateFrom !== '') {
            let b = moment(dateFrom, 'DD/MM/YYYY').add(duration?.value, 'months').format('DD/MM/YYYY');
            setDateTo(b);
        }
    }, [duration]);

    const hanldeChangeExpHouse = (formik, data) => {
        formik.setFieldValue('houseExp', data.name);
        setDuration(data);
        changeDate(data?.value, formik);
        getFeeHouse(formik.values.valueHouse, formik.values.dataPackHouseType?.feeRate, data?.value);
        getFeeInHouse(formik.values.dataInHouseType?.price, data?.value);
    };
    const handleNext = (props) => {
        let params = {
            info: props?.values,
            valueCom,
            valueComInHouse,
            duration,
            dateTo,
            feeHouse,
            feeInHouse,
            unitHouse,
            unitInHouse,
            isValidPackage: true,
        };
        Actions.BuyerHouse();
        saveHousePackages(params);
    };

    const changeDate = (data, formik) => {
        if (dateFrom !== '' && formik?.values?.dateFrom.length == 10) {
            let b = moment(formik?.values?.dateFrom, 'DD/MM/YYYY').add(data, 'months').format('DD/MM/YYYY');
            setDateTo(b);
        }
    };

    // chọn tỉnh/tp
    const setProvince = async (data, props) => {
        if (props.values.buyerProvince !== data._name) {
            await props.setFieldValue('packProvinceId', data.id);
            await props.setFieldValue('packProvince', data._name);
            await props.setFieldValue('packDistrict', '');
            await getDistrict(data.id);
        }
    };
    // chọn quận/huyện
    const setDistrict = async (data, props) => {
        if (props.values.buyerDistrict !== data._name) {
            await props.setFieldValue('packDistrictId', data.id);
            await props.setFieldValue('packDistrict', data._name);
        }
    };

    const setHouseType = (data, props) => {
        props.setFieldValue('packHouseType', data.name);
        props.setFieldValue('dataPackHouseType', data);
        setCodeHouse(data.code);
        setValueUnitHouse(data.id, props.values.valueHouse);
        getFeeHouse(props.values.valueHouse, data.feeRate, duration?.value);
    };

    const setInHouseType = (data, props) => {
        props.setFieldValue('inHouseType', `${formatVND(data.insuranceValue)}VNĐ`);
        props.setFieldValue('dataInHouseType', data);
        setUnitInHouse(data.deductibleValue);
        getFeeInHouse(data.price, duration?.value);
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
                    <ImageHeaderScroll code={'H1'} offset={offset} />
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
                    <HeaderScroll code={'H1'} offset={offset} />
                </View>
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
                        <Formik
                            initialValues={{
                                valueHouse: infoHouse?.info?.valueHouse || '',
                                dateFrom: infoHouse?.info?.dateFrom || '',
                                check: infoHouse?.info?.check || false,
                                houseExp: infoHouse?.info?.houseExp || '',
                                finishYear: infoHouse?.info?.finishYear || '',
                                packProvince: infoHouse?.info?.packProvince || '',
                                packProvinceId: infoHouse?.info?.packProvinceId || '',
                                packDistrict: infoHouse?.info?.packDistrict || '',
                                packDistrictId: infoHouse?.info?.packDistrictId || '',
                                packAddress: infoHouse?.info?.packAddress || '',
                                packHouseType: infoHouse?.info?.packHouseType || '',
                                dataPackHouseType: infoHouse?.info?.dataPackHouseType || {},
                                inHouseType: infoHouse?.info?.inHouseType || '',
                                dataInHouseType: infoHouse?.info?.dataInHouseType || {},
                            }}
                            enableReinitialize={true}
                            validationSchema={validation}
                            isInitialValid={infoHouse?.isValidPackage || false}>
                            {props => {
                                return (
                                    <View>
                                        <ModalProvince
                                            open={modalProvince}
                                            onClosed={() => setModalProvince(null)}
                                            setProvince={data => setProvince(data, props)}
                                            onOpened={() => setModalProvince(true)}
                                            nameSelected={props.values.packProvince}
                                        />
                                        <ModalDistrict
                                            open={modalDistrict}
                                            onClosed={() => setModalDistrict(null)}
                                            setDistrict={data => setDistrict(data, props)}
                                            onOpened={() => setModalDistrict(true)}
                                            nameSelected={props.values.packDistrict}
                                        />
                                        <ModalExpHouse
                                            open={modalExpHouse}
                                            onClosed={() => setModalExpHouse(null)}
                                            setSex={data => hanldeChangeExpHouse(props, data)}
                                            onOpened={() => setModalExpHouse(true)}
                                        />
                                        <ModalHouseType
                                            open={modalHouseType}
                                            onClosed={() => setModalHouseType(null)}
                                            setSex={(data) => setHouseType(data, props)}
                                            onOpened={() => setModalHouseType(true)}
                                            dataTokenInsur={dataTokenInsur}
                                        />
                                        <ModalInHouseType
                                            open={modalInHouseType}
                                            onClosed={() => setModalInHouseType(null)}
                                            setSex={(data) => setInHouseType(data, props)}
                                            onOpened={() => setModalInHouseType(true)}
                                            dataTokenInsur={dataTokenInsur}
                                        />
                                        <SelectCompany productCode={'H1'} valueMargin />
                                        <View style={styles.titleContainer}>
                                            <IconCalculatorSvg width={15} height={15} />
                                            <Text style={styles.titleStyle}>Chọn gói bảo hiểm và tính phí</Text>
                                        </View>
                                        <Text style={[styles.titleStyle, { fontSize: 15, marginLeft: 0 }]}>Địa chỉ nhà được bảo hiểm</Text>
                                        <View style={styles.inputRow}>
                                            <View style={{ width: '46%' }}>
                                                <FormikSelect
                                                    label={'Tỉnh/Thành phố *'}
                                                    name={'packProvince'}
                                                    openModal={() => setModalProvince(true)}
                                                />
                                            </View>
                                            <View style={{ width: '46%' }}>
                                                <FormikSelect
                                                    label={`Quận/Huyện${props.values?.packProvince ? ' *' : ''}`}
                                                    name={'packDistrict'}
                                                    openModal={() => setModalDistrict(true)}
                                                    checkDisabled={!props.values?.packProvince}
                                                    hideIcon={!props.values?.packProvince}
                                                    baseColor={props.values?.packProvince ? colorText : '#8D8C8D'}
                                                />
                                            </View>
                                        </View>
                                        <FormikInput
                                            label={'Địa chỉ (Số nhà, phường, xã) *'}
                                            name={'packAddress'}
                                        />
                                        <View style={styles.viewTable}>
                                            <View style={{
                                                flexDirection: 'row',
                                                padding: 10,
                                                paddingVertical: 15,
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                                backgroundColor: Color,
                                            }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.6 }}>
                                                    <IconCheckboxBlurSvg width={20} height={20} />
                                                    <Text style={{
                                                        flex: 1,
                                                        color: 'white',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        marginLeft: 8,
                                                    }}>Bảo hiểm khung nhà</Text>
                                                </View>
                                                <View style={{ flex: 0.4 }}>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        textAlign: 'right',
                                                    }}>{formatVND(feeHouse, '.')}VNĐ</Text>

                                                </View>
                                            </View>
                                            <View style={{ paddingHorizontal: 10 }}>
                                                <FormikSelect
                                                    label={'Loại hình ngôi nhà *'}
                                                    name={'packHouseType'}
                                                    openModal={() => setModalHouseType(true)}
                                                    showTextLines
                                                />
                                                <FormikInput
                                                    label={'Năm hoàn thành *'}
                                                    name={'finishYear'}
                                                    maxLength={4}
                                                    keyboardType={'number-pad'}
                                                />
                                            </View>
                                            <View style={[styles.inputRow, { paddingHorizontal: 10 }]}>
                                                <View style={{ width: '46%' }}>
                                                    <FormikInput
                                                        label={'Giá trị khung nhà *'}
                                                        name={'valueHouse'}
                                                        value={formatVND(props.values.valueHouse, '.')}
                                                        onChangeText={(txt) => {
                                                            props.setFieldValue('valueHouse', convertToNumber(txt));
                                                        }}
                                                        onBlur={() => {
                                                            setValueUnitHouse(props.values?.dataPackHouseType?.id, props.values.valueHouse);
                                                            getFeeHouse(props.values.valueHouse, props.values.dataPackHouseType?.feeRate, duration?.value);
                                                        }}
                                                        keyboardType={'number-pad'}
                                                        currency
                                                    />
                                                </View>
                                                <View style={{ width: '46%' }}>
                                                    <FormikInput
                                                        baseColor={'#B3B2B3'}
                                                        textColor={'#8D8C8D'}
                                                        label={'Mức khấu trừ/vụ'}
                                                        value={unitHouse > 0 ? `${formatVND(unitHouse)}VNĐ/vụ` : ''}
                                                        editable={false}
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ paddingHorizontal: 10 }}>
                                                <FormikSelect
                                                    label={'Hiệu lực *'}
                                                    name={'houseExp'}
                                                    openModal={() => setModalExpHouse(true)}
                                                />
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                paddingHorizontal: 10,
                                                paddingBottom: 10,
                                                justifyContent: 'space-between',
                                            }}>
                                                <View style={{ width: '46%' }}>
                                                    {/* <ModalTimePicker
                                                        dateDefault={new Date()}
                                                        minimumDate={new Date()}
                                                        onPicker={(text) => onChangeBuyerBirthday(props, text)}
                                                    >
                                                        <FormikInput
                                                            label={'Thời hạn từ *'}
                                                            name={'dateFrom'}
                                                            keyboardType={'number-pad'}
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
                                                                changeDateTo(text);
                                                                setDateFrom(text);
                                                            }
                                                        }}
                                                        label={'Thời hạn từ *'}
                                                        minimumDate={moment().format('DD/MM/YYYY')}
                                                        errMinimum={ERROR_DATE_CURRENT}
                                                        requireFill
                                                    />
                                                </View>
                                                <View style={{ width: '46%' }}>
                                                    <FormikInput
                                                        baseColor={'#B3B2B3'}
                                                        textColor={'#8D8C8D'}
                                                        label={'Thời hạn đến'}
                                                        placeholder={'dd/mm/yyyy'}
                                                        value={dateTo}
                                                        editable={false}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.viewTable}>
                                            <View style={{
                                                flexDirection: 'row',
                                                padding: 10,
                                                paddingVertical: 15,
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                                backgroundColor: Color,
                                                alignItems: 'center',
                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        props.setFieldValue('check', !props.values.check);
                                                        // if (props.values.check) {
                                                        //     props.setFieldValue('inHouseType', '');
                                                        //     props.setFieldValue('dataInHouseType', {});
                                                        //     setUnitInHouse(0);
                                                        //     setFeeInHouse(0);
                                                        // }
                                                    }}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        flex: 1,
                                                    }}>
                                                    {
                                                        props.values.check
                                                            ? <IconCheckedBoxSvg width={20} height={20} color={colorBoxBorder1} />
                                                            : <IconBoxSvg width={20} height={20} color={colorBoxBorder1} />
                                                    }
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        marginLeft: 10,
                                                    }}>Bảo hiểm tài sản bên trong nhà</Text>
                                                </TouchableOpacity>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        textAlign: 'right',
                                                    }}>{formatVND(feeInHouse, '.')}VNĐ</Text>
                                                </View>
                                            </View>
                                            <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
                                                <FormikSelect
                                                    label={`Gói bảo hiểm${props.values.check ? ' *' : ''}`}
                                                    name={'inHouseType'}
                                                    openModal={() => setModalInHouseType(true)}
                                                    checkDisabled={!props.values.check}
                                                    hideIcon={!props.values.check}
                                                    baseColor={props.values.check ? colorText : '#B3B2B3'}
                                                />
                                                <FormikInput
                                                    baseColor={'#B3B2B3'}
                                                    textColor={'#8D8C8D'}
                                                    label={'Mức khấu trừ/vụ'}
                                                    value={unitInHouse > 0 ? `${formatVND(unitInHouse)}VNĐ/vụ` : ''}
                                                    editable={false}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ paddingBottom: 20 }}>
                                            <TotalFee
                                                feeHouse={feeHouse}
                                                feeInHouse={feeInHouse}
                                                check={props.values.check}
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
                                                    <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>{props.values.check ? roundNumber(valueCom + valueComInHouse) / 1000 : roundNumber(valueCom) / 1000}</Text>
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
                                                    (feeHouse === 0 && feeInHouse === 0)
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
        </View>
    );
}

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
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
        marginTop: 20,
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
    const idComSelected = state.selectCompany.idComSelected['H1'];
    return {
        idComSelected,
        infoHouse: state.houseInsurance.infoHouse,
        orgCodeUser: state.userInfo.orgCodeUser,
        dataTokenInsur: state.insurance.tokenInsur['H1'],
    }
};

export default connect(mapStateToProps, {
    saveHousePackages, getDistrict
})(Package);


