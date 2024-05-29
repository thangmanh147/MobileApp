
import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { tintColorInput, colorText, TxtColor, errValidColor, nameApp, textDisable } from '../../config/System';
import IconDownSvg from '../../config/images/icons/IconDownSvg';

const InputSelect = ({
    openModal,
    value,
    errorCodeValidate,
    checkDisabled,
    label,
    error,
    tintColor = tintColorInput,
    baseColor = colorText,
    textColor = TxtColor,
    hideIcon,
    showTextLines = false,
}) => (
        <TouchableOpacity disabled={checkDisabled ? true : false} onPress={openModal} style={{ justifyContent: 'center', marginVertical: -5 }}>
            {
                !hideIcon ? (
                    <IconDownSvg
                        width={8}
                        height={8}
                        style={{ position: 'absolute', right: 0, top: 41 }}
                    />
                ) : null
            }
            <TextField
                fontSize={14}
                label={label}
                textColor={textColor}
                tintColor={tintColor}
                baseColor={baseColor}
                value={showTextLines && value?.length > 0 ? ' ' : value}
                lineWidth={nameApp.includes('YCHI') ? 0 : 0.5}
                //activeLineWidth={erroCodeValidate ? 2 : 0.5}
                editable={false}
                // error={error}
            />
            {
                showTextLines ? (
                    <Text style={{ color: TxtColor, fontSize: 14, position: 'absolute', paddingRight: 9, left: 0, top: 37 }} numberOfLines={1}>
                        {value}
                    </Text>
                ) : null
            }
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
            {
                error ?
                    <Text style={{color: errValidColor,fontSize:14}}>{error}</Text> : null
            }
        </TouchableOpacity>
    );

export default InputSelect;
