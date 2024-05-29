'use strict';

import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    ScrollView,
    FlatList,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image'
import { checkExpToken } from '../../config/decodeToken'
import Const from '../../services/Const';
import Modal from 'react-native-modal';
import jwt_decode from "jwt-decode";
import TwoButton from '../../components/TwoButton';
import { isIPhoneX } from '../../utils/Util';
import { getNotifyInfo, postNotify } from '../ListNotify/actions';
import { infoInsur } from '../ListNotify/assets';
import messaging from '@react-native-firebase/messaging';
import ManageContractsSvg from '../../config/images/tab_user/ManageContractsSvg';
import IconCommissionSvg from '../../config/images/tab_user/IconCommissionSvg';
import PadlockSvg from '../../config/images/tab_user/PadlockSvg';
import LogoutSvg from '../../config/images/tab_user/LogoutSvg';

class InsuranceType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // organizationCode: '',
            listInsurance: dataContracts,
            numColumns: 2,
            openModal: false,
            showModal: false,
            userName: '',
            isOpen:null,
        };

    }


    componentWillMount() {
        new Store().getSession(Const.TOKEN).then(token => {
            if (!checkExpToken(token)) {
                this.setState({
                    openModal: true
                })
            }
        })
    }

    componentDidMount() {
        const {
            getNotifyInfo, 
            insuranceInfo, 
            permissionUser, 
            getInsuranceInfo, 
            getPermissionUser
        } = this.props;
         new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(token);
            this.setState({userName: dataToken?.fullName});
        })
        this._checkPermission();
        if (!permissionUser) {
            getPermissionUser();
        }
        if (!insuranceInfo || insuranceInfo.length === 0) {
            getInsuranceInfo();
        }
        getNotifyInfo();
    }
    
    _checkPermission = async() => {
        const enabled = await messaging().hasPermission();
        if (enabled) {
            const {postNotify} = this.props;
            const device = await messaging().getToken();
             new Store().getSession(Const.TOKEN).then(token => {
                const dataToken = jwt_decode(token);
                this.setState({userName: dataToken?.fullName});
                postNotify(device, dataToken?.userId, dataToken?.organizationCode);
            })
        }
        else this._getPermission() 
    } 
    
    _getPermission = async() => {
        messaging().requestPermission()
        .then(() => {
            this._checkPermission()
        })
        .catch(error => {
            // User has rejected permissions  
        });
    }

    gotoLogin = () => {
        this.setState({
            openModal: false
        })
        new Store().storeSession(Const.TOKEN, null)
        new Store().storeSession(Const.IS_LOGIN, null)
        this.props.saveMotorType(null)
        this.props.saveBuyerMotor(null)
        Actions.LoginNew()
    }

    onChooseInsurance = (code) => {
        switch (code) {
            case 'C1':
                return Actions.IntroductionTNDSCar({ insurProductCode: 'C1' });
            case 'M1':
                return Actions.Introduction({ insurProductCode: 'M1' });
            case 'A1':
                return Actions.AccidentIntroScreen({ insurProductCode: ['A1', 'A2'] });
            case 'C2':
                return Actions.IntroductionCarPhysical();
                // return Actions.PhotoCarY();
            case 'M3':
                return Actions.IntroductionMotorPhysical();
            case 'H1':
                return Actions.IntroductionHouse();
            case 'T1':
                return Actions.IntroductionTravel();
            case 'DF1':
                return Actions.IntroductionDelayFlight();
            case 'A3':
                return Actions.IntroScreen24h();
            case 'A4':
                return Actions.IntroScreenVTA();
            case 'A8':
                return Actions.IntroScreenFaSecure();
            default:
                return;
        }
    }
    renderItem = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => this.onChooseInsurance(item.code)}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    height: 150,
                    borderRadius: 20,
                    width: 150,
                    alignSelf: 'center',
                    marginBottom: 25,
                }}>
                <FastImage
                    source={infoInsur[item.code] ? infoInsur[item.code].background : infoInsur.default.background}
                    style={{ position: 'absolute', height: 150, width: 150, borderRadius: 10 }}
                />
                {infoInsur[item.code] ? infoInsur[item.code].iconBG : infoInsur.default.iconBG}
                <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 14, marginTop: 6 }}>
                    {/* {item.title === 'BH Tai nạn' && organizationCode === 'SVFC' ? 'BH gia đình\nyêu thương' : item.title} */}
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    }

    formatRow = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }
        return data;
    }


    onPressLogout = () => {
        new Store().storeSession(Const.TOKEN, null)
        new Store().storeSession(Const.IS_LOGIN, null)
        this.props.saveMotorType(null)
        this.props.saveBuyerMotor(null)
        Actions.LoginNew()
    }

    logout = () => {
        this.setState({isOpen:null});
        new Store().storeSession(Const.TOKEN, null)
        new Store().storeSession(Const.IS_LOGIN, null)
        new Store().storeSession(Const.PASS_WORD, null)
        new Store().storeSession(Const.URL_ORC, null);
        this.props.onLogout();
        // Actions.tab('home')
        Actions.LoginNew()
    }

    render() {
        const {insuranceInfo, notifyInfo} = this.props;
        const { listInsurance, showModal, userName } = this.state;
        const notRead = notifyInfo?.notRead;
        const arr = listInsurance.filter(item => insuranceInfo && insuranceInfo.find(obj => obj.code === item.code || obj.code === item.codes));
        return (
            <View style={styles.container}>
                <Nav show={false} isInfo={false} title={'CHỌN LOẠI BẢO HIỂM'}
                    onPress={() => this.setState({showModal: true})}
                    notRead={notRead}
                    isHome
                    isNotify
                />
                <ScrollView>
                    <FlatList
                        // data={this.formatRow(this.state.listInsurance, this.state.numColumns)}
                        data={arr}
                        style={{ marginTop: 24, marginHorizontal: 10 }}
                        horizontal={false}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}

                    />
                </ScrollView>
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
                <Modal
                    isVisible={showModal}
                    style={{margin: 0}}
                    onBackButtonPress={() => this.setState({showModal: false})}
                    onBackdropPress={() => this.setState({showModal: false})}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                    animationIn="slideInLeft"
                    animationOut="slideOutLeft"
                >
                    <View style={{
                        backgroundColor: '#fff',
                        height: '100%',
                        width: '70%',
                        paddingHorizontal: 24,
                    }}>
                        {
                            nameApp.includes('EPTI') || nameApp.includes('IAGENT') || nameApp.includes('INSO') ? (
                                <View style={{marginTop: 30}} />
                            ) : (
                                <FastImage
                                    source={
                                        nameApp.includes('YCHI') ?
                                        require('../../config/images/public/icons/logoHomeYChi.png') :
                                        require('../../config/images/public/icons/logoHome.png')
                                    } 
                                    style={{ 
                                        height: nameApp.includes('YCHI') ? 46 : 40, 
                                        width: nameApp.includes('YCHI') ? 91 : 133, 
                                        alignSelf: nameApp.includes('YCHI') ? 'flex-start' : 'center',
                                        marginTop: isIPhoneX ? 60 : 40 
                                    }}
                                    resizeMode={'contain'}
                                />
                            )
                        }
                        <View style={{marginTop: 24}}>
                            <Text style={{ marginLeft: 2, fontSize: 14, fontWeight: 'bold', color: TxtColor}}>{userName}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({showModal: false}, () => Actions.CustomerContract({id: 'Customer'}));;
                                }}
                                style={{flexDirection: 'row', marginTop: 8, paddingVertical: 8}}>
                                <ManageContractsSvg height={16} width={16} />
                                <Text style={{marginLeft: 7, fontSize: 14, color: TxtColor}}>Quản lý hợp đồng BH</Text>
                            </TouchableOpacity>
                            {
                                !nameApp.includes('EPTI') && !nameApp.includes('INSO') ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({showModal: false}, () => Actions.ManageCommission());
                                        }}
                                        style={{flexDirection: 'row', paddingVertical: 8}}>
                                        <IconCommissionSvg height={16} width={17} />
                                        <Text style={{marginLeft: 7, fontSize: 14, color: TxtColor}}>Quản lý hoa hồng</Text>
                                    </TouchableOpacity>
                                ) : null
                            }
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({showModal: false}, () => Actions.ChangePass());
                                }}
                                style={{flexDirection: 'row', paddingVertical: 8}}>
                                <PadlockSvg height={16} width={16} />
                                <Text style={{marginLeft: 7, fontSize: 14, color: TxtColor}}>Đổi mật khẩu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        showModal: false,
                                    })
                                    setTimeout(() => {
                                        this.setState({
                                            isOpen:true,
                                        })
                                    }, 600);
                                }}
                                style={{flexDirection: 'row', paddingVertical: 8, paddingLeft: 3}}>
                                <LogoutSvg height={15} width={15} />
                                <Text style={{marginLeft: 5, fontSize: 14, color: TxtColor}}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <BaseModal
                    open={this.state.openModal}
                    forceUpdate={true}
                    onPress={() => this.gotoLogin()}
                    label={'ĐỒNG Ý'}
                    text="Phiên bản đăng nhập đã hết hạn. Mời bạn đăng nhập lại."
                />
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    searchInput: {
        marginHorizontal: 30,
        marginTop: -10
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
    item: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 10,
        backgroundColor: 'red'
    },
});


import SimpleToast from 'react-native-simple-toast';
import Nav from '../../components/Nav';
import Input from '../../components/Input';
import { connect } from 'react-redux';
import { saveCarInsuranceType } from '../../actions/app'
import { Color, dataContracts, nameApp, TxtColor } from '../../config/System';
import IntroductionTNDSCar from '../TNDSCAR/IntroductionTNDSCar';
import Store from '../../services/Store';
import ModalCancelPayment from '../../components/ModalCancelPayment';
import BaseModal from '../../components/BaseModal';
import { getInsuranceInfo, getPermissionUser } from './actions';
import { saveBuyerMotor, saveMotorType } from '../Motorbike/actions/motorActions';

const mapStateToProps = (state) => {
    return {
        insuranceInfo: state.insurance.insuranceInfo,
        permissionUser: state.insurance.permissionUser,
        notifyInfo: state.notifyInfo.notifyInfo,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        postNotify: (deviceToken, userId, organizationCode) => dispatch(postNotify(deviceToken, userId, organizationCode)),
        getNotifyInfo: () => dispatch(getNotifyInfo()),
        getInsuranceInfo: () => dispatch(getInsuranceInfo()),
        getPermissionUser: () => dispatch(getPermissionUser()),
        saveCarInsuranceType: (body) => dispatch(saveCarInsuranceType(body)),
        saveMotorType: body => dispatch(saveMotorType(body)),
        saveBuyerMotor: body => dispatch(saveBuyerMotor(body)),
        onLogout: () => dispatch({type: 'RESET_STORE'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceType);
