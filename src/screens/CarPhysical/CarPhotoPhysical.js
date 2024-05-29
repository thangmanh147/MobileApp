import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  Platform,
  PermissionsAndroid,
  Linking,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/Button';
import FooterButton from '../../components/FooterButton';
import Nav from '../../components/Nav';
import { Color, nameApp, TxtColor } from '../../config/System';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { isIPhoneX } from '../../utils/Util';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import IconCameraSvg from '../../config/images/tab_carPhysical/IconCameraSvg';
import IconCheckedSvg from '../../config/images/tab_carPhysical/IconCheckedSvg';

const keyMap = 'AIzaSyBs0-2m17teRiKtqfqGIsBXSlYVySjTufU';

class CarPhotoPhysical extends Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.state = {
      extraSeatImg: '',
      behindExtraSeatImg: '',
      driverSeatImg: '',
      behindDriverSeatImg: '',
      registrationStampImg: '',
      frontCarImg: '',
      backCarImg: '',
      arrayCarImg: [],
      showModal: false,
      titleSelected: '',
      address: '',
      latitude: 0,
      longitude: 0,
    };
  }
  // lấy ảnh từ redux
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    console.log('nextProps', nextProps)
    if (
      nextProps.arrayCarImg &&
      nextProps.arrayCarImg !== prevState.arrayCarImg
    ) {
      update.behindExtraSeatImg = nextProps.arrayCarImg[0].behindExtraSeat;
      update.extraSeatImg = nextProps.arrayCarImg[0].extraSeat;
      update.driverSeatImg = nextProps.arrayCarImg[0].driverSeat;
      update.behindDriverSeatImg = nextProps.arrayCarImg[0].behindDriverSeat;
      update.registrationStampImg = nextProps.arrayCarImg[0].registrationStamp;
      update.frontCarImg = nextProps.arrayCarImg[0].frontCarImg;
      update.backCarImg = nextProps.arrayCarImg[0].backCarImg;
    }
    return update;
  }

  componentDidMount() {
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

  // render button chụp ảnh
  _renderCameraButton = (image, title) => {
    return (
      <TouchableOpacity
        style={{ alignItems: 'center', paddingTop: 10 }}
        onPress={() => this.requireLocation(title)}>
        {
          image ?
            <IconCheckedSvg width={58} height={40} /> :
            <IconCameraSvg width={58} height={40} />
        }
        <Text style={{ textAlign: 'center', fontWeight: '400', fontSize: 14, color: TxtColor, marginTop: 6 }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  requireLocation = (title) => {
    if (Platform.OS === 'android') {
      this.requestLocationPermission(title).then(() => {});
    } else this.onSelect(title);
  };

  requestLocationPermission = async (title) => {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.onSelect(title);
        } else {
          this.onSelect(title);
        }
    } catch (err) {
        // console.log('err', err);
    }
  };

  onSelect = (title) => {
    if (nameApp.includes('YCHI')) {
      this.setState({titleSelected: title, showModal: true});
    } else {
      this.onOpenCamera(title);
    }
  }

  // mở camera theo từng vị trí xe
  onOpenCamera = title => {
    switch (title) {
      case 'Góc trước\nghế phụ':
        return Actions.execute('replace', 'TakePhotoPhysical', { action: 'FORM_IMAGE_CAR', active: 1 });
      case 'Góc sau\nghế phụ':
        return Actions.execute('replace', 'TakePhotoPhysical', { action: 'FORM_IMAGE_CAR', active: 2 });
      case 'Góc sau\nghế lái':
        return Actions.execute('replace', 'TakePhotoPhysical', { action: 'FORM_IMAGE_CAR', active: 3 });
      case 'Góc trước\nghế lái':
        return Actions.execute('replace', 'TakePhotoPhysical', { action: 'FORM_IMAGE_CAR', active: 4 });
      case 'Tem\nđăng kiểm':
        return Actions.execute('replace', 'TakePhotoPhysical', { action: 'FORM_IMAGE_CAR', active: 5 });
      case 'Góc chính diện\nđầu xe':
        return Actions.execute('replace', 'TakePhotoPhysical', { action: 'FORM_IMAGE_CAR', active: 6 });
      case 'Góc chính diện\nđuôi xe':
        return Actions.execute('replace', 'TakePhotoPhysical', { action: 'FORM_IMAGE_CAR', active: 7 });
      default:
        return;
    }
  };

  onCamera = () => {
    const {titleSelected} = this.state;
    this.setState({ showModal: false });
    this.onOpenCamera(titleSelected);
  };

  onLibrary = () => {
    this.selectPicture();
  };

  renderCase = title => {
    switch (title) {
      case 'Góc trước\nghế phụ':
        return 1;
      case 'Góc sau\nghế phụ':
        return 2;
      case 'Góc sau\nghế lái':
        return 3;
      case 'Góc trước\nghế lái':
        return 4;
      case 'Tem\nđăng kiểm':
        return 5;
      case 'Góc chính diện\nđầu xe':
        return 6;
      case 'Góc chính diện\nđuôi xe':
        return 7;
      default:
        return;
    }
  };

  selectPicture = () => {
    const { latitude, longitude, timer, address, titleSelected } = this.state;
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
        cropperCircleOverlay: false,
        sortOrder: 'none',
        compressImageMaxWidth: 720,
        compressImageMaxHeight: 720,
        compressImageQuality: Platform.OS === 'ios' ? 0.2 : 0.4,
        includeExif: true,
    })
        .then(image => {
          console.log('IMGGGG -:', image.path)
          this.setState({ showModal: false });
          Actions.ConfirmImage({
            nameHeader: 'IMAGE_' + this.renderCase(titleSelected),
            uri: image.path,
            infoImg: {
              location: { latitude: latitude, longitude: longitude, address: address },
              timePhoto: timer,
            }
          });
        })
        .catch();
  };

  render() {
    const {
      extraSeatImg,
      behindExtraSeatImg,
      driverSeatImg,
      behindDriverSeatImg,
      registrationStampImg,
      frontCarImg,
      backCarImg,
      showModal,
    } = this.state;

    return (
      <View style={styles.container}>
        <Nav show={true} isInfo={false} title={'CHỤP ẢNH XE CỦA BẠN'}
          onPress={() => Actions.PhotoCarY()}
        />
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.cameraButtonContainer}>
              {this._renderCameraButton(behindExtraSeatImg, 'Góc sau\nghế phụ')}
              {this._renderCameraButton(backCarImg, 'Góc chính diện\nđuôi xe')}
              {this._renderCameraButton(behindDriverSeatImg, 'Góc sau\nghế lái')}
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 36,
                paddingTop: 10,
                justifyContent: 'space-between'
              }}>
              {this._renderCameraButton(registrationStampImg, 'Tem\nđăng kiểm')}
              <FastImage
                  source={require('../../icons/car.png')}
                  style={{ height: heightPercentageToDP('40'), width: 167 }}
                  resizeMode="contain"
                />
                <View style={{width: Platform.OS === 'ios' ? 70 : 57}} />
            </View>
            <View style={styles.cameraButtonContainer}>
              {this._renderCameraButton(extraSeatImg, 'Góc trước\nghế phụ')}
              {this._renderCameraButton(frontCarImg, 'Góc chính diện\nđầu xe')}
              {this._renderCameraButton(driverSeatImg, 'Góc trước\nghế lái')}
            </View>
          </View>
        </ScrollView>
        <Modal
          isVisible={showModal}
          style={{ margin: 0, justifyContent: 'flex-end' }}
          onBackButtonPress={() => this.setState({showModal: false})}
          onBackdropPress={() => this.setState({showModal: false})}
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
                  paddingHorizontal: 24,
              }}>
                <TouchableOpacity onPress={this.onCamera} style={{paddingTop: 24, paddingBottom: 16}}>
                  <Text style={{ fontSize: 15, color: TxtColor }}>
                    Chụp ảnh
                  </Text>
                </TouchableOpacity>
                <View style={{height: 1, backgroundColor: '#D9D9D9'}} />
                <TouchableOpacity onPress={this.onLibrary} style={{paddingTop: 16, paddingBottom: 32}}>
                  <Text style={{ fontSize: 15, color: TxtColor }}>
                    Chọn ảnh từ thư viện
                  </Text>
                </TouchableOpacity>
          </View>
        </Modal>
        <FooterButton>
          <Button
            label="TIẾP TỤC"
            marginTop={10}
            onPress={() => Actions.PhotoCarY()}
            disabled={!(
              extraSeatImg &&
              behindExtraSeatImg &&
              driverSeatImg &&
              behindDriverSeatImg &&
              registrationStampImg &&
              frontCarImg &&
              backCarImg
            )}
          />
        </FooterButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: '#ffff',
    paddingTop: 24,
  },
  animatedHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    marginTop: isIPhoneX ? 15 : 5,
    padding: 24,
    position: 'absolute',
    left: 0,
  },
  ctBack: {
    zIndex: 1002,
  },
  icBack: {
    height: 15,
    width: (15 * 21) / 39,
  },
  cameraButtonContainer: {
    //flex: 1,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  bgcamera: {
    backgroundColor: '#D9D9D9',
    width: 58,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 0.4,
    backgroundColor: '#ffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

import { connect } from 'react-redux';
import { removeCarImage } from './actions/car_Buy';

const mapStateToProps = state => {
  return {
    arrayCarImg: state.carBuy.arrayCarImg,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeCarImage: body => dispatch(removeCarImage(body)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarPhotoPhysical);
