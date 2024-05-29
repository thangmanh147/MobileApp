import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
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
import {renderVND} from '../../components/Functions';
import {Color, subColor, URL, NewColor} from '../../config/System';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';

class CarInsuranceRegisterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'button',
      isShowA: false,
      isShowB: false,
      isShowC: false,
      isShowD: false,
      isShowE: false,
      isDisabled: true,
      isChecked1: false,
      isChecked2: false,

      purposeId: '',
      purpose_name: '',
      purposeCode: '',
      carTypeId: '',
      carTypeCode: '',
      carBranchId: '',
      carModelId: '',
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

      buyerType: '',
      companyName: '',
      companyTaxCode: '',
      companyAddress: '',
      companyBuyerName: '',
      companyBuyerRole: '',
      fullName: '',
      birthday: '',
      gender: '',
      cardId: '',
      phone: '',
      email: '',
      provinceName: '',
      districtName: '',
      address: '',

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
      packages: [],
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
  createContract = () => {
    const {
      purposeId,
      purposeCode,
      carTypeId,
      carTypeCode,
      carBranchId,
      carModelId,
      manufactureYear,
      numberSeat,
      loadCapacity,
      licenseNumber,
      licenseStatus,
      chassisNumber,
      machineNumber,
      carValue,
      insuredValue,
      changePremiumType,
      changePremiumReason,
      changePremiumPercentage,
      changePremiumValue,
      imageUrl1,
      imageUrl2,
      imageUrl3,
      imageUrl4,
      imageUrl5,
      imageUrlNewCar,
      companyTaxCode,
      companyAddress,
      companyName,
      companyBuyerName,
      companyBuyerRole,
      address,
      fullName,
      birthday,
      gender,
      cardId,
      phone,
      email,
      provinceName,
      districtName,
      buyerType,
      behindExtraSeatImg,
      extraSeatImg,
      driverSeatImg,
      behindDriverSeatImg,
      registrationStampImg,
      packages,
    } = this.state;
    console.log(
      purposeId,
      purposeCode,
      carTypeId,
      carTypeCode,
      carBranchId,
      carModelId,
      manufactureYear,
      numberSeat,
      loadCapacity,
      licenseNumber,
      licenseStatus,
      chassisNumber,
      machineNumber,
      carValue,
      insuredValue,
      imageUrl1,
      imageUrl2,
      imageUrl3,
      imageUrl4,
      imageUrl5,
      imageUrlNewCar,
      companyTaxCode,
      companyAddress,
      companyName,
      companyBuyerName,
      companyBuyerRole,
      address,
      fullName,
      birthday,
      gender,
      cardId,
      phone,
      email,
      provinceName,
      districtName,
      buyerType,
      behindExtraSeatImg,
      extraSeatImg,
      driverSeatImg,
      behindDriverSeatImg,
      registrationStampImg,
      packages,
    );
    let url = `${URL}/api/contract/v1/car-contracts`;
    let body = {
      channelId: '23039db5-072d-49c0-8e4b-2a98528cb3bc',
      channelNumber: 'channelNumber',
      objectIdd: '23039db5-072d-49c0-8e4b-2a98528cb3bc',
      objectNumber: 'objectNumber',
      objectName: 'objectName',
      organizationId: '23039db5-072d-49c0-8e4b-2a98528cb3bc',
      organizationNumber: 'organizationNumber',
      organizationName: 'organizationName',
      salerId: '23039db5-072d-49c0-8e4b-2a98528cb3bc',
      salerName: 'salerName',
      contractId: 0,
      purposeId: purposeId,
      purposeCode: purposeCode,
      carTypeId: carTypeId,
      carTypeCode: carTypeCode,
      carBranchId: carBranchId,
      carModelId: carModelId,
      manufactureYear: manufactureYear,
      numberSeat: numberSeat,
      loadCapacity: loadCapacity,
      licenseNumber: licenseNumber,
      licenseStatus: 1,
      chassisNumber: chassisNumber,
      machineNumber: machineNumber,
      declarationPrice: carValue,
      insuredValue: insuredValue,
      changePremiumType: 'Tăng',
      changePremiumReason: 'Lý do đây',
      changePremiumPercentage: 0.2,
      changePremiumValue: 200000000,
      imageUrl1: behindExtraSeatImg,
      imageUrl2: extraSeatImg,
      imageUrl3: driverSeatImg,
      imageUrl4: behindDriverSeatImg,
      imageUrl5: registrationStampImg,
      imageUrlNewCar:
        'https://kenh14cdn.com/thumb_w/660/2020/6/5/006mrmprly1gdx6exf3lyj30u01rcasm-15913263980501789002707-crop-15913264120321997228444.jpg',
      packages: packages,
      buyerType: buyerType,
      companyTaxCode: companyTaxCode,
      companyAddress: companyAddress,
      companyName: companyName,
      companyBuyerName: companyBuyerName,
      companyBuyerRole: companyBuyerRole,
      address: address,
      fullName: fullName,
      birthday: birthday,
      gender: gender,
      cardId: cardId,
      phone: phone,
      email: email,
      provinceName: provinceName,
      districtName: districtName,
    };
    new Store().getSession(Const.TOKEN).then(token => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI1ODQxMTIsImlhdCI6OTkwMjU1NTMxMiwiYXV0aF90aW1lIjoxNjAyNTU1MzEwLCJqdGkiOiIxNDBiNDQyMC03MTUyLTRkZDAtYjQwNy0wYTNlMTE0MzAyMTUiLCJpc3MiOiJodHRwczovL2F1dGgwZGV2Lmluc28udm4vYXV0aC9yZWFsbXMvaW5zby1odWIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzNmZWI2NmMtY2M3Ny00ZDVhLWE2OGMtZDY3OGNjYWI3NDAyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicG9ydGFsIiwibm9uY2UiOiJkYmJmOWZlOC03ODI1LTQ0MjMtOTVhZC1iMGE4Y2ZjYmZjODMiLCJzZXNzaW9uX3N0YXRlIjoiZTIyODRmNGMtZGJlYy00Y2UxLWI3YTctZDFjYWMyNDQ1NDI5IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJwb3J0YWwuY2FwZG9uLnZuIiwiKiIsInZwYi5jYXBkb24udm4iLCJodWJkZXYuaW5zby52biJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiU1lTLUFETUlOIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIG9yZ2FuaXphdGlvbnMgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiaW5zby1hZG1pbiIsImNoYW5uZWxJZCI6IjVmMmU2ZTFkNzVhNzhmMDA0Y2U4OWY4NiJ9.r-YB7hg7lTN8YUuL1ASt_9UaMLCfkVo63374qcce2LM`,
        },
        body: JSON.stringify(body),
      })
        .then(res => {
          console.log(res);
          if (res?.status == 200) {
            const array = {
              orderPrice: res?.data?.fee == null ? 100000 : res?.data?.fee,
              orderDescription: `Thanh toan bao hiem o to`,
              buyer: {
                fullName: buyerType == 1 ? fullName : companyBuyerName,
                email: email,
                phone: phone,
                address: buyerType == 1 ? address : companyAddress,
              },
            };
            this.props.saveOrderInfomation(array);
            Actions.Pay();
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  };
  // lấy thông tin từ redux
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    // thông tin xe
    if (nextProps.carInfo && nextProps.carInfo !== prevState.carInfo) {
      update.purposeId = nextProps.carInfo.purposeId;
      update.purposeCode = nextProps.carInfo.purposeCode;
      update.purpose_name = nextProps.carInfo.purposeName;
      update.carTypeName = nextProps.carInfo.carTypeName;
      update.carBrandName = nextProps.carInfo.carBrandName;
      update.carModelName = nextProps.carInfo.carModelName;
      update.numberSeat = nextProps.carInfo.numberSeat;
      update.manufactureYear = nextProps.carInfo.manufactureYear;
      update.chassisNumber = nextProps.carInfo.chassisNumber;
      update.machineNumber = nextProps.carInfo.machineNumber;
      update.licenseNumber = nextProps.carInfo.licenseNumber;
      update.carValue = nextProps.carInfo.declarationPrice;
      update.loadCapacity = nextProps.carInfo.loadCapacity;
      update.insuredValue = nextProps.carInfo.insuredValue;
    }
    // thông tin người mua
    if (
      nextProps.carInsuranceBuyerInfo &&
      nextProps.carInsuranceBuyerInfo !== prevState.carInsuranceBuyerInfo
    ) {
      update.buyerType = nextProps.carInsuranceBuyerInfo.buyerType;
      update.companyName = nextProps.carInsuranceBuyerInfo.companyName;
      update.companyTaxCode = nextProps.carInsuranceBuyerInfo.companyTaxCode;
      update.companyAddress = nextProps.carInsuranceBuyerInfo.companyAddress;
      update.companyBuyerName =
        nextProps.carInsuranceBuyerInfo.companyBuyerName;
      update.companyBuyerRole =
        nextProps.carInsuranceBuyerInfo.companyBuyerRole;
      update.fullName = nextProps.carInsuranceBuyerInfo.fullName;
      update.birthday = nextProps.carInsuranceBuyerInfo.birthday;
      update.gender = nextProps.carInsuranceBuyerInfo.gender;
      update.cardId = nextProps.carInsuranceBuyerInfo.cardId;
      update.phone = nextProps.carInsuranceBuyerInfo.phone;
      update.email = nextProps.carInsuranceBuyerInfo.email;
      update.provinceName = nextProps.carInsuranceBuyerInfo.provinceName;
      update.districtName = nextProps.carInsuranceBuyerInfo.districtName;
      update.address = nextProps.carInsuranceBuyerInfo.address;
    }
    // list ảnh
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
    // ảnh giấy đăng kiểm
    if (
      nextProps.imageCarCertificate &&
      nextProps.imageCarCertificate !== prevState.imageCarCertificate
    ) {
      update.carCertificateImg = nextProps.imageCarCertificate;
    }
    if (
      nextProps.listPackages &&
      nextProps.listPackages !== prevState.listPackages
    ) {
      update.packages = nextProps.listPackages;
    }
    // ảnh giấy đăng ký xe
    if (
      nextProps.imageCarRegistrationCertificate &&
      nextProps.imageCarRegistrationCertificate !==
        prevState.imageCarRegistrationCertificate
    ) {
      update.carRegistrationCertificateImg =
        nextProps.imageCarRegistrationCertificate;
    }
    return update;
  }
  //   handleCheck = item => {
  //     switch (item) {
  //       case '1':
  //         this.setState({isChecked1: !this.state.isChecked1});
  //       case '2':
  //         this.setState({isChecked2: !this.state.isChecked2});
  //       default:
  //         return;
  //     }
  //   };

  // render thông tin người mua cá nhân
  renderPersonal = () => {
    const {fullName, phone, provinceName, districtName, address} = this.state;
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
            <Text style={{color: '#8D8C8D'}}>Số điện thoại</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{phone}</Text>
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
        <View style={styles.textContainer}>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#8D8C8D'}}>Địa chỉ</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text>{address}</Text>
          </View>
        </View>
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
  // render thong tin xe
  renderCarInfomation = () => {
    const {
      carTypeName,
      carBrandName,
      carModelName,
      numberSeat,
      manufactureYear,
      chassisNumber,
      machineNumber,
      carValue,
      loadCapacity,
    } = this.state;
    return (
      <View
        style={{
          width: widthPercentageToDP('85'),
          backgroundColor: '#FFFFFF',
        }}>
        <View style={{paddingVertical: 10}}>
          <View style={styles.textContainer}>
            <View style={{flex: 0.5}}>
              <Text style={{color: '#8D8C8D'}}>Loại xe</Text>
            </View>
            <View style={{flex: 0.6}}>
              <Text>{carTypeName}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={{flex: 0.5}}>
              <Text style={{color: '#8D8C8D'}}>Hãng xe</Text>
            </View>
            <View style={{flex: 0.6}}>
              <Text>{carBrandName}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={{flex: 0.5}}>
              <Text style={{color: '#8D8C8D'}}>Dòng xe</Text>
            </View>
            <View style={{flex: 0.6}}>
              <Text>{carModelName}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={{flex: 0.5}}>
              <Text style={{color: '#8D8C8D'}}>Chỗ ngồi</Text>
            </View>
            <View style={{flex: 0.6}}>
              <Text>{numberSeat}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={{flex: 0.5}}>
              <Text style={{color: '#8D8C8D'}}>Năm sản xuất</Text>
            </View>
            <View style={{flex: 0.6}}>
              <Text>{manufactureYear}</Text>
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
              <Text>{loadCapacity}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={{flex: 0.5}}>
              <Text style={{color: '#8D8C8D'}}>Giá trị xe</Text>
            </View>
            <View style={{flex: 0.6}}>
              <Text>{renderVND(carValue)}đ</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const {
      carValue,
      insuredValue,
      buyerType,
      isChecked1,
      isChecked2,
      behindExtraSeatImg,
      extraSeatImg,
      driverSeatImg,
      behindDriverSeatImg,
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
                Cảm ơn bạn đã đăng ký gói bảo hiểm của chúng tôi, khi bạn gặp
                bất cứ vấn đề gì của hợp đồng hay cần khiếu nại bồi thường, hãy
                liên hệ với chúng tôi ngay theo số Hotline:{' '}
                {<Text style={{color: Color}}>1900 232425</Text>}
              </Text>
            </View>
          </View>
          {/* form thông tin người mua bảo hiểm  */}
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
                <Text style={styles.titleStyle}>A. Người mua bảo hiểm</Text>
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
                {buyerType == 1 ? this.renderPersonal() : this.renderCompany()}
              </View>
            ) : null}
          </View>
          {/* form thông tin xe  */}
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
                <Text style={styles.titleStyle}>B. Thông tin xe</Text>
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
            {this.state.isShowB == true ? this.renderCarInfomation() : null}
          </View>
          {/* form số tiền bảo hiểm  */}
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
                <Text style={styles.titleStyle}>C. Mua bảo hiểm cho ô tô</Text>
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
                <View style={{paddingVertical: 10}}>
                  <View
                    style={{
                      paddingVertical: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 0,
                    }}>
                    <Text style={{flex: 0.7, color: '#8D8C8D'}}>
                      Giá trị xe tạm tính
                    </Text>
                    <Text>{renderVND(carValue)}đ</Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 0,
                    }}>
                    <Text style={{flex: 0.7, color: '#8D8C8D'}}>
                      Số tiền bảo hiểm
                    </Text>
                    <Text>{renderVND(insuredValue)}đ</Text>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
          {/* form thông tin gói và phí bh  */}
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
                onPress={() => this.setState({isShowD: !this.state.isShowD})}>
                <Text style={styles.titleStyle}>
                  D. Thông tin gói và phí bảo hiểm
                </Text>
                <FastImage
                  source={
                    this.state.isShowD == false
                      ? require('../../icons/iconAgent/ic_triangle_down.png')
                      : require('../../icons/iconAgent/ic_triangle_up.png')
                  }
                  style={{width: 10, height: 10}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
            {this.state.isShowD == true ? (
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
                        <Text style={{flex: 0.7, color: '#8D8C8D'}}>
                          1. Bảo hiểm vật chất xe
                        </Text>
                        <Text>{item.vehicleMaterial}đ</Text>
                      </View>
                      <View style={styles.feeContainerStyle}>
                        <Text style={{flex: 0.8, color: '#8D8C8D'}}>
                          2. Bảo hiểm tai nạn lái xe, phụ xe và người ngồi trên
                          xe (10 triệu/người/vụ)
                        </Text>
                        <Text>{item.accident}đ</Text>
                      </View>
                      <View style={styles.feeContainerStyle}>
                        <Text style={{flex: 0.7, color: '#8D8C8D'}}>
                          3. Bảo hiểm trách nhiệm dân sự
                        </Text>
                        <Text>{item.TNDS}đ</Text>
                      </View>
                      <View style={{marginTop: 10, padding: 10}}>
                        <View style={styles.feeContainerStyle}>
                          <Text style={{color: '#8D8C8D'}}>Phí bảo hiểm</Text>
                          <Text>{item.insuranceFee}đ</Text>
                        </View>
                        <View style={styles.feeContainerStyle}>
                          <Text style={{color: '#8D8C8D'}}>Tăng phí</Text>
                          <Text>{item.increseFee}đ</Text>
                        </View>
                        <View style={styles.feeContainerStyle}>
                          <Text style={{color: '#8D8C8D'}}>Thuế VAT 10%</Text>
                          <Text>{item.VAT}đ</Text>
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
          {/* ds ảnh xe  */}
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
                onPress={() => this.setState({isShowE: !this.state.isShowE})}>
                <Text style={styles.titleStyle}>
                  E. Danh sách các điểm loại trừ
                </Text>
                <FastImage
                  source={
                    this.state.isShowE == false
                      ? require('../../icons/iconAgent/ic_triangle_down.png')
                      : require('../../icons/iconAgent/ic_triangle_up.png')
                  }
                  style={{width: 10, height: 10}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
            {this.state.isShowE == true ? (
              <View
                style={{
                  width: widthPercentageToDP('90'),
                  backgroundColor: '#FFFFFF',
                }}>
                <View style={{paddingVertical: 15}}>
                  <FastImage
                    source={{uri: behindExtraSeatImg}}
                    style={{
                      width: widthPercentageToDP('90'),
                      height: heightPercentageToDP('38'),
                      alignSelf: 'center',
                    }}
                    resizeMode={'contain'}
                  />
                  <Text style={{marginTop: 12}} />
                </View>
                <View style={{paddingVertical: 15}}>
                  <FastImage
                    source={{uri: extraSeatImg}}
                    style={{
                      width: widthPercentageToDP('90'),
                      height: heightPercentageToDP('38'),
                      alignSelf: 'center',
                    }}
                    resizeMode={'contain'}
                  />
                  <Text style={{marginTop: 12}} />
                </View>
                <View style={{paddingVertical: 15}}>
                  <FastImage
                    source={{uri: driverSeatImg}}
                    style={{
                      width: widthPercentageToDP('90'),
                      height: heightPercentageToDP('38'),
                      alignSelf: 'center',
                    }}
                    resizeMode={'contain'}
                  />
                  <Text style={{marginTop: 12}} />
                </View>
                <View style={{paddingVertical: 15}}>
                  <FastImage
                    source={{uri: behindDriverSeatImg}}
                    style={{
                      width: widthPercentageToDP('90'),
                      height: heightPercentageToDP('38'),
                      alignSelf: 'center',
                    }}
                    resizeMode={'contain'}
                  />
                  <Text style={{marginTop: 12}} />
                </View>
              </View>
            ) : null}
          </View>
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
                  this.state.isChecked1
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
            // color={'White'}
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
import {saveOrderInfomation} from '../../actions/buy';
import Store from '../../services/Store';
import Const from '../../services/Const';

const mapStateToProps = state => {
  return {
    carInfo: state.carBuy.carInfo,
    carInsuranceBuyerInfo: state.carBuy.carInsuranceBuyerInfo,
    listPackages: state.carBuy.listPackages,
    arrayCarImg: state.carBuy.arrayCarImg,
    imageCarCertificate: state.carBuy.imageCarCertificate,
    imageCarRegistrationCertificate:
      state.carBuy.imageCarRegistrationCertificate,
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
)(CarInsuranceRegisterInfo);
