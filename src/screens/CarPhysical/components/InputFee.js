
import React from 'react';
import {
    TouchableOpacity,
    Image,
    Text,
    View
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { screen, Color } from '../../../config/System';
import { heightPercentageToDP, widthPercentageToDP } from '../../../config/ConfigResponsive';
import { renderVND } from '../../../components/Functions';
import FastImage from 'react-native-fast-image'

const InputFee = ({
    openModal,
    keyword,
    erroCodeValidate,
    checkDisabled,
    label,
    code
}) => (
        <View style={{ height: heightPercentageToDP('9'), alignItems: 'center', justifyContent: 'center' }}>
            {
                code == 0 ? <FastImage source={require('../../../icons/iconAgent/ic_free.png')} style={{ width: 65, height: 35 }} resizeMode={'contain'} />
                    : <Text style={{ color: '#8D8C8D' }}>{code !== null ? `${renderVND(code)}đ` : ''}</Text>
            }
        </View>
    );

export default InputFee;
