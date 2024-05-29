



import React from 'react';
import {
    Text,
    View ,
    TouchableOpacity,
} from 'react-native';
import {Color, screen, } from '../../../config/System'
import TouchableWithoutTwiceClick from '../../../components/TouchableWithoutTwichClick'

const ModalButtonNoColor = ({
                         style,
                         alignItems = 'center',
                         justifyContent,
                         label,
                         onPress,
                         borderRadius = 10,
                         width,
                         backgroundColor = '#FFFFFF',
                         height = 49,
                         color = '#333',
                         fontWeight = 'bold',
                         marginTop,
                         marginBottom = 10,
                         disabled=false,
                         paddingBottom
                     }) => (
    <TouchableWithoutTwiceClick
        style={[{
            borderRadius,
            height,
            width,
            marginTop,
            marginBottom,
            backgroundColor,
            alignItems,
            justifyContent,
            borderBottomColor:'red'
        }, style]}
        onPress={onPress}
    >
        <TouchableWithoutTwiceClick
            disabled={disabled}
            style={{
                borderRadius,
                height,
                width,
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: paddingBottom ? paddingBottom : 0,
            }}
            onPress={onPress} >
            <Text style={{
                color,
                fontSize:14,
                // // fontWeight,
                fontWeight: '700',
            }}>{label}</Text>
        </TouchableWithoutTwiceClick>
    </TouchableWithoutTwiceClick>

);
export default ModalButtonNoColor;
