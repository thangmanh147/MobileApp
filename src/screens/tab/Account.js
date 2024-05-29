'use strict';

import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Clipboard,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";
import SimpleToast from 'react-native-simple-toast';
import {getUserInfo, getProfileInfo} from '../Account/actions';
import {getTotalFull} from '../Commissions/actions';
import TwoButton from '../../components/TwoButton';
import IconProfileSvg from '../../config/images/icons/IconProfileSvg';
import IconChangePass from '../../config/images/icons/IconChangePass';
import IconLogoutSvg from '../../config/images/icons/IconLogoutSvg';
import IconArrowRightSvg from '../../config/images/icons/IconArrowRightSvg';
import IconUpItemSvg from '../../config/images/icons/IconUpItemSvg';
import IconDownItemSvg from '../../config/images/icons/IconDownItemSvg';
import IconEditUserSvg from '../../config/images/icons/IconEditUserSvg';
import IconCommissionSvg from '../../config/images/icons/IconCommissionSvg';
import IconCopySvg from '../../config/images/icons/IconCopySvg';
import IconRevenueSvg from '../../config/images/icons/IconRevenueSvg';
import IconInfoSvg from '../../config/images/icons/IconInfoSvg';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import IconIntroSvg from '../../config/images/icons/IconIntroSvg';
import ModalAddRole from '../Account/ModalAddRole';
import ShowRefCode from '../Account/components/ShowRefCode';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: null,
            showReason: false,
            orgCode: '',
        };

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
        new Store().getSession(Const.TOKEN).then(token => {
            if (token) {
                const {getUserInfo, getProfileInfo, getCommissionFull} = this.props;
                const dataToken = jwt_decode(token);
                this.setState({ orgCode: dataToken?.organizationCode });
                getUserInfo();
                getProfileInfo();
                getCommissionFull();
            }
        })
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

    onNext = () => {
        const {dataProfile} = this.props;
        if (dataProfile?.status) {
            if (dataProfile?.status === 'rejected') {
                this.setState({showReason: true});
            } else {
                Actions.Profile();
            }
        } else {
            Actions.UpdateProfile();
        }
    }

    onCopy = (value) => {
        SimpleToast.show('Đã sao chép', 0.5);
        Clipboard.setString(value);
    };

    render() {
        const {dataUser, dataProfile, commissionFull} = this.props;
        const {isOpen, orgCode, showReason} = this.state;
        const referralDefault = dataUser?.referrals ?
            (
                dataUser?.referrals?.length === 1 ? dataUser?.referrals[0] : dataUser?.referrals?.find((item) => item?.isDefault)
            ) : {};
        return (
            <View style={styles.container}>
                <View style={{zIndex: 100}}>
                    <Nav show={false} isInfo={false} title={'TÀI KHOẢN'} bottom={20} />
                </View>
                <View style={{zIndex: 100}}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -40 }}>
                        <View style={{ alignSelf: 'center' }}>
                            <FastImage source={require('../../icons/iconAgent/ic_avatar.png')}
                                style={{ height: 90, width: 90, }} />
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 12, marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>{dataUser?.fullName || 'Chào bạn'}</Text>
                </View>
                <View style={{
                    marginHorizontal: 24,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                        <View style={{
                            backgroundColor: '#FEB404',
                            flexDirection: 'row',
                            borderTopLeftRadius: 15,
                            borderBottomLeftRadius: 15,
                            paddingLeft: 32,
                            paddingVertical: 4,
                            alignItems: 'center'
                        }}>
                            <FastImage source={require('../../icons/iconAgent/ic_diamon_white.png')}
                                style={{ height: 16, width: 16 }} resizeMode={'contain'} />
                            <Text style={{ marginLeft: 4, color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>0 <Text style={{fontSize: 12, fontWeight: 'normal'}}>điểm</Text></Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#FEB404', paddingHorizontal: 8, paddingVertical: 4}}>
                        <View style={{width: 1, backgroundColor: 'white', height: 20}} />
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            backgroundColor: '#FEB404',
                            flexDirection: 'row',
                            borderTopRightRadius: 15,
                            borderBottomRightRadius: 15,
                            paddingRight: 32,
                            paddingVertical: 4,
                            alignItems: 'center'
                        }}>
                            <FastImage source={require('../../icons/iconAgent/ic_money_acount.png')}
                                style={{ height: 16, width: 16 }} resizeMode={'contain'} />
                            <Text style={{ marginLeft: 4, color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>{`${formatVND(Math.round(commissionFull?.total || 0))} `}<Text style={{fontSize: 12, fontWeight: 'normal'}}>đ</Text></Text>
                        </View>
                    </View>
                </View>
                <ScrollView
                    style={{marginTop: 12}}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: 50,
                    }}
                >
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Họ và tên</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, marginRight: 20}}>{dataUser?.fullName}</Text>
                            <TouchableOpacity onPress={() => Actions.UpdateFullName()} style={{position: 'absolute', right: 0}}>
                                <IconEditUserSvg width={16} height={16} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Số điện thoại</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14}}>{dataUser?.phone}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Email</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, marginRight: 20}}>{dataUser?.email}</Text>
                            <TouchableOpacity onPress={() => Actions.UpdateEmail()} style={{position: 'absolute', right: 0}}>
                                <IconEditUserSvg width={16} height={16} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ModalAddRole referralDefault={referralDefault} />
                    <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Tên nhóm</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between'}}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    marginRight: 5,
                                    color: TxtColor
                                }}>
                                {referralDefault?.roleName}
                            </Text>
                        </View>
                    </View>
                    {
                        dataUser ? (
                            <ShowRefCode referrals={dataUser?.referrals} orgCode={orgCode} referralDefault={referralDefault} />
                        ) : null
                    }
                    <View style={{height: 8, backgroundColor: '#F6F5F6', marginVertical: 20, marginHorizontal: -24}} />
                    <TouchableOpacity
                        style={{flexDirection: 'row', justifyContent: 'space-between'}}
                        onPress={this.onNext}
                    >
                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                            <IconProfileSvg width={16} height={16} />
                            <Text style={{fontSize: 14, marginLeft: 8, color: TxtColor, fontWeight: 'bold'}}>Hồ sơ</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        marginRight: 5,
                                        color: dataProfile?.status ? statusProfile[dataProfile.status].color : statusProfile.default.color
                                        // color: statusProfile.default.color
                                    }}>
                                    {
                                        dataProfile ? (dataProfile.status ? statusProfile[dataProfile.status].name : statusProfile.default.name) : ''
                                        // statusProfile.default.name
                                    }
                                </Text>
                                {
                                    dataProfile?.status === 'rejected' ? (
                                        <IconInfoSvg width={15} height={15} color={errValidColor} />
                                    ) : null
                                }
                            </View>
                            <IconArrowRightSvg width={10} height={10} color={'#8D8C8D'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Actions.ListReferralAcc()} style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <IconIntroSvg width={16} height={16} color={Color} />
                            <Text style={{fontSize: 14, marginLeft: 8, color: TxtColor, fontWeight: 'bold'}}>Danh sách người dùng cấp dưới</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <IconArrowRightSvg width={10} height={10} color={'#8D8C8D'} />
                        </View>
                    </TouchableOpacity>
                    {
                        (nameApp.includes('IAGENT') && orgCode !== 'INSO') ? (
                            <TouchableOpacity onPress={() => Actions.IntroCommission()} style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <IconCommissionSvg width={16} height={16} color={Color} />
                                    <Text style={{fontSize: 14, marginLeft: 8, color: TxtColor, fontWeight: 'bold'}}>Giới thiệu hoa hồng</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <IconArrowRightSvg width={10} height={10} color={'#8D8C8D'} />
                                </View>
                            </TouchableOpacity>
                        ) : null
                    }
                    <TouchableOpacity onPress={() => Actions.ManageRevenue()} style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <IconRevenueSvg width={18} height={18} color={Color} />
                            <Text style={{fontSize: 14, marginLeft: 6, color: TxtColor, fontWeight: 'bold'}}>Báo cáo doanh thu</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <IconArrowRightSvg width={10} height={10} color={'#8D8C8D'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Actions.ChangePass()} style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <IconChangePass width={16} height={16} />
                            <Text style={{fontSize: 14, marginLeft: 8, color: TxtColor, fontWeight: 'bold'}}>Đổi mật khẩu</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <IconArrowRightSvg width={10} height={10} color={'#8D8C8D'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({isOpen: true})} style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <IconLogoutSvg width={16} height={16} style={{marginLeft: 2}} />
                            <Text style={{fontSize: 14, marginLeft: 6, color: TxtColor, fontWeight: 'bold'}}>Đăng xuất</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <IconArrowRightSvg width={10} height={10} color={'#8D8C8D'} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <Modal
                    isVisible={showReason}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    onBackButtonPress={() => this.setState({showReason: false})}
                    onBackdropPress={() => this.setState({showReason: false})}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingTop: 24,
                            paddingHorizontal: 24,
                            paddingBottom: 32,
                            alignItems: 'center'
                        }}>
                        <NotifyRingSvg width={53} height={60} />
                        <View style={{marginTop: 28, marginBottom: 32 }}>
                            <Text style={{ fontSize: 14, color: errValidColor, textAlign: 'center' }}>
                                Hồ sơ của bạn đã bị từ chối
                            </Text>
                            {
                                dataProfile?.rejectReason ? (
                                    <Text style={{ marginTop: 4, fontSize: 14, color: errValidColor, textAlign: 'center' }}>
                                        Lý do: {dataProfile.rejectReason}
                                    </Text>
                                ) : null
                            }
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({showReason: false}, () => {
                                    Actions.Profile();
                                })
                            }}
                            style={{
                                width: '100%',
                                paddingVertical: 16,
                                backgroundColor: Color,
                                borderRadius: 10,
                                alignItems: 'center'
                            }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                                XEM CHI TIẾT
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    isVisible={isOpen}
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
                                <Text style={{color: TxtColor,fontSize:16,fontWeight:'bold',textAlign:'center'}}>Bạn có muốn đăng xuất không?</Text>
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
});

import Nav from '../../components/Nav';
import { connect } from 'react-redux';
import { Color, errValidColor, nameApp, TxtColor } from '../../config/System';
import Store from '../../services/Store';
import { statusProfile } from '../Account/assets';
import { formatVND } from '../../components/Functions';

const mapStateToProps = (state) => {
    return {
        dataUser: state.userInfo.userInfo,
        dataProfile: state.userInfo.profileInfo,
        commissionFull: state.commissions.totalFull,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => dispatch(getUserInfo()),
        getProfileInfo: () => dispatch(getProfileInfo()),
        getCommissionFull: () => dispatch(getTotalFull()),
        onLogout: () => dispatch({type: 'RESET_STORE'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
