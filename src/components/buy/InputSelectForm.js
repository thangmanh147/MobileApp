
import React from 'react';
import {
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import { OutlinedTextField, TextField } from 'react-native-material-textfield';
import { screen, Color, subColor, TxtColor } from '../../config/System';
import IconDownSvg from '../../config/images/icons/IconDownSvg';

const InputSelectForm = ({
    openModal,
    value,
    errorCodeValidate,
    checkDisabled,
    label,
    editable = false,
    error,
    maxLength
}) => (
    <TouchableOpacity
        disabled={checkDisabled ? true : false}
        onPress={openModal}
        style={{
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            backgroundColor: '#FFFFFF',
            height: 45,
            width: '90%',
            justifyContent: 'center',
            borderRadius: 8,
            marginTop: 23,
            paddingVertical: 10
        }}
    >
        <IconDownSvg
            width={8}
            height={8}
            style={{ position: 'absolute', right: 10, bottom: value ? 20 : 10 }}
        />
        <TextField
            fontSize={14}
            label={label}
            textColor={TxtColor}
            tintColor={'#FFFFFF'}
            baseColor={subColor}
            value={value}
            editable={editable}
            activeLineWidth={0}
            lineWidth={0}
            error={error}
            style={{
                paddingRight: 20,
            }}
            maxLength={maxLength}
        />
    </TouchableOpacity>
);

export default InputSelectForm;
