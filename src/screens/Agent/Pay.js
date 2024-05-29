'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import ModalCancelPayment from '../../components/ModalCancelPayment';
import PayMethodOnline from './PaymentMethod/PayMethodOnline';
import PayMethodSMSEmailQR from './PaymentMethod/PayMethodSMSEmailQR';
import PayMethodCash from './PaymentMethod/PayMethodCash';
import PayMethodBanking from './PaymentMethod/PayMethodBanking';
import { Color, NewColor, URL, TxtColor, nameApp } from '../../config/System';
import { getPaymentMethod } from './actions/payAction';
import {getUserInfo} from '../Account/actions';
import { renderVND } from '../../components/Functions';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import axios from 'axios'
import { callApiContract } from '../../utils/Api'
import { saveCarImage } from '../CarInsurance/actions/car_Buy';
import { saveLogContract } from '../../actions/logContract';
import IconPaySvg from '../../config/images/icons/IconPaySvg';
import IconPayOnlineSvg from '../../config/images/icons/IconPayOnlineSvg';
import IconPayBankingSvg from '../../config/images/icons/IconPayBankingSvg';
import IconPayEmailSvg from '../../config/images/icons/IconPayEmailSvg';
import IconPayMoneySvg from '../../config/images/icons/IconPayMoneySvg';

const screen = Dimensions.get('window');

class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listContract: [],
      methodSelected: {},
      stopPaying: false,
      checkoutUrl: '',
      checkoutCode: '',

      orderInfomation: null,
      orderPrice: 0,
      priceFull: 0,
      promotionId: '',
      orderDescription: '',
      fullName: props.fullNameLog || props.orderInfomation?.buyer?.fullName,
      email: props.emailLog || props.orderInfomation?.buyer?.email,
      phone: props.phoneLog || props.orderInfomation?.buyer?.phone,
      address: props.addressLog || props.orderInfomation?.buyer?.address,
      errFullName: '',
      errEmail: '',
      errPhone: '',
      errAddress: '',
      openSuccessPaymentCash: false, openModal: false,
      modalConfirmCP: false,
      setMerchants: '',
      isReset: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    const { paySuccess, dataTokenInsur } = this.props;
    if (paySuccess === 'Y') {
      this.setState({ openSuccessPaymentCash: true });
    }
    new Store().getSession(Const.URL_ORC).then(urlORC => {
      new Store().getSession(Const.TOKEN).then(token => {
        axios.get(`${urlORC || URL}/api/payment/v1/merchant`, {
          headers: {
            Authorization: dataTokenInsur?.token || token
          }
        })
          .then((res) => {
            if (res.status === 200) {
              this.setState({
                setMerchants: res?.data?.data[0]
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    })

    const { methodInfo, getPaymentMethod, insuranceProductId, dataUser, getUserInfo } = this.props;
    if (!methodInfo || methodInfo.length === 0) {
      getPaymentMethod(insuranceProductId);
    }
    if(!dataUser) {
      getUserInfo();
    }
  }

  createPayment = async (code) => {
    const { idContract, insurProductCode, priceInsur, priceInsurFull } = this.props;
    const { setMerchants, phone, email } = this.state;
    if (insurProductCode === 'C1' || insurProductCode === 'C2' || insurProductCode === 'C3') {
      let url = `${URL}/api/contract/v1/car-contracts/liability/${idContract}`;
      let body = { paymentMethod: code === 'COD' || code === 'CP' || code === 'BANK_TRANSFER' ? code : 'vnpay' };
      console.log('URL-COD', url)
      console.log('BODY-COD', body)
      await new Store().getSession(Const.TOKEN).then(token => {
        fetch(url, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify(body),
        })
          .then(res => {
            if ((res.status >= 200 && res.status < 300)) {
              return res.json().then(data => {
                console.log('RES-COD', data)
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
    }
    if (code === 'COD' || code === 'CP') {
      this.setState({ isLoading: false }, () => {
        if (code === 'CP') {
          this.setState({
            modalConfirmCP: true,
          })
        } else {
          this.setState({
            openSuccessPaymentCash: true,
          })
        }
      })
    } else if (code === 'BANK_TRANSFER') {
      let urlBank = `${URL}/api/payment/v1/payment_order/contract/bank-transfer`;
      const bodyBank = {
        contractId: idContract,
      };
      console.log('URL BANK :: ', urlBank);
      console.log('BODY BANK :: ', bodyBank);
      await new Store().getSession(Const.TOKEN).then(token => {
        fetch(urlBank, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify(bodyBank),
        })
          .then(res => {
            if (res.status == 200) {
              return res.json().then(data => {
                console.log('RES BANK :: ', data);
                this.setState({ isLoading: false }, () => {
                  this.setState({
                    checkoutCode: data?.data?.checkoutCode,
                  });
                })
              });
            } else this.setState({ isLoading: false });
          })
          .catch(error => {
            this.setState({ isLoading: false });
            console.log(error);
          });
      })
    } else {
      let url = `${URL}/api/payment/v1/payment_order/contract`;
      const body = {
        merchantId: setMerchants?._id,
        paymentProvider: 'vnpay',
        contractId: idContract,
        sendSMS: code === 'sms' ? 1 : 0,
        sendEmail: code === 'email' ? 1 : 0,
      };
      console.log('URL--=--==', url)
      console.log('res--=--==--=', body)
      if (code === 'sms') { body.phone = phone }
      else if (code === 'email') { body.email = email }
      await new Store().getSession(Const.TOKEN).then(token => {
        fetch(url, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify(body),
        })
          .then(res => {
            if (res.status == 200) {
              return res.json().then(data => {
                this.setState({ isLoading: false }, () => {
                  if (data?.data?.checkoutUrl && data?.data?.checkoutUrl.length > 0) {
                    if (code === 'qrcode') {
                      this.setState({
                        checkoutUrl: data?.data?.checkoutUrl,
                      });
                    } else {
                      Actions.PaymentView({ url: data?.data?.checkoutUrl, priceInsur, priceInsurFull, insurProductCode: insurProductCode });
                    }
                  } else {
                    this.setState({ openSuccessPaymentCash: true })
                  }
                })
              });
            } else this.setState({ isLoading: false });
          })
          .catch(error => {
            this.setState({ isLoading: false });
            console.log(error);
          });
      })
    }
  };

  createOrder = async (code) => {
    const { insurProductCode, priceInsur, priceInsurFull, paramsContract, dataTokenInsur } = this.props;
    if (insurProductCode === 'C2' && paramsContract.urlTNDS) {
      if (code === 'COD' || code === 'CP' || code === 'BANK_TRANSFER') {
        const { fullName, address, phone } = this.state;
        let body = { ...paramsContract?.body, paymentMethod: code }
        let bodyTNDS = { ...paramsContract?.bodyTNDS, paymentMethod: code }
        if (code === 'COD') {
          body.paymentFullName = fullName;
          body.paymentPhone = phone;
          body.paymentAddress = address;
          bodyTNDS.paymentFullName = fullName;
          bodyTNDS.paymentPhone = phone;
          bodyTNDS.paymentAddress = address;
        }
        let data = await callApiContract({ body: body, url: paramsContract?.url }, insurProductCode === 'C2', null, null, dataTokenInsur?.token)
        let dataTNDS = await callApiContract({ body: bodyTNDS, url: paramsContract?.urlTNDS }, null, null, null, dataTokenInsur?.token)
        if (data?.status == 'success' && dataTNDS?.status == 'success') {
          if (code === 'CP') {
            this.setState({
              modalConfirmCP: true,
              isReset: true,
              isLoading: false
            })
          } else if (code === 'BANK_TRANSFER') {
            let urlBank = `${URL}/api/payment/v1/payment_order/contract/bank-transfer`;
            const bodyBank = {
              contractId: `${data.data.contractId?.toString()},${dataTNDS.data.id?.toString()}`,
            };
            console.log('URL BANK :: ', urlBank);
            console.log('BODY BANK :: ', bodyBank);
            new Store().getSession(Const.TOKEN).then(token => {
              fetch(urlBank, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: dataTokenInsur?.token || token
                },
                body: JSON.stringify(bodyBank),
              })
                .then(res => {
                  if (res.status == 200) {
                    return res.json().then(data => {
                      console.log('RES BANK :: ', data);
                      this.setState({ isLoading: false }, () => {
                        this.setState({
                          checkoutCode: data?.data?.checkoutCode,
                          isReset: true
                        });
                      })
                    });
                  } else this.setState({ isLoading: false });
                })
                .catch(error => {
                  this.setState({ isLoading: false });
                  console.log(error);
                });
            })
          } else {
            this.setState({
              openSuccessPaymentCash: true,
              isReset: true,
              isLoading: false
            })
          }
        } else {
          this.setState({ isLoading: false });
        }
      } else {
        const { email, phone, setMerchants } = this.state;
        let body = { ...paramsContract?.body, paymentMethod: 'vnpay' }
        let bodyTNDS = { ...paramsContract?.bodyTNDS, paymentMethod: 'vnpay' }
        let data = await callApiContract({ body: body, url: paramsContract?.url }, insurProductCode === 'C2', null, null, dataTokenInsur?.token)
        let dataTNDS = await callApiContract({ body: bodyTNDS, url: paramsContract?.urlTNDS }, null, null, null, dataTokenInsur?.token)
        if (data?.status == 'success' && dataTNDS?.status == 'success') {
          let url = `${URL}/api/payment/v1/payment_order/contract`;
          const bodyVNPay = {
            merchantId: setMerchants?._id,
            paymentProvider: 'vnpay',
            contractId: `${data.data.contractId?.toString()},${dataTNDS.data.id?.toString()}`,
            sendSMS: code === 'sms' ? 1 : 0,
            sendEmail: code === 'email' ? 1 : 0,
          };
          if (code === 'sms') { bodyVNPay.phone = phone }
          else if (code === 'email') { bodyVNPay.email = email }
          new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                Authorization: dataTokenInsur?.token || token
              },
              body: JSON.stringify(bodyVNPay),
            })
              .then(res => {
                if (res.status == 200) {
                  return res.json().then(data => {
                    this.setState({ isLoading: false }, () => {
                      if (data?.data?.checkoutUrl && data?.data?.checkoutUrl.length > 0) {
                        if (code === 'qrcode') {
                          this.setState({
                            checkoutUrl: data?.data?.checkoutUrl,
                            isReset: true
                          });
                        } else {
                          this.setState({ isReset: true }, () => {
                            Actions.PaymentView({ url: data?.data?.checkoutUrl, priceInsur, priceInsurFull, insurProductCode: insurProductCode });
                          });
                        }
                      } else if (code === 'sms' || code === 'email') {
                        this.setState({ openSuccessPaymentCash: true, isReset: true })
                      }
                    })
                  });
                } else this.setState({ isLoading: false });
              })
              .catch(error => {
                this.setState({ isLoading: false });
                console.log(error);
              });
          })
        } else {
          this.setState({ isLoading: false });
        }
      }
    } else {
      if (code === 'COD' || code === 'CP' || code === 'BANK_TRANSFER') {
        const { fullName, address, phone } = this.state;
        let body = { ...paramsContract?.body, paymentMethod: code }
        if (code === 'COD') {
          body.paymentFullName = fullName;
          body.paymentPhone = phone;
          body.paymentAddress = address;
        }
        let data = await callApiContract({ body: body, url: paramsContract?.url }, insurProductCode === 'C2', null, null, dataTokenInsur?.token)
        if (data?.status == 'success') {
          if (code === 'CP') {
            this.setState({
              modalConfirmCP: true,
              isReset: true,
              isLoading: false,
            })
          } else if (code === 'BANK_TRANSFER') {
            let urlBank = `${URL}/api/payment/v1/payment_order/contract/bank-transfer`;
            const bodyBank = {
              contractId: data.data.id?.toString() || data.data.contractId?.toString() || data.data?.map(item => item?.id)?.toString(),
            };
            console.log('URL BANK :: ', urlBank);
            console.log('BODY BANK :: ', bodyBank);
            new Store().getSession(Const.TOKEN).then(token => {
              fetch(urlBank, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: dataTokenInsur?.token || token
                },
                body: JSON.stringify(bodyBank),
              })
                .then(res => {
                  if (res.status == 200) {
                    return res.json().then(data => {
                      console.log('RES BANK :: ', data);
                      this.setState({ isLoading: false }, () => {
                        this.setState({
                          checkoutCode: data?.data?.checkoutCode,
                          isReset: true
                        });
                      })
                    });
                  } else this.setState({ isLoading: false });
                })
                .catch(error => {
                  this.setState({ isLoading: false });
                  console.log(error);
                });
            })
          } else {
            this.setState({
              openSuccessPaymentCash: true,
              isReset: true,
              isLoading: false,
            })
          }
        } else {
          this.setState({ isLoading: false });
        }
      } else {
        const { email, phone, setMerchants } = this.state;
        let body = { ...paramsContract?.body, paymentMethod: 'vnpay' }
        let data = await callApiContract({ body: body, url: paramsContract?.url }, insurProductCode === 'C2', null, null, dataTokenInsur?.token)
        if (data?.status == 'success') {
          let url = `${URL}/api/payment/v1/payment_order/contract`;
          const bodyVNPay = {
            merchantId: setMerchants?._id,
            paymentProvider: 'vnpay',
            contractId: data.data.id?.toString() || data.data.contractId?.toString() || data.data?.map(item => item?.id)?.toString(),
            sendSMS: code === 'sms' ? 1 : 0,
            sendEmail: code === 'email' ? 1 : 0,
          };
          if (code === 'sms') { bodyVNPay.phone = phone }
          else if (code === 'email') { bodyVNPay.email = email }
          console.log('URL VNPay :: ', url)
          console.log('BODY VNPay :: ', bodyVNPay)
          new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                Authorization: dataTokenInsur?.token || token
              },
              body: JSON.stringify(bodyVNPay),
            })
              .then(res => {
                if (res.status == 200) {
                  return res.json().then(data => {
                    this.setState({ isLoading: false }, () => {
                      if (data?.data?.checkoutUrl && data?.data?.checkoutUrl.length > 0) {
                        if (code === 'qrcode') {
                          this.setState({
                            checkoutUrl: data?.data?.checkoutUrl,
                            isReset: true
                          });
                        } else {
                          this.setState({ isReset: true }, () => {
                            Actions.PaymentView({ url: data?.data?.checkoutUrl, priceInsur, priceInsurFull, insurProductCode: insurProductCode });
                          });
                        }
                      } else if (code === 'sms' || code === 'email') {
                        this.setState({ openSuccessPaymentCash: true, isReset: true })
                      }
                    })
                  });
                } else this.setState({ isLoading: false });
              })
              .catch(error => {
                this.setState({ isLoading: false });
                console.log(error);
              });
          })
        } else {
          this.setState({ isLoading: false });
        }
      }
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (
      nextProps.orderInfomation &&
      nextProps.orderInfomation !== prevState.orderInfomation
    ) {
      (update.orderPrice = nextProps.orderInfomation.orderPrice);
      (update.priceFull = nextProps.orderInfomation.priceFull);
      (update.promotionId = nextProps.orderInfomation.promotionId);
      (update.orderDescription = nextProps.orderInfomation.orderDescription);
      // (update.fullName = nextProps.orderInfomation.buyer.fullName),
      // (update.email = nextProps.orderInfomation.buyer.email),
      // (update.phone = nextProps.orderInfomation.buyer.phone);
      // update.address = nextProps.orderInfomation.buyer.address
    }
    if (
      nextProps.methodInfo &&
      nextProps.methodInfo !== prevState.listContract
    ) {
      update.listContract = nextProps.methodInfo;
      // update.listContract = nextProps.methodInfo.concat([{code: 'CASH', name: 'Thanh toán trực tiếp', items: [{code: 'CP', name: 'Tiền mặt'}]}]);
    }
    return update;
  }
  goBackHome = () => {
    const { isReset } = this.state;
    this.setState({ stopPaying: false, openSuccessPaymentCash: false })
    if (isReset) {
      this.resetContract();
    }
    if (nameApp.includes('IAGENT') || nameApp.includes('INSO')) {
      Actions.tab();
    } else {
      Actions.InsuranceType();
    }
  }

  resetContract = () => {
    const {
      insurProductCode,
      saveLogContract,
      onResetDataMotor,
      onResetMotorPhysical,
      onResetAccident,
      onReset24h,
      onResetACare,
      onResetCar,
      onResetCarPhysical,
      saveCarImage,
      onResetHouse,
      onResetTravel,
      onResetDelayFlight,
      onResetVTA,
      setPromotionPriceDefault,
      updatePromotionId
    } = this.props;
    const {promotionId} = this.state;
    setPromotionPriceDefault(insurProductCode, null);
    if (insurProductCode === 'M1' || insurProductCode === 'M2') {
      if (promotionId) {
        updatePromotionId(promotionId);
      }
      saveLogContract('M1', null);
      onResetDataMotor();
    } else if (insurProductCode === 'M3') {
      onResetMotorPhysical();
    } else if (insurProductCode === 'A1' || insurProductCode === 'A2') {
      onResetAccident();
    } else if (insurProductCode === 'A3') {
      saveLogContract('A3', null);
      onReset24h();
    } else if (insurProductCode === 'C1' || insurProductCode === 'C3') {
      saveLogContract('C1', null);
      onResetCar();
    } else if (insurProductCode === 'C2') {
      saveLogContract('C2', null);
      saveCarImage({ name: 'IMG_RESET' });
      onResetCarPhysical();
    } else if (insurProductCode === 'H1') {
      onResetHouse();
    } else if (insurProductCode === 'T1' || insurProductCode === 'T2') {
      onResetTravel();
    } else if (insurProductCode === 'DF1') {
      onResetDelayFlight();
    } else if (insurProductCode === 'A4') {
      saveLogContract('A4', null);
      onResetVTA();
    } else if (insurProductCode === 'A8') {
      saveLogContract('A8', null);
      onResetVTA();
    } else if (insurProductCode === 'HC10') {
      onResetACare();
    }
  };

  paymentCash = () => {
    this.setState({ isLoading: false }, () => {
      this.resetContract();
      if (nameApp.includes('IAGENT') || nameApp.includes('INSO')) {
        Actions.tab();
      } else {
        Actions.InsuranceType();
      }
    })
  }

  gotoLogin = () => {
    this.setState({
      openModal: false
    })
    new Store().storeSession(Const.TOKEN, null)
    new Store().storeSession(Const.IS_LOGIN, null)
    new Store().storeSession(Const.PASS_WORD, null)
    new Store().storeSession(Const.URL_ORC, null);
    this.props.onLogout();
    Actions.LoginNew()
  }

  renderImage = (code, isSelected) => {
    switch (code) {
      case 'ONLINE':
        return <IconPayOnlineSvg width={32} height={32} color={isSelected ? '#fff' : Color} />;
      case 'EMAIL_SMS_QRCODE':
        return <IconPayEmailSvg width={32} height={32} color={isSelected ? '#fff' : Color} />;
      case 'CASH':
        return <IconPayMoneySvg width={32} height={32} color={isSelected ? '#fff' : Color} />;
      case 'BANK_TRANSFER':
        return <IconPayBankingSvg width={32} height={32} color={isSelected ? '#fff' : Color} />;
      default:
        return <IconPayOnlineSvg width={32} height={32} color={isSelected ? '#fff' : Color} />;
    }
  };

  onChangeMethod = (method) => {
    const { priceInsur } = this.props;
    const { methodSelected, checkoutUrl } = this.state;
    methodSelected.method = method;
    this.setState({ methodSelected: methodSelected });
    if (method === 'qrcode' && checkoutUrl.length === 0) {
      if (priceInsur) {
        this.createPayment('qrcode');
      } else {
        this.createOrder('qrcode');
      }
    } else if (method === 'BANK_TRANSFER') {
      this.setState({isLoading: true}, () => {
        if (priceInsur) {
          this.createPayment('BANK_TRANSFER');
        } else {
          this.createOrder('BANK_TRANSFER');
        }
      })
    }
  }

  onChangeFullName = (value, err) => {
    this.setState({ fullName: value, errFullName: err });
  }

  onChangePhone = (value, err) => {
    this.setState({ phone: value, errPhone: err });
  }

  onChangeAddress = (value, err) => {
    this.setState({ address: value, errAddress: err });
  }

  onChangeEmail = (value, err) => {
    this.setState({ email: value, errEmail: err });
  }

  checkValid = () => {
    const { fullName, email, phone, address, errFullName, errEmail, errPhone, errAddress, methodSelected } = this.state;
    if (methodSelected.method === 'COD') {
      if (
        fullName.length === 0 || errFullName.length > 0 ||
        phone.length === 0 || errPhone.length > 0 ||
        address.length === 0 || errAddress.length > 0
      ) {
        return false;
      } else return true;
    } if (methodSelected.method === 'sms') {
      if (phone.length === 0 || errPhone.length > 0) {
        return false;
      } else return true;
    } if (methodSelected.method === 'email') {
      if (email.length === 0 || errEmail.length > 0) {
        return false;
      } else return true;
    } else return true;
  }

  renderDetail = detail => {
    const { insuranceProductId, priceInsur, priceInsurFull, dataProfile, orgCodeUser } = this.props;
    const { fullName, email, phone, address, orderPrice, priceFull, checkoutUrl, checkoutCode } = this.state;
    switch (detail.code) {
      case 'ONLINE':
        return <PayMethodOnline items={detail.items} />;
      case 'EMAIL_SMS_QRCODE':
        return <PayMethodSMSEmailQR
          items={detail.items}
          phone={phone}
          email={email}
          checkoutUrl={checkoutUrl}
          onChangeMethod={this.onChangeMethod}
          onChangePhone={this.onChangePhone}
          onChangeEmail={this.onChangeEmail}
        />;
      case 'CASH':
        return <PayMethodCash
          items={detail.items}
          phone={phone}
          address={address}
          fullName={fullName}
          orderPrice={(dataProfile?.status === 'approved' || nameApp.includes('MAILINH') || nameApp.includes('YCHI') || orgCodeUser === 'INSO' || orgCodeUser === 'DLJSC') ? Math.round(priceInsur || orderPrice) : (priceInsurFull || priceFull)}
          onChangeMethod={this.onChangeMethod}
          onChangeFullName={this.onChangeFullName}
          onChangePhone={this.onChangePhone}
          onChangeAddress={this.onChangeAddress}
        />;
      case 'BANK_TRANSFER':
        return <PayMethodBanking
          orderPrice={(dataProfile?.status === 'approved' || nameApp.includes('MAILINH') || nameApp.includes('YCHI') || orgCodeUser === 'INSO' || orgCodeUser === 'DLJSC') ? Math.round(priceInsur || orderPrice) : (priceInsurFull || priceFull)}
          insuranceProductId={insuranceProductId}
          onChangeMethod={this.onChangeMethod}
          checkoutCode={checkoutCode}
        />;
    }
  };

  onSelect = (value) => {
    let obj = {};
    if (value === 'ONLINE') {
      obj.method = 'ONLINE';
    }
    obj.code = value;
    this.setState({ methodSelected: obj });
  };
  renderContract() {
    const { methodSelected, listContract } = this.state;
    return (
      <View>
        {listContract && listContract.length > 0
          ? listContract.map((item, index) => {
            return (
              <>
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'row',
                    height: 'auto',
                    marginHorizontal: 20,
                    // borderLeftWidth: 1.5,
                    // borderLeftColor: methodSelected.code === item.code ? NewColor : Color,
                    alignItems: 'center',
                    borderRadius: 10,
                    marginVertical: 10,
                    paddingVertical: 7,
                    backgroundColor: methodSelected.code === item.code ? NewColor : '#ffffff',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                  }}
                  onPress={() => this.onSelect(methodSelected.code === item.code ? '' : item.code)}>
                  {
                    methodSelected.code !== item.code ? (
                      <View width={1} height={'100%'} backgroundColor={Color} />
                    ) : null
                  }
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                    <View style={{ marginHorizontal: 20 }}>
                      {this.renderImage(item.code, methodSelected.code === item.code)}
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        marginRight: 20,
                        color: methodSelected.code === item.code ? 'white' : TxtColor,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                {
                  methodSelected.code === item.code ? this.renderDetail(item) : null
                }
              </>
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
    const { priceInsur, priceInsurFull, dataProfile, orgCodeUser } = this.props;
    const {
      methodSelected,
      orderPrice,
      priceFull,
      openSuccessPaymentCash,
      modalConfirmCP,
      isLoading,
    } = this.state;
    let labelButton;
    if (methodSelected.code === 'ONLINE' || methodSelected.method === 'CP') {
      labelButton = 'TIẾP TỤC';
    } else labelButton = 'XÁC NHẬN';
    return (
      <View style={styles.container}>
        <Nav
          isInfo={false}
          title={'THANH TOÁN'}
          onPress={() => {
            if (priceInsur) {
              Actions.pop();
            } else {
              this.setState({ stopPaying: true });
            }
          }}
          bottom={20}
        />
        <View
          style={{ flexDirection: 'row', marginHorizontal: 20, }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              marginTop: -35,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
              flexDirection: 'row',
            }}>
            <View style={{ justifyContent: 'center' }}>
              <IconPaySvg width={50} height={50} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Text style={{ color: '#414042', fontSize: 14 }}>
                Số tiền thanh toán
              </Text>
              <Text
                style={{ color: '#414042', fontWeight: 'bold', fontSize: 18 }}>
                {renderVND((dataProfile?.status === 'approved' || nameApp.includes('MAILINH') || nameApp.includes('YCHI') || orgCodeUser === 'INSO' || orgCodeUser === 'DLJSC') ? Math.round(priceInsur || orderPrice) : (priceInsurFull || priceFull))}VNĐ
              </Text>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }}>
          <Text style={{ fontWeight: '700', fontSize: 16, color: '#414042' }}>
            Chọn phương thức thanh toán
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {this.renderContract()}
        </ScrollView>
        <Popup
          open={modalConfirmCP}
          onClosed={() => this.setState({ modalConfirmCP: false })}
          onOpened={() => this.setState({ modalConfirmCP: true })}
          onPress={() => {
            this.setState({ modalConfirmCP: false, openSuccessPaymentCash: true })
          }}
          onPressButtonNo={() => this.setState({ modalConfirmCP: false })}
          label={'XÁC NHẬN'}
          label2={'HỦY'}
          content={'Bạn đã nhận đủ số tiền'}
          content1={` ${renderVND((dataProfile?.status === 'approved' || nameApp.includes('MAILINH') || nameApp.includes('YCHI') || orgCodeUser === 'INSO' || orgCodeUser === 'DLJSC') ? Math.round(priceInsur || orderPrice) : (priceInsurFull || priceFull))}VNĐ`}
          content2={' từ khách hàng?'}
        />
        <Popup
          open={openSuccessPaymentCash}
          onClosed={() => { }}
          onOpened={() => this.setState({ openSuccessPaymentCash: true })}
          label={'XÁC NHẬN'}
          onPress={() => this.paymentCash()}
          // onPressButtonNo={() => this.setState({stopPaying: false})}
          // label2={'HỦY'}
          content={'Hệ thống đã ghi nhận hợp đồng của bạn. Ấn chỉ sẽ được gửi qua email hoặc theo địa chỉ bạn đã khai báo.'}
        />
        <ModalCancelPayment
          open={this.state.stopPaying}
          button={true}
          forceUpdate={true}
          onPress={() => this.goBackHome()}
          label={'VỀ TRANG CHỦ'}
          label2={'KHÔNG'}
          text="Bạn có chắc chắn muốn dừng thanh toán không?"
          onPressButtonNo={() => this.setState({ stopPaying: false })}
        />
        <FooterButton >
          <Button
            disabled={
              (!methodSelected.code || methodSelected.code.length === 0) ||
              (!methodSelected.method || methodSelected.method.length === 0) ||
              !this.checkValid()
            }
            label={labelButton}
            marginTop={10}
            marginBottom={10}
            onPress={() => {
              this.setState({ isLoading: true }, () => {
                if (priceInsur && methodSelected.method !== 'BANK_TRANSFER' && methodSelected.method !== 'qrcode') {
                  this.createPayment(methodSelected.method);
                } else {
                  (methodSelected.method === 'BANK_TRANSFER' || methodSelected.method === 'qrcode') ? this.paymentCash() : this.createOrder(methodSelected.method)
                }
              });
            }}
          />
        </FooterButton>
        <BaseModal
          open={this.state.openModal}
          forceUpdate={true}
          onPress={() => this.gotoLogin()}
          label={'ĐỒNG Ý'}
          text="Phiên bản đăng nhập đã hết hạn. Mời bạn đăng nhập lại."
        />
        {
          isLoading ? (
            <View style={{
              flex: 1,
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: '#e8e8e8',
              justifyContent: 'center',
              opacity: 0.3,
              zIndex: 2200,
            }}>
              <ActivityIndicator
                size="large"
                color={Color}
              />
            </View>
          ) : null
        }
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

import Nav from '../../components/Nav';
import { connect } from 'react-redux';
import Popup from './Popup';
import BaseModal from '../../components/BaseModal';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { setPromotionPriceSuccess, updatePromotionId } from '../../components/promotion/actions/promotion';

const mapStateToProps = (state, ownProps) => {
  const insuranceInfo = state.insurance.insuranceInfo;
  const obj = insuranceInfo && insuranceInfo.find(item => item.code === ownProps.insurProductCode);
  const insuranceProductId = obj ? obj.insurance_product_id : '';
  const dataUser = state.userInfo.userInfo;
  const methods = state.paymentMethod.paymentMethodInfo[insuranceProductId];
  console.log('METHODS PAY ::', methods);
  return {
    insuranceProductId,
    orderInfomation: state.buy.orderInfomation,
    paramsContract: state?.paramsContract?.paramsContract,
    methodInfo: methods,
    contractCarId: state?.carPhysical?.contractCarId,
    dataUser,
    dataProfile: state.userInfo.profileInfo,
    orgCodeUser: state.userInfo.orgCodeUser,
    dataTokenInsur: state.insurance.tokenInsur[ownProps.codeInsur],
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveCarImage: body => dispatch(saveCarImage(body)),
    getPaymentMethod: (id) => dispatch(getPaymentMethod(id)),
    setPromotionPriceDefault: (id, obj) => dispatch(setPromotionPriceSuccess(id, obj)),
    updatePromotionId: (id) => dispatch(updatePromotionId(id)),
    saveLogContract: (id, data) => dispatch(saveLogContract(id, data)),
    onLogout: () => dispatch({ type: 'RESET_STORE' }),
    onResetDataMotor: () => dispatch({ type: 'RESET_DATA_MOTOR' }),
    onResetMotorPhysical: () => dispatch({ type: 'RESET_DATA_MOTOR_PHYSICAL' }),
    onResetAccident: () => dispatch({ type: 'RESET_DATA_ACCIDENT' }),
    onReset24h: () => dispatch({ type: 'RESET_DATA_24H' }),
    onResetACare: () => dispatch({ type: 'RESET_DATA_ACARE' }),
    onResetCar: () => dispatch({ type: 'RESET_DATA_CAR' }),
    onResetCarPhysical: () => dispatch({ type: 'RESET_DATA_CAR_PHYSICAL' }),
    onResetHouse: () => dispatch({ type: 'RESET_DATA_HOUSE' }),
    onResetTravel: () => dispatch({ type: 'RESET_DATA_TRAVEL' }),
    onResetDelayFlight: () => dispatch({ type: 'RESET_DATA_DELAY_FLIGHT' }),
    onResetVTA: () => dispatch({ type: 'RESET_DATA_VTA' }),
    getUserInfo: () => dispatch(getUserInfo()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pay);
