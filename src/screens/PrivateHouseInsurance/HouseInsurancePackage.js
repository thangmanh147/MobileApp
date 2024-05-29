import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import NavWithImage from '../../components/NavWithImage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../components/buy/Button';
import FooterButton from '../../components/FooterButton';
import FastImage from 'react-native-fast-image';
import {Color} from '../../config/System';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {renderVND} from '../../components/Functions';

class HouseInsurancePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseInfo: [
        {
          type: 'Nhà liền kề hoặc biệt thự',
          time: '0-5 năm',
          insuredValue: '500,000,000đ',
          houseProperty: '500,000,000đ',
          address: 'Số 1, tổ 14, ngách 46/60, Hoàng Liệt, Hoàng Mai, Hà Nội',
        },
      ],
      houseType: '',
      housePrice: '',
      completeYear: '',
      housePropertyValue: null,
      address: '',
      inhousePackage: '',
    };
  }
  // lấy thông tin ngôi nhà từ redux
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (
      nextProps.houseInfomation &&
      nextProps.houseInfomation !== prevState.houseInfomation
    ) {
      //update.listProvinces = nextProps.listProvince,
      update.houseType = nextProps.houseInfomation.purposeUsesHouse;
      update.housePrice = nextProps.houseInfomation.housePrice;
      update.completeYear = nextProps.houseInfomation.completeYear;
      update.address = nextProps.houseInfomation.address;
      update.inhousePackage = nextProps.houseInfomation.inhousePackage;
    }
    return update;
  }
  // render thông tin ngôi nhà
  renderHouseInfo = () => (
    <View style={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <FastImage
          source={require('../../icons/iconAgent/ic_info.png')}
          style={{height: 15, width: 15}}
          resizeMode={'contain'}
        />
        <Text style={styles.titleStyle}>Thông tin nhà mua bảo hiểm</Text>
      </View>
      {this.state.houseInfo.map(item => {
        return (
          <View style={styles.tourInfoContainer}>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.6}}>
                <Text style={{color: '#8D8C8D'}}>Loại hình ngôi nhà:</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={{textAlign: 'right'}}>{this.state.houseType}</Text>
              </View>
            </View>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.6}}>
                <Text style={{color: '#8D8C8D'}}>Năm hoàn thành:</Text>
              </View>
              <View>
                <Text>{this.state.completeYear}</Text>
              </View>
            </View>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.6}}>
                <Text style={{color: '#8D8C8D'}}>
                  Số tiền bảo hiểm căn nhà:
                </Text>
              </View>
              <View>
                <Text>{renderVND(this.state.housePrice)}đ</Text>
              </View>
            </View>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.6}}>
                <Text style={{color: '#8D8C8D'}}>
                  Số tiền bảo hiểm tài sản bên trong nhà
                </Text>
              </View>
              <View>
                <Text>{this.state.inhousePackage}</Text>
              </View>
            </View>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.6}}>
                <Text style={{color: '#8D8C8D'}}>
                  Địa chỉ nhà được bảo hiểm:
                </Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={{textAlign: 'right'}}>{this.state.address}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
  // render bảng phí
  renderFee = () => (
    <View style={styles.contentContainer}>
      <View style={styles.table}>
        <View
          style={[
            styles.tableTitleContainer,
            {height: 45, backgroundColor: '#676667'},
          ]}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FFFFFF'}}>
              TÍNH PHÍ BẢO HIỂM
            </Text>
          </View>
        </View>
        <View style={{padding: 14}}>
          <View style={styles.tourInfo}>
            <Text style={{fontWeight: '700'}}>1. Phí BH khung nhà</Text>
            <Text style={{fontWeight: '700'}}>2.600.000đ</Text>
          </View>
          <View style={styles.tourInfo}>
            <Text>2. Phí BH tài sản bên trong</Text>
            <Text>40.000đ</Text>
          </View>
          <FastImage />
          <FastImage
            source={require('../../icons/iconAgent/ic_line_dotted.png')}
            style={{width: '100%', height: 1, marginTop: 8}}
          />
          <View style={styles.tourInfo}>
            <Text>Phí bảo hiểm</Text>
            <Text>2.363.636đ</Text>
          </View>
          <View style={styles.tourInfo}>
            <Text>VAT (10%)</Text>
            <Text>236.364đ</Text>
          </View>
          <View style={styles.hr} />
          <View style={styles.tourInfo}>
            <Text style={{fontWeight: '700'}}>Thanh toán:</Text>
            <Text style={{fontWeight: '700'}}>2.628.600đ</Text>
          </View>
        </View>
      </View>
    </View>
  );
  render() {
    const {modalPackages} = this.state;
    return (
      <View style={styles.container}>
        {modalPackages ? (
          <ModalTravelPackage
            open={modalPackages}
            onClosed={() => this.setState({modalPackages: null})}
            setPackage={data => this.setIdPackage(data)}
            onOpened={() => this.setState({modalPackages: true})}
          />
        ) : null}
        <NavWithImage
          isInfo={false}
          title={'Bảo hiểm nhà tư nhân'}
          onPress={() => Actions.pop()}
          image={require('../../icons/iconAgent/ic_banner_house.png')}
        />
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <FastImage
              source={require('../../icons/iconAgent/ic_progress1.png')}
              style={{
                height: heightPercentageToDP('20'),
                width: widthPercentageToDP('86'),
              }}
              resizeMode={'contain'}
            />
          </View>
          {this.renderHouseInfo()}
          {this.renderFee()}
        </ScrollView>
        <FooterButton>
          <Button
            label={'TIẾP TỤC'}
            onPress={() => Actions.HouseInsuranceBuyerInfo()}
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
    paddingHorizontal: 24,
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 18,
    color: Color,
    marginLeft: 8,
  },
  tourInfoContainer: {
    alignSelf: 'center',
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    shadowColor: 'rgba(0, 107, 153, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 14,
    width: widthPercentageToDP('87'),
    marginTop: 16,
  },
  tourInfo: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  table: {
    flex: 1,
    alignSelf: 'center',
    width: widthPercentageToDP('87'),
    backgroundColor: '#F6F5F6',
    borderRadius: 10,
    marginTop: 16,
  },
  tableTitleContainer: {
    height: 45,
    backgroundColor: Color,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  tableTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  hr: {
    borderWidth: 0.5,
    borderColor: '#676667',
    borderRadius: 1,
  },
  textError: {
    color: '#F97C7C',
  },
  txtErrorCode: {
    color: '#F97C7C',
    fontSize: 12,
    marginTop: 5,
  },
});
const mapStateToProps = state => {
  return {
    houseInfomation: state.houseBuy.houseInfomation,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setPackage: body => dispatch(setPackage(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HouseInsurancePackage);
