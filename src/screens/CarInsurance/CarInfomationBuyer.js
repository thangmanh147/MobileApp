import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Alert,
  TextInput,
  Modal,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import Css from '../../config/Css';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import {screen, fontBold, Color, NewColor} from '../../config/System';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import InputSelect from '../../components/buy/InputSelect';
import ModalProvince from './components/ModalProvince';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';

const valueScaleWindowWidth = function(percent) {
  return (Dimensions.get('window').width / 100) * percent;
};

let HTTP = require('../../services/HTTP');
let {width, height} = Dimensions.get('window');

class CarInfomationBuyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusLicensePlate: 'Mua bảo hiểm cho cá nhân',
      genders: [
        {
          value: 'Nam',
        },
        {
          value: 'Nữ',
        },
      ],
      gender: null,
      errorBirthdayLength: false,
      errorBirthday: false,
      phone: '',
      cmnd: '',
      txtEmail: '',
      birthday: '',
      modalProvince: false,
      modalDistrict: false,
      listProvince: '',
      listDistrict: '',
      fullDataListProvince: '',
      fullDataListDistrict: '',
      province: '',
      provinceId: null,
      district: '',
      emptyProvince: false,
      emptyDistrict: false,

      isReceive: null,

      buyerType: 1,

      txtAddress: '',
      valueCheckBenifit: false,
      purpose: true,
      txtCompanyName: '',
      VAT: false,

      txtName: '',

      notInvalidName: false,
      notInvalidCmnd: false,
      notInvalidPhone: false,

      NotFirstHead0: false,
      more11Num: false,

      isChecked: false,

      currentDate: '',

      notInvalidCompanyName: false,
      emptyCompanyName: false,
      emptyPhone: false,

      NotFirstHead0Company: false,
      notInvalidPhoneCompany: false,
      more11NumCompany: false,

      notInvalidBeneficiaryUserName: false,
      emptyBeneficiaryUserName: false,
      emptyBeneficiaryCMND: false,
      emptyBeneficiaryUserPhone: false,
      emptyBeneficiary_bank_address: false,
      emptyBeneficiary_bank_address_real: false,
      beneficiary_bank_address: '',
      txtCodeFee: '',
      txtCompanyAddress: '',
      position: '',
      txtCompanyRepresent: '',
      txtPhoneCompany: '',
      invalidValenghtCMND: false,
      errorCompareDate: false,
      errorCompareDateBeneficiaryUser: false,
      emptyBirthDayBeneficiaryUser: false,
      duplicateMobilePTIPersonal: false,
      duplicateMobilePTIBeneficiaryUser: false,
      duplicateMobilePTICompany: false,
      beneficiary_bank_address_real: '',

      phoneReceive: '',
      addressReceive: '',
      fullNameReceive: '',
      provinceReceive: '',
      districtReceice: '',
      provinceReceiveId: null,

      errorCodeBuyerName: '',
      errorCodeBuyerGender: '',
      errorCodeBirthday: '',
      errorCodeBuyerPhone: '',
      errorCodeBuyerEmail: '',
      errorCodeIdentityNumber: '',
      errorCodeBuyerProvince: '',
      errorCodeBuyerDistrict: '',
      errorCodeBuyerAddress: '',

      errorCodeCompanyName: '',
      errorCodeTaxCode: '',
      errorCodeCompanyProvince: '',
      errorCodeCompanyDistrict: '',
      errorCodeCompanyAddress: '',
      errorCodeCompanyEmail: '',
      errorCodeCompanyRepresent: '',
      errorCodeCompanyPhone: '',
      errorCodeRepresntRole: '',

      errorCodeReceiverName: '',
      errorCodeReceiverPhone: '',
      errorCodeReceiverProvince: '',
      errorCodeReceiverDistrict: '',
      errorCodeReceiverAddress: '',
    };
  }
  componentDidMount() {
    this.getCurrentDate();
  }
  // lấy ngày hiện tại
  getCurrentDate = () => {
    const date = new Date();
    const parsedDate = moment(date, 'DD/MM/YYYY');
    const a = parsedDate.format('MM/DD/YYYY');
    this.setState({currentDate: a});
  };
  // render error message
  showErrorNotInvalid(item) {
    return (
      <View>
        <Text style={styles.txtErrorCode}>{item}</Text>
      </View>
    );
  }
  // nhập họ và tên
  setFullName(input) {
    this.setState({
      txtName: input,
    });
  }
  // nhập người đại diện
  setCompanyRepresent(input) {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (input.length > 0) {
      if (validateName.test(input) == false) {
        this.setState({
          notInvalidCompanyRepresent: false,
          emptyCompanyRepresent: false,
        });
      }
    } else {
      this.setState({
        notInvalidCompanyRepresent: false,
        emptyCompanyRepresent: false,
      });
    }
    this.setState({
      txtCompanyRepresent: input,
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
  // nhập chức vụ
  setPosition(input) {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (input.length > 0) {
      if (validateName.test(input) == false) {
        this.setState({
          notInvalidPosition: false,
          emptyPosition: false,
        });
      }
    } else {
      this.setState({
        notInvalidPosition: false,
        emptyPosition: false,
      });
    }
    this.setState({
      position: input,
    });
    return;
  }
  // render error message
  showErrorNotInvalid(item) {
    return (
      <View>
        <Text style={styles.textError}>{item}</Text>
      </View>
    );
  }
  // nhập ngày sinh
  changeTextInputBackDate = input => {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const str = input;

    if (input.length > 0 && this.state.emptyBirthDay) {
      this.setState({emptyBirthDay: false});
    }

    if (input.length < 2 && this.state.errorBirthdayDate) {
      this.setState({errorBirthdayDate: false});
    }

    if (input.length < 5 && this.state.errorBirthdayMonth) {
      this.setState({errorBirthdayMonth: false});
    }
    if (input.length < 10 && this.state.errorBirthdayYear) {
      this.setState({errorBirthdayYear: false});
    }

    if (input.length < 10 && this.state.errorCompareDate) {
      this.setState({errorCompareDate: false});
    }

    if (input.length === 2 && this.state.birthday.charAt(2) !== '/') {
      let a = str.slice(0, 2);
      this.setState({birthday: (input += '/')});
      if (parseInt(a) > 31 || parseInt(a) < 1) {
        this.setState({
          errorBirthdayDate: true,
        });
      } else {
        this.setState({
          errorBirthdayDate: false,
        });
      }
    } else if (input.length === 5 && this.state.birthday.charAt(5) !== '/') {
      let a = str.slice(3, 5);
      this.setState({birthday: (input += '/')});
      if (parseInt(a) > 12 || parseInt(a) < 1) {
        this.setState({
          errorBirthdayMonth: true,
        });
      } else {
        this.setState({
          errorBirthdayMonth: false,
        });
      }
    } else if (input.length === 10 && this.state.errorBirthdayYear) {
      let a = str.slice(6, 10);
      if (validateName.test(a) == false) {
        this.setState({errorBirthdayYear: false});
      }
    } else if (input.length === 10) {
      let d = new Date();
      let dateTodayRaw = moment(d).format('DD/MM/YYYY');
      let dateInput = moment(input, 'DD/MM/YYYY');
      let dateToday = moment(dateTodayRaw, 'DD/MM/YYYY');
      let compare = dateToday < dateInput;
      if (compare) {
        this.setState({
          errorCompareDate: true,
        });
      } else {
        this.setState({
          errorCompareDate: false,
        });
      }
    }
    this.setState({birthday: input});
  };
  // nhập email
  setEmail = input => {
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
  };
  // nhập địa chỉ
  setAddress = val => {
    this.setState({txtAddress: val});
  };
  // handle check box nhập thông tin như trên
  // check => fill thông tin vào địa chỉ nhận ấn chỉ bảo hiểm
  // uncheck => xóa thông tin địa chỉ nhận ấn chỉ bảo hiểm
  handleCheck = async () => {
    const {
      txtName,
      phone,
      txtAddress,
      province,
      district,
      txtCompanyAddress,
      txtCompanyRepresent,
      isChecked,
      buyerType,
    } = this.state;
    if (isChecked == false) {
      await this.setState({
        isChecked: !isChecked,
        fullNameReceive: buyerType == 1 ? txtName : txtCompanyRepresent,
        phoneReceive: phone,
        provinceReceive: province,
        districtReceice: district,
        addressReceive: buyerType == 1 ? txtAddress : txtCompanyAddress,
      });
    } else {
      await this.setState({
        isChecked: !isChecked,
        fullNameReceive: '',
        phoneReceive: '',
        provinceReceive: '',
        districtReceice: '',
        addressReceive: '',
      });
    }
  };
  // validate họ tên người mua
  validateBuyerName = () => {
    let validateName = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    // required
    if (this.state.txtName == '') {
      this.setState({errorCodeBuyerName: 'Bạn phải nhập Họ tên'});
      return false;
    }
    // check validate ký tự đặc biệt và chữ sô
    if (validateName.test(this.state.txtName)) {
      this.setState({errorCodeBuyerName: 'Tên người chỉ bao gồm kí tự chữ'});
      return false;
    } else {
      this.setState({errorCodeBuyerName: ''});
      return true;
    }
  };
  // validate giới tính
  validateGender = () => {
    // required
    if (this.state.gender == null) {
      this.setState({errorCodeBuyerGender: 'Bạn phải chọn Giới tính'});
      return false;
    } else {
      return true;
    }
  };
  // validate ngày sinh
  validateBirthDay = () => {
    const {birthday, currentDate} = this.state;
    const parsedDate = moment(birthday, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    //required
    if (birthday == '') {
      this.setState({errorCodeBirthday: 'Bạn phải nhập Ngày sinh'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(birthday) == false) {
      this.setState({errorCodeBirthday: 'Ngày sinh không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(birthday) == false) {
      this.setState({errorCodeBirthday: 'Ngày sinh không hợp lệ'});
      return false;
    }
    // check ngày sinh k được lớn hơn ngày hiện tại
    if (moment(str).isBefore(currentDate) == false) {
      this.setState({
        errorCodeBirthday: 'Ngày sinh không được lớn hơn ngày hiện tại',
      });
      return false;
    } else {
      this.setState({errorCodeBirthday: ''});
      return true;
    }
  };
  // validate cmnd/cccd
  validateIdentityNumber = () => {
    let validateIdentityNumber = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    //required
    if (this.state.cmnd == '') {
      this.setState({errorCodeIdentityNumber: 'Bạn phải nhập CMND/ Hộ chiếu'});
      return false;
    }
    // check ký tự đặc biệt
    if (validateIdentityNumber.test(this.state.cmnd)) {
      this.setState({
        errorCodeIdentityNumber: 'CMND/Hộ chiếu chỉ bao gồm số và chữ',
      });
      return false;
    } else {
      this.setState({errorCodeIdentityNumber: ''});
      return true;
    }
  };
  // validate số điện thoại người mua
  validatePhoneNumber = () => {
    let validateNumber = /[0-9]/;
    //required
    if (this.state.phone == '') {
      this.setState({errorCodeBuyerPhone: 'Bạn phải nhập Số điện thoại'});
      return false;
    }
    // check length = 10
    if (this.state.phone.length !== 10) {
      this.setState({errorCodeBuyerPhone: 'SĐT chỉ bao gồm 10 chữ số'});
      return false;
    }
    // check sđt chỉ bao gồm chữ số
    if (validateNumber.test(this.state.phone) == false) {
      this.setState({errorCodeBuyerPhone: 'SĐT chỉ bao gồm chữ số'});
      return false;
    }
    // check sđt băt đầu bằng số 0
    if (this.state.phone.slice(0, 1) !== '0') {
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
    // check nếu người mua là cá nhân => bắt validate form cá nhân
    if (this.state.buyerType == 1) {
      // buyerType = 1 ? cá nhân : doanh nghiệp
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
    } else {
      // check nếu người mua là doanh nghiệp => bắt validate form doanh nghiệp
      if (this.state.txtEmail == '') {
        this.setState({errorCodeCompanyEmail: 'Bạn phải nhập Email'});
        return false;
      }
      // check email có '@' hay không
      if (validateEmail.test(this.state.txtEmail) == false) {
        this.setState({errorCodeCompanyEmail: 'Email sai định dạng'});
        return false;
      }
      // check khoảng trắng
      if (validateEmail1.test(this.state.txtEmail) == true) {
        this.setState({errorCodeCompanyEmail: 'Email sai định dạng'});
        return false;
      } else {
        this.setState({errorCodeCompanyEmail: ''});
        return true;
      }
    }
  };
  // validate tỉnh/tp và quận/huyện
  validateProvinceAndDistrict = () => {
    const {province, district, buyerType} = this.state;
    // check nếu người mua là cá nhân => bắt validate form cá nhân
    if (buyerType == 1) {
      // required
      if (province == '') {
        this.setState({errorCodeBuyerProvince: 'Bạn phải chọn Tỉnh/Thành phố'});
        return false;
      }
      // required
      if (district == '') {
        this.setState({errorCodeBuyerDistrict: 'Bạn phải chọn Quận/Huyện'});
        return false;
      } else {
        return true;
      }
    } else {
      // check nếu người mua là doanh nghiệp => bắt validate form doanh nghiệp
      // required
      if (province == '') {
        this.setState({
          errorCodeCompanyProvince: 'Bạn phải chọn Tỉnh/Thành phố',
        });
        return false;
      }
      // required
      if (district == '') {
        this.setState({errorCodeCompanyDistrict: 'Bạn phải chọn Quận/Huyện'});
        return false;
      } else {
        return true;
      }
    }
  };
  // validate địa chỉ
  validateAddress = () => {
    // check nếu người mua là cá nhân => bắt validate form cá nhân
    if (this.state.buyerType == 1) {
      if (this.state.txtAddress == '') {
        this.setState({errorCodeBuyerAddress: 'Bạn phải nhập Địa chỉ'});
        return false;
      } else {
        this.setState({errorCodeBuyerAddress: ''});
        return true;
      }
    } else {
      // check nếu người mua là doanh nghiệp => bắt validate form doanh nghiệp
      if (this.state.txtCompanyAddress == '') {
        this.setState({errorCodeCompanyAddress: 'Bạn phải nhập Địa chỉ'});
        return false;
      } else {
        this.setState({errorCodeCompanyAddress: ''});
        return true;
      }
    }
  };
  // validate tên doanh nghiệp
  validateCompanyName = () => {
    if (this.state.txtCompanyName == '') {
      this.setState({errorCodeCompanyName: 'Bạn phải nhập Tên doanh nghiệp'});
      return false;
    } else {
      this.setState({errorCodeCompanyName: ''});
      return true;
    }
  };
  // validate mã số thuế
  validateTaxCode = () => {
    if (this.state.txtCodeFee == '') {
      this.setState({errorCodeTaxCode: 'Bạn phải nhập Mã số thuế'});
      return false;
    } else {
      this.setState({errorCodeTaxCode: ''});
      return true;
    }
  };
  // validate người đại diện
  validateRepresentName = () => {
    let validateName = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    // required
    if (this.state.txtCompanyRepresent == '') {
      this.setState({
        errorCodeCompanyRepresent: 'Bạn phải nhập Người đại diện',
      });
      return false;
    }
    // check tên người đại diện chỉ bao gồm ký tự chữ
    if (validateName.test(this.state.txtCompanyRepresent)) {
      this.setState({
        errorCodeCompanyRepresent: 'Tên người chỉ bao gồm kí tự chữ',
      });
      return false;
    } else {
      this.setState({errorCodeCompanyRepresent: ''});
      return true;
    }
  };
  // validate chức vụ
  validateRole = () => {
    if (this.state.position == '') {
      this.setState({errorCodeRepresntRole: 'Bạn phải nhập Chức vụ'});
      return false;
    }
  };
  // validate sđt người đại diện
  validateRepresentPhone = () => {
    let validateNumber = /[0-9]/;
    // requỉred
    if (this.state.phone == '') {
      this.setState({errorCodeCompanyPhone: 'Bạn phải nhập Số điện thoại'});
      return false;
    }
    // check length = 10
    if (this.state.phone.length !== 10) {
      this.setState({errorCodeCompanyPhone: 'SĐT chỉ bao gồm 10 chữ số'});
      return false;
    }
    // check sđt chỉ bao gồm chữ số
    if (validateNumber.test(this.state.phone) == false) {
      this.setState({errorCodeCompanyPhone: 'SĐT chỉ bao gồm chữ số'});
      return false;
    }
    // validate sđt bắt đầu bằng số 0
    if (this.state.phone.slice(0, 1) !== '0') {
      this.setState({errorCodeCompanyPhone: 'SĐT phải bắt đầu bằng số 0'});
      return false;
    } else {
      this.setState({errorCodeCompanyPhone: ''});
      return true;
    }
  };
  // validate họ tên người nhận ấn chỉ
  validateReceiverName = () => {
    let validateName = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    // required
    if (this.state.txtName == '') {
      this.setState({errorCodeBuyerName: 'Bạn phải nhập Họ tên'});
      return false;
    }
    // check tên chỉ bao gồm kí tự chữ
    if (validateName.test(this.state.txtName)) {
      this.setState({errorCodeBuyerName: 'Tên người chỉ bao gồm kí tự chữ'});
      return false;
    } else {
      this.setState({errorCodeBuyerName: ''});
      return true;
    }
  };
  // validate sđt
  validatePhoneNumber = () => {
    let validateNumber = /[0-9]/;
    if (this.state.phone == '') {
      this.setState({errorCodeBuyerPhone: 'Bạn phải nhập Số điện thoại'});
      return false;
    }
    // check length = 10
    if (this.state.phone.length !== 10) {
      this.setState({errorCodeBuyerPhone: 'SĐT chỉ bao gồm 10 chữ số'});
      return false;
    }
    // check sđt chỉ bao gồm chữ số
    if (validateNumber.test(this.state.phone) == false) {
      this.setState({errorCodeBuyerPhone: 'SĐT chỉ bao gồm chữ số'});
      return false;
    }
    // check sđt phải bắt đầu bằng số 0
    if (this.state.phone.slice(0, 1) !== '0') {
      this.setState({errorCodeBuyerPhone: 'SĐT phải bắt đầu bằng số 0'});
      return false;
    } else {
      this.setState({errorCodeBuyerPhone: ''});
      return true;
    }
  };
  // check lần lượt các hàm validate
  // return true => next
  next = () => {
    const {buyerType} = this.state;
    // check nếu người mua là cá nhân => bắt validate form cá nhân
    if (buyerType == 1) {
      if (this.validateBuyerName()) {
        if (this.validateGender()) {
          if (this.validateBirthDay()) {
            if (this.validatePhoneNumber()) {
              if (this.validateEmail()) {
                if (this.validateIdentityNumber()) {
                  if (this.validateProvinceAndDistrict()) {
                    if (this.validateAddress()) {
                      this.storeInfomation();
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      // check nếu người mua là doanh nghiệp => bắt validate form doanh nghiệp
      if (this.validateCompanyName()) {
        if (this.validateTaxCode()) {
          if (this.validateProvinceAndDistrict()) {
            if (this.validateAddress()) {
              if (this.validateEmail()) {
                if (this.validateRepresentName()) {
                  if (this.validateRole()) {
                    if (this.validatePhoneNumber()) {
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
  };
  // nhập cmnd/hộ chiếu
  onChangeNumberId(data) {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (
      (data.length < 6 || data.length > 6) &&
      this.state.invalidValenghtCMND
    ) {
      this.setState({invalidValenghtCMND: false});
    }
    if ((data.length > 6 || data.length == 0) && this.state.notInvalidCmnd) {
      this.setState({notInvalidCmnd: false});
    }
    if (validateName.test(data) == false) {
      this.setState({notInvalidCmnd: false});
    }
    this.setState({
      cmnd: data,
    });
    return;
  }
  // render form người mua cá nhân
  renderPersonal = () => {
    const {
      phone,
      cmnd,
      emptyPhone,
      txtEmail,
      province,
      district,
      txtAddress,
      txtName,
      errorCodeBuyerEmail,
      errorCodeBirthday,
      errorCodeBuyerAddress,
      errorCodeBuyerDistrict,
      errorCodeBuyerGender,
      errorCodeBuyerPhone,
      errorCodeBuyerProvince,
      errorCodeIdentityNumber,
      errorCodeBuyerName,
    } = this.state;
    return (
      <View>
        <View>
          <Input
            label="Họ và tên"
            onChangeText={txtFullname => this.setFullName(txtFullname)}
            value={txtName}
            autoUpperCase={true}
            onFocus={() => this.setState({errorCodeBuyerName: ''})}
            onBlur={() => this.validateBuyerName()}
            //pathImage={require('../../icons/collaborator/ic_write.png')}
            //erroCodeValidate={emptyName && txtName == '' ? true : false}
          />
          {errorCodeBuyerName !== ''
            ? this.showErrorNotInvalid(errorCodeBuyerName)
            : null}
        </View>
        <View style={{marginTop: 10}}>
          <View style={{marginTop: 15}}>
            <View>
              <Text style={{color: '#8D8C8D'}}>Giới tính</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({gender: 1, errorCodeBuyerGender: ''})
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  flex: 1,
                }}>
                <Image
                  style={{height: 15, width: 15}}
                  resizeMode={'contain'}
                  source={
                    this.state.gender == 1
                      ? require('../../icons/iconAgent/single_select_active.png')
                      : require('../../icons/iconAgent/single_select.png')
                  }
                />
                <Text style={{marginLeft: 8}}>Nam</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({gender: 2, errorCodeBuyerGender: ''})
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  flex: 1,
                }}>
                <Image
                  style={{height: 15, width: 15}}
                  resizeMode={'contain'}
                  source={
                    this.state.gender == 2
                      ? require('../../icons/iconAgent/single_select_active.png')
                      : require('../../icons/iconAgent/single_select.png')
                  }
                />
                <Text style={{marginLeft: 8}}>Nữ</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 12}}>
              {errorCodeBuyerGender !== ''
                ? this.showErrorNotInvalid(errorCodeBuyerGender)
                : null}
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '47%'}}>
            <Input
              onFocus={() => this.setState({errorCodeBirthday: ''})}
              keyboardType={'number-pad'}
              placeholder={'DD/MM/YYYY'}
              label="Ngày sinh"
              value={this.state.birthday}
              maxLength={10}
              onChangeText={text => {
                this.changeTextInputBackDate(text);
              }}
              onBlur={() => this.validateBirthDay()}
            />
            <View>
              {errorCodeBirthday !== ''
                ? this.showErrorNotInvalid(errorCodeBirthday)
                : null}
            </View>
          </View>
          <View style={{width: '47%'}}>
            <Input
              onFocus={() => this.setState({errorCodeBuyerPhone: ''})}
              maxLength={10}
              label="Số điện thoại"
              placeholder={'0123xxx'}
              onChangeText={phone => this.setState({phone: phone})}
              value={phone.replace(/\s+/g, '').trim()}
              keyboardType={'number-pad'}
              erroCodeValidate={emptyPhone && phone == '' ? true : false}
              onBlur={() => this.validatePhoneNumber()}
            />
            <View>
              {errorCodeBuyerPhone !== ''
                ? this.showErrorNotInvalid(errorCodeBuyerPhone)
                : null}
            </View>
          </View>
        </View>

        <View style={{marginTop: -10}}>
          <Input
            onFocus={() => this.setState({errorCodeBuyerEmail: ''})}
            label="Email"
            onChangeText={data => this.setEmail(data)}
            placeholder={'abc@gmail.com'}
            value={txtEmail.replace(/\s+/g, '').trim()}
            //erroCodeValidate={emptyEmail && txtEmail == '' ? true : false}
            onBlur={() => this.validateEmail()}
          />
          {errorCodeBuyerEmail !== ''
            ? this.showErrorNotInvalid(errorCodeBuyerEmail)
            : null}
        </View>
        <View
          style={{
            marginTop: -10,
          }}>
          <Input
            maxLength={20}
            onFocus={() => this.setState({errorCodeIdentityNumber: ''})}
            label="CMND/Hộ chiếu"
            onChangeText={cmnd => this.onChangeNumberId(cmnd)}
            value={cmnd.replace(/\s+/g, '').trim()}
            //erroCodeValidate={emptyCMND && cmnd == '' ? true : false}
            onBlur={() => this.validateIdentityNumber()}
          />
          {errorCodeIdentityNumber !== ''
            ? this.showErrorNotInvalid(errorCodeIdentityNumber)
            : null}
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

        <View style={{marginTop: -10}}>
          <Input
            onFocus={() => this.setState({errorCodeBuyerAddress: ''})}
            label="Địa chỉ"
            onChangeText={data => this.setAddress(data)}
            value={txtAddress}
            //erroCodeValidate={emptyAddress && txtAddress == '' ? true : false}
            onBlur={() => this.validateAddress()}
          />
          {errorCodeBuyerAddress !== ''
            ? this.showErrorNotInvalid(errorCodeBuyerAddress)
            : null}
        </View>
      </View>
    );
  };
  // render form người mua doanh nghiệp
  renderCompany = () => {
    const {
      txtCompanyRepresent,
      VAT,
      province,
      district,
      txtEmail,
      buyerType,
      errorCodeCompanyAddress,
      errorCodeCompanyDistrict,
      errorCodeCompanyEmail,
      errorCodeCompanyName,
      errorCodeCompanyPhone,
      errorCodeCompanyProvince,
      errorCodeCompanyRepresent,
      errorCodeTaxCode,
      errorCodeRepresntRole,
    } = this.state;
    return (
      <View>
        <View style={{marginTop: -10}}>
          <Input
            label="Tên doanh nghiệp"
            onChangeText={val => this.setCompanyName(val)}
            value={this.state.txtCompanyName}
            //autoUpperCase={true}
            //pathImage={require('../../icons/collaborator/ic_write.png')}
            //erroCodeValidate={emptyCompanyName && this.state.txtCompanyName == '' ? true : false}
            onFocus={() => this.setState({errorCodeCompanyName: ''})}
            onBlur={() => this.validateCompanyName()}
          />
          {errorCodeCompanyName !== ''
            ? this.showErrorNotInvalid(errorCodeCompanyName)
            : null}
        </View>
        <View style={{marginTop: -10}}>
          <Input
            label="Mã số thuế"
            // onFocus={() => this.submit()}
            onChangeText={val => this.setCodeFee(val)}
            value={this.state.txtCodeFee}
            //autoUpperCase={true}
            // onFocus={() => this.checkFocus()}
            //pathImage={require('../../icons/collaborator/ic_write.png')}
            onFocus={() => this.setState({errorCodeTaxCode: ''})}
            onBlur={() => this.validateTaxCode()}
          />
          {errorCodeTaxCode !== ''
            ? this.showErrorNotInvalid(errorCodeTaxCode)
            : null}
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
              openModal={() => this.openProvinceModal()}
              value={province}
              //erroCodeValidate={emptyProvince && province == '' ? true : false}
            />
            {errorCodeCompanyProvince !== ''
              ? this.showErrorNotInvalid(errorCodeCompanyProvince)
              : null}
          </View>
          <View style={{width: '47%'}}>
            <InputSelect
              label={'Quận/Huyện'}
              openModal={() => this.openDistrictModal()}
              value={district}
              //erroCodeValidate={emptyProvince && province == '' ? true : false}
            />
            {errorCodeCompanyDistrict !== ''
              ? this.showErrorNotInvalid(errorCodeCompanyDistrict)
              : null}
          </View>
        </View>
        <View style={{marginTop: -10}}>
          <Input
            label="Địa chỉ"
            // onFocus={() => this.submit()}
            onChangeText={val => this.setState({txtCompanyAddress: val})}
            value={this.state.txtCompanyAddress}
            //autoUpperCase={true}
            onFocus={() => this.setState({errorCodeCompanyAddress: ''})}
            //pathImage={require('../../icons/collaborator/ic_write.png')}
            //erroCodeValidate={emptyCompanyAddress && this.state.txtCompanyAddress == '' ? true : false}
            onBlur={() => this.validateAddress()}
          />
          {errorCodeCompanyAddress !== ''
            ? this.showErrorNotInvalid(errorCodeCompanyAddress)
            : null}
        </View>
        <View style={{marginTop: -10}}>
          <Input
            onFocus={() => this.setState({errorCodeCompanyEmail: ''})}
            label="Email nhận hóa đơn"
            onChangeText={data => this.setEmail(data)}
            value={txtEmail.replace(/\s+/g, '').trim()}
            //erroCodeValidate={emptyEmail && txtEmail == '' ? true : false}
            onBlur={() => this.validateEmail()}
          />
          {errorCodeCompanyEmail !== ''
            ? this.showErrorNotInvalid(errorCodeCompanyEmail)
            : null}
        </View>
        <View style={{marginTop: -10}}>
          <Input
            label="Người đại diện"
            onChangeText={val => this.setCompanyRepresent(val)}
            value={txtCompanyRepresent}
            //autoUpperCase={true}
            onFocus={() => this.setState({errorCodeCompanyRepresent: ''})}
            onBlur={() => this.validateRepresentName()}
          />
          {errorCodeCompanyRepresent !== ''
            ? this.showErrorNotInvalid(errorCodeCompanyRepresent)
            : null}
        </View>
        <View
          style={{
            marginTop: -5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '47%'}}>
            <Input
              label="Chức vụ"
              onFocus={() => this.setState({errorCodeRepresntRole: ''})}
              onChangeText={val => this.setPosition(val)}
              value={this.state.position}
              onBlur={() => this.validateRole()}
            />
            {errorCodeRepresntRole !== ''
              ? this.showErrorNotInvalid(errorCodeRepresntRole)
              : null}
          </View>
          <View style={{width: '47%'}}>
            <Input
              maxLength={10}
              label="Số điện thoại"
              onFocus={() => this.setState({errorCodeCompanyPhone: ''})}
              onChangeText={phone => this.setState({phone: phone})}
              value={this.state.phone.replace(/\s+/g, '').trim()}
              keyboardType={'number-pad'}
              onBlur={() => this.validateRepresentPhone()}
              //erroCodeValidate={emptyPhoneCompany && this.state.txtPhoneCompany == '' ? true : false}
            />
            {errorCodeCompanyPhone !== ''
              ? this.showErrorNotInvalid(errorCodeCompanyPhone)
              : null}
          </View>
        </View>
        {buyerType == 2 ? (
          <View style={{marginTop: 15}}>
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
          </View>
        ) : null}
      </View>
    );
  };
  // lưu thông tin vào redux
  storeInfomation = () => {
    const {
      txtCompanyName,
      txtCodeFee,
      buyerType,
      txtCompanyAddress,
      txtCompanyRepresent,
      position,
      txtName,
      birthday,
      gender,
      cmnd,
      phone,
      txtEmail,
      province,
      district,
      txtAddress,
    } = this.state;
    let array = {
      buyerType: buyerType,
      companyName: txtCompanyName,
      companyTaxCode: txtCodeFee,
      companyAddress: txtCompanyAddress,
      companyBuyerName: txtCompanyRepresent,
      companyBuyerRole: position,
      fullName: txtName,
      birthday: birthday,
      gender: gender,
      cardId: cmnd,
      phone: phone,
      email: txtEmail,
      provinceName: province,
      districtName: district,
      address: txtAddress,
    };
    this.props.saveCarInsuranceBuyerInfo(array);
    Actions.CarInfomation();
  };
  // chọn tỉnh/thành phố
  setProvince = data => {
    this.setIdProvince(data._name, data.id);
    this.setState({modalProvince: false});
  };
  setIdProvince = async data => {
    const {isReceive, buyerType} = this.state;
    // nếu chọn ở form địa chỉ nhận ấn chỉ => set vào field của form địa chỉ nhận ấn chỉ
    if (isReceive == true) {
      await this.setState({
        provinceReceive: data._name,
        provinceReceiveId: data.id,
        errorCodeReceiverProvince: '',
      });
    } else {
      // nếu chọn ở form người mua => set vào field của form người mua
      // người mua cá nhân
      if (buyerType == 1) {
        await this.setState({
          province: data._name,
          provinceId: data.id,
          errorCodeBuyerProvince: '',
        });
      } else {
        // người mua doanh nghiệp
        await this.setState({
          province: data._name,
          provinceId: data.id,
          errorCodeCompanyDistrict: '',
        });
      }
    }
    this.props.getDistrict(data.id);
  };
  // chọn quận/huyện
  setDistrict = data => {
    this.setIdDistrict(data._name, data.id);
    this.setState({modalDistrict: false});
  };
  setIdDistrict = data => {
    const {isReceive, buyerType} = this.state;
    // nếu chọn ở form địa chỉ nhận ấn chỉ => set vào field của form địa chỉ nhận ấn chỉ
    if (isReceive == true) {
      this.setState({
        districtReceice: data._name,
        errorCodeReceiverDistrict: '',
      });
    } else {
      // nếu chọn ở form người mua => set vào field của form người mua
      // người mua cá nhân
      if (buyerType == 1) {
        this.setState({
          district: data._name,
          errorCodeBuyerDistrict: '',
        });
      } else {
        // người mua doanh nghiệp
        this.setState({
          district: data._name,
          errorCodeCompanyDistrict: '',
        });
      }
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
  render() {
    const {
      modalProvince,
      modalDistrict,
      buyerType,
      fullNameReceive,
      phoneReceive,
      provinceReceive,
      districtReceice,
      addressReceive,
      errorCodeReceiverAddress,
      errorCodeReceiverDistrict,
      errorCodeReceiverName,
      errorCodeReceiverPhone,
      errorCodeReceiverProvince,
    } = this.state;
    return (
      <View style={[Css.container, {backgroundColor: '#FFFFFF'}]}>
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
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            width: widthPercentageToDP('100'),
            alignSelf: 'center',
          }}>
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
          <View>
            <Text style={{textAlign: 'center', color: Color}}>hoặc</Text>
          </View>
          {/* form điền thông tin người mua  */}
          <View
            style={{
              flex: 1,
              padding: 20,
              marginBottom: 40,
              backgroundColor: '#FFFFFF',
            }}>
            <Text>Điền thông tin:</Text>
            <View style={{marginTop: 15}}>
              <View>
                <Text style={{color: '#8D8C8D'}}>Mua bảo hiểm cho</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      buyerType: 1,
                      province: '',
                      district: '',
                      phone: '',
                      txtEmail: '',
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                    flex: 1,
                  }}>
                  <Image
                    style={{height: 15, width: 15}}
                    resizeMode={'contain'}
                    source={
                      buyerType == 1
                        ? require('../../icons/iconAgent/single_select_active.png')
                        : require('../../icons/iconAgent/single_select.png')
                    }
                  />
                  <Text style={{marginLeft: 8}}>Cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      buyerType: 2,
                      province: '',
                      district: '',
                      phone: '',
                      txtEmail: '',
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                    flex: 1,
                  }}>
                  <Image
                    style={{height: 15, width: 15}}
                    resizeMode={'contain'}
                    source={
                      buyerType == 2
                        ? require('../../icons/iconAgent/single_select_active.png')
                        : require('../../icons/iconAgent/single_select.png')
                    }
                  />
                  <Text style={{marginLeft: 8}}>Doanh nghiệp</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* buyerType = 1 ? cá nhân : doanh nghiệp  */}
            {buyerType == 1 ? this.renderPersonal() : this.renderCompany()}
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
              {/* form điền thông tin nhận ấn chỉ  */}
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
                    //onFocus={() => this.submit()}
                    onChangeText={text =>
                      this.setState({fullNameReceive: text})
                    }
                    value={fullNameReceive}
                    autoUpperCase={false}
                    onFocus={() => this.setState({errorCodeReceiverName: ''})}
                  />
                </View>
                {errorCodeReceiverName !== ''
                  ? this.showErrorNotInvalid(errorCodeReceiverName)
                  : null}

                <View>
                  <View style={{width: '100%'}}>
                    <Input
                      maxLength={10}
                      label="Số điện thoại"
                      //onFocus={() => this.submit()}
                      onChangeText={text => this.setState({phoneReceive: text})}
                      value={phoneReceive.replace(/\s+/g, '').trim()}
                      keyboardType={'number-pad'}
                      //erroCodeValidate={emptyBeneficiaryUserPhone && beneficiaryUserPhone == '' ? true : false}
                    />
                    {errorCodeReceiverPhone !== ''
                      ? this.showErrorNotInvalid(errorCodeReceiverPhone)
                      : null}
                  </View>
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
                    ? this.showErrorNotInvalid(errorCodeReceiverProvince)
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
                  onFocus={() => this.setState({errorCodeReceiverAddress: ''})}
                  label="Địa chỉ"
                  onChangeText={text => this.setState({addressReceive: text})}
                  value={addressReceive}
                  // erroCodeValidate={emptyAddress && txtAddress == '' ? true : false}
                />
                {errorCodeReceiverAddress !== ''
                  ? this.showErrorNotInvalid(errorCodeReceiverAddress)
                  : null}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <FooterButton>
          <Button label="Tiếp tục" marginTop={-5} onPress={() => this.next()} />
        </FooterButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formChoosing: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctCheck: {
    height: 15,
    width: 15,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Color,
  },
  ctChecked: {
    height: 18,
    width: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Color,
  },
  ctRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ic_dropdown: {
    height: 10,
    width: 10,
    position: 'absolute',
    right: 3,
    bottom: 23,
  },
  ctDate: {
    borderBottomColor: '#7c7c7c',
    borderBottomWidth: 0.5,
    width: (screen.width - 60) / 2,
  },
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
  },
  bg_choose: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#666666',
  },
  txtName: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 10,
  },
  txt_Ic_write: {
    position: 'absolute',
    // height: '14@vs',
    bottom: 15,
    // width: '14@s',
    right: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#7c7c7c',
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
import Input from './components/Input';
import {checkLeapYear, checkMonth, renderVND} from '../../components/Functions';
import SimpleToast from 'react-native-simple-toast';
import ModalCustom from '../../screens/CarInsurance/components/Modal';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import InputBeneficiaries from '../../screens/CarInsurance/components/InputBeneficiaries';
import TextField from 'react-native-material-textfield/src/components/field';

import {connect} from 'react-redux';
import {saveCarInsuranceBuyerInfo, getDistrict} from './actions/car_Buy';
import ModalDistrict from './components/ModalDistrict';

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    saveCarInsuranceBuyerInfo: body =>
      dispatch(saveCarInsuranceBuyerInfo(body)),
    getDistrict: id => dispatch(getDistrict(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarInfomationBuyer);
