import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import {widthPercentageToDP} from '../../config/ConfigResponsive';
import {Color} from '../../config/System';

class FlightIntroduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: '1.Bảo hiểm trễ chuyến bay',
          content:
            'Gói bảo hiểm trễ chuyến bay đầu tiên và duy nhất được phát hành bởi Tổng công ty cổ phần bảo hiểm Bưu Điện - PTI và phân bối bởi INSO.',
        },
        {
          name: 'Mức phí bảo hiểm',
          content:
            'Chỉ từ 40.000đ đến 100.000đ tùy thuộc vào hãng bay và gói bảo hiểm bạn chọn.',
        },
        {
          name: 'Điều kiện bảo hiểm',
          content:
            'Chuyến bay bị Trễ, Hủy, Quay đầu hoặc Đáp xuống sân bay khác.',
        },
        {
          name: 'Thời gian mua bảo hiểm',
          content:
            'Bạn cần mua bảo hiểm và thanh toán tối thiểu 6 tiếng trước giờ cất cánh dự kiến.',
        },
        {
          name: 'Thời gian tính bảo hiểm',
          content:
            'Thời gian hạ cánh dự kiến là thời gian đến ghi trên chứng nhận bảo hiểm, và được xác định lần cuối 6 tiếng trước giờ bay dự kiến theo cập nhật từ hãng hàng không',
        },
        {
          name: 'Thời gian nhận bồi thường',
          content:
            'Bạn sẽ nhận được tiền bồi thường trong vòng 30 phút từ khi bạn yêu cầu.',
        },
      ],
    };
  }
  renderItem = (item, index) => {
    return (
      <View>
        <Text style={{fontWeight: 'bold'}}>{item.item.name}</Text>
        <Text style={{marginTop: 5, marginBottom: 15}}>
          {item.item.content}
        </Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FastImage
            source={require('../../icons/iconAgent/ic_flight_intro.png')}
            style={{width: widthPercentageToDP('100'), height: 300}}>
            {Actions.currentScene == 'FlightIntroduction' ? (
              <StatusBar translucent backgroundColor="transparent" />
            ) : null}
            <TouchableOpacity
              onPress={() => Actions.pop()}
              style={styles.ctBack}>
              <FastImage
                style={styles.icBack}
                source={require('../../icons/ic_back.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.title}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#ffff',
                  textAlign: 'left',
                }}>
                BẢO HIỂM{'\n'}TRỄ CHUYẾN BAY
              </Text>
              <View
                style={{
                  backgroundColor: Color,
                  width: 103,
                  height: 4,
                  borderRadius: 35,
                  marginTop: 4,
                }}
              />
            </View>
          </FastImage>
          <View style={styles.contentContainer}>
            <FlatList
              style={{padding: 25}}
              data={this.state.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item, index) => this.renderItem(item, index)}
            />
          </View>
        </ScrollView>
        <FooterButton>
          <Button
            label={'MUA BẢO HIỂM'}
            marginTop={10}
            onPress={() => Actions.FlightInformation()}
          />
        </FooterButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ctBack: {
    marginTop: 25,
    padding: 24,
    left: 0,
    position: 'absolute',
  },
  icBack: {
    height: 15,
    width: (15 * 21) / 39,
  },
  title: {
    flex: 1,
    justifyContent: 'flex-end',
    width: 130,
    height: 38,
    marginLeft: 30,
    marginBottom: 40,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: '#ffff',
  },
});
export default FlightIntroduction;
