import React from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions, Linking, Alert} from 'react-native';
import {screen} from '../config/System';
import {Actions} from 'react-native-router-flux';
import {heightPercentageToDP, widthPercentageToDP} from "../config/ConfigResponsive";

const valueScaleWindowWidth = function (percent) {
    return (Dimensions.get('window').width / 100) * percent;
};

export default class HelpContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    sendEmail() {
        Linking.openURL('mailto:hotro@inso.vn?subject=Hỗ trợ INSO&body=Tôi cần hỗ trợ...')
    }
    sendCall(){
        Linking.openURL('tel:1900232425')
    }
    sendMessage(){
        Linking.openURL('fb-messenger://m.me/insovietnam')
    }
    onPress = (type) => {
        if (type === 'email') {
            this.sendEmail()
        }else if(type ==='call'){
            this.sendCall()
        }else if(type === 'message'){
            this.sendMessage()
        }else if(type === 'question'){
            Actions.FrequentlyQuestion()
        }
    }


    render() {
        const {data} = this.props;
        return (

            <TouchableOpacity onPress={() => this.onPress(data.type)}
                              style={{
                                  width: widthPercentageToDP('87.6'),//main content
                                  height: heightPercentageToDP('13.5'),
                                  backgroundColor: 'white',
                                  marginTop: data.marginTop,
                                  borderRadius: 10,
                                  flexDirection: 'row',
                                  shadowColor: '#999',
                                  shadowOffset: {
                                      width: 0,
                                      height: 3
                                  },
                                  shadowRadius: 10,
                                  shadowOpacity: 0.25,
                                  elevation: 5,
                              }}>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={data.icon} style={{width: data.width, height: data.height}}/>
                </View>
                <View style={{flex: 1.7,}}>
                    <View style={{
                        height: heightPercentageToDP('3.5'),

                    }}/>
                    <View style={{
                        height: heightPercentageToDP('10'),
                    }}>
                        <Text style={{
                            fontSize: valueScaleWindowWidth(3.9),
                            color: '#414042',
                            fontWeight: '600'
                        }}>{data.title}</Text>
                        <Text style={{
                            fontSize: valueScaleWindowWidth(3.4),
                            paddingTop: 2,
                            color: '#8D8C8D',
                        }}>{data.content}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

