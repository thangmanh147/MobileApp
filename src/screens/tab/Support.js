import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    PixelRatio,
    Button,
    ScrollView,
    ImageBackground,
    Linking,
} from 'react-native';
import HelpContent from "../../components/HelpContent"
import Nav from "../../components/Nav";
import {Actions} from "react-native-router-flux";
import {Color, screen} from '../../config/System';
import Modal from 'react-native-modalbox';
import IconSupportSvg from '../../config/images/tabbar/IconSupportSvg';

const valueScaleWindowWidth = function (percent) {
    return (Dimensions.get('window').width / 100) * percent;
};
const widthPercentageToDP = widthPercent => {
    const screenWidth = Dimensions.get('window').width;
    // Convert string input to decimal number
    const elemWidth = parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};
const heightPercentageToDP = heightPercent => {
    const screenHeight = Dimensions.get('window').height;
    // Convert string input to decimal number
    const elemHeight = parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};
const listHelper = [
    // {
    //     icon: require('../../icons/iconAgent/ic_messenger.png'),
    //     height:valueScaleWindowWidth(14),
    //     width:valueScaleWindowWidth(14),
    //     title: 'Chat với CSKH',
    //     content:'Bạn sẽ chat trực tiếp với đội\nCSKH của chúng tôi',
    //     type: 'message',
    //     marginTop:heightPercentageToDP('-10'),

    // },
    // {
    //     icon: require('../../icons/iconAgent/ic_phoneSupport.png'),
    //     height:valueScaleWindowWidth(14),
    //     width:valueScaleWindowWidth(14),
    //     title: 'Gọi điện hỗ trợ',
    //     content:'24/24 chúng tôi sẽ trả lời và\ngiúp đỡ bạn',
    //     type: 'call',
    //     marginTop:20,
    // },
    // {
    //     icon: require('../../icons/iconAgent/ic_email.png'),
    //     height:valueScaleWindowWidth(14),
    //     width:valueScaleWindowWidth(14),
    //     title: 'Gửi email',
    //     content:'Bạn cần hỗ trợ bằng email,\nChúng tôi luôn sẵn sàng.',
    //     type: 'email',
    //     marginTop:20,

    // },
    {
        icon: <IconSupportSvg height={valueScaleWindowWidth(14)} width={valueScaleWindowWidth(14)} color={Color} />,
        title: 'Câu hỏi thường gặp',
        content:'Tất cả những câu hỏi và trả lời\nđã được nhân viên hỗ trợ',
        type: 'question',
        marginTop:20,

    },

]
class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            titleModal:'',
            titleAction:'',
            titleActionClose:'',
            typeSupport:''
        };
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
    onPress = () => {
        let type = this.state.typeSupport
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
    onChooseSupport = (item) => {
        if (item.type === 'email') {
            this.setState({
                open: true,
                titleModal:'iAGENT muốn mở\n"Email"',
                titleAction:'Mở',
                titleActionClose:'Hủy',
                typeSupport:item.type
            })
        }else if(item.type ==='call'){
            this.setState({
                open: true,
                titleModal:'1900 232425',
                titleAction:'Gọi',
                titleActionClose:'Hủy',
                typeSupport:item.type
            })
        }else if(item.type === 'message'){
            this.setState({
                open: true,
                titleModal:'iAGENT muốn mở\n"Messager"',
                titleAction:'Mở',
                titleActionClose:'Hủy',
                typeSupport:item.type
            })
        }else if(item.type === 'question'){
            Actions.FrequentlyQuestion()
        }
    }
    render() {
        return (
            <View style={{flex: 1,
                backgroundColor:'#FFFFFF',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,}}>
                <View style={{}}>
                        <Nav show={false} isInfo={false} title={'HỖ TRỢ'}/>
                    </View>
                <View style={{
                    width: widthPercentageToDP('100'),// raw main content
                    height: heightPercentageToDP('55'),
                    // marginTop:heightPercentageToDP('6'),

                    flexDirection:'row'
                }}>
                    <View style={{
                        width: widthPercentageToDP('6.2'),//padding Left header
                        height: heightPercentageToDP('64'),

                    }}/>
                    <View style={{
                        width: widthPercentageToDP('87.6'),//main content
                        height: heightPercentageToDP('50'),
                    }}>
                        {
                            listHelper.map((item,index)=>{
                                return(
                                <TouchableOpacity 
                                    onPress={() => this.onChooseSupport(item)}
                                    style={{
                                        width: widthPercentageToDP('87.6'),//main content
                                        height: heightPercentageToDP('13.5'),
                                        backgroundColor: 'white',
                                        marginTop: item.marginTop,
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
                                        {item.icon}
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
                                            }}>{item.title}</Text>
                                            <Text style={{
                                                fontSize: valueScaleWindowWidth(3.4),
                                                paddingTop: 2,
                                                color: '#8D8C8D',
                                            }}>{item.content}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>)
                            })
                        }
                    </View>
                </View>
                <View style={{
                 flex:1,
                    marginTop:30,
                    marginBottom:20,
                    flexDirection:'row'
                }}>
                    <View style={{flex:7}}></View>
                    {/*<TouchableOpacity onPress={()=>Actions.FakeChat()} style={{flex:3,alignItems:'center'}}>*/}
                    {/*    <Image*/}
                    {/*        style={{height: 90, width: 90}}*/}
                    {/*        resizeMode={'contain'}*/}
                    {/*        source={require('../../icons/iconAgent/chat_bot.png')}*/}
                    {/*    />*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <Modal isOpen={this.state.open}
                       entry={'top'}
                       onClosed={()=>this.setState({open:false})}
                       style={{  width: screen.width - 100,height:'20%', justifyContent: 'center', alignItems: 'center',borderRadius:20}}>
                        <View style={{flex:2,justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontWeight:'500',fontSize:16,textAlign: 'center'}}>{this.state.titleModal}</Text>
                        </View>
                        <View style={{flex:1.2,flexDirection:'row',borderTopWidth:1,borderColor:'#D9D9D9',}}>
                            <TouchableOpacity onPress={()=>this.setState({open:false})} style={{flex:1,borderRightWidth:1,justifyContent: 'center', alignItems: 'center',borderColor:'#D9D9D9'}}>
                                <Text style={{fontWeight:'normal',fontSize:16,color: Color,textAlign: 'center'}}>{this.state.titleActionClose}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.onPress(this.state.typeSupport)} style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontWeight:'bold',fontSize:16,color: Color,textAlign: 'center'}}>{this.state.titleAction}</Text>
                            </TouchableOpacity>
                        </View>
                </Modal>

            </View>
        );
    }
}

export default (Support);
