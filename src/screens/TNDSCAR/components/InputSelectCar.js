
import React from 'react';
import {
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import { TextField , FilledTextField,
    OutlinedTextField, } from 'react-native-material-textfield';
import { colorText, TxtColor, tintColorInput } from '../../../config/System';
import IconDownSvg from '../../../config/images/icons/IconDownSvg';

const InputSelectCar = ({
                         openModal,
                         value,
                         errorCodeValidate,
                         checkDisabled,
                         label,
                         error,
                         tintColor = tintColorInput,
                         baseColor = colorText,
                         textColor = TxtColor
                     }) => (
    <TouchableOpacity disabled={checkDisabled ? true : false} onPress={openModal} style={{marginTop:-15 }}>
        <IconDownSvg
            width={8}
            height={8}
            style={{position: 'absolute', right: 0, top: 41}}
        />
        <TextField
            fontSize={14}
            label={label}
            // inputContainerStyle={{borderWidth:1,borderColor:'red'}}
            textColor={textColor}
            tintColor={tintColor}
            baseColor={baseColor}
            value={value}
            lineWidth={0.5}
            //activeLineWidth={erroCodeValidate ? 2 : 0.5}
            editable={false}
            error={error}
        />
    </TouchableOpacity>
);

export default InputSelectCar;
