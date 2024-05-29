import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import InputCommune from '../../screens/TNDS/components/InputCommune';

const valueScaleWindowWidth = function(percent) {
  return (Dimensions.get('window').width / 100) * percent;
};

let HTTP = require('../../services/HTTP');
let {width, height} = Dimensions.get('window');

class CarOwnerInfomation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idProvince: '',
      idDistrict: '',
      idCommune: '',
      province: '',
      district: '',
      commune: '',
      txtFullname: '',
      txtPhone: '',
      txtEmail: '',
      txtAddress: '',
      emptyError: '',
      emptyFullName: false,
      emptyPhone: false,
      emptyEmail: false,
      emptyProvince: false,
      emptyDistrict: false,
      emptyCommune: false,
      emptyAddress: false,
      notValidaFullname: false,
      notValidPhone: false,
      notValidlessThan9: false,
      notValidNotWith0: false,
      notValidMoreThan11: false,
      notValidEmail: false,
      notValidTxtAddressSpecial: false,
      loading: false,
      modalProvince: false,
      modalDistrict: false,
      modalCommune: false,
      listProvince: '',
      listDistrict: '',
      listCommune: '',
      fullDataListProvince: '',
      fullDataListDistrict: '',
      fullDataListCommune: '',
      textSearchList: '',
      onActive: 'personal',
    };
  }

  submit() {
    this.checkFocus('submit');
  }

  checkFocus(item) {
    const {
      txtFullname,
      txtPhone,
      txtEmail,
      txtAddress,
      idProvince,
      idDistrict,
      idCommune,
      province,
      district,
      commune,
      notValidPhone,
      notValidNotWith0,
    } = this.state;

    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let validateEmail = /^([a-zA-Z0-9][a-zA-Z0-9_\-]*(([\.][a-zA-Z0-9_\-]*)*)[a-zA-Z0-9]@([a-zA-Z0-9][a-zA-Z0-9_\-]*[a-zA-Z0-9]\.)+([a-zA-Z0-9]{2,4}))$/;
    if (txtFullname.trim() == '') {
      this.setState({
        emptyFullName: true,
      });
    } else if (validateName.test(txtFullname.trim()) == true) {
      this.setState({notValidFullname: true});
      return;
    } else if (txtPhone.trim() == '') {
      this.setState({
        emptyPhone: true,
      });
    } else if (txtPhone.length < 10) {
      this.setState({
        notValidlessThan9: true,
      });
      return;
    } else if (txtPhone.length > 11) {
      this.setState({
        notValidMoreThan11: true,
      });
      return;
    } else if (notValidPhone == true || notValidNotWith0 == true) {
      return;
    } else if (txtEmail.trim() == '') {
      this.setState({
        emptyEmail: true,
      });
    } else if (validateEmail.test(txtEmail) == false) {
      this.setState({notValidEmail: true});
      return;
    } else if (item && item == 'city') {
      this.callApiCity();
      return;
    } else if (item && item == 'district') {
      if (province.trim() === '') {
        this.setState({emptyProvince: true});
        return;
      } else {
        this.callApiDistrict();
        return;
      }
    } else if (item && item == 'commune') {
      if (province.trim() === '' && district.trim() === '') {
        this.setState({emptyProvince: true, emptyDistrict: true});
        return;
      } else if (province.trim() === '') {
        this.setState({emptyProvince: true});
        return;
      } else if (district.trim() === '') {
        this.setState({emptyDistrict: true});
        return;
      } else {
        this.callApiCommune();
        return;
      }
    } else if (province.trim() === '') {
      this.setState({
        emptyProvince: true,
      });
    } else if (district.trim() === '') {
      this.setState({
        emptyDistrict: true,
      });
    } else if (commune.trim() === '') {
      this.setState({
        emptyCommune: true,
      });
    } else if (txtAddress.trim() == '') {
      this.setState({
        emptyAddress: true,
      });
    }
    // else if (validateName.test(txtAddress) == true) {
    //     this.setState({ notValidTxtAddressSpecial: true });
    //     return;
    // }
    else {
      if (item && item == 'submit') {
        const dataOwner = {
          txtFullname: txtFullname.trim(),
          txtPhone,
          txtEmail,
          province,
          district,
          commune,
          txtAddress,
          idProvince,
          idDistrict,
          idCommune,
        };
        const {dataVehicle} = this.props;
        // this.props.deleteArrayFullDiscountCode();
        Keyboard.dismiss();
        Actions.InformationReceiver({dataVehicle, dataOwner});
      }
    }
  }

  setPhone(value) {
    input = value.replace(/\s+/g, '').trim();
    let validateNum = /^[0-9]+$/;
    const cutFirstPhone = input.substring(0, 1);
    if (input.length == 10) {
      this.setState({
        notValidlessThan9: false,
      });
    }
    if (input.length < 12 && this.state.notValidMoreThan11) {
      this.setState({
        notValidMoreThan11: false,
      });
    }
    if (cutFirstPhone != 0 && input.length > 0) {
      this.setState({
        notValidMoreThan11: false,
        notValidNotWith0: true,
        emptyPhone: false,
      });
    } else {
      if (input.length > 0) {
        if (validateNum.test(input) == true) {
          this.setState({
            notValidPhone: false,
            emptyPhone: false,
            notValidMoreThan11: false,
          });
        }
      } else {
        this.setState({
          notValidPhone: false,
          notValidMoreThan11: false,
          notValidNotWith0: false,
          emptyPhone: false,
        });
      }
    }
    this.setState({txtPhone: input});
    return;
  }

  setFullName(input) {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (input.length > 0) {
      if (validateName.test(input) == false) {
        this.setState({
          notValidFullname: false,
          emptyFullName: false,
        });
      }
    } else {
      this.setState({
        notValidFullname: false,
        emptyFullName: false,
      });
    }
    this.setState({
      txtFullname: input,
    });
    return;
  }

  setEmail(input) {
    let validateEmail = /^([a-zA-Z0-9][a-zA-Z0-9_\-]*(([\.][a-zA-Z0-9_\-]*)*)[a-zA-Z0-9]@([a-zA-Z0-9][a-zA-Z0-9_\-]*[a-zA-Z0-9]\.)+([a-zA-Z0-9]{2,4}))$/;
    if (input.length == 0) {
      this.setState({notValidEmail: false});
    }
    if (input.length > 0) {
      this.setState({emptyEmail: false});
    }
    if (validateEmail.test(input) == true && this.state.notValidEmail) {
      this.setState({notValidEmail: false});
    }
    this.setState({
      txtEmail: input.replace(/\s+/g, '').trim(),
    });
    return;
  }

  setAddress(input) {
    let validateName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (input.length > 0) {
      if (validateName.test(input) == false) {
        this.setState({
          notValidTxtAddressSpecial: false,
          emptyAddress: false,
        });
      }
    } else {
      this.setState({
        notValidTxtAddressSpecial: false,
        emptyAddress: false,
      });
    }
    this.setState({
      txtAddress: input,
    });
    return;
  }

  async callApiCity() {
    try {
      this.setState({loading: true});
      const body = {
        function: 'InsoContractApi_getListCity',
        params: {},
      };
      const data = await HTTP.post(body);
      if (data.result_code === '0000') {
        this.setState({
          listProvince: data.result_data.cities,
          fullDataListProvince: data.result_data.cities,
          listDistrict: '',
          district: '',
          fullDataListDistrict: '',
          listCommune: '',
          commune: '',
          fullDataListCommune: '',
          modalProvince: !this.state.modalProvince,
        });
      } else if (data.code == '1001') {
        SimpleToast.show(data.result_message);
        Actions.login({type: 'reset'});
        return;
      } else {
        SimpleToast.show(data.result_message);
        return;
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({loading: false});
    }
  }

  async callApiDistrict() {
    const {province, idProvince} = this.state;
    // if (!province) {
    //     this.setState({ emptyProvince: true })
    // } else {
    try {
      this.setState({loading: true});
      const body = {
        function: 'InsoContractApi_getListDistrict',
        params: {
          city_id: idProvince,
        },
      };
      const data = await HTTP.post(body);
      if (data.result_code === '0000') {
        this.setState({
          listDistrict: data.result_data.districts,
          fullDataListDistrict: data.result_data.districts,
          listCommune: '',
          commune: '',
          fullDataListCommune: '',
          modalDistrict: !this.state.modalDistrict,
        });
      } else if (data.code == '1001') {
        SimpleToast.show(data.result_message);
        Actions.login({type: 'reset'});
        return;
      } else {
        SimpleToast.show(data.result_message);
        return;
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({loading: false});
    }
    // }
  }

  async callApiCommune() {
    const {district, idDistrict} = this.state;
    // if (!district) {
    //     this.setState({ emptyDistrict: true })
    // } else {
    try {
      this.setState({loading: true});
      const body = {
        function: 'InsoContractApi_getListWards',
        params: {
          district_id: idDistrict,
        },
      };
      const data = await HTTP.post(body);
      if (data.result_code === '0000') {
        this.setState({
          listCommune: data.result_data.wards,
          fullDataListCommune: data.result_data.wards,
          modalCommune: !this.state.modalCommune,
        });
      } else if (data.code == '1001') {
        SimpleToast.show(data.result_message);
        Actions.login({type: 'reset'});
        return;
      } else {
        SimpleToast.show(data.result_message);
        return;
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({loading: false});
    }
    // }
  }

  setName(status, name, id) {
    if (status == 'province') {
      this.setState({
        idProvince: id,
        province: name,
        textSearchList: '',
        modalProvince: false,
      });
    } else if (status == 'district') {
      this.setState({
        idDistrict: id,
        district: name,
        textSearchList: '',
        modalDistrict: false,
      });
    } else {
      this.setState({
        idCommune: id,
        commune: name,
        textSearchList: '',
        modalCommune: false,
      });
    }
  }

  renderList(status, item) {
    return (
      <TouchableOpacity
        style={{
          width: widthPercentageToDP('74'), //view flatlist
          height: heightPercentageToDP('7.5'),
          flexDirection: 'row',
        }}
        onPress={() => this.setName(status, item.item.name, item.item.id)}>
        <View
          style={{
            flex: 1.2,
            justifyContent: 'center',
          }}>
          {/*<Image source={require('../../../icons/ic_location_common.png')}*/}
          {/*       style={{width: valueScaleWindowWidth(6.9),height: valueScaleWindowWidth(6.9)}}*/}
          {/*/>*/}
        </View>
        <View
          style={{
            flex: 8.8,
            borderBottomWidth: 0.5,
            borderColor: '#D7D7D7',
          }}>
          <View
            style={{
              flex: 1.2,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: valueScaleWindowWidth(3.3),
                color: '#323643',
              }}>
              {item.item.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  SearchFilter(status, text, data) {
    let upper = text.toLowerCase();
    let list = data;
    if (list.length == 0) {
      SimpleToast.show(
        'Không tìm thấy tỉnh/thành phố. Xin mời bạn thử lại sau',
      );
    } else {
      let newArray = [];
      for (let i = 0; i < list.length; i++) {
        var matched = list.filter(item => {
          return item.name.toLowerCase().indexOf(upper) > -1; //fix search function android
        });
      }
      for (let y = 0; y < matched.length; y++) {
        newArray = newArray.concat(matched[y]);
      }
      if (status == 'province') {
        this.setState({
          textSearchList: text,
          listProvince: newArray,
        });
      } else if (status == 'district') {
        this.setState({
          textSearchList: text,
          listDistrict: newArray,
        });
      } else {
        this.setState({
          textSearchList: text,
          listCommune: newArray,
        });
      }
    }
  }

  hideModal2(status) {
    if (status == 'province') {
      this.setState({
        modalProvince: false,
      });
    } else if (status == 'district') {
      this.setState({
        modalDistrict: false,
      });
    } else {
      this.setState({
        modalCommune: false,
      });
    }
  }

  renderModal(status, listData, fullData) {
    const {textSearchList} = this.state;
    return (
      <ModalCustom
        heightTopOutside={heightPercentageToDP('10')}
        heightMainContent={heightPercentageToDP('82.5')}
        closeModal={() => this.hideModal2(status)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: widthPercentageToDP('5'),
              height: heightPercentageToDP('77.5'),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP('74'),
              height: heightPercentageToDP('77.5'),
            }}>
            <View
              style={{
                width: widthPercentageToDP('74'),
                height: heightPercentageToDP('8'),
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                borderColor: '#D5D5D5',
                flexDirection: 'row',
              }}>
              <View style={{flex: 8}}>
                <TextInput
                  onChangeText={textSearchList =>
                    this.SearchFilter(status, textSearchList, fullData)
                  }
                  value={textSearchList}
                  placeholder={'Tìm kiếm'}
                  style={{
                    flex: 1,
                    color: '#323643',
                    fontSize: valueScaleWindowWidth(4),
                  }}
                />
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                {/*<Image source={require('../../../icons/flight_ic_forma_bigger.png')}*/}
                {/*       style={{width: valueScaleWindowWidth(4),height: valueScaleWindowWidth(4),}}*/}
                {/*/>*/}
              </View>
            </View>

            <View
              style={{
                width: widthPercentageToDP('74'),
                height: heightPercentageToDP('60'),
              }}>
              <FlatList
                horizontal={false}
                data={listData}
                renderItem={item => this.renderList(status, item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <TouchableOpacity
              style={{
                width: widthPercentageToDP('74'),
                height: heightPercentageToDP('8'),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.hideModal2(status)}>
              <View
                style={{
                  width: widthPercentageToDP('14,8'),
                  height: heightPercentageToDP('8'),
                }}
              />

              <View
                style={{
                  width: widthPercentageToDP('44,4'),
                  height: heightPercentageToDP('8'),
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: widthPercentageToDP('44,4'),
                    height: heightPercentageToDP('6.4'),
                    borderRadius: heightPercentageToDP(19),
                    backgroundColor: '#CCCCCC',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: valueScaleWindowWidth(4),
                      color: 'white',
                    }}>
                    Trở lại
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: widthPercentageToDP('14,8'),
                  height: heightPercentageToDP('8'),
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: widthPercentageToDP('5'), //paddingLEft
              height: heightPercentageToDP('77.5'),
            }}
          />
        </View>
      </ModalCustom>
    );
  }

  hideModal(item, status) {
    if (item == 'province') {
      this.setState({modalProvince: status});
    } else if (item == 'district') {
      this.setState({modalDistrict: status});
    } else {
      this.setState({modalCommune: status});
    }
  }

  onPressGroup() {
    this.setState({
      onActive: 'group',
    });
  }

  onPressPersonal() {
    this.setState({
      onActive: 'personal',
    });
  }

  render() {
    const {
      province,
      district,
      emptyFullName,
      notValidFullname,
      emptyPhone,
      notValidPhone,
      notValidMoreThan11,
      notValidlessThan9,
      notValidNotWith0,
      notValidEmail,
      emptyEmail,
      emptyDistrict,
      emptyProvince,
      emptyCommune,
      emptyAddress,
      notValidTxtAddressSpecial,
      loading,
      modalProvince,
      listProvince,
      fullDataListProvince,
      listDistrict,
      fullDataListDistrict,
      listCommune,
      fullDataListCommune,
      modalDistrict,
      modalCommune,
      txtAddress,
      commune,
      txtFullname,
      txtPhone,
      txtEmail,
    } = this.state;
    return (
      <View style={styles.container}>
        <Nav
          isInfo={false}
          show={true}
          title={'THÔNG TIN BÊN MUA BẢO HIỂM'}
          bottom={20}
          onPress={() => Actions.pop()}
        />
        <View
          style={{flexDirection: 'row', marginHorizontal: 10, marginTop: -30}}>
          <TouchableOpacity
            onPress={() => this.onPressPersonal()}
            style={{
              flex: 1,
              height: 100,
              backgroundColor: '#ffffff',
              marginHorizontal: 10,
              borderRadius: 10,
              padding: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={
                  this.state.onActive == 'personal'
                    ? require('../../icons/iconAgent/ic_ORC.png')
                    : require('../../icons/iconAgent/ic_ORC_grey.png')
                }
                style={{height: 40, width: 35}}
              />
            </View>
            <View style={{justifyContent: 'center', flex: 1}}>
              <Text
                style={{
                  color:
                    this.state.onActive == 'personal' ? '#414042' : '#B3B2B3',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                CMND/ Căn cước
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressGroup()}
            style={{
              flex: 1,
              height: 100,
              backgroundColor: '#ffffff',
              marginHorizontal: 10,
              borderRadius: 10,
              padding: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={
                  this.state.onActive == 'group'
                    ? require('../../icons/iconAgent/ic_user_edit.png')
                    : require('../../icons/iconAgent/ic_user_eidt_grey.png')
                }
                style={{height: 32, width: 40}}
              />
            </View>
            <View style={{justifyContent: 'center', flex: 1}}>
              <Text
                style={{
                  color: this.state.onActive == 'group' ? '#414042' : '#B3B2B3',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                Điền thông tin
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={modalProvince}
          onRequestClose={() => {
            this.hideModal('province', false);
          }}>
          {this.renderModal('province', listProvince, fullDataListProvince)}
        </Modal>
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={modalDistrict}
          onRequestClose={() => {
            this.hideModal('district', false);
          }}>
          {this.renderModal('district', listDistrict, fullDataListDistrict)}
        </Modal>
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={modalCommune}
          onRequestClose={() => {
            this.hideModal('commune', false);
          }}>
          {this.renderModal('commune', listCommune, fullDataListCommune)}
        </Modal>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <View>
              {this.state.onActive == 'personal' ? null : (
                <View>
                  <Input
                    label="Họ và tên chủ xe"
                    onChangeText={txtFullname => this.setFullName(txtFullname)}
                    value={txtFullname}
                    autoUpperCase={true}
                    onFocus={() => this.checkFocus()}
                    erroCodeValidate={
                      emptyFullName && txtFullname == '' ? true : false
                    }
                  />
                  {notValidFullname ? (
                    <View style={styles.containErrorCode}>
                      <Text style={styles.txtErrorCode}>
                        Họ tên không hợp lệ
                      </Text>
                    </View>
                  ) : null}
                </View>
              )}
              <View style={{marginTop: -10}}>
                <Input
                  label="Điện thoại"
                  onChangeText={data => this.setPhone(data)}
                  value={txtPhone}
                  keyboardType={'number-pad'}
                  onFocus={() => this.checkFocus()}
                  erroCodeValidate={emptyPhone && txtPhone == '' ? true : false}
                />
                {notValidPhone ||
                notValidMoreThan11 ||
                notValidlessThan9 ||
                notValidNotWith0 ? (
                  <View style={styles.containErrorCode}>
                    <Text style={styles.txtErrorCode}>
                      Số điện thoại không hợp lệ
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={{marginTop: -10}}>
                <Input
                  label="Email"
                  onChangeText={data => this.setEmail(data)}
                  value={txtEmail}
                  keyboardType={'email-address'}
                  keyboardEmail={true}
                  onFocus={() => this.checkFocus()}
                  erroCodeValidate={emptyEmail && txtEmail == '' ? true : false}
                />
                {notValidEmail ? (
                  <View style={styles.containErrorCode}>
                    <Text style={styles.txtErrorCode}>
                      Địa chỉ email không hợp lệ
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            {this.state.onActive == 'personal' ? null : (
              <View>
                <View
                  style={{
                    marginTop: -5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: '47%'}}>
                    <InputProvince
                      openProvince={() => this.checkFocus('city')}
                      keyword={province}
                      erroCodeValidate={
                        emptyProvince && province == '' ? true : false
                      }
                    />
                  </View>
                  <View style={{width: '47%'}}>
                    <InputDistrict
                      openDistrict={() => this.checkFocus('district')}
                      keyword={district}
                      erroCodeValidate={
                        emptyDistrict && district == '' ? true : false
                      }
                    />
                  </View>
                </View>
                <View style={{marginTop: -5, width: '47%'}}>
                  <InputCommune
                    openCommune={() => this.checkFocus('commune')}
                    keyword={commune}
                    erroCodeValidate={
                      emptyCommune && commune == '' ? true : false
                    }
                  />
                </View>
                <View style={{marginTop: -5}}>
                  <Input
                    label="Địa chỉ (số nhà, tên đường)"
                    onChangeText={data => this.setAddress(data)}
                    value={txtAddress}
                    onFocus={() => this.checkFocus()}
                    erroCodeValidate={
                      emptyAddress && txtAddress == '' ? true : false
                    }
                  />
                  {notValidTxtAddressSpecial ? (
                    <View style={styles.containErrorCode}>
                      <Text style={styles.txtErrorCode}>
                        Địa chỉ nhận ấn chỉ bảo hiểm không hợp lệ
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            )}
            {this.state.onActive == 'personal' ? (
              <TouchableOpacity
                style={{
                  backgroundColor: '#D5F2F2',
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FastImage
                    source={require('../../icons/iconAgent/ic_camera.png')}
                    style={{height: 30, width: 35}}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 5,
                  }}>
                  <Text style={{color: '#59CAC9', fontSize: 14}}>
                    Ảnh CMND/ Căn cước
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </KeyboardAwareScrollView>
        <FooterButton>
          <Button
            label="Gửi thông tin"
            marginTop={-5}
            onPress={() => this.submit()}
          />
        </FooterButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: 'white',
  },
  txtErrorCode: {
    fontSize: 14,
    color: '#F97C7C',
  },
});

import {Actions} from 'react-native-router-flux';
import Nav from '../../components/Nav';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../../screens/CarInsurance/components/Input';
import InputProvince from '../../components/buy/InputProvince';
import InputDistrict from '../../components/buy/InputDistrict';
import SimpleToast from 'react-native-simple-toast';
import ModalCustom from '../../screens/CarInsurance/components/Modal';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../config/ConfigResponsive';
import InputBeneficiaries from '../../screens/CarInsurance/components/InputBeneficiaries';
import TextField from 'react-native-material-textfield/src/components/field';

const mapStateToProps = state => {};
const mapDispatchToProps = dispatch => {};

export default CarOwnerInfomation;
