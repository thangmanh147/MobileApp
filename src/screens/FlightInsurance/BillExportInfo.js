import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import InputBill from './component/InputBill';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';

class BillExportInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'button',
      isChecked: false,
      name: '',
      taxCode: '',
      address: '',
      email: '',
      billInfo: [],

      errorCodeCompanyName: '',
      errorCodeTaxCode: '',
      errorCodeAddress: '',
      errorCodeEmail: '',
    };
  }
  // thay đổi trạng thái check/ not check của check box
  handleCheck = () => {
    this.setState({isChecked: !this.state.isChecked});
  };
  // lưu thông tin vào redux
  storeInfomation = async () => {
    const {isChecked, name, taxCode, email, address, billInfo} = this.state;
    let array = billInfo;
    if (this.validateCompanyName()) {
      if (this.validateTaxCode()) {
        if (this.validateAddress()) {
          if (this.validateEmail()) {
            array.push({
              isVat: isChecked,
              companyName: name,
              companyTax: taxCode,
              companyEmail: email,
              companyAddress: address,
            });
            this.props.saveBillInfo(array);
            Actions.InsurancePack();
          }
        }
      }
    }
  };
  // validate tên doanh nghiệp
  validateCompanyName = () => {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (this.state.name == '') {
      this.setState({
        errorCodeCompanyName: 'Tên doanh nghiệp không được bỏ trống',
      });
      return false;
    } else {
      this.setState({errorCodeCompanyName: ''});
      return true;
    }
  };
  // validate email
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
  // validate mã số thuế
  validateTaxCode = () => {
    if (this.state.taxCode == '') {
      this.setState({errorCodeTaxCode: 'Mã số thuế không được để trống'});
      return false;
    } else {
      this.setState({errorCodeTaxCode: ''});
      return true;
    }
  };
  // validate địa chỉ
  validateAddress = () => {
    if (this.state.address == '') {
      this.setState({errorCodeAddress: 'Địa chỉ không được để trống'});
      return false;
    } else {
      this.setState({errorCodeAddress: ''});
      return true;
    }
  };
  // render error message
  showErrorNotInvalid(item) {
    return (
      <View>
        <Text style={styles.txtErrorCode}>{item}</Text>
      </View>
    );
  }
  next = () => {
    this.storeInfomation();
  };
  render() {
    const {
      errorCodeCompanyName,
      errorCodeAddress,
      errorCodeEmail,
      errorCodeTaxCode,
      isChecked,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={{paddingTop: 0}}>
          <Nav
            isInfo={false}
            show={true}
            title={'THÔNG TIN XUẤT HÓA ĐƠN'}
            onPress={() => Actions.pop()}
          />
        </View>
        <KeyboardAwareScrollView>
          <View style={{flex: 1, padding: 24, marginTop: 20}}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => this.handleCheck()}>
              {
                isChecked
                  ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                  : <IconBoxSvg width={20} height={20} color={NewColor} />
              }
              <Text style={{marginLeft: 8}}>Xuất hóa đơn VAT</Text>
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <View>
                <InputBill
                  label={'Tên doanh nghiệp*'}
                  onChangeText={text => this.setState({name: text})}
                  errorValidate={errorCodeCompanyName == '' ? false : true}
                  onBlur={() => this.validateCompanyName()}
                  onFocus={() => this.setState({errorCodeCompanyName: ''})}
                />
                {errorCodeCompanyName !== ''
                  ? this.showErrorNotInvalid(errorCodeCompanyName)
                  : null}
              </View>
              <View>
                <InputBill
                  label={'Mã số thuế*'}
                  onChangeText={text => this.setState({taxCode: text})}
                  errorValidate={errorCodeTaxCode == '' ? false : true}
                  onBlur={() => this.validateTaxCode()}
                  onFocus={() => this.setState({errorCodeTaxCode: ''})}
                />
                {errorCodeTaxCode !== ''
                  ? this.showErrorNotInvalid(errorCodeTaxCode)
                  : null}
              </View>
              <View>
                <InputBill
                  label={'Địa chỉ doanh nghiệp*'}
                  onChangeText={text => this.setState({address: text})}
                  errorValidate={errorCodeAddress == '' ? false : true}
                  onBlur={() => this.validateAddress()}
                  onFocus={() => this.setState({errorCodeAddress: ''})}
                />
                {errorCodeAddress !== ''
                  ? this.showErrorNotInvalid(errorCodeAddress)
                  : null}
              </View>
              <View>
                <InputBill
                  label={'Email nhận hóa đơn*'}
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
          </View>
        </KeyboardAwareScrollView>
        <FooterButton>
          {this.state.isChecked == true ? (
            <Button
              style={{
                backgroundColor:
                  this.state.isDisabled == true ? '#D9D9D9' : Color,
              }}
              label={'GỬI THÔNG TIN'}
              //disabled={this.state.isDisabled}
              marginTop={15}
              onPress={() => this.storeInfomation()}
            />
          ) : (
            <Button
              style={{
                backgroundColor:
                  this.state.isDisabled == true ? '#D9D9D9' : Color,
              }}
              label={'BỎ QUA'}
              //disabled={this.state.isDisabled}
              marginTop={15}
              onPress={() => Actions.InsurancePack()}
            />
          )}
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
  },
  formRow: {
    width: '50%',
  },
});
import {connect} from 'react-redux';
import {saveBillInfo} from './actions/flight_buy';
import {Color, NewColor} from '../../config/System';

const mapStateToProps = state => {
  return {
    flightBuy: state.flightBuy,
    flightInfo: state.flightBuy.flightInfo,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveBillInfo: body => dispatch(saveBillInfo(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BillExportInfo);
