import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Store from '../../services/Store';
import Const from '../../services/Const';
import axios from 'axios';

import { connect } from 'react-redux';

import { saveImageOcr } from './actions/acare';
import { RNCamera } from 'react-native-camera';
import { Color, URL } from '../../config/System';
import Loading from '../../components/Loading';
import { trimFullNameOCR } from '../../utils/Util';

function Camera({
    saveImageOcr,
    id,
}) {

    const [camera, setCamera] = useState('');
    const [loading, setLoading] = useState(false);

    const onBack = () => {
        Actions.pop();
    };

    const takePicture = async () => {
        if (camera) {
            const options = { quality: 0.3 };
            const optionIOS = { quality: 0.5 };
            const res = await camera.takePictureAsync(Platform.OS == 'ios' ? optionIOS : options);
            uploadImage(res);
        }
    };

    const uploadImage = (obj) => {
        setLoading(true);
        new Store().getSession(Const.TOKEN).then(token => {
            let img = {
                uri: obj.uri,
                name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
                type: 'image/jpeg',
            };
            let url = `${URL}/api/ocr/v1/buckets/cloud-vision-inspection-certificate/images`;
            let bodyFormData = new FormData();
            bodyFormData.append('file', img);
            axios.post(url, bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token,
                },
            })
                .then((res) => {
                if (res.status == 200) {
                    getDataOcr(res?.data.data?.name, obj.uri);
                }
                })
                .catch(error => {
                console.log(error);
                });
        });
    }

    const getDataOcr = (name, uri) => {
        new Store().getSession(Const.TOKEN).then(token => {
            let url = `${URL}/api/ocr/v1/buckets/cloud-vision-inspection-certificate/images/${name}/text?type=cccd`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
                .then(res => res.json())
                .then(res => {
                    setLoading(false);
                    if (res.data) {
                        console.log('RES', res.data);
                        const obj = {...res.data, name: trimFullNameOCR(res.data?.name)}
                        saveImageOcr(id, { uri, infoOCR: obj });
                        if (id === '-1') {
                            Actions.ACareBuyer({ isCamera: true });
                        } else {
                            Actions.ACareItemCustomer({ isCamera: true, index: parseInt(id) });
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
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
                <Image style={{ height: 20, width: 20 }} source={require('../../config/images/public/icons/ic_Close.png')} />
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
                {/*<View  style={{flex: 1,backgroundColor:'red'}}>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={() => openLibPhoto()}*/}
                {/*       style={{padding:20}}>*/}
                {/*        /!*<Image style={{alignSelf: 'center', marginTop: 15, height: 20, width: 20}}*!/*/}
                {/*        /!*       source={require('../../../icons/zip.png')}/>*!/*/}
                {/*        <Text style={{color: 'white', fontSize: 20, marginTop: 10, alignSelf: 'center'}}>{'upload'}</Text>*/}

                {/*    </TouchableOpacity>*/}
                {/*</View>*/}

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
                {/*<View  style={{flex: 1}}>*/}

                {/*</View>*/}
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
});

export default connect(mapStateToProps, {
    saveImageOcr,
})(Camera);


