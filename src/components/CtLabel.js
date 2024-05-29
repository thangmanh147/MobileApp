

import React from 'react';
import { Text, View } from 'react-native';

const CtLabel = ({
    label,
}) => (
    <View style={{backgroundColor: '#30cecb', height: 35, paddingLeft: 20, justifyContent: 'center',}}>
      <Text style={{color: '#fff', fontWeight: 'bold'}}>{label}</Text>
    </View>
);

export default CtLabel;
