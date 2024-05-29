
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
import { screen, TxtBlack, Color } from '../../../config/System';

class ModalCompensation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: [
                {
                    name:'10 Triệu Đồng',
                    id:'2'
                },{
                    name:'10 Triệu Đồng',
                    id:'1'
                },
            ],
        };
    }

    setCompensation = (data) => {
        this.props.setCompensation(data)
        this.props.onClosed()
    }

    render() {
        const {month} = this.state
        const {onClosed, open} = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={false}
                onClosed={onClosed}
                style={css.ctModal}
            >
                    <View style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
                        {month.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => this.setCompensation(item)} style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderTopWidth: 0,
                                    borderColor: '#efefef',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    paddingLeft: 0,
                                    marginHorizontal: 15
                                }} key={index}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
            </ModalBox>
        )
    }

}

const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.5,
        borderTopLeftRadius: 20, borderTopRightRadius: 20
    },
    ctInput: {
        borderBottomWidth: 1,
        borderColor: Color,
        marginHorizontal: 25,
        flexDirection: 'row'
    },
})

export default (ModalCompensation);
