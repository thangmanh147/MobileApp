import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  BackHandler,
  ImageBackground,
} from 'react-native';
import Nav from '../../components/Nav';
import AppText from '../../components/AppText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import {Actions} from 'react-native-router-flux';
import Button from '../../components/Button';
import FooterButton from '../../components/FooterButton';
import FastImage from 'react-native-fast-image';

const width = 80;
const width1 = 50;
const valueScaleWindowWidth = function(percent) {
  return (Dimensions.get('window').width / 100) * percent;
};
class CarIntroduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      benefits: [
        {
          name: 'Mua và yêu cầu Bồi thường online chỉ trong 15 phút.',
          icon: require('../../icons/introduction/benefit_1.png'),
          width,
          height: (width * 133) / 151,
        },
        {
          name: 'Tự giám định tổn thất bằng camera trên điện thoại.',
          icon: require('../../icons/introduction/benefit_2.png'),
          width,
          height: (width * 134) / 132,
        },
        {
          name: 'Trả góp không lãi suất.',
          icon: require('../../icons/introduction/benefit_3.png'),
          width,
          height: (width * 131) / 146,
        },
        {
          name: 'Đặt hẹn lịch gara ngay trên app, không cần chờ đợi.',
          icon: require('../../icons/introduction/benefit_4.png'),
          width,
          height: (width * 167) / 146,
        },
        {
          name:
            'Giảm chi phí bảo hiểm cho năm tiếp theo khi có lịch sử bảo hiểm tốt.',
          icon: require('../../icons/introduction/benefit_5.png'),
          width,
          height: (width * 95) / 140,
        },
      ],
      rights: [
        {
          label: 'Bảo hiểm bắt buộc',
          product: [
            {
              title: 'Bảo hiểm Trách nhiệm dân sự (TNDS)',
              sub: 'Lên tới 100 triệu đồng/người/vụ',
              width: width1 - 15,
              height: ((width1 - 15) * 64) / 58,
              icon: require('../../icons/introduction/right_1.png'),
            },
            {
              title: 'Bảo hiểm tai nạn lái, phụ xe và  người ngồi trên xe',
              sub: 'Lên tới 1 tỷ đồng/người/vụ ',
              sub1: '(tối đa không quá 3 tỷ đồng/xe/vụ)',
              width: width1,
              height: (width1 * 46) / 87,
              icon: require('../../icons/introduction/right_2.png'),
            },
          ],
        },
        {
          label: 'Bảo hiểm vật chất xe',
          product: [
            {
              title: 'BS02. Bảo hiểm thay thế mới',
              sub:
                'Được bồi thường các bộ phận bị hư hỏng cần phải thay thế thuộc phạm vi bảo hiểm mà không trừ phần hao mòn (khấu hao) sử dụng.',
              width: width1,
              height: (width1 * 55) / 87,
              icon: require('../../icons/introduction/right_3.png'),
            },
            {
              title: 'BS04. Bảo hiểm xe bị mất trộm, cướp bộ phận ',
              sub:
                'Được thanh toán chi phí thực tế, hợp lý để thay thế bộ phận bị tổn thất.',
              width: width1 - 10,
              height: ((width1 - 10) * 58) / 65,
              icon: require('../../icons/introduction/right_4.png'),
            },
            {
              title: 'BS05. Bảo hiểm lựa chọn cơ sở sửa chữa',
              sub:
                'Được lựa chọn cơ sở sửa chữa (gara) ở thời điểm ký kết Hợp đồng bảo hiểm.',
              width: width1,
              height: (width1 * 64) / 90,
              icon: require('../../icons/introduction/right_5.png'),
            },
            {
              title:
                'BS06. Bảo hiểm tổn thất về động cơ khi xe hoạt động trong khu vực bị ngập nước',
              sub:
                'Được bồi thường chi phí sửa chữa, thay thế những thiệt hại thực tế của xe khi hoạt động trong vùng ngập nước.',
              width: width1,
              height: (width1 * 49) / 88,
              icon: require('../../icons/introduction/right_6.png'),
            },
            {
              title: 'BS13. Bảo hiểm cho thiết bị lắp thêm',
              sub:
                'a. Phạm vi bảo hiểm: Tổn thất của các thiết bị, bạt phủ lắp thêm trên xe ngoài các thiết bị của Nhà sản xuất đã lắp ráp.\nb. Quyền lợi bảo hiểm: PTI chịu trách nhiệm thanh toán chi phí thực tế, hợp lý để thay thế bộ phận bị tổn thất hoặc trả tiền cho Chủ xe cơ giới để bù đắp tổn thất thuộc phạm vị bảo hiểm trên cơ sở xác định được chi phí khắc phục tổn thất có thể phải trả.',
              width: width1,
              height: (width1 * 49) / 88,
              icon: require('../../icons/introduction/right_6.png'),
            },
            {
              title: 'Miễn thường khấu trừ 500,000 đồng/vụ tổn thất',
              sub: '',
              width: width1,
              height: (width1 * 60) / 89,
              icon: require('../../icons/introduction/right_8.png'),
            },
          ],
        },
      ],
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    Actions.pop();
    return true;
  };
  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  };
  render() {
    const {benefits, rights} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <Nav
          isInfo={false}
          title={'GIỚI THIỆU BẢO HIỂM XE Ô TÔ'}
          bottom={20}
          onPress={() => Actions.pop()}
        />
        <ScrollView
          style={{
            width: widthPercentageToDP('90'), //marginRight screen
            height: heightPercentageToDP('70'),
            marginTop: -20,
            alignSelf: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          keyboardShouldPersistTaps={'always'}>
          <View style={{flex: 1, paddingTop: 0}}>
            <View
              style={{
                paddingHorizontal: 10,
                backgroundColor: '#ffffff',
                flex: 1,
                borderWidth: 0.5,
                borderColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
              }}>
              <AppText style={styles.label}>
                5 lợi ích khi mua bảo hiểm trên app
              </AppText>
              <View style={styles.ctLine} />
              {benefits.map((item, index) => {
                return (
                  <View key={index}>
                    <View
                      style={[
                        styles.ctItemBenefit,
                        {borderBottomWidth: 1, borderColor: '#F4F5F6'},
                      ]}>
                      <AppText style={styles.txtName}>{item.name}</AppText>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={{backgroundColor: '#ffffff'}}>
              <AppText style={styles.label}>Quyền lợi bảo hiểm</AppText>
              {rights.map((item, index) => {
                return (
                  <View key={index}>
                    <AppText style={styles.sub1}>
                      {index + 1}. {item.label}
                    </AppText>
                    {item.product.map((product, i) => {
                      return (
                        <View style={styles.ctItemRight} key={i}>
                          <View
                            style={{width: width1 + 25, alignItems: 'center'}}>
                            <FastImage
                              style={{
                                width: product.width,
                                height: product.height,
                              }}
                              source={product.icon}
                            />
                          </View>
                          <View style={{flex: 1}}>
                            <AppText style={styles.sub}>
                              {product.title}
                            </AppText>
                            {product.sub !== '' && (
                              <AppText style={{color: '#333', marginTop: 5}}>
                                {product.sub}
                              </AppText>
                            )}
                            {product.sub1 && (
                              <AppText style={{color: '#333'}}>
                                {product.sub1}
                              </AppText>
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <FooterButton>
          <Button
            label="MUA NGAY"
            marginTop={0}
            onPress={() => Actions.CarProducer()}
          />
        </FooterButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sub: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 10,
  },
  sub1: {
    color: '#333',
    fontWeight: 'bold',
    marginTop: 20,
  },
  label: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  ctLine: {
    backgroundColor: '#F4F5F6',
    height: 1,
    flex: 1,
    marginTop: 15,
  },
  txtName: {
    color: '#333',
    flex: 1,
    lineHeight: 25,
    marginLeft: 15,
    fontSize: 14,
  },
  ctItemBenefit: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctItemRight: {
    paddingVertical: 10,
    // paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
import {connect} from 'react-redux';
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {};
export default CarIntroduction;
