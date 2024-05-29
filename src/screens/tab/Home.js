'use strict';

import React, { Component } from 'react';

import {
    View,
    Text,
    Platform,
    BackHandler,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import messaging from '@react-native-firebase/messaging';
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import {getProfileInfo, setOrgCodeUser} from '../Account/actions';
import Input from '../CarInsurance/components/Input';
import InputSelect from '../../components/buy/InputSelect';
import { Color, domain, nameApp, NewColorDisable, TxtColor, URL } from '../../config/System';
import jwt_decode from "jwt-decode";
import FastImage from 'react-native-fast-image';
import SelectInsuranceType from '../../screens/Agent/SelectInsuranceType/SelectInsuranceType';
import ModalInsur from './Modal/ModalInsur';
// import ModalChannel from './Modal/ModalChannel';
import {
    ERROR_NAME_FORMAT,
    ERROR_PHONE_FORMAT,
    ERROR_PHONE_REQUIRED,
} from '../../config/ErrorMessage';
import {
    isFullName,
    isPhoneAccident,
} from '../../components/Functions';
import { infoOrg } from '../../components/assets';
import IconIntroSvg from '../../config/images/icons/IconIntroSvg';
import IconListSvg from '../../config/images/icons/IconListSvg';
import IconCloseThinSvg from '../../config/images/icons/IconCloseThinSvg';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';
import IconSuccessSvg from '../../config/images/icons/IconSuccessSvg';
import IconCommissionSvg from '../../config/images/icons/IconCommissionSvg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            openModal: false,
            modalInsur: false,
            modalSuccess: false,
            orgCode: '',
            // openModalChannel: false,
            // channels: [],
            // channelSelected: {}
        };
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        new Store().getSession(Const.TOKEN).then(token => {
            if (token) {
                const {
                    getNotifyInfo,
                    getProfileInfo,
                    setOrgCodeUser,
                    getInsuranceInfo,
                } = this.props;
                const dataToken = jwt_decode(token);
                this.setState({
                    userName: dataToken?.preferred_username,
                    orgCode: dataToken?.organizationCode,
                    // channels: dataToken?.channels,
                    // channelSelected: dataToken?.channels[0],
                });
                this._checkPermission();
                getInsuranceInfo();
                getNotifyInfo();
                getProfileInfo();
                setOrgCodeUser(dataToken?.organizationCode);
            }
        })
    }

    _checkPermission = async () => {
        const enabled = await messaging().hasPermission();
        if (enabled) {
            const { postNotify } = this.props;
            const device = await messaging().getToken();
            new Store().getSession(Const.TOKEN).then(token => {
                const dataToken = jwt_decode(token);
                postNotify(device, dataToken?.userId, dataToken?.organizationCode);
            })
        }
        else this._getPermission()
    }

    _getPermission = async () => {
        messaging().requestPermission()
            .then(() => {
                this._checkPermission()
            })
            .catch(error => {
                // User has rejected permissions  
            });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (Actions.currentScene == 'tab') {
            return true;
        }
    }

    renderPromotion = (item) => {
        return (
            <View style={{ marginLeft: 20 }}>
                <View>
                    <FastImage source={item.item.image}
                        style={{ height: 118, width: 126, borderRadius: 8 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                        <FastImage source={require('../../icons/iconAgent/ic_diamond.png')}
                            style={{ height: 11, width: 13 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: 8 }}>{item.item.pointRedeem} điểm</Text>
                    </View>
                </View>
            </View>
        )
    }

    onShowSale = () => {
        this.setState({ openModal: true });
    }

    onShowCommission = () => {
        new Store().getSession(Const.PASS_WORD).then(pass => {
            if (!pass || pass.length === 0) {
                Actions.LoginNew();
            } else {
                Actions.ManageCommission();
            }
        })
    }

    setNameInsur = (data, formik) => {
        formik.setFieldValue('nameInsur', data.name);
        formik.setFieldValue('codeInsur', data.code);
    };

    setCustomerType = (formik, value) => {
        formik.setFieldValue('customerType', value);
    };

    validation = Yup.object().shape({
        fullName: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test(
                'fullName',
                ERROR_NAME_FORMAT,
                values => isFullName(values),
            ),
        phone: Yup.string()
            .strict(false)
            .required('Không được bỏ trống')
            .test('phone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)),
        nameInsur: Yup.string().required('Không được bỏ trống'),
    });

    handleNext = (formik) => {
        this.setState({
            openModal: false,
        });
        new Store().getSession(Const.TOKEN).then(token => {
            if (token) {
                this.onSubmit(
                    formik.values.fullName,
                    formik.values.phone,
                    formik.values.codeInsur,
                    formik.values.customerType === 'Anh' ? 1 : 2,
                    formik.values.codeSale,
                    token,
                );
            } else {
                let body = {
                    "domain": domain,
                    "username": 'inso-tele',
                    "password": 'inso@2022'
                }
                let url = `${URL}/api/account/v1/users/login`
                console.log('url', url)
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                    .then((res) => res.json())
                    .then(async (res) => {
                        if (res.status == 200 || res.status == 'success') {
                            this.onSubmit(
                                formik.values.fullName,
                                formik.values.phone,
                                formik.values.codeInsur,
                                formik.values.customerType === 'Anh' ? 1 : 2,
                                formik.values.codeSale,
                                res?.data?.access_token,
                            );
                        }
                    })
                    .catch(async (error) => {
                        console.log(error)
                    })
            }
        })
    };

    onSubmit = (fullName, phone, productCode, gender, saleCode, token) => {
        let body = {
            "fullName": fullName,
            "phone": phone,
            "productCode": productCode,
            "gender": gender,
            "saleCode": saleCode,
            "source": "app",
            "ip": "0.0.0.0"
        }
        let url = `${URL}/api/crm/v1/customers`
        console.log('url', url)
        console.log('body', body)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Cookie': 'connect.sid=s%3Al9KCKjFLR7OflF81IkykxNBQxTvVnvgf.p5iehLi%2BFis8KkXF54rVqi8%2BfOhhn%2FfVyranwnSzkgY',
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then(async (res) => {
                console.log('======res-acóntarcsfdfdcontract', res)
                if (res?.data) {
                    setTimeout(() => {
                        this.setState({
                            modalSuccess: true,
                        })
                    }, 500);
                } else {
                    SimpleToast.show(res.message);
                }
            })
            .catch(async (error) => {
                console.log(error)
            })
    };

    render() {
        const { notifyInfo, insuranceInfo } = this.props;
        const {
            userName,
            openModal,
            modalInsur,
            modalSuccess,
            orgCode,
            // channelSelected,
            // channels,
            // openModalChannel,
        } = this.state;
        const notRead = notifyInfo?.notRead;
        const FormikInput = handleTextInput(Input);
        const FormikSelect = handleTextInput(InputSelect);
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 2201 }}>
                    <NavHome
                        show={false}
                        isInfo={false}
                        title={'TRANG CHỦ'}
                        userName={userName}
                        notRead={notRead}
                        isNotify
                    />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* <ModalChannel
                        open={openModalChannel}
                        onClosed={() => this.setState({ openModalChannel: false })}
                        setSex={data => this.setState({ channelSelected: data })}
                        onOpened={() => this.setState({ openModalChannel: true })}
                        nameSelected={channelSelected?.code}
                        listChannel={channels}
                    />
                    <View style={{ paddingTop: 20 }}>
                        <View>
                            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 24 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: TxtColor }}>Chọn kênh bảo hiểm</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, marginHorizontal: 24, marginTop: -10 }}>
                                <InputSelect
                                    name={'duration'}
                                    openModal={() => this.setState({ openModalChannel: true })}
                                    value={channelSelected?.code}
                                />
                            </View>
                        </View>
                    </View> */}
                    <View style={{ flex: 1, paddingTop: 20 }}>
                        <SelectInsuranceType insuranceInfo={insuranceInfo} />
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 24 }}>
                        <View style={{ flex: 1, backgroundColor: infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon, borderRadius: 8, padding: 12 }}>
                            <TouchableOpacity onPress={this.onShowSale}>
                                <IconIntroSvg width={41} height={41} />
                                <Text style={{ fontSize: 13, color: 'white', marginTop: 6 }}>Giới thiệu khách hàng</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: 17 }} />
                        <View style={{ flex: 1, backgroundColor: '#FEB404', borderRadius: 8, padding: 12 }}>
                            {
                                !nameApp.includes('EPTI') && !nameApp.includes('INSO') ? (
                                    <TouchableOpacity onPress={this.onShowCommission}>
                                        <IconCommissionSvg width={41} height={41} color={'#fff'} />
                                        <Text style={{ fontSize: 13, color: 'white', marginTop: 6 }}>Hoa hồng</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity>
                                        <IconListSvg width={38} height={41} />
                                        <Text style={{ fontSize: 13, color: 'white', marginTop: 6 }}>Sắp ra mắt</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                    <View style={{ height: 32 }} />
                </ScrollView>
                <Modal
                    isVisible={openModal}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    onBackButtonPress={() => this.setState({ openModal: false })}
                    onBackdropPress={() => this.setState({ openModal: false })}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                >
                    <Formik
                        initialValues={{
                            customerType: 'Anh',
                            fullName: '',
                            phone: '',
                            nameInsur: '',
                            codeSale: '',
                            codeInsur: ''
                        }}
                        enableReinitialize={true}
                        validationSchema={this.validation}
                        isInitialValid={false}>
                        {formik => {
                            return (
                                <>
                                    <KeyboardAvoidingView
                                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                                        style={{ flex: 1, justifyContent: 'flex-end' }}>
                                        <View
                                            style={{
                                                backgroundColor: '#fff',
                                                borderTopLeftRadius: 20,
                                                borderTopRightRadius: 20,
                                            }}>
                                            <ScrollView
                                                contentContainerStyle={{
                                                    paddingHorizontal: 24,
                                                    paddingTop: 24,
                                                }}>
                                                <ModalInsur
                                                    open={modalInsur}
                                                    onClosed={() => this.setState({ modalInsur: false })}
                                                    setInsur={(data) => this.setNameInsur(data, formik)}
                                                    onOpened={() => this.setState({ modalInsur: true })}
                                                    nameSelected={formik.values.nameInsur}
                                                />
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor, textAlign: 'center' }}>
                                                    Giới thiệu khách hàng
                                                </Text>
                                                <View style={{ flexDirection: 'row', marginTop: 24 }}>
                                                    <TouchableOpacity
                                                        onPress={() => this.setCustomerType(formik, 'Anh')}
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                        }}>
                                                        {
                                                            formik.values.customerType === 'Anh' ? (
                                                                <IconRadioBtnActiveSvg width={15} height={15} />
                                                            ) : (
                                                                <IconRadioBtnSvg width={15} height={15} />
                                                            )
                                                        }
                                                        <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14 }}>Anh</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setCustomerType(formik, 'Chị')}
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            marginLeft: 50
                                                        }}>
                                                        {
                                                            formik.values.customerType === 'Chị' ? (
                                                                <IconRadioBtnActiveSvg width={15} height={15} />
                                                            ) : (
                                                                <IconRadioBtnSvg width={15} height={15} />
                                                            )
                                                        }
                                                        <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14 }}>Chị</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <FormikInput
                                                    label={'Tên khách hàng *'}
                                                    name={'fullName'}
                                                    autoUpperCase
                                                    onBlur={() => {
                                                        formik.setFieldValue('fullName', formik.values.fullName.toUpperCase());
                                                    }}
                                                />
                                                <FormikInput
                                                    label={'Số điện thoại *'}
                                                    name={'phone'}
                                                    keyboardType={'number-pad'}
                                                    maxLength={12}
                                                />
                                                <FormikSelect
                                                    label={'Sản phẩm quan tâm *'}
                                                    name={'nameInsur'}
                                                    openModal={() => this.setState({ modalInsur: true })}
                                                />
                                                <FormikInput
                                                    label={'Nhập mã Sales (không bắt buộc)'}
                                                    name={'codeSale'}
                                                />
                                            </ScrollView>
                                            <View style={{ position: 'absolute', top: 16, right: 16 }}>
                                                <TouchableOpacity
                                                    onPress={() => this.setState({ openModal: false })}
                                                >
                                                    <IconCloseThinSvg width={24} height={24} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </KeyboardAvoidingView>
                                    <View style={{ backgroundColor: 'white', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}>
                                        <TouchableOpacity
                                            disabled={!formik.isValid}
                                            onPress={() => this.handleNext(formik)}
                                            style={{
                                                width: '100%',
                                                paddingVertical: 16,
                                                backgroundColor: !formik.isValid ? NewColorDisable : Color,
                                                borderRadius: 10,
                                                alignItems: 'center'
                                            }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                                                GỬI
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            );
                        }}
                    </Formik>
                </Modal>
                <Modal
                    isVisible={modalSuccess}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    onBackButtonPress={() => this.setState({ modalSuccess: false })}
                    onBackdropPress={() => this.setState({ modalSuccess: false })}
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
                        <IconSuccessSvg width={61} height={62} />
                        <Text style={{ marginTop: 35, marginBottom: 43, fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                            Chúc mừng bạn đã giới thiệu khách hàng thành công
                        </Text>
                        <View style={{width: '100%'}}>
                            <TouchableOpacity
                                onPress={() => this.setState({ modalSuccess: false })}
                                style={{
                                    paddingVertical: 16,
                                    backgroundColor: Color,
                                    borderRadius: 10,
                                    alignItems: 'center'
                                }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                                    OK
                                </Text>
                            </TouchableOpacity>
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
import NavHome from "../../components/NavHome";
import { connect } from 'react-redux';
import Store from '../../services/Store';
import Const from '../../services/Const';
import ListCustomers from '../Agent/ListCustomers';
import { getInsuranceInfo } from '../../screens/Agent/actions';
import { getNotifyInfo, postNotify } from '../ListNotify/actions';

const mapStateToProps = (state) => {
    return {
        insuranceInfo: state.insurance.insuranceInfo,
        notifyInfo: state.notifyInfo.notifyInfo,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        postNotify: (deviceToken, userId, organizationCode) => dispatch(postNotify(deviceToken, userId, organizationCode)),
        getNotifyInfo: () => dispatch(getNotifyInfo()),
        getInsuranceInfo: () => dispatch(getInsuranceInfo()),
        getProfileInfo: () => dispatch(getProfileInfo()),
        setOrgCodeUser: (value) => dispatch(setOrgCodeUser(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
