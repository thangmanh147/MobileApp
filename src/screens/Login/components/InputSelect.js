
import React from 'react';
import {
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { colorText, tintColorInput } from '../../../config/System';
import IconDownSvg from '../../../config/images/icons/IconDownSvg';

const InputSelect = ({
    openModal,
    value,
    errorCodeValidate,
    checkDisabled,
    label,
    error,
    tintColor = tintColorInput,
    baseColor = colorText,
    textColor,
                         disableColor,
                         placeholder
}) => (
        <TouchableOpacity disabled={checkDisabled} onPress={openModal} style={{ justifyContent: 'center', marginVertical: -5 }}>
            <IconDownSvg
                width={8}
                height={8}
                style={{position: 'absolute', right: 0, bottom: error ? 38 : 23}}
            />
            <TextField
                fontSize={14}
                label={checkDisabled == false ? label : ''}
                textColor={textColor}
                tintColor={tintColor}
                baseColor={baseColor}
                value={value}
                lineWidth={0.5}
                //activeLineWidth={erroCodeValidate ? 2 : 0.5}
                editable={false}
                error={error}
                style={{
                    // padding: padding,
                    // width,
                    flex: 1,
                    backgroundColor: checkDisabled == true ? disableColor : 'unset',
                }}
                placeholder={checkDisabled == true ? placeholder :''}
            />
        </TouchableOpacity>
    );

export default InputSelect;
