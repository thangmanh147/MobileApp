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
import { screen, TxtBlack, Color } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { URL } from '../../../config/System';
import axios from 'axios'
import { connect } from 'react-redux';

class ModalMotorType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: [],
    };
  }

  componentDidMount() {
    let motorType = this.props.motorType
    let url = `${URL}/api/attribute/v1/motor-types?type=vc`
    axios.get(url)
      .then((res) => {
        console.log('======res=====-1', res)
        if (res.status == 200) {
          if (motorType) {
            this.props.setSex(motorType);
          } else {
            let a = res?.data?.data
            a.forEach(i => {
              if (i?.code == '04') {
                this.props.setSex(i);
              }
            })
          }
          this.setState({
            sex: res?.data?.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }



  setSex = data => {
    this.props.setSex(data, 'reset');
    this.props.onClosed();
  };

  render() {
    const { sex } = this.state;
    const { onClosed, open } = this.props;
    return (
      <ModalBox
        isOpen={open}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={false}
        onClosed={onClosed}
        style={css.ctModal}
        coverScreen={true}>
        <View style={{ flex: 1, marginHorizontal: 10, marginTop: 10 }}>
          {sex.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => this.setSex(item)}
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
                <Text>{item.value}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ModalBox>
    );
  }
}
const css = StyleSheet.create({
  ctModal: {
    backgroundColor: '#fff',
    flex: 0.3,
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
  motorType: state?.motorPhysical?.infoMotor?.motorType,
});

export default connect(mapStateToProps)(ModalMotorType);
