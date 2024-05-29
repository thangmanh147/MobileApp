
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { Color } from '../../../config/System';

class ModalRelationType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [
                {
                    name: 'Bản thân',
                    id: 1
                },
                {
                    name: 'Vợ',
                    id: 2
                },
                {
                    name: 'Chồng',
                    id: 3
                },
                {
                    name: 'Con',
                    id: 4
                },
                {
                    name: 'Bố',
                    id: 5
                },
                {
                    name: 'Mẹ',
                    id: 6
                },
            ],
        };
    }

    setType = (data) => {
        this.props.setType(data)
        this.props.onClosed()
    }

    render() {
        const { type } = this.state
        const { onClosed, open, selectedBuyer } = this.props;
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
                    {type.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.setType(item)}
                                style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderTopWidth: 0,
                                    borderColor: '#efefef',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    paddingLeft: 0,
                                    marginHorizontal: 15
                                }}
                                key={index}
                                disabled={item.id === 1 && selectedBuyer}
                            >
                                <Text style={item.id === 1 && selectedBuyer && {color: '#B3B2B3'}}>{item.name}</Text>
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

export default ModalRelationType;
