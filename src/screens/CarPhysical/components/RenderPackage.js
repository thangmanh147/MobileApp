import React, { useState, useEffect, useRef } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import IconCheckboxBlurSvg from '../../../config/images/icons/IconCheckboxBlurSvg';
import IconBoxSvg from '../../../config/images/icons/IconBoxSvg';
import IconCheckedBoxSvg from '../../../config/images/icons/IconCheckedBoxSvg';
import { colorBoxBorder, NewColor, TxtColor } from '../../../config/System';
import { connect } from 'react-redux';

import { formatVND } from '../../../components/Functions';



const DATA = [
    { code: "vc", name: "Phí cơ bản", value: 3800000, disable: true, defaultStatus: true },
    { code: "bs02", name: "BS02 - BH thay thế mới", value: 200000, disable: false },
    { code: "bs04", name: "BS04 - BH xe bị mất trộm cướp bộ phận", value: 400000, disable: false },
    { code: "bs05", name: "BS05 - BH lựa chọn cơ sở sửa chữa", value: 400000, disable: false },
    { code: "bs06", name: "BS06 - BH tổn thất về động cơ khi xe hoạt động trong khu vực bị ngập nước", value: 0, disable: true, defaultStatus: true },
    // { code: "bs07", name: "BS07 - BH thay thế xe mới trong năm đầu tiên", value: 0, disable: false },
    // { code: "bs09", name: "BS09 - BH thuê xe trong thời gian sửa chữa", value: 600000, disable: false },
    { code: "bs13", name: "BS13 - BH cho thiết bị lắp thêm", value: 200000, disable: false },
    // { code: "bs14", name: "BS14 - BH mất trộm, cướp chìa khoá xe", value: 200000, disable: false },
]

function RenderPackage({ name, disabled, value, checked, onPress }) {
    return (
        <View>
            <View style={{
                flexDirection: 'row',
                padding: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            }}>
                <TouchableOpacity disabled={disabled} onPress={onPress} style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    {
                        disabled ? <IconCheckboxBlurSvg width={20} height={20} /> :
                        checked ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} /> : <IconBoxSvg width={20} height={20} color={colorBoxBorder} />
                    }
                    <Text style={{
                        color: TxtColor,
                        fontSize: 14,
                        marginLeft: 10,
                    }}>{name}</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        color: TxtColor,
                        fontSize: 14,
                        textAlign: 'right',
                        marginTop: 3
                    }}>
                        {value != 0 ? `${formatVND(value, '.')}VNĐ` : 'Miễn phí'}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    animatedHeaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctBack: {
        zIndex: 1002,
    },
    icBack: {
        height: 15,
        width: (15 * 21) / 39,
    },
    title: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        height: 38,
        marginLeft: 30,
        marginBottom: 40,
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
    },
    viewTable: {
        shadowColor: '#F4F4F4',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 7.00,

        elevation: 3, backgroundColor: '#F6F5F6', borderTopLeftRadius: 10, borderTopRightRadius: 10,
    },
});

const mapStateToProps = (state, ownProps) => {
    return ({

    })
};

export default connect(mapStateToProps, {

})(RenderPackage);
