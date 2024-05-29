import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { screen, TxtBlack, Color, TxtColor } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { URL } from '../../config/System'
import FastImage from 'react-native-fast-image'
import IconSearchSvg from '../../config/images/icons/IconSearchSvg';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';

class NewModalProducer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            producers: [],
            fullData: null,
            page: 0,
            listBranch: null
        };
    }

    componentDidMount() {
        this.getListBranch()
    }

    getListBranch = () => {
        this.props.getCarBranchList(this.state.page)
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
        if (nextProps.listBranch !== prevState.listBranch) {
            update.fullData = nextProps.listBranch
        }
        return update;
    }
    // componentDidUpdate(prevProps, prevState) {
    //     const {listBranch} =
    //     if(prevState.listBranch !== this.state.listBranch){
    //         console.log('changed')
    //     }
    // }
    onChangeText = (text) => {
        var a = this.state.fullData;
        var b = [];
        // text = text.replace(/\(/g,'').replace(/\)/g,'')
        var newText = text.toUpperCase()
        for (let i = 0; i < a.length; i++) {
            if (a[i].name.toUpperCase().indexOf(newText) > -1) {
                b.push(a[i])
                this.setState({ listBranch: b })
            }
        }

        // this.props.setId()
    }

    setProducer = (data) => {
        this.props.setProducer(data)
        this.props.onClosed()
    }
    renderItem = (item, length) => {
        let carBrand = this.props.carBrand
        return (
            <TouchableOpacity 
                onPress={() => this.setProducer(item.item)} 
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
                    carBrand?.id == item?.item?.id ? (
                        <IconRadioBtnActiveSvg width={15} height={15} />
                    ) : (
                        <IconRadioBtnSvg width={15} height={15} />
                    )
                }
                <Text style={{marginLeft: 8, fontSize: 14, color: TxtColor}}>{item.item.name}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        const { page, listBranch, fullData } = this.state
        const { onClosed, open } = this.props;
        const arr = listBranch == null ? fullData : listBranch;
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
                            placeholder='Tìm tên hãng xe'
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
                            onEndReachedThreshold={0.6}
                            onEndReached={() => {
                                if (page < 3) {
                                    this.setState({ page: page + 1 })
                                    this.getListBranch()
                                }
                            }}
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
        flex: 0.85,
        borderTopLeftRadius: 20, borderTopRightRadius: 20
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

import { connect } from 'react-redux';
import { getCarBranchList } from '../../screens/CarInsurance/actions/car_Buy'

const mapStateToProps = (state) => {
    return {
        carBuy: state.carBuy,
        listBranch: state.carBuy.listBranch
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCarBranchList: (offset) => dispatch(getCarBranchList(offset))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewModalProducer);
