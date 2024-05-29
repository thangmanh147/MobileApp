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
import OTPInputView from '@twotalltotems/react-native-otp-input'


import Swipeable from 'react-native-swipeable-row';


const screen = Dimensions.get('window');


class OTPconfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwiping:false,
            chooseItem: 'redeemPoint',
            timer:10

        };

    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState((prevState) => ({timer: prevState.timer - 1})),
            1000
        );

    }

    componentWillUpdate() {
        if (this.state.timer === 0) {
            clearInterval(this.interval);
            this.setState({
                timer:10
            })
            this.componentDidMount()
        }

    }

    componentDidUpdate() {
        if (this.state.timer === 1) {
            this.state.color = Color,
                this.state.disabled = false
        }
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


    onChangeText (text) {
        this.setState({
            moneyInput:text
        })
    }
    render() {
        console.log(this.state.isSwiping)
        return (
            <View style={styles.container}>
                <Nav isInfo={false} title={'OTP XÁC NHẬN CHỤP ẢNH SAU'}
                    bottom={20}
                    onPress={() => Actions.pop()}/>
                <View style={{
                    borderRadius: 15,
                    padding: 10,
                    marginHorizontal: 20,
                    backgroundColor: '#ffffff',
                    height: 220,
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
                    <View style={{padding:10}}>
                        <Text style={{fontSize:14}}>Điền mã OTP</Text>
                    </View>
                    <View style={{paddingLeft:10}}>
                        <Text style={{fontSize:14,textAlign:'left'}}>Mã OTP đã được gửi về số điện thoại của bạn.{'\n'}Vui lòng nhập mã để xác nhận bỏ qua phần chụp ảnh.</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'flex-end',flex:1,paddingLeft:10}}>
                        <View style={{flex:6}}>
                            <OTPInputView
                                style={{width: '100%'}}
                                pinCount={6}
                                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                // onCodeChanged = {code => { this.setState({code})}}
                                autoFocusOnLoad
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                onCodeFilled = {(code => {
                                    console.log(`Code is ${code}, you are good to go!`)
                                })}
                            />
                        </View>
                        <View style={{flex:1,paddingHorizontal:10,paddingBottom: 15}}>
                            <Text style={{fontSize:14,color:'#D9D9D9'}}>{this.state.timer}s</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                        <Text>Không nhận được OTP.<Text style={{color:Color}}> Gửi lại</Text></Text>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems:'center',paddingTop:20}}>
                    <Button
                        label={'GỬI DUYỆT'}
                        borderRadius={10}
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
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        color:'#414042',
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});


import SimpleToast from 'react-native-simple-toast';
import Nav from '../../components/Nav';
import Input from '../../components/InputQuestion';
import Button from '../../components/Button';
import { Color } from '../../config/System';

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default (OTPconfirm);
