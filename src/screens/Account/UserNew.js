'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    Linking,
    ImageBackground,
    SafeAreaView,
    Share,
    StatusBar, Keyboard, BackHandler,
    TouchableWithoutFeedback,
    Dimensions,
    TextInput, ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import Nav from '../../components/Nav';
import { Color, URL } from '../../config/System';
import Store from '../../services/Store';
import Const from '../../services/Const';
import {saveBuyerMotor, saveMotorType} from '../Motorbike/actions/motorActions';
import TwoButton from '../../components/TwoButton';
import ModalORC from './ModalORC';
import { connect } from 'react-redux';
import jwt_decode from "jwt-decode";
import { getInsuranceInfo } from '../Agent/actions';
import IconChangePassSvg from '../../config/images/tab_user/IconChangePassSvg';
import IconContractsSvg from '../../config/images/tab_user/IconContractsSvg';
import IconLogoutSvg from '../../config/images/tab_user/IconLogoutSvg';

const screen = Dimensions.get('window');


class UserNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOptions: [
                // {
                //     icon: require('../../config/images/private/tab_user/user.png'),
                //     title: 'Quyền lợi bảo hiểm',
                //     type: 'BENEFITS'
                // },
                {
                    icon: <IconContractsSvg width={24} height={24} />,
                    title: 'Quản lý hợp đồng BH',
                    type: 'CUSTOMER_CONTRACT'
                },
                // {
                //     icon: require('../../config/images/private/tab_user/Customer.png'),
                //     title: 'Danh sách yêu cầu bồi thường',
                //     type: 'LIST_COMPENSATION'
                // },
                // {
                //     icon: require('../../config/images/private/tab_user/Commision.png'),
                //     title: 'Hoa hồng cho cộng tác viên',
                //     type: 'COMMISSIONS'
                // },
                // {
                //     icon: require('../../config/images/private/tab_user/KPI.png'),
                //     title: 'KPI',
                //     type: 'KPI'
                // },
                {
                    icon: <IconChangePassSvg width={24} height={24} />,
                    title: 'Đổi mật khẩu',
                    type: 'CHANGE_PASS'
                },
                {
                    icon: <IconLogoutSvg width={24} height={24} />,
                    title: 'Đăng xuất',
                    type: 'LOG_OUT'
                }
            ],
            isOpen:null,
            dataToken: {},
            modalORC: false, 
        }

    }

    componentWillMount() {
        new Store().getSession(Const.PASS_WORD).then(pass => {
            if (!pass || pass.length === 0) {
                Actions.LoginNew();
            } else {
                return null;
            }
        })
    }

    componentDidMount() {
    //     new Store().getSession(Const.PASS_WORD).then(pass => {
    //       if (!pass || pass.length === 0) {
    //         this.setState({
    //             listOptions: [
    //                 {
    //                     icon: require('../../config/images/private/tab_user/user.png'),
    //                     title: 'Quyền lợi bảo hiểm',
    //                     type: 'BENEFITS'
    //                 },
    //                 {
    //                     icon: require('../../config/images/private/tab_user/Customer.png'),
    //                     title: 'Hợp đồng khách hàng',
    //                     type: 'CUSTOMER_CONTRACT'
    //                 },
    //                 {
    //                     icon: require('../../config/images/private/tab_user/Customer.png'),
    //                     title: 'Danh sách yêu cầu bồi thường',
    //                     type: 'LIST_COMPENSATION'
    //                 },
    //                 {
    //                     icon: require('../../config/images/private/tab_user/Commision.png'),
    //                     title: 'Hoa hồng cho cộng tác viên',
    //                     type: 'COMMISSIONS'
    //                 },
    //                 {
    //                     icon: require('../../config/images/private/tab_user/KPI.png'),
    //                     title: 'KPI',
    //                     type: 'KPI'
    //                 },
    //                 {
    //                     icon: require('../../config/images/private/tab_user/ic_log_out.png'),
    //                     title: 'Đăng nhập',
    //                     type: 'LOG_IN'
    //                 }
    //             ],
    //         })
    //       } else {
    //         this.setState({
    //             listOptions: [
    //                 {
    //                     icon: require('../../config/images/private/tab_user/user.png'),
    //                     title: 'Quyền lợi bảo hiểm',
    //                     type: 'BENEFITS'
    //                 },
    //                 {
    //                     icon: require('../../config/images/private/tab_user/Customer.png'),
    //                     title: 'Hợp đồng khách hàng',
    //                     type: 'CUSTOMER_CONTRACT'
    //                 },
    //                 {
    //                     icon: require('../../config/images/private/tab_user/Customer.png'),
    //                     title: 'Danh sách yêu cầu bồi thường',
    //                     type: 'LIST_COMPENSATION'
    //                 },
    //                 {
    //                     icon: require('../../config/images/private/tab_user/Commision.png'),
    //                     title: 'Hoa hồng cho cộng tác viên',
    //                     type: 'COMMISSIONS'
    //                 },
    //                 {
    //                     icon: require('../../config/images/private/tab_user/KPI.png'),
    //                     title: 'KPI',
    //                     type: 'KPI'
    //                 },
    //                 {
    //                     icon: require('../../config/images/private/tab_user/ic_change_pass.png'),
    //                     title: 'Đổi mật khẩu',
    //                     type: 'CHANGE_PASS'
    //                 },
    //                 {
    //                     icon: require('../../config/images/private/tab_user/ic_log_out.png'),
    //                     title: 'Đăng xuất',
    //                     type: 'LOG_OUT'
    //                 }
    //             ],
    //         })
    //       }
    //   })

        new Store().getSession(Const.TOKEN).then(token => {
            const _data = token.length > 0 ? this.parseJwt(token) : {};
            new Store().getSession(Const.URL_ORC).then(urlORC => {
                if (
                    (!urlORC || urlORC.length === 0) &&
                    (_data.email !== 'ngoc@inso.vn') &&
                    (_data.email.includes('@inso.vn'))) {
                    this.setState({modalORC: true});
                }
            })
            this.setState({
                dataToken: token
            })
        })
    }

    handlePress = (item) => {
        if (item?.type == 'CHANGE_PASS') {
            Actions.ChangePass()
        }else if (item?.type == 'LOG_OUT') {
            this.setState({
                isOpen:true
            })
        } else if (item?.type == 'COMMISSIONS') {
            Actions.Commissions()
        } else if (item?.type == 'BENEFITS') {
            Actions.Benefits()
        } else if (item?.type == 'KPI') {
            Actions.KPI()
        } else if (item?.type == 'CUSTOMER_CONTRACT') {
            Actions.CustomerContract({id: 'Customer'})
        } else if (item?.type == 'LIST_COMPENSATION') {
            Actions.ListCompensation()
        }
    }
    parseJwt (token) {
        return jwt_decode(token);
    };

    setORC = (data) => {
        if (data.url !== URL) {
            const {dataToken} = this.state;
            const _data = dataToken.length > 0 ? this.parseJwt(dataToken) : {};
            new Store().getSession(Const.PASS_WORD).then(pass => {
                this.handleNext(data.url, data.domain, _data.username, pass)
            })
        }
    };

    handleNext = (_URL, domain, userName, pass) => {
        const {getInsuranceInfo} = this.props;
        let body = {
            "domain": domain,
            "username": userName,
            "password": pass
        }
        let url = `${_URL}/api/account/v1/users/login`
        console.log('url', url, domain, userName, pass)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then(res => {
                console.log('======res-acóntarcsfdfdcontract', res)
                if (res.status == 200 || res.status == 'success') {
                    new Store().storeSession(Const.URL_ORC, _URL);
                    new Store().storeSession(Const.TOKEN, res?.data?.access_token);
                    getInsuranceInfo(res?.data?.access_token);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    logout = () => {
        this.setState({isOpen:null});
        new Store().storeSession(Const.TOKEN, null)
        new Store().storeSession(Const.IS_LOGIN, null)
        new Store().storeSession(Const.PASS_WORD, null)
        new Store().storeSession(Const.URL_ORC, null);
        // this.props.saveMotorType(null)
        // this.props.saveBuyerMotor(null)
        this.props.onLogout();
        // Actions.tab('home');
        Actions.LoginNew();
    }
    render() {
        const {hideBack} = this.props;
        const { listOptions, dataToken, modalORC } = this.state
        const _data = dataToken.length > 0 ? this.parseJwt(dataToken) : {};
        return (
            <View style={styles.container}>
                <ModalORC
                    open={false}
                    onClosed={() => this.setState({modalORC: false})}
                    setSex={data => this.setORC(data)}
                    onOpened={() => this.setState({modalORC: true})}
                    nameSelected={URL}
                />
                <View>
                    <Nav show={true}
                        isInfo={false}
                        title={'TÀI KHOẢN'}
                        onPress={() => Actions.pop()}
                        show={!hideBack}
                    />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -40 }}>
                    {
                        listOptions?.map((item, index) => {
                            if(item.type === 'BENEFITS' && _data.organizationCode !== 'SVFC') return null;
                            return (
                                <TouchableOpacity onPress={() => this.handlePress(item)} key={index} style={{
                                    backgroundColor: '#ffffff', shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,
                                    elevation: 3, flexDirection: 'row', height: 'auto', paddingVertical: 15, marginHorizontal: 24, borderRadius: 10, marginVertical: 10
                                }}>
                                    <View style={{flex:1, alignItems: 'center', borderLeftWidth: 1, borderColor: Color }}>
                                        {item.icon}
                                    </View>
                                    <View style={{ flex: 5, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 14,  color: '#414042' }}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <View style={{ height: 15 }} />
                <Modal
                    isVisible={this.state.isOpen}
                    style={{margin: 0, justifyContent: 'flex-end'}}
                    onBackButtonPress={()=>this.setState({isOpen:null})}
                    onBackdropPress={()=>this.setState({isOpen:null})}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                >
                    <View style={{ flex:0.25, backgroundColor: '#fff', borderTopLeftRadius:20,borderTopRightRadius:20}}>
                        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                                <Text style={{color: '#414042',fontSize:16,fontWeight:'bold',textAlign:'center'}}>Bạn có muốn đăng xuất không?</Text>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
                            <TwoButton
                                label={'KHÔNG'}
                                labelConfirm={'CÓ'}
                                backgroundColor={Color}
                                onPressConfirm={()=>this.logout()}
                                onPress={() => this.setState({isOpen:null})}/>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchInput: {
        marginHorizontal: 30,
        marginTop: -10
    },
    ctModal: {
        backgroundColor: '#fff',
        flex:0.25,
        borderTopLeftRadius:20,borderTopRightRadius:20
    },
    oval: {
        marginTop: '-40@ms',
        alignSelf: 'center',
        width: '105%',
        height: '25%',
        borderRadius: 100,
        backgroundColor: Color,

    },
    containNoBank: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '30@vs',
    },
    ic_bank: {
        height: '70@vs',
        width: '70@s',
    },
    txtNoBank: {
        fontSize: '14@s',
        color: '#A8A8A8',
        paddingVertical: '15@vs',
        textAlign: 'center',
    },
    ic_add_bank: {
        height: '16@vs',
        width: '16@s',
    },
    txtAddBank: {
        fontSize: '14@s',
        color: Color,
        paddingLeft: '5@s',
    },
    containAddBank: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: '20@vs',
    },
    containInformation: {
        marginVertical: 5,
        borderRadius: 15,
        paddingVertical: 10,
        paddingLeft: 15,
        flex: 1,
    },
    ic_arrow: {
        height: '12@vs',
        width: '12@s',
        marginRight: '10@s',
    },
    wrapperInfor: {
        backgroundColor: 'white',
        marginTop: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal: '15@s',
        shadowOpacity: Platform.OS === 'android' ? 0.6 : 0.2,
        shadowRadius: 10,
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 0,
        },
    },
    containView: {
        marginHorizontal: '15@s',
        marginTop: 5,
    },
    containSubInfor: {
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    containFullSubInfor: {
        backgroundColor: '#F4F4F4',
        marginHorizontal: '5@s',
        borderBottomLeftRadius: '10@ms',
        borderBottomRightRadius: '10@ms',
        paddingBottom: '10@ms'

    },
    txtText1: {
        flex: 1,
        lineHeight: 20,
        fontSize: 15,
        color: '#000000',
        fontWeight: '400',
    },
    txtText2: {
        marginHorizontal: '10@s',
    },
    txtTitle: {
        fontSize: '15@s',
        fontWeight: '500',
        textAlign: 'center',
        paddingVertical: '15@vs',
    },
    ic_search: {
        height: '19@vs',
        width: '19@s',
    },
    txtText: {
        color: '#333',
        fontSize: 14
    },
    txtTextHotline: {
        color: '#be3030',
        fontSize: '15@ms'
    },

    containSearch: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',

    },
});




const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveMotorType: body => dispatch(saveMotorType(body)),
        saveBuyerMotor:body => dispatch(saveBuyerMotor(body)),
        getInsuranceInfo: (token) => dispatch(getInsuranceInfo(token)),
        onLogout: () => dispatch({type: 'RESET_STORE'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNew);
