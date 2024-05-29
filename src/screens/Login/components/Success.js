import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text, 
    Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import Button from '../../../components/Button';
import { connect } from 'react-redux';
import { Color, colorText, nameApp, textDisable, TxtColor, URL } from '../../../config/System';
import TimeCount from './TimeCount';
import SimpleToast from 'react-native-simple-toast';
import jwt_decode from 'jwt-decode';
import { infoOrg } from '../../../components/assets';
import Store from '../../../services/Store';
import Const from '../../../services/Const';

function Success({
    title,
    content1,
    content2,
    labelButton,
    onPress,
    userName, 
    email
}) {
    const [resend, setResend] = useState(false);
    const [orgCode, setOrgCode] = useState('');

    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
            if (token) {
                const decode = jwt_decode(token);
                setOrgCode(decode?.organizationCode);
            }
        })
    }, []);

    const handleSend = () => {
        let body = {
            "username": userName,
            "email": email
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
                    setResend(false)
                } else {
                    SimpleToast.show('Mời bạn thử lại')
                }
            })
            .catch(error => {
                console.log(error)
                SimpleToast.show('Mời bạn thử lại')
            })
    }

    return (
        <View style={styles.container}>
            {
                nameApp.includes('MAILINH') ? (
                    <View style={{ alignItems: 'center', backgroundColor: Color, paddingTop: 53 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <FastImage
                                style={{ width: 125, height: 36 }}
                                source={require('../../../config/images/public/login/logoMaiLinh.png')}
                                resizeMode="contain"
                            />
                            <FastImage
                                style={{ width: 31, height: 41, marginHorizontal: 26 }}
                                source={require('../../../config/images/public/login/logoHoHuy.png')}
                                resizeMode="contain"
                            />
                            <FastImage
                                style={{ width: 76, height: 36 }}
                                source={require('../../../config/images/public/login/logoPTI.png')}
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
                                source={require('../../../config/images/public/login/logoYChi.png')}
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
                                source={require('../../../config/images/public/login/logoPTI.png')}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                ) : null
            }
            {
                nameApp.includes('IAGENT') ? (
                        <View style={{ alignItems: 'center', backgroundColor: Color, paddingTop: 49 }}>
                            {infoOrg[orgCode] ? infoOrg[orgCode].logoSuccess : infoOrg.default.logoSuccess}
                        </View>
                    ) : null
            }
            {
                nameApp.includes('INSO') ? (
                    <View style={{ alignItems: 'center', backgroundColor: Color, paddingTop: 49 }}>
                        <FastImage
                            style={{ width: 55, height: 55 * 559 / 512 }}
                            source={require('../../../config/images/public/login/logoINSO.png')}
                            resizeMode="contain"
                        />
                    </View>
                ) : null
            }
            {
                nameApp.includes('EPTI') ? (
                    <View style={{ alignItems: 'center', backgroundColor: Color, paddingTop: 50 }}>
                    </View>
                ) : null
            }
            <View style={styles.contentContainer}>
                <View>
                    <FastImage
                        source={require('../../../config/images/private/login/success.png')}
                        style={[
                            { width: nameApp.includes('YCHI') ? 223 : 280, height: nameApp.includes('YCHI') ? 200 : 251, alignSelf: 'center', marginTop: nameApp.includes('YCHI') ? 28 : 55, zIndex: 1001 },
                            nameApp.includes('IAGENT') || nameApp.includes('INSO') ? {width: 341, height: 341 * 806 / 1025, marginTop: 25} : {}
                        ]}
                        resizeMode={'contain'}
                    />
                    <View style={[{
                        backgroundColor: 'white',
                        marginTop: nameApp.includes('YCHI') ? -50 : -38,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 24,
                        paddingTop: nameApp.includes('YCHI') ? 72 : 60
                    }, nameApp.includes('IAGENT') || nameApp.includes('INSO') ? {marginTop: -41, paddingTop: 73} : {}]}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{
                                color: TxtColor,
                                fontSize: 16,
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                            }}>{title}</Text>
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>{content1}</Text>
                        </View>
                        <Button
                            label={labelButton}
                            marginTop={32}
                            borderRadius={10}
                            onPress={() => Actions.LoginNew()}
                        />
                        <View style={{ marginTop: 6, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 14, color: TxtColor, marginLeft: 3 }}>
                                Không nhận được e-mail?
                            </Text>
                            <TouchableOpacity
                                onPress={() => handleSend()}
                                style={{ marginLeft: 3 }}
                                disabled={!resend}
                            >
                                <Text style={{ fontSize: 14, color: !resend ? (nameApp.includes('YCHI') ? colorText : textDisable) : Color, textDecorationLine: nameApp.includes('IAGENT') || nameApp.includes('INSO') ? 'none' : 'underline' }}>
                                    Gửi lại mật khẩu{!resend ? ' sau' : ''}
                                </Text>
                            </TouchableOpacity>
                            {
                                !resend ? (
                                    <TimeCount timeCountDown={60} resetTime={() => setResend(true)} />
                                ) : null
                            }
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ctBack: {
        marginTop: 15,
        padding: 24,
        position: 'absolute',
        left: 0,
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
        zIndex: 1000,
        backgroundColor: Color,
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


const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Success);

