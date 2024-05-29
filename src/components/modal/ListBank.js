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

const screen = Dimensions.get('window');


class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listContract: [
                {
                    icon: require('../../icons/iconAgent/ic_messenger.png'),
                    title: 'Bảo hiểm xe CARGO',
                    codeRequest: '55335',
                    status: 'Đợi bổ sung thông tin người mua',
                    statusCode: '1'
                },
                {
                    icon: require('../../icons/iconAgent/ic_messenger.png'),
                    title: 'Bảo hiểm trễ chuyến bay VJ123 ngày 25/05/2020',
                    codeRequest: '55335',
                    status: 'Đã duyệt hồ sơ - Chưa thanh toán',
                    statusCode: '2'
                },
            ],
            listFilter: [
                {
                    statusFilter:'Đợi bổ sung thông tin người mua'
                },
                {
                    statusFilter:'Đã duyệt hồ sơ - Chưa thanh toán'
                },
                {
                    statusFilter:'Đang đợi duyệt hồ sơ'
                },
                {
                    statusFilter:'Đang bổ sung hồ sơ'
                },
                {
                    statusFilter:'Yêu cầu bổ sung thông tin'
                },
            ],
            isOpen:null
        }
    }

    renderContract() {
        return (
            <View>
                {
                    this.state.listContract && this.state.listContract.length > 0 ?
                        this.state.listContract.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={{
                                    flexDirection: 'row',
                                    height: 'auto',
                                    marginHorizontal: 30,
                                    borderLeftWidth: 1.5,
                                    borderWidth: 1,
                                    borderLeftColor: Color,
                                    borderColor: '#D9D9D9',
                                    borderRadius: 10,
                                    marginVertical: 10,
                                    paddingVertical:10

                                }}>
                                    <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={item.icon}
                                               style={{height: 50, width: 50}}/>
                                    </View>
                                    <View style={{flex: 5, justifyContent: 'center'}}>
                                        <Text style={{fontSize: 14}}>{item.title}</Text>
                                        <Text style={{fontSize: 14,marginVertical: 5}}>Mã yêu cầu: {item.codeRequest}</Text>
                                        <Text style={{fontSize: 14,color:item.statusCode == '1' ? '#BE3030' : Color }}>{item.status}</Text>
                                    </View>
                                    <View style={{flex: 0.5, justifyContent: 'center'}}>
                                    </View>
                                </TouchableOpacity>
                            )
                        }) : null
                }
            </View>
        )
    }
    openModalFilter = () => {
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
        console.log('listContract',this.state.listContract)
        return (
            <View style={styles.container}>
                <Nav isInfo={false} title={'KHÁCH HÀNG'}
                    bottom={20}
                    onPress={() => Actions.pop()}/>
                <ModalBox
                    entry={'bottom'}
                    position={'bottom'}
                    swipeToClose={true}
                    isOpen={this.state.isOpen}
                    onClosed={()=>this.onCloseModal()}
                    style={styles.ctModal}
                >
                    <View style={{backgroundColor: '#fff',flex: 1, borderTopLeftRadius:20,borderTopRightRadius:20}}>
                        <View style={{backgroundColor:'#F4F5F6',flex:0.15, borderTopLeftRadius:20,borderTopRightRadius:20,justifyContent:'center',paddingHorizontal:30}}>
                            <Text style={{fontSize:14,fontWeight:'600'}}>Lọc theo trạng thái</Text>
                        </View>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{flex: 1,marginHorizontal: 10,marginTop:10}}>
                            <ScrollView keyboardShouldPersistTaps='always'>
                                {
                                    this.state.listFilter.map((item, index) => {
                                        return (
                                            <TouchableOpacity style={{flexDirection: 'row',borderBottomWidth: 1,borderTopWidth: 0, borderColor: '#efefef',alignItems: 'center', paddingVertical: 10, paddingLeft: 0, marginHorizontal: 40}} key={index}>
                                                <Text>{item.statusFilter}</Text>
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
    ctModal: {
        backgroundColor: '#fff',
        flex:0.5,
        borderTopLeftRadius:20,borderTopRightRadius:20
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
import ModalBox from "react-native-modalbox";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Color} from '../../config/System';

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default (Customer);
