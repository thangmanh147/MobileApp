
import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { screen, TxtBlack, Color } from '../../../config/System';
import FastImage from 'react-native-fast-image';

class ModalHouseProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [],
        };
    }
    componentDidMount = () => {
        this.props.getHousePropertyInsurance()
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let update = {}
        if (nextProps.listHousePropertyInsurance && nextProps.listHousePropertyInsurance !== prevState.listHousePropertyInsurance) {
            //update.listProvinces = nextProps.listProvince,
            update.type = nextProps.listHousePropertyInsurance
        }
        return update;
    }

    setHouseType = (data) => {
        this.props.setHouseType(data)
        this.props.onClosed()
    }
    renderItem = (item, index) => (
        <TouchableOpacity onPress={() => this.setHouseType(item.item)} style={{ flexDirection: 'row', alignItems: 'center', }}>
            <FastImage
                source={require('../../../icons/iconAgent/single_select.png')}
                style={{ width: 15, height: 15 }}
                resizeMode={'contain'} />
            <View style={{
                width: '100%',
                borderBottomWidth: 1,
                borderTopWidth: 0,
                borderColor: '#efefef',
                paddingVertical: 10,
                paddingLeft: 0,
                marginHorizontal: 10,
                paddingRight: 15
            }} key={index}>

                <View>
                    <Text style={{ paddingRight: 20 }}>{item.item.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
    render() {
        const { type } = this.state
        const { onClosed, open } = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={false}
                onClosed={onClosed}
                style={css.ctModal}
                coverScreen={true}
            >
                <View style={{ flex: 1, marginHorizontal: 10, marginTop: 10 }}>
                    <FlatList
                        data={type.sort((a,b) => a.insuranceValue - b.insuranceValue)}
                        renderItem={(item) => this.renderItem(item)}
                    />

                </View>
            </ModalBox>
        )
    }

}

const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.4,
        borderTopLeftRadius: 20, borderTopRightRadius: 20
    },
    ctInput: {
        borderBottomWidth: 1,
        borderColor: Color,
        marginHorizontal: 25,
        flexDirection: 'row'
    },
})

import { connect } from 'react-redux';
import { getHousePropertyInsurance } from '../actions/house_buy'

const mapStateToProps = (state) => {
    return {
        listHousePropertyInsurance: state.houseBuy.listHousePropertyInsurance
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getHousePropertyInsurance: () => dispatch(getHousePropertyInsurance())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalHouseProperty);
