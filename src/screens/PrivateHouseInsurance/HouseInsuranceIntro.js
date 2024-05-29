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
          name: '1. Bảo hiểm nhà tư nhân',
          content: `Bảo hiểm nhà PTI HomeCare là loại hình bảo hiểm mà PTI sẽ bồi thường những tổn thật hay thiệt hại đối với ngôi nhà và tài sản bên trong phát sinh do những rủi ro thuộc phạm vi bảo hiểm.`,
        },
        {
          name: '2.Đối tượng bảo hiểm',
          content: `- Ngôi nhà: thời gian sử dụng không quá 30 năm.${'\n'}- Tài sản bên trong: là tất cả đồ đạc, dụng cụ gia đình và các tài sản khác đặt bên trong Ngôi nhà`,
        },
        {
          name: 'Lưu ý',
          content: `Về địa điểm được bảo hiểm: PTI không bảo hiểm cho ngôi nhà nằm trong khu vực từ Thanh Hóa đến Phú Yên`,
        },
        {
          name: 'Về ngôi nhà được bảo hiểm',
          content: `- Là công trình xây dựng với mục đích để ở và phục vụ các nhu cầu sinh hoạt của hộ gia đình, cá nhân, có kết cấu (cả phần thân, phần mái) được xây dựng bằng gạch, đá, bê tông.${'\n'}- PTI không nhận bảo hiểm cho phần kết cấu mái mái che không được xây dựng bằng bằng gạch, đá, bê tông (ví dụ: ngói, kim loại, fibrocement) mặc dù phần này thuộc kết cấu của ngôi nhà được bảo hiểm và các tài sản khác nằm trong phạm vi mái che này ${'\n'}- Ngôi nhà bao gồm cả các toà nhà phụ, công trình phụ, hành lang, lối đi nhưng không bao gồm cổng, hàng rào, tường bao và các trang thiết bị lắp cố định bên ngoài.`,
        },
        {
          name: 'Về tài sản bên trong:',
          content: `Là tất cả đồ đạc, dụng cụ gia đình và các tài sản khác đặt cố định bên trong khung kết cấu của Ngôi nhà, có mái che chắc chắn, thuộc quyền sở hữu của NĐBH hay NĐBH phải chịu trách nhiệm trông coi, kiểm soát và bảo quản, nhưng không bao gồm:${'\n'}- Ô tô, mô tô, xe gắn máy, xe đạp và các phương tiện giao thông khác - Giấy dán tường, các tấm ốp, tấm trần hay những vật liệu trang trí tương tự.${'\n'}- Tiền (tiền giấy hay tiền kim loại), vàng bạc, kim loại quý, đá quý, đồ trang sức, tác phẩm nghệ thuật, các vật quý hiếm khác, séc, chứng phiếu, tín phiếu, tem, tài liệu, bản thảo, sổ sách giấy tờ các loại, gia bảo, đồ cổ và đồ thờ cúng, bản vẽ hay tài liệu thiết kế, chất nổ, động thực vật, động thực vật sống, các thiết bị di động (máy tính xách tay, điện thoại di động, máy tính bảng...).${'\n'}- Hàng hóa trong kinh doanh`,
        },
      ],
      data2: [
        {
          name:
            'PTI bồi thường cho những tổn thất hay thiệt hại phát sinh từ những rủi ro sau:',
          content: `- Cháy, sét đánh, nổ do hơi đốt hoặc khí đốt phục vụ duy nhất là cho mục đích sinh hoạt.${'\n'}- Máy bay và các phương tiện hàng không khác hoặc các thiết bị trên các phương tiện đó rơi vào;${'\n'}- Động đất hay núi lửa phun- Giông, bão và lụt${'\n'}- Bảo hiểm trộm cướp đi kèm dấu hiệu đột nhập, sử dụng vũ lực và tẩu thoát${'\n'}- Đâm va do xe cộ súc vật`,
        },
        {
          name: 'Ngoài ra, PTI còn hỗ trợ khách hàng những chi phí sau:',
          content: `- Chi phí cứu hỏa và chi phí dập lửa khác (Hạn mức trách nhiệm: 30 triệu đồng/vụ)${'\n'}- Chi phí dọn dẹp hiện trường (Hạn mức trách nhiệm: 30 triệu đồng/vụ)${'\n'}- Điều khoản về Chi phí thuê nhà (Hạn mức trách nhiệm: 5 triệu đồng/sự cố)${'\n'}- Điều khoản về Chi phí thuê kiến trúc sư, thiết kế (Hạn mức trách nhiệm: 30 triệu đồng/vụ)`,
        },
        {
          name: 'Lưu ý:',
          content: `PTI không bảo hiểm cho rủi ro sóng thần và bão trên cấp 8 đối với những ngôi nhà trong phạm vi cách biển 1km (theo đường chim bay)`,
        },
      ],
      data3: [
        {
          name: 'Lưu ý:',
          content: `PTI không bảo hiểm cho rủi ro sóng thần và bão trên cấp 8 đối với những ngôi nhà trong phạm vi cách biển 1km (theo đường chim bay)`,
        },
      ],
      active: 1,
    };
  }
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
  render() {
    const {active, data1, data2, data3} = this.state;
    return (
      <View style={styles.container}>
        <GestureRecognizer
          onSwipeLeft={state => this.onSwipeLeft(state)}
          onSwipeRight={state => this.onSwipeRight(state)}
          style={{flex: 1}}>
          <FastImage
            source={require('../../icons/iconAgent/ic_banner_house.png')}
            style={{width: widthPercentageToDP('100'), height: 200}}>
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
                BẢO HIỂM{'\n'}NHÀ TƯ NHÂN
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
            onPress={() => Actions.HouseInfomation()}
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
