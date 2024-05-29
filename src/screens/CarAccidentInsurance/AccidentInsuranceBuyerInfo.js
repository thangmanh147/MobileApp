import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import FooterButton from '../../components/FooterButton';
import {Color, NewColor} from '../../config/System';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';

const valueScaleWindowWidth = function(percent) {
  return (Dimensions.get('window').width / 100) * percent;
};

let HTTP = require('../../services/HTTP');
let {width, height} = Dimensions.get('window');

class AccidentInsuranceBuyerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      province: '',
      district: '',
      commune: '',
      txtFullname: '',
      txtPhone: '',
      txtEmail: '',
      txtAddress: '',

      loading: false,
      modalProvince: false,
      modalDistrict: false,
      modalCommune: false,
      listProvince: '',
      listDistrict: '',
      listCommune: '',
      fullDataListProvince: '',
      fullDataListDistrict: '',
      fullDataListCommune: '',
      textSearchList: '',
      onActive: 'personal',

      isReceive: null,
      provinceId: null,

      phoneReceive: '',
      addressReceive: '',
      fullNameReceive: '',
      provinceReceive: '',
      districtReceice: '',
      provinceReceiveId: null,
      VAT: null,

      txtCompanyName: '',
      txtCodeFee: '',
      txtCompanyAddress: '',
      txtCompanyEmail: '',

      isChecked: false,

      errorCodeBuyerName: '',
      errorCodeBuyerPhone: '',
      errorCodeBuyerEmail: '',
      errorCodeBuyerProvince: '',
      errorCodeBuyerDistrict: '',
      errorCodeBuyerAddress: '',

      errorCodeReceiverName: '',
      errorCodeReceiverProvince: '',
      errorCodeReceiverDistrict: '',
      errorCodeReceiverAddress: '',

      errorCodeCompanyName: '',
      errorCodeTaxCode: '',
      errorCodeCompanyAddress: '',
      errorCodeCompanyEmail: '',
    };
  }

  // componentDidMount() {
  //     this.assignName();
  // }
  //
  // assignName() {
  //     const { user } = this.props.profile;
  //     if (user && user.type == '1') {
  //         this.setState({
  //             txtFullname: user.fullname,
  //             txtPhone: user.mobile,
  //             txtEmail: user.email
  //         })
  //     }
  // }

  submit() {
    this.checkFocus('submit');
  }
  // nhập số điện thoại
  setPhone(value) {
    let input = value.replace(/\s+/g, '').trim();
    this.setState({txtPhone: input});
    return;
  }
  // nhập họ và tên
  setFullName(input) {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (input.length > 0) {
      if (validateName.test(input) == false) {
        this.setState({
          notValidFullname: false,
          emptyFullName: false,
        });
      }
    } else {
      this.setState({
        notValidFullname: false,
        emptyFullName: false,
      });
    }
    this.setState({
      txtFullname: input,
    });
    return;
  }
  // nhập email
  setEmail(input) {
    let validateEmail = /^([a-zA-Z0-9][a-zA-Z0-9_\-]*(([\.][a-zA-Z0-9_\-]*)*)[a-zA-Z0-9]@([a-zA-Z0-9][a-zA-Z0-9_\-]*[a-zA-Z0-9]\.)+([a-zA-Z0-9]{2,4}))$/;
    if (input.length == 0) {
      this.setState({notValidEmail: false});
    }
    if (input.length > 0) {
      this.setState({emptyEmail: false});
    }
    if (validateEmail.test(input) == true && this.state.notValidEmail) {
      this.setState({notValidEmail: false});
    }
    this.setState({
      txtEmail: input.replace(/\s+/g, '').trim(),
    });
    return;
  }
  // nhập email doanh nghiệp
  setComapnyEmail(input) {
    let validateEmail = /^([a-zA-Z0-9][a-zA-Z0-9_\-]*(([\.][a-zA-Z0-9_\-]*)*)[a-zA-Z0-9]@([a-zA-Z0-9][a-zA-Z0-9_\-]*[a-zA-Z0-9]\.)+([a-zA-Z0-9]{2,4}))$/;
    // if (input.length == 0) {
    //     this.setState({ notValidEmail: false });
    // }
    // if (input.length > 0) {
    //     this.setState({ emptyEmail: false });
    // }
    // if (validateEmail.test(input) == true && this.state.notValidEmail) {
    //     this.setState({ notValidEmail: false });
    // }
    this.setState({
      txtCompanyEmail: input.replace(/\s+/g, '').trim(),
    });
    return;
  }
  // nhập địa chỉ
  setAddress(input) {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (input.length > 0) {
      if (validateName.test(input) == false) {
        this.setState({
          notValidTxtAddressSpecial: false,
          emptyAddress: false,
        });
      }
    } else {
      this.setState({
        notValidTxtAddressSpecial: false,
        emptyAddress: false,
      });
    }
    this.setState({
      txtAddress: input,
    });
    return;
  }
  // nhập tên doanh nghiệp
  setCompanyName(input) {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (input.length > 0) {
      if (validateName.test(input) == false) {
        this.setState({
          notInvalidCompanyName: false,
          emptyCompanyName: false,
        });
      }
    } else {
      this.setState({
        notInvalidCompanyName: false,
        emptyCompanyName: false,
      });
    }
    this.setState({
      txtCompanyName: input,
    });
    return;
  }
  // nhập mã số thuế
  setCodeFee(input) {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (input.length > 0) {
      if (validateName.test(input) == false) {
        this.setState({
          notInvalidCodeFee: false,
          emptyCodeFee: false,
        });
      }
    } else {
      this.setState({
        notInvalidCodeFee: false,
        emptyCodeFee: false,
      });
    }
    this.setState({
      txtCodeFee: input,
    });
    return;
  }
  // handle check box nhập thông tin như trên
  // check => fill thông tin vào địa chỉ nhận ấn chỉ bảo hiểm
  // uncheck => xóa thông tin địa chỉ nhận ấn chỉ bảo hiểm
  handleCheck = async () => {
    const {txtFullname, txtAddress, province, district, isChecked} = this.state;
    if (isChecked == false) {
      await this.setState({
        isChecked: !isChecked,
        fullNameReceive: txtFullname,
        provinceReceive: province,
        districtReceice: district,
        addressReceive: txtAddress,
      });
    } else {
      await this.setState({
        isChecked: !isChecked,
        fullNameReceive: '',
        provinceReceive: '',
        districtReceice: '',
        addressReceive: '',
      });
    }
  };
  // validate họ tên người mua
  validateBuyerName = item => {
    let validateName = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    // required
    if (this.state.txtFullname == '') {
      this.setState({errorCodeBuyerName: 'Bạn phải nhập Họ tên'});
      return false;
    }
    // check validate ký tự đặc biệt và chữ sô
    if (validateName.test(this.state.txtFullname)) {
      this.setState({errorCodeBuyerName: 'Tên người chỉ bao gồm kí tự chữ'});
      return false;
    } else {
      this.setState({errorCodeBuyerName: ''});
      return true;
    }
  };
  // validate số điện thoại người mua
  validatePhoneNumber = () => {
    let validateNumber = /[0-9]/;
    //required
    if (this.state.txtPhone == '') {
      this.setState({errorCodeBuyerPhone: 'Bạn phải nhập Số điện thoại'});
      return false;
    }
    // check length = 10
    if (this.state.txtPhone.length !== 10) {
      this.setState({errorCodeBuyerPhone: 'SĐT chỉ bao gồm 10 chữ số'});
      return false;
    }
    // check sđt chỉ bao gồm chữ số
    if (validateNumber.test(this.state.txtPhone) == false) {
      this.setState({errorCodeBuyerPhone: 'SĐT chỉ bao gồm chữ số'});
      return false;
    }
    // check sđt băt đầu bằng số 0
    if (this.state.txtPhone.slice(0, 1) !== '0') {
      this.setState({errorCodeBuyerPhone: 'SĐT phải bắt đầu bằng số 0'});
      return false;
    } else {
      this.setState({errorCodeBuyerPhone: ''});
      return true;
    }
  };
  // validate email người mua
  validateEmail = () => {
    let validateEmail = /@+/;
    let validateEmail1 = /''+/;
    // required
    if (this.state.txtEmail == '') {
      this.setState({errorCodeBuyerEmail: 'Bạn phải nhập Email'});
      return false;
    }
    // check email có '@' hay không
    if (validateEmail.test(this.state.txtEmail) == false) {
      this.setState({errorCodeBuyerEmail: 'Email sai định dạng'});
      return false;
    }
    // check khoảng trắng
    if (validateEmail1.test(this.state.txtEmail) == true) {
      this.setState({errorCodeBuyerEmail: 'Email sai định dạng'});
      return false;
    } else {
      this.setState({errorCodeBuyerEmail: ''});
      return true;
    }
  };
  // validate required tỉnh/tp và quận/huyện
  validateProvinceAndDistrict = () => {
    const {province, district, buyerType} = this.state;
    if (province == '') {
      this.setState({errorCodeBuyerProvince: 'Bạn phải nhập Tỉnh/Thành phố'});
      return false;
    }
    if (district == '') {
      this.setState({errorCodeBuyerDistrict: 'Bạn phải nhập Quận/Huyện'});
      return false;
    } else {
      return true;
    }
  };
  // validate địa chỉ
  validateAddress = () => {
    // required
    if (this.state.txtAddress == '') {
      this.setState({errorCodeBuyerAddress: 'Bạn phải nhập Địa chỉ'});
      return false;
    } else {
      this.setState({errorCodeBuyerAddress: ''});
      return true;
    }
  };
  // validate họ và tên người nhận
  validateReceiverName = () => {
    let validateName = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (this.state.fullNameReceive == '') {
      this.setState({errorCodeReceiverName: 'Bạn phải nhập Họ tên'});
      return false;
    }
    if (validateName.test(this.state.fullNameReceive)) {
      this.setState({errorCodeReceiverName: 'Tên người chỉ bao gồm kí tự chữ'});
      return false;
    } else {
      this.setState({errorCodeReceiverName: ''});
      return true;
    }
  };
  // validate required tỉnh/tp và quận/huyện
  validateReceiverProvinceAndDistrict = () => {
    const {provinceReceive, districtReceice, buyerType} = this.state;
    if (provinceReceive == '') {
      this.setState({
        errorCodeReceiverProvince: 'Bạn phải nhập Tỉnh/Thành phố',
      });
      return false;
    }
    if (districtReceice == '') {
      this.setState({errorCodeReceiverDistrict: 'Bạn phải nhập Quận/Huyện'});
      return false;
    } else {
      return true;
    }
  };
  // validate địa chỉ người nhận ấn chỉ
  validateReceiverAddress = () => {
    if (this.state.addressReceive == '') {
      this.setState({errorCodeReceiverAddress: 'Bạn phải nhập Địa chỉ'});
      return false;
    } else {
      this.setState({errorCodeReceiverAddress: ''});
      return true;
    }
  };
  // validate tên doanh nghiệp
  validateCompanyName = () => {
    // check nếu chọn xuất hóa đơn Vat => bắt validate
    if (!this.state.VAT) {
      return true;
    }
    //required
    if (this.state.txtCompanyName == '') {
      this.setState({errorCodeCompanyName: 'Bạn phải nhập tên doanh nghiệp'});
      return false;
    } else {
      this.setState({errorCodeCompanyName: ''});
      return true;
    }
  };
  // validate mã số thuế
  validateTaxCode = () => {
    // check nếu chọn xuất hóa đơn Vat => bắt validate
    if (!this.state.VAT) {
      return true;
    }
    // required
    if (this.state.txtCodeFee == '') {
      this.setState({errorCodeTaxCode: 'Bạn phải nhập mã số thuế'});
      return false;
    } else {
      this.setState({errorCodeTaxCode: ''});
      return true;
    }
  };
  // validate địa chỉ doanh nghiệp
  validateCompanyAddress = () => {
    // check nếu chọn xuất hóa đơn Vat => bắt validate
    if (!this.state.VAT) {
      return true;
    }
    if (this.state.txtCompanyAddress == '') {
      this.setState({errorCodeCompanyAddress: 'Bạn phải nhập địa chỉ'});
      return false;
    } else {
      this.setState({errorCodeCompanyAddress: ''});
      return true;
    }
  };
  validateCompanyEmail = () => {
    // check nếu chọn xuất hóa đơn Vat => bắt validate
    if (!this.state.VAT) {
      return true;
    }
    let validateEmail = /@+/;
    let validateEmail1 = /''+/;
    // required
    if (this.state.txtCompanyEmail == '') {
      this.setState({errorCodeCompanyEmail: 'Bạn phải nhập Email'});
      return false;
    }
    // check email phải có '@'
    if (validateEmail.test(this.state.txtCompanyEmail) == false) {
      this.setState({errorCodeCompanyEmail: 'Email sai định dạng'});
      return false;
    }
    // check khoảng trắng
    if (validateEmail1.test(this.state.txtCompanyEmail) == true) {
      this.setState({errorCodeCompanyEmail: 'Email sai định dạng'});
      return false;
    } else {
      this.setState({errorCodeCompanyEmail: ''});
      return true;
    }
  };
  //  render form địa chỉ nhận ấn chỉ
  renderReceive = () => {
    const {
      fullNameReceive,
      provinceReceive,
      districtReceice,
      addressReceive,
      errorCodeReceiverAddress,
      errorCodeReceiverDistrict,
      errorCodeReceiverName,
      errorCodeReceiverProvince,
    } = this.state;
    return (
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
        <View>
          <Text style={{paddingVertical: 14}}>
            Địa chỉ nhận ấn chỉ bảo hiểm
          </Text>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => this.handleCheck()}>
            {
              this.state.isChecked
                ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                : <IconBoxSvg width={20} height={20} color={NewColor} />
            }
            <Text style={{marginLeft: 8}}>Thông tin như trên</Text>
          </TouchableOpacity>
          <View>
            <View style={{marginTop: -5}}>
              <Input
                label="Họ và tên"
                onFocus={() => this.setState({errorCodeReceiverName: ''})}
                onChangeText={text => this.setState({fullNameReceive: text})}
                value={fullNameReceive}
                autoUpperCase={false}
                onBlur={() => this.validateAddress()}
              />
              {errorCodeReceiverName !== ''
                ? this.showErrorNotInvalid(errorCodeReceiverName)
                : null}
            </View>
          </View>
          <View
            style={{
              marginTop: -5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '47%'}}>
              <InputSelect
                label={'Tỉnh/Thành phố'}
                openModal={() => this.openProvinceReceiveModal()}
                value={provinceReceive}
                //erroCodeValidate={emptyProvince && province == '' ? true : false}
              />
              {errorCodeReceiverProvince !== ''
                ? this.showErrorNotInvalid(errorCodeReceiverName)
                : null}
            </View>
            <View style={{width: '47%'}}>
              <InputSelect
                label={'Quận/Huyện'}
                openModal={() => this.openDistrictReceiveModal()}
                value={districtReceice}
                //erroCodeValidate={emptyProvince && province == '' ? true : false}
              />
              {errorCodeReceiverDistrict !== ''
                ? this.showErrorNotInvalid(errorCodeReceiverDistrict)
                : null}
            </View>
          </View>

          <View style={{marginTop: -10}}>
            <Input
              label="Địa chỉ"
              onChangeText={text => this.setState({addressReceive: text})}
              value={addressReceive}
              onBlur={() => this.validateReceiverAddress()}
              onFocus={() => this.setState({errorCodeReceiverAddress: ''})}
            />
            {errorCodeReceiverAddress !== ''
              ? this.showErrorNotInvalid(errorCodeReceiverAddress)
              : null}
          </View>
        </View>
      </View>
    );
  };
  // render form xuất hóa đơn VAT
  renderVATForm = () => {
    const {
      txtCompanyEmail,
      txtEmail,
      errorCodeCompanyAddress,
      errorCodeCompanyEmail,
      errorCodeCompanyName,
      errorCodeTaxCode,
    } = this.state;
    return (
      <View>
        <View style={{marginTop: -10}}>
          <Input
            label="Tên doanh nghiệp"
            onChangeText={val => this.setCompanyName(val)}
            value={this.state.txtCompanyName}
            //autoUpperCase={true}
            // onFocus={() => this.checkFocus()}
            //pathImage={require('../../icons/collaborator/ic_write.png')}
            onBlur={() => this.validateCompanyName()}
            onFocus={() => this.setState({errorCodeCompanyName: ''})}
          />
          {errorCodeCompanyName !== ''
            ? this.showErrorNotInvalid(errorCodeCompanyName)
            : null}
        </View>
        <View style={{marginTop: -10}}>
          <Input
            label="Mã số thuế"
            onChangeText={val => this.setCodeFee(val)}
            value={this.state.txtCodeFee}
            //autoUpperCase={true}
            onBlur={() => this.validateTaxCode()}
            onFocus={() => this.setState({errorCodeTaxCode: ''})}
          />
          {errorCodeTaxCode !== ''
            ? this.showErrorNotInvalid(errorCodeTaxCode)
            : null}
        </View>
        <View style={{marginTop: -10}}>
          <Input
            label="Địa chỉ"
            onChangeText={val => this.setState({txtCompanyAddress: val})}
            value={this.state.txtCompanyAddress}
            onBlur={() => this.validateCompanyAddress()}
            onFocus={() => this.setState({errorCodeCompanyAddress: ''})}
          />
          {errorCodeCompanyAddress !== ''
            ? this.showErrorNotInvalid(errorCodeCompanyAddress)
            : null}
        </View>
        <View style={{marginTop: -10}}>
          <Input
            label="Email nhận hóa đơn"
            onChangeText={data => this.setState({txtCompanyEmail: data})}
            value={txtCompanyEmail.replace(/\s+/g, '').trim()}
            onBlur={() => this.validateCompanyEmail()}
            onFocus={() => this.setState({errorCodeCompanyEmail: ''})}
          />
          {errorCodeCompanyEmail !== ''
            ? this.showErrorNotInvalid(errorCodeCompanyEmail)
            : null}
        </View>
      </View>
    );
  };
  // chọn tỉnh/tp
  setProvince = data => {
    this.setIdProvince(data._name, data.id);
    this.setState({modalProvince: false});
  };
  setIdProvince = async data => {
    const {isReceive} = this.state;
    if (isReceive == true) { // nếu chọn ở form địa chỉ nhận ấn chỉ => set vào field của form địa chỉ nhận ấn chỉ
      await this.setState({
        provinceReceive: data._name,
        provinceReceiveId: data.id,
        errorCodeReceiverProvince: '',
      });
    } else {    // nếu chọn ở form người mua => set vào field của form người mua
      await this.setState({
        province: data._name,
        provinceId: data.id,
        errorCodeBuyerProvince: '',
      });
    }
    this.props.getDistrict(data.id);
  };
  // chọn quận huyện
  setDistrict = data => {
    this.setIdDistrict(data._name, data.id);
    this.setState({modalDistrict: false});
  };
  setIdDistrict = data => {
    const {isReceive} = this.state;
    if (isReceive == true) {    // nếu chọn ở form địa chỉ nhận ấn chỉ => set vào field của form địa chỉ nhận ấn chỉ
      this.setState({
        districtReceice: data._name,
        errorCodeReceiverDistrict: '',
      });
    } else {    // nếu chọn ở form người mua => set vào field của form người mua
      this.setState({
        district: data._name,
        errorCodeBuyerDistrict: '',
      });
    }
  };
  // mở modal tỉnh/tp form người mua
  openProvinceModal = () => {
    this.setState({
      isReceive: false,
      modalProvince: true,
    });
  };
  // mở modal tỉnh/tp form địa chỉ nhận ấn chỉ
  openProvinceReceiveModal = () => {
    this.setState({
      isReceive: true,
      modalProvince: true,
    });
  };
  // mở modal quận/huyện form người mua
  openDistrictModal = () => {
    const {provinceId} = this.state;
    this.props.getDistrict(provinceId);
    this.setState({
      modalDistrict: true,
      isReceive: false,
    });
  };
  // mở modal quận/huyện form địa chỉ nhận ấn chỉ
  openDistrictReceiveModal = () => {
    const {provinceReceiveId} = this.state;
    this.props.getDistrict(provinceReceiveId);
    this.setState({
      modalDistrict: true,
      isReceive: true,
    });
  };
  // render error message
  showErrorNotInvalid(item) {
    return (
      <View>
        <Text style={styles.txtErrorCode}>{item}</Text>
      </View>
    );
  }
  // lưu thông tin vào redux
  storeInfomation = () => {
    const {
      txtFullname,
      txtPhone,
      txtEmail,
      province,
      district,
      txtAddress,
      fullNameReceive,
      provinceReceive,
      districtReceice,
      addressReceive,
      VAT,
      txtCompanyName,
      txtCodeFee,
      txtCompanyAddress,
      txtCompanyEmail,
    } = this.state;
    let array = {
      fullName: txtFullname,
      phone: txtPhone,
      email: txtEmail,
      province: province,
      district: district,
      address: txtAddress,
      fullNameReceive: fullNameReceive,
      provinceReceive: provinceReceive,
      districtReceice: districtReceice,
      addressReceive: addressReceive,
      isVat: VAT,
      companyName: txtCompanyName,
      taxCode: txtCodeFee,
      companyAddress: txtCompanyAddress,
      companyEmail: txtCompanyEmail,
    };
    this.props.saveCustomerInfoTnds(array);
    Actions.AccidentConfirmInfomation();
  };
  // check lần lượt các hàm validate
  // return true => next
  next = () => {
    if (this.validateBuyerName()) {
      if (this.validatePhoneNumber()) {
        if (this.validateEmail()) {
          if (this.validateProvinceAndDistrict()) {
            if (this.validateAddress()) {
              if (this.validateReceiverName()) {
                if (this.validateReceiverProvinceAndDistrict()) {
                  if (this.validateReceiverAddress()) {
                    if (this.validateCompanyName()) {
                      if (this.validateTaxCode()) {
                        if (this.validateCompanyAddress()) {
                          if (this.validateCompanyEmail()) {
                            this.storeInfomation();
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  render() {
    const {
      province,
      district,
      modalProvince,
      modalDistrict,
      txtAddress,
      txtFullname,
      txtPhone,
      txtEmail,
      VAT,
      errorCodeBuyerName,
      errorCodeBuyerAddress,
      errorCodeBuyerDistrict,
      errorCodeBuyerEmail,
      errorCodeBuyerPhone,
      errorCodeBuyerProvince,
    } = this.state;
    return (
      <View style={styles.container}>
        <Nav
          isInfo={false}
          show={true}
          title={'THÔNG TIN BÊN MUA BẢO HIỂM'}
          bottom={20}
          onPress={() => Actions.pop()}
        />
        <ModalProvince
          open={modalProvince}
          onClosed={() => this.setState({modalProvince: null})}
          setProvince={data => this.setIdProvince(data)}
          onOpened={() => this.setState({modalProvince: true})}
        />
        <ModalDistrict
          open={modalDistrict}
          onClosed={() => this.setState({modalDistrict: null})}
          setDistrict={data => this.setIdDistrict(data)}
          onOpened={() => this.setState({modalDistrict: true})}
        />
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <FastImage
              source={require('../../icons/iconAgent/ic_camera_flight.png')}
              style={{width: 64, height: 64}}
            />
            <View
              style={{
                flex: 1,
                width: widthPercentageToDP('100'),
                backgroundColor: '#FFFFFF',
                marginTop: -3,
              }}>
              <Text style={{marginTop: 4, textAlign: 'center'}}>
                Chụp CMND/CCCD để hoàn tất thông tin nhanh hơn
              </Text>

              <View
                style={{
                  width: width,
                  height: 8,
                  backgroundColor: '#F6F5F6',
                  marginTop: 20,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              backgroundColor: '#FFFFFF',
            }}>
            <View>
              <View>
                <View>
                  <Text style={{textAlign: 'center', color: Color}}>hoặc</Text>
                </View>
                <View style={{marginTop: 12}}>
                  <Text>Điền thông tin:</Text>
                </View>
                {/* form điền thông tin người mua  */}
                <Input
                  label="Họ và tên chủ xe"
                  onChangeText={txtFullname => this.setFullName(txtFullname)}
                  value={txtFullname}
                  autoUpperCase={true}
                  onFocus={() => this.setState({errorCodeBuyerName: ''})}
                  onBlur={() => this.validateBuyerName()}
                />
                {errorCodeBuyerName !== ''
                  ? this.showErrorNotInvalid(errorCodeBuyerName)
                  : null}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 0,
                }}>
                <View style={{width: '46%', marginTop: -10}}>
                  <Input
                    label="Điện thoại"
                    onChangeText={data => this.setPhone(data)}
                    value={txtPhone}
                    keyboardType={'number-pad'}
                    onFocus={() => this.setState({errorCodeBuyerPhone: ''})}
                    onBlur={() => this.validatePhoneNumber()}
                  />
                  {errorCodeBuyerPhone !== ''
                    ? this.showErrorNotInvalid(errorCodeBuyerPhone)
                    : null}
                </View>
                <View style={{width: '46%', marginTop: -10}}>
                  <Input
                    label="Email"
                    onChangeText={data => this.setEmail(data)}
                    value={txtEmail}
                    keyboardType={'email-address'}
                    keyboardEmail={true}
                    onFocus={() => this.setState({errorCodeBuyerEmail: ''})}
                    onBlur={() => this.validateEmail()}
                  />
                  {errorCodeBuyerEmail !== ''
                    ? this.showErrorNotInvalid(errorCodeBuyerEmail)
                    : null}
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  marginTop: -5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '47%'}}>
                  <InputSelect
                    label={'Tỉnh/Thành phố'}
                    openModal={() => this.openProvinceModal()}
                    value={province}
                    //erroCodeValidate={emptyProvince && province == '' ? true : false}
                  />
                  {errorCodeBuyerProvince !== ''
                    ? this.showErrorNotInvalid(errorCodeBuyerProvince)
                    : null}
                </View>
                <View style={{width: '47%'}}>
                  <InputSelect
                    label={'Quận/Huyện'}
                    openModal={() => this.openDistrictModal()}
                    value={district}
                    //erroCodeValidate={emptyProvince && province == '' ? true : false}
                  />
                  {errorCodeBuyerDistrict !== ''
                    ? this.showErrorNotInvalid(errorCodeBuyerDistrict)
                    : null}
                </View>
              </View>
              <View style={{marginTop: -5}}>
                <Input
                  label="Địa chỉ (số nhà, tên đường)"
                  onChangeText={data => this.setAddress(data)}
                  value={txtAddress}
                  onFocus={() => this.setState({errorCodeBuyerAddress: ''})}
                  onBlur={() => this.validateAddress()}
                />
                {errorCodeBuyerAddress !== ''
                  ? this.showErrorNotInvalid(errorCodeBuyerAddress)
                  : null}
              </View>
            </View>

            {/* form địa chỉ nhận ấn chỉ  */}
            {this.renderReceive()}

            <View
              style={{
                width: widthPercentageToDP('100'),
                backgroundColor: '#F6F5F6',
                height: 8,
                alignSelf: 'center',
                marginTop: 20,
              }}
            />
            <View style={{paddingVertical: 15}}>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => this.setState({VAT: !VAT})}>
                  {
                    VAT
                      ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                      : <IconBoxSvg width={20} height={20} color={NewColor} />
                  }
                  <Text style={{marginLeft: 8}}>Xuất hóa đơn VAT</Text>
                </TouchableOpacity>
              </View>
              {/* chọn xuất hóa đơn => render form điền thông tin  */}
              {VAT == true ? this.renderVATForm() : null}   
            </View>
          </View>
        </KeyboardAwareScrollView>
        <FooterButton>
          <Button
            label="GỬI THÔNG TIN"
            marginTop={-5}
            onPress={() => this.next()}
          />
        </FooterButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: 'white',
  },
  textError: {
    color: '#F97C7C',
  },
  txtErrorCode: {
    color: '#F97C7C',
    fontSize: 12,
  },
});

import {Actions} from 'react-native-router-flux';
import Nav from '../../components/Nav';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../CarInsurance/components/Input';
import SimpleToast from 'react-native-simple-toast';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import FastImage from 'react-native-fast-image';
import InputSelect from '../../components/buy/InputSelect';
import {connect} from 'react-redux';
import {getDistrict} from '../CarInsurance/actions/car_Buy';
import {saveCustomerInfoTnds} from '../TNDS/actions/tnds_buy';
import Button from '../../components/buy/Button';

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    getDistrict: id => dispatch(getDistrict(id)),
    saveCustomerInfoTnds: body => dispatch(saveCustomerInfoTnds(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccidentInsuranceBuyerInfo);
