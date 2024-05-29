

import React from 'react';
import { Image, View,ActivityIndicator } from 'react-native';
import { Color, screen } from '../config/System';

const Loading = ({
    params,
}) => (
  <View style={{
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center', 
    position: 'absolute', 
    top:0,
    zIndex: 1000, 
    height: screen.height, 
    width: screen.width
  }}>
      <ActivityIndicator size="large" color={Color} />
    {/*<Image resizeMode={'contain'} style={{width: 50, height: 50}} source={require('../icons/loading.gif')} />*/}
  </View>
);

export default Loading;
