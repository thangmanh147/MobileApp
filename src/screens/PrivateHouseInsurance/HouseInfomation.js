import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  ERROR_HOUSE_TYPE_REQUIRED,
  ERROR_PROVINCE_REQUIRED,
  ERROR_HOUSE_YEAR_REQUIRED,
  ERROR_HOUSE_FEE_RATE_REQUIRED,
  ERROR_DISTRICT_REQUIRED,
  ERROR_ADDRESS_REQUIRED,
  ERROR_HOUSE_VALUE_REQUIRED,
  ERROR_PROPERTY_VALUE_REQUIRED,
  ERROR_HOUSE_YEAR_FORMAT,
  ERROR_HOUSE_FEE_RATE_FORMAT,
  ERROR_HOUSE_FEE_RATE_ZERO,
  ERROR_HOUSE_VALUE_ZERO,
  ERROR_HOUSE_VALUE_FORMAT,
} from '../../config/ErrorMessage';
import NavWithImage from '../../components/NavWithImage';
import {Formik} from 'formik';
import {handleTextInput} from 'react-native-formik';
import InputForm from '../../components/buy/InputForm';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import {Color, URL} from '../../config/System';
import ModalButton from '../FlightInsurance/component/ModalButton';
import * as Yup from 'yup';
import InputSelectForm from '../../components/buy/InputSelectForm';
import {Actions} from 'react-native-router-flux';
import ModalHouseType from './components/ModalHouseType';
import {ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalDistrict from '../CarInsurance/components/ModalDistrict';

class HouseInfomation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalHouseType: null,
      modalProvince: null,
      modalDistrict: null,
      modalHouseProperty: null,
      houseType: '',
      insurObjectTypeId: '',
      deductibleValue: 0,
      inhousePackageId: null,
      houseValue: '',
    };
  }
  // lấy mức khấu trừ theo giá trị nhà và id loại nhà
  getDeductible = (props) => {
    new Store().getSession(Const.TOKEN).then(token => {
      const {insurObjectTypeId} = this.state;
      const url = `${URL}/api/contract/v1/insur-deductible?insurObjectTypeId=${insurObjectTypeId}&valueInsur=${
        props.values.insuredValue
      }`;
      fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res.json().then(response => {
            this.setState({deductibleValue: response?.data[0]?.value});
            props.setFieldValue(
              'deductibleValue',
              renderVND(response?.data[0]?.value),
            );
          });
        }
      });
    });
  };
  validateSchema = Yup.object().shape({
    type: Yup.string().required(ERROR_HOUSE_TYPE_REQUIRED), // validate loại hình ngôi nhà
    completeYear: Yup.string()  // validate năm hoàn thành
      .strict(false)  // disable error message mặc định
      .trim() // xóa khoảng trăng
      .required(ERROR_HOUSE_YEAR_REQUIRED)  // required
      // check năm hoàn thành chỉ bao gồm chữ số
      .test(
        'completeYear',
        ERROR_HOUSE_YEAR_FORMAT,
        values => !validateNumOnly.test(values),
      )
      // check năm hoàn thành k thể bằng 0
      .test('completeYear', ERROR_HOUSE_YEAR_FORMAT, values =>
        this.checkNumber(values),
      ),
    feeRate: Yup.string() // validate tỷ lệ phí
      .strict(false)
      .trim()
      .required(ERROR_HOUSE_FEE_RATE_REQUIRED)
      // check tỷ lệ phí chỉ bao gồm chữ số, '%' và '.'
      .test(
        'feeRate',
        ERROR_HOUSE_FEE_RATE_FORMAT,
        values => !validateFeeRate.test(values),
      )
      // check tỷ lệ phí chỉ bao gồm chữ số
      .test('feeRate', ERROR_HOUSE_FEE_RATE_ZERO, values =>
        this.checkNumber(values),
      ),
    insuredValue: Yup.string()  // validate số tiền bảo hiểm căn nhà
      .strict(false)
      .trim()
      .required(ERROR_HOUSE_VALUE_REQUIRED)
      // check số tiền bảo hiểm căn nhà chỉ bao gồm chữ số
      .test(
        'insuredValue',
        ERROR_HOUSE_VALUE_FORMAT,
        values => !validateInsuredValue.test(values),
      )
      // check số tiền bảo hiểm căn nhà k thể bằng 0
      .test('insuredValue', ERROR_HOUSE_VALUE_ZERO, values =>
        this.checkNumber(values),
      ),
    houseProperty: Yup.string().required(ERROR_PROPERTY_VALUE_REQUIRED),  // validate required số tiền bảo hiểm tài sản bên trong nhà
    province: Yup.string().required(ERROR_PROVINCE_REQUIRED),   // validate required tỉnh/tp
    district: Yup.string().required(ERROR_DISTRICT_REQUIRED),   // validate required quận/huyện
    address: Yup.string().required(ERROR_ADDRESS_REQUIRED),     // validate required địa chỉ
  });
  // check giá trị = 0
  checkNumber = values => {
    if (parseFloat(values) == 0) {
      return false;
    } else {
      return true;
    }
  };
  // chọn loại hình ngôi nhà
  setHouseType = (data, props) => {
    this.setState({houseType: data.name});
  };
  assignHouseValue = (value, props) => {
    
      var b = value.replace(/\,/g, '');
      var a = Number(b);
      props.setFieldValue('insuredValue', renderVND(a))
      // this.setState({houseValue: renderVND(a)})
  }
  // lưu thông tin vào redux
  storeInfomation = values => {
    const arr = {
      purposeUsesHouse: values.type,
      insurObjectTypeId: this.state.insurObjectTypeId,
      completeYear: values.completeYear,
      housePrice: values.insuredValue,
      feeRate: values.feeRate,
      deductibleValue: this.state.deductibleValue,
      inHousePackageId: this.state.inhousePackageId,
      cityName: values.province,
      districtName: values.district,
      address: values.address,
      inhousePackage: values.houseProperty,
    };
    this.props.saveHouseInfomation(arr);
    Actions.HouseInsurancePackage();
  };
  render() {
    const {
      modalHouseType,
      modalProvince,
      modalDistrict,
      modalHouseProperty,
    } = this.state;
    const FormikInput = handleTextInput(InputForm);
    const FormikSelect = handleTextInput(InputSelectForm);
    return (
      <View style={styles.container}>
        <NavWithImage
          isInfo={false}
          title={'Bảo hiểm nhà tư nhân'}
          onPress={() => Actions.pop()}
          image={require('../../icons/iconAgent/ic_banner_house.png')}
        />
        <ScrollView style={{marginTop: -heightPercentageToDP('6')}}>
          <Formik
            onSubmit={values => this.storeInfomation(values)}
            initialValues={{
              type: '',
              time: '',
              completeYear: '',
              feeRate: '',
              insuredValue: '',
              houseProperty: '',
              province: '',
              district: '',
              address: '',
              deductibleValue: '',
            }}
            validationSchema={this.validateSchema}
            enableReinitialize={true}
            isInitialValid={false}>
            {props => {
              return (
                <View style={{backgroundColor: 'transparent'}}>
                  <ModalHouseType
                    open={modalHouseType}
                    onClosed={() => this.setState({modalHouseType: null})}
                    setHouseType={data => {
                      props.setFieldValue('type', data.name),
                        this.setState({insurObjectTypeId: data.id}),
                        this.getDeductible(props);
                    }}
                    onOpened={() => this.setState({modalHouseType: true})}
                  />
                  <ModalHouseProperty
                    open={modalHouseProperty}
                    onClosed={() => this.setState({modalHouseProperty: null})}
                    setHouseType={data => {
                      props.setFieldValue('houseProperty', data.name),
                        this.setState({inhousePackageId: data.id});
                    }}
                    onOpened={() => this.setState({modalHouseProperty: true})}
                  />
                  <ModalProvince
                    open={modalProvince}
                    onClosed={() => this.setState({modalProvince: null})}
                    setProvince={data => {
                      props.setFieldValue('province', data._name),
                        this.props.getDistrict(data.id);
                    }}
                    onOpened={() => this.setState({modalProvince: true})}
                  />
                  <ModalDistrict
                    open={modalDistrict}
                    onClosed={() => this.setState({modalDistrict: null})}
                    setDistrict={data =>
                      props.setFieldValue('district', data._name)
                    }
                    onOpened={() => this.setState({modalDistrict: true})}
                  />
                  <View style={styles.formInputContainer}>
                    <View>
                      <Text style={styles.formTitleStyle}>
                        {' '}
                        MUA BẢO HIỂM NHÀ TƯ NHÂN{' '}
                      </Text>
                    </View>
                    <FormikSelect
                      label={'Loại hình ngôi nhà'}
                      name={'type'}
                      openModal={() => this.setState({modalHouseType: true})}
                      maxLength={40}
                    />
                    <View style={styles.inputRow}>
                      <View style={{width: '47%'}}>
                        <FormikInput
                          label={'Năm hoàn thành'}
                          name={'completeYear'}
                          editable={true}
                          keyboardType={'number-pad'}
                        />
                      </View>
                      <View style={{width: '47%'}}>
                        <FormikInput
                          label={'Tỷ lệ phí'}
                          name={'feeRate'}
                          editable={true}
                          keyboardType={'number-pad'}
                        />
                      </View>
                    </View>
                    <FormikInput
                      label={'Số tiền bảo hiểm căn nhà'}
                      name={'insuredValue'}
                      suffix={'đ'}
                      editable={true}
                      onBlur={values => this.getDeductible(props, values)}
                      keyboardType={'number-pad'}
                      onChangeText={(value) => this.assignHouseValue(value, props)}
                      // value={this.state.houseValue}
                    />
                    <FormikInput
                      label={'Mức khấu trừ/vụ'}
                      name={'deductibleValue'}
                      editable={false}
                    />
                    <FormikSelect
                      label={'Số tiền bảo hiểm tài sản bên trong nhà'}
                      name={'houseProperty'}
                      openModal={() =>
                        this.setState({modalHouseProperty: true})
                      }
                    />
                    <FormikSelect
                      label={'Tỉnh/Thành phố'}
                      name={'province'}
                      openModal={() => this.setState({modalProvince: true})}
                      editable={false}
                    />
                    <FormikSelect
                      label={'Quận/Huyện'}
                      name={'district'}
                      openModal={() => this.setState({modalDistrict: true})}
                      editable={false}
                    />
                    <FormikInput
                      label={'Địa chỉ nhà được bảo hiểm'}
                      name={'address'}
                      editable={true}
                    />
                    <ModalButton
                      style={[
                        styles.buttonStyle,
                        {
                          backgroundColor: !props.isValid
                            ? '#EEA469'
                            : '#F37A15',
                        },
                      ]}
                      label={'GỬI THÔNG TIN'}
                      onPress={props.handleSubmit}
                      disabled={!props.isValid}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
          <View style={{padding: 24, backgroundColor: '#FFFFFF'}}>
            <View style={styles.titleContainer}>
              <FastImage
                source={require('../../icons/iconAgent/ic_info.png')}
                style={{height: 15, width: 15}}
                resizeMode={'contain'}
              />
              <Text style={styles.titleStyle}>Phạm vi bảo hiểm</Text>
            </View>
            <View>
              <Text style={styles.contentTitle}>
                PTI bồi thường cho những tổn thất hay thiệt hại phát sinh từ
                những rủi ro sau:{' '}
              </Text>
              <Text>
                {`- Cháy, sét đánh, nổ do hơi đốt hoặc khí đốt phục vụ duy nhất là cho mục đích sinh hoạt;${'\n'}- Máy bay và các phương tiện hàng không khác hoặc các thiết bị trên các phương tiện đó rơi vào;${'\n'}- Động đất hay núi lửa phun;${'\n'}- Giông, bão và lụt;${'\n'}- Bảo hiểm trộm cướp đi kèm dấu hiệu đột nhập, sử dụng vũ lực và tẩu thoát;${'\n'}- Đâm va do xe cộ súc vật.`}
              </Text>
              <Text style={styles.contentTitle}>
                Ngoài ra, PTI còn hỗ trợ khách hàng những chi phí sau:{' '}
              </Text>
              <Text>
                {` Chi phí cứu hỏa và chi phí dập lửa khác (Hạn mức trách nhiệm: 30 triệu đồng/vụ);${'\n'}- Chi phí dọn dẹp hiện trường (Hạn mức trách nhiệm: 30 triệu đồng/vụ);${'\n'}- Điều khoản về Chi phí thuê nhà (Hạn mức trách nhiệm: 5 triệu đồng/sự cố);${'\n'}- Điều khoản về Chi phí thuê kiến trúc sư, thiết kế (Hạn mức trách nhiệm: 30 triệu đồng/vụ).`}
              </Text>
              <Text style={{color: Color, fontStyle: 'italic', marginTop: 10}}>
                Lưu ý: PTI không bảo hiểm cho rủi ro sóng thần và bão trên cấp 8
                đối với những ngôi nhà trong phạm vi cách biển 1km (theo đường
                chim bay).
              </Text>
            </View>
          </View>
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
  formInputContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: widthPercentageToDP('87'),
    backgroundColor: Color,
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 10,
  },
  formTitleStyle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
  },
  formInputStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  buttonStyle: {
    width: '90%',
    marginTop: 15,
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
  contentTitle: {
    fontWeight: '700',
    marginTop: 10,
  },
  inputRow: {
    flexDirection: 'row',
  },
});
import {connect} from 'react-redux';
import {getDistrict} from '../CarInsurance/actions/car_Buy';
import {saveHouseInfomation} from './actions/house_buy';
import {renderVND} from '../../components/Functions';
import ModalHouseProperty from './components/ModalHouseProperty';
import {validateNumOnly, validateFeeRate, validateIdentity, validateInsuredValue} from '../../config/Validation';
import Store from '../../services/Store';
import Const from '../../services/Const';

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    getDistrict: id => dispatch(getDistrict(id)),
    saveHouseInfomation: body => dispatch(saveHouseInfomation(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HouseInfomation);
