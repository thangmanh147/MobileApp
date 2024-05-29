
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput
} from 'react-native';

const Input = ({
  label,
  marginTop = 15,
  secureTextEntry = false,
  value,
  editable = true,
  keyboardType,
  onChangeText = text,
  placeholder,
  error
}) => (
  <View>
    <Text style={css.label}>{label}</Text>
    <View style={css.ctInput}>
      <TextInput
        placeholder={placeholder ? placeholder : ''}
        value={value}
        editable={editable}
        keyboardType={keyboardType}
        onChangeText={text => onChangeText(text)}
        secureTextEntry={secureTextEntry}
        style={{
          padding: 0,
          flex: 1,
          paddingLeft: 15,
          paddingRight: 15,
        }}
      />
    </View>
    <Text style={css.error}>{error}</Text>
  </View>
);

const css = StyleSheet.create({
  label: {
    color: '#b2b2b2'
  },
  ctInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginTop: 5,
    height: 40,
  },
  error: {
    color: 'rgb(213, 0, 0)',
    padding: 5
  }
})

export default Input;
