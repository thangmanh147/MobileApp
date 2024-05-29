import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import Button from '../../components/Button';
import FooterButton from '../../components/FooterButton';
import Nav from '../../components/Nav';
import ModalBox from 'react-native-modalbox';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';

class CarPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: true,
      extraSeatImg: '',
      behindExtraSeatImg: '',
      driverSeatImg: '',
      behindDriverSeatImg: '',
      registrationStampImg: '',

      arrayCarImg: [],
    };
  }
  // lấy ảnh từ redux
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (
      nextProps.arrayCarImg &&
      nextProps.arrayCarImg !== prevState.arrayCarImg
    ) {
      update.behindExtraSeatImg = nextProps.arrayCarImg[0].behindExtraSeat;
      update.extraSeatImg = nextProps.arrayCarImg[0].extraSeat;
      update.driverSeatImg = nextProps.arrayCarImg[0].driverSeat;
      update.behindDriverSeatImg = nextProps.arrayCarImg[0].behindDriverSeat;
      update.registrationStampImg = nextProps.arrayCarImg[0].registrationStamp;
    }
    return update;
  }
  // render button chụp ảnh
  _renderCameraButton = (image, title) => {
    return (
      <TouchableOpacity
        style={{alignItems: 'center', paddingTop: 10}}
        onPress={() => this._onOpenCamera(title)}>
        <FastImage
          resizeMode="cover"
          source={{uri: image}}
          // source={require('../../icons/iconAgent/Vector.png')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            //position: 'absolute',
            width: 58,
            height: 40,
            borderRadius: 5,
          }}
        />
        <Text style={{textAlign: 'center', fontWeight: '400', fontSize: 14}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  // mở camera theo từng vị trí xe
  _onOpenCamera = title => {
    switch (title) {
      case 'Góc trước\nghế phụ':
        return Actions.TakePhoto({action: 'FORM_IMAGE_CAR', active: 1});
      case 'Góc sau\nghế phụ':
        return Actions.TakePhoto({action: 'FORM_IMAGE_CAR', active: 2});
      case 'Góc sau\nghế lái':
        return Actions.TakePhoto({action: 'FORM_IMAGE_CAR', active: 3});
      case 'Góc trước\nghế lái':
        return Actions.TakePhoto({action: 'FORM_IMAGE_CAR', active: 4});
      case 'Tem\nđăng kiểm':
        return Actions.TakePhoto({action: 'FORM_IMAGE_CAR', active: 5});
      case 'Góc chính diện\nđầu xe':
        return Actions.TakePhoto({action: 'FORM_IMAGE_CAR', active: 6});
      case 'Góc chính diện\nđuôi xe':
        return Actions.TakePhoto({action: 'FORM_IMAGE_CAR', active: 7});
      default:
        return;
    }
  };
  _onCloseModal = () => {
    this.setState({isModalOpen: false});
  };
  render() {
    const {
      extraSeatImg,
      behindExtraSeatImg,
      driverSeatImg,
      behindDriverSeatImg,
      registrationStampImg,
    } = this.state;
    return (
      <View style={styles.container}>
        <Nav
          isInfo={false}
          title={'CHỤP ẢNH XE'}
          bottom={20}
          onPress={() => Actions.pop()}
        />
        <ScrollView style={{flex: 1}}>
          <View style={styles.cameraButtonContainer}>
            {this._renderCameraButton(behindExtraSeatImg, 'Góc sau\nghế phụ')}
            {/* {this._renderCameraButton('Góc chính diện\nđuôi xe')} */}
            {this._renderCameraButton(behindDriverSeatImg, 'Góc sau\nghế lái')}
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 38,
            }}>
            {this._renderCameraButton(registrationStampImg, 'Tem\nđăng kiểm')}
            <FastImage
              source={require('../../icons/car.png')}
              style={{height: heightPercentageToDP('40'), width: 167}}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cameraButtonContainer}>
            {this._renderCameraButton(extraSeatImg, 'Góc trước\nghế phụ')}
            {/* {this._renderCameraButton('Góc chính diện\nđầu xe')} */}
            {this._renderCameraButton(driverSeatImg, 'Góc trước\nghế lái')}
          </View>
        </ScrollView>
        <ModalBox
          position={'bottom'}
          entry={'bottom'}
          isOpen={this.state.isModalOpen}
          style={styles.modalContainer}
          onClosed={() => this._onCloseModal()}>
          <View style={{alignItems: 'center', paddingTop: 25}}>
            <Image
              source={require('../../icons/iconAgent/ic_bell.png')}
              style={{height: 54, width: 61}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              width: widthPercentageToDP('65'),
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>
              Lưu ý
            </Text>
            <Text style={{textAlign: 'center', fontSize: 14}}>
              Bạn hãy chọn góc chụp thoáng không bị vật cản, đủ ánh sáng
            </Text>
          </View>
          <FooterButton>
            <Button
              label="OK"
              marginTop={10}
              onPress={() => this._onCloseModal()}
            />
          </FooterButton>
        </ModalBox>
        <FooterButton>
          <Button
            label="XÁC NHẬN"
            marginTop={10}
            onPress={() => Actions.CarInfomation()}
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

import {connect} from 'react-redux';
import {removeCarImage} from './actions/car_Buy';

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
)(CarPhoto);
