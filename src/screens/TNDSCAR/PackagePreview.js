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
import { Color, colorBackground, colorNote, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import { formatVND } from '../../components/Functions';
import IconEditSvg from '../../config/images/icons/IconEditSvg';

function PackagePreview({ fee, infoMotor, durationCar, infoCar }) {
    console.log('durationCar',durationCar)

    const renderTotal = () => {
        let a = durationCar?.feeTNDS?.feeVat
        let b = durationCar?.insuranceMoney?.feeVat
        if (durationCar?.check == true) {
            return a + b
        } else {
            return a
        }

    }

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer1}>
                <View style={{ flex: 2.5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>
                        Gói bảo hiểm
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Actions.PackageTNDSCar()} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                    <IconEditSvg width={16} height={15} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        1.Bảo hiểm TNDS bắt buộc
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={[styles.dataStyle, { color: TxtColor, fontWeight: 'bold' }]}>
                        {formatVND(fee?.fee, '.')}VNĐ
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.dataStyle}>
                        VAT (10%)
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={[styles.dataStyle,{color: TxtColor}]}>
                        {formatVND((fee?.feeVat) - (fee?.fee), '.')}VNĐ
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.dataStyle}>
                        Thời hạn bảo hiểm
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        Từ {durationCar?.info?.dateFrom}
                    </Text>
                    <Text style={styles.dataStyle}>
                        đến {durationCar?.info?.dateTo}
                    </Text>
                </View>
            </View>

            {
                durationCar?.check == true ? <View>
                    <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textStyle}>
                                2.Bảo hiểm tai nạn lái xe phụ xe và người ngồi trên xe <Text style={{fontWeight: 'normal'}}>(Không chịu thuế VAT)</Text>
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[styles.dataStyle, { color: TxtColor, fontWeight: 'bold' }]}>
                                {formatVND(durationCar?.insuranceMoney?.feeVat , '.')}VNĐ
                            </Text>
                        </View>
                    </View>
                    {
                        infoCar?.typeCar?.value?.toUpperCase()?.includes('TAXI') ? (
                            <View style={styles.titleContainer}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.dataStyle}>
                                        Số chỗ ngồi được bảo hiểm
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { color: TxtColor }]}>
                                        {durationCar?.seatParent}
                                    </Text>
                                </View>
                            </View>
                        ) : null
                    }
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.dataStyle}>
                                Số tiền bảo hiểm
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[styles.dataStyle, { color: TxtColor }]}>
                                {formatVND(durationCar?.insuranceMoneyTNLXPX, '.')}VNĐ
                            </Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.dataStyle}>
                                Thời hạn bảo hiểm
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                Từ {durationCar?.info?.dateFrom}
                            </Text>
                            <Text style={styles.dataStyle}>
                                đến {durationCar?.info?.dateTo}
                            </Text>
                        </View>
                    </View>
                </View> : null
            }
            <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />
            <View style={[styles.titleContainer, {alignItems: 'center'}]}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: TxtColor, fontWeight: 'bold', fontSize: 14 }}>
                        Thanh toán
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={{ color: colorNote, fontSize: 14, fontWeight: 'bold' }}>
                        {formatVND(renderTotal(), '.')}VNĐ
                    </Text>
                </View>
            </View>
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
        color: TxtColor
    }

});


const mapStateToProps = state => ({
    infoCar:state?.tndsCar?.infoCar,
    fee: state?.tndsCar?.feeCar,
    durationCar: state?.tndsCar?.durationCar,
    infoMotor: state?.motor?.infoMotor
});

export default connect(mapStateToProps, {})(PackagePreview);

