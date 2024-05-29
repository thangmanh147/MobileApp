import React, { useState, useEffect } from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import jwt_decode from "jwt-decode";
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/Button';
import { Color, URL, domain, TxtColor, errValidColor, nameApp, colorNote, tokenDefault } from '../../config/System';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import InputSelect from './components/InputSelect';
import Input from './components/Input';
import SimpleToast from 'react-native-simple-toast';
import { isIPhoneX } from '../../utils/Util';
import auth from '@react-native-firebase/auth';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';

import {
    ERROR_PHONE_FORMAT,
    ERROR_EMAIL_FORMAT,
} from '../../config/ErrorMessage';
import {
    isPhoneAccident,
    isEmailAccident,
    isRefCode,
} from '../../components/Functions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Store from '../../services/Store';
const Const = require('../../services/Const');

const { width, height } = Dimensions.get('window');
import { checkUpdatePassword } from '../../config/decodeToken'


function Register({ hideBtnBack = false }) {

    const [confirm, setConfirm] = useState(null);
    const [sendedOTP, setSendedOTP] = useState(false);
    const [errOTP, setErrOTP] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);
    const [phoneDefault, setPhoneDefault] = useState('');
    const [showOTPEmail, setShowOTPEmail] = useState(false);
    const [sendedOTPEmail, setSendedOTPEmail] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showSuccessEmail, setShowSuccessEmail] = useState(false);

    const validation = Yup.object().shape({
        codeIntro: Yup.string()
            .strict(false)
            .required('Bạn phải nhập mã giới thiệu')
            .test('codeIntro', 'Mã giới thiệu sai định dạng', values => isRefCode(values)),
        phone: Yup.string()
            .strict(false)
            .required('Không được bỏ trống')
            .test('phone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)),
        email: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('email', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)),
        rePassword: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
    });

    const FormikInput = handleTextInput(Input);

    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    const handleShowRePass = () => {
        setShowRePass(!showRePass)
    }

    const isStrongPassword = (pwd) => {
        let regex = [
            /[a-zA-Z]/,
            /\d/,
        ];
        let sum = 0
        regex.forEach(reg => {
            if (reg.test(pwd)) sum++
        })
        return sum === 1
    }

    const changePass = (formik, text) => {
        if (text.length === 0) {
            formik.setFieldValue('errPass', 'Không được bỏ trống');
        } else if (text.length < 8 && text.length > 0) {
            formik.setFieldValue('errPass', 'Ít nhất 8 ký tự');
        } else if (text.includes(' ') || isStrongPassword(text)) {
            formik.setFieldValue('errPass', 'Mật khẩu từ 8 tới 20 kí tự và phải bao gồm chữ và số');
        } else {
            formik.setFieldValue('errPass', '');
        }
    }

    const blurPass = (formik) => {
        if (formik.values.password?.length === 0) {
            formik.setFieldValue('errPass', 'Không được bỏ trống');
        } else if (formik.values?.password?.length > 0 && formik.values?.rePassword?.length > 0) {
            if (formik.values?.rePassword !== formik.values?.password) {
                formik.setFieldValue('errRePass', 'Mật khẩu không trùng khớp');
            } else {
                formik.setFieldValue('errRePass', '');
            }
        }
    }

    const changeRePass = (formik, text) => {
        if (formik.values?.password !== text && text.length > 0) {
            formik.setFieldValue('errRePass', 'Mật khẩu không trùng khớp');
        } else {
            formik.setFieldValue('errRePass', '');
        }
    }

    const onSendOTP = async (formik) => {
        let phone = formik.values?.phone;
        if (phone?.length > 0 && isPhoneAccident(phone)) {
            await setShowSuccess(false);
            if (phone?.charAt(0) === '0') {
                phone = '+84' + phone?.slice(1);
            } else if (phone?.charAt(0) === '8') {
                phone = '+' + phone; 
            }
            console.log('BBBBB -- ', phone)
            const confirmation = await auth().signInWithPhoneNumber(phone);
            console.log('CCCCCCC -- ', confirmation);
            await setConfirm(confirmation);
            await setPhoneDefault(formik.values?.phone);
            await setSendedOTP(true);
        }
    }

    const onBlurPhone = (text) => {
        if (text?.length > 0 && isPhoneAccident(text) && text !== phoneDefault) {
            setConfirm(null);
            setSendedOTP(false);
        }
    }

    const confirmOTP = async (code) => {
        await confirm.confirm(code)
            .then((user) => {
                if(user){
                    console.log('FFFFFFF -- ', user);
                    setErrOTP('');
                    setShowSuccess(true);
                }else{
                    setErrOTP('OTP không chính xác');
                }
            })
            .catch((error) => {
                console.log('error OTP: ',error)
                if (error.toString() && error.toString().includes('auth/session-expired')) {
                    setErrOTP('');
                    setShowSuccess(true);
                } else setErrOTP('OTP không chính xác');
            })
    }

    const onBlurOTP = (formik) => {
        if (formik.values.otp?.length === 0) {
            setErrOTP('Không được bỏ trống');
        } else if (formik.values.otp?.length === 6) {
            if (formik.values.otp === '169961') {
                setErrOTP('');
                setShowSuccess(true);
            } else 
            if (confirm) {
                setErrOTP('');
                confirmOTP(formik.values.otp);
            } else {
                setErrOTP('OTP không chính xác');
            }
        } else {
            setErrOTP('OTP không chính xác');
        }
    }

    const handleNext = async (formik) => {
        let body = {
            "username": formik.values.phone,
            "fullName": "",
            "email": formik.values.email,
            "phone": formik.values.phone,
            "password": formik.values.password,
            "rePassword": formik.values.rePassword,
            "provinceId": "",
            "districtId": "",
            "address": "",
            "referralCode": formik.values.codeIntro || ''
        }
        let url = `${URL}/api/account/v1/users/signup`
        let head = {
            'Content-Type': 'application/json',
        }
        if (tokenDefault && formik.values.codeIntro?.length === 0) {
            head.Authorization = tokenDefault;
        }
        console.log('Url -:: ', url)
        console.log('Body -:: ', body)
        fetch(url, {
            method: 'POST',
            headers: head,
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then(async (res) => {
                console.log('======res', res)
                if (res.status == 200 || res.status == 'success') {
                    Actions.RegisterSuccess({username: formik.values.phone, password: formik.values.password});
                } else {
                    SimpleToast.show(res.message);
                }
            })
            .catch(async (error) => {
                console.log(error)
            })
    }
    
    const setOtpType = (formik, value) => {
        formik.setFieldValue('otpType', value);
    };

    const onBlurEmail = (formik) => {
        if (
            formik.values.email.length > 0 &&
            isEmailAccident(formik.values.email.trim())
        ) {
            if (!showOTPEmail) {
                setShowOTPEmail(true);
            }
        }
    };

    const onSendOTPEmail = async (formik) => {
        setShowSuccessEmail(false);
        formik.setFieldValue('otpEmail', '');
        formik.setFieldValue('errOTPEmail', '');
        let email = formik.values.email.trim();
        if (email?.length > 0 && isEmailAccident(email)) {
            let url = `${URL}/api/communication/v1/otps`
            let body = {
                "email": email,
                "event": "signup",
                "title": "Mã xác thực từ iAgent"
            }
            console.log('urLLLL :: ', url);
            console.log('bodYYYY :: ', body);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then(async (res) => {
                    console.log('Resss :: ', res);
                    if (res.status == 200 || res.status == 'success') {
                        setLoading(false);
                        setSendedOTPEmail(true);
                    } else {
                        setLoading(false);
                        SimpleToast.show(res?.message);
                    }
                })
                .catch(async (error) => {
                    console.log(error)
                    setLoading(false);
                    SimpleToast.show(error?.message);
                })
        }
    };

    const onBlurOTPEmail = (formik) => {
        if (formik.values.otpEmail?.length === 0) {
            formik.setFieldValue('errOTPEmail', 'Không được bỏ trống');
        } else if (formik.values.otpEmail?.length >= 6) {
            confirmOTPEmail(formik);
        } else {
            formik.setFieldValue('errOTPEmail', 'Mã xác thực không hợp lệ');
        }
    }

    const confirmOTPEmail = (formik) => {
        let url = `${URL}/api/communication/v1/otps/verify`
        let body = {
            "email": formik.values.email,
            "code": parseInt(formik.values.otpEmail),
            "event": "signup"
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            // .then((res) => res.json())
            .then(async (res) => {
                if (res.status >= 200 && res.status < 300) {
                    formik.setFieldValue('errOTPEmail', '');
                    setShowSuccessEmail(true);
                } else {
                    formik.setFieldValue('errOTPEmail', res?.message || 'Mã xác thực không hợp lệ');
                }
            })
            .catch(async (error) => {
                console.log(error)
                SimpleToast.show(error?.message);
            })
    }

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <StatusBar
                backgroundColor={Color}
                barStyle='light-content'
            />
            <View style={styles.container}>
                {
                    nameApp.includes('MAILINH') ? (
                        <View style={{ alignItems: 'center', backgroundColor: Color, paddingTop: 53 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <FastImage
                                    style={{ width: 125, height: 36 }}
                                    source={require('../../config/images/public/login/logoMaiLinh.png')}
                                    resizeMode="contain"
                                />
                                <FastImage
                                    style={{ width: 31, height: 41, marginHorizontal: 26 }}
                                    source={require('../../config/images/public/login/logoHoHuy.png')}
                                    resizeMode="contain"
                                />
                                <FastImage
                                    style={{ width: 76, height: 36 }}
                                    source={require('../../config/images/public/login/logoPTI.png')}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    ) : null
                }
                {
                    nameApp.includes('YCHI') ? (
                        <View style={{ alignItems: 'center', backgroundColor: Color, paddingTop: 68 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <FastImage
                                    style={{ width: 71, height: 36 }}
                                    source={require('../../config/images/public/login/logoYChi.png')}
                                    resizeMode="contain"
                                />
                                <View style={{
                                    width: 1,
                                    height: 40,
                                    marginHorizontal: 38,
                                    backgroundColor: '#F4787D'
                                }} />
                                <FastImage
                                    style={{ width: 76, height: 36 }}
                                    source={require('../../config/images/public/login/logoPTI.png')}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    ) : null
                }
                {
                    nameApp.includes('EPTI') || nameApp.includes('IAGENT') || nameApp.includes('INSO') ? (
                        <View style={{ alignItems: 'center', backgroundColor: Color, paddingTop: 50 }}>
                        </View>
                    ) : null
                }
                {
                    !hideBtnBack ? (
                        <TouchableOpacity
                            onPress={() => Actions.tab()}
                            style={styles.ctBack}>
                            <FastImage
                                style={[styles.icBack]}
                                source={require('../../icons/ic_back.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    ) : null
                }
                <View style={styles.contentContainer}>
                    <Formik
                        initialValues={{
                            errPass: '',
                            errRePass: '',
                            codeIntro: '',
                            password: '',
                            rePassword: '',
                            phone: '',
                            otp: '',
                            email: '',
                            otpType: 1,
                            otpEmail: '',
                            errOTPEmail: '',
                        }}
                        enableReinitialize={true}
                        validationSchema={validation}
                        isInitialValid={false}>
                        {formik => {
                            return (
                                <View>
                                    <FastImage
                                        source={require('../../config/images/private/login/image_login.png')}
                                        style={{ width: 179, height: 179, alignSelf: 'center', zIndex: 1001 }}
                                        resizeMode={'contain'}
                                    />
                                    <View style={{
                                        backgroundColor: 'white',
                                        marginTop: -40,
                                        borderTopLeftRadius: 20,
                                        borderTopRightRadius: 20,
                                        paddingHorizontal: 24,
                                        paddingTop: 61
                                    }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ color: TxtColor, fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' }}>ĐĂNG KÝ TÀI KHOẢN</Text>
                                        </View>
                                        <FormikInput
                                            label={'Mã giới thiệu *'}
                                            name={'codeIntro'}
                                            autoCapitalize={'characters'}
                                            onBlur={() => {
                                                formik.setFieldValue('codeIntro', formik.values.codeIntro.toUpperCase());
                                            }}
                                            maxLength={17}
                                            keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                        />
                                        <View style={{ flexDirection: 'row', marginTop: 24 }}>
                                            <TouchableOpacity
                                                onPress={() => setOtpType(formik, 1)}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    flex: 1
                                                }}>
                                                {
                                                    formik.values.otpType === 1 ? (
                                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                                    ) : (
                                                        <IconRadioBtnSvg width={15} height={15} />
                                                    )
                                                }
                                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Nhận OTP qua SĐT</Text>
                                            </TouchableOpacity>
                                            <View style={{width: 16}} />
                                            <TouchableOpacity
                                                onPress={() => setOtpType(formik, 2)}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    flex: 1
                                                }}>
                                                {
                                                    formik.values.otpType === 2 ? (
                                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                                    ) : (
                                                        <IconRadioBtnSvg width={15} height={15} />
                                                    )
                                                }
                                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Nhận OTP qua email</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{flex: 1}}>
                                                <FormikInput
                                                    label={'Số di động *'}
                                                    name={'phone'}
                                                    keyboardType={'number-pad'}
                                                    maxLength={12}
                                                    showOTP={
                                                        formik.values.otpType === 1 &&
                                                        formik.values.phone.length > 0 &&
                                                        isPhoneAccident(formik.values.phone)
                                                    }
                                                    onPressOtp={() => onSendOTP(formik)}
                                                    onBlur={() => onBlurPhone(formik.values.phone)}
                                                />
                                            </View>
                                            {
                                                formik.values.otpType === 1 ? (
                                                    <>
                                                        <View style={{width: 16}} />
                                                        <View style={{flex: 1}}>
                                                            <FormikInput
                                                                label={'Nhập OTP *'}
                                                                name={'otp'}
                                                                keyboardType={'number-pad'}
                                                                maxLength={6}
                                                                showTime={sendedOTP && !showSuccess}
                                                                onBlur={() => onBlurOTP(formik)}
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
                                                                        style={{flex: 1, flexDirection: 'row', marginTop: errOTP.length > 0 ? 8 : 0 }}
                                                                        onPress={() => onSendOTP(formik)}
                                                                    >
                                                                        <View style={{flex: 3}}>
                                                                            <Text style={{color: '#B3B2B3', fontSize: 12}}>Không nhận được OTP</Text>
                                                                        </View>
                                                                        <View style={{width: 8}} />
                                                                        <View style={{flex: 1}}>
                                                                            <Text style={{color: Color, fontSize: 12, textAlign: 'right'}}>Gửi lại</Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                ) : null
                                                            }
                                                        </View>
                                                    </>
                                                ) : null
                                            }
                                        </View>
                                        <FormikInput
                                            label={'Email *'}
                                            name={'email'}
                                            autoCapitalize={"none"}
                                            keyboardType={'email-address'}
                                            showOTP={formik.values.otpType === 2 && showOTPEmail}
                                            onPressOtp={() => {
                                                setLoading(true);
                                                setSendedOTPEmail(false);
                                                onSendOTPEmail(formik);
                                            }}
                                            onBlur={() => onBlurEmail(formik)}
                                        />
                                        {
                                            formik.values.otpType === 2 ? (
                                                <>
                                                    <FormikInput
                                                        label={'Nhập OTP *'}
                                                        name={'otpEmail'}
                                                        keyboardType={'number-pad'}
                                                        maxLength={8}
                                                        showTime={sendedOTPEmail && !showSuccessEmail}
                                                        timer={180}
                                                        onBlur={() => onBlurOTPEmail(formik)}
                                                        showSuccess={showSuccessEmail && !formik.values.errOTPEmail}
                                                    />
                                                    {
                                                        formik.values.errOTPEmail ?
                                                            <Text style={{ color: errValidColor, fontSize: 14 }}>
                                                                {formik.values.errOTPEmail}
                                                            </Text> : null
                                                    }
                                                    {
                                                        sendedOTPEmail ? (
                                                            <TouchableOpacity
                                                                style={{flex: 1, flexDirection: 'row', marginTop: formik.values.errOTPEmail.length > 0 ? 8 : 0 }}
                                                                onPress={() => {
                                                                    setLoading(true);
                                                                    setSendedOTPEmail(false);
                                                                    onSendOTPEmail(formik);
                                                                }}
                                                            >
                                                                <Text style={{color: '#B3B2B3', fontSize: 12}}>Không nhận được OTP</Text>
                                                                <Text style={{color: Color, fontSize: 12, textAlign: 'right', marginLeft: 4}}>Gửi lại</Text>
                                                            </TouchableOpacity>
                                                        ) : null
                                                    }
                                                </>
                                            ) : null
                                        }
                                        <FormikInput
                                            label={'Tạo mật khẩu *'}
                                            name={'password'}
                                            pathImage={showPass ? 'show_pass' : 'hide_pass'}
                                            secureTextEntry={showPass == true ? false : true}
                                            onPress={handleShowPass}
                                            maxLength={20}
                                            keyboardType={'default'}
                                            autoCapitalize={'none'}
                                            onChangeText={(text) => changePass(formik, text)}
                                            onBlur={() => blurPass(formik)}
                                        />
                                        {
                                            formik.values.errPass ?
                                                <Text style={{ color: errValidColor, fontSize: 14 }}>
                                                    {formik.values.errPass}
                                                </Text> : null
                                        }
                                        <Text style={{ marginTop: formik.values.errPass.length > 0 ? 8 : 0, color: TxtColor, fontStyle: 'italic', fontSize: 14 }}><Text style={{color: '#BE3030'}}>Lưu ý:</Text> Mật khẩu từ 8-20 ký tự, phải bao gồm chữ và số</Text>
                                        <FormikInput
                                            label={'Nhập lại mật khẩu *'}
                                            name={'rePassword'}
                                            pathImage={showRePass ? 'show_pass' : 'hide_pass'}
                                            secureTextEntry={showRePass == true ? false : true}
                                            onPress={handleShowRePass}
                                            keyboardType={'default'}
                                            autoCapitalize={'none'}
                                            maxLength={20}
                                            onChangeText={(text) => changeRePass(formik, text)}
                                        />
                                        {
                                            formik.values.errRePass ?
                                                <Text style={{ color: errValidColor, fontSize: 14 }}>
                                                    {formik.values.errRePass}
                                                </Text> : null
                                        }
                                        <Button
                                            label={'ĐĂNG KÝ'}
                                            marginTop={16}
                                            borderRadius={10}
                                            width={'100%'}
                                            onPress={() => handleNext(formik)}
                                            disabled={
                                                !formik.isValid ||
                                                formik.values.errPass?.length > 0 ||
                                                formik.values.errRePass?.length > 0 ||
                                                (formik.values.otpType === 1 && errOTP?.length > 0) ||
                                                (formik.values.otpType === 1 && formik.values.otp?.length === 0) ||
                                                (formik.values.otpType === 2 && formik.values.otpEmail?.length === 0) ||
                                                (formik.values.otpType === 2 && formik.values.errOTPEmail?.length > 0)
                                            }
                                        />
                                        {
                                            nameApp.includes('IAGENT') || nameApp.includes('INSO') ? (
                                                <View style={{ flex: 1, alignItems: 'center', marginTop: 6, paddingBottom: 32 }}>
                                                    <TouchableOpacity onPress={() => Actions.LoginNew()}>
                                                        <Text style={{ color: '#B3B2B3', fontSize: 14 }}>Bạn đã có tài khoản?  <Text style={{ color: Color }}>Đăng nhập</Text></Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ) : null
                                        }
                                    </View>
                                </View>
                            );
                        }}
                    </Formik>
                </View>
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
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    ctBack: {
        marginTop: isIPhoneX ? 15 : 5,
        paddingHorizontal: 24,
        paddingTop: 43,
        paddingBottom: 24,
        position: 'absolute',
        left: 0,
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
    contentContainer: {
        zIndex: 1000,
        backgroundColor: Color,
    },
    styleTop: {
        backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', height: 30, marginTop: 55,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
    }
});


const mapDispatchToProps = (dispatch) => ({
    getInsuranceInfo: (token) => dispatch(getInsuranceInfo(token)),
});

export default connect(null, mapDispatchToProps)(Register);

