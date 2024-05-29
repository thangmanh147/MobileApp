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
import { screen, TxtBlack, Color, TxtColor } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class NewModalGetStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listPurposse: [
                { value: 'Y', label: 'Đã có biển số' },
                { value: 'N', label: 'Chưa có biển số' },
            ],
            fullData:  [
                { value: 'Y', label: 'Đã có biển số' },
                { value: 'N', label: 'Chưa có biển số' },
            ]
        };
    }



    onChangeText = (text) => {
        var a = this.state.fullData;
        var b = [];
        var newText = text.toUpperCase()
        for(let i = 0; i< a.length; i++) {
            if(a[i].name.toUpperCase().indexOf(newText) > -1) {
                b.push(a[i])
            }
        }
        this.setState({listPurposse: b})
    }

    setGetPurpose = (data) => {
        console.log('data',data)
        this.props.setGetPurpose(data)
        this.props.onClosed()
    }

    render() {
        const {listPurposse} = this.state
        const {onClosed, open} = this.props;
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
                <View style={{backgroundColor: '#fff',flex: 1,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{flex: 1,marginHorizontal: 24,marginTop:16
                    }}>
                        <ScrollView keyboardShouldPersistTaps='always'>
                            {
                                listPurposse.map((item, index) => {
                                    return (
                                        <TouchableOpacity 
                                            onPress={() => this.setGetPurpose(item)} 
                                            style={{
                                                flexDirection: 'row',
                                                borderBottomWidth: index === listPurposse.length - 1 ? 0 : 1,
                                                borderTopWidth: 0,
                                                borderColor: '#F6F5F6',
                                                alignItems: 'center',
                                                paddingVertical: 8
                                            }} 
                                            key={index}
                                        >
                                            <Text style={{fontSize: 14, color: TxtColor}}>{item.label}</Text>
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
        flex:0.3,
        // height: 150,
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

const mapStateToProps = (state) => {
    return {
        carBuy: state.carBuy
    }
}

export default connect(mapStateToProps)(NewModalGetStatus);
