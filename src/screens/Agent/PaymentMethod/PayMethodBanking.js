import React, { Component } from 'react';
import {
    Clipboard,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image, Linking, ScrollView,
    Animated,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { NewColor, TxtColor, Color } from '../../../config/System';
import InputSelect from '../../../components/buy/InputSelect';
import ModalBankings from './ModalBankings';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { renderVND } from '../../../components/Functions';
import { getDataBank } from '../actions/payAction';

class PayMethodBanking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalType: null,
            bankSelected: null,
        };
    }

    componentDidMount() {
        const { dataBank, getDataBank, insuranceProductId } = this.props;
        if (!dataBank || dataBank.length === 0) {
            getDataBank(insuranceProductId);
        }
    }

    setType = (data) => {
        const {onChangeMethod} = this.props;
        this.setState({ bankSelected: data });
        onChangeMethod('BANK_TRANSFER');
    };

    onCopy = (value) => {
        SimpleToast.show('Đã sao chép', 0.5);
        Clipboard.setString(value);
    };

    render() {
        const { orderPrice, dataBank, checkoutCode } = this.props;
        const { bankSelected, modalType } = this.state;
        return (
            <View style={styles.container}>
                <InputSelect
                    label={'Chọn ngân hàng *'}
                    value={bankSelected?.bankName}
                    openModal={() => this.setState({ modalType: true })}
                    baseColor={Color}
                />
                <ModalBankings
                    open={modalType}
                    onClosed={() => {
                        this.setState({ modalType: null });
                    }}
                    setType={data => this.setType(data)}
                    onOpened={() => this.setState({ modalType: true })}
                    items={dataBank}
                />
                {
                    bankSelected ? (
                        <>
                            {
                                checkoutCode && checkoutCode.length > 0 ? (
                                    <View style={styles.itemInfo}>
                                        <View style={{ flex: 1 }}><Text style={styles.titleLeft}>Mã đơn hàng:</Text></View>
                                        <View style={{ flex: 1 }}><Text style={[styles.titleRight, { fontWeight: 'bold' }]}>{checkoutCode}</Text></View>
                                    </View>
                                ) : null
                            }
                            <View style={styles.itemInfo}>
                                <View style={{ flex: 1 }}><Text style={styles.titleLeft}>Số tiền cần thanh toán:</Text></View>
                                <View style={{ flex: 1 }}><Text style={[styles.titleRight, { fontWeight: 'bold' }]}>{renderVND(orderPrice)}VNĐ</Text></View>
                            </View>
                            <View style={styles.itemInfo}>
                                <View style={{ flex: 1 }}><Text style={styles.titleLeft}>Số tài khoản:</Text></View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}
                                        onPress={() => this.onCopy(bankSelected.accountNumber)}
                                    >
                                        <Text style={[styles.titleRight]}>{bankSelected.accountNumber}</Text>
                                        <FastImage
                                            source={require('../assets/icon/Copy.png')}
                                            style={{ marginLeft: 5, width: 14, height: 18 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.itemInfo}>
                                <View style={{ flex: 1 }}><Text style={styles.titleLeft}>Tên chủ tài khoản:</Text></View>
                                <View style={{ flex: 1 }}><Text style={[styles.titleRight]}>{bankSelected.ownerName}</Text></View>
                            </View>
                            <View style={styles.itemInfo}>
                                <View style={{ flex: 1 }}><Text style={styles.titleLeft}>Chi nhánh:</Text></View>
                                <View style={{ flex: 1 }}><Text style={[styles.titleRight]}>{bankSelected.branchName}</Text></View>
                            </View>
                            <View style={[styles.itemInfo, {alignItems: 'center'}]}>
                                <View style={{ flex: 1 }}><Text style={styles.titleLeft}>Nội dung chuyển khoản:</Text></View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}
                                        onPress={() => this.onCopy(checkoutCode && checkoutCode.length > 0 ? `Thanh toan ${checkoutCode}` : 'Thanh toan')}
                                    >
                                        <Text style={[styles.titleRight]}>
                                            {
                                                checkoutCode && checkoutCode.length > 0 ? `Thanh toan ${checkoutCode}` : 'Thanh toan'
                                            }
                                        </Text>
                                        <FastImage
                                            source={require('../assets/icon/Copy.png')}
                                            style={{ marginLeft: 5, width: 14, height: 18 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    ) : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 16,
    },
    itemInfo: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 16,
    },
    titleLeft: {
        marginRight: 10,
        fontSize: 14,
        color: TxtColor
    },
    titleRight: {
        textAlign: 'right',
        fontSize: 14,
        color: TxtColor
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        dataBank: state.paymentMethod.dataBankInfo[ownProps.insuranceProductId],
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDataBank: (id) => dispatch(getDataBank(id)),
    };
};

PayMethodBanking.defaultProps = {
    dataBank: [],
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PayMethodBanking);
