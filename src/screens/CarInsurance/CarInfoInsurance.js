import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Css from '../../config/Css';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import Modal from 'react-native-modalbox';
import Drawer from 'react-native-drawer';
import Information from '../../components/Information';
import FastImage from 'react-native-fast-image';

class CarInfoInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      price_suggest: '',
      profile_id: null,
      checkPolicy: true,
      car: [],

      purpose_name: '',
      carTypename: '',
      carBrandName: '',
      carModelName: '',
      numberSeat: '',
      manufactureYear: '',
      chassisNumber: '',
      machineNumber: '',
      licenseNumber: '',
      carValue: '',
      loadCapacity: '',
      insuredValue: '',
    };
  }
  componentDidMount() {
    console.log('2222222', this.props.carInfo);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.carInfo && nextProps.carInfo !== prevState.carInfo) {
      (update.purpose_name = nextProps.carInfo.purposeName),
        (update.carTypeName = nextProps.carInfo.carTypeName),
        (update.carBrandName = nextProps.carInfo.carBrandName),
        (update.carModelName = nextProps.carInfo.carModelName),
        (update.numberSeat = nextProps.carInfo.numberSeat),
        (update.manufactureYear = nextProps.carInfo.manufactureYear),
        (update.chassisNumber = nextProps.carInfo.chassisNumber),
        (update.machineNumber = nextProps.carInfo.machineNumber),
        (update.licenseNumber = nextProps.carInfo.licenseNumber),
        (update.carValue = nextProps.carInfo.declarationPrice),
        (update.loadCapacity = nextProps.carInfo.loadCapacity);
      update.insuredValue = nextProps.carInfo.insuredValue;
    }
    return update;
  }

  toggleCheck = condition => {
    this.setState({
      checkPolicy: condition,
    });
  };
  render() {
    const {
      purpose_name,
      carTypeName,
      checkPolicy,
      carBrandName,
      carModelName,
      numberSeat,
      manufactureYear,
      chassisNumber,
      machineNumber,
      licenseNumber,
      carValue,
      loadCapacity,
      insuredValue,
    } = this.state;
    const {car} = this.props;
    return (
      <Drawer
        openDrawerOffset={80}
        tapToClose={true}
        side={'right'}
        tweenHandler={ratio => ({
          main: {opacity: (2 - ratio) / 2, backgroundColor: 'black'},
        })}
        ref={ref => (this._drawer = ref)}
        content={<Information />}>
        <View style={Css.container}>
          <Nav
            show={true}
            isInfo={false}
            title={'THÔNG TIN XE MUA BẢO HIỂM'}
            onPress={() => Actions.pop()}
          />
          <ScrollView style={{marginTop: -40}}>
            <View style={{flex: 1, padding: 20, paddingTop: 0}}>
              {/*<InfoCar data={this.props.car}/>*/}
              <View style={css.ct}>
                <View style={css.ctItem}>
                  <Text style={css.title}>Mục đích sử dụng:</Text>
                  {/*<Text numberOfLines={5} style={css.value}>{this.props.car.purpose && this.props.car.purpose == '1' ? 'Không kinh doanh' : 'Kinh Doanh'}</Text>*/}
                  <Text style={css.value}>{purpose_name}</Text>
                </View>
                <View style={css.ctItem}>
                  <Text style={css.title}>Loại xe:</Text>
                  {/*<Text numberOfLines={5} style={css.value}>{this.props.car.brand_car}</Text>*/}
                  <Text style={css.value}>{carTypeName}</Text>
                </View>
                <View style={css.ctItem}>
                  <Text style={css.title}>Hãng xe:</Text>
                  {/*<Text numberOfLines={5} style={css.value}>{this.props.car.name}</Text>*/}
                  <Text style={css.value}>{carBrandName}</Text>
                </View>
                <View style={css.ctItem}>
                  <Text style={css.title}>Dòng xe:</Text>
                  {/*<Text numberOfLines={5} style={css.value}>{this.props.car.model}</Text>*/}
                  <Text style={css.value}>{carModelName}</Text>
                </View>
                <View style={css.ctItem}>
                  <Text style={css.title}>Số chỗ ngồi:</Text>
                  {/*<Text style={css.value}>{this.props.car.seat}</Text>*/}
                  <Text style={css.value}>{numberSeat}</Text>
                </View>
                <View style={css.ctItem}>
                  <Text style={css.title}>Năm sản xuất:</Text>
                  {/*<Text style={css.value}>{this.props.car.year}</Text>*/}
                  <Text style={css.value}>{manufactureYear}</Text>
                </View>
                <View style={css.ctItem}>
                  <Text style={css.title}>Số khung:</Text>
                  {/*<Text style={css.value}>{this.props.car.seat}</Text>*/}
                  <Text style={css.value}>{chassisNumber}</Text>
                </View>
                <View style={css.ctItem}>
                  <Text style={css.title}>Số máy:</Text>
                  {/*<Text style={css.value}>{this.props.car.seat}</Text>*/}
                  <Text style={css.value}>{machineNumber}</Text>
                </View>
                <View style={css.ctItem}>
                  <Text style={css.title}>Biển số xe:</Text>
                  {/*<Text style={css.value}>{this.props.car.seat}</Text>*/}
                  <Text style={css.value}>{licenseNumber}</Text>
                </View>
                {car && car.payload ? (
                  <View style={css.ctItem}>
                    <Text style={css.title}>Trọng tải</Text>
                    {/*<Text style={css.value}>{car.payload} tấn</Text>*/}
                    <Text style={css.value}>{loadCapacity}</Text>
                  </View>
                ) : null}
              </View>

              <View
                style={{
                  padding: 20,
                  backgroundColor: Color,
                  marginTop: 15,
                  borderRadius: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex: 0.5, color: '#FFFFFF'}}>Giá trị xe</Text>
                  <Text style={{flex: 0.5, color: '#FFFFFF'}}>
                    {renderVND(carValue)}đ
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Text style={{flex: 0.5, color: '#FFFFFF'}}>
                    Số tiền bảo hiểm
                  </Text>
                  <Text style={{flex: 0.5, color: '#FFFFFF'}}>
                    {renderVND(insuredValue)}đ
                  </Text>
                </View>
              </View>
              {/* <Text style={{paddingTop: 10, color: '#30bebc', lineHeight: 20}}>Ghi chú: Mức bồi thường tối đa là giá trị bồi thường tối đa mà bạn được nhận.</Text> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 30,
                marginTop: 10,
                marginLeft: 20,
              }}>
              {checkPolicy ? (
                <TouchableOpacity
                  onPress={() => this.toggleCheck(false)}
                  style={[
                    css.ctCheck,
                    {
                      backgroundColor: '#30cecb',
                      borderWidth: 0,
                    },
                  ]}>
                  <FastImage
                    style={{width: 15, height: (15 * 22) / 27}}
                    source={require('../../icons/iconAgent/ic_check.png')}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.toggleCheck(true)}
                  style={css.ctCheck}
                />
              )}
              <View style={{}}>
                <Text style={css.txtActive}>
                  {
                    'Tôi cam kết đã điền đúng và chịu trách nhiệm về thông tin mà tôi cung cấp'
                  }
                </Text>
              </View>
            </View>
          </ScrollView>

          {Platform.OS === 'ios' ? (
            <KeyboardAvoidingView behavior="padding">
              <FooterButton>
                <Button
                  label="TIẾP THEO"
                  marginTop={0}
                  //color={this.state.checkPolicy ? '#30BEBC' : '#97DEDD'}
                  disable={this.state.checkPolicy ? false : true}
                  onPress={() => Actions.CarInsurancePackage()}
                />
              </FooterButton>
            </KeyboardAvoidingView>
          ) : (
            <FooterButton>
              <Button
                label="TIẾP THEO"
                marginTop={10}
                //color={this.state.checkPolicy ? '#30BEBC' : '#97DEDD'}
                disable={this.state.checkPolicy ? false : true}
                onPress={() => Actions.CarInsurancePackage()}
              />
            </FooterButton>
          )}
        </View>
      </Drawer>
    );
  }
}
const css = StyleSheet.create({
  intro: {
    color: TxtBlack,
    marginBottom: 10,
    fontSize: 16,
  },
  value: {
    color: TxtBlack,
    flex: 1,
  },
  title: {
    color: '#999999',
    flex: 1.2,
  },
  ctItem: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  ct: {
    backgroundColor: '#fff',
    // height: 280,
    width: screen.width - 40,
    padding: 30,
    paddingTop: 20,
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius: 20,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 6,
  },

  ctCheck: {
    height: 20,
    width: 20,
    marginRight: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtActive: {
    color: '#333333',
  },
});
import {connect} from 'react-redux';
import {
  carGetPrice,
  checkPrice,
  setProfileId,
  showModalCheckPrice,
} from '../../actions/buy';
import {Color, screen, TxtBlack} from '../../config/System';
import InputPrice from '../../components/buy/InputPrice';
import {renderVND} from '../../components/Functions';
import ButtonNotColor from '../../components/ButtonNoColor';
import SimpleToast from 'react-native-simple-toast';
import {Actions} from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';

const mapStateToProps = state => {
  return {
    carInfo: state.carBuy.carInfo,
  };
};
const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps)(CarInfoInsurance);
