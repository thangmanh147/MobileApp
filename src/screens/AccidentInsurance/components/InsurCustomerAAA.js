import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform, Animated,
  ScrollView,
} from 'react-native';
import {
  ERROR_ADDRESS_REQUIRED,
  ERROR_BIRTHDAY_REQUIRED,
  ERROR_EMAIL_FORMAT,
  ERROR_EMAIL_REQUIRED,
  ERROR_IDENTITY_FORMAT,
  ERROR_IDENTITY_REQUIRED,
  ERROR_NAME_FORMAT,
  ERROR_NAME_REQUIRED,
  ERROR_PHONE_FORMAT,
  ERROR_PHONE_REQUIRED,
  ERROR_PROVINCE_REQUIRED,
  ERROR_16_YEARS,
  ERROR_18_YEARS,
  ERROR_6_WEEKS,
  ERROR_69_YEARS,
} from '../../../config/ErrorMessage';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import {
  widthPercentageToDP,
} from '../../../config/ConfigResponsive';
import { Color, colorBackground, colorText, colorTitle, errValidColor, nameApp, NewColor, NewColorDisable, TxtColor, URL } from '../../../config/System';
import Input from '../../CarInsurance/components/Input';
import { Formik } from 'formik';
import { handleTextInput } from 'react-native-formik';
import * as Yup from 'yup';
import Button from '../../../components/buy/Button';
import InputSelect from '../../../components/buy/InputSelect';
import ModalRelation from '../components/ModalRelation';
import ModalCareer from '../components/ModalCareer';
import ModalProvince from '../../CarInsurance/components/ModalProvince';
import ModalDistrict from '../../CarInsurance/components/ModalDistrict';
import {
  isPhoneAccident,
  isIdentityCusTravel,
  isEmailAccident,
  formatVND,
  isFullNameExpand
} from '../../../components/Functions';
import ModalSex from '../../FlightInsurance/component/ModalSex';
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import jwt_decode from "jwt-decode";
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX, roundNumber } from '../../../utils/Util';
import HeaderScroll from '../../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../../components/header/ImageHeaderScroll';
import DateFill from '../../../components/dateTimeFill/DateFill';
import IconBuyerSvg from '../../../config/images/icons/IconBuyerSvg';
import IconCheckedBoxSvg from '../../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../../config/images/icons/IconBoxSvg';
import IconInsurancerSvg from '../../../config/images/icons/IconInsurancerSvg';

class InsurCustomer extends Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.state = {
      modalProvince: null,
      modalDistrict: null,
      modalGender: null,
      modalCareer: null,
      modalRelation: null,
      isCustomer: null,
      valueCom: 0
    };
  }

  componentDidMount = () => {
    this.getValueCom();
  };

  getValueCom = () => {
    const { orgCodeUser, idComSelected, dataTokenInsur } = this.props;
    const { chosenPackage } = this.props;
    if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
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
          "contractValue": chosenPackage?.price || 0,
          "product": 'A1',
          "B": `${chosenPackage?.price || 0}`,
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
              this.setState({ valueCom: res?.data?.commission || 0 });
            }
          })
          .catch((error) => {
            console.log(error)
          })
      });
    }
  };

  confirmPicker = (date, formik, err) => {
    formik.setFieldValue('customerBirthday', date);
    formik.setFieldValue('errCustomerBirthday', err);
    if (formik.values.isNotSame && date && !err) {
      if (moment(moment().subtract(6, 'weeks').format('DD/MM/YYYY'), 'DD/MM/YYYY').diff(moment(date, 'DD/MM/YYYY'), 'days') < 0) {
        formik.setFieldValue('errBirthdayMax', ERROR_6_WEEKS);
      } else {
        formik.setFieldValue('errBirthdayMax', '');
      }
    } else if (!formik.values.isNotSame && date && !err) {
      if (moment(moment().subtract(18, 'years').format('DD/MM/YYYY'), 'DD/MM/YYYY').diff(moment(date, 'DD/MM/YYYY'), 'days') < 0) {
        formik.setFieldValue('errBirthdayMax', ERROR_18_YEARS);
      } else {
        formik.setFieldValue('errBirthdayMax', '');
      }
    } else {
      formik.setFieldValue('errBirthdayMax', '');
    }
  };

  // chọn tỉnh/tp
  setProvince = async (data, formik) => {
    if (this.state.isCustomer) {
      if (formik.values.customerProvince !== data._name) {
        await formik.setFieldValue('provinceId', data.id);
        await formik.setFieldValue('customerProvince', data._name);
        await formik.setFieldValue('customerDistrict', '');
      }
    } else {
      if (formik.values.requestProvince !== data._name) {
        await formik.setFieldValue('requestProvinceId', data.id);
        await formik.setFieldValue('requestProvince', data._name);
        await formik.setFieldValue('requestDistrict', '');
      }
    }
    await this.props.getDistrict(data.id);
  };
  // chọn quận/huyện
  setDistrict = async (data, formik) => {
    if (this.state.isCustomer) {
      if (formik.values.customerDistrict !== data._name) {
        await formik.setFieldValue('districtId', data.id);
        await formik.setFieldValue('customerDistrict', data._name);
      }
    } else {
      if (formik.values.requestDistrict !== data._name) {
        await formik.setFieldValue('requestDistrictId', data.id);
        await formik.setFieldValue('requestDistrict', data._name);
      }
    }
  };
  // mở modal tỉnh/tp
  openProvinceModal = item => {
    if (item === 'customer') {
      this.setState({
        isCustomer: true,
        modalProvince: true,
      });
    } else {
      this.setState({
        isCustomer: false,
        modalProvince: true,
      });
    }
  };
  // mở modal quận/huyện
  openDistrictModal = item => {
    if (item === 'customer') {
      this.setState({
        isCustomer: true,
        modalDistrict: true,
      });
    } else {
      this.setState({
        isCustomer: false,
        modalDistrict: true,
      });
    }
  };
  // chọn giới tính
  setGender = (formik, data) => {
    formik.setFieldValue('customerGender', data.name);
  };

  setCareer = (formik, data) => {
    formik.setFieldValue('customerCareer', data.name);
    formik.setFieldValue('customerCareerId', data.id);
  };
  setRelation = (formik, data) => {
    formik.setFieldValue('requestRelation', data.name);
    formik.setFieldValue('requestRelationId', data.id);
  };
  // lưu thông tin vào redux
  storeInfomation = async values => {
    const { valueCom } = this.state;
    let body = {
      info: values,
      valueCom: valueCom
    };
    body.info.customerName = values.customerName?.normalize()?.toUpperCase();
    body.info.customerEmail = values.customerEmail?.trim();
    body.info.customerIdentity = values.customerIdentity?.toUpperCase();
    body.info.requestName = values.requestName?.normalize()?.toUpperCase();
    body.info.requestEmail = values.requestEmail?.trim();
    body.info.requestIdentity = values.requestIdentity?.toUpperCase();
    await this.props.saveCustomerAAA(body);
    this.onNext();
  };

  validation = Yup.object().shape({
    customerName: Yup.string()
      .strict(false)
      .trim()
      .test(
        'customerName',
        ERROR_NAME_FORMAT,
        values => isFullNameExpand(values),
      )
      .required(ERROR_NAME_REQUIRED),
    customerGender: Yup.string().required('Bạn phải chọn giới tính'),
    customerCareer: Yup.string().required('Bạn phải chọn ngành nghề'),
    customerCareerDesc: Yup.string().when('customerCareerId', {
      is: '0016',
      then: Yup.string().required('Không được bỏ trống'),
    }),
    customerBirthday: Yup.string()
      .strict(false)
      .trim()
      .required(ERROR_BIRTHDAY_REQUIRED),
    customerAddress: Yup.string() // validate địa chỉ người mua
      .strict(false)
      .trim()
      .required(ERROR_ADDRESS_REQUIRED),
    customerEmail: Yup.string() // validate email người mua
      .strict(false)
      .trim()
      .required(ERROR_EMAIL_REQUIRED)
      .test('customerEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)), // check validate định dạng email bao gồm @ và domain
    customerPhone: Yup.string() // validate số điện thoại người mua
      .strict(false)
      .required(ERROR_PHONE_REQUIRED)
      .test('customerPhone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)), // check validate định dạng sđt
    customerIdentity: Yup.string() // vaidate cmnd/cccd
      .required(ERROR_IDENTITY_REQUIRED)
      .test(
        'customerIdentity',
        ERROR_IDENTITY_FORMAT,
        values => isIdentityCusTravel(values), // check validate ký tự đặc biệt
      ),
    customerProvince: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp
    customerDistrict: Yup.string().required('Chưa chọn quận/huyện'), // validate quận/huyện
    requestName: Yup.string().when('isNotSame', {
      is: true,
      then: Yup.string()
        .strict(false)
        .trim()
        .test(
          'requestName',
          ERROR_NAME_FORMAT,
          values => isFullNameExpand(values),
        )
        .required(ERROR_NAME_REQUIRED),
    }),
    requestBirthday: Yup.string().when('isNotSame', {
      is: true,
      then: Yup.string()
        .strict(false)
        .trim()
        .required(ERROR_BIRTHDAY_REQUIRED),
    }),
    requestIdentity: Yup.string().when('isNotSame', {
      is: true,
      then: Yup.string()
        .required(ERROR_IDENTITY_REQUIRED)
        .test(
          'requestIdentity',
          ERROR_IDENTITY_FORMAT,
          values => isIdentityCusTravel(values),
        ),
    }),
    requestPhone: Yup.string().when('isNotSame', {
      is: true,
      then: Yup.string()
        .strict(false)
        .required(ERROR_PHONE_REQUIRED)
        .test('requestPhone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)),
    }),
    requestEmail: Yup.string().when('isNotSame', {
      is: true,
      then: Yup.string()
        .strict(false)
        .trim()
        .required(ERROR_EMAIL_REQUIRED)
        .test('requestEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)),
    }),
    requestProvince: Yup.string().when('isNotSame', {
      is: true,
      then: Yup.string().required(ERROR_PROVINCE_REQUIRED),
    }),
    requestDistrict: Yup.string().when('isNotSame', {
      is: true,
      then: Yup.string().required('Chưa chọn quận/huyện'),
    }),
    requestAddress: Yup.string().when('isNotSame', {
      is: true,
      then: Yup.string()
        .strict(false)
        .trim()
        .required(ERROR_ADDRESS_REQUIRED),
    }),
    requestRelation: Yup.string().when('isNotSame', {
      is: true,
      then: Yup.string().required('Chưa chọn mối quan hệ'),
    }),
  });

  onSelect = async (formik) => {
    if (!formik.values.isNotSame && formik.values.customerBirthday && !formik.values.errCustomerBirthday) {
      if (moment(moment().subtract(6, 'weeks').format('DD/MM/YYYY'), 'DD/MM/YYYY').diff(moment(formik.values.customerBirthday, 'DD/MM/YYYY'), 'days') < 0) {
        await formik.setFieldValue('errBirthdayMax', ERROR_6_WEEKS);
      } else {
        await formik.setFieldValue('errBirthdayMax', '');
      }
    } else if (formik.values.isNotSame && formik.values.customerBirthday && !formik.values.errCustomerBirthday) {
      if (moment(moment().subtract(18, 'years').format('DD/MM/YYYY'), 'DD/MM/YYYY').diff(moment(formik.values.customerBirthday, 'DD/MM/YYYY'), 'days') < 0) {
        await formik.setFieldValue('errBirthdayMax', ERROR_18_YEARS);
      } else {
        await formik.setFieldValue('errBirthdayMax', '');
      }
    }
    await formik.setFieldValue('isNotSame', !formik.values.isNotSame);
  }

  // render tổng lệ phí
  renderTotalFee = () => {
    const { chosenPackage } = this.props;
    const totalPrice = chosenPackage?.price || 0;
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
              Phí bảo hiểm/người
            </Text>
            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>
              {formatVND(chosenPackage?.price, '.')}VNĐ
            </Text>
          </View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 12 }}>
            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: '400' }}>
              Số người được bảo hiểm
            </Text>
            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: '400' }}>
              1
            </Text>
          </View>
          <View style={{ height: 1, backgroundColor: Color, marginTop: 16 }} />
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 16 }}>
            <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>
              Thanh toán (miễn VAT):
            </Text>
            <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>
              {formatVND(totalPrice, '.')}VNĐ
            </Text>
          </View>
        </View>
      </View>
    );
  };
  // render form nhập thông tin
  renderFormInputInfomation = () => {
    const { customerAAA } = this.props;
    const {
      modalProvince,
      modalDistrict,
      modalGender,
      modalCareer,
      modalRelation,
      isCustomer,
      valueCom
    } = this.state;
    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);
    return (
      <Formik
        initialValues={{
          isNotSame: customerAAA?.info?.isNotSame,
          customerAddress: customerAAA?.info?.customerAddress || '',
          customerEmail: customerAAA?.info?.customerEmail || '',
          customerName: customerAAA?.info?.customerName || '',
          customerGender: customerAAA?.info?.customerGender || '',
          customerCareer: customerAAA?.info?.customerCareer || '',
          customerCareerId: customerAAA?.info?.customerCareerId || '',
          customerCareerDesc: customerAAA?.info?.customerCareerDesc || '',
          customerIdentity: customerAAA?.info?.customerIdentity || '',
          customerPhone: customerAAA?.info?.customerPhone || '',
          customerBirthday: customerAAA?.info?.customerBirthday || '',
          errCustomerBirthday: customerAAA?.info?.errCustomerBirthday || '',
          errBirthdayMax: customerAAA?.info?.errBirthdayMax || '',
          provinceId: customerAAA?.info?.provinceId || 0,
          customerProvince: customerAAA?.info?.customerProvince || '',
          districtId: customerAAA?.info?.districtId || 0,
          customerDistrict: customerAAA?.info?.customerDistrict || '',
          requestAddress: customerAAA?.info?.requestAddress || '',
          requestEmail: customerAAA?.info?.requestEmail || '',
          requestName: customerAAA?.info?.requestName || '',
          requestIdentity: customerAAA?.info?.requestIdentity || '',
          requestPhone: customerAAA?.info?.requestPhone || '',
          requestBirthday: customerAAA?.info?.requestBirthday || '',
          errRequestBirthday: customerAAA?.info?.errRequestBirthday || '',
          requestProvinceId: customerAAA?.info?.requestProvinceId || 0,
          requestProvince: customerAAA?.info?.requestProvince || '',
          requestDistrictId: customerAAA?.info?.requestDistrictId || 0,
          requestDistrict: customerAAA?.info?.requestDistrict || '',
          requestRelation: customerAAA?.info?.requestRelation || '',
          requestRelationId: customerAAA?.info?.requestRelationId || '',
        }}
        onSubmit={values => this.storeInfomation(values)}
        validationSchema={this.validation}
        isInitialValid={customerAAA?.info?.fullName?.length > 0}>
        {formik => (
          <View>
            <ModalProvince
              open={modalProvince}
              onClosed={() => this.setState({ modalProvince: null })}
              setProvince={data => this.setProvince(data, formik)}
              onOpened={() => this.setState({ modalProvince: true })}
              nameSelected={isCustomer ? formik.values.customerProvince : formik.values.requestProvince}
            />
            <ModalDistrict
              open={modalDistrict}
              onClosed={() => this.setState({ modalDistrict: null })}
              setDistrict={data => this.setDistrict(data, formik)}
              onOpened={() => this.setState({ modalDistrict: true })}
              nameSelected={isCustomer ? formik.values.customerDistrict : formik.values.requestDistrict}
            />
            <ModalSex
              open={modalGender}
              onClosed={() => this.setState({ modalGender: null })}
              setSex={data => this.setGender(formik, data)}
              onOpened={() => this.setState({ modalGender: true })}
              nameSelected={formik.values.customerGender}
            />
            <ModalCareer
              open={modalCareer}
              onClosed={() => this.setState({ modalCareer: null })}
              setData={data => this.setCareer(formik, data)}
              onOpened={() => this.setState({ modalCareer: true })}
              nameSelected={formik.values.customerCareer}
            />
            <ModalRelation
              open={modalRelation}
              onClosed={() => this.setState({ modalRelation: null })}
              setData={data => this.setRelation(formik, data)}
              onOpened={() => this.setState({ modalRelation: true })}
              nameSelected={formik.values.requestRelation}
            />
            <View>
              <FormikInput
                label={'Họ và tên *'}
                name={'customerName'}
                onBlur={() => {
                  formik.setFieldValue('customerName', formik.values.customerName.toUpperCase());
                }}
                autoUpperCase
              />
              <View style={styles.inputRow}>
                <View style={{ width: '46%', marginTop: 5 }}>
                  <FormikSelect
                    label={'Giới tính *'}
                    name={'customerGender'}
                    openModal={() => this.setState({ modalGender: true })}
                  />
                </View>
                <View style={{ width: '46%' }}>
                  <DateFill
                    value={formik.values.customerBirthday}
                    onChange={(text, err) => {
                      this.confirmPicker(text, formik, err);
                    }}
                    label={'Ngày sinh *'}
                    // maximumDate={
                    //   !formik.values.isNotSame ?
                    //     moment().subtract(18, 'years').format('DD/MM/YYYY') :
                    //     moment().subtract(6, 'weeks').format('DD/MM/YYYY')
                    // }
                    // errMaximum={
                    //   !formik.values.isNotSame ?
                    //     ERROR_18_YEARS :
                    //     ERROR_6_WEEKS
                    // }
                    minimumDate={moment().subtract(69, 'years').add(1, 'days').format('DD/MM/YYYY')}
                    errMinimum={ERROR_69_YEARS}
                    requireFill
                  />
                  {
                    formik.values.errBirthdayMax ? (
                      <Text style={{color: errValidColor, fontSize:14}}>{formik.values.errBirthdayMax}</Text>
                    ) : null
                  }
                </View>
              </View>
              <View style={styles.inputRow}>
                <View style={{ width: '46%' }}>
                  <FormikInput
                    label={'CMND/CCCD/Hộ chiếu *'}
                    name={'customerIdentity'}
                    maxLength={14}
                    onBlur={() => {
                      formik.setFieldValue('customerIdentity', formik.values.customerIdentity.toUpperCase());
                    }}
                    autoUpperCase
                    keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                  />
                </View>
                <View style={{ width: '46%' }}>
                  <FormikInput
                    label={'Số điện thoại *'}
                    name={'customerPhone'}
                    keyboardType={'number-pad'}
                    maxLength={12}
                  />
                </View>
              </View>
              <FormikInput
                label={'Email *'}
                name={'customerEmail'}
                keyboardEmail
              />
              <View style={styles.inputRow}>
                <View style={{ width: '46%' }}>
                  <FormikSelect
                    label={'Tỉnh/Thành phố *'}
                    name={'customerProvince'}
                    openModal={() => this.openProvinceModal('customer')}
                  />
                </View>
                <View style={{ width: '46%' }}>
                  <FormikSelect
                    label={`Quận/Huyện${formik.values.customerProvince ? ' *' : ''}`}
                    name={'customerDistrict'}
                    openModal={() => this.openDistrictModal('customer')}
                    checkDisabled={!formik.values.customerProvince}
                    hideIcon={!formik.values.customerProvince}
                    baseColor={formik.values.customerProvince ? colorText : '#8D8C8D'}
                  />
                </View>
              </View>
              <FormikInput
                label={'Địa chỉ (Số nhà, phường, xã) *'}
                name={'customerAddress'}
              />
              <FormikSelect
                label={'Ngành nghề *'}
                name={'customerCareer'}
                openModal={() => this.setState({ modalCareer: true })}
              />
              {
                formik.values.customerCareerId === '0016' ? (
                  <FormikInput
                    label={'Diễn giải ngành nghề *'}
                    name={'customerCareerDesc'}
                  />
                ) : null
              }
            </View>
            <View style={[{ flexDirection: 'row', marginTop: 26, alignItems: 'center' }]}>
              <IconInsurancerSvg width={15} height={15} />
              <Text style={styles.titleStyle}>
                Người yêu cầu bảo hiểm:
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
              }}
              name="isNotSame"
              onPress={() => this.onSelect(formik)}>
              {
                !formik.values.isNotSame
                  ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                  : <IconBoxSvg width={20} height={20} color={NewColor} />
              }
              <Text style={{ marginLeft: 8 }}>Thông tin như trên</Text>
            </TouchableOpacity>
            {
              formik.values.isNotSame ? (
                <>
                  <FormikInput
                    label={'Họ và tên *'}
                    name={'requestName'}
                    onBlur={() => {
                      formik.setFieldValue('requestName', formik.values.requestName.toUpperCase());
                    }}
                    autoUpperCase
                  />
                  <DateFill
                    value={formik.values.requestBirthday}
                    onChange={(text, err) => {
                      formik.setFieldValue('requestBirthday', text);
                      formik.setFieldValue('errRequestBirthday', err);
                    }}
                    label={'Ngày sinh *'}
                    maximumDate={moment().subtract(18, 'years').format('DD/MM/YYYY')}
                    errMaximum={ERROR_18_YEARS}
                    requireFill
                  />
                  <View style={styles.inputRow}>
                    <View style={{ width: '46%' }}>
                      <FormikInput
                        label={'CMND/CCCD/Hộ chiếu *'}
                        name={'requestIdentity'}
                        maxLength={14}
                        onBlur={() => {
                          formik.setFieldValue('requestIdentity', formik.values.requestIdentity.toUpperCase());
                        }}
                        autoUpperCase
                        keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                      />
                    </View>
                    <View style={{ width: '46%' }}>
                      <FormikInput
                        label={'Số điện thoại *'}
                        name={'requestPhone'}
                        keyboardType={'number-pad'}
                        maxLength={12}
                      />
                    </View>
                  </View>
                  <FormikInput
                    label={'Email *'}
                    name={'requestEmail'}
                    keyboardEmail
                  />
                  <View style={styles.inputRow}>
                    <View style={{ width: '46%' }}>
                      <FormikSelect
                        label={'Tỉnh/Thành phố *'}
                        name={'requestProvince'}
                        openModal={() => this.openProvinceModal()}
                      />
                    </View>
                    <View style={{ width: '46%' }}>
                      <FormikSelect
                        label={`Quận/Huyện${formik.values.requestProvince ? ' *' : ''}`}
                        name={'requestDistrict'}
                        openModal={() => this.openDistrictModal()}
                        checkDisabled={!formik.values.requestProvince}
                        hideIcon={!formik.values.requestProvince}
                        baseColor={formik.values.requestProvince ? colorText : '#8D8C8D'}
                      />
                    </View>
                  </View>
                  <FormikInput
                    label={'Địa chỉ (Số nhà, phường, xã) *'}
                    name={'requestAddress'}
                  />
                  <FormikSelect
                    label={'Mối quan hệ *'}
                    name={'requestRelation'}
                    openModal={() => this.setState({ modalRelation: true })}
                  />
                </>
              ) : null
            }
            {this.renderTotalFee()}
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
            <View style={{ marginVertical: 20 }}>
              <Button
                color={
                  !formik.isValid ||
                    formik.values.errCustomerBirthday ||
                    formik.values.errBirthdayMax ||
                    (formik.values.isNotSame && formik.values.errRequestBirthday) ?
                    NewColorDisable : NewColor
                }
                label={'TIẾP TỤC'}
                onPress={formik.handleSubmit}
                disable={
                  !formik.isValid ||
                  formik.values.errCustomerBirthday ||
                  formik.values.errBirthdayMax ||
                  (formik.values.isNotSame && formik.values.errRequestBirthday)
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
    Actions.PreviewAAA();
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
          <Animated.View style={{ zIndex: headerZIndex }}>
            <ImageHeaderScroll code={'A1'} offset={this.scrollYAnimatedValue} />
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
                source={require('../../../icons/ic_back.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={{ zIndex: 2011 }}>
            <HeaderScroll code={'A1'} offset={this.scrollYAnimatedValue} />
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
                  Thông tin người được bảo hiểm:
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
import { getDistrict } from '../../CarInsurance/actions/car_Buy';
import {
  saveCustomerAAA,
} from '../actions/accident_buy';
import moment from 'moment';

const mapStateToProps = (state) => {
  const idComSelected = state.selectCompany.idComSelected['A1'];
  return {
    idComSelected,
    chosenPackage: state.accidentBuy.chosenPackage,
    customerAAA: state.accidentBuy.customerAAA,
    orgCodeUser: state.userInfo.orgCodeUser,
    dataTokenInsur: state.insurance.tokenInsur['A1'],
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDistrict: id => dispatch(getDistrict(id)),
    saveCustomerAAA: body => dispatch(saveCustomerAAA(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InsurCustomer);
