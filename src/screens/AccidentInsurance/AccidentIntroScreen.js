import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Animated,
} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import { setTokenInsur } from '../../screens/Agent/actions';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { Color, NewColor, TxtColor, URL, nameApp, errValidColor } from '../../config/System';
import { SceneMap, TabView } from 'react-native-tab-view';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import Store from '../../services/Store';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX} from '../../utils/Util';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import ModalSelectAgent from '../../components/modalSelectAgent/ModalSelectAgent';

function AccidentIntroScreen({insuranceInfo, chosenPackage, setTokenInsur}) {
    const offset = useRef(new Animated.Value(0)).current;
    const [routes, setRoutes] = useState([
        { key: 'first', title: 'Giới thiệu' },
        { key: 'second', title: 'Phí bảo hiểm' },
        { key: 'third', title: 'Loại trừ BH' },
    ]);

    const [index, setIndex] = useState(0);
    const [idSelected, setIdSelected] = useState(1);
    const [organizationCode, setOrganizationCode] = useState('');
    const [modalAgent, setModalAgent] = useState(false);
    const [channels, setChannels] = useState([]);
    const [modalPermission, setModalPermission] = useState(false);

    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(token);
            setOrganizationCode(dataToken?.organizationCode);
        });
        const insurA1 = insuranceInfo && insuranceInfo.find(obj => obj.code === 'A1');
        const insurA2 = insuranceInfo && insuranceInfo.find(obj => obj.code === 'A2');
        if (chosenPackage?.typeInsure) {
            setIdSelected(chosenPackage?.typeInsure);
        } else if (insurA2 && !insurA1) {
            setIdSelected(2);
        } else {
            setIdSelected(1);
        }
    }, []);
    
    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
          let url = `${URL}/api/insured-object/v1/products/A1/channel-agents`;
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
  
    useEffect(() => {
        if (idSelected === 1) {
            setRoutes([
                { key: 'first', title: 'Giới thiệu' },
                { key: 'second', title: 'Phí bảo hiểm' },
                { key: 'third', title: 'Loại trừ BH' },
            ]);
        } else {
            setRoutes([
                { key: 'first', title: 'Giới thiệu' },
                { key: 'second', title: 'Quyền lợi' },
                { key: 'third', title: 'Phí bảo hiểm' },
            ]);
        }
    }, [idSelected]);

    const renderTabbar = props => (
        <View>
            <View style={{
                borderRadius: 10,
                paddingTop: arrA1?.length > 0 && arrA2?.length > 0 ? 10 : 24,
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
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>1. Đối tượng tham gia</Text>
            <Text style={styles.titleContentIntro}>
                - Người được bảo hiểm (NĐBH) có tuổi tối đa 70 tuổi tại thời điểm tham gia bảo hiểm;
                {'\n'}- NĐBH là người có tên trong hộ khẩu (tối đa 8 người) và/hoặc sổ tạm trú của Bên mua bảo hiểm tại cùng 01 (một) địa chỉ và KHÔNG thuộc đối tượng KHÔNG được bảo hiểm dưới đây;
                {'\n'}- Đối tượng loại trừ (KHÔNG được tham gia bảo hiểm):
            </Text>
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
                    Những người bị động kinh, tâm thần, phong;
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
                    Những người bị tàn phế hoặc thương tật vĩnh viễn từ 50% trở lên;
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
                    Người không có tên trên Sổ hộ khẩu tại thời điểm tham gia bảo hiểm; Người đã xóa tên trên Sổ hộ khẩu, đã chuyển hộ khẩu trước thời điểm xảy ra sự kiện bảo hiểm;
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
                    Người được bổ sung trong Sổ hộ khẩu ngay tại thời điểm hiệu lực bảo hiểm bắt đầu hoặc sau ngày bắt đầu hiệu lực bảo hiểm;
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
                    Người trên 70 tuổi tại thời điểm tham gia bảo hiểm.
                </Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>2. Phạm vi bảo hiểm</Text>
            <Text style={styles.titleContentIntro}>
                - Bảo hiểm cho tử vong hoặc thương tật thân thể do tai nạn thuộc phạm vi bảo hiểm xảy ra đối với NĐBH trong phạm vi lãnh thổ Việt Nam.
                {'\n'}- Tham gia chương trình này vẫn được tham gia và hưởng mọi quyền lợi của các loại hình bảo hiểm khác.
            </Text>
        </View>
    );
    const SecondRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>1. Đối tượng tham gia</Text>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 5 }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>Quyền lợi bảo hiểm</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    flex: 1.2,
                    paddingVertical: 10,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>Chi  tiết</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', padding: 10, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Thương tật tạm thời</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1.2 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Chi trả không vượt quá số tiền theo quy định trong
                        bảng tỷ lệ thương tật</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', padding: 10, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Thương tật bộ phận vĩnh viễn</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1.2 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Chi trả theo tỷ lệ % của số tiền bảo hiểm nêu trong
                        Bảng tỷ lệ thương tật</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', padding: 10, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Tử vong hoặc thương tật toàn
                        bộ vĩnh viễn</Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10, flex: 1.2 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>Chi trả 100% số tiền bảo hiểm</Text>
                </View>
            </View>
            <Text style={{ marginVertical: 10, fontSize: 14, color: TxtColor, textAlign: 'justify', fontStyle: 'italic' }}>
                (Bảng tỷ lệ thương tật đính kèm Quyết định số 253/QĐ-PTI-BHCN ngày 26/09/2012 của Tổng công ty cổ phần Bảo hiểm Bưu điện)
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>2. Loại trừ bảo hiểm</Text>
            <Text style={styles.titleContentIntro}>
                PTI không chịu trách nhiệm trả tiền bảo hiểm trong những trường hợp sau:
                {'\n'}- Hành động cố ý của NĐBH hoặc của người thụ hưởng trừ trường hợp NĐBH có hành động cứu người, cứu tài sản của Nhà nước, của nhân dân và tham gia chống các hoạt động phạm pháp;
                {'\n'}- NĐBH vi phạm pháp luật, vi phạm Luật giao thông; vi phạm nghiêm trọng nội quy, quy định của chính quyền địa phương hoặc cơ quan;
                {'\n'}- NĐBH sử dụng và bị ảnh hưởng của rượu, bia, ma túy hay các chất kích thích tương tự khác;
                {'\n'}- NĐBH tham gia đánh nhau, trừ khi chứng minh được hành động đánh nhau đó chỉ với mục đích tự vệ;
                {'\n'}- Cảm đột ngột, trúng gió, bệnh tật, sẩy thai, bệnh nghề nghiệp, những tai biến trong quá trình điều trị bệnh và thai sản;
                {'\n'}- Ngộ độc thức ăn, đồ uống, hoặc hít phải hơi độc, khí độc, chất độc;
                {'\n'}- Điều trị hoặc sử dụng thuốc không theo chỉ dẫn của cơ quan y tế hoặc theo yêu cầu của NĐBH;
                {'\n'}- Các hoạt động hàng không (trừ khi với tư cách là hành khách có vé), các cuộc diễn tập, các hoạt động quân sự, tham gia chiến đấu của các lực lượng vũ trang;
                {'\n'}- Động đất, núi lửa, nhiễm phóng xạ, chiến tranh, đình công, nội chiến;
                {'\n'}- Các rủi ro mang tính đại dịch theo công bố của cơ quan có thẩm quyền (bao gồm nhưng không giới hạn: SARS, H5N1);
                {'\n'}- NĐBH điều trị thương tật do tai nạn xảy ra trước ngày bắt đầu bảo hiểm;
                {'\n'}- Tử vong không rõ nguyên nhân, đột tử;
                {'\n'}- Thương tật do súc vật cắn hoặc mất răng không gắn kèm với thương tật thân thể.
            </Text>
        </View>
    );
    const ThirdRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={styles.titleContentIntro}>
                PTI không chịu trách nhiệm trả tiền bảo hiểm trong những trường hợp sau:
                {'\n'}- Hành động cố ý của NĐBH hoặc của người thụ hưởng trừ trường hợp NĐBH có hành động cứu người, cứu tài sản của Nhà nước, của nhân dân và tham gia chống các hoạt động phạm pháp;
                {'\n'}- NĐBH vi phạm pháp luật, vi phạm Luật giao thông; vi phạm nghiêm trọng nội quy, quy định của chính quyền địa phương hoặc cơ quan;
                {'\n'}- NĐBH sử dụng và bị ảnh hưởng của rượu, bia, ma túy hay các chất kích thích tương tự khác;
                {'\n'}- NĐBH tham gia đánh nhau, trừ khi chứng minh được hành động đánh nhau đó chỉ với mục đích tự vệ;
                {'\n'}- Cảm đột ngột, trúng gió, bệnh tật, sẩy thai, bệnh nghề nghiệp, những tai biến trong quá trình điều trị bệnh và thai sản;
                {'\n'}- Ngộ độc thức ăn, đồ uống, hoặc hít phải hơi độc, khí độc, chất độc;
                {'\n'}- Điều trị hoặc sử dụng thuốc không theo chỉ dẫn của cơ quan y tế hoặc theo yêu cầu của NĐBH;
                {'\n'}- Các hoạt động hàng không (trừ khi với tư cách là hành khách có vé), các cuộc diễn tập, các hoạt động quân sự, tham gia chiến đấu của các lực lượng vũ trang;
                {'\n'}- Động đất, núi lửa, nhiễm phóng xạ, chiến tranh, đình công, nội chiến;
                {'\n'}- Các rủi ro mang tính đại dịch theo công bố của cơ quan có thẩm quyền (bao gồm nhưng không giới hạn: SARS, H5N1);
                {'\n'}- NĐBH điều trị thương tật do tai nạn xảy ra trước ngày bắt đầu bảo hiểm;
                {'\n'}- Tử vong không rõ nguyên nhân, đột tử;
                {'\n'}- Thương tật do súc vật cắn hoặc mất răng không gắn kèm với thương tật thân thể.
            </Text>
        </View>
    );

    const FirstRoute1 = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor}}>1. Quy tắc áp dụng</Text>
            <Text style={{marginTop: 4,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                Quy tắc bảo hiểm tai nạn cá nhân ban hành kèm theo Quyết định số 253/QD-PTI-BHCN ngày 26/09/2012 của Tổng Giám đốc Tổng Công ty Cổ phẩn Bảo hiểm Bưu điện.
            </Text>
            <Text style={{marginTop: 8,fontWeight: 'bold',fontSize:14,color:TxtColor}}>2. Đối tượng bảo hiểm</Text>
            <Text style={{marginTop: 4,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                - Các công dân Việt Nam, người nước ngoài đang công tác học tập tại Việt Nam;{'\n'}
                - Cấp hợp đồng: 16 tuổi - 65 tuổi;
            </Text>
            <Text style={{marginTop: 4,fontWeight: 'bold',fontSize:14,color:TxtColor}}>Không nhận bảo hiểm với trường hợp:</Text>
            <Text style={{fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                - Người bị bệnh động kinh, tâm thần, phong;{'\n'}
                - Những người bị tàn phế hoặc thương tật vĩnh viễn từ 50% trở lên.
            </Text>
            <Text style={{marginTop: 8,fontWeight: 'bold',fontSize:14,color:TxtColor}}>3. Phạm vi bảo hiểm</Text>
            <Text style={{marginTop: 4,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                - Lãnh thổ Việt Nam;{'\n'}
                - Trường hợp tham gia hoạt động thể thao có tính chất chuyên nghiệp thì cần yêu cầu và thỏa thuận đóng thêm phụ phí, được PTI chấp thuận bảo hiểm.{'\n'}
                - Tham gia chương trình này vẫn được tham gia và hưởng mọi quyền lợi của các loại hình bảo hiểm khác.
            </Text>
        </View>
    );
    const SecondRoute1 = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <View style={{flexDirection:'row',backgroundColor:'#F6F5F6'}}>
                <View style={{justifyContent:'center', padding: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor, fontWeight:'bold'}}>Quyền lợi bảo hiểm</Text>
                </View>
                <View style={{justifyContent:'center',alignItems: 'center', padding: 8, flex:1.2}}>
                    <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>Gói Kim Cương</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Số tiền BH</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, fontWeight: 'bold', textAlign: 'right'}}>50.000.000đ</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Tử vong hoặc thương tật toàn bộ vĩnh viễn</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, textAlign: 'right'}}>50.000.000đ/người/vụ/năm</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Thương tật bộ phận vĩnh viễn</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, textAlign: 'right'}}>20.000.000đ/người/vụ/năm</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Thương tật tạm thời</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, textAlign: 'right'}}>15.000.000đ/người/vụ/năm</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',borderBottomWidth: 1,borderColor:'#D9D9D9'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Phí bảo hiểm</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, fontWeight: 'bold', textAlign: 'right'}}>210.000đ/người</Text>
                </View>
            </View>

            <View style={{marginTop: 16, flexDirection:'row',backgroundColor:'#F6F5F6'}}>
                <View style={{justifyContent:'center', padding: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor, fontWeight:'bold'}}>Quyền lợi bảo hiểm</Text>
                </View>
                <View style={{justifyContent:'center',alignItems: 'center', padding: 8, flex:1.2}}>
                    <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>Gói Vàng</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Số tiền BH</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, fontWeight: 'bold', textAlign: 'right'}}>30.000.000đ</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Tử vong hoặc thương tật toàn bộ vĩnh viễn</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, textAlign: 'right'}}>30.000.000đ/người/vụ/năm</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Thương tật bộ phận vĩnh viễn</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, textAlign: 'right'}}>15.000.000đ/người/vụ/năm</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Thương tật tạm thời</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, textAlign: 'right'}}>10.000.000đ/người/vụ/năm</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',borderBottomWidth: 1,borderColor:'#D9D9D9'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Phí bảo hiểm</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, fontWeight: 'bold', textAlign: 'right'}}>130.000đ/người</Text>
                </View>
            </View>

            <View style={{marginTop: 16, flexDirection:'row',backgroundColor:'#F6F5F6'}}>
                <View style={{justifyContent:'center', padding: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor, fontWeight:'bold'}}>Quyền lợi bảo hiểm</Text>
                </View>
                <View style={{justifyContent:'center',alignItems: 'center', padding: 8, flex:1.2}}>
                    <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>Gói Bạc</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Số tiền BH</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, fontWeight: 'bold', textAlign: 'right'}}>20.000.000đ</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Tử vong hoặc thương tật toàn bộ vĩnh viễn</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, textAlign: 'right'}}>20.000.000đ/người/vụ/năm</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Thương tật bộ phận vĩnh viễn</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, textAlign: 'right'}}>10.000.000đ/người/vụ/năm</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Thương tật tạm thời</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, textAlign: 'right'}}>5.000.000đ/người/vụ/năm</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',borderBottomWidth: 1,borderColor:'#D9D9D9'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Phí bảo hiểm</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor, fontWeight: 'bold', textAlign: 'right'}}>90.000đ/người</Text>
                </View>
            </View>
        </View>
    );
    const ThirdRoute1 = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{fontSize:14,color: TxtColor, lineHeight: 17.5,textAlign: 'justify'}}>
                PTI không chịu trách nhiệm trả tiền bảo hiểm trong các trường hợp sau:{'\n'}
                - Hành động cố ý của Người được bảo hiểm hoặc của người thụ hưởng trừ trường hợp Người được bảo hiểm có hành động cứu người, cứu tài sản của Nhà nước, của nhân dân và tham gia chống các hành động phạm pháp;{'\n'}
                - Người được bảo hiểm vi phạm pháp luật, luật giao thông; vi phạm nghiêm trọng nội quy, quy định của chính quyền địa phương hoặc cơ quan;{'\n'}
                - Người được bảo hiểm sử dụng hoặc bị ảnh hưởng của rượu, bia, ma túy, hay các chất kích thích tương tự khác;{'\n'}
                - Người được bảo hiểm tham gia đánh nhau, trừ phi chứng minh được hành động đánh nhau đó chỉ với mục đích tự vệ;{'\n'}
                - Cảm đột ngột, trúng gió, bệnh tật, sẩy thai, bệnh nghề nghiệp, những tai biến trong quá trình điều trị bệnh và thai sản; ngộ độc thức ăn, đồ uống, hoặc hít phải hơi độc, khí độc, chất độc;{'\n'}
                - Điều trị hoặc sử dụng thuốc không theo chỉ dẫn của cơ quan y tế hoặc theo yêu cầu của Người được bảo hiểm;{'\n'}
                - Các hoạt động hàng không (trừ khi với tư cách là khách hàng có vé), các cuộc diễn tập, huấn luyện quân sự, tham gia chiến đấu của các lực lượng vũ trang;{'\n'}
                - Động đất, núi lửa, nhiễm phóng xạ, chiến tranh, đình công, nội chiến;{'\n'}
                - Các rủi ro mang tính đại dịch theo công bố của cơ quan có thẩm quyền (bao gồm nhưng không giới hạn: SARS, H5N1);{'\n'}
                - Người được bảo hiểm điều trị thương tật do tai nạn xảy ra trước ngày bắt đầu bảo hiểm.
            </Text>
        </View>
    );

    const backToInsuranceType = () => {
        Actions.pop()
    }

    const setAccident = (value) => {
        if (value === 1) {
            setIdSelected(1);
        } else {
            setIdSelected(2);
        }
    }

    const headerZIndex = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [999, 1001, 1002],
            extrapolate: 'clamp'
        });

    const arrA1 = insuranceInfo && insuranceInfo.filter(obj => obj.code === 'A1');
    const arrA2 = insuranceInfo && insuranceInfo.filter(obj => obj.code === 'A2');

    const checkPermission = () => {
        if (nameApp.includes('IAGENT')) {
            if (channels.length === 0) {
                setModalPermission(true);
            } else if (channels.length === 1 && channels[0]?.agents?.length === 1) {
                Actions.AccidentPackage({insurProductCode: idSelected})
            } else setModalAgent(true);
        } else {
            Actions.AccidentPackage({insurProductCode: idSelected})
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
                        setTokenInsur('A1', {
                            token: res?.data,
                            channelId: channelId,
                            orgId: orgId,
                        })
                        Actions.AccidentPackage({insurProductCode: idSelected})
                    } else {
                        setModalAgent(false);
                        Actions.AccidentPackage({insurProductCode: idSelected})
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
                <ImageHeaderScroll code={'A2'} offset={offset} />
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
                <HeaderScroll code={'A2'} offset={offset} secondName={organizationCode === 'SVFC'} />
            </View>
            <ScrollView
                style={{ zIndex: 1000 }}
                contentContainerStyle={{
                    paddingTop: HEADER_MAX_HEIGHT
                }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                )}>
                <View style={styles.contentContainer}>
                    {
                        arrA1?.length > 0 && arrA2?.length > 0 ? (
                            <View style={styles.buttonCategory}>
                            <TouchableOpacity
                                style={[styles.buttonSelect,
                                    idSelected === 1 ? {
                                        backgroundColor: NewColor,
                                        borderRadius: 10,
                                    } : null
                                ]}
                                onPress={() => setAccident(1)}
                            >
                                    <Text
                                        style={[styles.titleButton, idSelected === 1 ? {color: 'white'} : null]}
                                    >
                                        Tai nạn cá nhân
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonSelect,
                                        idSelected === 2 ? {
                                            backgroundColor: NewColor,
                                            borderRadius: 10,
                                        } : null
                                    ]}
                                    onPress={() => setAccident(2)}
                                >
                                    <Text
                                        style={[styles.titleButton, idSelected === 2 ? {color: 'white'} : null]}
                                    >
                                        Tai nạn hộ gia đình
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : null 
                    }
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={SceneMap({
                            first: idSelected === 1 ? FirstRoute1 : FirstRoute,
                            second: idSelected === 1 ? SecondRoute1 : SecondRoute,
                            third: idSelected === 1 ? ThirdRoute1 : ThirdRoute,
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
                        codeInsur={'A1'}
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
        color: NewColor,
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

const mapStateToProps = state => {
    return {
        insuranceInfo: state.insurance.insuranceInfo,
        chosenPackage: state.accidentBuy.chosenPackage,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setTokenInsur: (code, obj) => dispatch(setTokenInsur(code, obj)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccidentIntroScreen);
