import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList, TouchableOpacity, Dimensions, Image, RefreshControl, BackHandler
} from 'react-native';

export default class Notify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            read: [],
            refreshing: false,
            rowID: null,
            activeRowKey:null,
            listNoti:[]
            // listNoti: [
            //     {
            //         icon:require('../../icons/iconAgent/ic_agent.png'),
            //         content:'Hợp đồng 1234 đã quá hạn thanh toán 15 ngày',
            //         time:'10:00 - 23/01/2021',
            //         title:'Trạng thái thanh toán',
            //         content1:'Quá hạn thanh toán'
            //     },{
            //         icon:require('../../icons/iconAgent/ic_agent.png'),
            //         content:'Có hai khách hàng vừa được chia sẻ với bạn',
            //         time:'15:00 - 26/01/2021',
            //         title:'Thông tin',
            //         content1:'Thông tin khách hàng'
            //     },{
            //         icon:require('../../icons/iconAgent/ic_agent.png'),
            //         content:'Hợp đồng số 7890 còn 7 ngày sẽ hết hạn',
            //         time:'12:00 - 27/01/2021',
            //         title:'Trạng thái hợp đồng',
            //         content1:'Hợp đồng sắp hết hạn'
            //     },
            // ]
        };
    }


    render() {
        const {data, refreshing} = this.state;
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View>
                    <Nav show={true} isInfo={false} title={'THÔNG BÁO'}
                         onPress={() => Actions.pop()}/>
                </View>

                <ScrollView >
                    {
                        this.state.listNoti && this.state.listNoti.length > 0 ?
                            this.state.listNoti.map((item, index) => {
                                return (
                                    <View key={index} style={{
                                        flexDirection: 'row',
                                        height: 'auto',
                                        borderColor: '#D9D9D9',
                                        paddingVertical: 10,
                                        backgroundColor: '#FFFFFF',


                                    }}>
                                        <View style={{
                                            alignItems:'center',
                                            flex:0.7
                                        }}>
                                            <Image source={item.icon}
                                                   style={{height: 30, width: 30, resizeMode: 'contain',borderWidth:0.5,borderColor:'#e9e8e9',borderRadius:15,backgroundColor:'#30bebc'}}/>
                                        </View>
                                        <View style={{justifyContent: 'center',flex:5,borderBottomWidth:0.5,borderColor:'#e9e8e9'}}>
                                            <View style={{paddingBottom:5}}>
                                                <View style={{justifyContent: 'center', flex: 1}}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        color: '#414042',
                                                        fontWeight: '600',
                                                    }}>{item.title}</Text>
                                                </View>
                                            </View>
                                            <View style={{flexDirection: 'row', paddingBottom: 3}}>
                                                <View style={{justifyContent: 'center', flex: 1}}>
                                                    <Text style={{fontSize: 14, color: '#333'}}>{item.content1}</Text>
                                                </View>
                                            </View>
                                            <View style={{flexDirection: 'row', paddingBottom: 3}}>
                                                <View style={{justifyContent: 'center', flex: 1}}>
                                                    <Text style={{fontSize: 14, color: '#8D8C8D'}}>{item.content}</Text>
                                                </View>
                                            </View>
                                            <View style={{flexDirection: 'row', paddingBottom: 3}}>
                                                <View style={{justifyContent: 'center', flex: 1}}>
                                                    <Text style={{fontSize: 12, color: '#8D8C8D'}}>{item.time}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                );
                            }) : null
                    }
                </ScrollView>

                {/*</View>*/}
            </View>
        );
    }
}

const css = StyleSheet.create({
    ctIcon: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        color: '#333'
    },
    styleRow: {
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#999',
        shadowOffset: {
            width: 0,
            height: 0
        },
        marginHorizontal: 20,
        shadowRadius: 5,
        shadowOpacity: 0.3,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

import Nav from '../../components/Nav';
import {Actions} from 'react-native-router-flux';





