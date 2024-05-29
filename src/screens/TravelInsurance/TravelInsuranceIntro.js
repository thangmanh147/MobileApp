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
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

class TravelInsuranceIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: [
        {
          name: '',
          content: `Bảo hiểm du lịch trong nước của PTI là sản phẩm bảo hiểm dành cho các đối tượng khách du lịch là người Việt Nam hoặc người nước ngoài đang cư trú tại Việt Nam đi du lịch, tham quan các địa điểm du lịch trong lãnh thổ nước Việt Nam.${`\n`}${`\n`}${`\n`}Sản phẩm này hỗ trợ cho khách du lịch không may gặp phải các rủi ro trong suốt hành trình du lịch như  tai nạn trong quá trình đi lại, tham gia các hoạt động tại địa điểm du lịch gây thương tật về thân thể, thậm chí có thể ảnh hưởng tới tính mạng. Hãy tận hưởng chuyến đi du lịch thú vị và yên tâm với sản phẩm Bảo hiểm du lịch trong nước của chúng tôi.${`\n`}${`\n`}${`\n`}Lưu ý: Trường hợp Người được bảo hiểm khảo sát, thám hiểm, đua xe, đua ngựa, đua thuyền, thi đấu có tính chất chuyên nghiệp các môn: bóng đá, đấm bốc, leo núi, lướt ván … chỉ được bảo hiểm với điều kiện đã nộp thuế phụ phí bảo hiểm theo quy định và được PTI chấp nhận bảo hiểm.`,
        },
      ],
      data2: [
        {
          name: 'Phạm vi bảo hiểm:',
          content:
            'PTI bảo hiểm cho các rủi ro liên quan đến tai nạn hoặc tử vong do ốm đau, bệnh tật bất ngờ  trong quá trình đi du lịch thuộc thời hạn bảo hiểm.',
        },
        {
          name: 'Quyền lợi bảo hiểm:',
          content: `- Tử vong do tai nạn: PTI chi trả toàn bộ Số tiền bảo hiểm${`\n`}- Thương tật thân thể:Số tiền bảo hiểm từ dưới 20 triệu đồng: Chi trả theo bảng tỷ lệ thương tật đính kèm Quy tắc.${`\n`}Số tiền bảo hiểm trên 20 triệu đồng đến 100 triệu đồng: Chi trả theo chi phí y tế thực tế, hợp lý theo chỉ định của bác sĩ nhưng không vượt quá tỷ lệ.${`\n`}- Tử vong do ốm đau, bệnh tật bất ngờ (không phải là bệnh tật phát sinh từ trước khi bảo hiểm có hiệu lực hoặc không phải các bệnh thuộc điểm loại trừ): Chi trả 50% Số tiền bảo hiểm;${`\n`}Trong mọi trường hợp, tổng số tiền bồi thường thiệt hại bảo hiểm du lịch trong nước của PTI không vượt quá Số tiền bảo hiểm đã ghi trên Giấy chứng nhận bảo hiểm.`,
        },
        {
          name: 'Thông báo tai nạn',
          content:
            'Chuyến bay bị Trễ, Hủy, Quay đầu hoặc Đáp xuống sân bay khác.',
        },
        {
          name: 'Hồ sơ bồi thường',
          content:
            'Khi yêu cầu PTI trả tiền bảo hiểm, Người được bảo hiểm hoặc người đại diện của Người được bảo hiểm hoặc người thừa kế hợp pháp phải gửi cho PTI các chứng từ sau đây trong vòng 30 ngày kể từ ngày tử vong hoặc điều trị khỏi thương tật:',
        },
        {
          name: 'Giấy đề nghị trả tiền bảo hiểm',
          content: `Hợp đồng bảo hiểm và bản sao (trích) danh sách Người được bảo hiểm, hoặc Giấy chứng nhận bảo hiểm hoặc vé vào cửa có bảo hiểm của Người được bảo hiểm bị tai nạn;${`\n`}Biên bản tai nạn có xác nhận của cơ quan du lịch, chính quyền địa phương hoặc công an nơi Người được bảo hiểm bị tai nạn;${`\n`}Xác nhận điều trị của cơ quan y tế (giấy ra viện, phiếu điều trị và các giấy tờ liên quan đến việc điều trị tai nạn);${`\n`}Giấy chứng tử và giấy xác nhận quyền thừa kế hợp pháp (trường hợp chết).Trường hợp Người được bảo hiểm uỷ quyền cho người khác nhận tiền bảo hiểm, phải có giấy uỷ quyền hợp pháp.${`\n`}Thời gian giải quyết hồ sơ: Thời hạn giải quyết bồi thường trong vòng 05 -15 ngày làm việc kể từ ngày PTI nhận đầy đủ hồ sơ bồi thường hợp lệ.`,
        },
      ],
      data3: [
        {
          name: '',
          content: `Số tiền bảo hiểm sẽ có định mức từ 1.000.000 đồng đến 100.000.000 đồng ${`\n`}${`\n`}Phí bảo hiểm sẽ thay đổi tương ứng với mức giá trị bảo hiểm mà khách hàng lựa chọn`,
        },
      ],
      active: 1,
      string: 'abcdefgh',
    };
  }
  renderItem = (item, index) => {
    return (
      <View>
        {item.item.name !== '' ? (
          <Text style={{fontWeight: 'bold'}}>{item.item.name}</Text>
        ) : null}
        <Text style={{marginTop: 5, marginBottom: 15}}>
          {item.item.content}
        </Text>
      </View>
    );
  };
  onPressTabItem = item => {
    switch (item) {
      case 'intro':
        return this.setState({active: 1});
      case 'benefit':
        return this.setState({active: 2});
      case 'fee':
        return this.setState({active: 3});
    }
  };
  onSwipeLeft = () => {
    const {active} = this.state;
    if (active < 3) {
      this.setState({active: active + 1});
    }
  };
  onSwipeRight = () => {
    const {active} = this.state;
    if (active > 1 && active < 4) {
      this.setState({active: active - 1});
    }
  };
  render() {
    const {active, data1, data2, data3} = this.state;
    return (
      <View style={styles.container}>
        <GestureRecognizer
          onSwipeLeft={state => this.onSwipeLeft(state)}
          onSwipeRight={state => this.onSwipeRight(state)}
          style={{flex: 1}}>
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
                BẢO HIỂM{'\n'}DU LỊCH
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
          <View style={styles.tabContainer}>
            <View style={styles.tab}>
              <View style={{flex: 1, flexDirection: 'row', marginTop: 24}}>
                <TouchableOpacity
                  onPress={() => this.onPressTabItem('intro')}
                  style={[
                    styles.tabItem,
                    {borderBottomColor: active == 1 ? Color : 'transparent'},
                  ]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: active == 1 ? Color : '#8D8C8D',
                    }}>
                    Giới thiệu
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onPressTabItem('benefit')}
                  style={[
                    styles.tabItem,
                    {borderBottomColor: active == 2 ? Color : 'transparent'},
                  ]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: active == 2 ? Color : '#8D8C8D',
                    }}>
                    Quyền lợi
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onPressTabItem('fee')}
                  style={[
                    styles.tabItem,
                    {borderBottomColor: active == 3 ? Color : 'transparent'},
                  ]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: active == 3 ? Color : '#8D8C8D',
                    }}>
                    Phí bảo hiểm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <FlatList
              style={{padding: 25}}
              data={active == 1 ? data1 : active == 2 ? data2 : data3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item, index) => this.renderItem(item, index)}
            />
          </View>
        </GestureRecognizer>
        <FooterButton>
          <Button
            label={'MUA BẢO HIỂM'}
            marginTop={10}
            onPress={() => Actions.TourInfomation()}
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
    position: 'absolute',
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
  tabContainer: {
    flex: 0.2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: '#ffff',
  },
  tab: {
    alignSelf: 'center',
    width: widthPercentageToDP('90'),
    height: 60,
  },
  tabItem: {
    flex: 0.35,
    borderBottomWidth: 2,
    padding: 5,
    borderRadius: 1,
  },
});
export default TravelInsuranceIntro;
