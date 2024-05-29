import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput, Image,
    TouchableOpacity,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import IconFilterSvg from '../config/images/icons/IconFilterSvg';
import IconSearchSvg from '../config/images/icons/IconSearchSvg';

const Input = ({
                   label,
                   marginTop = 15,
                   secureTextEntry = false,
                   value,
                   editable = true,
                   keyboardType,
                   onChangeText = 'text',
                   placeholder,
                   borderRadius,
                   height,
                   backgroundColor = '#f2f2f2',
                   autoCapitalize,
                   autoCorrect,
                   showBorder ,
                   showFilter ,
                   borderWidth,
                   borderColor,
                   icon,style,
                   onPress

               }) => (
    <View>
        <View style={{
            borderWidth: borderWidth,
            borderColor: borderColor,
            borderRadius: borderRadius,
            height: height,
            backgroundColor: backgroundColor,
            paddingLeft: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            borderBottomWidth: showBorder ? 1 : 0,
            ...style
        }}>
            <IconSearchSvg width={20} height={20} style={{alignSelf: 'center'}} />
            <TextInput
                placeholder={placeholder ? placeholder : ''}
                value={value}
                editable={editable}
                keyboardType={keyboardType}
                onChangeText={text => onChangeText(text)}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                style={{
                    padding: 0,
                    flex: 1,
                    paddingLeft: 15,
                    paddingRight: 15,
                }}
            />
            {
                showFilter == true ? <View style={{paddingVertical:5}}>
                    <View style={{flex:1,width: 1,borderWidth:1,borderColor:'#D9D9D9'}}/>
                </View> : null
            }

            {
                showFilter == true ? <TouchableOpacity style={{justifyContent: 'center', padding: 15}} onPress={onPress}>
                    <IconFilterSvg width={20} height={20} />
                </TouchableOpacity> : null
            }
        </View>
    </View>
);

const styles = ScaledSheet.create({
    ic_search: {

        height: '20@ms',
        width: '20@ms',
        alignSelf: 'center'
    },
});
export default Input;
