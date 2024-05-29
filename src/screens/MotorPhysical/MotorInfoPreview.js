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
import {formatVND} from '../../components/Functions';
import IconEditSvg from '../../config/images/icons/IconEditSvg';

function MotorInfoPreview({ infoMotor }) {

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer1}>
                <View style={{ flex: 2.5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: Color }}>
                        Thông tin xe mua bảo hiểm:
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Actions.MotorPhysicalPackage()} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                    <IconEditSvg width={16} height={15} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Họ và tên chủ xe{'\n'}
                        theo đăng ký
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoMotor?.info?.fullName}
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Địa chỉ theo đăng ký
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoMotor?.info?.ownerAddress}, {infoMotor?.info?.ownerDistrict}, {infoMotor?.info?.ownerProvince}
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Năm đăng ký lần đầu
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoMotor?.info?.firstYearRegister}
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Loại xe
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoMotor?.info?.motorType}
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Hãng xe
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoMotor?.info?.motorBrand}
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Hiệu xe
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoMotor?.info?.motorModel}
                    </Text>
                </View>
            </View>
            {
                infoMotor?.type == 1 ? <View style={styles.titleContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textStyle}>
                            Biển số xe
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.dataStyle}>
                            {infoMotor?.info?.licensePlate}
                        </Text>
                    </View>
                </View> : <View>
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Số khung
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {infoMotor?.info?.frameNumber}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Số máy
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {infoMotor?.info?.vehicleNumber}
                            </Text>
                        </View>
                    </View>
                </View>
            }
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Giá trị xe
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {formatVND(infoMotor?.info?.valueMotor)}đ
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Số tiền bảo hiểm
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {formatVND(infoMotor?.info?.valueInsurMotor)}đ
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
    infoMotor: state?.motorPhysical?.infoMotor
});

export default connect(mapStateToProps, {})(MotorInfoPreview);

