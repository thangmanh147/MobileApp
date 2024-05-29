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
import ImagePicker from 'react-native-image-crop-picker';
import { getDistrict } from '../../CarInsurance/actions/car_Buy';
import DateFill from '../../../components/dateTimeFill/DateFill';
import Input from '../../CarInsurance/components/Input';
import InputSelect from '../../../components/buy/InputSelect';
import Const from '../../../services/Const';
import { saveTPBankLog } from '../../Account/actions';
import ModalProvince from '../../CarInsurance/components/ModalProvince';
import ModalDistrict from '../../CarInsurance/components/ModalDistrict';
import ModalICType from '../components/ModalICType';
import ModalSex from '../../FlightInsurance/component/ModalSex';
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
} from '../../../config/ErrorMessage';
import { isAddress, isEmailAccident, isFullName, isIdentity, isPhoneAccident, removeVietnameseTones, isTaxCodePersonal, isFullNameUnsigned, isAddressUnsigned } from '../../../components/Functions';
import IconTakePhotoSvg from '../../../config/images/icons/IconTakePhotoSvg';
import IconTakePhotoBlurSvg from '../../../config/images/icons/IconTakePhotoBlurSvg';
import NotifyRingSvg from '../../../config/images/login/NotifyRingSvg';
import FastImage from 'react-native-fast-image';

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
        };
    }

    componentDidMount() {
        const { getDistrict, TPBankLog } = this.props
        if (TPBankLog) {
            getDistrict(TPBankLog?.infoTPBank?.provinceId);
        }
    }

    validation = Yup.object().shape({
        fullName: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test(
                'fullName',
                'Sai định dạng. Họ và tên tài khoản chỉ có ký tự chữ không dấu',
                values => isFullNameUnsigned(values),
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
        district: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
        address: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('address', 'Địa chỉ tài khoản độ dài từ 3 đến 255 ký tự và chỉ có ký tự không dấu', values => isAddressUnsigned(values)),
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
    });

    handleNext = (formik) => {
        const {saveTPBankLog, TPBankLog} = this.props;
        let body = {
            infoTPBank: formik.values,
            uriFront: TPBankLog?.uriFront || '',
            uriBehind: TPBankLog?.uriBehind || '',
        }
        saveTPBankLog(body);
        Actions.TPBankFace();
    };

    onCamera = (formik, obj) => {
        const {saveTPBankLog, TPBankLog} = this.props;
        let body = {
            infoTPBank: formik.values,
            uriFront: TPBankLog?.uriFront || '',
            uriBehind: TPBankLog?.uriBehind || '',
        }
        saveTPBankLog(body);
        Actions.execute('replace', 'CameraICType', obj);
    };

    setProvince = async (data, formik) => {
        if (formik.values.province !== data._name) {
            await formik.setFieldValue('provinceId', data.id);
            await formik.setFieldValue('province', removeVietnameseTones(data._name));
            await formik.setFieldValue('district', '');
        }
        await this.props.getDistrict(data.id);
    };
    
    setDistrict = async (data, formik) => {
        if (formik.values.district !== data._name) {
            await formik.setFieldValue('districtId', data.id);
            await formik.setFieldValue('district', removeVietnameseTones(data._name));
        }
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
        const {saveTPBankLog, TPBankLog} = this.props;
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
                    infoTPBank: formik.values,
                    uriFront: imgSelected === 'front' ? image.path : (TPBankLog?.uriFront || ''),
                    uriBehind: imgSelected === 'back' ? image.path : (TPBankLog?.uriBehind || ''),
                }
                saveTPBankLog(body);
            })
            .catch();
    };
    
    render() {
        const { isCamera, TPBankLog } = this.props;
        const { modalProvince, modalDistrict, modalICType, modalGender, showModalImg } = this.state;
        const FormikInput = handleTextInput(Input);
        const FormikSelect = handleTextInput(InputSelect);
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 100 }}>
                    <Nav show isInfo={false} bottom={20} onPress={() => Actions.TPBankIntro()} />
                </View>
                <Formik
                    initialValues={{
                        fullName: (isCamera && TPBankLog?.infoOCR?.name?.length > 0 ?
                            TPBankLog?.infoOCR?.name : TPBankLog?.infoTPBank?.fullName) || '',
                        identityNumber: (isCamera && TPBankLog?.infoOCR?.cmndNum?.length > 0 ?
                            TPBankLog?.infoOCR?.cmndNum : TPBankLog?.infoTPBank?.identityNumber) || '',
                        email: TPBankLog?.infoTPBank?.email || '',
                        birthday: (isCamera && TPBankLog?.infoOCR?.dob?.length > 0 ?
                            TPBankLog?.infoOCR?.dob : TPBankLog?.infoTPBank?.birthday) || '',
                        createDate: TPBankLog?.infoTPBank?.createDate || '',
                        expireDate: TPBankLog?.infoTPBank?.expireDate || '',
                        province: TPBankLog?.infoTPBank?.province || '',
                        district: TPBankLog?.infoTPBank?.district || '',
                        provinceId: TPBankLog?.infoTPBank?.provinceId || '',
                        districtId: TPBankLog?.infoTPBank?.districtId || '',
                        address: (isCamera && TPBankLog?.infoOCR?.address?.length > 0 ?
                            TPBankLog?.infoOCR?.address : TPBankLog?.infoTPBank?.address) || '',
                        icType: TPBankLog?.infoTPBank?.icType || '',
                        gender: TPBankLog?.infoTPBank?.gender || '',
                        phoneNumber: TPBankLog?.infoTPBank?.phoneNumber || '',
                    }}
                    enableReinitialize={true}
                    validationSchema={this.validation}
                    isInitialValid={(TPBankLog?.infoTPBank?.fullName) ? true : false}>
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
                                        unsigned
                                    />
                                    <ModalDistrict
                                        open={modalDistrict}
                                        onClosed={() => this.setState({ modalDistrict: false })}
                                        setDistrict={data => this.setDistrict(data, formik)}
                                        onOpened={() => this.setState({ modalDistrict: true })}
                                        nameSelected={formik.values.district}
                                        unsigned
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
                                                    TPBankLog?.uriFront?.length > 0 ? (
                                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                            <FastImage
                                                                source={{
                                                                    uri: TPBankLog?.uriFront?.length > 0 ? TPBankLog?.uriFront : ''
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
                                                                onPress={() => this.setState({showModalImg: true, imgSelected: 'front'})}
                                                            >
                                                                <IconTakePhotoBlurSvg width={30} height={25} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    ) : (
                                                        <TouchableOpacity onPress={() => this.setState({showModalImg: true, imgSelected: 'front'})}>
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
                                                    TPBankLog?.uriBehind?.length > 0 ? (
                                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                            <FastImage
                                                                source={{
                                                                    uri: TPBankLog?.uriBehind?.length > 0 ? TPBankLog?.uriBehind : ''
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
                                                                onPress={() => this.setState({showModalImg: true, imgSelected: 'back'})}
                                                            >
                                                                <IconTakePhotoBlurSvg width={30} height={25} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    ) : (
                                                        <TouchableOpacity onPress={() => this.setState({showModalImg: true, imgSelected: 'back'})}>
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
                                            keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
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
                                            keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                        />
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <FormikInput
                                                    label={'Số điện thoại *'}
                                                    name={'phoneNumber'}
                                                    keyboardType={'number-pad'}
                                                    maxLength={12}
                                                />
                                            </View>
                                            <View style={{ width: 16 }} />
                                            <View style={{ flex: 1 }}>
                                                <FormikInput
                                                    label={'Email *'}
                                                    name={'email'}
                                                    keyboardEmail
                                                    keyboardType={'email-address'}
                                                />
                                            </View>
                                        </View>
                                    </ScrollView>
                                </KeyboardAvoidingView>
                                <View style={{ backgroundColor: 'white', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}>
                                    <TouchableOpacity
                                        onPress={() => this.handleNext(formik)}
                                        disabled={
                                            !formik.isValid ||
                                            formik.values.errBirthday ||
                                            formik.values.errCreateDate ||
                                            formik.values.errExpireDate ||
                                            !(TPBankLog?.uriFront?.length > 0) ||
                                            !(TPBankLog?.uriBehind?.length > 0)
                                        }
                                        style={{
                                            width: '100%',
                                            paddingVertical: 16,
                                            backgroundColor:
                                                !formik.isValid ||
                                                formik.values.errBirthday ||
                                                formik.values.errCreateDate ||
                                                formik.values.errExpireDate ||
                                                !(TPBankLog?.uriFront?.length > 0) ||
                                                !(TPBankLog?.uriBehind?.length > 0)
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
        TPBankLog: state.userInfo.TPBankLog,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDistrict: id => dispatch(getDistrict(id)),
        saveTPBankLog: (data) => dispatch(saveTPBankLog(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
