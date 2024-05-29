'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  BackHandler,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from '../../components/Button';
import {ScaledSheet} from 'react-native-size-matters';
import * as Yup from 'yup';

const screen = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      mobile_device_token: '',
      showSendOtp: false,
      errorMessage: '',
    };
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);    // add disable hardware back button
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress); // remove disable hardware back button
  }
  // disable hardware back button
  handleBackPress = () => {
    if (Actions.currentScene == 'login') {
      return true;
    }
  };
  // press login
  onPressLoginButton = values => {
    let body = {
      username: 'ngoccuong0409',
      password: '123456',
    };
    this.props.onLogin(body);
  };
  validation = Yup.object().shape({
    username: Yup.string().required('Tên đăng nhập không được để trống'),   // validate tài khoản đăng nhập
    password: Yup.string().required('Mật khẩu không được để trống'),    // validate mật khẩu
  });
  render() {
    const {mobile} = this.state;
    const FormikInput = handleTextInput(Input);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {this.props.loading ? <Loading /> : null}
          <StatusBar backgroundColor={Color} barStyle="light-content" />
          <View style={{paddingBottom: 70, marginTop: -200}}>
            {/*<Image*/}
            {/*  source={require('../../icons/iconAgent/ic_appAgent.png')}*/}
            {/*  style={{resize: 'contain'}}*/}
            {/*/>*/}
          </View>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={values => this.onPressLoginButton(values)}
            validationSchema={this.validation}>
            {props => {
              return (
                <View style={styles.containerView}>
                  <Text
                    style={{
                      color: '#333',
                      fontWeight: 'bold',
                      fontSize: 16,
                      textAlign: 'center',
                      marginBottom: 20,
                      marginTop: -20,
                    }}>
                    Đăng nhập
                  </Text>
                  <FormikInput autoCapitalize={'none'} label={'Tài khoản'} name={'username'} />
                  <FormikInput
                    label={'Mật khẩu'}
                    name={'password'}
                    type={'password'}
                  />
                  <Button
                    style={{marginTop: 16}}
                    onPress={props.handleSubmit}
                    label="ĐĂNG NHẬP"
                    width={'100%'}
                  />
                </View>
              );
            }}
          </Formik>
          <View
            style={{flexDirection: 'row', position: 'absolute', bottom: 45}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../icons/iconAgent/ic_phone.png')}
                style={styles.img}
              />
              <Text style={styles.txtText}>Gọi Hotline 1900 232425</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = ScaledSheet.create({
  ctInput: {
    padding: '10@ms',
    backgroundColor: '#f2f2f2',
    borderRadius: '5@ms',
    marginTop: '5@ms',
    height: '45@ms',
  },
  backgroundImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  ctRegister: {
    backgroundColor: '#f0f0f0',
    width: screen.width - '80@ms',
    height: '44@ms',
    borderBottomLeftRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
    marginHorizontal: '5@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerView: {
    padding: '40@ms',
    backgroundColor: '#fff',
    borderRadius: '10@ms',
    width: screen.width - 50,
    shadowOpacity: 0.6,
    height: 'auto',
    shadowRadius: 15,
    shadowColor: '#666',
    shadowOffset: {height: 0, width: 0},
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color,
    position: 'relative',
    justifyContent: 'center',
  },
  forgot: {
    color: '#333',
    textAlign: 'center',
    marginTop: '15@ms',
  },

  title: {
    color: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    color: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    fontSize: 14,
    lineHeight: 25,
  },
  txtText: {
    color: 'white',
    fontSize: 14,
  },
  img: {
    width: '15@ms',
    height: '15@ms',
    marginRight: '10@ms',
  },
  inputContainer: {
    marginTop: 0,
  },
});

import {connect} from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import {Color} from '../../config/System';
import {onLogin} from '../../actions/auth';
import {Formik} from 'formik';
import {handleTextInput} from 'react-native-formik';
import Input from '../../components/auth/Input';
import Loading from '../../components/Loading';
import Nodata from '../../components/Nodata';

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    loginFailMessage: state.auth.loginFailMessage,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogin: body => dispatch(onLogin(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
