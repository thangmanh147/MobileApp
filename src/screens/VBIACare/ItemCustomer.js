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
  ERROR_65_YEARS,
  ERROR_60_DAYS,
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
import InputSelect from '../../components/buy/InputSelect';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import {
  isPhoneAccident,
  isIdentity,
  isEmailAccident,
  isFullNameExpand,
  isIdentityCusTravel
} from '../../components/Functions';
import ModalSex from '../FlightInsurance/component/ModalSex';
import ModalRelationType from './ListInsureCustomer/ModalRelationType';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import DateFill from '../../components/dateTimeFill/DateFill';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconCameraBlurSvg from '../../config/images/icons/IconCameraBlurSvg';
import IconOCRCameraSvg from '../../config/images/icons/IconOCRCameraSvg';

class BuyerInfo extends Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.state = {
      modalProvince: null,
      modalDistrict: null,
      modalRelation: null,
      modalGender: null,
    };
  }

  confirmPicker = (date, formik, err) => {
    const {buyerInfomation} = this.props;
    formik.setFieldValue('birthday', date);
    formik.setFieldValue('errBirthday', err);
    if (formik.values.relation === 'Bản thân' && date !== buyerInfomation?.birthday) {
      formik.setFieldValue('relation', '');
      formik.setFieldValue('dataRelation', '');
      formik.setFieldValue('identity', '');
    }
    if (!err) {
      if (formik.values.relation === 'Con cái' && moment(date, 'DD/MM/YYYY').diff(moment(buyerInfomation?.birthday, 'DD/MM/YYYY'), 'days') <= 0) {
        formik.setFieldValue('errBirthdayBuyer', 'Phải nhỏ hơn ngày sinh người mua');
      } else if (formik.values.relation === 'Bố/mẹ' && moment(buyerInfomation?.birthday, 'DD/MM/YYYY').diff(moment(date, 'DD/MM/YYYY'), 'days') <= 0) {
        formik.setFieldValue('errBirthdayBuyer', 'Phải lớn hơn ngày sinh người mua');
      } else {
        formik.setFieldValue('errBirthdayBuyer', '');
      }
    }
  };

  // chọn bên mua bảo hiểm
  setRelationType = (formik, data) => {
    const {buyerInfomation} = this.props;
    formik.setFieldValue('relation', data.name);
    formik.setFieldValue('dataRelation', data);
    if (data.name === 'Bản thân') {
      formik.setFieldValue('address', buyerInfomation?.address);
      formik.setFieldValue('email', buyerInfomation?.email);
      formik.setFieldValue('fullName', buyerInfomation?.fullName);
      formik.setFieldValue('gender', buyerInfomation?.gender);
      formik.setFieldValue('identity', buyerInfomation?.cardId);
      formik.setFieldValue('phone', buyerInfomation?.phone);
      formik.setFieldValue('birthday', buyerInfomation?.birthday);
      formik.setFieldValue('provinceId', buyerInfomation?.provinceId);
      formik.setFieldValue('province', buyerInfomation?.cityName);
      formik.setFieldValue('districtId', buyerInfomation?.districtId);
      formik.setFieldValue('district', buyerInfomation?.districtName);
      formik.setFieldValue('errIdentity', '');
    } else {
      if (formik.values.relation === 'Bản thân') {
        formik.setFieldValue('identity', '');
      }
      if ((data.name === 'Bố/mẹ' || data.name === 'Con cái') && formik.values.birthday === buyerInfomation?.birthday) {
        formik.setFieldValue('birthday', '');
      }
    }
  };
  // chọn tỉnh/tp
  setProvince = async (data, formik) => {
    const {buyerInfomation} = this.props;
    if (formik.values.province !== data._name) {
      await formik.setFieldValue('provinceId', data.id);
      await formik.setFieldValue('province', data._name);
      await formik.setFieldValue('district', '');
      if (formik.values.relation === 'Bản thân' && data._name !== buyerInfomation?.cityName) {
        formik.setFieldValue('relation', '');
        formik.setFieldValue('dataRelation', '');
        formik.setFieldValue('identity', '');
      }
    }
    await this.props.getDistrict(data.id);
  };
  // chọn quận/huyện
  setDistrict = async (data, formik) => {
    const {buyerInfomation} = this.props;
    if (formik.values.district !== data._name) {
      await formik.setFieldValue('districtId', data.id);
      await formik.setFieldValue('district', data._name);
      if (formik.values.relation === 'Bản thân' && data._name !== buyerInfomation?.districtName) {
        formik.setFieldValue('relation', '');
        formik.setFieldValue('dataRelation', '');
        formik.setFieldValue('identity', '');
      }
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
    const {buyerInfomation} = this.props;
    formik.setFieldValue('gender', data.name);
    if (formik.values.relation === 'Bản thân' && data.name !== buyerInfomation?.gender) {
      formik.setFieldValue('relation', '');
      formik.setFieldValue('dataRelation', '');
      formik.setFieldValue('identity', '');
    }
  };
  
  // lưu thông tin vào redux
  storeInfomation = async values => {
    const {saveCustomerInfo, customerInfo, index} = this.props;
    let dataInfo = values;
    dataInfo.fullName = values.fullName.normalize().toUpperCase();
    dataInfo.identity = values.identity.toUpperCase();
    customerInfo.splice(index, 1, dataInfo);
    await saveCustomerInfo(customerInfo);
    Actions.ACareListCustomer({newFee: true});
  };
  validation = Yup.object().shape({
    fullName: Yup.string()
      .strict(false)
      .trim()
      .test(
        'fullName',
        ERROR_NAME_FORMAT,
        values => isFullNameExpand(values),
      )
      .required(ERROR_NAME_REQUIRED),
    gender: Yup.string().required('Bạn phải chọn giới tính'),
    birthday: Yup.string()
      .strict(false)
      .trim()
      .required(ERROR_BIRTHDAY_REQUIRED),
    address: Yup.string() // validate địa chỉ người mua
      .strict(false)
      .trim()
      .required(ERROR_ADDRESS_REQUIRED),
    email: Yup.string() // validate email người mua
      .strict(false)
      .trim()
      .required(ERROR_EMAIL_REQUIRED)
      .test('email', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)), // check validate định dạng email bao gồm @ và domain
    phone: Yup.string() // validate số điện thoại người mua
      .strict(false)
      .required(ERROR_PHONE_REQUIRED)
      .test('phone', ERROR_PHONE_FORMAT, values => isPhoneAccident(values)), // check validate định dạng sđt
    // identity: Yup.string() // vaidate cmnd/cccd
    //   .required(ERROR_IDENTITY_REQUIRED)
    //   .test(
    //     'identity',
    //     ERROR_IDENTITY_FORMAT,
    //     values => isIdentityCusTravel(values), // check validate ký tự đặc biệt
    //   ),
    province: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate tỉnh/tp
    district: Yup.string().required('Chưa chọn quận/huyện'), // validate quận/huyện
  });

  handlePressTakePhoto = () => {
    const {index} = this.props;
    Actions.ACareCamera({id: index.toString()});
  };

  onBack = () => {
    const {customerInfo} = this.props;
    if (customerInfo?.length > 0) {
      Actions.ACareListCustomer();
    } else {
      Actions.ACareBuyer();
    }
  }

  onTextIdentity = (text, formik) => {
    const {buyerInfomation, customerInfo} = this.props;
    if (text?.length > 0 && !isIdentityCusTravel(text)) {
        formik.setFieldValue('errIdentity', ERROR_IDENTITY_FORMAT);
    } else if (
      (text === buyerInfomation?.cardId && formik.values.relation !== 'Bản thân') ||
      (customerInfo?.find(item => item.identity === text))
    ) {
        formik.setFieldValue('errIdentity', 'CMND/CCCD/Hộ chiếu trùng lặp');
    } else {
        formik.setFieldValue('errIdentity', '');
    }
  };

  onBlurTextIdentity = (formik) => {
    const {buyerInfomation} = this.props;
      if (formik.values.identity === '') {
          formik.setFieldValue('errIdentity', ERROR_IDENTITY_REQUIRED);
      }
      if (formik.values.relation === 'Bản thân' && formik.values.identity.toUpperCase() !== buyerInfomation?.cardId) {
        formik.setFieldValue('relation', '');
        formik.setFieldValue('dataRelation', '');
      }
  };

  // render form nhập thông tin
  renderFormInputInfomation = () => {
    const {
      buyerInfomation,
      customerInfo,
      customerItem,
      ocrImg,
      isCamera,
    } = this.props;
    const {
      modalProvince,
      modalDistrict,
      modalRelation,
      modalGender,
    } = this.state;
    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);
    return (
      <Formik
        initialValues={{
          address: (isCamera ? ocrImg?.infoOCR?.address : customerItem?.address) || '',
          email: customerItem?.email || '',
          fullName: (isCamera ? ocrImg?.infoOCR?.name : customerItem?.fullName) || '',
          gender: customerItem?.gender || '',
          identity: (isCamera ? ocrImg?.infoOCR?.cmndNum : customerItem?.identity) || '',
          phone: customerItem?.phone || '',
          birthday: (isCamera ? ocrImg?.infoOCR?.dob : customerItem?.birthday) || '',
          provinceId: customerItem?.provinceId || 0,
          province: customerItem?.province || '',
          districtId: customerItem?.districtId || 0,
          district: customerItem?.district || '',
          relation: customerItem?.relation || '',
          dataRelation: customerItem?.dataRelation || '',
          errIdentity: '',
        }}
        onSubmit={values => this.storeInfomation(values)}
        validationSchema={this.validation}
        isInitialValid={customerItem?.fullName?.length > 0}>
        {formik => (
          <View>
            <ModalProvince
              open={modalProvince}
              onClosed={() => this.setState({ modalProvince: null })}
              setProvince={data => this.setProvince(data, formik)}
              onOpened={() => this.setState({ modalProvince: true })}
              nameSelected={formik.values.province}
            />
            <ModalDistrict
              open={modalDistrict}
              onClosed={() => this.setState({ modalDistrict: null })}
              setDistrict={data => this.setDistrict(data, formik)}
              onOpened={() => this.setState({ modalDistrict: true })}
              nameSelected={formik.values.district}
            />
            <ModalRelationType
              open={modalRelation}
              onClosed={() => this.setState({ modalRelation: null })}
              setType={data => this.setRelationType(formik, data)}
              onOpened={() => this.setState({ modalRelation: true })}
              nameSelected={formik.values.relation}
              selectedBuyer={customerInfo.find(item => item.relation === 'Bản thân')}
            />
            <ModalSex
              open={modalGender}
              onClosed={() => this.setState({ modalGender: null })}
              setSex={data => this.setGender(formik, data)}
              onOpened={() => this.setState({ modalGender: true })}
              nameSelected={formik.values.gender}
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
              label={'Mối quan hệ *'}
              name={'relation'}
              openModal={() => this.setState({ modalRelation: true })}
            />
            <View>
              <FormikInput
                label={'Họ và tên *'}
                name={'fullName'}
                onBlur={() => {
                  formik.setFieldValue('fullName', formik.values.fullName.toUpperCase());
                  if (formik.values.relation === 'Bản thân' && formik.values.fullName.toUpperCase() !== buyerInfomation?.fullName) {
                    formik.setFieldValue('relation', '');
                    formik.setFieldValue('dataRelation', '');
                    formik.setFieldValue('identity', '');
                  }
                }}
                autoUpperCase
              />
              <View style={styles.inputRow}>
                <View style={{ width: '46%', marginTop: 5 }}>
                  <FormikSelect
                    label={'Giới tính *'}
                    name={'gender'}
                    openModal={() => this.setState({ modalGender: true })}
                  />
                </View>
                <View style={{ width: '46%' }}>
                  <DateFill
                    value={formik.values.birthday}
                    onChange={(text, err) => {
                      this.confirmPicker(text, formik, err);
                    }}
                    label={'Ngày sinh *'}
                    maximumDate={moment().subtract(60, 'days').format('DD/MM/YYYY')}
                    errMaximum={ERROR_60_DAYS}
                    minimumDate={moment().subtract(65, 'years').format('DD/MM/YYYY')}
                    errMinimum={ERROR_65_YEARS}
                    requireFill
                  />
                  {
                    formik.values.errBirthdayBuyer ? (
                      <Text style={{color: errValidColor,fontSize:14}}>{formik.values.errBirthdayBuyer}</Text>
                    ) : null
                  }
                </View>
              </View>
              <View style={styles.inputRow}>
                <View style={{ width: '46%' }}>
                  <FormikInput
                    label={'CMND/CCCD/Hộ chiếu *'}
                    name={'identity'}
                    maxLength={12}
                    autoUpperCase
                    keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                    onBlur={() => {
                      formik.setFieldValue('identity', formik.values.identity.toUpperCase());
                      this.onBlurTextIdentity(formik);
                    }}
                    error={formik.values.errIdentity}
                    onChangeText={(text) => this.onTextIdentity(text, formik)}
                  />
                </View>
                <View style={{ width: '46%' }}>
                  <FormikInput
                    label={'Số điện thoại *'}
                    name={'phone'}
                    keyboardType={'number-pad'}
                    maxLength={12}
                    onBlur={() => {
                      if (formik.values.relation === 'Bản thân' && formik.values.phone !== buyerInfomation?.phone) {
                        formik.setFieldValue('relation', '');
                        formik.setFieldValue('dataRelation', '');
                        formik.setFieldValue('identity', '');
                      }
                    }}
                  />
                </View>
              </View>
              <FormikInput
                label={'Email *'}
                name={'email'}
                keyboardEmail
                onBlur={() => {
                  if (formik.values.relation === 'Bản thân' && formik.values.email !== buyerInfomation?.email) {
                    formik.setFieldValue('relation', '');
                    formik.setFieldValue('dataRelation', '');
                    formik.setFieldValue('identity', '');
                  }
                }}
              />
              <View style={styles.inputRow}>
                <View style={{ width: '46%' }}>
                  <FormikSelect
                    label={'Tỉnh/Thành phố *'}
                    name={'province'}
                    openModal={() => this.openProvinceModal()}
                  />
                </View>
                <View style={{ width: '46%' }}>
                  <FormikSelect
                    label={`Quận/Huyện *`}
                    name={'district'}
                    openModal={() => this.openDistrictModal()}
                    checkDisabled={!formik.values.province}
                    hideIcon={!formik.values.province}
                    baseColor={formik.values.province ? colorText : textDisable}
                  />
                </View>
              </View>
              <FormikInput
                label={'Địa chỉ (Số nhà, phường, xã) *'}
                name={'address'}
                onBlur={() => {
                  if (formik.values.relation === 'Bản thân' && formik.values.address !== buyerInfomation?.address) {
                    formik.setFieldValue('relation', '');
                    formik.setFieldValue('dataRelation', '');
                    formik.setFieldValue('identity', '');
                  }
                }}
              />
            </View>
            <View style={{ marginVertical: 24 }}>
              <Button
                color={
                  ((formik.isValid &&
                  !formik.values.errIdentity &&
                  formik.values.identity?.length > 0 &&
                  formik.values.relation?.length > 0 &&
                  !formik.values.errBirthdayBuyer &&
                  !formik.values.errBirthday) || formik.values.relation === 'Bản thân') ?
                  NewColor : NewColorDisable
                }
                disable={
                  !((formik.isValid && !formik.values.errIdentity && formik.values.identity?.length > 0 && formik.values.relation?.length > 0 && !formik.values.errBirthdayBuyer && !formik.values.errBirthday) || (formik.values.relation === 'Bản thân'))
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
              onPress={this.onBack}
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
                  Thông tin người được bảo hiểm
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
  saveCustomerInfo,
} from './actions/acare';
import moment from 'moment';

const mapStateToProps = (state, ownProps) => {
  return {
    ocrImg: state.acare.ocrInfo[ownProps?.index?.toString()],
    customerInfo: state.acare.customerInfo,
    customerItem: state.acare.customerInfo[ownProps?.index],
    buyerInfomation: state.acare.buyerInfomation,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDistrict: id => dispatch(getDistrict(id)),
    saveCustomerInfo: body => dispatch(saveCustomerInfo(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerInfo);
