'use strict';

import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Clipboard,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import SimpleToast from 'react-native-simple-toast';
import {getLevelUser} from '../../Account/actions';
import IconCopySvg from '../../../config/images/icons/IconCopySvg';
import IconUpItemSvg from '../../../config/images/icons/IconUpItemSvg';
import IconDownItemSvg from '../../../config/images/icons/IconDownItemSvg';
import IconSuccessSvg from '../../../config/images/icons/IconSuccessSvg';

class ShowRefCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
        }
    }

    componentDidMount() {
        const {referralDefault, getLevelUser} = this.props;
        getLevelUser(referralDefault?.roleCode);
    }
    
    onCopy = (value) => {
        SimpleToast.show('Đã sao chép', 0.5);
        Clipboard.setString(value);
    };

    render() {
        const {referrals, userLevels, orgCode, referralDefault} = this.props;
        const {isShow} = this.state;
        return (
            <>
                {
                    userLevels && referralDefault?.referralLevel >= 0 && orgCode !== 'INSO' && orgCode !== 'DLJSC' ? (
                        <>
                            {/* <View style={{flexDirection: 'row', marginTop: 12}}>
                                <View style={{flex: 1}}>
                                    <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Cấp người dùng</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{color: TxtColor, fontSize: 14}}>
                                        F{referralDefault?.referralLevel}
                                    </Text>
                                </View>
                            </View> */}
                            {
                                (referralDefault?.referralLevel !== 0) && (userLevels - 1 <= referralDefault?.referralLevel) ? (
                                    referrals?.length > 1 ? (
                                        <View style={{flexDirection: 'row', marginTop: -12}}>
                                            <TouchableOpacity
                                                style={{flex: 1, alignItems: 'flex-end'}}
                                                onPress={() => this.setState({isShow: !isShow})}
                                            >
                                                {
                                                    isShow ? (
                                                        <IconUpItemSvg width={14} height={14} color={'#8D8C8D'} />
                                                    ) : (
                                                        <IconDownItemSvg width={14} height={14} color={'#8D8C8D'} />
                                                    )
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    ) : null
                                ) : (
                                    <View style={{flexDirection: 'row', marginTop: 12}}>
                                        <View style={{flex: 1}}>
                                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Mã giới thiệu của bạn</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                            {
                                                referrals?.length > 1 ? (
                                                    <TouchableOpacity
                                                        style={{flex: 1, alignItems: 'flex-end'}}
                                                        onPress={() => this.setState({isShow: !isShow})}
                                                    >
                                                        {
                                                            isShow ? (
                                                                <IconUpItemSvg width={14} height={14} color={'#8D8C8D'} />
                                                            ) : (
                                                                <IconDownItemSvg width={14} height={14} color={'#8D8C8D'} />
                                                            )
                                                        }
                                                    </TouchableOpacity>
                                                ) : (
                                                    <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} onPress={() => this.onCopy(referralDefault?.referralCode)}>
                                                        <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>
                                                            {referralDefault?.referralCode}
                                                        </Text>
                                                        <IconCopySvg height={16} width={16} color={TxtColor} style={{marginLeft: 7}} />
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </View>
                                    </View>
                                )
                            }
                        </>
                    ) : (
                        <View style={{flexDirection: 'row', marginTop: 12}}>
                            <View style={{flex: 1}}>
                                <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Mã giới thiệu của bạn</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                {
                                    referrals?.length > 1 ? (
                                        <TouchableOpacity
                                            style={{flex: 1, alignItems: 'flex-end'}}
                                            onPress={() => this.setState({isShow: !isShow})}
                                        >
                                            {
                                                isShow ? (
                                                    <IconUpItemSvg width={14} height={14} color={'#8D8C8D'} />
                                                ) : (
                                                    <IconDownItemSvg width={14} height={14} color={'#8D8C8D'} />
                                                )
                                            }
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} onPress={() => this.onCopy(referralDefault?.referralCode)}>
                                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>
                                                {referralDefault?.referralCode}
                                            </Text>
                                            <IconCopySvg height={16} width={16} color={TxtColor} style={{marginLeft: 7}} />
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </View>
                    )
                }
                {
                    referrals?.length > 1 && isShow ? (
                        <View style={{flexDirection: 'row', marginTop: 12}}>
                            <View style={{flex: 1}}>
                                <View style={{flexDirection:'row',backgroundColor:'#F6F5F6',borderWidth: 1,borderColor:'#D9D9D9'}}>
                                    <View style={{justifyContent:'center',alignItems: 'center', paddingHorizontal: 8, paddingVertical: 12, borderRightWidth:1,borderColor:'#D9D9D9',flex:1}}>
                                        <Text style={{fontSize:14,color: TxtColor, fontWeight:'bold'}}>Mã giới thiệu</Text>
                                    </View>
                                    <View style={{justifyContent:'center',alignItems: 'center', paddingHorizontal: 8, paddingVertical: 12, flex:1}}>
                                        <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>Đại lý</Text>
                                    </View>
                                </View>
                                {
                                    referrals.map(item => (
                                        <View style={{flexDirection:'row',borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,borderColor:'#D9D9D9'}}>
                                            <View style={{justifyContent:'center',alignItems: 'center', paddingHorizontal: 8, paddingVertical: 12, borderRightWidth:1,borderColor:'#D9D9D9',flex:1}}>
                                                {
                                                    userLevels && (referralDefault?.referralLevel !== 0) && (userLevels - 1 <= referralDefault?.referralLevel) ? null : (
                                                        <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} onPress={() => this.onCopy(item?.referralCode)}>
                                                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>
                                                                {item?.referralCode}
                                                            </Text>
                                                            <IconCopySvg height={16} width={16} color={TxtColor} style={{marginLeft: 7}} />
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            </View>
                                            <View style={{justifyContent:'center',alignItems: 'center', paddingHorizontal: 8, paddingVertical: 12,flex:1, flexDirection: 'row'}}>
                                                <Text style={{fontSize:14,color: TxtColor}}>{item?.organizationName}</Text>
                                                {
                                                    item?.organizationName === referralDefault?.organizationName ? (
                                                        <IconSuccessSvg width={15} height={15} style={{marginLeft: 5}} />
                                                    ) : null
                                                }
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    ) : null
                }
            </>
        );
    }
}

const styles = ScaledSheet.create({
});

import { connect } from 'react-redux';
import { TxtColor } from '../../../config/System';

const mapStateToProps = (state) => {
    return {
        userLevels: state.userInfo.userLevels,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getLevelUser: (role) => dispatch(getLevelUser(role)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowRefCode);
