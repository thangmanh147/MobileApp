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
import FastImage from 'react-native-fast-image'


const screen = Dimensions.get('window');


class NodataBank extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }


    render() {
        console.log(this.state.isSwiping)
        return (
            <View style={styles.container}>
                <Nav isInfo={false} title={'TÀI KHOẢN NGÂN HÀNG'}
                    bottom={20}
                    onPress={() => Actions.pop()}/>
                <View style={{marginTop: -30}}>
                    <View style={{
                        borderRadius: 15,
                        padding: 10,
                        marginHorizontal: 20,
                        backgroundColor: '#ffffff',
                        height: 200 ,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,

                    }}>
                        <View style={{justifyContent:'center', alignItems:'center',flex:1}}>
                            <Text style={{textAlign:'center',fontSize:14}}>Bạn chưa có tài khoản ngân hàng nhận hoa hồng</Text>
                            <Text style={{textAlign:'center',fontSize:14}}>Vui lòng thêm tài khoản ngân hàng tại đây</Text>
                        </View>
                        <TouchableOpacity onPress={()=>Actions.AddBank()} style={{flex:1}}>
                            <View style={{flex:0.9,alignItems:'center'}}>
                                <FastImage source={require('../../icons/iconAgent/ic_add_1.png')}
                                       style={{height:60,width:60,resize:'contain'}}/>
                            </View>
                            <View>
                                <Text style={{color:'#82D8D7',textAlign:'center'}}>Thêm ngân hàng</Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems:'center',paddingVertical:10}}>
                    <ImageBackground source={require('../../icons/iconAgent/no_data_bank.png')}
                                     style={{height:'80%',width:'100%'}}/>
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
        color: '#30BEBC',
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

export default (NodataBank);
