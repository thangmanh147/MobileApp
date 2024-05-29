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
import NameInput from './TextInputInfo/NameInput';
import AddressInput from './TextInputInfo/AddressInput';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import { renderVND } from '../../../components/Functions';
import IconCheckedBoxSvg from '../../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../../config/images/icons/IconBoxSvg';

class PayMethodCash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.items,
            codeSelected: '',
        };
      }

    onSelect = (code) => {
        const {onChangeMethod} = this.props;
        this.setState({codeSelected: code});
        onChangeMethod(code);
    };
    
    render() {
        const {data, codeSelected} = this.state;
        const {fullName, phone, address, orderPrice, onChangeFullName, onChangePhone, onChangeAddress} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={styles.container}>
                    {
                        data.map((obj, index) => (
                            <TouchableOpacity 
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    alignItems: 'center'
                                }}
                                key={index}
                                onPress={() => this.onSelect(obj.code)}
                            >
                                {
                                    codeSelected === obj.code
                                        ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                        : <IconBoxSvg width={20} height={20} color={NewColor} />
                                }
                                <Text style={{flex: 1, fontSize: 14, color: TxtColor, marginLeft: 8}}>{obj.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <View style={{marginHorizontal: 20, marginTop: 16, marginBottom: 5}}>
                    {
                        codeSelected === 'CP' ? (
                            <Text style={{fontSize: 14, color: TxtColor, marginBottom: 10}}>
                                Bạn đã nhận đầy đủ số tiền thanh toán cho hợp đồng bảo hiểm của khách hàng:
                                <Text style={{fontWeight: 'bold'}}> {renderVND(orderPrice)}VNĐ</Text>
                            </Text>
                        ) : null
                    }
                    {
                        codeSelected === 'COD' ? (
                            <>
                                <NameInput
                                    value={fullName}
                                    onChange={onChangeFullName}
                                />
                                <PhoneInput
                                    value={phone}
                                    onChange={onChangePhone}
                                />
                                <AddressInput
                                    value={address}
                                    onChange={onChangeAddress}
                                />
                            </>
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
)(PayMethodCash);
