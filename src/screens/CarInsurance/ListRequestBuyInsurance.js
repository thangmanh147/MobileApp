'use strict';

import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

const screen = Dimensions.get('window');

class ListRequestBuyInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listContract: [
        {
          icon: require('../../icons/iconAgent/icon_car_right.png'),
          title: 'Bảo hiểm xe CARGO',
          codeRequest: '55335',
          status: 'Đang đợi duyệt hồ sơ',
          statusCode: '1',
        },
        {
          icon: require('../../icons/iconAgent/icon_car_right.png'),
          title: 'Bảo hiểm xe CADENZA',
          codeRequest: '55335',
          status: 'Đã duyệt hồ sơ - Chưa thanh toán',
          statusCode: '2',
        },
      ],
      listFilter: [
        {
          statusFilter: 'Đợi bổ sung thông tin người mua',
        },
        {
          statusFilter: 'Đã duyệt hồ sơ - Chưa thanh toán',
        },
        {
          statusFilter: 'Đang đợi duyệt hồ sơ',
        },
        {
          statusFilter: 'Đang bổ sung hồ sơ',
        },
        {
          statusFilter: 'Yêu cầu bổ sung thông tin',
        },
      ],
      isOpen: null,
    };
  }

  renderContract() {
    return (
      <View>
        {this.state.listContract && this.state.listContract.length > 0
          ? this.state.listContract.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => Actions.CarInsuranceRegisterInfo()}
                  style={{
                    flexDirection: 'row',
                    height: 'auto',
                    marginHorizontal: 30,
                    borderRadius: 10,
                    marginVertical: 10,
                    paddingVertical: 10,
                    backgroundColor: '#ffffff',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                  }}>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderLeftWidth: 1,
                      borderLeftColor: Color,
                    }}>
                    <FastImage
                      source={item.icon}
                      style={{height: 50, width: 50}}
                      resizeMode={'contain'}
                    />
                  </View>
                  <View style={{flex: 5, justifyContent: 'center'}}>
                    <Text style={{fontSize: RFValue(13)}}>{item.title}</Text>
                    <Text
                      style={{
                        fontSize: RFValue(13),
                        marginVertical: 5,
                        color: '#8D8C8D',
                      }}>
                      Mã yêu cầu: {item.codeRequest}
                    </Text>
                    <Text
                      style={{
                        fontSize: RFValue(13),
                        color: item.statusCode == '1' ? '#BE3030' : Color,
                      }}>
                      {item.status}
                    </Text>
                  </View>
                  <View style={{flex: 0.5, justifyContent: 'center'}} />
                </TouchableOpacity>
              );
            })
          : null}
      </View>
    );
  }
  openModalFilter = () => {
    this.setState({
      isOpen: true,
    });
  };
  onCloseModal = () => {
    this.setState({
      isOpen: null,
    });
  };
  render() {
    console.log('listContract', this.state.listContract);
    return (
      <View style={styles.container}>
        <View>
          <Nav
            isInfo={false}
            title={'YÊU CẦU MUA BẢO HIỂM'}
            onPress={() => Actions.pop()}
          />
        </View>

        <ScrollView style={{marginTop: -40}}>
          {this.renderContract()}
        </ScrollView>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ctModal: {
    backgroundColor: '#fff',
    flex: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  searchInput: {
    flex: 0.5,
    marginHorizontal: 30,
  },
  oval: {
    marginTop: '-40@ms',
    alignSelf: 'center',
    width: '105%',
    height: '30%',
    borderRadius: 100,
    backgroundColor: Color,
  },
  containNoBank: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '30@vs',
  },
  ic_bank: {
    height: '70@vs',
    width: '70@s',
  },
  txtNoBank: {
    fontSize: '14@s',
    color: '#A8A8A8',
    paddingVertical: '15@vs',
    textAlign: 'center',
  },
  ic_add_bank: {
    height: '16@vs',
    width: '16@s',
  },
  txtAddBank: {
    fontSize: '14@s',
    color: Color,
    paddingLeft: '5@s',
  },
  containAddBank: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: '20@vs',
  },
  containInformation: {
    marginVertical: 5,
    borderRadius: 15,
    paddingVertical: 10,
    paddingLeft: 15,
    flex: 1,
  },
  ic_arrow: {
    height: '12@vs',
    width: '12@s',
    marginRight: '10@s',
  },
  wrapperInfor: {
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: '15@s',
    shadowOpacity: Platform.OS === 'android' ? 0.6 : 0.2,
    shadowRadius: 10,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  containView: {
    marginHorizontal: '15@s',
    marginTop: 5,
  },
  containSubInfor: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  containFullSubInfor: {
    backgroundColor: '#F4F4F4',
    marginHorizontal: '5@s',
    borderBottomLeftRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
    paddingBottom: '10@ms',
  },
  txtText1: {
    flex: 1,
    lineHeight: 20,
    fontSize: 15,
    color: '#000000',
    fontWeight: '400',
  },
  txtText2: {
    marginHorizontal: '10@s',
  },
  txtTitle: {
    fontSize: '15@s',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: '15@vs',
  },
  ic_search: {
    height: '19@vs',
    width: '19@s',
  },
  txtText: {
    color: '#333',
    fontSize: 14,
  },
  txtTextHotline: {
    color: '#be3030',
    fontSize: '15@ms',
  },

  containSearch: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
});

import SimpleToast from 'react-native-simple-toast';
import Nav from '../../components/Nav';
import Input from '../../components/Input';
import ModalBox from 'react-native-modalbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {Color} from '../../config/System';

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default ListRequestBuyInsurance;
