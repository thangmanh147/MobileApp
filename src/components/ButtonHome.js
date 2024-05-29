import React from 'react';
import {
    Text,
    View,
    TouchableOpacity, Image,
} from 'react-native';
import {Color, screen} from '../config/System'

const ButtonHome = ({
                        label,
                        onPress,
                        borderRadius = 12,
                        width,
                        image,
                        height,
                        color = Color,
                        fontWeight = '500',
                        disabled = false,
                        fontSize,
                        widthImage,
                        heightImage,
                        paddingLeft




                    }) => (
    <View
        style={{
            borderRadius,
            height,
            width,
            backgroundColor:color
        }}>
        <TouchableOpacity
            disabled={disabled}
            style={{
                borderRadius,
                height,
                width,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
            }}
            onPress={onPress}>
            {image &&
            <Image style={{width: widthImage, height: heightImage,}}  source={require('./../icons/icon_forma.png')}/>
            }
            <Text style={{
               paddingLeft,
                color:'#fff',
                fontSize,
                fontWeight,

            }}>{label}</Text>
        </TouchableOpacity>
    </View>

);

export default ButtonHome;
