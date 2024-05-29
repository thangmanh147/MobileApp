import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
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
import Input from '../FlightInsurance/component/Input';
import {renderVND} from '../../components/Functions';
import {Color, URL, NewColor} from '../../config/System';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';

class AccidentConfirmInfomation extends Component {
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

      purposeId: '',
      purpose_name: '',
      purposeCode: '',
      carTypeId: '',
      carTypeCode: '',
      carTypename: '',
      numberSeat: '',
      manufactureYear: '',
      chassisNumber: '',
      machineNumber: '',
      licenseNumber: '',
      loadCapacity: '',

      companyName: '',
      companyTaxCode: '',
      companyAddress: '',
      companyBuyerName: '',
      companyBuyerRole: '',
      companyEmail: '',

      fullName: '',
      birthday: '',
      gender: '',
      cardId: '',
      phone: '',
      email: '',
      provinceName: '',
      districtName: '',
      address: '',

      isVat: null,

      fullNameReceive: '',
      addressReceive: '',

      extraSeatImg: '',
      behindExtraSeatImg: '',
      driverSeatImg: '',
      behindDriverSeatImg: '',
      registrationStampImg: '',
      carCertificateImg: '',
      carRegistrationCertificateImg: '',

      customer: [],
      bill: [
        {
          name: 'Công ty cổ phần INSO Việt Nam',
          taxCode: '232144545',
          address: 'Số 2A Đại Cồ Việt, Hai Bà Trưng,Hà Nội',
          email: 'ketoan@inso.vn',
        },
      ],
      car: [],
      carInsurance: [
        {
          carValue: '500,000,000đ',
          money: '500,000,000đ',
        },
      ],
      paymentInfo: [
        {
          name: 'Công ty bảo hiểm PTI',
          vehicleMaterial: '6,500,000',
          accident: '50,000',
          TNDS: '480,700',
          insuranceFee: '7,152,727',
          increseFee: '200,000',
          VAT: '102,360',
          total: '8,064,000',
        },
      ],
      carImage: [
        {
          url: require('../../icons/car.png'),
          description: 'Xe xước đầu, hơi móp góc phải',
        },
        {
          url: require('../../icons/car.png'),
          description: 'Xe xước đuôi, hơi móp góc phải',
        },
      ],
    };
  }
  componentDidMount() {
    console.log('customer info -----------', this.state.arrayCarImg);
  }
  // createContract = () => {
  //     const {
  //         purposeId, purposeCode, carTypeId, carTypeCode, carBranchId, carModelId, manufactureYear, numberSeat,
  //         loadCapacity, licenseNumber, licenseStatus, chassisNumber, machineNumber, carValue, insuredValue,
  //         changePremiumType, changePremiumReason, changePremiumPercentage, changePremiumValue, imageUrl1, imageUrl2,
  //         imageUrl3, imageUrl4, imageUrl5, imageUrlNewCar, companyTaxCode, companyAddress, companyName, companyBuyerName,
  //         companyBuyerRole, address, fullName, birthday, gender, cardId, phone, email, provinceName,
  //         districtName, buyerType, behindExtraSeatImg, extraSeatImg, driverSeatImg, behindDriverSeatImg, registrationStampImg
  //     } = this.state;
  //     console.log(purposeId, purposeCode, carTypeId, carTypeCode, carBranchId, carModelId, manufactureYear, numberSeat,
  //         loadCapacity, licenseNumber, licenseStatus, chassisNumber, machineNumber, carValue, insuredValue,
  //         imageUrl1, imageUrl2,
  //         imageUrl3, imageUrl4, imageUrl5, imageUrlNewCar, companyTaxCode, companyAddress, companyName, companyBuyerName,
  //         companyBuyerRole, address, fullName, birthday, gender, cardId, phone, email, provinceName,
  //         districtName, buyerType, behindExtraSeatImg, extraSeatImg, driverSeatImg, behindDriverSeatImg, registrationStampImg)
  //     let url = `${URL}/api/contract/v1/car-contract`
  //     let body = {
  //         "channelId": "23039db5-072d-49c0-8e4b-2a98528cb3bc",
  //         "channelNumber": "channelNumber",
  //         "objectIdd": "23039db5-072d-49c0-8e4b-2a98528cb3bc",
  //         "objectNumber": "objectNumber",
  //         "objectName": "objectName",
  //         "organizationId": "23039db5-072d-49c0-8e4b-2a98528cb3bc",
  //         "organizationNumber": "organizationNumber",
  //         "organizationName": "organizationName",
  //         "salerId": "23039db5-072d-49c0-8e4b-2a98528cb3bc",
  //         "salerName": "salerName",
  //         "contractId": 0,
  //         "purposeId": purposeId,
  //         "purposeCode": purposeCode,
  //         "carTypeId": carTypeId,
  //         "carTypeCode": carTypeCode,
  //         "carBranchId": carBranchId,
  //         "carModelId": carModelId,
  //         "manufactureYear": manufactureYear,
  //         "numberSeat": numberSeat,
  //         "loadCapacity": loadCapacity,
  //         "licenseNumber": licenseNumber,
  //         "licenseStatus": 1,
  //         "chassisNumber": chassisNumber,
  //         "machineNumber": machineNumber,
  //         "declarationPrice": carValue,
  //         "insuredValue": insuredValue,
  //         "changePremiumType": "Tăng",
  //         "changePremiumReason": "Lý do đây",
  //         "changePremiumPercentage": 0.2,
  //         "changePremiumValue": 200000000,
  //         "imageUrl1": behindExtraSeatImg,
  //         "imageUrl2": extraSeatImg,
  //         "imageUrl3": driverSeatImg,
  //         "imageUrl4": behindDriverSeatImg,
  //         "imageUrl5": registrationStampImg,
  //         "imageUrlNewCar": "https://kenh14cdn.com/thumb_w/660/2020/6/5/006mrmprly1gdx6exf3lyj30u01rcasm-15913263980501789002707-crop-15913264120321997228444.jpg",
  //         "packages": [
  //             {
  //                 "benefitCode": "bs01",
  //                 "benefitFrom": "20/11/2020",
  //                 "benefitTo": "20/11/2020"
  //             },
  //             {
  //                 "benefitCode": "bs02",
  //                 "benefitFrom": "20/11/2020",
  //                 "benefitTo": "20/11/2020"
  //             }
  //         ],
  //         "buyerType": buyerType,
  //         "companyTaxCode": companyTaxCode,
  //         "companyAddress": companyAddress,
  //         "companyName": companyName,
  //         "companyBuyerName": companyBuyerName,
  //         "companyBuyerRole": companyBuyerRole,
  //         "address": address,
  //         'fullName': fullName,
  //         'birthday': birthday,
  //         'gender': gender,
  //         'cardId': cardId,
  //         'phone': phone,
  //         'email': email,
  //         'provinceName': provinceName,
  //         'districtName': districtName,
  //         'address': address,
  //      }
  //     fetch(url, {
  //         method: 'PUT',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(body)
  //     })
  //         //.then((res) => res.json())
  //         .then((res) => {
  //             console.log(res)
  //             if (res?.status == 200) {
  //                 alert('Thành công')
  //             }
  //         })
  //         .catch((error) => {
  //             console.log(error)
  //         })
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (
      nextProps.carInfoTnds &&
      nextProps.carInfoTnds !== prevState.carInfoTnds
    ) {
      update.carTypename = nextProps.carInfoTnds.brand_car;
      update.chassisNumber = nextProps.carInfoTnds.chassisNumber;
      update.machineNumber = nextProps.carInfoTnds.machineNumber;
      update.licenseNumber = nextProps.carInfoTnds.licenseNumber;
      update.loadCapacity = nextProps.carInfoTnds.loadCapacity;
      update.numberSeat = nextProps.carInfoTnds.seat;
    }
    if (
      nextProps.customerInfoTnds &&
      nextProps.customerInfoTnds !== prevState.customerInfoTnds
    ) {
      update.fullName = nextProps.customerInfoTnds.fullName;
      update.phone = nextProps.customerInfoTnds.phone;
      update.email = nextProps.customerInfoTnds.email;
      update.address = nextProps.customerInfoTnds.address;
      update.fullNameReceive = nextProps.customerInfoTnds.fullNameReceive;
      update.addressReceive = nextProps.customerInfoTnds.addressReceive;
      update.companyName = nextProps.customerInfoTnds.companyName;
      update.companyTaxCode = nextProps.customerInfoTnds.taxCode;
      update.companyAddress = nextProps.customerInfoTnds.companyAddress;
      update.companyEmail = nextProps.customerInfoTnds.companyEmail;
      update.isVat = nextProps.customerInfoTnds.isVat;
    }
    return update;
  }
  handleCheck = item => {
    switch (item) {
      case '1':
        this.setState({isChecked1: !this.state.isChecked1});
      case '2':
        this.setState({isChecked2: !this.state.isChecked2});
      default:
        return;
    }
  };
  // render thông tin người mua cá nhân
  renderPersonal = () => {
    const {
      fullName,
      phone,
      email,
      address,
      fullNameReceive,
      companyName,
      companyAddress,
      companyEmail,
      isVat,
    } = this.state;
    return (
      <View style={{paddingVertical: 10}}>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Họ và tên</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{fullName}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Điện thoại</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{phone}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Email</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{email}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Địa chỉ</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{address}</Text>
          </View>
        </View>
        <View
          style={{
            width: widthPercentageToDP('100'),
            backgroundColor: '#F6F5F6',
            height: 8,
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
        <View style={{paddingVertical: 20}}>
          <Text style={{fontWeight: '700'}}>Địa chỉ nhận ấn chỉ bảo hiểm</Text>
          <View style={styles.textContainer}>
            <View style={{flex: 0.5}}>
              <Text style={{color: '#8D8C8D'}}>Họ và tên</Text>
            </View>
            <View style={{flex: 0.6}}>
              <Text>{fullNameReceive}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={{flex: 0.5}}>
              <Text style={{color: '#8D8C8D'}}>Địa chỉ</Text>
            </View>
            <View style={{flex: 0.6}}>
              <Text>{address}</Text>
            </View>
          </View>
        </View>
        {isVat == true ? (
          <View>
            <View
              style={{
                width: widthPercentageToDP('100'),
                backgroundColor: '#F6F5F6',
                height: 8,
                alignSelf: 'center',
                marginTop: 20,
              }}
            />
            <View style={{paddingVertical: 20}}>
              <Text style={{fontWeight: '700'}}>
                Thông tin nhận hóa đơn VAT
              </Text>
              <View style={styles.textContainer}>
                <View style={{flex: 0.5}}>
                  <Text style={{color: '#8D8C8D'}}>Tên DN</Text>
                </View>
                <View style={{flex: 0.6}}>
                  <Text>{companyName}</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <View style={{flex: 0.5}}>
                  <Text style={{color: '#8D8C8D'}}>Mã số thuế</Text>
                </View>
                <View style={{flex: 0.6}}>
                  <Text>{address}</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <View style={{flex: 0.5}}>
                  <Text style={{color: '#8D8C8D'}}>Địa chỉ DN</Text>
                </View>
                <View style={{flex: 0.6}}>
                  <Text>{companyAddress}</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <View style={{flex: 0.5}}>
                  <Text style={{color: '#8D8C8D'}}>Email</Text>
                </View>
                <View style={{flex: 0.6}}>
                  <Text>{companyEmail}</Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  };
  // render thông tin người mua doanh nghiệp
  renderCompany = () => {
    const {
      companyName,
      companyTaxCode,
      companyAddress,
      companyBuyerName,
      companyBuyerRole,
      email,
      provinceName,
      districtName,
      phone,
    } = this.state;
    return (
      <View style={{paddingVertical: 10}}>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Tên doanh nghiệp</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{companyName}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Địa chỉ doanh nghiệp</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{companyAddress}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Người đại diện</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{companyBuyerName}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Chức vụ</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{companyBuyerRole}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Số điện thoại</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{phone}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Email</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{email}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Mã số thuế</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{companyTaxCode}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Tỉnh/Thành phố</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{provinceName}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Quận huyện/Thị xã</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{districtName}</Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const {
      numberSeat,
      chassisNumber,
      machineNumber,
      licenseNumber,
      loadCapacity,
      isChecked1,
      isChecked2,
      carTypename,
    } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Nav
            isInfo={false}
            title={'THÔNG TIN ĐĂNG KÝ BẢO HIỂM XE'}
            onPress={() => Actions.pop()}
          />
        </View>
        <ScrollView style={{flex: 1, marginTop: -30}}>
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
                  lineHeight: 18,
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
          {/* thông tin xe được bảo hiểm  */}
          <View style={{alignItems: 'center', backgroundColor: '#FFFFFF'}}>
            <View style={styles.titleContainerStyle}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  marginLeft: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  alignItems: 'center',
                }}
                onPress={() => this.setState({isShowB: !this.state.isShowB})}>
                <Text style={styles.titleStyle}>
                  A. Thông tin xe được bảo hiểm
                </Text>
                <FastImage
                  source={
                    this.state.isShowB == false
                      ? require('../../icons/iconAgent/ic_triangle_down.png')
                      : require('../../icons/iconAgent/ic_triangle_up.png')
                  }
                  style={{width: 10, height: 10}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
            {this.state.isShowB == true ? (
              <View
                style={{
                  width: widthPercentageToDP('85'),
                  backgroundColor: '#FFFFFF',
                }}>
                <View style={{paddingVertical: 10}}>
                  <View style={styles.textContainer}>
                    <View style={{flex: 0.5}}>
                      <Text style={{color: '#8D8C8D'}}>Mục đích</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text>{carTypename}</Text>
                    </View>
                  </View>
                  <View style={styles.textContainer}>
                    <View style={{flex: 0.5}}>
                      <Text style={{color: '#8D8C8D'}}>Biển số</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text>{licenseNumber}</Text>
                    </View>
                  </View>
                  <View style={styles.textContainer}>
                    <View style={{flex: 0.5}}>
                      <Text style={{color: '#8D8C8D'}}>Số khung</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text>{chassisNumber}</Text>
                    </View>
                  </View>
                  <View style={styles.textContainer}>
                    <View style={{flex: 0.5}}>
                      <Text style={{color: '#8D8C8D'}}>Số máy</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text>{machineNumber}</Text>
                    </View>
                  </View>
                  <View style={styles.textContainer}>
                    <View style={{flex: 0.5}}>
                      <Text style={{color: '#8D8C8D'}}>Trọng tải</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text>{loadCapacity} tấn</Text>
                    </View>
                  </View>
                  <View style={styles.textContainer}>
                    <View style={{flex: 0.5}}>
                      <Text style={{color: '#8D8C8D'}}>Chỗ ngồi</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text>{numberSeat} chỗ</Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
          {/* thông tin người mua bảo hiểm  */}
          <View style={{alignItems: 'center', backgroundColor: '#FFFFFF'}}>
            <View style={styles.titleContainerStyle}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  marginLeft: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  alignItems: 'center',
                }}
                onPress={() => this.setState({isShowA: !this.state.isShowA})}>
                <Text style={styles.titleStyle}>
                  B. Thông tin bên mua bảo hiểm
                </Text>
                <FastImage
                  source={
                    this.state.isShowA == false
                      ? require('../../icons/iconAgent/ic_triangle_down.png')
                      : require('../../icons/iconAgent/ic_triangle_up.png')
                  }
                  style={{width: 10, height: 10}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
            {this.state.isShowA == true ? (
              <View
                style={{
                  width: widthPercentageToDP('85'),
                  backgroundColor: '#FFFFFF',
                }}>
                {this.renderPersonal()}
              </View>
            ) : null}
          </View>
          {/* thông tin thanh toán  */}
          <View style={{alignItems: 'center', backgroundColor: '#FFFFFF'}}>
            <View style={styles.titleContainerStyle}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  marginLeft: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  alignItems: 'center',
                }}
                onPress={() => this.setState({isShowC: !this.state.isShowC})}>
                <Text style={styles.titleStyle}>C. Thông tin thanh toán</Text>
                <FastImage
                  source={
                    this.state.isShowC == false
                      ? require('../../icons/iconAgent/ic_triangle_down.png')
                      : require('../../icons/iconAgent/ic_triangle_up.png')
                  }
                  style={{width: 10, height: 10}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
            {this.state.isShowC == true ? (
              <View
                style={{
                  width: widthPercentageToDP('85'),
                  backgroundColor: '#FFFFFF',
                }}>
                {this.state.paymentInfo.map((item, index) => {
                  return (
                    <View style={{marginTop: 15}}>
                      <Text style={{color: '#414042', fontWeight: '700'}}>
                        Công ty bảo hiểm PTI
                      </Text>
                      <View style={styles.feeContainerStyle}>
                        <Text style={{flex: 0.8, color: '#8D8C8D'}}>
                          Bảo hiểm tai nạn lái xe, phụ xe và người ngồi trên xe
                          (10 triệu/người/vụ)
                        </Text>
                        <Text>{item.accident}đ</Text>
                      </View>
                      <View style={styles.feeContainerStyle}>
                        <Text style={{color: '#8D8C8D'}}>Tăng phí</Text>
                        <Text>{item.increseFee}đ</Text>
                      </View>
                      <FastImage
                        source={require('../../icons/iconAgent/ic_line_dotted.png')}
                        style={{width: '100%', height: 1, marginTop: 8}}
                      />
                      <View style={{marginTop: 10}}>
                        <View style={styles.feeContainerStyle}>
                          <Text style={{color: '#414042', fontWeight: '700'}}>
                            Tổng phí bảo hiểm
                          </Text>
                          <Text style={{fontWeight: '700'}}>
                            {item.insuranceFee}đ
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '100%',
                            height: 2,
                            backgroundColor: '#D9D9D9',
                            marginTop: 12,
                          }}
                        />
                        <View style={styles.feeContainerStyle}>
                          <Text style={{color: Color, fontWeight: '700'}}>
                            THANH TOÁN
                          </Text>
                          <Text style={{color: Color, fontWeight: '700'}}>
                            {item.total}đ
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : null}
          </View>
          <View style={{alignItems: 'center', backgroundColor: '#FFFFFF'}} />
          <View
            style={{
              flex: 1,
              paddingHorizontal: 24,
              width: widthPercentageToDP('95'),
            }}>
            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.setState({isChecked1: !isChecked1})}>
                {
                  this.state.isChecked1 == true
                    ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                    : <IconBoxSvg width={20} height={20} color={NewColor} />
                }
              </TouchableOpacity>
              <Text style={{marginLeft: 8}}>
                Tôi xác nhận các thông tin trên là đúng
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <TouchableOpacity
                onPress={() => this.setState({isChecked2: !isChecked2})}>
                {
                  this.state.isChecked2 == true
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
            style={{
              backgroundColor:
                this.state.isDisabled == false ? '#D9D9D9' : Color,
            }}
            label={'THANH TOÁN'}
            //disabled={this.state.isDisabled}
            marginTop={15}
            onPress={() => Actions.Pay()}
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
  titleContainerStyle: {
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
  },
  titleStyle: {
    lineHeight: 19,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  feeContainerStyle: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
});

import {connect} from 'react-redux';
const mapStateToProps = state => {
  return {
    carInfoTnds: state.tndsBuy.carInfoTnds,
    customerInfoTnds: state.tndsBuy.customerInfoTnds,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccidentConfirmInfomation);
