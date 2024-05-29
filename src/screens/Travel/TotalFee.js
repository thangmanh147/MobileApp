import React, { Component } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Color, URL, TxtColor, colorBackground } from '../../config/System';
import { connect } from 'react-redux';
import axios from 'axios';
import { formatVND } from '../../components/Functions';
import Promotion from '../../components/promotion/Promotion';

class TotalFee extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { insuranceValue, peopleNumber, longDays, feeTravel, originalFee, areaId, sellInfo } = this.props;
        const sell = sellInfo && sellInfo.find(item => item?.currencyName === 'USD');
        return (
            <View style={styles.container}>
                <Promotion
                    totalPrice={insuranceValue}
                    insurProductCode={areaId === 1 ? 'T1' : 'T2'}
                />
                <View style={styles.viewTable}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 10,
                        paddingVertical: 15,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        backgroundColor: Color,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>PHÍ BẢO HIỂM</Text>
                    </View>
                    <View style={{ backgroundColor: colorBackground, paddingTop: 16 }}>
                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>
                                    Số tiền bảo hiểm
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                {
                                    areaId === 1 ? (
                                        <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
                                            {insuranceValue > 0 ? `${formatVND(insuranceValue)}VNĐ` : '0VNĐ'}
                                        </Text>
                                    ) : (
                                        <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
                                            {insuranceValue > 0 ? `$${formatVND(insuranceValue)}` : '$0'}
                                        </Text>
                                    )
                                }
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: TxtColor, fontSize: 14 }}>
                                    Số người trong đoàn
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={{ color: TxtColor, fontSize: 14, textAlign: 'right' }}>
                                    {peopleNumber?.length > 0 ? formatVND(peopleNumber) : '0'}
                                </Text>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: TxtColor, fontSize: 14 }}>
                                    Số ngày du lịch
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={{ color: TxtColor, fontSize: 14, textAlign: 'right' }}>
                                    {longDays}
                                </Text>
                            </View>
                        </View>
                        {
                            areaId === 1 ? null : (
                                <>
                                    <View style={{ height: 1, borderWidth: 1, borderStyle: 'dotted', borderRadius: 1, flex: 1, borderColor: Color, marginBottom: 12, marginHorizontal: 10 }} />
                                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>Tổng phí</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>${originalFee > 0 ? formatVND(originalFee) : 0}</Text>
                                        </View>
                                    </View>
                                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>Tỷ giá</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>{formatVND(sell ? sell?.sell * 1000 : 0)}VNĐ</Text>
                                        </View>
                                    </View>
                                </>
                            )
                        }
                        <View style={{ borderBottomWidth: 1, flex: 1, borderColor: Color, marginBottom: 12, marginHorizontal: 10 }}></View>
                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 16 }}>
                            <View style={{ flex: 1.2 }}>
                                <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>Thanh toán (miễn VAT):</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>{formatVND(feeTravel)}VNĐ</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
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
        marginTop: 20,
        borderTopLeftRadius: 10, borderTopRightRadius: 10
    },
});

const mapStateToProps = state => {
    return {
        sellInfo: state.travelInsurance.sellInfo,
    };
};

export default connect(mapStateToProps)(TotalFee);

