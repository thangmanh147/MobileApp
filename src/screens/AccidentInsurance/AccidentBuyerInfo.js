import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform, Animated,
  ScrollView,
} from 'react-native';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import Promotion from '../../components/promotion/Promotion';
import {
  ERROR_ADDRESS_REQUIRED,
  ERROR_BIRTHDAY_REQUIRED,
  ERROR_COMPANY_NAME_REQUIRED,
  ERROR_COMPANY_TAXCODE_REQUIRED,
  ERROR_EMAIL_FORMAT,
  ERROR_EMAIL_REQUIRED,
  ERROR_IDENTITY_FORMAT,
  ERROR_IDENTITY_REQUIRED,
  ERROR_NAME_FORMAT,
  ERROR_COMPANY_NAME_FORMAT,
  ERROR_COMPANY_TAX_CODE,
  ERROR_NAME_REQUIRED,
  ERROR_PHONE_FORMAT,
  ERROR_PHONE_REQUIRED,
  ERROR_PROVINCE_REQUIRED,
  ERROR_16_YEARS,
} from '../../config/ErrorMessage';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import NameInput from './ListInsureCustomer/NameInput';
import BirthdayInput1 from './ListInsureCustomer/BirthdayInput1';
import IdentityInput from './ListInsureCustomer/IdentityInput';
import RelationSelect from './ListInsureCustomer/RelationSelect';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { Color, colorBackground, colorText, colorTitle, nameApp, NewColor, NewColorDisable, TxtColor, URL } from '../../config/System';
import Input from '../CarInsurance/components/Input';
import { Formik } from 'formik';
import { handleTextInput } from 'react-native-formik';
import * as Yup from 'yup';
import Button from '../../components/buy/Button';
import {
  validateCompanyName,
  validateName,
} from '../../config/Validation';
import InputSelect from '../../components/buy/InputSelect';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import {
  isPhoneAccident,
  isIdentity,
  isTaxCode,
  isEmailAccident,
  formatVND,
  isFullNameExpand
} from '../../components/Functions';
import ModalSex from '../FlightInsurance/component/ModalSex';
import Store from '../../services/Store';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX, roundNumber } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import DateFill from '../../components/dateTimeFill/DateFill';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconCheckboxBlurSvg from '../../config/images/icons/IconCheckboxBlurSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconEnvelopeSvg from '../../config/images/icons/IconEnvelopeSvg';
import IconInsurancerSvg from '../../config/images/icons/IconInsurancerSvg';
import IconPlusSvg from '../../config/images/icons/IconPlusSvg';
import IconCancelSvg from '../../config/images/icons/IconCancelSvg';
import IconSubtractSvg from '../../config/images/icons/IconSubtractSvg';

class AccidentBuyerInfo extends Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.state = {
      organizationCode: '',
      modalProvince: null,
      modalDistrict: null,
      modalBuyerType: null,
      modalGender: null,
      isBuyerModal: null,

      name: '',
      identityNumber: '',
      birthday: '',
      insuredCustomers: [{
        fullName: '',
        birthday: '',
        identityNumber: '',
        relation: 'Nhân viên công ty',
        relationFamily: '',
      }],
      chosenPackage: {},
      insurancePrintsAddress: {},
      buyerInfomation: {},
      valueCom: 0
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (
      nextProps.insurancePrintsAddress &&
      nextProps.insurancePrintsAddress !== prevState.insurancePrintsAddress
    ) {
      update.insurancePrintsAddress = nextProps.insurancePrintsAddress;
    }
    if (
      nextProps.buyerInfomation &&
      nextProps.buyerInfomation !== prevState.buyerInfomation
    ) {
      update.buyerInfomation = nextProps.buyerInfomation;
    }
    if (
      nextProps.chosenPackage &&
      nextProps.chosenPackage !== prevState.chosenPackage
    ) {
      update.chosenPackage = nextProps.chosenPackage;
    }
    if (
      nextProps.insuredCustomerInfo && nextProps.insuredCustomerInfo.length > 0 &&
      nextProps.insuredCustomerInfo !== prevState.insuredCustomers
    ) {
      update.insuredCustomers = nextProps.insuredCustomerInfo;
    }
    return update;
  }

  componentDidMount = () => {
    const {dataTokenInsur} = this.props;
    const {buyerInfomation} = this.state;
    this.getValueCom(buyerInfomation?.type === 2);
    new Store().getSession(Const.TOKEN).then(token => {
      const dataToken = jwt_decode(dataTokenInsur?.token || token);
      this.setState({ organizationCode: dataToken?.organizationCode });
    })
  };

  getValueCom = (isCompany) => {
    const { insurProductCode, orgCodeUser, idComSelected, dataTokenInsur } = this.props;
    const { insuredCustomers, chosenPackage } = this.state;
    if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
      const totalPrice = chosenPackage?.typeInsure === 2 && !isCompany ?
        (chosenPackage?.price || 0) :
        (chosenPackage?.price || 0) * insuredCustomers.length;
      new Store().getSession(Const.TOKEN).then(token => {
        const dataToken = jwt_decode(dataTokenInsur?.token || token);
        let url;
        if (nameApp.includes('MAILINH') || nameApp.includes('YCHI') || orgCodeUser === 'INSO' || orgCodeUser === 'DLJSC') {
          url = `${URL}/api/commission/v2/commissions/value`;
        } else {
          url = `${URL}/api/commission/v3/commissions/saler`;
        }
          let body = {
            "channelId": dataToken?.channelId || '',
            "supplierId": idComSelected || '',
            "agentId": dataToken?.organizationId || '',
            "userId": dataToken?.sub || '',
            "contractValue": totalPrice || 0,
            "product": insurProductCode,
            "B": `${totalPrice || 0}`,
            "V": "0",
            "D": "0"
        }
        console.log('======URL', url)
        console.log('======BODY', body)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: dataTokenInsur?.token || token,
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('======res', res)
                if (res.status == 200 || res.status == 'success') {
                  this.setState({valueCom: res?.data?.commission || 0});
                }
            })
            .catch((error) => {
                console.log(error)
            })
      });
    }
  };

  confirmPicker = (date, formik, err) => {
    formik.setFieldValue('buyerBirthday', date);
    formik.setFieldValue('errBuyerBirthday', err);
    if (!err) {
      const { insuredCustomers, chosenPackage } = this.state;
      if (chosenPackage?.typeInsure === 1 && !formik.values.isCompany) {
        const arr = insuredCustomers.map((item) => {
          if (item.relationFamily === 'Bản thân') {
            item.birthday = date;
            return item;
          }
          return item;
        });
        this.setState({ insuredCustomers: arr });
      }
    }
  };

  // Thêm người được bảo hiểm
  onPressAdd = (isCompany) => {
    const { insuredCustomers } = this.state;
    let arrayInsuredCustomers = insuredCustomers;
    arrayInsuredCustomers.push({
      fullName: '',
      birthday: '',
      identityNumber: '',
      relation: 'Nhân viên công ty',
      relationFamily: '',
    });
    this.setState({
      insuredCustomers: arrayInsuredCustomers,
    }, () => this.getValueCom(isCompany));
  };
  // chọn bên mua bảo hiểm
  setBuyerType = (formik, data) => {
    // const obj = {isCompany: data.id === 2};
    // formik.resetForm({
    //     values: Object.assign(formik.values, obj),
    // });
    formik.setFieldValue('isCompany', data.id === 2);
    this.getValueCom(data.id === 2);
  };
  // chọn tỉnh/tp
  setProvince = async (data, formik) => {
    if (this.state.isBuyerModal) {
      if (formik.values.buyerProvince !== data._name) {
        await formik.setFieldValue('provinceId', data.id);
        await formik.setFieldValue('buyerProvince', data._name);
        await formik.setFieldValue('buyerDistrict', '');
        if (formik.values.fillInfo) {
          await formik.setFieldValue('receiverProvinceId', data.id);
          await formik.setFieldValue('receiverProvince', data._name);
          await formik.setFieldValue('receiverDistrict', '');
        }
      }
    } else {
      if (formik.values.receiverProvince !== data._name) {
        await formik.setFieldValue('receiverProvinceId', data.id);
        await formik.setFieldValue('receiverProvince', data._name);
        await formik.setFieldValue('receiverDistrict', '');
        if (formik.values.fillInfo) {
          await formik.setFieldValue('fillInfo', false);
        }
      }
    }
    await this.props.getDistrict(data.id);
  };
  // chọn quận/huyện
  setDistrict = async (data, formik) => {
    if (this.state.isBuyerModal) {
      if (formik.values.buyerDistrict !== data._name) {
        await formik.setFieldValue('districtId', data.id);
        await formik.setFieldValue('buyerDistrict', data._name);
        if (formik.values.fillInfo) {
          await formik.setFieldValue('receiverDistrictId', data.id);
          await formik.setFieldValue('receiverDistrict', data._name);
        }
      }
    } else {
      if (formik.values.receiverDistrict !== data._name) {
        await formik.setFieldValue('receiverDistrictId', data.id);
        await formik.setFieldValue('receiverDistrict', data._name);
        if (formik.values.fillInfo) {
          await formik.setFieldValue('fillInfo', false);
        }
      }
    }
  };
  // mở modal tỉnh/tp
  openProvinceModal = item => {
    if (item === 'buyer') {
      // => nếu bên mua bảo hiểm = cá nhân
      this.setState({
        isBuyerModal: true, // => set loại modal = cá nhân
        modalProvince: true,
      });
    } else {
      this.setState({
        isBuyerModal: false,
        modalProvince: true,
      });
    }
  };
  // mở modal quận/huyện
  openDistrictModal = item => {
    if (item === 'buyer') {
      // => nếu bên mua bảo hiểm = cá nhân
      this.setState({
        isBuyerModal: true, // => set loại modal = cá nhân
        modalDistrict: true,
      });
    } else {
      this.setState({
        isBuyerModal: false,
        modalDistrict: true,
      });
    }
  };
  // chọn giới tính
  setGender = (formik, data) => {
    formik.setFieldValue('buyerGender', data.name);
  };
  // sửa tên người được bảo hiểm đã thêm
  onChangeName = (text, index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].fullName = text;
    this.setState({ insuredCustomers: insuredCustomers });
  };
  // sửa số cmnd người được bảo hiểm đã thêm
  onChangeIdentityNumber = (text, index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].identityNumber = text;
    this.setState({ insuredCustomers: insuredCustomers });
  };
  onSetErrIdentityNumber = (value, index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].errIdentityNumber = value;
    this.setState({ insuredCustomers: insuredCustomers });
  };
  // sửa ngày sinh người được bảo hiểm đã thêm
  onChangeBirthday = (text, index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].birthday = text;
    this.setState({ insuredCustomers: insuredCustomers });
  };
  onSetErrBirthday = (value, index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].errBirthday = value;
    this.setState({ insuredCustomers: insuredCustomers });
  };
  // xóa người được bảo hiểm đã thêm
  removeCustomer = (index, isCompany) => {
    const { insuredCustomers } = this.state;
    if (insuredCustomers.length === 1) {
      insuredCustomers[0].fullName = '';
      insuredCustomers[0].birthday = '';
      insuredCustomers[0].identityNumber = '';
      insuredCustomers[0].relation = 'Nhân viên công ty';
      insuredCustomers[0].relationFamily = '';
      this.setState({ insuredCustomers: insuredCustomers }, () => this.getValueCom(isCompany));
    } else {
      insuredCustomers.splice(index, 1);
      this.setState({ insuredCustomers: insuredCustomers }, () => this.getValueCom(isCompany));
    }
  };
  onSetReceiveType = (formik) => {
    // const data = {receiveType: !formik.values.receiveType};
    // formik.resetForm({
    //     values: Object.assign(formik.values, data),
    // });
    formik.setFieldValue('receiveType', !formik.values.receiveType);
  };
  onFill = async (formik) => {
    if (!formik.values.fillInfo) {
      await formik.setFieldValue('receiverName', formik.values.buyerName);
      await formik.setFieldValue('receiverPhone', formik.values.buyerPhone);
      await formik.setFieldValue('receiverEmail', formik.values.buyerEmail);
      await formik.setFieldValue('receiverProvince', formik.values.buyerProvince);
      await formik.setFieldValue('receiverProvinceId', formik.values.provinceId);
      await formik.setFieldValue('receiverDistrict', formik.values.buyerDistrict);
      await formik.setFieldValue('receiverDistrictId', formik.values.districtId);
      await formik.setFieldValue('receiverAddress', formik.values.buyerAddress);
    }
    await formik.setFieldValue('fillInfo', !formik.values.fillInfo);
  };
  onChangeBuyerName = (text, isCompany) => {
    const { insuredCustomers, chosenPackage } = this.state;
    if (chosenPackage?.typeInsure === 1 && !isCompany) {
      const arr = insuredCustomers.map((item) => {
        if (item.relationFamily === 'Bản thân') {
          item.fullName = text.normalize().toUpperCase();
          return item;
        }
        return item;
      });
      this.setState({ insuredCustomers: arr });
    }
  };
  onChangeBuyerIdentity = (formik) => {
    const { insuredCustomers, chosenPackage } = this.state;
    const text = formik.values.buyerIdentity;
    const isCompany = formik.values.isCompany;
    formik.setFieldValue('cardIdBuyer', text);
    if (chosenPackage?.typeInsure === 1 && !isCompany) {
      const arr = insuredCustomers.map((item) => {
        if (item.relationFamily === 'Bản thân') {
          item.identityNumber = text.toUpperCase();
          return item;
        }
        return item;
      });
      this.setState({ insuredCustomers: arr });
    }
  };
  checkInsuredCustomers = (isCompany) => {
    const { insuredCustomers, chosenPackage } = this.state;
    if (chosenPackage?.typeInsure === 1 || (chosenPackage?.typeInsure === 2 && isCompany)) {
      const data = insuredCustomers.filter((item) =>
        item.identityNumber.trim().length === 0 ||
        (!item.errIdentityNumber && item.relationFamily !== 'Bản thân') ||
        item.fullName.trim().length === 0 ||
        !isFullNameExpand(item.fullName) ||
        item.birthday.length === 0 ||
        item.errBirthday ||
        item.relation.length === 0 ||
        (!isCompany && item.relationFamily.length === 0)
      );
      if (data.length > 0) return false;
    }
    return true;
  };
  onChangeRelation = (name, index, values) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].relationFamily = name;
    if (
      name !== 'Bản thân' &&
      insuredCustomers[index].fullName.length > 0 && insuredCustomers[index].fullName === values.buyerName &&
      insuredCustomers[index].birthday.length > 0 && insuredCustomers[index].birthday === values.buyerBirthday &&
      insuredCustomers[index].identityNumber.length > 0 && insuredCustomers[index].identityNumber === values.buyerIdentity
    ) {
      insuredCustomers[index].fullName = '';
      insuredCustomers[index].identityNumber = '';
      insuredCustomers[index].birthday = '';
      insuredCustomers[index].dataBirthday = null;
    } else if (name === 'Bản thân') {
      insuredCustomers[index].fullName = values.buyerName;
      insuredCustomers[index].birthday = values.buyerBirthday;
      insuredCustomers[index].identityNumber = values.buyerIdentity;
    }
    this.setState({ insuredCustomers: insuredCustomers });
  };
  // lưu thông tin vào redux
  storeInfomation = async values => {
    if (this.checkInsuredCustomers(values.isCompany)) {
      const { insuredCustomers, valueCom } = this.state;
      let printAddress = {
        receiveType: values.receiveType ? 'EMS' : '',
        autoFillInfo: values.fillInfo,
        receiverName: values.receiverName,
        receiverPhone: values.receiverPhone,
        receiverEmail: values.receiverEmail.trim(),
        receiverProvinceId: values.receiverProvinceId,
        receiverDistrictId: values.receiverDistrictId,
        receiverProvince: values.receiverProvince,
        receiverDistrict: values.receiverDistrict,
        receiverAddress: values.receiverAddress,
      };
      let buyerInfomation = {
        type: values.isCompany ? 2 : 1,
        fullName: values.buyerName,
        gender: values.buyerGender,
        birthday: values.buyerBirthday,
        cardId: values.buyerIdentity,
        phone: values.buyerPhone,
        email: values.buyerEmail.trim(),
        provinceId: values.provinceId,
        cityName: values.buyerProvince,
        districtId: values.districtId,
        districtName: values.buyerDistrict,
        address: values.buyerAddress,
        companyTaxCode: values.companyTaxCode,
        companyName: values.companyName,
        isVat: values.isVat,
        vatCompanyTaxCode: values.vatCompanyTaxCode,
        vatCompanyName: values.vatCompanyName,
        vatCompanyEmail: values.vatCompanyEmail,
        vatCompanyAddress: values.vatCompanyAddress,
        valueCom: valueCom
      };
      buyerInfomation.fullName = values.buyerName.normalize().toUpperCase();
      buyerInfomation.cardId = values.buyerIdentity.toUpperCase();
      buyerInfomation.companyName = values.companyName.normalize().toUpperCase();
      buyerInfomation.vatCompanyName = values.vatCompanyName.normalize().toUpperCase();
      buyerInfomation.vatCompanyEmail = values.vatCompanyEmail.trim();
      printAddress.receiverName = values.receiverName.normalize().toUpperCase();
      await this.props.saveInsuredCustomerInfo(insuredCustomers);
      await this.props.saveBuyerInfomation(buyerInfomation);
      await this.props.saveInsurancePrintAddress(printAddress);
      this.onNext();
    } else {
      Alert.alert('Bạn cần điền đủ thông tin cho Danh sách hộ gia đình được bảo hiểm');
    }
  };
  // validate form người mua bảo hiểm
  validation = Yup.object().shape({
    // điều kiện nếu isCompany = true => bắt validate cho bên mua bảo hiểm = doanh nghiệp
    companyName: Yup.string().when('isCompany', {
      // validate tên doanh nghiệp
      is: true,
      then: Yup.string()
        .strict(false) // không hiển thị error message mặc đinh
        .trim() // validate khoảng trắng
        .test(
          'companyName',
          ERROR_COMPANY_NAME_FORMAT,
          values => !validateCompanyName.test(values),
        )
        .required(ERROR_COMPANY_NAME_REQUIRED),
    }),
    companyTaxCode: Yup.string().when('isCompany', {
      // validate mã số thuế
      is: true,
      then: Yup.string()
        .strict(false)
        .trim()
        .required(ERROR_COMPANY_TAXCODE_REQUIRED)
        .test(
          'companyTaxCode',
          ERROR_COMPANY_TAX_CODE,
          values => isTaxCode(values),
        ),
    }),
    // companyBuyerName: Yup.string().when('isCompany', {
    //   // validate người đại diện
    //   is: true,
    //   then: Yup.string()
    //     .strict(false)
    //     .trim()
    //     .test(
    //       'buyerName',
    //       ERROR_NAME_FORMAT,
    //       values => isFullNameExpand(values),
    //     )
    //     .required(ERROR_NAME_REQUIRED),
    // }),
    // companyBuyerRole: Yup.string().when('isCompany', {
    //   // validate chức vụ
    //   is: true,
    //   then: Yup.string()
    //     .strict(false)
    //     .trim()
    //     .required(ERROR_REPRESENT_ROLE_REQUIRED),
    // }),
    buyerName: Yup.string()
      .strict(false)
      .trim()
      .test(
        'buyerName',
        ERROR_NAME_FORMAT,
        values => isFullNameExpand(values),
      )
      .required(ERROR_NAME_REQUIRED),
    // check isCompany = false => bắt validate cho bên mua bảo hiểm = cá nhân
    buyerGender: Yup.string().when('isCompany', {
      // validate giới tính
      is: false,
      then: Yup.string().required('Bạn phải chọn giới tính'),
    }),
    buyerBirthday: Yup.string().when('isCompany', {
      // validate ngày sinh người mua
      is: false,
      then: Yup.string()
        .strict(false)
        .trim()
        .required(ERROR_BIRTHDAY_REQUIRED),
    }),
    buyerAddress: Yup.string() // validate địa chỉ người mua
      .strict(false)
      .trim()
      .required(ERROR_ADDRESS_REQUIRED),
    buyerEmail: Yup.string() // validate email người mua
      .strict(false)
      .trim()
      .required(ERROR_EMAIL_REQUIRED)
      .test('buyerEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)), // check validate định dạng email bao gồm @ và domain
    buyerPhone: Yup.string() // validate số điện thoại người mua
      .strict(false)
      .required(ERROR_PHONE_REQUIRED)
      .test('buyerPhone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)), // check validate định dạng sđt
    buyerIdentity: Yup.string().when('isCompany', {
      is: false,
      then: Yup.string() // vaidate cmnd/cccd
        .required(ERROR_IDENTITY_REQUIRED)
        .test(
          'buyerIdentity',
          ERROR_IDENTITY_FORMAT,
          values => isIdentity(values), // check validate ký tự đặc biệt
        ),
    }),
    buyerProvince: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp
    buyerDistrict: Yup.string().required('Chưa chọn quận/huyện'), // validate quận/huyện
    // validate form người nhận ấn chỉ bảo hiểm
    receiverName: Yup.string().when('receiveType', {
      is: true,
      then: Yup.string() // validate họ và tên người nhận
        .strict(false)
        .trim()
        .required(ERROR_NAME_REQUIRED)
        // check tên không được có ký tự đặc biệt và số
        .test(
          'receiverName',
          ERROR_NAME_FORMAT,
          values => isFullNameExpand(values),
        ),
    }),
    receiverPhone: Yup.string().when('receiveType', {
      is: true,
      then: Yup.string() // validate số điện thoại người nhận
        .strict(false)
        .required(ERROR_PHONE_REQUIRED)
        .test('receiverPhone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)), // check validate định dạng sđt
    }),
    receiverEmail: Yup.string().when('receiveType', {
      is: true,
      then: Yup.string() // validate email người nhận
        .strict(false)
        .trim()
        .required(ERROR_EMAIL_REQUIRED)
        .test('receiverEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)), // check validate định dạng email bao gồm @ và domain
    }),
    receiverProvince: Yup.string().when('receiveType', {
      is: true,
      then: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp
    }),
    receiverDistrict: Yup.string().when('receiveType', {
      is: true,
      then: Yup.string().required('Chưa chọn quận/huyện'), // validate quận/huyện
    }),
    receiverAddress: Yup.string().when('receiveType', {
      is: true,
      then: Yup.string() // check validate địa chỉ người nhận
        .strict(false)
        .trim()
        .required(ERROR_ADDRESS_REQUIRED),
    }),
    vatCompanyName: Yup.string().when('isCompany', {
        is: true,
        then: Yup.string().when('isVat', {
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .test(
                    'vatCompanyName',
                    ERROR_COMPANY_NAME_FORMAT,
                    values => !validateCompanyName.test(values),
                )
                .required(ERROR_COMPANY_NAME_REQUIRED),
        }),
    }),
    vatCompanyTaxCode: Yup.string().when('isCompany', {
        is: true,
        then: Yup.string().when('isVat', {
            is: true,
            then: Yup.string()
            .strict(false)
            .required(ERROR_COMPANY_TAXCODE_REQUIRED)
            .test('vatCompanyTaxCode', ERROR_COMPANY_TAX_CODE, values => isTaxCode(values)),
        }),
    }),
    vatCompanyEmail: Yup.string().when('isCompany', {
        is: true,
        then: Yup.string().when('isVat', {
            is: true,
            then: Yup.string() // validate email người mua
            .strict(false)
            .trim()
            .required(ERROR_EMAIL_REQUIRED)
            .test('vatCompanyEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)),
        }),
    }),
    vatCompanyAddress: Yup.string().when('isCompany', {
        is: true,
        then: Yup.string().when('isVat', {
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .required(ERROR_ADDRESS_REQUIRED),
        }),
    }),
  });

  onFillVAT = async (formik) => {
    if (!formik.values.isVat && formik.values.isCompany) {
        await formik.setFieldValue('vatCompanyName', formik.values.companyName);
        await formik.setFieldValue('vatCompanyTaxCode', formik.values.companyTaxCode);
        await formik.setFieldValue('vatCompanyEmail', formik.values.buyerEmail);
        await formik.setFieldValue(
            'vatCompanyAddress',
            formik.values.buyerAddress + (formik?.values?.buyerDistrict ? `, ${formik?.values?.buyerDistrict}, ${formik?.values?.buyerProvince}` : '')
        );
    }
    await formik.setFieldValue('isVat', !formik.values.isVat)
  }

  // render danh sách người được bảo hiểm đã thêm
  renderListInsuredCustomer = (isCompany, values) => {
    const { insuredCustomers, chosenPackage } = this.state;
    const dataCheck = insuredCustomers.filter((item) => item.relationFamily === 'Bản thân');
    return (
      <View>
        {insuredCustomers.map((item, index) => {
          const isEdit = isCompany || item.relationFamily !== 'Bản thân';
          return (
            <View style={{ marginTop: 16 }}>
              <View style={styles.formContainer}>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: TxtColor }}>
                      {index + 1}. Họ và tên
                    </Text>
                  </View>
                  <View style={{ flex: 0.5, marginTop: -30 }}>
                    <NameInput
                      value={item.fullName}
                      onChange={text => this.onChangeName(text, index)}
                      editable={isEdit}
                    />
                  </View>
                </View>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Ngày sinh</Text>
                  </View>
                  <View style={{ flex: 0.5, marginTop: -30 }}>
                    <BirthdayInput1
                      value={item.birthday}
                      onChange={(date) => this.onChangeBirthday(date, index)}
                      onSetErr={(value) => this.onSetErrBirthday(value, index)}
                      editable={isEdit}
                      dateBuyer={values.buyerBirthday}
                      relationFamily={item.relationFamily}
                    />
                  </View>
                </View>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{ flex: 0.5, paddingRight: 5 }}>
                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>CMND/CCCD/Hộ chiếu</Text>
                  </View>
                  <View style={{ flex: 0.5, marginTop: -30 }}>
                    <IdentityInput
                      value={item.identityNumber}
                      onChange={text => this.onChangeIdentityNumber(text, index)}
                      onSetErr={value => this.onSetErrIdentityNumber(value, index)}
                      editable={isEdit}
                      cardIdBuyer={values.cardIdBuyer}
                      isCompany={values.isCompany}
                      selectedBuyer={item.relationFamily === 'Bản thân'}
                      insuredCustomers={insuredCustomers.filter((_item) => _item.identityNumber !== item.identityNumber)}
                    />
                  </View>
                </View>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Mối quan hệ</Text>
                  </View>
                  {
                    isCompany ? (
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: '#414042' }}>{item.relation}</Text>
                        <View style={{ height: 0.65, backgroundColor: Color, marginTop: 5 }} />
                      </View>
                    ) : (
                      <View style={{ flex: 0.5, marginTop: -30 }}>
                        <RelationSelect
                          value={item.relationFamily}
                          setRelation={(name) => this.onChangeRelation(name, index, values)}
                          selectedBuyer={dataCheck.length > 0}
                        />
                      </View>
                    )
                  }
                </View>
                <TouchableOpacity
                  onPress={() => this.removeCustomer(index, isCompany)}
                  style={{ alignItems: 'center', marginTop: 10 }}>
                  {
                    insuredCustomers.length === 1 ? (
                      <IconCancelSvg width={20} height={20} color={Color} style={{ opacity: 0.5 }} />
                    ) : (
                      <IconSubtractSvg width={20} height={20} color={Color} style={{ opacity: 0.5 }} />
                    )
                  }
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        <TouchableOpacity
          onPress={() => this.onPressAdd(isCompany)}
          style={{ alignItems: 'center', marginTop: 15 }}>
          <IconPlusSvg width={20} height={20} />
          <Text style={{ color: Color, marginTop: 4, fontSize: 14, fontWeight: '400' }}>Thêm người được bảo hiểm</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // render tổng lệ phí
  renderTotalFee = (isCompany) => {
    const { promotionPrice } = this.props;
    const { insuredCustomers, chosenPackage } = this.state;
    const totalPrice = chosenPackage?.typeInsure === 2 && !isCompany ?
      (chosenPackage?.price || 0) :
      (chosenPackage?.price || 0) * insuredCustomers.length;
    const payPrice = promotionPrice?.price ? totalPrice - promotionPrice?.price : totalPrice;
    return (
      <View style={{ marginVertical: 32 }}>
        <View
          style={{
            paddingVertical: 16,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: Color,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
            TÍNH PHÍ BẢO HIỂM
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 16,
            paddingHorizontal: 12,
            backgroundColor: colorBackground,
          }}
        >
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>
              Phí bảo hiểm{chosenPackage?.typeInsure === 1 ? '/người' : (isCompany && '/hộ gia đình')}
            </Text>
            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>
              {formatVND(chosenPackage?.price, '.')}VNĐ
            </Text>
          </View>
          {
            chosenPackage?.typeInsure === 1 || (chosenPackage?.typeInsure === 2 && isCompany) ? (
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 12 }}>
                <Text style={{ color: TxtColor, fontSize: 14, fontWeight: '400' }}>
                  {chosenPackage?.typeInsure === 2 && isCompany ? 'Số hộ gia đình' : 'Số người được bảo hiểm'}
                </Text>
                <Text style={{ color: TxtColor, fontSize: 14, fontWeight: '400' }}>
                  {insuredCustomers.length}
                </Text>
              </View>
            ) : null
          }
          <View style={{ height: 1, backgroundColor: Color, marginTop: 16 }} />
          {
            promotionPrice?.price ? (
              <>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 16 }}>
                  <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>
                    Tổng phí{promotionPrice?.price && ' (miễn VAT)'}:
                  </Text>
                  <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>
                    {formatVND(totalPrice, '.')}VNĐ
                  </Text>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 16 }}>
                  <Text style={{ color: TxtColor, fontSize: 14, fontWeight: '400' }}>
                    Khuyến mãi:
                  </Text>
                  <Text style={{ color: TxtColor, fontSize: 14, fontWeight: '400' }}>
                    -{formatVND(promotionPrice?.price, '.')}VNĐ
                  </Text>
                </View>
              </>
            ) : null
          }
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 16 }}>
            <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>
              Thanh toán{!promotionPrice?.price && ' (miễn VAT)'}:
            </Text>
            <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>
              {formatVND(payPrice, '.')}VNĐ
            </Text>
          </View>
        </View>
      </View>
    );
  };
  // render form nhập thông tin
  renderFormInputInfomation = () => {
    const { insurProductCode } = this.props;
    const {
      modalProvince,
      modalDistrict,
      modalBuyerType,
      modalGender,
      chosenPackage,
      insurancePrintsAddress,
      buyerInfomation,
      insuredCustomers,
      isBuyerModal,
      valueCom
    } = this.state;
    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);
    return (
      <Formik
        initialValues={{
          isCompany: buyerInfomation?.type === 2,
          receiveType: insurancePrintsAddress?.receiveType === 'EMS',
          fillInfo: insurancePrintsAddress?.autoFillInfo,
          receiverName: insurancePrintsAddress?.receiverName || '',
          receiverPhone: insurancePrintsAddress?.receiverPhone || '',
          receiverEmail: insurancePrintsAddress?.receiverEmail || '',
          receiverProvince: insurancePrintsAddress?.receiverProvince || '',
          receiverProvinceId: insurancePrintsAddress?.receiverProvinceId || 0,
          receiverDistrictId: insurancePrintsAddress?.receiverDistrictId || 0,
          receiverDistrict: insurancePrintsAddress?.receiverDistrict || '',
          receiverAddress: insurancePrintsAddress?.receiverAddress || '',
          isVat: buyerInfomation?.isVat,
          buyerAddress: buyerInfomation?.address || '',
          buyerEmail: buyerInfomation?.email || '',
          buyerName: buyerInfomation?.fullName || '',
          buyerGender: buyerInfomation?.gender || '',
          buyerIdentity: buyerInfomation?.cardId || '',
          buyerPhone: buyerInfomation?.phone || '',
          buyerBirthday: buyerInfomation?.birthday || '',
          provinceId: buyerInfomation?.provinceId || 0,
          buyerProvince: buyerInfomation?.cityName || '',
          districtId: buyerInfomation?.districtId || 0,
          buyerDistrict: buyerInfomation?.districtName || '',
          companyName: buyerInfomation?.companyName || '',
          companyTaxCode: buyerInfomation?.companyTaxCode || '',
          vatCompanyTaxCode: buyerInfomation?.vatCompanyTaxCode || '',
          vatCompanyName: buyerInfomation?.vatCompanyName || '',
          vatCompanyEmail: buyerInfomation?.vatCompanyEmail || '',
          vatCompanyAddress: buyerInfomation?.vatCompanyAddress || '',
        }}
        onSubmit={values => this.storeInfomation(values)}
        validationSchema={this.validation}
        isInitialValid={buyerInfomation?.fullName?.length > 0}>
        {formik => (
          <View>
            <ModalProvince
              open={modalProvince}
              onClosed={() => this.setState({ modalProvince: null })}
              setProvince={data => this.setProvince(data, formik)}
              onOpened={() => this.setState({ modalProvince: true })}
              nameSelected={isBuyerModal ? formik.values.buyerProvince : formik.values.receiverProvince}
            />
            <ModalDistrict
              open={modalDistrict}
              onClosed={() => this.setState({ modalDistrict: null })}
              setDistrict={data => this.setDistrict(data, formik)}
              onOpened={() => this.setState({ modalDistrict: true })}
              nameSelected={isBuyerModal ? formik.values.buyerDistrict : formik.values.receiverDistrict}
            />
            <ModalBuyerType
              open={modalBuyerType}
              onClosed={() => this.setState({ modalBuyerType: null })}
              setBuyerType={data => this.setBuyerType(formik, data)}
              onOpened={() => this.setState({ modalBuyerType: true })}
            />
            <ModalSex
              open={modalGender}
              onClosed={() => this.setState({ modalGender: null })}
              setSex={data => this.setGender(formik, data)}
              onOpened={() => this.setState({ modalGender: true })}
              nameSelected={formik.values.buyerGender}
            />
            {/* Form nhập thông tin xuất hóa đơn VAT */}
            <FormikSelect
              label={'Bên mua bảo hiểm'}
              value={formik.values.isCompany ? 'Doanh nghiệp' : 'Cá nhân'}
              openModal={() => this.setState({ modalBuyerType: true })}
            />
            {!formik.values.isCompany ? (
              <View>
                <FormikInput
                  label={'Họ và tên *'}
                  name={'buyerName'}
                  onChangeText={(text) => {
                    formik.values.fillInfo && formik.setFieldValue('receiverName', text.toUpperCase());
                  }}
                  onBlur={() => {
                    formik.setFieldValue('buyerName', formik.values.buyerName.toUpperCase());
                    this.onChangeBuyerName(formik.values.buyerName, formik.values.isCompany);
                  }}
                  autoUpperCase
                />
                <View style={styles.inputRow}>
                  <View style={{ width: '46%', marginTop: 5 }}>
                    <FormikSelect
                      label={'Giới tính *'}
                      name={'buyerGender'}
                      openModal={() => this.setState({ modalGender: true })}
                    />
                  </View>
                  <View style={{ width: '46%' }}>
                    {/* <ModalTimePicker
                      dateDefault={new Date(moment().subtract(16, 'years').valueOf())}
                      maximumDate={new Date(moment().subtract(16, 'years').valueOf())}
                      onPicker={(date) => this.confirmPicker(date, formik, false)}
                    >
                      <FormikInput
                        label={'Ngày sinh *'}
                        editable={false}
                        textUnableColor={'#414042'}
                        name={'buyerBirthday'}
                        keyboardType={'number-pad'}
                      />
                    </ModalTimePicker> */}
                    <DateFill
                      value={formik.values.buyerBirthday}
                      onChange={(text, err) => {
                        this.confirmPicker(text, formik, err);
                      }}
                      label={'Ngày sinh *'}
                      maximumDate={moment().subtract(16, 'years').format('DD/MM/YYYY')}
                      errMaximum={ERROR_16_YEARS}
                      requireFill
                    />
                  </View>
                </View>
                <View style={styles.inputRow}>
                  <View style={{ width: '46%' }}>
                    <FormikInput
                      label={'CMND/CCCD/Hộ chiếu *'}
                      name={'buyerIdentity'}
                      maxLength={12}
                      onBlur={() => {
                        formik.setFieldValue('buyerIdentity', formik.values.buyerIdentity.toUpperCase());
                        this.onChangeBuyerIdentity(formik);
                      }}
                      autoUpperCase
                      keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                    />
                  </View>
                  <View style={{ width: '46%' }}>
                    <FormikInput
                      label={'Số điện thoại *'}
                      name={'buyerPhone'}
                      onChangeText={
                        (text) => formik.values.fillInfo && formik.setFieldValue('receiverPhone', text)
                      }
                      keyboardType={'number-pad'}
                      maxLength={12}
                    />
                  </View>
                </View>
                <FormikInput
                  label={'Email *'}
                  name={'buyerEmail'}
                  keyboardEmail
                  onChangeText={
                    (text) => formik.values.fillInfo && formik.setFieldValue('receiverEmail', text)
                  }
                />
                <View style={styles.inputRow}>
                  <View style={{ width: '46%' }}>
                    <FormikSelect
                      label={'Tỉnh/Thành phố *'}
                      name={'buyerProvince'}
                      openModal={() => this.openProvinceModal('buyer')}
                    />
                  </View>
                  <View style={{ width: '46%' }}>
                    <FormikSelect
                      label={`Quận/Huyện${formik.values.buyerProvince ? ' *' : ''}`}
                      name={'buyerDistrict'}
                      openModal={() => this.openDistrictModal('buyer')}
                      checkDisabled={!formik.values.buyerProvince}
                      hideIcon={!formik.values.buyerProvince}
                      baseColor={formik.values.buyerProvince ? colorText : '#8D8C8D'}
                    />
                  </View>
                </View>
                <FormikInput
                  label={'Địa chỉ (Số nhà, phường, xã) *'}
                  name={'buyerAddress'}
                  onChangeText={
                    (text) => formik.values.fillInfo && formik.setFieldValue('receiverAddress', text)
                  }
                />
              </View>
            ) : null}
            {formik.values.isCompany ? (
              <View>
                <FormikInput
                  label={'Tên doanh nghiệp *'}
                  name={'companyName'}
                  onBlur={() => {
                    formik.setFieldValue('companyName', formik.values.companyName.toUpperCase());
                  }}
                  autoUpperCase
                />
                <FormikInput
                  label={'Mã số thuế *'}
                  name={'companyTaxCode'}
                  maxLength={14}
                />
                <FormikInput
                  label={'Họ và tên người mua *'}
                  name={'buyerName'}
                  onChangeText={(text) => {
                    formik.values.fillInfo && formik.setFieldValue('receiverName', text.toUpperCase());
                  }}
                  onBlur={() => {
                    formik.setFieldValue('buyerName', formik.values.buyerName.toUpperCase());
                  }}
                  autoUpperCase
                />
                <View style={styles.inputRow}>
                  <View style={{ width: '46%' }}>
                    <FormikInput
                      label={'Số điện thoại *'}
                      name={'buyerPhone'}
                      onChangeText={
                        (text) => formik.values.fillInfo && formik.setFieldValue('receiverPhone', text)
                      }
                      keyboardType={'number-pad'}
                      maxLength={12}
                    />
                  </View>
                  <View style={{ width: '46%' }}>
                    <FormikInput
                      label={'Email *'}
                      name={'buyerEmail'}
                      keyboardEmail
                      onChangeText={
                        (text) => formik.values.fillInfo && formik.setFieldValue('receiverEmail', text)
                      }
                    />
                  </View>
                </View>
                <View style={styles.inputRow}>
                  <View style={{ width: '46%' }}>
                    <FormikSelect
                      label={'Tỉnh/Thành phố *'}
                      name={'buyerProvince'}
                      openModal={() => this.openProvinceModal('buyer')}
                    />
                  </View>
                  <View style={{ width: '46%' }}>
                    <FormikSelect
                      label={`Quận/Huyện${formik.values.buyerProvince ? ' *' : ''}`}
                      name={'buyerDistrict'}
                      openModal={() => this.openDistrictModal('buyer')}
                      checkDisabled={!formik.values.buyerProvince}
                      hideIcon={!formik.values.buyerProvince}
                      baseColor={formik.values.buyerProvince ? colorText : '#8D8C8D'}
                    />
                  </View>
                </View>
                <FormikInput
                  label={'Địa chỉ (Số nhà, phường, xã) *'}
                  name={'buyerAddress'}
                  onChangeText={
                    (text) => formik.values.fillInfo && formik.setFieldValue('receiverAddress', text)
                  }
                />

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 16,
                  }}
                  name="isVat"
                  onPress={() => this.onFillVAT(formik)}>
                  {
                    formik.values.isVat
                      ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                      : <IconBoxSvg width={20} height={20} color={NewColor} />
                  }
                  <Text style={{ marginLeft: 8 }}>Xuất hóa đơn VAT</Text>
                </TouchableOpacity>
                {
                  formik.values.isVat ? (
                      <View>
                          <FormikInput
                              label={'Tên doanh nghiệp *'}
                              name={'vatCompanyName'}
                              autoUpperCase
                              onBlur={() => {
                                formik.setFieldValue('vatCompanyName', formik.values.vatCompanyName.toUpperCase());
                              }}
                          />
                          <FormikInput
                              label={'Mã số thuế *'}
                              maxLength={14}
                              name={'vatCompanyTaxCode'} 
                          />
                          <FormikInput
                              label={'Email *'}
                              name={'vatCompanyEmail'}
                              keyboardEmail
                          />
                          <FormikInput
                              label={'Địa chỉ *'}
                              name={'vatCompanyAddress'}
                          />
                      </View>
                  ) : null
                }
              </View>
            ) : null}
            <View style={[{ flexDirection: 'row', marginTop: 26, alignItems: 'center' }]}>
              <IconInsurancerSvg width={15} height={15} />
              <Text style={styles.titleStyle}>
                Danh sách {chosenPackage?.typeInsure === 2 ? 'hộ gia đình' : 'người'} được bảo hiểm:
              </Text>
            </View>
            {
              chosenPackage?.typeInsure === 2 ? (
                <View style={{ marginTop: 16 }}>
                  <Text style={{ color: Color, fontSize: 14, fontStyle: 'italic' }}>
                    {
                      !formik.values.isCompany ? (
                        'Bao gồm Tất cả những người có tên trong SỔ HỘ KHẨU (tối đa 8 người) của Bên mua bảo hiểm tại thời điểm tham gia bảo hiểm và không thuộc đối tượng bị loại trừ'
                      ) : (
                        'Chỉ cần khai báo thông tin 1 người đại diện/1 hộ gia đình. Người được bảo hiểm gồm Tất cả những người có tên trong SỔ HỘ KHẨU (tối đa 8 người) của Bên mua bảo hiểm tại thời điểm tham gia bảo hiểm và không thuộc đối tượng bị loại trừ.'
                      )
                    }
                  </Text>
                </View>
              ) : null
            }
            {
              formik.values.isCompany ? (
                this.renderListInsuredCustomer(formik.values.isCompany, formik.values)
              ) : (
                chosenPackage?.typeInsure === 2 ? null : this.renderListInsuredCustomer(formik.values.isCompany, formik.values)
              )
            }
            {
              chosenPackage?.typeInsure === 1 && insuredCustomers.length > 2 ? (
                <View style={{ marginTop: 16 }}>
                  <Text style={{ color: Color, fontSize: 14, fontStyle: 'italic' }}>
                    <Text>Bạn có thể chọn mua bảo hiểm</Text>
                    <Text style={{ fontWeight: 'bold' }}>{' TAI NẠN HỘ GIA ĐÌNH '}</Text>
                    <Text>với mức phí ưu đãi hơn</Text>
                  </Text>
                </View>
              ) : null
            }
            <Promotion
              totalPrice={
                chosenPackage?.typeInsure === 2 && !formik.values.isCompany ?
                  (chosenPackage?.price || 0) :
                  (chosenPackage?.price || 0) * insuredCustomers.length
              }
              insurProductCode={insurProductCode}
            />
            {this.renderTotalFee(formik.values.isCompany)}
            {
              !nameApp.includes('EPTI') && !nameApp.includes('INSO') ? (
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 16,
                  paddingHorizontal: 12,
                  marginBottom: 28,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#D9D9D9',
                  borderStyle: 'dashed',
                }}>
                  <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>Điểm</Text>
                  <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>{roundNumber(valueCom) / 1000}</Text>
                </View>
              ) : null
            }
            {/* Chọn hình thức giao nhận */}
            <View style={styles.titleContainer}>
              <IconEnvelopeSvg width={15} height={15} />
              <Text style={styles.titleStyle}>Hình thức giao nhận</Text>
            </View>
            <View style={{ paddingLeft: 12, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', marginTop: 12 }}>
                <IconCheckboxBlurSvg width={20} height={20} />
                <Text style={{ marginLeft: 8 }}>
                  Giấy chứng nhận bảo hiểm điện tử gửi tới email của quý khách
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 12 }}>
                <TouchableOpacity
                  onPress={() => this.onSetReceiveType(formik)}>
                  {
                    formik.values.receiveType
                      ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                      : <IconBoxSvg width={20} height={20} color={NewColor} />
                  }
                </TouchableOpacity>
                <Text style={{ marginLeft: 8 }}>
                  Giấy chứng nhận bảo hiểm sẽ được gửi qua đường chuyển phát
                  nhanh (EMS) đến địa chỉ quý khách đã cung cấp ở trên sau khi
                  chúng tôi nhận được phí thanh toán
                </Text>
              </View>
            </View>
            {/* Form nhập thông tin địa chỉ nhận ấn chỉ bảo hiểm */}
            {
              formik.values.receiveType ? (
                <View style={{ marginTop: 16, marginBottom: 30 }}>
                  <Text style={[styles.titleStyle, { marginLeft: 0 }]}>
                    Địa chỉ nhận ấn chỉ bảo hiểm:
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 16,
                    }}
                  >
                    <TouchableOpacity
                      name="fillInfo"
                      onPress={() => this.onFill(formik)}
                    >
                      {
                        formik.values.fillInfo
                          ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                          : <IconBoxSvg width={20} height={20} color={NewColor} />
                      }
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 8 }}>Thông tin như trên</Text>
                  </View>
                  <FormikInput
                    label={'Họ và tên người nhận *'}
                    name={'receiverName'}
                    onChangeText={(text) => {
                      formik.values.fillInfo && formik.setFieldValue('fillInfo', false)
                    }}
                    onBlur={() => {
                      formik.setFieldValue('receiverName', formik.values.receiverName.toUpperCase());
                    }}
                    autoUpperCase
                  />
                  <View style={styles.inputRow}>
                    <View style={{ width: '46%' }}>
                      <FormikInput
                        label={'Số điện thoại *'}
                        name={'receiverPhone'}
                        keyboardType={'number-pad'}
                        maxLength={12}
                        onChangeText={() => formik.values.fillInfo && formik.setFieldValue('fillInfo', false)}
                      />
                    </View>
                    <View style={{ width: '46%' }}>
                      <FormikInput
                        label={'Email *'}
                        name={'receiverEmail'}
                        keyboardEmail
                        onChangeText={() => formik.values.fillInfo && formik.setFieldValue('fillInfo', false)}
                      />
                    </View>
                  </View>
                  <View style={styles.inputRow}>
                    <View style={{ width: '46%' }}>
                      <FormikSelect
                        label={'Tỉnh/Thành phố *'}
                        name={'receiverProvince'}
                        openModal={() => this.openProvinceModal('receiver')}
                      />
                    </View>
                    <View style={{ width: '46%' }}>
                      <FormikSelect
                        label={`Quận/Huyện${formik.values.receiverProvince ? ' *' : ''}`}
                        name={'receiverDistrict'}
                        openModal={() => this.openDistrictModal('receiver')}
                        checkDisabled={!formik.values.receiverProvince}
                        hideIcon={!formik.values.receiverProvince}
                        baseColor={formik.values.receiverProvince ? colorText : '#8D8C8D'}
                      />
                    </View>
                  </View>
                  <FormikInput
                    label={'Địa chỉ (Số nhà, phường, xã) *'}
                    name={'receiverAddress'}
                    onChangeText={() => formik.values.fillInfo && formik.setFieldValue('fillInfo', false)}
                  />
                </View>
              ) : null
            }
            <View style={{ marginVertical: 12 }}>
              <Button
                color={
                  !formik.isValid ||
                    (formik.values.errBuyerBirthday && !formik.values.isCompany) ||
                    !this.checkInsuredCustomers(formik.values.isCompany) ?
                    NewColorDisable : NewColor
                }
                label={'TIẾP TỤC'}
                onPress={formik.handleSubmit}
                disable={
                  !formik.isValid ||
                  (formik.values.errBuyerBirthday && !formik.values.isCompany)
                }
              />
            </View>
          </View>
        )}
      </Formik>
    );
  };

  setScrollViewRef = element => {
    this.listRef = element;
  };

  onNext = () => {
    const { insurProductCode } = this.props;
    this.listRef.scrollTo({ x: 0, y: 0, animated: true });
    Actions.AccidentPreviewInfo({ insurProductCode: insurProductCode });
  };

  render() {
    const headerZIndex = this.scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [999, 1001, 1002],
        extrapolate: 'clamp'
      });

    const { organizationCode } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{ flex: 1 }}>
          <Animated.View style={{ zIndex: headerZIndex }}>
            <ImageHeaderScroll code={'A2'} offset={this.scrollYAnimatedValue} />
          </Animated.View>
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2012
          }}>
            <TouchableOpacity
              onPress={() => Actions.pop()}
              style={{
                paddingHorizontal: 24,
                paddingTop: 43,
                zIndex: 2012
              }}>
              <FastImage
                style={{
                  height: 15,
                  width: (15 * 21) / 39,
                }}
                source={require('../../icons/ic_back.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={{ zIndex: 2011 }}>
            <HeaderScroll code={'A2'} offset={this.scrollYAnimatedValue} secondName={organizationCode === 'SVFC'} />
          </View>
          <ScrollView
            style={{ zIndex: 1000 }}
            contentContainerStyle={{
              paddingTop: HEADER_MAX_HEIGHT
            }}
            ref={this.setScrollViewRef}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }],
              { useNativeDriver: false }
            )}>
            <View style={styles.contentContainer}>
              <View style={[styles.titleContainer, { marginTop: 20 }]}>
                <IconBuyerSvg height={15} width={15} color={Color} />
                <Text style={styles.titleStyle}>
                  Thông tin bên mua bảo hiểm:
                </Text>
              </View>
              {this.renderFormInputInfomation()}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ctBack: {
    zIndex: 1002,
  },
  icBack: {
    height: 15,
    width: (15 * 21) / 39,
  },
  headerContent: {
    marginTop: isIPhoneX ? 15 : 5,
    padding: 24,
    position: 'absolute',
    left: 0,
    zIndex: 2012,
  },
  animatedHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleHeader: {
    paddingHorizontal: 8,
    marginTop: 100,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: '#ffff',
    paddingHorizontal: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colorTitle,
    marginLeft: 8,
  },
  insuredCutomerFormContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  formContainer: {
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    padding: 16,
    width: widthPercentageToDP('87'),
  },
  inputRow: {
    marginTop: -5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteTextStyle: {
    fontStyle: 'italic',
    color: Color,
    marginVertical: 12,
  },
});

import { connect } from 'react-redux';
import { getDistrict } from '../CarInsurance/actions/car_Buy';
import {
  saveBuyerInfomation,
  saveInsuredCustomerInfo,
  saveInsurancePrintAddress,
} from './actions/accident_buy';
import ModalBuyerType from '../TravelInsurance/components/ModalBuyerType';
import moment from 'moment';

const mapStateToProps = (state, ownProps) => {
  const idComSelected = state.selectCompany.idComSelected[ownProps.insurProductCode];
  return {
    idComSelected,
    chosenPackage: state.accidentBuy.chosenPackage,
    buyerInfomation: state.accidentBuy.buyerInfomation,
    insurancePrintsAddress: state.accidentBuy.insurancePrintsAddress,
    insuredCustomerInfo: state.accidentBuy.insuredCustomerInfo,
    promotionPrice: state.promotion.promotionPrice[ownProps.insurProductCode],
    orgCodeUser: state.userInfo.orgCodeUser,
    dataTokenInsur: state.insurance.tokenInsur['A1'],
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDistrict: id => dispatch(getDistrict(id)),
    saveBuyerInfomation: body => dispatch(saveBuyerInfomation(body)),
    saveInsuredCustomerInfo: body => dispatch(saveInsuredCustomerInfo(body)),
    saveInsurancePrintAddress: body =>
      dispatch(saveInsurancePrintAddress(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccidentBuyerInfo);
