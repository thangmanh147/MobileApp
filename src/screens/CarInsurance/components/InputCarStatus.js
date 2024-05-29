
import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text
} from 'react-native';
import FastImage from 'react-native-fast-image';

class InputCarStatus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listStatus: [],
            setName: 'Đã có biển số'
        }
    }
    componentDidMount() {
        this.getListStatus()
    }

    getListStatus = () => {
        let url = `https://gwdev.inso.vn/api/attribute/v1/attribute_type?f_code=LICENSE_STATUS`
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    listStatus: res?.data[0]?.object_attribute_ranges
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setStatus = (data) => {
        console.log('data', data)
        if (data.value !== this.state.setName) {
            this.setState({
                setName: data.value
            })
        } else if (data.value == this.state.value) {
            this.setState({
                setName: null
            })
        }

        this.props.setStatus(data)
    }

    render() {
        const { listStatus } = this.state
        return (
            <View>
                <View>
                    <Text style={{ color: '#8D8C8D' }}>{this.props.title}</Text>
                </View>
                <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
                    {
                        listStatus.map((item, index) => {
                            return (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: "#8D8C8D" }}>{item.description}</Text>
                                    <TouchableOpacity onPress={() => this.setStatus(item)} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, flex: 1 }}>
                                        <FastImage style={{ height: 15, width: 15 }} resizeMode={'contain'} source={item.value == this.state.setName ? require('../../../icons/iconAgent/single_select_active.png') : require('../../../icons/iconAgent/single_select.png')} />
                                        <Text style={{ paddingLeft: 10 }}>{item.value}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

export default InputCarStatus;
