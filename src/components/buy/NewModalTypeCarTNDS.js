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
import { screen, TxtBlack, Color, TxtColor } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import FastImage from 'react-native-fast-image'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconSearchSvg from '../../config/images/icons/IconSearchSvg';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';
let HTTP = require('../../services/HTTP');

class NewModalTypeCarTNDS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listType: null,
            listPurposse:  [],
            fullData: [ ] ,
            choose:''
        };
    }
    componentDidMount() {
        this.getListType()

    }

    getListType = () => {
        this.props.getCarType()
    }

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
    renderItem = (item, length) => {
        const {orgCode} = this.props;
        if ((orgCode === 'DLJSC' || orgCode === 'DL001') && item.item.value?.toUpperCase()?.includes('TAXI')) return null;
        let typeCar = this.props.typeCar
        return (
            <TouchableOpacity 
                onPress={() => this.setType(item.item)} 
                style={{
                    flexDirection: 'row',
                    borderBottomWidth: item.index === length - 1 ? 0 : 1,
                    borderTopWidth: 0,
                    borderColor: '#F6F5F6',
                    alignItems: 'center',
                    paddingTop: 8,
                    paddingBottom: item.index === length - 1 ? 32 : 8,
                }} >
                {
                    typeCar?.code == item?.item?.code ? (
                        <IconRadioBtnActiveSvg width={15} height={15} />
                    ) : (
                        <IconRadioBtnSvg width={15} height={15} />
                    )
                }
                <Text style={{marginLeft: 8, fontSize: 14, color: TxtColor}}>{item.item.value}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        const {listType, fullData} = this.state
        const {onClosed, open} = this.props;
        const arr = listType == null ? fullData : listType;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={true}
                onClosed={onClosed}
                coverScreen={true}
                style={css.ctModal}
            >
                <View style={{
                    backgroundColor: '#fff', flex: 1, marginTop: 24,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <View style={css.ctInput}>
                        <IconSearchSvg width={15} height={15} />
                        <TextInput
                            placeholder='Tìm loại xe'
                            placeholderTextColor={'#8D8C8D'}
                            onChangeText={text => this.onChangeText(text)}
                            style={{
                                marginLeft: 8,
                                flex: 1,
                                color: TxtColor,
                                fontSize: 14,
                                padding: 0
                            }}
                        />
                    </View>
                    <View style={{
                        flex: 1, marginTop: 8, marginHorizontal: 24
                    }}>

                        <FlatList
                            data={arr}
                            renderItem={(item) => this.renderItem(item, arr?.length)}
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
        marginHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8,
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
export default connect(mapStateToProps, mapDispatchToProps)(NewModalTypeCarTNDS);
