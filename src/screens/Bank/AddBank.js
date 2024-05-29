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
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ModalBox from 'react-native-modalbox';
import Input from '../../components/InputQuestion';
import FastImage from 'react-native-fast-image'

class AddBank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwiping:false,
            chooseItem: 'redeemPoint',
            fullName:'',
            acountNumber:'',
            bankName:'',
            listBank: [
                {
                    bank_name:'Techcombank',
                },{
                    bank_name:'BIDV',
                },{
                    bank_name:'VPBank',
                },{
                    bank_name:'Sacombank',
                },{
                    bank_name:'BIDV',
                }
            ]
        };
    }
    onChooseBank = (item) => {
        const bankName = this.state.bankName
        if ( bankName !== item.bank_name) {
            this.setState({
                bankName : item.bank_name,
                isOpen:null
            })
        }else if (bankName == item.bank_name) {
            this.setState({
                bankName : ''
            })
        }
    }
    onChangeText (text) {
        this.setState({
            acountNumber:text
        })
    }
    onChangeName (text) {
        this.setState({
            fullName:text
        })
    }
    openModalListBank = () => {
        this.setState({
            isOpen :true
        })
    }
    onCloseModal = () => {
        this.setState({
            isOpen:null
        })
    }
    render() {
        return (
            <View style={styles.container}>
                    <View >
                        <Nav isInfo={false} title={'QUẢN LÝ TÀI KHOẢN'}
                             onPress={() => Actions.pop()}/>
                    </View>
                <View style={{marginTop: -30}}>
                    <View style={styles.blockBackground}>
                        <TouchableOpacity onPress={()=> this.openModalListBank()} style={{flex:1,flexDirection:'row',borderBottomWidth:1,borderColor:'#D9D9D9',marginHorizontal:10}}>
                            <View style={{justifyContent:'center',flex:1.5}}>
                                <Text style={{fontSize:14,color:'#B3B2B3'}}>Ngân hàng</Text>
                            </View>
                            <View style={{justifyContent:'flex-end', flex: 1,alignItems:'center',flexDirection:'row'}}>
                                <Text style={{fontSize:14,color:'#414042',paddingRight:10}}>{this.state.bankName}</Text>
                                <FastImage source={require('../../icons/iconAgent/ic_arrow_right.png')}
                                       style={{height:15,width:8}}/></View>
                        </TouchableOpacity>
                        <View style={{flex:0.7,borderBottomWidth:1,borderColor:'#D9D9D9',marginHorizontal:10,flexDirection:'row'}}>
                            <View style={{flex:1,justifyContent:'center'}}>
                                <Text style={{fontSize:14,color:'#B3B2B3'}}>Số tài khoản</Text>
                            </View>
                            <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                <TextInput onChangeText={text => this.onChangeText(text)} style={{fontSize:14,width:'100%', paddingVertical: 10 ,textAlign: 'right'}} />
                            </View>
                        </View>
                        <View style={{flex:0.7,borderBottomWidth:1,borderColor:'#D9D9D9',marginHorizontal:10,flexDirection:'row'}}>
                            <View style={{flex:1,justifyContent:'center'}}>
                                <Text style={{fontSize:14,color:'#B3B2B3'}}>Họ và tên</Text>
                            </View>
                            <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                <TextInput onChangeText={text => this.onChangeName(text)} style={{fontSize:14,width:'100%',paddingVertical: 10 ,textAlign: 'right'}} />
                            </View>
                        </View>
                        <View style={{flex:1.3,paddingHorizontal:10}}>
                            <TouchableOpacity onPress={()=>Actions.DealSuccess()}
                                              disabled={this.state.moneyInput !== '' && this.state.fullName !== '' && this.state.bankName !== '' ? false : true}
                                              style={[styles.buttonAdd,{backgroundColor:this.state.moneyInput !== '' && this.state.fullName !== '' && this.state.bankName !== '' ? '#30BEBC' :'#d9d9d9',}]}>
                                <Text style={{fontSize:15,fontWeight:'bold',color:'#ffffff'}}>THÊM NGÂN HÀNG</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ModalBox
                    entry={'bottom'}
                    position={'bottom'}
                    swipeToClose={true}
                    isOpen={this.state.isOpen}
                    onClosed={()=>this.onCloseModal()}
                    style={styles.ctModal}
                >
                    <View style={{backgroundColor: '#fff',flex: 1, borderTopLeftRadius:20,borderTopRightRadius:20}}>
                        <View style={styles.searchField}>
                            <Input
                                showBorder={true}
                                // borderRadius={10}
                                backgroundColor={'#FFFFFF'}
                                autoCapitalize={'none'}
                                height={50}
                                placeholder={'Tìm kiếm'}
                                // onChangeText={(txtSearch) => this.searchBenifit(txtSearch)}
                            >
                            </Input>
                        </View>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{flex: 1,marginHorizontal: 10,marginTop:10}}>
                            <ScrollView keyboardShouldPersistTaps='always'>
                                {
                                    this.state.listBank.map((item, index) => {
                                        return (
                                            <TouchableOpacity onPress={()=>this.onChooseBank(item)} style={{flexDirection: 'row',borderBottomWidth: 1,borderTopWidth: 0, borderColor: '#efefef',alignItems: 'center', paddingVertical: 10, paddingLeft: 0, marginHorizontal: 24}} key={index}>
                                                <FastImage source={this.state.bankName !== item.bank_name ? require('../../icons/iconAgent/single_select.png') : require('../../icons/iconAgent/single_select_active.png')}
                                                        style={{height:15,width:15}}/>
                                                <Text style={{paddingLeft:10}}>{item.bank_name}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        </KeyboardAwareScrollView>
                    </View>
                </ModalBox>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    blockBackground: {
        borderRadius: '15@ms',
        padding: '10@ms',
        marginHorizontal: '24@ms',
        backgroundColor: '#ffffff',
        height: '250@ms' ,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,

    },
    buttonAdd: {
        flex:1,
        marginVertical:'15@ms',
        borderRadius:'10@ms',
        justifyContent:'center',
        alignItems:'center'
    },
    ctModal: {
        backgroundColor: '#fff',
        flex:0.7,
        borderTopLeftRadius:20,borderTopRightRadius:20
    },
    searchField : {
        backgroundColor:'#FFFFFF',
        flex:0.15,
        borderTopLeftRadius:'20@ms',borderTopRightRadius:'20@ms',justifyContent:'center',paddingHorizontal:'30@ms'
    }
});




const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default (AddBank);
