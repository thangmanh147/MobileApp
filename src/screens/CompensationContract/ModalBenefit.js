import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { screen, TxtBlack, Color, URL, TxtColor } from '../../config/System';
import axios from 'axios'
import Store from '../../services/Store';
import Const from '../../services/Const';
import FastImage from 'react-native-fast-image';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';

class ModalBenefit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: [
        {
          name: 'Trợ cấp viện phí hàng ngày',
        },
        {
          name: 'Trợ cấp phẫu thuật',
        },
        {
          name: 'Tử vong trong thời gian nằm viện do tai nạn',
        }
      ],
    };
  }

  // componentDidMount() {
  //   new Store().getSession(Const.TOKEN).then(token => {
  //     let url = `${URL}/api/contract/v1/insurance-packages?type=TRAVEL&sort[priority]=-1`
  //     axios.get(url, {
  //       headers: {
  //         Authorization: token
  //       }
  //     })
  //       .then((res) => {
  //         if (res.status == 200) {
  //           this.setState({
  //             sex: res?.data?.data
  //           })
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   });
  // }



  setSex = data => {
    this.props.setSex(data);
    this.props.onClosed();
  };

  renderItem = (item) => {
    const { nameBenefit } = this.props;
    return (
      <TouchableOpacity onPress={() => this.setSex(item.item)} style={{ flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 0, borderColor: '#efefef', alignItems: 'center', paddingVertical: 12, marginHorizontal: 15 }} >
        {
          nameBenefit == item?.item?.name ? (
              <IconRadioBtnActiveSvg width={15} height={15} />
          ) : (
              <IconRadioBtnSvg width={15} height={15} />
          )
        }
        <Text style={{ marginLeft: 5, fontSize: 14, color: TxtColor }}>{item.item.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { sex } = this.state;
    const { onClosed, open } = this.props;
    return (
      <ModalBox
        isOpen={open}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={true}
        onClosed={onClosed}
        coverScreen={true}
        style={css.ctModal}
      >
        <View style={{
          backgroundColor: '#fff', flex: 1,
          borderTopLeftRadius: 20, borderTopRightRadius: 20
        }}>
          <View style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingLeft: 25,
            paddingVertical: 15,
            backgroundColor: '#F6F5F6'
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Quyền lợi bảo hiểm yêu cầu bồi thường</Text>
          </View>
          <View style={{
            marginHorizontal: 10, marginBottom: 10
          }}>

            <FlatList
              data={sex}
              renderItem={(item) => this.renderItem(item)}
              onEndReachedThreshold={0.6}
            />
          </View>
          <View style={{ height: 50 }} />
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
});

export default ModalBenefit;
