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
import {
  ERROR_ADDRESS_REQUIRED,
  ERROR_COMPANY_NAME_REQUIRED,
  ERROR_COMPANY_TAXCODE_REQUIRED,
  ERROR_EMAIL_FORMAT,
  ERROR_EMAIL_REQUIRED,
  ERROR_COMPANY_NAME_FORMAT,
  ERROR_COMPANY_TAX_CODE,
} from '../../config/ErrorMessage';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import NameInput from './ListInsureCustomer/NameInput';
import PhoneInput from './ListInsureCustomer/PhoneInput';
import BirthdayInput1 from './ListInsureCustomer/BirthdayInput1';
import IdentityInput from './ListInsureCustomer/IdentityInput';
import EmailInput from './ListInsureCustomer/EmailInput';
import {
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { Color, colorTitle, nameApp, NewColor, NewColorDisable, TxtColor } from '../../config/System';
import Input from '../CarInsurance/components/Input';
import { Formik } from 'formik';
import { handleTextInput } from 'react-native-formik';
import * as Yup from 'yup';
import Button from '../../components/buy/Button';
import {
  validateCompanyName,
  validateName,
} from '../../config/Validation';
import {
  isPhoneAccident,
  isIdentity,
  isTaxCode,
  isEmailAccident,
  isCodeSeatNumber,
  formatHours,
  isFullNameExpand
} from '../../components/Functions';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconPlaneSvg from '../../config/images/icons/IconPlaneSvg';
import IconPlusSvg from '../../config/images/icons/IconPlusSvg';
import IconSubtractSvg from '../../config/images/icons/IconSubtractSvg';

class Buyer extends Component {
  constructor(props) {
    super(props);
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.state = {
      insuredCustomers: [{
        fullName: '',
        phone: '',
        birthday: '',
        identityNumber: '',
        email: '',
      }],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (
      nextProps.insuredCustomerInfo && nextProps.insuredCustomerInfo.length > 0 &&
      nextProps.insuredCustomerInfo !== prevState.insuredCustomers
    ) {
      update.insuredCustomers = nextProps.insuredCustomerInfo;
    }
    return update;
  }

  // Thêm người được bảo hiểm
  onPressAdd = () => {
    const { insuredCustomers } = this.state;
    let arrayInsuredCustomers = insuredCustomers;
    arrayInsuredCustomers.push({
      fullName: '',
      phone: '',
      birthday: '',
      identityNumber: '',
      email: '',
    });
    this.setState({
      insuredCustomers: arrayInsuredCustomers,
    });
  };
  onChangeName = (text, index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].fullName = text;
    this.setState({ insuredCustomers: insuredCustomers });
  };
  onChangePhone = (text, index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].phone = text;
    this.setState({ insuredCustomers: insuredCustomers });
  };
  onChangeEmail = (text, index) => {
    const { insuredCustomers } = this.state;
    insuredCustomers[index].email = text;
    this.setState({ insuredCustomers: insuredCustomers });
  };
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
  removeCustomer = index => {
    const { insuredCustomers } = this.state;
    insuredCustomers.splice(index, 1);
    this.setState({ insuredCustomers: insuredCustomers });
  };
  checkInsuredCustomers = (values) => {
    const { delayFlight } = this.props;
    const { insuredCustomers } = this.state;
    const data = insuredCustomers.filter((item) =>
      item.identityNumber?.trim()?.length === 0 ||
      !isIdentity(item.identityNumber) ||
      !item.errIdentityNumber ||
      item.fullName?.trim()?.length === 0 ||
      !isFullNameExpand(item.fullName) ||
      item.phone?.trim()?.length === 0 ||
      !isPhoneAccident(item.phone) ||
      item.email?.trim()?.length === 0 ||
      !isEmailAccident(item.email?.trim()) ||
      item.birthday?.length === 0 ||
      item.errBirthday
    );
    if (
      data.length > 0 ||
      values?.codeFlightBuyer?.trim()?.length === 0 ||
      (delayFlight?.info?.flightType === 'Khứ hồi' && values?.codeReturnFlightBuyer?.trim()?.length === 0) ||
      values?.errCodeFlightBuyer?.length > 0 ||
      (delayFlight?.info?.flightType === 'Khứ hồi' && values?.errCodeReturnFlightBuyer?.length > 0) ||
      (values?.isVat && (values?.companyName?.trim()?.length === 0 || validateCompanyName.test(values?.companyName))) ||
      (values?.isVat && (values?.companyTaxCode?.trim()?.length === 0 || !isTaxCode(values?.companyTaxCode))) ||
      (values?.isVat && (values?.companyEmail?.trim()?.length === 0 || !isEmailAccident(values?.companyEmail?.trim()))) ||
      (values?.isVat && values?.companyAddress?.trim()?.length === 0)
    ) return false;
    return true;
  };
  // lưu thông tin vào redux
  storeInfomation = values => {
    if (this.checkInsuredCustomers(values)) {
      const { saveBuyerDelayFlight, saveCodeNumber } = this.props;
      const { insuredCustomers } = this.state;
      const body = {
        insuredCustomers: insuredCustomers,
        buyerInfomation: values,
        isValidPackage: true,
      };
      body.buyerInfomation.companyName = values.companyName.normalize().toUpperCase();
      body.buyerInfomation.companyEmail = values.companyEmail.trim();
      saveBuyerDelayFlight(body);
      saveCodeNumber({
        codeDepart: values.codeFlightBuyer.toUpperCase(),
        codeReturn: values.codeReturnFlightBuyer.toUpperCase(),
      });
      this.onNext();
    } else {
      Alert.alert('Bạn cần cung cấp đủ thông tin cho Mã đặt chỗ và Người được bảo hiểm');
    }
  };
  // validate form người mua bảo hiểm
  validation = Yup.object().shape({
    companyName: Yup.string().when('isVat', {
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
    companyTaxCode: Yup.string().when('isVat', {
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
    companyEmail: Yup.string().when('isVat', {
      is: true,
      then: Yup.string()
        .strict(false)
        .trim()
        .required(ERROR_EMAIL_REQUIRED)
        .test('companyEmail', ERROR_EMAIL_FORMAT, values => isEmailAccident(values)),
    }),
    companyAddress: Yup.string().when('isVat', {
      is: true,
      then: Yup.string()
        .strict(false)
        .trim()
        .required(ERROR_ADDRESS_REQUIRED),
    }),
  });

  // render danh sách người được bảo hiểm đã thêm
  renderListInsuredCustomer = (values) => {
    const { insuredCustomers } = this.state;
    return (
      <View>
        {insuredCustomers.map((item, index) => {
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
                      onSetErr={text => this.onSetErrIdentityNumber(text, index)}
                      insuredCustomers={insuredCustomers.filter((_item) => _item.identityNumber !== item.identityNumber)}
                    />
                  </View>
                </View>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{ flex: 0.5, paddingRight: 5 }}>
                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Số điện thoại</Text>
                  </View>
                  <View style={{ flex: 0.5, marginTop: -30 }}>
                    <PhoneInput
                      value={item.phone}
                      onChange={text => this.onChangePhone(text, index)}
                    />
                  </View>
                </View>
                <View style={styles.insuredCutomerFormContainer}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Email</Text>
                  </View>
                  <View style={{ flex: 0.5, marginTop: -30 }}>
                    <EmailInput
                      value={item.email}
                      onChange={text => this.onChangeEmail(text, index)}
                    />
                  </View>
                </View>
                {
                  insuredCustomers.length === 1 ? null : (
                    <TouchableOpacity
                      onPress={() => this.removeCustomer(index)}
                      style={{ alignItems: 'center', marginTop: 10 }}>
                      <IconSubtractSvg width={20} height={20} color={Color} style={{opacity: 0.5}} />
                    </TouchableOpacity>
                  )
                }
              </View>
            </View>
          );
        })}
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={this.onPressAdd}
            style={{ alignItems: 'center', marginTop: 12, marginBottom: 10 }}>
            <IconPlusSvg width={20} height={20} />
            <Text style={{ color: Color, marginTop: 4, fontSize: 14, fontWeight: '400' }}>Thêm người được bảo hiểm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  onCheckCodeFlightBuyer = (formik) => {
    const code = formik.values.codeFlightBuyer;
    if (code?.trim()?.length === 0) {
      formik.setFieldValue('errCodeFlightBuyer', 'Không được bỏ trống');
    } else if (!isCodeSeatNumber(code)) {
      formik.setFieldValue('errCodeFlightBuyer', 'Sai định dạng');
    } else {
      formik.setFieldValue('errCodeFlightBuyer', '');
    }
  };

  onCheckCodeReturnFlightBuyer = (formik) => {
    const code = formik.values.codeReturnFlightBuyer;
    if (code?.trim()?.length === 0) {
      formik.setFieldValue('errCodeReturnFlightBuyer', 'Không được bỏ trống');
    } else if (!isCodeSeatNumber(code)) {
      formik.setFieldValue('errCodeReturnFlightBuyer', 'Sai định dạng');
    } else {
      formik.setFieldValue('errCodeReturnFlightBuyer', '');
    }
  };

  // render form nhập thông tin
  renderFormInputInfomation = () => {
    const { delayFlight, buyerInfomation, isValidPackage, codeNumber } = this.props;
    const FormikInput = handleTextInput(Input);
    return (
      <Formik
        initialValues={{
          codeFlightBuyer: codeNumber?.codeDepart || '',
          codeReturnFlightBuyer: codeNumber?.codeReturn || '',
          isVat: buyerInfomation?.isVat || false,
          companyName: buyerInfomation?.companyName || '',
          companyTaxCode: buyerInfomation?.companyTaxCode || '',
          companyEmail: buyerInfomation?.companyEmail || '',
          companyAddress: buyerInfomation?.companyAddress || '',
          errCodeFlightBuyer: '',
          errCodeReturnFlightBuyer: '',
        }}
        onSubmit={values => this.storeInfomation(values)}
        validationSchema={this.validation}
        isInitialValid={isValidPackage || false}>
        {formik => (
          <View>
            <View style={{ marginTop: 16 }}>
              <View style={styles.formContainer}>
                <View style={{
                  flexDirection: 'row',
                  marginBottom: 16
                }}>
                  <View style={{ flex: 0.6 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: TxtColor }}>
                      1. Số hiệu chuyến bay
                    </Text>
                  </View>
                  <View style={{ flex: 0.4 }}>
                    <Text style={{ color: '#414042', fontWeight: 'bold', textAlign: 'right' }}>
                      {
                        delayFlight?.info?.showDepartCreate ?
                          delayFlight?.info?.numberDepart :
                          delayFlight?.info?.departFlight?.flightNumber
                      }
                    </Text>
                  </View>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 16
                }}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Mã đặt chỗ</Text>
                  </View>
                  <View style={{ flex: 0.5, marginTop: -30 }}>
                    <FormikInput
                      name={'codeFlightBuyer'}
                      maxLength={12}
                      autoUpperCase
                      keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                      onBlur={() => {
                        formik.setFieldValue('codeFlightBuyer', formik.values.codeFlightBuyer.toUpperCase());
                        this.onCheckCodeFlightBuyer(formik);
                      }}
                      error={formik.values.errCodeFlightBuyer}
                      textAlignStyle={'right'}
                    />
                  </View>
                </View>
                <View style={{
                  flexDirection: 'row',
                  marginBottom: 16
                }}>
                  <View style={{ flex: 0.5, paddingRight: 5 }}>
                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Thời gian đi</Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text style={{ color: '#414042', textAlign: 'right' }}>
                      {
                        delayFlight?.info?.showDepartCreate ?
                          `${delayFlight?.info?.hourDepart} - ${delayFlight?.info?.startDateString}` :
                          `${moment(delayFlight?.info?.departFlight?.estimateDepartTime).format('HH:mm')} - ${moment(delayFlight?.info?.departFlight?.estimateDepartTime).format('DD/MM/YYYY')}`
                      }
                    </Text>
                    <Text style={{ color: '#414042', textAlign: 'right' }}>
                      {delayFlight?.info?.fromPlace}
                    </Text>
                  </View>
                </View>
                <View style={{
                  flexDirection: 'row',
                  marginBottom: 16
                }}>
                  <View style={{ flex: 0.5, paddingRight: 5 }}>
                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Thời gian đến</Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text style={{ color: '#414042', textAlign: 'right' }}>
                      {
                        delayFlight?.info?.showDepartCreate ?
                          `${delayFlight?.info?.hourDepartArrive} - ${delayFlight?.info?.endDateDepart}` :
                          `${moment(delayFlight?.info?.departFlight?.estimateArriveTime).format('HH:mm')} - ${moment(delayFlight?.info?.departFlight?.estimateArriveTime).format('DD/MM/YYYY')}`
                      }
                    </Text>
                    <Text style={{ color: '#414042', textAlign: 'right' }}>
                      {delayFlight?.info?.toPlace}
                    </Text>
                  </View>
                </View>
                <View style={{
                  flexDirection: 'row',
                  marginBottom: 16
                }}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Thời gian bay</Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text style={{ color: '#414042', textAlign: 'right' }}>
                      {
                        delayFlight?.info?.showDepartCreate ?
                          `${formatHours(moment(`${delayFlight?.info?.endDateDepart} ${delayFlight?.info?.hourDepartArrive}`, 'DD/MM/YYYY HH:mm').diff(moment(`${delayFlight?.info?.startDateString} ${delayFlight?.info?.hourDepart}`, 'DD/MM/YYYY HH:mm'), 'minutes'))}` :
                          `${formatHours(delayFlight?.info?.departFlight?.estimateDurationMinutes)}`
                      }
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {
              delayFlight?.info?.flightType === 'Khứ hồi' ? (

                <View style={{ marginTop: 16 }}>
                  <View style={styles.formContainer}>
                    <View style={{
                      flexDirection: 'row',
                      marginBottom: 16
                    }}>
                      <View style={{ flex: 0.6 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: TxtColor }}>
                          2. Số hiệu chuyến bay
                        </Text>
                      </View>
                      <View style={{ flex: 0.4 }}>
                        <Text style={{ color: '#414042', fontWeight: 'bold', textAlign: 'right' }}>
                          {
                            delayFlight?.info?.showReturnCreate ?
                              delayFlight?.info?.numberReturn :
                              delayFlight?.info?.returnFlight?.flightNumber
                          }
                        </Text>
                      </View>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 16
                    }}>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Mã đặt chỗ</Text>
                      </View>
                      <View style={{ flex: 0.5, marginTop: -30 }}>
                        <FormikInput
                          name={'codeReturnFlightBuyer'}
                          maxLength={12}
                          autoUpperCase
                          keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                          onBlur={() => {
                            formik.setFieldValue('codeReturnFlightBuyer', formik.values.codeReturnFlightBuyer.toUpperCase());
                            this.onCheckCodeReturnFlightBuyer(formik);
                          }}
                          error={formik.values.errCodeReturnFlightBuyer}
                          textAlignStyle={'right'}
                        />
                      </View>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      marginBottom: 16
                    }}>
                      <View style={{ flex: 0.5, paddingRight: 5 }}>
                        <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Thời gian đi</Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: '#414042', textAlign: 'right' }}>
                          {
                            delayFlight?.info?.showReturnCreate ?
                              `${delayFlight?.info?.hourReturn} - ${delayFlight?.info?.endDateString}` :
                              `${moment(delayFlight?.info?.returnFlight?.estimateDepartTime).format('HH:mm')} - ${moment(delayFlight?.info?.returnFlight?.estimateDepartTime).format('DD/MM/YYYY')}`
                          }
                        </Text>
                        <Text style={{ color: '#414042', textAlign: 'right' }}>
                          {delayFlight?.info?.toPlace}
                        </Text>
                      </View>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      marginBottom: 16
                    }}>
                      <View style={{ flex: 0.5, paddingRight: 5 }}>
                        <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Thời gian đến</Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: '#414042', textAlign: 'right' }}>
                          {
                            delayFlight?.info?.showReturnCreate ?
                              `${delayFlight?.info?.hourReturnArrive} - ${delayFlight?.info?.endDateReturn}` :
                              `${moment(delayFlight?.info?.returnFlight?.estimateArriveTime).format('HH:mm')} - ${moment(delayFlight?.info?.returnFlight?.estimateArriveTime).format('DD/MM/YYYY')}`
                          }
                        </Text>
                        <Text style={{ color: '#414042', textAlign: 'right' }}>
                          {delayFlight?.info?.fromPlace}
                        </Text>
                      </View>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      marginBottom: 16
                    }}>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Thời gian bay</Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: '#414042', textAlign: 'right' }}>
                          {
                            delayFlight?.info?.showReturnCreate ?
                              `${formatHours(moment(`${delayFlight?.info?.endDateReturn} ${delayFlight?.info?.hourReturnArrive}`, 'DD/MM/YYYY HH:mm').diff(moment(`${delayFlight?.info?.endDateString} ${delayFlight?.info?.hourReturn}`, 'DD/MM/YYYY HH:mm'), 'minutes'))}` :
                              `${formatHours(delayFlight?.info?.returnFlight?.estimateDurationMinutes)}`
                          }
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ) : null
            }
            <View style={[{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }]}>
              <IconBuyerSvg height={15} width={15} color={Color} />
              <Text style={styles.titleStyle}>
                Người được bảo hiểm:
              </Text>
            </View>
            {
              this.renderListInsuredCustomer(formik.values)
            }
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
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
            {
              formik.values.isVat ? (
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
                    label={'Email nhận hóa đơn *'}
                    name={'companyEmail'}
                    keyboardEmail
                  />
                  <FormikInput
                    label={'Địa chỉ doanh nghiệp *'}
                    name={'companyAddress'}
                  />
                </View>
              ) : null
            }
            <View style={{ marginTop: 24 }}>
              <Button
                color={this.checkInsuredCustomers(formik.values) ? NewColor : NewColorDisable}
                label={'TIẾP TỤC'}
                onPress={formik.handleSubmit}
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
    Actions.PackageDelayFlight();
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
              <ImageHeaderScroll code={'DF1'} offset={this.scrollYAnimatedValue} />
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
          <View style={{zIndex: 2011}}>
              <HeaderScroll code={'DF1'} offset={this.scrollYAnimatedValue} />
          </View>
          <ScrollView
            style={{ zIndex: 1000 }}
            contentContainerStyle={{
              paddingBottom: 20,
              paddingTop: HEADER_MAX_HEIGHT
            }}
            ref={this.setScrollViewRef}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
            )}>
            <View style={styles.contentContainer}>
              <View style={[styles.titleContainer, { marginTop: 20 }]}>
                <IconPlaneSvg width={16} height={16} />
                <Text style={styles.titleStyle}>
                  Chuyến bay mua bảo hiểm:
                </Text>
              </View>
              {this.renderFormInputInfomation()}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View >
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
import { saveBuyerDelayFlight, saveCodeNumber } from './actions/actions';
import moment from 'moment';

const mapStateToProps = (state) => {
  return {
    buyerInfomation: state.delayFlight.delayFlightBuyer?.buyerInfomation,
    insuredCustomerInfo: state.delayFlight.delayFlightBuyer?.insuredCustomers,
    isValidPackage: state.delayFlight.delayFlightBuyer?.isValidPackage,
    delayFlight: state.delayFlight.delayFlightInfo,
    codeNumber: state.delayFlight.codeNumber,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveBuyerDelayFlight: body => dispatch(saveBuyerDelayFlight(body)),
    saveCodeNumber: body => dispatch(saveCodeNumber(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Buyer);
