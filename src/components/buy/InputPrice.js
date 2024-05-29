

import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image
} from 'react-native';
import {TxtGrey, TxtBlack} from '../../config/System';

const InputPrice = ({
    label,
    value,
    onChange=text,
    marginTop = 0,
    editable=true,
    placeholder= ''
}) => (
    <View style={[css.ct, {marginTop}]}>
      <Text style={css.label}>{label}</Text>
      <View style={css.ctInput}>
        <TextInput
          style={{color: '#333333', height: 40, flex: 1, fontSize: 16}}
          value={value}
          placeholderTextColor={TxtBlack}
          placeholder={placeholder}
          keyboardType='numeric'
          editable={editable}
          onChangeText={text => onChange(text)}
        />
        <Text style={css.vnd}>đ</Text>
      </View>
    </View>
);

const css = StyleSheet.create({
  vnd: {
    color: TxtGrey,
    fontSize: 13
  },
  label: {
    fontSize: 12,
    color: '#666666'
  },
  ctInput: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    height: 20,
    width: 20
  },
  ct: {
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
  }
})
export default InputPrice;
