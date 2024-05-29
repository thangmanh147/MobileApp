import React, { Component } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image, Linking, ScrollView,
    Animated,
} from 'react-native';
import { NewColor, TxtColor } from '../../../config/System';
import PhoneInput from './TextInputInfo/PhoneInput';
import EmailInput from './TextInputInfo/EmailInput';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import QRCode from 'react-native-qrcode-svg';
import IconCheckedBoxSvg from '../../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../../config/images/icons/IconBoxSvg';

class PayMethodSMSEmailQR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.items,
            codeSelected: '',
        };
    }

    onSelect = (code) => {
        const { onChangeMethod } = this.props;
        this.setState({ codeSelected: code });
        onChangeMethod(code);
    };

    render() {
        const { data, codeSelected } = this.state;
        const { phone, email, onChangePhone, onChangeEmail, checkoutUrl } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.container}>
                    {
                        data.map((obj, index) => (
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row'
                                }}
                                key={index}
                                onPress={() => this.onSelect(obj.code)}
                            >
                                {
                                    obj.code === codeSelected
                                        ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                        : <IconBoxSvg width={20} height={20} color={NewColor} />
                                }
                                <Text style={{ fontSize: 14, color: TxtColor, marginLeft: 8 }}>{obj.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 16, marginBottom: 5 }}>
                    {
                        codeSelected === 'sms' ? (
                            <Text style={{ fontSize: 14, color: TxtColor }}>
                                Link thanh toán hợp đồng bảo hiểm sẽ được gửi đến số điện thoại:
                            </Text>
                        ) : null
                    }
                    {
                        codeSelected === 'sms' ? (
                            <PhoneInput
                                value={phone}
                                onChange={onChangePhone}
                            />
                        ) : null
                    }
                    {
                        codeSelected === 'email' ? (
                            <Text style={{ fontSize: 14, color: TxtColor }}>
                                Link thanh toán hợp đồng bảo hiểm sẽ được gửi đến email:
                            </Text>
                        ) : null
                    }
                    {
                        codeSelected === 'email' ? (
                            <EmailInput
                                value={email}
                                onChange={onChangeEmail}
                            />
                        ) : null
                    }
                    {
                        codeSelected === 'qrcode' ? (
                            <Text style={{ fontSize: 14, color: TxtColor }}>
                                Scan QRcode để thanh toán đơn bảo hiểm
                            </Text>
                        ) : null
                    }
                    {
                        codeSelected === 'qrcode' ? (
                            <View style={{ flex: 1, alignItems: 'center', marginTop: 16, marginBottom: 8 }}>
                                {
                                    checkoutUrl && checkoutUrl.length > 0 ? (
                                        <QRCode
                                            size={150}
                                            value={checkoutUrl}
                                        />
                                    ) : null
                                }
                            </View>
                        ) : null
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingTop: 8,
        backgroundColor: '#FFFFFF',
    },
});

const mapStateToProps = state => {
    return {};
};

export default connect(
    mapStateToProps,
    null,
)(PayMethodSMSEmailQR);
