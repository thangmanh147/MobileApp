
import React from 'react';
import {
  TouchableOpacity,
  Image
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { tintColorInput, Color } from '../../../config/System';
import IconDownSvg from '../../../config/images/icons/IconDownSvg';

const InputTypeVehicle = ({
  openCommune,
  keyword,
  erroCodeValidate,
  checkDisabled
}) => (
  <TouchableOpacity disabled={checkDisabled ? true : false } onPress={openCommune} style={{justifyContent: 'center', marginVertical: -5 }}>
    <IconDownSvg
      width={8}
      height={8}
      style={{position: 'absolute',right: 0,bottom: 23}}
    />
    <TextField
      fontSize={15}
      label={'Phường/Xã'}
      textColor= {'#323643'}
      tintColor= {tintColorInput}
      baseColor= {erroCodeValidate ? '#F97C7C' : keyword ? Color : '#CBCBCB'}
      value={keyword}
      lineWidth={erroCodeValidate ? 2 : 0.5}
      activeLineWidth={erroCodeValidate ? 2 : 0.5}
      editable={false}
    />
  </TouchableOpacity>
);

export default InputTypeVehicle;