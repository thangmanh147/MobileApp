import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';

import { saveTPBankLog } from '../../Account/actions';
import { RNCamera } from 'react-native-camera';
import { Color, URL } from '../../../config/System';
import Loading from '../../../components/Loading';

function Camera({
    saveTPBankLog,
    TPBankLog,
    isProfileFront = false,
    isProfileBehind = false,
}) {

    const [camera, setCamera] = useState('');
    const [loading, setLoading] = useState(false);

    const onBack = () => {
        if (isProfileFront || isProfileBehind) {
            Actions.execute('replace', 'TPBankAcc');
        } else {
            Actions.pop();
        }
    };

    const takePicture = async () => {
        if (camera) {
            const res = await camera.takePictureAsync({ quality: 0.4, width: 720, base64: true });
            if (isProfileBehind) {
                TPBankLog.uriBehind = res.uri;
                saveTPBankLog(TPBankLog);
                Actions.execute('replace', 'TPBankAcc');
            } else if (isProfileFront) {
                TPBankLog.uriFront = res.uri;
                saveTPBankLog(TPBankLog);
                Actions.execute('replace', 'TPBankAcc');
            }
        }
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'black'
        }}>
            {
                loading ? <Loading /> : null
            }
            <TouchableOpacity onPress={() => onBack()} style={{
                position: 'absolute', zIndex: 100, right: 0, top: 20,
                paddingVertical: 15, padding: 35
            }}>
                <Image style={{ height: 20, width: 20 }} source={require('../../../config/images/public/icons/ic_Close.png')} />
            </TouchableOpacity>
            <RNCamera
                ref={ref => {
                    setCamera(ref);
                }}
                type={'back'}
                captureAudio={false}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                // flashMode={RNCamera.Constants.FlashMode.torch}
                // permissionDialogTitle={'Permission to use camera'}
                // permissionDialogMessage={'We need your permission to use your camera phone'}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >

                <View style={{
                    height: Platform.OS === 'android' ? 480 : 500, width: 320, borderWidth: 2,
                    borderColor: Color, alignSelf: 'center', marginTop: 50
                }} />

            </RNCamera>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={takePicture}
                        style={styles.capture}>
                        <View style={{
                            width: 40,
                            backgroundColor: 'white',
                            height: 40,
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: '#000'
                        }}>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    capture: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        marginRight: 20,
        marginTop: 10
    },
    previewImage: {
        width: "100%",
        height: "100%"
    },

    containInformation: {
        marginVertical: 5,
        borderRadius: 15,
        paddingVertical: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },

    wrapperInfor: {
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowOpacity: Platform.OS === 'android' ? 0.6 : 0.2,
        shadowRadius: 10,
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 0
        },
    },
    guide_take_camera: {
        alignSelf: 'center',
        height: 25,
        width: 25
    },
    containGuideToTakeCamera: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    img_background: {
        flex: 1, width: undefined, height: undefined

    },
    ic_image_delete: {
        height: 22,
        width: 22,
    },
    containInfor: {}
});


const mapStateToProps = state => ({
    TPBankLog: state.userInfo.TPBankLog,
});

export default connect(mapStateToProps, {
    saveTPBankLog,
})(Camera);


