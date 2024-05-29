

import React from 'react';
import { Text, View } from 'react-native';

const Gradient = ({
    children,
    borderRadius= 25,
    colors=['#0bc5b8', '#10c8b1', '#15cbac', '#17cda8', '#1fd29f', '#25d697', '#2bda90']
}) => (
  <View
  style={{
    borderRadius
  }}
  >
  {
    children
  }
  </View>
);

export default Gradient;
