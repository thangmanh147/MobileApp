
import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image, View, Text
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextField } from 'react-native-material-textfield';
import { screen, Color } from '../../config/System';
import { URL } from '../../config/System'

class InputPurpose extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listPurposse: [],
            setName: ''
        }
    }
    componentDidMount() {
        this.getListPurpose()
    }

    getListPurpose = () => {
        let url = `${URL}/api/attribute/v1/attribute_type?f_code=PURPOSE`
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((res) => {
                let response = res?.data
                if (response.length > 0) {
                    this.setState({
                        listPurposse: res?.data[0]?.object_attribute_ranges
                    })
                }
                console.log('purpose list', this.state.listPurposse)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setGetPurpose = (data) => {
        console.log('data', data)
        if (data.value !== this.state.setName) {
            this.setState({
                setName: data.value
            })
        } else if (data.value == this.state.name) {
            this.setState({
                setName: null
            })
        }

        this.props.setGetPurpose(data)
    }

    render() {
        const { listPurposse } = this.state
        return (
            <View>
                <View>
                    <Text style={{color: '#8D8C8D'}}>{this.props.title}</Text>
                </View>
                <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
                    {
                        listPurposse.map((item, index) => {
                            return (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: "#8D8C8D" }}>{item.description}</Text>
                                    <TouchableOpacity onPress={() => this.setGetPurpose(item)} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, flex: 1 }}>
                                        <FastImage style={{ height: 15, width: 15 }} resizeMode={'contain'} source={item.value == this.state.setName ? require('../../icons/iconAgent/single_select_active.png') : require('../../icons/iconAgent/single_select.png')} />
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

export default InputPurpose;
