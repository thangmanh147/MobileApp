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
import { ScaledSheet } from 'react-native-size-matters';
import IconFilterSvg from '../../config/images/icons/IconFilterSvg';
import IconPlusSvg from '../../config/images/icons/IconPlusSvg';
const screen = Dimensions.get('window');


class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseItem:'redeemPoint',
            listRedeemPoints : [
                {
                    content:'Điểm thưởng cho HĐ BH trách nhiệm dân sự số 3465',
                    timeRedeem:'10/10/1010 - 10:10'
                },{
                    content:'Điểm thưởng cho HĐ BH trách nhiệm dân sự số 3465',
                    timeRedeem:'10/10/1010 - 10:10'
                },{
                    content:'Điểm thưởng cho HĐ BH trách nhiệm dân sự số 3465',
                    timeRedeem:'10/10/1010 - 10:10'
                },{
                    content:'Điểm thưởng cho HĐ BH trách nhiệm dân sự số 3465',
                    timeRedeem:'10/10/1010 - 10:10'
                },{
                    content:'Điểm thưởng cho HĐ BH trách nhiệm dân sự số 3465',
                    timeRedeem:'10/10/1010 - 10:10'
                },
            ],
            listMinusPoints : [
                {
                    content:'Điểm thưởng cho HĐ BH trách nhiệm dân sự số 3465',
                    timeMinus:'10/10/1010 - 10:10',
                    status:'Chưa dùng',
                    status_code:'NOT_USED',
                    exp_date:'28'
                },{
                    content:'Điểm thưởng cho HĐ BH trách nhiệm dân sự số 3465',
                    timeMinus:'10/10/1010 - 10:10',
                    status:'Đã dùng',
                    status_code:'USED',
                    exp_date:'0'
                },{
                    content:'Điểm thưởng cho HĐ BH trách nhiệm dân sự số 3465',
                    timeMinus:'10/10/1010 - 10:10',
                    status:'Chưa dùng',
                    status_code:'NOT_USED',
                    exp_date:'03'
                },{
                    content:'Điểm thưởng cho HĐ BH trách nhiệm dân sự số 3465',
                    timeMinus:'10/10/1010 - 10:10',
                    status:'Hết hạn',
                    status_code:'OUT_DATE',
                    exp_date:'0'
                },{
                    content:'Điểm thưởng cho HĐ BH trách nhiệm dân sự số 3465',
                    timeMinus:'10/10/1010 - 10:10',
                    status:'Chưa dùng',
                    status_code:'NOT_USED',
                    exp_date:'28'
                },
            ],
            listVoucher : [
                {
                    content:'Voucher miễn phí 1 cốc trà đào cam sả size M',
                    title:'THE COFFEE HOUSE',
                    timeRedeem:'10/10/1010 - 10:10',
                    logo:require('../../icons/iconAgent/ic_logo_coffee_house.png'),
                    status:'28 ngày',
                    status_code:'NOT_USED'
                },{
                    content:'Voucher miễn phí 1 cốc trà đào cam sả size M',
                    title:'THE COFFEE HOUSE',
                    timeRedeem:'10/10/1010 - 10:10',
                    logo:require('../../icons/iconAgent/ic_logo_coffee_house.png'),
                    status:'Đã dùng',
                    status_code:'USED'
                },{
                    content:'Voucher miễn phí 1 cốc trà đào cam sả size M',
                    title:'THE COFFEE HOUSE',
                    timeRedeem:'10/10/1010 - 10:10',
                    logo:require('../../icons/iconAgent/ic_logo_coffee_house.png'),
                    status:'Hết hạn',
                    status_code:'OUT_DATE'
                },{
                    content:'Voucher miễn phí 1 cốc trà đào cam sả size M',
                    title:'THE COFFEE HOUSE',
                    timeRedeem:'10/10/1010 - 10:10',
                    logo:require('../../icons/iconAgent/ic_logo_coffee_house.png'),
                    status:'28 ngày',
                    status_code:'NOT_USED'
                },{
                    content:'Voucher miễn phí 1 cốc trà đào cam sả size M',
                    title:'THE COFFEE HOUSE',
                    timeRedeem:'10/10/1010 - 10:10',
                    logo:require('../../icons/iconAgent/ic_logo_coffee_house.png'),
                    status:'28 ngày',
                    status_code:'NOT_USED'
                },
            ],
            index:0,
            routes: [
                {key: 'first', title: 'Tích điểm'},
                {key: 'second', title: 'Đổi điểm'},
                {key: 'third', title: 'Voucher'},
            ],
        };

    }
    componentWillMount() {

    }

    FirstRoute = () => (
        this.renderListPointPlus()
    )
    SecondRoute = () => (
        this.renderListPointMinus()
    );
    ThirdRoute = () => (
        this.renderListVoucher()
    )
    onPressRedeem = () => {
        this.setState({
            index:'0'
        })
    }
    onPressMinus = () => {
        this.setState({
            index:'1'
        })
    }
    onPressVoucher = () => {
        this.setState({
            index:'2'
        })
    }
    _renderTabbar = props => (
        <View>
            <View style={{borderRadius:10,padding:10,flexDirection:'row',marginHorizontal:24,backgroundColor:'#ffffff',height:50,shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3}}>
                <TouchableOpacity onPress={()=>this.onPressRedeem()} style={{flex:1.5,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#D9D9D9'}}>
                    <Text style={{color:this.state.index == '0' ? Color :'#8D8C8D',fontSize:14}}>Tích điểm</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>this.onPressMinus()} style={{flex:1.5,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#D9D9D9'}}>
                    <Text style={{color:this.state.index == '1' ? Color :'#8D8C8D',fontSize:14}}>Đổi điểm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.onPressVoucher()} style={{flex:1.5,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:this.state.index == '2' ? Color :'#8D8C8D',fontSize:14}}>Voucher</Text>
                </TouchableOpacity>
            </View>
            {
                this.state.index =='0' ? null : <View style={{alignItems:'flex-end',paddingTop:15,paddingBottom: 5,paddingRight:24}}>
                    <TouchableOpacity > 
                        <IconFilterSvg width={20} height={20} />
                    </TouchableOpacity>

                </View>
            }
        </View>
    )
    renderListPointPlus () {
        return (
            <ScrollView style={{paddingVertical:10}}>
                {
                    this.state.listRedeemPoints && this.state.listRedeemPoints.length > 0 ?
                        this.state.listRedeemPoints.map((item,index)=>{
                            return (
                                <View key={index} style={{flexDirection:'row',height:'auto',paddingVertical:10,marginHorizontal:24,borderBottomWidth:1,borderColor:'#D9D9D9'}}>
                                    <View style={{flex:1,justifyContent:'center'}}>
                                        <IconPlusSvg width={25} height={25} />
                                    </View>
                                    <View style={{flex:6,justifyContent:'center',paddingLeft:5}}>
                                        <Text style={{color:'#414042'}}>{item.content}</Text>
                                        <Text style={{color:'#8D8C8D',paddingTop:5}}>{item.timeRedeem}</Text>
                                    </View>
                                    <View style={{flex:3,alignItems:'flex-end'}}>
                                        <View style={{flex:1,flexDirection:'row'}}>
                                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                                <Image source={require('../../icons/iconAgent/ic_diamond.png')}
                                                       style={{width:13,height:11}}/>
                                            </View>
                                            <View style={{justifyContent:'center',alignItems:'center',paddingLeft:5}}>
                                                <Text style={{color:'#414042',fontSize:14}}>+20 điểm</Text>
                                            </View>
                                        </View>
                                        <View style={{flex:1,paddingTop:5}}>
                                            <Text style={{color: Color ,fontSize:14}}>Thành công</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }) : null
                }
            </ScrollView>
        )
    }
    renderListPointMinus () {
        return (
            <ScrollView>
                {
                    this.state.listMinusPoints && this.state.listMinusPoints.length > 0 ?
                        this.state.listMinusPoints.map((item1,index1)=>{
                            return (
                                <View key={index1} style={{flexDirection:'row',height:'auto',paddingVertical:10,marginHorizontal:20,borderBottomWidth:1,borderColor:'#D9D9D9'}}>
                                    <View style={{flex:1,justifyContent:'center'}}>
                                        <Image source={require('../../icons/iconAgent/ic_minus.png')}
                                               style={{height:25,width:25}}/>
                                    </View>
                                    <View style={{flex:6,justifyContent:'center'}}>
                                        <Text style={{color:'#414042'}}>{item1.content}</Text>
                                        <Text style={{color:'#8D8C8D'}}>{item1.timeMinus}<Text>{this.state.exp_date == '0' ? null : <Text> - Còn {item1.exp_date} ngày</Text>  }</Text></Text>
                                    </View>
                                    <View style={{flex:2,alignItems:'flex-end'}}>
                                        <View style={{flex:1,flexDirection:'row'}}>
                                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                                <Image source={require('../../icons/iconAgent/ic_diamond.png')}
                                                       style={{width:13,height:11}}/>
                                            </View>
                                            <View style={{justifyContent:'center',alignItems:'center',paddingLeft:5}}>
                                                <Text style={{color:'#333',fontSize:14}}>-20 điểm</Text>
                                            </View>
                                        </View>
                                        <View style={{flex:1,}}>
                                            <Text style={{color:item1.status_code == 'NOT_USED' ? Color : item1.status_code == 'USED' ? '#BE3030' : '#B3B2B3' ,fontSize:14}}>{item1.status}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }) : null
                }
            </ScrollView>
        )
    }
    renderListVoucher () {
        return (
            <ScrollView>
                {
                    this.state.listVoucher && this.state.listVoucher.length > 0 ?
                        this.state.listVoucher.map((item,index)=>{
                            return (
                                <TouchableOpacity onPress={()=>Actions.Voucher()} key={index} style={{backgroundColor: item.status_code == 'NOT_USED' ? '#ffffff' : '#F6F5F6',shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,
                                    elevation: 3,flexDirection:'row',height:'auto',paddingVertical:15,marginHorizontal:20, borderRadius:10,marginVertical:10}}>
                                    <View style={{flex:2,justifyContent:'center',alignItems:'center',borderLeftWidth:1,borderColor:Color}}>
                                        <Image source={item.logo}
                                               style={{height:67,width:67,borderRadius:67/2}}/>
                                    </View>
                                    <View style={{flex:5,justifyContent:'center'}}>
                                        <Text style={{fontSize:16,fontWeight:'bold',marginBottom:5,color:'#414042'}}>{item.title}</Text>
                                        <Text style={{fontSize:14,color:'#414042'}}>{item.content}</Text>
                                        <Text style={{fontSize:14,color:'#8D8C8D',marginVertical:5}}>{item.timeRedeem}{item.status_code == 'NOT_USED' ? <Text style={{fontSize:14,color:'#BE3030'}}>{'- Còn'} {item.status}</Text> : <Text style={{fontSize:14,color:'#BE3030'}}> - {item.status}</Text>}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }) : null
                }
            </ScrollView>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Nav isInfo={false} title={'LỊCH SỬ'}
                    bottom={20}
                    onPress={() => Actions.pop()}/>
                <View style={{marginTop:-40,flex:1}}>
                    <TabView
                        navigationState={this.state}
                        renderScene={SceneMap({
                            first: this.FirstRoute,
                            second: this.SecondRoute,
                            third: this.ThirdRoute
                        })}
                        onIndexChange={index => this.setState({index})}
                        renderTabBar={this._renderTabbar}
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
        flex: 0.5,marginHorizontal:30
    },
    oval: {
        marginTop:'-40@ms',
        alignSelf:'center',
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
        borderBottomLeftRadius:'10@ms',
        borderBottomRightRadius:'10@ms',
        paddingBottom:'10@ms'

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
import {SceneMap, TabView} from "react-native-tab-view";
import { Color } from '../../config/System';

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default (History);
