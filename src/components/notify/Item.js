

import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import { Background,screen, TxtBlack, TxtGrey,} from '../../config/System';

const Item = ({
    data,
}) => (
    <View style={{marginTop: 15}}>
      {/* <Shadow
        height={80}
        width={screen.width-40}
        x={0}
        y={10}
      > */}
        <View style={css.ct}>
          <Text>ddd</Text>
        </View>
      {/* </Shadow> */}
    </View>
);

const css = StyleSheet.create({
  
  label: {
    color: TxtBlack,
  },
  sub: {
    color: TxtGrey,
    fontSize: 12
  },
  ct: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 80,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  icon: {
    width: 15,
    resizeMode: 'contain'
  },
  ctIcon: {
    height: 50,
    backgroundColor: Background,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
})

export default Item;
