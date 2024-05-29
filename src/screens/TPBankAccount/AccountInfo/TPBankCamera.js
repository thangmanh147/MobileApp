import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { saveInfoImg } from '../../Account/actions';
import { screen } from '../../../config/System';
import ModalGuideTakeCamera from '../../../components/ModalGuideTakeCamera';
import { ScaledSheet } from 'react-native-size-matters';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import axios from 'axios';
import { isIPhoneX } from '../../../utils/Util';

const keyMap = 'AIzaSyBs0-2m17teRiKtqfqGIsBXSlYVySjTufU';

const height = screen.height - 150;
const width = screen.width - 100;

class TakePhotoPhysical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalGuiToTakeCamera: false,
      dataTakeCamera: '',
      carImage: [],
      address: '',
      latitude: 0,
      longitude: 0,
    };
  }

  componentDidMount() {
    const { action, active } = this.props;
    if (action == 'FORM_IMAGE_CAR') {
      this.setState({ modalGuiToTakeCamera: true });
    }
    this.renderImageGuideCamera(active);
    this.getLocation();
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

    if (!hasPermission) {
      this.setState({
        timer: moment().format('HH:mm DD/MM/YYYY'),
      });
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        axios.get(`https://gw.capdon.vn/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${keyMap}`)
          .then((res) => {
            if (res?.data?.results?.length > 0) {
              const address = res?.data?.results[0]?.formatted_address;
              this.setState({
                latitude: latitude,
                longitude: longitude,
                timer: moment().format('HH:mm DD/MM/YYYY'),
                address: address,
              });
            } else {
              this.setState({
                latitude: latitude,
                longitude: longitude,
                timer: moment().format('HH:mm DD/MM/YYYY'),
              });
            }
          })
          .catch(error => {
            console.log(error)
            this.setState({
              latitude: latitude,
              longitude: longitude,
              timer: moment().format('HH:mm DD/MM/YYYY'),
            });
          })
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
        this.setState({
          timer: moment().format('HH:mm DD/MM/YYYY'),
        });
        // this.focusLocation();
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // focusLocation = () => {
  //   this.callLocation();
  // };

  // upload image
  uploadImage = res => {
    let img = res.uri;
    const {saveInfoImg} = this.props;
    const { latitude, longitude, timer, address } = this.state;
    saveInfoImg({
      uri: img,
      infoImg: {
        location: { latitude: latitude, longitude: longitude, address: address },
        timePhoto: timer,
      }
    })
    Actions.TPBankFace();
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.4, width: 720, base64: true };
      const res = await this.camera.takePictureAsync(options);
      this.uploadImage(res);
    }
  };

  renderImage = active => {
    return (
      <FastImage
        style={{ width: screen.width + 400, height: screen.height, marginBottom: 50 }}
        source={require('./TPBankLine.png')}
        resizeMode="contain"
      />
    );
  };

  guideToTakeCamera() {
    this.setState({ modalGuiToTakeCamera: true });
  }
  // render modal hướng dẫn chụp
  renderImageGuideCamera(active) {
    const data1 = {
      ImageGuideCamera: require('../../../config/images/public/car_physical/goc_11.jpg'),
    };
    return this.setState({ dataTakeCamera: data1 });
  }

  renderAction = (action, infoCar) => {
    const { codeSelected } = this.props;
    if (action == 'FORM_IMAGE_CAR') {
      return Actions.CarPhotoPhysical()
    } else if (action !== 'FORM_IMAGE_CAR') {
      if (infoCar?.licensePlate?.length > 0 || codeSelected === 'VNI') {
        return Actions.PhotoCarY()
      } else {
        Actions.PhotoCar()
      }
    } else {
      Actions.pop()
    }
  }

  render() {
    const { action, infoCar, active } = this.props;
    return (
      <View style={styles.container}>
        {this.state.modalGuiToTakeCamera == false && (
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{
              position: 'absolute',
              zIndex: 100,
              right: 0,
              top: isIPhoneX ? 38 : 18,
              padding: 24,
            }}>
            <Image
              style={{ height: 15, width: 15 }}
              source={require('../../../config/images/public/icons/ic_Close.png')}
            />
          </TouchableOpacity>
        )}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          captureAudio={false}
          type={RNCamera.Constants.Type.front}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {this.renderImage(active)}
        </RNCamera>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => this.takePicture()}
            style={[styles.capture]}
          >
            <View
              style={{
                width: 40,
                backgroundColor: 'white',
                height: 40,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: '#333333',
              }}
            />
          </TouchableOpacity>
          {
            false ? (
              <View style={styles.containGuideToTakeCamera}>
                <TouchableOpacity
                  onPress={() => this.guideToTakeCamera()} style={{ flexDirection: 'row' }}>
                  <Text style={styles.txtGuideTakeCamera}>Hướng dẫn chụp</Text>
                  <Image
                    style={styles.guide_take_camera}
                    source={require('../../../icons/guide_take_camera.png')}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flex: 1 }} />
            )}
        </View>
        <ModalGuideTakeCamera
          actionWhere={action}
          dataTakeCamera={this.state.dataTakeCamera}
          open={this.state.modalGuiToTakeCamera}
          onClosed={() => this.setState({ modalGuiToTakeCamera: false })}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  txtGuideTakeCamera: {
    transform: [{ rotate: '90deg' }],
    textAlign: 'center',
    color: 'white',
    width: '70@s',
    fontSize: '12@s',
    marginRight: '10@s',
  },
  containGuideToTakeCamera: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  guide_take_camera: {
    marginRight: '30@s',
    alignSelf: 'center',
    transform: [{ rotate: '90deg' }],
    height: 20,
    width: 20,
  },
  corner1: {
    width: width + 50,
    height: ((width + 50) * 904) / 629,
  },
  corner4: {
    width: width + 50,
    height: ((width + 50) * 1020) / 629,
  },
  form: {
    height,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    position: 'absolute',
    bottom: 30,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  const listCompany = state.selectCompany.listCompany['C2'];
  const idComSelected = state.selectCompany.idComSelected['C2'];
  const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
  return {
    codeSelected: obj?.insurOrg?.code || '',
    infoCar: state?.carPhysical?.infoCarPhysical,
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
      saveInfoImg: (data) => dispatch(saveInfoImg(data)),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TakePhotoPhysical);
