
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { Color } from '../../../config/System';

class ModalBankings extends React.Component {
    constructor(props) {
        super(props);
    }

    setType = (data) => {
        this.props.setType(data)
        this.props.onClosed()
    }

    render() {
        const { onClosed, open, items } = this.props;
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
                    {items.map((item, index) => {
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
                            >
                                <Text>{item.bankName}</Text>
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

export default ModalBankings;
