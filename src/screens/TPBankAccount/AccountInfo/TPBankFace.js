'use strict';

import React, { Component } from 'react';

import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Linking,
    Alert,
    PermissionsAndroid,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-modal';
import { ScaledSheet } from 'react-native-size-matters';
import SimpleToast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import IconOCRCameraSvg from '../../../config/images/icons/IconOCRCameraSvg';
import IconCameraBlurSvg from '../../../config/images/icons/IconCameraBlurSvg';
import NotifyRingSvg from '../../../config/images/login/NotifyRingSvg';
import IconWarningSvg from '../../../config/images/icons/IconWarningSvg';

const { height } = Dimensions.get('window');

class TPBankFace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalProvince: false,
            modalDistrict: false,
            modalBank: false,
            showModal: false,
            showModalErr: false,
            showModalImg: false,
            imgSelected: '',
            isLoading: false,
            ipAddress: '',
            deviceId: '',
            errMessage: '',
        };
    }

    componentDidMount = async () => {
        this.getLocation();
        const { confirmSuccess } = this.props;
        if (confirmSuccess === 'Y') {
            this.setModal(true);
        }
        const device = await messaging().getToken();
        DeviceInfo.getIpAddress().then((ip) => {
            this.setState({ ipAddress: ip, deviceId: device });
        });
    }

    hasPermissionIOS = async () => {
        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Không thể mở cài đặt');
            });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            return true;
        }

        if (status === 'denied') {
            Alert.alert('Quyền vị trí bị từ chối.');
        }

        if (status === 'disabled') {
            Alert.alert(
                `Bật dịch vụ vị trí để cho phép ứng dụng xác định vị trí của bạn.`,
                '',
                [
                    { text: 'Đi tới Cài đặt', onPress: openSetting },
                    { text: "Không sử dụng vị trí", onPress: () => { } },
                ],
            );
        }

        return false;
    };

    hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await this.hasPermissionIOS();
            return hasPermission;
        }
        return true;
    };

    getLocation = async () => {
        const hasPermission = await this.hasLocationPermission();
    };

    requireLocation = () => {
        if (Platform.OS === 'android') {
            this.requestLocationPermission().then(() => { });
        } else this.onSelect();
    };

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.onSelect();
            } else {
                this.onSelect();
            }
        } catch (err) {
            // console.log('err', err);
        }
    };

    onSelect = () => {
        Actions.TPBankCamera();
    }

    handleNext = async () => {
        const { TPBankLog, uri, infoImg } = this.props;
        const {ipAddress, deviceId} = this.state;
        let linkSelfie = await callApiUpload(uri, `${URL}/api/storage/v1/uploads/tpb-ekyc`);
        let linkFront = await callApiUpload(TPBankLog?.uriFront, `${URL}/api/storage/v1/uploads/tpb-ekyc`);
        let linkBack = await callApiUpload(TPBankLog?.uriBehind, `${URL}/api/storage/v1/uploads/tpb-ekyc`);
        let url = `${URL}/api/crm/v1/tpb/create-customer`;
        let body = {
            "icNumber": TPBankLog?.infoTPBank?.identityNumber?.trim()?.normalize() || '',
            "icType": TPBankLog?.infoTPBank?.icType || '',
            "phoneNumber": TPBankLog?.infoTPBank?.phoneNumber?.trim()?.normalize() || '',
            "fullName": removeVietnameseTones(TPBankLog?.infoTPBank?.fullName?.trim()?.normalize() || ''),
            "dateOfBirth": TPBankLog?.infoTPBank?.birthday?.trim()?.normalize() || '',
            "provinceId": TPBankLog?.infoTPBank?.provinceId || '',
            "provinceName": removeVietnameseTones(TPBankLog?.infoTPBank?.province?.trim()?.normalize() || ''),
            "districtId": TPBankLog?.infoTPBank?.districtId || '',
            "districtName": removeVietnameseTones(TPBankLog?.infoTPBank?.district?.trim()?.normalize() || ''),
            "address": removeVietnameseTones(TPBankLog?.infoTPBank?.address?.trim()?.normalize() || ''),
            "issuePlace": '',
            "issuanceDate": TPBankLog?.infoTPBank?.createDate?.trim()?.normalize() || '',
            "expireDate": TPBankLog?.infoTPBank?.expireDate?.trim()?.normalize() || '',
            "gender": TPBankLog?.infoTPBank?.gender === 'Nam' ? 'M' : 'F',
            "images": [
                {
                    "url": "20210617100129_3_0969452356_FRONT_761.jpg",
                    "label": "IC_FRONT",
                    "source": linkFront
                },
                {
                    "url": "20210617100129_1_0969452356_BACK_536.jpg",
                    "label": "IC_BACK",
                    "source": linkBack
                },
                {
                    "url": "20210617100129_2_0969452356_MAIN_FACE_638.jpg",
                    "label": "LIVENESS_CHECK",
                    "source": linkSelfie
                }
            ],
            "email": TPBankLog?.infoTPBank?.email?.trim()?.normalize() || '',
            "deviceId": "3d4a2941f81749de63b32ad5878feb2c4c7705519c380bdf4e57e25d61a4429410f66c75af36b151e829d2c914a76db1f79765f360ecd975923bd2f79a76f65e",
            "ipAddress": "118.70.233.120"
        }
        console.log('Url TPBAnk :: ', url)
        console.log('Body TPBAnk :: ', body)
        new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then(async (res) => {
                    console.log('======res-acóntarcsfdfdcontract', res)
                    if (res.data) {
                        this.setState({ isLoading: false }, () => {
                            if (res?.data?.linkLandingPage?.length > 0) {
                                Actions.TPBankWebView({ url: res?.data?.linkLandingPage })
                            }
                        })
                    } else {
                        this.setState({ isLoading: false, showModalErr: true, errMessage: res?.message || '' })
                    }
                })
                .catch(async (error) => {
                    console.log(error)
                    this.setState({ isLoading: false }, () => {
                        this.setState({ isLoading: false, showModalErr: true, errMessage: 'Đã có lỗi xảy ra. Vui lòng thực hiện lại sau Bạn nhé!' })
                    })
                })
        })
    };

    setModal = (value) => {
        this.setState({ showModal: value });
    };

    onClose = () => {
        const { saveTPBankLog, saveInfoImg } = this.props;
        this.setModal(false);
        saveTPBankLog(null);
        saveInfoImg(null);
        Actions.tab();
    };

    onCloseErr = () => {
        this.setState({ showModalErr: false, errMessage: '' })
    };
    
    render() {
        const { uri, infoImg } = this.props;
        const { isLoading, showModal, errMessage, showModalErr } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 100 }}>
                    <Nav show isInfo={false} bottom={20} onPress={() => Actions.TPBankAcc()} />
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={{ flex: 1, zIndex: 100, justifyContent: 'flex-end' }}>
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
                        <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold', marginTop: 24 }}>2. Chụp ảnh Selfie:</Text>
                        {
                            uri ? (
                                <View style={{ backgroundColor: TxtColor, borderRadius: 10, paddingBottom: 16, marginTop: 15 }}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <FastImage
                                            source={{ uri: uri }}
                                            style={{
                                                height: height / 2.84,
                                                width: '100%',
                                                backgroundColor: 'black',
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10
                                            }}
                                            resizeMode={'contain'}
                                        />
                                        <TouchableOpacity style={{ position: 'absolute' }} onPress={() => Actions.TPBankCamera()}>
                                            <IconCameraBlurSvg width={64} height={64} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ color: '#FFF', fontSize: 14, marginTop: 12, marginLeft: 12 }}>Ảnh selfie</Text>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 12, paddingTop: 8 }}>
                                        {
                                            infoImg?.location?.address?.length > 0 ? (
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <FastImage
                                                        style={{ width: 16, height: 16, marginRight: 4, marginTop: 2, marginLeft: -2 }}
                                                        source={require('../../../config/images/public/icons/ic_Location.png')}
                                                        resizeMode="contain"
                                                    />
                                                    <Text style={{ color: 'white', fontSize: 14, flex: 1 }}>{infoImg?.location?.address}</Text>
                                                </View>
                                            ) : null
                                        }
                                        {
                                            infoImg?.location?.address?.length > 0 && infoImg?.location?.longitude !== 0 && infoImg?.location?.latitude !== 0 ? (
                                                <View style={{ width: 24 }} />
                                            ) : null
                                        }
                                        <View style={{ flex: 1 }}>
                                            {
                                                infoImg?.location?.longitude !== 0 && infoImg?.location?.latitude !== 0 ? (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <FastImage
                                                            style={{ width: 15, height: 15, marginRight: 4, marginTop: 2 }}
                                                            source={require('../../../config/images/public/icons/ic_Position.jpg')}
                                                            resizeMode="contain"
                                                        />
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ color: 'white', fontSize: 14 }}>KĐ: {infoImg?.location?.longitude}</Text>
                                                            <Text style={{ color: 'white', fontSize: 14 }}>VĐ: {infoImg?.location?.latitude}</Text>
                                                        </View>
                                                    </View>
                                                ) : null
                                            }
                                            {
                                                infoImg?.timePhoto?.length > 0 ? (
                                                    <View style={{ flexDirection: 'row', marginTop: 4 }}>
                                                        <FastImage
                                                            style={{ width: 15, height: 15, marginRight: 4 }}
                                                            source={require('../../../config/images/public/icons/ic_Time.jpg')}
                                                            resizeMode="contain"
                                                        />
                                                        <Text style={{ color: 'white', fontSize: 14, flex: 1 }}>{infoImg?.timePhoto}</Text>
                                                    </View>
                                                ) : null
                                            }
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <TouchableOpacity style={{ alignItems: 'center', marginTop: 10, paddingBottom: 20 }}
                                    onPress={this.requireLocation}>
                                    <IconOCRCameraSvg width={90} height={90} style={{ marginBottom: 4 }} />
                                    <Text style={{
                                        color: TxtColor,
                                        fontSize: 14,
                                        marginTop: 5,
                                        textAlign: 'center',
                                    }}>Chụp ảnh selfie cần khuôn mặt trực diện, rõ nét</Text>
                                </TouchableOpacity>
                            )
                        }
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={{ backgroundColor: 'white', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ isLoading: true }, () => {
                                this.handleNext();
                            })
                        }}
                        disabled={!(uri?.length > 0)}
                        style={{
                            width: '100%',
                            paddingVertical: 16,
                            backgroundColor:
                                !(uri?.length > 0)
                                    ? NewColorDisable : Color,
                            borderRadius: 10,
                            alignItems: 'center'
                        }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                            HOÀN THÀNH
                        </Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    isVisible={showModal}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
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
                        <Text style={{ marginTop: 24, marginBottom: 32, fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                            Bạn đã hoàn tất đăng ký tài khoản.{'\n'}TPBank đang kiểm tra thông tin và sẽ phản hồi lại cho bạn trong vòng xxh tới
                        </Text>
                        <TouchableOpacity
                            onPress={this.onClose}
                            style={{
                                width: '100%',
                                paddingVertical: 16,
                                backgroundColor: Color,
                                borderRadius: 10,
                                alignItems: 'center'
                            }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                                VỀ TRANG CHỦ
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    isVisible={showModalErr}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
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
                        <IconWarningSvg width={60} height={60} color={errValidColor} />
                        <Text style={{ marginTop: 35, marginBottom: 43, fontSize: 14, color: errValidColor, textAlign: 'center' }}>
                            {errMessage}
                        </Text>
                        <View style={{width: '100%'}}>
                            <TouchableOpacity
                                onPress={this.onCloseErr}
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
                {
                    isLoading ? (
                        <View style={{
                            flex: 1,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            backgroundColor: '#e8e8e8',
                            justifyContent: 'center',
                            opacity: 0.3,
                            zIndex: 2200,
                        }}>
                            <ActivityIndicator
                                size="large"
                                color={Color}
                            />
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
    },
});

TPBankFace.defaultProps = {
    isCamera: false
}

import Nav from '../../../components/Nav';
import { connect } from 'react-redux';
import { Color, TxtColor, NewColorDisable, colorText, textDisable, URL, errValidColor } from '../../../config/System';
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import moment from 'moment';
import { callApiUpload } from '../../../utils/Api';
import { saveTPBankLog, saveInfoImg } from '../../Account/actions';
import { removeVietnameseTones } from '../../../components/Functions';

const mapStateToProps = (state) => {
    return {
        infoImg: state.userInfo.infoImg ? state.userInfo.infoImg.infoImg : {},
        uri: state.userInfo.infoImg ? state.userInfo.infoImg.uri : '',
        TPBankLog: state.userInfo.TPBankLog,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveTPBankLog: (data) => dispatch(saveTPBankLog(data)),
        saveInfoImg: (data) => dispatch(saveInfoImg(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TPBankFace);
