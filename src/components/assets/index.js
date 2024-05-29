import React from 'react';
import {
    Image,
    Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Color, errValidColor} from '../../config/System';

const {width} = Dimensions.get('window');

export const infoOrg = {
    'DLJSC': {
        header: require('../../config/images/public/login/HeaderJSC.png'),
        color: '#ea2b29',
        colorTab: '#ea2b29',
        logo: 
            <Image
                style={{width: 543 * 70 / 204, height: 70, marginTop: -10}}
                source={require('../../config/images/public/login/logoJSC_1.jpg')}
                resizeMode={'contain'}
            />,
        backgroundNoti: 'white',
        shadowNoti: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        },
        colorNoti: '#ea2b29',
        logoSuccess: 
            <Image
                style={{width: 543 * 70 / 204, height: 70}}
                source={require('../../config/images/public/login/logoJSC_1.jpg')}
                resizeMode={'contain'}
            />,
        colorIcon: '#13c3ef',
    },
    'DL001': {
        header: require('../../config/images/public/login/HeaderJSC.png'),
        color: '#ea2b29',
        colorTab: '#ea2b29',
        logo: 
            <Image
                style={{width: 543 * 70 / 204, height: 70, marginTop: -10}}
                source={require('../../config/images/public/login/logoJSC_1.jpg')}
                resizeMode={'contain'}
            />,
        backgroundNoti: 'white',
        shadowNoti: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        },
        colorNoti: '#ea2b29',
        logoSuccess: 
            <Image
                style={{width: 543 * 70 / 204, height: 70}}
                source={require('../../config/images/public/login/logoJSC_1.jpg')}
                resizeMode={'contain'}
            />,
        colorIcon: '#13c3ef',
    },
    'BANKAS': {
        header: require('../../config/images/public/login/HeaderBankas.png'),
        color: '#009EDB',
        colorTab: '#009EDB',
        logo: 
            <Image
                style={{width: 2560 * 60 / 918, height: 60, marginTop: -8, marginBottom: -8}}
                source={require('../../config/images/public/login/logoBankas.png')}
                resizeMode={'contain'}
            />,
        backgroundNoti: errValidColor,
        shadowNoti: {},
        colorNoti: 'white',
        logoSuccess: 
            <Image
                style={{width: 2560 * 60 / 918, height: 60}}
                source={require('../../config/images/public/login/logoBankas.png')}
                resizeMode={'contain'}
            />,
        colorIcon: '#009EDB',
    },
    'YCHI': {
        header: require('../../config/images/public/login/HeaderYChi.png'),
        color: '#ED1D27',
        colorTab: '#ED1D27',
        logo: 
            <Image
                style={{width: 1582 * 100 / 1080, height: 100, marginTop: -25, marginBottom: -20}}
                source={require('../../config/images/public/login/logoYChiWhite.png')}
                resizeMode={'contain'}
            />,
        backgroundNoti: 'white',
        shadowNoti: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        },
        colorNoti: '#ED1D27',
        logoSuccess: 
            <Image
                style={{width: 1582 * 100 / 1080, height: 100}}
                source={require('../../config/images/public/login/logoYChiWhite.png')}
                resizeMode={'contain'}
            />,
        colorIcon: '#ED1D27',
    },
    'KNN': {
        header: require('../../config/images/public/login/HeaderIAgent.png'),
        color: Color,
        colorTab: '#17A5A3',
        logo: 
            <Image
                style={{width: (width * 418 / 1125) * 450 / 414, height: width * 418 / 1125, marginTop: -43, marginBottom: -55}}
                source={require('../../config/images/public/login/logoKNN_1.png')}
                resizeMode={'contain'}
            />,
        backgroundNoti: errValidColor,
        shadowNoti: {},
        colorNoti: 'white',
        logoSuccess: 
            <Image
                style={{width: (width * 418 / 1125) * 450 / 414, height: width * 418 / 1125}}
                source={require('../../config/images/public/login/logoKNN_1.png')}
                resizeMode={'contain'}
            />,
        colorIcon: '#17A5A3',
    },
    'default': {
        header: require('../../config/images/public/login/HeaderIAgent.png'),
        color: Color,
        colorTab: Color,
        logo: 
            <FastImage
                style={{width: 45, height: 45 * 59 / 55}}
                source={require('../../config/images/public/login/logoIAgent.png')}
            />,
        backgroundNoti: errValidColor,
        shadowNoti: {},
        colorNoti: 'white',
        logoSuccess: 
            <FastImage
                style={{ width: 55, height: 55 * 559 / 512 }}
                source={require('../../config/images/public/login/logoIAgent.png')}
                resizeMode="contain"
            />,
        colorIcon: Color,
    },
}
