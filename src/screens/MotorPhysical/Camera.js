import React, {useState, useEffect} from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image, Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux';

import {saveImageOcrPhysical} from './actions/motorActions';
import {RNCamera} from 'react-native-camera';
import {Color} from '../../config/System';

let { width, height } = Dimensions.get('window');

function Camera({saveImageOcrPhysical}) {

    const [type, setType] = useState(1);
    const [modalMotorType, setModalMotorType] = useState(null);
    const [modalExpMotor, setModalExpMotor] = useState(null);
    const [modalInsuranceMoney, setModalInsuranceMoney] = useState(null);
    const [motorType, setMotorType] = useState('');
    const [duration, setDuration] = useState('');
    const [feeTNDS, setFeeTNDS] = useState('');
    const [insuranceMoney, setInsuranceMoney] = useState('');
    const [check, setCheck] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [dateTo, setDateTo] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [currentDate, setCurrentDate] = useState('');
     const [openCamera,setOpenCamera] = useState(false)
    const [camera,setCamera] = useState('')



    const takePicture = async () => {
        if (camera) {
            const options = {quality: 0.9,orientation: 'portrait', fixOrientation: true};
            const optionIOS = {quality: 0.9,forceUpOrientation: true, fixOrientation: true};
            const res = await camera.takePictureAsync(Platform.OS == 'ios' ? optionIOS : options)
            console.log('res img',res)
            saveImageOcrPhysical(res)
            Actions.MotorPhysicalPackage({camera:true})
        }
    };
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'black'
        }}>

            <TouchableOpacity onPress={() => Actions.pop()} style={{
                position: 'absolute', zIndex: 100, right: 0, top: 20,
                paddingVertical: 15, padding: 35
            }}>
                <Image style={{height: 20, width: 20}} source={require('../../config/images/public/icons/ic_Close.png')}/>
            </TouchableOpacity>
            <RNCamera
                ref={ref => {
                    setCamera(ref);
                }}
                type={'back'}
                captureAudio={false}
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
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
                }}/>

            </RNCamera>
            <View style={{flexDirection: 'row'}}>
                {/*<View  style={{flex: 1,backgroundColor:'red'}}>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={() => openLibPhoto()}*/}
                {/*       style={{padding:20}}>*/}
                {/*        /!*<Image style={{alignSelf: 'center', marginTop: 15, height: 20, width: 20}}*!/*/}
                {/*        /!*       source={require('../../../icons/zip.png')}/>*!/*/}
                {/*        <Text style={{color: 'white', fontSize: 20, marginTop: 10, alignSelf: 'center'}}>{'upload'}</Text>*/}

                {/*    </TouchableOpacity>*/}
                {/*</View>*/}

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
    saveImageOcrPhysical
})(Camera);


