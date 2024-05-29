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


class ElectronicCertificate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: null,
            agency: '',
            listContract: [
                {
                    icon: require('../../icons/iconAgent/ic_car_bg30bebc.png'),
                    contract_code: 'INSOF00132150520',
                    license_plates: '06/03/2020',
                    date_buy: '06/03/2020',
                    type: 'CAR'
                },
                {
                    icon: require('../../icons/iconAgent/ic_car_bg30bebc.png'),
                    contract_code: 'INSOF00132150520',
                    license_plates: '06/03/2020',
                    date_buy: '06/03/2020',
                    type: 'CAR'
                },
                {
                    icon: require('../../icons/iconAgent/ic_car_bg30bebc.png'),
                    contract_code: 'INSOF00132150520',
                    license_plates: '06/03/2020',
                    date_buy: '06/03/2020',
                    type: 'CAR'
                },
                {
                    icon: require('../../icons/iconAgent/ic_flight_bg30bebc.png'),
                    contract_code: 'INSOF00132150520',
                    flight_code: 'QH211',
                    destination: 'Hồ Chí Minh',
                    timeLanding: '06/03/2020 - 20:00',
                    type: 'FLIGHT'
                },
            ],
        }

    }
    noData() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                <FastImage source={require('../../icons/iconAgent/image_certificate_nodata.png')}
                    resizeMode={'center'} style={{ height: 300, width: 300 }} />
                <Text style={{ color: '#8D8C8D', fontSize: RFValue(13) }}>Bạn chưa có chứng nhận điện tử nào</Text>
            </View>
        )
    }
    navigateScreen = ()=>{
        // Actions.FakeCertificate()
    }
    render() {
        return (
            <View style={styles.container}>

                <View>
                    <Nav show={true} isInfo={false} title={'DANH SÁCH CHỨNG NHẬN ĐIỆN TỬ'}
                        onPress={() => Actions.pop()} />
                </View>
                {
                    this.state.listContract.length === 0 ? this.noData() : null
                }
                <ScrollView style={{ marginTop: -40 }}>
                    {
                        this.state.listContract && this.state.listContract.length > 0 ?
                            this.state.listContract.map((item, index) => {
                                return (
                                    <View
                                        key={index} style={{
                                        flexDirection: 'row',
                                        height: 'auto',
                                        marginHorizontal: 30,

                                        borderRadius: 10,
                                        marginVertical: 10,
                                        paddingVertical: 10,
                                        backgroundColor: '#ffffff',
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.22,
                                        shadowRadius: 2.22,
                                        elevation: 3

                                    }}>
                                        <View style={{
                                            flex: 2, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1,
                                            borderLeftColor: Color,
                                        }}>
                                            <FastImage source={item.icon}
                                                style={{ height: 40, width: 40 }} resizeMode={'contain'} />
                                        </View>
                                        {
                                            item.type == 'CAR' ? <View style={{ flex: 5, justifyContent: 'center' }}>
                                                <Text style={{ fontSize: RFValue(13) }}>{item.contract_code}</Text>
                                                <Text style={{ fontSize: RFValue(13), color: '#8D8C8D' }}>BKS: {item.license_plates}</Text>
                                                <Text style={{ fontSize: RFValue(13), color: '#8D8C8D' }}>Ngày mua: {item.date_buy}</Text>
                                            </View> : null
                                        }
                                        {
                                            item.type == 'FLIGHT' ? <View style={{ flex: 5, justifyContent: 'center' }}>
                                                <Text style={{ fontSize: RFValue(13) }}>{item.contract_code}</Text>
                                                <Text style={{ fontSize: RFValue(13), color: '#8D8C8D' }}>Chuyến bay: {item.flight_code}</Text>
                                                <Text style={{ fontSize: RFValue(13), color: '#8D8C8D' }}>Điểm đến: {item.destination}</Text>
                                                <Text style={{ fontSize: RFValue(13), color: '#8D8C8D' }}>Hạ cánh: {item.timeLanding}</Text>
                                            </View> : null
                                        }
                                        <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                        </View>
                                    </View>
                                )
                            }) : null
                    }
                </ScrollView>
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
        fontWeight: 'bold',
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
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import { Color } from '../../config/System';

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default (ElectronicCertificate);
