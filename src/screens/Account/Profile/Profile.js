'use strict';

import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    componentDidMount() {
        const { bankInfo, getBank } = this.props;
        if (!bankInfo) {
            getBank();
        }
    }

    render() {
        const {dataUser, dataProfile, bankInfo} = this.props;
        const dataBank = bankInfo && bankInfo.find(item => item.id == dataProfile?.bankId);
        return (
            <View style={styles.container}>
                <View style={{zIndex: 100}}>
                    <Nav show isInfo={false} bottom={20} />
                </View>
                <ScrollView
                    style={{
                        marginTop: -40,
                        zIndex: 100,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        backgroundColor: 'white'
                    }}
                >
                    <Text style={{color: TxtColor, fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 32}}>
                        HỒ SƠ
                    </Text>
                    <Text
                        style={{
                            color: dataProfile?.status ? statusProfile[dataProfile.status].color : statusProfile.default.color,
                            fontSize: 14,
                            textAlign: 'center',
                            marginTop: 4
                        }}>
                        {dataProfile?.status ? statusProfile[dataProfile.status].name : statusProfile.default.name}
                    </Text>
                    <Text style={{color: TxtColor, fontWeight: 'bold', fontSize: 14, marginTop: 16}}>
                        1. Ảnh CMND/CCCD:
                    </Text>
                    <View style={{flex: 1, flexDirection: 'row', marginTop: 16}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <FastImage
                                style={{width: 98, height: 70, borderRadius: 10, backgroundColor: 'black'}}
                                source={{
                                    uri: dataProfile?.identifyImages && dataProfile?.identifyImages.find(item => item.code === 'front') ? dataProfile?.identifyImages.find(item => item.code === 'front').source : ''
                                }}
                                resizeMode={'contain'}
                            />
                            <Text style={{color: TxtColor, fontSize: 14, marginTop: 7}}>
                                Mặt trước CMND/CCCD
                            </Text>
                        </View>
                        <View style={{width: 16}} />
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <FastImage
                                style={{width: 98, height: 70, borderRadius: 10, backgroundColor: 'black'}}
                                source={{
                                    uri: dataProfile?.identifyImages && dataProfile?.identifyImages.find(item => item.code === 'back') ? dataProfile?.identifyImages.find(item => item.code === 'back').source : ''
                                }}
                                resizeMode={'contain'}
                            />
                            <Text style={{color: TxtColor, fontSize: 14, marginTop: 7}}>
                                Mặt sau CMND/CCCD
                            </Text>
                        </View>
                    </View>
                    <View style={{height: 8, backgroundColor: '#F6F5F6', marginVertical: 20, marginHorizontal: -24}} />
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Mã số thuế cá nhân</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14}}>
                                {
                                    ((dataProfile?.tax && !dataProfile?.hasTax) || dataProfile?.hasTax === 'true') ?
                                        dataProfile?.tax :
                                        'Ủy quyền cho INSO đăng ký MST cá nhân'
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Họ và tên</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14}}>{dataProfile?.fullName}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Ngày sinh</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14}}>{dataProfile?.birthday}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Số CMND/CCCD</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14}}>{dataProfile?.identityNumber}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Tỉnh/Thành phố</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14}}>{dataProfile?.provinceName}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Quận/Huyện</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14}}>{dataProfile?.districtName}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Địa chỉ</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14}}>{dataProfile?.address}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Email</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14}}>{dataProfile?.email}</Text>
                        </View>
                    </View>
                    <View style={{height: 8, backgroundColor: '#F6F5F6', marginVertical: 20, marginHorizontal: -24}} />
                    <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>2. Thông tin ngân hàng:</Text>
                    <View style={{flexDirection: 'row', marginTop: 16}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Chủ tài khoản</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14}}>{dataProfile?.bankFullName}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Ngân hàng</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14}}>
                                ({dataBank?.code}) {dataBank?.tradeName} - {dataBank?.name}
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Số tài khoản</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: TxtColor, fontSize: 14}}>{dataProfile?.bankAccount}</Text>
                        </View>
                    </View>
                </ScrollView>
                {
                    dataProfile?.status !== 'processing' ? (
                        <View style={{ backgroundColor: 'white', paddingHorizontal: 24, paddingTop: 10 }}>
                            <TouchableOpacity
                                onPress={() => Actions.UpdateProfile()}
                                style={{
                                    width: '100%',
                                    paddingVertical: 16,
                                    backgroundColor: Color,
                                    borderRadius: 10,
                                    alignItems: 'center'
                                }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                                    CHỈNH SỬA
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 32,
    },
});

import Nav from '../../../components/Nav';
import { connect } from 'react-redux';
import { Color, TxtColor } from '../../../config/System';
import { getBank } from '../actions';
import { statusProfile } from '../assets';

const mapStateToProps = (state) => {
    return {
        dataUser: state.userInfo.userInfo,
        dataProfile: state.userInfo.profileInfo,
        bankInfo: state.userInfo.listBank,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBank: () => dispatch(getBank())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
