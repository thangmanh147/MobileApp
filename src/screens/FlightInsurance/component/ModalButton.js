import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Color, screen} from '../../../config/System';
import TouchableWithoutTwiceClick from '../../../components/TouchableWithoutTwichClick';
const ModalButton = ({
  style,
  alignItems = 'center',
  justifyContent,
  label,
  onPress,
  borderRadius = 10,
  width,
  backgroundColor = Color,
  height = 49,
  color = '#fff',
  fontWeight = 'bold',
  marginTop,
  marginBottom = 10,
  disabled = false,
  paddingBottom,
}) => (
  <TouchableWithoutTwiceClick
    style={[
      {
        borderRadius,
        height,
        width,
        marginTop,
        marginBottom,
        backgroundColor,
        alignItems,
        justifyContent,
        borderBottomColor: 'red',
      },
      style,
    ]}
    onPress={onPress}
    disabled={disabled}>
    <View
      style={{
        borderRadius,
        height,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: paddingBottom ? paddingBottom : 0,
      }}>
      <Text
        style={{
          color,
          fontSize: 14,
          // // fontWeight,
          fontWeight: '600',
        }}>
        {label}
      </Text>
    </View>
  </TouchableWithoutTwiceClick>
);

export default ModalButton;
