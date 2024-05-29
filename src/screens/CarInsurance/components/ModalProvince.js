
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
import { screen, TxtBlack, Color, TxtColor } from '../../../config/System';
import FastImage from 'react-native-fast-image'
import IconSearchSvg from '../../../config/images/icons/IconSearchSvg';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

class ModalProvince extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listProvinces: null,
            fullData: null
        };
    }
    componentDidMount() {
        this.props.getProvince()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let update = {}
        if (nextProps.listProvince && nextProps.listProvince !== prevState.listProvince) {
            //update.listProvinces = nextProps.listProvince,
            update.fullData = nextProps.listProvince
        }
        return update;
    }

    setProvince = (data) => {
        this.props.setProvince(data)
        this.props.onClosed()
        this.setState({ listProvinces: null })
    }
    renderItem = (item, length) => {
        const { nameSelected, unsigned } = this.props;
        return (
            <TouchableOpacity
                onPress={() => this.setProvince(item.item)}
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
                    (nameSelected === item.item._name || nameSelected === removeVietnameseTones(item.item._name)) ? (
                        <IconRadioBtnActiveSvg width={15} height={15} />
                    ) : (
                        <IconRadioBtnSvg width={15} height={15} />
                    )
                }
                <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor }}>
                    {unsigned ? removeVietnameseTones(item.item._name) : item.item._name}
                </Text>
            </TouchableOpacity>
        )
    }
    onChangeText = (text) => {
        let a = this.state.fullData;
        let b = [];
        // text = text.replace(/\(/g,'').replace(/\)/g,'')
        let newText = text.toUpperCase()
        for (let i = 0; i < a.length; i++) {
            if (a[i]._name.toUpperCase().indexOf(newText) > -1) {
                b.push(a[i])
                this.setState({ listProvinces: b })
                console.log('fullllllllll', this.state.listProvinces)
            }
        }
    }
    render() {
        const { listProvinces, fullData } = this.state
        const { onClosed, open } = this.props;
        const arr = listProvinces == null ? fullData : listProvinces;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={true}
                onClosed={onClosed}
                style={css.ctModal}
                coverScreen={true}
            >
                <View style={{
                    backgroundColor: '#fff', flex: 1, marginTop: 24,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <View style={css.ctInput}>
                        <IconSearchSvg width={15} height={15} />
                        <TextInput
                            placeholder='Tìm tỉnh/thành phố'
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
import { getProvince } from '../actions/car_Buy'
import { removeVietnameseTones } from '../../../components/Functions';

const mapStateToProps = (state) => {
    return {
        listProvince: state.carBuy.listProvince
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProvince: () => dispatch(getProvince())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalProvince);
