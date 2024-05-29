import React, {Component} from 'react';
import {
  StatusBar,
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
import Input from './components/Input';
import ModalMonth from './components/ModalMonth';
import ModalPurpose from './components/ModalPurpose';
import ModalCompensation from './components/ModalCompensation';
import {Color, URL, NewColor} from '../../config/System';
import {connect} from 'react-redux';
import {
  checkLeapYear,
  checkMonth,
  formatNumber,
  renderVND,
} from '../../components/Functions';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
import {saveCarInsurancePackage} from './actions/car_Buy';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconUpSvg from '../../config/images/icons/IconUpSvg';
import IconDownSvg from '../../config/images/icons/IconDownSvg';

class CarInsurancePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemIndex: null,
      isChecked: [],
      changePremiumType: '',
      openMonthVc: false,
      openMonthTnds: false,
      EffectVc: '',
      EffectTnds: '',
      percent: '',
      purpose: '',
      compensation: '',
      money: '',
      openPurpose: null,
      openCompensation: null,

      fromDateVc: '',
      toDateVc: '',
      fromTimeVc: '',
      toTimeVc: '',

      fromDateTnds: '',
      toDateTnds: '',
      fromTimeTnds: '',
      toTimeTnds: '',

      isShowFeeVc: false,
      isShowTnlxpx: false,
      isShowTndsbb: false,

      car_type: '',
      car_purpose: '',
      car_seat_number: '',
      car_manufacture_year: '',
      car_value: '',

      totalFeeVc: [],
      packages: [],

      materialInsurance: null,

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
      carInsuredPackages: [],

      InsurancePackSet1: null,
      InsurancePackSet2: false,

      lxpxCode: '',
      tndsbbCode: '',

      carFeeVc: [],
      tndsbb: [],
      tndsbbPackage: [],
      tnlxpx: [],
      tnlxpxPackages: [],

      errorCodeVcEffect: '',
      errorCodeVcFromDate: '',
      errorCodeVcToDate: '',
      errorCodeVcFromTime: '',
      errorCodeVcToTime: '',

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
    this.getListInsurancePackage();
    this.getFeetnlxpx();
    this.getCurrentDate();
    //console.log(this.props.carInsuranceType)
  }

  getCurrentDate = () => {
    const date = new Date();
    const parsedDate = moment(date, 'DD/MM/YYYY');
    const a = parsedDate.format('MM/DD/YYYY');
    this.setState({currentDate: a});
  };
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
        //console.log(res)
        this.setState({
          carInsuredPackages: res?.data[0],
          tnlxpxPackages: res?.data[1],
          tndsbb: res?.data[2],
        });
        this.getFeeVc();
      })
      .catch(error => {
        console.log(error);
      });
  };
  getFeeVc = () => {
    const {
      car_type,
      car_purpose,
      car_seat_number,
      car_manufacture_year,
      car_value,
    } = this.state;
    let url = `${URL}/api/premium/v1/pti-car-premium-vc`;
    let body = {
      car_type: car_type, // loại xe
      car_purpose: car_purpose, // mục đích sư dụng
      car_seat_number: car_seat_number, // số chỗ ngồi
      car_manufacture_year: car_manufacture_year, // năm sản xuất
      car_value: car_value, // giá trị xe
    };
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        if (res?.status == 202) {
          this.setState({
            carFeeVc: [],
            defaulValueTndsbb: '',
            basic: '',
          });
        } else if (res?.status >= 200 && res?.status < 300) {
          return res.json().then(data => {
            this.setState({
              carFeeVc: [data?.data],
              defaulValueTndsbb: data?.data?.tndsbb,
              basic: data?.data?.basic,
            });
            this.mapInsuranceArray();
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
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
        //console.log('-------------=================', res)
        this.setState({
          tnlxpx: [res?.data],
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  mapInsuranceArray = () => {
    const {carFeeVc, carInsuredPackages} = this.state;
    let keyArr = [];
    let mapArr = [];
    // Lấy list keys trong carFeeVc
    // Duyệt keys array, so sánh phần tử trong keys array với code trong danh sách loại bảo hiểm carInsuredPackages
    // Nếu giống nhau thì push các thông tin cần thiết vào mappArr và set vào materialInsurance
    carFeeVc.map((item, index) => {
      keyArr.push(Object.keys(item));
      keyArr[0].forEach((e, i) => {
        for (let j = 0; j < carInsuredPackages.length; j++) {
          if (e == carInsuredPackages[j]?.code) {
            let code = keyArr[0][i];
            mapArr.push({
              code: code,
              name: carInsuredPackages[j]?.name,
              fee: item[code],
            });
          }
        }
      });
    });
    this.setState({materialInsurance: mapArr});
    this.getFreeItem();
  };
  // Duyệt danh sách gói bảo hiểm vật chất
  // Nếu phí = 0 push vào danh sách gói được chọn
  getFreeItem = () => {
    const {materialInsurance, packages} = this.state;
    for (let i = 0; i < materialInsurance.length; i++) {
      if (materialInsurance[i]?.fee == 0) {
        packages.push({
          benefitCode: materialInsurance[i].code,
          benefitFrom: this.state.fromDateVc,
          benefitTo: this.state.toDateVc,
        });
      }
    }
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.carInfo && nextProps.carInfo !== prevState.carInfo) {
      (update.car_type = nextProps.carInfo.carTypeCode),
        (update.car_purpose = nextProps.carInfo.purposeCode),
        (update.car_seat_number = nextProps.carInfo.numberSeat),
        (update.car_manufacture_year = nextProps.carInfo.manufactureYear),
        (update.car_value = nextProps.carInfo.declarationPrice);
    }

    return update;
  }
  showErrorNotInvalid(item) {
    return (
      <View>
        <Text style={styles.txtErrorCode}>{item}</Text>
      </View>
    );
  }
  // Thay đổi trạng thái check/ not check của các gói bảo hiểm vật chất
  // Lấy index của code trong isChecked nếu chưa có thì push vào nếu đã có thì xóa đi theo index
  // isChecked: chứa các gói đã được check
  // totalFeeVc: danh sách phí của các gói đã được chọn
  // packages: thông tin các gói đã được chọn
  handleCheck = (item, data) => {
    const {isChecked, totalFeeVc, packages} = this.state;
    if (isChecked.indexOf(item.code) == -1) {
      totalFeeVc.push(item.fee);
      isChecked.push(item.code);
      packages.push({
        benefitCode: item.code,
        benefitFrom: this.state.fromDateVc,
        benefitTo: this.state.toDateVc,
      });
      this.setState({
        isChecked: isChecked,
        totalFeeVc: totalFeeVc,
        packages: packages,
      });
    } else {
      isChecked.splice(isChecked.indexOf(item.code), 1);
      packages.splice(packages.indexOf(item.code), 1);
      totalFeeVc.splice(totalFeeVc.indexOf(item.fee), 1);
      this.setState({
        isChecked: isChecked,
        totalFeeVc: totalFeeVc,
        packages: packages,
      });
    }
  };
  // Thay đổi trạng thái check/ not check của check box tnlxpx
  handleCheckAccident = item => {
    const {
      InsurancePackSet1,
      packages,
      carInsuredPackages,
      tnlxpxPackages,
    } = this.state;
    this.setState({
      InsurancePackSet1: !InsurancePackSet1,
    });
    if (!InsurancePackSet1) {
      packages.push({
        benefitCode: tnlxpxPackages[0].code,
        benefitFrom: this.state.fromDateVc,
        benefitTo: this.state.toDateVc,
      });
      this.setState({
        packages: packages,
      });
    } else {
      packages.splice(packages.indexOf(carInsuredPackages[1]?.code), 1);
      this.setState({
        packages: packages,
      });
    }
  };
  // Thay đổi trạng thái check/ not check của check box tnds
  handleCheckTnds = () => {
    const {tndsbb, InsurancePackSet2, tndsbbPackage} = this.state; // tndsbb: gói bảo hiểm tnds, tndsbbPackage: lưu thông tin gói bh tnds đã chọn
    this.setState({
      InsurancePackSet2: !InsurancePackSet2,
    });
    // nếu chưa chọn => chọn và push thông tin
    if (!InsurancePackSet2) {
      tndsbbPackage.push({
        benefitCode: tndsbb[0].code,
        benefitFrom: this.state.fromDateTnds,
        benefitTo: this.state.toDateTnds,
      });
      this.setState({
        tndsbbPackage: tndsbbPackage,
      });
    } else {
      // bỏ chọn và xóa thông tin
      tndsbbPackage.splice(tndsbbPackage.indexOf(tndsbb[0].code), 1);
      this.setState({
        tndsbbPackage: tndsbbPackage,
      });
    }
  };
  // nhập số tiền
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
  // Thêm thông tin nếu người dùng chưa điền ngày/giờ trước khi chọn gói bh vc
  addBenefitDateVc = (text, item) => {
    const {packages} = this.state;
    switch (item) {
      case 'from':
        for (let i = 0; i < packages.length; i++) {
          packages[i].benefitFrom = text;
          this.setState({packages: packages});
        }
        return;
      case 'to':
        for (let i = 0; i < packages.length; i++) {
          packages[i].benefitTo = text;
          this.setState({packages: packages});
        }
        return;
    }
  };
  // Thêm thông tin nếu người dùng chưa điền ngày/giờ trước khi chọn gói bh tnds
  addBenefitDateTnds = (text, item) => {
    const {tndsbbPackage} = this.state;
    switch (item) {
      case 'from':
        for (let i = 0; i < tndsbbPackage.length; i++) {
          tndsbbPackage[i].benefitFrom = text;
          this.setState({tndsbbPackage: tndsbbPackage});
        }
        return;
      case 'to':
        for (let i = 0; i < tndsbbPackage.length; i++) {
          tndsbbPackage[i].benefitTo = text;
          this.setState({tndsbbPackage: tndsbbPackage});
        }
        return;
    }
  };
  // nhập thời hạn (ngày)
  onChangeDate = (item, text) => {
    const str = text;
    switch (item) {
      // thời hạn từ (ngày) tnds
      case 'fromDateTnds':
        if (text.length === 2 && this.state.fromDateTnds.charAt(2) !== '/') {
          let a = str.slice(0, 2);
          this.setState({
            fromDateTnds: (text += '/'),
          });
          if (parseInt(a) > 31 || parseInt(a) == 0) {
            SimpleToast.show('Ngày không thể lớn hơn 31');
            this.setState({fromDateTnds: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.fromDateTnds.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            fromDateTnds: (text += '/'),
          });
          if (parseInt(a) > 12 || parseInt(a) == 0) {
            SimpleToast.show('Tháng không thể lớn hơn 12');
            this.setState({fromDateTnds: this.state.fromDateTnds.slice(0, 3)});
          }
        } else {
          this.setState({fromDateTnds: text});
          this.addBenefitDateTnds(text, 'from');
        }
        return;
      // thời hạn đến (ngày) tnds
      case 'toDateTnds':
        if (text.length === 2 && this.state.toDateTnds.charAt(2) !== '/') {
          let a = str.slice(0, 2);
          this.setState({
            toDateTnds: (text += '/'),
          });
          if (parseInt(a) > 31 || parseInt(a) == 0) {
            SimpleToast.show('Ngày không thể lớn hơn 31');
            this.setState({toDateTnds: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.toDateTnds.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            toDateTnds: (text += '/'),
          });
          if (parseInt(a) > 12 || parseInt(a) == 0) {
            SimpleToast.show('Tháng không thể lớn hơn 12');
            this.setState({toDateTnds: this.state.toDateTnds.slice(0, 3)});
          }
        } else {
          this.setState({toDateTnds: text});
          this.addBenefitDateTnds(text, 'to');
        }
        return;
      // thời hạn từ (ngày) vc
      case 'fromDateVc':
        if (text.length === 2 && this.state.fromDateVc.charAt(2) !== '/') {
          let a = str.slice(0, 2);
          this.setState({
            fromDateVc: (text += '/'),
          });
          if (parseInt(a) > 31 || parseInt(a) == 0) {
            SimpleToast.show('Ngày không thể lớn hơn 31');
            this.setState({fromDateVc: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.fromDateVc.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            fromDateVc: (text += '/'),
          });
          if (parseInt(a) > 12 || parseInt(a) == 0) {
            SimpleToast.show('Tháng không thể lớn hơn 12');
            this.setState({fromDateVc: this.state.fromDateVc.slice(0, 3)});
          }
        } else {
          this.setState({fromDateVc: text});
          this.addBenefitDateVc(text, 'from');
        }
        return;
      // thời hạn đến (ngày) vc
      case 'toDateVc':
        if (text.length === 2 && this.state.toDateVc.charAt(2) !== '/') {
          let a = str.slice(0, 2);
          this.setState({
            toDateVc: (text += '/'),
          });
          if (parseInt(a) > 31 || parseInt(a) == 0) {
            SimpleToast.show('Ngày không thể lớn hơn 31');
            this.setState({toDateVc: ''});
          }
        } else if (text.length === 5 && this.state.toDateVc.charAt(5) !== '/') {
          let a = str.slice(3, 5);
          this.setState({
            toDateVc: (text += '/'),
          });
          if (parseInt(a) > 12 || parseInt(a) == 0) {
            SimpleToast.show('Tháng không thể lớn hơn 12');
            this.setState({toDateVc: this.state.toDateVc.slice(0, 3)});
          }
        } else {
          this.setState({toDateVc: text});
          this.addBenefitDateVc(text, 'to');
        }
        return;
      default:
        return '';
    }
  };
  // nhập thời han (giờ)
  onChangeTime = (item, text) => {
    const str = text;
    switch (item) {
      // thời hạn từ (giờ) tnds
      case 'fromTimeTnds':
        if (text.length === 2 && this.state.fromTimeTnds.charAt(2) !== ':') {
          let a = str.slice(0, 2);
          this.setState({
            fromTimeTnds: (text += ':'),
          });
          if (parseInt(a) > 24) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({fromTimeTnds: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.fromTimeTnds.charAt(5) !== ':'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            fromTimeTnds: text,
          });
          if (parseInt(a) > 59) {
            SimpleToast.show('Phút không thể lớn hơn 59');
            this.setState({fromTimeTnds: this.state.fromTimeTnds.slice(0, 3)});
          }
        } else {
          this.setState({fromTimeTnds: text});
        }
        return;
      // thời hạn đến (giờ) tnds
      case 'toTimeTnds':
        if (text.length === 2 && this.state.toTimeTnds.charAt(2) !== ':') {
          let a = str.slice(0, 2);
          this.setState({
            toTimeTnds: (text += ':'),
          });
          if (parseInt(a) > 24) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({toTimeTnds: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.toTimeTnds.charAt(5) !== ':'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            toTimeTnds: text,
          });
          if (parseInt(a) > 59) {
            SimpleToast.show('Phút không thể lớn hơn 59');
            this.setState({toTimeTnds: this.state.toTimeTnds.slice(0, 3)});
          }
        } else {
          this.setState({toTimeTnds: text});
        }
        return;
      // thời hạn từ (giờ) vc
      case 'fromTimeVc':
        if (text.length === 2 && this.state.fromTimeVc.charAt(2) !== ':') {
          let a = str.slice(0, 2);
          this.setState({
            fromTimeVc: (text += ':'),
          });
          if (parseInt(a) > 24) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({fromTimeVc: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.fromTimeVc.charAt(5) !== ':'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            fromTimeVc: text,
          });
          if (parseInt(a) > 59) {
            SimpleToast.show('Phút không thể lớn hơn 59');
            this.setState({fromTimeVc: this.state.fromTimeVc.slice(0, 3)});
          }
        } else {
          this.setState({fromTimeVc: text});
        }
        return;
      // thời hạn đến (giờ) vc
      case 'toTimeVc':
        if (text.length === 2 && this.state.toTimeVc.charAt(2) !== ':') {
          let a = str.slice(0, 2);
          this.setState({
            toTimeVc: (text += ':'),
          });
          if (parseInt(a) > 24) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({toTimeVc: ''});
          }
        } else if (text.length === 5 && this.state.toTimeVc.charAt(5) !== ':') {
          let a = str.slice(3, 5);
          this.setState({
            toTimeVc: text,
          });
          if (parseInt(a) > 59) {
            SimpleToast.show('Phút không thể lớn hơn 59');
            this.setState({toTimeVc: this.state.toTimeVc.slice(0, 3)});
          }
        } else {
          this.setState({toTimeVc: text});
        }
        return;
      default:
        return;
    }
  };
  // lưu thông tin vào redux
  storeInfomation = () => {
    const {packages, tndsbbPackage} = this.state;
    let arr = packages;
    arr.push(tndsbbPackage[0]);
    this.props.saveCarInsurancePackage(arr);
    Actions.CarInfomationBuyer();
  };
  // check lần lượt các hàm validate
  // return true => next
  next = () => {
    if (this.validateEffectVc()) {
      if (this.validateFromTimeVc()) {
        if (this.validateVcFromDate()) {
          if (this.validateToTimeVc()) {
            if (this.validateVcToDate()) {
              if (this.validateEffectTnds()) {
                if (this.validateFromTimeTnds()) {
                  if (this.validateTndsFromDate()) {
                    if (this.validateToTimeTnds()) {
                      if (this.validateTndsToDate()) {
                        if (this.validateReason()) {
                          if (this.validatePercent()) {
                            if (this.validateMoney()) {
                              this.storeInfomation();
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
    }
  };
  // validate thời gian hiệu lực bh vc
  validateEffectVc = () => {
    if (this.state.EffectVc == '') {
      this.setState({
        errorCodeVcEffect: 'Thời gian hiệu lực không được bỏ trống',
      });
      return false;
    } else {
      return true;
    }
  };
  // validate thời gian hiệu lực bh tnds
  validateEffectTnds = () => {
    if (this.state.InsurancePackSet2 == false) {
      return true;
    }
    if (this.state.EffectTnds == '') {
      this.setState({
        errorCodeTndsEffect: 'Thời gian hiệu lực không được bỏ trống',
      });
      return false;
    } else {
      return true;
    }
  };
  // validate thời hạn từ (ngày)
  validateVcFromDate = () => {
    const {fromDateVc, currentDate} = this.state;
    const parsedDate = moment(fromDateVc, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    //required
    if (fromDateVc == '') {
      this.setState({errorCodeVcFromDate: 'Bạn phải nhập từ ngày'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(fromDateVc) == false) {
      this.setState({errorCodeVcFromDate: 'Ngày bắt đầu không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(fromDateVc) == false) {
      this.setState({errorCodeVcFromDate: 'Ngày bắt đầu không hợp lệ'});
      return false;
    }
    // check ngày không được nhỏ hơn ngày hiện tại
    if (moment(str).isBefore(currentDate) == true) {
      this.setState({errorCodeVcFromDate: `Cần nhập ngày từ ${currentDate}`});
      return false;
    } else {
      return true;
    }
  };
  // validate thời hạn đến (ngày) bh vc
  validateVcToDate = () => {
    const {toDateVc, currentDate, fromDateVc} = this.state;
    const parsedDate = moment(toDateVc, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    const parsedCompareDate = moment(fromDateVc, 'DD/MM/YYYY');
    const compareStr = parsedCompareDate.format('MM/DD/YYYY');
    // required
    if (toDateVc == '') {
      this.setState({errorCodeVcToDate: 'Bạn phải nhập đến ngày'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(toDateVc) == false) {
      this.setState({errorCodeVcToDate: 'Ngày đến không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(toDateVc) == false) {
      this.setState({errorCodeVcToDate: 'Ngày đến không hợp lệ'});
      return false;
    }
    // check ngày không được nhỏ hơn ngày hiện tại
    if (moment(str).isBefore(compareStr) == true) {
      this.setState({
        errorCodeVcToDate: `Thời hạn đến phải lớn hơn thời hạn từ`,
      });
      return false;
    } else {
      return true;
    }
  };
  // validate thời hạn từ (giờ) bh vc
  validateFromTimeVc = () => {
    const {fromTimeVc} = this.state;

    if (fromTimeVc == '') {
      this.setState({errorCodeVcFromTime: 'Bạn phải nhập thời gian'});
      return false;
    } else {
      return true;
    }
  };
  // validate thời hạn đến (giờ) bh vc
  validateToTimeVc = () => {
    const {toTimeVc} = this.state;
    if (toTimeVc == '') {
      this.setState({errorCodeVcToTime: 'Bạn phải nhập thời gian'});
      return false;
    } else {
      return true;
    }
  };
  // validate thời hạn từ (ngày) bh tnds
  validateTndsFromDate = () => {
    const {fromDateTnds, currentDate} = this.state;
    const parsedDate = moment(fromDateTnds, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    if (this.state.InsurancePackSet2 == false) {
      return true;
    }
    if (fromDateTnds == '') {
      this.setState({errorCodeTndsFromDate: 'Bạn phải nhập từ ngày'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(fromDateTnds) == false) {
      this.setState({errorCodeTndsFromDate: 'Ngày bắt đầu không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(fromDateTnds) == false) {
      this.setState({errorCodeTndsFromDate: 'Ngày bắt đầu không hợp lệ'});
      return false;
    }
    // check ngày không được nhỏ hơn ngày hiện tại
    if (moment(str).isBefore(currentDate) == true) {
      this.setState({errorCodeTndsFromDate: `Cần nhập ngày từ ${currentDate}`});
      return false;
    } else {
      return true;
    }
  };
  // validate thời hạn đến (ngày) bh tnds
  validateTndsToDate = () => {
    const {toDateTnds, currentDate, fromDateTnds} = this.state;
    const parsedDate = moment(toDateTnds, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    const parsedCompareDate = moment(fromDateTnds, 'DD/MM/YYYY');
    const compareStr = parsedCompareDate.format('MM/DD/YYYY');
    if (this.state.InsurancePackSet2 == false) {
      return true;
    }
    if (toDateTnds == '') {
      this.setState({errorCodeTndsToDate: 'Bạn phải nhập từ ngày'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(toDateTnds) == false) {
      this.setState({errorCodeTndsToDate: 'Ngày đến không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(toDateTnds) == false) {
      this.setState({errorCodeTndsToDate: 'Ngày đến không hợp lệ'});
      return false;
    }
    // check ngày không được nhỏ hơn ngày hiện tại
    if (moment(str).isBefore(compareStr) == true) {
      this.setState({
        errorCodeTndsToDate: `Thời hạn đến phải lớn hơn thời hạn từ`,
      });
      return false;
    } else {
      return true;
    }
  };
  // validate thời hạn từ (giờ) bh tnds
  validateFromTimeTnds = () => {
    const {fromTimeTnds} = this.state;
    if (this.state.InsurancePackSet2 == false) {
      return true;
    }
    if (fromTimeTnds == '') {
      this.setState({errorCodeTndsFromTime: 'Bạn phải nhập thời gian'});
      return false;
    } else {
      return true;
    }
  };
  // validate thời hạn đến (giờ) bh tnds
  validateToTimeTnds = () => {
    const {toTimeTnds} = this.state;
    if (this.state.InsurancePackSet2 == false) {
      return true;
    }
    if (toTimeTnds == '') {
      this.setState({errorCodeTndsToTime: 'Bạn phải nhập thời gian'});
      return false;
    } else {
      return true;
    }
  };
  // validate lí do tăng/giảm phí
  validateReason = () => {
    // nếu chọn tăng/giảm phí => bắt validate
    if (this.state.changePremiumType == '') {
      return true;
    }
    //required
    if (this.state.purpose == '') {
      this.setState({errorCodeReason: 'Bạn phải chọn lí do'});
      return false;
    } else {
      return true;
    }
  };
  // validate phần trăm tăng/giảm phí
  validatePercent = () => {
    let validateNumber = /[0-9]/;
    // nếu chọn tăng/giảm phí => bắt validate
    if (this.state.changePremiumType == '') {
      return true;
    }
    //required
    if (this.state.percent == '') {
      this.setState({errorCodePercent: 'Bạn phải nhập phần trăm'});
      return false;
    }
    // check phần trăm chỉ bao gồm chữ số
    if (validateNumber.test(this.state.percent) == false) {
      this.setState({errorCodePercent: 'Phần trăm sai định dạng'});
      return false;
    } else {
      this.setState({errorCodePercent: ''});
      return true;
    }
  };
  // validate số tiền tăng/giảm phí
  validateMoney = () => {
    let validateNumber = /[0-9]/;
    // nếu chọn tăng/giảm phí => bắt validate
    if (this.state.changePremiumType == '') {
      return true;
    }
    //required
    if (this.state.money == '') {
      this.setState({errorCodeMoney: 'Bạn phải nhập số tiền'});
      return false;
    }
    // check phần trăm chỉ bao gồm chữ số
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
      this.setState({openMonthTnds: true});
    } else {
      this.setState({openMonthVc: true});
    }
  };
  // render ds công ty bảo hiểm
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
  // render gói bảo hiểm vật chất
  renderMaterialInsurance = (item, index) => {
    const {isChecked, carFeeVc} = this.state;
    return (
      <View key={index}>
        {item.fee !== null ? (
          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.handleCheck(item)}
              disabled={
                item.name == 'Phí cơ bản' || item.fee == 0 ? true : false
              }>
              {isChecked.indexOf(item.code) !== -1 ||
              item.name == 'Phí cơ bản' ||
              item.fee == 0 ?
                <IconCheckedBoxSvg width={20} height={20} color={NewColor} /> :
                <IconBoxSvg width={20} height={20} color={NewColor} />
              }
            </TouchableOpacity>
            <View style={{flex: 0.8}}>
              <Text style={{marginLeft: 12, color: '#8D8C8D'}}>
                {item.name}
              </Text>
            </View>
            <View style={{flex: 0.4}}>
              {item.fee == 0 ? (
                <FastImage
                  source={require('../../icons/iconAgent/ic_free.png')}
                  style={{width: 65, height: 35, alignSelf: 'flex-end'}}
                  resizeMode={'contain'}
                />
              ) : (
                <Text style={{color: '#8D8C8D', textAlign: 'right'}}>
                  {item.fee !== null ? `${renderVND(item.fee)}đ` : ''}
                </Text>
              )}
            </View>
          </View>
        ) : null}
      </View>
    );
  };
  // Tính tổng phí các gói bảo hiểm vật chất
  sumArrayFee = () => {
    const {basic, totalFeeVc} = this.state;
    if (totalFeeVc.length > 0) {
      let sum = totalFeeVc.reduce((a, b) => {
        return a + b;
      });
      let s = sum + basic;
      return renderVND(s);
    } else {
      return formatNumber(basic);
    }
  };
  // Chọn tăng phí
  onTouchIncreasePremium = () => {
    if (this.state.changePremiumType == 'Tăng phí') {
      this.setState({
        changePremiumType: '',
      });
    } else {
      this.setState({
        changePremiumType: 'Tăng phí',
      });
    }
  };
  // chọn giảm phí
  onTouchDecreasedPremium = () => {
    if (this.state.changePremiumType == 'Giảm phí') {
      this.setState({
        changePremiumType: '',
      });
    } else {
      this.setState({
        changePremiumType: 'Giảm phí',
      });
    }
  };
  // render thông tin gói bảo hiểm vc
  renderFeeVc = () => {
    const {
      fromDateVc,
      fromTimeVc,
      toDateVc,
      toTimeVc,
      errorCodeVcEffect,
      errorCodeVcFromDate,
      errorCodeVcFromTime,
      errorCodeVcToTime,
      errorCodeVcToDate,
      materialInsurance,
    } = this.state;
    return (
      <View>
        <View
          style={{
            marginTop: 25,
            padding: 10,
            //paddingHorizontal: 5
          }}>
          <View style={{width: '100%', marginTop: -30}}>
            <InputSelect
              label={'Hiệu lực'}
              value={this.state.EffectVc}
              openModal={() => this.openModalEffect('materials')}
            />
            {errorCodeVcEffect !== ''
              ? this.showErrorNotInvalid(errorCodeVcEffect)
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
                label={'Thời hạn từ (giờ)'}
                value={fromTimeVc}
                onChangeText={text => this.onChangeTime('fromTimeVc', text)}
                keyboardType={'number-pad'}
                maxLength={5}
                onFocus={() => this.setState({errorCodeVcFromTime: ''})}
                onBlur={() => this.validateFromTimeVc()}
              />
              {errorCodeVcFromTime !== ''
                ? this.showErrorNotInvalid(errorCodeVcFromTime)
                : null}
            </View>
            <View style={{width: '46%'}}>
              <Input
                label={'Thời hạn từ (ngày)'}
                value={fromDateVc}
                onChangeText={text => this.onChangeDate('fromDateVc', text)}
                keyboardType={'number-pad'}
                maxLength={10}
                onFocus={() => this.setState({errorCodeVcFromDate: ''})}
                onBlur={() => this.validateVcFromDate()}
              />
              {errorCodeVcFromDate !== ''
                ? this.showErrorNotInvalid(errorCodeVcFromDate)
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
                value={toTimeVc}
                onChangeText={text => this.onChangeTime('toTimeVc', text)}
                keyboardType={'number-pad'}
                maxLength={5}
                onFocus={() => this.setState({errorCodeVcToTime: ''})}
                onBlur={() => this.validateToTimeVc()}
              />
              {errorCodeVcToTime !== ''
                ? this.showErrorNotInvalid(errorCodeVcToTime)
                : null}
            </View>
            <View style={{width: '46%'}}>
              <Input
                label={'Thời hạn đến (ngày)'}
                value={toDateVc}
                onChangeText={text => this.onChangeDate('toDateVc', text)}
                keyboardType={'number-pad'}
                maxLength={10}
                onFocus={() => this.setState({errorCodeVcToDate: ''})}
                onBlur={() => this.validateVcToDate()}
              />
              {errorCodeVcToDate !== ''
                ? this.showErrorNotInvalid(errorCodeVcToDate)
                : null}
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 0,
          }}>
          <View style={{flex: 1}}>
            <FlatList
              data={materialInsurance}
              renderItem={({item}) => this.renderMaterialInsurance(item)}
              keyExtractor={index => index.toString()}
            />
          </View>
        </View>
      </View>
    );
  };
  // render gói bảo hiểm tnlxpx
  renderTnlxpx = () => {
    const {fromDateVc, fromTimeVc, toDateVc, toTimeVc} = this.state;
    return (
      <View>
        <View
          style={{
            marginTop: 25,
            padding: 10,
            //paddingHorizontal: 5
          }}>
          <View style={{width: '100%', marginTop: -30}}>
            <InputSelect label={'Hiệu lực'} value={this.state.EffectVc} />
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
                value={fromTimeVc}
                editable={false}
              />
            </View>
            <View style={{width: '46%'}}>
              <Input
                label={'Thời hạn từ (ngày)'}
                value={fromDateVc}
                editable={false}
              />
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
                value={toTimeVc}
                editable={false}
              />
            </View>
            <View style={{width: '46%'}}>
              <Input
                label={'Thời hạn đến (ngày)'}
                value={toDateVc}
                editable={false}
              />
            </View>
          </View>
          <Text style={{fontSize: 12, fontStyle: 'italic', marginTop: 12}}>
            Chú ý: Thời hạn mua bảo hiểm tai nạn lái xe, phụ xe, người ngồi trên
            xe luôn bằng với thời gian mua bảo hiểm vật chất xe
          </Text>
        </View>
      </View>
    );
  };
  // render gói bh tnds
  renderTndsbb = () => {
    const {
      fromDateTnds,
      toDateTnds,
      fromTimeTnds,
      toTimeTnds,
      errorCodeTndsFromTime,
      errorCodeTndsToDate,
      errorCodeTndsToTime,
      errorCodeTndsEffect,
      errorCodeTndsFromDate,
    } = this.state;
    return (
      <View
        style={{
          marginTop: 25,
          padding: 10,
          //paddingHorizontal: 5
        }}>
        <View style={{width: '100%', marginTop: -30}}>
          <InputSelect
            label={'Hiệu lực'}
            value={this.state.EffectTnds}
            openModal={() => this.openModalEffect('tnds')}
          />
          {errorCodeTndsEffect !== ''
            ? this.showErrorNotInvalid(errorCodeTndsEffect)
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
              label={'Thời hạn từ (giờ)'}
              value={fromTimeTnds}
              onChangeText={text => this.onChangeTime('fromTimeTnds', text)}
              keyboardType={'number-pad'}
              maxLength={5}
              onBlur={() => this.validateFromTimeTnds()}
              onFocus={() => this.setState({errorCodeTndsFromTime: ''})}
            />
            {errorCodeTndsFromTime !== ''
              ? this.showErrorNotInvalid(errorCodeTndsFromTime)
              : null}
          </View>
          <View style={{width: '46%'}}>
            <Input
              label={'Thời hạn từ (ngày)'}
              value={fromDateTnds}
              onChangeText={text => this.onChangeDate('fromDateTnds', text)}
              keyboardType={'number-pad'}
              maxLength={10}
              onBlur={() => this.validateTndsFromDate()}
              onFocus={() => this.setState({errorCodeTndsFromDate: ''})}
            />
            {errorCodeTndsFromDate !== ''
              ? this.showErrorNotInvalid(errorCodeTndsFromDate)
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
              value={toTimeTnds}
              onChangeText={text => this.onChangeTime('toTimeTnds', text)}
              keyboardType={'number-pad'}
              maxLength={5}
              onBlur={() => this.validateToTimeTnds()}
              onFocus={() => this.setState({errorCodeTndsToTime: ''})}
            />
            {errorCodeTndsToTime !== ''
              ? this.showErrorNotInvalid(errorCodeTndsToTime)
              : null}
          </View>
          <View style={{width: '46%'}}>
            <Input
              label={'Thời hạn đến (ngày)'}
              value={toDateTnds}
              onChangeText={text => this.onChangeDate('toDateTnds', text)}
              keyboardType={'number-pad'}
              maxLength={10}
              onBlur={() => this.validateTndsToDate()}
              onFocus={() => this.setState({errorCodeTndsToDate: ''})}
            />
            {errorCodeTndsToDate !== ''
              ? this.showErrorNotInvalid(errorCodeTndsToDate)
              : null}
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {
      insuranceCompany,
      changePremiumType,
      openMonthVc,
      openMonthTnds,
      openPurpose,
      openCompensation,
      isShowTnlxpx,
      isShowTndsbb,
      defaulValueTndsbb,
      tnlxpx,
      tndsbb,
      InsurancePackSet1,
      InsurancePackSet2,
      isShowFeeVc,
      errorCodeReason,
      errorCodePercent,
      errorCodeMoney,
    } = this.state;
    const {carInsuranceType} = this.props;
    return (
      <View style={styles.container}>
        <ModalMonth
          open={openMonthVc}
          onClosed={() => this.setState({openMonthVc: null})}
          setMonth={data =>
            this.setState({EffectVc: data.name, errorCodeVcEffect: ''})
          }
        />
        <ModalMonth
          open={openMonthTnds}
          onClosed={() => this.setState({openMonthTnds: null})}
          setMonth={data =>
            this.setState({EffectTnds: data.name, errorCodeTndsEffect: ''})
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
          setCompensation={data => this.setState({compensation: data.name})}
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
                  borderRadius: 5,
                  marginTop: 10,
                  //paddingHorizontal: 5
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                    alignItems: 'center',
                  }}
                  onPress={() => this.setState({isShowFeeVc: !isShowFeeVc})}>
                  <View style={styles.packageTitle}>
                    <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                    <Text style={{fontWeight: '700', marginLeft: 8}}>
                      1. Bảo hiểm vật chất xe
                    </Text>
                  </View>
                  <View style={styles.packageFee}>
                    <Text style={{fontWeight: '700'}}>
                      {this.sumArrayFee()}đ{' '}
                    </Text>
                    {
                      this.state.isShowFeeVc == false
                        ? <IconDownSvg width={15} height={15} />
                        : <IconUpSvg width={15} height={15} />
                    }
                  </View>
                </TouchableOpacity>
                {this.state.isShowFeeVc == true ? this.renderFeeVc() : null}
              </View>
              {/* form gói bảo hiểm tnlxpx  */}
              {carInsuranceType == 'material' ? null : ( // carInsuranceType : props truyền vào khi chọn loại bảo hiểm, bh vật chất => k có tnlxpx
                <View>
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
                        <TouchableOpacity
                          style={{flexDirection: 'row', paddingHorizontal: 5}}
                          onPress={() =>
                            this.setState({isShowTnlxpx: !isShowTnlxpx})
                          }>
                          <View style={styles.packageTitle}>
                            <TouchableOpacity
                              onPress={() => this.handleCheckAccident()}>
                              {InsurancePackSet1 ?
                                <IconCheckedBoxSvg width={20} height={20} color={NewColor} /> :
                                <IconBoxSvg width={20} height={20} color={NewColor} />
                              }
                            </TouchableOpacity>
                            <Text style={{fontWeight: '700', marginLeft: 8}}>
                              2. Bảo hiểm tai nạn lái xe, phụ xe và người ngồi
                              trên xe
                            </Text>
                          </View>
                          <View style={styles.packageFee}>
                            <Text style={{fontWeight: '700', marginRight: 8}}>
                              {renderVND(item.lxpxhktx)}đ
                            </Text>
                            {
                              this.state.isShowTnlxpx == false
                                ? <IconDownSvg width={15} height={15} />
                                : <IconUpSvg width={15} height={15} />
                            }
                          </View>
                        </TouchableOpacity>
                      );
                    })}

                    {isShowTnlxpx == true ? this.renderTnlxpx() : null}
                  </View>
                  {/* form gói bảo hiểm tnds  */}
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
                    {tndsbb.map(item => {
                      return (
                        <TouchableOpacity
                          style={{flexDirection: 'row', paddingHorizontal: 5}}
                          onPress={() =>
                            this.setState({isShowTndsbb: !isShowTndsbb})
                          }>
                          <View style={styles.packageTitle}>
                            <TouchableOpacity
                              onPress={() => this.handleCheckTnds()}>
                              {InsurancePackSet2 ?
                                <IconCheckedBoxSvg width={20} height={20} color={NewColor} /> :
                                <IconBoxSvg width={20} height={20} color={NewColor} />
                              }
                            </TouchableOpacity>
                            <Text style={{fontWeight: '700', marginLeft: 8}}>
                              3. {item.name}
                            </Text>
                          </View>
                          <View style={styles.packageFee}>
                            <Text style={{fontWeight: '700', marginRight: 8}}>{`${renderVND(
                              defaulValueTndsbb,
                            )}đ`}</Text>
                            {
                              this.state.isShowTndsbb == false
                                ? <IconDownSvg width={15} height={15} />
                                : <IconUpSvg width={15} height={15} />
                            }
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                    {isShowTndsbb == true ? this.renderTndsbb() : null}
                  </View>
                </View>
              )}
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
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                }}>
                <Text style={{fontWeight: '700'}}>VAT 10%</Text>
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
    carInfo: state.carBuy.carInfo,
    carInsuranceType: state.app.carInsuranceType,
    listPackages: state.carBuy.listPackages,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveCarInsurancePackage: body => dispatch(saveCarInsurancePackage(body)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarInsurancePackage);
