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
import {screen, TxtBlack, Color, URL, TxtColor} from '../../../config/System';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {connect} from 'react-redux';
import {saveFeeMotor, saveMotorType} from '../actions/motorActions';
import FastImage from 'react-native-fast-image'
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

class ModalInsuranceMoney extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: [],
        };
    }


    componentWillMount() {
        const {codeSelected} = this.props;
        let insuranceMoney = this.props.insuranceMoney
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/contract/v1/insurance-packages?type=MOTORBIKE&supplierCode=${codeSelected}`
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
        })
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {codeSelected} = this.props;
        if(codeSelected !== prevProps.codeSelected) {
            this.getInsuranceMoney();
        }
    }

    getInsuranceMoney = () => {
        const {codeSelected, setSex} = this.props;
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/contract/v1/insurance-packages?type=MOTORBIKE&supplierCode=${codeSelected}`
            axios.get(url)
                .then((res) => {
                    if (res.status == 200) {
                        console.log('======resMoney', res?.data?.data);
                        let a = res?.data?.data;
                        setSex(a[0]);
                        this.setState({
                            sex:res?.data?.data,
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }

    setSex = data => {
        this.props.setSex(data);
        this.props.onClosed();
    };

    render() {
        const {sex} = this.state;
        const {onClosed, open, nameSelected} = this.props;
        return (
            <ModalBox
                isOpen={open}
                entry={'bottom'}
                position={'bottom'}
                swipeToClose={false}
                onClosed={onClosed}
                style={css.ctModal}
                coverScreen={true}>
                <View style={{flex: 1}}>
                <View style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    backgroundColor: '#F6F5F6'
                }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Số tiền bảo hiểm</Text>
                  </View>
                <View style={{ marginTop: 8, paddingHorizontal: 24 }}>
                {sex.map((item, index) => {
                    return (
                      <TouchableOpacity 
                        onPress={() => this.setSex(item)}
                        style={{
                            flexDirection: 'row',
                            borderBottomWidth: index === sex.length - 1 ? 0 : 1,
                            borderTopWidth: 0,
                            borderColor: '#F6F5F6',
                            alignItems: 'center',
                            paddingVertical: 8
                        }}>
                        {
                            nameSelected === item?.name ? (
                                <IconRadioBtnActiveSvg width={15} height={15} />
                            ) : (
                                <IconRadioBtnSvg width={15} height={15} />
                            )
                        }
                        <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor }}>{item?.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
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
    insuranceMoney:state?.motor?.infoMotor?.insuranceMoney,
});

export default connect(mapStateToProps, {
    saveMotorType,saveFeeMotor
})(ModalInsuranceMoney);
