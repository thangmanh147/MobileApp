import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Platform,
} from 'react-native';
import { Color } from '../../config/System';
import { infoInsur } from '../../screens/ListNotify/assets';
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT} from '../../utils/Util';

const HeaderScroll = ({
    offset,
    code,
    secondName = false,
    marginDiff= false,
    title,
    anchorHeader,
}) => {
    const opacityTitle = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });

    const paddingTitle = offset.interpolate(
        {
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [4, 18],
            extrapolate: 'clamp',
        });
    const numberLine = infoInsur[code] ? infoInsur[code].numberLine : infoInsur.default.numberLine;
    const marginTitle = offset.interpolate(
        {
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [numberLine === 1 ? 200 : 180, Platform.OS === 'ios' ? 41 : 39],
            extrapolate: 'clamp',
        });
    const marginTitle2 = offset.interpolate(
        {
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [numberLine === 1 ? 171 : 151, Platform.OS === 'ios' ? 41 : 39],
            extrapolate: 'clamp',
        });
    if (anchorHeader) {
        return (
            <View style={styles.headerContent}>
                <View
                    style={[{
                        marginHorizontal: 24,
                        marginTop: Platform.OS === 'ios' ? 41 : 39,
                        paddingLeft: 18
                    }]}>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#ffff',
                            textAlign: 'left',
                            textTransform: 'uppercase'
                        }}>
                        {title || (infoInsur[code] ? (secondName ? infoInsur[code].nameHeader2 : infoInsur[code].nameHeader) : infoInsur.default.nameHeader)}
                    </Text>
                    <View style={[{ opacity: 0 }]}>
                        <View
                            style={{
                                backgroundColor: Color,
                                width: 103,
                                height: 4,
                                borderRadius: 35,
                                marginTop: 4,
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.headerContent}>
            <Animated.View
                style={[{
                    marginHorizontal: 24,
                    marginTop: marginDiff ? marginTitle2 : marginTitle,
                    paddingLeft: paddingTitle
                }]}>
                <Text
                    numberOfLines={2}
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#ffff',
                        textAlign: 'left',
                        textTransform: 'uppercase'
                    }}>
                    {title || (infoInsur[code] ? (secondName ? infoInsur[code].nameHeader2 : infoInsur[code].nameHeader) : infoInsur.default.nameHeader)}
                </Text>
                <Animated.View style={[{ opacity: opacityTitle }]}>
                    <View
                        style={{
                            backgroundColor: Color,
                            width: 103,
                            height: 4,
                            borderRadius: 35,
                            marginTop: 4,
                        }}
                    />
                </Animated.View>
            </Animated.View>
        </View>
    );
}
const styles = StyleSheet.create({
    headerContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2011
    },
});

export default HeaderScroll;
