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
import { formatVND, formatVNDTNDSCAR, renderVND } from '../../components/Functions'
import { Color, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import IconEditSvg from '../../config/images/icons/IconEditSvg';


function CarInfoPreview({ infoCar }) {
    console.log('infoCar',infoCar)
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer1}>
                <View style={{ flex: 2.5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>
                        Thông tin xe mua bảo hiểm
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Actions.InfomationCarPhysical()} style={{ flex: 0.5, alignItems: 'flex-end' }}>
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
                    <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                        {infoCar?.purpose_car?.label}
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
                    <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
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
                    <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
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
                    <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
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
                    <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
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
                    <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                        {infoCar?.seat}
                    </Text>
                </View>
            </View>
            {/* {infoCar?.licensePlate && infoCar?.carStatus?.value === 'Y' ?
                        <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Biển số xe
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                                {infoCar?.licensePlate}
                            </Text>
                        </View>
                    </View> : null
            }
            {infoCar?.frameNumber && infoCar?.carStatus?.value === 'N' ?
                        <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Số khung
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                                {infoCar?.frameNumber}
                            </Text>
                        </View>
                    </View> : null
            }
            {infoCar?.vehicleNumber && infoCar?.carStatus?.value === 'N' ?
                        <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Số máy
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                                {infoCar?.vehicleNumber}
                            </Text>
                        </View>
                    </View> : null
            } */}
            {infoCar?.frameNumber?.length > 0 ?
                        <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Số khung
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                                {infoCar?.frameNumber}
                            </Text>
                        </View>
                    </View> : null
            }
            {infoCar?.vehicleNumber?.length > 0 ?
                        <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Số máy
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                                {infoCar?.vehicleNumber}
                            </Text>
                        </View>
                    </View> : null
            }
            {infoCar?.licensePlate?.length > 0 ?
                        <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Biển số xe
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                                {infoCar?.licensePlate}
                            </Text>
                        </View>
                    </View> : null
            }
            {infoCar?.loadCapacity ?
                        <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                Trọng tải
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                                {infoCar?.loadCapacity} tấn
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
                            <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                                {infoCar?.registrationExp}
                            </Text>
                        </View>
                    </View>
                ) : null
            }
             <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Giá trị xe
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                        {infoCar?.valueCar ? renderVND(infoCar?.valueCar) : ''}VNĐ
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
                    <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                        {infoCar?.valueCashCar ? renderVND(infoCar?.valueCashCar) : ''}VNĐ
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F5F6',
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
        alignItems: 'flex-start',
        paddingTop: 12
    },
    textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TxtColor
    },
    dataStyle: {
        fontSize: 14,
        color: TxtColor
    }

});


const mapStateToProps = state => {
    return({
    infoCar: state?.carPhysical?.infoCarPhysical,
})};

export default connect(mapStateToProps, {})(CarInfoPreview);

