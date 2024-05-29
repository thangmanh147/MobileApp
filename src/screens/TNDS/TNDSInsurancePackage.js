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
import Input from '../CarInsurance/components/Input';
import ModalMonth from '../CarInsurance/components/ModalMonth';
import ModalPurpose from '../CarInsurance/components/ModalPurpose';
import ModalCompensation from '../CarInsurance/components/ModalCompensation';
import {URL} from '../../config/System';
import {connect} from 'react-redux';
import {renderVND} from '../../components/Functions';
import InputFee from '../CarInsurance/components/InputFee';
import SimpleToast from 'react-native-simple-toast';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconUpSvg from '../../config/images/icons/IconUpSvg';
import IconDownSvg from '../../config/images/icons/IconDownSvg';

class TNDSInsurancePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemIndex: null,
      isChecked: [],
      changePremiumType: '',
      openMonth: false,
      month: '',
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
    };
  }
  componentDidMount() {
    this.getListInsurancePackage();
    this.getFeetnlxpx();
  }
  // lấy danh sách gói bảo hiểm
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
  // lấy phí tnlxpx
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
        this.setState({
          tnlxpx: [res?.data],
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  // lấy thông tin xe từ redux
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.carInfo && nextProps.carInfo !== prevState.carInfo) {
      (update.car_type = nextProps.carInfo.carTypeCode),
        (update.car_purpose = nextProps.carInfo.purposeCode),
        (update.car_seat_number = nextProps.carInfo.seat),
        (update.car_manufacture_year = nextProps.carInfo.manufactureYear),
        (update.car_value = nextProps.carInfo.declarationPrice);
    }
    return update;
  }
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
  // nhập thời hạn (ngày)
  onChangeDate = (item, text) => {
    switch (item) {
      // thời hạn từ (ngày) bh tnds
      case 'fromDateTnds':
        if (text.length === 2 && this.state.fromDateTnds.charAt(2) !== '/') {
          let a = text.slice(0, 2);
          this.setState({
            fromDateTnds: a + '/',
          });
          if (parseInt(a) > 31) {
            SimpleToast.show('Ngày không thể lớn hơn 31');
            this.setState({fromDateTnds: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.fromDateTnds.charAt(5) !== '/'
        ) {
          let a = text.slice(3, 5);
          this.setState({
            fromDateTnds: this.state.fromDateTnds.slice(0, 3) + a + '/',
          });
          if (parseInt(a) > 12) {
            SimpleToast.show('Tháng không thể lớn hơn 12');
            this.setState({fromDateTnds: this.state.fromDateTnds.slice(0, 3)});
          }
        } else {
          this.setState({fromDateTnds: text});
        }
        return;
      // thời hạn đến (ngày) bh tnds
      case 'toDateTnds':
        if (text.length === 2 && this.state.toDateTnds.charAt(2) !== '/') {
          let a = text.slice(0, 2);
          this.setState({
            toDateTnds: a + '/',
          });
          if (parseInt(a) > 31) {
            SimpleToast.show('Ngày không thể lớn hơn 31');
            this.setState({toDateTnds: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.toDateTnds.charAt(5) !== '/'
        ) {
          let a = text.slice(3, 5);
          this.setState({
            toDateTnds: this.state.toDateTnds.slice(0, 3) + a + '/',
          });
          if (parseInt(a) > 12) {
            SimpleToast.show('Tháng không thể lớn hơn 12');
            this.setState({toDateTnds: this.state.toDateTnds.slice(0, 3)});
          }
        } else {
          this.setState({toDateTnds: text});
        }
        return;
      // thời hạn từ (ngày) bh tnlxpx
      case 'fromdateTnlxpx':
        if (text.length === 2 && this.state.fromDateTnlxpx.charAt(2) !== '/') {
          let a = text.slice(0, 2);
          this.setState({
            fromDateTnlxpx: a + '/',
          });
          if (parseInt(a) > 31) {
            SimpleToast.show('Ngày không thể lớn hơn 31');
            this.setState({fromDateTnlxpx: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.fromDateTnlxpx.charAt(5) !== '/'
        ) {
          let a = text.slice(3, 5);
          this.setState({
            fromDateTnlxpx: this.state.fromDateTnlxpx.slice(0, 3) + a + '/',
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
      // thời hạn đến (ngày) bh tnlxpx
      case 'toDateTnlxpx':
        if (text.length === 2 && this.state.toDateTnlxpx.charAt(2) !== '/') {
          let a = text.slice(0, 2);
          this.setState({
            toDateTnlxpx: a + '/',
          });
          if (parseInt(a) > 31) {
            SimpleToast.show('Ngày không thể lớn hơn 31');
            this.setState({toDateTnlxpx: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.toDateTnlxpx.charAt(5) !== '/'
        ) {
          let a = text.slice(3, 5);
          this.setState({
            toDateTnlxpx: this.state.toDateTnlxpx.slice(0, 3) + a + '/',
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
    switch (item) {
      //  thời hạn từ (giờ) bh tnds
      case 'fromTimeTnds':
        if (text.length === 2 && this.state.fromTimeTnds.charAt(2) !== ':') {
          let a = text.slice(0, 2);
          this.setState({
            fromTimeTnds: a + ':',
          });
          if (parseInt(a) > 31) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({fromTimeTnds: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.fromTimeTnds.charAt(5) !== ':'
        ) {
          let a = text.slice(3, 5);
          this.setState({
            fromTimeTnds: this.state.fromTimeTnds.slice(0, 3) + a,
          });
          if (parseInt(a) > 59) {
            SimpleToast.show('Phút không thể lớn hơn 59');
            this.setState({fromTimeTnds: this.state.fromTimeTnds.slice(0, 3)});
          }
        } else {
          this.setState({fromTimeTnds: text});
        }
        return;
      //  thời hạn đến (giờ) bh tnds
      case 'toTimeTnds':
        if (text.length === 2 && this.state.toTimeTnds.charAt(2) !== ':') {
          let a = text.slice(0, 2);
          this.setState({
            toTimeTnds: a + ':',
          });
          if (parseInt(a) > 31) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({toTimeTnds: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.toTimeTnds.charAt(5) !== ':'
        ) {
          let a = text.slice(3, 5);
          this.setState({
            toTimeTnds: this.state.toTimeTnds.slice(0, 3) + a,
          });
          if (parseInt(a) > 59) {
            SimpleToast.show('Phút không thể lớn hơn 59');
            this.setState({toTimeTnds: this.state.toTimeTnds.slice(0, 3)});
          }
        } else {
          this.setState({toTimeTnds: text});
        }
        return;
      //  thời hạn từ (giờ) bh tnlxpx
      case 'fromTimeTnlxpx':
        if (text.length === 2 && this.state.fromTimeTnlxpx.charAt(2) !== ':') {
          let a = text.slice(0, 2);
          this.setState({
            fromTimeTnlxpx: a + ':',
          });
          if (parseInt(a) > 31) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({fromTimeTnlxpx: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.fromTimeTnlxpx.charAt(5) !== ':'
        ) {
          let a = text.slice(3, 5);
          this.setState({
            fromTimeTnlxpx: this.state.fromTimeTnlxpx.slice(0, 3) + a,
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
      //  thời hạn đến (giờ) bh tnlxpx
      case 'toTimeTnlxpx':
        if (text.length === 2 && this.state.toTimeTnlxpx.charAt(2) !== ':') {
          let a = text.slice(0, 2);
          this.setState({
            toTimeTnlxpx: a + ':',
          });
          if (parseInt(a) > 31) {
            SimpleToast.show('Giờ không thể lớn hơn 24');
            this.setState({toTimeTnlxpx: ''});
          }
        } else if (
          text.length === 5 &&
          this.state.toTimeTnlxpx.charAt(5) !== ':'
        ) {
          let a = text.slice(3, 5);
          this.setState({
            toTimeTnlxpx: this.state.toTimeTnlxpx.slice(0, 3) + a,
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
  // mở modal hiệu lực cho mỗi loại bảo hiểm
  openModal = item => {
    if (item == 'tnds') {
      this.setState({openEffectTnds: true});
    } else {
      this.setState({openEffectTnlxpx: true});
    }
  };
  // chọn tăng phí
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
  // render list công ty bảo hiểm
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
  // render gói bh tnlxpx
  renderTnlxpx = () => {
    const {
      fromDateTnlxpx,
      toDateTnlxpx,
      fromTimeTnlxpx,
      toTimeTnlxpx,
      tnlxpxEffect,
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
            </View>
            <View style={{width: '46%', marginTop: -30}}>
              <InputSelect
                label={'Hiệu lực'}
                value={this.state.tnlxpxEffect}
                openModal={() => this.openModal('tnlxpx')}
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
                label={'Thời hạn từ (giờ)'}
                value={fromTimeTnlxpx}
                onChangeText={text => this.onChangeTime('fromTimeTnlxpx', text)}
                keyboardType={'number-pad'}
                maxLength={5}
              />
            </View>
            <View style={{width: '46%'}}>
              <Input
                label={'Thời hạn từ (ngày)'}
                value={fromDateTnlxpx}
                onChangeText={text => this.onChangeDate('fromdateTnlxpx', text)}
                keyboardType={'number-pad'}
                maxLength={10}
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
                value={toTimeTnlxpx}
                onChangeText={text => this.onChangeTime('toTimeTnlxpx', text)}
                keyboardType={'number-pad'}
                maxLength={5}
              />
            </View>
            <View style={{width: '46%'}}>
              <Input
                label={'Thời hạn đến (ngày)'}
                value={toDateTnlxpx}
                onChangeText={text => this.onChangeDate('toDateTnlxpx', text)}
                keyboardType={'number-pad'}
                maxLength={10}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  // render gói bh tnds
  renderTndsbb = () => {
    const {fromDateTnds, toDateTnds, fromTimeTnds, toTimeTnds} = this.state;
    return (
      <View>
        <View
          style={{
            marginTop: 25,
            paddingHorizontal: 5,
          }}>
          <View style={{width: '100%', marginTop: -30}}>
            <InputSelect
              label={'Hiệu lực'}
              value={this.state.tndsEffect}
              openModal={() => this.openModal('tnds')}
            />
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
              />
            </View>
            <View style={{width: '46%'}}>
              <Input
                label={'Thời hạn từ (ngày)'}
                value={fromDateTnds}
                onChangeText={text => this.onChangeDate('fromDateTnds', text)}
                keyboardType={'number-pad'}
                maxLength={10}
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
                value={toTimeTnds}
                onChangeText={text => this.onChangeTime('toTimeTnds', text)}
                keyboardType={'number-pad'}
                maxLength={5}
              />
            </View>
            <View style={{width: '46%'}}>
              <Input
                label={'Thời hạn đến (ngày)'}
                value={toDateTnds}
                onChangeText={text => this.onChangeDate('toDateTnds', text)}
                keyboardType={'number-pad'}
                maxLength={10}
              />
            </View>
          </View>
          <View style={{paddingVertical: 12}}>
            <Text style={{fontWeight: '700'}}>Quyền lợi:</Text>
            <Text>- Về người: 100 triệu đồng/người/vụ</Text>
            <Text>- Về tài sản: 100 triệu đồng/vụ</Text>
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
      isShowTnlxpx,
      isShowTndsbb,
      openEffectTnds,
      defaulValueTndsbb,
      tnlxpx,
      tndsbb,
      InsurancePackSet1,
    } = this.state;
    return (
      <View style={styles.container}>
        <ModalMonth
          open={openEffectTnds}
          onClosed={() => this.setState({openEffectTnds: null})}
          setMonth={data => this.setState({tndsEffect: data.name})}
        />
        <ModalMonth
          open={openEffectTnlxpx}
          onClosed={() => this.setState({openEffectTnlxpx: null})}
          setMonth={data => this.setState({tnlxpxEffect: data.name})}
        />
        <ModalPurpose
          open={openPurpose}
          onClosed={() => this.setState({openPurpose: null})}
          setPurpose={data => this.setState({purpose: data.name})}
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
                        <FastImage
                          source={require('../../icons/iconAgent/ic_default_checked.png')}
                          style={{width: 21, height: 21}}
                        />
                        <Text style={{fontWeight: '700', marginLeft: 8}}>
                          1. Bảo hiểm trách nhiệm dân sự bắt buộc
                        </Text>
                      </View>
                      <View style={styles.packageFee}>
                        <Text style={{fontWeight: '700'}}>{`${renderVND(
                          defaulValueTndsbb,
                        )}đ`}</Text>
                        <View style={{marginLeft: 8}}>
                          {
                            this.state.isShowTndsbb == false ?
                              <IconDownSvg width={15} height={15} /> :
                              <IconUpSvg width={15} height={15} />
                          }
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
                {isShowTndsbb == true ? this.renderTndsbb() : null}
              </View>
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
                          onPress={() =>
                            this.setState({
                              InsurancePackSet1: !InsurancePackSet1,
                              lxpxCode: item.code,
                            })
                          }>
                          {InsurancePackSet1 == true ?
                            <IconCheckedBoxSvg width={20} height={20} color={NewColor} /> :
                            <IconBoxSvg width={20} height={20} color={NewColor} />
                          }
                        </TouchableOpacity>
                        <Text style={{fontWeight: '700', marginLeft: 8}}>
                          2. Bảo hiểm tai nạn lái xe, phụ xe và người ngồi trên
                          xe
                        </Text>
                      </View>
                      <View style={styles.packageFee}>
                        <Text style={{fontWeight: '700'}}>
                          {renderVND(item.lxpxhktx)}đ
                        </Text>
                        <View style={{marginLeft: 8}}>
                          {
                            this.state.isShowTnlxpx == false ?
                              <IconDownSvg width={15} height={15} /> :
                              <IconUpSvg width={15} height={15} />
                          }
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}

                {isShowTnlxpx == true ? this.renderTnlxpx() : null}
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
                    />
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
                    />
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
                style={{
                  borderWidth: 0.5,
                  borderColor: '#30BEBC',
                  borderRadius: 1,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                }}>
                <Text style={{fontWeight: '700', color: '#30BEBC'}}>
                  THANH TOÁN
                </Text>
                <Text style={{fontWeight: '700', color: '#30BEBC'}}>
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
            onPress={() => Actions.AddressGetContract()}
          />
        </FooterButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
const mapStateToProps = state => {
  return {
    carInfo: state.tndsBuy.carInfoTnds,
  };
};
const mapDispatchToProps = dispatch => {};
export default connect(mapStateToProps)(TNDSInsurancePackage);
