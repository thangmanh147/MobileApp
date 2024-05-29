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
        const { feeHouse, feeInHouse, check } = this.props;
        const fee = check ? (feeHouse + feeInHouse) : feeHouse;
        return (
            <View style={styles.container}>
                <Promotion
                    totalPrice={fee}
                    insurProductCode={'H1'}
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
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>TÍNH PHÍ BẢO HIỂM</Text>
                    </View>
                    <View style={{ backgroundColor: colorBackground, paddingTop: 16 }}>
                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 6 }}>
                            <View style={{ flex: 0.6 }}>
                                <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>
                                    1. Phí bảo hiểm khung nhà
                                </Text>
                            </View>
                            <View style={{ flex: 0.4, alignItems: 'flex-end' }}>
                                <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
                                    {formatVND(Math.ceil(feeHouse / 1.1))}VNĐ
                                </Text>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                            <View style={{ flex: 1, paddingLeft: 15 }}>
                                <Text style={{ color: TxtColor, fontSize: 14 }}>
                                    VAT (10%)
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
                                    {formatVND(Math.ceil(feeHouse / 1.1 * 0.1))}VNĐ
                                </Text>
                            </View>
                        </View>
                        {
                            check ? (
                                <>
                                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 6 }}>
                                        <View style={{ flex: 0.6 }}>
                                            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>
                                                2. Phí BH tài sản bên trong
                                            </Text>
                                        </View>
                                        <View style={{ flex: 0.4, alignItems: 'flex-end' }}>
                                            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
                                                {formatVND(feeInHouse)}VNĐ
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                        <View style={{ flex: 1, paddingLeft: 15 }}>
                                            <Text style={{ color: TxtColor, fontSize: 14 }}>
                                                (đã có VAT)
                                            </Text>
                                        </View>
                                    </View>
                                </>
                            ) : null
                        }
                        <View style={{ borderBottomWidth: 1, flex: 1, borderColor: Color, marginTop: 4, marginBottom: 16, marginHorizontal: 10 }}></View>
                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 16 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>Thanh toán</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>{formatVND(fee)}VNĐ</Text>
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

export default TotalFee;

