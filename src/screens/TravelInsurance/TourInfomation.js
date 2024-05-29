import React, {Component} from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import NavWithImage from '../../components/NavWithImage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import InputForm from '../../components/buy/InputForm';
import InputSelectForm from '../../components/buy/InputSelectForm';
import Input from '../CarInsurance/components/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/buy/Button';
import FooterButton from '../../components/FooterButton';
import {Actions} from 'react-native-router-flux';
import {Color} from '../../config/System';
import ModalProvince from '../CarInsurance/components/ModalProvince';
import ModalArea from './components/ModalArea';
import moment from 'moment';
import {connect} from 'react-redux';
import {
  saveTourInfomation,
  saveTypeTravelInsurance,
} from './actions/travel_buy';
import {checkLeapYear, checkMonth} from '../../components/Functions';
import {ScrollView} from 'react-native-gesture-handler';
import ModalCurrency from './components/ModalCurrency';
import {URL} from '../../config/System';
import ModalNation from './components/ModalNation';
import SimpleToast from 'react-native-simple-toast';
import { validateNumOnly } from '../../config/Validation';

class TourInfomation extends Component {
  fieldRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      currentDate: '',
      departTime: '',
      returnTime: '',
      dayNumber: '',
      countryName: '',
      countryId: '',
      peopleAmount: '',
      arrivalIdCity: '',
      arrivalCityName: '',
      modalProvince: null,
      modalArea: null,
      modalCurrency: null,
      modalNation: null,
      areaName: '',
      areaId: '',
      currency: '',

      errorCodeDestination: '',
      errorCodeProvince: '',
      errorCodeNation: '',
      errorCodePeopleAmount: '',
      errorCodeDepartDate: '',
      errorCodeReturnDate: '',
      errorCodeDayNumber: '',
      errorCodeCurrency: '',
    };
  }
  componentDidMount = () => {
    this.getCurrentDate();
  };
  // lấy ngày hiện tại
  getCurrentDate = () => {
    const date = new Date();
    const parsedDate = moment(date, 'DD/MM/YYYY');
    const a = parsedDate.format('MM/DD/YYYY');
    this.setState({currentDate: a});
  };
  // nhập ngày
  onChangeDate = (item, text) => {
    const str = text;
    switch (item) {
      // ngày đi
      case 'departDate':
        if (text.length === 2 && this.state.departTime.charAt(2) !== '/') {
          let a = str.slice(0, 2);
          this.setState({
            departTime: (text += '/'),
          });
          if (parseInt(a) > 31 || parseInt(a) < 1) {
            SimpleToast.show('Ngày đi không hợp lệ');
            this.setState({departTime: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.departTime.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            departTime: (text += '/'),
          });
          if (parseInt(a) > 12 || parseInt(a) < 1) {
            SimpleToast.show('Ngày đi không hợp lệ');
            this.setState({departTime: this.state.departTime.slice(0, 3)});
          }
        } else {
          this.setState({departTime: text});
        }
        return;
      // ngày về
      case 'returnDate':
        if (text.length === 2 && this.state.returnTime.charAt(2) !== '/') {
          let a = str.slice(0, 2);
          this.setState({
            returnTime: (text += '/'),
          });
          if (parseInt(a) > 31 || parseInt(a) < 1) {
            SimpleToast.show('Ngày về không hợp lệ');
            this.setState({returnTime: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.returnTime.charAt(5) !== '/'
        ) {
          let a = str.slice(3, 5);
          this.setState({
            returnTime: (text += '/'),
          });
          if (parseInt(a) > 12 || parseInt(a) < 1) {
            SimpleToast.show('Ngày về không hợp lệ');
            this.setState({returnTime: this.state.returnTime.slice(0, 3)});
          }
        } else {
          this.setState({returnTime: text});
        }
        return;
      default:
        return '';
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
  // validate required điểm điếm
  validateDestination = () => {
    const {areaName} = this.state;
    if (areaName == '') {
      this.setState({errorCodeDestination: 'Vui lòng chọn điểm đến'});
      return false;
    } else {
      this.setState({errorCodeDestination: ''});
      return true;
    }
  };
  // validate required tỉnh/tp
  validateProvince = () => {
    const {arrivalCityName, areaName} = this.state;
    if (areaName !== 'Việt Nam') {
      return true;
    }
    if (arrivalCityName == '') {
      this.setState({errorCodeProvince: 'Vui lòng chọn tỉnh/thành phố'});
      return false;
    } else {
      this.setState({errorCodeProvince: ''});
      return true;
    }
  };
  // validate required quốc gia
  validateNation = () => {
    const {countryName, areaName} = this.state;
    if (areaName == 'Việt Nam') {
      return true;
    }
    if (countryName == '') {
      this.setState({errorCodeNation: 'Vui lòng chọn quốc gia'});
      return false;
    } else {
      this.setState({errorCodeNation: ''});
      return true;
    }
  };
   // validate required tiền tệ
  validateCurrency = () => {
    const {currency, areaName} = this.state;
    if (areaName == 'Việt Nam') {
      return true;
    }
    if (currency == '') {
      this.setState({errorCodeCurrency: 'Vui lòng chọn loại tiền tệ'});
      return false;
    } else {
      this.setState({errorCodeCurrency: ''});
      return true;
    }
  };
  // validate số người trong đoàn
  validatePeopleAmount = () => {
    const {peopleAmount} = this.state;
    // required
    if (peopleAmount == '') {
      this.setState({
        errorCodePeopleAmount: 'Bạn phải nhập số người trong đoàn',
      });
      return false;
    }
    // check số người trong đoàn chỉ bao gồm chữ số
    if (validateNumOnly.test(peopleAmount)) {
      this.setState({
        errorCodePeopleAmount: 'Số người trong đoàn sai định dạng',
      });
      return false;
    } else {
      this.setState({errorCodePeopleAmount: ''});
      return true;
    }
  };
  // validate ngày đi
  validateDepartDay = () => {
    const {departTime, currentDate} = this.state;
    const parsedDate = moment(departTime, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    // required
    if (departTime == '') {
      this.setState({errorCodeDepartDate: 'Vui lòng nhập ngày đi'});
      return false;
    }
    // check ngày 29/02
    if (checkLeapYear(departTime) == false) {
      this.setState({errorCodeDepartDate: 'Ngày đi không hợp lệ'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(departTime) == false) {
      this.setState({errorCodeDepartDate: 'Ngày đi không hợp lệ'});
      return false;
    }
    // check ngày đi phải lớn hơn ngày hiện tại
    if (moment(str).isBefore(currentDate) == true) {
      this.setState({
        errorCodeDepartDate: 'Ngày đi phải lớn hơn ngày hiện tại',
      });
      return false;
    } else {
      this.setState({errorCodeDepartDate: ''});
      this.getDayDifference();
      return true;
    }
  };
  // validate ngày về
  validateReturnDay = () => {
    const {departTime, returnTime} = this.state;
    const parsedDate = moment(departTime, 'DD/MM/YYYY');
    const str = parsedDate.format('MM/DD/YYYY');
    const parsedCompareDate = moment(returnTime, 'DD/MM/YYYY');
    const strCompare = parsedCompareDate.format('MM/DD/YYYY');
    // required
    if (returnTime == '') {
      this.setState({errorCodeReturnDate: 'Vui lòng nhập ngày về'});
      return false;
    }
    // check ngày 29/02
    if (checkLeapYear(returnTime) == false) {
      this.setState({errorCodeReturnDate: 'Ngày về không hợp lệ'});
      return false;
    }
    // check ngày 31 tháng 30 ngày
    if (checkMonth(returnTime) == false) {
      this.setState({errorCodeReturnDate: 'Ngày về không hợp lệ'});
      return false;
    }
    // check ngày về phải lớn hơn ngày hiện tại
    if (moment(strCompare).isBefore(str) == true) {
      this.setState({
        errorCodeReturnDate: 'Ngày về phải lớn hơn ngày hiện tại',
      });
      return false;
    }
    // validate số ngày du lịch k được quá 180 ngày
    if (this.getDayDifference() > 180) {
      this.setState({
        errorCodeDayNumber: 'Số ngày du lịch phải nhỏ hơn 180 ngày/chuyến',
      });
      return false;
    } else {
      this.setState({errorCodeReturnDate: ''});
      this.getDayDifference();
      return true;
    }
  };
  // chọn khu vực
  setArea = data => {
    this.setState({areaName: data.name, errorCodeDestination: ''});
    this.setState({modalProvince: false});
  };
  // chọn tỉnh/tp
  setProvince = data => {
    this.setIdProvince(data._name, data.id);
    this.setState({modalProvince: false});
  };
  setIdProvince = data => {
    this.setState({
      arrivalCityName: data._name,
      arrivalIdCity: data.id,
      errorCodeProvince: '',
    });
  };
  // chọn loại tiền tệ
  setCurrency = data => {
    this.setState({
      currency: data.name,
      errorCodeCurrency: '',
    });
  };
  // chọn quốc gia
  setNation = data => {
    this.setState({
      countryName: data.name,
      errorCodeNation: '',
    });
  };
  // lấy số ngày du lịch
  getDayDifference = () => {
    const {departTime, returnTime} = this.state;
    let a = moment(returnTime, 'DD/MM/YYYY');
    let b = moment(departTime, 'DD/MM/YYYY');
    let diff = a.diff(b, 'days'); // lấy số ngày giữa ngày đi và ngày về
    this.setState({dayNumber: diff});
    return diff;
  };
  // lưu thông tin vào redux
  storeInfomation = () => {
    const {
      departTime,
      returnTime,
      dayNumber,
      arrivalIdCity,
      arrivalCityName,
      peopleAmount,
      countryName,
      areaName,
    } = this.state;
    let type = areaName == 'Việt Nam' ? 1 : 2;
    let array = [
      {
        areaName: areaName,
        departTime: departTime,
        returnTime: returnTime,
        dayNumber: dayNumber,
        countryName: countryName,
        countryId: '',
        peopleAmount: peopleAmount,
        arrivalIdCity: arrivalIdCity,
        arrivalCityName: arrivalCityName,
      },
    ];
    this.props.saveTourInfomation(array);
    this.props.saveTypeTravelInsurance(type);
    Actions.TravelInsurancePackage();
  };
  next = () => {
    if (this.validateDestination()) {
      if (this.validateProvince()) {
        if (this.validateNation()) {
          if (this.validateCurrency()) {
            if (this.validatePeopleAmount()) {
              if (this.validateDepartDay()) {
                if (this.validateReturnDay()) {
                  this.storeInfomation();
                }
              }
            }
          }
        }
      }
    }
  };
  render() {
    const {
      departTime,
      returnTime,
      dayNumber,
      arrivalCityName,
      peopleAmount,
      modalProvince,
      countryName,
      areaName,
      errorCodeDepartDate,
      errorCodeDestination,
      errorCodeReturnDate,
      errorCodeProvince,
      errorCodePeopleAmount,
      errorCodeDayNumber,
      errorCodeNation,
      errorCodeCurrency,
      modalArea,
      currency,
      modalCurrency,
      modalNation,
    } = this.state;
    return (
      <View style={styles.container}>
        <ModalArea
          open={modalArea}
          onClosed={() => this.setState({modalArea: null})}
          setArea={data => this.setArea(data)}
          onOpened={() => this.setState({modalArea: true})}
        />
        <ModalProvince
          open={modalProvince}
          onClosed={() => this.setState({modalProvince: null})}
          setProvince={data => this.setIdProvince(data)}
          onOpened={() => this.setState({modalProvince: true})}
        />
        <ModalCurrency
          open={modalCurrency}
          onClosed={() => this.setState({modalCurrency: null})}
          setCurrency={data => this.setCurrency(data)}
          onOpened={() => this.setState({modalCurrency: true})}
        />
        <ModalNation
          open={modalNation}
          onClosed={() => this.setState({modalNation: null})}
          setNation={data => this.setNation(data)}
          onOpened={() => this.setState({modalNation: true})}
        />
        <NavWithImage
          isInfo={false}
          title={'Bảo hiểm du lịch'}
          onPress={() => Actions.pop()}
          image={require('../../icons/iconAgent/ic_banner_travel.jpg')}
        />
        <KeyboardAwareScrollView style={styles.formInputContainer}>
          <ScrollView style={{flex: 1}}>
            <Text style={styles.titleStyle}> MUA BẢO HIỂM DU LỊCH </Text>
            <View style={styles.formInputStyle}>
              <InputSelectForm
                label={'Điểm đến'}
                value={areaName}
                openModal={() => this.setState({modalArea: true})}
                error={errorCodeDestination}
              />
              {areaName == 'Việt Nam' ? (
                <InputSelectForm
                  label={'Tỉnh/Thành phố'}
                  value={arrivalCityName}
                  openModal={() => this.setState({modalProvince: true})}
                  error={errorCodeProvince}
                />
              ) : (
                <InputSelectForm
                  label={'Tên nước đến'}
                  value={countryName}
                  openModal={() => this.setState({modalNation: true})}
                  error={errorCodeNation}
                />
              )}
              {areaName !== 'Việt Nam' ? (
                <InputSelectForm
                  label={'Loại tiền tệ'}
                  value={currency}
                  openModal={() => this.setState({modalCurrency: true})}
                  error={errorCodeCurrency}
                />
              ) : null}
              <InputForm
                label={'Số người trong đoàn'}
                value={peopleAmount}
                onChangeText={text => this.setState({peopleAmount: text})}
                keyboardType={'number-pad'}
                onFocus={() => this.setState({errorCodePeopleAmount: ''})}
                onBlur={() => this.validatePeopleAmount()}
                error={errorCodePeopleAmount}
                editable={true}
              />
              <InputForm
                label={'Ngày đi'}
                value={departTime}
                placeholder={'dd/mm/yyyy'}
                onChangeText={text => this.onChangeDate('departDate', text)}
                keyboardType={'number-pad'}
                onFocus={() => this.setState({errorCodeDepartDate: ''})}
                onBlur={this.validateDepartDay}
                error={errorCodeDepartDate}
                editable={true}
              />
              <InputForm
                label={'Ngày về'}
                value={returnTime}
                placeholder={'dd/mm/yyyy'}
                keyboardType={'number-pad'}
                onChangeText={text => this.onChangeDate('returnDate', text)}
                onFocus={() =>
                  this.setState({
                    errorCodeReturnDate: '',
                    errorCodeDayNumber: '',
                  })
                }
                onBlur={() => this.validateReturnDay()}
                error={errorCodeReturnDate}
                editable={true}
              />
              <InputForm
                label={'Số ngày du lịch'}
                value={!dayNumber ? '' : dayNumber.toString()}
                editable={false}
                error={errorCodeDayNumber}
              />
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        <FooterButton>
          <Button label={'GỬI THÔNG TIN'} onPress={() => this.next()} />
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
  formInputContainer: {
    alignSelf: 'center',
    width: widthPercentageToDP('85'),
    backgroundColor: Color,
    marginTop: -50,
    borderRadius: 8,
  },
  titleStyle: {
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
    paddingVertical: 15,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  textError: {
    color: '#F97C7C',
  },
  txtErrorCode: {
    color: 'rgb(213, 0, 0)',
    fontSize: 12,
    marginTop: 5,
  },
});
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    saveTourInfomation: body => dispatch(saveTourInfomation(body)),
    saveTypeTravelInsurance: body => dispatch(saveTypeTravelInsurance(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TourInfomation);
