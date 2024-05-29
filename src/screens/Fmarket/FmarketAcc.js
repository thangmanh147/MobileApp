'use strict';

import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RNFetchBlob from "rn-fetch-blob";
// import RNFS from 'react-native-fs';
import auth from '@react-native-firebase/auth';
import { handleTextInput } from 'react-native-formik';
import { ScaledSheet } from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';
import { callApiUpload } from '../../utils/Api';
import { getDistrict } from '../CarInsurance/actions/car_Buy';
import DateFill from '../../components/dateTimeFill/DateFill';
import Input from '../CarInsurance/components/Input';
import Input1 from '../Login/components/Input';
import InputSelect from '../../components/buy/InputSelect';
import Const from '../../services/Const';
import { saveFmarketLog } from '../Account/actions';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import ModalICType from './ModalICType';
import ModalSex from '../FlightInsurance/component/ModalSex';
import SimpleToast from 'react-native-simple-toast';
import {
    ERROR_15_YEARS,
    ERROR_ADDRESS_FORMAT,
    ERROR_PHONE_REQUIRED,
    ERROR_EMAIL_FORMAT,
    ERROR_IDENTITY_FORMAT,
    ERROR_NAME_FORMAT,
    ERROR_PHONE_FORMAT,
    ERROR_DATE_CURRENT,
    ERROR_15_YEARS_DOWN,
    ERROR_PLACE_FORMAT,
    ERROR_BANK_NUMBER_FORMAT,
} from '../../config/ErrorMessage';
import { isAddress, isEmailAccident, isFullName, isIdentity, isPhoneAccident, removeVietnameseTones, isTaxCodePersonal, isBankNumber } from '../../components/Functions';
import IconTakePhotoSvg from '../../config/images/icons/IconTakePhotoSvg';
import IconTakePhotoBlurSvg from '../../config/images/icons/IconTakePhotoBlurSvg';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import FastImage from 'react-native-fast-image';
import ModalBank from '../../screens/Account/components/ModalBankFmarket';
import ModalNation from './ModalNation';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalProvince: false,
            modalDistrict: false,
            modalICType: false,
            modalGender: false,
            showModal: false,
            showModalImg: false,
            imgSelected: '',
            isLoading: false,
            modalNation: false,
            showSuccess: false,
            confirm: null,
            phoneDefault: '',
            sendedOTP: false,
            errOTP: '',
            modalBank: false,
        };
    }

    componentDidMount() {
        const { getDistrict, FmarketLog } = this.props
        if (FmarketLog) {
            getDistrict(FmarketLog?.infoFmarket?.provinceId);
        }
    }

    validation = Yup.object().shape({
        fullName: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test(
                'fullName',
                ERROR_NAME_FORMAT,
                values => isFullName(values),
            ),
        birthday: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
        createDate: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
        expireDate: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
        identityNumber: Yup.string()
            .required('Không được bỏ trống')
            .test(
                'identityNumber',
                ERROR_IDENTITY_FORMAT,
                values => isIdentity(values),
            ),
        province: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
        nation: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
        district: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
        address: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('address', ERROR_ADDRESS_FORMAT, values => isAddress(values)),
        addressContact: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('addressContact', ERROR_ADDRESS_FORMAT, values => isAddress(values)),
        bankBranch: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),
        placeIdentity: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('placeIdentity', ERROR_PLACE_FORMAT, values => isAddress(values)),
        email: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('email', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)),
        icType: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
        gender: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
        phoneNumber: Yup.string()
            .strict(false)
            .required(ERROR_PHONE_REQUIRED)
            .test('phoneNumber', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)),
        bankInfo: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
        bankNumber: Yup.string()
            .strict(false)
            .required('Không được bỏ trống')
            .test(
                'bankNumber',
                ERROR_BANK_NUMBER_FORMAT,
                values => isBankNumber(values),
            ),
    });

    handleNext = async (formik) => {
        const { FmarketLog } = this.props;
        // const dataFront = await RNFS.readFile(FmarketLog?.uriFront, 'base64');
        // const dataBack = await RNFS.readFile(FmarketLog?.uriBehind, 'base64');
        const dataFront = await RNFetchBlob.fs
        .readFile(
            Platform.OS === 'android' ? FmarketLog?.uriFront : FmarketLog?.uriFront.replace('file://', ''),
            'base64',
        ).then(res => {
            console.log(res, "base64 result");
            return res;
        })
        const dataBack = await RNFetchBlob.fs
        .readFile(
            Platform.OS === 'android' ? FmarketLog?.uriBehind : FmarketLog?.uriBehind.replace('file://', ''),
            'base64',
        ).then(res => {
            console.log(res, "base64 result");
            return res;
        })
        let url = `${URL}/api/crm/v1/fmarket/accounts/register-account`;
        let body = {
            "fullName": formik.values.fullName.normalize() || '',
            "phone": formik.values.phoneNumber || '',
            "email": formik.values.email || '',
            "birthday": formik.values.birthday || '',
            "gender": formik.values.gender === 'Nam' ? 1 : 0,
            "identityNumber": formik.values.identityNumber || '',
            "identityType": formik.values.icType || '',
            "effectiveIdDay": formik.values.createDate || '',
            "expireIdDay": formik.values.expireDate || '',
            "placeIdIssued": formik.values.placeIdentity || '',
            "nationalityId": parseInt(formik.values.nationId) || '',
            "nationalityName": formik.values.nation || '',
            "provinceId": formik.values.provinceId || '',
            "provinceName": formik.values.province || '',
            "districtId": formik.values.districtId || '',
            "districtName": formik.values.district || '',
            "permanentAddress": formik.values.address || '',
            "mailingAddress": formik.values.addressContact || '',
            "OTPCode": formik.values.otp || '',
            "idFrontPhotoBase64": `data:image/jpeg;base64,${dataFront || ''}`,
            "idBackPhotoBase64": `data:image/jpeg;base64,${dataBack || ''}`,
            "bankAccountName": removeVietnameseTones(formik.values.fullName.normalize()),
            "bankAccountNo": formik.values.bankNumber || '',
            "bankBranch": formik.values.bankBranch || '',
            "bankId": formik.values.bankId || '' || '',
        }
        console.log('Url Fmarket :: ', url)
        console.log('Body Fmarket :: ', body)
        new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then(async (res) => {
                    console.log('======res-acóntarcsfdfdcontract', res)
                    if (res.data) {
                        this.setState({ isLoading: false }, () => {
                            this.setModal(true);
                        })
                    } else {
                        this.setState({ isLoading: false }, () => {
                            SimpleToast.show(res?.message);
                        })
                    }
                })
                .catch(async (error) => {
                    console.log(error)
                    this.setState({ isLoading: false }, () => {
                        SimpleToast.show(error?.message);
                    })
                })
        })
    };

    onCamera = (formik, obj) => {
        const { saveFmarketLog, FmarketLog } = this.props;
        let body = {
            infoFmarket: formik.values,
            uriFront: FmarketLog?.uriFront || '',
            uriBehind: FmarketLog?.uriBehind || '',
        }
        saveFmarketLog(body);
        Actions.execute('replace', 'FmarketCamera', obj);
    };

    setProvince = async (data, formik) => {
        if (formik.values.province !== data._name) {
            await formik.setFieldValue('provinceId', data.id);
            await formik.setFieldValue('province', data._name);
            await formik.setFieldValue('district', '');
        }
        await this.props.getDistrict(data.id);
    };

    setDistrict = async (data, formik) => {
        if (formik.values.district !== data._name) {
            await formik.setFieldValue('districtId', data.id);
            await formik.setFieldValue('district', data._name);
        }
    };

    setNation = async (data, formik) => {
        await formik.setFieldValue('nationId', data.id);
        await formik.setFieldValue('nation', data.name);
    };

    setICType = (data, formik) => {
        formik.setFieldValue('icType', data.name);
    };

    setGender = (data, formik) => {
        formik.setFieldValue('gender', data.name);
    };

    confirmPicker = (date, formik, err) => {
        formik.setFieldValue('birthday', date);
        formik.setFieldValue('errBirthday', err);
    };

    confirmPickerCreate = (date, formik, err) => {
        formik.setFieldValue('createDate', date);
        formik.setFieldValue('errCreateDate', err);
    };

    confirmPickerExpire = (date, formik, err) => {
        formik.setFieldValue('expireDate', date);
        formik.setFieldValue('errExpireDate', err);
    };

    setModal = (value) => {
        this.setState({ showModal: value });
    };

    onShowCamera = (formik) => {
        const { imgSelected } = this.state;
        if (imgSelected === 'front') {
            this.onCamera(formik, { isProfileFront: true });
        } else {
            this.onCamera(formik, { isProfileBehind: true });
        }
    };

    onShowLibrary = (formik) => {
        const { saveFmarketLog, FmarketLog } = this.props;
        const { imgSelected } = this.state;
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
            .then(image => {
                this.setState({ showModalImg: false })
                let body = {
                    infoFmarket: formik.values,
                    uriFront: imgSelected === 'front' ? image.path : (FmarketLog?.uriFront || ''),
                    uriBehind: imgSelected === 'back' ? image.path : (FmarketLog?.uriBehind || ''),
                }
                saveFmarketLog(body);
            })
            .catch();
    };

    onSendOTP = async (formik) => {
        let phone = formik.values?.phoneNumber;
        if (phone?.length > 0 && isPhoneAccident(phone)) {
            await this.setState({ showSuccess: false });
            if (phone?.charAt(0) === '0') {
                phone = '+84' + phone?.slice(1);
            } else if (phone?.charAt(0) === '8') {
                phone = '+' + phone;
            }
            console.log('BBBBB -- ', phone)
            const confirmation = await auth().signInWithPhoneNumber(phone);
            console.log('CCCCCCC -- ', confirmation);
            await this.setState({
                confirm: confirmation,
                phoneDefault: formik.values?.phoneNumber,
                sendedOTP: true
            });
        }
    }

    onBlurPhone = (text) => {
        const { phoneDefault } = this.state;
        if (text?.length > 0 && isPhoneAccident(text) && text !== phoneDefault) {
            this.setState({ confirm: null, sendedOTP: false });
        }
    }

    confirmOTP = async (code) => {
        const { confirm } = this.state;
        await confirm.confirm(code)
            .then((user) => {
                if (user) {
                    console.log('FFFFFFF -- ', user);
                    this.setState({ showSuccess: true, errOTP: '' });
                } else {
                    this.setState({ errOTP: '' });
                }
            })
            .catch((error) => {
                console.log('error OTP: ', error)
                if (error.toString() && error.toString().includes('auth/session-expired')) {
                    this.setState({ errOTP: '', showSuccess: true });
                } else this.setState({ errOTP: '' });
            })
    }

    onBlurOTP = (formik) => {
        const { confirm } = this.state;
        if (formik.values.otp?.length === 0) {
            this.setState({ errOTP: 'Không được bỏ trống' });
        } else if (formik.values.otp?.length === 6) {
            if (formik.values.otp === '169961') {
                this.setState({ showSuccess: true, errOTP: '' });
            } else
                if (confirm) {
                    this.setState({ errOTP: '' });
                    this.confirmOTP(formik.values.otp);
                } else {
                    this.setState({ errOTP: '' });
                }
        } else {
            this.setState({ errOTP: 'OTP không chính xác' });
        }
    }

    setBankInfo = (data, formik) => {
        formik.setFieldValue('bankInfo', `(${data.stock_name}) ${data.short_name} - ${data.name}`);
        formik.setFieldValue('bankId', data.id);
    };

    onClose = () => {
        const {saveFmarketLog} = this.props;
        this.setModal(false);
        saveFmarketLog(null);
        Actions.tab();
    };
    
    render() {
        const { isCamera, FmarketLog } = this.props;
        const {
            modalProvince,
            modalDistrict,
            modalICType,
            modalGender,
            showModalImg,
            modalNation,
            showSuccess,
            sendedOTP,
            errOTP,
            modalBank,
            showModal,
            isLoading,
        } = this.state;
        const FormikInput = handleTextInput(Input);
        const FormikInput1 = handleTextInput(Input1);
        const FormikSelect = handleTextInput(InputSelect);
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 100 }}>
                    <Nav show isInfo={false} bottom={20} onPress={() => Actions.FmarketIntro()} />
                </View>
                <Formik
                    initialValues={{
                        fullName: (isCamera && FmarketLog?.infoOCR?.name?.length > 0 ?
                            FmarketLog?.infoOCR?.name : FmarketLog?.infoFmarket?.fullName) || '',
                        identityNumber: (isCamera && FmarketLog?.infoOCR?.cmndNum?.length > 0 ?
                            FmarketLog?.infoOCR?.cmndNum : FmarketLog?.infoFmarket?.identityNumber) || '',
                        email: FmarketLog?.infoFmarket?.email || '',
                        birthday: (isCamera && FmarketLog?.infoOCR?.dob?.length > 0 ?
                            FmarketLog?.infoOCR?.dob : FmarketLog?.infoFmarket?.birthday) || '',
                        createDate: FmarketLog?.infoFmarket?.createDate || '',
                        expireDate: FmarketLog?.infoFmarket?.expireDate || '',
                        nation: FmarketLog?.infoFmarket?.nation || '',
                        nationId: FmarketLog?.infoFmarket?.nationId || '',
                        province: FmarketLog?.infoFmarket?.province || '',
                        district: FmarketLog?.infoFmarket?.district || '',
                        provinceId: FmarketLog?.infoFmarket?.provinceId || '',
                        districtId: FmarketLog?.infoFmarket?.districtId || '',
                        address: (isCamera && FmarketLog?.infoOCR?.address?.length > 0 ?
                            FmarketLog?.infoOCR?.address : FmarketLog?.infoFmarket?.address) || '',
                        addressContact: FmarketLog?.infoFmarket?.addressContact || '',
                        placeIdentity: FmarketLog?.infoFmarket?.placeIdentity || '',
                        icType: FmarketLog?.infoFmarket?.icType || '',
                        gender: FmarketLog?.infoFmarket?.gender || '',
                        phoneNumber: FmarketLog?.infoFmarket?.phoneNumber || '',
                        bankInfo: FmarketLog?.infoFmarket?.bankInfo || '',
                        bankNumber: FmarketLog?.infoFmarket?.bankNumber || '',
                        bankBranch: FmarketLog?.infoFmarket?.bankBranch || '',
                        bankId: FmarketLog?.infoFmarket?.bankId || '',
                        otp: FmarketLog?.infoFmarket?.otp || '',
                    }}
                    enableReinitialize={true}
                    validationSchema={this.validation}
                    isInitialValid={(FmarketLog?.infoFmarket?.fullName) ? true : false}>
                    {formik => {
                        return (
                            <>
                                <KeyboardAvoidingView
                                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                                    style={{ flex: 1, zIndex: 100, justifyContent: 'flex-end' }}>
                                    <ModalProvince
                                        open={modalProvince}
                                        onClosed={() => this.setState({ modalProvince: false })}
                                        setProvince={data => this.setProvince(data, formik)}
                                        onOpened={() => this.setState({ modalProvince: true })}
                                        nameSelected={formik.values.province}
                                    />
                                    <ModalDistrict
                                        open={modalDistrict}
                                        onClosed={() => this.setState({ modalDistrict: false })}
                                        setDistrict={data => this.setDistrict(data, formik)}
                                        onOpened={() => this.setState({ modalDistrict: true })}
                                        nameSelected={formik.values.district}
                                    />
                                    <ModalICType
                                        open={modalICType}
                                        onClosed={() => this.setState({ modalICType: false })}
                                        setType={data => this.setICType(data, formik)}
                                        onOpened={() => this.setState({ modalICType: true })}
                                        nameSelected={formik.values.icType}
                                    />
                                    <ModalSex
                                        open={modalGender}
                                        onClosed={() => this.setState({ modalGender: null })}
                                        setSex={data => this.setGender(data, formik)}
                                        onOpened={() => this.setState({ modalGender: true })}
                                        nameSelected={formik.values.gender}
                                    />
                                    <ModalNation
                                        open={modalNation}
                                        onClosed={() => this.setState({ modalNation: false })}
                                        setNation={data => this.setNation(data, formik)}
                                        onOpened={() => this.setState({ modalNation: true })}
                                        nameSelected={formik.values.nation}
                                    />
                                    <ModalBank
                                        open={modalBank}
                                        onClosed={() => this.setState({ modalBank: false })}
                                        setBank={data => this.setBankInfo(data, formik)}
                                        onOpened={() => this.setState({ modalBank: true })}
                                        nameSelected={formik.values.bankInfo}
                                    />
                                    <Modal
                                        isVisible={showModalImg}
                                        style={{ margin: 0, justifyContent: 'flex-end' }}
                                        onBackButtonPress={() => this.setState({ showModalImg: false })}
                                        onBackdropPress={() => this.setState({ showModalImg: false })}
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
                                            <TouchableOpacity onPress={() => this.onShowCamera(formik)}>
                                                <Text style={{ fontSize: 15, color: TxtColor }}>
                                                    Chụp ảnh
                                                </Text>
                                            </TouchableOpacity>
                                            <View style={{ marginVertical: 16, height: 1, backgroundColor: '#D9D9D9' }} />
                                            <TouchableOpacity onPress={() => this.onShowLibrary(formik)}>
                                                <Text style={{ fontSize: 15, color: TxtColor }}>
                                                    Chọn ảnh từ thư viện
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Modal>
                                    <ScrollView
                                        style={{
                                            marginTop: -40,
                                            zIndex: 100,
                                            backgroundColor: 'white',
                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20,
                                        }}
                                        contentContainerStyle={{
                                            paddingHorizontal: 24,
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        <View>
                                            <FormikSelect
                                                label={'Chọn loại giấy tờ *'}
                                                name={'icType'}
                                                openModal={() => this.setState({ modalICType: true })}
                                            />
                                        </View>
                                        <Text style={{ color: TxtColor, fontWeight: 'bold', fontSize: 14, marginTop: 24 }}>
                                            1. Chụp ảnh {formik.values.icType || 'CMND/CCCD'}:
                                        </Text>
                                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 16 }}>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                {
                                                    FmarketLog?.uriFront?.length > 0 ? (
                                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                            <FastImage
                                                                source={{
                                                                    uri: FmarketLog?.uriFront?.length > 0 ? FmarketLog?.uriFront : ''
                                                                }}
                                                                style={{
                                                                    width: 98,
                                                                    height: 70,
                                                                    borderRadius: 10,
                                                                    backgroundColor: 'black'
                                                                }}
                                                                resizeMode={'contain'}
                                                            />
                                                            <TouchableOpacity
                                                                style={{ position: 'absolute' }}
                                                                onPress={() => this.setState({ showModalImg: true, imgSelected: 'front' })}
                                                            >
                                                                <IconTakePhotoBlurSvg width={30} height={25} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    ) : (
                                                        <TouchableOpacity onPress={() => this.setState({ showModalImg: true, imgSelected: 'front' })}>
                                                            <IconTakePhotoSvg width={98} height={70} color={'#82D8D7'} />
                                                        </TouchableOpacity>
                                                    )
                                                }
                                                <Text style={{ color: TxtColor, fontSize: 14, marginTop: 7 }}>
                                                    Mặt trước {formik.values.icType || 'CMND/CCCD'}
                                                </Text>
                                            </View>
                                            <View style={{ width: 16 }} />
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                {
                                                    FmarketLog?.uriBehind?.length > 0 ? (
                                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                            <FastImage
                                                                source={{
                                                                    uri: FmarketLog?.uriBehind?.length > 0 ? FmarketLog?.uriBehind : ''
                                                                }}
                                                                style={{
                                                                    width: 98,
                                                                    height: 70,
                                                                    borderRadius: 10,
                                                                    backgroundColor: 'black'
                                                                }}
                                                                resizeMode={'contain'}
                                                            />
                                                            <TouchableOpacity
                                                                style={{ position: 'absolute' }}
                                                                onPress={() => this.setState({ showModalImg: true, imgSelected: 'back' })}
                                                            >
                                                                <IconTakePhotoBlurSvg width={30} height={25} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    ) : (
                                                        <TouchableOpacity onPress={() => this.setState({ showModalImg: true, imgSelected: 'back' })}>
                                                            <IconTakePhotoSvg width={98} height={70} color={'#82D8D7'} />
                                                        </TouchableOpacity>
                                                    )
                                                }
                                                <Text style={{ color: TxtColor, fontSize: 14, marginTop: 7 }}>
                                                    Mặt sau {formik.values.icType || 'CMND/CCCD'}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ height: 8, backgroundColor: '#F6F5F6', marginVertical: 20, marginHorizontal: -24 }} />
                                        <View>
                                            <Text style={{ color: TxtColor, fontSize: 14, textAlign: 'center' }}>Vui lòng chỉnh sửa các thông tin nếu chưa đúng</Text>
                                        </View>
                                        <FormikInput
                                            label={'Họ và tên *'}
                                            name={'fullName'}
                                            onBlur={() => {
                                                formik.setFieldValue('fullName', formik.values.fullName.toUpperCase());
                                            }}
                                            autoUpperCase
                                        />
                                        <FormikSelect
                                            label={'Quốc tịch *'}
                                            name={'nation'}
                                            openModal={() => this.setState({ modalNation: true })}
                                        />
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 1, marginTop: 5 }}>
                                                <FormikSelect
                                                    label={'Giới tính *'}
                                                    name={'gender'}
                                                    openModal={() => this.setState({ modalGender: true })}
                                                />
                                            </View>
                                            <View style={{ width: 16 }} />
                                            <View style={{ flex: 1 }}>
                                                <DateFill
                                                    value={formik.values.birthday}
                                                    onChange={(text, err) => {
                                                        this.confirmPicker(text, formik, err);
                                                    }}
                                                    label={'Ngày sinh *'}
                                                    maximumDate={moment().subtract(15, 'years').format('DD/MM/YYYY')}
                                                    errMaximum={ERROR_15_YEARS}
                                                    requireFill
                                                />
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <FormikInput
                                                    label={`Số ${formik.values.icType || 'CMND/CCCD'} *`}
                                                    name={'identityNumber'}
                                                    maxLength={12}
                                                    onBlur={() => {
                                                        formik.setFieldValue('identityNumber', formik.values.identityNumber.toUpperCase());
                                                    }}
                                                    autoUpperCase
                                                    keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                                />
                                            </View>
                                            <View style={{ width: 16 }} />
                                            <View style={{ flex: 1 }}>
                                                <FormikInput
                                                    label={'Nơi cấp *'}
                                                    name={'placeIdentity'}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <DateFill
                                                    value={formik.values.createDate}
                                                    onChange={(text, err) => {
                                                        this.confirmPickerCreate(text, formik, err);
                                                    }}
                                                    label={'Ngày cấp *'}
                                                    minimumDate={moment().subtract(15, 'years').format('DD/MM/YYYY')}
                                                    errMinimum={ERROR_15_YEARS_DOWN}
                                                    requireFill
                                                />
                                            </View>
                                            <View style={{ width: 16 }} />
                                            <View style={{ flex: 1 }}>
                                                <DateFill
                                                    value={formik.values.expireDate}
                                                    onChange={(text, err) => {
                                                        this.confirmPickerExpire(text, formik, err);
                                                    }}
                                                    label={'Ngày hết hạn *'}
                                                    minimumDate={moment().format('DD/MM/YYYY')}
                                                    errMinimum={ERROR_DATE_CURRENT}
                                                    requireFill
                                                />
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 5 }}>
                                            <View style={{ flex: 1 }}>
                                                <FormikSelect
                                                    label={'Tỉnh/Thành phố *'}
                                                    name={'province'}
                                                    openModal={() => this.setState({ modalProvince: true })}
                                                />
                                            </View>
                                            <View style={{ width: 16 }} />
                                            <View style={{ flex: 1 }}>
                                                <FormikSelect
                                                    label={'Quận/Huyện *'}
                                                    name={'district'}
                                                    openModal={() => this.setState({ modalDistrict: true })}
                                                    checkDisabled={!formik.values.province}
                                                    hideIcon={!formik.values.province}
                                                    baseColor={formik.values.province ? colorText : textDisable}
                                                />
                                            </View>
                                        </View>
                                        <FormikInput
                                            label={'Địa chỉ (Số nhà, ngõ, đường, phường/xã) *'}
                                            name={'address'}
                                        />
                                        <View style={{ height: 8, backgroundColor: '#F6F5F6', marginBottom: 10, marginTop: 16, marginHorizontal: -24 }} />
                                        <FormikInput
                                            label={'Địa chỉ liên lạc *'}
                                            name={'addressContact'}
                                        />
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <FormikInput1
                                                    label={'Số điện thoại *'}
                                                    name={'phoneNumber'}
                                                    keyboardType={'number-pad'}
                                                    maxLength={12}
                                                    showOTP={
                                                        formik.values.phoneNumber.length > 0 &&
                                                        isPhoneAccident(formik.values.phoneNumber)
                                                    }
                                                    onPressOtp={() => this.onSendOTP(formik)}
                                                    onBlur={() => this.onBlurPhone(formik.values.phoneNumber)}
                                                />
                                            </View>
                                            <View style={{ width: 16 }} />
                                            <View style={{ flex: 1 }}>
                                                <FormikInput1
                                                    label={'Nhập OTP *'}
                                                    name={'otp'}
                                                    keyboardType={'number-pad'}
                                                    maxLength={6}
                                                    showTime={sendedOTP && !showSuccess}
                                                    onBlur={() => this.onBlurOTP(formik)}
                                                    showSuccess={showSuccess && !errOTP}
                                                />
                                                {
                                                    errOTP ?
                                                        <Text style={{ color: errValidColor, fontSize: 14 }}>
                                                            {errOTP}
                                                        </Text> : null
                                                }
                                                {
                                                    sendedOTP ? (
                                                        <TouchableOpacity
                                                            style={{ flex: 1, flexDirection: 'row', marginTop: errOTP.length > 0 ? 8 : 0 }}
                                                            onPress={() => this.onSendOTP(formik)}
                                                        >
                                                            <View style={{ flex: 3 }}>
                                                                <Text style={{ color: '#B3B2B3', fontSize: 12 }}>Không nhận được OTP</Text>
                                                            </View>
                                                            <View style={{ width: 8 }} />
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={{ color: Color, fontSize: 12, textAlign: 'right' }}>Gửi lại</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    ) : null
                                                }
                                            </View>
                                        </View>
                                        <FormikInput
                                            label={'Email *'}
                                            name={'email'}
                                            keyboardEmail
                                            keyboardType={'email-address'}
                                        />
                                        <View style={{ height: 8, backgroundColor: '#F6F5F6', marginVertical: 20, marginHorizontal: -24 }} />
                                        <FormikInput1
                                            label={'Chủ tài khoản *'}
                                            name={'bankFullName'}
                                            value={removeVietnameseTones(formik.values.fullName.normalize())}
                                            editable={false}
                                            baseColor={textDisable}
                                            textColor={textDisable}
                                        />
                                        <View style={{ marginVertical: 5 }}>
                                            <FormikSelect
                                                label={'Ngân hàng *'}
                                                name={'bankInfo'}
                                                openModal={() => this.setState({ modalBank: true })}
                                                showTextLines
                                            />
                                        </View>
                                        <FormikInput
                                            label={'Chi nhánh *'}
                                            name={'bankBranch'}
                                        />
                                        <FormikInput1
                                            label={'Số tài khoản *'}
                                            name={'bankNumber'}
                                            keyboardType={'number-pad'}
                                        />
                                    </ScrollView>
                                </KeyboardAvoidingView>
                                <View style={{ backgroundColor: 'white', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({isLoading: true}, () => {
                                                this.handleNext(formik);
                                            })
                                        }}
                                        disabled={
                                            !formik.isValid ||
                                            formik.values.errBirthday ||
                                            formik.values.errCreateDate ||
                                            formik.values.errExpireDate ||
                                            (formik.values.otp?.length === 0) ||
                                            (errOTP?.length > 0) ||
                                            !(FmarketLog?.uriFront?.length > 0) ||
                                            !(FmarketLog?.uriBehind?.length > 0)
                                        }
                                        style={{
                                            width: '100%',
                                            paddingVertical: 16,
                                            backgroundColor:
                                                (!formik.isValid ||
                                                formik.values.errBirthday ||
                                                formik.values.errCreateDate ||
                                                formik.values.errExpireDate ||
                                                (formik.values.otp?.length === 0) ||
                                                (errOTP?.length > 0) ||
                                                !(FmarketLog?.uriFront?.length > 0) ||
                                                !(FmarketLog?.uriBehind?.length > 0))
                                                ? NewColorDisable : Color,
                                            borderRadius: 10,
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                                            TIẾP TỤC
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        );
                    }}
                </Formik>
                <Modal
                    isVisible={showModal}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
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
                            alignItems: 'center'
                        }}>
                        <NotifyRingSvg width={53} height={60} />
                        <Text style={{ marginTop: 24, marginBottom: 32, fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                            Bạn đã hoàn tất đăng ký tài khoản.{'\n'}Fmarket đang kiểm tra thông tin và sẽ phản hồi lại cho bạn trong vòng xxh tới
                        </Text>
                        <TouchableOpacity
                            onPress={this.onClose}
                            style={{
                                width: '100%',
                                paddingVertical: 16,
                                backgroundColor: Color,
                                borderRadius: 10,
                                alignItems: 'center'
                            }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                                VỀ TRANG CHỦ
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

UpdateProfile.defaultProps = {
    isCamera: false
}

import Nav from '../../components/Nav';
import { connect } from 'react-redux';
import { Color, TxtColor, NewColorDisable, colorText, textDisable, URL, errValidColor } from '../../config/System';
import Store from '../../services/Store';
import moment from 'moment';

const mapStateToProps = (state) => {
    return {
        FmarketLog: state.userInfo.FmarketLog,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDistrict: id => dispatch(getDistrict(id)),
        saveFmarketLog: (data) => dispatch(saveFmarketLog(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
