import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
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
import {Color, URL} from '../../config/System';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {renderVND} from '../../components/Functions';
import Store from '../../services/Store';
import Const from '../../services/Const';
import {saveOrderInfomation} from '../../actions/buy';

class HouseInsurancePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseInfomation: [],
      customerInfo: [
        {
          name: 'Công ty cổ phần INSO Việt Nam',
          phone: '0904626046',
          email: 'thunth8192@gmail.com',
          address: 'Số 2A Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
        },
      ],
      insuredCustomer: [],
      buyerInfomation: [],
      houseType: '',
      housePrice: '',
      completeYear: '',
      housePropertyValue: null,
      address: '',
      inhousePackage: '',
      feeRate: null,
      deductibleValue: '',
      province: '',
      district: '',
      insurObjectTypeId: '',
      inHousePackageId: null,
      buyerType: null,
    };
  }
  // lấy thông tin nhà từ redux
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    // thông tin nhà
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
      update.province = nextProps.houseInfomation.cityName;
      update.district = nextProps.houseInfomation.districtName;
      update.insurObjectTypeId = nextProps.houseInfomation.insurObjectTypeId;
      update.deductibleValue = nextProps.houseInfomation.deductibleValue;
      update.inHousePackageId = nextProps.houseInfomation.inHousePackageId;
      update.feeRate = nextProps.houseInfomation.feeRate;
    }
    // thông tin người được bảo hiểm
    if (
      nextProps.insuredCustomer &&
      nextProps.insuredCustomer !== prevState.insuredCustomer
    ) {
      //update.listProvinces = nextProps.listProvince,
      update.insuredCustomer = nextProps.insuredCustomer;
    }
    // thông tin người mua
    if (
      nextProps.buyerInfomation &&
      nextProps.buyerInfomation !== prevState.buyerInfomation
    ) {
      //update.listProvinces = nextProps.listProvince,
      update.buyerInfomation = nextProps.buyerInfomation;
      update.buyerType = nextProps.buyerInfomation.type;
    }
    return update;
  }
  // tạo hợp đồng
  createContract = () => {
    const {
      houseType,
      housePrice,
      completeYear,
      address,
      feeRate,
      district,
      province,
      insurObjectTypeId, // id loại hình căn nhà
      deductibleValue, // mức khấu trừ
      inHousePackageId, // id gói bh tài sản bên trong
      insuredCustomer, // người được bảo hiểm
      buyerInfomation, // người mua
    } = this.state;
    const a = housePrice.replace(/,/g, '');
    const convertedFeeRate = parseInt(feeRate);
    const convertedHousePrice = parseInt(a);
    new Store().getSession(Const.TOKEN).then(token => {
      let url = `${URL}/api/contract/v1/house-contracts`;
      let body = {
        purposeUsesHouse: houseType,
        insurObjectTypeId: insurObjectTypeId,
        completeYear: completeYear,
        periodUse: '1',
        housePrice: convertedHousePrice,
        feeRate: convertedFeeRate,
        deductibleValue: deductibleValue,
        inHousePackageId: inHousePackageId,
        cityName: province,
        districtName: district,
        address: address,
        buyer: buyerInfomation,
        insuredCustomers: [insuredCustomer],
        insurancePrintsAddress: {
          fullName: '',
          phone: '',
          email: '',
          cityName: '',
          districtName: '',
          address: '',
        },
        receiveType: 'EMAIL',
        isVat: 0,
        vatCompanyName: '',
        vatCompanyTaxCode: '',
        vatCompanyAddress: '',
        vatCompanyEmail: '',
        insurStartTime: '',
        insurEndTime: '',
        insurPeriodMonth: 0,
      };
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.status == 'success') {
            const array = {
              orderPrice: res?.data?.fee,
              orderDescription: `Thanh toan bao hiem nha`,
              buyer: {
                fullName: buyerInfomation.fullName,
                email: buyerInfomation.email || buyerInfomation.representEmail,
                phone: buyerInfomation.phone,
                address: buyerInfomation.addressBuyer,
              },
            };
            this.props.saveOrderInfomation(array);
            Actions.Pay();
          } else {
            alert(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  };
  // render thông tin căn nhà
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
            <Text style={{color: '#8D8C8D'}}>Số tiền bảo hiểm căn nhà:</Text>
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
            <Text style={{color: '#8D8C8D'}}>Địa chỉ nhà được bảo hiểm:</Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={{textAlign: 'right'}}>{this.state.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
  // render thông tin người được bảo hiểm
  renderCustomerInfo = item => {
    return (
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>
              Thông tin người được bảo hiểm:
            </Text>
          </View>
          <View style={styles.tourInfoContainer}>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.4}}>
                <Text style={{color: '#8D8C8D'}}>Họ và tên:</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={{textAlign: 'right'}}>{item.item.fullName}</Text>
              </View>
            </View>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.4}}>
                <Text style={{color: '#8D8C8D'}}>CMND/CCCD/Hộ chiếu:</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={{textAlign: 'right'}}>{item.item.cardId}</Text>
              </View>
            </View>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.4}}>
                <Text style={{color: '#8D8C8D'}}>Số điện thoại:</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={{textAlign: 'right'}}>{item.item.phone}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  // render thông tin người mua (cá nhân)
  renderPersonalInfo = item => (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>Thông tin người mua bảo hiểm</Text>
      </View>
      <View style={styles.tourInfoContainer}>
        <View style={styles.tourInfo}>
          <View style={{flex: 0.4}}>
            <Text style={{color: '#8D8C8D'}}>Họ và tên người mua:</Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={{textAlign: 'right'}}>{item.item.fullName}</Text>
          </View>
        </View>
        <View style={styles.tourInfo}>
          <View style={{flex: 0.4}}>
            <Text style={{color: '#8D8C8D'}}>Số điện thoại:</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text style={{textAlign: 'right'}}>{item.item.phone}</Text>
          </View>
        </View>
        <View style={styles.tourInfo}>
          <View style={{flex: 0.4}}>
            <Text style={{color: '#8D8C8D'}}>Địa chỉ:</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text style={{textAlign: 'right'}}>{item.item.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
  // render thông tin người mua (doanh nghiệp)
  renderCompanyInfo = item => (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>Thông tin người mua bảo hiểm</Text>
      </View>
      <View style={styles.tourInfoContainer}>
        <View style={styles.tourInfo}>
          <View style={{flex: 0.4}}>
            <Text style={{color: '#8D8C8D'}}>Tên doanh nghiệp:</Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={{textAlign: 'right'}}>{item.item.companyName}</Text>
          </View>
        </View>
        <View style={styles.tourInfo}>
          <View style={{flex: 0.4}}>
            <Text style={{color: '#8D8C8D'}}>Số điện thoại:</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text style={{textAlign: 'right'}}>{item.item.phone}</Text>
          </View>
        </View>
        <View style={styles.tourInfo}>
          <View style={{flex: 0.4}}>
            <Text style={{color: '#8D8C8D'}}>Địa chỉ:</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text style={{textAlign: 'right'}}>{item.item.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
  renderBuyerInfo = () => {
    if (this.state.buyerType == 1) {
      this.renderPersonalInfo();
    } else {
      this.renderCompanyInfo();
    }
  };
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
    const {modalPackages, insuredCustomer, buyerInfomation} = this.state;
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
              source={require('../../icons/iconAgent/ic_progress3.png')}
              style={{
                height: heightPercentageToDP('20'),
                width: widthPercentageToDP('85'),
              }}
              resizeMode={'contain'}
            />
          </View>
          {this.renderHouseInfo()}
          <FlatList
            data={[insuredCustomer]}
            renderItem={item => this.renderCustomerInfo(item)}
          />
          {this.state.buyerType == 1 ? (
            <FlatList
              data={[buyerInfomation]}
              renderItem={item => this.renderPersonalInfo(item)}
            />
          ) : (
            <FlatList
              data={[buyerInfomation]}
              renderItem={item => this.renderCompanyInfo(item)}
            />
          )}

          {/* {this.renderCustomerInfo()} */}
          {this.renderFee()}
        </ScrollView>
        <FooterButton>
          <Button label={'TIẾP TỤC'} onPress={() => this.createContract()} />
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
    paddingHorizontal: 16,
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
    elevation: 5,
    shadowColor: 'rgba(0, 107, 153, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 14,
    width: widthPercentageToDP('90'),
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
    width: widthPercentageToDP('90'),
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
    buyerInfomation: state.houseBuy.buyerInfomation,
    insuredCustomer: state.houseBuy.insuredCustomer,
    houseInfomation: state.houseBuy.houseInfomation,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveOrderInfomation: body => dispatch(saveOrderInfomation(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HouseInsurancePackage);
