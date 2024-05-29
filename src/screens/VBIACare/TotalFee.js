import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image,
} from 'react-native';
import { Color, colorBackground, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import { formatVND } from '../../components/Functions';


function TotalFee({
    customerInfo,
    arrFeeBase,
    arrFeeA53,
    arrFeeB3,
    arrFeeC,
    arrFeeD,
    packageCus,
 }) {
    
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
        }}>
            <View style={{
                borderTopLeftRadius: 10, borderTopRightRadius: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingVertical: 15,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    backgroundColor: Color,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>TÍNH PHÍ BẢO HIỂM</Text>
                </View>
                <View style={{ backgroundColor: colorBackground }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12, marginTop: 16 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{packageCus.name}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{formatVND(arrFeeBase.map(item => item.fee)?.reduce((a, b) => a + b, 0))}VNĐ</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: TxtColor, fontSize: 14 }}>- Phí cơ bản</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(arrFeeBase.map(item => item.fee)?.reduce((a, b) => a + b, 0))}VNĐ</Text>
                        </View>
                    </View>
                    {
                        arrFeeA53.find(item => item?.status === 'active') ? (
                            <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14 }}>- Trợ cấp nằm viện điều trị tai nạn</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(arrFeeA53.filter(item => item?.status === 'active').map(item => item.fee)?.reduce((a, b) => a + b, 0))}VNĐ</Text>
                                </View>
                            </View>
                        ) : null
                    }
                    {
                        arrFeeB3.find(item => item?.status === 'active') ? (
                            <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14 }}>- Điều trị ngoại trú</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(arrFeeB3.filter(item => item?.status === 'active').map(item => item.fee)?.reduce((a, b) => a + b, 0))}VNĐ</Text>
                                </View>
                            </View>
                        ) : null
                    }
                    {
                        arrFeeC.find(item => item?.status === 'active') ? (
                            <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14 }}>- Chăm sóc thai sản (không bao gồm chi phí khám thai định kỳ)</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(arrFeeC.filter(item => item?.status === 'active').map(item => item.fee)?.reduce((a, b) => a + b, 0))}VNĐ</Text>
                                </View>
                            </View>
                        ) : null
                    }
                    {
                        arrFeeD.find(item => item?.status === 'active') ? (
                            <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14 }}>- Chăm sóc và điều trị răng</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(arrFeeD.filter(item => item?.status === 'active').map(item => item.fee)?.reduce((a, b) => a + b, 0))}VNĐ</Text>
                                </View>
                            </View>
                        ) : null
                    }
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>Số người được bảo hiểm</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{customerInfo?.length}</Text>
                        </View>
                    </View>
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
    ctBack: {
        marginTop: 25,
        padding: 24,
        position: 'absolute',
        left: 0,
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
    styleTab: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center',
    },
    viewTable: {
        borderTopLeftRadius: 10, borderTopRightRadius: 10
    },
});


const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps, {})(TotalFee);

