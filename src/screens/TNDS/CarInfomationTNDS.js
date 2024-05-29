import React, {Component} from 'react';
import {
  View,
  Text,
  BackHandler,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Css from '../../config/Css';
import Nav from '../../components/Nav';
import Button from '../../components/buy/Button';
import FooterButton from '../../components/FooterButton';
import {ScaledSheet} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import InputSelect from '../../components/buy/InputSelect';
// import {renderVND} from '../../../components/Functions';
let HTTP = require('../../services/HTTP');
const {height, width} = Dimensions.get('window');
class CarProducer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car: {},
      year: '',
      seat: '',
      openSeat: null,
      producers: [],
      checkDisplayText: false,

      notValidWeight: false,
      WeightValidateErrorCode: false,

      notValidValue: false,
      ValueValidateErrorCode: false,
      checkValueCar: false,

      SeatUsingValidateErrorCode: false,
      brandCarErrorCode: false,
      modalBackHome: false,
      //updatenewshowroomcar

      brand_car: '',
      chassisNumber: '',
      licenseNumber: '',
      machineNumber: '',
      loadCapacity: '',

      errorCodePurpose: '',
      errorCodeChassisNumber: '',
      errorCodeMachineNumber: '',
      errorCodeLicenseNumber: '',
      errorCodeWeight: '',
      errorCodeSeat: '',
    };
  }

  componentWillMount = () => {
    this.setState({checkDisplayText: true});
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    Actions.pop();
    return true;
  };
  // chọn số chỗ ngồi
  setSeat = seat => {
    this.setState({
      seat: seat.toString(),
      idProducer: '',
      producer: '',
      year: '',
      idModel: '',
      model: '',
      checkValueCar: false,
      valueCar: '',
      payload: '',
    });
  };
  // render error message
  showErrorNotInvalid(item) {
    return (
      <View>
        <Text style={styles.txtErrorCode}>{item}</Text>
      </View>
    );
  }

  gobackAndReset() {
    this.props.back == 'again' ? Actions.tab({type: 'reset'}) : Actions.pop();
  }

  back = () => {
    const {backTwoway} = this.props;
    if (backTwoway) {
      // Actions.popTo('IntroductionCar');
      Actions.tab({type: 'reset'});
    } else {
      const {
        openProducer,
        openModel,
        openYear,
        openSeat,
        idProducer,
      } = this.state;
      if (openProducer || openModel || openYear || openSeat) {
        this.setState({
          openProducer: null,
          openModel: null,
          openYear: null,
          openSeat: null,
        });
        return;
      }
      if (idProducer !== null) {
        this.setState({modalBackHome: true});
        return;
      }
      if (this.props.back == 'again') {
        Actions.tab({type: 'reset'});
        return;
      }

      Actions.pop();
    }
  };
  // mở modal mục đích sử dụng
  checkOpenModal = condition => {
    if (condition == 'openBrand') {
      this.setState({openGetBrand: true});
    }
  };
  // chọn mục đích sử dụng
  setType = data => {
    this.setState({
      brand_car: data.value,
      errorCodePurpose: '',
    });
  };
  // validate required mục đích sử dụng
  validatePurpose = () => {
    if (this.state.brand_car == '') {
      this.setState({errorCodePurpose: 'Bạn phải chọn mục đích sử dụng'});
      return false;
    } else {
      return true;
    }
  };
  // validate số khung
  validateChassisNumber = () => {
    let validateIdentityNumber = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (this.state.chassisNumber == '') {
      this.setState({errorCodeChassisNumber: 'Bạn phải nhập số khung'});
      return false;
    }
    // check số khung không được chứa ký tự đặc biệt
    if (validateIdentityNumber.test(this.state.chassisNumber)) {
      this.setState({errorCodeChassisNumber: 'Số khung sai định dạng'});
      return false;
    } else {
      return true;
    }
  };
  // validate số máy
  validateMachineNumber = () => {
    let validateIdentityNumber = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (this.state.machineNumber == '') {
      this.setState({errorCodeMachineNumber: 'Bạn phải nhập số máy'});
      return false;
    }
    // check số máy không được chứa ký tự đặc biệt
    if (validateIdentityNumber.test(this.state.machineNumber)) {
      this.setState({errorCodeMachineNumber: 'Số máy sai định dạng'});
      return false;
    } else {
      return true;
    }
  };
  // validate required biển số xe
  validateLicenseNumber = () => {
    if (this.state.licenseNumber == '') {
      this.setState({errorCodeLicenseNumber: 'Bạn phải nhập biển số xe'});
      return false;
    } else {
      return true;
    }
  };
  // validate trọng tải
  validateWeight = () => {
    let validateNumber = /[0-9]/;
    if (this.state.loadCapacity == '') {
      this.setState({errorCodeWeight: 'Bạn phải nhập trọng tải'});
      return false;
    }
    // check trọng tải chỉ được chứa chữ số
    if (validateNumber.test(this.state.loadCapacity) == false) {
      this.setState({errorCodeWeight: 'Trọng tải sai định dạng'});
      return false;
    } else {
      this.setState({errorCodeWeight: ''});
      return true;
    }
  };
  // validate số chỗ ngồi
  validateSeat = () => {
    let validateNumber = /[0-9]/;
    if (this.state.seat == '') {
      this.setState({errorCodeSeat: 'Bạn phải nhập Số chỗ ngồi'});
      return false;
    }
    // check số chỗ ngồi chỉ được chứa chữ số
    if (validateNumber.test(this.state.seat) == false) {
      this.setState({errorCodeSeat: 'Số chỗ ngồi sai định dạng'});
      return false;
    } else {
      this.setState({errorCodeSeat: ''});
      return true;
    }
  };
  // lưu thông tin vào redux
  storeInfomation = () => {
    const {
      brand_car,
      chassisNumber,
      machineNumber,
      licenseNumber,
      loadCapacity,
      seat,
    } = this.state;
    let array = {
      brand_car: brand_car,
      chassisNumber: chassisNumber,
      machineNumber: machineNumber,
      licenseNumber: licenseNumber,
      loadCapacity: loadCapacity,
      seat: seat,
    };
    this.props.saveCarInfoTnds(array);
    Actions.TNDSInsurancePackage();
  };
  next = () => {
    if (this.validatePurpose()) {
      if (this.validateChassisNumber()) {
        if (this.validateMachineNumber()) {
          if (this.validateLicenseNumber()) {
            if (this.validateWeight()) {
              if (this.validateSeat()) {
                this.storeInfomation();
              }
            }
          }
        }
      }
    }
  };
  render() {
    const {
      modalBackHome,
      seat,
      licenseNumber,
      openGetBrand,
      chassisNumber,
      machineNumber,
      brand_car,
      errorCodeSeat,
      errorCodeWeight,
      errorCodeChassisNumber,
      errorCodeLicenseNumber,
      errorCodeMachineNumber,
      errorCodePurpose,
    } = this.state;
    return (
      <View style={{flex: 1}}>
        {openGetBrand ? (
          <NewModalBrandCar
            open={openGetBrand}
            onClosed={() => this.setState({openGetBrand: null})}
            //purpose_id={purpose_id}
            setType={data => this.setType(data)}
          />
        ) : null}
        <View style={Css.container}>
          <Nav
            isInfo={false}
            show={true}
            title={'HOÀN THIỆN HỒ SƠ XE'}
            bottom={20}
            onPress={() => Actions.pop()}
          />
          <KeyboardAwareScrollView style={{flex: 1}}>
            <View keyboardShouldPersistTaps={'always'}>
              <View style={{alignItems: 'center'}}>
                <FastImage
                  source={require('../../icons/iconAgent/ic_camera_flight.png')}
                  style={{width: 64, height: 64}}
                />
                <View style={{backgroundColor: '#FFFFFF'}}>
                  <Text style={{marginTop: 4, textAlign: 'center'}}>
                    Chụp giấy đăng kiểm để hoàn tất thông tin nhanh hơn
                  </Text>
                </View>
                <View
                  style={{
                    width: width,
                    height: 8,
                    backgroundColor: '#F6F5F6',
                    marginTop: 20,
                  }}
                />
              </View>
              <View style={{flex: 1, padding: 20, backgroundColor: '#FFFFFF'}}>
                <View>
                  <Text style={{textAlign: 'center', color: Color}}>hoặc</Text>
                </View>
                <View style={{marginTop: 12}}>
                  <Text style={{paddingBottom: 8}}>Điền thông tin:</Text>
                </View>
                <View>
                  <InputSelect
                    label={'Mục đích sử dụng:'}
                    openModal={() => this.checkOpenModal('openBrand')}
                    value={brand_car}
                  />
                  {errorCodePurpose !== ''
                    ? this.showErrorNotInvalid(errorCodePurpose)
                    : null}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 0,
                  }}>
                  <View style={{width: '46%'}}>
                    <Input
                      // editable={false}
                      label="Số khung"
                      value={chassisNumber}
                      // value={chassicNumber}
                      onChangeText={text =>
                        this.setState({chassisNumber: text})
                      }
                      autoUpperCase={true}
                      onFocus={() =>
                        this.setState({errorCodeChassisNumber: ''})
                      }
                      onBlur={() => this.validateChassisNumber()}
                    />
                    {errorCodeChassisNumber !== ''
                      ? this.showErrorNotInvalid(errorCodeChassisNumber)
                      : null}
                  </View>
                  <View style={{width: '46%'}}>
                    <Input
                      // editable={false}
                      label="Số máy"
                      value={machineNumber}
                      onChangeText={text =>
                        this.setState({machineNumber: text})
                      }
                      onFocus={() =>
                        this.setState({errorCodeMachineNumber: ''})
                      }
                      onBlur={() => this.validateMachineNumber()}
                    />
                    {errorCodeMachineNumber !== ''
                      ? this.showErrorNotInvalid(errorCodeMachineNumber)
                      : null}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 0,
                  }}>
                  <View style={{width: '46%'}}>
                    <InputWithCustomSuffix
                      editable={true}
                      label="Biển số xe"
                      value={licenseNumber}
                      onChangeText={text =>
                        this.setState({licenseNumber: text})
                      }
                      autoUpperCase={true}
                      onFocus={() =>
                        this.setState({errorCodeLicenseNumber: ''})
                      }
                      onBlur={() => this.validateLicenseNumber()}
                    />
                    {errorCodeLicenseNumber !== ''
                      ? this.showErrorNotInvalid(errorCodeLicenseNumber)
                      : null}
                  </View>
                  <View style={{width: '46%'}}>
                    <InputWithCustomSuffix
                      label="Trọng tải"
                      onChangeText={value =>
                        this.setState({loadCapacity: value})
                      }
                      value={this.state.loadCapacity}
                      keyboardType={'numeric'}
                      noIconWrite={true}
                      suffix={'Tấn'}
                      onFocus={() => this.setState({errorCodeWeight: ''})}
                      onBlur={() => this.validateWeight()}
                    />
                    {errorCodeWeight !== ''
                      ? this.showErrorNotInvalid(errorCodeWeight)
                      : null}
                  </View>
                </View>

                <InputWithCustomSuffix
                  label="Số chỗ ngồi"
                  onChangeText={value => this.setState({seat: value})}
                  value={seat}
                  keyboardType={'numeric'}
                  noIconWrite={true}
                  suffix={'Chỗ'}
                  onFocus={() => this.setState({errorCodeSeat: ''})}
                  onBlur={() => this.validateSeat()}
                />
                {errorCodeSeat !== ''
                  ? this.showErrorNotInvalid(errorCodeSeat)
                  : null}
              </View>
            </View>
          </KeyboardAwareScrollView>
          <FooterButton>
            <Button
              label="TIẾP THEO"
              marginTop={0}
              onPress={() => this.next()}
            />
          </FooterButton>
          <ModalFlightNew
            open={modalBackHome}
            label2={'Hủy'}
            button={true}
            forceUpdate={true}
            onPress={() => this.gobackAndReset()}
            text="Nếu quay lại bạn sẽ phải điền lại thông tin xe?"
            onPressButtonNo={() => this.setState({modalBackHome: false})}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  textError: {
    color: '#F97C7C',
  },
  txtErrorCode: {
    color: '#F97C7C',
    fontSize: 12,
  },
});

import {connect} from 'react-redux';
import ModalFlightNew from '../../components/buy/ModalFlightNew';
import SimpleToast from 'react-native-simple-toast';
import InputWithCustomSuffix from '../../components/buy/InputWithCustomSuffix';
import NewModalBrandCar from '../../components/buy/NewModalBrandCar';
import {Actions} from 'react-native-router-flux';
import Input from '../CarInsurance/components/Input';
import {saveCarInfoTnds} from './actions/tnds_buy';
import {Color} from '../../config/System';

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    saveCarInfoTnds: body => dispatch(saveCarInfoTnds(body)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarProducer);
