import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Css from '../../config/Css';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import Modal from 'react-native-modalbox';
import Drawer from 'react-native-drawer';
import Information from '../../components/Information';
import ItemRequirement from '../../screens/CarInsurance/components/ItemRequirement';

class CarInfomation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      price: '',
      price_suggest: '',
      profile_id: null,
      checkPolicy: true,
      data: [
        {
          name: 'Chụp hình xe của bạn',
          code: 'FORM_IMAGE_CAR',
          // check đủ ảnh yêu cầu chưa
          validate:
            this.props.arrayCarImg[0].behindExtraSeat ==
              'https://vj-claim.s3.amazonaws.com/TUNQFv9x-Vector.png' ||
            this.props.arrayCarImg[0].extraSeat ==
              'https://vj-claim.s3.amazonaws.com/TUNQFv9x-Vector.png' ||
            this.props.arrayCarImg[0].behindDriverSeat ==
              'https://vj-claim.s3.amazonaws.com/TUNQFv9x-Vector.png' ||
            this.props.arrayCarImg[0].driverSeat ==
              'https://vj-claim.s3.amazonaws.com/TUNQFv9x-Vector.png' ||
            this.props.arrayCarImg[0].registrationStamp ==
              'https://vj-claim.s3.amazonaws.com/TUNQFv9x-Vector.png'
              ? false
              : true,
        },
        {
          name: 'Chụp ảnh giấy đăng kiểm xe',
          code: 'FORM_CERTIFICATE_CAR',
          validate: this.props.imageCarCertificate == null ? false : true,
        },
        {
          name: 'Chụp ảnh đăng ký xe',
          code: 'FORM_REGISTRATION_CERTIFICATE_CAR',
          validate:
            this.props.imageCarRegistrationCertificate == null ? false : true,
        },
      ],
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    return false;
  };

  render() {
    const {open} = this.state;
    return (
      <Drawer
        openDrawerOffset={80}
        tapToClose={true}
        side={'right'}
        tweenHandler={ratio => ({
          main: {opacity: (2 - ratio) / 2, backgroundColor: 'black'},
        })}
        ref={ref => (this._drawer = ref)}
        content={<Information />}>
        <View style={Css.container}>
          <Nav
            show={true}
            isInfo={false}
            title={'GIẤY TỜ CẦN CHỤP'}
            bottom={20}
            onPress={() => Actions.pop()}
          />
          <ScrollView style={{}}>
            <View style={{flex: 1, padding: 20, paddingTop: 0}}>
              <View style={{paddingVertical: 10}}>
                {this.state.data
                  ? this.state.data.map((item, index) => {
                      return <ItemRequirement data={item} key={index} />;
                    })
                  : null}
              </View>
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => Actions.ListRequestBuyInsurance()}>
                <Text style={{fontSize: 14, color: Color}}>
                  Bỏ qua bước chụp hình xe
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Modal
            isOpen={open}
            entry={'top'}
            onClosed={() => this.setState({open: false})}
            style={{
              backgroundColor: 'ababab',
              width: screen.width - 80,
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                paddingBottom: 20,
              }}>
              <Text style={{color: TxtBlack, fontSize: 20, marginVertical: 10}}>
                Thông báo
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  lineHeight: 20,
                  fontSize: 16,
                  marginLeft: 30,
                  marginRight: 30,
                  color: '#666',
                  marginTop: 5,
                }}>
                Giá trị bồi thường tối đa mà
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  lineHeight: 20,
                  fontSize: 16,
                  marginLeft: 30,
                  marginRight: 30,
                  color: '#666',
                  marginTop: 5,
                }}>
                bạn được nhận
              </Text>
              <Button
                label={'Đồng ý'}
                width={screen.width / 2}
                marginTop={20}
                borderRadius={30}
              />
              <ButtonNotColor
                label="Không đồng ý"
                backgroundColor={'#ccc'}
                width={screen.width / 2}
                borderRadius={30}
                color="#fff"
                onPress={() => this.setState({open: false})}
              />
            </View>
          </Modal>
        </View>
        <FooterButton>
          <Button
            label={'TIẾP THEO'}
            onPress={() => Actions.ListRequestBuyInsurance()}
          />
        </FooterButton>
      </Drawer>
    );
  }
}
const css = StyleSheet.create({
  intro: {
    color: TxtBlack,
    marginBottom: 10,
    fontSize: 16,
  },
  value: {
    color: TxtBlack,
    flex: 1,
  },
  title: {
    color: '#999999',
    flex: 1.2,
  },
  ctItem: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  ct: {
    backgroundColor: '#fff',
    // height: 280,
    width: screen.width - 40,
    padding: 30,
    paddingTop: 20,
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius: 20,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 6,
  },

  ctCheck: {
    height: 20,
    width: 20,
    marginRight: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtActive: {
    color: '#333333',
  },
});
import {connect} from 'react-redux';
import {Color, screen, TxtBlack} from '../../config/System';
import ButtonNotColor from '../../components/ButtonNoColor';
import {Actions} from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';

const mapStateToProps = state => {
  return {
    imageCarCertificate: state.carBuy.imageCarCertificate,
    imageCarRegistrationCertificate:
      state.carBuy.imageCarRegistrationCertificate,
    arrayCarImg: state.carBuy.arrayCarImg,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarInfomation);
