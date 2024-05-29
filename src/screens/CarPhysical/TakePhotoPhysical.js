import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageEditor,
  ImageStore,
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
  ToastAndroid,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { screen } from '../../config/System';
import Loading from '../../components/Loading';
import ModalGuideTakeCamera from '../../components/ModalGuideTakeCamera';
import { ScaledSheet } from 'react-native-size-matters';
// import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import { URL } from '../../config/System';
import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import Geocode from 'react-geocode';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import axios from 'axios';
import ImageResizer from 'react-native-image-resizer';
import Corner1Svg from '../../config/images/tab_carPhysical/Corner1Svg';
import Corner2Svg from '../../config/images/tab_carPhysical/Corner2Svg';
import Corner3Svg from '../../config/images/tab_carPhysical/Corner3Svg';
import Corner4Svg from '../../config/images/tab_carPhysical/Corner4Svg';
import Corner6Svg from '../../config/images/tab_carPhysical/Corner6Svg';
import Corner7Svg from '../../config/images/tab_carPhysical/Corner7Svg';
import { isIPhoneX } from '../../utils/Util';

const keyMap = 'AIzaSyBs0-2m17teRiKtqfqGIsBXSlYVySjTufU';

const height = screen.height - 150;
const width = screen.width - 100;

class TakePhotoPhysical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading: null,
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

    // if (Platform.OS === 'android' && Platform.Version < 23) {
    //   return true;
    // }

    // const hasPermission = await PermissionsAndroid.check(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    // );

    // if (hasPermission) {
    //   return true;
    // }

    // const status = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    // );

    // if (status === PermissionsAndroid.RESULTS.GRANTED) {
    //   return true;
    // }

    // if (status === PermissionsAndroid.RESULTS.DENIED) {
    //   ToastAndroid.show(
    //     'Quyền vị trí bị người dùng từ chối.',
    //     ToastAndroid.LONG,
    //   );
    // } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    //   ToastAndroid.show(
    //     'Người dùng đã thu hồi quyền vị trí.',
    //     ToastAndroid.LONG,
    //   );
    // }

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
        // Geocode.fromLatLng(
        //   latitude,
        //   longitude,
        // ).then(
        //   response => {
        //     const address = response.results[0].formatted_address;
        //     this.setState({
        //       latitude: latitude,
        //       longitude: longitude,
        //       timer: moment().format('HH:mm DD/MM/YYYY'),
        //       address: address,
        //     });
        //   },
        //   error => {
        //       console.log(error);
        //       this.setState({
        //         latitude: latitude,
        //         longitude: longitude,
        //         timer: moment().format('HH:mm DD/MM/YYYY'),
        //       });
        //   },
        // );
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
    // this.setState({
    //   loading: false
    // })
    console.log('IMG 0 :: ', res);
    const { active, action } = this.props;
    const { latitude, longitude, timer, address } = this.state;
    // ImageResizer.createResizedImage(img, 300, 300 * res.width / res.height, 'JPEG', 80, 0, undefined, false, { mode: 'contain', onlyScaleDown: false })
    // .then(resizedImage => {
    //   console.log('IMG RESIZE :: ', resizedImage.uri);
    // })
    // .catch(err => {
    //   console.log(err);
    //   return Alert.alert(
    //     'Unable to resize the photo',
    //     'Check the console for full the error message',
    //   );
    // });
    switch (action) {
      // ảnh xe
      case 'FORM_IMAGE_CAR':
        Actions.ConfirmImage({
          nameHeader: 'IMAGE_' + active,
          uri: img,
          infoImg: {
            location: { latitude: latitude, longitude: longitude, address: address },
            timePhoto: timer,
          }
        });
        return;
      // ảnh giấy đăng kiểm
      case 'FORM_CERTIFICATE_CAR':
        Actions.ConfirmImage({
          nameHeader: 'IMAGE_9',
          uri: img,
          infoImg: {
            location: { latitude: latitude, longitude: longitude, address: address },
            timePhoto: timer,
          }
        });
        return;
      // ảnh giấy đăng ký
      case 'FORM_REGISTRATION_CERTIFICATE_CAR':
        Actions.ConfirmImage({
          nameHeader: 'IMAGE_10',
          uri: img,
          infoImg: {
            location: { latitude: latitude, longitude: longitude, address: address },
            timePhoto: timer,
          }
        });
        return;
      case 'FORM_SALES_INVOICE_CAR':
        Actions.ConfirmImage({
          nameHeader: 'IMAGE_8',
          uri: img,
          infoImg: {
            location: { latitude: latitude, longitude: longitude, address: address },
            timePhoto: timer,
          }
        });
        return;
    }
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: Platform.OS === 'ios' ? 0.3 : 0.5, width: 720, base64: false };
      const res = await this.camera.takePictureAsync(options);
      switch (this.props.action) {
        case 'ADD_ID_NUMBER_FRONT_IMAGE':
          Actions.pop();
          return;
        case 'ADD_ID_NUMBER_BEHIND_IMAGE':
          Actions.pop();
          return;
        case 'ADD_PASS_PORT_IMAGE':
          Actions.pop();
          return;
        case 'FORM_SALES_INVOICE_CAR':
          this.uploadImage(res);
          return;
        case 'FORM_REGISTRATION_CERTIFICATE_CAR':
          this.uploadImage(res);
          // ImageStore.removeImageForTag(uri);
          return;
        case 'FORM_IMAGE_CAR':
          this.uploadImage(res);
          // ImageStore.removeImageForTag(uri);
          return;
        case 'FORM_CERTIFICATE_CAR':
          this.uploadImage(res);
          // ImageStore.removeImageForTag(uri);
          return;
        default:
          return;
      }
    }
  };

  // chooseGalerry() {
  //     Keyboard.dismiss()
  //     let options = {
  //         cameraType: 'back',
  //         mediaType: 'photo',
  //     }
  //     ImagePicker.launchImageLibrary(options, (response) => {
  //         if (response.didCancel == true) {
  //             return
  //         } else {
  //             // Image.getSize(response.uri,(width, height) => {
  //             // const imageSize = { size: { width, height },
  //             // 	offset: { x: 0, y: 0 },
  //             // 	displaySize: { width: 1280, height: 720},
  //             // 	resizeMode: 'contain',
  //             // };
  //             // ImageEditor.cropImage(response.uri, imageSize, (uri) => {
  //             // 	ImageStore.getBase64ForTag(uri, (data)=> {
  //             var base64 = `data:image/png;base64,${response.data}`;
  //             switch(this.props.action) {
  //                 case 'ADD_ID_NUMBER_FRONT_IMAGE':
  //                     Actions.pop();
  //                     return;
  //                 case 'ADD_ID_NUMBER_BEHIND_IMAGE':
  //                     Actions.pop();
  //                     return;
  //                 case 'ADD_PASS_PORT_IMAGE':
  //                     Actions.pop();
  //                     return;
  //                 case 'FORM_SALES_INVOICE_CAR':
  //                     Actions.CarNoPlate({checkStatus: 'FistTakeCamera',image: base64, contract_id: this.props.contract_id})
  //                     return;
  //                 case 'FORM_REGISTRATION_CERTIFICATE_CAR':
  //                     Actions.carRegistration({checkStatus: 'FistTakeCamera',image: base64, contract_id: this.props.contract_id})
  //                     // ImageStore.removeImageForTag(uri);
  //                     return;
  //                 case 'FORM_IMAGE_CAR':
  //                     Actions.pop()
  //                     // ImageStore.removeImageForTag(uri);
  //                     return;
  //                 case 'FORM_CERTIFICATE_CAR':
  //                     Actions.carCertificate({checkStatus: 'FistTakeCamera',image: base64, contract_id: this.props.contract_id})
  //                     // ImageStore.removeImageForTag(uri);
  //                     return;
  //                 default:
  //                     return;
  //             }
  //             // 		},(e) => {
  //             // 		// console.log(e);
  //             // 		})
  //             // 	},(e) => {
  //             // 		// console.log(e);
  //             // 	})
  //             // },(e) => {
  //             // 	// console.log(e);
  //             // 	})
  //         }
  //     })
  // }

  renderImage = active => {
    switch (active) {
      case 1:
        return (
          // <Corner1Svg />
          <FastImage
            style={{ width: screen.width - 48, height: screen.height - 150, marginBottom: 50  }}
            source={require('../../config/images/private/carphysical/corner1.png')}
            resizeMode="contain"
          />
        );
      case 2:
        return (
          // <Corner2Svg />
          <FastImage
            style={{ width: screen.width - 48, height: screen.height - 150, marginBottom: 50  }}
            source={require('../../config/images/private/carphysical/corner2.png')}
            resizeMode="contain"
          />
        );
      case 3:
        return (
          // <Corner3Svg />
          <FastImage
            style={{ width: screen.width - 48, height: screen.height - 150, marginBottom: 50  }}
            source={require('../../config/images/private/carphysical/corner3.png')}
            resizeMode="contain"
          />
        );
      case 4:
        return (
          // <Corner4Svg />
          <FastImage
            style={{ width: screen.width - 48, height: screen.height - 150, marginBottom: 50  }}
            source={require('../../config/images/private/carphysical/corner4.png')}
            resizeMode="contain"
          />
        );
      case 5:
        return null;
      case 6:
        return (
          // <Corner6Svg />
          <FastImage
            style={{ width: screen.width - 48, height: screen.height - 150, marginBottom: 50  }}
            source={require('../../config/images/private/carphysical/corner6.png')}
            resizeMode="contain"
          />
        );
      case 7:
        return (
          // <Corner7Svg />
          <FastImage
            style={{ width: screen.width - 48, height: screen.height - 150, marginBottom: 50  }}
            source={require('../../config/images/private/carphysical/corner7.png')}
            resizeMode="contain"
          />
        );
      default:
        return
    }
  };

  guideToTakeCamera() {
    this.setState({ modalGuiToTakeCamera: true });
  }
  // render modal hướng dẫn chụp
  renderImageGuideCamera(active) {
    switch (active) {
      case 2:
        const data1 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/goc_11.jpg'),
          // txt1: 'GÓC SAU GHẾ PHỤ',
          // subTxt2: 'Ngồi chếch sau đuôi xe, cách khoảng 50cm.',
          // subTxt3: 'Đuôi xe, thân xe bên ghế phụ và nhìn rõ biển số sau xe.',
          // txt5: 'Đuôi xe',
          // txt6: 'Thân xe',
        };
        return this.setState({ dataTakeCamera: data1 });
      case 3:
        const data2 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/goc_22.jpg'),
          // txt1: 'GÓC SAU GHẾ LÁI',
          // subTxt2: 'Ngồi chếch sau đuôi xe, cách khoảng 50cm.',
          // subTxt3: 'Đuôi xe, thân xe bên ghế lái và nhìn rõ biển số sau xe.',
          // txt5: 'Thân xe',
          // txt6: 'Đuôi xe',
        };
        return this.setState({ dataTakeCamera: data2 });
      case 1:
        const data3 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/goc_33.jpg'),
          // txt1: 'GÓC TRƯỚC GHẾ PHỤ',
          // subTxt2: 'Ngồi chếch trước mũi xe, cách ghế phụ khoảng 50cm.',
          // subTxt3: 'Đầu xe, thân xe bên ghế phụ và nhìn rõ biển số trước xe.',
          // txt5: 'Thân xe',
          // txt6: 'Đầu xe',
        };
        return this.setState({ dataTakeCamera: data3 });
      case 4:
        const data4 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/goc_44.jpg'),
          // txt1: 'GÓC TRƯỚC GHẾ LÁI',
          // subTxt2: 'Ngồi chếch trước mũi xe, cách ghế lái khoảng 50cm.',
          // subTxt3: 'Đầu xe, thân xe bên ghế lái và nhìn rõ biển số trước xe.',
          // txt5: 'Đầu xe',
          // txt6: 'Thân xe',
        };
        return this.setState({ dataTakeCamera: data4 });
      case 5:
        const data5 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/tem_dang_kiem1.jpg'),
          // txt1: 'TEM ĐĂNG KIỂM',
          // subTxt2: 'Đặt camera và chụp toàn bộ tem đăng kiểm.',
          // subTxt3:
          //   'Hình ảnh cần thấy rõ thời gian đăng kiểm và các nội dung trên tem.',
          // txt4: 'Lưu ý không để chụp cắt mất nội dung',
          // txt5: '',
          // txt6: '',
        };
        return this.setState({ dataTakeCamera: data5 });
      case 6:
        const data6 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/goc_55.jpg'),
          // txt1: 'GÓC CHÍNH DIỆN ĐẦU XE',
          // subTxt2: 'Ngồi thẳng trước đầu xe, cách khoảng 50cm.',
          // subTxt3: 'Đầu xe, toàn bộ mặt trước và nhìn rõ biển số trước xe.',
          // txt5: '',
          // txt6: '',
        };
        return this.setState({ dataTakeCamera: data6 });
      case 7:
        const data7 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/goc_66.jpg'),
          // txt1: 'GÓC CHÍNH DIỆN ĐUÔI XE',
          // subTxt2: 'Ngồi thẳng trước đuôi xe, cách khoảng 50cm.',
          // subTxt3: 'Đuôi xe, toàn bộ mặt sau và nhìn rõ biển số trước xe.',
          // txt5: '',
          // txt6: '',
        };
        return this.setState({ dataTakeCamera: data7 });
      default:
        return;
    }
  }

  renderAction = (action, infoCar) => {
    const {codeSelected} = this.props;
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
    const { latitude, longitude, timer, address } = this.state;
    return (
      <View style={styles.container}>
        {/* {this.state.loading ? <Loading /> : null} */}
        {this.state.modalGuiToTakeCamera == false && (
          <TouchableOpacity
            onPress={() => this.renderAction(action, infoCar)}
            style={{
              position: 'absolute',
              zIndex: 100,
              right: 0,
              top: isIPhoneX ? 38 : 18,
              padding: 24,
            }}>
            <Image
              style={{ height: 15, width: 15 }}
              source={require('../../config/images/public/icons/ic_Close.png')}
            />
          </TouchableOpacity>
        )}
        {/* <View style={{flexDirection: 'row', marginHorizontal: 24, paddingTop: 70}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {
              address?.length > 0 ? (
                <>
                  <FastImage
                      style={{width: 16, height: 16, marginRight: 4, marginTop: 2}}
                      source={require('../../config/images/public/icons/ic_Location.png')}
                      resizeMode="contain"
                  />
                  <Text style={{color: 'white', fontSize: 14, flex: 1}}>{address}</Text>
                </>
              ) : null
            }
          </View>
          <View style={{width: 24}} />
          <View style={{flex: 1}}>
            {
              latitude !== 0 && longitude !== 0 ? (
                <View style={{flexDirection: 'row'}}>
                  <FastImage
                      style={{width: 15, height: 15, marginRight: 4, marginTop: 2}}
                      source={require('../../config/images/public/icons/ic_Position.jpg')}
                      resizeMode="contain"
                  />
                  <View style={{flex: 1}}>
                    <Text style={{color: 'white', fontSize: 14}}>KĐ: {longitude}</Text>
                    <Text style={{color: 'white', fontSize: 14}}>VĐ: {latitude}</Text>
                  </View>
                </View>
              ) : null
            }
            {
              timer?.length > 0 ? (
                <View style={{flexDirection: 'row', marginTop: 4}}>
                  <FastImage
                      style={{width: 15, height: 15, marginRight: 4}}
                      source={require('../../config/images/public/icons/ic_Time.jpg')}
                      resizeMode="contain"
                  />
                  <Text style={{color: 'white', fontSize: 14, flex: 1}}>{timer}</Text>
                </View>
              ) : null
            }
          </View>
        </View> */}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          captureAudio={false}
          // flashMode={RNCamera.Constants.FlashMode.torch}
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
            // action == 'FORM_IMAGE_CAR' ||
            //   action == 'ADD_PASS_PORT_IMAGE' ||
            //   action == 'ADD_ID_NUMBER_FRONT_IMAGE' ||
            //   action == 'ADD_ID_NUMBER_BEHIND_IMAGE'
            false ? (
              <View style={styles.containGuideToTakeCamera}>
                <TouchableOpacity
                  onPress={() => this.guideToTakeCamera()} style={{ flexDirection: 'row' }}>
                  <Text style={styles.txtGuideTakeCamera}>Hướng dẫn chụp</Text>
                  <Image
                    style={styles.guide_take_camera}
                    source={require('../../icons/guide_take_camera.png')}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flex: 1 }} />
            )}
        </View>
        {action == 'FORM_IMAGE_CAR' ||
          action == 'ADD_PASS_PORT_IMAGE' ||
          action == 'ADD_ID_NUMBER_FRONT_IMAGE' ||
          action == 'ADD_ID_NUMBER_BEHIND_IMAGE' ? (
          <ModalGuideTakeCamera
            actionWhere={action}
            dataTakeCamera={this.state.dataTakeCamera}
            open={this.state.modalGuiToTakeCamera}
            onClosed={() => this.setState({ modalGuiToTakeCamera: false })}
          />
        ) : null}
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
export default connect(
  mapStateToProps,
)(TakePhotoPhysical);
