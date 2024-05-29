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
    TextInput, Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from '../../components/Button'
import { ScaledSheet } from 'react-native-size-matters';
const screen = Dimensions.get('window');


class OtpCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 30,
            mobile: '',
            password: '',
            mobile_device_token:'',
            color: '#82D8D7',
            disabled: true,
            code:''
        };

    }

    onPressConfirm = () => {
        if (this.state.code == '') {
            SimpleToast.show('Mã OTP chưa chính xác');
        }else {
            Actions.tab()
        }
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
    confirmCode =  () => {
        const {confirmResult} = this.props;
        const codeInput = this.state.code

        confirmResult.confirm(codeInput)
            .then((user) => {
                if(user){
                    Actions.tab()
                }else{
                    SimpleToast.show("Có lỗi xảy ra, mời bạn thử lại sau")
                }
            })
            .catch((error) => {
                console.log('error',error)
                this.setState({
                    loading:false
                })
                SimpleToast.show('Bạn đã nhập sai mã. Mời bạn nhập lại')
            })
    }
    componentWillUpdate() {
        if (this.state.timer === 1) {
            clearInterval(this.interval);
            this.state.color = Color
        }
    }

    componentDidUpdate() {
        if (this.state.timer === 1) {
            this.state.color = Color,
                this.state.disabled = false
        }
    }
    onChangeText = text => {
        this.setState({
            code: `${text}`,
        });
        return;
    }
    reSendCode = () => {
        const { phoneNumber } = this.props;
        console.log('phoneNumber',phoneNumber)
        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then((confirmResult) => {

                    console.log('confirmResult',confirmResult)
                    Actions.OtpCode({confirmResult:confirmResult,phoneNumber:phoneNumber})
                }
            )
            .catch((error) => {
                    console.log('error',error)
                    Alert.alert(JSON.stringify(error))
                }
            );
    };


    render() {
        const { mobile} = this.state;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.container}>
                    <StatusBar
                        backgroundColor={Color}
                        barStyle='light-content'
                    />
                    <View style={{paddingBottom:70,marginTop:-200}}>
                        <Image source={require('../../icons/iconAgent/ic_appAgent.png')}
                               style={{resize:'contain'}}/>
                    </View>
                    <View style={styles.containerView}>
                        <View>
                            <Text style={{color: '#333',fontWeight: 'bold' ,fontSize: 16,textAlign:'center',marginBottom:20,marginTop:-20 }}>Nhập mã xác thực</Text>
                        </View>
                        <View>
                            <Text style={{color: '#B3B2B3', fontSize: 14,paddingLeft:10}}>Mã OTP</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TextInput
                                style={styles.ctInput}
                                value={this.state.code}
                                keyboardType={'number-pad'}
                                onChangeText={text => this.onChangeText(text.trim())}
                            />
                            {
                                this.state.time > 0 ? <Text style={{flex:1}}>{this.state.time}s</Text> : null
                            }
                        </View>
                        <Button
                            onPress={()=>{this.confirmCode()}}
                            label='Xác nhận'
                            width={'100%'}
                        />
                        <TouchableOpacity onPress={()=>{this.reSendCode()}} style={{justifyContent:'center',alignItems:'center',paddingVertical:20}}>
                            <Text style={{color: Color}}>Gửi lại OTP</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', position: 'absolute', bottom: 45}}>
                        <TouchableOpacity  style={{flexDirection: 'row',flex:1.5,justifyContent:'center',alignItems:'center'}} onPress={()=>Actions.FrequentlyQuestion()}>
                            <Image source={require('../../icons/iconAgent/ic_phone.png')}
                                   style={styles.img}/>
                            <Text style={styles.txtText}>Gọi Hotline 1900 232425</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

}

const styles = ScaledSheet.create({
    ctInput: {
        padding:'10@ms',
        backgroundColor: '#f2f2f2',
        borderRadius: '5@ms',
        marginTop: '5@ms',
        height: '45@ms',
        flex:2
    },
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    ctRegister: {
        backgroundColor: '#f0f0f0',
        width: screen.width - '80@ms',
        height: '44@ms',
        borderBottomLeftRadius: '10@ms',
        borderBottomRightRadius: '10@ms',
        marginHorizontal: '5@ms',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerView:{
        padding: '40@ms',
        backgroundColor: '#fff',
        borderRadius: '10@ms',
        width: screen.width-50,
        shadowOpacity: 0.6,
        height:'230@ms',
        shadowRadius: 15,
        shadowColor: '#666',
        shadowOffset: { height: 0, width: 0 },
        justifyContent:'space-between'
    },
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: Color,
        position: 'relative',
        justifyContent:'center'
    },
    forgot: {
        color: '#333',
        textAlign: 'center',
        marginTop: '15@ms'
    },

    title: {

        color: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    },
    text: {
        color: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
        marginTop: 20,
        fontSize: 14,
        lineHeight: 25,

    },
    txtText: {
        color: 'white',
        fontSize: 14
    },
    img: {
        width: '15@ms',
        height: '15@ms',
        marginRight: '10@ms'
    }
});


import {connect} from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import { Color } from '../../config/System';

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default (OtpCode);
