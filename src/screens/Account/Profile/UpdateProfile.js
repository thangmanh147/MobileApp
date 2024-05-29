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
import { handleTextInput } from 'react-native-formik';
import { ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import { getDistrict } from '../../CarInsurance/actions/car_Buy';
import DateFill from '../../../components/dateTimeFill/DateFill';
import Input from '../../CarInsurance/components/Input';
import InputSelect from '../../../components/buy/InputSelect';
import Const from '../../../services/Const';
import { saveProfileLog, getProfileInfo, getUserInfo } from '../actions';
import ModalProvince from '../../CarInsurance/components/ModalProvince';
import ModalDistrict from '../../CarInsurance/components/ModalDistrict';
import ModalBank from '../components/ModalBank';
import SimpleToast from 'react-native-simple-toast';
import {
    ERROR_15_YEARS,
    ERROR_ADDRESS_FORMAT,
    ERROR_BANK_NUMBER_FORMAT,
    ERROR_EMAIL_FORMAT,
    ERROR_IDENTITY_FORMAT,
    ERROR_NAME_FORMAT,
    ERROR_COMPANY_TAXCODE_REQUIRED,
    ERROR_COMPANY_TAXCODE_FORMAT,
} from '../../../config/ErrorMessage';
import { isAddress, isBankNumber, isEmailAccident, isFullName, isIdentity, isPhoneAccident, isReferralCode, removeVietnameseTones, isTaxCodePersonal } from '../../../components/Functions';
import IconTakePhotoSvg from '../../../config/images/icons/IconTakePhotoSvg';
import IconTakePhotoBlurSvg from '../../../config/images/icons/IconTakePhotoBlurSvg';
import NotifyRingSvg from '../../../config/images/login/NotifyRingSvg';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalProvince: false,
            modalDistrict: false,
            modalBank: false,
            showModal: false,
            showModalImg: false,
            imgSelected: '',
            isLoading: false,
        };
    }

    componentDidMount() {
        const { dataUser, dataProfile, getDistrict, getProfileInfo, getUserInfo } = this.props
        if (dataProfile) {
            getDistrict(dataProfile.provinceId);
        }
        if(!dataUser) {
            getUserInfo();
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
        district: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
        address: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('address', ERROR_ADDRESS_FORMAT, values => isAddress(values)),
        email: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('email', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)),
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
        tax: Yup.string().when('taxType', {
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .required(ERROR_COMPANY_TAXCODE_REQUIRED)
                .test('tax', ERROR_COMPANY_TAXCODE_FORMAT, values => isTaxCodePersonal(values)),
        }),    
    });

    handleNext = (formik) => {
        const {profileLog, dataProfile} = this.props;
        let url = `${URL}/api/account/v1/profiles`;
        const formData = new FormData();
        formData.append('fullName', formik.values.fullName.normalize() || '');
        formData.append('tax', formik.values.taxType ? formik.values.tax.trim() : '');
        formData.append('hasTax', formik.values.taxType);
        formData.append('email', formik.values.email.trim() || '');
        formData.append('identityNumber', formik.values.identityNumber.toUpperCase() || '');
        formData.append('provinceId', formik.values.provinceId || '');
        formData.append('districtId', formik.values.districtId || '');
        formData.append('address', formik.values.address || '');
        formData.append('birthday', formik.values.birthday || '');
        formData.append('front', {
            uri: profileLog?.uriFront?.length > 0 ? profileLog?.uriFront : (dataProfile?.identifyImages && dataProfile?.identifyImages.find(item => item.code === 'front') ? dataProfile?.identifyImages.find(item => item.code === 'front').source : ''),
            name: 'image.jpg',
            type: 'image/jpeg',
        });
        formData.append('back', {
            uri: profileLog?.uriBehind?.length > 0 ? profileLog?.uriBehind : (dataProfile?.identifyImages && dataProfile?.identifyImages.find(item => item.code === 'back') ? dataProfile?.identifyImages.find(item => item.code === 'back').source : ''),
            name: 'image.jpg',
            type: 'image/jpeg',
        });
        formData.append('bankFullName', removeVietnameseTones(formik.values.fullName.normalize()));
        formData.append('bankAccount', formik.values.bankNumber || '');
        formData.append('bankId', formik.values.bankId || '');
        console.log('======url', url)
        console.log('======body', formData)
        new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
                method: dataProfile?.status ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                },
                body: formData,
            })
                .then((res) => res.json())
                .then(async (res) => {
                    console.log('======res-acóntarcsfdfdcontract', res)
                    if (res.status == 200 || res.status == 'success') {
                        this.setState({isLoading: false}, () => {
                            this.setModal(true);
                        })
                    } else {
                        this.setState({isLoading: false}, () => {
                            SimpleToast.show(res?.message);
                        })
                    }
                })
                .catch(async (error) => {
                    console.log(error)
                    this.setState({isLoading: false}, () => {
                        SimpleToast.show(error?.message);
                    })
                })
        })
    };

    onCamera = (formik, obj) => {
        const {saveProfileLog, profileLog} = this.props;
        let body = {
            infoProfile: formik.values,
            uriFront: profileLog?.uriFront?.length > 0 ? profileLog?.uriFront : '',
            uriBehind: profileLog?.uriBehind?.length > 0 ? profileLog?.uriBehind : '',
        }
        saveProfileLog(body);
        Actions.execute('replace', 'Camera24h', obj);
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

    setBankInfo = (data, formik) => {
        formik.setFieldValue('bankInfo', `(${data.code}) ${data.tradeName} - ${data.name}`);
        formik.setFieldValue('bankId', data.id);
    };

    confirmPicker = (date, formik, err) => {
        formik.setFieldValue('birthday', date);
        formik.setFieldValue('errBirthday', err);
    };
    
    setModal = (value) => {
        this.setState({showModal: value});
    };
    
    onShowCamera = (formik) => {
        const {imgSelected} = this.state;
        if (imgSelected === 'front') {
            this.onCamera(formik, {isProfileFront: true});
        } else {
            this.onCamera(formik, {isProfileBehind: true});
        }
    };
    
    onShowLibrary = (formik) => {
        const {saveProfileLog, profileLog} = this.props;
        const {imgSelected} = this.state;
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
                this.setState({showModalImg: false})
                let body = {
                    infoProfile: formik.values,
                    uriFront: imgSelected === 'front' ? image.path : (profileLog?.uriFront?.length > 0 ? profileLog?.uriFront : ''),
                    uriBehind: imgSelected === 'back' ? image.path : (profileLog?.uriBehind?.length > 0 ? profileLog?.uriBehind : ''),
                }
                saveProfileLog(body);
            })
            .catch();
    };
    
    onClose = () => {
        const {saveProfileLog, getProfileInfo} = this.props;
        this.setModal(false);
        saveProfileLog(null);
        getProfileInfo();
        Actions.tab({tab: 'account'});
    };
    
    setTaxType = (formik, value) => {
        formik.setFieldValue('taxType', value);
    };

    render() {
        const { dataUser, isCamera, profileLog, dataProfile, listBank } = this.props;
        const { modalProvince, modalDistrict, modalBank, showModal, showModalImg, isLoading } = this.state;
        const dataBank = listBank && listBank.find(item => item.id == dataProfile?.bankId);
        const FormikInput = handleTextInput(Input);
        const FormikSelect = handleTextInput(InputSelect);
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 100 }}>
                    <Nav show isInfo={false} bottom={20} />
                </View>
                <Formik
                    initialValues={{
                        fullName: (isCamera && profileLog?.infoOCR?.name?.length > 0 ?
                            profileLog?.infoOCR?.name : (profileLog?.infoProfile?.fullName || dataProfile?.fullName)) || '',
                        identityNumber: (isCamera && profileLog?.infoOCR?.cmndNum?.length > 0 ?
                            profileLog?.infoOCR?.cmndNum : (profileLog?.infoProfile?.identityNumber || dataProfile?.identityNumber)) || '',
                        email: profileLog?.infoProfile?.email || dataProfile?.email || '',
                        birthday: (isCamera && profileLog?.infoOCR?.dob?.length > 0 ?
                            profileLog?.infoOCR?.dob : (profileLog?.infoProfile?.birthday || dataProfile?.birthday)) || '',
                        province: profileLog?.infoProfile?.province || dataProfile?.provinceName || '',
                        district: profileLog?.infoProfile?.district || dataProfile?.districtName || '',
                        provinceId: profileLog?.infoProfile?.provinceId || dataProfile?.provinceId || '',
                        districtId: profileLog?.infoProfile?.districtId || dataProfile?.districtId || '',
                        address: (isCamera && profileLog?.infoOCR?.address?.length > 0 ?
                            profileLog?.infoOCR?.address : (profileLog?.infoProfile?.address || dataProfile?.address)) || '',
                        bankInfo: profileLog?.infoProfile?.bankInfo || (dataBank?.name ? `(${dataBank?.code}) ${dataBank?.tradeName} - ${dataBank?.name}` : ''),
                        bankId: profileLog?.infoProfile?.bankId || dataProfile?.bankId || '',
                        bankNumber: profileLog?.infoProfile?.bankNumber || dataProfile?.bankAccount || '',
                        tax: profileLog?.infoProfile?.tax || dataProfile?.tax || '',
                        taxType: (profileLog?.infoProfile?.taxType || (dataProfile?.tax && !dataProfile?.hasTax) || dataProfile?.hasTax === 'true') ? true : false,
                    }}
                    enableReinitialize={true}
                    validationSchema={this.validation}
                    isInitialValid={(profileLog?.infoProfile?.fullName || dataProfile?.fullName) ? true : false}>
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
                                        onBackButtonPress={() => this.setState({showModalImg: false})}
                                        onBackdropPress={() => this.setState({showModalImg: false})}
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
                                                <View style={{marginVertical: 16, height: 1, backgroundColor: '#D9D9D9'}} />
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
                                        <Text style={{ color: TxtColor, fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 32 }}>
                                            HỒ SƠ
                                        </Text>
                                        {
                                            dataProfile?.status ? null : (
                                                <Text style={{ color: '#BE3030', fontSize: 14, textAlign: 'center', marginTop: 4 }}>
                                                    Bạn cần tạo hồ sơ để nhận hoa hồng
                                                </Text>
                                            )
                                        }
                                        <Text style={{ color: TxtColor, fontWeight: 'bold', fontSize: 14, marginTop: 24 }}>
                                            1. Ảnh CMND/CCCD:
                                        </Text>
                                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 16 }}>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                {
                                                    ((profileLog?.uriFront?.length > 0) || (dataProfile?.identifyImages && dataProfile?.identifyImages.find(item => item.code === 'front'))) ? (
                                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                            <FastImage
                                                                source={{
                                                                    uri: profileLog?.uriFront?.length > 0 ? profileLog?.uriFront : (dataProfile?.identifyImages && dataProfile?.identifyImages.find(item => item.code === 'front') ? dataProfile?.identifyImages.find(item => item.code === 'front').source : '')
                                                                }}
                                                                style={{
                                                                    width: 98,
                                                                    height: 70,
                                                                    borderRadius: 10,
                                                                    backgroundColor: 'black'
                                                                }}
                                                                resizeMode={'contain'}
                                                            />
                                                            {
                                                                dataProfile?.status !== 'approved' ? (
                                                                    <TouchableOpacity
                                                                        style={{ position: 'absolute' }}
                                                                        onPress={() => this.setState({showModalImg: true, imgSelected: 'front'})}
                                                                    >
                                                                        <IconTakePhotoBlurSvg width={30} height={25} />
                                                                    </TouchableOpacity>
                                                                ) : null
                                                            }
                                                        </View>
                                                    ) : (
                                                        <TouchableOpacity onPress={() => this.setState({showModalImg: true, imgSelected: 'front'})}>
                                                            <IconTakePhotoSvg width={98} height={70} color={'#82D8D7'} />
                                                        </TouchableOpacity>
                                                    )
                                                }
                                                <Text style={{ color: TxtColor, fontSize: 14, marginTop: 7 }}>
                                                    Mặt trước CMND/CCCD
                                                </Text>
                                            </View>
                                            <View style={{ width: 16 }} />
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                {
                                                    ((profileLog?.uriBehind?.length > 0) || (dataProfile?.identifyImages && dataProfile?.identifyImages.find(item => item.code === 'back'))) ? (
                                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                            <FastImage
                                                                source={{
                                                                    uri: profileLog?.uriBehind?.length > 0 ? profileLog?.uriBehind : (dataProfile?.identifyImages && dataProfile?.identifyImages.find(item => item.code === 'back') ? dataProfile?.identifyImages.find(item => item.code === 'back').source : '')
                                                                }}
                                                                style={{
                                                                    width: 98,
                                                                    height: 70,
                                                                    borderRadius: 10,
                                                                    backgroundColor: 'black'
                                                                }}
                                                                resizeMode={'contain'}
                                                            />
                                                            {
                                                                dataProfile?.status !== 'approved' ? (
                                                                    <TouchableOpacity
                                                                        style={{ position: 'absolute' }}
                                                                        onPress={() => this.setState({showModalImg: true, imgSelected: 'back'})}
                                                                    >
                                                                        <IconTakePhotoBlurSvg width={30} height={25} />
                                                                    </TouchableOpacity>
                                                                ) : null
                                                            }
                                                        </View>
                                                    ) : (
                                                        <TouchableOpacity onPress={() => this.setState({showModalImg: true, imgSelected: 'back'})}>
                                                            <IconTakePhotoSvg width={98} height={70} color={'#82D8D7'} />
                                                        </TouchableOpacity>
                                                    )
                                                }
                                                <Text style={{ color: TxtColor, fontSize: 14, marginTop: 7 }}>
                                                    Mặt sau CMND/CCCD
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ height: 8, backgroundColor: '#F6F5F6', marginVertical: 20, marginHorizontal: -24 }} />
                                        <View>
                                            <Text style={{ color: TxtColor, fontSize: 14, textAlign: 'center' }}>Vui lòng chỉnh sửa các thông tin nếu chưa đúng</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 24 }}>
                                            <TouchableOpacity
                                                onPress={() => this.setTaxType(formik, true)}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    flex: 1
                                                }}>
                                                {
                                                    formik.values.taxType ? (
                                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                                    ) : (
                                                        <IconRadioBtnSvg width={15} height={15} />
                                                    )
                                                }
                                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1, marginRight: 5 }}>Đã có MST cá nhân</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => this.setTaxType(formik, false)}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    flex: 1
                                                }}>
                                                {
                                                    !formik.values.taxType ? (
                                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                                    ) : (
                                                        <IconRadioBtnSvg width={15} height={15} />
                                                    )
                                                }
                                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Chưa có MST cá nhân</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            formik.values.taxType ? (
                                                <FormikInput
                                                    label={'Mã số thuế *'}
                                                    name={'tax'}
                                                    maxLength={13}
                                                    keyboardType={'number-pad'}
                                                />
                                            ) : (
                                                <Text style={{ color: Color, fontSize: 14, flex: 1, fontStyle: 'italic', marginTop: 20 }}>
                                                    Ủy quyền cho INSO đăng ký mã số thuế cá nhân
                                                </Text>
                                            )
                                        }
                                        <FormikInput
                                            label={'Họ và tên *'}
                                            name={'fullName'}
                                            onBlur={() => {
                                                formik.setFieldValue('fullName', formik.values.fullName.toUpperCase());
                                            }}
                                            autoUpperCase
                                            editable={dataProfile?.status !== 'approved'}
                                            baseColor={dataProfile?.status !== 'approved' ? colorText : textDisable}
                                            textColor={dataProfile?.status !== 'approved' ? TxtColor : textDisable}
                                        />
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <DateFill
                                                    value={formik.values.birthday}
                                                    onChange={(text, err) => {
                                                          this.confirmPicker(text, formik, err);
                                                    }}
                                                    label={'Ngày tháng năm sinh *'}
                                                    maximumDate={moment().subtract(15, 'years').format('DD/MM/YYYY')}
                                                    errMaximum={ERROR_15_YEARS}
                                                    requireFill
                                                    hidePlaceHolder
                                                    editable={dataProfile?.status !== 'approved'}
                                                />
                                            </View>
                                            <View style={{ width: 16 }} />
                                            <View style={{ flex: 1 }}>
                                                <FormikInput
                                                    label={'Số CMND/CCCD *'}
                                                    name={'identityNumber'}
                                                    maxLength={12}
                                                    onBlur={() => {
                                                        formik.setFieldValue('identityNumber', formik.values.identityNumber.toUpperCase());
                                                    }}
                                                    autoUpperCase
                                                    keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                                    editable={dataProfile?.status !== 'approved'}
                                                    baseColor={dataProfile?.status !== 'approved' ? colorText : textDisable}
                                                    textColor={dataProfile?.status !== 'approved' ? TxtColor : textDisable}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 5 }}>
                                            <View style={{ flex: 1 }}>
                                                <FormikSelect
                                                    label={'Tỉnh/Thành phố *'}
                                                    name={'province'}
                                                    openModal={() => this.setState({ modalProvince: true })}
                                                    checkDisabled={dataProfile?.status === 'approved'}
                                                    baseColor={dataProfile?.status !== 'approved' ? colorText : textDisable}
                                                    textColor={dataProfile?.status !== 'approved' ? TxtColor : textDisable}
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
                                                    checkDisabled={dataProfile?.status === 'approved'}
                                                    baseColor={dataProfile?.status !== 'approved' ? colorText : textDisable}
                                                    textColor={dataProfile?.status !== 'approved' ? TxtColor : textDisable}
                                                />
                                            </View>
                                        </View>
                                        <FormikInput
                                            label={'Địa chỉ (Số nhà, ngõ, đường, phường/xã) *'}
                                            name={'address'}
                                            editable={dataProfile?.status !== 'approved'}
                                            baseColor={dataProfile?.status !== 'approved' ? colorText : textDisable}
                                            textColor={dataProfile?.status !== 'approved' ? TxtColor : textDisable}
                                        />
                                        <FormikInput
                                            label={'Email *'}
                                            name={'email'}
                                            keyboardEmail
                                            keyboardType={'email-address'}
                                        />
                                        <View style={{ height: 8, backgroundColor: '#F6F5F6', marginTop: 13, marginBottom: 20, marginHorizontal: -24 }} />
                                        <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>2. Thông tin ngân hàng:</Text>
                                        <FormikInput
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
                                            label={'Số tài khoản *'}
                                            name={'bankNumber'}
                                            keyboardType={'number-pad'}
                                        />
                                    </ScrollView>
                                </KeyboardAvoidingView>
                                <View style={{ backgroundColor: 'white', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}>
                                    <TouchableOpacity
                                        disabled={
                                            !formik.isValid ||
                                            formik.values.errBirthday ||
                                            (!(profileLog?.uriFront?.length > 0) && !(dataProfile?.identifyImages && dataProfile?.identifyImages.find(item => item.code === 'front'))) ||
                                            (!(profileLog?.uriBehind?.length > 0) && !(dataProfile?.identifyImages && dataProfile?.identifyImages.find(item => item.code === 'back')))
                                        }
                                        onPress={() => {
                                            this.setState({isLoading: true}, () => {
                                                this.handleNext(formik);
                                            })
                                        }}
                                        style={{
                                            width: '100%',
                                            paddingVertical: 16,
                                            backgroundColor:
                                                !formik.isValid ||
                                                formik.values.errBirthday ||
                                                (!(profileLog?.uriFront?.length > 0) && !(dataProfile?.identifyImages && dataProfile?.identifyImages.find(item => item.code === 'front'))) ||
                                                (!(profileLog?.uriBehind?.length > 0) && !(dataProfile?.identifyImages && dataProfile?.identifyImages.find(item => item.code === 'back')))
                                                ? NewColorDisable : Color,
                                            borderRadius: 10,
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                                            GỬI DUYỆT
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
                            Chúng tôi đã nhận được hồ sơ của bạn và sẽ duyệt trong vòng 24h
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
                                ĐÓNG
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

import Nav from '../../../components/Nav';
import { connect } from 'react-redux';
import { Color, TxtColor, NewColorDisable, colorText, textDisable, URL } from '../../../config/System';
import Store from '../../../services/Store';
import moment from 'moment';

const mapStateToProps = (state) => {
    return {
        dataUser: state.userInfo.userInfo,
        profileLog: state.userInfo.profileLog,
        dataProfile: state.userInfo.profileInfo,
        listBank: state.userInfo.listBank,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDistrict: id => dispatch(getDistrict(id)),
        saveProfileLog: (data) => dispatch(saveProfileLog(data)),
        getProfileInfo: () => dispatch(getProfileInfo()),
        getUserInfo: () => dispatch(getUserInfo()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
