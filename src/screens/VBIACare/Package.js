import React, { useState, useEffect, useRef, Component } from 'react';
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
    Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';
import { savePackageInfo, setPackageInfo } from './actions/acare';
import SelectCompany from '../../components/listCompanySelect/SelectCompany';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { Color, colorBackground, colorBoxBorder, colorBoxBorder1, colorNote, colorText, colorTitle, nameApp, NewColor, NewColorDisable, textDisable, TxtColor, URL } from '../../config/System';
import { connect } from 'react-redux';
import _ from 'lodash';
import Input from '../CarInsurance/components/Input';
import moment from 'moment';
import axios from 'axios';
import Promotion from '../../components/promotion/Promotion';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import { checkLeapYear, checkMonth, formatVND, renderVND, isToManySpace } from '../../components/Functions';
import InputSelect from "../../components/buy/InputSelect";
import TotalFee from "./TotalFee";
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, roundNumber } from '../../utils/Util';
import jwt_decode from 'jwt-decode';
import { scrollInterpolator, animatedStyles } from '../24hInsurance/utils/animation';
import RenderPackage from './RenderPackage';
import CommissionACare from './CommissionACare';
import DateFill from '../../components/dateTimeFill/DateFill';
import { ERROR_DATE_CURRENT } from '../../config/ErrorMessage';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconCalculatorSvg from '../../config/images/icons/IconCalculatorSvg';
import IconCheckboxBlurSvg from '../../config/images/icons/IconCheckboxBlurSvg';
import Svg, { LinearGradient, Defs, Stop, Rect } from 'react-native-svg';
import IconSlideLeftSvg from '../../config/images/icons/IconSlideLeftSvg';
import IconSlideRightSvg from '../../config/images/icons/IconSlideRightSvg';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.92);

const dataPackages = [
    {
        name: 'Acare gói Cao cấp',
        code: 'BAN_LE_ACARE_4',
        money: 200000000
    },
    {
        name: 'Acare gói Nâng cao',
        code: 'BAN_LE_ACARE_3',
        money: 100000000
    },
    {
        name: 'Acare gói Tiêu chuẩn',
        code: 'BAN_LE_ACARE_2',
        money: 60000000
    },
    {
        name: 'Acare gói Phổ thông',
        code: 'BAN_LE_ACARE_1',
        money: 40000000
    },
];

class Package extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            indexSelected: props.packageInfo?.indexSelected || 0,
            arrFeeBase: [],
            arrFeeA53: [],
            arrFeeB3: [],
            arrFeeC: [],
            arrFeeD: [],
            valueCom: 0,
            dateTo: '',
            dateFrom: '',
        };
    }

    componentDidMount() {
        const { packageInfo, getNewFee } = this.props;
        if (packageInfo) {
            this.setState({
                indexSelected: packageInfo?.indexSelected,
                arrFeeBase: packageInfo?.arrFeeBase,
                arrFeeA53: packageInfo?.arrFeeA53,
                arrFeeB3: packageInfo?.arrFeeB3,
                arrFeeC: packageInfo?.arrFeeC,
                arrFeeD: packageInfo?.arrFeeD,
            });
            if (moment().diff(moment(packageInfo?.dateFrom, 'DD/MM/YYYY'), 'days') > 0) {
                this.setState({
                    dateFrom: moment().format('DD/MM/YYYY'),
                    dateTo: moment().add(12, 'months').format('DD/MM/YYYY')
                });
            } else {
                this.setState({
                    dateFrom: packageInfo?.dateFrom,
                    dateTo: packageInfo?.dateTo
                });
            }
            if (getNewFee) {
                this.getFee();
            }
        } else {
            this.setState({
                indexSelected: 0,
                dateFrom: moment().format('DD/MM/YYYY'),
                dateTo: moment().add(12, 'months').format('DD/MM/YYYY')
            });
            this.getFee();
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const { indexSelected } = this.state;
        if (indexSelected !== prevState.indexSelected) {
            this.getFee();
        }
    }

    getFee = () => {
        const { customerInfo } = this.props;
        const { indexSelected } = this.state;
        new Store().getSession(Const.TOKEN).then(token => {
            let url = `${URL}/api/contract/v1/vbi/fee?insureType=CN.20`;
            const arrCus = [];
            customerInfo.map((item) => {
                arrCus.push({
                    insuranceCode: dataPackages[indexSelected].code,
                    fullName: item?.fullName,
                    birthday: moment(item?.birthday, 'DD/MM/YYYY').format('YYYYMMDD'),
                    gender: item?.gender === 'Nam' ? 'NAM' : 'NU',
                    extention: 'A53,B3,C,D',
                    relation: item?.dataRelation?.code || ''
                });
            });
            let body = {
                insuredCustomers: arrCus
            }
            console.log('Urlllll :', url)
            console.log('Bodyyyy :', body)
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
                    console.log('Ressssss :', res)
                    if (res.status == 200 || res.status == 'success') {
                        if (res?.data?.data?.length > 0) {
                            this.setState({
                                arrFeeBase: res?.data?.data?.find(item => item?.name === 'Phí cơ bản')?.fees || [],
                                arrFeeA53: res?.data?.data?.find(item => item?.code === 'A53')?.fees || [],
                                arrFeeB3: res?.data?.data?.find(item => item?.code === 'B3')?.fees || [],
                                arrFeeC: res?.data?.data?.find(item => item?.code === 'C')?.fees || [],
                                arrFeeD: res?.data?.data?.find(item => item?.code === 'D')?.fees || [],
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        });
    }

    saveAndNext = (formik) => {
        const { savePackageInfo } = this.props;
        const {
            indexSelected,
            arrFeeBase,
            arrFeeA53,
            arrFeeB3,
            arrFeeC,
            arrFeeD,
            valueCom,
        } = this.state;
        let params = {
            dateFrom: formik?.values?.dateFrom,
            dateTo: formik?.values?.dateTo,
            duration: 12,
            arrFeeBase,
            arrFeeA53,
            arrFeeB3,
            arrFeeC,
            arrFeeD,
            packageCus: dataPackages[indexSelected],
            indexSelected,
            valueCom,
        };
        savePackageInfo(params);
        Actions.ACarePreview();
    };

    validation = Yup.object().shape({
        dateFrom: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),
    });

    setPkg = (code, arr) => {
        if (code === 'A53') {
            this.setState({
                arrFeeA53: arr
            });
        } else if (code === 'B3') {
            this.setState({
                arrFeeB3: arr
            });
        } else if (code === 'C') {
            this.setState({
                arrFeeC: arr
            });
        } else if (code === 'D') {
            this.setState({
                arrFeeD: arr
            });
        }
    };

    renderItem = ({ item }) => {
        return (
            <View
                style={[styles.itemContainer]}>
                <FastImage
                    source={{ uri: 'https://vj-claim.s3.amazonaws.com/8oo7zaZs-3.jpg' }}
                    style={{
                        borderRadius: 10,
                        width: '100%',
                        height: 230,
                    }}
                />
                <View style={{ alignItems: 'center', marginTop: -30, marginBottom: 24 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: Color, textTransform: 'uppercase' }}>{item?.name}</Text>
                    <View style={{ marginTop: 5, height: 3, width: 140, borderRadius: 35, backgroundColor: NewColor }} />
                    <Text style={{ marginTop: 5, fontSize: 12, fontWeight: '400', color: '#000' }}>Số tiền bảo hiểm</Text>
                    <Text style={{ marginTop: 5, fontSize: 20, fontWeight: 'bold', color: NewColor }}>
                        {formatVND(item?.money)}VNĐ
                    </Text>
                </View>
            </View>
        );
    };

    renderTotal = () => {
        const {
            arrFeeBase,
            arrFeeA53,
            arrFeeB3,
            arrFeeC,
            arrFeeD,
        } = this.state;
        const totalFeeBase = arrFeeBase.map(item => item?.fee)?.reduce((a, b) => a + b, 0);
        const totalFeeA53 = arrFeeA53.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0);
        const totalFeeB3 = arrFeeB3.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0);
        const totalFeeC = arrFeeC.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0);
        const totalFeeD = arrFeeD.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0);
        return totalFeeBase + totalFeeA53 + totalFeeB3 + totalFeeC + totalFeeD;
    }

    render() {
        const { customerInfo, packageInfo } = this.props;
        const {
            indexSelected,
            dateFrom,
            dateTo,
            arrFeeBase,
            arrFeeA53,
            arrFeeB3,
            arrFeeC,
            arrFeeD,
        } = this.state;
        const FormikInput = handleTextInput(Input);
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 1002 }}>
                    <ImageHeaderScroll code={'HC10'} offset={this.scrollYAnimatedValue} anchorHeader />
                </View>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2012
                }}>
                    <TouchableOpacity
                        onPress={() => Actions.ACareListCustomer()}
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
                <View style={{ zIndex: 2011 }}>
                    <HeaderScroll code={'HC10'} offset={this.scrollYAnimatedValue} anchorHeader />
                </View>
                <View style={[styles.contentContainer, { zIndex: 1000, marginTop: HEADER_MIN_HEIGHT }]}>
                    <SelectCompany productCode={'HC10'} showShadow />
                    <Formik
                        initialValues={{
                            dateFrom: dateFrom,
                            dateTo: dateTo,
                        }}
                        validationSchema={this.validation}
                        isInitialValid={true}
                        enableReinitialize={true}
                    >
                        {formik => {
                            return (
                                <View style={{ flex: 1 }}>
                                    <ScrollView
                                        contentContainerStyle={{
                                            paddingHorizontal: 24
                                        }}
                                        scrollEventThrottle={16}
                                        onScroll={Animated.event(
                                            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }],
                                            { useNativeDriver: false }
                                        )}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingBottom: 8,
                                            paddingTop: nameApp === 'IAGENT' || nameApp === 'INSO' ? 4 : 0
                                        }}>
                                            <IconCalculatorSvg width={15} height={15} />
                                            <Text style={{ color: colorTitle, fontSize: 16, fontWeight: 'bold', marginLeft: 8 }}>
                                                Chọn gói bảo hiểm và tính phí</Text>
                                        </View>
                                        <View style={{ marginTop: 10, marginBottom: 12, marginHorizontal: -24 }}>
                                            <View style={{
                                                position: 'absolute',
                                                top: 150,
                                                left: 13,
                                                alignItems: 'center'
                                            }}>
                                                <IconSlideLeftSvg width={15} height={15} />
                                            </View>
                                            <View style={{
                                                position: 'absolute',
                                                top: 150,
                                                right: 13,
                                                alignItems: 'center'
                                            }}>
                                                <IconSlideRightSvg width={15} height={15} />
                                            </View>
                                            <Carousel
                                                data={dataPackages}
                                                renderItem={this.renderItem}
                                                sliderWidth={SLIDER_WIDTH}
                                                itemWidth={ITEM_WIDTH}
                                                inactiveSlideShift={0}
                                                firstItem={packageInfo?.indexSelected || 0}
                                                onBeforeSnapToItem={(index) => this.setState({ indexSelected: index })}
                                                scrollInterpolator={scrollInterpolator}
                                                slideInterpolatedStyle={animatedStyles}
                                                useScrollView={true}
                                            />
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
                                                    }}>{dataPackages[indexSelected].name}</Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{
                                                        color: '#ffffff',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        textAlign: 'right',
                                                    }}>
                                                        {formatVND(this.renderTotal())}VNĐ
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
                                                        value={'12 tháng'}
                                                    />
                                                </View>
                                                <View style={{ flexDirection: 'row', paddingHorizontal: 10, }}>
                                                    <View style={{ flex: 1, paddingRight: 5 }}>
                                                        <DateFill
                                                            value={formik.values.dateFrom}
                                                            onChange={(text, err) => {
                                                                this.setState({ dateFrom: text });
                                                                formik.setFieldValue('dateFrom', text);
                                                                formik.setFieldValue('errDateFrom', err);
                                                                if (!err) {
                                                                    formik.setFieldValue('dateTo', moment(text, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY'));
                                                                    this.setState({ dateTo: moment(text, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY') });
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

                                                <RenderPackage
                                                    name={'Phí cơ bản'}
                                                    arrFee={arrFeeBase}
                                                    disabled={true}
                                                    value={arrFeeBase.map(item => item?.fee)?.reduce((a, b) => a + b, 0)}
                                                    checked={true}
                                                    viewDetail
                                                />
                                                <RenderPackage
                                                    name={'Trợ cấp nằm viện điều trị tai nạn'}
                                                    arrFee={arrFeeA53}
                                                    value={arrFeeA53.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0)}
                                                    checked={arrFeeA53.find(item => item?.status === 'active')}
                                                    codePkg={'A53'}
                                                    onSetPkg={(code, arr) => this.setPkg(code, arr)}
                                                />
                                                <RenderPackage
                                                    name={'Điều trị ngoại trú'}
                                                    arrFee={arrFeeB3}
                                                    value={arrFeeB3.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0)}
                                                    checked={arrFeeB3.find(item => item?.status === 'active')}
                                                    codePkg={'B3'}
                                                    onSetPkg={(code, arr) => this.setPkg(code, arr)}
                                                />
                                                <RenderPackage
                                                    name={'Chăm sóc thai sản (không bao gồm chi phí khám thai định kỳ)'}
                                                    arrFee={arrFeeC}
                                                    value={arrFeeC.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0)}
                                                    checked={arrFeeC.find(item => item?.status === 'active')}
                                                    codePkg={'C'}
                                                    onSetPkg={(code, arr) => this.setPkg(code, arr)}
                                                />
                                                <RenderPackage
                                                    name={'Chăm sóc và điều trị răng'}
                                                    arrFee={arrFeeD}
                                                    value={arrFeeD.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0)}
                                                    checked={arrFeeD.find(item => item?.status === 'active')}
                                                    codePkg={'D'}
                                                    onSetPkg={(code, arr) => this.setPkg(code, arr)}
                                                />
                                            </View>
                                        </View>
                                        <Promotion
                                            totalPrice={0}
                                            insurProductCode={'HC10'}
                                        />
                                        <View style={{ paddingTop: 20 }}>
                                            <View style={{
                                                flex: 1,
                                                backgroundColor: '#FFFFFF',
                                            }}>
                                                <View style={{
                                                    borderTopLeftRadius: 10, borderTopRightRadius: 10
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        padding: 10,
                                                        paddingVertical: 15,
                                                        borderTopLeftRadius: 10,
                                                        borderTopRightRadius: 10,
                                                        backgroundColor: Color,
                                                        justifyContent: 'center', alignItems: 'center'
                                                    }}>
                                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>TÍNH PHÍ BẢO HIỂM</Text>
                                                    </View>
                                                    <View style={{ backgroundColor: colorBackground }}>
                                                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12, marginTop: 16 }}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{dataPackages[indexSelected].name}</Text>
                                                            </View>
                                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{formatVND(arrFeeBase.map(item => item?.fee)?.reduce((a, b) => a + b, 0))}VNĐ</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={{ color: TxtColor, fontSize: 14 }}>- Phí cơ bản</Text>
                                                            </View>
                                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(arrFeeBase.map(item => item?.fee)?.reduce((a, b) => a + b, 0))}VNĐ</Text>
                                                            </View>
                                                        </View>
                                                        {
                                                            arrFeeA53.find(item => item?.status === 'active') ? (
                                                                <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                                                    <View style={{ flex: 1 }}>
                                                                        <Text style={{ color: TxtColor, fontSize: 14 }}>- Trợ cấp nằm viện điều trị tai nạn</Text>
                                                                    </View>
                                                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                        <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(arrFeeA53.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0))}VNĐ</Text>
                                                                    </View>
                                                                </View>
                                                            ) : null
                                                        }
                                                        {
                                                            arrFeeB3.find(item => item?.status === 'active') ? (
                                                                <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                                                    <View style={{ flex: 1 }}>
                                                                        <Text style={{ color: TxtColor, fontSize: 14 }}>- Điều trị ngoại trú</Text>
                                                                    </View>
                                                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                        <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(arrFeeB3.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0))}VNĐ</Text>
                                                                    </View>
                                                                </View>
                                                            ) : null
                                                        }
                                                        {
                                                            arrFeeC.find(item => item?.status === 'active') ? (
                                                                <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                                                    <View style={{ flex: 1 }}>
                                                                        <Text style={{ color: TxtColor, fontSize: 14 }}>- Chăm sóc thai sản (không bao gồm chi phí khám thai định kỳ)</Text>
                                                                    </View>
                                                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                        <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(arrFeeC.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0))}VNĐ</Text>
                                                                    </View>
                                                                </View>
                                                            ) : null
                                                        }
                                                        {
                                                            arrFeeD.find(item => item?.status === 'active') ? (
                                                                <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                                                    <View style={{ flex: 1 }}>
                                                                        <Text style={{ color: TxtColor, fontSize: 14 }}>- Chăm sóc và điều trị răng</Text>
                                                                    </View>
                                                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                        <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(arrFeeD.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0))}VNĐ</Text>
                                                                    </View>
                                                                </View>
                                                            ) : null
                                                        }
                                                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>Số người được bảo hiểm</Text>
                                                            </View>
                                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{customerInfo?.length}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        {
                                            Platform.OS === 'android' ? (
                                                <View style={{ marginHorizontal: -24 }}>
                                                    <Svg height="8" width="100%" style={{ zIndex: 1 }}>
                                                        <Defs>
                                                            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                                                <Stop offset="0" stopColor="#e6e6e6" stopOpacity="1" />
                                                                <Stop offset="1" stopColor="#e6e6e6" stopOpacity="0.01" />
                                                            </LinearGradient>
                                                        </Defs>
                                                        <Rect height="8" width="100%" fill="url(#grad)" />
                                                    </Svg>
                                                    <View style={{ paddingHorizontal: 24 }}>
                                                        <View style={{ marginTop: -8, paddingTop: 12, backgroundColor: colorBackground, paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 16 }}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={{ color: '#404142', fontSize: 14, fontWeight: 'bold' }}>Thanh toán:</Text>
                                                            </View>
                                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                                <Text style={{ textAlign: 'right', color: colorNote, fontSize: 14, fontWeight: 'bold' }}>
                                                                    {formatVND(this.renderTotal())}VNĐ
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <CommissionACare totalFee={this.renderTotal()} callBack={(value) => this.setState({valueCom: value})} />
                                                        <FooterButton>
                                                            <Button
                                                                disabled={
                                                                    formik.values.errDateFrom
                                                                }
                                                                label={'TIẾP TỤC'}
                                                                marginTop={10}
                                                                onPress={() => this.saveAndNext(formik)}
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
                                                <View style={{ paddingHorizontal: 24 }}>
                                                    <View style={{ marginTop: -8, paddingTop: 12, backgroundColor: colorBackground, paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 16 }}>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ color: '#404142', fontSize: 14, fontWeight: 'bold' }}>Thanh toán:</Text>
                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={{ textAlign: 'right', color: colorNote, fontSize: 14, fontWeight: 'bold' }}>
                                                                {formatVND(this.renderTotal())}VNĐ
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <CommissionACare totalFee={this.renderTotal()} callBack={(value) => this.setState({valueCom: value})} />
                                                    <FooterButton>
                                                        <Button
                                                            label={'TIẾP TỤC'}
                                                            marginTop={10}
                                                            onPress={() => this.saveAndNext(formik)}
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
            </View>
        );
    }
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
    itemContainer: {
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: NewColor,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
});

const mapStateToProps = (state) => {
    return ({
        customerInfo: state.acare.customerInfo,
        packageInfo: state.acare.packageInfo,
    })
};

const mapDispatchToProps = dispatch => {
    return {
        savePackageInfo: body => dispatch(savePackageInfo(body)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Package);


