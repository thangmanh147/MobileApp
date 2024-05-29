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
import Modal from 'react-native-modal';
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
  ERROR_18_YEARS,
  ERROR_70_YEARS,
} from '../../config/ErrorMessage';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import NameInput from './ListInsureCustomer/NameInput';
import PhoneInput from './ListInsureCustomer/PhoneInput';
import AddressInput from './ListInsureCustomer/AddressInput';
import BirthdayInput1 from './ListInsureCustomer/BirthdayInput1';
import IdentityInput from './ListInsureCustomer/IdentityInput';
import RelationSelect from './ListInsureCustomer/RelationSelect';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { Color, colorBackground, colorNote, colorPlaceholder, colorText, colorTitle, errValidColor, nameApp, NewColor, NewColorDisable, textDisable, TxtColor, URL } from '../../config/System';
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
  isFullName,
} from '../../components/Functions';
import ModalSex from '../FlightInsurance/component/ModalSex';
import Store from '../../services/Store';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, makeId, roundNumber } from '../../utils/Util';
import { saveLogContract, logEventContract } from '../../actions/logContract';
import DateFill from '../../components/dateTimeFill/DateFill';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconDownItemSvg from '../../config/images/icons/IconDownItemSvg';
import IconUpItemSvg from '../../config/images/icons/IconUpItemSvg';
import IconCheckboxBlurSvg from '../../config/images/icons/IconCheckboxBlurSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconEnvelopeSvg from '../../config/images/icons/IconEnvelopeSvg';
import IconInsurancerSvg from '../../config/images/icons/IconInsurancerSvg';
import IconPlusSvg from '../../config/images/icons/IconPlusSvg';
import IconCameraBlurSvg from '../../config/images/icons/IconCameraBlurSvg';
import IconOCRCameraSvg from '../../config/images/icons/IconOCRCameraSvg';

class AccidentBuyerInfo extends Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.state = {
      modalProvince: null,
      modalDistrict: null,
      modalBuyerType: null,
      modalGender: null,
      isBuyerModal: null,

      showModal: false,
      indexSelected: null,
      name: '',
      identityNumber: '',
      birthday: '',
      insuredCustomers: [{
        fullName: '',
        birthday: '',
        identityNumber: '',
        phone: '',
        address: '',
        relation: 'Nhân viên công ty',
        relationFamily: 'Bản thân',
        show: true,
      }],
      insurancePrintsAddress: {},
      buyerInfomation: {},
      timerCount: moment().valueOf(),
      valueCom: 0,
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
      nextProps.insuredCustomerInfo && nextProps.insuredCustomerInfo.length > 0 &&
      nextProps.insuredCustomerInfo !== prevState.insuredCustomers
    ) {
      update.insuredCustomers = nextProps.insuredCustomerInfo;
    }
    return update;
  }

  componentDidMount = () => {
    this.getValueCom();
    const { ocrImg, isCamera } = this.props;
    if (isCamera && ocrImg && ocrImg?.uri?.length > 0) {
      this.updateCustomer();
    }
  };

  updateCustomer = () => {
    const { ocrImg } = this.props;
    const { insuredCustomers } = this.state;
    const arr = insuredCustomers.map((item) => {
      if (item.relationFamily === 'Bản thân') {
        if (ocrImg?.infoOCR?.name?.trim()?.length > 0) {
          item.fullName = ocrImg?.infoOCR?.name?.normalize()?.toUpperCase();
        }
        if (ocrImg?.infoOCR?.cmndNum?.trim()?.length > 0) {
          item.identityNumber = ocrImg?.infoOCR?.cmndNum?.toUpperCase();
        }
        if (ocrImg?.infoOCR?.dob?.trim()?.length > 0) {
          item.birthday = ocrImg?.infoOCR?.dob;
        }
        if (ocrImg?.infoOCR?.address?.trim()?.length > 0) {
          item.address = ocrImg?.infoOCR?.address;
        }
        return item;
      }
      return item;
    });
    this.setState({ insuredCustomers: arr });
  };

  getValueCom = () => {
    if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
      const { chosenPackage, orgCodeUser } = this.props;
      const { insuredCustomers } = this.state;
      const totalPrice = (chosenPackage?.price || 0) * insuredCustomers.length;
      new Store().getSession(Const.TOKEN).then(token => {
        const dataToken = jwt_decode(token);
        let url;
        if (nameApp.includes('MAILINH') || nameApp.includes('YCHI') || orgCodeUser === 'INSO' || orgCodeUser === 'DLJSC') {
          url = `${URL}/api/commission/v2/commissions/value`;
        } else {
          url = `${URL}/api/commission/v3/commissions/saler`;
        }
          let body = {
            "channelId": dataToken?.channelId || '',
            "supplierId": dataToken?.organizationId || '',
            "agentId": dataToken?.organizationId || '',
            "userId": dataToken?.userId || '',
            "contractValue": totalPrice || 0,
            "product": "A3",
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
                Authorization: token,
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

  handlePressTakePhoto = () => {
    Actions.Camera24h();
  };

  confirmPicker = (date, formik, err) => {
    formik.setFieldValue('buyerBirthday', date);
    formik.setFieldValue('errBuyerBirthday', err);
    if (!err) {
      const { insuredCustomers } = this.state;
      const arr = insuredCustomers.map((item) => {
        if (item.relationFamily === 'Bản thân') {
          item.birthday = date;
          return item;
        }
        return item;
      });
      this.setState({ insuredCustomers: arr });
    }
  };

  // Thêm người được bảo hiểm
  onPressAdd = () => {
    const { insuredCustomers, name, birthday, identityNumber } = this.state;
    let arrayInsuredCustomers = insuredCustomers;
    arrayInsuredCustomers.push({
      fullName: '',
      birthday: '',
      identityNumber: '',
      phone: '',
      address: '',
      relation: 'Nhân viên công ty',
      relationFamily: '',
      show: true,
    });
    this.setState({
      insuredCustomers: arrayInsuredCustomers,
    }, () => this.getValueCom());
  };
  // chọn bên mua bảo hiểm
  setBuyerType = (formik, data) => {
    // const obj = {isCompany: data.id === 2};
    // formik.resetForm({
    //     values: Object.assign(formik.values, obj),
    // });
    formik.setFieldValue('isCompany', data.id === 2);
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
        const { insuredCustomers } = this.state;
        const arr = insuredCustomers.map((item) => {
          if (item.relationFamily === 'Bản thân') {
            item.address = `${formik.values.buyerAddress}, ${data._name}, ${formik.values.buyerProvince}`;
            return item;
          }
          return item;
        });
        await this.setState({ insuredCustomers: arr });
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

  onSetShowItem = (index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].show = !insuredCustomers[index].show;
    this.setState({ insuredCustomers: insuredCustomers });
  };

  // sửa tên người được bảo hiểm đã thêm
  onChangeName = (text, index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].fullName = text.toUpperCase();
    this.setState({ insuredCustomers: insuredCustomers });
  };
  onChangePhone = (text, index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].phone = text;
    this.setState({ insuredCustomers: insuredCustomers });
  };
  onChangeAddress = (text, index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].address = text;
    this.setState({ insuredCustomers: insuredCustomers });
  };
  // sửa số cmnd người được bảo hiểm đã thêm
  onChangeIdentityNumber = (text, index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].identityNumber = text.toUpperCase();
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
  setShowModal = (index) => {
    this.setState({ showModal: true, indexSelected: index });
  }
  // xóa người được bảo hiểm đã thêm
  removeCustomer = () => {
    const { insuredCustomers, indexSelected } = this.state;
    if (insuredCustomers.length === 1) {
      insuredCustomers[0].fullName = '';
      insuredCustomers[0].phone = '';
      insuredCustomers[0].address = '';
      insuredCustomers[0].birthday = '';
      insuredCustomers[0].identityNumber = '';
      insuredCustomers[0].relation = 'Nhân viên công ty';
      insuredCustomers[0].relationFamily = '';
      insuredCustomers[0].show = true;
      this.setState({ insuredCustomers: insuredCustomers, showModal: false }, () => this.getValueCom());
    } else {
      insuredCustomers.splice(indexSelected, 1);
      this.setState({ insuredCustomers: insuredCustomers, showModal: false }, () => this.getValueCom());
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
  onChangeBuyerName = (text) => {
    const { insuredCustomers } = this.state;
    const arr = insuredCustomers.map((item) => {
      if (item.relationFamily === 'Bản thân') {
        item.fullName = text.normalize().toUpperCase();
        return item;
      }
      return item;
    });
    this.setState({ insuredCustomers: arr });
  };
  onChangeBuyerPhone = (text) => {
    const { insuredCustomers } = this.state;
    const arr = insuredCustomers.map((item) => {
      if (item.relationFamily === 'Bản thân') {
        item.phone = text;
        return item;
      }
      return item;
    });
    this.setState({ insuredCustomers: arr });
  };
  onChangeBuyerAddress = (text, textProvince, textDistrict) => {
    const { insuredCustomers } = this.state;
    const arr = insuredCustomers.map((item) => {
      if (item.relationFamily === 'Bản thân') {
        item.address = `${text}, ${textDistrict}, ${textProvince}`;
        return item;
      }
      return item;
    });
    this.setState({ insuredCustomers: arr });
  };
  onChangeBuyerIdentity = (formik) => {
    const { insuredCustomers } = this.state;
    const text = formik.values.buyerIdentity;
    formik.setFieldValue('cardIdBuyer', text);
    const arr = insuredCustomers.map((item) => {
      if (item.relationFamily === 'Bản thân') {
        item.identityNumber = text.toUpperCase();
        return item;
      }
      return item;
    });
    this.setState({ insuredCustomers: arr });
  };
  checkInsuredCustomers = (isCompany) => {
    const { insuredCustomers } = this.state;
    const data = insuredCustomers.filter((item) =>
      item.identityNumber.trim().length === 0 ||
      (!item.errIdentityNumber && item.relationFamily !== 'Bản thân') ||
      item.fullName.trim().length === 0 ||
      !isFullName(item.fullName) ||
      (item.phone?.length > 0 && !isPhoneAccident(item.phone)) ||
      item.birthday.length === 0 ||
      item.errBirthday ||
      item.relation.length === 0 ||
      (!isCompany && item.relationFamily.length === 0)
    );
    if (data.length > 0) return false;
    return true;
  };
  onChangeRelation = (name, index, values) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].relationFamily = name;
    if (
      name !== 'Bản thân' &&
      insuredCustomers[index].identityNumber.length > 0 && insuredCustomers[index].identityNumber === values.buyerIdentity
    ) {
      insuredCustomers[index].identityNumber = '';
    } else if (name === 'Bản thân') {
      insuredCustomers[index].fullName = values.buyerName;
      insuredCustomers[index].phone = values.buyerPhone;
      insuredCustomers[index].address = `${values.buyerAddress}, ${values.buyerDistrict}, ${values.buyerProvince}`;
      insuredCustomers[index].birthday = values.buyerBirthday;
      insuredCustomers[index].identityNumber = values.buyerIdentity;
    }
    this.setState({ insuredCustomers: insuredCustomers });
  };
  // lưu thông tin vào redux
  storeInfomation = async values => {
    if (this.checkInsuredCustomers(values.isCompany)) {
      const { insuredCustomers, valueCom } = this.state;
      const { promotionPrice, saveLogContract, contractLog, chosenPackage } = this.props;
      const totalPrice = (chosenPackage?.price || 0) * insuredCustomers.length;
      const payPrice = promotionPrice?.price ? totalPrice - promotionPrice?.price : totalPrice;
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
        valueCom: valueCom
      };
      buyerInfomation.fullName = values.buyerName.normalize().toUpperCase();
      buyerInfomation.cardId = values.buyerIdentity.toUpperCase();
      printAddress.receiverName = values.receiverName.normalize().toUpperCase();
      await this.props.saveInsuredCustomerInfo(insuredCustomers);
      await this.props.saveBuyerInfomation(buyerInfomation);
      await this.props.saveInsurancePrintAddress(printAddress);
      contractLog.key = 'Preview24h';
      contractLog.buyerName = values.buyerName.normalize().toUpperCase();
      contractLog.buyerPhone = values.buyerPhone;
      contractLog.ContractAccident = insuredCustomers[0].fullName;
      contractLog.priceInsur = payPrice;
      contractLog.commission = valueCom;
      contractLog.buyerType = 1;
      saveLogContract('A3', contractLog);
      this.logging(insuredCustomers, values);
      this.onNext();
    } else {
      Alert.alert('Bạn cần điền đủ thông tin cho Danh sách người được bảo hiểm');
    }
  };

  logging = (insuredCustomers, values) => {
    const timeEnd = moment().valueOf();
    const count = moment(timeEnd).diff(moment(this.state.timerCount), 'milliseconds');
    this.props.logEventContract(
      nameApp.includes('YCHI') ? `${nameApp}_AN_SINH_Y_CHI_EVENT_THONG_TIN_BEN_MUA` : `${nameApp}_AN_SINH_MAI_LINH_EVENT_THONG_TIN_BEN_MUA`,
      {
        buyerInfo: values,
        insuredCustomers: insuredCustomers,
        timerCounting: count / 1000,
    }
    );
  }

  // validate form người mua bảo hiểm
  validation = Yup.object().shape({
    buyerName: Yup.string()
      .strict(false)
      .trim()
      .required(ERROR_NAME_REQUIRED)
      .test(
        'buyerName',
        ERROR_NAME_FORMAT,
        values => isFullName(values), // => validate tên người mua, check ký tự đặc biệt và chữ số
      ),
    buyerGender: Yup.string().required('Bạn phải chọn giới tính'),
    buyerBirthday: Yup.string()
      .strict(false)
      .trim()
      .required(ERROR_BIRTHDAY_REQUIRED),
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
    buyerIdentity: Yup.string() // vaidate cmnd/cccd
      .required(ERROR_IDENTITY_REQUIRED)
      .test(
        'buyerIdentity',
        ERROR_IDENTITY_FORMAT,
        values => isIdentity(values), // check validate ký tự đặc biệt
      ),
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
          values => isFullName(values),
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
  });

  // render danh sách người được bảo hiểm đã thêm
  renderListInsuredCustomer = (isCompany, values) => {
    const { insuredCustomers, showModal } = this.state;
    const dataCheck = insuredCustomers.filter((item) => item.relationFamily === 'Bản thân');
    return (
      <View style={{ marginTop: 12 }}>
        {insuredCustomers.map((item, index) => {
          const isEdit = isCompany || item.relationFamily !== 'Bản thân';
          return (
            <View style={{ marginTop: index === 0 ? 0 : 16 }}>
              <View style={styles.formContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: TxtColor }}>
                    {index + 1}. Người được bảo hiểm {index + 1}
                  </Text>
                  <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => this.onSetShowItem(index)}>
                    {
                      item.show ?
                        <IconUpItemSvg width={17} height={17} /> :
                        <IconDownItemSvg width={17} height={17} />
                    }
                  </TouchableOpacity>
                </View>
                {
                  item.show ? (
                    <>
                      <View style={{ marginTop: 5 }}>
                        <RelationSelect
                          value={item.relationFamily}
                          setRelation={(name) => this.onChangeRelation(name, index, values)}
                          selectedBuyer={dataCheck.length > 0}
                        />
                      </View>
                      <View style={{ marginTop: 5 }}>
                        <NameInput
                          value={item.fullName}
                          onChange={text => this.onChangeName(text, index)}
                          editable={isEdit}
                        />
                      </View>
                      <View style={styles.inputRow}>
                        <View style={{ width: '46%' }}>
                          <BirthdayInput1
                            value={item.birthday}
                            onChange={(date) => this.onChangeBirthday(date, index)}
                            onSetErr={(value) => this.onSetErrBirthday(value, index)}
                            editable={isEdit}
                            dateBuyer={values.buyerBirthday}
                            relationFamily={item.relationFamily}
                          />
                        </View>
                        <View style={{ width: '46%' }}>
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
                      <View style={{ marginTop: -15 }}>
                        <PhoneInput
                          value={item.phone}
                          onChange={text => this.onChangePhone(text, index)}
                          editable={isEdit}
                        />
                      </View>
                      <View style={{ marginTop: 0 }}>
                        <AddressInput
                          value={item.address}
                          onChange={text => this.onChangeAddress(text, index)}
                          editable={isEdit}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => this.setShowModal(index)}
                        style={{ alignItems: 'center', marginTop: 8 }}>
                        <FastImage
                          source={require('../../config/images/public/icons/ic_Subtract.png')}
                          style={{ height: 20, width: 20 }}
                          resizeMode={'contain'}
                        />
                      </TouchableOpacity>
                    </>
                  ) : null
                }
              </View>
            </View>
          );
        })}
        <Modal
          isVisible={showModal}
          style={{ margin: 0, justifyContent: 'flex-end' }}
          onBackButtonPress={() => this.setState({ showModal: false })}
          onBackdropPress={() => this.setState({ showModal: false })}
          animationInTiming={200}
          animationOutTiming={200}
          backdropTransitionInTiming={0}
          backdropTransitionOutTiming={0}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: 24,
              paddingHorizontal: 24,
              paddingBottom: 32,
              alignItems: 'center'
            }}>
            <NotifyRingSvg width={53} height={60} />
            <Text style={{ marginVertical: 36, fontSize: 14, color: TxtColor }}>
              Bạn muốn xóa người được bảo hiểm này?
            </Text>
            <TouchableOpacity
              onPress={this.removeCustomer}
              style={{
                width: '100%',
                paddingVertical: 16,
                backgroundColor: errValidColor,
                borderRadius: 10,
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                CÓ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ showModal: false, indexSelected: null })}
              style={{
                marginTop: 12,
                width: '100%',
                paddingVertical: 16,
                backgroundColor: 'white',
                borderRadius: 10,
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: Color }}>
                KHÔNG
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {
          values.buyerName?.length > 0 &&
            values.buyerPhone?.length > 0 &&
            values.buyerEmail?.length > 0 &&
            values.buyerGender?.length > 0 &&
            values.buyerBirthday?.length > 0 &&
            values.buyerIdentity?.length > 0 &&
            values.buyerProvince?.length > 0 &&
            values.buyerDistrict?.length > 0 &&
            values.buyerAddress?.length > 0 ? (
            <TouchableOpacity
              onPress={this.onPressAdd}
              style={{ alignItems: 'center', marginTop: 16 }}>
              <IconPlusSvg width={20} height={20} />
              <Text style={{ color: TxtColor, marginTop: 4, fontSize: 14 }}>Thêm người được bảo hiểm</Text>
            </TouchableOpacity>
          ) : null
        }
      </View>
    );
  };
  // render tổng lệ phí
  renderTotalFee = (isCompany) => {
    const { promotionPrice, chosenPackage } = this.props;
    const { insuredCustomers, valueCom } = this.state;
    const totalPrice = (chosenPackage?.price || 0) * insuredCustomers.length;
    const payPrice = promotionPrice?.price ? totalPrice - promotionPrice?.price : totalPrice;
    return (
      <View style={{ marginTop: 22 }}>
        <View
          style={{
            paddingVertical: 8,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: Color,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
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
            <View style={{ flex: 1 }}>
              <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>
                {nameApp.includes('YCHI') ? 'Bảo hiểm An Sinh Y Chi' : 'An Sinh Mai Linh'} <Text style={{ fontWeight: 'normal' }}>(Không chịu thuế VAT)</Text>
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
                {formatVND(chosenPackage?.price, '.')}VNĐ
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: TxtColor, fontSize: 14 }}>
                Số người
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: TxtColor, fontSize: 14, textAlign: 'right' }}>
                {insuredCustomers.length}
              </Text>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: textDisable, marginTop: 12 }} />
          {
            promotionPrice?.price ? (
              <>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: Color, fontSize: 14 }}>
                      Tổng phí
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
                      {formatVND(totalPrice, '.')}VNĐ
                    </Text>
                  </View>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: TxtColor, fontSize: 14 }}>
                      Khuyến mãi:
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: TxtColor, fontSize: 14, textAlign: 'right' }}>
                      -{formatVND(promotionPrice?.price, '.')}VNĐ
                    </Text>
                  </View>
                </View>
                <View style={{ height: 1, backgroundColor: textDisable, marginTop: 12 }} />
              </>
            ) : null
          }
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>
                Thanh toán
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colorNote, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
                {formatVND(payPrice, '.')}VNĐ
              </Text>
            </View>
          </View>
        </View>
        {
          (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) ? (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 16,
                paddingHorizontal: 12,
                marginTop: 24,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#D9D9D9',
                borderStyle: 'dashed',
            }}>
                <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>Điểm</Text>
                <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>{roundNumber(valueCom) / 1000}</Text>
            </View>
          ) : null
        }
      </View>
    );
  };
  // render form nhập thông tin
  renderFormInputInfomation = () => {
    const {
      chosenPackage,
      ocrImg,
      isCamera,
    } = this.props;
    const {
      modalProvince,
      modalDistrict,
      modalBuyerType,
      modalGender,
      insurancePrintsAddress,
      buyerInfomation,
      insuredCustomers,
      isBuyerModal,
    } = this.state;
    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);
    return (
      <Formik
        initialValues={{
          isCompany: false,
          receiveType: insurancePrintsAddress?.receiveType === 'EMS',
          fillInfo: insurancePrintsAddress?.autoFillInfo || false,
          receiverName: insurancePrintsAddress?.receiverName || '',
          receiverPhone: insurancePrintsAddress?.receiverPhone || '',
          receiverEmail: insurancePrintsAddress?.receiverEmail || '',
          receiverProvince: insurancePrintsAddress?.receiverProvince || '',
          receiverProvinceId: insurancePrintsAddress?.receiverProvinceId || 0,
          receiverDistrictId: insurancePrintsAddress?.receiverDistrictId || 0,
          receiverDistrict: insurancePrintsAddress?.receiverDistrict || '',
          receiverAddress: insurancePrintsAddress?.receiverAddress || '',
          buyerAddress: (isCamera ? ocrImg?.infoOCR?.address : buyerInfomation?.address) || '',
          buyerEmail: buyerInfomation?.email || '',
          buyerName: (isCamera ? ocrImg?.infoOCR?.name : buyerInfomation?.fullName) || '',
          buyerGender: buyerInfomation?.gender || '',
          buyerIdentity: (isCamera ? ocrImg?.infoOCR?.cmndNum : buyerInfomation?.cardId) || '',
          cardIdBuyer:  buyerInfomation?.cardId || '',
          buyerPhone: buyerInfomation?.phone || '',
          buyerBirthday: (isCamera ? ocrImg?.infoOCR?.dob : buyerInfomation?.birthday) || '',
          provinceId: buyerInfomation?.provinceId || 0,
          buyerProvince: buyerInfomation?.cityName || '',
          districtId: buyerInfomation?.districtId || 0,
          buyerDistrict: buyerInfomation?.districtName || '',
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
            {
              ocrImg ?
                <View style={{marginBottom: 8}}>
                  <View style={{ marginTop: 24, alignItems: 'center', justifyContent: 'center' }}>
                      <FastImage source={{ uri: ocrImg.uri }} style={{
                          width: '100%',
                          borderRadius: 15,
                          height: heightPercentageToDP('30'),
                      }} />
                      <TouchableOpacity onPress={this.handlePressTakePhoto} style={{ position: 'absolute' }}>
                          <IconCameraBlurSvg width={64} height={64} />
                      </TouchableOpacity>
                  </View>
                  {
                    ocrImg?.infoOCR?.cmndNum?.trim()?.length === 0 &&
                    ocrImg?.infoOCR?.name?.trim()?.length === 0 &&
                    ocrImg?.infoOCR?.address?.trim()?.length === 0 &&
                    ocrImg?.infoOCR?.dob?.trim()?.length === 0 ? (
                      <View style={{ paddingTop: 16 }}>
                          <Text style={{ fontSize: 14, color: errValidColor }}>
                            Không nhận diện được ảnh, vui lòng chụp lại ảnh hoặc điền thông tin bên dưới
                          </Text>
                      </View>
                    ) : null
                  }
                </View>
                :
                <View>
                    <TouchableOpacity style={{ alignItems: 'center', paddingTop: 24, paddingBottom: 20 }}
                                      onPress={this.handlePressTakePhoto}>
                        <IconOCRCameraSvg width={64} height={64} style={{marginBottom: 4}} />
                        <Text style={{
                            color: TxtColor,
                            fontSize: 14,
                            textAlign: 'center',
                        }}>Chụp CMND/CCCD/Hộ chiếu để hoàn tất thông tin nhanh hơn</Text>
                    </TouchableOpacity>
                    <View style={{
                        width: widthPercentageToDP('100'),
                        height: 8,
                        backgroundColor: '#F6F5F6',
                        marginHorizontal: -24,
                    }} />
                    <View style={{ paddingTop: 20, alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: colorTitle }}>hoặc điền thông tin vào bảng dưới đây</Text>
                    </View>
                </View>
            }
            <View>
              <FormikInput
                label={'Họ và tên người mua *'}
                name={'buyerName'}
                onChangeText={(text) => {
                  formik.values.fillInfo && formik.setFieldValue('receiverName', text.toUpperCase());
                }}
                onBlur={() => {
                  formik.setFieldValue('buyerName', formik.values.buyerName.toUpperCase());
                  this.onChangeBuyerName(formik.values.buyerName);
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
                    onBlur={() => {
                      this.onChangeBuyerPhone(formik.values.buyerPhone);
                    }}
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
                <View style={{ width: '46%', marginTop: 5 }}>
                  <FormikSelect
                    label={'Giới tính *'}
                    name={'buyerGender'}
                    openModal={() => this.setState({ modalGender: true })}
                  />
                </View>
                <View style={{ width: '46%' }}>
                  {/* <ModalTimePicker
                    dateDefault={new Date(moment().subtract(18, 'years').valueOf())}
                    maximumDate={new Date(moment().subtract(18, 'years').valueOf())}
                    minimumDate={new Date(moment().subtract(70, 'years').valueOf())}
                    onPicker={(date) => this.confirmPicker(date, formik, false)}
                  >
                    <FormikInput
                      label={'Ngày sinh *'}
                      editable={false}
                      textUnableColor={TxtColor}
                      name={'buyerBirthday'}
                      keyboardType={'number-pad'}
                      placeholder={'dd/mm/yyyy'}
                      placeholderTextColor={colorPlaceholder}
                    />
                  </ModalTimePicker> */}
                  <DateFill
                      value={formik.values.buyerBirthday}
                      onChange={(text, err) => {
                        this.confirmPicker(text, formik, err);
                      }}
                      label={'Ngày sinh *'}
                      maximumDate={moment().subtract(18, 'years').format('DD/MM/YYYY')}
                      errMaximum={ERROR_18_YEARS}
                      minimumDate={moment().subtract(70, 'years').format('DD/MM/YYYY')}
                      errMinimum={ERROR_70_YEARS}
                      requireFill
                  />
                </View>
              </View>
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
              <View style={styles.inputRow}>
                <View style={{ width: '46%', marginTop: 5 }}>
                  <FormikSelect
                    label={'Tỉnh/Thành phố *'}
                    name={'buyerProvince'}
                    openModal={() => this.openProvinceModal('buyer')}
                  />
                </View>
                <View style={{ width: '46%', marginTop: 5 }}>
                  <FormikSelect
                    label={`Quận/Huyện${formik.values.buyerProvince ? ' *' : ''}`}
                    name={'buyerDistrict'}
                    openModal={() => this.openDistrictModal('buyer')}
                    checkDisabled={!formik.values.buyerProvince}
                    hideIcon={!formik.values.buyerProvince}
                    baseColor={formik.values.buyerProvince ? colorText : textDisable}
                  />
                </View>
              </View>
              <View style={{ marginTop: 5 }}>
                <FormikInput
                  label={'Địa chỉ (Số nhà, phường, xã) *'}
                  name={'buyerAddress'}
                  onChangeText={
                    (text) => formik.values.fillInfo && formik.setFieldValue('receiverAddress', text)
                  }
                  onBlur={() => {
                    this.onChangeBuyerAddress(formik.values.buyerAddress, formik.values.buyerProvince, formik.values.buyerDistrict);
                  }}
                />
              </View>
            </View>
            <View style={[{ flexDirection: 'row', marginTop: 16, alignItems: 'center' }]}>
              <IconInsurancerSvg width={15} height={15} />
              <Text style={styles.titleStyle}>
                Danh sách người được bảo hiểm
              </Text>
            </View>
            {
              this.renderListInsuredCustomer(formik.values.isCompany, formik.values)
            }
            <Promotion
              totalPrice={(chosenPackage?.price || 0) * insuredCustomers.length}
              insurProductCode={'A3'}
            />
            {this.renderTotalFee(formik.values.isCompany)}
            {/* Chọn hình thức giao nhận */}
            <View style={styles.titleContainer}>
              <IconEnvelopeSvg width={15} height={15} />
              <Text style={styles.titleStyle}>Hình thức giao nhận</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', marginTop: 12 }}>
                <IconCheckboxBlurSvg width={20} height={20} />
                <Text style={{ marginLeft: 8, flex: 1, fontSize: 14, color: TxtColor }}>
                  Giấy chứng nhận bảo hiểm điện tử gửi tới email của quý khách
                </Text>
              </View>
              {/* <View style={{ flexDirection: 'row', marginTop: 12 }}>
                <TouchableOpacity
                  onPress={() => this.onSetReceiveType(formik)}>
                  {
                      formik.values.receiveType
                        ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                        : <IconBoxSvg width={20} height={20} color={NewColor} />
                    }
                </TouchableOpacity>
                <Text style={{ marginLeft: 8, flex: 1, fontSize: 14, color: TxtColor }}>
                  Giấy chứng nhận bảo hiểm sẽ được người bán gửi tới quý khách theo địa chỉ cung cấp dưới đây sau khi được thanh toán đầy đủ
                </Text>
              </View> */}
            </View>
            {/* Form nhập thông tin địa chỉ nhận ấn chỉ bảo hiểm */}
            {
              formik.values.receiveType ? (
                <View style={{ marginTop: 16 }}>
                  <Text style={[styles.titleStyle, { marginLeft: 0 }]}>
                    Địa chỉ nhận ấn chỉ bảo hiểm
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 12,
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
                    <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor }}>Thông tin như trên</Text>
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
                        multiline
                        onChangeText={() => formik.values.fillInfo && formik.setFieldValue('fillInfo', false)}
                      />
                    </View>
                  </View>
                  <View style={styles.inputRow}>
                    <View style={{ width: '46%', marginTop: 5 }}>
                      <FormikSelect
                        label={'Tỉnh/Thành phố *'}
                        name={'receiverProvince'}
                        openModal={() => this.openProvinceModal('receiver')}
                      />
                    </View>
                    <View style={{ width: '46%', marginTop: 5 }}>
                      <FormikSelect
                        label={`Quận/Huyện${formik.values.receiverProvince ? ' *' : ''}`}
                        name={'receiverDistrict'}
                        openModal={() => this.openDistrictModal('receiver')}
                        checkDisabled={!formik.values.receiverProvince}
                        hideIcon={!formik.values.receiverProvince}
                        baseColor={formik.values.receiverProvince ? colorText : textDisable}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <FormikInput
                      label={'Địa chỉ (Số nhà, phường, xã) *'}
                      name={'receiverAddress'}
                      onChangeText={() => formik.values.fillInfo && formik.setFieldValue('fillInfo', false)}
                    />
                  </View>
                </View>
              ) : null
            }
            <View style={{ marginTop: 24, marginBottom: 12 }}>
              <Button
                color={
                  formik.isValid &&
                  !formik.values.errBuyerBirthday &&
                  this.checkInsuredCustomers(formik.values.isCompany) ?
                  NewColor : NewColorDisable
                }
                label={'TIẾP TỤC'}
                onPress={formik.handleSubmit}
                disable={
                  !formik.isValid ||
                  formik.values.errBuyerBirthday
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
    this.listRef.scrollTo({ x: 0, y: 0, animated: true });
    Actions.Preview24h();
  };

  render() {
    const headerZIndex = this.scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [999, 1001, 1002],
            extrapolate: 'clamp'
        });

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{ flex: 1 }}>
          <Animated.View style={{zIndex: headerZIndex}}>
              <ImageHeaderScroll code={'A3'} offset={this.scrollYAnimatedValue} />
          </Animated.View>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2012
            }}>
                <TouchableOpacity
                    onPress={() => Actions.Package24h()}
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
          <View style={{zIndex: 2011}}>
              <HeaderScroll code={'A3'} offset={this.scrollYAnimatedValue} />
          </View>
          <ScrollView
            style={{ zIndex: 1000 }}
            contentContainerStyle={{
              paddingTop: HEADER_MAX_HEIGHT
            }}
            ref={this.setScrollViewRef}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
            )}>
            <View style={styles.contentContainer}>
              <View style={styles.titleContainer}>
                <IconBuyerSvg height={15} width={15} color={Color} />
                <Text style={styles.titleStyle}>
                  Thông tin bên mua bảo hiểm
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
    marginTop: 24,
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
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    paddingVertical: 16,
    paddingHorizontal: 12,
    width: widthPercentageToDP('87'),
  },
  inputRow: {
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
  return {
    chosenPackage: state.insurance24h.chosenPackage,
    buyerInfomation: state.insurance24h.buyerInfomation,
    insurancePrintsAddress: state.insurance24h.insurancePrintsAddress,
    insuredCustomerInfo: state.insurance24h.insuredCustomerInfo,
    ocrImg: state.insurance24h.ocrImg,
    promotionPrice: state.promotion.promotionPrice['A3'],
    contractLog: state.logContract.logContract['A3'] || {},
    orgCodeUser: state.userInfo.orgCodeUser,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDistrict: id => dispatch(getDistrict(id)),
    saveBuyerInfomation: body => dispatch(saveBuyerInfomation(body)),
    saveInsuredCustomerInfo: body => dispatch(saveInsuredCustomerInfo(body)),
    saveInsurancePrintAddress: body =>
      dispatch(saveInsurancePrintAddress(body)),
    saveLogContract: (id, data) => dispatch(saveLogContract(id, data)),
    logEventContract: (name, data) => dispatch(logEventContract(name, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccidentBuyerInfo);
