import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import {screen, TxtBlack, Color} from '../../../config/System';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class ModalInsuranceMoney extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: [
                {
                    name: '10.000.000đ',
                    id: 1,
                },
                {
                    name: '20.000.000đ',
                    id: 2,
                },

            ],
        };
    }

    setSex = data => {
        this.props.setSex(data);
        this.props.onClosed();
    };

    render() {
        const {sex} = this.state;
        const {onClosed, open} = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={false}
                onClosed={onClosed}
                style={css.ctModal}
                coverScreen={true}>
                <View style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
                    {sex.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.setSex(item)}
                                style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderTopWidth: 0,
                                    borderColor: '#efefef',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    paddingLeft: 0,
                                    marginHorizontal: 15,
                                }}
                                key={index}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ModalBox>
        );
    }
}
const css = StyleSheet.create({
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    ctInput: {
        borderBottomWidth: 1,
        borderColor: Color,
        marginHorizontal: 25,
        flexDirection: 'row',
    },
});

export default ModalInsuranceMoney;
