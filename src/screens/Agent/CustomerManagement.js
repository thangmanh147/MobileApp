'use strict';

import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    ImageBackground,
    Dimensions,
    ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import Swipeable from 'react-native-swipeable-row';


const screen = Dimensions.get('window');


class CustomerManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwiping: false,
            chooseItem: 'redeemPoint',
            listContractUnregister: [
                {
                    name: 'Nguyễn Thị Hoài Thu',
                    phoneNumber: '0904656046',
                    dateRegister: '22/06/2020'
                }, {
                    name: 'Nguyễn Thị Hoài Thu',
                    phoneNumber: '0904656046',
                    dateRegister: '22/06/2020'
                }, {
                    name: 'Nguyễn Thị Hoài Thu',
                    phoneNumber: '0904656046',
                    dateRegister: '22/06/2020'
                }, {
                    name: 'Nguyễn Thị Hoài Thu',
                    phoneNumber: '0904656046',
                    dateRegister: '22/06/2020'
                }, {
                    name: 'Nguyễn Thị Hoài Thu',
                    phoneNumber: '0904656046',
                    dateRegister: '22/06/2020'
                }
            ],
            listContractUnpaid: [
                {
                    name: 'Nguyễn Thị Hoài Thu',
                    phoneNumber: '0904656046',
                    contractUnpaid: '5'
                }, {
                    name: 'Nguyễn Thị Hoài Thu',
                    phoneNumber: '0904656046',
                    contractUnpaid: '5'
                }, {
                    name: 'Nguyễn Thị Hoài Thu',
                    phoneNumber: '0904656046',
                    contractUnpaid: '5'
                }, {
                    name: 'Nguyễn Thị Hoài Thu',
                    phoneNumber: '0904656046',
                    contractUnpaid: '5'
                }, {
                    name: 'Nguyễn Thị Hoài Thu',
                    phoneNumber: '0904656046',
                    contractUnpaid: '5'
                }
            ],
            index: 0, //if index=1 g listvoucher, else default uservoucher
            routes: [
                { key: 'first', title: 'Chưa tạo hợp đồng' },
                { key: 'second', title: 'Chưa thanh toán' },
            ],
        };

    }

    onPressVoucher = () => {
        this.setState({
            chooseItem: 'voucher'
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <Nav showAddCustomer={true} isInfo={false} title={'QUẢN LÝ KHÁCH HÀNG'}
                    bottom={20}
                    onPress={() => Actions.pop()} />
                <View style={{ flex: 1, }}>

                    <View style={{
                        borderRadius: 10,
                        padding: 10,
                        flexDirection: 'row',
                        marginHorizontal: 20,
                        backgroundColor: '#ffffff',
                        height: 50,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,

                    }}>
                        <TouchableOpacity onPress={() => this.setState({ index: 0 })} style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRightWidth: 1,
                            borderColor: '#D9D9D9'
                        }}>
                            <Text
                                style={{ color: this.state.index == '0' ? Color : '#333', fontSize: 14 }}>Chưa
                                tạo hợp đồng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ index: 1 })}
                                          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: this.state.index == '1' ? Color : '#333', fontSize: 14 }}>Chưa
                                thanh toán</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchInput: {
        marginHorizontal: 40, paddingVertical: 10,
    },
    oval: {
        marginTop: '-40@ms',
        alignSelf: 'center',
        width: '105%',
        height: '30%',
        borderRadius: 100,
        backgroundColor: Color,

    },
    containNoBank: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '30@vs',
    },
    ic_bank: {
        height: '70@vs',
        width: '70@s',
    },
    txtNoBank: {
        fontSize: '14@s',
        color: '#A8A8A8',
        paddingVertical: '15@vs',
        textAlign: 'center',
    },
    ic_add_bank: {
        height: '16@vs',
        width: '16@s',
    },
    txtAddBank: {
        fontSize: '14@s',
        color: Color,
        paddingLeft: '5@s',
    },
    containAddBank: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: '20@vs',
    },
    containInformation: {
        marginVertical: 5,
        borderRadius: 15,
        paddingVertical: 10,
        paddingLeft: 15,
        flex: 1,
    },
    ic_arrow: {
        height: '12@vs',
        width: '12@s',
        marginRight: '10@s',
    },
    wrapperInfor: {
        backgroundColor: 'white',
        marginTop: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal: '15@s',
        shadowOpacity: Platform.OS === 'android' ? 0.6 : 0.2,
        shadowRadius: 10,
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 0,
        },
    },
    containView: {
        marginHorizontal: '15@s',
        marginTop: 5,
    },
    containSubInfor: {
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    containFullSubInfor: {
        backgroundColor: '#F4F4F4',
        marginHorizontal: '5@s',
        borderBottomLeftRadius: '10@ms',
        borderBottomRightRadius: '10@ms',
        paddingBottom: '10@ms'

    },
    txtText1: {
        flex: 1,
        lineHeight: 20,
        fontSize: 15,
        color: '#000000',
        fontWeight: '400',
    },
    txtText2: {
        marginHorizontal: '10@s',
    },
    txtTitle: {
        fontSize: '15@s',
        fontWeight: '500',
        textAlign: 'center',
        paddingVertical: '15@vs',
    },
    ic_search: {
        height: '19@vs',
        width: '19@s',
    },
    txtText: {
        color: '#333',
        fontSize: 14
    },
    txtTextHotline: {
        color: '#be3030',
        fontSize: '15@ms'
    },

    containSearch: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',

    },
});


import SimpleToast from 'react-native-simple-toast';
import Nav from '../../components/Nav';
import Input from '../../components/InputQuestion';
import FastImage from 'react-native-fast-image';
import { Color } from '../../config/System';

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default (CustomerManagement);
