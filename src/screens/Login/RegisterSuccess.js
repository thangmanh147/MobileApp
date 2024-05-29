import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import { Color, colorNote, nameApp, NewColor, TxtColor, URL } from '../../config/System';
import { getInsuranceInfo } from '../Agent/actions';
import { isIPhoneX } from '../../utils/Util';
import Store from '../../services/Store';
import { infoOrg } from '../../components/assets';
const Const = require('../../services/Const');
import jwt_decode from 'jwt-decode';

function RegisterSuccess({
    username,
    password,
}) {
    const [orgCode, setOrgCode] = useState('');

    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
            if (token) {
                const decode = jwt_decode(token);
                setOrgCode(decode?.organizationCode);
            }
        })
    }, []);

    const handleNext = (value) => {
        let body = {
            // "domain": domain,
            "username": username,
            "password": password
        }
        let url = `${URL}/api/account/v1/users/login`
        console.log('url', url)
        console.log('Bodyy --', body)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then(async (res) => {
                console.log('RES-Login: ', res);
                if (res.status == 200 || res.status == 'success') {
                    // getInsuranceInfo(res?.data?.access_token);
                    new Store().storeSession(Const.TOKEN, res?.data?.access_token)
                    new Store().storeSession(Const.IS_LOGIN, true)
                    new Store().storeSession(Const.PASS_WORD, password)
                }
                if (value === 'profile') {
                    Actions.UpdateProfile();
                } else {
                    if (nameApp.includes('IAGENT') || nameApp.includes('INSO')) {
                        Actions.tab();
                    } else {
                        Actions.InsuranceType();
                    }
                }
            })
            .catch(async (error) => {
            })
    }

    return (
        <View style={styles.container}>
            {
                nameApp.includes('IAGENT') ? (
                        <View style={{ alignItems: 'center', backgroundColor: Color, paddingTop: 50 }}>
                            {infoOrg[orgCode] ? infoOrg[orgCode].logoSuccess : infoOrg.default.logoSuccess}
                        </View>
                    ) : null
            }
            {
                nameApp.includes('INSO') ? (
                    <View style={{ alignItems: 'center', backgroundColor: Color, paddingTop: 50 }}>
                        <FastImage
                            style={{ width: 55, height: 59 }}
                            source={require('../../config/images/public/login/logoINSO.png')}
                            resizeMode="contain"
                        />
                    </View>
                ) : null
            }
            <TouchableOpacity
                onPress={() => Actions.tab()}
                style={styles.ctBack}>
                <FastImage
                    style={[styles.icBack]}
                    source={require('../../icons/ic_back.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <View>
                    <FastImage
                        source={require('../../config/images/private/login/success.png')}
                        style={{ width: 340, height: 340 * 806 / 1025, alignSelf: 'center', marginTop: 28, zIndex: 1001 }}
                        resizeMode={'contain'}
                    />
                    <View style={{
                        backgroundColor: 'white',
                        marginTop: -32,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 24,
                        paddingTop: nameApp.includes('YCHI') ? 72 : 60
                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{
                                color: TxtColor,
                                fontSize: 16,
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                            }}>ĐĂNG KÝ THÀNH CÔNG</Text>
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                                Bạn đã đăng ký thành công tài khoản.{'\n'}
                                Hãy bổ sung thông tin hồ sơ để nhận hoa hồng khi cấp đơn bảo hiểm
                            </Text>
                        </View>
                        <View style={styles.containerSubmit}>
                            <TouchableOpacity style={[styles.butSubmit, { backgroundColor: 'white' }]} onPress={() => handleNext('home')}>
                                <Text style={[styles.titleSubmit, { color: colorNote }]}>TRANG CHỦ</Text>
                            </TouchableOpacity>
                            <View style={{ width: 12 }} />
                            <TouchableOpacity style={styles.butSubmit} onPress={() => handleNext('profile')}>
                                <Text style={styles.titleSubmit}>TẠO HỒ SƠ</Text>
                            </TouchableOpacity>
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
    containerSubmit: {
        flexDirection: 'row',
        paddingBottom: 32,
        marginTop: 24
    },
    butSubmit: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 10,
        backgroundColor: NewColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleSubmit: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

const mapDispatchToProps = (dispatch) => ({
    getInsuranceInfo: (token) => dispatch(getInsuranceInfo(token)),
});

export default connect(null, mapDispatchToProps)(RegisterSuccess);

