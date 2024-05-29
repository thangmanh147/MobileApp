'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    Linking,
    ImageBackground,
    AsyncStorage,
    SafeAreaView,
    Share,
    StatusBar, Keyboard, BackHandler,
    TouchableWithoutFeedback,
    Dimensions,
    TextInput, ScrollView, TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters';

import Swipeable from 'react-native-swipeable-row';


const screen = Dimensions.get('window');


class DealSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwiping:false,
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
            moneyInput:''
        };

    }

    onPressRedeem = () => {
        this.setState({
            chooseItem: 'redeemPoint'
        })
    }
    onPressMinus = () => {
        this.setState({
            chooseItem: 'minusPoint'
        })
    }
    onPressVoucher = () => {
        this.setState({
            chooseItem: 'voucher'
        })
    }
    onSwipeStart = (index) => {

        this.setState({isSwiping: !this.state.isSwiping})
    }
    onSwipeRelease = () => {
        this.setState({isSwiping: false})
    }

    renderListContractUnregister() {
        const rightButtons = [
            <View>
                <View style={{flexDirection: 'row',height: 70,paddingRight: 210}}>
                    <TouchableOpacity style={{backgroundColor: Color, borderRightWidth: 1,borderColor:'#ffffff',flex:1,alignItems:'center',justifyContent:'center'}}>
                        <FastImage style={{height: 50, width: 50,alignSelf: 'center'}} source={require('../../icons/iconAgent/ic_phoneSupport.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: Color, borderRightWidth: 1,borderColor:'#ffffff',flex:1,alignItems:'center',justifyContent:'center'}}>
                        <FastImage style={{height: 30, width: 35,}} source={require('../../icons/iconAgent/ic_mess.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: Color, borderRightWidth: 1,borderColor:'#ffffff',flex:1,alignItems:'center',justifyContent:'center'}}>
                        <FastImage style={{height: 30, width: 20,alignSelf: 'center'}} source={require('../../icons/iconAgent/ic_delete.png')}/>
                    </TouchableOpacity>
                </View>

            </View>
        ]
        return (
            <View>
                {
                    this.state.listContractUnregister && this.state.listContractUnregister.length > 0 ?
                        this.state.listContractUnregister.map((item, index) => {
                            console.log(index)
                            return (
                                <Swipeable onSwipeStart={()=>this.onSwipeStart()} rightButtonWidth={200} rightButtons={rightButtons} key={index} >
                                    <View  style={{
                                        flexDirection: 'row',
                                        height: 70,
                                        marginHorizontal: 40,
                                        borderBottomWidth: 1,
                                        borderColor: '#D9D9D9',
                                        marginVertical: 5
                                    }}>
                                        <TouchableOpacity style={{flex: 6, justifyContent: 'center'}}>
                                            <Text style={{fontSize: 14}}>{index + 1}. {item.name}</Text>
                                            <Text style={{
                                                fontSize: 14,
                                                marginVertical: 3,
                                                color: '#676667'
                                            }}>SĐT: {item.phoneNumber}</Text>
                                            <Text style={{fontSize: 14, color: '#8D8C8D'}}>Ngày đăng
                                                ký: {item.dateRegister}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Swipeable>

                            )
                        }) : null
                }
            </View>
        )
    }

    renderListContractUnpaid() {
        const rightButtons = [
            <View>
                <View style={{flexDirection: 'row',height: 70,paddingRight: 210}}>
                    <TouchableOpacity style={{backgroundColor: Color, borderRightWidth: 1,borderColor:'#ffffff',flex:1,alignItems:'center',justifyContent:'center'}}>
                        <FastImage style={{height: 50, width: 50,alignSelf: 'center'}} source={require('../../icons/iconAgent/ic_phoneSupport.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: Color, borderRightWidth: 1,borderColor:'#ffffff',flex:1,alignItems:'center',justifyContent:'center'}}>
                        <FastImage style={{height: 30, width: 35,}} source={require('../../icons/iconAgent/ic_mess.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: Color, borderRightWidth: 1,borderColor:'#ffffff',flex:1,alignItems:'center',justifyContent:'center'}}>
                        <FastImage style={{height: 30, width: 20,alignSelf: 'center'}} source={require('../../icons/iconAgent/ic_delete.png')}/>
                    </TouchableOpacity>
                </View>

            </View>
        ]
        return (
            <View>
                {
                    this.state.listContractUnpaid && this.state.listContractUnpaid.length > 0 ?
                        this.state.listContractUnpaid.map((item, index) => {
                            console.log(index)
                            return (
                                <Swipeable onSwipeStart={()=>this.onSwipeStart()} rightButtonWidth={200} rightButtons={rightButtons} key={index} >
                                    <View  style={{
                                        flexDirection: 'row',
                                        height: 70,
                                        marginHorizontal: 40,
                                        borderBottomWidth: 1,
                                        borderColor: '#D9D9D9',
                                        marginVertical: 5
                                    }}>
                                        <TouchableOpacity style={{flex: 6, justifyContent: 'center'}}>
                                            <Text style={{fontSize: 14}}>{index + 1}. {item.name}</Text>
                                            <Text style={{
                                                fontSize: 14,
                                                marginVertical: 3,
                                                color: '#676667'
                                            }}>SĐT: {item.phoneNumber}</Text>
                                            <Text style={{fontSize: 14, color: '#BE3030'}}>HĐ chưa thanh toán: {item.contractUnpaid}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Swipeable>

                            )
                        }) : null
                }
            </View>
        )
    }

    onChangeText (text) {
        this.setState({
            moneyInput:text
        })
    }
    render() {
        console.log(this.state.isSwiping)
        return (
            <View style={styles.container}>
                <Nav isInfo={false} title={'GIAO DỊCH HOÀN TẤT'}
                    bottom={20}
                    onPress={() => Actions.tab()}/>
                <View style={{
                    borderRadius: 15,
                    padding: 10,
                    marginHorizontal: 30,
                    backgroundColor: '#ffffff',
                    height: 230 ,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                    marginTop: -30
                }}>
                    <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                        <FastImage source={require('../../icons/iconAgent/ic_success.png')}
                               style={{width:70,height:70}}/>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Text style={{fontSize:14,color:'#414042',textAlign:'center'}}>Bạn đã gửi yêu cầu rút hoa hồng thành công</Text>
                        <Text style={{fontSize:14,color:'#414042',textAlign:'center'}}>Yêu cầu của bạn sẽ được xử lý trong vòng 24h</Text>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Text style={{fontSize:14,color:'#414042',textAlign:'center'}}>Nếu có bất cứ vấn đề gì thắc mắc, bạn vui</Text>
                        <Text style={{fontSize:14,color:'#414042',textAlign:'center'}}>lòng liên hệ<Text style={{color:'#BE3030'}}> Hotline 1900 232425</Text></Text>
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
        flex: 0.5, marginHorizontal: 40, paddingVertical: 10,
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
import { Color } from '../../config/System';

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default (DealSuccess);
