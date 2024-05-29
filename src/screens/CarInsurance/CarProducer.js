import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  BackHandler,
  Dimensions,
  ImageBackground,TouchableWithoutFeedback,Keyboard
} from 'react-native';
import Css from '../../config/Css';
import Nav from '../../components/Nav';
import InputProducer from '../../components/buy/InputProducer';
import InputYear from '../../components/buy/InputYear';
import Button from '../../components/buy/Button';
import InputModel from '../../components/buy/InputModel';
import InputSeat from '../../components/buy/InputSeat';
import InputPurpose from '../../components/buy/InputPurpose';
import FooterButton from '../../components/FooterButton';
import {ScaledSheet} from 'react-native-size-matters';
import {renderVND} from '../../components/Functions';
import FastImage from 'react-native-fast-image';
import InputCarStatus from './components/InputCarStatus';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';

// import {renderVND} from '../../../components/Functions';
let HTTP = require('../../services/HTTP');
const {height, width} = Dimensions.get('window');
class CarProducer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idProducer: null,
      idModel: null,
      car: {},
      openYear: null,
      purpose_name: '',
      year: '',
      producer: '',
      openProducer: null,
      model: '',
      openModel: null,
      seat: '',
      purpose: '',
      openSeat: null,
      producers: [],
      checkDisplayText: false,
      payload: '',
      valueCar: '',
      insuredValue: '',
      openPurpose: null,
      openGetPurpose: null,
      openGetBrand: null,
      has_weight: false,
      vehicle_purpose_id: '',
      isCarplateEnable: true,
      chassisNumber: '',
      machineNumber: '',
      licenseNumber: '',
      weight: '',
      loadCapacity: '',

      notValidWeight: false,
      WeightValidateErrorCode: false,

      notValidValue: false,
      ValueValidateErrorCode: false,
      checkValueCar: false,

      PurposeUsingValidateErrorCode: false,
      SeatUsingValidateErrorCode: false,
      ProducerUsingValidateErrorCode: false,
      YearUsingValidateErrorCode: false,
      ModelUsingValidateErrorCode: false,
      brandCarErrorCode: false,
      modalBackHome: false,
      onActive: 'personal',
      //updatenewshowroomcar
      purpose_id: '',
      purpose_code: '',

      brand_car: '',

      type_name: 'Đã có biển số',
      carTypeId: '',
      carTypeCode: '',
      licenseStatus: null,

      errorCodeProducer: '',
      errorCodeModel: '',
      errorCodeType: '',
      errorCodePurpose: '',
      errorCodeStatus: '',
      errorCodeYear: '',
      errorCodeSeat: '',
      errorCodeCarValue: '',
      errorCodeInsuredValue: '',
      errorCodeChassisNumber: '',
      errorCodeMachineNumber: '',
      errorCodeWeight: '',
      errorCodeLicenseNumber: '',
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
  //render error message
  showErrorNotInvalid(item) {
    return (
      <View>
        <Text style={styles.txtErrorCode}>{item}</Text>
      </View>
    );
  }
  // chọn năm sản xuất
  setYear = data => {
    this.setState({
      year: data.toString(),
      errorCodeYear: '',
    });
  };
  // chọn số chỗ ngồi
  setSeat = seat => {
    this.setState({
      seat: seat.toString(),
      errorCodeSeat: '',
    });
  };
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

  closeInputSearch(conditional) {
    this.setState({
      openProducer: false,
      openYear: false,
      openModel: false,
      openSeat: false,
      checkDisplayText: false,
    });
  }
  // chọn dòng xe
  setModel(data) {
    this.setIdModel(data.vehicle_model_id, data.code);
    this.closeInputSearch();
  }
  setIdModel = data => {
    this.setState({
      model: data.name,
      carModelId: data.id,
      errorCodeModel: '',
    });
  };
  // chọn hãng xe
  setIdProducer = data => {
    this.setState({
      producer: data.name,
      idProducer: data.id,
      errorCodeProducer: '',
    });
  };
  // mở modal
  checkOpenModal = condition => {
    //modal năm sản xuất
    if (condition == 'year') {
      this.setState({openYear: true});
      // modal dòng xe
    } else if (condition == 'typeCar') {
      // nếu chưa chọn hãng xe => lỗi
      if (this.state.producer === '') {
        SimpleToast.show('Bạn phải chọn hãng xe trước');
      } else {
        this.setState({openModel: true});
      }
    } else if (condition == 'seat') {
      // chọn số chỗ ngồi
      this.setState({openSeat: true});
    } else if (condition == 'getPurpose') {
      this.setState({openGetPurpose: true}); // chọn mục đích sử dụng
    } else if (condition == 'openBrand') {
      this.setState({openGetBrand: true}); // chọn loại xe
    } else if (condition == 'producer') {
      // chọn hãng xe
      this.setState({openProducer: true});
    }
  };
  // chọn loại xe
  setType = data => {
    this.setState({
      has_weight: data.has_weight,
      brand_car: data.value,
      carTypeId: data.id,
      carTypeCode: data.code,
      errorCodeType: '',
    });
  };
  // chọn tình trạn xe - có biển số hay k
  setStatus = data => {
    const {isCarplateEnable} = this.state;
    this.setState({
      type_name: data.value,
      licenseStatus: data.status,
    });
  };
  // chọn mục đích sử dụng
  setGetPurpose(data) {
    this.setState({
      purpose_id: data.id,
      purpose_name: data.value,
      purpose_code: data.code,
      errorCodePurpose: '',
    });
  }
  // nhập giá trị xe
  assignValueCar(value) {
    if (value == '') {
      this.setState({valueCar: value});
    } else {
      var b = value.replace(/\,/g, '');
      var a = Number(b);
      // if(isNaN(a) || !isFinite(a)) {
      if (!isFinite(a)) {
        return;
      }
      this.setState({valueCar: a});
    }
  }
  // nhập số tiền bảo hiểm
  assignInsuredValue(value) {
    if (value == '') {
      this.setState({insuredValue: value});
    } else {
      var b = value.replace(/\,/g, '');
      var a = Number(b);
      // if(isNaN(a) || !isFinite(a)) {
      if (!isFinite(a)) {
        return;
      }
      this.setState({insuredValue: a});
    }
  }
  // validate hãng xe
  validateProducer = () => {
    // required
    if (this.state.producer == '') {
      this.setState({errorCodeProducer: 'Bạn phải chọn Hãng Xe'});
      return false;
    } else {
      return true;
    }
  };
  // validate dòng xe
  validateModel = () => {
    // required
    if (this.state.model == '') {
      this.setState({errorCodeModel: 'Bạn phải chọn Dòng xe'});
      return false;
    } else {
      return true;
    }
  };
  // validate loại xe
  validateType = () => {
    // required
    if (this.state.brand_car == '') {
      this.setState({errorCodeType: 'Bạn phải chọn Loại xe'});
      return false;
    } else {
      return true;
    }
  };
  // validate mục đích sử dụng
  validatePurpose = () => {
    // required
    if (this.state.purpose_name == '') {
      this.setState({errorCodePurpose: 'Bạn phải chọn Mục đích sử dụng'});
      return false;
    } else {
      return true;
    }
  };
  // validate năm sản xuất
  validateYear = () => {
    // required
    if (this.state.year == '') {
      this.setState({errorCodeYear: 'Bạn phải chọn năm sản xuất'});
      return false;
    } else {
      return true;
    }
  };
  // validate số chỗ ngồi
  validateSeat = () => {
    // required
    if (this.state.seat == '') {
      this.setState({errorCodeSeat: 'Bạn phải chọn Số chỗ ngồi'});
      return false;
    } else {
      return true;
    }
  };
  // validate số khung
  validateChassisNumber = () => {
    let validateIdentityNumber = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    // required
    if (this.state.chassisNumber == '') {
      this.setState({errorCodeChassisNumber: 'Bạn phải nhập số khung'});
      return false;
    }
    // check số khung k được chứa kí tự đặc biệt
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
    // required
    if (this.state.machineNumber == '') {
      this.setState({errorCodeMachineNumber: 'Bạn phải nhập số máy'});
      return false;
    }
    // check biển số xe k được chứa kí tự đặc biệt
    if (validateIdentityNumber.test(this.state.machineNumber)) {
      this.setState({errorCodeMachineNumber: 'Số máy sai định dạng'});
      return false;
    } else {
      return true;
    }
  };
  // validate biển số xe
  validateLicenseNumber = () => {
    // tình trạng xe = chưa có biển số => k cần validate
    if (this.state.type_name == 'Chưa có biển số') {
      return true;
    }
    // tình trạng xe = chưa có biển số => bắt validate
    // required
    if (this.state.licenseNumber == '') {
      this.setState({errorCodeLicenseNumber: 'Bạn phải nhập biển số xe'});
      return false;
    } else {
      return true;
    }
  };
  validateWeight = () => {
    let validateNumber = /[0-9]/;
    // required
    if (this.state.loadCapacity == '') {
      this.setState({errorCodeWeight: 'Bạn phải nhập trọng tải'});
      return false;
    }
    // trọng tải chỉ chứa chữ số
    if (validateNumber.test(this.state.loadCapacity) == false) {
      this.setState({errorCodeWeight: 'Trọng tải sai định dạng'});
      return false;
    } else {
      this.setState({errorCodeWeight: ''});
      return true;
    }
  };
  // validate giá trị thẩm định
  validateCarValue = () => {
    // required
    if (this.state.valueCar == '') {
      this.setState({errorCodeCarValue: 'Bạn phải nhập Giá trị thẩm định'});
      return false;
    }
    // check giá trị thẩm đinh k đc nhỏ hơn 200,000,000
    if (parseInt(this.state.valueCar) < 200000000) {
      this.setState({
        errorCodeCarValue: 'Giá trị thẩm định không nhỏ hơn 200 triệu',
      });
      return false;
    } else {
      return true;
    }
  };
  // validate số tiền bảo hiểm
  validateInsuredValue = () => {
    if (this.state.insuredValue == '') {
      this.setState({errorCodeInsuredValue: 'Bản phải nhập Số tiền bảo hiểm'});
      return false;
    }
     // check số tiền bảo hiểm phải nhỏ hơn giá trị thẩm định
    if (parseInt(this.state.valueCar) < parseInt(this.state.insuredValue)) {
      this.setState({
        errorCodeInsuredValue:
          'Số tiền bảo hiểm phải nhỏ hơn Giá trị thẩm định',
      });
      return false;
    }
    // check số tiền bảo hiểm k đc nhỏ hơn 200,000,000
    if (parseInt(this.state.insuredValue) < 200000000) {
      this.setState({
        errorCodeInsuredValue: 'Số tiền bảo hiểm không nhỏ hơn 200 triệu',
      });
      return false;
    } else {
      return true;
    }
  };
  // lưu thông tin vào redux
  storeInfomation = () => {
    const {
      purpose_id,
      purpose_code,
      idProducer,
      carTypeId,
      carTypeCode,
      carModelId,
      year,
      seat,
      weight,
      licenseNumber,
      licenseStatus,
      chassisNumber,
      machineNumber,
      valueCar,
      brand_car,
      purpose_name,
      producer,
      model,
      insuredValue,
    } = this.state;
    let array = {
      purposeId: purpose_id,
      purposeCode: purpose_code,
      purposeName: purpose_name,
      carTypeName: brand_car,
      carTypeId: carTypeId,
      carTypeCode: carTypeCode,
      carBranchId: idProducer,
      carBrandName: producer,
      carModelId: carModelId,
      carModelName: model,
      manufactureYear: year,
      numberSeat: seat,
      loadCapacity: weight,
      licenseNumber: licenseNumber,
      licenseStatus: licenseStatus,
      chassisNumber: chassisNumber,
      machineNumber: machineNumber,
      declarationPrice: valueCar,
      insuredValue: insuredValue,
    };
    this.props.saveCarInfo(array);
  };
   // check lần lượt các hàm validate
  // return true => next
  goNext = () => {
    if (this.validatePurpose()) {
      if (this.validateType()) {
        if (this.validateProducer()) {
          if (this.validateModel()) {
            if (this.validateSeat()) {
              if (this.validateYear()) {
                if (this.validateChassisNumber()) {
                  if (this.validateMachineNumber()) {
                    if (this.validateLicenseNumber()) {
                      if (this.validateWeight()) {
                        if (this.validateCarValue()) {
                          if (this.validateInsuredValue()) {
                            this.storeInfomation();
                            Actions.CarInsurancePackage();
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  // render form nhập thông tin
  renderForm = () => {
    const {
      producer,
      machineNumber,
      chassisNumber,
      year,
      licenseNumber,
      model,
      insuredValue,
      seat,
      valueCar,
      ValueValidateErrorCode,
      brandCarErrorCode,
      brand_car,
      vehicle_purpose_id,
      type_name,
      errorCodeType,
      errorCodeProducer,
      errorCodeCarValue,
      errorCodeInsuredValue,
      errorCodeModel,
      errorCodePurpose,
      errorCodeSeat,
      errorCodeYear,
      errorCodeChassisNumber,
      errorCodeMachineNumber,
      errorCodeWeight,
      errorCodeLicenseNumber,
    } = this.state;
    return (
      <View>
        <View>
          <Text style={{paddingBottom: 15}}>Điền thông tin:</Text>
          <InputPurpose
            title={'Mục đích sử dụng'}
            keyword={this.state.purpose_name}
            setGetPurpose={data => this.setGetPurpose(data)}
            // erroCodeValidate={PurposeUsingValidateErrorCode ? true : false}
          />
          <View style={{marginTop: 12}}>
            {errorCodePurpose !== ''
              ? this.showErrorNotInvalid(errorCodePurpose)
              : null}
          </View>
          <View>
            <InputBrandCar
              openModal={() => this.checkOpenModal('openBrand')}
              keyword={brand_car}
              vehicle_purpose_id={vehicle_purpose_id}
              erroCodeValidate={brandCarErrorCode ? true : false}
            />
            {errorCodeType !== ''
              ? this.showErrorNotInvalid(errorCodeType)
              : null}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.formRow}>
              <InputProducer
                openModal={() => this.checkOpenModal('producer')}
                keyword={producer}
                errorCodeValidate={errorCodeModel == '' ? false : true}
              />
              {errorCodeProducer !== ''
                ? this.showErrorNotInvalid(errorCodeProducer)
                : null}
            </View>
            <View style={styles.formRow}>
              <InputModel
                year={true}
                openModal={() => this.checkOpenModal('typeCar')}
                keyword={model}
                errorCodeValidate={errorCodeProducer == '' ? false : true}
              />
              {errorCodeModel !== ''
                ? this.showErrorNotInvalid(errorCodeModel)
                : null}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.formRow}>
              <InputSeat
                model={true}
                openModal={() => this.checkOpenModal('seat')}
                keyword={seat}
                errorCodeValidate={errorCodeYear == '' ? false : true}
              />
              {errorCodeSeat !== ''
                ? this.showErrorNotInvalid(errorCodeSeat)
                : null}
            </View>
            <View style={styles.formRow}>
              <InputYear
                openModal={() => this.checkOpenModal('year')}
                keyword={year}
                keyboardType="numeric"
                errorCodeValidate={errorCodeSeat == '' ? false : true}
              />
              {errorCodeYear !== ''
                ? this.showErrorNotInvalid(errorCodeYear)
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
              <Input
                // editable={false}
                label="Số khung"
                value={chassisNumber}
                // value={chassicNumber}
                onChangeText={text => this.setState({chassisNumber: text})}
                autoUpperCase={true}
                onFocus={() => this.setState({errorCodeChassisNumber: ''})}
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
                onChangeText={text => this.setState({machineNumber: text})}
                onFocus={() => this.setState({errorCodeMachineNumber: ''})}
                onBlur={() => this.validateMachineNumber()}
              />
              {errorCodeMachineNumber !== ''
                ? this.showErrorNotInvalid(errorCodeMachineNumber)
                : null}
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <InputCarStatus
              title={'Xe bạn đã có biển số?'}
              keyword={this.state.type_name}
              setStatus={data => this.setStatus(data)}
              // erroCodeValidate={PurposeUsingValidateErrorCode ? true : false}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 0,
            }}>
            {type_name == 'Đã có biển số' ? (
              <View style={{width: '46%'}}>
                <InputWithCustomSuffix
                  editable={true}
                  label="Biển số xe"
                  value={licenseNumber}
                  onChangeText={text => this.setState({licenseNumber: text})}
                  autoUpperCase={true}
                  onFocus={() => this.setState({errorCodeLicenseNumber: ''})}
                  onBlur={() => this.validateLicenseNumber()}
                  errorValidate={errorCodeWeight == '' ? false : true}
                />
                {errorCodeLicenseNumber !== ''
                  ? this.showErrorNotInvalid(errorCodeLicenseNumber)
                  : null}
              </View>
            ) : null}
            <View
              style={{width: type_name == 'Đã có biển số' ? '46%' : '100%'}}>
              <InputWithCustomSuffix
                label="Trọng tải"
                onChangeText={value => this.setState({loadCapacity: value})}
                value={this.state.loadCapacity}
                keyboardType={'numeric'}
                noIconWrite={true}
                suffix={'Tấn'}
                onFocus={() => this.setState({errorCodeWeight: ''})}
                onBlur={() => this.validateWeight()}
                errorValidate={errorCodeLicenseNumber == '' ? false : true}
              />
              {errorCodeWeight !== ''
                ? this.showErrorNotInvalid(errorCodeWeight)
                : null}
            </View>
          </View>
          <View>
            <InputWithCustomSuffix
              label="Giá trị xe"
              onChangeText={value => this.assignValueCar(value)}
              value={renderVND(valueCar)}
              keyboardType={'number-pad'}
              noIconWrite={true}
              suffix={'đ'}
              erroCodeValidate={
                ValueValidateErrorCode && valueCar == '' ? true : false
              }
              onBlur={() => {
                this.validateCarValue();
              }}
              onFocus={() => this.setState({errorCodeCarValue: ''})}
            />
            {errorCodeCarValue !== ''
              ? this.showErrorNotInvalid(errorCodeCarValue)
              : null}
          </View>
          <View>
            <InputWithCustomSuffix
              label="Giá trị bảo hiểm"
              onChangeText={value => this.assignInsuredValue(value)}
              value={renderVND(insuredValue)}
              keyboardType={'number-pad'}
              noIconWrite={true}
              suffix={'đ'}
              erroCodeValidate={
                ValueValidateErrorCode && insuredValue == '' ? true : false
              }
              onBlur={() => {
                this.validateInsuredValue();
              }}
              onFocus={() => this.setState({errorCodeInsuredValue: ''})}
            />
            {errorCodeInsuredValue !== ''
              ? this.showErrorNotInvalid(errorCodeInsuredValue)
              : null}
          </View>
        </View>
      </View>
    );
  };
  render() {
    const {
      openProducer,
      openYear,
      year,
      openModel,
      openSeat,
      seat,
      openGetBrand,
      openGetPurpose,
      idProducer,
      vehicle_purpose_id,
      purpose_id,
    } = this.state;
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1}}>
            {openGetPurpose ? (
                <NewModalGetPurpose
                    open={openGetPurpose}
                    onClosed={() => this.setState({openGetPurpose: null})}
                    setGetPurpose={data => this.setGetPurpose(data)}
                />
            ) : null}
            {openGetBrand ? (
                <NewModalBrandCar
                    open={openGetBrand}
                    onClosed={() => this.setState({openGetBrand: null})}
                    //purpose_id={purpose_id}
                    setType={data => this.setType(data)}
                />
            ) : null}
            {openSeat ? (
                <NewModalSeat
                    open={openSeat}
                    onClosed={() => this.setState({openSeat: null})}
                    setSeat={seat => this.setSeat(seat)}
                />
            ) : null}
            {openProducer ? (
                <NewModalProducer
                    vehicle_purpose_id={vehicle_purpose_id}
                    seat={seat}
                    open={openProducer}
                    onClosed={() => this.setState({openProducer: null})}
                    setProducer={data => this.setIdProducer(data)}
                />
            ) : null}
            {openYear ? (
                <NewModalYear
                    vehicle_purpose_id={vehicle_purpose_id}
                    seat={seat}
                    idProducer={idProducer}
                    open={openYear}
                    onClosed={() => this.setState({openYear: null})}
                    setYear={data => this.setYear(data)}
                />
            ) : null}
            {openModel ? (
                <NewModalModel
                    vehicle_purpose_id={vehicle_purpose_id}
                    seat={seat}
                    idProducer={idProducer}
                    manufacture_year={year}
                    open={openModel}
                    onClosed={() => this.setState({openModel: null})}
                    setModel={data => this.setIdModel(data)}
                />
            ) : null}

            {/* {
                    openModel ?
                    <NewModalModel
                        open={openModel}
                        onClosed={() => this.setState({openModel: null})}
                        setModel={(id, code) => this.setIdModel(id, code)}
                    />  : null
                } */}

            <View style={Css.container}>
              <Nav
                  isInfo={false}
                  show={true}
                  title={'HOÀN THIỆN HỒ SƠ XE'}
                  bottom={20}
                  onPress={() => Actions.pop()}
              />
              <KeyboardAwareScrollView
                  keyboardShouldPersistTaps={'always'}
                  enableAutoAutomaticScroll={false}
                  enableOnAndroid={true}
                  keyboardOpeningTime={1}
                  style={{
                    flex: 1,
                    width: widthPercentageToDP('100'),
                    alignSelf: 'center',
                  }}>
                <View style={{alignItems: 'center'}}>
                  <FastImage
                      source={require('../../icons/iconAgent/ic_camera_flight.png')}
                      style={{width: 64, height: 64}}
                  />
                  <View
                      style={{
                        flex: 1,
                        width: widthPercentageToDP('100'),
                        backgroundColor: '#FFFFFF',
                        marginTop: -3,
                      }}>
                    <Text style={{marginTop: 4, textAlign: 'center'}}>
                      Chụp giấy đăng kiểm để hoàn tất thông tin nhanh hơn
                    </Text>
                    <View
                        style={{
                          width: width,
                          height: 8,
                          backgroundColor: '#F6F5F6',
                          marginTop: 20,
                        }}
                    />
                  </View>
                </View>
                <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 20,
                      backgroundColor: '#FFFFFF',
                    }}>
                  <View>
                    <Text style={{textAlign: 'center', color: Color}}>hoặc</Text>
                  </View>
                  {this.renderForm()}
                </View>
              </KeyboardAwareScrollView>

              <FooterButton>
                <Button
                    label="TIẾP THEO"
                    marginTop={0}
                    onPress={() => this.goNext()}
                />
              </FooterButton>
            </View>
          </View>
        </TouchableWithoutFeedback>

    );
  }
}

const styles = ScaledSheet.create({
  textError: {
    color: '#F97C7C',
    fontSize: 12,
  },
  ctInput: {
    marginTop: 25,
    borderBottomWidth: 1,
    borderColor: Color,
    marginHorizontal: 25,
    flexDirection: 'row',
  },
  txtErrorCode: {
    color: '#F97C7C',
    fontSize: 12,
  },
  formRow: {
    width: '46%',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
});

import {connect} from 'react-redux';
import ModalFlightNew from '../../components/buy/ModalFlightNew';
import SimpleToast from 'react-native-simple-toast';
import NewModalProducer from '../../components/buy/NewModalProducer';
import NewModalBrandCar from '../../components/buy/NewModalBrandCar';
import NewModalGetPurpose from '../../components/buy/NewModalGetPurpose';
import NewModalYear from '../../components/buy/NewModalYear';
import NewModalModel from '../../components/buy/NewModalModel';
import NewModalSeat from '../../components/buy/NewModalSeat';
import {Actions} from 'react-native-router-flux';
import InputWithCustomSuffix from '../../components/buy/InputWithCustomSuffix';
import Input from './components/Input';
import InputBrandCar from '../../components/buy/InputBrandCar';
import {saveCarInfo} from './actions/car_Buy';
import {Color} from '../../config/System';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const mapStateToProps = state => {
  return {
    carBuy: state.carBuy,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveCarInfo: body => dispatch(saveCarInfo(body)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarProducer);
