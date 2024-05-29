'use strict';

import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import Const from '../../services/Const';
import Input from '../CarInsurance/components/Input';
import SimpleToast from 'react-native-simple-toast';

class UpdateFullName extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    validation = Yup.object().shape({
        fullName: Yup.string()
            .strict(false)
            .trim()
            .required('Không được bỏ trống')
            .test(
                'fullName',
                'Sai định dạng',
                values => isFullNameAccount(values),
            ),
    });

    handleNext = (formik) => {
        const {getUserInfo} = this.props;
        let body = {
            "fullName": formik.values.fullName || '',
        }
        let url = `${URL}/api/account/v1/users/me/profile`
        new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then(async (res) => {
                    console.log('======res-acóntarcsfdfdcontract', res)
                    if (res.status == 200 || res.status == 'success') {
                        getUserInfo();
                        Actions.tab({tab: 'account'});
                    } else {
                        SimpleToast.show(res?.message);
                    }
                })
                .catch(async (error) => {
                    console.log(error)
                    SimpleToast.show(error?.message);
                })
        })
    };

    render() {
        const {
            dataUser,
            commissionFull,
        } = this.props;
        const FormikInput = handleTextInput(Input);
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 100 }}>
                    <Nav
                        isInfo={false}
                        title={'TÀI KHOẢN'}
                        bottom={20}
                        onPress={() => Actions.pop()}
                        show
                    />
                </View>
                <View style={{ zIndex: 100 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -40 }}>
                        <View style={{ alignSelf: 'center' }}>
                            <FastImage source={require('../../icons/iconAgent/ic_avatar.png')}
                                style={{ height: 90, width: 90, }} />
                        </View>
                    </View>
                </View>
                {
                    dataUser?.fullName ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>{dataUser?.fullName}</Text>
                        </View>
                    ) : null
                }
                <View style={{
                    marginTop: 8,
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
                <Formik
                    initialValues={{
                        fullName: dataUser?.fullName || '',
                    }}
                    enableReinitialize={true}
                    validationSchema={this.validation}
                    isInitialValid={dataUser?.fullName}>
                    {formik => {
                        return (
                            <>
                                <KeyboardAvoidingView
                                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                                    style={{ flex: 1, justifyContent: 'flex-end' }}>
                                    <ScrollView
                                        style={{ marginTop: 8 }}
                                        contentContainerStyle={{
                                            paddingHorizontal: 24,
                                        }}
                                    >
                                        <FormikInput
                                            label={'Họ và tên'}
                                            name={'fullName'}
                                        />
                                    </ScrollView>
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
                                            LƯU
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        );
                    }}
                </Formik>
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
import { Color, NewColorDisable, TxtColor, URL } from '../../config/System';
import Store from '../../services/Store';
import { ERROR_NAME_FORMAT } from '../../config/ErrorMessage';
import { isFullNameAccount, formatVND } from '../../components/Functions';
import {getUserInfo} from './actions';

const mapStateToProps = (state) => {
    return {
        dataUser: state.userInfo.userInfo,
        commissionFull: state.commissions.totalFull,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => dispatch(getUserInfo()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFullName);
