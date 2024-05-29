import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageEditor,
  ImageStore,
  Platform,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {screen} from '../../config/System';
import Loading from '../../components/Loading';
import ModalGuideTakeCamera from '../../components/ModalGuideTakeCamera';
import {ScaledSheet} from 'react-native-size-matters';
// import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';
import {URL} from '../../config/System';
import {connect} from 'react-redux';
import Corner1Svg from '../../config/images/tab_carPhysical/Corner1Svg';
import Corner2Svg from '../../config/images/tab_carPhysical/Corner2Svg';
import Corner3Svg from '../../config/images/tab_carPhysical/Corner3Svg';
import Corner4Svg from '../../config/images/tab_carPhysical/Corner4Svg';
import Corner6Svg from '../../config/images/tab_carPhysical/Corner6Svg';
import Corner7Svg from '../../config/images/tab_carPhysical/Corner7Svg';

const height = screen.height - 150;
const width = screen.width - 100;

class TakePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: null,
      modalGuiToTakeCamera: false,
      dataTakeCamera: '',
      carImage: [],
    };
  }

  componentDidMount() {
    this.setState({modalGuiToTakeCamera: true});
    this.renderImageGuideCamera(this.props.active);
  }
  // upload image
  uploadImage = res => {
    let img = res.uri;
    const {active, action} = this.props;
    switch (action) {
        // ảnh xe
      case 'FORM_IMAGE_CAR':
        this.props.saveCarImage({
          name: 'IMAGE_' + active,
          uri: img,
        });
        Actions.CarPhoto();
        return;
        // ảnh giấy đăng kiểm
      case 'FORM_CERTIFICATE_CAR':
        this.props.saveImageCarCertificate({
          uri: img,
        });
        Actions.CarInfomation({type: 'reset'});
        return;
        // ảnh giấy đăng ký
      case 'FORM_REGISTRATION_CERTIFICATE_CAR':
        this.props.saveImageCarRegistrationCertificate({
          uri: img,
        });
        Actions.CarInfomation();
        return;
    }
    // let url = `${URL}/api/storage/v1/uploads`;
    // let form_Data = new FormData();
    // form_Data.append('file', {
    //   uri: img,
    //   type: 'image/jpeg',
    //   name: 'carCorner.jpg',
    // });
    // fetch(url, {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: form_Data,
    // })
    //   .then(res => {
    //     // upload thành công => lưu vào redux
    //     if (res?.status == 200) {
    //       return res.json().then(data => {
    //
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };
  handlePlatform = () => {
    if (Platform.OS === 'ios') {
      this.takePictureIos();
    } else {
      this.takePictureAndroid();
    }
  };
  takePictureIos = async () => {
    const {status} = this.props;
    // this.setState({loading: true});
    if (this.camera) {
      const options = {quality: 0.1};
      const res = await this.camera.takePictureAsync(options);
      Image.getSize(
        res.uri,
        (width, height) => {
          const imageSize = {
            size: {
              width,
              height,
            },
            offset: {
              x: 0,
              y: 0,
            },
            displaySize: {width: 984, height: 553},
          };
          ImageEditor.cropImage(
            res.uri,
            imageSize,
            uri => {
              ImageStore.getBase64ForTag(
                uri,
                data => {
                  var base64 = `data:image/png;base64,${data}`;
                  switch (this.props.action) {
                    case 'ADD_ID_NUMBER_FRONT_IMAGE':
                      this.props.updateImage(base64, this.props.action);
                      Actions.pop();
                      return;
                    case 'ADD_ID_NUMBER_BEHIND_IMAGE':
                      this.props.updateImage(base64, this.props.action);
                      Actions.pop();
                      return;
                    case 'ADD_PASS_PORT_IMAGE':
                      this.props.updateImage(base64, this.props.action);
                      Actions.pop();
                      return;
                    case 'FORM_SALES_INVOICE_CAR':
                      this.props.updateImage(base64, this.props.action);
                      Actions.CarNoPlate({
                        checkStatus: 'FistTakeCamera',
                        image: base64,
                        contract_id: this.props.contract_id,
                      });
                      return;
                    case 'FORM_REGISTRATION_CERTIFICATE_CAR':
                      this.props.updateImage(base64, this.props.action);
                      Actions.carRegistration({
                        checkStatus: 'FistTakeCamera',
                        image: base64,
                        contract_id: this.props.contract_id,
                      });
                      // ImageStore.removeImageForTag(uri);
                      return;
                    case 'FORM_IMAGE_CAR':
                      this.props.updateImage(
                        {
                          name: 'IMAGE_' + this.props.active,
                          value: base64,
                          // path: uri,
                          path: uri,
                        },
                        'FORM_IMAGE_CAR',
                      );
                      Actions.pop();
                      // ImageStore.removeImageForTag(uri);
                      return;
                    case 'FORM_CERTIFICATE_CAR':
                      this.props.updateImage(base64, this.props.action);
                      Actions.carCertificate({
                        checkStatus: 'FistTakeCamera',
                        image: base64,
                        contract_id: this.props.contract_id,
                      });
                      // ImageStore.removeImageForTag(uri);
                      return;
                    default:
                      return;
                  }
                },
                e => {
                  // console.log(e);
                },
              );
            },
            e => {
              // console.log(e);
            },
          );
        },
        e => {
          // console.log(e);
        },
      );
    }
  };
  // chụp ảnh trên android
  takePictureAndroid = async () => {
    const {status} = this.props;
    const {carImage} = this.state;
    this.setState({loading: true});
    if (this.camera) {
      const options = {quality: 0.1, base64: false};
      const res = await this.camera.takePictureAsync(options);
      //var base64 = `data:image/png;base64,${res.base64}`;
      // carImage.push(res)
      switch (this.props.action) {
        case 'ADD_ID_NUMBER_FRONT_IMAGE':
          this.props.updateImage(base64, this.props.action);
          Actions.pop();
          return;
        case 'ADD_ID_NUMBER_BEHIND_IMAGE':
          this.props.updateImage(base64, this.props.action);
          Actions.pop();
          return;
        case 'ADD_PASS_PORT_IMAGE':
          this.props.updateImage(base64, this.props.action);
          Actions.pop();
          return;
        case 'FORM_SALES_INVOICE_CAR':
          this.props.updateImage(base64, this.props.action);
          Actions.CarNoPlate({
            checkStatus: 'FistTakeCamera',
            image: base64,
            contract_id: this.props.contract_id,
          });
          return;
        case 'FORM_REGISTRATION_CERTIFICATE_CAR':
          this.uploadImage(res);
          // ImageStore.removeImageForTag(uri);
          return;
        case 'FORM_IMAGE_CAR':
          // this.props.updateImage({
          //     name: 'IMAGE_' + this.props.active,
          //     value: base64,
          //     // path: uri,
          //     path: res.uri,
          // }, 'FORM_IMAGE_CAR')
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
  //                     this.props.updateImage(base64, this.props.action)
  //                     Actions.pop();
  //                     return;
  //                 case 'ADD_ID_NUMBER_BEHIND_IMAGE':
  //                     this.props.updateImage(base64, this.props.action)
  //                     Actions.pop();
  //                     return;
  //                 case 'ADD_PASS_PORT_IMAGE':
  //                     this.props.updateImage(base64, this.props.action)
  //                     Actions.pop();
  //                     return;
  //                 case 'FORM_SALES_INVOICE_CAR':
  //                     this.props.updateImage(base64, this.props.action)
  //                     Actions.CarNoPlate({checkStatus: 'FistTakeCamera',image: base64, contract_id: this.props.contract_id})
  //                     return;
  //                 case 'FORM_REGISTRATION_CERTIFICATE_CAR':
  //                     this.props.updateImage(base64, this.props.action)
  //                     Actions.carRegistration({checkStatus: 'FistTakeCamera',image: base64, contract_id: this.props.contract_id})
  //                     // ImageStore.removeImageForTag(uri);
  //                     return;
  //                 case 'FORM_IMAGE_CAR':
  //                     this.props.updateImage({
  //                         name: 'IMAGE_'+this.props.active,
  //                         value: base64,
  //                         path: response.uri,
  //                     }, 'FORM_IMAGE_CAR')
  //                     Actions.pop()
  //                     // ImageStore.removeImageForTag(uri);
  //                     return;
  //                 case 'FORM_CERTIFICATE_CAR':
  //                     this.props.updateImage(base64, this.props.action)
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
          <Corner1Svg />
        );
      case 2:
        return (
          <Corner2Svg />
        );
      case 3:
        return (
          <Corner3Svg />
        );
      case 4:
        return (
          <Corner4Svg />
        );
      case 5:
        return (
          <Image
            style={styles.form1}
            source={require('../../icons/corner_5.png')}
          />
        );
      case 6:
        return (
          <Corner6Svg />
        );
      case 7:
        return (
          <Corner7Svg />
        );
      default:
        return;
    }
  };

  guideToTakeCamera() {
    this.setState({modalGuiToTakeCamera: true});
  }
  // render modal hướng dẫn chụp
  renderImageGuideCamera(active) {
    switch (active) {
      case 2:
        const data1 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/goc_11.jpg'),
          txt1: 'GÓC SAU GHẾ PHỤ',
          subTxt2: 'Ngồi chếch sau đuôi xe, cách khoảng 50cm.',
          subTxt3: 'Đuôi xe, thân xe bên ghế phụ và nhìn rõ biển số sau xe.',
          txt5: 'Đuôi xe',
          txt6: 'Thân xe',
        };
        return this.setState({dataTakeCamera: data1});
      case 3:
        const data2 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/goc_22.jpg'),
          txt1: 'GÓC SAU GHẾ LÁI',
          subTxt2: 'Ngồi chếch sau đuôi xe, cách khoảng 50cm.',
          subTxt3: 'Đuôi xe, thân xe bên ghế lái và nhìn rõ biển số sau xe.',
          txt5: 'Thân xe',
          txt6: 'Đuôi xe',
        };
        return this.setState({dataTakeCamera: data2});
      case 1:
        const data3 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/goc_33.jpg'),
          txt1: 'GÓC TRƯỚC GHẾ PHỤ',
          subTxt2: 'Ngồi chếch trước mũi xe, cách ghế phụ khoảng 50cm.',
          subTxt3: 'Đầu xe, thân xe bên ghế phụ và nhìn rõ biển số trước xe.',
          txt5: 'Thân xe',
          txt6: 'Đầu xe',
        };
        return this.setState({dataTakeCamera: data3});
      case 4:
        const data4 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/goc_44.jpg'),
          txt1: 'GÓC TRƯỚC GHẾ LÁI',
          subTxt2: 'Ngồi chếch trước mũi xe, cách ghế lái khoảng 50cm.',
          subTxt3: 'Đầu xe, thân xe bên ghế lái và nhìn rõ biển số trước xe.',
          txt5: 'Đầu xe',
          txt6: 'Thân xe',
        };
        return this.setState({dataTakeCamera: data4});
      case 5:
        const data5 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/tem_dang_kiem1.jpg'),
          txt1: 'TEM ĐĂNG KIỂM',
          subTxt2: 'Đặt camera và chụp toàn bộ tem đăng kiểm.',
          subTxt3:
            'Hình ảnh cần thấy rõ thời gian đăng kiểm và các nội dung trên tem.',
          txt4: 'Lưu ý không để chụp cắt mất nội dung',
          txt5: '',
          txt6: '',
        };
        return this.setState({dataTakeCamera: data5});
      case 6:
        const data6 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/goc_55.jpg'),
          txt1: 'GÓC CHÍNH DIỆN ĐẦU XE',
          subTxt2: 'Ngồi thẳng trước đầu xe, cách khoảng 50cm.',
          subTxt3: 'Đầu xe, toàn bộ mặt trước và nhìn rõ biển số trước xe.',
          txt5: '',
          txt6: '',
        };
        return this.setState({dataTakeCamera: data6});
      case 7:
        const data7 = {
          ImageGuideCamera: require('../../config/images/public/car_physical/goc_66.jpg'),
          txt1: 'GÓC CHÍNH DIỆN ĐUÔI XE',
          subTxt2: 'Ngồi thẳng trước đuôi xe, cách khoảng 50cm.',
          subTxt3: 'Đuôi xe, toàn bộ mặt sau và nhìn rõ biển số trước xe.',
          txt5: '',
          txt6: '',
        };
        return this.setState({dataTakeCamera: data7});
      default:
        return;
    }
  }

  render() {
    const {action} = this.props;
    return (
      <View style={styles.container}>
        {this.state.loading ? <Loading /> : null}
        <TouchableOpacity
          onPress={() => Actions.pop()}
          style={{
            position: 'absolute',
            zIndex: 100,
            right: 0,
            top: 20,
            padding: 15,
          }}>
          <Image
            style={{height: 20, width: 20}}
            source={require('../../config/images/public/icons/ic_Close.png')}
          />
        </TouchableOpacity>
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
          {this.renderImage(this.props.active)}
        </RNCamera>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => this.takePictureAndroid()}
              style={styles.capture}>
              <View
                style={{
                  width: 40,
                  backgroundColor: 'white',
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: '#000',
                }}
              />
            </TouchableOpacity>
          </View>
          {action == 'FORM_IMAGE_CAR' ||
          action == 'ADD_PASS_PORT_IMAGE' ||
          action == 'ADD_ID_NUMBER_FRONT_IMAGE' ||
          action == 'ADD_ID_NUMBER_BEHIND_IMAGE' ||
          action == 'FORM_REGISTRATION_CERTIFICATE_CAR' ||
          action == 'FORM_CERTIFICATE_CAR' ||
          action == 'FORM_SALES_INVOICE_CAR' ? (
            <TouchableOpacity
              onPress={() => this.guideToTakeCamera()}
              style={styles.containGuideToTakeCamera}>
              <Text style={styles.txtGuideTakeCamera}>Hướng dẫn chụp</Text>
              <Image
                style={styles.guide_take_camera}
                source={require('../../icons/guide_take_camera.png')}
              />
            </TouchableOpacity>
          ) : (
            <View style={{flex: 1}} />
          )}
        </View>
        {action == 'FORM_IMAGE_CAR' ||
        action == 'ADD_PASS_PORT_IMAGE' ||
        action == 'ADD_ID_NUMBER_FRONT_IMAGE' ||
        action == 'ADD_ID_NUMBER_BEHIND_IMAGE' ||
        action == 'FORM_SALES_INVOICE_CAR' ||
        action == 'FORM_REGISTRATION_CERTIFICATE_CAR' ||
        action == 'FORM_CERTIFICATE_CAR' ? (
          <ModalGuideTakeCamera
            actionWhere={action}
            dataTakeCamera={this.state.dataTakeCamera}
            open={this.state.modalGuiToTakeCamera}
            onClosed={() => this.setState({modalGuiToTakeCamera: false})}
          />
        ) : null}
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  txtGuideTakeCamera: {
    transform: [{rotate: '90deg'}],
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
    transform: [{rotate: '90deg'}],
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
  form1: {
    width,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
});

import {
  saveCarImage,
  saveImageCarCertificate,
  saveImageCarRegistrationCertificate,
} from './actions/car_Buy';

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    saveCarImage: body => dispatch(saveCarImage(body)),
    saveImageCarCertificate: body => dispatch(saveImageCarCertificate(body)),
    saveImageCarRegistrationCertificate: body =>
      dispatch(saveImageCarRegistrationCertificate(body)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TakePhoto);
