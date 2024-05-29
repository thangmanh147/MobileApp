import React, { Component } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Color, URL, TxtColor, colorBackground, NewColor } from '../../config/System';
import { connect } from 'react-redux';
import axios from 'axios';
import { formatVND } from '../../components/Functions';
import Promotion from '../../components/promotion/Promotion';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';

class TotalFee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fee01Vat: '',
            fee01Status: props.dataFee?.fee01Status,
            fee02Vat: '',
            fee02Status: props.dataFee?.fee02Status,
            fee03Vat: '',
            fee03Status: props.dataFee?.fee03Status,
            feeVat: 0
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const { valueInsurMotor, duration, onSetFee } = this.props;
        const { fee01Status, fee02Status, fee03Status } = this.state;
        console.log('00000 :: ', valueInsurMotor)
        console.log('11111 :: ', duration)
        console.log('222 :: ', fee01Status, fee02Status, fee03Status)
        if (
            (valueInsurMotor > 0 && valueInsurMotor !== prevProps.valueInsurMotor) ||
            (duration?.value !== prevProps.duration?.value) ||
            (fee01Status !== prevState.fee01Status) ||
            (fee02Status !== prevState.fee02Status) ||
            (fee03Status !== prevState.fee03Status)
        ) {
            const packages = [
                fee01Status === 'active' ? '01' : '',
                fee02Status === 'active' ? '02' : '',
                fee03Status === 'active' ? '03' : '',
            ];
            let url = `${URL}/api/premium/v1/motor-premium/physical`;
            let body = {
                "insurance_value": valueInsurMotor,
                "packages": packages.toString(),
                "duration": duration?.value
            };
            console.log('99999 :: ', body)
            axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    if (res?.data?.code == '000') {
                        console.log('10101010 :: ', res?.data)
                        this.setState({
                            fee01Vat: res?.data?.fee01Vat,
                            fee02Vat: res?.data?.fee02Vat,
                            fee03Vat: res?.data?.fee03Vat,
                            feeVat: res?.data?.feeVat,
                        });
                        onSetFee({
                            fee01Vat: res?.data?.fee01Vat,
                            fee02Vat: res?.data?.fee02Vat,
                            fee03Vat: res?.data?.fee03Vat,
                            fee01Status,
                            fee02Status,
                            fee03Status,
                            feeVat: res?.data?.feeVat,
                            fee: res?.data?.fee,
                            vat: res?.data?.vat,
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            this.setState({});
        }
    }

    onSelectFeeType = (index, value) => {
        const { listFee } = this.state;
        listFee[index].status = value;
        this.setState({ listFee: listFee });
    };

    render() {
        const { fee01Status, fee02Status, fee03Status, fee01Vat, fee02Vat, fee03Vat, feeVat } = this.state;
        const arr = [
            { name: 'Cháy nổ', status: fee01Status, fee: fee01Vat },
            { name: 'Mất cắp, mất cướp\ntoàn bộ xe', status: fee02Status, fee: fee02Vat },
            { name: 'Do các nguyên nhân khác', status: fee03Status, fee: fee03Vat },
        ];
        const _arr = arr.filter(item => item.status === 'active');
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                    }}
                    onPress={() => {
                        this.setState({ fee01Status: fee01Status === 'active' ? '' : 'active' })
                    }}>
                    {
                        fee01Status === 'active'
                            ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                            : <IconBoxSvg width={20} height={20} color={NewColor} />
                    }
                    <Text
                        style={{
                            fontSize: 14,
                            marginLeft: 8,
                        }}
                    >
                        Cháy nổ
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                    }}
                    onPress={() => {
                        this.setState({ fee02Status: fee02Status === 'active' ? '' : 'active' })
                    }}>
                    {
                        fee02Status === 'active'
                            ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                            : <IconBoxSvg width={20} height={20} color={NewColor} />
                    }
                    <Text
                        style={{
                            fontSize: 14,
                            marginLeft: 8,
                        }}
                    >
                        Mất cắp, mất cướp toàn bộ xe
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                    }}
                    onPress={() => {
                        this.setState({ fee03Status: fee03Status === 'active' ? '' : 'active' })
                    }}>
                    {
                        fee03Status === 'active'
                            ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                            : <IconBoxSvg width={20} height={20} color={NewColor} />
                    }
                    <Text
                        style={{
                            fontSize: 14,
                            marginLeft: 8,
                        }}
                    >
                        Do các nguyên nhân khác
                    </Text>
                </TouchableOpacity>
                <Text
                        style={{
                            fontSize: 14,
                            color: TxtColor,
                            fontStyle: 'italic',
                        }}
                    >
                        Lưu ý: Bạn phải chọn tối thiểu 1 quyền lợi bảo hiểm
                    </Text>
                <Promotion
                    totalPrice={feeVat}
                    insurProductCode={'M3'}
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
                        {
                            _arr?.map((item, index) => (
                                <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                    <View style={{ flex: 2 }}>
                                        <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>
                                            {index + 1}.{item.name}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
                                            {formatVND(item.fee)}VNĐ
                                        </Text>
                                    </View>
                                </View>
                            ))
                        }
                        <View style={{ borderBottomWidth: 1, flex: 1, borderColor: Color, marginTop: 4, marginBottom: 16, marginHorizontal: 10 }}></View>
                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 16 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>Tổng phí (đã có VAT)</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>{formatVND(feeVat, '.')}VNĐ</Text>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 1, flex: 1, borderColor: Color, marginBottom: 16, marginHorizontal: 10 }}></View>
                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 16 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>Thanh toán</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>{formatVND(feeVat, '.')}VNĐ</Text>
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

