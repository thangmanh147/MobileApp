
import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { colorText, nameApp, textDisable, tintColorInput } from '../../../config/System';
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
    hideIcon
}) => (
        <TouchableOpacity disabled={checkDisabled ? true : false} onPress={openModal} style={{ justifyContent: 'center', }}>
            {
                !hideIcon ? (
                    <IconDownSvg
                        width={8}
                        height={8}
                        style={{position: 'absolute', right: 0, bottom: error ? 38 : 23}}
                    />
                ) : null
            }
            <TextField
                fontSize={14}
                label={label}
                textColor={textColor}
                tintColor={tintColor}
                baseColor={baseColor}
                value={value}
                lineWidth={nameApp.includes('YCHI') ? 0 : 0.5}
                //activeLineWidth={erroCodeValidate ? 2 : 0.5}
                editable={false}
                error={error}
            />
            {
                nameApp.includes('YCHI') ? (
                    <View style={{
                        marginTop: -10,
                        marginBottom: 10,
                        height: 1,
                        backgroundColor: textDisable,
                    }} />
                ) : null
            }
        </TouchableOpacity>
    );

export default InputSelect;
