import React, { Component } from 'react';
import {
    StyleSheet,
    Animated,
    View,
    Image
} from 'react-native';
import {
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { infoInsur } from '../../screens/ListNotify/assets';
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT} from '../../utils/Util';

const ImageHeaderScroll = ({
    offset,
    code,
    anchorHeader,
    uri,
}) => {
    const headerHeight = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [HEADER_MAX_HEIGHT, (HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT) / 2, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });
    if (anchorHeader) {
        return (
            <View style={[styles.animatedHeaderContainer, { height: HEADER_MIN_HEIGHT }]}>
                <Image
                    source={uri || (infoInsur[code] ? infoInsur[code].icon : infoInsur.default.icon)}
                    style={{ width: widthPercentageToDP('100'), height: HEADER_MIN_HEIGHT }}
                />
            </View>
        );
    }
    return (
        <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight }]}>
            <Animated.Image
                source={uri || (infoInsur[code] ? infoInsur[code].icon : infoInsur.default.icon)}
                style={{ width: widthPercentageToDP('100'), height: headerHeight }}
            />
        </Animated.View>
    );
}
const styles = StyleSheet.create({
    animatedHeaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ImageHeaderScroll;
