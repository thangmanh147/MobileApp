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
import { Color, colorBackground, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import IconEditSvg from '../../config/images/icons/IconEditSvg';

function CarInfoPreview({ infoCar }) {

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer1}>
                <View style={{ flex: 2.5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>
                        Thông tin xe mua bảo hiểm
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Actions.InfomationCar()} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                    <IconEditSvg width={16} height={15} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Mục đích sử dụng
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoCar?.purpose_car?.label}
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>Loại xe</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoCar?.typeCar?.value}
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
                        {infoCar?.carBrand?.name}
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Dòng xe
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoCar?.carModel?.name}
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Năm sản xuất
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoCar?.year}
                    </Text>
                </View>
            </View>

            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Số chỗ ngồi
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoCar?.seat}
                    </Text>
                </View>
            </View>
            {/* <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Tên chủ xe
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoCar?.ownerFullName}
                    </Text>
                </View>
            </View> */}
            {/* <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Tình trạng xe
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoCar?.carStatus?.label}
                    </Text>
                </View>
            </View> */}
            {
                infoCar?.loadCapacity ?
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Trọng tải
                        </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {infoCar?.loadCapacity}
                            </Text>
                        </View>
                    </View> : null
            }
            {/* {
                infoCar?.carStatus?.value == 'Y' &&
                <View style={styles.titleContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textStyle}>
                            Biển số xe
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.dataStyle}>
                            {infoCar?.licensePlate}
                        </Text>
                    </View>
                </View>
            }
            {
                infoCar?.carStatus?.value == 'N' ?
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Số khung
                        </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {infoCar?.frameNumber}
                            </Text>
                        </View>
                    </View> : null
            }
            {
                infoCar?.carStatus?.value == 'N' ?
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Số máy
                        </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {infoCar?.vehicleNumber}
                            </Text>
                        </View>
                    </View> : null
            } */}
            {
                infoCar?.frameNumber?.length > 0 ?
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Số khung
                        </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {infoCar?.frameNumber}
                            </Text>
                        </View>
                    </View> : null
            }
            {
                infoCar?.vehicleNumber?.length > 0 ?
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Số máy
                        </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {infoCar?.vehicleNumber}
                            </Text>
                        </View>
                    </View> : null
            }
            {
                infoCar?.licensePlate?.length > 0 ?
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Biển số xe
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {infoCar?.licensePlate}
                            </Text>
                        </View>
                    </View> : null
            }
            {
                infoCar?.registrationExp?.length > 0 ? (
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Ngày hết hạn đăng kiểm
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                {infoCar?.registrationExp}
                            </Text>
                        </View>
                    </View>
                ) : null
            }
            {/* <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Địa chỉ đăng ký xe
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        {infoCar?.ownerAddress}, {infoCar?.ownerDistrict}, {infoCar?.ownerProvince}
                    </Text>
                </View>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorBackground,
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
    infoCar: state?.tndsCar?.infoCar,
});

export default connect(mapStateToProps, {})(CarInfoPreview);

