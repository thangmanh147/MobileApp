import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import NavFL from '../../components/Nav';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputSelect from '../../components/buy/InputSelect';
import InputWithCustomSuffix from '../../components/buy/InputWithCustomSuffix';
import Input from '../CarInsurance/components/Input';
import ModalMonth from '../CarInsurance/components/ModalMonth';
import ModalPurpose from '../CarInsurance/components/ModalPurpose';
import ModalCompensation from '../CarInsurance/components/ModalCompensation';
import {Color, URL} from '../../config/System';
import {connect} from 'react-redux';
import {checkLeapYear, checkMonth, renderVND} from '../../components/Functions';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
import {savePackagesInfo} from '../TNDS/actions/tnds_buy';

class AccidentInsurancePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemIndex: null,
      isChecked: [],
      changePremiumType: '',
      openMonth: false,
      month: '',
      EffectTnds: '',
      percent: '',
      purpose: '',
      compensation: '',
      duration: '',
      duration2: '',
      money: '',
      openPurpose: null,
      openCompensation: null,

      fromDateTnds: '',
      fromTimeTnds: '',
      toDateTnds: '',
      toTimeTnds: '',

      fromDateTnlxpx: '',
      fromTimeTnlxpx: '',
      toDateTnlxpx: '',
      toTimeTnlxpx: '',

      tndsEffect: '',
      tnlxpxEffect: '',

      openEffectTnlxpx: null,
      openEffectTnds: null,

      isShowFeeVc: false,
      isShowTnlxpx: false,
      isShowTndsbb: false,

      car_type: '',
      car_purpose: '',
      car_seat_number: '',
      car_manufacture_year: '',
      car_value: '',

      defaulValueTndsbb: '',

      basic: null,

      insuranceCompany: [
        {
          name: 'Bảo hiểm PTI',
          logo: require('../../icons/iconAgent/PTI_1.png'),
        },
        {
          name: 'Bảo hiểm BIC',
          logo: require('../../icons/iconAgent/BIC.png'),
        },
        {
          name: 'Bảo hiểm VNI',
          logo: require('../../icons/iconAgent/VNI.png'),
        },
        {
          name: 'Bảo hiểm PTI',
          logo: require('../../icons/iconAgent/PTI_1.png'),
        },
        {
          name: 'Bảo hiểm BIC',
          logo: require('../../icons/iconAgent/BIC.png'),
        },
        {
          name: 'Bảo hiểm VNI',
          logo: require('../../icons/iconAgent/VNI.png'),
        },
      ],

      InsurancePackSet1: null,
      InsurancePackSet2: null,

      lxpxCode: '',
      tndsbbCode: '',

      carFeeVc: [],
      tndsbb: [],
      tnlxpx: [],

      errorCodeAccidentEffect: '',
      errorCodeAccidentFromDate: '',
      errorCodeAccidentToDate: '',
      errorCodeAccidentFromTime: '',
      errorCodeAccidentToTime: '',

      errorCodeCompensation: '',
      errorCodeTndsEffect: '',
      errorCodeTndsFromDate: '',
      errorCodeTndsToDate: '',
      errorCodeTndsFromTime: '',
      errorCodeTndsToTime: '',

      errorCodeReason: '',
      errorCodePercent: '',
      errorCodeMoney: '',
    };
  }
  componentDidMount() {
    this.getCurrentDate();
    this.getListInsurancePackage();
    // this.getFeeVc()
    this.getFeetnlxpx();
    console.log(this.props.carInfo);
  }
  getCurrentDate = () => {
    const date = new Date();
    const parsedDate = moment(date, 'DD/MM/YYYY');
    const a = parsedDate.format('MM/DD/YYYY');
    this.setState({currentDate: a});
  };
  // lấy danh sách gói bh
  getListInsurancePackage = () => {
    let url = `${URL}/api/attribute/v1/packages`;
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          carInsuredPackages: res?.data[0],
          tndsbb: res?.data[2],
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  // lấy phí tai nạn lái xe phụ xe
  getFeetnlxpx = () => {
    const {car_seat_number} = this.state;
    let url = `${URL}/api/premium/v1/pti-car-premium-lxpxhktx`;
    let body = {
      car_seat_number: car_seat_number,
      pack: 10000,
    };
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          tnlxpx: [res?.data],
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.carInfo && nextProps.carInfo !== prevState.carInfo) {
      update.car_seat_number = nextProps.carInfo.seat;
    }
    return update;
  }
  handleCheck = (item, data) => {};
  // nhập só tiền tăng giảm phí
  assignMoney(value) {
    const checkPlate = /^(\d{2})[A-Za-z]{1,2}[\-]{0,1}(\d{4,5})[TX]{0,1}$/;
    const input = value.replace(/\s+/g, '').trim();
    let re = /^[0-9\s\,\.]+$/;
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let validateNumber = /^\d*$/;
    let validatePhone = /^\d{10,11}$/;
    let validateNum = /^[0-9]+$/;
    let validateEmail = /^([a-zA-Z0-9][a-zA-Z0-9_\-]*(([\.][a-zA-Z0-9_\-]*)*)[a-zA-Z0-9]@([a-zA-Z0-9][a-zA-Z0-9_\-]*[a-zA-Z0-9]\.)+([a-zA-Z0-9]{2,4}))$/;
    if (value == '') {
      this.setState({money: value});
    } else {
      var b = value.replace(/\,/g, '');
      var a = Number(b);
      // if(isNaN(a) || !isFinite(a)) {
      if (!isFinite(a)) {
        return;
      }
      this.setState({money: a});
    }
  }
  // nhập thòi hạn (ngày)
  onChangeDate = (item, text) => {
    const str = text;
    switch (item) {
      // từ ngày
      case 'fromdateTnlxpx':
        if (text.length === 2 && this.state.fromDateTnlxpx.charAt(2) !== '/') {
          let a = str.slice(0, 2);
          this.setState({
            fromDateTnlxpx: (text += '/'),
          });
          if (parseInt(a) > 31) {
            SimpleToast.show('Ngày không thể lớn hơn 31');
            this.setState({fromDateTnlxpx: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.fromDateTnlxpx.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            fromDateTnlxpx: (text += '/'),
          });
          if (parseInt(a) > 12) {
            SimpleToast.show('Tháng không thể lớn hơn 12');
            this.setState({
              fromDateTnlxpx: this.state.fromDateTnlxpx.slice(0, 3),
            });
          }
        } else {
          this.setState({fromDateTnlxpx: text});
        }
        return;
      //đến ngày
      case 'toDateTnlxpx':
        if (text.length === 2 && this.state.toDateTnlxpx.charAt(2) !== '/') {
          let a = str.slice(0, 2);
          this.setState({
            toDateTnlxpx: (text += '/'),
          });
          if (parseInt(a) > 31) {
            SimpleToast.show('Ngày không thể lớn hơn 31');
            this.setState({toDateTnlxpx: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.toDateTnlxpx.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            toDateTnlxpx: (text += '/'),
          });
          if (parseInt(a) > 12) {
            SimpleToast.show('Tháng không thể lớn hơn 12');
            this.setState({toDateTnlxpx: this.state.toDateTnlxpx.slice(0, 3)});
          }
        } else {
          this.setState({toDateTnlxpx: text});
        }
        return;
      default:
        return '';
    }
  };
  // nhập thời hạn (giờ)
  onChangeTime = (item, text) => {
    const str = text;
    switch (item) {
      // từ giờ
      case 'fromTimeTnlxpx':
        if (text.length === 2 && this.state.fromTimeTnlxpx.charAt(2) !== ':') {
          let a = str.slice(0, 2);
          this.setState({
            fromTimeTnlxpx: (text += ':'),
          });
          if (parseInt(a) > 24) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({fromTimeTnlxpx: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.fromTimeTnlxpx.charAt(5) !== ':'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            fromTimeTnlxpx: text,
          });
          if (parseInt(a) > 59) {
            SimpleToast.show('Phút không thể lớn hơn 59');
            this.setState({
              fromTimeTnlxpx: this.state.fromTimeTnlxpx.slice(0, 3),
            });
          }
        } else {
          this.setState({fromTimeTnlxpx: text});
        }
        return;
      // đến giờ
      case 'toTimeTnlxpx':
        if (text.length === 2 && this.state.toTimeTnlxpx.charAt(2) !== ':') {
          let a = str.slice(0, 2);
          this.setState({
            toTimeTnlxpx: (text += ':'),
          });
          if (parseInt(a) > 24) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({toTimeTnlxpx: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.toTimeTnlxpx.charAt(5) !== ':'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            toTimeTnlxpx: text,
          });
          if (parseInt(a) > 59) {
            SimpleToast.show('Phút không thể lớn hơn 59');
            this.setState({toTimeTnlxpx: this.state.toTimeTnlxpx.slice(0, 3)});
          }
        } else {
          this.setState({toTimeTnlxpx: text});
        }
        return;
      default:
        return;
    }
  };
  // validate thời gian hiệu lực
  validateEffectAccident = () => {
    if (this.state.tnlxpxEffect == '') {
      this.setState({
        errorCodeAccidentEffect: 'Thời gian hiệu lực không được bỏ trống',
      });
      return false;
    } else {
      return true;
    }
  };
  // validate mức bồi thường
  validateCompensation = () => {
    if (this.state.compensation == '') {
      this.setState({errorCodeCompensation: 'Bạn phải chọn mức bồi thường'});
      return false;
    } else {
      return true;
    }
  };
  // validate thời hạn từ (ngày)
  validateAccidentFromDate = () => {
    const {fromDateTnlxpx, currentDate} = this.state;
    const parsedDate = moment(fromDateTnlxpx, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    if (fromDateTnlxpx == '') {
      this.setState({errorCodeAccidentFromDate: 'Bạn phải nhập từ ngày'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(fromDateTnlxpx) == false) {
      this.setState({errorCodeAccidentFromDate: 'Ngày bắt đầu không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(fromDateTnlxpx) == false) {
      this.setState({errorCodeAccidentFromDate: 'Ngày bắt đầu không hợp lệ'});
      return false;
    }
    // check ngày nhập phải lớn hơn ngày hiện tại
    if (moment(str).isSameOrBefore(currentDate) == true) {
      this.setState({
        errorCodeAccidentFromDate: `Cần nhập ngày từ ${currentDate}`,
      });
      return false;
    } else {
      return true;
    }
  };
  // validate thời hạn đến (ngày)
  validateAccidentToDate = () => {
    const {toDateTnlxpx, currentDate, fromDateTnlxpx} = this.state;
    const parsedDate = moment(toDateTnlxpx, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    const parsedCompareDate = moment(fromDateTnlxpx, 'DD/MM/YYYY');
    const compareStr = parsedCompareDate.format('MM/DD/YYYY');
    if (toDateTnlxpx == '') {
      this.setState({errorCodeAccidentToDate: 'Bạn phải nhập đến ngày'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(toDateTnlxpx) == false) {
      this.setState({errorCodeAccidentToDate: 'Ngày đến không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(toDateTnlxpx) == false) {
      this.setState({errorCodeAccidentToDate: 'Ngày đến không hợp lệ'});
      return false;
    }
    // check ngày nhập phải lớn hơn ngày hiện tại
    if (moment(str).isSameOrBefore(compareStr) == true) {
      this.setState({errorCodeAccidentToDate: `Ngày đến phải lớn hơn từ ngày`});
      return false;
    } else {
      return true;
    }
  };
  // validate thời hạn từ (giờ)
  validateFromTimeAccident = () => {
    const {fromTimeTnlxpx} = this.state;
    if (fromTimeTnlxpx == '') {
      this.setState({errorCodeAccidentFromTime: 'Bạn phải nhập thời gian'});
      return false;
    } else {
      return true;
    }
  };
  // validate thời hạn đến (giờ)
  validateToTimeAccident = () => {
    const {toTimeTnlxpx} = this.state;
    if (toTimeTnlxpx == '') {
      this.setState({errorCodeAccidentToTime: 'Bạn phải nhập thời gian'});
      return false;
    } else {
      return true;
    }
  };
  // validate lí do tăng/giảm phí
  validateReason = () => {
    // nếu tick tăng/giảm phí => bắt validate
    if (this.state.changePremiumType == '') {
      return true;
    }
    if (this.state.purpose == '') {
      this.setState({errorCodeReason: 'Bạn phải chọn lí do'});
      return false;
    } else {
      return true;
    }
  };
  // validate phần trăm
  validatePercent = () => {
    let validateNumber = /[0-9]/;
    // nếu tick tăng/giảm phí => bắt validate// nếu tick tăng/giảm phí => bắt validate
    if (this.state.changePremiumType == '') {
      return true;
    }
    // required
    if (this.state.percent == '') {
      this.setState({errorCodePercent: 'Bạn phải nhập phần trăm'});
      return false;
    }
    // validate chỉ được nhập chữ số
    if (validateNumber.test(this.state.percent) == false) {
      this.setState({errorCodePercent: 'Phần trăm sai định dạng'});
      return false;
    } else {
      this.setState({errorCodePercent: ''});
      return true;
    }
  };
  // validate số tiền
  validateMoney = () => {
    let validateNumber = /[0-9]/;
    // nếu tick tăng/giảm phí => bắt validate
    if (this.state.changePremiumType == '') {
      return true;
    }
    if (this.state.money == '') {
      this.setState({errorCodeMoney: 'Bạn phải nhập số tiền'});
      return false;
    }
    // validate chỉ được nhập chữ số
    if (validateNumber.test(this.state.money) == false) {
      this.setState({errorCodeMoney: 'Số tiền sai định dạng'});
      return false;
    } else {
      this.setState({errorCodeMoney: ''});
      return true;
    }
  };
  // mở modal hiệu lực
  openModalEffect = item => {
    if (item == 'tnds') {
      this.setState({openEffectTnds: true});
    } else {
      this.setState({openEffectTnlxpx: true});
    }
  };
  // check các hàm validate
  // return true => next
  next = () => {
    if (this.validateCompensation()) {
      if (this.validateEffectAccident()) {
        if (this.validateFromTimeAccident()) {
          if (this.validateAccidentFromDate()) {
            if (this.validateToTimeAccident()) {
              if (this.validateAccidentToDate()) {
                if (this.validateReason()) {
                  if (this.validatePercent()) {
                    if (this.validateMoney()) {
                      Actions.AccidentInsuranceBuyerInfo();
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
  // render error message
  showErrorNotInvalid(item) {
    return (
      <View>
        <Text style={styles.txtErrorCode}>{item}</Text>
      </View>
    );
  }
  // tick tăng phí
  onTouchIncreasePremium = () => {
    if (this.state.changePremiumType == 'Tăng phí') {
      // nếu đã chọn => bỏ chọn
      this.setState({
        changePremiumType: '',
      });
    } else {
      // nếu chưa chọn =>  chọn
      this.setState({
        changePremiumType: 'Tăng phí',
      });
    }
  };
  // tick giảm phí
  onTouchDecreasedPremium = () => {
    if (this.state.changePremiumType == 'Giảm phí') {
      // nếu đã chọn => bỏ chọn
      this.setState({
        changePremiumType: '',
      });
    } else {
      // nếu chưa chọn =>  chọn
      this.setState({
        changePremiumType: 'Giảm phí',
      });
    }
  };
  // render công ty bảo hiểm
  _renderItem = (item, index) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor:
              this.state.selectedItemIndex == index ? '#D5F2F2' : '#F6F5F6',
            padding: 10,
            alignItems: 'center',
            borderRadius: 10,
            width: 85,
            height: 85,
            //marginTop: 15
          }}
          onPress={() => this.setState({selectedItemIndex: index})}>
          <FastImage
            source={item.logo}
            style={{width: 60, height: 30}}
            resizeMode={'contain'}
          />
          <Text style={{textAlign: 'center'}}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // render form gói bảo hiểm tnlxpx
  renderTnlxpx = () => {
    const {
      fromDateTnlxpx,
      toDateTnlxpx,
      fromTimeTnlxpx,
      toTimeTnlxpx,
      errorCodeAccidentEffect,
      errorCodeAccidentFromDate,
      errorCodeAccidentFromTime,
      errorCodeAccidentToDate,
      errorCodeAccidentToTime,
      errorCodeCompensation,
    } = this.state;
    return (
      <View>
        <View
          style={{
            marginTop: 25,
            paddingHorizontal: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 0,
            }}>
            <View style={{width: '46%', marginTop: -30}}>
              <InputSelect
                label={'Mức bồi thường'}
                value={this.state.compensation}
                openModal={() => this.setState({openCompensation: true})}
              />
              {errorCodeCompensation !== ''
                ? this.showErrorNotInvalid(errorCodeCompensation)
                : null}
            </View>
            <View style={{width: '46%', marginTop: -30}}>
              <InputSelect
                label={'Hiệu lực'}
                value={this.state.tnlxpxEffect}
                openModal={() => this.openModalEffect('tnlxpx')}
              />
              {errorCodeAccidentEffect !== ''
                ? this.showErrorNotInvalid(errorCodeAccidentEffect)
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
                label={'Thời hạn từ (giờ)'}
                value={fromTimeTnlxpx}
                onChangeText={text => this.onChangeTime('fromTimeTnlxpx', text)}
                keyboardType={'number-pad'}
                maxLength={5}
                onFocus={() => this.setState({errorCodeAccidentFromTime: ''})}
                onBlur={() => this.validateFromTimeAccident()}
              />
              {errorCodeAccidentFromTime !== ''
                ? this.showErrorNotInvalid(errorCodeAccidentFromTime)
                : null}
            </View>
            <View style={{width: '46%'}}>
              <Input
                label={'Thời hạn từ (ngày)'}
                value={fromDateTnlxpx}
                onChangeText={text => this.onChangeDate('fromdateTnlxpx', text)}
                keyboardType={'number-pad'}
                maxLength={10}
                onFocus={() => this.setState({errorCodeAccidentFromDate: ''})}
                onBlur={() => this.validateAccidentFromDate()}
              />
              {errorCodeAccidentFromDate !== ''
                ? this.showErrorNotInvalid(errorCodeAccidentFromDate)
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
                label={'Thời hạn đến (giờ)'}
                value={toTimeTnlxpx}
                onChangeText={text => this.onChangeTime('toTimeTnlxpx', text)}
                keyboardType={'number-pad'}
                maxLength={5}
                onFocus={() => this.setState({errorCodeAccidentToTime: ''})}
                onBlur={() => this.validateToTimeAccident()}
              />
              {errorCodeAccidentToTime !== ''
                ? this.showErrorNotInvalid(errorCodeAccidentToTime)
                : null}
            </View>
            <View style={{width: '46%'}}>
              <Input
                label={'Thời hạn đến (ngày)'}
                value={toDateTnlxpx}
                onChangeText={text => this.onChangeDate('toDateTnlxpx', text)}
                keyboardType={'number-pad'}
                maxLength={10}
                onFocus={() => this.setState({errorCodeAccidentToDate: ''})}
                onBlur={() => this.validateAccidentToDate()}
              />
              {errorCodeAccidentToDate !== ''
                ? this.showErrorNotInvalid(errorCodeAccidentToDate)
                : null}
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {
      insuranceCompany,
      changePremiumType,
      openPurpose,
      openCompensation,
      openEffectTnlxpx,
      tnlxpx,
      errorCodeReason,
      errorCodePercent,
      errorCodeMoney,
    } = this.state;
    return (
      <View style={styles.container}>
        <ModalMonth
          open={openEffectTnlxpx}
          onClosed={() => this.setState({openEffectTnlxpx: null})}
          setMonth={data =>
            this.setState({
              tnlxpxEffect: data.name,
              errorCodeAccidentEffect: '',
            })
          }
        />
        <ModalPurpose
          open={openPurpose}
          onClosed={() => this.setState({openPurpose: null})}
          setPurpose={data =>
            this.setState({purpose: data.name, errorCodeReason: ''})
          }
        />
        <ModalCompensation
          open={openCompensation}
          onClosed={() => this.setState({openCompensation: null})}
          setCompensation={data =>
            this.setState({compensation: data.name, errorCodeCompensation: ''})
          }
        />
        <View>
          <NavFL
            isInfo={false}
            title={'CHỌN BẢO HIỂM'}
            onPress={() => Actions.pop()}
          />
        </View>
        <KeyboardAwareScrollView style={{flex: 1, marginTop: -30}}>
          <ScrollView keyboardShouldPersistTaps={'always'}>
            <View
              style={{
                width: widthPercentageToDP('90'),
                borderRadius: 20,
                padding: 20,
                alignSelf: 'center',
                //alignItems: 'center',
                justifyContent: 'center',
                //height: heightPercentageToDP('40'),
                backgroundColor: '#FFFFFF',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                shadowColor: '#000',
              }}>
              <Text style={{padding: 5}}>Chọn công ty bảo hiểm:</Text>
              <FlatList
                contentContainerStyle={{alignItems: 'center'}}
                data={insuranceCompany}
                renderItem={({item, index}) => this._renderItem(item, index)}
                keyExtractor={index => index.toString()}
                numColumns={3}
              />
            </View>
            <View
              style={{
                width: widthPercentageToDP('100'),
                backgroundColor: '#D9D9D9',
                height: 4,
                marginTop: 20,
              }}
            />
            {/* render form thông tin gói bh tnlxpx  */}
            <View style={{padding: 24, backgroundColor: '#FFFFFF'}}>
              <Text>Chọn gói bảo hiểm:</Text>
              <View
                style={{
                  backgroundColor: 'white',
                  shadowOffset: {
                    width: 4,
                    height: 2,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 1,
                  elevation: 2,
                  shadowColor: 'rgba(0, 0, 0, 0.07)',
                  padding: 10,
                  marginTop: 24,
                  borderRadius: 5,
                  //paddingHorizontal: 5
                }}>
                {tnlxpx.map(item => {
                  return (
                    <View>
                      <View style={styles.packageTitle}>
                        <Text
                          style={{
                            fontWeight: '700',
                            marginLeft: 5,
                            paddingRight: '35%',
                          }}>
                          Bảo hiểm tai nạn lái xe, phụ xe và người ngồi trên xe
                        </Text>
                      </View>
                      <View style={styles.packageFee}>
                        <Text style={{fontWeight: '700'}}>
                          {renderVND(item.lxpxhktx)}đ
                        </Text>
                      </View>
                    </View>
                  );
                })}

                {this.renderTnlxpx()}
              </View>
              {/* form tăng/giảm phí  */}
              <View
                style={{
                  width: widthPercentageToDP('100'),
                  backgroundColor: '#F6F5F6',
                  height: 8,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
              />
              <View>
                <View style={{marginTop: 20}}>
                  <Text style={{fontWeight: '700', flex: 0.8}}>
                    Tăng/Giảm phí
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => this.onTouchIncreasePremium()}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 10,
                      flex: 1,
                    }}>
                    <FastImage
                      style={{height: 20, width: 20}}
                      resizeMode={'contain'}
                      source={
                        changePremiumType == 'Tăng phí'
                          ? require('../../icons/iconAgent/single_select_active.png')
                          : require('../../icons/iconAgent/single_select.png')
                      }
                    />
                    <Text style={{marginLeft: 8}}>Tăng phí</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.onTouchDecreasedPremium()}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 10,
                      flex: 1,
                    }}>
                    <FastImage
                      style={{height: 20, width: 20}}
                      resizeMode={'contain'}
                      source={
                        changePremiumType == 'Giảm phí'
                          ? require('../../icons/iconAgent/single_select_active.png')
                          : require('../../icons/iconAgent/single_select.png')
                      }
                    />
                    <Text style={{marginLeft: 8}}>Giảm phí</Text>
                  </TouchableOpacity>
                </View>
                <InputSelect
                  label={'Lý do'}
                  value={this.state.purpose}
                  openModal={() => {
                    this.setState({openPurpose: true});
                  }}
                />
                {errorCodeReason !== ''
                  ? this.showErrorNotInvalid(errorCodeReason)
                  : null}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 30,
                    justifyContent: 'space-between',
                    //padding: 10
                    //paddingHorizontal: 5
                  }}>
                  <View style={{width: '45%', marginTop: -30}}>
                    <InputWithCustomSuffix
                      label={'Phần trăm'}
                      suffix={'%'}
                      onChangeText={text => this.setState({percent: text})}
                      keyboardType={'number-pad'}
                      onBlur={() => this.validatePercent()}
                      onFocus={() => this.setState({errorCodePercent: ''})}
                    />
                    {this.showErrorNotInvalid(errorCodePercent)}
                  </View>
                  <FastImage
                    source={require('../../icons/iconAgent/ic_arrowcross.png')}
                    style={styles.ic_arrow}
                    resizeMode={'contain'}
                  />
                  <View style={{width: '45%', marginTop: -30}}>
                    <InputWithCustomSuffix
                      label={'Số tiền'}
                      suffix={'đ'}
                      keyboardType={'number-pad'}
                      onChangeText={text => this.assignMoney(text)}
                      value={renderVND(this.state.money)}
                      onBlur={() => this.validateMoney()}
                      onFocus={() => this.setState({errorCodeMoney: ''})}
                    />
                    {this.showErrorNotInvalid(errorCodeMoney)}
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: widthPercentageToDP('100'),
                  backgroundColor: '#F6F5F6',
                  height: 8,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
              />
            </View>
            {/* bảng phí  */}
            <View
              style={{
                backgroundColor: '#D5F2F2',
                padding: 10,
                width: widthPercentageToDP('90'),
                alignSelf: 'center',
                borderRadius: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                }}>
                <Text style={{fontWeight: '700'}}>Phí bảo hiểm</Text>
                <Text>1,165,960đ</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                }}>
                <Text style={{fontWeight: '700'}}>Tăng/ Giảm phí</Text>
                <Text>1,165,960đ</Text>
              </View>
              <View
                style={{borderWidth: 0.5, borderColor: Color, borderRadius: 1}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                }}>
                <Text style={{fontWeight: '700', color: Color}}>
                  THANH TOÁN
                </Text>
                <Text style={{fontWeight: '700', color: Color}}>
                  1,283,837đ
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        <FooterButton>
          <Button
            marginTop={15}
            label={'TIẾP THEO'}
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
  },
  ic_arrow: {
    width: 35,
    height: 15,
    //marginTop: 20
  },
  packageTitle: {
    flexDirection: 'row',
    flex: 0.6,
    alignItems: 'center',
  },
  packageFee: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  textError: {
    color: '#F97C7C',
  },
  txtErrorCode: {
    color: '#F97C7C',
    fontSize: 12,
  },
});
const mapStateToProps = state => {
  return {
    carInfo: state.tndsBuy.carInfoTnds,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    savePackagesInfo: body => dispatch(savePackagesInfo(body)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccidentInsurancePackage);
