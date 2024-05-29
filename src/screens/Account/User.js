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
    AsyncStorage,
    SafeAreaView,
    Share,
    StatusBar, Keyboard, BackHandler,
    TouchableWithoutFeedback,
    Dimensions,
    TextInput, ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';

const screen = Dimensions.get('window');


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAgency: [
                {
                    name: 'Công ty cổ phần bưu điện PTI',
                },
                {
                    name: 'Công ty bảo hiểm BSH',
                },
                {
                    name: 'Công ty bảo hiểm PVI',
                },
                {
                    name: 'Công ty bảo hiểm BIC',
                },
                {
                    name: 'Công ty bảo hiểm MIC',
                },
            ],
            isOpen: null,
            agency: ''
        }

    }
    chooseAgency = (item) => {
        this.setState({
            agency: item.name,
            isOpen: null
        })
    }


    openModalFilter = () => {
        this.setState({
            isOpen: true,
        });
    };
    onCloseModal = () => {
        this.setState({
            isOpen: null,
        });
    };
    logout = () => {
        new Store().storeSession(Const.IS_LOGIN, null)
        new Store().storeSession(Const.TOKEN, null)
        Actions.LoginNew()
    }
    render() {
        return (
            <View style={styles.container}>

                <View>
                    <Nav show={true}
                        isInfo={false}
                        isLogout={true}
                        title={'TÀI KHOẢN'}
                        onPress={() => Actions.pop()}
                        onPressLogout={this.logout}
                    />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -40 }}>
                    <View style={{ height: 90, width: 90, borderRadius: 45, alignSelf: 'center' }}>
                        <FastImage source={require('../../icons/iconAgent/ic_avatar.png')}
                            style={{ height: 90, width: 90, }} />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#5B5B5B' }}>Nguyễn Thị Hoài Thu</Text>
                </View>
                <View style={{ paddingHorizontal: 50 }}>
                    <View style={{
                        borderRadius: 20,
                        padding: 5,
                        flexDirection: 'row',
                        backgroundColor: '#FEB404',
                        height: 40
                    }}>
                        <View style={{
                            flex: 2.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ffffff',
                            flexDirection: 'row'
                        }}>
                            <View style={{ paddingRight: 5 }}>
                                <FastImage source={require('../../icons/iconAgent/ic_diamon_white.png')}
                                    style={{ height: 15, width: 18 }} />
                            </View>
                            <View>
                                <Text style={{ color: '#ffffff', fontSize: 15 }}>3.524 điểm</Text>
                            </View>
                        </View>
                        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <FastImage source={require('../../icons/iconAgent/ic_money_aconut.png')}
                                style={{ height: 20, width: 16, marginRight: 5 }} />
                            <Text style={{ color: '#ffffff', fontSize: 15, }}>1.000.000 vnđ</Text>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View style={[styles.searchInput, { marginTop: 0 }]}>
                        <Input
                            label={'Họ và tên'}
                            backgroundColor={'#FFFFFF'}
                            autoCapitalize={'none'}
                            value={'Nguyễn Thị Hoài Thu'}
                            onChangeText={(txtSearch) => this.searchBenifit(txtSearch)}
                        >
                        </Input>
                    </View>
                    <View style={styles.searchInput}>
                        <Input
                            label={'Số điện thoại'}
                            backgroundColor={'#FFFFFF'}
                            autoCapitalize={'none'}
                            value={'0328291359'}
                            onChangeText={(txtSearch) => this.searchBenifit(txtSearch)}
                        >
                        </Input>
                    </View>
                    <View style={styles.searchInput}>
                        <Input
                            label={'Email'}
                            backgroundColor={'#FFFFFF'}
                            autoCapitalize={'none'}
                            value={'thutk@pti.com'}
                            onChangeText={(txtSearch) => this.searchBenifit(txtSearch)}
                        >
                        </Input>
                    </View>
                    <TouchableOpacity style={[styles.searchInput]} onPress={() => this.openModalFilter()}>
                        <Input
                            showIconDown
                            label={'Tên công ty'}
                            backgroundColor={'#FFFFFF'}
                            autoCapitalize={'none'}
                            disabled={true}
                            value={this.state.agency}
                        />
                    </TouchableOpacity>
                    <View style={styles.searchInput}>
                        <Input
                            label={'Tên đơn vị'}
                            backgroundColor={'#FFFFFF'}
                            autoCapitalize={'none'}
                            value={'PTI thời đại số'}
                            onChangeText={(txtSearch) => this.searchBenifit(txtSearch)}
                        >
                        </Input>
                    </View>
                    <View style={styles.searchInput}>
                        <Input
                            label={'Tên phòng'}
                            backgroundColor={'#FFFFFF'}
                            autoCapitalize={'none'}
                            value={'Sale 1'}
                            onChangeText={(txtSearch) => this.searchBenifit(txtSearch)}
                        >
                        </Input>
                    </View>
                </ScrollView>
                <ModalBox
                    entry={'bottom'}
                    position={'bottom'}
                    swipeToClose={true}
                    isOpen={this.state.isOpen}
                    onClosed={() => this.onCloseModal()}
                    style={styles.ctModal}
                >
                    <View style={{ backgroundColor: '#fff', flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        <View style={{
                            backgroundColor: '#F4F5F6',
                            flex: 0.2,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            justifyContent: 'center',
                            paddingHorizontal: 40,
                        }}>
                            <Text style={{ fontSize: 14, fontWeight: '600' }}>Chọn đại lý</Text>
                        </View>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps='always'
                            style={{ flex: 1, marginHorizontal: 10, marginTop: 10 }}>
                            <ScrollView keyboardShouldPersistTaps='always'>
                                {
                                    this.state.listAgency.map((item, index) => {
                                        return (
                                            <TouchableOpacity style={{
                                                flexDirection: 'row',
                                                borderBottomWidth: 1,
                                                borderTopWidth: 0,
                                                borderColor: '#efefef',
                                                alignItems: 'center',
                                                paddingVertical: 10,
                                                paddingLeft: 0,
                                                marginHorizontal: 10,
                                            }} key={index} onPress={() => this.chooseAgency(item)}>
                                                <View style={{ paddingHorizontal: 15 }}>
                                                    <FastImage source={this.state.agency == item.name ? require('../../icons/iconAgent/single_select_active.png') : require('../../icons/iconAgent/single_select.png')} resizeMode={'center'} style={{ height: 20, width: 20 }} />
                                                </View>
                                                <Text>{item.name}</Text>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </ScrollView>
                        </KeyboardAwareScrollView>
                    </View>
                </ModalBox>
                <View style={{ height: 15 }} />
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
        flex: 0.5,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
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


import SimpleToast from 'react-native-simple-toast';
import Nav from '../../components/Nav';
import Input from '../../components/Input';
import ModalBox from 'react-native-modalbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import { Color } from '../../config/System';
import Store from '../../services/Store';
import Const from '../../services/Const';

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default (User);
