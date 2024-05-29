import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from '../../components/Button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import {Actions} from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';
import {Color, URL} from '../../config/System';
class InsurancePack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      packageId: null,
    };
  }
  componentDidMount() {
    this.getListInsurance();
  }
  // lấy danh sách gói bảo hiểm
  getListInsurance = () => {
    let url = `${URL}/api/contract/v1/insurance-packages?type=FLIGHT_DELAY`;
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  // render item gói bảo hiểm
  renderItem = item => {
    return (
      <View
        style={{
          //justifyContent: 'center',
          //alignItems: 'center',
          backgroundColor: 'white',
          height: heightPercentageToDP('80'),
          width: widthPercentageToDP('85'),
          marginTop: 24,
          borderRadius: 10,
        }}>
        <FastImage
          source={{uri: item.item.image}}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            borderRadius: 10,
            //justifyContent: 'center',
          }}
          resizeMode={'cover'}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: Color}}>
            {item.item.name}
          </Text>
          <View
            style={{
              width: 140,
              height: 4,
              backgroundColor: '#FEB404',
              borderRadius: 35,
              marginTop: 4,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#8D8C8D',
              marginTop: 8,
            }}>
            {formatNumber(item.item.price)}đ/{item.item.unit}
          </Text>
          <Text style={{marginTop: 52}}>Nếu trễ nhận</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 4}}>
            {formatNumber(item.item.insuranceValue)}đ/
            {item.item.unit.replace('/người', '')}
          </Text>
        </View>
        <View style={{alignItems: 'center', paddingVertical: 16}}>
          <Button
            style={{width: '80%'}}
            label={'MUA NGAY'}
            onPress={() => {
              this.storeInfomation(item);
            }}
          />
        </View>
      </View>
    );
  };
  // lưu thông tin vào redux
  storeInfomation = async item => {
    let array = [];
    array.push({
      name: item.item.name,
      price: item.item.price,
      id: item.item.id,
    });
    await this.props.saveInsurancePackageInfo(array);
    Actions.ConfirmInfomation();
  };

  render() {
    const {data} = this.state;
    return (
      <View style={styles.container}>
        <FastImage
          source={require('../../icons/iconAgent/ic_flightpack_bg.png')}
          style={{
            flex: 1,
            width: widthPercentageToDP('100'),
            height: heightPercentageToDP('100'),
          }}>
          <StatusBar translucent backgroundColor="transparent" />
          <View style={{marginTop: 24}}>
            <TouchableOpacity
              onPress={() => Actions.pop()}
              style={styles.ctBack}>
              <FastImage
                style={styles.icBack}
                source={require('../../icons/ic_back.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={{marginTop: 20, alignSelf: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#ffff',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                CHỌN GÓI BẢO HIỂM
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 12,
            }}>
            <Carousel
              data={data.sort((a, b) => b.price - a.price)} // sắp xếp item theo giá
              renderItem={item => this.renderItem(item)}
              sliderWidth={widthPercentageToDP('100')}
              sliderHeight={heightPercentageToDP('100')}
              itemWidth={widthPercentageToDP('100') - 60}
              inactiveSlideScale={0.9}
              inactiveSlideOpacity={1}
              keyExtractor={item => item.index}
            />
          </View>
        </FastImage>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ctBack: {
    padding: 24,
    position: 'absolute',
    left: 0,
  },
  icBack: {
    height: 15,
    width: (15 * 21) / 39,
  },
});
import {connect} from 'react-redux';
import {saveInsurancePackageInfo} from './actions/flight_buy';
import {formatNumber} from '../../components/Functions';

const mapStateToProps = state => {
  return {
    flightBuy: state.flightBuy,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveInsurancePackageInfo: body => dispatch(saveInsurancePackageInfo(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InsurancePack);
