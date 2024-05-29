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
import {
    ERROR_16_YEARS,
    ERROR_ADDRESS_REQUIRED,
    ERROR_BIRTHDAY_FORMAT,
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
    ERROR_REPRESENT_ROLE_REQUIRED,
} from '../../config/ErrorMessage';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import NavWithImage from '../../components/NavWithImage';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { Color, colorText, colorTitle, NewColor, NewColorDisable, subColor } from '../../config/System';
import Input from './components/Input';
import { Formik } from 'formik';
import { handleTextInput } from 'react-native-formik';
import * as Yup from 'yup';
import Button from '../../components/buy/Button';
import {
    validateIdentity,
    validateName,
    validateNumber,
} from '../../config/Validation';
import InputSelect from './components/InputSelect';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import moment from 'moment';
import { checkLeapYear, checkMonth, isPhone, isIdentity, isPhoneAccident, isEmailAccident, isFullNameExpand } from '../../components/Functions';
import SimpleToast from 'react-native-simple-toast';
import ModalSex from '../FlightInsurance/component/ModalSex';
import FooterButton from '../../components/FooterButton';
import { saveBuyerMotorPhysical } from './actions/motorActions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmail } from './components/Validate'
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX} from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconCheckboxBlurSvg from '../../config/images/icons/IconCheckboxBlurSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconEnvelopeSvg from '../../config/images/icons/IconEnvelopeSvg';
import DateFill from '../../components/dateTimeFill/DateFill';

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
            currentDate: '',
            name: '',
            identityNumber: '',
            birthday: '',
            insuredCustomers: [],
            birthdayChanged: '',
            buyerTypeId: 1,
            errorInsuredCutomerName: '',
            errorInsuredCustomerBirthday: '',
            errorInsuredCustomerIdentity: '',
            dataProvince: '',
            dataProvinceReceiver: '',
            dataDistrictReceiver: '',
            dataDistrict: '',
            gender: '',
            openModal: false
        };
    }


    componentWillMount() {
        new Store().getSession(Const.TOKEN).then(token => {
            if (checkExpToken(token) == false) {
                this.setState({
                    openModal: true
                })
            }

        })
    }
    gotoLogin = () => {
        this.setState({
            openModal: false
        })
        new Store().storeSession(Const.TOKEN, null)
        new Store().storeSession(Const.IS_LOGIN, null)
        Actions.LoginNew()
    }
    componentDidMount() {
        // console.log('sdfasdfasdf====111',moment('11/11/11..','DD/MM/YYYY',true).format('YYYY'))
        let { buyer, infoBuyer } = this.props

        this.setState({
            dataProvince: buyer?.dataProvince,
            dataDistrict: buyer?.dataDistrict,
            dataDistrictReceiver: buyer?.dataDistrictReceiver,
            dataProvinceReceiver: buyer?.dataProvinceReceiver,
            gender: buyer?.gender,

        })
        this.getCurrentDate();
    }

    // Lấy ngày hiện tại
    getCurrentDate = () => {
        const date = new Date();
        const parsedDate = moment(date, 'DD/MM/YYYY');
        const a = parsedDate.format('MM/DD/YYYY');
        this.setState({ currentDate: a });
    };

    // Điền ngày sinh người mua
    onChangeBuyerBirthday = (formik, text) => {
        formik.setFieldValue('buyerBirthday', text);
    };

    // chọn tỉnh/tp
    setProvince = async (data, formik) => {
        if (this.state.isBuyerModal) {
            if (formik.values.buyerProvince !== data._name) {
                await formik.setFieldValue('buyerProvince', data._name);
                await formik.setFieldValue('buyerDistrict', '');
                await this.setState({
                    dataProvince: data,
                })
                if (formik.values.checkedSameInfo) {
                    await formik.setFieldValue('receiverProvince', data._name);
                    await formik.setFieldValue('receiverDistrict', '');
                    await this.setState({
                        dataProvinceReceiver: data,
                    })
                }
            }
        } else {
            if (formik.values.receiverProvince !== data._name) {
                await formik.setFieldValue('receiverProvince', data._name);
                await formik.setFieldValue('receiverDistrict', '');
                await this.setState({
                    dataProvinceReceiver: data,
                })
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
                await formik.setFieldValue('buyerDistrict', data._name);
                await this.setState({
                    dataDistrict: data,
                })
                if (formik.values.checkedSameInfo) {
                    await formik.setFieldValue('receiverDistrict', data._name);
                    await this.setState({
                        dataDistrictReceiver: data,
                    })
                }
            }
        } else {
            if (formik.values.receiverDistrict !== data._name) {
                await formik.setFieldValue('receiverDistrict', data._name);
                await this.setState({
                    dataDistrictReceiver: data,
                })
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
        this.setState({
            gender: data
        })
    };
    // sửa tên người được bảo hiểm đã thêm
    onChangeName = (text, index) => {
        const { insuredCustomers } = this.state;
        insuredCustomers[index].fullName = text;
        this.setState({ insuredCustomers: insuredCustomers });
    };
    // sửa số cmnd người được bảo hiểm đã thêm
    onChangeIdentityNumber = (text, index) => {
        const { insuredCustomers } = this.state;
        insuredCustomers[index].identityNumber = text;
        this.setState({ insuredCustomers: insuredCustomers });
    };
    // sửa ngày sinh người được bảo hiểm đã thêm
    onChangeBirthday = async (text, index) => {
        const { insuredCustomers } = this.state;
        let str = text;
        if (text.length === 2 && this.state.birthdayChanged.charAt(2) !== '/') {
            let a = str.slice(0, 2);
            await this.setState({ birthdayChanged: (text += '/') });
            insuredCustomers[index].birthday = this.state.birthdayChanged;
            await this.setState({ insuredCustomers: insuredCustomers });
            if (parseInt(a) > 31 || parseInt(a) == 0) {
                SimpleToast.show('Ngày sinh không hợp lệ');
                this.setState({ birthdayChanged: '' });
            }
        } else if (
            text.length === 5 &&
            this.state.birthdayChanged.charAt(5) !== '/'
        ) {
            let a = str.slice(3, 5);
            await this.setState({ birthdayChanged: (text += '/') });
            insuredCustomers[index].birthday = this.state.birthdayChanged;
            await this.setState({ insuredCustomers: insuredCustomers });
            if (parseInt(a) > 12 || parseInt(a) == 0) {
                SimpleToast.show('Ngày sinh không hợp lệ');
                this.setState({
                    birthdayChanged: this.state.birthdayChanged.slice(0, 3),
                });
            }
        } else {
            await this.setState({ birthdayChanged: text });
            insuredCustomers[index].birthday = this.state.birthdayChanged;
            await this.setState({ insuredCustomers: insuredCustomers });
        }
    };
    // validate tên người được bảo hiểm
    validateInsuredName = () => {
        // required
        if (this.state.name == '') {
            this.setState({
                errorInsuredCutomerName: ERROR_NAME_REQUIRED,
            });
            return false;
        }
        // validate tên có ký tự đặc biệt
        if (!isFullNameExpand(this.state.name)) {
            this.setState({
                errorInsuredCutomerName: ERROR_NAME_FORMAT,
            });
            return false;
        } else {
            this.setState({ errorInsuredCutomerName: '' }); // không có lỗi validate
            return true;
        }
    };
    // validate ngày sinh
    validateBirthDay = () => {
        const { birthday, currentDate } = this.state;
        const parsedDate = moment(birthday, 'DD/MM/YYYY');
        const str = parsedDate.format('MM/DD/YYYY');
        // required
        if (this.state.birthday == '') {
            this.setState({ errorInsuredCustomerBirthday: ERROR_BIRTHDAY_REQUIRED });
            return false;
        }
        // check ngày 31 tháng có 30 ngày
        if (checkMonth(this.state.birthday) == false) {
            this.setState({ errorInsuredCustomerBirthday: ERROR_BIRTHDAY_FORMAT });
            return false;
        }
        // check ngày 29/02 năm nhuận
        if (checkLeapYear(this.state.birthday) == false) {
            this.setState({ errorInsuredCustomerBirthday: ERROR_BIRTHDAY_FORMAT });
            return false;
        }
        // check ngày nhập phải nhỏ hơn ngày hiện tại
        if (moment(str).isBefore(currentDate) == false) {
            this.setState({
                errorInsuredCustomerBirthday: ERROR_BIRTHDAY_FORMAT,
            });
            return false;
        } else {
            this.setState({ errorInsuredCustomerBirthday: '' });
            return true;
        }
    };
    // check valdate cmnd/cccd/hộ chiếu
    validateIdentityNumber = () => {
        let validateIdentityNumber = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        // required
        if (this.state.identityNumber == '') {
            this.setState({
                errorInsuredCustomerIdentity: ERROR_IDENTITY_REQUIRED,
            });
            return false;
        }
        // check ký tự đặc biẹt
        if (validateIdentityNumber.test(this.state.identityNumber)) {
            this.setState({
                errorInsuredCustomerIdentity: ERROR_IDENTITY_FORMAT,
            });
            return false;
        } else {
            this.setState({ errorInsuredCustomerIdentity: '' });
            return true;
        }
    };

    setScrollViewRef = element => {
        this.listRef = element;
    };

    // lưu thông tin vào redux
    storeInfomation = async values => {
        let { buyer, infoBuyer, infoMotor } = this.props

        let body = {
            isValid: true,
            infoBuyer: values,
            receiveType: values.receiveType,
            dataProvinceReceiver: this.state.dataProvinceReceiver,
            dataDistrictReceiver: this.state.dataDistrictReceiver,
            dataProvince: this.state.dataProvince,
            dataDistrict: this.state.dataDistrict,
            gender: this.state.gender,
            checkedSameInfo: values.checkedSameInfo,
            ownerName: infoMotor?.info?.fullName
        }
        body.infoBuyer.buyerName = values.buyerName.normalize().toUpperCase();
        body.infoBuyer.buyerEmail = values.buyerEmail.trim();
        body.infoBuyer.buyerIdentity = values.buyerIdentity.toUpperCase();
        body.infoBuyer.customerName = values.customerName.normalize().toUpperCase();
        body.infoBuyer.customerIdentity = values.customerIdentity.toUpperCase();
        body.infoBuyer.receiverName = values.receiverName.normalize().toUpperCase();
        body.infoBuyer.receiverEmail = values.receiverEmail.trim();
        this.props.saveBuyerMotorPhysical(body)
        this.listRef.scrollTo({x: 0, y: 0, animated: true});
        Actions.PreviewMotorPhysical()
    };
    // validate form người mua bảo hiểm

    checkFutureDay = (values) => {
        if (values == undefined) {
            return true
        } else {
            return moment(values, 'DD/MM/YYYY').isBefore(this.state.currentDate)
        }

    }

    checkPassDate = (values) => {
        let a = moment(values, 'DD/MM/YYYY', true).format('YYYY')

        if (values?.length == 10 && Number(a) < 1000) {
            return false
        } else if (values?.length == 10 && Number(a) > 1000) {
            return true
        } else if (values == '' || values == undefined) {
            return true
        } else {
            return false
        }
    }

    checkLengthDate = (values) => {
        if (values == undefined) {
            return true
        } else if (values?.length < 0) {
            return false
        } else if (values?.length == 10) {
            return true
        }
    }

    validateReceive = Yup.object().shape({
        buyerName: Yup.string()
            .strict(false)
            .trim()
            .test(
                'buyerName',
                ERROR_NAME_FORMAT,
                values => isFullNameExpand(values), // => validate tên người mua, check ký tự đặc biệt
            )
            .required(ERROR_NAME_REQUIRED),
        // check isCompany = false => bắt validate cho bên mua bảo hiểm = cá nhân
        // buyerGender: Yup.string().required('Bạn phải chọn giới tính'),
        buyerBirthday: Yup.string()
            .strict(false)
            .trim()
            .required(ERROR_BIRTHDAY_REQUIRED),
        buyerEmail: Yup.string() // validate email người mua
            .strict(false)
            .trim()
            .required(ERROR_EMAIL_REQUIRED)
            .test('buyerEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)),
        buyerPhone: Yup.string() // validate số điện thoại người mua
            .strict(false)
            .required(ERROR_PHONE_REQUIRED)
            .test('buyerPhone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)), // check validate định dạng sđt
        buyerIdentity: Yup.string() // vaidate cmnd/cccd
            .strict(false)
            .trim()
            .required(ERROR_IDENTITY_REQUIRED)
            .test(
                'buyerIdentity',
                ERROR_IDENTITY_FORMAT,
                values => isIdentity(values), // check validate ký tự đặc biệt
            ),
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
                values => isFullNameExpand(values), // => validate tên người mua, check ký tự đặc biệt
            ),
            // .required(ERROR_NAME_REQUIRED),
        // customerAddress: Yup.string()
        //     .strict(false)
        //     .trim()
        //     .required(ERROR_ADDRESS_REQUIRED),
        // validate form người nhận ấn chỉ bảo hiểm
        receiverName: Yup.string().when('receiveType', {
            is: true,
            then: Yup.string() // validate họ và tên người nhận
                .strict(false)
                .trim()
                .required(ERROR_NAME_REQUIRED)
                // check tên không được có ký tự đặc biệt
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
            await formik.setFieldValue('receiverAddress', values.buyerAddress);
            await this.setState({
                dataProvinceReceiver: this.state.dataProvince,
                dataDistrictReceiver: this.state.dataDistrict,
            });
        }
        await this.props.getDistrict(this.state.dataProvince?.id);
    };

    renderBuyerName = () => {
        let { buyer, infoBuyer, infoMotor } = this.props

        if (!infoBuyer?.buyerName) {
            return infoMotor?.info?.fullName
        } else if (infoBuyer?.buyerName) {
            if (buyer?.ownerName == infoMotor?.info?.fullName) {
                return infoBuyer?.buyerName
            } else if (buyer?.ownerName !== infoMotor?.info?.fullName) {
                return infoMotor?.info?.fullName
            }
        }
    }

    renderCustomerName = () => {
        const { infoBuyer, infoMotor } = this.props
        return infoBuyer?.customerName || infoMotor?.info?.fullName
    }


    renderReceiveName = () => {
        let { buyer, infoBuyer, infoMotor } = this.props
        if (buyer?.checkedSameInfo == true) {
            if (buyer?.ownerName == infoMotor?.info?.fullName) {
                return infoBuyer?.buyerName
            } else if (buyer?.ownerName !== infoMotor?.info?.fullName) {
                return infoMotor?.info?.fullName
            }
        } else {
            return infoBuyer?.receiverName
        }
    }

    handleChangeReceiveType = (formik) => {
        formik.setFieldValue('receiveType', !formik.values.receiveType)
    }

    onTextIdentity = (text, formik) => {
        if(text?.length > 0 && !isIdentity(text)) {
            formik.setFieldValue('errIdentity', ERROR_IDENTITY_FORMAT);
        } else if(text === formik.values.buyerIdentity && formik.values.customerName !== formik.values.buyerName) {
            formik.setFieldValue('errIdentity', 'Dữ liệu trùng lặp');
        } else {
            formik.setFieldValue('errIdentity', '');
        }
    };

    // render form nhập thông tin
    renderFormInputInfomation = () => {
        let { buyer, infoBuyer, infoMotor } = this.props
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
                    receiveType: buyer?.receiveType || false,
                    checkedSameInfo: buyer?.checkedSameInfo || false,
                    receiverName: this.renderReceiveName() || '',
                    receiverPhone: infoBuyer?.receiverPhone || '',
                    receiverEmail: infoBuyer?.receiverEmail || '',
                    receiverProvince: infoBuyer?.receiverProvince || '',
                    receiverDistrict: infoBuyer?.receiverDistrict || '',
                    receiverAddress: infoBuyer?.receiverAddress || '',
                    buyerEmail: infoBuyer?.buyerEmail || '',
                    buyerName: this.renderBuyerName() || '',
                    buyerGender: infoBuyer?.buyerGender || '',
                    buyerIdentity: infoBuyer?.buyerIdentity || '',
                    buyerPhone: infoBuyer?.buyerPhone || '',
                    buyerBirthday: infoBuyer?.buyerBirthday || '',
                    buyerProvince: infoBuyer?.buyerProvince || '',
                    buyerDistrict: infoBuyer?.buyerDistrict || '',
                    buyerAddress: infoBuyer?.buyerAddress || '',
                    customerName: this.renderCustomerName() || '',
                    customerIdentity: infoBuyer?.customerIdentity || '',
                    customerAddress: infoBuyer?.customerAddress || '',
                    errIdentity: '',
                }}

                onSubmit={values => this.storeInfomation(values)}
                validationSchema={this.validateReceive}
                isInitialValid={buyer?.isValid || false}>
                {formik => {
                    return (
                        <View style={{ marginBottom: 10 }}>
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
                                <FormikInput
                                    label={'Họ và tên người mua *'}
                                    name={'buyerName'}
                                    autoCapitalize={"characters"}
                                    onChangeText={(text) => {
                                        formik.values.checkedSameInfo && formik.setFieldValue('receiverName', text.toUpperCase());
                                        formik.setFieldValue('customerName', text.toUpperCase());
                                    }}
                                    onBlur={() => {
                                      formik.setFieldValue('buyerName', formik.values.buyerName.toUpperCase());
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
                                <View style={styles.inputRow}>
                                    <View style={{ width: '46%' }}>
                                        <FormikInput
                                            label={'CMND/CCCD/Hộ chiếu *'}
                                            name={'buyerIdentity'}
                                            autoCapitalize={"characters"}
                                            keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                            maxLength={12}
                                            onChangeText={(text) => {
                                                formik.setFieldValue('customerIdentity', text.toUpperCase());
                                                formik.setFieldValue('errIdentity', '');
                                            }}
                                            onBlur={() => {
                                              formik.setFieldValue('buyerIdentity', formik.values.buyerIdentity.toUpperCase());
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: '46%' }}>
                                        <FormikInput
                                            label={'Số điện thoại *'}
                                            name={'buyerPhone'}
                                            keyboardType={'number-pad'}
                                            maxLength={12}
                                            onChangeText={(text) => {
                                                formik.values.checkedSameInfo && formik.setFieldValue('receiverPhone', text);
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
                                            label={`Quận/Huyện${formik?.values?.buyerProvince ? ' *' : ''}`}
                                            name={'buyerDistrict'}
                                            openModal={() => this.openDistrictModal('buyer')}
                                            checkDisabled={!formik?.values?.buyerProvince}
                                            hideIcon={!formik?.values?.buyerProvince}
                                            baseColor={formik?.values?.buyerProvince ? colorText : '#8D8C8D'}
                                        />
                                    </View>
                                </View>
                                <FormikInput
                                    label={'Địa chỉ (Số nhà, phường, xã) *'}
                                    name={'buyerAddress'}
                                    onChangeText={(text) => {
                                        formik.values.checkedSameInfo && formik.setFieldValue('receiverAddress', text);
                                        formik.setFieldValue('customerAddress', text);
                                    }}
                                />
                            </View>
                            <View>
                                <View>
                                    <Text style={[styles.titleStyle, { marginLeft: 0, marginTop: 20 }]}>
                                        Thông tin người thụ hưởng
                                    </Text>
                                </View>
                                <FormikInput
                                    label={'Họ và tên'}
                                    name={'customerName'}
                                    autoCapitalize={"characters"}
                                    onChangeText={() => {
                                        formik.setFieldValue('customerIdentity', '');
                                    }}
                                    onBlur={() => {
                                        formik.setFieldValue('customerName', formik.values.customerName.toUpperCase());
                                    }}
                                />
                                <FormikInput
                                    label={'CMND/CCCD/Hộ chiếu'}
                                    name={'customerIdentity'}
                                    autoCapitalize={"characters"}
                                    keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                    maxLength={12}
                                    error={formik.values.errIdentity}
                                    onChangeText={(text) => this.onTextIdentity(text, formik)}
                                    onBlur={() => {
                                        formik.setFieldValue('customerIdentity', formik.values.customerIdentity.toUpperCase());
                                    }}
                                />
                                <FormikInput
                                    label={'Địa chỉ'}
                                    name={'customerAddress'}
                                />
                            </View>
                            <View style={[styles.titleContainer, { paddingTop: 24 }]}>
                                <IconEnvelopeSvg width={15} height={15} />
                                <Text style={styles.titleStyle}>Hình thức giao nhận</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                    <IconCheckboxBlurSvg width={20} height={20} color={NewColor} />
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
                                        Giấy chứng nhận bảo hiểm sẽ được gửi qua
                                        đường chuyển phát nhanh  (EMS) đến địa chỉ quý khách đã cung cấp
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
                                            <Text style={{ marginLeft: 8 }}>Điền thông tin như trên</Text>
                                        </TouchableOpacity>
                                        <FormikInput
                                            label={'Họ và tên người nhận *'}
                                            name={'receiverName'}
                                            autoCapitalize={'characters'}
                                            onChangeText={(text) => {
                                                formik.values.checkedSameInfo && formik.setFieldValue('checkedSameInfo', false);
                                            }}
                                            onBlur={() => {
                                                formik.setFieldValue('receiverName', formik.values.receiverName.toUpperCase());
                                            }}
                                        />
                                        <View style={styles.inputRow}>
                                            <View style={{ width: '46%' }}>
                                                <FormikInput
                                                    label={'Số điện thoại *'}
                                                    name={'receiverPhone'}
                                                    keyboardType={'number-pad'}
                                                    maxLength={12}
                                                    onChangeText={(text) => {
                                                        formik.values.checkedSameInfo && formik.setFieldValue('checkedSameInfo', false);
                                                    }}
                                                />
                                            </View>
                                            <View style={{ width: '46%' }}>
                                                <FormikInput
                                                    label={'Email *'}
                                                    name={'receiverEmail'}
                                                    autoCapitalize={'none'}
                                                    onChangeText={(text) => {
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
                                                    label={`Quận/Huyện${formik?.values?.receiverProvince ? ' *' : ''}`}
                                                    name={'receiverDistrict'}
                                                    openModal={() => this.openDistrictModal('receiver')}
                                                    checkDisabled={!formik?.values?.receiverProvince}
                                                    hideIcon={!formik?.values?.receiverProvince}
                                                    baseColor={formik?.values?.receiverProvince ? colorText : '#8D8C8D'}
                                                />
                                            </View>
                                        </View>
                                        <FormikInput
                                            label={'Địa chỉ (Số nhà, phường, xã) *'}
                                            name={'receiverAddress'}
                                            onChangeText={(text) => {
                                                formik.values.checkedSameInfo && formik.setFieldValue('checkedSameInfo', false);
                                            }}
                                        />
                                    </View> : null
                            }
                            <View style={{ marginVertical: 12 }}>
                                <FooterButton>
                                    <Button
                                        color={formik.isValid && !formik.values.errBuyerBirthday && formik.values.errIdentity.length === 0 ? NewColor : NewColorDisable}
                                        label={'TIẾP TỤC'}
                                        width={'100%'}
                                        onPress={formik.handleSubmit}
                                        disable={!formik.isValid || formik.values.errBuyerBirthday || formik.values.errIdentity.length > 0}
                                    />
                                </FooterButton>
                            </View>
                        </View>
                    )
                }}
            </Formik>
        );
    };

    renderHeight = () => {
        let a = DeviceInfo.getDeviceId()
        if (a.indexOf('iPhone') > -1) {
            let b = a.split('')
            b.splice(0, 6)
            let c = b.join('')
            if (c >= '10,6') {
                return 30
            } else {

                return 15
            }
        } else {

            return 15
        }
    }

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
                        <ImageHeaderScroll code={'M3'} offset={this.scrollYAnimatedValue} />
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
                        <HeaderScroll code={'M3'} offset={this.scrollYAnimatedValue} />
                    </View>
                    <ScrollView
                        style={{ zIndex: 1000 }}
                        contentContainerStyle={{
                            paddingTop: HEADER_MAX_HEIGHT
                        }}
                        ref={this.setScrollViewRef}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
                        )}>
                        <View style={styles.contentContainer}>
                            <View style={styles.titleContainer}>
                                <IconBuyerSvg height={15} width={15} color={Color} />
                                <Text style={styles.titleStyle}>
                                    Thông tin người mua bảo hiểm
                                </Text>
                            </View>
                            {this.renderFormInputInfomation()}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <BaseModal
                    open={this.state.openModal}
                    forceUpdate={true}
                    onPress={() => this.gotoLogin()}
                    label={'ĐỒNG Ý'}
                    text="Phiên bản đăng nhập đã hết hạn. Mời bạn đăng nhập lại."
                />
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
        marginTop: 5,
    },
    formContainer: {
        alignSelf: 'center',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        shadowColor: 'rgba(0, 107, 153, 0.1)',
        paddingHorizontal: 24,
        paddingVertical: 14,
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

import { connect } from 'react-redux';
import { getDistrict } from '../CarInsurance/actions/car_Buy';

import ModalBuyerType from '../TravelInsurance/components/ModalBuyerType';
import DeviceInfo from 'react-native-device-info';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { checkExpToken } from '../../config/decodeToken';
import BaseModal from '../../components/BaseModal';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';

const mapStateToProps = state => ({
    buyer: state?.motorPhysical.buyer,
    infoBuyer: state?.motorPhysical?.buyer?.infoBuyer,
    infoMotor: state?.motorPhysical?.infoMotor,
});
const mapDispatchToProps = dispatch => {
    return {
        getDistrict: id => dispatch(getDistrict(id)),
        saveBuyerMotorPhysical: body => dispatch(saveBuyerMotorPhysical(body))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Buyer);
