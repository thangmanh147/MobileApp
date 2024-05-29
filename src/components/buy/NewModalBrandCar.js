import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { screen, TxtBlack, Color } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import FastImage from 'react-native-fast-image'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
let HTTP = require('../../services/HTTP');

class NewModalBrandCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullData: null,
            listType: null,
            listPurposse: this.props.purpose_id == '1' ? [
                {
                    has_pickup: false,
                    has_weight: false,
                    name: "Xe chở người không kinh doanh vận tải",
                    vehicle_purpose_id: "1"
                },{
                    has_pickup: false,
                    has_weight: true,
                    name: "Xe chuyên dùng",
                    vehicle_purpose_id: "5"
                },{
                    has_pickup: false,
                    has_weight: true,
                    name: "Xe tải",
                    vehicle_purpose_id: "10"
                },{
                    has_pickup: true,
                    has_weight: false,
                    name: "Xe Van",
                    vehicle_purpose_id: "20"
                },
            ] : [
                {
                    has_pickup: false,
                    has_weight: false,
                    name: "Xe bus nội tỉnh",
                    vehicle_purpose_id: "2"
                },{
                    has_pickup: false,
                    has_weight: true,
                    name: "Xe bảo ôn",
                    vehicle_purpose_id: "7"
                },{
                    has_pickup: false,
                    has_weight: false,
                    name: "Xe cho thuê tự lái",
                    vehicle_purpose_id: "18"
                },{
                    has_pickup: false,
                    has_weight: false,
                    name: "Xe taxi công nghệ Grab/Fastgo và xe kinh doanh loại hình tương tự",
                    vehicle_purpose_id: "16"
                },
            ],
            fullData:this.props.purpose_id == '1' ? [
                {
                    has_pickup: false,
                    has_weight: false,
                    name: "Xe chở người không kinh doanh vận tải",
                    vehicle_purpose_id: "1"
                },{
                    has_pickup: false,
                    has_weight: true,
                    name: "Xe chuyên dùng",
                    vehicle_purpose_id: "5"
                },{
                    has_pickup: false,
                    has_weight: true,
                    name: "Xe tải",
                    vehicle_purpose_id: "10"
                },{
                    has_pickup: true,
                    has_weight: false,
                    name: "Xe Van",
                    vehicle_purpose_id: "20"
                },
            ] : [
                {
                    has_pickup: false,
                    has_weight: false,
                    name: "Xe bus nội tỉnh",
                    vehicle_purpose_id: "2"
                },{
                    has_pickup: false,
                    has_weight: true,
                    name: "Xe bảo ôn",
                    vehicle_purpose_id: "7"
                },{
                    has_pickup: false,
                    has_weight: false,
                    name: "Xe cho thuê tự lái",
                    vehicle_purpose_id: "18"
                },{
                    has_pickup: false,
                    has_weight: false,
                    name: "Xe taxi công nghệ Grab/Fastgo và xe kinh doanh loại hình tương tự",
                    vehicle_purpose_id: "16"
                },
            ],
        };
    }
    componentDidMount() {
        this.getListType()
        
    }

    getListType = () => {
        this.props.getCarType()
        console.log('vao day')
    }
    // componentWillReceiveProps = (nextProps) => {
    //     if(nextProps.carBuy.producer) {
    //         this.setState({
    //             producers: nextProps.carBuy.producer
    //         })
    //     }
    // };
    static getDerivedStateFromProps(nextProps, prevState) {
        let update = {}
        if (nextProps.listType !== prevState.listType) {
            update.fullData = nextProps.listType
        }
        return update;
    }
    onChangeText = (text) => {
        var a = this.state.fullData;
        var b = [];
        // text = text.replace(/\(/g,'').replace(/\)/g,'')
        var newText = text.toUpperCase()
        for(let i = 0; i< a.length; i++) {
            if(a[i].value.toUpperCase().indexOf(newText) > -1) {
                b.push(a[i])
            }
        }
        this.setState({listType: b})
        // this.props.setId()
    }

    setType = (data) => {
        this.props.setType(data)
        this.props.onClosed()
    }
    renderItem = (item) => {
        return (
            <TouchableOpacity onPress={() => this.setType(item.item)} style={{ flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 0, borderColor: '#efefef', alignItems: 'center', paddingVertical: 10, paddingLeft: 0, marginHorizontal: 15 }} >
                <FastImage source={require('../../icons/iconAgent/single_select.png')} style={{ width: 15, height: 15 }} />
                <Text style={{marginLeft: 5}}>{item.item.value}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        const {listType, fullData} = this.state
        const {onClosed, open} = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={true}
                onClosed={onClosed}
                style={css.ctModal}
            >
                <View style={{backgroundColor: '#fff',flex: 1,        marginTop:10,
                    borderTopLeftRadius:20,borderTopRightRadius:20
                }}>
                    <View style={css.ctInput}>
                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                            <Image source={require('../../icons/iconAgent/ic_search.png')}
                                   style={{
                                       width: 18,
                                       height: 18,
                                   }}
                            />
                        </View>
                        <TextInput
                            placeholder='Tìm loại xe'
                            placeholderTextColor={'#8D8C8D'}
                            onChangeText={text => this.onChangeText(text)}
                            style={{
                                height: 40,
                                marginLeft:10,
                                flex:1
                            }}
                        />
                    </View>
                    <View style={{
                        flex: 1, marginHorizontal: 10, marginTop: 10
                    }}>

                        <FlatList
                            data={listType == null ? fullData : listType}
                            renderItem={(item) => this.renderItem(item)}                          
                        />
                    </View>
                </View>
            </ModalBox>
        )
    }

}

const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex:0.85,
        borderTopLeftRadius:20,borderTopRightRadius:20
    },
    ctInput: {
        borderBottomWidth: 1,
        borderColor: Color,
        marginHorizontal: 25,
        flexDirection: 'row'


    },
})

import {connect} from 'react-redux';
import { getCarType } from '../../screens/CarInsurance/actions/car_Buy'

const mapStateToProps = (state) => {
    return {
        carBuy: state.carBuy,
        listType: state.carBuy.listType
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCarType: () => dispatch(getCarType())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewModalBrandCar);
