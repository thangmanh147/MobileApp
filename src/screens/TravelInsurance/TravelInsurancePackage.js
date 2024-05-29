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
import InputForm from '../../components/buy/InputForm';
import Input from '../CarInsurance/components/Input';
import InputSelect from '../../components/buy/InputSelect';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../components/buy/Button';
import ModalButton from '../FlightInsurance/component/ModalButton';
import FooterButton from '../../components/FooterButton';
import FastImage from 'react-native-fast-image';
import {Color} from '../../config/System';
import Stars from 'react-native-stars';
import {Actions} from 'react-native-router-flux';
import ModalTravelPackage from './components/ModalTravelPackage';
import {connect} from 'react-redux';
import {setPackage} from './actions/travel_buy';
import {renderVND} from '../../components/Functions';
import IconCalculatorSvg from '../../config/images/icons/IconCalculatorSvg';

class TravelInsurancePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalPackages: null,
      packageName1: '',
      packageName2: '',
      packageId: '',
      price: '',
      tourInfo: [],

      errorCodePackage: '',
    };
  }
  // lấy thông tin chuyến du lịch từ redux
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.tourInfo && nextProps.tourInfo !== prevState.tourInfo) {
      update.tourInfo = nextProps.tourInfo;
    }
    return update;
  }
  // render error message
  showErrorNotInvalid(item) {
    return (
      <View>
        <Text style={styles.txtErrorCode}>{item}</Text>
      </View>
    );
  }
  // check đã chọn gói bh chưa
  validate = () => {
    const {packageName1, packageName2} = this.state;
    if (packageName1 == '' && packageName2 == '') {
      this.setState({
        errorCodePackage: 'Vui lòng chọn gói bảo hiểm',
      });
      return false;
    } else {
      return true;
    }
  };
  // mở dropdown list gói bh
  openPackage = item => {
    switch (item) {
      // gói 1
      case 'pack1':
        if (this.props.insuredType == 1) {
          // insuredType == 1 ? du lịch trong nước : quốc tế
          this.props.setPackage(1); // lấy danh sách theo subtype
          this.setState({modalPackages: true});
        } else {
          this.props.setPackage('ALL');
          this.setState({modalPackages: true});
        }
        return;
      // gói 2
      case 'pack2':
        // insuredType == 1 ? du lịch trong nước : quốc tế
        if (this.props.insuredType == 1) {
          this.props.setPackage(2); // lấy danh sách theo subtype
          this.setState({modalPackages: true});
        } else {
          this.props.setPackage('BASIC');
          this.setState({modalPackages: true});
        }
        return;
    }
  };
  // chọn gói bảo hiểm
  setPackage = data => {
    this.setIdPackage(data.name, data.id);
    this.setState({modalPackages: false});
  };
  setIdPackage = data => {
    if (this.props.listPackages == 1 || this.props.listPackages == 'ALL') {
      this.setState({
        packageName1: data.name,
        packageName2: '',
        packageId: data.id,
        price: data.price,
        errorCodePackage: '',
      });
    } else {
      this.setState({
        packageName2: data.name,
        packageName1: '',
        packageId: data.id,
        price: data.price,
        errorCodePackage: '',
      });
    }
  };
  next = () => {
    const {price, packageName1, packageName2, packageId} = this.state;
    if (this.validate()) {
      Actions.TravelInsuranceBuyerInfo({
        price: price,
        packageName: packageName1 || packageName2,
        packageId: packageId,
      });
    }
  };
  // render thông tin chuyến du lịch
  renderTourInfo = () => (
    <View style={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <FastImage
          source={require('../../icons/iconAgent/ic_info.png')}
          style={{height: 15, width: 15}}
          resizeMode={'contain'}
        />
        <Text style={styles.titleStyle}>Thông tin chuyến du lịch</Text>
      </View>
      {this.state.tourInfo.map(item => {
        return (
          <View style={styles.tourInfoContainer}>
            <View style={styles.tourInfo}>
              <Text>Điểm đến</Text>
              <Text>{item.areaName}</Text>
            </View>
            {item.arrivalCityName == '' ? (
              <View style={styles.tourInfo}>
                <Text>Quốc gia</Text>
                <Text>{item.countryName}</Text>
              </View>
            ) : (
              <View style={styles.tourInfo}>
                <Text>Thành phố</Text>
                <Text>{item.arrivalCityName}</Text>
              </View>
            )}
            <View style={styles.tourInfo}>
              <Text>Số người trong đoàn</Text>
              <Text>{item.peopleAmount}</Text>
            </View>
            <View style={styles.tourInfo}>
              <Text>Ngày đi</Text>
              <Text>{item.departTime}</Text>
            </View>
            <View style={styles.tourInfo}>
              <Text>Ngày về</Text>
              <Text>{item.returnTime}</Text>
            </View>
            <View style={styles.tourInfo}>
              <Text>Số ngày du lịch</Text>
              <Text>{item.dayNumber}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
  // render gói bảo hiểm
  renderPackage = () => {
    const {errorCodePackage, errorCodePackage2} = this.state;
    return (
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <IconCalculatorSvg width={15} height={15} />
          <Text style={styles.titleStyle}>Chọn gói bảo hiểm và tính phí</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableTitleContainer}>
            <Text style={styles.tableTitle}>Bảo hiểm du lịch trong nước</Text>
          </View>
          <View style={{padding: 14}}>
            <Input
              label={'Hình thức bảo hiểm'}
              value={'Bảo hiểm trọn gói theo chuyến đi'}
              editable={false}
            />
            <Input
              label={'Phạm vi bảo hiểm'}
              value={'Trong lãnh thổ Việt Nam'}
              editable={false}
            />
            <Text>
              Cách tính phí bảo hiểm: 0.015%* Số tiền bảo hiểm * số ngày * số
              người
            </Text>
          </View>
        </View>
        <View style={styles.table}>
          <View
            style={[
              styles.tableTitleContainer,
              {height: 90, backgroundColor: '#ACE5E4'},
            ]}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Gói 1</Text>
              <Stars
                display={1}
                spacing={8}
                count={5}
                starSize={20}
                fullStar={require('../../icons/iconAgent/ic_fullStar.png')}
                emptyStar={require('../../icons/iconAgent/ic_emptyStar.png')}
              />
            </View>
          </View>
          <View style={{padding: 14}}>
            <View>
              <InputSelect
                label={'Số tiền bảo hiểm'}
                openModal={() => this.openPackage('pack1')}
                value={this.state.packageName1}
              />
              {errorCodePackage !== ''
                ? this.showErrorNotInvalid(errorCodePackage)
                : null}
              <View style={{marginTop: 24}}>
                <ModalButton style={{width: '100%'}} label={'CHỌN MUA'} />
              </View>
            </View>
            <Text style={{fontWeight: 'bold'}}>Tai nạn:</Text>
            <View>
              <View style={styles.titleContainer}>
                <FastImage
                  source={require('../../icons/iconAgent/ic_v.png')}
                  style={{height: 10, width: 10}}
                  resizeMode={'contain'}
                />
                <Text style={{marginLeft: 8}}>
                  Tử vong: Toàn bộ số tiền bảo hiểm
                </Text>
              </View>
              <View style={styles.titleContainer}>
                <FastImage
                  source={require('../../icons/iconAgent/ic_v.png')}
                  style={{height: 10, width: 10}}
                  resizeMode={'contain'}
                />
                <Text style={{marginLeft: 8}}>
                  Thương tật thân thể: Theo bảng tỷ lệ thương tật
                </Text>
              </View>
            </View>
            <Text style={{fontWeight: 'bold'}}>Ốm đau bệnh tật:</Text>
            <View style={styles.titleContainer}>
              <FastImage
                source={require('../../icons/iconAgent/ic_v.png')}
                style={{height: 10, width: 10}}
                resizeMode={'contain'}
              />
              <Text style={{marginLeft: 8}}>
                Tử vong: do ốm đau, bệnh tật bất ngờ (không phải là bệnh tật
                phát sinh từ trước khi bảo hiểm có hiệu lực hoặc không phải các
                bệnh thuộc điểm loại trừ): Chi trả 50% số tiền bảo hiểm;
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View
            style={[
              styles.tableTitleContainer,
              {height: 90, backgroundColor: '#ACE5E4'},
            ]}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Gói 2</Text>
              <Stars
                display={3}
                spacing={8}
                count={5}
                starSize={20}
                fullStar={require('../../icons/iconAgent/ic_fullStar.png')}
                emptyStar={require('../../icons/iconAgent/ic_emptyStar.png')}
              />
            </View>
          </View>
          <View style={{padding: 14}}>
            <View>
              <InputSelect
                label={'Số tiền bảo hiểm'}
                openModal={() => this.openPackage('pack2')}
                value={this.state.packageName2}
              />
              {errorCodePackage !== ''
                ? this.showErrorNotInvalid(errorCodePackage)
                : null}
              <View style={{marginTop: 24}}>
                <ModalButton style={{width: '100%'}} label={'CHỌN MUA'} />
              </View>
            </View>
            <Text style={{fontWeight: 'bold'}}>Tai nạn:</Text>
            <View>
              <View style={styles.titleContainer}>
                <FastImage
                  source={require('../../icons/iconAgent/ic_v.png')}
                  style={{height: 10, width: 10}}
                  resizeMode={'contain'}
                />
                <Text style={{marginLeft: 8}}>
                  Tử vong: Toàn bộ số tiền bảo hiểm
                </Text>
              </View>
              <View style={styles.titleContainer}>
                <FastImage
                  source={require('../../icons/iconAgent/ic_v.png')}
                  style={{height: 10, width: 10}}
                  resizeMode={'contain'}
                />
                <Text style={{marginLeft: 8}}>
                  Thương tật thân thể: Theo chi phí y tế thực tế, hợp lý theo
                  chỉ định của bác sĩ ( Không vượt quá tỷ lệ thương tật đính kèm
                  trong quy tắc )
                </Text>
              </View>
            </View>
            <Text style={{fontWeight: 'bold'}}>Ốm đau bệnh tật:</Text>
            <View style={styles.titleContainer}>
              <FastImage
                source={require('../../icons/iconAgent/ic_v.png')}
                style={{height: 10, width: 10}}
                resizeMode={'contain'}
              />
              <Text style={{marginLeft: 8}}>
                Tử vong: do ốm đau, bệnh tật bất ngờ (không phải là bệnh tật
                phát sinh từ trước khi bảo hiểm có hiệu lực hoặc không phải các
                bệnh thuộc điểm loại trừ): Chi trả 50% số tiền bảo hiểm;
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  // render bảng phí
  renderFee = () => (
    <View style={styles.contentContainer}>
      {this.state.tourInfo.map(item => {
        return (
          <View style={styles.table}>
            <View
              style={[
                styles.tableTitleContainer,
                {height: 45, backgroundColor: '#676667'},
              ]}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: '#FFFFFF'}}>
                  TÍNH PHÍ BẢO HIỂM
                </Text>
              </View>
            </View>
            <View style={{padding: 14}}>
              {this.props.insuredType == 1 ? (
                <View style={styles.tourInfo}>
                  <Text style={{fontWeight: '700'}}>Số tiền bảo hiểm</Text>
                  <Text style={{fontWeight: '700'}}>
                    {this.state.packageName1 || this.state.packageName2}đ
                  </Text>
                </View>
              ) : (
                <View style={styles.tourInfo}>
                  <Text style={{fontWeight: '700'}}>Số tiền bảo hiểm</Text>
                  <Text style={{fontWeight: '700'}}>
                    {this.state.packageName1 || this.state.packageName2}
                  </Text>
                </View>
              )}

              <View style={styles.tourInfo}>
                <Text>Số người trong đoàn</Text>
                <Text>{item.peopleAmount} người</Text>
              </View>
              <View style={styles.tourInfo}>
                <Text>Số ngày du lịch</Text>
                <Text>{item.dayNumber} ngày</Text>
              </View>
              <View style={styles.hr} />
              {this.props.insuredType == 1 ? (
                <View style={styles.tourInfo}>
                  <Text style={{fontWeight: '700'}}>
                    Thanh toán (miễn VAT):
                  </Text>
                  <Text style={{fontWeight: '700'}}>
                    {renderVND(this.state.price)}đ
                  </Text>
                </View>
              ) : (
                <View style={styles.tourInfo}>
                  <Text style={{fontWeight: '700'}}>
                    Thanh toán (miễn VAT):
                  </Text>
                  <Text style={{fontWeight: '700'}}>
                    {renderVND(this.state.price)}$
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
  render() {
    const {modalPackages, errorCodePackage1, errorCodePackage2} = this.state;
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
          title={'Bảo hiểm du lịch'}
          onPress={() => Actions.pop()}
          image={require('../../icons/iconAgent/ic_banner_travel.jpg')}
        />
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <FastImage
              source={require('../../icons/iconAgent/ic_progress1.png')}
              style={{
                height: heightPercentageToDP('20'),
                width: widthPercentageToDP('85'),
              }}
              resizeMode={'contain'}
            />
          </View>
          {this.renderTourInfo()}
          {this.renderPackage()}
          <View style={styles.contentContainer}>
            <Text style={{fontStyle: 'italic'}}>
              Lưu ý: Trong mọi trường hợp tổng số tiền bồi thường thiệt hại
              không vượt quá Số tiền bảo hiểm ghi trên Giấy chứng nhận bảo hiểm
            </Text>
          </View>
          {this.renderFee()}
        </ScrollView>
        <FooterButton>
          <Button label={'TIẾP TỤC'} onPress={() => this.next()} />
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
    elevation: 1,
    shadowColor: 'rgba(0, 107, 153, 0.1)',
    paddingHorizontal: 24,
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
    listPackages: state.travelBuy.listPackages,
    tourInfo: state.travelBuy.tourInfo,
    insuredType: state.travelBuy.insuredType,
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
)(TravelInsurancePackage);
