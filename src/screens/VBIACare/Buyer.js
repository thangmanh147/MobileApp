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
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { Color, colorText, colorTitle, errValidColor, nameApp, NewColor, NewColorDisable, textDisable, TxtColor } from '../../config/System';
import Input from '../CarInsurance/components/Input';
import { Formik } from 'formik';
import { handleTextInput } from 'react-native-formik';
import * as Yup from 'yup';
import Button from '../../components/buy/Button';
import {
  validateCompanyName,
} from '../../config/Validation';
import InputSelect from '../../components/buy/InputSelect';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import {
  isPhoneAccident,
  isIdentity,
  isTaxCode,
  isEmailAccident,
  isFullNameExpand
} from '../../components/Functions';
import ModalSex from '../FlightInsurance/component/ModalSex';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import DateFill from '../../components/dateTimeFill/DateFill';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconCameraBlurSvg from '../../config/images/icons/IconCameraBlurSvg';
import IconOCRCameraSvg from '../../config/images/icons/IconOCRCameraSvg';

class BuyerInfo extends Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.state = {
      modalProvince: null,
      modalDistrict: null,
      modalBuyerType: null,
      modalGender: null,
      buyerInfomation: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (
      nextProps.buyerInfomation &&
      nextProps.buyerInfomation !== prevState.buyerInfomation
    ) {
      update.buyerInfomation = nextProps.buyerInfomation;
    }
    return update;
  }

  confirmPicker = (date, formik, err) => {
    formik.setFieldValue('buyerBirthday', date);
    formik.setFieldValue('errBuyerBirthday', err);
  };

  // chọn bên mua bảo hiểm
  setBuyerType = (formik, data) => {
    formik.setFieldValue('isCompany', data.id === 2);
  };
  // chọn tỉnh/tp
  setProvince = async (data, formik) => {
    if (formik.values.buyerProvince !== data._name) {
      await formik.setFieldValue('provinceId', data.id);
      await formik.setFieldValue('buyerProvince', data._name);
      await formik.setFieldValue('buyerDistrict', '');
    }
    await this.props.getDistrict(data.id);
  };
  // chọn quận/huyện
  setDistrict = async (data, formik) => {
    if (formik.values.buyerDistrict !== data._name) {
      await formik.setFieldValue('districtId', data.id);
      await formik.setFieldValue('buyerDistrict', data._name);
    }
  };
  // mở modal tỉnh/tp
  openProvinceModal = () => {
    this.setState({
      modalProvince: true,
    });
  };
  // mở modal quận/huyện
  openDistrictModal = () => {
    this.setState({
      modalDistrict: true,
    });
  };
  // chọn giới tính
  setGender = (formik, data) => {
    formik.setFieldValue('buyerGender', data.name);
  };
  
  // lưu thông tin vào redux
  storeInfomation = async values => {
    const {customerInfo, saveBuyerInfomation, saveCustomerInfo} = this.props;
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
      };
      buyerInfomation.fullName = values.buyerName.normalize().toUpperCase();
      buyerInfomation.cardId = values.buyerIdentity.toUpperCase();
      buyerInfomation.companyName = values.companyName.normalize().toUpperCase();
      await saveBuyerInfomation(buyerInfomation);
      if (customerInfo.find(item => item?.relation === 'Bản thân')) {
        const arr = customerInfo.map(item => item?.relation);
        const index = arr && arr.indexOf('Bản thân');
        const obj = {
          address: values.buyerAddress,
          email: values.buyerEmail.trim(),
          fullName: values.buyerName,
          gender: values.buyerGender,
          identity: values.buyerIdentity,
          phone: values.buyerPhone,
          birthday: values.buyerBirthday,
          provinceId: values.provinceId,
          province: values.buyerProvince,
          districtId: values.districtId,
          district: values.buyerDistrict,
          relation: 'Bản thân',
          dataRelation: 
            {
                name: 'Bản thân',
                id: 1,
                code: 'BAN_THAN'
            },
        }
        customerInfo.splice(index, 1, obj);
        await saveCustomerInfo(customerInfo);
      }
      if (customerInfo?.length > 0) {
        Actions.ACareListCustomer();
      } else {
        Actions.ACareSurvey({index: 0});
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
    buyerName: Yup.string().when('isCompany', {
      is: false,
      then:  Yup.string()
        .strict(false)
        .trim()
        .test(
          'buyerName',
          ERROR_NAME_FORMAT,
          values => isFullNameExpand(values),
        )
        .required(ERROR_NAME_REQUIRED),
    }),
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
    // buyerIdentity: Yup.string().when('isCompany', {
    //   is: false,
    //   then: Yup.string() // vaidate cmnd/cccd
    //     .required(ERROR_IDENTITY_REQUIRED)
    //     .test(
    //       'buyerIdentity',
    //       ERROR_IDENTITY_FORMAT,
    //       values => isIdentity(values), // check validate ký tự đặc biệt
    //     ),
    // }),
    buyerProvince: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp
    buyerDistrict: Yup.string().required('Chưa chọn quận/huyện'), // validate quận/huyện
  });

  handlePressTakePhoto = () => {
    Actions.ACareCamera({id: '-1'});
  };

  onTextIdentity = (text, formik) => {
    const {customerInfo} = this.props;
    if (text?.length > 0 && !isIdentity(text)) {
        formik.setFieldValue('errIdentity', ERROR_IDENTITY_FORMAT);
    } else if (
      (customerInfo?.find(item => item.relation !== 'Bản thân' && item.identity === text))
    ) {
        formik.setFieldValue('errIdentity', 'CMND/CCCD/Hộ chiếu trùng lặp với NĐBH');
    } else {
        formik.setFieldValue('errIdentity', '');
    }
  };

  onBlurTextIdentity = (formik) => {
      if (formik.values.buyerIdentity === '') {
          formik.setFieldValue('errIdentity', ERROR_IDENTITY_REQUIRED);
      }
  };

  // render form nhập thông tin
  renderFormInputInfomation = () => {
    const {
      ocrImg,
      isCamera,
    } = this.props;
    const {
      modalProvince,
      modalDistrict,
      modalBuyerType,
      modalGender,
      buyerInfomation,
    } = this.state;
    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);
    return (
      <Formik
        initialValues={{
          isCompany: buyerInfomation?.type === 2,
          isVat: buyerInfomation?.isVat,
          buyerAddress: (isCamera ? ocrImg?.infoOCR?.address : buyerInfomation?.address) || '',
          buyerEmail: buyerInfomation?.email || '',
          buyerName: (isCamera ? ocrImg?.infoOCR?.name : buyerInfomation?.fullName) || '',
          buyerGender: buyerInfomation?.gender || '',
          buyerIdentity: (isCamera ? ocrImg?.infoOCR?.cmndNum : buyerInfomation?.cardId) || '',
          buyerPhone: buyerInfomation?.phone || '',
          buyerBirthday: (isCamera ? ocrImg?.infoOCR?.dob : buyerInfomation?.birthday) || '',
          provinceId: buyerInfomation?.provinceId || 0,
          buyerProvince: buyerInfomation?.cityName || '',
          districtId: buyerInfomation?.districtId || 0,
          buyerDistrict: buyerInfomation?.districtName || '',
          companyName: buyerInfomation?.companyName || '',
          companyTaxCode: buyerInfomation?.companyTaxCode || '',
          errIdentity: '',
        }}
        onSubmit={values => this.storeInfomation(values)}
        validationSchema={this.validation}
        isInitialValid={buyerInfomation?.fullName?.length > 0 || buyerInfomation?.companyName?.length > 0}>
        {formik => (
          <View>
            <ModalProvince
              open={modalProvince}
              onClosed={() => this.setState({ modalProvince: null })}
              setProvince={data => this.setProvince(data, formik)}
              onOpened={() => this.setState({ modalProvince: true })}
              nameSelected={formik.values.buyerProvince}
            />
            <ModalDistrict
              open={modalDistrict}
              onClosed={() => this.setState({ modalDistrict: null })}
              setDistrict={data => this.setDistrict(data, formik)}
              onOpened={() => this.setState({ modalDistrict: true })}
              nameSelected={formik.values.buyerDistrict}
            />
            <ModalBuyerType
              open={modalBuyerType}
              onClosed={() => this.setState({ modalBuyerType: null })}
              setBuyerType={data => this.setBuyerType(formik, data)}
              onOpened={() => this.setState({ modalBuyerType: true })}
              nameSelected={formik.values.isCompany ? 'Doanh nghiệp' : 'Cá nhân'}
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
                    <TouchableOpacity style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 20 }}
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
                  onBlur={() => {
                    formik.setFieldValue('buyerName', formik.values.buyerName.toUpperCase());
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
                        this.onBlurTextIdentity(formik);
                      }}
                      onChangeText={(text) => this.onTextIdentity(text, formik)}
                      error={formik.values.errIdentity}
                      autoUpperCase
                      keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                    />
                  </View>
                  <View style={{ width: '46%' }}>
                    <FormikInput
                      label={'Số điện thoại *'}
                      name={'buyerPhone'}
                      keyboardType={'number-pad'}
                      maxLength={12}
                    />
                  </View>
                </View>
                <FormikInput
                  label={'Email *'}
                  name={'buyerEmail'}
                  keyboardEmail
                />
                <View style={styles.inputRow}>
                  <View style={{ width: '46%' }}>
                    <FormikSelect
                      label={'Tỉnh/Thành phố *'}
                      name={'buyerProvince'}
                      openModal={() => this.openProvinceModal()}
                    />
                  </View>
                  <View style={{ width: '46%' }}>
                    <FormikSelect
                      label={`Quận/Huyện *`}
                      name={'buyerDistrict'}
                      openModal={() => this.openDistrictModal()}
                      checkDisabled={!formik.values.buyerProvince}
                      hideIcon={!formik.values.buyerProvince}
                      baseColor={formik.values.buyerProvince ? colorText : textDisable}
                    />
                  </View>
                </View>
                <FormikInput
                  label={'Địa chỉ (Số nhà, phường, xã) *'}
                  name={'buyerAddress'}
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
                <View style={styles.inputRow}>
                  <View style={{ width: '46%' }}>
                    <FormikInput
                      label={'Số điện thoại *'}
                      name={'buyerPhone'}
                      keyboardType={'number-pad'}
                      maxLength={12}
                    />
                  </View>
                  <View style={{ width: '46%' }}>
                    <FormikInput
                      label={'Email *'}
                      name={'buyerEmail'}
                      keyboardEmail
                    />
                  </View>
                </View>
                <View style={styles.inputRow}>
                  <View style={{ width: '46%' }}>
                    <FormikSelect
                      label={'Tỉnh/Thành phố *'}
                      name={'buyerProvince'}
                      openModal={() => this.openProvinceModal()}
                    />
                  </View>
                  <View style={{ width: '46%' }}>
                    <FormikSelect
                      label={`Quận/Huyện${formik.values.buyerProvince ? ' *' : ''}`}
                      name={'buyerDistrict'}
                      openModal={() => this.openDistrictModal()}
                      checkDisabled={!formik.values.buyerProvince}
                      hideIcon={!formik.values.buyerProvince}
                      baseColor={formik.values.buyerProvince ? colorText : '#8D8C8D'}
                    />
                  </View>
                </View>
                <FormikInput
                  label={'Địa chỉ (Số nhà, phường, xã) *'}
                  name={'buyerAddress'}
                />

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 16,
                  }}
                  name="isVat"
                  onPress={() =>
                    formik.setFieldValue('isVat', !formik.values.isVat)
                  }>
                  {
                    formik.values.isVat
                      ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                      : <IconBoxSvg width={20} height={20} color={NewColor} />
                  }
                  <Text style={{ marginLeft: 8 }}>Xuất hóa đơn VAT</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <View style={{ marginVertical: 24 }}>
              <Button
                color={
                  formik.isValid &&
                  !formik.values.errIdentity &&
                  !formik.values.errBuyerBirthday ?
                  NewColor : NewColorDisable
                }
                disable={
                  !formik.isValid ||
                  formik.values.errIdentity?.length > 0 ||
                  formik.values.errBuyerBirthday
                }
                label={'TIẾP TỤC'}
                onPress={formik.handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    );
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
            <ImageHeaderScroll code={'HC10'} offset={this.scrollYAnimatedValue} />
          </Animated.View>
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2012
          }}>
            <TouchableOpacity
              onPress={() => Actions.ACareIntro()}
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
            <HeaderScroll code={'HC10'} offset={this.scrollYAnimatedValue} />
          </View>
          <ScrollView
            style={{ zIndex: 1000 }}
            contentContainerStyle={{
              paddingTop: HEADER_MAX_HEIGHT
            }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }],
              { useNativeDriver: false }
            )}>
            <View style={styles.contentContainer}>
              <View style={[styles.titleContainer, { marginTop: 20 }]}>
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
  saveCustomerInfo
} from './actions/acare';
import ModalBuyerType from './ListInsureCustomer/ModalBuyerType';
import moment from 'moment';

const mapStateToProps = (state) => {
  return {
    buyerInfomation: state.acare.buyerInfomation,
    ocrImg: state.acare.ocrInfo['-1'],
    customerInfo: state.acare.customerInfo,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDistrict: id => dispatch(getDistrict(id)),
    saveBuyerInfomation: body => dispatch(saveBuyerInfomation(body)),
    saveCustomerInfo: body => dispatch(saveCustomerInfo(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerInfo);
