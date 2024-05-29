
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
import { screen, TxtBlack, Color } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image'

let HTTP = require('../../services/HTTP');

class ModalSeat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listSeat: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            fullData: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
        };
    }

    // componentWillMount() {
    //     this.getListSeat();
    // }
    //
    // async getListSeat() {
    //     try {
    //         const body = {
    //             "function":"InsoSupplierApi_getNumberSeatsByVehiclePurpose",
    //             "params": {
    //                 "vehicle_purpose_id": this.props.vehicle_purpose_id
    //             }
    //             }
    //         const data = await HTTP.post(body);
    //         if (data.result_code = '0000') {
    //             this.setState({
    //                 listSeat: data.result_data.number_seats,
    //                 fullData: data.result_data.number_seats,
    //             })
    //         } else {
    //             SimpleToast.show(data.result_message);
    //         }
    //     } catch(e) {
    //
    //     } finally {
    //
    //     }
    // }


    onChangeText = (text) => {
        var a = this.state.fullData;
        var b = [];
        // text = text.replace(/\(/g,'').replace(/\)/g,'')
        for(let i = 0; i< a.length; i++) {
            if((a[i].toString()).indexOf(text) > -1) {
                b.push(a[i].toString())
            }
        }
        this.setState({listSeat: b})
    }

    setSeat = (data) => {
        this.props.setSeat(data)
        this.props.onClosed()
    }

    render() {
        const {listSeat} = this.state
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
                    <View style={css.ctInput}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../../icons/iconAgent/ic_search.png')}
                                   style={{
                                       width: 18,
                                       height: 18,
                                   }}
                            />
                        </View>
                        <TextInput
                            keyboardType={'number-pad'}
                            placeholder='Tìm số chỗ ngồi'
                            placeholderTextColor={'#8D8C8D'}
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
                                listSeat.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.setSeat(item)} style={{flexDirection: 'row',borderBottomWidth: 1,borderTopWidth: 0, borderColor: '#efefef',alignItems: 'center', paddingVertical: 10, paddingLeft: 0, marginHorizontal: 15}} key={index}>
                                            <FastImage source={require('../../icons/iconAgent/single_select.png')} style={{ width: 15, height: 15 }} />
                                            <Text style={{marginLeft: 5}}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                })
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

export default connect(mapStateToProps)(ModalSeat);
