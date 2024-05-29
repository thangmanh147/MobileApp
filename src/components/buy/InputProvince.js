
import React from 'react';
import {
  TouchableOpacity,
  Image
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { tintColorInput, subColor } from '../../config/System';
import IconDownSvg from '../../config/images/icons/IconDownSvg';

const InputTypeVehicle = ({
  openProvince,
  keyword,
  errorCodeValidate,
  checkDisabled
}) => (
    <TouchableOpacity disabled={checkDisabled ? true : false} onPress={openProvince} style={{ justifyContent: 'center', marginVertical: -5 }}>
      <IconDownSvg 
        width={8}
        height={8}
        style={{ position: 'absolute', right: 0, bottom: errorCodeValidate ? 23 : 38 }}
      />
      <TextField
        fontSize={14}
        label={'Tỉnh/Thành phố'}
        textColor={'#323643'}
        tintColor={tintColorInput}
        baseColor={subColor}
        value={keyword}
        lineWidth={errorCodeValidate ? 2 : 0.5}
        //activeLineWidth={erroCodeValidate ? 2 : 0.5}
        editable={false}
      />
    </TouchableOpacity>
  );

export default InputTypeVehicle;
