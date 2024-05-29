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
import {screen, TxtBlack, Color, URL} from '../../../config/System';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {connect} from 'react-redux';

class ModalInsuranceMoney extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: [],
        };
    }


    componentWillMount() {
        let insuranceMoney = this.props.insuranceMoney
        let url = `${URL}/api/contract/v1/insurance-packages?type=MOTORBIKE`
        axios.get(url)
            .then((res) => {
                console.log('======res122121',res)
                if (res.status == 200) {
                    if (insuranceMoney) {
                        this.props.setSex(insuranceMoney);
                    }else{
                        let a = res?.data?.data
                        this.props.setSex(a[0]);
                    }
                    this.setState({
                        sex:res?.data?.data
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
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
                                <Text>{item?.name}</Text>
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
    insuranceMoney:state?.motorPhysical?.infoMotor?.insuranceMoney,
});

export default connect(mapStateToProps)(ModalInsuranceMoney);
