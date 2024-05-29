
import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import {  Color } from '../../../config/System';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from '../../../config/ConfigResponsive';
import FooterButton from '../../../components/FooterButton';
import ModalButton from './ModalButton';
import ModalButtonNoColor from './ModalButtonNoColor';

class ModalFlightListOneWay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItemIndex: null,
            airport: [
                {
                    "name": "VietJet Air  - VJ159",
                    "from": "Hà Nội",
                    "to": "TP Hồ Chí Minh",
                    "date": "Thứ sáu 02/10/2020",
                    "traveTime": "21:40",
                    "arrivalTime": "23:25"
                },
                {
                    "name": "VietJet Air  - VJ159",
                    "from": "TP Hồ Chí Minh",
                    "to": "Hà Nội",
                    "date": "Thứ sáu 02/10/2020",
                    "traveTime": "21:40",
                    "arrivalTime": "23:25"
                },

            ],
            fullData: [
                {
                    "name": "VietJet Air  - VJ159",
                    "from": "Hà Nội",
                    "to": "TP Hồ Chí Minh",
                    "date": "Thứ sáu 02/10/2020",
                    "traveTime": "21:40",
                    "arrivalTime": "23:25"
                },
                {
                    "name": "VietJet Air  - VJ159",
                    "from": "TP Hồ Chí Minh",
                    "to": "Hà Nội",
                    "date": "Thứ sáu 02/10/2020",
                    "traveTime": "21:40",
                    "arrivalTime": "23:25"
                },

            ],
        };
    }
    setBlank = (data) => {
        this.props.setBlank(data)
        this.props.onClosed()
    }

    onChangeText = (text) => {
        var a = this.state.fullData;
        var b = [];
        // text = text.replace(/\(/g,'').replace(/\)/g,'')
        var newText = text.toUpperCase()
        for(let i = 0; i< a.length; i++) {
            if(a[i].name.toUpperCase().indexOf(newText) > -1) {
                b.push(a[i])
            }
        }
        this.setState({airport: b})
    }

    setAirport = (data) => {
        this.props.setAirport(data)
    }
    onPressButton = (data) => {
        this.props.onPressButton(data)
        this.props.onClosed()
    }
    render() {
        const {fullData, airport, status,selectedItemIndex} = this.state
        const {onClosed, open} = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={false}
                onClosed={onClosed}
                style={css.ctModal}
            >
                <View style={{
                    backgroundColor: '#fff', flex: 1, marginTop: 10,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <View style={{flex: 0.15,backgroundColor: '#F6F5F6',borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -10, justifyContent: 'center'}}>
                        <Text style={{ marginLeft: 40, fontWeight: '700', fontSize: 16}}>Danh sách chuyến bay</Text>
                    </View>
                        <View style={css.ctInput}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../../../icons/iconAgent/ic_search.png')}
                                       style={{
                                           width: 18,
                                           height: 18,
                                       }}
                                />
                            </View>
                            <TextInput
                                placeholder='Tìm chuyến bay'
                                onChangeText={text => this.onChangeText(text)}
                                style={{
                                    height: 40,
                                    paddingLeft: 10,
                                    flex:1
                                }}
                            />
                        </View>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
                            <ScrollView  keyboardShouldPersistTaps='always'>
                                {
                                    airport.length > 0 ? airport.map((item, index) => {
                                            return (
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.setState({selectedItemIndex: index})
                                                            this.setAirport(item)
                                                        }}
                                                        style={{
                                                            backgroundColor: selectedItemIndex == index ? '#D5F2F2' : '#FFFFFF',
                                                            paddingVertical: 10,
                                                            paddingLeft: 0,
                                                            marginHorizontal: 10,
                                                            marginTop: 10,
                                                            borderRadius: 10,
                                                            shadowOffset: {
                                                                width: 0,
                                                                height: 1
                                                            },
                                                            shadowOpacity: 0.22,
                                                            shadowRadius: 2.22,
                                                            elevation: 2,
                                                            shadowColor: '#000',
                                                        }}
                                                        key={index}>
                                                        <View style={{flexDirection: 'row'}}>
                                                            <View style={{alignSelf: 'center', marginLeft: 12, backgroundColor: 'transparent' }}>
                                                                <FastImage
                                                                    source={selectedItemIndex == index ? require('../../../icons/iconAgent/single_select_active_transparent.png') : require('../../../icons/iconAgent/single_select.png' )}
                                                                    style={{ width: 15, height: 15}}
                                                                    resizeMode={'contain'} />
                                                            </View>
                                                            <View>
                                                                <Text style={{marginLeft: 12, fontWeight: '700'}}>{item.name}</Text>
                                                                <View style={{flexDirection: 'row', paddingVertical: 4}}>
                                                                    <Text style={{marginLeft: 12}}>{item.from}</Text>
                                                                    <FastImage source={require('../../../icons/iconAgent/ic_right.png')} style={{width: 12, marginLeft: 4}} resizeMode={'contain'} />
                                                                    <Text style={{marginLeft: 4}}>{item.to}</Text>
                                                                </View>
                                                                <View style={{flexDirection: 'row' }}>
                                                                    <View>
                                                                        <Text style={{marginLeft: 12}}>{item.date} </Text>
                                                                    </View>
                                                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '10%', alignItems: 'center' }}>
                                                                        <FastImage source={require('../../../icons/iconAgent/ic_clock.png')} style={{width: 15, height: 15 }} resizeMode={'contain'} />
                                                                        <Text style={{marginLeft: 5}}>{item.traveTime} -</Text>
                                                                        <Text style={{marginLeft: 4}}>{item.arrivalTime}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }) :
                                        <TouchableOpacity onPress={() => this.props.onClosed()}>
                                            <Text style={{textAlign:'center'}}>Không có chuyến bay nào được tìm thấy</Text>
                                        </TouchableOpacity>
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({selectedItemIndex: 'blank'})
                                        this.setBlank()
                                    }}
                                    style={{
                                        backgroundColor: this.state.selectedItemIndex == 'blank' ? '#D5F2F2' : '#FFFFFF',
                                        paddingVertical: 10,
                                        paddingLeft: 0,
                                        marginHorizontal: 10,
                                        marginTop: 12,
                                        marginBottom: 15,
                                        borderRadius: 10,
                                        shadowOffset: {
                                            width: 0,
                                            height: 0
                                        },
                                        shadowOpacity: 0.22,
                                        shadowRadius: 2.22,
                                        elevation: 2,
                                        shadowColor: '#000',
                                    }}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{alignSelf: 'center', marginLeft: 12, backgroundColor: 'transparent' }}>
                                            <FastImage
                                                source={this.state.selectedItemIndex == 'blank' ? require('../../../icons/iconAgent/single_select_active_transparent.png') : require('../../../icons/iconAgent/single_select.png' )}
                                                style={{ width: 15, height: 15}}
                                                resizeMode={'contain'} />
                                        </View>
                                        <Text style={{fontWeight: '700', marginLeft: 12}}>Chuyến bay khác</Text>
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                        </KeyboardAwareScrollView>
                        <FooterButton>
                            <View style={{flexDirection: 'row'}}>
                                <ModalButton
                                    style={{width: '90%'}}
                                    label={'XÁC NHẬN'}
                                    onPress={() => this.onPressButton()}/>
                            </View>
                        </FooterButton>
                    </View>
                </ModalBox>
        )
    }

}

const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.85,
        borderTopLeftRadius: 20, borderTopRightRadius: 20
    },
    ctInput: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: Color,
        marginHorizontal: 25,
        flexDirection: 'row'
    },
})

import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        carBuy: state.carBuy
    }
}
export default connect(mapStateToProps)(ModalFlightListOneWay);
