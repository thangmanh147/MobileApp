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

class ModalArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: [],
    };
  }

  componentDidMount() {
    const {dataTokenInsur} = this.props;
    new Store().getSession(Const.TOKEN).then(token => {
      let url = `${URL}/api/master-data/v1/nations/list-areas?name=&offset=0&page=1`
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



  setSex = data => {
    this.props.setSex(data);
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
                <Text>{item.name}</Text>
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

const mapStateToProps = (state) => {
  return {
    dataTokenInsur: state.insurance.tokenInsur['T1'],
  };
};

export default connect(mapStateToProps)(ModalArea);
