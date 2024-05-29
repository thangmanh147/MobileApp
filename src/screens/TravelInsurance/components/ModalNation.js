
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
import { screen, TxtBlack, Color } from '../../../config/System';
import FastImage from 'react-native-fast-image'
import { URL } from '../../../config/System';

class ModalNation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listNations: null,
            fullData: null
        };
    }
    componentDidMount() {
        this.getData()
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     let update = {}
    //     if (nextProps.listProvince && nextProps.listProvince !== prevState.listProvince) {
    //         //update.listProvinces = nextProps.listProvince,
    //         update.fullData = nextProps.listProvince
    //     }
    //     return update;
    // }
    getData = () => {
        let url = `${URL}/api/master-data/v1/nations/list-nation`
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    fullData: res.data,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setNation = (data) => {
        this.props.setNation(data)
        this.props.onClosed()
        this.setState({ listProvinces: null })
    }
    renderItem = (item) => {
        return (
            <TouchableOpacity onPress={() => this.setNation(item.item)} style={{ flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 0, borderColor: '#efefef', alignItems: 'center', paddingVertical: 10, paddingLeft: 0, marginHorizontal: 15 }} >
                <FastImage source={require('../../../icons/iconAgent/single_select.png')} style={{ width: 15, height: 15 }} />
                <Text style={{ marginLeft: 5 }}>{item.item.name}</Text>
            </TouchableOpacity>
        )
    }
    onChangeText = (text) => {
        let a = this.state.fullData;
        let b = [];
        // text = text.replace(/\(/g,'').replace(/\)/g,'')
        let newText = text.toUpperCase()
        for (let i = 0; i < a.length; i++) {
            if (a[i].name.toUpperCase().indexOf(newText) > -1) {
                b.push(a[i])
                this.setState({ listNations: b })
                console.log('fullllllllll', this.state.listNations)
            }
        }
    }
    render() {
        const { listNations, fullData } = this.state
        const { onClosed, open } = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={true}
                onClosed={onClosed}
                style={css.ctModal}
            >
                <View style={{
                    backgroundColor: '#fff', flex: 1, marginTop: 10,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <View style={css.ctInput}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../icons/iconAgent/ic_search.png')}
                                style={{
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        </View>
                        <TextInput
                            placeholder='Tìm tỉnh/thành phố'
                            placeholderTextColor={'#8D8C8D'}
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
                            data={listNations == null ? fullData : listNations}
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

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalNation);
