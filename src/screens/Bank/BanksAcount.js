'use strict';

import React, {Component} from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Nav from '../../components/Nav';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view/index';
import ModalBox from 'react-native-modalbox';
import Input from '../../components/InputQuestion';
import TwoButton from '../../components/TwoButton';
import {Actions} from 'react-native-router-flux';
import FastImage from 'react-native-fast-image'

class AddBank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwiping: false,
            chooseItem: 'redeemPoint',
            fullName: '',
            acountNumber: '',
            bankName: '',
            index:null,
            indexDeleteBank:null,
            listbank1:[],
            listBank: [
                {
                    bank_name: 'Techcombank',
                    bank_account: '12126308156328016',
                    customer_full_name: 'NGUYEN THI HOAI THU',
                    bank_logo: require('../../icons/iconAgent/ic_tech.png'),
                }, {
                    bank_name: 'BIDV',
                    bank_account: '12126308156328016',
                    customer_full_name: 'NGUYEN THI HOAI THU',
                    bank_logo: require('../../icons/iconAgent/ic_BIDV.png'),
                }, {
                    bank_name: 'VPBank',
                    bank_account: '12126308156328016',
                    customer_full_name: 'NGUYEN THI HOAI THU',
                    bank_logo: require('../../icons/iconAgent/ic_tech.png'),
                },
            ],
        };
    }

    onChooseBank = (item) => {
        const bankName = this.state.bankName;
        if (bankName !== item.bank_name) {
            this.setState({
                bankName: item.bank_name,
            });
        }
        // else if (bankName == item.bank_name) {
        //     this.setState({
        //         bankName: '',
        //     });
        // }
    };

    onChangeText(text) {
        this.setState({
            acountNumber: text,
        });
    }

    onChangeName(text) {
        this.setState({
            fullName: text,
        });
    }

    openModalDeleteBank = (index) => {
        this.setState({
            isOpen: true,
            indexDeleteBank: index
        });
    };
    onCloseModal = () => {
        this.setState({
            isOpen: null,
        });
    };
    deleteBank = () => {
        let listBank = this.state.listBank
        let deleteBank = listBank.splice(this.state.indexDeleteBank,1)
        this.setState({
            listbank:listBank,
            isOpen:null
        })
    }
    editBankAcountProfile = (item) => {
        Actions.EditBankAcount({data:item})
    }
    onPressDropdown = (index) => {
        if (this.state.index !== index) {
            this.setState({
                index : index
            })
        }else if (this.state.index == index) {
            this.setState({
                index : null
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                    <View >
                        <Nav isInfo={false} title={'QUẢN LÝ TÀI KHOẢN'}
                             onPress={() => Actions.pop()}/>
                    </View>
                <ScrollView style={{marginTop: -30}}>
                    {
                        this.state.listBank && this.state.listBank.length ?
                            this.state.listBank.map((item, index) => {
                                return (
                                    <View style={styles.blockBackground}>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{justifyContent: 'center'}}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: '#414042',
                                                    fontWeight: 'bold',
                                                }}>{item.bank_name}</Text>
                                            </View>
                                            <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
                                                <FastImage style={{height: 30, width: 66}}
                                                       source={item.bank_logo} resizeMode={'center'}/>
                                            </View>
                                        </View>
                                        <View style={{paddingTop: 15}}>
                                            <Text>121212311312312123321</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            borderBottomWidth: 1,
                                            borderColor: '#F6F5F6',
                                        }}>
                                            <View style={{justifyContent: 'center', paddingVertical: 10}}>
                                                <Text style={{fontSize: 16, color: '#414042', fontWeight: 'bold'}}>NGUYEN THI HOAI THU</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.onChooseBank(item)} style={{
                                                justifyContent: 'center',
                                                alignItems: 'flex-end',
                                                flex: 1,
                                                paddingVertical: 10,
                                            }}>
                                                <FastImage style={{height: 23, width: 23}}
                                                       source={this.state.bankName !== item.bank_name ? require('../../icons/iconAgent/single_select.png') : require('../../icons/iconAgent/single_select_active.png')}
                                                       resizeMode={'center'}/>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            this.state.index == index ? <View style={{flexDirection:'row',paddingVertical:10,alignItems:'center'}}>
                                                <TouchableOpacity onPress={() => this.openModalDeleteBank(index)} style={{flexDirection:'row',flex:1}}>
                                                    <View style={{justifyContent:'center'}}>
                                                        <FastImage style={{height:14,width:11}}
                                                               source={require('../../icons/iconAgent/ic_trash.png')}/>
                                                    </View>
                                                    <View style={{justifyContent:'center',paddingLeft:5}}>
                                                        <Text style={{color:'#BE3030',fontSize:14}}>Xóa</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.editBankAcountProfile(item)} style={{flexDirection:'row',justifyContent:'flex-end',flex:1}}>
                                                    <View style={{justifyContent:'center'}}>
                                                        <FastImage style={{height:15,width:15}}
                                                               source={require('../../icons/iconAgent/ic_edit_yellow.png')}/>
                                                    </View>
                                                    <View style={{justifyContent:'center',paddingLeft:5}}>
                                                        <Text style={{color:'#FEB404',fontSize:14}}>Sửa</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View> : null
                                        }
                                        <View>
                                            <TouchableOpacity onPress={() => this.onPressDropdown(index)} style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flex: 1,
                                                paddingVertical: 5,
                                            }}>
                                                <FastImage style={{height: 23, width: 23}}
                                                       source={this.state.index !== index ? require('../../icons/iconAgent/ic_double_arrow_down.png') : require('../../icons/iconAgent/ic_double_arrow_up.png')}
                                                       resizeMode={'center'}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            }) : null
                    }
                </ScrollView>
                <ModalBox
                    entry={'bottom'}
                    position={'bottom'}
                    swipeToClose={true}
                    isOpen={this.state.isOpen}
                    onClosed={()=>this.onCloseModal()}
                    style={styles.ctModal}
                >
                    <View style={{backgroundColor: '#fff',flex: 1, borderTopLeftRadius:20,borderTopRightRadius:20}}>
                        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                            <Text style={{color: '#414042',fontSize:16,fontWeight:'bold',textAlign:'center'}}>Bạn chắc chắn sử dụng ưu đãi này?</Text>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
                            <TwoButton
                                backgroundColor={'#BE3030'}
                                label={'KHÔNG XÓA'}
                                labelConfirm={'XÓA'}
                                onPressConfirm={()=>this.deleteBank()}
                                onPress={()=>this.setState({isOpen:false})}/>
                        </View>
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
        marginBottom: 24,
        borderRadius: '15@ms',
        padding: '16@ms',
        marginHorizontal: '24@ms',
        backgroundColor: '#ffffff',
        height: 'auto',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,

    },
    buttonAdd: {
        flex: 1,
        marginVertical: '15@ms',
        borderRadius: '10@ms',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctModal: {
        backgroundColor: '#fff',
        flex:0.25,
        borderTopLeftRadius:20,borderTopRightRadius:20
    },
    searchField: {
        backgroundColor: '#FFFFFF',
        flex: 0.15,
        borderTopLeftRadius: '20@ms',
        borderTopRightRadius: '20@ms',
        justifyContent: 'center',
        paddingHorizontal: '30@ms',
    },
});


const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default (AddBank);
