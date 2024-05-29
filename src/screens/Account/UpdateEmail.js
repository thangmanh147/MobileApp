'use strict';

import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import SimpleToast from 'react-native-simple-toast';
import Const from '../../services/Const';
import Input from '../Login/components/Input';
// import auth from '@react-native-firebase/auth';

class UpdateEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOTP: false,
            sendedOTP: false,
            emailDefault: ''
        };

    }

    validation = Yup.object().shape({
        email: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('email', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)),
    });

    onBlurEmail = (formik) => {
        const {dataUser} = this.props;
        const {showOTP} = this.state;
        if (
            formik.values.email.length > 0 &&
            isEmailAccident(formik.values.email.trim())
        ) {
            if (
                !showOTP &&
                formik.values.email.trim() !== dataUser?.email.trim()
            ) {
                this.setState({showOTP: true});
            } else {
                this.setState({sendedOTP: false});
                formik.setFieldValue('otp', '');
                formik.setFieldValue('errOTP', '');
            }
        }
    };

    onSendOTP = async (formik) => {
        formik.setFieldValue('otp', '');
        formik.setFieldValue('errOTP', '');
        let email = formik.values.email.trim();
        if (email?.length > 0 && isEmailAccident(email)) {
            let url = `${URL}/api/communication/v1/otps`
            let body = {
                "email": email,
                "event": "update-profile",
                "title": "Mã xác thực từ iAgent"
            }
            console.log('urLLLL :: ', url);
            console.log('bodYYYY :: ', body);
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
                        console.log('Resss :: ', res);
                        if (res.status == 200 || res.status == 'success') {
                            this.setState({sendedOTP: true});
                        } else {
                            SimpleToast.show(res?.message);
                        }
                    })
                    .catch(async (error) => {
                        console.log(error)
                        SimpleToast.show(error?.message);
                    })
            })
            // const userCredential = await auth().createUserWithEmailAndPassword('toitq@inso.vn', 'toi1811995');
            // await userCredential.user.sendEmailVerification();
        }
    };

    onBlurOTP = (formik) => {
        if (formik.values.otp?.length === 0) {
            formik.setFieldValue('errOTP', 'Không được bỏ trống');
        } else if (formik.values.otp?.length >= 6) {
            this.confirmOTP(formik);
        } else {
            formik.setFieldValue('errOTP', 'Mã xác thực không hợp lệ');
        }
    }

    confirmOTP = (formik) => {
        let url = `${URL}/api/communication/v1/otps/verify`
        let body = {
            "email": formik.values.email,
            "code": parseInt(formik.values.otp),
            "event": "update-profile"
        }
        new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(body),
            })
                // .then((res) => res.json())
                .then(async (res) => {
                    if (res.status >= 200 && res.status < 300) {
                        formik.setFieldValue('errOTP', '');
                    } else {
                        formik.setFieldValue('errOTP', res?.message || 'Mã xác thực không hợp lệ');
                    }
                })
                .catch(async (error) => {
                    console.log(error)
                    SimpleToast.show(error?.message);
                })
        })
    }

    handleNext = (formik) => {
        const {getUserInfo} = this.props;
        let body = {
            "email": formik.values.email.trim() || '',
        }
        let url = `${URL}/api/account/v1/users/me/profile`
        new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then(async (res) => {
                    console.log('======res-acóntarcsfdfdcontract', res)
                    if (res.status == 200 || res.status == 'success') {
                        getUserInfo();
                        Actions.tab({tab: 'account'});
                    } else {
                        SimpleToast.show(res?.message);
                    }
                })
                .catch(async (error) => {
                    console.log(error)
                    SimpleToast.show(error?.message);
                })
        })
    };

    render() {
        const {
            dataUser,
            commissionFull,
        } = this.props;
        const {
            showOTP,
            sendedOTP,
        } = this.state;
        const FormikInput = handleTextInput(Input);
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 100 }}>
                    <Nav
                        isInfo={false}
                        title={'TÀI KHOẢN'}
                        bottom={20}
                        onPress={() => Actions.pop()}
                        show
                    />
                </View>
                <View style={{ zIndex: 100 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -40 }}>
                        <View style={{ alignSelf: 'center' }}>
                            <FastImage source={require('../../icons/iconAgent/ic_avatar.png')}
                                style={{ height: 90, width: 90, }} />
                        </View>
                    </View>
                </View>
                {
                    dataUser?.fullName ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>{dataUser?.fullName}</Text>
                        </View>
                    ) : null
                }
                <View style={{
                    marginTop: 8,
                    marginHorizontal: 24,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                        <View style={{
                            backgroundColor: '#FEB404',
                            flexDirection: 'row',
                            borderTopLeftRadius: 15,
                            borderBottomLeftRadius: 15,
                            paddingLeft: 32,
                            paddingVertical: 4,
                            alignItems: 'center'
                        }}>
                            <FastImage source={require('../../icons/iconAgent/ic_diamon_white.png')}
                                style={{ height: 16, width: 16 }} resizeMode={'contain'} />
                            <Text style={{ marginLeft: 4, color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>0 <Text style={{fontSize: 12, fontWeight: 'normal'}}>điểm</Text></Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#FEB404', paddingHorizontal: 8, paddingVertical: 4}}>
                        <View style={{width: 1, backgroundColor: 'white', height: 20}} />
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            backgroundColor: '#FEB404',
                            flexDirection: 'row',
                            borderTopRightRadius: 15,
                            borderBottomRightRadius: 15,
                            paddingRight: 32,
                            paddingVertical: 4,
                            alignItems: 'center'
                        }}>
                            <FastImage source={require('../../icons/iconAgent/ic_money_acount.png')}
                                style={{ height: 16, width: 16 }} resizeMode={'contain'} />
                            <Text style={{ marginLeft: 4, color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>{`${formatVND(Math.round(commissionFull?.total || 0))} `}<Text style={{fontSize: 12, fontWeight: 'normal'}}>đ</Text></Text>
                        </View>
                    </View>
                </View>
                <Formik
                    initialValues={{
                        email: dataUser?.email || '',
                        otp: '',
                        errOTP: '',
                    }}
                    enableReinitialize={true}
                    validationSchema={this.validation}
                    isInitialValid={dataUser?.email}>
                    {formik => {
                        return (
                            <>
                                <KeyboardAvoidingView
                                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                                    style={{ flex: 1, justifyContent: 'flex-end' }}>
                                    <ScrollView
                                        style={{ marginTop: 8 }}
                                        contentContainerStyle={{
                                            paddingHorizontal: 24,
                                        }}
                                    >
                                        <FormikInput
                                            label={'Email'}
                                            name={'email'}
                                            autoCapitalize={"none"}
                                            keyboardType={'email-address'}
                                            showOTP={showOTP}
                                            onPressOtp={() => this.onSendOTP(formik)}
                                            onBlur={() => this.onBlurEmail(formik)}
                                        />
                                        {
                                            showOTP && sendedOTP ? (
                                                <>
                                                    <FormikInput
                                                        label={'Nhập OTP *'}
                                                        name={'otp'}
                                                        keyboardType={'number-pad'}
                                                        maxLength={8}
                                                        showTime={sendedOTP}
                                                        timer={180}
                                                        onBlur={() => this.onBlurOTP(formik)}
                                                    />
                                                    {
                                                        formik.values.errOTP ?
                                                            <Text style={{ color: errValidColor, fontSize: 14 }}>
                                                                {formik.values.errOTP}
                                                            </Text> : null
                                                    }
                                                    <TouchableOpacity
                                                        style={{flex: 1, flexDirection: 'row', marginTop: formik.values.errOTP.length > 0 ? 8 : 0 }}
                                                        onPress={() => this.onSendOTP(formik)}
                                                    >
                                                        <Text style={{color: '#B3B2B3', fontSize: 12}}>Không nhận được OTP</Text>
                                                        <Text style={{color: Color, fontSize: 12, textAlign: 'right', marginLeft: 4}}>Gửi lại</Text>
                                                    </TouchableOpacity>
                                                </>
                                            ) : null
                                        }
                                    </ScrollView>
                                </KeyboardAvoidingView>
                                <View style={{ backgroundColor: 'white', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}>
                                    <TouchableOpacity
                                        disabled={
                                            !formik.isValid ||
                                            formik.values.errOTP.length > 0 ||
                                            formik.values.otp.length === 0
                                        }
                                        onPress={() => this.handleNext(formik)}
                                        style={{
                                            width: '100%',
                                            paddingVertical: 16,
                                            backgroundColor: 
                                                !formik.isValid ||
                                                formik.values.errOTP.length > 0 ||
                                                formik.values.otp.length === 0 ?
                                                    NewColorDisable :
                                                    Color,
                                            borderRadius: 10,
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                                            LƯU
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

import Nav from '../../components/Nav';
import { connect } from 'react-redux';
import { Color, errValidColor, nameApp, NewColorDisable, TxtColor, URL } from '../../config/System';
import Store from '../../services/Store';
import { ERROR_EMAIL_FORMAT } from '../../config/ErrorMessage';
import { isEmailAccident, formatVND } from '../../components/Functions';
import {getUserInfo} from './actions';

const mapStateToProps = (state) => {
    return {
        dataUser: state.userInfo.userInfo,
        commissionFull: state.commissions.totalFull,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => dispatch(getUserInfo()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmail);
