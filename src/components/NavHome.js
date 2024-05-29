

import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    Platform,
    ImageBackground,
    Dimensions
} from 'react-native';
import jwt_decode from 'jwt-decode';
import { infoOrg } from './assets';
import { Color, errValidColor, nameApp, screen, TxtColor, } from '../config/System';
import { Actions } from 'react-native-router-flux';
import FastImage from 'react-native-fast-image';
import Store from '../services/Store';
import Const from '../services/Const';
import {isIPhoneX} from '../utils/Util';

const {width} = Dimensions.get('window');

function NavHome({
    title,
    show = true,
    onPress = () => Actions.pop(),
    openDrawer = () => Actions.History(),
    isInfo = true,
    showForm,
    showKPI,
    openKPI = () => Actions.KpiPlan(),
    showAddCustomer,
    onPressLogout,
    isLogout = false,
    onPressCustomer,
    calender,
    isUser,
    isHome = false,
    isNotify = false,
    userName,
    notRead,
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

    const onNext = () => {
        new Store().getSession(Const.PASS_WORD).then(pass => {
            if (!pass || pass.length === 0) {
                Actions.LoginNew();
            } else {
                Actions.ListNotify();
            }
        })
    }
    return (
        <ImageBackground
            source={infoOrg[orgCode] ? infoOrg[orgCode].header : infoOrg.default.header}
            style={{ paddingTop: isIPhoneX ? 30 : 20, height: width * 418 / 1125, width: width }}
        >
            <StatusBar
                backgroundColor={infoOrg[orgCode] ? infoOrg[orgCode].color : infoOrg.default.color}
                barStyle='light-content'
            />
            <View style={[css.ctNav]}>
                {
                    nameApp.includes('IAGENT') ? (infoOrg[orgCode] ? infoOrg[orgCode].logo : infoOrg.default.logo) : null
                }
                {
                    nameApp.includes('INSO') ? (
                        <FastImage
                            style={{width: 65, height: 65 * 74 / 170, marginBottom: 10}}
                            source={require('../config/images/public/login/logoINSO.png')}
                            resizeMode={'contain'}
                        />
                    ) : null
                }
                <View style={{marginTop: orgCode === 'DLJSC' || orgCode === 'DL001' ? 3 : 8, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>Chào bạn</Text>
                    {
                        userName ? (
                            <View style={{alignItems: 'center', padding: 5, backgroundColor: 'white', borderRadius: 15, flexDirection: 'row'}}>
                                <FastImage source={require('../icons/iconAgent/ic_diamond.png')}
                                            style={{ height: 11, width: 13 }} />
                                <Text style={{marginLeft: 4, fontSize: 13, fontWeight: 'bold', color: TxtColor}}>0 điểm</Text>
                            </View>
                        ) : (
                            <TouchableOpacity onPress={() => Actions.LoginNew()}>
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                                    Đăng nhập
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
                {
                    show ?
                        <TouchableOpacity onPress={onPress} style={css.ctBack}>
                            <Image style={css.icBack} source={require('../icons/ic_back.png')} />
                        </TouchableOpacity>
                        : null
                }
                {
                    isHome ?
                        <TouchableOpacity onPress={onPress} style={css.ctBack}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../config/images/public/icons/ic_menu.png')} />
                        </TouchableOpacity>
                        : null
                }
                {
                    isInfo ?
                        <TouchableOpacity onPress={openDrawer} style={css.ctInfo}>
                            <Image style={css.icInfo} source={require('../icons/iconAgent/ic_history.png')} />
                        </TouchableOpacity> : showForm ?
                            <TouchableOpacity onPress={openDrawer} style={css.ctInfo}>
                                <Image style={css.icInfo} resizeMode={'contain'} source={require('../icons/ic_display_form.png')} />
                            </TouchableOpacity> : showKPI ? <TouchableOpacity onPress={openKPI} style={css.ctInfo}>
                                <Image style={css.icInfo} resizeMode={'contain'} source={require('../icons/iconAgent/ic_KPI_white.png')} />
                            </TouchableOpacity> : showAddCustomer ? <TouchableOpacity style={css.ctInfo} onPress={onPressCustomer}>
                                <Image style={css.icInfo} resizeMode={'contain'} source={require('../icons/iconAgent/ic_add_customer.png')} />
                            </TouchableOpacity> : calender ? <TouchableOpacity style={css.ctInfo} onPress={() => Actions.FakeCalender()}>
                                <Image style={css.icInfo} resizeMode={'contain'} source={require('../icons/iconAgent/Calender_icon.png')} />
                            </TouchableOpacity> : null
                }
                {
                    isLogout ?
                        <TouchableOpacity onPress={onPressLogout} style={css.ctInfo}>
                            <Image style={css.icInfo} source={require('../icons/iconAgent/logout_home.png')} />
                        </TouchableOpacity> : null
                }
                {
                    isUser ?
                        <TouchableOpacity onPress={() => Actions.UserNew()} style={css.ctInfo}>
                            <Image style={css.icInfo} source={require('../icons/iconAgent/ic_user.png')} />
                        </TouchableOpacity> : null
                }
                {
                    isNotify && !nameApp.includes('INSO') ?
                        <TouchableOpacity onPress={() => onNext()} style={css.ctInfo}>
                            <View>
                                <Image
                                    style={{ width: 17, height: 17 }}
                                    source={require('../config/images/public/icons/ic_Notify.png')}
                                />
                                {
                                    notRead > 0 ? (
                                        <View style={[
                                            {
                                                position: 'absolute',
                                                height: 15,
                                                width: 21,
                                                backgroundColor: nameApp.includes('YCHI') ? 'white' : (infoOrg[orgCode] ? infoOrg[orgCode].backgroundNoti : infoOrg.default.backgroundNoti),
                                                borderRadius: 50,
                                                top: -5.5,
                                                right: -8.5,
                                                justifyContent: 'center'
                                            }, 
                                            notRead > 99 ? {paddingLeft: 2} : {alignItems: 'center'},
                                            nameApp.includes('YCHI') ? {
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 1,
                                                },
                                                shadowOpacity: 0.22,
                                                shadowRadius: 2.22,
    
                                                elevation: 3,
                                            } : (infoOrg[orgCode] ? infoOrg[orgCode].shadowNoti : infoOrg.default.shadowNoti),
                                        ]}>
                                            <View>
                                                <Text style={{ fontSize: 10, color: nameApp.includes('YCHI') ? Color : (infoOrg[orgCode] ? infoOrg[orgCode].colorNoti : infoOrg.default.colorNoti) }}>
                                                    {notRead > 99 ? '99' : notRead}
                                                </Text>
                                                {
                                                    notRead > 99 ? (
                                                        <Text style={{
                                                            fontSize: 8,
                                                            color: nameApp.includes('YCHI') ? Color : (infoOrg[orgCode] ? infoOrg[orgCode].colorNoti : infoOrg.default.colorNoti),
                                                            position: 'absolute',
                                                            top: -2.5,
                                                            right: Platform.OS === 'ios' ? 0.8 : 2.3
                                                        }}>
                                                            +
                                                        </Text>
                                                    ) : null
                                                }
                                            </View>
                                        </View>
                                    ) : null
                                }
                            </View>
                        </TouchableOpacity> : null
                }
            </View>
        </ImageBackground>
    );
}

const css = StyleSheet.create({
    ctInfo: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        position: 'absolute',
        right: 0,
        top: 4,
    },
    ctBack: {
        padding: 24,
        position: 'absolute',
        left: 0
    },
    icBack: {
        height: 15,
        width: (15 * 21) / 39
    },
    icInfo: {
        height: 20,
        width: 20
    },
    ctNav: {
        marginTop: 10,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',
        maxWidth: screen.width - 80,
        fontWeight: 'bold',
    },
})

export default NavHome;
