
import React from 'react';
import { Text, View } from 'react-native';
import { screen } from '../config/System';
import {heightPercentageToDP} from "../config/ConfigResponsive";

const FooterButton = ({
    children,background,height
}) => (
    <View style={{
		alignItems: 'center',
        height:height || heightPercentageToDP('10'),
		justifyContent: 'center',
		backgroundColor:background || '#fff',
        // shadowOpacity: 0.05,
        // // elevation: 6,
        // shadowRadius: 5 ,
        // shadowOffset: {
        //     width: 0,
        //     height: -3,
        // },
	}}>
      {children}
    </View>

);

export default FooterButton;
