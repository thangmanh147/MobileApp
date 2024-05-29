
import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Color, screen } from '../../config/System';
import Gradient from '../Gradient';

const Container = ({
    children,
}) => (
  <View style={{backgroundColor: Color}}
    borderRadius={0}
  >
    <ScrollView keyboardShouldPersistTaps={'always'}>
      <View style={{height: screen.height, width: screen.width, alignItems: 'center',}}>
        <Image style={{height: 30, width: 30*127/55, marginTop: 50, marginBottom: 10}} source={require('../../icons/logo_home.png')}/>
        {
          children
        }
      </View>
    </ScrollView>
    
  </View>
);

export default Container;
