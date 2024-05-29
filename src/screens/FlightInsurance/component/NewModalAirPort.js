
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

class NewModalAirPort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            airport: [
                {
                    "name": "Ha Noi - HNA",
                    "code": "HNA"
                },
                {
                    "name": "Ho Chi Minh City - SGN",
                    "code": "SGN"
                },
                {
                    "name": "Da Nang - DAD",
                    "code": "DAD"
                },

    ],
        fullData: [
            {
                "name": "Ha Noi - HNA",
                "code": "HNA"
            },
            {
                "name": "Ho Chi Minh City - SGN",
                "code": "SGN"
            },
            {
                "name": "Da Nang - DAD",
                "code": "DAD"
            },

        ],
    };
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
        this.setState({place: b})
    }

    setAirport = (data) => {
        this.props.setAirport(data)
        this.props.onClosed()
    }

    render() {
        const {fullData, airport} = this.state
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
                    <View style={{flex: 0.1,backgroundColor: '#F6F5F6',borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -10}}>
                        <Text style={{marginTop: 15, marginLeft: 40, fontWeight: '700', fontSize: 16}}>Chọn sân bay</Text>
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
                            placeholder='Tìm quốc gia'
                            onChangeText={text => this.onChangeText(text)}
                            style={{
                                height: 40,
                                paddingLeft: 10,
                                flex:1
                            }}
                        />
                    </View>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
                        <ScrollView keyboardShouldPersistTaps='always'>
                            {
                                airport.length > 0 ? airport.map((item, index) => {
                                        return (
                                            <TouchableOpacity onPress={() => this.setAirport(item)} style={{flexDirection: 'row',borderBottomWidth: 1,borderTopWidth: 0, borderColor: '#efefef',alignItems: 'center', paddingVertical: 10, paddingLeft: 0, marginHorizontal: 15}} key={index}>
                                                <FastImage source={require('../../../icons/iconAgent/single_select.png')} style={{ width: 15, height: 15 }} />
                                                <Text style={{marginLeft: 12}}>{item.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    }) :
                                    <TouchableOpacity onPress={() => this.props.onClosed()}>
                                        <Text style={{textAlign:'center'}}>Không có quốc gia nào được tìm thấy</Text>
                                    </TouchableOpacity>
                            }
                        </ScrollView>
                    </KeyboardAwareScrollView>
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
export default connect(mapStateToProps)(NewModalAirPort);
