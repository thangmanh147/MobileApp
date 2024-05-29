import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image, TextInput, Dimensions
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, URL, TxtColor, errValidColor, nameApp, colorNote, colorNote2 } from '../../config/System';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import Input from './components/Input';
import SimpleToast from 'react-native-simple-toast';
import { isIPhoneX } from '../../utils/Util';

import {ERROR_EMAIL_FORMAT} from '../../config/ErrorMessage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {isEmailAccident} from '../../components/Functions';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';

function ForgetPass() {

    const [modalErr, setModalErr] = useState(false)

    const validation = Yup.object().shape({
        email: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test('email', ERROR_EMAIL_FORMAT, (
                values => isEmailAccident(values)
            )),
        userName: Yup.string() // validate số điện thoại người mua
            .strict(false)
            .trim()
            .required('Không được bỏ trống'),
    });

    const FormikInput = handleTextInput(Input);

    const handleNext = (formik) => {
        let body = {
            "username": formik?.values?.userName,
            "email": formik?.values?.email?.trim()
        }
        console.log('body', body)
        let url = `${URL}/api/account/v1/users/forgot-password`
        console.log('url', url)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then(res => {
                console.log('======res-acóntarcsfdfdcontract', res)
                if (res.status == 200 || res.status == 'success') {
                    Actions.RecoverPasswordSuccess({userName: formik?.values?.userName, email: formik?.values?.email})
                } else {
                    setModalErr(true);
                }
            })
            .catch(error => {
                console.log(error)
                setModalErr(true);
            })
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
                        <View style={{ alignItems: 'center', backgroundColor: Color, paddingTop: 30 }}>
                        </View>
                    ) : null
                }
                {
                    nameApp.includes('IAGENT') || nameApp.includes('INSO') ? null : (
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

                        }}
                        validationSchema={validation}
                        isInitialValid={false}>
                        {props => {
                            return (
                                <View>
                                    <FastImage
                                        source={require('../../config/images/private/login/forgetPass.png')}
                                        style={[
                                            { width: 224, height: 236, alignSelf: 'center', marginTop: nameApp.includes('YCHI') ? 28 : 20, zIndex: 1001 },
                                            nameApp.includes('IAGENT') || nameApp.includes('INSO') ? {width: 280, height: 280 * 1099 / 1029, marginLeft: -30} : {}
                                        ]}
                                        resizeMode={'contain'}
                                    />
                                    <View style={[{
                                        backgroundColor: 'white',
                                        marginTop: nameApp.includes('YCHI') ? -60 : -40,
                                        borderTopLeftRadius: 20,
                                        borderTopRightRadius: 20,
                                        paddingHorizontal: 24,
                                        paddingTop: nameApp.includes('YCHI') ? 83 : 63
                                    }, nameApp.includes('IAGENT') || nameApp.includes('INSO') ? {marginTop: -65, paddingTop: 98} : {}]}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ color: TxtColor, fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' }}>QUÊN MẬT KHẨU</Text>
                                        </View>
                                        <FormikInput
                                            label={nameApp.includes('IAGENT') || nameApp.includes('INSO') ? 'Số di động *' : 'CMND/CCCD *'}
                                            name={'userName'}
                                        />
                                        <FormikInput
                                            label={'Email *'}
                                            name={'email'}
                                            keyboardType={'email-address'}
                                            autoCapitalize={'none'}
                                        />
                                        <Button
                                            label={'GỬI'}
                                            marginTop={24}
                                            borderRadius={10}
                                            width={'100%'}
                                            onPress={() => handleNext(props)}
                                            disabled={!props.isValid}
                                        />
                                        <View style={{ flex: 1, alignItems: 'center', marginTop: 6, paddingBottom: 32 }}>
                                            <TouchableOpacity onPress={() => Actions.LoginNew()}>
                                                <Text style={{ color: colorNote2, fontSize: 14, textDecorationLine: nameApp.includes('IAGENT') || nameApp.includes('INSO') ? 'none' : 'underline' }}>
                                                    Đăng nhập
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    </Formik>
                    <Modal
                        isVisible={modalErr}
                        style={{ margin: 0, justifyContent: 'flex-end' }}
                        onBackButtonPress={() => setModalErr(false)}
                        onBackdropPress={() => setModalErr(false)}
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
                            <Text style={{ marginTop: 28, marginBottom: 32, fontSize: 14, color: errValidColor, textAlign: 'center' }}>
                                { nameApp.includes('IAGENT') || nameApp.includes('INSO') ?
                                    'E-mail hoặc số điện thoại của bạn không tồn tại trên hệ thống, vui lòng liên hệ hotline 1900 232425 để được hỗ trợ.' :
                                    'E-mail hoặc CMND/CCCD của bạn không tồn tại trên hệ thống, vui lòng liên hệ quản trị viên để được hỗ trợ.'
                                }
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalErr(false);
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
        marginTop: isIPhoneX ? 15 : 5,
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
})(ForgetPass);

