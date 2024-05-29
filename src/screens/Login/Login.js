import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import jwt_decode from "jwt-decode";
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/Button';
import { Color, URL, domain, TxtColor, errValidColor, nameApp, colorNote, NewColor } from '../../config/System';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import InputSelect from './components/InputSelect';
import Input from './components/Input';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Store from '../../services/Store';
const Const = require('../../services/Const');

import { checkUpdatePassword } from '../../config/decodeToken'
import { getInsuranceInfo } from '../Agent/actions';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';


function Login({ getInsuranceInfo, hideBtnBack = false }) {

    const [showPass, setShowPass] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [userSave, setUserSave] = useState('');
    const [passSave, setPassSave] = useState('');

    useEffect(() => {
        new Store().getSession(Const.USER_SAVE).then(user => {
            new Store().getSession(Const.PASS_SAVE).then(pass => {
                if (user && pass) {
                    setUserSave(user);
                    setPassSave(pass);
                }
                setShowLogin(true);
            });
        });
    }, []);

    const validation = Yup.object().shape({
        username: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),
        password: Yup.string()
            .strict(false)
            .required('Không được bỏ trống')
    });

    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);

    const handleShowPass = (formik) => {
        // formik.setFieldValue('showPass',!showPass)
        setShowPass(!showPass)
    }

    // useEffect(() => {
    //     firebase.auth().signInWithPhoneNumber('+84328291359')
    //             .then((confirmResult) => {
    //                     // console.log('phoneNumber',phoneNumber)
    //                     console.log('confirmResult',confirmResult)
    //                 }
    //             )
    //             .catch((error) => {
    //                 console.log('error',error)
    //                 SimpleToast.show('Đã xảy ra lỗi, vui lòng thử lại')
    //                 }
    //             );
    // },[])

    const handleNext = async (formik) => {
        let body = {
            "username": formik?.values?.username,
            "password": formik?.values?.password
        }
        if (nameApp.includes('MAILINH') || nameApp.includes('YCHI') || nameApp.includes('EPTI')) {
            body.domain = domain;
        }
        let url = `${URL}/api/account/v1/users/login`
        console.log('url', url)
        console.log('body', body)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then(async (res) => {
                console.log('======res-acóntarcsfdfdcontract', res)
                // await analytics().logEvent(
                //     'INFO_LOGIN',
                //     {
                //         url: url,
                //         statusCode: res.status,
                //         message: res?.message || 'null'
                //     },
                // );
                logging(res, url);
                if (res.status == 200 || res.status == 'success') {
                    getInsuranceInfo(res?.data?.access_token);
                    new Store().storeSession(Const.TOKEN, res?.data?.access_token)
                    new Store().storeSession(Const.IS_LOGIN, true)
                    new Store().storeSession(Const.PASS_WORD, formik?.values?.password)
                    if (formik?.values?.isSave) {
                        new Store().storeSession(Const.USER_SAVE, formik?.values?.username)
                        new Store().storeSession(Const.PASS_SAVE, formik?.values?.password)
                    } else {
                        new Store().storeSession(Const.USER_SAVE, null)
                        new Store().storeSession(Const.PASS_SAVE, null)
                    }
                    if (!checkUpdatePassword(res?.data?.access_token)) {
                        Actions.ChangePass({ firstLogin: true })
                    } else {
                        if (nameApp.includes('IAGENT') || nameApp.includes('INSO')) {
                            Actions.tab();
                        } else {
                            Actions.InsuranceType();
                        }
                    }
                } else {
                    formik.setFieldValue('errPass', 'Tên đăng nhập hoặc mật khẩu không đúng');
                }
            })
            .catch(async (error) => {
                console.log(error)
                // await analytics().logEvent(
                //     'INFO_LOGIN',
                //     {
                //         url: url,
                //         statusCode: 'null',
                //         message: error?.message || 'null'
                //     },
                // );
                formik.setFieldValue('errPass', 'Tên đăng nhập hoặc mật khẩu không đúng');
            })
    }

    const logging = (res, url) => {
        const dataToken = jwt_decode(res?.data?.access_token);
        const userInfo = {
            userName: dataToken?.preferred_username || '',
            userId: dataToken?.userId || '',
            organizationId: dataToken?.organizationId || '',
        };
        let body = {
            "serviceName": `${nameApp}_LOG_LOGIN`,
            "extraData": {userInfo},
            "headers": { "Content-Type": "application/json" },
            "method": "POST",
            "params": {},
            "response": JSON.stringify(res?.data),
            "statusCode": 200,
            "time": moment().format(),
            "url": url
        }
        console.log('BODY: :', body)
        let _url = `https://logging.capdon.vn/v1/logging/InsoAPI`
        fetch(_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then(async (res) => {
                console.log('======res', res)
                if (res.status == 200 || res.status == 'success') {
                } else {
                }
            })
            .catch(async (error) => {
                console.log(error)
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
                    (nameApp.includes('IAGENT') || nameApp.includes('INSO')) ? (
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
                {
                    showLogin ? (
                        <View style={styles.contentContainer}>
                            <Formik
                                initialValues={{
                                    errPass: '',
                                    isSave: userSave,
                                    username: userSave || '',
                                    password: passSave || ''
                                }}
                                validationSchema={validation}
                                isInitialValid={userSave?.length > 0}>
                                {props => {
                                    return (
                                        <View>
                                            <FastImage
                                                source={require('../../config/images/private/login/image_login.png')}
                                                style={{ width: 250, height: 250, alignSelf: 'center', marginTop: nameApp.includes('YCHI') ? 28 : 15, zIndex: 1001 }}
                                                resizeMode={'contain'}
                                            />
                                            <View style={{
                                                backgroundColor: 'white',
                                                marginTop: -40,
                                                borderTopLeftRadius: 20,
                                                borderTopRightRadius: 20,
                                                paddingHorizontal: 24,
                                                paddingTop: nameApp.includes('IAGENT') || nameApp.includes('INSO') ? 73 : 61
                                            }}>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ color: TxtColor, fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' }}>Đăng nhập</Text>
                                                </View>
                                                <FormikInput
                                                    label={nameApp.includes('IAGENT') || nameApp.includes('INSO') ? 'Số di động *' : 'CMND/CCCD *'}
                                                    name={'username'}
                                                />
                                                <FormikInput
                                                    label={'Mật khẩu *'}
                                                    name={'password'}
                                                    pathImage={props.values.password?.length > 0 ? showPass ? 'show_pass' : 'hide_pass' : null}
                                                    secureTextEntry={showPass == true ? false : true}
                                                    onPress={handleShowPass}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                    onChangeText={() => {
                                                        props.setFieldValue('errPass', '');
                                                    }}
                                                />
                                                {
                                                    props.values.errPass ?
                                                        <Text style={{ color: errValidColor, fontSize: 14 }}>{props.values.errPass}</Text> : null
                                                }
                                                {
                                                    nameApp.includes('MAILINH') ? (
                                                        <TouchableOpacity
                                                          style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            marginTop: 16,
                                                          }}
                                                          onPress={() => props.setFieldValue('isSave', !props.values.isSave)}>
                                                          {
                                                            props.values.isSave
                                                              ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                                              : <IconBoxSvg width={20} height={20} color={NewColor} />
                                                          }
                                                          <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14 }}>Lưu mật khẩu</Text>
                                                        </TouchableOpacity>
                                                    ) : null
                                                }
                                                {
                                                    nameApp.includes('IAGENT') || nameApp.includes('INSO') ? (
                                                        <View style={{ flex: 1, alignItems: 'flex-end', marginVertical: 8 }}>
                                                            <TouchableOpacity onPress={() => Actions.ForgetPass()}>
                                                                <Text style={{ fontSize: 14, color: Color }}>Quên mật khẩu</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    ) : null
                                                }
                                                <Button
                                                    label={'ĐĂNG NHẬP'}
                                                    marginTop={24}
                                                    borderRadius={10}
                                                    width={'100%'}
                                                    onPress={() => handleNext(props)}
                                                    disabled={!props.isValid || props.values.errPass === 'Không được bỏ trống'}
                                                />
                                                {
                                                    nameApp.includes('MAILINH') || nameApp.includes('YCHI') || nameApp.includes('EPTI') ? (
                                                        <View style={{ flex: 1, alignItems: 'center', marginTop: 6, paddingBottom: 32 }}>
                                                            <TouchableOpacity onPress={() => Actions.ForgetPass()}>
                                                                <Text style={{ fontSize: 14, color: colorNote, textDecorationLine: 'underline' }}>Quên mật khẩu</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    ) : null
                                                }
                                                {
                                                    nameApp.includes('IAGENT') || nameApp.includes('INSO') ? (
                                                        <View style={{ flex: 1, alignItems: 'center', marginTop: 6, paddingBottom: 32 }}>
                                                            <TouchableOpacity onPress={() => Actions.Register()}>
                                                                <Text style={{ color: '#B3B2B3', fontSize: 14 }}>Bạn chưa có tài khoản?  <Text style={{ color: Color }}>Đăng ký</Text></Text>
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
        marginTop: 25,
        padding: 24,
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

export default connect(null, mapDispatchToProps)(Login);

