

import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';
import jwt_decode from 'jwt-decode';
import StBarIos from './StBarIos';
import { Color, errValidColor, nameApp, screen, } from '../config/System';
import { Actions } from 'react-native-router-flux';
import Store from '../services/Store';
import Const from '../services/Const';
import { infoOrg } from './assets';
import HeaderSvg from '../config/images/list_insur/HeaderSvg';

function Nav({
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
    notRead,
    bottom = 0,
    titleLeft
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
        <View>
            <View style={{ paddingTop: 10, backgroundColor: infoOrg[orgCode] ? infoOrg[orgCode].color : infoOrg.default.color, zIndex: 100, marginBottom: bottom }}>
                <StatusBar
                    backgroundColor={infoOrg[orgCode] ? infoOrg[orgCode].color : infoOrg.default.color}
                    barStyle='light-content'
                />
                {
                    Platform.OS === 'ios' ?
                        <StBarIos backgroundColor={infoOrg[orgCode] ? infoOrg[orgCode].color : infoOrg.default.color} />
                        : null
                }
                <View style={[css.ctNav, {backgroundColor: infoOrg[orgCode] ? infoOrg[orgCode].color : infoOrg.default.color}, isHome && { marginTop: 20 }]}>
                    {
                        titleLeft ? (
                            <Text style={{
                                position: 'absolute',
                                left: 50,
                                color: 'white',
                                fontSize: 19,
                                fontWeight: 'bold'
                            }}>{titleLeft}</Text>
                        ) : (
                            <Text style={css.title}>{title}</Text>
                        )
                    }
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
                        isNotify ?
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
            </View>
            <View style={{marginTop: -55, zIndex: 99}}>
                <HeaderSvg color={infoOrg[orgCode] ? infoOrg[orgCode].color : infoOrg.default.color} width={screen.width} height={screen.width * 98 / 375} />
            </View>
        </View>
    );
}

const css = StyleSheet.create({
    ctInfo: {
        paddingTop: 24,
        paddingHorizontal: 24,
        paddingBottom: 24,
        position: 'absolute',
        right: 0
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
        // paddingTop:10
        //textAlign: 'center',
        // paddingVertical: 25
    },
})

export default Nav;
