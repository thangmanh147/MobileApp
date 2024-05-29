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
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import Swipeable from 'react-native-swipeable-row';


const screen = Dimensions.get('window');


class TransactionHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwiping:false,
            chooseItem: 'redeemPoint',
            listRedeemPoints : [
                {
                    icon:require('../../icons/iconAgent/ic_plus_money.png'),
                    content:'Cộng hoa hồng cho HĐ số 3789',
                    timeRedeem:'10/10/1010 - 10:10',
                    status:'Thành công',
                    statusCode:'1',
                    money:'+200000'
                },{
                    icon:require('../../icons/iconAgent/ic_plus_money.png'),
                    content:'Cộng hoa hồng cho HĐ số 3789',
                    timeRedeem:'10/10/1010 - 10:10',
                    status:'Thành công',
                    statusCode:'1',
                    money:'+200000'
                },{
                    icon:require('../../icons/iconAgent/ic_plus_money.png'),
                    content:'Cộng hoa hồng cho HĐ số 3789',
                    timeRedeem:'10/10/1010 - 10:10',
                    status:'Thành công',
                    statusCode:'1',
                    money:'+200000'
                },{
                    icon:require('../../icons/iconAgent/ic_plus_money.png'),
                    content:'Cộng hoa hồng cho HĐ số 3789',
                    timeRedeem:'10/10/1010 - 10:10',
                    status:'Thành công',
                    statusCode:'1',
                    money:'+200000'
                },{
                    icon:require('../../icons/iconAgent/ic_plus_money.png'),
                    content:'Cộng hoa hồng cho HĐ số 3789',
                    timeRedeem:'10/10/1010 - 10:10',
                    status:'Thành công',
                    statusCode:'1',
                    money:'+200000'
                }
            ],
            listMinusPoints : [
                {
                    icon:require('../../icons/iconAgent/ic_with_drawal.png'),
                    content:'Rút hoa hồng',
                    timeRedeem:'10/10/1010 - 10:10',
                    status:'Chờ chuyển tiền',
                    statusCode:'2',
                    money:'-200000'
                },{
                    icon:require('../../icons/iconAgent/ic_with_drawal.png'),
                    content:'Cộng hoa hồng cho HĐ số 3789',
                    timeRedeem:'10/10/1010 - 10:10',
                    status:'Chờ chuyển tiền',
                    statusCode:'2',
                    money:'-200000'
                },{
                    icon:require('../../icons/iconAgent/ic_with_drawal.png'),
                    content:'Rút hoa hồng',
                    timeRedeem:'10/10/1010 - 10:10',
                    status:'Chờ chuyển tiền',
                    statusCode:'2',
                    money:'-200000'
                },{
                    icon:require('../../icons/iconAgent/ic_with_drawal.png'),
                    content:'Rút hoa hồng',
                    timeRedeem:'10/10/1010 - 10:10',
                    status:'Chờ chuyển tiền',
                    statusCode:'2',
                    money:'-200000'
                },{
                    icon:require('../../icons/iconAgent/ic_with_drawal.png'),
                    content:'Rút hoa hồng',
                    timeRedeem:'10/10/1010 - 10:10',
                    status:'Chờ chuyển tiền',
                    statusCode:'2',
                    money:'-200000'
                }
            ],
            index:  0, //if index=1 g listvoucher, else default uservoucher
            routes: [
                {key: 'first', title: 'Cộng hoa hồng'},
                {key: 'second', title: 'Rút hoa hồng'},
            ],
        };

    }
    FirstRoute = () => (
        this.renderListPointPlus()
    )
    SecondRoute = () => (
        this.renderListPointMinus()
    );
    renderListPointMinus () {
        return (
            <ScrollView>
                {
                    this.state.listMinusPoints && this.state.listMinusPoints.length > 0 ?
                        this.state.listMinusPoints.map((item,index)=>{
                            return (
                                <View key={index} style={{flexDirection:'row',height:'auto',paddingVertical:10,marginHorizontal:20,borderBottomWidth:1,borderColor:'#D9D9D9'}}>
                                    <View style={{flex:1,justifyContent:'center'}}>
                                        <Image source={item.icon}
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
            </ScrollView>
        )
    }

    renderListPointPlus () {
        return (
            <ScrollView>
                {
                    this.state.listRedeemPoints && this.state.listRedeemPoints.length > 0 ?
                        this.state.listRedeemPoints.map((item,index)=>{
                            return (
                                <View key={index} style={{flexDirection:'row',height:'auto',paddingVertical:10,marginHorizontal:20,borderBottomWidth:1,borderColor:'#D9D9D9'}}>
                                    <View style={{flex:1,justifyContent:'center'}}>
                                        <Image source={item.icon}
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
            </ScrollView>
        )
    }
    _renderTabBar = props => (
        <View>
            <View style={{
                borderRadius: 10,
                paddingVertical:15,
                flexDirection: 'row',
                marginHorizontal: 24,
                backgroundColor: '#ffffff',
                height: 'auto',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,

            }}>
                <TouchableOpacity onPress={() => this.setState({index:0})} style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRightWidth: 1,
                    borderColor: '#D9D9D9'
                }}>
                    <Text
                        style={{color: this.state.index == '0' ? Color : '#333', fontSize: 14}}>Cộng hoa hồng</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({index:1})}
                                  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: this.state.index == '1' ? Color : '#333', fontSize: 14}}>Rút hoa hồng</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchInput}>
                <Input
                    style={{
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}
                    showFilter={true}
                    backgroundColor={'#FFFFFF'}
                    autoCapitalize={'none'}
                    height={50}
                    borderRadius={10}
                    placeholder={'Tìm kiếm'}
                    onChangeText={(txtSearch) => this.searchBenifit(txtSearch)}
                >
                </Input>
            </View>
        </View>

    )
    render() {
        console.log(this.state.isSwiping)
        return (
            <View style={styles.container}>
                    <View>
                        <Nav isInfo={false} title={'LỊCH SỬ GIAO DỊCH'}
                             onPress={() => Actions.pop()}/>
                    </View>
                <View style={{flex:1,marginTop: -30}}>

                    <TabView
                        navigationState={this.state}
                        renderScene={SceneMap({
                            first: this.FirstRoute,
                            second: this.SecondRoute,
                        })}
                        onIndexChange={index => this.setState({index})}
                        renderTabBar={this._renderTabBar}
                    />

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
        marginHorizontal: 24, paddingVertical: 12,
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

export default (TransactionHistory);
