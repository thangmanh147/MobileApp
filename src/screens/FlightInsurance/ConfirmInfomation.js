import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {Color, NewColor, subColor, URL} from '../../config/System';
import moment from 'moment';
import {renderVND} from '../../components/Functions';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconUpSvg from '../../config/images/icons/IconUpSvg';
import IconDownSvg from '../../config/images/icons/IconDownSvg';

class ConfirmInfomation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'button',
      isShowA: false,
      isShowB: false,
      isShowC: false,
      isDisabled: true,
      isChecked1: false,
      isChecked2: false,

      isVat: null,
      companyName: '',
      companyAddress: '',
      companyEmail: '',
      companyTax: '',

      departAirport: '',
      arrivalAirport: '',
      departBookingNumber: '',
      returnBookingNumber: '',
      twoWay: null,
      departFlightId: '',
      returnFlightId: '',

      customDepartFlight: null,
      customReturnFlight: null,

      customFlightNumber: '',
      customDepartDate: '',
      customDepartTime: '',
      customArrivalDate: '',
      customArrivalTime: '',

      customFlightNumberReturn: '',
      customDepartDateReturn: '',
      customDepartTimeReturn: '',
      customArrivalDateReturn: '',
      customArrivalTimeReturn: '',

      packageId: null,
      packageName: null,
      packagePrice: null,

      insuredCustomers: [],
      bill: [],
      flightTwoWayGo: [],
      flightTwoWayBack: [],
      flightOneWay: [],
      paymentInfo: [
        {
          name: 'BH trễ chuyến bay Đường bay Bạc',
          money: '1,023,600',
          amount: '3',
          way: '2',
          VAT: '102,360',
          total: '8,064,000',
        },
      ],
    };
  }
  handleCheck = () => {
    this.setState({
      isChecked1: !this.state.isChecked1,
      isChecked2: !this.state.isChecked2,
    });
  };
  componentDidMount() {
    this.getInfo();
    console.log('object', this.props.customReturnFlight);
  }
  // Lấy data từ redux, update lại state khi có thay đổi
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.flightInfo && nextProps.flightInfo !== prevState.flightInfo) {
      update.twoWay = nextProps.flightInfo.twoWay;
      update.departAirport = nextProps.flightInfo.departAirport;
      update.arrivalAirport = nextProps.flightInfo.arrivalAirport;
      update.departFlightId = nextProps.flightInfo.departFlightId;
      update.departBookingNumber = nextProps.flightInfo.departBookingNumber;
      update.returnFlightId = nextProps.flightInfo.returnFlightId;
      update.returnBookingNumber = nextProps.flightInfo.returnBookingNumber;
    }
    if (
      nextProps.customerInfo &&
      nextProps.customerInfo !== prevState.customerInfo
    ) {
      update.insuredCustomers = nextProps.customerInfo;
    }
    if (nextProps.billInfo && nextProps.billInfo !== prevState.billInfo) {
      update.isVat = nextProps.billInfo[0].isVat;
      update.companyName = nextProps.billInfo[0].companyName;
      update.companyAddress = nextProps.billInfo[0].companyAddress;
      update.companyEmail = nextProps.billInfo[0].companyEmail;
      update.companyTax = nextProps.billInfo[0].companyTax;
    }
    if (
      nextProps.insurancePackage &&
      nextProps.insurancePackage !== prevState.insurancePackage
    ) {
      update.packageId = nextProps.insurancePackage[0].id;
      update.packagePrice = nextProps.insurancePackage[0].price;
      update.packageName = nextProps.insurancePackage[0].name;
    }
    if (
      nextProps.customFlightInfo &&
      nextProps.customFlightInfo !== prevState.customFlightInfo
    ) {
      update.packageId = nextProps.insurancePackage[0].id;
      update.customDepartFlightNumber = nextProps.insurancePackage[0].price;
      update.customDepartDate = nextProps.insurancePackage[0].name;
      update.customDepartTime = nextProps.insurancePackage[0].name;
      update.customDepartArrivalDate = nextProps.insurancePackage[0].name;
      update.customDepartArrivalTime = nextProps.insurancePackage[0].name;
    }
    if (
      nextProps.customDepartFlight &&
      nextProps.customDepartFlight !== prevState.customDepartFlight
    ) {
      update.customDepartFlight = nextProps.customDepartFlight;
      update.customFlightNumber = nextProps.customDepartFlight.flightNumber;
      update.customDepartDate = nextProps.customDepartFlight.departDate;
      update.customDepartTime = nextProps.customDepartFlight.departTime;
      update.customArrivalDate = nextProps.customDepartFlight.arrivalDate;
      update.customArrivalTime = nextProps.customDepartFlight.arrivalTime;
    }
    if (
      nextProps.customReturnFlight &&
      nextProps.customReturnFlight !== prevState.customReturnFlight
    ) {
      update.customReturnFlight = nextProps.customReturnFlight;
      update.customFlightNumberReturn =
        nextProps.customReturnFlight.flightNumber;
      update.customDepartDateReturn = nextProps.customReturnFlight.departDate;
      update.customDepartTimeReturn = nextProps.customReturnFlight.departTime;
      update.customArrivalDateReturn = nextProps.customReturnFlight.arrivalDate;
      update.customArrivalTimeReturn = nextProps.customReturnFlight.arrivalTime;
    }
    return update;
  }
  createContract = () => {
    const {
      departAirport,
      arrivalAirport,
      departFlightId,
      departBookingNumber,
      returnFlightId,
      returnBookingNumber,
      customDepartFlight,
      customReturnFlight,
      insuredCustomers,
      packageId,
      isVat,
      companyName,
      companyTax,
      companyEmail,
      companyAddress,
      twoWay,
    } = this.state;
    let url = `${URL}/api/contract/v1/flight-delays`;
    let body = {
      twoWay: twoWay,
      departAirport: departAirport,
      arrivalAirport: arrivalAirport,
      departFlightId: departFlightId,
      departBookingNumber: departBookingNumber,
      returnFlightId: returnFlightId,
      returnBookingNumber: returnBookingNumber,
      customDepartFlight: customDepartFlight,
      customReturnFlight: customReturnFlight,
      insuredCustomers: insuredCustomers,
      packageId: packageId,
      isVat: isVat,
      companyName: companyName,
      companyTax: companyTax,
      companyEmail: companyEmail,
      companyAddress: companyAddress,
    };
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI1ODQxMTIsImlhdCI6OTkwMjU1NTMxMiwiYXV0aF90aW1lIjoxNjAyNTU1MzEwLCJqdGkiOiIxNDBiNDQyMC03MTUyLTRkZDAtYjQwNy0wYTNlMTE0MzAyMTUiLCJpc3MiOiJodHRwczovL2F1dGgwZGV2Lmluc28udm4vYXV0aC9yZWFsbXMvaW5zby1odWIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzNmZWI2NmMtY2M3Ny00ZDVhLWE2OGMtZDY3OGNjYWI3NDAyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicG9ydGFsIiwibm9uY2UiOiJkYmJmOWZlOC03ODI1LTQ0MjMtOTVhZC1iMGE4Y2ZjYmZjODMiLCJzZXNzaW9uX3N0YXRlIjoiZTIyODRmNGMtZGJlYy00Y2UxLWI3YTctZDFjYWMyNDQ1NDI5IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJwb3J0YWwuY2FwZG9uLnZuIiwiKiIsInZwYi5jYXBkb24udm4iLCJodWJkZXYuaW5zby52biJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiU1lTLUFETUlOIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIG9yZ2FuaXphdGlvbnMgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiaW5zby1hZG1pbiIsImNoYW5uZWxJZCI6IjVmMmU2ZTFkNzVhNzhmMDA0Y2U4OWY4NiJ9.r-YB7hg7lTN8YUuL1ASt_9UaMLCfkVo63374qcce2LM',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(res => {
        if (res.status == 'success') {
          // cấp đơn thành công => lưu lại thông tin chuyển sang thanh toán
          const array = {
            orderPrice: res?.data.fee,
            orderDescription: `Thanh toan bao hiem tre cb + ${res?.data.id}`,
            buyer: insuredCustomers[0],
          };
          this.props.saveOrderInfomation(array);
          Actions.Pay();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  // Lấy thông tin chuyến bay
  getInfo = async () => {
    await AsyncStorage.getItem('TwoWayFlightGo').then(res => {
      let result = JSON.parse(res);
      this.setState({flightTwoWayGo: result});
    });
    await AsyncStorage.getItem('TwoWayFlightBack').then(res => {
      let result = JSON.parse(res);
      this.setState({flightTwoWayBack: result});
    });
  };
  // convert định dạng ngày => DD/MM/YYYY
  formatDate = date => {
    let parsedDate = moment(date, 'YYYY-MM-DD');
    let formatedDate = parsedDate.format('DD/MM/YYYY');
    return formatedDate;
  };
  // render người được bảo hiểm
  renderInsuredCustomer = () => {
    const {companyName, companyTax, companyEmail, companyAddress} = this.state;
    return (
      <View
        style={{
          width: widthPercentageToDP('100'),
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 24,
        }}>
        {this.state.insuredCustomers.map((item, index) => {
          return (
            <View style={{marginTop: 20}}>
              <Text style={{lineHeight: 18}}>
                {index + 1}. {item.fullName.toUpperCase()}
              </Text>
              <View style={styles.textContainer}>
                <View style={{flex: 0.5}}>
                  <Text style={{color: '#8D8C8D'}}>Email:</Text>
                </View>
                <View style={{flex: 0.6}}>
                  <Text>{item.email}</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <View style={{flex: 0.5}}>
                  <Text style={{color: '#8D8C8D'}}>Số điện thoại:</Text>
                </View>
                <View style={{flex: 0.6}}>
                  <Text>{item.phone}</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <View style={{flex: 0.5}}>
                  <Text style={{color: '#8D8C8D'}}>CMND/Hộ chiếu:</Text>
                </View>
                <View style={{flex: 0.6}}>
                  <Text>{item.identityNumber}</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <View style={{flex: 0.5}}>
                  <Text style={{color: '#8D8C8D'}}>Giới tính:</Text>
                </View>
                <View style={{flex: 0.6}}>
                  <Text>{item.gender == 1 ? 'Nam' : 'Nữ'}</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <View style={{flex: 0.5}}>
                  <Text style={{color: '#8D8C8D'}}>Ngày sinh:</Text>
                </View>
                <View style={{flex: 0.6}}>
                  <Text>{this.formatDate(item.birthday)}</Text>
                </View>
              </View>
            </View>
          );
        })}
        {this.state.isVat == true ? (
          <View>
            <View
              style={{
                width: widthPercentageToDP('100'),
                height: 8,
                alignSelf: 'center',
                backgroundColor: '#F6F5F6',
              }}
            />
            <Text
              style={{
                lineHeight: 16,
                fontWeight: '700',
                marginTop: 20,
              }}>
              Thông tin nhận hóa đơn VAT:
            </Text>
            <View style={styles.textContainer}>
              <View style={{flex: 0.5}}>
                <Text style={{color: '#8D8C8D'}}>Tên DN:</Text>
              </View>
              <View style={{flex: 0.6}}>
                <Text>{companyName}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <View style={{flex: 0.5}}>
                <Text style={{color: '#8D8C8D'}}>Mã số thuế:</Text>
              </View>
              <View style={{flex: 0.6}}>
                <Text>{companyTax}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <View style={{flex: 0.5}}>
                <Text style={{color: '#8D8C8D'}}>Địa chỉ DN:</Text>
              </View>
              <View style={{flex: 0.6}}>
                <Text>{companyAddress}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <View style={{flex: 0.5}}>
                <Text style={{color: '#8D8C8D'}}>Email:</Text>
              </View>
              <View style={{flex: 0.6}}>
                <Text>{companyEmail}</Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  };
  // render thông tin chuyến bay
  renderFlightInfomation = () => {
    const {
      departAirport,
      arrivalAirport,
      departBookingNumber,
      returnBookingNumber,
      twoWay,
      customArrivalDate,
      customArrivalDateReturn,
      customArrivalTime,
      customArrivalTimeReturn,
      customDepartDate,
      customDepartDateReturn,
      customDepartTime,
      customDepartTimeReturn,
      customFlightNumber,
      customFlightNumberReturn,
    } = this.state;
    return (
      <View
        style={{
          width: widthPercentageToDP('100'),
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 24,
        }}>
        {this.state.flightTwoWayGo.map((item, index) => {
          return (
            <View style={{marginBottom: 10}}>
              <View style={{paddingTop: 10, flexDirection: 'row'}}>
                <FastImage
                  source={require('../../icons/ic_planeup.png')}
                  style={{width: 20, height: 15}}
                />
                <Text style={{marginLeft: 5}}>Chiều đi</Text>
              </View>
              <View style={{paddingTop: 10, flexDirection: 'row'}}>
                <View style={{flex: 0.6}}>
                  <Text style={{color: '#8D8C8D'}}>Số hiệu chuyến bay</Text>
                  <Text>
                    {customFlightNumber !== ''
                      ? customFlightNumber
                      : item.flightNumber}
                  </Text>
                </View>
                <View style={{flex: 0.4}}>
                  <Text style={{color: '#8D8C8D'}}>Mã đặt chỗ</Text>
                  <Text>{departBookingNumber}</Text>
                </View>
              </View>
              <View style={{paddingTop: 10, flexDirection: 'row'}}>
                <View style={{flex: 0.6}}>
                  <Text style={{color: '#8D8C8D'}}>Nơi đi</Text>
                  <Text>{departAirport}</Text>
                </View>
                <View style={{flex: 0.4}}>
                  <Text style={{color: '#8D8C8D'}}>Nơi đến</Text>
                  <Text>{arrivalAirport}</Text>
                </View>
              </View>
              <View style={{paddingTop: 10, flexDirection: 'row'}}>
                <View style={{flex: 0.6}}>
                  <Text style={{color: '#8D8C8D'}}>Thời gian đi</Text>
                  <Text>
                    {customDepartTime !== ''
                      ? customDepartTime
                      : item.departTime}{' '}
                    -{' '}
                    {customDepartDate !== ''
                      ? this.formatDate(customDepartDate)
                      : item.departDate}
                  </Text>
                </View>
                <View style={{flex: 0.4}}>
                  <Text style={{color: '#8D8C8D'}}>Thời gian đến</Text>
                  <Text>
                    {customArrivalTime !== ''
                      ? customArrivalTime
                      : item.arrivalTime}{' '}
                    -{' '}
                    {customArrivalDate !== ''
                      ? this.formatDate(customArrivalDate)
                      : item.arrivalDate}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
        {twoWay == true
          ? this.state.flightTwoWayBack.map((item, index) => {
              return (
                <View style={{marginBottom: 10}}>
                  <View style={{paddingTop: 10, flexDirection: 'row'}}>
                    <FastImage
                      source={require('../../icons/ic_planedown.png')}
                      style={{width: 20, height: 15}}
                    />
                    <Text style={{marginLeft: 5}}>Chiều về</Text>
                  </View>
                  <View style={{paddingTop: 10, flexDirection: 'row'}}>
                    <View style={{flex: 0.6}}>
                      <Text style={{color: '#8D8C8D'}}>Số hiệu chuyến bay</Text>
                      <Text>
                        {customFlightNumberReturn !== ''
                          ? customFlightNumberReturn
                          : item.flightNumber}
                      </Text>
                    </View>
                    <View style={{flex: 0.4}}>
                      <Text style={{color: '#8D8C8D'}}>Mã đặt chỗ</Text>
                      <Text>{returnBookingNumber}</Text>
                    </View>
                  </View>
                  <View style={{paddingTop: 10, flexDirection: 'row'}}>
                    <View style={{flex: 0.6}}>
                      <Text style={{color: '#8D8C8D'}}>Nơi đi</Text>
                      <Text>{arrivalAirport}</Text>
                    </View>
                    <View style={{flex: 0.4}}>
                      <Text style={{color: '#8D8C8D'}}>Nơi đến</Text>
                      <Text>{departAirport}</Text>
                    </View>
                  </View>
                  <View style={{paddingTop: 10, flexDirection: 'row'}}>
                    <View style={{flex: 0.6}}>
                      <Text style={{color: '#8D8C8D'}}>Thời gian đi</Text>
                      <Text>
                        {customDepartTimeReturn !== ''
                          ? customDepartTimeReturn
                          : item.departTime}{' '}
                        -{' '}
                        {customDepartDateReturn !== ''
                          ? customDepartDateReturn
                          : item.departDate}
                      </Text>
                    </View>
                    <View style={{flex: 0.4}}>
                      <Text style={{color: '#8D8C8D'}}>Thời gian đến</Text>
                      <Text>
                        {customArrivalTimeReturn !== ''
                          ? customArrivalTimeReturn
                          : item.arrivalTime}{' '}
                        -{' '}
                        {customArrivalDateReturn !== ''
                          ? customArrivalDateReturn
                          : item.arrivalDate}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          : null}
      </View>
    );
  };
  // render thông tin thanh toán
  renderPaymentInfomation = () => {
    const {twoWay, insuredCustomers, packagePrice, packageName} = this.state;
    return (
      <View
        style={{
          width: widthPercentageToDP('100'),
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 24,
        }}>
        <View style={{marginTop: 15}}>
          <View style={styles.paymentItem}>
            <Text style={{flex: 0.8, color: '#8D8C8D'}}>
              BH trễ chuyến bay {packageName}
            </Text>
            <Text>{renderVND(packagePrice)}đ</Text>
          </View>
          <View style={styles.paymentItem}>
            <Text style={{color: '#8D8C8D'}}>Số người mua</Text>
            <Text>{insuredCustomers.length} người</Text>
          </View>
          <View style={styles.paymentItem}>
            <Text style={{color: '#8D8C8D'}}>Chiều bay</Text>
            <Text>{twoWay == true ? '2' : '1'} chiều</Text>
          </View>
          <View style={styles.paymentItem}>
            <Text style={{color: '#8D8C8D'}}>Thuế VAT 10%</Text>
            <Text>{renderVND(packagePrice * 0.1)}đ</Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 2,
              backgroundColor: '#D9D9D9',
              marginTop: 12,
            }}
          />
          <View style={styles.paymentItem}>
            <Text style={{color: Color, fontWeight: '700'}}>THANH TOÁN</Text>
            <Text style={{color: Color, fontWeight: '700'}}>
              {renderVND(
                packagePrice * insuredCustomers.length +
                  packagePrice * insuredCustomers.length * 0.1,
              )}
              đ
            </Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const {isChecked1, isChecked2} =this.state;
    return (
      <View style={styles.container}>
        <Nav
          isInfo={false}
          show={true}
          title={'GÓI BẢO HIỂM'}
          bottom={20}
          onPress={() => Actions.pop()}
        />
        <ScrollView style={{flex: 1, marginTop: -20}}>
          <View
            style={{
              marginBottom: 10,
              width: widthPercentageToDP('90'),
              borderRadius: 10,
              backgroundColor: '#ffff',
              alignSelf: 'center',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
              shadowColor: '#000',
            }}>
            <View style={{padding: 10}}>
              <Text
                style={{lineHeight: 17, fontStyle: 'italic', color: '#BE3030'}}>
                Chú ý:
              </Text>
              <Text
                style={{
                  lineHeight: 17,
                  fontStyle: 'italic',
                  marginTop: 10,
                  color: '#414042',
                }}>
                Dưới đây là các thông tin bảo hiểm bạn đã đăng ký, và sẽ là căn
                cứ để bồi thường bảo hiểm cho bạn. Hãy vui lòng đọc kỹ và xác
                nhận lại
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                marginBottom: 10,
                width: widthPercentageToDP('90'),
                borderRadius: 10,
                backgroundColor: '#ffff',
                alignSelf: 'center',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 2,
                shadowColor: '#000',
              }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  marginLeft: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}
                onPress={() => this.setState({isShowA: !this.state.isShowA})}>
                <Text
                  style={{
                    lineHeight: 19,
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#414042',
                  }}>
                  A. Thông tin người được bảo hiểm
                </Text>
                {
                  this.state.isShowA == false ?
                    <IconDownSvg width={15} height={15} /> :
                    <IconUpSvg width={15} height={15} />
                }
              </TouchableOpacity>
            </View>
            {this.state.isShowA ? this.renderInsuredCustomer() : null}
          </View>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                marginBottom: 10,
                width: widthPercentageToDP('90'),
                borderRadius: 10,
                backgroundColor: '#ffff',
                alignSelf: 'center',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 2,
                shadowColor: '#000',
              }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  marginLeft: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}
                onPress={() => this.setState({isShowB: !this.state.isShowB})}>
                <Text
                  style={{
                    lineHeight: 19,
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#414042',
                  }}>
                  B. Thông tin chuyến bay
                </Text>
                {
                  this.state.isShowB == false ?
                    <IconDownSvg width={15} height={15} /> :
                    <IconUpSvg width={15} height={15} />
                }
              </TouchableOpacity>
            </View>
            {this.state.isShowB ? this.renderFlightInfomation() : null}
          </View>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                marginBottom: 10,
                width: widthPercentageToDP('90'),
                borderRadius: 10,
                backgroundColor: '#ffff',
                alignSelf: 'center',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 2,
                shadowColor: '#000',
              }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  marginLeft: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}
                onPress={() => this.setState({isShowC: !this.state.isShowC})}>
                <Text
                  style={{
                    lineHeight: 19,
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#414042',
                  }}>
                  C. Thông tin thanh toán
                </Text>
                {
                  this.state.isShowC == false ?
                    <IconDownSvg width={15} height={15} /> :
                    <IconUpSvg width={15} height={15} />
                }
              </TouchableOpacity>
            </View>
            {this.state.isShowC ? this.renderPaymentInfomation() : null}
          </View>
          <View
            style={{flex: 1, padding: 24, width: widthPercentageToDP('95')}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({isChecked1: !this.state.isChecked1})
                }>
                {
                  this.state.isChecked1
                    ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                    : <IconBoxSvg width={20} height={20} color={NewColor} />
                }
              </TouchableOpacity>
              <Text style={{marginLeft: 8}}>
                Tôi xác nhận các thông tin trên là đúng
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({isChecked2: !this.state.isChecked2})
                }>
                {
                  this.state.isChecked2
                    ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                    : <IconBoxSvg width={20} height={20} color={NewColor} />
                }
              </TouchableOpacity>
              <Text style={{marginLeft: 8}}>
                Tôi xác nhận đã đọc, hiểu và đồng ý với các{' '}
                {
                  <Text style={{color: Color, fontWeight: '700'}}>
                    Điểm loại trừ và Quy tắc bảo hiểm
                  </Text>
                }
              </Text>
            </View>
          </View>
        </ScrollView>
        <FooterButton>
          <Button
            color={!isChecked1 || !isChecked2 ? subColor : Color}
            label={'THANH TOÁN'}
            disabled={!isChecked1 || !isChecked2}
            marginTop={15}
            onPress={() => this.createContract()}
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
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  ic_arrow: {
    width: 40,
    height: 20,
    marginTop: 20,
  },
  paymentItem: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
});

import {saveOrderInfomation} from '../../actions/buy';

const mapStateToProps = state => {
  return {
    customerInfo: state.flightBuy.customerInfo,
    flightInfo: state.flightBuy.flightInfo,
    billInfo: state.flightBuy.billInfo,
    insurancePackage: state.flightBuy.insurancePackage,
    customFlightInfo: state.flightBuy.customFlightInfo,
    customDepartFlight: state.flightBuy.customDepartFlight,
    customReturnFlight: state.flightBuy.customReturnFlight,
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
)(ConfirmInfomation);
