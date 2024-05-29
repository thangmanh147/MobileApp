import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Dimensions, Platform
} from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/Button';
import { heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, URL, TxtColor, errValidColor, nameApp } from '../../config/System';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import Input from '../Login/components/Input';
import SimpleToast from 'react-native-simple-toast';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isIPhoneX } from '../../utils/Util';
import moment from 'moment';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';

function ChangePass({ firstLogin }) {

    const [showPass, setShowPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);
    const [passDefault, setPassDefault] = useState('');
    const [passNumber, setPassNumber] = useState(0);
    const [datePass, setDatePass] = useState('');
    const [modelCheck, setModalCheck] = useState(false);

    useEffect(() => {
        new Store().getSession(Const.DATE_PASS).then(date => {
            const value = moment().format('DD/MM/YYYY');
            if (value !== date) {
                new Store().storeSession(Const.NUM_RESET_PASS, null);
            } else setDatePass(date);
        });
    }, []);

    useEffect(() => {
        new Store().getSession(Const.NUM_RESET_PASS).then(number => {
            setPassNumber(number);
        });
    }, []);

    useEffect(() => {
        new Store().getSession(Const.PASS_WORD).then(pass => {
            setPassDefault(pass);
        });
    }, []);

    const validation = Yup.object().shape({
        password: Yup.string().required('Không được bỏ trống'),
        newPassword: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
        rePassword: Yup.string()
            .strict(false)
            .required('Không được bỏ trống'),
    });
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

    const FormikInput = handleTextInput(Input);

    const handleNext = (formik) => {
        const value = moment().format('DD/MM/YYYY');
        if ((nameApp.includes('MAILINH') || nameApp.includes('YCHI')) && passNumber == 5 && value == datePass) {
            setModalCheck(true);
        } else {
            handleLogin(formik);
        }
    }

    const handleLogin = (formik) => {
        let body = {
            "password": formik?.values?.newPassword,
            "oldPassword": formik?.values?.password,
            "rePassword": formik?.values?.rePassword
        }
        console.log('body', body)
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/account/v1/users/me/change-password`
            console.log('url', url)
            new Store().getSession(Const.TOKEN).then(token => {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                    body: JSON.stringify(body),
                })
                    .then((res) => res.json())
                    .then(res => {
                        console.log('======res-acóntarcsfdfdcontract', res)
                        if (res.status == 200 || res.status == 'success') {
                            new Store().storeSession(Const.NUM_RESET_PASS, passNumber + 1);
                            new Store().storeSession(Const.DATE_PASS, moment().format('DD/MM/YYYY'));
                            Actions.ChangePassSuccess({ hideBackBut: true })
                        } else {
                            SimpleToast.show(res?.message)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        SimpleToast.show(error?.message)
                    })
            })
        })
    }
    const handleShowPass = (formik, name) => {
        if (name == 'password') {
            setShowPass(!showPass);
            formik.setFieldTouched('password', true)
        } else if (name == 'newPassword') {
            setShowNewPass(!showNewPass);
            formik.setFieldTouched('newPassword', true)
        } else if (name == 'rePassword') {
            setShowRePass(!showRePass);
            formik.setFieldTouched('rePassword', true)
        }
    };

    const handleOnblurPassword = (formik) => {
        if (formik.values?.password?.length > 0 && formik.values?.password !== passDefault) {
            formik.setFieldValue('errPassCurrent', 'Mật khẩu hiện tại không đúng');
        }
    }

    const changeNewPass = (formik, text) => {
        if (text.length < 8 && text.length > 0) {
            formik.setFieldValue('errPassNew', 'Ít nhất 8 ký tự');
        } else if (formik.values?.password?.length > 0 && formik.values?.password === text) {
            formik.setFieldValue('errPassNew', 'Mật khẩu mới không được trùng với mật khẩu hiện tại');
        } else if (text.includes(' ') || isStrongPassword(text)) {
            formik.setFieldValue('errPassNew', 'Mật khẩu từ 8 tới 20 kí tự và phải bao gồm chữ và số');
        } else {
            formik.setFieldValue('errPassNew', '');
        }
    }

    const blurNewPass = (formik) => {
        if (formik.values?.newPassword?.length > 0 && formik.values?.rePassword?.length > 0) {
            if (formik.values?.rePassword !== formik.values?.newPassword) {
                formik.setFieldValue('errRePass', 'Mật khẩu mới không trùng khớp');
            } else {
                formik.setFieldValue('errRePass', '');
            }
        }
    }

    const changeRePass = (formik, text) => {
        if (formik.values?.newPassword !== text && text.length > 0) {
            formik.setFieldValue('errRePass', 'Mật khẩu mới không trùng khớp');
        } else {
            formik.setFieldValue('errRePass', '');
        }
    }

    return (
        <KeyboardAwareScrollView style={styles.container}>
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
                        <View style={{ alignItems: 'center', backgroundColor: Color, paddingTop: 24 }}>
                        </View>
                    ) : null
                }
                {
                    firstLogin && firstLogin == true ? null : (
                        <TouchableOpacity
                            onPress={() => Actions.pop()}
                            style={styles.ctBack}>
                            <FastImage
                                style={[styles.icBack]}
                                source={require('../../icons/ic_back.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    )
                }
                <View style={styles.contentContainer}>

                    <Formik
                        initialValues={{
                            errPassCurrent: '',
                            errPassNew: '',
                            errRePass: '',
                        }}
                        validationSchema={validation}
                        isInitialValid={false}>
                        {formik => {
                            return (
                                <View>
                                    <FastImage
                                        source={require('../../config/images/private/login/image_change_pass.png')}
                                        style={[
                                            { width: nameApp.includes('YCHI') ? 253 : 318, height: nameApp.includes('YCHI') ? 197 : 237, alignSelf: 'center', marginTop: nameApp.includes('YCHI') ? 28 : 38, zIndex: 1001 },
                                            nameApp.includes('IAGENT') || nameApp.includes('INSO') ? {width: 339, height: 339 * 936 / 1016} : {}
                                        ]}
                                        resizeMode={'contain'}
                                    />
                                    <View style={[{
                                        backgroundColor: 'white',
                                        marginTop: nameApp.includes('YCHI') ? -47 : -90,
                                        borderTopLeftRadius: 20,
                                        borderTopRightRadius: 20,
                                        paddingHorizontal: 24,
                                        paddingTop: nameApp.includes('YCHI') ? 67 : 110
                                    }, nameApp.includes('IAGENT') || nameApp.includes('INSO') ? {marginTop: 0, paddingTop: 32} : {}]}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ color: TxtColor, fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' }}>ĐỔI MẬT KHẨU</Text>
                                        </View>
                                        <FormikInput
                                            label={'Mật khẩu hiện tại *'}
                                            name={'password'}
                                            keyboardType={'default'}
                                            autoCapitalize={'none'}
                                            pathImage={showPass ? 'show_pass' : 'hide_pass'}
                                            secureTextEntry={showPass == true ? false : true}
                                            onPress={() => handleShowPass(formik, 'password')}
                                            onBlur={() => handleOnblurPassword(formik)}
                                            onChangeText={() => {
                                                formik.setFieldValue('errPassCurrent', '');
                                            }}
                                        />
                                        {
                                            formik.values.errPassCurrent ?
                                                <Text style={{ color: errValidColor, fontSize: 14 }}>
                                                    {formik.values.errPassCurrent}
                                                </Text> : null
                                        }
                                        <FormikInput
                                            label={'Mật khẩu mới *'}
                                            name={'newPassword'}
                                            pathImage={showNewPass ? 'show_pass' : 'hide_pass'}
                                            secureTextEntry={showNewPass == true ? false : true}
                                            onPress={() => handleShowPass(formik, 'newPassword')}
                                            maxLength={20}
                                            autoCapitalize={'none'}
                                            keyboardType={'default'}
                                            onChangeText={(text) => changeNewPass(formik, text)}
                                            onBlur={() => blurNewPass(formik)}
                                        />
                                        {
                                            formik.values.errPassNew ?
                                                <Text style={{ color: errValidColor, fontSize: 14 }}>
                                                    {formik.values.errPassNew}
                                                </Text> : null
                                        }
                                        <FormikInput
                                            label={'Nhập lại mật khẩu mới *'}
                                            name={'rePassword'}
                                            pathImage={showRePass ? 'show_pass' : 'hide_pass'}
                                            secureTextEntry={showRePass == true ? false : true}
                                            onPress={() => handleShowPass(formik, 'rePassword')}
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
                                            label={'CẬP NHẬT'}
                                            marginTop={16}
                                            borderRadius={10}
                                            width={'100%'}
                                            onPress={() => handleNext(formik)}
                                            disabled={
                                                !formik.isValid ||
                                                formik.values.errPassCurrent?.length > 0 ||
                                                formik.values.errPassNew?.length > 0 ||
                                                formik.values.errRePass?.length > 0
                                            }
                                        />
                                    </View>
                                </View>
                            );
                        }}
                    </Formik>
                    <Modal
                        isVisible={modelCheck}
                        style={{ margin: 0, justifyContent: 'flex-end' }}
                        onBackButtonPress={() => setModalCheck(false)}
                        onBackdropPress={() => setModalCheck(false)}
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
                            <Text style={{ marginTop: 20, marginBottom: 22, fontSize: 14, color: errValidColor, textAlign: 'center' }}>
                                Bạn đã sử dụng quá 5 lần đổi mật khẩu cho phép trong ngày. Vui lòng quay trở lại vào ngày mai để tiếp tục sử dụng chức năng này.
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalCheck(false);
                                    Actions.pop();
                                }}
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
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', height: heightPercentageToDP('20'), marginTop: heightPercentageToDP('-10'),
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
    }
});


const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {
})(ChangePass);

