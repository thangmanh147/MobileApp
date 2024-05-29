

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
import { Color, screen,  } from '../config/System';
import { Actions } from 'react-native-router-flux';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
const Nodata = ({
                  image,
    content
               }) => (
    <ImageBackground source={require('../icons/iconAgent/no_data_bank.png')}
                     style={{height:'80%',width:'100%'}}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:40}}>
            <Text style={{textAlign: 'center'}}>Bạn chưa có khách hàng nào, hãy bắt đầu thêm khách hàng nhé</Text>
        </View>
    </ImageBackground>

);

const css = StyleSheet.create({
    ctInfo: {
        padding: 24,
        position: 'absolute',
        right: 0
    },
    ctBack: {
        left: 0
    },
    icBack: {
        height: 15,
        width: 15*21/39
    },
    icInfo: {
        height: 20,
        width: 20
    },
    ctNav: {
        padding: 24
    },
    title: {
        color: '#fff',
        fontSize: 16,

    },
})

export default Nodata;
