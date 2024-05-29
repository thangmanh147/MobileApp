import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import {
  ERROR_ADDRESS_REQUIRED,
  ERROR_BIRTHDAY_REQUIRED,
  ERROR_DISTRICT_REQUIRED,
  ERROR_EMAIL_FORMAT,
  ERROR_EMAIL_REQUIRED,
  ERROR_IDENTITY_FORMAT,
  ERROR_IDENTITY_REQUIRED,
  ERROR_NAME_REQUIRED,
  ERROR_PHONE_FORMAT,
  ERROR_PHONE_REQUIRED,
  ERROR_PROVINCE_REQUIRED,
  ERROR_BIRTHDAY_FORMAT,
  ERROR_COMPANY_TAXCODE_REQUIRED,
  ERROR_COMPANY_NAME_REQUIRED,
  ERROR_NAME_FORMAT,
} from '../../config/ErrorMessage';
import NavWithImage from '../../components/NavWithImage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import Input from '../CarInsurance/components/Input';
import InputSelect from '../../components/buy/InputSelect';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../components/buy/Button';
import FooterButton from '../../components/FooterButton';
import FastImage from 'react-native-fast-image';
import {Color, NewColor} from '../../config/System';
import {Actions} from 'react-native-router-flux';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import {connect} from 'react-redux';
import {getDistrict} from '../CarInsurance/actions/car_Buy';
import ModalBuyerType from './components/ModalBuyerType';
import {URL} from '../../config/System';
import {checkMonth, checkLeapYear, isPhone} from '../../components/Functions';
import moment from 'moment';
import {saveOrderInfomation} from '../../actions/buy';
import {renderVND} from '../../components/Functions';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {handleTextInput} from 'react-native-formik';
import {validateIdentity, validateName} from '../../config/Validation';
import ModalRelation from './components/ModalRelation';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';

class TravelInsuranceBuyerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departTime: '',
      returnTime: '',
      dayNumber: 0,

      buyerType: 'Cá nhân',
      buyerTypeId: 1,
      fullNameBuyer: '',
      identityNumberBuyer: '',
      birthDayBuyer: '',
      gender: null,
      emailBuyer: '',
      phoneBuyer: '',
      provinceBuyer: '',
      districtBuyer: '',
      addressBuyer: '',

      fullNameReceiver: '',
      phoneReceiver: '',
      provinceReceiver: '',
      districtReceiver: '',
      addressReceiver: '',
      emailReceiver: '',

      relation: '',
      fullName: '',
      cardId: '',
      phone: '',
      birthday: '',

      modalProvince: null,
      modalDistrict: null,
      modalBuyerType: null,
      modalRelation: null,
      modalRelation1: null,

      isChecked: false,
      receiveType: '',

      tourInfo: [],
      placeholder: [{}],
      insuredCustomer: [],

      errorCodeReceiverName: '',
      errorCodeReceiverPhone: '',
      errorCodeReceiverProvince: '',
      errorCodeReceiverDistrict: '',
      errorCodeReceiverAddress: '',

      errorCodeInsuredName: '',
      errorCodeInsuredBirthday: '',
      errorCodeInsuredIdentityNumber: '',
      errorCodeInsuredPhone: '',
      errorCodeInsuredRelation: '',
    };
  }
  componentDidMount() {
    this.getCurrentDate();
    console.log(this.state.departTime)
  }
  // lấy ngày hiện tại
  getCurrentDate = () => {
    const date = new Date();
    const parsedDate = moment(date, 'DD/MM/YYYY');
    const a = parsedDate.format('MM/DD/YYYY');
    this.setState({currentDate: a});
  };
  // cấp đơn
  createContract = (buyer, insurancePrintsAddress) => {
    const {insuredCustomer, departTime, returnTime, dayNumber} = this.state;
    const {packageId} = this.props;
    console.log(buyer);
    let url = `${URL}/api/contract/v1/travel-contracts`;
    let body = {
      type: 'DOMESTIC',
      areaId: 0,
      areaName: 'string',
      countryName: 'string',
      countryId: 0,
      arrivalIdCity: 0,
      arrivalCityName: 'string',
      currency: 'VND',
      departTime: departTime,
      returnTime: returnTime,
      dayNumber: dayNumber,
      packageId: packageId,
      buyer: buyer,
      insurancePrintsAddress: insurancePrintsAddress,
      insuredCustomers: insuredCustomer,
      receiveType: 'EMAIL',
    };
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI1ODQxMTIsImlhdCI6OTkwMjU1NTMxMiwiYXV0aF90aW1lIjoxNjAyNTU1MzEwLCJqdGkiOiIxNDBiNDQyMC03MTUyLTRkZDAtYjQwNy0wYTNlMTE0MzAyMTUiLCJpc3MiOiJodHRwczovL2F1dGgwZGV2Lmluc28udm4vYXV0aC9yZWFsbXMvaW5zby1odWIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzNmZWI2NmMtY2M3Ny00ZDVhLWE2OGMtZDY3OGNjYWI3NDAyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicG9ydGFsIiwibm9uY2UiOiJkYmJmOWZlOC03ODI1LTQ0MjMtOTVhZC1iMGE4Y2ZjYmZjODMiLCJzZXNzaW9uX3N0YXRlIjoiZTIyODRmNGMtZGJlYy00Y2UxLWI3YTctZDFjYWMyNDQ1NDI5IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJwb3J0YWwuY2FwZG9uLnZuIiwiKiIsInZwYi5jYXBkb24udm4iLCJodWJkZXYuaW5zby52biJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiU1lTLUFETUlOIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIG9yZ2FuaXphdGlvbnMgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiaW5zby1hZG1pbiIsImNoYW5uZWxJZCI6IjVmMmU2ZTFkNzVhNzhmMDA0Y2U4OWY4NiJ9.r-YB7hg7lTN8YUuL1ASt_9UaMLCfkVo63374qcce2LM`,
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.status == 'success') {
          const array = {
            orderPrice: res?.data?.fee,
            orderDescription: `Thanh toan bao hiem du lich`,
            buyer: {
              fullName: buyer.fullName,
              email: buyer.email,
              phone: buyer.phone,
              address: buyer.address,
            },
          };
          this.props.saveOrderInfomation(array);
          Actions.Pay();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  // lấy thông tin từ redux
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.tourInfo && nextProps.tourInfo !== prevState.tourInfo) {
      update.tourInfo = nextProps.tourInfo;
      update.departTime = nextProps.tourInfo[0].departTime;
      update.returnTime = nextProps.tourInfo[0].returnTime;
      update.dayNumber = nextProps.tourInfo[0].dayNumber;
    }
    return update;
  }
  onChangeInsuredCustomerBirthday = text => {
    let str = text;
    if (text.length === 2 && this.state.birthday.charAt(2) !== '/') {
      let a = str.slice(0, 2);
      this.setState({birthday: (text += '/')});
      if (parseInt(a) > 31 || parseInt(a) == 0) {
        SimpleToast.show('Ngày sinh không hợp lệ');
        this.setState({birthday: ''});
      }
    } else if (text.length === 5 && this.state.birthday.charAt(5) !== '/') {
      let a = str.slice(3, 5);
      this.setState({birthday: (text += '/')});
      if (parseInt(a) > 12 || parseInt(a) == 0) {
        SimpleToast.show('Ngày sinh không hợp lệ');
        this.setState({birthday: this.state.birthday.slice(0, 3)});
      }
    } else {
      this.setState({birthday: text});
    }
  };
  // Điền ngày sinh người mua
  onChangeBuyerBirthday = (text, props) => {
    let str = text;
    if (text.length === 2 && props.values.buyerBirthday.charAt(2) !== '/') {
      let a = str.slice(0, 2);
      props.setFieldValue('buyerBirthday', (text += '/'));
      if (parseInt(a) > 31 || parseInt(a) == 0) {
        SimpleToast.show('Ngày sinh không hợp lệ');
        props.setFieldValue('buyerBirthday', '');
      }
    } else if (
      text.length === 5 &&
      props.values.buyerBirthday.charAt(5) !== '/'
    ) {
      let a = str.slice(3, 5);
      props.setFieldValue('buyerBirthday', (text += '/'));
      if (parseInt(a) > 12 || parseInt(a) == 0) {
        SimpleToast.show('Tháng sinh không hợp lệ');
        props.setFieldValue(
          'buyerBirthday',
          props.values.buyerBirthday.slice(0, 3),
        );
      }
    } else {
      props.setFieldValue('buyerBirthday', text);
    }
  };
  // sửa tên người được bảo hiểm đã thêm
  onChangeName = (text, index) => {
    const {insuredCustomer} = this.state;
    insuredCustomer[index].fullName = text;
    this.setState({insuredCustomer: insuredCustomer});
  };
  // sửa số cmnd người được bảo hiểm đã thêm
  onChangeIdentityNumber = (text, index) => {
    const {insuredCustomer} = this.state;
    insuredCustomer[index].identityNumber = text;
    this.setState({insuredCustomer: insuredCustomer});
  };
  // sửa số dien thoai người được bảo hiểm đã thêm
  onChangePhone = (text, index) => {
    const {insuredCustomer} = this.state;
    insuredCustomer[index].phone = text;
    this.setState({insuredCustomer: insuredCustomer});
  };
  // sửa ngày sinh người được bảo hiểm đã thêm
  onChangeBirthday = async (text, index) => {
    const {insuredCustomer} = this.state;
    let str = text;
    if (text.length === 2 && this.state.birthdayChanged.charAt(2) !== '/') {
      let a = str.slice(0, 2);
      await this.setState({birthdayChanged: (text += '/')});
      insuredCustomer[index].birthday = this.state.birthdayChanged;
      await this.setState({insuredCustomer: insuredCustomer});
      if (parseInt(a) > 31 || parseInt(a) == 0) {
        SimpleToast.show('Ngày sinh không hợp lệ');
        this.setState({birthdayChanged: ''});
      }
    } else if (
      text.length === 5 &&
      this.state.birthdayChanged.charAt(5) !== '/'
    ) {
      let a = str.slice(3, 5);
      await this.setState({birthdayChanged: (text += '/')});
      insuredCustomer[index].birthday = this.state.birthdayChanged;
      await this.setState({insuredCustomer: insuredCustomer});
      if (parseInt(a) > 12 || parseInt(a) == 0) {
        SimpleToast.show('Ngày sinh không hợp lệ');
        this.setState({
          birthdayChanged: this.state.birthdayChanged.slice(0, 3),
        });
      }
    } else {
      await this.setState({birthdayChanged: text});
      insuredCustomer[index].birthday = this.state.birthdayChanged;
      await this.setState({insuredCustomer: insuredCustomer});
    }
  };
  // sửa mối quan hệ người được bảo hiểm đã add
  onChangeRelation = (data, index) => {
    const {insuredCustomer} = this.state;
    insuredCustomer[index].relation = data.name;
  };
  // chọn bên mua bảo hiểm và reset form sau khi chọn
  setBuyerType = data => {
    this.setState({
      buyerType: data.name,
      buyerTypeId: data.id,
      modalBuyerType: null,
      fullNameBuyer: '',
      identityNumberBuyer: '',
      birthDayBuyer: '',
      emailBuyer: '',
      phoneBuyer: '',
      provinceBuyer: '',
      districtBuyer: '',
      addressBuyer: '',
      fullNameReceiver: '',
      phoneReceiver: '',
      provinceReceiver: '',
      districtReceiver: '',
      addressReceiver: '',
    });
  };
  setRelation = data => {
    this.setState({
      relation: data.name,
      errorCodeInsuredRelation: '',
    });
  };
  // mở modal tỉnh/tp của form người mua
  openProvinceModal = () => {
    this.setState({
      isReceive: false, // set trạng thái => người mua
      modalProvince: true,
    });
  };
  // mở modal tỉnh/tp của form điền thông tin ấn chỉ bảo hiểm
  openProvinceReceiveModal = () => {
    this.setState({
      isReceive: true, // set trạng thái => địa chỉ ấn chỉ
      modalProvince: true,
    });
  };
  // mở modal quận/huyện của form người mua
  openDistrictModal = () => {
    const {provinceId} = this.state;
    this.props.getDistrict(provinceId);
    this.setState({
      modalDistrict: true,
      isReceive: false, // set trạng thái => người mua
    });
  };
  // mở modal quận/huyện của form điền thông tin ấn chỉ bảo hiểm
  openDistrictReceiveModal = () => {
    const {provinceReceiveId} = this.state;
    this.props.getDistrict(provinceReceiveId);
    this.setState({
      modalDistrict: true,
      isReceive: true, // set trạng thái => địa chỉ ấn chỉ
    });
  };
  // chọn tỉnh/tp
  onSelectProvince = (props, data) => {
    const {isReceive} = this.state;
    // nếu trạng thái = địa chỉ ấn chỉ set vào form địa chỉ ấn chỉ
    if (isReceive) {
      props.setFieldValue('receiverProvince', data._name);
      this.props.getDistrict(data.id);
    } else {
      // nếu trạng thái = người mua => set vào form người mua
      props.setFieldValue('buyerProvince', data._name);
      this.props.getDistrict(data.id);
    }
  };
  // chọn quận/huyện
  onSelectDistrict = (props, data) => {
    const {isReceive} = this.state;
    // nếu trạng thái = địa chỉ ấn chỉ set vào form địa chỉ ấn chỉ
    if (isReceive) {
      props.setFieldValue('receiverDistrict', data._name);
      this.props.getDistrict(data.id);
    } else {
      // nếu trạng thái = người mua => set vào form người mua
      props.setFieldValue('buyerDistrict', data._name);
      this.props.getDistrict(data.id);
    }
  };
  // handle check box điền thông tin như trên
  handleCheck = async props => {
    const {isChecked, buyerTypeId} = this.state;
    // nếu chưa check => check và set thông tin
    if (!isChecked) {
      await this.setState({isChecked: !isChecked});
      props.setFieldValue(
        'receiverName',
        buyerTypeId == 1
          ? props.values.buyerName
          : props.values.companyRepresent,
      );
      props.setFieldValue('receiverPhone', props.values.buyerPhone);
      props.setFieldValue('receiverEmail', props.values.buyerEmail);
      props.setFieldValue('receiverProvince', props.values.buyerProvince);
      props.setFieldValue('receiverDistrict', props.values.buyerDistrict);
      props.setFieldValue('receiverAddress', props.values.buyerAddress);
    } else {
      // nếu đã check => bỏ check và xóa thông tin
      this.setState({isChecked: !isChecked});
      props.setFieldValue('receiverName', '');
      props.setFieldValue('receiverPhone', '');
      props.setFieldValue('receiverEmail', '');
      props.setFieldValue('receiverProvince', '');
      props.setFieldValue('receiverDistrict', '');
      props.setFieldValue('receiverAddress', '');
    }
  };
  // thêm người được bảo hiểm
  addFieldInput = () => {
    const {
      insuredCustomer,
      fullName,
      relation,
      cardId,
      phone,
      birthday,
    } = this.state;
    if (this.validateInsuredName()) {
      if (this.validateInsuredBirthday()) {
        if (this.validateInsuredCardId()) {
          if (this.validateInsuredPhone()) {
            if (this.validateRelation()) {
              let array = insuredCustomer;
              array.push({
                relation: relation,
                fullName: fullName,
                cardId: cardId,
                phone: phone,
                birthday: birthday,
              });
              this.setState({
                insuredCustomer: array,
                relation: '',
                fullName: '',
                cardId: '',
                phone: '',
                birthday: '',
              });
              return true;
            }
          }
        }
      }
    }
  };
  // validate họ tên người được bảo hiểm
  validateInsuredName = () => {
    // required
    if (this.state.fullName == '') {
      this.setState({errorCodeInsuredName: 'Bạn phải nhập họ tên'});
      return false;
    }
    // check họ tên k chứa ký tự đặc biệt và số
    if (validateName.test(this.state.fullName)) {
      this.setState({errorCodeInsuredName: 'Họ tên sai định dạng'});
      return false;
    } else {
      this.setState({errorCodeInsuredName: ''});
      return true;
    }
  };
  // validate ngày sinh người được bảo hiểm
  validateInsuredBirthday = () => {
    const {birthday, currentDate} = this.state;
    const parsedDate = moment(birthday, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    const currentYear = currentDate.slice(6); // lấy năm hiện tại
    const yearBirth = birthday.slice(6); // lấy năm sinh
    const age = parseInt(currentYear) - parseInt(yearBirth); // lấy số tuổi
    // required
    if (birthday == '') {
      this.setState({
        errorCodeInsuredBirthday: 'Ngày sinh không được để trống',
      });
      return false;
    }
    // check ngày 31 tháng có 30 ngày
    if (checkMonth(birthday) == false) {
      this.setState({errorCodeInsuredBirthday: 'Ngày sinh không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(birthday) == false) {
      this.setState({errorCodeInsuredBirthday: 'Ngày sinh không hợp lệ'});
      return false;
    }
    // check ngày sinh không được lớn hơn ngày hiện tại
    if (moment(str).isBefore(currentDate) == false) {
      this.setState({
        errorCodeInsuredBirthday: 'Ngày sinh không được lớn hơn ngày hiện tại',
      });
      return false;
    }
    // check tuổi người mua phải trên 16
    if (age < 16) {
      this.setState({
        errorCodeInsuredBirthday: 'Người mua bảo hiểm phải đủ 16 tuổi trở lên',
      });
      return false;
    } else {
      this.setState({errorCodeInsuredBirthday: ''});
      return true;
    }
  };
  // validate cmnd người được bảo hiểm
  validateInsuredCardId = () => {
    // required
    if (this.state.cardId == '') {
      this.setState({
        errorCodeInsuredIdentityNumber: 'Bạn phải nhập CMND/CCCD/Hộ chiếu',
      });
      return false;
    }
    // check k được có ký tự đặc biệt
    if (validateIdentity.test(this.state.cardId)) {
      this.setState({
        errorCodeInsuredIdentityNumber: 'CMND/CCCD sai định dạng',
      });
      return false;
    } else {
      this.setState({errorCodeInsuredIdentityNumber: ''});
      return true;
    }
  };
  // validate số điện thoại người được bảo hiểm
  validateInsuredPhone = () => {
    // required
    if (this.state.phone == '') {
      this.setState({errorCodeInsuredPhone: 'Bạn phải nhập SĐT'});
      return false;
    }
    if (!isPhone(this.state.phone)) {
      this.setState({errorCodeInsuredPhone: 'SĐT sai định dạng'});
    } else {
      this.setState({errorCodeInsuredPhone: ''});
      return true;
    }
  };
  // check required số điện thoại người được bảo hiểm
  validateRelation = () => {
    if (this.state.relation == '') {
      this.setState({errorCodeInsuredRelation: 'Bạn phải chọn mối quan hệ'});
      return false;
    } else {
      this.setState({errorCodeInsuredRelation: ''});
      return true;
    }
  };
  // xóa người được bảo hiểm đã thêm
  removeCustomer = index => {
    const {insuredCustomer} = this.state;
    console.log(index);
    insuredCustomer.splice(index, 1);
    this.setState({insuredCustomer: insuredCustomer});
  };
  //  click tiếp tục, check validate => cấp đơn
  onPressNext = values => {
    const {buyerTypeId} = this.state;
    if (this.addFieldInput() == true) {
      let buyer = {
        type: buyerTypeId,
        fullName: values.buyerName,
        birthday: values.buyerBirthday,
        cardId: values.buyerIdentity,
        phone: values.buyerPhone,
        email: values.buyerEmail,
        cityName: values.buyerProvince,
        districtName: values.buyerDistrict,
        address: values.buyerAddress,
        companyTaxCode: values.companyTaxCode,
        companyName: values.companyName,
        companyBuyerName: values.companyRepresent,
        companyBuyerRole: values.companyRepresentRole,
      };
      let insurancePrintsAddress = {
        fullName: values.receiverName,
        phone: values.receiverPhone,
        email: values.receiverEmail,
        cityName: values.receiverProvince,
        districtName: values.receiverDistrict,
        address: values.receiverAddress,
      };
      this.createContract(buyer, insurancePrintsAddress);
    }
  };
  validation = () => {
    // validation form thông tin người mua cá nhân
    if (this.state.buyerType == 'Cá nhân') {
      const validation = Yup.object().shape({
        buyerName: Yup.string() // validate họ và tên người mua
          .strict(false) // không hiển thị error message mặc đinh
          .trim() // validate khoảng trắng
          .required(ERROR_NAME_REQUIRED)
          // => validate tên người mua, check ký tự đặc biệt và chữ số
          .test(
            'buyerName',
            ERROR_NAME_FORMAT,
            values => !validateName.test(values),
          ),
        buyerPhone: Yup.string() // validate số điện thoại người mua
          .strict(false)
          .trim()
          .required(ERROR_PHONE_REQUIRED)
          .test('buyerPhone', ERROR_PHONE_FORMAT, values => isPhone(values)), // check validate định dạng sđt
        buyerEmail: Yup.string() // validate email người mua
          .strict(false)
          .trim()
          .required(ERROR_EMAIL_REQUIRED)
          .email(ERROR_EMAIL_FORMAT), // check validate định dạng email bao gồm @ và domain
        buyerBirthday: Yup.string() // validate ngày sinh người mua
          .strict(false)
          .trim()
          .required(ERROR_BIRTHDAY_REQUIRED)
          // check ngày sinh không thể lớn hơn ngày hiện tại
          .test('buyerBirthday', ERROR_BIRTHDAY_FORMAT, values =>
            moment(values, 'DD/MM/YYYY').isBefore(this.state.currentDate),
          )
          // check ngày 31 tháng 30 ngày
          .test('buyerBirthday', ERROR_BIRTHDAY_FORMAT, values =>
            checkMonth(values == undefined ? '' : values),
          )
          // check ngày 29/02 năm nhuận
          .test('buyerBirthday', ERROR_BIRTHDAY_FORMAT, values =>
            checkLeapYear(values == undefined ? '' : values),
          ),
        buyerIdentity: Yup.string() // vaidate cmnd/cccd
          .strict(false)
          .trim()
          .required(ERROR_IDENTITY_REQUIRED)
          // check ký tự đặc biệt
          .test(
            'buyerIdentity',
            ERROR_IDENTITY_FORMAT,
            values => !validateIdentity.test(values),
          ),
        buyerProvince: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp người mua
        buyerDistrict: Yup.string().required(ERROR_DISTRICT_REQUIRED), // validate quận/huyện người mua
        buyerAddress: Yup.string() // validate địa chỉ người mua
          .strict(false)
          .trim()
          .required(ERROR_ADDRESS_REQUIRED),
        receiverName: Yup.string() // validate họ tên người nhận ấn chỉ
          .strict(false)
          .trim()
          .required(ERROR_NAME_REQUIRED)
          // check tên không được có ký tự đặc biệt và số
          .test(
            'receiverName',
            ERROR_NAME_FORMAT,
            values => !validateName.test(values),
          ),
        receiverPhone: Yup.string() // validate số điện thoại người nhận
          .strict(false)
          .trim()
          .required(ERROR_PHONE_REQUIRED)
          .test('receiverPhone', ERROR_PHONE_FORMAT, values => isPhone(values)), // check validate định dạng sđt
        receiverEmail: Yup.string() // validate email người nhận
          .strict(false)
          .trim()
          .required(ERROR_EMAIL_REQUIRED)
          .email(ERROR_EMAIL_FORMAT), // check validate định dạng email bao gồm @ và domain
        receiverProvince: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp
        receiverDistrict: Yup.string().required(ERROR_DISTRICT_REQUIRED), // validate quận/huyện
        receiverAddress: Yup.string() // check validate địa chỉ người nhận
          .strict(false)
          .trim()
          .required(ERROR_ADDRESS_REQUIRED),
      });
      return validation;
    } else {
      // validation form thông tin người mua doanh nghiệp
      const validation = Yup.object().shape({
        companyTaxCode: Yup.string() // validate mã số thuế
          .strict(false)
          .trim()
          .required(ERROR_COMPANY_TAXCODE_REQUIRED),
        companyName: Yup.string() // validate tên doanh nghiệp
          .strict(false)
          .trim()
          .required(ERROR_COMPANY_NAME_REQUIRED),
        buyerAddress: Yup.string() // validate địa chỉ doanh nghiệp
          .strict(false)
          .trim()
          .required(ERROR_ADDRESS_REQUIRED),
        companyRepresent: Yup.string() // validate tên người đại diện
          .strict(false)
          .trim()
          .required(ERROR_NAME_REQUIRED)
          // check tên k được chứa ký tự đb hoặc chữ số
          .test(
            'companyRepresent',
            ERROR_NAME_FORMAT,
            values => !validateName.test(values),
          ),
        buyerProvince: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp
        buyerDistrict: Yup.string().required(ERROR_DISTRICT_REQUIRED), // validate quận/huyện
        buyerAddress: Yup.string() // validate địa chỉ
          .strict(false)
          .trim()
          .required(ERROR_ADDRESS_REQUIRED),
        buyerEmail: Yup.string() // validate email người mua
          .strict(false)
          .trim()
          .required(ERROR_EMAIL_REQUIRED)
          .email(ERROR_EMAIL_FORMAT), // check validate định dạng email bao gồm @ và domain
        buyerPhone: Yup.string() // validate số điện thoại người được bảo hiểm
          .strict(false)
          .trim()
          .required(ERROR_PHONE_REQUIRED)
          .test('buyerPhone', ERROR_PHONE_FORMAT, values => isPhone(values)), // check định dạng sđt người được bảo hiểm
        receiverName: Yup.string()
          .strict(false)
          .trim()
          .required(ERROR_NAME_REQUIRED)
          .test(
            'receiverName',
            ERROR_EMAIL_FORMAT,
            values => !validateName.test(values),
          ),
        receiverPhone: Yup.string()
          .strict(false)
          .trim()
          .required(ERROR_PHONE_REQUIRED)
          .test('receiverPhone', ERROR_PHONE_FORMAT, values => isPhone(values)),
        receiverEmail: Yup.string()
          .strict(false)
          .trim()
          .required(ERROR_EMAIL_REQUIRED)
          .email(ERROR_EMAIL_FORMAT),
        receiverProvince: Yup.string().required(ERROR_PROVINCE_REQUIRED),
        receiverDistrict: Yup.string().required(ERROR_DISTRICT_REQUIRED),
        receiverAddress: Yup.string()
          .strict(false)
          .trim()
          .required(ERROR_ADDRESS_REQUIRED),
      });
      return validation;
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
  // render form điền thông tin người được bảo hiểm
  renderInsuredCustomer = () => {
    const {
      placeholder,
      relation,
      fullName,
      cardId,
      phone,
      birthday,
    } = this.state;
    return (
      <View style={styles.contentContainer}>
        {placeholder.map((item, index) => {
          return (
            <View>
              <View style={styles.tourInfoContainer}>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{flex: 0.5}}>
                    <Text style={{fontWeight: '700'}}>Họ và tên</Text>
                  </View>
                  <View style={{flex: 0.8, marginTop: -30}}>
                    <Input
                      value={fullName}
                      onChangeText={text => this.setState({fullName: text})}
                      error={this.state.errorCodeInsuredName}
                      onBlur={this.validateInsuredName}
                      onFocus={() => this.setState({errorCodeInsuredName: ''})}
                    />
                  </View>
                </View>

                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{flex: 0.5}}>
                    <Text>Ngày sinh</Text>
                  </View>
                  <View style={{flex: 0.8, marginTop: -30}}>
                    <Input
                      value={birthday}
                      placeholder={'dd/mm/yyyy'}
                      onChangeText={text =>
                        this.onChangeInsuredCustomerBirthday(text)
                      }
                      error={this.state.errorCodeInsuredBirthday}
                      onBlur={this.validateInsuredBirthday}
                      onFocus={() =>
                        this.setState({errorCodeInsuredBirthday: ''})
                      }
                    />
                  </View>
                </View>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{flex: 0.5}}>
                    <Text>CMND/CCCD/Hộ chiếu</Text>
                  </View>
                  <View style={{flex: 0.8, marginTop: -30}}>
                    <Input
                      value={cardId}
                      onChangeText={text => this.setState({cardId: text})}
                      error={this.state.errorCodeInsuredIdentityNumber}
                      onBlur={this.validateInsuredCardId}
                      onFocus={() =>
                        this.setState({errorCodeInsuredIdentityNumber: ''})
                      }
                    />
                  </View>
                </View>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{flex: 0.5}}>
                    <Text>Số điện thoại</Text>
                  </View>
                  <View style={{flex: 0.8, marginTop: -30}}>
                    <Input
                      value={phone}
                      onChangeText={text => this.setState({phone: text})}
                      error={this.state.errorCodeInsuredPhone}
                      onBlur={this.validateInsuredPhone}
                      onFocus={() => this.setState({errorCodeInsuredPhone: ''})}
                    />
                  </View>
                </View>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{flex: 0.5}}>
                    <Text>Mối quan hệ</Text>
                  </View>
                  <View style={{flex: 0.8, marginTop: -30}}>
                    <InputSelect
                      value={relation}
                      error={this.state.errorCodeInsuredRelation}
                      openModal={() => this.setState({modalRelation: true})}
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <TouchableOpacity
          onPress={() => this.addFieldInput()}
          style={{alignItems: 'center', marginTop: 15}}>
          <FastImage
            source={require('../../icons/iconAgent/ic_add.png')}
            style={{height: 20, width: 20}}
            resizeMode={'contain'}
          />
          <Text style={{color: Color}}>Thêm người được bảo hiểm</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // render danh sách người được bảo hiểm
  renderListInsuredCustomer = () => {
    const {insuredCustomer, modalRelation1} = this.state;
    return (
      <View style={styles.contentContainer}>
        {insuredCustomer.map((item, index) => {
          return (
            <View>
              <ModalRelation
                open={modalRelation1}
                onClosed={() => this.setState({modalRelation1: null})}
                setRelation={data => this.onChangeRelation(data, index)}
                onOpened={() => this.setState({modalRelation1: true})}
              />
              <View style={styles.tourInfoContainer}>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{flex: 0.5}}>
                    <Text style={{fontWeight: '700'}}>
                      {index + 1}. Họ và tên
                    </Text>
                  </View>
                  <View style={{flex: 0.5, marginTop: -30}}>
                    <Input
                      value={item.fullName}
                      onChangeText={text => this.onChangeName(text, index)}
                    />
                  </View>
                </View>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{flex: 0.5}}>
                    <Text>Ngày sinh</Text>
                  </View>
                  <View style={{flex: 0.5, marginTop: -30}}>
                    <Input
                      value={item.birthday}
                      onChangeText={text => this.onChangeBirthday(text, index)}
                    />
                  </View>
                </View>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{flex: 0.5}}>
                    <Text>CMND/CCCD/Hộ chiếu</Text>
                  </View>
                  <View style={{flex: 0.5, marginTop: -30}}>
                    <Input
                      value={item.cardId}
                      onChangeText={text =>
                        this.onChangeIdentityNumber(text, index)
                      }
                    />
                  </View>
                </View>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{flex: 0.5}}>
                    <Text>Số điện thoại</Text>
                  </View>
                  <View style={{flex: 0.5, marginTop: -30}}>
                    <Input
                      value={item.phone}
                      onChangeText={text => this.onChangePhone(text, index)}
                    />
                  </View>
                </View>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{flex: 0.5}}>
                    <Text>Mối quan hệ</Text>
                  </View>
                  <View style={{flex: 0.5, marginTop: -30}}>
                    <InputSelect
                      openModal={() => this.setState({modalRelation1: true})}
                      value={item.relation}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => this.removeCustomer(index)}
                  style={{alignItems: 'center', paddingVertical: 15}}>
                  <FastImage
                    source={require('../../icons/iconAgent/ic_minus.png')}
                    style={{height: 17, width: 17}}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  // render bảng phí
  renderFee = () => (
    <View>
      {/* Chọn hình thức giao nhận */}
      <View style={styles.titleContainer}>
        <FastImage
          source={require('../../icons/iconAgent/ic_user_active.png')}
          style={{height: 15, width: 15}}
          resizeMode={'contain'}
        />
        <Text style={styles.titleStyle}>Hình thức giao nhận</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', paddingVertical: 5}}>
          <TouchableOpacity
            onPress={() => this.setState({receiveType: 'email'})}>
            <FastImage
              source={
                this.state.receiveType == 'email'
                  ? require('../../icons/iconAgent/single_select_active.png')
                  : require('../../icons/iconAgent/single_select.png')
              }
              style={{height: 15, width: 15}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <Text style={{marginLeft: 8, marginTop: -3}}>
            Giấy chứng nhận bảo hiểm điện tử gửi tới email của quý khách
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 5}}>
          <TouchableOpacity onPress={() => this.setState({receiveType: 'ems'})}>
            <FastImage
              source={
                this.state.receiveType == 'ems'
                  ? require('../../icons/iconAgent/single_select_active.png')
                  : require('../../icons/iconAgent/single_select.png')
              }
              style={{height: 15, width: 15}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <Text style={{marginLeft: 8, marginTop: -3}}>
            Giấy chứng nhận bảo hiểm sẽ được gửi qua đường chuyển phát nhanh
            (EMS) đến địa chỉ quý khách đã cung cấp ở trên sau khi chúng tôi
            nhận được phí thanh toán
          </Text>
        </View>
      </View>
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
              <View style={styles.tourInfo}>
                <Text style={{fontWeight: '700'}}>Số tiền bảo hiểm</Text>
                <Text style={{fontWeight: '700'}}>
                  {this.props.packageName}đ
                </Text>
              </View>
              <View style={styles.tourInfo}>
                <Text>Số người trong đoàn</Text>
                <Text>{item.peopleAmount} người</Text>
              </View>
              <View style={styles.tourInfo}>
                <Text>Số ngày du lịch</Text>
                <Text>{item.dayNumber} ngày</Text>
              </View>
              <View style={styles.hr} />
              <View style={styles.tourInfo}>
                <Text style={{fontWeight: '700'}}>Thanh toán (miễn VAT):</Text>
                <Text style={{fontWeight: '700'}}>
                  {renderVND(this.props.price)}đ
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
  // render form nhập thông tin người mua
  renderFormInput = () => {
    const {
      modalBuyerType,
      buyerType,
      modalProvince,
      modalDistrict,
    } = this.state;
    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);
    return (
      <Formik
        initialValues={{
          buyerName: '',
          buyerBirthday: '',
          buyerEmail: '',
          buyerProvince: '',
          buyerDistrict: '',
          buyerAddress: '',
          buyerPhone: '',
          buyerIdentity: '',
          companyTaxCode: '',
          companyName: '',
          companyAddress: '',
          companyRepresent: '',
          companyRepresentRole: '',
          receiverName: '',
          receiverEmail: '',
          receiverAddress: '',
          receiverProvince: '',
          receiverDistrict: '',
          receiverPhone: '',
        }}
        onSubmit={values => this.onPressNext(values)}
        validationSchema={this.validation()}>
        {props => {
          return (
            <View style={styles.contentContainer}>
              <ModalProvince
                open={modalProvince}
                onClosed={() => this.setState({modalProvince: null})}
                setProvince={data => this.onSelectProvince(props, data)}
                onOpened={() => this.setState({modalProvince: true})}
              />
              <ModalDistrict
                open={modalDistrict}
                onClosed={() => this.setState({modalDistrict: null})}
                setDistrict={data => this.onSelectDistrict(props, data)}
                onOpened={() => this.setState({modalDistrict: true})}
              />
              <ModalBuyerType
                open={this.state.modalBuyerType}
                onClosed={() => this.setState({modalBuyerType: null})}
                setBuyerType={data => {
                  this.setBuyerType(data), props.resetForm();
                }}
                onOpened={() => this.setState({modalBuyerType: true})}
              />
              {/* Form nhập người mua bảo hiểm */}
              <View style={styles.titleContainer}>
                <FastImage
                  source={require('../../icons/iconAgent/ic_user_active.png')}
                  style={{height: 15, width: 15}}
                  resizeMode={'contain'}
                />
                <Text style={styles.titleStyle}>
                  Thông tin người mua bảo hiểm:
                </Text>
              </View>
              <FormikSelect
                label={'Bên mua bảo hiểm'}
                value={this.state.buyerType}
                openModal={() => this.setState({modalBuyerType: true})}
              />
              {buyerType == 'Cá nhân' ? (
                <View>
                  <FormikInput label={'Họ và tên *'} name={'buyerName'} />
                  <FormikInput
                    label={'Ngày sinh *'}
                    name={'buyerBirthday'}
                    placeholder={'dd/mm/yyyy'}
                    onChangeText={text =>
                      this.onChangeBuyerBirthday(text, props)
                    }
                    keyboardType={'number-pad'}
                  />
                  <View style={styles.rowInput}>
                    <View style={{width: '46%'}}>
                      <FormikInput
                        label={'CMND/CCCD *'}
                        name={'buyerIdentity'}
                      />
                    </View>
                    <View style={{width: '46%'}}>
                      <FormikInput
                        label={'Số điện thoại *'}
                        name={'buyerPhone'}
                      />
                    </View>
                  </View>
                  <FormikInput label={'Email *'} name={'buyerEmail'} />
                  <View style={styles.rowInput}>
                    <View style={{width: '46%'}}>
                      <FormikSelect
                        label={'Tỉnh/Thành phố *'}
                        name={'buyerProvince'}
                        openModal={() => this.openProvinceModal()}
                      />
                    </View>
                    <View style={{width: '46%'}}>
                      <FormikSelect
                        label={'Quận/Huyện *'}
                        name={'buyerDistrict'}
                        openModal={() => this.openDistrictModal()}
                      />
                    </View>
                  </View>
                  <FormikInput
                    label={'Địa chỉ (Không gồm Tỉnh/Thành phố, Quận/ Huyện) *'}
                    name={'buyerAddress'}
                  />
                </View>
              ) : null}
              {buyerType == 'Doanh nghiệp' ? (
                <View>
                  <FormikInput label={'Mã số thuế *'} name={'companyTaxCode'} />
                  <FormikInput
                    label={'Tên doanh nghiệp *'}
                    name={'companyName'}
                  />
                  <FormikInput label={'Địa chỉ *'} name={'buyerAddress'} />
                  <FormikInput
                    label={'Người đại diện *'}
                    name={'companyRepresent'}
                  />
                  <FormikInput
                    label={'Chức vụ'}
                    name={'companyRepresentRole'}
                  />
                  <View style={styles.rowInput}>
                    <View style={{width: '46%'}}>
                      <FormikSelect
                        label={'Tỉnh/Thành phố *'}
                        name={'buyerProvince'}
                        openModal={() => this.setState({modalProvince: true})}
                      />
                    </View>
                    <View style={{width: '46%'}}>
                      <FormikSelect
                        label={'Quận/Huyện *'}
                        name={'buyerDistrict'}
                        openModal={() => this.setState({modalDistrict: true})}
                      />
                    </View>
                  </View>
                  <View style={styles.rowInput}>
                    <View style={{width: '46%'}}>
                      <FormikInput label={'Email *'} name={'buyerEmail'} />
                    </View>
                    <View style={{width: '46%'}}>
                      <FormikInput
                        label={'Số điện thoại *'}
                        name={'buyerPhone'}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
              {/* Form nhập thông tin địa chỉ nhận ấn chỉ bảo hiểm */}
              <View style={{marginTop: 16}}>
                <Text style={{color: Color, fontWeight: 'bold'}}>
                  Địa chỉ nhận ấn chỉ bảo hiểm
                </Text>
              </View>
              <View style={{marginTop: 15}}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => this.handleCheck(props)}>
                  {
                    this.state.isChecked
                      ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                      : <IconBoxSvg width={20} height={20} color={NewColor} />
                  }
                  <Text style={{marginLeft: 8}}>Điền thông tin như trên</Text>
                </TouchableOpacity>
              </View>
              <FormikInput
                label={'Họ và tên người nhận'}
                name={'receiverName'}
              />
              <FormikInput label={'Email *'} name={'receiverEmail'} />
              <FormikInput label={'Số điện thoại'} name={'receiverPhone'} />
              <View style={styles.rowInput}>
                <View style={{width: '46%'}}>
                  <FormikSelect
                    label={'Tỉnh/ Thành phố'}
                    name={'receiverProvince'}
                    openModal={() => this.openProvinceReceiveModal()}
                  />
                </View>
                <View style={{width: '46%'}}>
                  <FormikSelect
                    label={'Quận/ Huyện'}
                    name={'receiverDistrict'}
                    openModal={() => this.openDistrictReceiveModal()}
                  />
                </View>
              </View>
              <FormikInput label={'Địa chỉ'} name={'receiverAddress'} />
              {this.renderListInsuredCustomer()}
              {this.renderInsuredCustomer()}
              {this.renderFee()}
              <View style={{paddingVertical: 15}}>
                <Button label={'TIẾP TỤC'} onPress={props.handleSubmit} />
              </View>
            </View>
          );
        }}
      </Formik>
    );
  };
  render() {
    const {
      modalProvince,
      modalDistrict,
      modalRelation,
      modalBuyerType,
    } = this.state;
    return (
      <View style={styles.container}>
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
        <ModalBuyerType
          open={modalBuyerType}
          onClosed={() => this.setState({modalBuyerType: null})}
          setBuyerType={data => this.setBuyerType(data)}
          onOpened={() => this.setState({modalBuyerType: true})}
        />
        <ModalRelation
          open={modalRelation}
          onClosed={() => this.setState({modalRelation: null})}
          setRelation={data => this.setRelation(data)}
          onOpened={() => this.setState({modalRelation: true})}
        />
        <NavWithImage
          isInfo={false}
          title={'Bảo hiểm du lịch'}
          onPress={() => Actions.pop()}
          image={require('../../icons/iconAgent/ic_banner_travel.jpg')}
        />
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <FastImage
              source={require('../../icons/iconAgent/ic_progress2.png')}
              style={{
                height: heightPercentageToDP('20'),
                width: widthPercentageToDP('85'),
              }}
              resizeMode={'contain'}
            />
          </View>
          {this.renderTourInfo()}
          {this.renderFormInput()}
        </ScrollView>
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
    marginTop: 10,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: 'rgba(0, 107, 153, 0.1)',
    paddingHorizontal: 24,
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
  rowInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  insuredCutomerFormContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  hr: {
    borderWidth: 0.5,
    borderColor: '#676667',
    borderRadius: 1,
  },
});
const mapStateToProps = state => {
  return {
    tourInfo: state.travelBuy.tourInfo,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDistrict: id => dispatch(getDistrict(id)),
    saveInsuredCustomerInfo: body => dispatch(setInsuredCustomerInfo(body)),
    saveOrderInfomation: body => dispatch(saveOrderInfomation(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TravelInsuranceBuyerInfo);
