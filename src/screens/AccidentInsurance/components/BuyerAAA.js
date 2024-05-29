import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform, Animated,
    ScrollView,
} from 'react-native';
import {
    ERROR_ADDRESS_REQUIRED,
    ERROR_BIRTHDAY_REQUIRED,
    ERROR_EMAIL_FORMAT,
    ERROR_EMAIL_REQUIRED,
    ERROR_IDENTITY_FORMAT,
    ERROR_IDENTITY_REQUIRED,
    ERROR_NAME_FORMAT,
    ERROR_NAME_REQUIRED,
    ERROR_PHONE_FORMAT,
    ERROR_PHONE_REQUIRED,
    ERROR_PROVINCE_REQUIRED,
    ERROR_16_YEARS,
} from '../../../config/ErrorMessage';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import {
    widthPercentageToDP,
} from '../../../config/ConfigResponsive';
import { Color, colorText, colorTitle, NewColor, NewColorDisable } from '../../../config/System';
import Input from '../../CarInsurance/components/Input';
import { Formik } from 'formik';
import { handleTextInput } from 'react-native-formik';
import * as Yup from 'yup';
import Button from '../../../components/buy/Button';
import InputSelect from '../../../components/buy/InputSelect';
import ModalProvince from '../../CarInsurance/components/ModalProvince';
import ModalDistrict from '../../CarInsurance/components/ModalDistrict';
import {
    isPhoneAccident,
    isIdentity,
    isEmailAccident,
    isFullNameExpand
} from '../../../components/Functions';
import ModalSex from '../../FlightInsurance/component/ModalSex';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../../utils/Util';
import HeaderScroll from '../../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../../components/header/ImageHeaderScroll';
import DateFill from '../../../components/dateTimeFill/DateFill';
import IconBuyerSvg from '../../../config/images/icons/IconBuyerSvg';

class Buyer extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            modalProvince: null,
            modalDistrict: null,
            modalGender: null,
        };
    }

    confirmPicker = (date, formik, err) => {
        formik.setFieldValue('buyerBirthday', date);
        formik.setFieldValue('errBuyerBirthday', err);
    };

    // chọn tỉnh/tp
    setProvince = async (data, formik) => {
        if (formik.values.buyerProvince !== data._name) {
            await formik.setFieldValue('provinceId', data.id);
            await formik.setFieldValue('buyerProvince', data._name);
            await formik.setFieldValue('buyerDistrict', '');
        }
        await this.props.getDistrict(data.id);
    };
    // chọn quận/huyện
    setDistrict = async (data, formik) => {
        if (formik.values.buyerDistrict !== data._name) {
            await formik.setFieldValue('districtId', data.id);
            await formik.setFieldValue('buyerDistrict', data._name);
        }
    };
    // mở modal tỉnh/tp
    openProvinceModal = () => {
        this.setState({
            modalProvince: true,
        });
    };
    // mở modal quận/huyện
    openDistrictModal = () => {
        this.setState({
            modalDistrict: true,
        });
    };
    // chọn giới tính
    setGender = (formik, data) => {
        formik.setFieldValue('buyerGender', data.name);
    };
    // lưu thông tin vào redux
    storeInfomation = async values => {
        let body = values;
        body.buyerName = values.buyerName.normalize().toUpperCase();
        body.buyerEmail = values.buyerEmail.trim();
        body.buyerIdentity = values.buyerIdentity.toUpperCase();
        await this.props.saveBuyerAAA(body);
        this.onNext();
    };
    // validate form người mua bảo hiểm
    validation = Yup.object().shape({
        buyerName: Yup.string()
            .strict(false)
            .trim()
            .test(
                'buyerName',
                ERROR_NAME_FORMAT,
                values => isFullNameExpand(values),
            )
            .required(ERROR_NAME_REQUIRED),
        buyerGender: Yup.string().required('Bạn phải chọn giới tính'),
        buyerBirthday: Yup.string()
            .strict(false)
            .trim()
            .required(ERROR_BIRTHDAY_REQUIRED),
        buyerAddress: Yup.string()
            .strict(false)
            .trim()
            .required(ERROR_ADDRESS_REQUIRED),
        buyerEmail: Yup.string() // validate email người mua
            .strict(false)
            .trim()
            .required(ERROR_EMAIL_REQUIRED)
            .test('buyerEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)), // check validate định dạng email bao gồm @ và domain
        buyerPhone: Yup.string() // validate số điện thoại người mua
            .strict(false)
            .required(ERROR_PHONE_REQUIRED)
            .test('buyerPhone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)), // check validate định dạng sđt
        buyerIdentity: Yup.string() // vaidate cmnd/cccd
            .required(ERROR_IDENTITY_REQUIRED)
            .test(
                'buyerIdentity',
                ERROR_IDENTITY_FORMAT,
                values => isIdentity(values), // check validate ký tự đặc biệt
            ),
        buyerProvince: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp
        buyerDistrict: Yup.string().required('Chưa chọn quận/huyện'), // validate quận/huyện
    });

    setScrollViewRef = element => {
        this.listRef = element;
    };

    onNext = () => {
        this.listRef.scrollTo({ x: 0, y: 0, animated: true });
        Actions.InsurCustomerAAA();
    };

    render() {
        const {buyerAAA} = this.props;
        const {
            modalProvince,
            modalDistrict,
            modalGender,
        } = this.state;
        const FormikInput = handleTextInput(Input);
        const FormikSelect = handleTextInput(InputSelect);
        const headerZIndex = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [999, 1001, 1002],
                extrapolate: 'clamp'
            });

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={{ flex: 1 }}>
                    <Animated.View style={{ zIndex: headerZIndex }}>
                        <ImageHeaderScroll code={'A1'} offset={this.scrollYAnimatedValue} />
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
                                source={require('../../../icons/ic_back.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ zIndex: 2011 }}>
                        <HeaderScroll code={'A1'} offset={this.scrollYAnimatedValue} />
                    </View>
                    <Formik
                        initialValues={{
                            buyerAddress: buyerAAA?.buyerAddress || '',
                            buyerEmail: buyerAAA?.buyerEmail || '',
                            buyerName: buyerAAA?.buyerName || '',
                            buyerGender: buyerAAA?.buyerGender || '',
                            buyerIdentity: buyerAAA?.buyerIdentity || '',
                            buyerPhone: buyerAAA?.buyerPhone || '',
                            buyerBirthday: buyerAAA?.buyerBirthday || '',
                            provinceId: buyerAAA?.provinceId || 0,
                            buyerProvince: buyerAAA?.buyerProvince || '',
                            districtId: buyerAAA?.districtId || 0,
                            buyerDistrict: buyerAAA?.buyerDistrict || '',
                        }}
                        onSubmit={values => this.storeInfomation(values)}
                        validationSchema={this.validation}
                        isInitialValid={buyerAAA?.buyerName?.length > 0}>
                        {formik => (
                            <>
                                <ScrollView
                                    style={{ zIndex: 1000 }}
                                    contentContainerStyle={{
                                        paddingTop: HEADER_MAX_HEIGHT
                                    }}
                                    ref={this.setScrollViewRef}
                                    scrollEventThrottle={16}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }],
                                        { useNativeDriver: false }
                                    )}>
                                    <View style={styles.contentContainer}>
                                        <View style={[styles.titleContainer, { marginTop: 20 }]}>
                                            <IconBuyerSvg height={15} width={15} color={Color} />
                                            <Text style={styles.titleStyle}>
                                                Thông tin bên mua bảo hiểm:
                                            </Text>
                                        </View>
                                        <ModalProvince
                                            open={modalProvince}
                                            onClosed={() => this.setState({ modalProvince: null })}
                                            setProvince={data => this.setProvince(data, formik)}
                                            onOpened={() => this.setState({ modalProvince: true })}
                                            nameSelected={formik.values.buyerProvince}
                                        />
                                        <ModalDistrict
                                            open={modalDistrict}
                                            onClosed={() => this.setState({ modalDistrict: null })}
                                            setDistrict={data => this.setDistrict(data, formik)}
                                            onOpened={() => this.setState({ modalDistrict: true })}
                                            nameSelected={formik.values.buyerDistrict}
                                        />
                                        <ModalSex
                                            open={modalGender}
                                            onClosed={() => this.setState({ modalGender: null })}
                                            setSex={data => this.setGender(formik, data)}
                                            onOpened={() => this.setState({ modalGender: true })}
                                            nameSelected={formik.values.buyerGender}
                                        />
                                        <View>
                                            <FormikInput
                                                label={'Họ và tên *'}
                                                name={'buyerName'}
                                                onBlur={() => {
                                                    formik.setFieldValue('buyerName', formik.values.buyerName.toUpperCase());
                                                }}
                                                autoUpperCase
                                            />
                                            <View style={styles.inputRow}>
                                                <View style={{ width: '46%', marginTop: 5 }}>
                                                    <FormikSelect
                                                        label={'Giới tính *'}
                                                        name={'buyerGender'}
                                                        openModal={() => this.setState({ modalGender: true })}
                                                    />
                                                </View>
                                                <View style={{ width: '46%' }}>
                                                    <DateFill
                                                        value={formik.values.buyerBirthday}
                                                        onChange={(text, err) => {
                                                            this.confirmPicker(text, formik, err);
                                                        }}
                                                        label={'Ngày sinh *'}
                                                        maximumDate={moment().subtract(16, 'years').format('DD/MM/YYYY')}
                                                        errMaximum={ERROR_16_YEARS}
                                                        requireFill
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.inputRow}>
                                                <View style={{ width: '46%' }}>
                                                    <FormikInput
                                                        label={'CMND/CCCD/Hộ chiếu *'}
                                                        name={'buyerIdentity'}
                                                        maxLength={12}
                                                        onBlur={() => {
                                                            formik.setFieldValue('buyerIdentity', formik.values.buyerIdentity.toUpperCase());
                                                        }}
                                                        autoUpperCase
                                                        keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                                    />
                                                </View>
                                                <View style={{ width: '46%' }}>
                                                    <FormikInput
                                                        label={'Số điện thoại *'}
                                                        name={'buyerPhone'}
                                                        keyboardType={'number-pad'}
                                                        maxLength={12}
                                                    />
                                                </View>
                                            </View>
                                            <FormikInput
                                                label={'Email *'}
                                                name={'buyerEmail'}
                                                keyboardEmail
                                            />
                                            <View style={styles.inputRow}>
                                                <View style={{ width: '46%' }}>
                                                    <FormikSelect
                                                        label={'Tỉnh/Thành phố *'}
                                                        name={'buyerProvince'}
                                                        openModal={() => this.openProvinceModal('buyer')}
                                                    />
                                                </View>
                                                <View style={{ width: '46%' }}>
                                                    <FormikSelect
                                                        label={`Quận/Huyện${formik.values.buyerProvince ? ' *' : ''}`}
                                                        name={'buyerDistrict'}
                                                        openModal={() => this.openDistrictModal('buyer')}
                                                        checkDisabled={!formik.values.buyerProvince}
                                                        hideIcon={!formik.values.buyerProvince}
                                                        baseColor={formik.values.buyerProvince ? colorText : '#8D8C8D'}
                                                    />
                                                </View>
                                            </View>
                                            <FormikInput
                                                label={'Địa chỉ (Số nhà, phường, xã) *'}
                                                name={'buyerAddress'}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                                <View style={{ marginVertical: 20, paddingHorizontal: 24 }}>
                                    <Button
                                        color={
                                            !formik.isValid ||
                                                formik.values.errBuyerBirthday ?
                                                NewColorDisable : NewColor
                                        }
                                        label={'TIẾP TỤC'}
                                        onPress={formik.handleSubmit}
                                        disable={
                                            !formik.isValid ||
                                            formik.values.errBuyerBirthday
                                        }
                                    />
                                </View>
                            </>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ctBack: {
        zIndex: 1002,
    },
    icBack: {
        height: 15,
        width: (15 * 21) / 39,
    },
    headerContent: {
        marginTop: isIPhoneX ? 15 : 5,
        padding: 24,
        position: 'absolute',
        left: 0,
        zIndex: 2012,
    },
    animatedHeaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleHeader: {
        paddingHorizontal: 8,
        marginTop: 100,
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
        paddingHorizontal: 24,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTitle,
        marginLeft: 8,
    },
    insuredCutomerFormContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    formContainer: {
        alignSelf: 'center',
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        padding: 16,
        width: widthPercentageToDP('87'),
    },
    inputRow: {
        marginTop: -5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noteTextStyle: {
        fontStyle: 'italic',
        color: Color,
        marginVertical: 12,
    },
});

import { connect } from 'react-redux';
import { getDistrict } from '../../CarInsurance/actions/car_Buy';
import {
    saveBuyerAAA,
} from '../actions/accident_buy';
import moment from 'moment';

const mapStateToProps = (state) => {
    return {
        buyerAAA: state.accidentBuy.buyerAAA,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDistrict: id => dispatch(getDistrict(id)),
        saveBuyerAAA: body => dispatch(saveBuyerAAA(body)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Buyer);
