import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import InputPlace from './component/InputPlace';
import Input from '../FlightInsurance/component/Input';
import NavFL from '../../components/NavFl';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimpleToast from 'react-native-simple-toast';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import ModalButton from './component/ModalButton';
import ModalButtonNoColor from './component/ModalButtonNoColor';
import {Color, subColor} from '../../config/System';
import {URL} from '../../config/System';
import 'moment/locale/vi';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../components/Loading';

moment.locale('vi');

class FlightInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: '',

      twoWay: true,
      flightListStatus: 'chieudi',
      openNation: null,
      openAirport: null,
      openFlightList: null,
      openFlightListOneWay: null,

      isArrival: true,
      editable: false,
      travelDateSearch: '',
      arrivalDateSearch: '',
      travelAirport: '',
      arrivalAirport: '',
      arrivalDate: '',
      travelDate: '',
      arrivalTime: '',
      travelTime: '',
      seatIdcd: '',
      arrivalDateReturn: '',
      travelDateReturn: '',
      arrivalTimeReturn: '',
      travelTimeReturn: '',
      flightId: '',
      flightIdReturn: '',
      seatIdcdReturn: '',
      selectedItemIndexGo: null,
      selectedItemIndexBack: null,

      loading: false,

      nationId: '',

      departureAirportCode: '',
      arrivalAirportCode: '',
      departDate: '',
      returnDepartDate: '',

      departFlightId: '',
      returnFlightId: '',

      blankInput: [
        {
          name: '',
          from: '',
          seatID: '',
          to: '',
          date: '',
          dateArrive: '',
          traveTime: '',
          arrivalTime: '',
        },
      ],
      isDepartAirport: null,
      isArrivalAirport: null,

      isOneWayFilled: false,
      isDepartWayFilled: false,
      isReturnWayFilled: false,

      flightListGo: [],
      fullFlightListGo: [],
      flightListBack: [],
      fullFlightListBack: [],

      listFullNation: [],
      filteredNation: [],
      listAirport: [],
      fullListAirport: [],

      TwoWayFlightGo: [],
      TwoWayFlightBack: [],

      flightReturn: [],
      oneWayFlight: [],
      flightInfo: [],

      errorCodeDepartAirPort: '',
      errorCodeDepartDate: '',
      errorCodeArrivalDate: '',
      errorCodeFlightNumber: '',
      errorCodeFlightNumberReturn: '',
      errorCodeBookingNumber: '',
      errorCodeInputDepartDate: '',
      errorCodeInputArrivalDate: '',
      errorCodeInputReturnDepartDate: '',
      errorCodeInputReturnArrivalDate: '',
      errorCodeBookingNumberReturn: '',
      errorCodeDepartTime: '',
      errorCodeArrivalTime: '',
      errorCodeReturnDepartTime: '',
      errorCodeReturnArrivalTime: '',
    };
  }
  componentDidMount() {
    this.getListNationFull();
    this.getCurrentDate();
  }
  _modalVisible = visible => {
    this.setState({isModalOpen: visible});
  };
  getCurrentDate = () => {
    const date = new Date();
    const parsedDate = moment(date, 'DD/MM/YYYY');
    const a = parsedDate.format('MM/DD/YYYY');
    this.setState({currentDate: a});
  };
  getListAirport = () => {
    let url = `${URL}/api/master-data/v1/airports?limit=100&nation=${
      this.state.nationId
    }`;
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          listAirport: res.data,
          fullListAirport: res.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  // Lấy danh sách chuyến bay chiều đi và chuyến bay một chiều
  getListFlightGo = (formatedDepartDate, formatedReturnDepartDate) => {
    const {
      departureAirportCode,
      arrivalAirportCode,
      returnDepartDate,
    } = this.state;
    this.setState({loading: true});
    let url = `${URL}/api/vj-flight/v1/flights/schedules?limit=10&offset=0&departureAirportCode=${departureAirportCode}&arrivalAirportCode=${arrivalAirportCode}&departDate=${formatedDepartDate}&returnDepartDate=${formatedReturnDepartDate}`;
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res?.status >= 200 && res?.status < 300) {
          return res.json().then(data => {
            this.setState({
              flightListGo:
                returnDepartDate == '' ? data.data : data.data.depart, // chuyến bay một chiều = data.data.depart
              fullFlightListGo:
                returnDepartDate == '' ? data.data : data.data.depart,
            });
            this.openFlight();
            this.setState({loading: false});
          });
        } else {
          this.openFlight();
          this.setState({loading: false});
        }
      })
      .catch((error, res) => {
        console.log(error);
      });
  };
  // Lấy danh sách chuyến bay chiều về
  getListFlightBack = (formatedDepartDate, formatedReturnDepartDate) => {
    const {
      departureAirportCode,
      arrivalAirportCode,
      returnDepartDate,
    } = this.state;
    this.setState({loading: true});
    let url = `${URL}/api/vj-flight/v1/flights/schedules?limit=10&offset=0&departureAirportCode=${arrivalAirportCode}&arrivalAirportCode=${departureAirportCode}&departDate=${formatedDepartDate}&returnDepartDate=${formatedReturnDepartDate}`;
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res?.status >= 200 && res?.status < 300) {
          return res.json().then(data => {
            this.setState({
              flightListBack:
                returnDepartDate == '' ? data.data : data.data.depart,
              fullFlightListBack:
                returnDepartDate == '' ? data.data : data.data.depart,
            });
            this.openFlight();
            this.setState({loading: false});
          });
        } else {
          this.openFlight();
          this.setState({loading: false});
        }
      })
      .catch((error, res) => {
        console.log(error);
      });
  };
  // Lấy danh sách quốc gia
  getListNationFull = () => {
    let url = `${URL}/api/master-data/v1/nations/list-nation`;
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          listFullNation: res.data,
          filteredNation: res.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  // conver định dạng ngày => YYYY-MM-DD
  formatDate = item => {
    let parsedDate = moment(item, 'DD/MM/YYYY');
    let formatedDate = parsedDate.format('YYYY-MM-DD');
    return formatedDate;
  };
  // lưu thông tin vào redux
  storeInfomation = async () => {
    const {
      flightId,
      twoWay,
      departureAirportCode,
      departFlightId,
      returnFlightId,
      seatIdcd,
      seatIdcdReturn,
      TwoWayFlightGo,
      TwoWayFlightBack,
      travelDate,
      arrivalAirportCode,
      travelTime,
      arrivalDate,
      arrivalTime,
      flightIdReturn,
      travelDateReturn,
      travelTimeReturn,
      arrivalDateReturn,
      arrivalTimeReturn,
    } = this.state;
    // lưu thông tin chuyến bay chiều đi người dùng nhập vào
    let customDepartFlight = {
      flightNumber: flightId,
      departDate: this.formatDate(travelDate),
      departTime: travelTime,
      arrivalDate: this.formatDate(arrivalDate),
      arrivalTime: arrivalTime,
    };
    // lưu thông tin chuyến bay chiều về người dùng nhập vào
    let customArrivalFlight = {
      flightNumber: flightIdReturn,
      departDate: this.formatDate(travelDateReturn),
      departTime: travelTimeReturn,
      arrivalDate: this.formatDate(arrivalDateReturn),
      arrivalTime: arrivalTimeReturn,
    };
    //lưu thông tin chuyến bay chọn từ danh sách
    let array = {
      twoWay: twoWay,
      departAirport: departureAirportCode,
      departFlightId: departFlightId,
      returnFlightId: returnFlightId,
      departBookingNumber: seatIdcd,
      returnBookingNumber: seatIdcdReturn,
      arrivalAirport: arrivalAirportCode,
    };
    this.props.saveFlightInfo(array);
    this.props.saveCustomDepartFlightInfo(customDepartFlight);
    this.props.saveCustomArrivalFlightInfo(customArrivalFlight);
    await AsyncStorage.setItem(
      'TwoWayFlightGo',
      JSON.stringify(TwoWayFlightGo),
    );
    await AsyncStorage.setItem(
      'TwoWayFlightBack',
      JSON.stringify(TwoWayFlightBack),
    );
  };
  // tìm kiếm chuyến bay khư hồi
  searchTwoWayFlight = () => {
    Keyboard.dismiss();
    const {departDate, returnDepartDate} = this.state;
    //format ngày đi => YYYY/MM/DD
    let parsedDepartDate = moment(departDate, 'DD/MM/YYYY');
    let formatedDepartDate = parsedDepartDate.format('YYYY/MM/DD');
    //format ngày về => YYYY/MM/DD
    let parsedReturnDepartDate = moment(returnDepartDate, 'DD/MM/YYYY');
    let formatedReturnDepartDate = parsedReturnDepartDate.format('YYYY/MM/DD');
    if (this.validateDepartAirPort()) {
      if (this.validateDepartDate()) {
        if (this.validateArrivalDate()) {
          this.getListFlightGo(formatedDepartDate, formatedReturnDepartDate);
          this.getListFlightBack(formatedDepartDate, formatedReturnDepartDate);
        }
      }
    }
  };
  // tìm kiếm chuyến bay một chiều
  searchOneWayFlight = () => {
    Keyboard.dismiss();
    const {departDate} = this.state;
    let parsedDepartDate = moment(departDate, 'DD/MM/YYYY');
    let formatedDepartDate = parsedDepartDate.format('YYYY/MM/DD');
    let formatedReturnDepartDate = '';
    if (this.validateDepartAirPort()) {
      if (this.validateDepartDate()) {
        this.getListFlightGo(formatedDepartDate, formatedReturnDepartDate);
      }
    }
  };
  // check lần lượt các hàm validate
  // return true => next
  next = async () => {
    if (this.validateFlightNumber()) {
      if (this.validateBookingNumber()) {
        if (this.validateInputDepartDate()) {
          if (this.validateInputArrivalDate()) {
            if (this.validateFlightNumberReturn()) {
              if (this.validateBookingNumberReturn()) {
                if (this.validateInputReturnDepartDate()) {
                  if (this.validateInputReturnArrivalDate())
                    if (this.validateDepartTime()) {
                      if (this.validateArrivalTime()) {
                        if (this.validateReturnDepartTime()) {
                          if (this.validateReturnArrivalTime()) {
                            {
                              this.storeInfomation();
                              Actions.CustomerInfo();
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
  // nhập ngày
  _onChangeText(item, text) {
    const str = text;
    switch (item) {
      // ngày đến
      case 'arrivalDate':
        if (text.length === 2 && this.state.arrivalDate.charAt(2) !== '/') {
          let a = str.slice(0, 2);
          this.setState({
            arrivalDate: (text += '/'),
          });
          if (parseInt(a) > 31 || parseInt(a) == 0) {
            SimpleToast.show('Ngày đến không hợp lệ');
            this.setState({arrivalDate: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.arrivalDate.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          let b = str.slice(0, 2);
          this.setState({
            arrivalDate: (text += '/'),
          });
          if (
            parseInt(a) > 12 ||
            (parseInt(b) > 29 && parseInt(a) == 2) ||
            parseInt(a) == 0
          ) {
            SimpleToast.show('Tháng đến không hợp lệ');
            this.setState({arrivalDate: this.state.arrivalDate.slice(0, 3)});
          }
        } else {
          this.setState({arrivalDate: text});
        }
        return;
      // ngày đi
      case 'travelDate':
        if (text.length === 2 && this.state.travelDate.charAt(2) !== '/') {
          let a = str.slice(0, 2);
          this.setState({
            travelDate: (text += '/'),
          });
          if (parseInt(a) > 31 || parseInt(a) == 0) {
            SimpleToast.show('Ngày đi không hợp lệ');
            this.setState({travelDate: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.travelDate.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          let b = str.slice(0, 2);
          this.setState({
            travelDate: (text += '/'),
          });
          if (
            parseInt(a) > 12 ||
            (parseInt(b) > 29 && parseInt(a) == 2) ||
            parseInt(a) == 0
          ) {
            SimpleToast.show('Tháng đi không hợp lệ');
            this.setState({travelDate: this.state.travelDate.slice(0, 3)});
          }
        } else {
          this.setState({travelDate: text});
        }
        return;
      // giờ đi
      case 'travelTime':
        if (text.length === 2 && this.state.travelTime.charAt(2) !== ':') {
          let a = str.slice(0, 2);
          this.setState({
            travelTime: (text += ':'),
          });
          if (parseInt(a) > 24) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({travelTime: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.travelTime.charAt(5) !== ':'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            travelTime: text,
          });
          if (parseInt(a) > 59) {
            SimpleToast.show('Phút không thể lớn hơn 59');
            this.setState({travelTime: this.state.travelTime.slice(0, 3)});
          }
        } else {
          this.setState({travelTime: text});
        }
        return;
      // giờ đến
      case 'arrivalTime':
        if (text.length === 2 && this.state.arrivalTime.charAt(2) !== ':') {
          let a = str.slice(0, 2);
          this.setState({
            arrivalTime: (text += ':'),
          });
          if (parseInt(a) > 24) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({arrivalTime: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.arrivalTime.charAt(5) !== ':'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            arrivalTime: text,
          });
          if (parseInt(a) > 59) {
            SimpleToast.show('Phút không thể lớn hơn 59');
            this.setState({arrivalTime: this.state.arrivalTime.slice(0, 3)});
          }
        } else {
          this.setState({arrivalTime: text});
        }
        return;
      //ngày đến chiều về
      case 'arrivalDateReturn':
        if (
          text.length === 2 &&
          this.state.arrivalDateReturn.charAt(2) !== '/'
        ) {
          let a = str.slice(0, 2);
          this.setState({
            arrivalDateReturn: (text += '/'),
          });
          if (parseInt(a) > 31 || parseInt(a) == 0) {
            SimpleToast.show('Ngày đến không hợp lệ');
            this.setState({arrivalDateReturn: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.arrivalDateReturn.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          let b = str.slice(0, 2);
          this.setState({
            arrivalDateReturn: (text += '/'),
          });
          if (
            parseInt(a) > 12 ||
            (parseInt(b) > 29 && parseInt(a) == 2) ||
            parseInt(a) == 0
          ) {
            SimpleToast.show('Tháng đến không hợp lệ');
            this.setState({
              arrivalDateReturn: this.state.arrivalDateReturn.slice(0, 3),
            });
          }
        } else {
          this.setState({arrivalDateReturn: text});
        }
        return;
      // ngày đi chiều về
      case 'travelDateReturn':
        if (
          text.length === 2 &&
          this.state.travelDateReturn.charAt(2) !== '/'
        ) {
          let a = str.slice(0, 2);
          this.setState({
            travelDateReturn: (text += '/'),
          });
          if (parseInt(a) > 31 || parseInt(a) == 0) {
            SimpleToast.show('Ngày đi không hợp lệ');
            this.setState({travelDateReturn: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.travelDateReturn.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          let b = str.slice(0, 2);
          this.setState({
            travelDateReturn: (text += '/'),
          });
          if (
            parseInt(a) > 12 ||
            (parseInt(b) > 29 && parseInt(a) == 2) ||
            parseInt(a) == 0
          ) {
            SimpleToast.show('Tháng đi không hợp lệ');
            this.setState({
              travelDateReturn: this.state.travelDateReturn.slice(0, 3),
            });
          }
        } else {
          this.setState({travelDateReturn: text});
        }
        return;
      // giờ đi chiều về
      case 'travelTimeReturn':
        if (
          text.length === 2 &&
          this.state.travelTimeReturn.charAt(2) !== ':'
        ) {
          let a = str.slice(0, 2);
          this.setState({
            travelTimeReturn: (text += ':'),
          });
          if (parseInt(a) > 24) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({travelTimeReturn: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.travelTimeReturn.charAt(5) !== ':'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            travelTimeReturn: text,
          });
          if (parseInt(a) > 59) {
            SimpleToast.show('Phút không thể lớn hơn 59');
            this.setState({
              travelTimeReturn: this.state.travelTimeReturn.slice(0, 3),
            });
          }
        } else {
          this.setState({travelTimeReturn: text});
        }
        return;
      // giờ đến chiều về
      case 'arrivalTimeReturn':
        if (
          text.length === 2 &&
          this.state.arrivalTimeReturn.charAt(2) !== ':'
        ) {
          let a = str.slice(0, 2);
          this.setState({
            arrivalTimeReturn: (text += ':'),
          });
          if (parseInt(a) > 24) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({arrivalTimeReturn: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.arrivalTimeReturn.charAt(5) !== ':'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            arrivalTimeReturn: text,
          });
          if (parseInt(a) > 59) {
            SimpleToast.show('Phút không thể lớn hơn 59');
            this.setState({
              arrivalTimeReturn: this.state.arrivalTimeReturn.slice(0, 3),
            });
          }
        } else {
          this.setState({arrivalTimeReturn: text});
        }
        return;
      // ngày đi (form tìm kiếm chuyến bay)
      case 'departDate':
        if (text.length === 2 && this.state.departDate.charAt(2) !== '/') {
          let a = str.slice(0, 2);
          this.setState({
            departDate: (text += '/'),
          });
          if (parseInt(a) > 31 || parseInt(a) == 0) {
            SimpleToast.show('Ngày đi không hợp lệ');
            this.setState({departDate: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.departDate.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          let b = str.slice(0, 2);
          this.setState({
            departDate: (text += '/'),
          });
          if (
            parseInt(a) > 12 ||
            (parseInt(b) > 29 && parseInt(a) == 2) ||
            parseInt(a) == 0
          ) {
            SimpleToast.show('Tháng đi không hợp lệ');
            this.setState({departDate: this.state.departDate.slice(0, 3)});
          }
        } else {
          this.setState({departDate: text});
        }
        return;
      // ngày về (form tìm kiếm chuyến bay)
      case 'returnDepartDate':
        if (
          text.length === 2 &&
          this.state.returnDepartDate.charAt(2) !== '/'
        ) {
          let a = str.slice(0, 2);
          this.setState({
            returnDepartDate: (text += '/'),
          });
          if (parseInt(a) > 31 || parseInt(a) == 0) {
            SimpleToast.show('Ngày đến không hợp lệ');
            this.setState({returnDepartDate: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.returnDepartDate.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          let b = str.slice(0, 2);
          this.setState({
            returnDepartDate: (text += '/'),
          });
          if (parseInt(a) > 12 || parseInt(a) == 0) {
            SimpleToast.show('Tháng đến không hợp lệ');
            this.setState({
              returnDepartDate: this.state.returnDepartDate.slice(0, 3),
            });
          }
        } else {
          this.setState({returnDepartDate: text});
        }
        return;
      default:
        return;
    }
  }
  // show validate error message
  showErrorNotInvalid(item) {
    return (
      <View>
        <Text style={styles.txtErrorCode}>{item}</Text>
      </View>
    );
  }
  // mở modal chọn điểm đến
  openArrivalAirport = () => {
    if (this.state.travelAirport == '') {
      SimpleToast.show('Vui lòng chọn điểm đi');
    } else {
      this.setState({openNation: true, isDepartAirport: false});
    }
  };
  // chọn không tìm thấy chuyến bay
  setBlank = data => {
    // nếu ở tab chiều đi => người dùng tự nhập thông tin chuyến bay chiều đi
    if (this.state.flightListStatus == 'chieudi') {
      this.setState({
        TwoWayFlightGo: this.state.blankInput,
        editable: true,
      });
      // nếu ở tab chiều về => người dùng tự nhập thông tin chuyến bay chiều về
    } else {
      this.setState({
        TwoWayFlightBack: this.state.blankInput,
        editable: true,
      });
    }
  };
  // chọn quốc gia
  setPlace = data => {
    const {isArrival} = this.state;
    if (isArrival == true) {
      // chọn điểm đến
      this.setState({
        openArrivalAirport: true,
      });
    } else {
      this.setState({
        // chọn điểm đi
        openTravelAirport: true,
      });
    }
  };
  // mở modal danh sách chuyến bay
  openFlight = () => {
    if (this.state.twoWay) {
      // khứ hồi
      this.setState({openFlightList: true});
    } else {
      // một chiều
      this.setState({openFlightListOneWay: true});
    }
  };
  // format chuỗi dài hơn 18 ký tự, thêm '...'
  formatString = text => {
    let a = text;
    if (a.length > 18) {
      let b = a.slice(0, 16);
      let c = b + '...';
      return c;
    } else {
      return a;
    }
  };
  // tìm kiếm chuyến bay chiều đi
  searchFilterFlightGo = text => {
    var a = this.state.fullFlightListGo;
    var b = [];
    // text = text.replace(/\(/g,'').replace(/\)/g,'')
    var newText = text.toUpperCase();
    for (let i = 0; i < a.length; i++) {
      if (a[i].flightNumber.toUpperCase().indexOf(newText) > -1) {
        b.push(a[i]);
      }
    }
    this.setState({flightListGo: b});
  };
  // tìm kiếm chuyến bay chiều về
  searchFilterFlightBack = text => {
    var a = this.state.fullFlightListBack;
    var b = [];
    // text = text.replace(/\(/g,'').replace(/\)/g,'')
    var newText = text.toUpperCase();
    for (let i = 0; i < a.length; i++) {
      if (a[i].flightNumber.toUpperCase().indexOf(newText) > -1) {
        b.push(a[i]);
      }
    }
    this.setState({flightListBack: b});
  };
  // tìm kiếm quốc gia
  searchFilterNation = text => {
    var a = this.state.listFullNation;
    var b = [];
    // text = text.replace(/\(/g,'').replace(/\)/g,'')
    var newText = text.toUpperCase();
    for (let i = 0; i < a.length; i++) {
      if (a[i].name.toUpperCase().indexOf(newText) > -1) {
        b.push(a[i]);
      }
    }
    this.setState({filteredNation: b});
  };
  // tìm kiếm sân bay
  searchFilterAirport = text => {
    var a = this.state.fullListAirport;
    var b = [];
    // text = text.replace(/\(/g,'').replace(/\)/g,'')
    var newText = text.toUpperCase();
    for (let i = 0; i < a.length; i++) {
      if (a[i].name.toUpperCase().indexOf(newText) > -1) {
        b.push(a[i]);
      }
    }
    this.setState({listAirport: b});
  };
  //chọn chuyến bay khứ hồi
  setTwoWayFlight = (item, index) => {
    const {flightListStatus} = this.state;
    // chiều đi
    if (flightListStatus == 'chieudi') {
      this.state.TwoWayFlightGo.pop(); // xóa chuyến bay được chọn gần nhất
      this.state.TwoWayFlightGo.push({
        // thêm thông tin chuyến bay được chọn
        flightNumber: item.flightNumber,
        departDate: moment(item.estimateDepartTimeLocal).format('L'),
        departTime: moment(item.estimateDepartTimeLocal).format('LT'),
        arrivalDate: moment(item.estimateArriveTimeLocal).format('L'),
        arrivalTime: moment(item.estimateArriveTimeLocal).format('LT'),
      });
      this.setState({
        selectedItemIndexGo: index, // hiên thị chuyến bay nào được chọn
        flightListStatus: 'chieuve', // chuyển sang chiều về
        TwoWayFlightGo: this.state.TwoWayFlightGo, // set thông tin chuyến bay đã chonj
        departFlightId: item._id, // set id chuyến bay
        isDepartWayFilled: true, // đổi trạng thái thông tin chuyến bay => đã tự fill
      });
    } else {
      this.state.TwoWayFlightBack.pop();
      this.state.TwoWayFlightBack.push({
        flightNumber: item.flightNumber,
        departDate: moment(item.estimateDepartTimeLocal).format('L'),
        departTime: moment(item.estimateDepartTimeLocal).format('LT'),
        arrivalDate: moment(item.estimateArriveTimeLocal).format('L'),
        arrivalTime: moment(item.estimateArriveTimeLocal).format('LT'),
      });
      this.setState({
        selectedItemIndexBack: index,
        TwoWayFlightBack: this.state.TwoWayFlightBack,
        returnFlightId: item._id,
        isReturnWayFilled: true,
      });
    }
  };
  // chọn chuyến bay một chiều
  setOneWayFlight = (item, index) => {
    const {TwoWayFlightGo} = this.state;
    TwoWayFlightGo.pop();
    TwoWayFlightGo.push({
      flightNumber: item.flightNumber,
      departDate: moment(item.estimateDepartTimeLocal).format('L'),
      departTime: moment(item.estimateDepartTimeLocal).format('LT'),
      arrivalDate: moment(item.estimateArriveTimeLocal).format('L'),
      arrivalTime: moment(item.estimateArriveTimeLocal).format('LT'),
    });
    this.setState({
      selectedItemIndexGo: index,
      TwoWayFlightGo: this.state.TwoWayFlightGo,
      departFlightId: item._id,
      isOneWayFilled: true,
    });
  };
  validateDepartDate = () => {
    const {currentDate, departDate, returnDepartDate} = this.state;
    // format ngày => đinh dạng DD/MM/YYYY
    const parsedDate = moment(departDate, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    // format ngày => đinh dạng DD/MM/YYYY
    const parsedCompareDate = moment(returnDepartDate, 'DD/MM/YYYY');
    const strCompare = parsedCompareDate.format('MM/DD/YYYY');

    if (departDate == '') {
      this.setState({errorCodeDepartDate: 'Vui lòng nhập ngày đi'});
      return false;
    }
    // check ngày 29/02 năm nhuận => true
    if (checkLeapYear(departDate) == false) {
      this.setState({errorCodeDepartDate: 'Ngày đi không hợp lệ'});
      return false;
    }
    // check ngày 31 tháng có 30 ngày
    if (checkMonth(departDate) == false) {
      this.setState({errorCodeDepartDate: 'Ngày đi không hợp lệ'});
      return false;
    }
    // check ngày đi với ngày hiện tại
    if (moment(str).isBefore(currentDate) == true) {
      this.setState({
        errorCodeDepartDate: 'Ngày đi phải lớn hơn ngày hiện tại',
      });
      return false;
    }
    // check ngày đi và ngày về
    if (moment(strCompare).isBefore(str) == true) {
      this.setState({errorCodeDepartDate: 'Ngày đi phải nhỏ hơn ngày ngày về'});
      return false;
    } else {
      this.setState({errorCodeDepartDate: ''}); // không có lỗi validate
      return true;
    }
  };
  validateArrivalDate = () => {
    const {currentDate, departDate, returnDepartDate} = this.state;
    const parsedDate = moment(returnDepartDate, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    const parsedCompareDate = moment(departDate, 'DD/MM/YYYY');
    const compareStr = parsedCompareDate.format('MM/DD/YYYY');
    if (returnDepartDate == '') {
      this.setState({errorCodeArrivalDate: 'Vui lòng nhập ngày về'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(returnDepartDate) == false) {
      this.setState({errorCodeArrivalDate: 'Ngày về không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(returnDepartDate) == false) {
      this.setState({errorCodeArrivalDate: 'Ngày về không hợp lệ'});
      return false;
    }
    // check ngày về phải lớn hơn hoặc bằng ngày đi
    if (moment(str).isBefore(compareStr) == true) {
      this.setState({
        errorCodeArrivalDate: 'Ngày về phải lớn hơn hoặc bằng ngày đi',
      });
      return false;
    } else {
      this.setState({errorCodeArrivalDate: ''});
      return true;
    }
  };
  // validate điểm đi
  validateDepartAirPort = () => {
    if (this.state.travelAirport == '') {
      SimpleToast.show('Vui lòng chọn điểm đi');
      return false;
    } else {
      this.setState({errorCodeDepartAirPort: ''});
      return true;
    }
  };
  // validate ngày đi do người dùng nhập
  validateInputDepartDate = () => {
    const {currentDate, travelDate, arrivalDate} = this.state;
    const parsedDate = moment(travelDate, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    // nếu đã tự fill => k bắt validate
    if (this.state.isDepartWayFilled || this.state.isOneWayFilled) {
      return true;
    }
    // required
    if (travelDate == '') {
      this.setState({errorCodeInputDepartDate: 'Vui lòng nhập ngày đi'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(travelDate) == false) {
      this.setState({errorCodeInputDepartDate: 'Ngày đi không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(travelDate) == false) {
      this.setState({errorCodeInputDepartDate: 'Ngày đi không hợp lệ'});
      return false;
    }
    // check ngày về phải lớn hơn hoặc bằng ngày hiện tại
    if (moment(str).isBefore(currentDate) == true) {
      this.setState({
        errorCodeInputDepartDate:
          'Ngày đi phải lớn hơn hoặc bằng ngày hiện tại',
      });
      return false;
    } else {
      this.setState({errorCodeInputDepartDate: ''});
      return true;
    }
  };
  // validate ngày về do người dùng nhập
  validateInputArrivalDate = () => {
    const {travelDate, arrivalDate} = this.state;
    const parsedDate = moment(arrivalDate, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    const parsedCompareDate = moment(travelDate, 'DD/MM/YYYY');
    const compareStr = parsedCompareDate.format('MM/DD/YYYY');
    // nếu đã tự fill => k bắt validate
    if (this.state.isDepartWayFilled || this.state.isOneWayFilled) {
      return true;
    }
    // required
    if (arrivalDate == '') {
      this.setState({errorCodeInputArrivalDate: 'Vui lòng nhập ngày về'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(arrivalDate) == false) {
      this.setState({errorCodeInputArrivalDate: 'Ngày về không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(arrivalDate) == false) {
      this.setState({errorCodeInputArrivalDate: 'Ngày về không hợp lệ'});
      return false;
    }
    // check ngày về phải lớn hơn hoặc bằng ngày đi
    if (moment(str).isBefore(compareStr) == true) {
      this.setState({
        errorCodeInputArrivalDate: 'Ngày về phải lớn hơn hoặc bằng ngày đi',
      });
      return false;
    } else {
      this.setState({errorCodeInputArrivalDate: ''});
      return true;
    }
  };
  // validate ngày đi chiều về do người dùng nhập
  validateInputReturnDepartDate = () => {
    const {
      currentDate,
      travelDateReturn,
      arrivalDate,
      isReturnWayFilled,
      isOneWayFilled,
      twoWay,
    } = this.state;
    const parsedDate = moment(travelDateReturn, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    const parseArrivalDate = moment(arrivalDate, 'DD/MM/YYYY');
    const formatedArrivalDate = parseArrivalDate.format('MM/DD/YYYY');
    // nếu đã tự fill => k bắt validate
    if (isReturnWayFilled || isOneWayFilled || !twoWay) {
      return true;
    }
    if (travelDateReturn == '') {
      this.setState({errorCodeInputReturnDepartDate: 'Vui lòng nhập ngày đi'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(travelDateReturn) == false) {
      this.setState({errorCodeInputReturnDepartDate: 'Ngày đi không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(travelDateReturn) == false) {
      this.setState({errorCodeInputReturnDepartDate: 'Ngày đi không hợp lệ'});
      return false;
    }
    // check ngày ngày đi phải lớn hơn hoặc bằng ngày hiện tại
    if (moment(str).isBefore(currentDate) == true) {
      this.setState({
        errorCodeInputReturnDepartDate:
          'Ngày đi phải lớn hơn hoặc bằng ngày hiện tại',
      });
      return false;
    }
    // check ngày đi chiều về phải lớn hơn hoặc bằng ngày ngày đến chiều đi
    if (moment(str).isBefore(formatedArrivalDate) == true) {
      this.setState({
        errorCodeInputReturnDepartDate:
          'Ngày đi chiều về phải lớn hơn hoặc bằng ngày ngày đến chiều đi',
      });
      return false;
    } else {
      this.setState({errorCodeInputReturnDepartDate: ''});
      return true;
    }
  };
  validateInputReturnArrivalDate = () => {
    const {isReturnWayFilled, isOneWayFilled, twoWay} = this.state;
    const {travelDateReturn, arrivalDateReturn} = this.state;
    const parsedDate = moment(arrivalDateReturn, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    const parsedCompareDate = moment(travelDateReturn, 'DD/MM/YYYY');
    const compareStr = parsedCompareDate.format('MM/DD/YYYY');
    // nếu đã tự fill => k bắt validate
    if (isReturnWayFilled || isOneWayFilled || !twoWay) {
      return true;
    }
    if (arrivalDateReturn == '') {
      this.setState({errorCodeInputReturnArrivalDate: 'Vui lòng nhập ngày về'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(arrivalDateReturn) == false) {
      this.setState({errorCodeInputReturnArrivalDate: 'Ngày về không hợp lệ'});
      return false;
    }
    // check ngày 29/02 năm nhuận
    if (checkLeapYear(arrivalDateReturn) == false) {
      this.setState({errorCodeInputReturnArrivalDate: 'Ngày về không hợp lệ'});
      return false;
    }
    // check ngày về phải lớn hơn hoặc bằng ngày đi
    if (moment(str).isBefore(compareStr) == true) {
      this.setState({
        errorCodeInputReturnArrivalDate:
          'Ngày về phải lớn hơn hoặc bằng ngày đi',
      });
      return false;
    } else {
      this.setState({errorCodeInputReturnArrivalDate: ''});
      return true;
    }
  };
  // validate số hiệu chuyến bay
  validateFlightNumber = () => {
    const {isDepartWayFilled, isOneWayFilled} = this.state;
    // nếu đã tự fill => k bắt validate
    if (isDepartWayFilled || isOneWayFilled) {
      return true;
    }
    // required
    if (this.state.flightId == '') {
      this.setState({
        errorCodeFlightNumber: 'Số hiệu chuyến bay không được để trống',
      });
      return false;
    } else {
      this.setState({errorCodeFlightNumber: ''});
      return true;
    }
  };
  // validate số hiệu chuyến bay chiều về
  validateFlightNumberReturn = () => {
    const {isOneWayFilled, twoWay,isReturnWayFilled} = this.state;
    // nếu đã tự fill => k bắt validate
    if (isReturnWayFilled || isOneWayFilled || !twoWay ) {
      return true;
    }
    // required
    if (this.state.flightIdReturn == '') {
      this.setState({
        errorCodeFlightNumberReturn: 'Số hiệu chuyến bay không được để trống',
      });
      return false;
    } else {
      this.setState({errorCodeFlightNumberReturn: ''});
      return true;
    }
  };
  // validate mã đặt chỗ
  validateBookingNumber = () => {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const {seatIdcd, seatIdcdReturn} = this.state;
    //required
    if (seatIdcd == '') {
      this.setState({errorCodeBookingNumber: 'Mã đặt chỗ không được để trống'});
      return false;
    }
    // check mã đặt chỗ chiều đi và chiều về
    if (seatIdcd == seatIdcdReturn) {
      this.setState({
        errorCodeBookingNumber:
          'Mã đặt chỗ của chiều đi không được trùng với chiều về',
      });
      return false;
    }
    // check mã đặt chỗ k được chứa ký tự đặc biệt
    if (validateName.test(this.state.seatIdcd)) {
      this.setState({
        errorCodeBookingNumber: 'Mã đặt chỗ không chứa ký tự đặc biệt',
      });
      return false;
    }
    if (seatIdcd !== seatIdcdReturn) {
      this.setState({
        errorCodeBookingNumber: '',
        errorCodeBookingNumberReturn: '',
      });
      return true;
    } else {
      this.setState({errorCodeBookingNumber: ''});
      return true;
    }
  };
  // validate mã đặt chỗ chiều về
  validateBookingNumberReturn = () => {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const {seatIdcd, seatIdcdReturn, isOneWayFilled, twoWay} = this.state;
    // chuyến bay 1 chiều => k validate
    if (isOneWayFilled || !twoWay) {
      return true;
    }
    //required
    if (seatIdcdReturn == '') {
      this.setState({
        errorCodeBookingNumberReturn: 'Mã đặt chỗ không được để trống',
      });
      return false;
    }
    // check mã đặt chỗ chiều đi và chiều về
    if (seatIdcd == seatIdcdReturn) {
      this.setState({
        errorCodeBookingNumberReturn:
          'Mã đặt chỗ của chiều đi không được trùng với chiều về',
      });
      return false;
    }
    // check mã đặt chỗ k được chứa ký tự đặc biệt
    if (validateName.test(this.state.seatIdcdReturn)) {
      this.setState({
        errorCodeBookingNumberReturn: 'Mã đặt chỗ không chứa ký tự đặc biệt',
      });
      return false;
    }
    if (seatIdcd !== seatIdcdReturn) {
      this.setState({
        errorCodeBookingNumber: '',
        errorCodeBookingNumberReturn: '',
      });
      return true;
    } else {
      this.setState({errorCodeBookingNumberReturn: ''});
      return true;
    }
  };
  // validate giờ đi
  validateDepartTime = () => {
    const {traveTime, isDepartWayFilled, isOneWayFilled} = this.state;
    // nếu đã tự fill => k bắt validate
    if (isDepartWayFilled || isOneWayFilled) {
      return true;
    }
    // required
    if (traveTime == '') {
      this.setState({errorCodeDepartTime: 'Giờ đi không được để trống'});
      return false;
    } else {
      return true;
    }
  };
  // validate giờ đến
  validateArrivalTime = () => {
    const {arrivalTime, isDepartWayFilled, isOneWayFilled} = this.state;
    // nếu đã tự fill => k bắt validate
    if (isDepartWayFilled || isOneWayFilled) {
      return true;
    }
    // required
    if (arrivalTime == '') {
      this.setState({errorCodeArrivalTime: 'Giờ về không được để trống'});
      return false;
    } else {
      return true;
    }
  };
  // validate giờ đi chiều về
  validateReturnDepartTime = () => {
    const {
      travelTimeReturn,
      isReturnWayFilled,
      isOneWayFilled,
      twoWay,
    } = this.state;
    // nếu đã tự fill => k bắt validate
    if (isReturnWayFilled || isOneWayFilled || !twoWay) {
      return true;
    }
    // required
    if (travelTimeReturn == '') {
      this.setState({errorCodeReturnDepartTime: 'Giờ đi không được để trống'});
      return false;
    } else {
      return true;
    }
  };
  // validate giờ đến chiều về
  validateReturnArrivalTime = () => {
    const {
      arrivalTimeReturn,
      isReturnWayFilled,
      isOneWayFilled,
      twoWay,
    } = this.state;
    // nếu đã tự fill => k bắt validate
    if (isReturnWayFilled || isOneWayFilled || !twoWay) {
      return true;
    }
    // required
    if (arrivalTimeReturn == '') {
      this.setState({errorCodeReturnArrivalTime: 'Giờ về không được để trống'});
      return false;
    } else {
      return true;
    }
  };

  // render modal danh sách tìm kiếm chuyến bay một chiều
  renderModalFlightListOneWay = () => {
    const {
      flightListStatus,
      flightListGo,
      selectedItemIndexGo,
      selectedItemIndexBack,
    } = this.state;
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          marginTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View
          style={{
            flex: 0.15,
            backgroundColor: '#F6F5F6',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: -10,
            justifyContent: 'center',
          }}>
          <Text style={{marginLeft: 40, fontWeight: '700', fontSize: 16}}>
            Danh sách chuyến bay
          </Text>
        </View>
        <View style={styles.ctInput}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../icons/iconAgent/ic_search.png')}
              style={{
                width: 18,
                height: 18,
              }}
            />
          </View>
          <TextInput
            placeholder="Tìm chuyến bay"
            onChangeText={text => this.searchFilterFlightGo(text)}
            style={{
              height: 40,
              paddingLeft: 10,
              flex: 1,
            }}
          />
        </View>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
          <ScrollView keyboardShouldPersistTaps="always">
            {flightListGo.length > 0 ? (
              flightListGo.map((item, index) => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.setOneWayFlight(item, index);
                      }}
                      style={{
                        backgroundColor:
                          selectedItemIndexGo == index ? '#D5F2F2' : '#FFFFFF',
                        paddingVertical: 10,
                        paddingLeft: 0,
                        marginHorizontal: 10,
                        marginTop: 10,
                        borderRadius: 10,
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 2,
                        shadowColor: '#000',
                      }}
                      key={index}>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            alignSelf: 'center',
                            marginLeft: 12,
                            backgroundColor: 'transparent',
                          }}>
                          <FastImage
                            source={
                              (selectedItemIndexGo == index &&
                                flightListStatus == 'chieudi') ||
                              (selectedItemIndexBack == index &&
                                flightListStatus == 'chieuve')
                                ? require('../../icons/iconAgent/single_select_active_transparent.png')
                                : require('../../icons/iconAgent/single_select.png')
                            }
                            style={{width: 15, height: 15}}
                            resizeMode={'contain'}
                          />
                        </View>
                        <View>
                          <Text style={{marginLeft: 12, fontWeight: '700'}}>
                            {item.flightNumber}
                          </Text>
                          <View
                            style={{flexDirection: 'row', paddingVertical: 4}}>
                            <Text style={{marginLeft: 12}}>
                              {item.estimateDepartAirPort}
                            </Text>
                            <FastImage
                              source={require('../../icons/iconAgent/ic_right.png')}
                              style={{width: 12, marginLeft: 4}}
                              resizeMode={'contain'}
                            />
                            <Text style={{marginLeft: 4}}>
                              {item.estimateArriveAirPort}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <View>
                              <Text style={{marginLeft: 12}}>
                                {`${moment(item.estimateDepartTime).format(
                                  'dddd',
                                )}`.replace(/^\w/, c => c.toUpperCase())}{' '}
                                {moment(item.estimateDepartTime).format('L')}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: '10%',
                                alignItems: 'center',
                              }}>
                              <FastImage
                                source={require('../../icons/iconAgent/ic_clock.png')}
                                style={{width: 15, height: 15}}
                                resizeMode={'contain'}
                              />
                              <Text style={{marginLeft: 5}}>
                                {moment(item.estimateDepartTimeLocal).format(
                                  'LT',
                                )}{' '}
                                -
                              </Text>
                              <Text style={{marginLeft: 4}}>
                                {item.estimateArriveTimeLocal !== null
                                  ? `${moment(
                                      item.estimateArriveTimeLocal,
                                    ).format('LT')}`
                                  : ''}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <Text style={{textAlign: 'center'}}>
                Không có chuyến bay nào được tìm thấy
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                this.setState({selectedItemIndexGo: 'blank'});
                this.setBlank();
              }}
              style={{
                backgroundColor:
                  this.state.selectedItemIndexGo == 'blank'
                    ? '#D5F2F2'
                    : '#FFFFFF',
                paddingVertical: 10,
                paddingLeft: 0,
                marginHorizontal: 10,
                marginTop: 12,
                marginBottom: 15,
                borderRadius: 10,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 2,
                shadowColor: '#000',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    alignSelf: 'center',
                    marginLeft: 12,
                    backgroundColor: 'transparent',
                  }}>
                  <FastImage
                    source={
                      this.state.selectedItemIndexGo == 'blank'
                        ? require('../../icons/iconAgent/single_select_active_transparent.png')
                        : require('../../icons/iconAgent/single_select.png')
                    }
                    style={{width: 15, height: 15}}
                    resizeMode={'contain'}
                  />
                </View>
                <Text style={{fontWeight: '700', marginLeft: 12}}>
                  Chuyến bay khác
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAwareScrollView>
        <FooterButton>
          <View style={{flexDirection: 'row'}}>
            <ModalButton
              disabled={this.state.selectedItemIndexGo}
              style={{width: '90%'}}
              label={'XÁC NHẬN'}
              onPress={() => this.setState({openFlightListOneWay: null})}
            />
          </View>
        </FooterButton>
      </View>
    );
  };
  // modal danh sách tìm kiếm chuyến bay khứ hồi
  renderModalFlightList = () => {
    const {
      flightListStatus,
      flightListGo,
      flightListBack,
      selectedItemIndexGo,
      selectedItemIndexBack,
    } = this.state;
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          marginTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View
          style={{
            flex: 0.15,
            backgroundColor: '#F6F5F6',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: -10,
            justifyContent: 'center',
          }}>
          <Text style={{marginLeft: 40, fontWeight: '700', fontSize: 16}}>
            Danh sách chuyến bay
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            alignSelf: 'center',
            padding: 24,
          }}>
          <TouchableOpacity
            style={{
              width: widthPercentageToDP('45'),
              backgroundColor:
                flightListStatus == 'chieudi' ? Color : '#FFFFFF',
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.setState({flightListStatus: 'chieudi'})}>
            <View style={{flexDirection: 'row'}}>
              <FastImage
                source={
                  flightListStatus == 'chieudi'
                    ? require('../../icons/iconAgent/ic_planeUp_white.png')
                    : require('../../icons/iconAgent/ic_planeup_gray.png')
                }
                style={{width: 27, height: 20}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: flightListStatus == 'chieudi' ? '#FFFFFF' : '#B3B2B3',
                  marginLeft: 8,
                }}>
                Chiều đi
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: widthPercentageToDP('45'),
              backgroundColor:
                flightListStatus == 'chieuve' ? Color : '#FFFFFF',
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.setState({flightListStatus: 'chieuve'})}>
            <View style={{flexDirection: 'row'}}>
              <FastImage
                source={
                  flightListStatus == 'chieuve'
                    ? require('../../icons/iconAgent/ic_planedown_white.png')
                    : require('../../icons/iconAgent/ic_planedown_gray.png')
                }
                style={{width: 27, height: 20}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: flightListStatus == 'chieuve' ? '#FFFFFF' : '#B3B2B3',
                }}>
                Chiều về
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.ctInput}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../icons/iconAgent/ic_search.png')}
              style={{
                width: 18,
                height: 18,
              }}
            />
          </View>
          <TextInput
            placeholder={
              flightListStatus == 'chieudi'
                ? 'Tìm chuyến bay đi'
                : 'Tìm chuyến bay về'
            }
            onChangeText={text =>
              flightListStatus == 'chieudi'
                ? this.searchFilterFlightGo(text)
                : this.searchFilterFlightBack(text)
            }
            style={{
              height: 40,
              paddingLeft: 10,
              flex: 1,
            }}
          />
        </View>
        <View style={{marginLeft: 25, marginTop: 15}}>
          {flightListStatus == 'chieudi' ? (
            <Text style={{color: '#BE3030', fontStyle: 'italic'}}>
              Bạn vui lòng chọn chuyến bay đi
            </Text>
          ) : (
            <Text style={{color: '#BE3030', fontStyle: 'italic'}}>
              Bạn vui lòng chọn chuyến bay về
            </Text>
          )}
        </View>
        {/* Tab chiều đi và chiều về  */}
        {flightListStatus == 'chieudi' ? (
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="always"
            style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
            <ScrollView keyboardShouldPersistTaps="always">
              {flightListGo.length > 0 ? (
                flightListGo.map((item, index) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setTwoWayFlight(item, index);
                        }}
                        style={{
                          backgroundColor:
                            (selectedItemIndexGo == index &&
                              flightListStatus == 'chieudi') ||
                            (selectedItemIndexBack == index &&
                              flightListStatus == 'chieuve')
                              ? '#D5F2F2'
                              : '#FFFFFF',
                          paddingVertical: 10,
                          paddingLeft: 0,
                          marginHorizontal: 10,
                          marginTop: 10,
                          borderRadius: 10,
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 2,
                          shadowColor: '#000',
                        }}
                        key={index}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              alignSelf: 'center',
                              marginLeft: 12,
                              backgroundColor: 'transparent',
                            }}>
                            <FastImage
                              source={
                                (selectedItemIndexGo == index &&
                                  flightListStatus == 'chieudi') ||
                                (selectedItemIndexBack == index &&
                                  flightListStatus == 'chieuve')
                                  ? require('../../icons/iconAgent/single_select_active_transparent.png')
                                  : require('../../icons/iconAgent/single_select.png')
                              }
                              style={{width: 15, height: 15}}
                              resizeMode={'contain'}
                            />
                          </View>
                          <View>
                            <Text style={{marginLeft: 12, fontWeight: '700'}}>
                              {item.flightNumber}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                paddingVertical: 4,
                              }}>
                              <Text style={{marginLeft: 12}}>
                                {item.estimateDepartAirPort}
                              </Text>
                              <FastImage
                                source={require('../../icons/iconAgent/ic_right.png')}
                                style={{width: 12, marginLeft: 4}}
                                resizeMode={'contain'}
                              />
                              <Text style={{marginLeft: 4}}>
                                {item.estimateArriveAirPort}
                              </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                              <View>
                                <Text style={{marginLeft: 12}}>
                                  {`${moment(item.estimateDepartTime).format(
                                    'dddd',
                                  )}`.replace(/^\w/, c => c.toUpperCase())}{' '}
                                  {moment(item.estimateDepartTime).format('L')}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  paddingHorizontal: '10%',
                                  alignItems: 'center',
                                }}>
                                <FastImage
                                  source={require('../../icons/iconAgent/ic_clock.png')}
                                  style={{width: 15, height: 15}}
                                  resizeMode={'contain'}
                                />
                                <Text style={{marginLeft: 5}}>
                                  {moment(item.estimateDepartTimeLocal).format(
                                    'LT',
                                  )}{' '}
                                  -
                                </Text>
                                <Text style={{marginLeft: 4}}>
                                  {item.estimateArriveTimeLocal !== null
                                    ? `${moment(
                                        item.estimateArriveTimeLocal,
                                      ).format('LT')}`
                                    : ''}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <TouchableOpacity>
                  <Text style={{textAlign: 'center'}}>
                    Không có chuyến bay nào được tìm thấy
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </KeyboardAwareScrollView>
        ) : (
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="always"
            style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
            <ScrollView keyboardShouldPersistTaps="always">
              {flightListBack.length > 0 ? (
                flightListBack.map((item, index) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setTwoWayFlight(item, index);
                        }}
                        style={{
                          backgroundColor:
                            (selectedItemIndexGo == index &&
                              flightListStatus == 'chieudi') ||
                            (selectedItemIndexBack == index &&
                              flightListStatus == 'chieuve')
                              ? '#D5F2F2'
                              : '#FFFFFF',
                          paddingVertical: 10,
                          paddingLeft: 0,
                          marginHorizontal: 10,
                          marginTop: 10,
                          borderRadius: 10,
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 2,
                          shadowColor: '#000',
                        }}
                        key={index}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              alignSelf: 'center',
                              marginLeft: 12,
                              backgroundColor: 'transparent',
                            }}>
                            <FastImage
                              source={
                                (selectedItemIndexGo == index &&
                                  flightListStatus == 'chieudi') ||
                                (selectedItemIndexBack == index &&
                                  flightListStatus == 'chieuve')
                                  ? require('../../icons/iconAgent/single_select_active_transparent.png')
                                  : require('../../icons/iconAgent/single_select.png')
                              }
                              style={{width: 15, height: 15}}
                              resizeMode={'contain'}
                            />
                          </View>
                          <View>
                            <Text style={{marginLeft: 12, fontWeight: '700'}}>
                              {item.flightNumber}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                paddingVertical: 4,
                              }}>
                              <Text style={{marginLeft: 12}}>
                                {item.estimateDepartAirPort}
                              </Text>
                              <FastImage
                                source={require('../../icons/iconAgent/ic_right.png')}
                                style={{width: 12, marginLeft: 4}}
                                resizeMode={'contain'}
                              />
                              <Text style={{marginLeft: 4}}>
                                {item.estimateArriveAirPort}
                              </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                              <View>
                                <Text style={{marginLeft: 12}}>
                                  {`${moment(item.estimateDepartTime).format(
                                    'dddd',
                                  )}`.replace(/^\w/, c => c.toUpperCase())}{' '}
                                  {moment(item.estimateDepartTime).format('L')}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  paddingHorizontal: '10%',
                                  alignItems: 'center',
                                }}>
                                <FastImage
                                  source={require('../../icons/iconAgent/ic_clock.png')}
                                  style={{width: 15, height: 15}}
                                  resizeMode={'contain'}
                                />
                                <Text style={{marginLeft: 5}}>
                                  {moment(item.estimateDepartTimeLocal).format(
                                    'LT',
                                  )}{' '}
                                  -
                                </Text>
                                <Text style={{marginLeft: 4}}>
                                  {item.estimateArriveTimeLocal !== null
                                    ? `${moment(
                                        item.estimateArriveTimeLocal,
                                      ).format('LT')}`
                                    : ''}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <TouchableOpacity>
                  <Text style={{textAlign: 'center'}}>
                    Không có chuyến bay nào được tìm thấy
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </KeyboardAwareScrollView>
        )}

        {flightListStatus == 'chieudi' ? (
          <TouchableOpacity
            onPress={() => {
              this.setState({
                selectedItemIndexGo: 'blank',
                flightListStatus: 'chieuve',
              });
              this.setBlank();
            }}
            style={{
              backgroundColor:
                this.state.selectedItemIndexGo == 'blank'
                  ? '#D5F2F2'
                  : '#FFFFFF',
              paddingVertical: 10,
              paddingLeft: 0,
              marginHorizontal: 20,
              marginTop: 5,
              marginBottom: 15,
              borderRadius: 10,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 1,
              shadowColor: '#000',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  alignSelf: 'center',
                  marginLeft: 12,
                  backgroundColor: 'transparent',
                }}>
                <FastImage
                  source={
                    this.state.selectedItemIndex == 'blank'
                      ? require('../../icons/iconAgent/single_select_active_transparent.png')
                      : require('../../icons/iconAgent/single_select.png')
                  }
                  style={{width: 15, height: 15}}
                  resizeMode={'contain'}
                />
              </View>
              <Text style={{fontWeight: '700', marginLeft: 12}}>
                Chuyến bay khác
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.setState({selectedItemIndexBack: 'blank'});
              this.setBlank();
            }}
            style={{
              backgroundColor:
                this.state.selectedItemIndexBack == 'blank'
                  ? '#D5F2F2'
                  : '#FFFFFF',
              paddingVertical: 10,
              paddingLeft: 0,
              marginHorizontal: 20,
              marginTop: 5,
              marginBottom: 15,
              borderRadius: 10,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 1,
              shadowColor: '#000',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  alignSelf: 'center',
                  marginLeft: 12,
                  backgroundColor: 'transparent',
                }}>
                <FastImage
                  source={
                    this.state.selectedItemIndex == 'blank'
                      ? require('../../icons/iconAgent/single_select_active_transparent.png')
                      : require('../../icons/iconAgent/single_select.png')
                  }
                  style={{width: 15, height: 15}}
                  resizeMode={'contain'}
                />
              </View>
              <Text style={{fontWeight: '700', marginLeft: 12}}>
                Chuyến bay khác
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <FooterButton>
          <View style={{flexDirection: 'row'}}>
            <ModalButtonNoColor
              style={{width: '43%'}}
              label={'CHỌN LẠI'}
              onPress={() => this.setState({openFlightList: null})}
            />
            <ModalButton
              disabled={
                selectedItemIndexGo == null || selectedItemIndexBack == null
                  ? true
                  : false
              }
              color={ selectedItemIndexGo == null || selectedItemIndexBack == null
                ? subColor
                : Color}
              style={{width: '43%'}}
              label={'XÁC NHẬN'}
              onPress={() => this.setState({openFlightList: null})}
            />
          </View>
        </FooterButton>
      </View>
    );
  };
  // Chọn quốc gia
  setNation = async id => {
    await this.setState({
      nationId: id,
      openNation: null,
      openAirport: true,
      filteredNation: this.state.listFullNation,
    });
    this.getListAirport();
  };
  // render item quốc gia
  renderItemNation = (item, index) => {
    return this.state.filteredNation.length > 0 ? (
      <TouchableOpacity
        onPress={() => this.setNation(item.item.id)}
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderTopWidth: 0,
          borderColor: '#efefef',
          alignItems: 'center',
          paddingVertical: 10,
          paddingLeft: 0,
          marginHorizontal: 15,
        }}>
        <FastImage
          source={require('../../icons/iconAgent/single_select.png')}
          style={{width: 15, height: 15}}
        />
        <Text style={{marginLeft: 12}}>{item.item.name}</Text>
      </TouchableOpacity>
    ) : (
      <Text style={{textAlign: 'center'}}>
        Không có quốc gia nào được tìm thấy
      </Text>
    );
  };
  // modal chọn quốc gia
  renderModalNation = index => {
    const {isDepartAirport, filteredNation} = this.state;
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          marginTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View
          style={{
            flex: 0.1,
            backgroundColor: '#F6F5F6',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: -20,
          }}>
          <Text
            style={{
              marginTop: 15,
              marginLeft: 40,
              fontWeight: '700',
              fontSize: 16,
            }}>
            {isDepartAirport == true ? 'Chọn quốc gia đi' : 'Chọn quốc gia đến'}
          </Text>
        </View>
        <View style={styles.ctInput}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <FastImage
              source={require('../../icons/iconAgent/ic_search.png')}
              style={{
                width: 18,
                height: 18,
              }}
            />
          </View>
          <TextInput
            placeholder={
              isDepartAirport ? 'Tìm kiếm quốc gia đi' : 'Tìm kiếm quốc gia đến'
            }
            onChangeText={text => this.searchFilterNation(text)}
            style={{
              height: 40,
              paddingLeft: 10,
              flex: 1,
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={filteredNation}
            renderItem={item => this.renderItemNation(item)}
            keyExtractor={index => index.toString()}
          />
        </View>
      </View>
    );
  };
  //chọn sân bay
  setAirport = async item => {
    if (this.state.isDepartAirport == true) {
      await this.setState({
        travelAirport: `${item.name} - ${item.iata}`,
        departureAirportCode: item.iata,
        openAirport: null,
        openNation: true,
        isDepartAirport: false,
      });
    } else {
      await this.setState({
        arrivalAirport: `${item.name} - ${item.iata}`,
        arrivalAirportCode: item.iata,
        openAirport: null,
        isDepartAirport: true,
      });
    }
  };
  //render danh sách sân bay
  renderModalAirport = () => {
    const {listAirport, isDepartAirport} = this.state;
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          marginTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View
          style={{
            flex: 0.1,
            backgroundColor: '#F6F5F6',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: -10,
          }}>
          <Text
            style={{
              marginTop: 15,
              marginLeft: 40,
              fontWeight: '700',
              fontSize: 16,
            }}>
            {isDepartAirport == true ? 'Chọn sân bay đi' : 'Chọn sân bay đến'}
          </Text>
        </View>
        <View style={styles.ctInput}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <FastImage
              source={require('../../icons/iconAgent/ic_search.png')}
              style={{
                width: 18,
                height: 18,
              }}
            />
          </View>
          <TextInput
            placeholder="Tìm kiếm sân bay"
            onChangeText={text => this.searchFilterAirport(text)}
            style={{
              height: 40,
              paddingLeft: 10,
              flex: 1,
            }}
          />
        </View>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
          <ScrollView keyboardShouldPersistTaps="always">
            {listAirport.length > 0 ? (
              listAirport.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.setAirport(item)}
                    style={{
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderTopWidth: 0,
                      borderColor: '#efefef',
                      alignItems: 'center',
                      paddingVertical: 10,
                      paddingLeft: 0,
                      marginHorizontal: 15,
                    }}
                    key={index}>
                    <FastImage
                      source={require('../../icons/iconAgent/single_select.png')}
                      style={{width: 15, height: 15}}
                    />
                    <Text style={{marginLeft: 12, paddingRight: 20}}>
                      {item.name} - {item.iata}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={{textAlign: 'center'}}>
                Không có sân bay nào được tìm thấy
              </Text>
            )}
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    );
  };
  // render thông tin chuyến bay khứ hồi
  renderTwoWayFlight() {
    const {
      arrivalDate,
      flightId,
      flightIdReturn,
      TwoWayFlightBack,
      TwoWayFlightGo,
      arrivalTime,
      travelTimeReturn,
      travelDateReturn,
      emptyBookingNumber,
      seatIdcd,
      arrivalDateReturn,
      seatIdcdReturn,
      travelTime,
      travelDate,
      editable,
      arrivalTimeReturn,
      errorCodeFlightNumber,
      errorCodeFlightNumberReturn,
      errorCodeBookingNumber,
      errorCodeInputDepartDate,
      errorCodeInputArrivalDate,
      errorCodeInputReturnDepartDate,
      errorCodeInputReturnArrivalDate,
      errorCodeBookingNumberReturn,
      errorCodeDepartTime,
      errorCodeArrivalTime,
      errorCodeReturnDepartTime,
      errorCodeReturnArrivalTime,
    } = this.state;
    return (
      <View>
        {TwoWayFlightGo.length > 0 ? (
          <View>
            {TwoWayFlightGo.map((item, index) => {
              return (
                <View>
                  <View
                    style={{
                      marginLeft: 20,
                      paddingTop: 15,
                      flexDirection: 'row',
                    }}>
                    <FastImage
                      source={require('../../icons/ic_planeup.png')}
                      style={{width: 20, height: 15}}
                    />
                    <Text style={{marginLeft: 5}}>Chiều đi</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={styles.formRow}>
                      <Input
                        label="Số hiệu chuyến bay"
                        value={flightId}
                        placeholder={item.flightNumber}
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onChangeText={text => this.setState({flightId: text})}
                        errorValidate={
                          errorCodeFlightNumber == '' ? false : true
                        }
                        onBlur={() => this.validateFlightNumber()}
                        onFocus={() =>
                          this.setState({errorCodeFlightNumber: ''})
                        }
                      />
                      {errorCodeFlightNumber !== ''
                        ? this.showErrorNotInvalid(errorCodeFlightNumber)
                        : null}
                    </View>
                    <FastImage
                      source={require('../../icons/iconAgent/ic_arrowcross.png')}
                      style={styles.ic_arrow}
                      resizeMode={'contain'}
                    />
                    <View style={styles.formRow}>
                      <Input
                        label="Mã đặt chỗ"
                        value={seatIdcd}
                        onChangeText={text => this.setState({seatIdcd: text})}
                        autoCapitalize={'characters'}
                        editable={true}
                        placeholderTextColor={'#000'}
                        onFocus={() =>
                          this.setState({errorCodeBookingNumber: ''})
                        }
                        onBlur={() => this.validateBookingNumber()}
                        errorValidate={
                          errorCodeBookingNumber == '' ? false : true
                        }
                      />
                      {errorCodeBookingNumber !== ''
                        ? this.showErrorNotInvalid(errorCodeBookingNumber)
                        : null}
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={styles.formRow}>
                      <Input
                        label="Ngày đi"
                        value={travelDate}
                        placeholder={
                          item.departDate == 'Invalid date'
                            ? ''
                            : item.departDate
                        }
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onChangeText={text =>
                          this._onChangeText('travelDate', text)
                        }
                        maxLength={10}
                        keyboardType={'number-pad'}
                        onBlur={() => this.validateInputDepartDate()}
                        onFocus={() =>
                          this.setState({errorCodeInputDepartDate: ''})
                        }
                        errorValidate={
                          errorCodeInputDepartDate == '' ? false : true
                        }
                      />
                      {errorCodeInputDepartDate !== ''
                        ? this.showErrorNotInvalid(errorCodeInputDepartDate)
                        : null}
                    </View>
                    <FastImage
                      source={require('../../icons/iconAgent/ic_arrowcross.png')}
                      style={styles.ic_arrow}
                      resizeMode={'contain'}
                    />
                    <View style={styles.formRow}>
                      <Input
                        label="Ngày đến"
                        value={arrivalDate}
                        placeholder={
                          item.arrivalDate == 'Invalid date'
                            ? ''
                            : item.arrivalDate
                        }
                        onChangeText={text =>
                          this._onChangeText('arrivalDate', text)
                        }
                        keyboardType={'number-pad'}
                        maxLength={10}
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onBlur={() => this.validateInputArrivalDate()}
                        onFocus={() =>
                          this.setState({errorCodeInputArrivalDate: ''})
                        }
                        errorValidate={
                          errorCodeInputArrivalDate == '' ? false : true
                        }
                      />
                      {errorCodeInputArrivalDate !== ''
                        ? this.showErrorNotInvalid(errorCodeInputArrivalDate)
                        : null}
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={styles.formRow}>
                      <Input
                        label="Giờ đi"
                        value={travelTime}
                        placeholder={
                          item.departTime == 'Invalid date'
                            ? ''
                            : item.departTime
                        }
                        onChangeText={text =>
                          this._onChangeText('travelTime', text)
                        }
                        keyboardType={'number-pad'}
                        maxLength={5}
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onBlur={() => this.validateDepartTime()}
                        onFocus={() => this.setState({errorCodeDepartTime: ''})}
                        errorValidate={errorCodeDepartTime == '' ? false : true}
                      />
                      {errorCodeDepartTime !== ''
                        ? this.showErrorNotInvalid(errorCodeDepartTime)
                        : null}
                    </View>
                    <FastImage
                      source={require('../../icons/iconAgent/ic_arrowcross.png')}
                      style={styles.ic_arrow}
                      resizeMode={'contain'}
                    />
                    <View style={styles.formRow}>
                      <Input
                        label="Giờ đến"
                        value={arrivalTime}
                        placeholder={
                          item.arrivalTime == 'Invalid date'
                            ? ''
                            : item.arrivalTime
                        }
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onChangeText={text =>
                          this._onChangeText('arrivalTime', text)
                        }
                        keyboardType={'number-pad'}
                        maxLength={5}
                        onBlur={() => this.validateArrivalTime()}
                        onFocus={() =>
                          this.setState({errorCodeArrivalTime: ''})
                        }
                        errorValidate={
                          errorCodeArrivalTime == '' ? false : true
                        }
                      />
                      {errorCodeArrivalTime !== ''
                        ? this.showErrorNotInvalid(errorCodeArrivalTime)
                        : null}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
        {TwoWayFlightBack.length > 0 ? (
          <View>
            {TwoWayFlightBack.map((item, index) => {
              return (
                <View>
                  <View
                    style={{
                      marginLeft: 20,
                      paddingTop: 15,
                      flexDirection: 'row',
                    }}>
                    <FastImage
                      source={require('../../icons/ic_planedown.png')}
                      style={{width: 20, height: 15}}
                    />
                    <Text style={{marginLeft: 5}}>Chiều về</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={styles.formRow}>
                      <Input
                        label="Số hiệu chuyến bay"
                        value={flightIdReturn}
                        placeholder={item.flightNumber}
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onChangeText={text =>
                          this.setState({flightIdReturn: text})
                        }
                        errorValidate={
                          errorCodeFlightNumberReturn == '' ? false : true
                        }
                        onBlur={() => this.validateFlightNumberReturn()}
                        onFocus={() =>
                          this.setState({errorCodeFlightNumberReturn: ''})
                        }
                      />
                      {errorCodeFlightNumberReturn !== ''
                        ? this.showErrorNotInvalid(errorCodeFlightNumberReturn)
                        : null}
                    </View>
                    <FastImage
                      source={require('../../icons/iconAgent/ic_arrowcross.png')}
                      style={styles.ic_arrow}
                      resizeMode={'contain'}
                    />
                    <View style={styles.formRow}>
                      <Input
                        label="Mã đặt chỗ"
                        value={seatIdcdReturn}
                        autoCapitalize={'characters'}
                        editable={true}
                        placeholderTextColor={'#000'}
                        onChangeText={text =>
                          this.setState({seatIdcdReturn: text})
                        }
                        onBlur={() => this.validateBookingNumberReturn()}
                        onFocus={() =>
                          this.setState({errorCodeBookingNumberReturn: ''})
                        }
                        errorValidate={
                          errorCodeBookingNumberReturn == '' ? false : true
                        }
                      />
                      {errorCodeBookingNumberReturn !== ''
                        ? this.showErrorNotInvalid(errorCodeBookingNumberReturn)
                        : null}
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={styles.formRow}>
                      <Input
                        label="Ngày đi"
                        value={travelDateReturn}
                        placeholder={
                          item.departDate == 'Invalid date'
                            ? ''
                            : item.departDate
                        }
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onChangeText={text =>
                          this._onChangeText('travelDateReturn', text)
                        }
                        keyboardType={'number-pad'}
                        maxLength={10}
                        onBlur={() => this.validateInputReturnDepartDate()}
                        onFocus={() =>
                          this.setState({errorCodeInputReturnDepartDate: ''})
                        }
                        errorValidate={
                          errorCodeInputReturnDepartDate == '' ? false : true
                        }
                      />
                      {errorCodeInputReturnDepartDate !== ''
                        ? this.showErrorNotInvalid(
                            errorCodeInputReturnDepartDate,
                          )
                        : null}
                    </View>
                    <FastImage
                      source={require('../../icons/iconAgent/ic_arrowcross.png')}
                      style={styles.ic_arrow}
                      resizeMode={'contain'}
                    />
                    <View style={styles.formRow}>
                      <Input
                        label="Ngày đến"
                        value={arrivalDateReturn}
                        placeholder={
                          item.arrivalDate == 'Invalid date'
                            ? ''
                            : item.arrivalDate
                        }
                        keyboardType={'number-pad'}
                        maxLength={10}
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onChangeText={text =>
                          this._onChangeText('arrivalDateReturn', text)
                        }
                        onBlur={() => this.validateInputReturnArrivalDate()}
                        onFocus={() =>
                          this.setState({errorCodeInputReturnArrivalDate: ''})
                        }
                        errorValidate={
                          errorCodeInputReturnArrivalDate == '' ? false : true
                        }
                      />
                      {errorCodeInputReturnArrivalDate !== ''
                        ? this.showErrorNotInvalid(
                            errorCodeInputReturnArrivalDate,
                          )
                        : null}
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={styles.formRow}>
                      <Input
                        label="Giờ đi"
                        value={travelTimeReturn}
                        placeholder={
                          item.departTime == 'Invalid date'
                            ? ''
                            : item.departTime
                        }
                        keyboardType={'number-pad'}
                        maxLength={5}
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onChangeText={text =>
                          this._onChangeText('travelTimeReturn', text)
                        }
                        onBlur={() => this.validateReturnDepartTime()}
                        onFocus={() =>
                          this.setState({errorCodeReturnDepartTime: ''})
                        }
                        errorValidate={
                          errorCodeReturnDepartTime == '' ? false : true
                        }
                      />
                      {errorCodeReturnDepartTime !== ''
                        ? this.showErrorNotInvalid(errorCodeReturnDepartTime)
                        : null}
                    </View>
                    <FastImage
                      source={require('../../icons/iconAgent/ic_arrowcross.png')}
                      style={styles.ic_arrow}
                      resizeMode={'contain'}
                    />
                    <View style={styles.formRow}>
                      <Input
                        value={arrivalTimeReturn}
                        label="Giờ đến"
                        placeholder={
                          item.arrivalTime == 'Invalid date'
                            ? ''
                            : item.arrivalTime
                        }
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onChangeText={text =>
                          this._onChangeText('arrivalTimeReturn', text)
                        }
                        keyboardType={'number-pad'}
                        maxLength={5}
                        onBlur={() => this.validateReturnArrivalTime()}
                        onFocus={() =>
                          this.setState({errorCodeReturnArrivalTime: ''})
                        }
                        errorValidate={
                          errorCodeReturnArrivalTime == '' ? false : true
                        }
                      />
                      {errorCodeReturnArrivalTime !== ''
                        ? this.showErrorNotInvalid(errorCodeReturnArrivalTime)
                        : null}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  }
  // chuyến bay một chiều
  renderOneWayFlight() {
    const {
      arrivalDate,
      flightId,
      TwoWayFlightGo,
      errorCodeInputDepartDate,
      arrivalTime,
      errorCodeBookingNumber,
      seatIdcd,
      errorCodeInputArrivalDate,
      travelTime,
      travelDate,
      editable,
      errorCodeFlightNumber,
    } = this.state;
    return (
      <View style={{paddingHorizontal: 24}}>
        {TwoWayFlightGo.length > 0 ? (
          <View>
            {TwoWayFlightGo.map((item, index) => {
              return (
                <View style={{alignItems: 'center'}}>
                  <View style={styles.inputContainer}>
                    <View style={styles.formRow}>
                      <Input
                        label="Số hiệu chuyến bay"
                        value={flightId}
                        placeholder={item.flightNumber}
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onChangeText={text => this.setState({flightId: text})}
                        onBlur={() => this.validateFlightNumber()}
                        onFocus={() =>
                          this.setState({errorCodeFlightNumber: ''})
                        }
                        errorValidate={
                          errorCodeFlightNumber == '' ? false : true
                        }
                      />
                      {errorCodeFlightNumber !== ''
                        ? this.showErrorNotInvalid(errorCodeFlightNumber)
                        : null}
                    </View>
                    <FastImage
                      source={require('../../icons/iconAgent/ic_arrowcross.png')}
                      style={styles.ic_arrow}
                      resizeMode={'contain'}
                    />
                    <View style={styles.formRow}>
                      <Input
                        label="Mã đặt chỗ"
                        value={seatIdcd}
                        onChangeText={text => this.setState({seatIdcd: text})}
                        autoCapitalize={'characters'}
                        editable={true}
                        placeholderTextColor={'#000'}
                        onBlur={() => this.validateBookingNumber()}
                        onFocus={() =>
                          this.setState({errorCodeBookingNumber: ''})
                        }
                        errorValidate={
                          errorCodeBookingNumber == '' ? false : true
                        }
                      />
                      {errorCodeBookingNumber !== ''
                        ? this.showErrorNotInvalid(errorCodeBookingNumber)
                        : null}
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={styles.formRow}>
                      <Input
                        label="Ngày đi"
                        value={travelDate}
                        placeholder={
                          item.departDate == 'Invalid date'
                            ? ''
                            : item.departDate
                        }
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onChangeText={text =>
                          this._onChangeText('travelDate', text)
                        }
                        keyboardType={'number-pad'}
                        maxLength={10}
                        onBlur={() => this.validateInputDepartDate}
                        onFocus={() =>
                          this.setState({errorCodeInputDepartDate: ''})
                        }
                        errorValidate={
                          errorCodeInputDepartDate == '' ? false : true
                        }
                      />
                      {errorCodeInputDepartDate !== ''
                        ? this.showErrorNotInvalid(errorCodeInputDepartDate)
                        : null}
                    </View>
                    <FastImage
                      source={require('../../icons/iconAgent/ic_arrowcross.png')}
                      style={styles.ic_arrow}
                      resizeMode={'contain'}
                    />
                    <View style={styles.formRow}>
                      <Input
                        label="Ngày đến"
                        value={arrivalDate}
                        placeholder={
                          item.arrivalDate == 'Invalid date'
                            ? ''
                            : item.arrivalDate
                        }
                        onChangeText={text =>
                          this._onChangeText('arrivalDate', text)
                        }
                        keyboardType={'number-pad'}
                        maxLength={10}
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onBlur={() => this.validateInputArrivalDate()}
                        onFocus={() =>
                          this.setState({errorCodeInputArrivalDate: ''})
                        }
                        errorCodeDepartDate
                        errorValidate={
                          errorCodeInputArrivalDate == '' ? false : true
                        }
                      />
                      {errorCodeInputArrivalDate !== ''
                        ? this.showErrorNotInvalid(errorCodeInputArrivalDate)
                        : null}
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={styles.formRow}>
                      <Input
                        label="Giờ đi"
                        value={travelTime}
                        placeholder={
                          item.departTime == 'Invalid date'
                            ? ''
                            : item.departTime
                        }
                        onChangeText={text =>
                          this._onChangeText('travelTime', text)
                        }
                        keyboardType={'number-pad'}
                        maxLength={5}
                        editable={editable}
                        placeholderTextColor={'#000'}
                      />
                    </View>
                    <FastImage
                      source={require('../../icons/iconAgent/ic_arrowcross.png')}
                      style={styles.ic_arrow}
                      resizeMode={'contain'}
                    />
                    <View style={styles.formRow}>
                      <Input
                        label="Giờ đến"
                        value={arrivalTime}
                        placeholder={
                          item.arrivalTime == 'Invalid date'
                            ? ''
                            : item.arrivalTime
                        }
                        editable={editable}
                        placeholderTextColor={'#000'}
                        onChangeText={text =>
                          this._onChangeText('arrivalTime', text)
                        }
                        keyboardType={'number-pad'}
                        maxLength={5}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  }
  render() {
    const {
      travelAirport,
      arrivalAirport,
      openFlightList,
      openFlightListOneWay,
      twoWay,
      departDate,
      returnDepartDate,
      openNation,
      openAirport,
      loading,
      errorCodeDepartDate,
      errorCodeArrivalDate,
    } = this.state;
    return (
      <View style={styles.container}>
        {loading == true ? <Loading /> : null}
        <Modal
          isOpen={openAirport}
          entry={'bottom'}
          position={'bottom'}
          swipeToClose={false}
          backButtonClose={true}
          onClosed={() => this.setState({openAirport: null})}
          style={styles.ctModal}>
          {this.renderModalAirport()}
        </Modal>
        <Modal
          isOpen={openNation}
          entry={'bottom'}
          position={'bottom'}
          swipeToClose={false}
          style={styles.ctModal}
          onClosed={() => this.setState({openNation: null})}
          backButtonClose={true}>
          {this.renderModalNation()}
        </Modal>
        <Modal
          isOpen={openFlightList}
          entry={'bottom'}
          position={'bottom'}
          swipeToClose={false}
          style={styles.ctModal}
          backButtonClose={true}
          onClosed={() => this.setState({openFlightList: null})}>
          {this.renderModalFlightList()}
        </Modal>
        <Modal
          isOpen={openFlightListOneWay}
          entry={'bottom'}
          position={'bottom'}
          swipeToClose={false}
          style={styles.ctModal}
          backButtonClose={true}
          onClosed={() => this.setState({openFlightListOneWay: null})}>
          {this.renderModalFlightListOneWay()}
        </Modal>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <NavFL
            isInfo={false}
            title={'ĐIỀN THÔNG TIN CHUYẾN BAY'}
            onPress={() => Actions.pop()}
          />
        </View>
        <ScrollView
          style={{
            flex: 1,
            width: widthPercentageToDP('100'),
            alignSelf: 'center',
          }}>
          <FastImage
            source={require('../../icons/iconAgent/flightInfo_header.png')}
            style={{
              height: 260,
              width: '100%',
              marginTop: -50,
              justifyContent: 'flex-end',
            }}>
            <View style={{height: 40, flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  backgroundColor: twoWay == true ? '#FFFFFF' : 'transparent',
                  justifyContent: 'center',
                  borderTopRightRadius: 20,
                }}
                onPress={() => this.setState({twoWay: true})}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: twoWay == true ? Color : '#FFFFFF',
                    marginBottom: 5,
                  }}>
                  Khứ hồi
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  backgroundColor: twoWay == false ? '#FFFFFF' : 'transparent',
                  justifyContent: 'center',
                  borderTopLeftRadius: 20,
                }}
                onPress={() => this.setState({twoWay: false})}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: twoWay == false ? Color : '#FFFFFF',
                    marginBottom: 5,
                  }}>
                  Một chiều
                </Text>
              </TouchableOpacity>
            </View>
          </FastImage>
          {/* form nhập thông tin tìm kiếm chuyến bay */}
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: widthPercentageToDP('100'),
                }}>
                <View style={styles.formRow}>
                  <InputPlace
                    label="Điểm đi"
                    keyword={this.formatString(travelAirport)}
                    openModal={() =>
                      this.setState({openNation: true, isDepartAirport: true})
                    }
                  />
                </View>

                <FastImage
                  source={require('../../icons/iconAgent/ic_arrowcross.png')}
                  style={styles.ic_arrow}
                  resizeMode={'contain'}
                />
                <View style={styles.formRow}>
                  <InputPlace
                    label="Điểm đến"
                    keyword={this.formatString(arrivalAirport)}
                    openModal={() => this.openArrivalAirport()}
                  />
                </View>
              </View>
              {this.state.twoWay == true ? (
                <View style={styles.inputContainer}>
                  <View style={styles.formRow}>
                    <Input
                      label="Ngày đi"
                      value={departDate}
                      onChangeText={text =>
                        this._onChangeText('departDate', text)
                      }
                      placeholder={'dd/mm/yyyy'}
                      keyboardType={'number-pad'}
                      maxLength={10}
                      onBlur={() => this.validateDepartDate()}
                      onFocus={() => this.setState({errorCodeDepartDate: ''})}
                      errorValidate={errorCodeDepartDate == '' ? false : true}
                    />
                    <View>
                      {errorCodeDepartDate !== ''
                        ? this.showErrorNotInvalid(errorCodeDepartDate)
                        : null}
                    </View>
                  </View>
                  <FastImage
                    source={require('../../icons/iconAgent/ic_arrowcross.png')}
                    style={styles.ic_arrow}
                    resizeMode={'contain'}
                  />
                  <View style={styles.formRow}>
                    <Input
                      label="Ngày về"
                      value={returnDepartDate}
                      onChangeText={text =>
                        this._onChangeText('returnDepartDate', text)
                      }
                      placeholder={'dd/mm/yyyy'}
                      keyboardType={'number-pad'}
                      maxLength={10}
                      onFocus={() => this.setState({errorCodeArrivalDate: ''})}
                      onBlur={() => this.validateArrivalDate()}
                      errorValidate={errorCodeArrivalDate == '' ? false : true}
                    />
                    <View>
                      {errorCodeArrivalDate !== ''
                        ? this.showErrorNotInvalid(errorCodeArrivalDate)
                        : null}
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={{width: widthPercentageToDP('46'), marginLeft: -5}}>
                  <Input
                    label="Ngày đi"
                    value={departDate}
                    onChangeText={text =>
                      this._onChangeText('departDate', text)
                    }
                    placeholder={'dd/mm/yyyy'}
                    keyboardType={'number-pad'}
                    maxLength={10}
                    onBlur={() => this.validateDepartDate()}
                    onFocus={() => this.setState({errorCodeDepartDate: ''})}
                    errorValidate={errorCodeDepartDate == '' ? false : true}
                  />
                  <View>
                    {errorCodeDepartDate !== ''
                      ? this.showErrorNotInvalid(errorCodeDepartDate)
                      : null}
                  </View>
                </View>
              )}
            </View>

            {this.state.twoWay == true
              ? this.renderTwoWayFlight()
              : this.renderOneWayFlight()}
          </View>
        </ScrollView>
        <FooterButton>
          {this.state.TwoWayFlightGo.length == 0 &&
          this.state.TwoWayFlightBack.length == 0 ? (
            <Button
              label={'TÌM CHUYẾN BAY'}
              marginTop={15}
              onPress={() => {
                twoWay == true
                  ? this.searchTwoWayFlight()
                  : this.searchOneWayFlight();
              }}
              //onPress={() => Actions.CustomerInfo()}
            />
          ) : (
            <Button
              label={'TIẾP THEO'}
              marginTop={15}
              onPress={() => {
                this.next();
              }}
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
  },
  ic_arrow: {
    width: 40,
    height: 20,
    marginTop: 20,
  },
  ctModal: {
    backgroundColor: '#fff',
    flex: 0.85,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ctInput: {
    marginTop: 25,
    borderBottomWidth: 1,
    borderColor: Color,
    marginHorizontal: 25,
    flexDirection: 'row',
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
    width: '46%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP('100'),
  },
});

import {connect} from 'react-redux';
import {
  saveFlightInfo,
  saveCustomFlightInfo,
  saveCustomDepartFlightInfo,
  saveCustomArrivalFlightInfo,
} from './actions/flight_buy';
import {checkLeapYear, checkMonth} from '../../components/Functions';

const mapStateToProps = state => {
  return {
    flightBuy: state.flightBuy,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveFlightInfo: body => dispatch(saveFlightInfo(body)),
    saveCustomFlightInfo: body => dispatch(saveCustomFlightInfo(body)),
    saveCustomDepartFlightInfo: body =>
      dispatch(saveCustomDepartFlightInfo(body)),
    saveCustomArrivalFlightInfo: body =>
      dispatch(saveCustomArrivalFlightInfo(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlightInformation);
