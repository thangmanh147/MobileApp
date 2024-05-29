import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image, Linking, ScrollView,
    Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, TxtColor, URL, nameApp, errValidColor } from '../../config/System';
import { SceneMap, TabView } from 'react-native-tab-view';
import { set } from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info';
import { setTokenInsur } from '../../screens/Agent/actions';
import Store from '../../services/Store';
import Const from '../../services/Const';
import BaseModal from '../../components/BaseModal';
import jwt_decode from "jwt-decode";
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import ModalSelectAgent from '../../components/modalSelectAgent/ModalSelectAgent';

function HouseIntroScreen({setTokenInsur}) {
    const offset = useRef(new Animated.Value(0)).current;
    const [routes, setRoutes] = useState([
        { key: 'first', title: 'Giới thiệu' },
        { key: 'second', title: 'Quyền lợi' },
        { key: 'third', title: 'Phí bảo hiểm' },
    ]);

    const [index, setIndex] = useState(0);
    const [modalAgent, setModalAgent] = useState(false);
    const [channels, setChannels] = useState([]);
    const [modalPermission, setModalPermission] = useState(false);
    
    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
          let url = `${URL}/api/insured-object/v1/products/H1/channel-agents`;
          console.log('======URL', url)
          fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
              },
          })
              .then((res) => res.json())
              .then((res) => {
                  console.log('======res', res)
                  if (res.status == 200 || res.status == 'success') {
                      setChannels(res?.data);
                  }
              })
              .catch((error) => {
                  console.log(error)
              })
        });
      }, []);
  
    const renderTabbar = props => (
        <View>
            <View style={{
                borderRadius: 10,
                paddingTop: 24,
                paddingBottom: 16,
                flexDirection: 'row',
                marginHorizontal: 24,
                backgroundColor: '#ffffff',
            }}>
                {
                    routes?.map((item, idx) => {
                        return (
                            <TouchableOpacity onPress={() => setIndex(idx)} style={styles.styleTab}>
                                <Text style={{
                                  color: Number(idx) === index ? Color : '#8D8C8D',
                                  fontSize: 14,
                                  paddingBottom: 12,
                                  fontWeight: 'bold',
                                }}>{item?.title}</Text>
                                <View style={{ width: '100%', height: 2, backgroundColor: Number(idx) === index ? Color : 'white' }} />
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </View>
    );

    const FirstRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>1. Giới thiệu bảo hiểm nhà tư nhân</Text>
            <Text style={styles.titleContentIntro}>
                Bảo hiểm nhà PTI HomeCare là loại hình bảo hiểm mà PTI sẽ bồi thường những tổn thất hay thiệt hại đối với ngôi nhà và tài sản bên trong phát sinh do những rủi ro thuộc phạm vi bảo hiểm.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>2. Đối tượng bảo hiểm</Text>
            <View style={{flexDirection: 'row'}}>
                <View style={{
                    width: 4.3,
                    height: 4.3,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{flex: 1,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                    Ngôi nhà: thời gian sử dụng không quá 30 năm.
                </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{
                    width: 4.3,
                    height: 4.3,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{flex: 1,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                    Tài sản bên trong: là tất cả đồ đạc, dụng cụ gia đình và các tài sản khác đặt bên trong Ngôi nhà.
                </Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>Về ngôi nhà được bảo hiểm</Text>
            <Text style={styles.titleContentIntro}>
                - Là công trình xây dựng với mục đích để ở và phục vụ các nhu cầu sinh hoạt của hộ gia đình, cá nhân, có kết cấu (cả phần thân, phần mái) được xây dựng bằng gạch, đá, bê tông.{'\n'}
                - PTI không nhận bảo hiểm cho phần kết cấu mái che không được xây dựng bằng gạch, đá, bê tông (ví dụ: ngói, kim loại, fibrocement) mặc dù phần này thuộc kết cấu của ngôi nhà được bảo hiểm và các tài sản khác nằm trong phạm vi mái che này.{'\n'}
                - Ngôi nhà bao gồm cả các toà nhà phụ, công trình phụ, hành lang, lối đi nhưng không bao gồm cổng, hàng rào, tường bao và các trang thiết bị lắp cố định bên ngoài.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>Về tài sản bên trong:</Text>
            <Text style={styles.titleContentIntro}>
                Là tất cả đồ đạc, dụng cụ gia đình và các tài sản khác đặt cố định bên trong khung kết cấu của Ngôi nhà, có mái che chắc chắn, thuộc quyền sở hữu của NĐBH hay NĐBH phải chịu trách nhiệm trông coi, kiểm soát và bảo quản, nhưng không bao gồm:{'\n'}
                - Ô tô, mô tô, xe gắn máy, xe đạp và các phương tiện giao thông khác.{'\n'}
                - Giấy dán tường, các tấm ốp, tấm trần hay những vật liệu trang trí tương tự.{'\n'}
                - Tiền (tiền giấy hay tiền kim loại), vàng bạc, kim loại quý, đá quý, đồ trang sức, tác phẩm nghệ thuật, các vật quý hiếm khác, séc, chứng phiếu, tín phiếu, tem, tài liệu, bản thảo, sổ sách giấy tờ các loại, gia bảo, đồ cổ và đồ thờ cúng, bản vẽ hay tài liệu thiết kế, chất nổ, động thực vật, động thực vật sống, các thiết bị di động (máy tính xách tay, điện thoại di động, máy tính bảng...).{'\n'}
                - Hàng hóa trong kinh doanh.
            </Text>
        </View>
    );
    const SecondRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>I. Quyền lợi bảo hiểm</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, textAlign: 'justify' }}>
                PTI bồi thường cho những tổn thất hay thiệt hại phát sinh từ những rủi ro sau:
            </Text>
            <Text style={styles.titleContentIntro}>
                - Cháy, sét đánh, nổ do hơi đốt hoặc khí đốt phục vụ duy nhất là cho mục đích sinh hoạt.{'\n'}
                - Máy bay và các phương tiện hàng không khác hoặc các thiết bị trên các phương tiện đó rơi vào;{'\n'}
                - Động đất hay núi lửa phun.{'\n'}
                - Giông, bão và lụt.{'\n'}
                - Bảo hiểm trộm cướp đi kèm dấu hiệu đột nhập, sử dụng vũ lực và tẩu thoát.{'\n'}
                - Đâm va do xe cộ súc vật.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, textAlign: 'justify' }}>
                Ngoài ra, PTI còn hỗ trợ khách hàng những chi phí sau:
            </Text>
            <Text style={styles.titleContentIntro}>
                - Chi phí cứu hỏa và chi phí dập lửa khác (Hạn mức trách nhiệm: 30 triệu đồng/vụ){'\n'}
                - Chi phí dọn dẹp hiện trường (Hạn mức trách nhiệm: 30 triệu đồng/vụ){'\n'}
                - Điều khoản về Chi phí thuê nhà (Hạn mức trách nhiệm: 5 triệu đồng/sự cố){'\n'}
                - Điều khoản về Chi phí thuê kiến trúc sư, thiết kế (Hạn mức trách nhiệm: 30 triệu đồng/vụ)
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#BE3030' }}>
                Lưu ý:
            </Text>
            <Text style={styles.titleContentIntro}>
                PTI không bảo hiểm cho rủi ro sóng thần và bão trên cấp 8 đối với những ngôi nhà trong phạm vi cách biển 1km (theo đường chim bay)
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>II. Loại trừ bảo hiểm</Text>
            <Text style={styles.titleContentIntro}>
                PTI không chịu trách nhiệm bồi thường trong những trường hợp sau:{'\n'}
                1. Bất kỳ thiệt hại nào phát sinh do hậu quả, trực tiếp hay gián tiếp của các sự cố:{'\n'}
                a. Nổi loạn, bạo động dân sự.{'\n'}
                b. Chiến tranh, xâm lược, hành động thù địch của nước ngoài, chiến sự (dù có tuyên chiến hay không tuyên chiến), nổi loạn, nội chiến, khởi nghĩa, cách mạng, binh biến, bạo động, đảo chính, lực lượng quân sự chiếm quyền,...{'\n'}
                c. Khủng bố (nghĩa là sử dụng bạo lực nhằm các mục đích chính trị, bao gồm cả việc sử dụng bạo lực nhằm gây hoang mang trong xã hội hoặc một phần xã hội).{'\n'}
                2. Những thiệt hại hoặc rủi ro bắt nguồn từ/hoặc phát sinh từ/hoặc là hậu quả trực tiếp hay gián tiếp từ:{'\n'}
                a. Phóng xạ ion hoá hay nhiễm phóng xạ từ nhiên liệu hạt nhân hay từ chất thải hạt nhân do đốt cháy nhiên liệu hạt nhân.{'\n'}
                b. Các thuộc tính phóng xạ, độc, nổ hoặc các thuộc tính nguy hiểm khác của thiết bị nổ hạt nhân hay các bộ phận của thiết bị đó.{'\n'}
                3. Những tổn thất do hành động cố ý hoặc đồng loã của Người được bảo hiểm gây ra.{'\n'}
                4. Thiệt hại do trộm cướp xảy ra khi ngôi nhà đang bỏ trống không có người cư trú. Thiệt hại (từ các rủi ro ngoài rủi ro trộm cướp) xảy ra trong khi Ngôi nhà bỏ trống, không có người cư trú hoặc sử dụng từ 60 ngày liên tục trở lên hoặc xảy ra khi Ngôi nhà đang trong giai đoạn xây dựng, cải tạo hay sửa chữa.{'\n'}
                5. Thiệt hại gây ra bởi và/hoặc gia tăng do việc thay đổi tính chất sử dụng hay điều kiện khác của Ngôi nhà so với tính chất hoặc điều kiện khi bắt đầu mua bảo hiểm mà nếu không có những thay đổi như vậy thì thiệt hại sẽ không xảy ra hoặc nếu xảy ra thì mức độ thiệt hại sẽ nhỏ hơn.{'\n'}
                6. Thiệt hại do tài sản tự lên men hoặc tự toả nhiệt hoặc chịu tác động của bất cứ quá trình toả nhiệt nào.{'\n'}
                7. Những thiệt hại hoặc rủi ro bắt nguồn hoặc phát sinh hay hậu quả trực tiếp hay gián tiếp từ các rủi ro động đất, núi lửa phun trừ khi Người được bảo hiểm tham gia rủi ro F.{'\n'}
                8. Những thiệt hại của các máy móc thiết bị gây ra do những rủi ro bên trong của chúng như: quá tải, đoạn mạch.{'\n'}
                9. Những thiệt hại mang tính chất hậu quả dưới bất kỳ hình thức nào.
            </Text>
        </View>
    );
    const ThirdRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>I. Tỷ lệ phí bảo hiểm khung nhà</Text>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 5 }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Loại đối tượng bảo hiểm</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Phí BH tối thiểu (Chưa VAT)</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Mức khấu trừ/vụ</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Nhà tư nhân (trừ nhà cấp 4)</Text>
                </View>
                <View
                    style={{ justifyContent: 'center', padding: 10, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>0,07%</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                        5.000.000 VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Chung cư có hệ thống chữa cháy tự động (sprinkler)</Text>
                </View>
                <View
                    style={{ justifyContent: 'center', padding: 10, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>0,05%</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                        Theo bảng MKT NĐ23
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Chung cư không có hệ thống chữa cháy tự động (sprinkler)</Text>
                </View>
                <View
                    style={{ justifyContent: 'center', padding: 10, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>0,10%</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                        Theo bảng MKT NĐ23
                    </Text>
                </View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 15 }}>Bảng mức khấu trừ theo Nghị định 23.</Text>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 5 }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Số tiền bảo hiểm</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Mức khấu trừ/vụ tổn thất</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Đến 2 tỷ đồng</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                        4.000.000 VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Trên 2 tỷ đồng đến 10 tỷ đồng</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                        10.000.000 VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Trên 10 tỷ đồng đến 50 tỷ đồng</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                        20.000.000 VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Trên 50 tỷ đồng đến 100 tỷ đồng</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                        40.000.000 VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Trên 100 tỷ đồng đến 200 tỷ đồng</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                        60.000.000 VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Trên 200 tỷ đồng</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'center' }}>
                        100.000.000 VNĐ
                    </Text>
                </View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 15 }}>
                II. Tỷ lệ phí bảo hiểm tài sản bên trong
            </Text>
            <Text style={[styles.titleContentIntro, { marginTop: 5, marginBottom: 2 }]}>
                Mức khấu trừ: 2.000.000 VNĐ/vụ
            </Text>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 5 }}>
                <View style={{
                    padding: 5,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>
                        1. Chương trình bảo hiểm A
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Hạn mức trách nhiệm (VNĐ/đồ vật)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        10,000,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Hạn mức trách nhiệm (VNĐ/năm)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        100,000,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Phí bảo hiểm (gồm VAT)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        250,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 5 }}>
                <View style={{
                    padding: 5,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>
                        2. Chương trình bảo hiểm B
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Hạn mức trách nhiệm (VNĐ/đồ vật)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        20,000,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Hạn mức trách nhiệm (VNĐ/năm)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        200,000,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Phí bảo hiểm (gồm VAT)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        480,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 5 }}>
                <View style={{
                    padding: 5,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>
                        3. Chương trình bảo hiểm C
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Hạn mức trách nhiệm (VNĐ/đồ vật)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        30,000,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Hạn mức trách nhiệm (VNĐ/năm)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        500,000,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Phí bảo hiểm (gồm VAT)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        850,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 5 }}>
                <View style={{
                    padding: 5,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>
                        4. Chương trình bảo hiểm D
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Hạn mức trách nhiệm (VNĐ/đồ vật)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        50,000,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Hạn mức trách nhiệm (VNĐ/năm)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        1,000,000,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Phí bảo hiểm (gồm VAT)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        1,450,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 5 }}>
                <View style={{
                    padding: 5,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>
                        5. Chương trình bảo hiểm E
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Hạn mức trách nhiệm (VNĐ/đồ vật)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        70,000,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Hạn mức trách nhiệm (VNĐ/năm)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        2,000,000,000
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingVertical: 3 }}>
                <View
                    style={{ justifyContent: 'center', padding: 5, flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Phí bảo hiểm (gồm VAT)</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        2,500,000
                    </Text>
                </View>
            </View>
        </View>
    );
    
    const backToInsuranceType = () => {
        Actions.pop()
    }

    const headerZIndex = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [999, 1001, 1002],
            extrapolate: 'clamp'
        });

        const checkPermission = () => {
            if (nameApp.includes('IAGENT')) {
                if (channels.length === 0) {
                    setModalPermission(true);
                } else if (channels.length === 1 && channels[0]?.agents?.length === 1) {
                    Actions.HousePackage();
                } else setModalAgent(true);
            } else {
                Actions.HousePackage();
            }
        }
    
        const createTokenInsur = (channelId, orgId) => {
            new Store().getSession(Const.TOKEN).then(token => {
                const dataToken = jwt_decode(token);
                let url = `${URL}/api/account/v1/generate-token`;
                let body = {
                    "channelId": channelId || '',
                    "organizationId": orgId || '',
                    "sub": dataToken?.userId || '',
                    "duration": 1
                };
                console.log('======URL', url)
                console.log('======BODY', body)
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'internal_secret_key': 'inso_core_service',
                    },
                    body: JSON.stringify(body),
                })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log('======res', res)
                        if (res.status == 200 || res.status == 'success') {
                            setModalAgent(false);
                            setTokenInsur('H1', {
                                token: res?.data,
                                channelId: channelId,
                                orgId: orgId,
                            })
                            Actions.HousePackage();
                        } else {
                            setModalAgent(false);
                            Actions.HousePackage();
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
        }
    
    return (
        <View style={styles.container}>
            <Animated.View style={{zIndex: headerZIndex}}>
                <ImageHeaderScroll code={'H1'} offset={offset} />
            </Animated.View>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2012
            }}>
                <TouchableOpacity
                    onPress={() => backToInsuranceType()}
                    style={{
                        paddingHorizontal: 24,
                        paddingTop: 43,
                        zIndex: 2012
                    }}>
                    <FastImage
                        style={{
                            height: 15,
                            width: (15 * 21) / 39,
                        }}
                        source={require('../../icons/ic_back.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={{zIndex: 2011}}>
                <HeaderScroll code={'H1'} offset={offset} />
            </View>
            <ScrollView
                style={{ zIndex: 1000 }}
                contentContainerStyle={{
                    paddingTop: HEADER_MAX_HEIGHT,
                    paddingBottom: 15,
                }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                )}>
                <View style={styles.contentContainer}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={SceneMap({
                            first: FirstRoute,
                            second: SecondRoute,
                            third: ThirdRoute,
                        })}
                        onIndexChange={setIndex}
                        renderTabBar={renderTabbar}
                    />
                </View>
            </ScrollView>
            <FooterButton>
                <Button
                    label={'MUA BẢO HIỂM'}
                    marginTop={10}
                    onPress={() => checkPermission()}
                />
            </FooterButton>
            <Modal
                isVisible={modalPermission}
                style={{ margin: 0, justifyContent: 'flex-end' }}
                onBackButtonPress={() => setModalPermission(false)}
                onBackdropPress={() => setModalPermission(false)}
                animationInTiming={200}
                animationOutTiming={200}
                backdropTransitionInTiming={0}
                backdropTransitionOutTiming={0}
            >
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingTop: 24,
                        paddingHorizontal: 24,
                        paddingBottom: 32,
                        alignItems: 'center'
                    }}>
                    <NotifyRingSvg width={53} height={60} />
                    <Text style={{ marginTop: 28, marginBottom: 32, fontSize: 14, color: errValidColor, textAlign: 'center' }}>
                        Bạn không có quyền thực hiện thao tác này.
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setModalPermission(false);
                        }}
                        style={{
                            width: '100%',
                            paddingVertical: 16,
                            backgroundColor: Color,
                            borderRadius: 10,
                            alignItems: 'center'
                        }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                            ĐÓNG
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {
                channels.length > 0 ? (
                    <ModalSelectAgent
                        codeInsur={'H1'}
                        channels={channels}
                        modalAgent={modalAgent}
                        callBackModal={() => setModalAgent(false)}
                        callBackCreate={(channelId, orgId) => createTokenInsur(channelId, orgId)}
                    />
                ) : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    buttonCategory: {
        flexDirection: 'row',
        marginHorizontal: 24,
        marginTop: 24,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonSelect: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
    },
    titleButton: {
        fontSize: 14,
        fontWeight: '400',
        color: '#EFAA6F',
    },
    titleContentIntro: {
        fontSize: 14,
        color: TxtColor,
        textAlign: 'justify',
    },
    animatedHeaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContent: {
        marginTop: isIPhoneX ? 15 : 5,
        padding: 24,
        position: 'absolute',
        left: 0,
        zIndex: 2012,
    },
    ctBack: {
        zIndex: 1002,
    },
    icBack: {
        height: 15,
        width: (15 * 21) / 39,
    },
    title: {
        zIndex: 1,
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
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
    styleTab: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center',
    },
});

const mapDispatchToProps = dispatch => {
    return {
        setTokenInsur: (code, obj) => dispatch(setTokenInsur(code, obj)),
    };
};

export default connect(null, mapDispatchToProps)(HouseIntroScreen);
