import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { screen, TxtBlack, Color, TxtColor } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { URL } from '../../../config/System';
import axios from 'axios'
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import { connect } from 'react-redux';
import { saveFeeMotor, saveMotorType } from '../actions/motorActions';
import FastImage from 'react-native-fast-image';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

class ModalMotorType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: [],
    };
  }

  componentWillMount() {
    const { codeSelected, motorType, setSex, dataTokenInsur } = this.props;
    if (codeSelected === 'VNI') {
      new Store().getSession(Const.TOKEN).then(token => {
        let url = `${URL}/api/contract/v1/vni/get-motor-category`
        axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': dataTokenInsur?.token || token,
          }
        })
          .then((res) => {
            if (res.status == 200) {
              this.setState({
                sex: res?.data,
              }, () => {
                if (motorType) {
                  setSex(motorType);
                } else {
                  let a = res?.data;
                  setSex(a.find(i => i.code === 'MOTO2_O50'));
                }
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    } else {
      let url = `${URL}/api/attribute/v1/motor-types`
      axios.get(url)
        .then((res) => {
          if (res.status == 200) {
            this.setState({
              sex: res?.data?.data,
            }, () => {
              if (motorType) {
                setSex(motorType);
              } else {
                let a = res?.data?.data
                setSex(a.find(i => i.code === '02'));
              }
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    const { codeSelected } = this.props;
    if (codeSelected !== prevProps.codeSelected) {
      this.getTypes();
    }
  }

  getTypes = () => {
    const { codeSelected, setSex, dataTokenInsur } = this.props;
    if (codeSelected === 'VNI') {
      new Store().getSession(Const.TOKEN).then(token => {
        let url = `${URL}/api/contract/v1/vni/get-motor-category`
        axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': dataTokenInsur?.token || token,
          }
        })
          .then((res) => {
            if (res.status == 200) {
              let a = res?.data;
              setSex(a.find(i => i.code === 'MOTO2_O50'));
              this.setState({
                sex: res?.data,
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    } else {
      let url = `${URL}/api/attribute/v1/motor-types`
      axios.get(url)
        .then((res) => {
          if (res.status == 200) {
            let a = res?.data?.data
            this.props.setSex(a.find(i => i.code === '02'));
            this.setState({
              sex: res?.data?.data
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  setSex = data => {
    this.props.setSex(data);
    this.props.onClosed();
  };

  render() {
    const { sex } = this.state;
    const { onClosed, open, nameSelected } = this.props;
    return (
      <ModalBox
        isOpen={open}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={false}
        onClosed={onClosed}
        style={css.ctModal}
        coverScreen={true}>
        <View style={{ flex: 1 }}>
          <View style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 16,
            paddingHorizontal: 24,
            backgroundColor: '#F6F5F6'
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Loại xe</Text>
          </View>
          <ScrollView>
            <View style={{ marginTop: 8, paddingHorizontal: 24 }}>
              {sex.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.setSex(item)}
                    style={{
                      flexDirection: 'row',
                      borderBottomWidth: index === sex.length - 1 ? 0 : 1,
                      borderTopWidth: 0,
                      borderColor: '#F6F5F6',
                      alignItems: 'center',
                      paddingVertical: 8
                    }}>
                    {
                      nameSelected === (item.value || item.name) ? (
                        <IconRadioBtnActiveSvg width={15} height={15} />
                      ) : (
                        <IconRadioBtnSvg width={15} height={15} />
                      )
                    }
                    <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor }}>{item.value || item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ModalBox>
    );
  }
}
const css = StyleSheet.create({
  ctModal: {
    backgroundColor: '#fff',
    flex: 0.4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ctInput: {
    borderBottomWidth: 1,
    borderColor: Color,
    marginHorizontal: 25,
    flexDirection: 'row',
  },
});

const mapStateToProps = state => ({
  motorType: state?.motor?.infoMotor?.motorType,
  dataTokenInsur: state.insurance.tokenInsur['M1'],
});

export default connect(mapStateToProps, {
  saveMotorType, saveFeeMotor
})(ModalMotorType);
