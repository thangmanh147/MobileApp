import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import { Color, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import IconEditSvg from '../../config/images/icons/IconEditSvg';

function MotorInfoPreview({ buyerInfo }) {

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer1}>
                <View style={{ flex: 2.5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: Color }}>
                        Thông tin người thụ hưởng:
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Actions.pop()} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                    <IconEditSvg width={16} height={15} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Họ và tên
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {buyerInfo?.customerName}
                    </Text>
                </View>
            </View>
            {
                buyerInfo?.customerIdentity?.length > 0 ? (
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 0.6 }}>
                            <Text style={styles.textStyle}>
                                CMND/CCCD/Hộ chiếu
                            </Text>
                        </View>
                        <View style={{ flex: 0.4, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {buyerInfo?.customerIdentity}
                            </Text>
                        </View>
                    </View>
                ) : null
            }
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Địa chỉ
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {buyerInfo?.customerAddress}
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderRadius: 10,
        paddingVertical: 16,
        paddingHorizontal: 12
    },
    titleContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        paddingTop: 12
    },
    textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TxtColor
    },
    dataStyle: {
        fontSize: 14,
        color: TxtColor,
        textAlign: 'right'
    }

});


const mapStateToProps = state => ({
    buyerInfo: state?.motorPhysical?.buyer?.infoBuyer,
});

export default connect(mapStateToProps, {})(MotorInfoPreview);

