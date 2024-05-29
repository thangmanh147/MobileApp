import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { Color } from '../../../config/System';
import FastImage from 'react-native-fast-image';
import IconSearchSvg from '../../../config/images/icons/IconSearchSvg';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

class ModalMotorBrand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullData: props.listMotorBrand || [],
            page: 0,
            newText: '',
        };
    }

    componentDidMount() {
        const { listMotorBrand } = this.props;
        if (!listMotorBrand || listMotorBrand.length === 0) {
            this.getListBrand();
        }
    }

    getListBrand = () => {
        this.props.getMotorBrandList(this.state.page)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {listMotorBrand} = this.props;
        if(listMotorBrand !== prevProps.listMotorBrand) {
            this.setState({ fullData: listMotorBrand, newText: ''});
        }
    }
    
    onChangeText = (text) => {
        this.setState({ newText: text});
    }

    setMotorBrand = (data) => {
        this.props.setMotorBrand(data)
        this.props.onClosed()
    }
    renderItem = (item) => {
        const {brandId} = this.props;
        return (
            <TouchableOpacity onPress={() => this.setMotorBrand(item.item)} style={{ flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 0, borderColor: '#efefef', alignItems: 'center', paddingVertical: 10, paddingLeft: 0, marginHorizontal: 15 }} >
                {
                    brandId == item?.item?.id ? (
                        <IconRadioBtnActiveSvg width={15} height={15} />
                    ) : (
                        <IconRadioBtnSvg width={15} height={15} />
                    )
                }
                <Text style={{marginLeft: 5}}>{item.item.name}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        const { page, fullData, newText } = this.state;
        const { onClosed, open } = this.props;
        const arr = fullData?.filter(item => item?.name?.toUpperCase().indexOf(newText.toUpperCase()) > -1)
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
                    backgroundColor: '#fff', flex: 1, marginTop: 10,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <View style={css.ctInput}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <IconSearchSvg width={18} height={18} />
                        </View>
                        <TextInput
                            placeholder='Tìm tên hãng xe'
                            placeholderTextColor={'#8D8C8D'}
                            value={newText}
                            onChangeText={text => this.onChangeText(text)}
                            style={{
                                height: 40,
                                marginLeft: 10,
                                flex: 1,
                                padding: 0
                            }}
                        />
                    </View>
                    <View style={{
                        flex: 1, marginHorizontal: 10, marginTop: 10
                    }}>

                        <FlatList
                            data={arr}
                            renderItem={(item) => this.renderItem(item)}
                            onEndReachedThreshold={0.6}
                            // onEndReached={() => {
                            //     if (page < 3) {
                            //         this.setState({ page: page + 1 })
                            //         this.getListBrand()
                            //     }
                            // }}
                        />
                    </View>
                    <View style={{height:50}}/>
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

import { connect } from 'react-redux';
import { getMotorBrandList } from '../actions/motorActions'

const mapStateToProps = (state) => {
    return {
        listMotorBrand: state.motorPhysical.listMotorBrand
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMotorBrandList: (offset) => dispatch(getMotorBrandList(offset))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalMotorBrand);
