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
import {connect} from 'react-redux';

class ModalExpMotor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: [
                {
                    name: '12 tháng',
                    id: 1,
                    value:12
                },
                {
                    name: '9 tháng',
                    id: 2,
                    value:9
                },
                {
                    name: '6 tháng',
                    id: 3,
                    value:6
                },
                {
                    name: '3 tháng',
                    id: 4,
                    value:3
                },
            ],
        };
    }

    componentWillMount() {
        let duration = this.props.duration
        if (duration) {
            this.props.setSex(duration);
        }else {
            let a = this.state.sex
            this.props.setSex(a[0]);
        }
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

const mapStateToProps = state => ({
    duration:state?.motorPhysical?.infoMotor?.duration,
});

export default connect(mapStateToProps)(ModalExpMotor);
