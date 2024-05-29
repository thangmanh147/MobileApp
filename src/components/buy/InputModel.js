
import React from 'react';
import {
  TouchableOpacity,
  Image
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { tintColorInput, subColor } from '../../config/System';
import IconDownSvg from '../../config/images/icons/IconDownSvg';

const InputModel = ({
  openModal,
  keyword,
  year,
  errorCodeValidate
}) => (
    <TouchableOpacity disabled={year ? false : true} onPress={openModal} style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: 0 }}>
      <IconDownSvg 
        width={8}
        height={8}
        style={{ position: 'absolute', right: 0, bottom: errorCodeValidate == true ? 39 : 23 }}
      />
      <TextField
        fontSize={14}
        label={'Dòng xe'}
        textColor={'#323643'}
        tintColor={tintColorInput}
        value={keyword}
        lineWidth={0.5}
        baseColor={subColor}
        editable={false}
        style={{
          padding: 0,
          paddingRight: 10,
          fontSize: 14
        }}

      />
    </TouchableOpacity>
  );

export default InputModel;
