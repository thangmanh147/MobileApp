import React, { Component } from 'react'
import {
    TouchableOpacity,
    Image
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { TextField } from 'react-native-material-textfield'
import { Color } from '../../../config/System'
import IconDownSvg from '../../../config/images/icons/IconDownSvg';

const InputPlace = ({
    openModal,
    label,
    keyword,
    width,
    errorValidate,
    baseColor,
}) => (
        <TouchableOpacity style={{ flex: 1,  paddingHorizontal: 15 }} onPress={openModal}>
            <IconDownSvg
                width={8}
                height={8}
                style={{position: 'absolute', right: 15, bottom: 23}}
            />
            <TextField
                fontSize={14}
                label={label}
                value={keyword}
                editable={false}
                baseColor={Color}
                style={{
                    paddingRight: 10,
                    width: width
                }}
                errorValidate={errorValidate}
            />
        </TouchableOpacity>
    )
export default InputPlace;
