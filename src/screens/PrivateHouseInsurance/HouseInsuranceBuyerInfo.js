import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavWithImage from '../../components/NavWithImage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../components/buy/Button';
import FastImage from 'react-native-fast-image';
import {Color, subColor} from '../../config/System';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {
  renderVND,
  isPhone,
} from '../../components/Functions';
import {Formik, yupToFormErrors} from 'formik';
import * as Yup from 'yup';
import {handleTextInput} from 'react-native-formik';
import Input from '../CarInsurance/components/Input';
import InputSelect from '../../components/buy/InputSelect';
import ModalBuyerType from '../TravelInsurance/components/ModalBuyerType';
import {
  validateIdentity,
  validateName,
  validatePhone,
} from '../../config/Validation';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class HouseInsuranceBuyerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseInfo: [
        {
          type: 'Nhà liền kề hoặc biệt thự',
          time: '0-5 năm',
          insuredValue: '500,000,000đ',
          houseProperty: '500,000,000đ',
          address: 'Số 1, tổ 14, ngách 46/60, Hoàng Liệt, Hoàng Mai, Hà Nội',
        },
      ],
      currentDate: '',
      buyerType: 'Cá nhân',
      buyerTypeId: 1,
      modalBuyerType: null,
      modalProvince: null,
      modalDistrict: null,
      houseType: '',
      housePrice: '',
      completeYear: '',
      housePropertyValue: null,
      address: '',
      inhousePackage: '',
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
  // lấy thông tin nhà từ redux
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (
      nextProps.houseInfomation &&
      nextProps.houseInfomation !== prevState.houseInfomation
    ) {
      //update.listProvinces = nextProps.listProvince,
      update.houseType = nextProps.houseInfomation.purposeUsesHouse;
      update.housePrice = nextProps.houseInfomation.housePrice;
      update.completeYear = nextProps.houseInfomation.completeYear;
      update.address = nextProps.houseInfomation.address;
      update.inhousePackage = nextProps.houseInfomation.inhousePackage;
    }
    return update;
  }
  validationShape = () => {
    // đối tượng mua bảo hiểm =  cá nhân
    if (this.state.buyerType == 'Cá nhân') {
      const validationShape = Yup.object().shape({
        name: Yup.string() // validate họ và tên người được bảo hiểm
          .strict(false) // disable error message mặc định
          .trim() // xóa khoảng trăng
          .required(ERROR_NAME_REQUIRED) // required
          // check họ tên k chứa ký tự đặc biệt và số
          .test(
            'name',
            ERROR_NAME_FORMAT,
            values => !validateName.test(values),
          ),
        identity: Yup.string() // validate cmnd/cccd/hộ chiếu người được bảo hiểm
          .strict(false)
          .trim()
          .required(ERROR_IDENTITY_REQUIRED)
          // check k được có ký tự đặc biệt
          .test(
            'buyerIdentity',
            ERROR_IDENTITY_FORMAT,
            values => !validateIdentity.test(values),
          ),
        phone: Yup.string() // validate số điện thoại người được bảo hiểm
          .strict(false)
          .trim()
          .required(ERROR_PHONE_REQUIRED)
          .test('phone', ERROR_PHONE_FORMAT, values => isPhone(values)), // check định dạng sđt người được bảo hiểm
        buyerName: Yup.string() // validate họ tên người mua
          .strict(false)
          .trim()
          .required(ERROR_NAME_REQUIRED)
          // check họ tên k chứa ký tự đặc biệt và số
          .test(
            'buyerName',
            ERROR_NAME_FORMAT,
            values => !validateName.test(values),
          ),
        buyerPhone: Yup.string() // validate sdt người mua
          .strict(false)
          .trim()
          .required(ERROR_PHONE_REQUIRED)
          .test('buyerPhone', ERROR_PHONE_FORMAT, values => isPhone(values)), // check định dạng sđt
        buyerEmail: Yup.string() // validate email người mua
          .strict(false)
          .trim()
          .required(ERROR_EMAIL_REQUIRED)
          .email(ERROR_EMAIL_FORMAT), // check định dạng email phải có '@' và domain
        buyerIdentity: Yup.string() // validate cmnd/cccd/hộ chiếu người mua
          .strict(false)
          .trim()
          .required(ERROR_IDENTITY_REQUIRED)
          // check k được có ký tự đặc biệt
          .test(
            'buyerIdentity',
            ERROR_IDENTITY_FORMAT,
            values => !validateIdentity.test(values),
          ),
        buyerProvince: Yup.string().required(ERROR_PROVINCE_REQUIRED), // validate required tỉnh/tp
        buyerDistrict: Yup.string().required(ERROR_DISTRICT_REQUIRED), // validate required quận/huyện
        buyerAddress: Yup.string().required(ERROR_ADDRESS_REQUIRED), // validate required địa chỉ
      });
      return validationShape;
      // đối tượng mua bảo hiểm =  doanh nghiệp
    } else {
      const validationShape = Yup.object().shape({
        name: Yup.string() // validate họ và tên người được bảo hiểm
          .strict(false)
          .trim()
          .required(ERROR_NAME_REQUIRED)
          // check họ tên k chứa ký tự đặc biệt và số
          .test(
            'buyerName',
            ERROR_NAME_FORMAT,
            values => !validateName.test(values),
          ),
        identity: Yup.string() // validate cmnd/cccd/hộ chiếu người được bảo hiểm
          .strict(false)
          .trim()
          .required(ERROR_IDENTITY_REQUIRED)
          // check k được có ký tự đặc biệt
          .test(
            'buyerIdentity',
            ERROR_IDENTITY_FORMAT,
            values => !validateIdentity.test(values),
          ),
        phone: Yup.string() // validate số điện thoại người được bảo hiểm
          .strict(false)
          .trim()
          .required('Bạn phải nhập SĐT')
          .test('phone', ERROR_PHONE_FORMAT, values => isPhone(values)), // check định dạng sđt người được bảo hiểm
        companyRepresent: Yup.string() // validate họ tên người đại diện
          .strict(false)
          .trim()
          .required(ERROR_NAME_REQUIRED)
          // check họ tên k chứa ký tự đặc biệt và số
          .test(
            'companyRepresent',
            ERROR_NAME_FORMAT,
            values => !validateName.test(values),
          ),
        representEmail: Yup.string() // validate email người đại diện
          .strict(false)
          .trim()
          .required(ERROR_EMAIL_REQUIRED)
          .email(ERROR_EMAIL_FORMAT), // check định dạng email phải có '@' và domain
        companyName: Yup.string() // validate tên doanh nghiệp
          .strict(false)
          .trim()
          .required(ERROR_COMPANY_NAME_REQUIRED),
        buyerProvince: Yup.string().required(ERROR_PROVINCE_REQUIRED),  // validate required tỉnh/tp
        buyerDistrict: Yup.string().required(ERROR_DISTRICT_REQUIRED),  // validate required quận/huyện
        buyerAddress: Yup.string()    // validate địa chỉ người mua
          .strict(false)
          .trim()
          .required(ERROR_ADDRESS_REQUIRED),
      });
      return validationShape;
    }
  };
  // render thông tin ngôi nhà
  renderHouseInfo = () => (
    <View style={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <FastImage
          source={require('../../icons/iconAgent/ic_info.png')}
          style={{height: 15, width: 15}}
          resizeMode={'contain'}
        />
        <Text style={styles.titleStyle}>Thông tin nhà mua bảo hiểm</Text>
      </View>
      {this.state.houseInfo.map(item => {
        return (
          <View style={styles.tourInfoContainer}>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.6}}>
                <Text style={{color: '#8D8C8D'}}>Loại hình ngôi nhà:</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={{textAlign: 'right'}}>{this.state.houseType}</Text>
              </View>
            </View>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.6}}>
                <Text style={{color: '#8D8C8D'}}>Năm hoàn thành:</Text>
              </View>
              <View>
                <Text>{this.state.completeYear}</Text>
              </View>
            </View>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.6}}>
                <Text style={{color: '#8D8C8D'}}>
                  Số tiền bảo hiểm căn nhà:
                </Text>
              </View>
              <View>
                <Text>{renderVND(this.state.housePrice)}đ</Text>
              </View>
            </View>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.6}}>
                <Text style={{color: '#8D8C8D'}}>
                  Số tiền bảo hiểm tài sản bên trong nhà
                </Text>
              </View>
              <View>
                <Text>{this.state.inhousePackage}</Text>
              </View>
            </View>
            <View style={styles.tourInfo}>
              <View style={{flex: 0.6}}>
                <Text style={{color: '#8D8C8D'}}>
                  Địa chỉ nhà được bảo hiểm:
                </Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={{textAlign: 'right'}}>{this.state.address}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
  // chọn bên mua bảo hiểm
  setBuyerType = data => {
    this.setState({
      buyerType: data.name,
      buyerTypeId: data.id,
    });
  };
  // render bảng phí
  renderFee = () => (
    <View style={styles.contentContainer}>
      <View style={styles.table}>
        <View
          style={[
            styles.tableTitleContainer,
            {height: 45, backgroundColor: '#676667'},
          ]}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FFFFFF'}}>
              TÍNH PHÍ BẢO HIỂM
            </Text>
          </View>
        </View>
        <View style={{padding: 14}}>
          <View style={styles.tourInfo}>
            <Text style={{fontWeight: '700'}}>1. Phí BH khung nhà</Text>
            <Text style={{fontWeight: '700'}}>2.600.000đ</Text>
          </View>
          <View style={styles.tourInfo}>
            <Text>2. Phí BH tài sản bên trong</Text>
            <Text>40.000đ</Text>
          </View>
          <FastImage />
          <FastImage
            source={require('../../icons/iconAgent/ic_line_dotted.png')}
            style={{width: '100%', height: 1, marginTop: 8}}
          />
          <View style={styles.tourInfo}>
            <Text>Phí bảo hiểm</Text>
            <Text>2.363.636đ</Text>
          </View>
          <View style={styles.tourInfo}>
            <Text>VAT (10%)</Text>
            <Text>236.364đ</Text>
          </View>
          <View style={styles.hr} />
          <View style={styles.tourInfo}>
            <Text style={{fontWeight: '700'}}>Thanh toán:</Text>
            <Text style={{fontWeight: '700'}}>2.628.600đ</Text>
          </View>
        </View>
      </View>
    </View>
  );
  // lưu thông tin vào redux
  storeInfomation = values => {
    // người được bảo hiểm
    let insuredCustomer = {
      fullName: values.name,
      cardId: values.identity,
      phone: values.phone,
    };
    // thông tin người mua
    let buyerInfomation = {
      type: this.state.buyerTypeId,
      fullName: values.buyerName,
      birthday: values.birthday,
      cardId: values.buyerIdentity,
      email: values.buyerEmail,
      phone: values.buyerPhone,
      cityName: values.buyerProvince,
      districtName: values.buyerDistrict,
      address: values.buyerAddress,
      companyTaxCode: values.companyTaxCode,
      companyName: values.companyName,
      companyBuyerName: values.companyRepresent,
      representEmail: values.representEmail,
    };
    this.props.saveBuyerInfomation(buyerInfomation);
    this.props.saveInsuredCustomerInfo(insuredCustomer);
    Actions.ReviewInfomation();
  };
  // form điền thông tin
  renderInsuredCustomer = () => {
    const {modalProvince, modalDistrict, modalBuyerType} = this.state;
    const FormikInput = handleTextInput(Input);
    const FormikSelect = handleTextInput(InputSelect);
    return (
      <Formik
        onSubmit={values => this.storeInfomation(values)}
        initialValues={{
          name: '',
          identity: '',
          phone: '',
          buyerName: '',
          companyName: '',
          buyerPhone: '',
          buyerIdentity: '',
          buyerEmail: '',
          buyerProvince: '',
          buyerDistrict: '',
          buyerAddress: '',
          representEmail: '',
        }}
        isInitialValid={false}
        validationSchema={this.validationShape()}>
        {props => {
          return (
            <View style={styles.container}>
              <ModalProvince
                open={modalProvince}
                onClosed={() => this.setState({modalProvince: null})}
                setProvince={data => {
                  props.setFieldValue('buyerProvince', data._name),
                    this.props.getDistrict(data.id);
                }}
                onOpened={() => this.setState({modalProvince: true})}
              />
              <ModalDistrict
                open={modalDistrict}
                onClosed={() => this.setState({modalDistrict: null})}
                setDistrict={data =>
                  props.setFieldValue('buyerDistrict', data._name)
                }
                onOpened={() => this.setState({modalDistrict: true})}
              />
              <ModalBuyerType
                open={modalBuyerType}
                onClosed={() => this.setState({modalBuyerType: null})}
                setBuyerType={data => {
                  this.setBuyerType(data),
                    props.resetForm({
                      values: {
                        name: props.values.name,
                        identity: props.values.identity,
                        phone: props.values.phone,
                      },
                    });
                }}
                onOpened={() => this.setState({modalBuyerType: true})}
              />
              {/* form nhập thông tin người được bảo hiểm  */}
              <FormikInput label={'Họ và tên *'} name={'name'} />
              <View style={styles.inputRow}>
                <View style={{width: '46%'}}>
                  <FormikInput
                    label={'CMND/CCCD/Hộ chiếu *'}
                    name={'identity'}
                  />
                </View>
                <View style={{width: '46%'}}>
                  <FormikInput
                    label={'Số điện thoại *'}
                    name={'phone'}
                    keyboardType={'number-pad'}
                  />
                </View>
              </View>
              {/* form nhập thông tin người mua bảo hiểm  */}
              <View>
                <Text style={{color: Color, fontSize: 16}}>
                  Thông tin người mua bảo hiểm
                </Text>
              </View>
              <FormikSelect
                label={'Bên mua bảo hiểm'}
                value={this.state.buyerType}
                openModal={() => this.setState({modalBuyerType: true})}
              />
              {this.state.buyerType == 'Cá nhân' ? (  // form cá nhân
                <View>
                  <FormikInput label={'Họ và tên *'} name={'buyerName'} />
                  <FormikInput label={'Email *'} name={'buyerEmail'} />
                  <View style={styles.inputRow}>
                    <View style={{width: '46%'}}>
                      <FormikInput
                        label={'Số điện thoại *'}
                        name={'buyerPhone'}
                        keyboardType={'number-pad'}
                      />
                    </View>
                    <View style={{width: '46%'}}>
                      <FormikInput
                        label={'CMND/ CCCD/ Hộ chiếu *'}
                        name={'buyerIdentity'}
                      />
                    </View>
                  </View>
                  <View style={styles.inputRow}>
                    <View style={{width: '46%'}}>
                      <FormikSelect
                        label={'Tỉnh/ Thành phố'}
                        name={'buyerProvince'}
                        openModal={() => this.setState({modalProvince: true})}
                      />
                    </View>
                    <View style={{width: '46%'}}>
                      <FormikSelect
                        label={'Quận/ Huyện'}
                        name={'buyerDistrict'}
                        openModal={() => this.setState({modalDistrict: true})}
                      />
                    </View>
                  </View>
                  <FormikInput label={'Địa chỉ'} name={'buyerAddress'} />
                </View>
              ) : null}
              {this.state.buyerType == 'Doanh nghiệp' ? (   // form doanh nghiệp
                <View>
                  <FormikInput
                    label={'Họ và tên người mua *'}
                    name={'companyRepresent'}
                  />
                  <FormikInput label={'Email'} name={'representEmail'} />
                  <FormikInput
                    label={'Tên doanh nghiệp *'}
                    name={'companyName'}
                  />
                  <View style={styles.inputRow}>
                    <View style={{width: '46%'}}>
                      <FormikSelect
                        label={'Tỉnh/ Thành phố'}
                        name={'buyerProvince'}
                        openModal={() => this.setState({modalProvince: true})}
                      />
                    </View>
                    <View style={{width: '46%'}}>
                      <FormikSelect
                        label={'Quận/ Huyện'}
                        name={'buyerDistrict'}
                        openModal={() => this.setState({modalDistrict: true})}
                      />
                    </View>
                  </View>
                  <FormikInput label={'Địa chỉ'} name={'buyerAddress'} />
                </View>
              ) : null}
              <View style={{paddingVertical: 10}}>
                <Text>
                  Trong vòng 24 giờ (không kể thứ 7, chủ nhật và ngày lễ, tết)
                  cán bộ PTI sẽ liên hệ để tiến hành các thủ tục giao nhận.
                </Text>
              </View>
              <Button
                color={props.isValid ? Color : subColor}
                disable={!props.isValid}
                label={'TIẾP TỤC'}
                onPress={props.handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    );
  };

  render() {
    const {modalBuyerType, errorCodePackage1, errorCodePackage2} = this.state;
    return (
      <View style={styles.container}>
        <NavWithImage
          isInfo={false}
          title={'Bảo hiểm nhà tư nhân'}
          onPress={() => Actions.pop()}
          image={require('../../icons/iconAgent/ic_banner_house.png')}
        />
        <KeyboardAwareScrollView>
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
          {this.renderHouseInfo()}
          {this.renderFee()}
          <View style={{padding: 24}}>
            <View style={styles.titleContainer}>
              <FastImage
                source={require('../../icons/iconAgent/ic_info.png')}
                style={{height: 15, width: 15}}
                resizeMode={'contain'}
              />
              <Text style={styles.titleStyle}>
                Thông tin người được bảo hiểm
              </Text>
            </View>
            {this.renderInsuredCustomer()}
          </View>
        </KeyboardAwareScrollView>
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
    paddingHorizontal: 16,
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    shadowColor: 'rgba(0, 107, 153, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 14,
    width: widthPercentageToDP('90'),
    marginTop: 16,
  },
  tourInfo: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  table: {
    flex: 1,
    alignSelf: 'center',
    width: widthPercentageToDP('90'),
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
  hr: {
    borderWidth: 0.5,
    borderColor: '#676667',
    borderRadius: 1,
  },
  textError: {
    color: '#F97C7C',
  },
  txtErrorCode: {
    color: '#F97C7C',
    fontSize: 12,
    marginTop: 5,
  },
  inputRow: {
    marginTop: -5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

import {getDistrict} from '../CarInsurance/actions/car_Buy';
import {
  saveInsuredCustomerInfo,
  saveBuyerInfomation,
} from './actions/house_buy';
import {
  ERROR_ADDRESS_REQUIRED,
  ERROR_COMPANY_NAME_REQUIRED,
  ERROR_DISTRICT_REQUIRED,
  ERROR_EMAIL_FORMAT,
  ERROR_EMAIL_REQUIRED,
  ERROR_IDENTITY_FORMAT,
  ERROR_IDENTITY_REQUIRED,
  ERROR_NAME_FORMAT,
  ERROR_NAME_REQUIRED,
  ERROR_PHONE_FORMAT,
  ERROR_PHONE_REQUIRED,
  ERROR_PROVINCE_REQUIRED,
} from '../../config/ErrorMessage';
const mapStateToProps = state => {
  return {
    houseInfomation: state.houseBuy.houseInfomation,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveInsuredCustomerInfo: body => dispatch(saveInsuredCustomerInfo(body)),
    saveBuyerInfomation: body => dispatch(saveBuyerInfomation(body)),
    getDistrict: id => dispatch(getDistrict(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HouseInsuranceBuyerInfo);
