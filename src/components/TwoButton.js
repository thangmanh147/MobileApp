

import React from 'react';
import {
    Text,
    View ,
    TouchableOpacity,
} from 'react-native';
import {Color, screen, } from '../config/System'
import TouchableWithoutTwiceClick from '../../src/components/TouchableWithoutTwichClick'
const TwoButton = ({
                    label,
                    labelConfirm,
                    onPress,
                    onPressConfirm,
                    borderRadius = 10,
                    width = screen.width-40,
                    backgroundColor ,
                    height = 49,
                    color = '#fff',
                    fontWeight = 'bold',
                    marginTop,
                    marginBottom = 10,
                    disabled=false,
                    paddingBottom
                }) => (
    <View
        style={{
            borderRadius,
            height,
            width,
            marginTop,
            marginBottom,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor:'red',
            flexDirection:'row'
        }}
    >
        <TouchableWithoutTwiceClick
            disabled={disabled}
            style={{

                borderRadius,
                height,
                width:width/2,
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: paddingBottom ? paddingBottom : 0,
            }}
            onPress={onPress} >
            <Text style={{
                color:'#414042',
                fontSize:14,
                // // fontWeight,
                fontWeight: 'bold',
            }}>{label}</Text>
        </TouchableWithoutTwiceClick>
        <TouchableWithoutTwiceClick
            disabled={disabled}
            style={{
                backgroundColor,
                borderRadius,
                height,
                width:width/2,
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: paddingBottom ? paddingBottom : 0,
            }}
            onPress={onPressConfirm} >
            <Text style={{
                color,
                fontSize:14,
                // // fontWeight,
                fontWeight: 'bold',
            }}>{labelConfirm}</Text>
        </TouchableWithoutTwiceClick>
    </View>

);

export default TwoButton;
