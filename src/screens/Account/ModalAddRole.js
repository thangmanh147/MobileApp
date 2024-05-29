'use strict';

import React, { Component } from 'react';

import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import {getUserInfo} from './actions';
import Input from '../CarInsurance/components/Input';
import { Color, domain, errValidColor, NewColorDisable, TxtColor, URL } from '../../config/System';
import {
    isRefCode,
} from '../../components/Functions';
import IconCloseThinSvg from '../../config/images/icons/IconCloseThinSvg';
import IconSuccessSvg from '../../config/images/icons/IconSuccessSvg';
import IconWarningSvg from '../../config/images/icons/IconWarningSvg';
import IconPlusSvg from '../../config/images/icons/IconPlusSvg';

class ModalAddRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            modalResponse: false,
            errMessage: '',
        };
    }

    validation = Yup.object().shape({
        codeIntro: Yup.string()
            .strict(false)
            .required('Bạn phải nhập mã giới thiệu')
            .test('codeIntro', 'Mã giới thiệu sai định dạng', values => isRefCode(values)),
    });

    handleNext = (formik) => {
        this.setState({openModal: false}, () => {
            new Store().getSession(Const.TOKEN).then(token => {
                let body = {
                    "referralCode": formik.values.codeIntro,
                }
                let url = `${URL}/api/account/v1/users/referral-join`
                console.log('url', url)
                console.log('body', body)
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                    body: JSON.stringify(body),
                })
                    .then((res) => res.json())
                    .then(async (res) => {
                        console.log('RESssss :: ', res);
                        if (res.status == 200 || res.status == 'success') {
                            setTimeout(() => {
                                this.setState({
                                    modalResponse: true,
                                })
                            }, 300)
                        } else {
                            setTimeout(() => {
                                this.setState({
                                    modalResponse: true,
                                    errMessage: res.message
                                })
                            }, 300)
                        }
                    })
                    .catch(async (error) => {
                        console.log(error)
                    })
            })
        });
    };

    onClose = () => {
        const {getUserInfo} = this.props;
        this.setState({ modalResponse: false, errMessage: '' }, () => {
            getUserInfo();
        })
    };
    
    render() {
        const {referralDefault} = this.props;
        const {
            openModal,
            modalResponse,
            errMessage,
        } = this.state;
        const FormikInput = handleTextInput(Input);
        return (
            <>
                <TouchableOpacity
                    // disabled
                    onPress={() => this.setState({ openModal: true })}
                    style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between'}}
                >
                    <View style={{flex: 1}}>
                        <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Tên công ty</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between'}}>
                        <Text
                            style={{
                                fontSize: 14,
                                marginRight: 5,
                                color: TxtColor
                            }}>
                            {referralDefault?.organizationName}
                        </Text>
                        <IconPlusSvg width={16} height={16} color={Color} />
                    </View>
                </TouchableOpacity>
                <Modal
                    isVisible={openModal}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                >
                    <Formik
                        initialValues={{
                            codeIntro: '',
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
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor, textAlign: 'center' }}>
                                                    Thêm đại lý
                                                </Text>
                                                <FormikInput
                                                    label={'Mã giới thiệu *'}
                                                    name={'codeIntro'}
                                                    autoUpperCase
                                                    onBlur={() => {
                                                        formik.setFieldValue('codeIntro', formik.values.codeIntro.toUpperCase());
                                                    }}
                                                    maxLength={17}
                                                    keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
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
                    isVisible={modalResponse}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    onBackButtonPress={() => this.setState({ modalResponse: false, errMessage: '' })}
                    onBackdropPress={() => this.setState({ modalResponse: false, errMessage: '' })}
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
                        {
                            errMessage.length > 0 ? (
                                <>
                                    <IconWarningSvg width={60} height={60} color={errValidColor} />
                                    <Text style={{ marginTop: 35, marginBottom: 43, fontSize: 14, color: errValidColor, textAlign: 'center' }}>
                                        {
                                            errMessage === 'Tài khoản đã ở trong đại lý' ?
                                                'Bạn đã ở trong đại lý này, bạn không thể đăng ký lại' :
                                                errMessage
                                        }
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <IconSuccessSvg width={61} height={62} />
                                    <Text style={{ marginTop: 35, marginBottom: 43, fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                                        Thêm đại lý thành công
                                    </Text>
                                </>
                            )
                        }
                        <View style={{width: '100%'}}>
                            <TouchableOpacity
                                onPress={this.onClose}
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
            </>
        );
    }
}

const styles = StyleSheet.create({
});

import SimpleToast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import Store from '../../services/Store';
import Const from '../../services/Const';

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => dispatch(getUserInfo()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddRole);
