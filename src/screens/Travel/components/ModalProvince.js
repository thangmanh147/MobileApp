import React from 'react';
import { connect } from 'react-redux';
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
import { URL } from '../../../config/System';
import axios from 'axios'
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import IconSearchSvg from '../../../config/images/icons/IconSearchSvg';

class ModalProvince extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: [],
      newText: '',
    };
  }

  componentDidMount() {
    const {dataTokenInsur} = this.props;
    new Store().getSession(Const.TOKEN).then(token => {
      let url = `${URL}/api/master-data/v1/provinces?limit=100`
      axios.get(url, {
        headers: {
          Authorization: dataTokenInsur?.token || token
        }
      })
        .then((res) => {
          if (res.status == 200) {
            this.setState({
              sex: res?.data?.data
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    });
  }

  onChangeText = (text) => {
    this.setState({ newText: text });
  }

  setSex = data => {
    this.props.setSex(data);
    this.props.onClosed();
  };

  render() {
    const { sex, newText } = this.state;
    const { onClosed, open } = this.props;
    const arr = sex?.filter(item => item?._name?.toUpperCase().indexOf(newText.toUpperCase()) > -1)
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
          <View style={css.ctInput}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <IconSearchSvg width={18} height={18} />
            </View>
            <TextInput
              placeholder='Tìm tên tỉnh/thành phố'
              placeholderTextColor={'#8D8C8D'}
              value={newText}
              onChangeText={text => this.onChangeText(text)}
              style={{
                height: 40,
                marginLeft: 10,
                flex: 1,
                padding: 0
              }}
            />
          </View>
          <ScrollView>
            {arr.map((item, index) => {
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
                  <Text>{item._name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ModalBox>
    );
  }
}
const css = StyleSheet.create({
  ctModal: {
    backgroundColor: '#fff',
    flex: 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ctInput: {
    borderBottomWidth: 1,
    borderColor: Color,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
});

const mapStateToProps = (state) => {
  return {
    dataTokenInsur: state.insurance.tokenInsur['T1'],
  };
};

export default connect(mapStateToProps)(ModalProvince);
