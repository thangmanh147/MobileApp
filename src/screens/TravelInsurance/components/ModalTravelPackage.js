import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import {screen, TxtBlack, Color} from '../../../config/System';
import FastImage from 'react-native-fast-image';
import {URL} from '../../../config/System';

class ModalTravelPackage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listPackages: null,
      fullData: null,
      filteredData: null,
      package: null,
    };
  }
  componentDidMount() {
    this.getData();
    console.log(this.props.listPackages);
  }
  getData = () => {
    if (this.props.insuredType == 1) {
      this.getNationalPack();
    } else {
      this.getInternationalPack();
    }
  };
  getNationalPack = () => {
    let url = `${URL}/api/contract/v1/insurance-packages?type=TRAVEL`;
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res.json().then(response => {
            this.setState({fullData: response?.data});
            this.filterData();
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  getInternationalPack = () => {
    let url = `${URL}/api/contract/v1/insurance-packages?type=TRAVEL_INTERNATIONAL`;
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res.json().then(response => {
            this.setState({fullData: response?.data});
            this.filterData();
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  filterData = () => {
    const {fullData} = this.state;
    if (this.props.insuredType == 1) {
      const filteredData = fullData.filter(
        e => e.subType == this.props.listPackages,
      );
      filteredData.sort((a, b) => b.priority - a.priority);
      this.setState({filteredData: filteredData});
    } else {
      const filteredData = fullData.filter(
        e => e.subType == this.props.listPackages,
      );
      filteredData.sort((a, b) => b.priority - a.priority);
      this.setState({filteredData: filteredData});
    }
  };
  setPackage = data => {
    this.props.setPackage(data);
    this.props.onClosed();
    this.setState({listPackages: null});
  };
  renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => this.setPackage(item.item)}
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderTopWidth: 0,
          borderColor: '#efefef',
          alignItems: 'center',
          paddingVertical: 10,
          paddingLeft: 0,
          marginHorizontal: 15,
        }}>
        <FastImage
          source={require('../../../icons/iconAgent/single_select.png')}
          style={{width: 15, height: 15}}
        />
        <Text style={{marginLeft: 5}}>{item.item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {listPackages, filteredData} = this.state;
    const {onClosed, open} = this.props;
    return (
      <ModalBox
        isOpen={open}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={true}
        onClosed={onClosed}
        style={css.ctModal}>
        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
            marginTop: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              marginTop: 10,
            }}>
            <FlatList
              data={listPackages == null ? filteredData : listPackages}
              renderItem={item => this.renderItem(item)}
            />
          </View>
        </View>
      </ModalBox>
    );
  }
}

const css = StyleSheet.create({
  ctModal: {
    backgroundColor: '#fff',
    flex: 0.5,
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
import {connect} from 'react-redux';
import {getListPackages} from '../actions/travel_buy';

const mapStateToProps = state => {
  return {
    listPackages: state.travelBuy.listPackages,
    insuredType: state.travelBuy.insuredType,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalTravelPackage);
