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
    Image
} from 'react-native';
import {
    ERROR_ADDRESS_REQUIRED,
    ERROR_BIRTHDAY_FORMAT,
    ERROR_BIRTHDAY_REQUIRED,
    ERROR_COMPANY_NAME_FORMAT,
    ERROR_COMPANY_NAME_REQUIRED,
    ERROR_COMPANY_TAXCODE_REQUIRED,
    ERROR_COMPANY_TAXCODE_FORMAT,
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
    ERROR_16_YEARS,
    ERROR_NAME_CAR_FORMAT
} from '../../config/ErrorMessage';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import NavWithImage from '../../components/NavWithImage';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { nameApp, Color, subColor, NewColorDisable, NewColor, colorText, primaryColor, colorTitle, TxtColor, textDisable, colorPlaceholder } from '../../config/System';
import Input from './components/Input';
import { Formik } from 'formik';
import { handleTextInput } from 'react-native-formik';
import * as Yup from 'yup';
import Button from '../../components/buy/Button';
import {
    validateIdentity,
    validateName,
    validatePhone,
    validateCompanyName
} from '../../config/Validation';
import InputSelect from './components/InputSelect';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import moment from 'moment';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import {
    checkLeapYear,
    checkMonth,
    isPhone,
    isEmail,
    isEmailAccident,
    isTaxCode,
    isToManySpace,
    isEmailNotDot,
    isIdentity,
    isPhoneAccident,
    isFullNameExpand,
} from '../../components/Functions';
import SimpleToast from 'react-native-simple-toast';
import ModalSex from '../FlightInsurance/component/ModalSex';
import FooterButton from '../../components/FooterButton';
import { saveBuyerCarPhysical } from './actions/carPhysical'
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT } from '../../utils/Util';
import { saveLogContract, logEventContract } from '../../actions/logContract';
import DateFill from '../../components/dateTimeFill/DateFill';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconCheckboxBlurSvg from '../../config/images/icons/IconCheckboxBlurSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconEnvelopeSvg from '../../config/images/icons/IconEnvelopeSvg';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';

class BuyerCar extends Component {
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
            errorInsuredCutomerName: '',
            errorInsuredCustomerBirthday: '',
            errorInsuredCustomerIdentity: '',
            dataProvince: '',
            dataProvinceReceiver: '',
            dataDistrictReceiver: '',
            dataDistrict: '',
            timerCount: moment().valueOf(),
        };
    }

    componentDidMount() {
        let { buyer, infoBuyer } = this.props
        if (buyer) {
            this.setState({
                dataProvinceReceiver: buyer?.dataProvinceReceiver,
                dataDistrictReceiver: buyer?.dataDistrictReceiver,
                dataProvince: buyer?.dataProvince,
                dataDistrict: buyer?.dataDistrict,
            })
        }
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
        let validateName = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        // required
        if (this.state.name == '') {
            this.setState({
                errorInsuredCutomerName: ERROR_NAME_REQUIRED,
            });
            return false;
        }
        // validate tên có ký tự đặc biệt và chữ số
        if (validateName.test(this.state.name)) {
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

    checkBirth = (values) => {
        if (values?.length == 10) {
            let b = moment(values, 'DD/MM/YYYY')
            let c = moment(moment().format()).diff(b, 'years')
            console.log(c)
            if (c < 16) {
                return false
            } else if (c >= 16) {
                return true
            }
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
    // lưu thông tin vào redux
    storeInfomation = async values => {
        let { infoCar, saveBuyerCarPhysical, saveLogContract, contractLog, codeSelected, contractCarId } = this.props
        let body = {
            isValid: true,
            infoBuyer: values,
            receiveType: values.receiveType,
            dataProvinceReceiver: this.state.dataProvinceReceiver,
            dataDistrictReceiver: this.state.dataDistrictReceiver,
            dataProvince: this.state.dataProvince,
            dataDistrict: this.state.dataDistrict,
            buyerTypeId: values.isCompany ? 2 : 1,
            checkedSameInfo: values.checkedSameInfo
        }
        body.infoBuyer.buyerName = values.buyerName.normalize().toUpperCase();
        body.infoBuyer.buyerEmail = values.buyerEmail.trim();
        body.infoBuyer.buyerIdentity = values.buyerIdentity.toUpperCase();
        body.infoBuyer.receiverName = values.receiverName.normalize().toUpperCase();
        body.infoBuyer.receiverEmail = values.receiverEmail.trim();
        body.infoBuyer.companyName = values.companyName.normalize().toUpperCase();
        body.infoBuyer.vatCompanyName = values.vatCompanyName.normalize().toUpperCase();
        body.infoBuyer.vatCompanyEmail = values.vatCompanyEmail.trim();
        const key = infoCar?.licensePlate?.length > 0 || codeSelected === 'VNI' ? 'PhotoCarY' : 'PhotoCar';
        if (!contractCarId) {
            contractLog.key = key;
            contractLog.buyerName = values.isCompany ? values.companyName.normalize().toUpperCase() : values.buyerName.normalize().toUpperCase();
            contractLog.buyerPhone = values.buyerPhone;
            contractLog.buyerType = values.isCompany ? 2 : 1;
            saveLogContract('C2', contractLog);
        }
        saveBuyerCarPhysical(body);
        this.logging(values);
        Actions[key]();
    };
    
    logging = (data) => {
        const timeEnd = moment().valueOf();
        const count = moment(timeEnd).diff(moment(this.state.timerCount), 'milliseconds');
        this.props.logEventContract(
            `${nameApp}_VCX_OTO_EVENT_THONG_TIN_BEN_MUA`,
            {
                buyerInfo: data,
                timerCounting: count / 1000,
            }
        );
    }

    validLengthCMND = (value) => {
        if (value) {
            if (value.length >= 8) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

    validation = Yup.object().shape({
        buyerName: Yup.string()
            .strict(false)
            .trim()
            .test(
                'buyerName',
                ERROR_NAME_CAR_FORMAT,
                values => isFullNameExpand(values), // => validate tên người mua, check ký tự đặc biệt và chữ số
            )
            .required(ERROR_NAME_REQUIRED),
        // check isCompany = false => bắt validate cho bên mua bảo hiểm = cá nhân
        // buyerGender: Yup.string().when('isCompany', {
        //     // validate giới tính
        //     is: false,
        //     then: Yup.string().required('Bạn phải chọn giới tính'),
        // }),
        // buyerBirthday: Yup.string().when('isCompany', {
        //     // validate ngày sinh người mua
        //     is: false,
        //     then: Yup.string()
        //         .strict(false)
        //         .trim()
        //         .required(ERROR_BIRTHDAY_REQUIRED),
        // }),
        buyerEmail: Yup.string() // validate email người mua
            .strict(false)
            .trim()
            .required(ERROR_EMAIL_REQUIRED)
            .test('buyerEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)), // check validate định dạng sđt
        // .email(ERROR_EMAIL_FORMAT), // check validate định dạng email bao gồm @ và domain
        buyerPhone: Yup.string() // validate số điện thoại người mua
            .strict(false)
            .required(ERROR_PHONE_REQUIRED)
            .test('buyerPhone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)), // check validate định dạng sđt
        // buyerIdentity: Yup.string().when('isCompany', {
        //     is: false,
        //     then: Yup.string() // vaidate cmnd/cccd
        //         .required(ERROR_IDENTITY_REQUIRED)
        //         .test(
        //             'buyerIdentity',
        //             ERROR_IDENTITY_FORMAT,
        //             values => isIdentity(values), // check validate ký tự đặc biệt
        //         ),
        // }),
        buyerAddress: Yup.string()
            .strict(false)
            .trim()
            .required(ERROR_ADDRESS_REQUIRED),
        buyerProvince: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp
        buyerDistrict: Yup.string().required(ERROR_DISTRICT_REQUIRED), // validate quận/huyện

        vatCompanyName: Yup.string().when('isVat', {
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .required(ERROR_COMPANY_NAME_REQUIRED)
                .test(
                    'vatCompanyName',
                    ERROR_COMPANY_NAME_FORMAT,
                    values => !validateCompanyName.test(values),
                ),
        }),
        vatCompanyTaxCode: Yup.string().when('isVat', {
            is: true,
            then: Yup.string()
            .strict(false)
            .required(ERROR_COMPANY_TAXCODE_REQUIRED)
            .test('vatCompanyTaxCode', ERROR_COMPANY_TAXCODE_FORMAT, values => isTaxCode(values)),
        }),
        vatCompanyEmail: Yup.string().when('isVat', {
            is: true,
            then: Yup.string() // validate email người mua
            .strict(false)
            .trim()
            .required(ERROR_EMAIL_REQUIRED)
            .test('vatCompanyEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)),
        }),
        vatCompanyAddress: Yup.string().when('isVat', {
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .required(ERROR_ADDRESS_REQUIRED),
        }),

        companyName: Yup.string().when('isCompany', {
            // validate tên doanh nghiệp
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .required(ERROR_COMPANY_NAME_REQUIRED)
                .test(
                    'companyName',
                    ERROR_COMPANY_NAME_FORMAT,
                    values => !validateCompanyName.test(values),
                ),
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
                .test('receiverEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)), // check validate định dạng email bao gồm @ và domain
        }),
        receiverProvince: Yup.string().when('receiveType', {
            is: true,
            then: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp
        }),
        receiverDistrict: Yup.string().when('receiveType', {
            is: true,
            then: Yup.string().required('Chưa chọn quận/huyện'), // validate quận/huyện
        }),
        receiverAddress: Yup.string().when('receiveType', {
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .required(ERROR_ADDRESS_REQUIRED),
        }),
    });

    onTextIdentity = (text, formik) => {
        if (text?.length > 0 && !isIdentity(text)) {
            formik.setFieldValue('errIdentity', ERROR_IDENTITY_FORMAT);
        } else {
            formik.setFieldValue('errIdentity', '');
        }
    };

    setBuyerType = (formik, data) => {
        formik.setFieldValue('isCompany', data.id === 2);
    };

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

    // render form nhập thông tin
    renderFormInputInfomation = () => {
        let { buyer, infoBuyer, infoCar } = this.props
        const {
            modalProvince,
            modalDistrict,
            modalBuyerType,
            modalGender,
            isBuyerModal,
        } = this.state;
        const FormikInput = handleTextInput(Input);
        const FormikSelect = handleTextInput(InputSelect);
        let nameBuyerFromInforCar = '';
        if (!buyer) {
            nameBuyerFromInforCar = infoCar?.fullName || ''
        } else {
            nameBuyerFromInforCar = infoBuyer?.buyerName || ''
        }
        return (
            <Formik
                initialValues={{
                    receiveType: buyer?.receiveType || false,
                    checkedSameInfo: buyer?.checkedSameInfo || false,
                    receiverName: infoBuyer?.receiverName || '',
                    receiverPhone: infoBuyer?.receiverPhone || '',
                    receiverEmail: infoBuyer?.receiverEmail || '',
                    receiverProvince: infoBuyer?.receiverProvince || '',
                    receiverDistrict: infoBuyer?.receiverDistrict || '',
                    receiverAddress: infoBuyer?.receiverAddress || '',
                    buyerEmail: infoBuyer?.buyerEmail || '',
                    buyerName: nameBuyerFromInforCar || '',
                    buyerGender: infoBuyer?.buyerGender || '',
                    buyerIdentity: infoBuyer?.buyerIdentity || '',
                    buyerPhone: infoBuyer?.buyerPhone || '',
                    buyerBirthday: infoBuyer?.buyerBirthday || '',
                    buyerProvince: infoBuyer?.buyerProvince || '',
                    buyerDistrict: infoBuyer?.buyerDistrict || '',
                    buyerAddress: infoBuyer?.buyerAddress || '',
                    isCompany: buyer?.buyerTypeId === 2,
                    isVat: infoBuyer?.isVat || '',
                    nameType: infoBuyer?.nameType || 'Cá nhân',
                    companyTaxCode: infoBuyer?.companyTaxCode || '',
                    companyName: infoBuyer?.companyName || '',
                    vatCompanyTaxCode: infoBuyer?.vatCompanyTaxCode || '',
                    vatCompanyName: infoBuyer?.vatCompanyName || '',
                    vatCompanyEmail: infoBuyer?.vatCompanyEmail || '',
                    vatCompanyAddress: infoBuyer?.vatCompanyAddress || '',
                    errIdentity: '',
                }}

                onSubmit={values => this.storeInfomation(values)}
                validationSchema={this.validation}
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
                            <ModalBuyerType
                                open={modalBuyerType}
                                onClosed={() => this.setState({ modalBuyerType: null })}
                                setBuyerType={data => this.setBuyerType(formik, data)}
                                onOpened={() => this.setState({ modalBuyerType: true })}
                            />
                            <View style={{ flexDirection: 'row', marginTop: 2 }}>
                                <TouchableOpacity
                                    onPress={() => this.setBuyerType(formik, {
                                        name: 'Cá nhân',
                                        id: 1
                                    })}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingTop: 10,
                                        flex: 1,
                                    }}>
                                    {
                                        !formik.values.isCompany ? (
                                            <IconRadioBtnActiveSvg width={15} height={15} />
                                        ) : (
                                            <IconRadioBtnSvg width={15} height={15} />
                                        )
                                    }
                                    <Text style={{ marginLeft: 8, color: '#404142' }}>Cá nhân</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setBuyerType(formik, {
                                        name: 'Doanh nghiệp',
                                        id: 2
                                    })}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingTop: 10,
                                        paddingLeft: 14,
                                        flex: 1,
                                    }}>
                                    {
                                        formik.values.isCompany ? (
                                            <IconRadioBtnActiveSvg width={15} height={15} />
                                        ) : (
                                            <IconRadioBtnSvg width={15} height={15} />
                                        )
                                    }
                                    <Text style={{ marginLeft: 8, color: '#404142' }}>Doanh nghiệp</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
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
                                    !formik.values.isCompany ?
                                        <FormikInput
                                            label={'Họ và tên chủ xe (theo đăng ký xe) *'}
                                            name={'buyerName'}
                                            autoCapitalize={'characters'}
                                            onChangeText={(text) => {
                                                formik.values.checkedSameInfo && formik.setFieldValue('receiverName', text.toUpperCase());
                                            }}
                                            onBlur={() => {
                                              formik.setFieldValue('buyerName', formik.values.buyerName.toUpperCase());
                                            }}
                                        /> : null
                                }
                                {
                                    !formik.values.isCompany ?
                                        <View style={[styles.inputRow]}>
                                            <View style={{ width: '46%' }}>
                                                <FormikInput
                                                    label={'Số điện thoại *'}
                                                    name={'buyerPhone'}
                                                    maxLength={12}
                                                    keyboardType={'number-pad'}
                                                    onChangeText={(text) => {
                                                        formik.values.checkedSameInfo && formik.setFieldValue('receiverPhone', text);
                                                    }}
                                                />
                                            </View>
                                            <View style={{ width: '46%' }}>
                                                <FormikInput
                                                    label={'Email *'}
                                                    name={'buyerEmail'}
                                                    autoCapitalize={'none'}
                                                    onChangeText={(text) => {
                                                        formik.values.checkedSameInfo && formik.setFieldValue('receiverEmail', text);
                                                    }}
                                                />
                                            </View>
                                        </View> : null
                                }
                                {
                                    !formik.values.isCompany ?
                                        <View style={styles.inputRow}>
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
                                                        label={'Ngày sinh'}
                                                        name={'buyerBirthday'}
                                                        editable={false}
                                                        keyboardType={'number-pad'}
                                                        placeholder={'dd/mm/yyyy'}
                                                        placeholderTextColor={colorPlaceholder}
                                                        maxLength={10}
                                                    />
                                                </ModalTimePicker> */}
                                                <DateFill
                                                    value={formik.values.buyerBirthday}
                                                    onChange={(text, err) => {
                                                        formik.setFieldValue('buyerBirthday', text);
                                                        formik.setFieldValue('errBuyerBirthday', err);
                                                    }}
                                                    label={'Ngày sinh'}
                                                    maximumDate={moment().subtract(16, 'years').format('DD/MM/YYYY')}
                                                    errMaximum={ERROR_16_YEARS}
                                                />
                                            </View>
                                        </View> : null
                                }
                                {
                                    !formik.values.isCompany ?
                                        <FormikInput
                                            label={'CMND/CCCD/Hộ chiếu'}
                                            name={'buyerIdentity'}
                                            autoCapitalize={'characters'}
                                            maxLength={12}
                                            keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                            error={formik.values.errIdentity}
                                            onChangeText={(text) => this.onTextIdentity(text, formik)}
                                            onBlur={() => {
                                              formik.setFieldValue('buyerIdentity', formik.values.buyerIdentity.toUpperCase());
                                            }}
                                        /> : null
                                }
                                {
                                    formik.values.isCompany ?
                                        <View style={styles.inputRow}>
                                            <View style={{ width: '46%' }}>
                                                <FormikInput
                                                    label={'Số điện thoại *'}
                                                    name={'buyerPhone'}
                                                    maxLength={12}
                                                    keyboardType={'number-pad'}
                                                    onChangeText={(text) => {
                                                        formik.values.checkedSameInfo && formik.setFieldValue('receiverPhone', text);
                                                    }}
                                                />
                                            </View>
                                            <View style={{ width: '46%' }}>
                                                <FormikInput
                                                    label={'Email *'}
                                                    name={'buyerEmail'}
                                                    autoCapitalize={'none'}
                                                    onChangeText={(text) => {
                                                        formik.values.checkedSameInfo && formik.setFieldValue('receiverEmail', text);
                                                    }}
                                                />
                                            </View>
                                        </View> : null
                                }
                                {
                                    formik.values.isCompany ?
                                        <FormikInput
                                            label={'Họ và tên chủ xe (theo đăng ký xe) *'}
                                            name={'buyerName'}
                                            autoCapitalize={'characters'}
                                            onChangeText={(text) => {
                                                formik.values.checkedSameInfo && formik.setFieldValue('receiverName', text.toUpperCase());
                                            }}
                                            onBlur={() => {
                                              formik.setFieldValue('buyerName', formik.values.buyerName.toUpperCase());
                                            }}
                                        /> : null
                                }
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
                                            baseColor={formik?.values?.buyerProvince ? colorText : textDisable}
                                        />
                                    </View>
                                </View>
                                <FormikInput
                                    label={'Địa chỉ theo đăng ký xe (Số nhà, phường, xã) *'}
                                    name={'buyerAddress'}
                                    onChangeText={(text) => {
                                        formik.values.checkedSameInfo && formik.setFieldValue('receiverAddress', text);
                                    }}
                                />
                            </View>
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
                                <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor }}>Xuất hóa đơn VAT</Text>
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
                            <View style={[styles.titleContainer,{marginTop: !formik.values.isCompany && formik.values.isVat ? 16 : 21}]}>
                                <IconEnvelopeSvg width={15} height={15} />
                                <Text style={styles.titleStyle}>Hình thức giao nhận</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                    <IconCheckboxBlurSvg width={20} height={20} />
                                    <Text style={{ marginLeft: 8, flex: 1, fontSize: 14, color: TxtColor }}>
                                        Giấy chứng nhận bảo hiểm điện tử gửi tới email của quý khách
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', marginTop: 12 }}
                                    onPress={() => this.handleChangeReceiveType(formik)}>
                                    {
                                        formik.values.receiveType
                                            ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                            : <IconBoxSvg width={20} height={20} color={NewColor} />
                                    }
                                    <Text style={{ marginLeft: 8, flex: 1, fontSize: 14, color: TxtColor }}>
                                        Giấy chứng nhận bảo hiểm sẽ được người bán gửi tới quý khách theo địa chỉ cung cấp dưới đây sau khi được thanh toán đầy đủ
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Form nhập thông tin địa chỉ nhận ấn chỉ bảo hiểm */}
                            {
                                formik.values.receiveType ? <View>
                                    <View style={{ marginTop: 12 }}>
                                        <Text style={{ color: colorTitle, fontWeight: 'bold', fontSize: 16, }}>
                                            Địa chỉ nhận ấn chỉ bảo hiểm
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', paddingTop: 12, alignItems: 'center' }}
                                        onPress={() => this.onAutoFill(formik)}>
                                        {
                                            formik.values.checkedSameInfo
                                                ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                                : <IconBoxSvg width={20} height={20} color={NewColor} />
                                        }
                                        <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor }}>Thông tin như trên</Text>
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
                                                label={`Quận/Huyện${formik?.values?.receiverProvince ? ' *' : ''}`}
                                                name={'receiverDistrict'}
                                                openModal={() => this.openDistrictModal('receiver')}
                                                checkDisabled={!formik?.values?.receiverProvince}
                                                hideIcon={!formik?.values?.receiverProvince}
                                                baseColor={formik?.values?.receiverProvince ? colorText : textDisable}
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
                            <View style={{ marginBottom: 12 , marginTop: 8 }}>
                                <FooterButton>
                                    <Button
                                        color={
                                            !formik.isValid ||
                                            (!formik.values.isCompany && formik.values.errBuyerBirthday) ||
                                            (!formik.values.isCompany && formik.values.errIdentity.length > 0) ?
                                            NewColorDisable : NewColor
                                        }
                                        label={'TIẾP TỤC'}
                                        onPress={formik.handleSubmit}
                                        disable={
                                            !formik.isValid ||
                                            (!formik.values.isCompany && formik.values.errBuyerBirthday) ||
                                            (!formik.values.isCompany && formik.values.errIdentity.length) > 0
                                        }
                                    />
                                </FooterButton>
                            </View>
                        </View>
                    )
                }
                }
            </Formik >
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
                        <ImageHeaderScroll code={'C2'} offset={this.scrollYAnimatedValue} />
                    </Animated.View>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 2012
                    }}>
                        <TouchableOpacity
                            onPress={() => Actions.PackageCarPhysical()}
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
                        <HeaderScroll code={'C2'} offset={this.scrollYAnimatedValue} />
                    </View>
                    <ScrollView
                        style={{ zIndex: 1000 }}
                        contentContainerStyle={{
                            paddingTop: HEADER_MAX_HEIGHT
                        }}
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
        color: colorTitle,
        marginLeft: 8,
        fontWeight: 'bold',
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
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
        paddingTop: 24,
        paddingHorizontal: 24,
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

const mapStateToProps = state => {
    const listCompany = state.selectCompany.listCompany['C2'];
    const idComSelected = state.selectCompany.idComSelected['C2'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return ({
        codeSelected: obj?.insurOrg?.code || '',
        buyer: state?.carPhysical?.buyerPhysical,
        infoBuyer: state?.carPhysical?.buyerPhysical?.infoBuyer,
        infoCar: state?.carPhysical?.infoCarPhysical,
        contractLog: state.logContract.logContract['C2'] || {},
        contractCarId: state?.carPhysical?.contractCarId,
    });
};
const mapDispatchToProps = dispatch => {
    return {
        getDistrict: id => dispatch(getDistrict(id)),
        saveBuyerCarPhysical: body => dispatch(saveBuyerCarPhysical(body)),
        saveLogContract: (id, data) => dispatch(saveLogContract(id, data)),
        logEventContract: (name, data) => dispatch(logEventContract(name, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BuyerCar);
