import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { getDistrict } from '../CarInsurance/actions/car_Buy';
import Store from '../../services/Store';
import Const from '../../services/Const';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import DateFill from '../../components/dateTimeFill/DateFill';
import {
    ERROR_ADDRESS_REQUIRED,
    ERROR_BIRTHDAY_REQUIRED,
    ERROR_COMPANY_NAME_REQUIRED,
    ERROR_COMPANY_TAXCODE_REQUIRED,
    ERROR_DISTRICT_REQUIRED,
    ERROR_EMAIL_FORMAT,
    ERROR_EMAIL_REQUIRED,
    ERROR_IDENTITY_FORMAT,
    ERROR_IDENTITY_REQUIRED,
    ERROR_NAME_FORMAT,
    ERROR_NAME_REQUIRED,
    ERROR_PHONE_FORMAT,
    ERROR_PHONE_REQUIRED,
    ERROR_PROVINCE_REQUIRED,
    ERROR_COMPANY_NAME_FORMAT,
    ERROR_COMPANY_TAXCODE_FORMAT,
    ERROR_16_YEARS,
} from '../../config/ErrorMessage';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import ModalBuyerType from '../TravelInsurance/components/ModalBuyerType';
import {
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { Color, NewColor, NewColorDisable, colorText, colorTitle, TxtColor } from '../../config/System';
import Input from './components/Input';
import { Formik } from 'formik';
import { handleTextInput } from 'react-native-formik';
import * as Yup from 'yup';
import Button from '../../components/buy/Button';
import {
    validateName,
    validateCompanyName,
} from '../../config/Validation';
import InputSelect from './components/InputSelect';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import moment from 'moment';
import { isTaxCode, isIdentity, isPhoneAccident, isEmailAccident, isFullNameExpand } from '../../components/Functions';
import ModalSex from '../FlightInsurance/component/ModalSex';
import FooterButton from '../../components/FooterButton';
import { saveBuyerHouse } from './actions/houseActions';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconCheckboxBlurSvg from '../../config/images/icons/IconCheckboxBlurSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconEnvelopeSvg from '../../config/images/icons/IconEnvelopeSvg';
import IconCancelSvg from '../../config/images/icons/IconCancelSvg';

class Buyer extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            modalProvince: null,
            modalDistrict: null,
            modalBuyerType: null,
            modalGender: null,
            isBuyerModal: null,
        };
    }

    // Điền ngày sinh người mua
    onChangeBuyerBirthday = (formik, text) => {
        formik.setFieldValue('buyerBirthday', text);
    };

    // chọn tỉnh/tp
    setProvince = async (data, formik) => {
        if (this.state.isBuyerModal) {
            if (formik.values.buyerProvince !== data._name) {
                await formik.setFieldValue('buyerProvinceId', data.id);
                await formik.setFieldValue('buyerProvince', data._name);
                await formik.setFieldValue('buyerDistrictId', '');
                await formik.setFieldValue('buyerDistrict', '');
                if (formik.values.checkedSameInfo) {
                    await formik.setFieldValue('receiverProvinceId', data.id);
                    await formik.setFieldValue('receiverProvince', data._name);
                    await formik.setFieldValue('receiverDistrictId', '');
                    await formik.setFieldValue('receiverDistrict', '');
                }
            }
        } else {
            if (formik.values.receiverProvince !== data._name) {
                await formik.setFieldValue('receiverProvinceId', data.id);
                await formik.setFieldValue('receiverProvince', data._name);
                await formik.setFieldValue('receiverDistrictId', '');
                await formik.setFieldValue('receiverDistrict', '');
                if (formik.values.checkedSameInfo) {
                    await formik.setFieldValue('checkedSameInfo', false);
                }
            }
        }
        await this.props.getDistrict(data.id);
    };
    // chọn quận/huyện
    setDistrict = async (data, formik) => {
        if (this.state.isBuyerModal) {
            if (formik.values.buyerDistrict !== data._name) {
                await formik.setFieldValue('buyerDistrictId', data.id);
                await formik.setFieldValue('buyerDistrict', data._name);
                if (formik.values.checkedSameInfo) {
                    await formik.setFieldValue('receiverDistrictId', data.id);
                    await formik.setFieldValue('receiverDistrict', data._name);
                }
            }
        } else {
            if (formik.values.receiverDistrict !== data._name) {
                await formik.setFieldValue('receiverDistrictId', data.id);
                await formik.setFieldValue('receiverDistrict', data._name);
                if (formik.values.checkedSameInfo) {
                    await formik.setFieldValue('checkedSameInfo', false);
                }
            }
        }
    };
    // mở modal tỉnh/tp
    openProvinceModal = item => {
        if (item == 'buyer') {
            // => nếu bên mua bảo hiểm = cá nhân
            this.setState({
                isBuyerModal: true, // => set loại modal = cá nhân
                modalProvince: true,
            });
        } else {
            this.setState({
                isBuyerModal: false,
                modalProvince: true,
            });
        }
    };
    // mở modal quận/huyện
    openDistrictModal = item => {
        if (item == 'buyer') {
            // => nếu bên mua bảo hiểm = cá nhân
            this.setState({
                isBuyerModal: true, // => set loại modal = cá nhân
                modalDistrict: true,
            });
        } else {
            this.setState({
                isBuyerModal: false,
                modalDistrict: true,
            });
        }
    };
    // chọn giới tính
    setGender = (formik, data) => {
        formik.setFieldValue('buyerGender', data.name);
    };

    setScrollViewRef = element => {
        this.listRef = element;
    };

    // lưu thông tin vào redux
    storeInfomation = async values => {
        let body = {
            isValid: true,
            infoBuyer: values,
            receiveType: values.receiveType,
            buyerTypeId: values.isCompany ? 2 : 1,
            checkedSameInfo: values.checkedSameInfo,
        }
        body.infoBuyer.buyerName = values.buyerName.normalize().toUpperCase();
        body.infoBuyer.buyerEmail = values.buyerEmail.trim();
        body.infoBuyer.buyerIdentity = values.buyerIdentity.toUpperCase();
        body.infoBuyer.customerName = values.customerName.normalize().toUpperCase();
        body.infoBuyer.customerIdentity = values.customerIdentity.toUpperCase();
        body.infoBuyer.vatCompanyName = values.vatCompanyName.normalize().toUpperCase();
        body.infoBuyer.vatCompanyEmail = values.vatCompanyEmail.trim();
        body.infoBuyer.receiverName = values.receiverName.normalize().toUpperCase();
        body.infoBuyer.receiverEmail = values.receiverEmail.trim();
        this.props.saveBuyerHouse(body)
        this.listRef.scrollTo({ x: 0, y: 0, animated: true });
        Actions.PreviewHouse()
    };

    validateReceive = Yup.object().shape({
        companyName: Yup.string().when('isCompany', {
            // validate tên doanh nghiệp
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .test(
                    'companyName',
                    ERROR_COMPANY_NAME_FORMAT,
                    values => !validateCompanyName.test(values),
                )
                .required(ERROR_COMPANY_NAME_REQUIRED),
        }),
        companyTaxCode: Yup.string().when('isCompany', {
            // validate mã số thuế
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .required(ERROR_COMPANY_TAXCODE_REQUIRED)
                .test('companyTaxCode', ERROR_COMPANY_TAXCODE_FORMAT, values => isTaxCode(values)),
        }),

        buyerName: Yup.string()
            .strict(false)
            .trim()
            .test(
                'buyerName',
                ERROR_NAME_FORMAT,
                values => isFullNameExpand(values), // => validate tên người mua, check ký tự đặc biệt và chữ số
            )
            .required(ERROR_NAME_REQUIRED),
        // check isCompany = false => bắt validate cho bên mua bảo hiểm = cá nhân
        // buyerGender: Yup.string().required('Bạn phải chọn giới tính'),
        buyerBirthday: Yup.string().when('isCompany', {
            // validate ngày sinh người mua
            is: false,
            then:
                Yup.string()
                    .strict(false)
                    .trim()
                    .required(ERROR_BIRTHDAY_REQUIRED),
        }),
        buyerEmail: Yup.string() // validate email người mua
            .strict(false)
            .trim()
            .required(ERROR_EMAIL_REQUIRED)
            .test('buyerEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)),
        buyerPhone: Yup.string() // validate số điện thoại người mua
            .strict(false)
            .required(ERROR_PHONE_REQUIRED)
            .test('buyerPhone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)), // check validate định dạng sđt
        buyerIdentity: Yup.string().when('isCompany', {
            is: false,
            then:
                Yup.string() // vaidate cmnd/cccd
                    .strict(false)
                    .trim()
                    .required(ERROR_IDENTITY_REQUIRED)
                    .test(
                        'buyerIdentity',
                        ERROR_IDENTITY_FORMAT,
                        values => isIdentity(values), // check validate ký tự đặc biệt
                    ),
        }),
        buyerProvince: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp
        buyerDistrict: Yup.string().required(ERROR_DISTRICT_REQUIRED), // validate quận/huyện
        buyerAddress: Yup.string()
            .strict(false)
            .trim()
            .required(ERROR_ADDRESS_REQUIRED),
        customerName: Yup.string()
            .strict(false)
            .trim()
            .test(
                'customerName',
                ERROR_NAME_FORMAT,
                values => isFullNameExpand(values), // => validate tên người mua, check ký tự đặc biệt và chữ số
            )
            .required(ERROR_NAME_REQUIRED),
        customerPhone: Yup.string()
            .strict(false)
            .required(ERROR_PHONE_REQUIRED)
            .test('customerPhone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)),
        // validate form người nhận ấn chỉ bảo hiểm
        receiverName: Yup.string().when('receiveType', {
            is: true,
            then: Yup.string() // validate họ và tên người nhận
                .strict(false)
                .trim()
                .required(ERROR_NAME_REQUIRED)
                // check tên không được có ký tự đặc biệt và số
                .test(
                    'receiverName',
                    ERROR_NAME_FORMAT,
                    values => isFullNameExpand(values),
                ),
        }),
        receiverPhone: Yup.string().when('receiveType', {
            is: true,
            then: Yup.string() // validate số điện thoại người nhận
                .strict(false)
                .required(ERROR_PHONE_REQUIRED)
                .test('receiverPhone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)), // check validate định dạng sđt
        }),
        receiverEmail: Yup.string().when('receiveType', {
            is: true,
            then: Yup.string() // validate email người nhận
                .strict(false)
                .trim()
                .required(ERROR_EMAIL_REQUIRED)
                .test('receiverEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)),
        }),
        receiverProvince: Yup.string().when('receiveType', {
            is: true,
            then: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp
        }),
        receiverDistrict: Yup.string().when('receiveType', {
            is: true,
            then: Yup.string().required(ERROR_DISTRICT_REQUIRED), // validate quận/huyện
        }),
        receiverAddress: Yup.string().when('receiveType', {
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .required(ERROR_ADDRESS_REQUIRED),
        }),
        vatCompanyName: Yup.string().when('isCompany', {
            is: true,
            then: Yup.string().when('isVat', {
                is: true,
                then: Yup.string()
                    .strict(false)
                    .trim()
                    .test(
                        'vatCompanyName',
                        ERROR_COMPANY_NAME_FORMAT,
                        values => !validateCompanyName.test(values),
                    )
                    .required(ERROR_COMPANY_NAME_REQUIRED),
            }),
        }),
        vatCompanyTaxCode: Yup.string().when('isCompany', {
            is: true,
            then: Yup.string().when('isVat', {
                is: true,
                then: Yup.string()
                .strict(false)
                .required(ERROR_COMPANY_TAXCODE_REQUIRED)
                .test('vatCompanyTaxCode', ERROR_COMPANY_TAXCODE_FORMAT, values => isTaxCode(values)),
            }),
        }),
        vatCompanyEmail: Yup.string().when('isCompany', {
            is: true,
            then: Yup.string().when('isVat', {
                is: true,
                then: Yup.string() // validate email người mua
                .strict(false)
                .trim()
                .required(ERROR_EMAIL_REQUIRED)
                .test('vatCompanyEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)),
            }),
        }),
        vatCompanyAddress: Yup.string().when('isCompany', {
            is: true,
            then: Yup.string().when('isVat', {
                is: true,
                then: Yup.string()
                    .strict(false)
                    .trim()
                    .required(ERROR_ADDRESS_REQUIRED),
            }),
        }),
    });

    onAutoFill = async (formik) => {
        let values = formik.values;
        await formik.setFieldValue('checkedSameInfo', !formik.values.checkedSameInfo);
        if (!values.checkedSameInfo) {
            await formik.setFieldValue('receiverName', values.buyerName);
            await formik.setFieldValue('receiverPhone', values.buyerPhone);
            await formik.setFieldValue('receiverEmail', values.buyerEmail);
            await formik.setFieldValue('receiverProvince', values.buyerProvince);
            await formik.setFieldValue('receiverDistrict', values.buyerDistrict);
            await formik.setFieldValue('receiverProvinceId', values.buyerProvinceId);
            await formik.setFieldValue('receiverDistrictId', values.buyerDistrictId);
            await formik.setFieldValue('receiverAddress', values.buyerAddress);
        }
        await this.props.getDistrict(values.buyerProvinceId);
    };

    onFillVAT = async (formik) => {
        if (!formik.values.isVat && formik.values.isCompany) {
            await formik.setFieldValue('vatCompanyName', formik.values.companyName);
            await formik.setFieldValue('vatCompanyTaxCode', formik.values.companyTaxCode);
            await formik.setFieldValue('vatCompanyEmail', formik.values.buyerEmail);
            await formik.setFieldValue(
                'vatCompanyAddress',
                formik.values.buyerAddress + (formik?.values?.buyerDistrict ? `, ${formik?.values?.buyerDistrict}, ${formik?.values?.buyerProvince}` : '')
            );
        }
        await formik.setFieldValue('isVat', !formik.values.isVat)
    }
    
    handleChangeReceiveType = (formik) => {
        formik.setFieldValue('receiveType', !formik.values.receiveType)
    }

    onTextIdentity = (text, formik) => {
        if (text?.length > 0 && !isIdentity(text)) {
            formik.setFieldValue('errIdentity', ERROR_IDENTITY_FORMAT);
        } else if (!formik.values.isCompany && text === formik.values.buyerIdentity && formik.values.customerName !== formik.values.buyerName) {
            formik.setFieldValue('errIdentity', 'Dữ liệu trùng lặp');
        } else {
            formik.setFieldValue('errIdentity', '');
        }
    };

    onBlurTextIdentity = (formik) => {
        if (formik.values.customerIdentity === '') {
            formik.setFieldValue('errIdentity', ERROR_IDENTITY_REQUIRED);
        }
    };

    setBuyerType = (formik, data) => {
        formik.setFieldValue('isCompany', data.id === 2);
        if (data.id === 2) {
            formik.setFieldValue('errIdentity', '');
        }
    };

    // render form nhập thông tin
    renderFormInputInfomation = () => {
        let { buyer, infoBuyer } = this.props;
        const {
            modalProvince,
            modalDistrict,
            modalBuyerType,
            modalGender,
            isBuyerModal,
        } = this.state;
        const FormikInput = handleTextInput(Input);
        const FormikSelect = handleTextInput(InputSelect);
        return (
            <Formik
                initialValues={{
                    companyName: infoBuyer?.companyName || '',
                    companyTaxCode: infoBuyer?.companyTaxCode || '',
                    receiveType: buyer?.receiveType || false,
                    checkedSameInfo: buyer?.checkedSameInfo || false,
                    receiverName: infoBuyer?.receiverName || '',
                    receiverPhone: infoBuyer?.receiverPhone || '',
                    receiverEmail: infoBuyer?.receiverEmail || '',
                    receiverProvince: infoBuyer?.receiverProvince || '',
                    receiverDistrict: infoBuyer?.receiverDistrict || '',
                    receiverProvinceId: infoBuyer?.receiverProvinceId || '',
                    receiverDistrictId: infoBuyer?.receiverDistrictId || '',
                    receiverAddress: infoBuyer?.receiverAddress || '',
                    buyerEmail: infoBuyer?.buyerEmail || '',
                    buyerName: infoBuyer?.buyerName || '',
                    buyerGender: infoBuyer?.buyerGender || '',
                    buyerIdentity: infoBuyer?.buyerIdentity || '',
                    buyerPhone: infoBuyer?.buyerPhone || '',
                    buyerBirthday: infoBuyer?.buyerBirthday || '',
                    buyerProvince: infoBuyer?.buyerProvince || '',
                    buyerProvinceId: infoBuyer?.buyerProvinceId || '',
                    buyerDistrict: infoBuyer?.buyerDistrict || '',
                    buyerDistrictId: infoBuyer?.buyerDistrictId || '',
                    buyerAddress: infoBuyer?.buyerAddress || '',
                    customerName: infoBuyer?.customerName || '',
                    customerIdentity: infoBuyer?.customerIdentity || '',
                    customerPhone: infoBuyer?.customerPhone || '',
                    errIdentity: '',
                    isCompany: buyer?.buyerTypeId === 2,
                    isVat: infoBuyer?.isVat || false,
                    vatCompanyTaxCode: infoBuyer?.vatCompanyTaxCode || '',
                    vatCompanyName: infoBuyer?.vatCompanyName || '',
                    vatCompanyEmail: infoBuyer?.vatCompanyEmail || '',
                    vatCompanyAddress: infoBuyer?.vatCompanyAddress || '',
                }}

                onSubmit={values => this.storeInfomation(values)}
                validationSchema={this.validateReceive}
                isInitialValid={buyer?.isValid || false}>
                {formik => {
                    return (
                        <View style={{ marginBottom: 10 }}>
                            <ModalBuyerType
                                open={modalBuyerType}
                                onClosed={() => this.setState({ modalBuyerType: null })}
                                setBuyerType={data => this.setBuyerType(formik, data)}
                                onOpened={() => this.setState({ modalBuyerType: true })}
                            />
                            <ModalProvince
                                open={modalProvince}
                                onClosed={() => this.setState({ modalProvince: null })}
                                setProvince={data => this.setProvince(data, formik)}
                                onOpened={() => this.setState({ modalProvince: true })}
                                nameSelected={isBuyerModal ? formik.values.buyerProvince : formik.values.receiverProvince}
                            />
                            <ModalDistrict
                                open={modalDistrict}
                                onClosed={() => this.setState({ modalDistrict: null })}
                                setDistrict={data => this.setDistrict(data, formik)}
                                onOpened={() => this.setState({ modalDistrict: true })}
                                nameSelected={isBuyerModal ? formik.values.buyerDistrict : formik.values.receiverDistrict}
                            />
                            <ModalSex
                                open={modalGender}
                                onClosed={() => this.setState({ modalGender: null })}
                                setSex={data => this.setGender(formik, data)}
                                onOpened={() => this.setState({ modalGender: true })}
                                nameSelected={formik.values.buyerGender}
                            />
                            {/* Form nhập thông tin xuất hóa đơn VAT */}
                            <View>
                                <FormikSelect
                                    label={'Bên mua bảo hiểm *'}
                                    value={formik.values.isCompany ? 'Doanh nghiệp' : 'Cá nhân'}
                                    openModal={() => this.setState({ modalBuyerType: true })}
                                />
                                {
                                    formik.values.isCompany ?
                                        <>
                                            <FormikInput
                                                label={'Tên doanh nghiệp *'}
                                                name={'companyName'}
                                                autoCapitalize={'characters'}
                                                onBlur={() => {
                                                    formik.setFieldValue('companyName', formik.values.companyName.toUpperCase());
                                                }}
                                            />
                                            <FormikInput label={'Mã số thuế *'}
                                                maxLength={14}
                                                name={'companyTaxCode'}
                                            />
                                        </> : null
                                }
                                {
                                    !formik.values.isCompany ? (
                                        <>
                                            <FormikInput
                                                label={'Họ và tên người mua *'}
                                                name={'buyerName'}
                                                autoCapitalize={"characters"}
                                                onBlur={() => {
                                                    formik.setFieldValue('buyerName', formik.values.buyerName.toUpperCase());
                                                }}
                                                onChangeText={(text) => {
                                                    formik.values.checkedSameInfo && formik.setFieldValue('receiverName', text.toUpperCase());
                                                    formik.setFieldValue('customerName', text.toUpperCase());
                                                }}
                                            />
                                            <View style={[styles.inputRow]}>
                                                <View style={{ width: '46%' }}>
                                                    <FormikSelect
                                                        label={'Giới tính'}
                                                        name={'buyerGender'}
                                                        openModal={() => this.setState({ modalGender: true })}
                                                    />
                                                </View>
                                                <View style={{ width: '46%' }}>
                                                    {/* <ModalTimePicker
                                                        dateDefault={new Date(moment().subtract(16, 'years').valueOf())}
                                                        maximumDate={new Date(moment().subtract(16, 'years').valueOf())}
                                                        onPicker={(text) =>
                                                            this.onChangeBuyerBirthday(formik, text)
                                                        }
                                                    >
                                                        <FormikInput
                                                            label={'Ngày sinh *'}
                                                            name={'buyerBirthday'}
                                                            keyboardType={'number-pad'}
                                                            placeholder={'dd/mm/yyyy'}
                                                            maxLength={10}
                                                            editable={false}
                                                        />
                                                    </ModalTimePicker> */}
                                                    <DateFill
                                                        value={formik.values.buyerBirthday}
                                                        onChange={(text, err) => {
                                                            formik.setFieldValue('buyerBirthday', text);
                                                            formik.setFieldValue('errBuyerBirthday', err);
                                                        }}
                                                        label={'Ngày sinh *'}
                                                        maximumDate={moment().subtract(16, 'years').format('DD/MM/YYYY')}
                                                        errMaximum={ERROR_16_YEARS}
                                                        requireFill
                                                    />
                                                </View>
                                            </View>
                                        </>
                                    ) : null
                                }
                                <View style={styles.inputRow}>
                                    <View style={{ width: '46%' }}>
                                        {
                                            formik.values.isCompany ? (
                                                <FormikInput
                                                    label={'Họ và tên người mua *'}
                                                    name={'buyerName'}
                                                    autoCapitalize={"characters"}
                                                    onBlur={() => {
                                                        formik.setFieldValue('buyerName', formik.values.buyerName.toUpperCase());
                                                    }}
                                                    onChangeText={(text) => {
                                                        formik.values.checkedSameInfo && formik.setFieldValue('receiverName', text.toUpperCase());
                                                        formik.setFieldValue('customerName', text.toUpperCase());
                                                    }}
                                                />
                                            ) : (
                                                <FormikInput
                                                    label={'CMND/CCCD/Hộ chiếu *'}
                                                    name={'buyerIdentity'}
                                                    autoCapitalize={"characters"}
                                                    onBlur={() => {
                                                        formik.setFieldValue('buyerIdentity', formik.values.buyerIdentity.toUpperCase());
                                                    }}
                                                    keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                                    maxLength={12}
                                                    onChangeText={(text) => {
                                                        if (formik.values.buyerName === formik.values.customerName) {
                                                            formik.setFieldValue('customerIdentity', text.toUpperCase());
                                                        }
                                                        formik.setFieldValue('errIdentity', '');
                                                    }}
                                                />
                                            )
                                        }
                                    </View>
                                    <View style={{ width: '46%' }}>
                                        <FormikInput
                                            label={'Số điện thoại *'}
                                            name={'buyerPhone'}
                                            keyboardType={'number-pad'}
                                            maxLength={12}
                                            onChangeText={(text) => {
                                                formik.values.checkedSameInfo && formik.setFieldValue('receiverPhone', text);
                                                formik.setFieldValue('customerPhone', text);
                                            }}
                                        />
                                    </View>
                                </View>
                                <FormikInput
                                    label={'Email *'}
                                    name={'buyerEmail'}
                                    autoCapitalize={'none'}
                                    onChangeText={(text) => {
                                        formik.values.checkedSameInfo && formik.setFieldValue('receiverEmail', text);
                                    }}
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
                                    onChangeText={(text) => {
                                        formik.values.checkedSameInfo && formik.setFieldValue('receiverAddress', text);
                                    }}
                                />
                            </View>
                            {
                                formik.values.isCompany ? (
                                    <>
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: 16,
                                            }}
                                            name="isVat"
                                            onPress={() => this.onFillVAT(formik)}>
                                            {
                                                formik.values.isVat
                                                    ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                                    : <IconBoxSvg width={20} height={20} color={NewColor} />
                                            }
                                            <Text style={{ marginLeft: 8 }}>Xuất hóa đơn VAT</Text>
                                        </TouchableOpacity>
                                        {
                                            formik.values.isVat ? (
                                                <View>
                                                    <FormikInput
                                                        label={'Tên doanh nghiệp *'}
                                                        name={'vatCompanyName'}
                                                        autoCapitalize={"characters"}
                                                        onBlur={() => {
                                                            formik.setFieldValue('vatCompanyName', formik.values.vatCompanyName.toUpperCase());
                                                        }}
                                                    />
                                                    <FormikInput
                                                        label={'Mã số thuế *'}
                                                        maxLength={14}
                                                        name={'vatCompanyTaxCode'} 
                                                    />
                                                    <FormikInput
                                                        label={'Email *'}
                                                        name={'vatCompanyEmail'}
                                                        autoCapitalize={'none'}
                                                    />
                                                    <FormikInput
                                                        label={'Địa chỉ *'}
                                                        name={'vatCompanyAddress'}
                                                    />
                                                </View>
                                            ) : null
                                        }
                                    </>
                                ) : null
                            }
                            <View>
                                <View>
                                    <Text style={[styles.titleStyle, { marginLeft: 0, marginTop: 20 }]}>
                                        Thông tin người được bảo hiểm
                                    </Text>
                                </View>
                                <View style={{ marginTop: 25 }}>
                                    <View style={styles.formContainer}>
                                        <View style={styles.insuredCutomerFormContainer}>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: TxtColor }}>
                                                    Họ và tên
                                                </Text>
                                            </View>
                                            <View style={{ flex: 0.5, marginTop: -30 }}>
                                                <FormikInput
                                                    name={'customerName'}
                                                    autoCapitalize={"characters"}
                                                    onBlur={() => {
                                                        formik.setFieldValue('customerName', formik.values.customerName.toUpperCase());
                                                    }}
                                                    onChangeText={() => {
                                                        if (!formik.values.isCompany) {
                                                            formik.setFieldValue('customerIdentity', '');
                                                        }
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.insuredCutomerFormContainer}>
                                            <View style={{ flex: 0.5, paddingRight: 5 }}>
                                                <Text style={{ fontSize: 14, color: '#8D8C8D' }}>CMND/CCCD/Hộ chiếu</Text>
                                            </View>
                                            <View style={{ flex: 0.5, marginTop: -30 }}>
                                                <FormikInput
                                                    name={'customerIdentity'}
                                                    autoCapitalize={"characters"}
                                                    onBlur={() => {
                                                        formik.setFieldValue('customerIdentity', formik.values.customerIdentity.toUpperCase());
                                                        this.onBlurTextIdentity(formik);
                                                    }}
                                                    keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                                    maxLength={12}
                                                    error={formik.values.errIdentity}
                                                    onChangeText={(text) => this.onTextIdentity(text, formik)}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.insuredCutomerFormContainer}>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Số điện thoại</Text>
                                            </View>
                                            <View style={{ flex: 0.5, marginTop: -30 }}>
                                                <FormikInput
                                                    name={'customerPhone'}
                                                    keyboardType={'number-pad'}
                                                    maxLength={12}
                                                />
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                formik.setFieldValue('customerName', '');
                                                formik.setFieldValue('customerIdentity', '');
                                                formik.setFieldValue('customerPhone', '');
                                            }}
                                            style={{ alignItems: 'center', marginTop: 10 }}>
                                            <IconCancelSvg width={20} height={20} color={Color} style={{opacity: 0.5}} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.titleContainer, { paddingTop: 24 }]}>
                                <IconEnvelopeSvg width={15} height={15} />
                                <Text style={styles.titleStyle}>Hình thức giao nhận</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                    <IconCheckboxBlurSvg width={20} height={20} />
                                    <Text style={{ marginLeft: 8, marginRight: 12 }}>
                                        Giấy chứng nhận bảo hiểm điện tử gửi tới email của quý khách
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 12 }}>
                                    <TouchableOpacity
                                        onPress={() => this.handleChangeReceiveType(formik)}>
                                        {
                                            formik.values.receiveType
                                                ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                                : <IconBoxSvg width={20} height={20} color={NewColor} />
                                        }
                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: 8, marginRight: 12 }}>
                                        Giấy chứng nhận bảo hiểm sẽ được gửi qua đường chuyển phát nhanh (EMS) đến địa chỉ quý khách đã cung cấp
                                    </Text>
                                </View>
                            </View>

                            {/* Form nhập thông tin địa chỉ nhận ấn chỉ bảo hiểm */}
                            {
                                formik.values.receiveType ?
                                    <View>
                                        <View>
                                            <Text style={[styles.titleStyle, { marginLeft: 0 }]}>
                                                Địa chỉ nhận ấn chỉ bảo hiểm
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', paddingTop: 15 }}
                                            onPress={() => this.onAutoFill(formik)}>
                                            {
                                                formik.values.checkedSameInfo
                                                    ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                                    : <IconBoxSvg width={20} height={20} color={NewColor} />
                                            }
                                            <Text style={{ marginLeft: 8 }}>Thông tin như trên</Text>
                                        </TouchableOpacity>
                                        <FormikInput
                                            label={'Họ và tên người nhận *'}
                                            name={'receiverName'}
                                            autoCapitalize={'characters'}
                                            onBlur={() => {
                                                formik.setFieldValue('receiverName', formik.values.receiverName.toUpperCase());
                                            }}
                                            onChangeText={() => {
                                                formik.values.checkedSameInfo && formik.setFieldValue('checkedSameInfo', false);
                                            }}
                                        />
                                        <View style={styles.inputRow}>
                                            <View style={{ width: '46%' }}>
                                                <FormikInput
                                                    label={'Số điện thoại *'}
                                                    name={'receiverPhone'}
                                                    keyboardType={'number-pad'}
                                                    maxLength={12}
                                                    onChangeText={() => {
                                                        formik.values.checkedSameInfo && formik.setFieldValue('checkedSameInfo', false);
                                                    }}
                                                />
                                            </View>
                                            <View style={{ width: '46%' }}>
                                                <FormikInput
                                                    label={'Email *'}
                                                    name={'receiverEmail'}
                                                    autoCapitalize={'none'}
                                                    onChangeText={() => {
                                                        formik.values.checkedSameInfo && formik.setFieldValue('checkedSameInfo', false);
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.inputRow}>
                                            <View style={{ width: '46%' }}>
                                                <FormikSelect
                                                    label={'Tỉnh/Thành phố *'}
                                                    name={'receiverProvince'}
                                                    openModal={() => this.openProvinceModal('receiver')}
                                                />
                                            </View>
                                            <View style={{ width: '46%' }}>
                                                <FormikSelect
                                                    label={`Quận/Huyện${formik.values.receiverProvince ? ' *' : ''}`}
                                                    name={'receiverDistrict'}
                                                    openModal={() => this.openDistrictModal('receiver')}
                                                    checkDisabled={!formik.values.receiverProvince}
                                                    hideIcon={!formik.values.receiverProvince}
                                                    baseColor={formik.values.receiverProvince ? colorText : '#8D8C8D'}
                                                />
                                            </View>
                                        </View>
                                        <FormikInput
                                            label={'Địa chỉ (Số nhà, phường, xã) *'}
                                            name={'receiverAddress'}
                                            onChangeText={() => {
                                                formik.values.checkedSameInfo && formik.setFieldValue('checkedSameInfo', false);
                                            }}
                                        />
                                    </View> : null
                            }
                            <View style={{ marginVertical: 12 }}>
                                <FooterButton>
                                    <Button
                                        color={
                                            !formik.isValid ||
                                            (formik.values.errBuyerBirthday && !formik.values.isCompany) ||
                                            formik.values.errIdentity.length > 0 ||
                                            formik.values.customerIdentity.length === 0 ?
                                            NewColorDisable : NewColor
                                        }
                                        label={'TIẾP TỤC'}
                                        width={'100%'}
                                        onPress={formik.handleSubmit}
                                        disable={
                                            !formik.isValid ||
                                            (formik.values.errBuyerBirthday && !formik.values.isCompany) ||
                                            formik.values.errIdentity.length > 0 ||
                                            formik.values.customerIdentity.length === 0
                                        }
                                    />
                                </FooterButton>
                            </View>
                        </View>
                    )
                }}
            </Formik>
        );
    };

    render() {
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
                    <Animated.View style={{zIndex: headerZIndex}}>
                        <ImageHeaderScroll code={'H1'} offset={this.scrollYAnimatedValue} />
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
                        <HeaderScroll code={'H1'} offset={this.scrollYAnimatedValue} />
                    </View>
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
                            <View style={styles.titleContainer}>
                                <IconBuyerSvg height={15} width={15} color={Color} />
                                <Text style={styles.titleStyle}>
                                    Thông tin bên mua bảo hiểm
                                </Text>
                            </View>
                            {this.renderFormInputInfomation()}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        paddingVertical: 16,
        paddingHorizontal: 13,
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
        paddingTop: 24
    },
    styleTab: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center',
    },
    viewTable: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1, backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10,
    },
});

const mapStateToProps = state => ({
    buyer: state.houseInsurance.buyer,
    infoBuyer: state.houseInsurance.buyer?.infoBuyer,
});
const mapDispatchToProps = dispatch => {
    return {
        getDistrict: id => dispatch(getDistrict(id)),
        saveBuyerHouse: body => dispatch(saveBuyerHouse(body))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Buyer);
