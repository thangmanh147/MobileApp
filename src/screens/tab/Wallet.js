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
    TextInput, ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import FastImage from 'react-native-fast-image'

const screen = Dimensions.get('window');


class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRedeemPoints : [
                {
                    icon:require('../../icons/iconAgent/ic_with_drawal.png'),
                    content:'Rút hoa hồng',
                    timeRedeem:'13/10/2020 - 12:10',
                    status:'Thành công',
                    statusCode:'1',
                    money:'+200.000'
                },{
                    icon:require('../../icons/iconAgent/ic_plus_money.png'),
                    content:'Cộng hoa hồng cho HĐ số 3789',
                    timeRedeem:'15/10/2020 - 11:50',
                    status:'Thành công',
                    statusCode:'1',
                    money:'+200.000'
                },{
                    icon:require('../../icons/iconAgent/ic_with_drawal.png'),
                    content:'Rút hoa hồng',
                    timeRedeem:'19/10/2020 - 17:30',
                    status:'Chờ chuyển tiền',
                    statusCode:'2',
                    money:'-500.000'
                }
            ],
        }
    }
    renderListPointPlus () {
        return (
            <View>
                {
                    this.state.listRedeemPoints && this.state.listRedeemPoints.length > 0 ?
                        this.state.listRedeemPoints.map((item,index)=>{
                            return (
                                <View key={index} style={{flexDirection:'row',height:'auto',marginHorizontal:20,borderBottomWidth:1,borderColor:'#D9D9D9',paddingVertical:10}}>
                                    <View style={{flex:1,justifyContent:'center'}}>
                                        <FastImage source={item.icon}
                                               style={{height:25,width:25}}/>
                                    </View>
                                    <View style={{flex:9}}>
                                        <View style={{flex:1,justifyContent:'center',flexDirection:'row',paddingVertical:2.5}}>
                                            <View style={{flex:3,justifyContent:'center'}}>
                                                <Text style={{fontSize:14,fontWeight:'600'}}>{item.content}</Text>
                                            </View>
                                            <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                                                <Text style={{color:'#333',fontSize:14}}>{item.money}đ</Text>
                                            </View>

                                        </View>
                                        <View style={{flex:1,justifyContent:'center',flexDirection:'row',paddingVertical:2.5}}>
                                            <View style={{flex:1}}>
                                                <View  style={{flex:1}}>
                                                    <Text style={{fontSize:14,color:'#8D8C8D'}}>{item.timeRedeem}</Text>
                                                </View>

                                            </View>
                                            <View style={{flex:1,alignItems:'flex-end'}}>
                                                <Text style={{color:item.statusCode == '1' ? Color : '#FEB404',fontSize:14}}>{item.status}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }) : null
                }
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Nav show={false} isInfo={false} title={'VÍ CỦA TÔI'}
                    bottom={20}
                    onPress={() => Actions.tab()}/>
                <View style={{
                    borderRadius: 15,
                    padding: 10,
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    backgroundColor: '#ffffff',
                    height: 70,
                    marginTop:20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                }}>
                    <View  style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRightWidth: 1,
                        borderColor: '#D9D9D9'
                    }}>
                        <View>
                            <Text
                                style={{color: '#8D8C8D', fontSize: 12}}>Số dư khả dụng</Text>
                        </View>
                        <View>
                            <Text
                                style={{color: '#333', fontSize: 18,fontWeight:'bold'}}>10.000.000<Text style={{fontSize:12,fontWeight:'200'}}> vnđ</Text></Text>
                        </View>
                    </View>
                    <View  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <Text
                                style={{color: '#8D8C8D', fontSize: 12}}>Số dư tạm tính</Text>
                        </View>
                        <View>
                            <Text style={{color: '#333', fontSize: 18,fontWeight:'bold'}}>10.000.000<Text style={{fontSize:12,fontWeight:'200'}}> vnđ</Text></Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginHorizontal:20,paddingTop:20}}>
                    <TouchableOpacity onPress={()=>Actions.TransactionHistory()} style={{flex:1,height:90,backgroundColor:'#FEB404',borderRadius:10,paddingHorizontal:14,paddingTop:14,paddingBottom:10}}>
                        <FastImage source={require('../../icons/iconAgent/ic_history_wallet.png')}
                               style={{height:34,width:34}}/>
                        <View style={{justifyContent:'center',flex:1}}>
                            <Text style={{color:'#ffffff',fontWeight:'bold',fontSize:12.5}}>Lịch sử giao dịch</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{width:10}}/>
                    <TouchableOpacity onPress={()=> Actions.RequestWithDrawal()}style={{flex:1,height:90,backgroundColor:'#17A5A3',borderRadius:10,paddingHorizontal:14,paddingTop:14,paddingBottom:10}}>
                        <FastImage source={require('../../icons/iconAgent/ic_withdrawal.png')}
                               style={{height:34,width:36}}/>
                        <View style={{justifyContent:'center',flex:1}}>
                            <Text style={{color:'#ffffff',fontWeight:'bold',fontSize:RFValue(12.5)}}>Yêu cầu rút hoa hồng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{marginHorizontal: 30, paddingTop: 24,paddingBottom:12}}>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, color: '#414042', fontWeight: 'bold'}}>Giao dịch gần đây</Text>
                        </View>
                </View>
                <ScrollView>
                    {this.renderListPointPlus()}

                </ScrollView>
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
        flex: 0.5, marginHorizontal: 30
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
import Input from '../../components/Input';
import { Color } from '../../config/System';

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default (Wallet);
