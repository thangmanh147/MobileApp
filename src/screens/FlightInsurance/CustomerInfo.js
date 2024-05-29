import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import Input from '../FlightInsurance/component/Input';
import ModalSex from '../FlightInsurance/component/ModalSex';
import AsyncStorage from '@react-native-community/async-storage';
import InputPlace from './component/InputPlace';
import moment from 'moment';
import SimpleToast from 'react-native-simple-toast';

class CustomerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'button',
      isShow: true,
      isDisabled: true,
      openSex: false,
      openSex1: false,
      name: '',
      gender: null,
      birthday: '',
      email: '',
      phone: '',
      genderLabel: '',
      identityNumber: '',
      currentDate: '',
      birthdayChanged: '',

      customerInfo: [],
      placeholder: [{}],

      errorCodeName: '',
      errorCodeEmail: '',
      errorCodeGender: '',
      errorCodeBirthDay: '',
      errorCodeIdentityNumber: '',
      errorCodePhone: '',
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
  // Thêm người được bảo hiểm vào array
  addField = async () => {
    const {
      customerInfo,
      name,
      gender,
      birthday,
      phone,
      email,
      identityNumber,
    } = this.state;
    let str = moment(birthday, 'DD/MM/YYYY');
    let formatedBirthday = str.format('YYYY-MM-DD');
    let array = customerInfo;
    array.push({
      fullName: name,
      gender: gender,
      birthday: formatedBirthday,
      phone: phone,
      email: email,
      identityNumber: identityNumber,
    });
    await this.setState({
      customerInfo: array,
      name: '',
      gender: '',
      birthday: '',
      phone: '',
      email: '',
      identityNumber: '',
      genderLabel: '',
    });
  };
  //check validate các field thông tin người được bảo hiểm
  checkAddField = () => {
    if (this.validateInsuredName()) {
      if (this.validateEmail()) {
        if (this.validateGender()) {
          if (this.validateBirthDay()) {
            if (this.validateIdentityNumber()) {
              if (this.validatePhoneNumber()) {
                return true;
              }
            }
          }
        }
      }
    }
  };
  // Thêm người được bảo hiểm
  onPressAdd = () => {
    if (this.checkAddField()) {
      this.addField();
    }
  };
  // lưu thông tin vào redux
  storeInfomation = () => {
    const {customerInfo} = this.state;
    this.addField();
    this.props.saveCustomerInfo(customerInfo);
  };
  next = () => {
    if (this.checkAddField()) {
      this.storeInfomation();
      Actions.BillExportInfo();
    }
  };
  // convert định dạng ngày => DD/MM/YYYY
  formatDate = date => {
    let parsedDate = moment(date, 'YYYY-MM-DD');
    let formatedDate = parsedDate.format('DD/MM/YYYY');
    return formatedDate;
  };
  // nhập ngày sinh
  inputBirthDay = text => {
    const str = text;
    if (text.length === 2 && this.state.birthday.charAt(2) !== '/') {
      let a = str.slice(0, 2);
      this.setState({
        birthday: (text += '/'),
      });
      if (parseInt(a) > 31 || parseInt(a) == 0) {
        SimpleToast.show('Ngày sinh không hợp lệ');
        this.setState({birthday: ''});
      }
    } else if (text.length === 5 && this.state.birthday.charAt(5) !== '/') {
      let a = str.slice(3, 5);
      let b = str.slice(0, 2);
      this.setState({
        birthday: (text += '/'),
      });
      if (parseInt(a) > 12 || parseInt(a) == 0) {
        SimpleToast.show('Tháng sinh không hợp lệ');
        this.setState({birthday: this.state.birthday.slice(0, 3)});
      }
    } else {
      this.setState({birthday: text});
    }
    return;
  };
  // render error message
  showErrorNotInvalid(item) {
    return (
      <View>
        <Text style={styles.txtErrorCode}>{item}</Text>
      </View>
    );
  }
  // validate họ tên người được bảo hiểm
  validateInsuredName = () => {
    let validateName = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (this.state.name == '') {
      this.setState({
        errorCodeName: 'Tên người được bảo hiểm không được bỏ trống',
      });
      return false;
    }
    // check họ tên chỉ bao gồm chữ
    if (validateName.test(this.state.name)) {
      this.setState({errorCodeName: 'Tên người chỉ bao gồm kí tự chữ'});
      return false;
    } else {
      this.setState({errorCodeName: ''});
      return true;
    }
  };
  // validate email người được bảo hiểm
  validateEmail = () => {
    let validateEmail = /@+/;
    let validateEmail1 = /''+/;
    // required
    if (this.state.email == '') {
      this.setState({errorCodeEmail: 'Email không được bỏ trống'});
      return false;
    }
    // check email phải có '@'
    if (validateEmail.test(this.state.email) == false) {
      this.setState({errorCodeEmail: 'Email sai định dạng'});
      return false;
    }
    // check khoảng trắng
    if (validateEmail1.test(this.state.email) == true) {
      this.setState({errorCodeEmail: 'Email sai định dạng'});
      return false;
    } else {
      this.setState({errorCodeEmail: ''});
      return true;
    }
  };
  // validate giới tính người được bảo hiểm
  validateGender = () => {
    // required
    if (this.state.genderLabel == '') {
      this.setState({errorCodeGender: 'Giới tính không được để trống'});
      return false;
    } else {
      this.setState({errorCodeGender: ''});
      return true;
    }
  };
  // validate ngày sinh người được bảo hiểm
  validateBirthDay = () => {
    const {birthday, currentDate} = this.state;
    const parsedDate = moment(birthday, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    if (this.state.birthday == '') {
      this.setState({errorCodeBirthDay: 'Ngày sinh không được để trống'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(this.state.birthday) == false) {
      this.setState({errorCodeBirthDay: 'Ngày sinh không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(this.state.birthday) == false) {
      this.setState({errorCodeBirthDay: 'Ngày sinh không hợp lệ'});
      return false;
    }
    // check ngày sinh không được lớn hơn ngày hiện tại
    if (moment(str).isBefore(currentDate) == false) {
      this.setState({
        errorCodeBirthDay: 'Ngày sinh không được lớn hơn ngày hiện tại',
      });
      return false;
    } else {
      this.setState({errorCodeBirthDay: ''});
      return true;
    }
  };
  // validate cmnd/hộ chiếu
  validateIdentityNumber = () => {
    let validateIdentityNumber = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/; // check ký tự đặc biệt
    // required
    if (this.state.identityNumber == '') {
      this.setState({
        errorCodeIdentityNumber: 'CMND/Hộ chiếu không được để trống',
      });
      return false;
    }
    // check ký tự đặc biệt
    if (validateIdentityNumber.test(this.state.identityNumber)) {
      this.setState({
        errorCodeIdentityNumber: 'CMND/Hộ chiếu chỉ bao gồm số và chữ',
      });
      return false;
    } else {
      this.setState({errorCodeIdentityNumber: ''});
      return true;
    }
  };
  validatePhoneNumber = () => {
    let validateNumber = /[0-9]/; // check chỉ bao gồm số
    // required
    if (this.state.phone == '') {
      this.setState({errorCodePhone: 'SĐT không được để trống'});
      return false;
    }
    // check length = 10
    if (this.state.phone.length !== 10) {
      this.setState({errorCodePhone: 'SĐT chỉ bao gồm 10 chữ số'});
      return false;
    }
    // check sđt chi bao gồm chữ số
    if (validateNumber.test(this.state.phone) == false) {
      this.setState({errorCodePhone: 'SĐT chỉ bao gồm chữ số'});
      return false;
    }
    // check sđ phải bắt đầu bằng số 0
    if (this.state.phone.slice(0, 1) !== '0') {
      this.setState({errorCodePhone: 'SĐT phải bắt đầu bằng số 0'});
      return false;
    } else {
      this.setState({errorCodePhone: ''});
      return true;
    }
  };
  // sửa thông tin người được bảo hiểm đã add
  onChangeInfo = async (item, text, index) => {
    const {customerInfo} = this.state;  // customerInfo : danh sách người được bảo hiểm đã add
    switch (item) {
      // họ và tên
      case 'fullName':
        customerInfo[index].fullName = text; // set fullName theo index
        this.setState({customerInfo: customerInfo});
        return;
      // email
      case 'email':
        customerInfo[index].email = text;
        this.setState({customerInfo: customerInfo});
        return;
      // ngày sinh
      case 'birthday':
        let str = text;
        if (text.length === 2 && this.state.birthdayChanged.charAt(2) !== '/') {
          let a = str.slice(0, 2);
          await this.setState({birthdayChanged: (text += '/')});
          customerInfo[index].birthday = this.state.birthdayChanged;
          await this.setState({customerInfo: customerInfo});
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
          customerInfo[index].birthday = this.state.birthdayChanged;
          await this.setState({customerInfo: customerInfo});
          if (parseInt(a) > 12 || parseInt(a) == 0) {
            SimpleToast.show('Ngày sinh không hợp lệ');
            this.setState({
              birthdayChanged: this.state.birthdayChanged.slice(0, 3),
            });
          }
        } else {
          await this.setState({birthdayChanged: text});
          customerInfo[index].birthday = this.state.birthdayChanged;
          await this.setState({customerInfo: customerInfo});
        }
      // cmnd/ hộ chiếu
      case 'identityNumber':
        customerInfo[index].identityNumber = text;
        this.setState({customerInfo: customerInfo});
        return;
      // số điện thoại
      case 'phone':
        customerInfo[index].phone = text;
        this.setState({customerInfo: customerInfo});
        return;
    }
  };
  // sửa giới tính người được bảo hiểm đã add
  onChangeGender = (data, index) => {
    const {customerInfo} = this.state;
    customerInfo[index].gender = data.id;
  };
  //render form nhập thông tin
  renderFormInput = () => {
    const {
      errorCodeName,
      errorCodeBirthDay,
      errorCodeEmail,
      errorCodeGender,
      errorCodeIdentityNumber,
      errorCodePhone,
    } = this.state;
    return (
      <View>
        {this.state.placeholder.map((item, index) => {
          return (
            <View
              style={{
                width: widthPercentageToDP('90'),
                height: 'auto',
                borderRadius: 10,
                backgroundColor: '#ffff',
                marginTop: 20,
                marginBottom: 10,
                alignSelf: 'center',
                shadowOffset: {
                  width: 4,
                  height: 2,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                shadowColor: '#000',
                paddingBottom: 30,
              }}>
              <View style={{borderTopLeftRadius: 20}}>
                <FastImage
                  source={require('../../icons/iconAgent/ic_corner.png')}
                  style={{width: 40, height: 40}}
                  resizeMode="contain">
                  <Text style={{color: '#ffff', marginLeft: 11, marginTop: 8}}>
                    {index + 1}
                  </Text>
                </FastImage>
              </View>
              <View style={{alignItems: 'center'}}>
                <FastImage
                  source={require('../../icons/iconAgent/ic_camera_flight.png')}
                  style={{width: 64, height: 64}}
                />
                <Text style={{textAlign: 'center', marginTop: 4}}>
                  Chụp CMND/CCCD để hoàn tất thông tin nhanh hơn
                </Text>
                <View
                  style={{
                    width: '100%',
                    height: 8,
                    marginTop: 16,
                    backgroundColor: '#F6F5F6',
                  }}
                />
              </View>
              <Text style={{textAlign: 'center', marginTop: 20, color: Color}}>
                hoặc
              </Text>
              <View>
                <Text style={{marginLeft: 16}}>Điền thông tin:</Text>
                <View>
                  <Input
                    label={'Tên người được bảo hiểm'}
                    onChangeText={text => this.setState({name: text})}
                    errorValidate={errorCodeName == '' ? false : true}
                    onBlur={() => this.validateInsuredName()}
                    onFocus={() => this.setState({errorCodeName: ''})}
                  />
                  {errorCodeName !== ''
                    ? this.showErrorNotInvalid(errorCodeName)
                    : null}
                </View>
                <View>
                  <Input
                    label={'Email'}
                    onChangeText={text => this.setState({email: text})}
                    errorValidate={errorCodeEmail == '' ? false : true}
                    onBlur={() => this.validateEmail()}
                    onFocus={() => this.setState({errorCodeEmail: ''})}
                  />
                  {errorCodeEmail !== ''
                    ? this.showErrorNotInvalid(errorCodeEmail)
                    : null}
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.formRow}>
                  <InputPlace
                    openModal={() => this.setState({openSex: true})}
                    label={'Giới tính'}
                    keyword={this.state.genderLabel}
                    errorValidate={errorCodeGender == '' ? false : true}
                    onFocus={() => this.setState({errorCodeGender: ''})}
                  />
                  {errorCodeGender !== ''
                    ? this.showErrorNotInvalid(errorCodeGender)
                    : null}
                </View>
                <View style={styles.formRow}>
                  <Input
                    label={'Ngày sinh'}
                    value={this.state.birthday}
                    placeholder={'dd/mm/yyyy'}
                    onChangeText={text => this.inputBirthDay(text)}
                    keyboardType={'number-pad'}
                    errorValidate={errorCodeBirthDay == '' ? false : true}
                    onBlur={() => this.validateBirthDay()}
                    onFocus={() => this.setState({errorCodeBirthDay: ''})}
                  />
                  {errorCodeBirthDay !== ''
                    ? this.showErrorNotInvalid(errorCodeBirthDay)
                    : null}
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.formRow}>
                  <Input
                    label={'CMND/Hộ chiếu'}
                    onChangeText={text => this.setState({identityNumber: text})}
                    errorValidate={errorCodeIdentityNumber == '' ? false : true}
                    onBlur={() => this.validateIdentityNumber()}
                    onFocus={() => this.setState({errorCodeIdentityNumber: ''})}
                  />
                  {errorCodeIdentityNumber !== ''
                    ? this.showErrorNotInvalid(errorCodeIdentityNumber)
                    : null}
                </View>
                <View style={styles.formRow}>
                  <Input
                    label={'Số điện thoại'}
                    onChangeText={text => this.setState({phone: text})}
                    keyboardType={'number-pad'}
                    errorValidate={errorCodePhone == '' ? false : true}
                    onBlur={() => this.validatePhoneNumber()}
                    onFocus={() => this.setState({errorCodePhone: ''})}
                  />
                  {errorCodePhone !== ''
                    ? this.showErrorNotInvalid(errorCodePhone)
                    : null}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  // danh sách người được bảo hiểm đã add
  renderCustomerInfo = () => {
    return (
      <View>
        {this.state.customerInfo.map((item, index) => {
          return (
            <View
              style={{
                width: widthPercentageToDP('90'),
                height: 'auto',
                borderRadius: 10,
                backgroundColor: '#ffff',
                marginTop: 20,
                marginBottom: 10,
                alignSelf: 'center',
                shadowOffset: {
                  width: 4,
                  height: 2,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                shadowColor: '#000',
                paddingBottom: 30,
              }}>
              <ModalSex
                open={this.state.openSex1}
                onClosed={() => this.setState({openSex1: null})}
                setSex={data => this.onChangeGender(data, index)}
                onOpened={() => this.setState({openSex1: true})}
              />
              <View style={{borderTopLeftRadius: 20}}>
                <FastImage
                  source={require('../../icons/iconAgent/ic_corner.png')}
                  style={{width: 40, height: 40}}
                  resizeMode="contain">
                  <Text style={{color: '#ffff', marginLeft: 11, marginTop: 8}}>
                    {index + 1}
                  </Text>
                </FastImage>
              </View>
              <View style={{alignItems: 'center'}}>
                <FastImage
                  source={require('../../icons/iconAgent/ic_camera_flight.png')}
                  style={{width: 64, height: 64}}
                />
                <Text style={{textAlign: 'center', marginTop: 4}}>
                  Chụp CMND/CCCD để hoàn tất thông tin nhanh hơn
                </Text>
                <View
                  style={{
                    width: '100%',
                    height: 8,
                    marginTop: 16,
                    backgroundColor: '#F6F5F6',
                  }}
                />
              </View>
              <Text style={{textAlign: 'center', marginTop: 20, color: Color}}>
                hoặc
              </Text>
              <View>
                <Text style={{marginLeft: 16}}>Điền thông tin:</Text>
                <Input
                  label={'Tên người được bảo hiểm'}
                  onChangeText={text =>
                    this.onChangeInfo('fullName', text, index)
                  }
                  value={item.fullName}
                />
                <Input
                  label={'Email'}
                  onChangeText={text => this.onChangeInfo('email', text, index)}
                  value={item.email}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <InputPlace
                  openModal={() => this.setState({openSex1: true})}
                  label={'Giới tính'}
                  keyword={item.gender == 1 ? 'Nam' : 'Nữ'}
                />
                <Input
                  label={'Ngày sinh'}
                  value={
                    item.birthday == 'Invalid date'
                      ? ''
                      : this.formatDate(item.birthday)
                  }
                  placeholder={'DD/MM/YYYY'}
                  onChangeText={text =>
                    this.onChangeInfo('birthday', text, index)
                  }
                  keyboardType={'number-pad'}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Input
                  label={'CMND/Hộ chiếu'}
                  onChangeText={text =>
                    this.onChangeInfo('identityNumber', text, index)
                  }
                  keyboardType={'number-pad'}
                  value={item.identityNumber}
                />
                <Input
                  label={'Số điện thoại'}
                  onChangeText={text => this.onChangeInfo('phone', text, index)}
                  keyboardType={'number-pad'}
                  value={item.phone}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  render() {
    const {openSex, openSex1, customerInfo} = this.state;
    return (
      <View style={styles.container}>
        <ModalSex
          open={openSex}
          onClosed={() => this.setState({openSex: null})}
          setSex={data =>
            this.setState({
              gender: data.id,
              genderLabel: data.name,
              errorCodeGender: '',
            })
          }
          onOpened={() => this.setState({openSex: true})}
        />
        <Nav
          isInfo={false}
          show={true}
          title={'THÔNG TIN NGƯỜI ĐƯỢC BẢO HIỂM'}
          bottom={20}
          onPress={() => Actions.pop()}
        />
        <ScrollView style={{flex: 1, marginTop: -15}}>
          <View
            style={{
              width: widthPercentageToDP('90'),
              height: 145,
              borderRadius: 10,
              backgroundColor: '#ffff',
              alignSelf: 'center',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
              shadowColor: '#000',
            }}>
            <View style={{padding: 10}}>
              <Text
                style={{lineHeight: 17, fontStyle: 'italic', color: '#BE3030'}}>
                Chú ý:
              </Text>
              <Text
                style={{
                  lineHeight: 17,
                  fontStyle: 'italic',
                  marginTop: 5,
                  color: '#414042',
                }}>
                - Bạn cần điền đúng thông tin của người sở hữu đơn bảo hiểm bao
                gồm cả số điện thoại và email để yêu cầu bồi thường khi chuyến
                bay trễ
              </Text>
              <Text
                style={{
                  lineHeight: 17,
                  fontStyle: 'italic',
                  marginTop: 10,
                  color: '#414042',
                }}>
                - Chỉ người có tên trên hợp đồng HOẶC người thụ hưởng mới được
                nhận bồi thường
              </Text>
            </View>
          </View>
          {customerInfo.length > 0 ? this.renderCustomerInfo() : null}
          {this.renderFormInput()}
          <TouchableOpacity
            style={{
              alignItems: 'center',
              padding: 15,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
            onPress={() => this.onPressAdd()}>
            <FastImage
              source={require('../../icons/iconAgent/ic_add.png')}
              style={{width: 15, height: 15}}
              resizeMode={'contain'}
            />
            <Text style={{color: Color, marginLeft: 8}}>
              Thêm người được bảo hiểm
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <FooterButton>
          <Button
            style={{
              backgroundColor:
                this.state.isDisabled == false ? '#D9D9D9' : Color,
            }}
            label={'GỬI THÔNG TIN'}
            //disabled={this.state.isDisabled}
            marginTop={15}
            onPress={() => this.next()}
          />
        </FooterButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  textError: {
    color: '#F97C7C',
  },
  txtErrorCode: {
    color: '#F97C7C',
    fontSize: 12,
    marginHorizontal: 14,
  },
  formRow: {
    width: '50%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP('100'),
  },
});
import {connect} from 'react-redux';
import {saveCustomerInfo} from './actions/flight_buy';
import {Color} from '../../config/System';
import {checkLeapYear, checkMonth} from '../../components/Functions';

const mapStateToProps = state => {
  return {
    flightBuy: state.flightBuy,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveCustomerInfo: body => dispatch(saveCustomerInfo(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerInfo);
