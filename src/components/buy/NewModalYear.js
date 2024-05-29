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
import {screen, TxtBlack, Color} from '../../config/System';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image'

let HTTP = require('../../services/HTTP');

class NewModalYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            years: [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005],
            fullData: [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005]
        };
    }

    componentWillMount() {
        this.getYear();
    }

    async getYear() {
        try {
            const body = {
                "function":"InsoSupplierApi_getManufactureYear",
                "params": {
                    "vehicle_purpose_id": this.props.vehicle_purpose_id,
                    "number_seats":  this.props.seat,
                    "vehicle_producer_id": this.props.idProducer
                }
            }
            const data = await HTTP.post(body);
            if (data.result_code = '0000') {
                this.setState({
                    years: data.result_data.years,
                    fullData: data.result_data.years
                })
            } else {
                SimpleToast.show(data.result_message);
            }
        } catch(e) {

        } finally {

        }
    }

    onChangeText = (text) => {
		var a = this.state.fullData;
		var b = [];
		// text = text.replace(/\(/g,'').replace(/\)/g,'')
		for(let i = 0; i< a.length; i++) {
		if((a[i].toString()).indexOf(text) > -1) {
			b.push(a[i].toString())
		}
		}
		this.setState({years: b})
		// this.props.setId()
	}

    setProducer = (data) => {
        this.props.setYear(data)
        this.props.onClosed()
    }

    render() {
        const {years} = this.state
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
                            placeholder='Tìm năm sản xuất'
                            placeholderTextColor={'#8D8C8D'}
                            onChangeText={text => this.onChangeText(text)}
                            style={{
                                height: 40,
                                paddingLeft: 10,
                                flex:1
                            }}
                        />
                    </View>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'
                                             style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
                        <ScrollView keyboardShouldPersistTaps='always'>
                            {
                                years.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.setProducer(item)} style={{flexDirection: 'row',borderBottomWidth: 1,borderTopWidth: 0, borderColor: '#efefef',alignItems: 'center', paddingVertical: 10, paddingLeft: 0, marginHorizontal: 15}} key={index}>
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

export default connect(mapStateToProps)(NewModalYear);
