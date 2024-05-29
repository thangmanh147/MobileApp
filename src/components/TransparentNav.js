

import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    Platform, ImageBackground,
} from 'react-native';
import StBarIos from './StBarIos';
import { Color, screen, } from '../config/System';
import { Actions } from 'react-native-router-flux';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
const TransparentNav = ({
    title,
    show = true,
    onPress = () => Actions.pop(),
    openDrawer = () => Actions.History(),
    isInfo = true,
    showForm,
    showKPI,
    openKPI = () => Actions.KpiPlan(),
    showAddCustomer
}) => (
            <View style={{ paddingTop: 10 }}>
                <StatusBar
                    backgroundColor='transparent'
                    translucent
                />
                {
                    Platform.OS === 'ios' ?
                        <StBarIos backgroundColor={'#transparent'} />
                        : null
                }
                {/* <LinearGradient
			start={{x: 0.0, y: 0.0}}
			end={{x: 1.0, y: 1.0}}
			style={{
			}}
			colors={['#0bc5b8','#1ed29f','#1dd1a1','#2bda8f']} > */}
                <View style={css.ctNav}>
                    <Text style={css.title}>{title}</Text>
                    {
                        show ?
                            <TouchableOpacity onPress={onPress} style={css.ctBack}>
                                <Image style={css.icBack} source={require('../icons/ic_back.png')} />
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
                                </TouchableOpacity> : showAddCustomer ? <TouchableOpacity style={css.ctInfo}>
                                    <Image style={css.icInfo} resizeMode={'contain'} source={require('../icons/iconAgent/ic_add_customer.png')} />
                                </TouchableOpacity> : null
                    }
                </View>
                {/* </LinearGradient> */}
            </View>

    );

const css = StyleSheet.create({
    ctInfo: {
        padding: 24,
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
        width: 15 * 21 / 39
    },
    icInfo: {
        height: 20,
        width: 20
    },
    ctNav: {
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    title: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        maxWidth: screen.width - 80,
        fontWeight: 'bold',
        paddingVertical: 5
    },
})

export default TransparentNav;
