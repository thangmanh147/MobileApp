import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import IconCameraBlurSvg from '../../config/images/icons/IconCameraBlurSvg';

const data = {
  'IMAGE_1': 'Góc trước ghế phụ',
  'IMAGE_2': 'Góc sau ghế phụ',
  'IMAGE_3': 'Góc sau ghế lái',
  'IMAGE_4': 'Góc trước ghế lái',
  'IMAGE_5': 'Tem đăng kiểm',
  'IMAGE_6': 'Góc chính diện đầu xe',
  'IMAGE_7': 'Góc chính diện đuôi xe',
  'IMAGE_8': 'Giấy bàn giao xe',
  'IMAGE_9': 'Giấy đăng kiểm',
  'IMAGE_10': 'Đăng ký xe',
}

const { height } = Dimensions.get('window');
class ConfirmImage extends Component {
  constructor(props) {
    super(props);
  }

  onConfirm = () => {
    const { nameHeader, uri, infoImg, saveCarImage } = this.props;
    saveCarImage({
      name: nameHeader,
      uri: uri,
      infoImg: infoImg
    });
    if (nameHeader === 'IMAGE_9' || nameHeader === 'IMAGE_10') {
      Actions.PhotoCarY();
    } else if (nameHeader === 'IMAGE_8') {
      Actions.PhotoCar();
    } else {
      Actions.replace('CarPhotoPhysical');
    }
  };

  render() {
    const { nameHeader, uri, infoImg } = this.props;
    const name = data[nameHeader] || '';
    return (
      <View style={styles.container}>
        <View style={{ zIndex: 100 }}>
          <Nav isInfo={false} title={`ẢNH ${name?.toUpperCase()}`}
            onPress={() => Actions.pop()}
          />
        </View>
        <ScrollView style={{ marginTop: -30, zIndex: 100 }}>
          <View style={{ backgroundColor: TxtColor, borderRadius: 10, paddingBottom: 16, marginHorizontal: 24 }}>
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
              <TouchableOpacity style={{ position: 'absolute' }} onPress={() => Actions.pop()}>
                <IconCameraBlurSvg width={64} height={64} />
              </TouchableOpacity>
            </View>
            <Text style={{ color: '#FFF', fontSize: 14, marginTop: 12, marginLeft: 12 }}>Ảnh: {name}</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: 12, paddingTop: 8 }}>
              {
                infoImg?.location?.address?.length > 0 ? (
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <FastImage
                      style={{ width: 16, height: 16, marginRight: 4, marginTop: 2, marginLeft: -2 }}
                      source={require('../../config/images/public/icons/ic_Location.png')}
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
                        source={require('../../config/images/public/icons/ic_Position.jpg')}
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
                        source={require('../../config/images/public/icons/ic_Time.jpg')}
                        resizeMode="contain"
                      />
                      <Text style={{ color: 'white', fontSize: 14, flex: 1 }}>{infoImg?.timePhoto}</Text>
                    </View>
                  ) : null
                }
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ alignItems: 'center' }}>
          <Button
            label="XÁC NHẬN"
            marginTop={10}
            marginBottom={32}
            onPress={this.onConfirm}
          />
        </View>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },
});

import {
  saveCarImage,
} from './actions/car_Buy';
import { TouchableOpacity } from 'react-native';
import { TxtColor } from '../../config/System';

const mapDispatchToProps = dispatch => {
  return {
    saveCarImage: body => dispatch(saveCarImage(body)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(ConfirmImage);
