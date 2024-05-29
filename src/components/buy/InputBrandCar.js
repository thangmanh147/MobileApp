
import React from 'react';
import {
    TouchableOpacity,
    Image
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { tintColorInput, subColor } from '../../config/System';
import IconDownSvg from '../../config/images/icons/IconDownSvg';

const InputBrandCar = ({
    openModal,
    keyword,
    vehicle_purpose_id,
    erroCodeValidate
}) => (
        <TouchableOpacity onPress={openModal} style={{ justifyContent: 'center', paddingHorizontal: 0 }}>
            <IconDownSvg
                width={8} 
                height={8}
                style={{ position: 'absolute', bottom: 23, right: 0 }}
            />
            <TextField
                fontSize={14}
                label={'Loại xe'}
                multiline={true}
                textColor={'#323643'}
                tintColor={tintColorInput}
                baseColor={subColor}
                value={keyword}
                lineWidth={erroCodeValidate ? 2 : 0.5}
                editable={false}
                style={{
                    padding: 0,
                    // paddingRight: 50,
                }}
            />
        </TouchableOpacity>
    );

export default InputBrandCar;
