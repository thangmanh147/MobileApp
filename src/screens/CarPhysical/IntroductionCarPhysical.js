import React, {useState, useEffect, useRef} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    Linking,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import jwt_decode from "jwt-decode";
import { setTokenInsur } from '../../screens/Agent/actions';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import {widthPercentageToDP,heightPercentageToDP} from '../../config/ConfigResponsive';
import {Color, errValidColor, nameApp, TxtColor, URL} from '../../config/System';
import {connect} from 'react-redux';
import {SceneMap, TabView} from 'react-native-tab-view';
import Store from '../../services/Store';
import Const from '../../services/Const';
import AppText from '../../components/AppText';
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT} from '../../utils/Util';
import Modal from 'react-native-modal';
import moment from 'moment';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import IconIntro1Svg from '../../config/images/tab_carPhysical/IconIntro1Svg';
import IconIntro2Svg from '../../config/images/tab_carPhysical/IconIntro2Svg';
import IconIntro3Svg from '../../config/images/tab_carPhysical/IconIntro3Svg';
import IconIntro4Svg from '../../config/images/tab_carPhysical/IconIntro4Svg';
import IconIntro5Svg from '../../config/images/tab_carPhysical/IconIntro5Svg';
import IconIntro6Svg from '../../config/images/tab_carPhysical/IconIntro6Svg';
import IconIntro7Svg from '../../config/images/tab_carPhysical/IconIntro7Svg';
import IconIntro8Svg from '../../config/images/tab_carPhysical/IconIntro8Svg';
import ModalSelectAgent from '../../components/modalSelectAgent/ModalSelectAgent';

const width1 = 50;

  const rights = [
    {
      label: 'Bảo hiểm bắt buộc',
      product: [
        {
          title: 'Bảo hiểm Trách nhiệm dân sự (TNDS)',
          sub: 'Lên tới 150 triệu đồng/người/vụ',
          icon: <IconIntro1Svg
                  width={width1 - 15}
                  height={((width1 - 15) * 64) / 58} />,
        },
        {
          title: 'Bảo hiểm tai nạn lái, phụ xe và  người ngồi trên xe',
          sub: 'Lên tới 1 tỷ đồng/người/vụ ',
          sub1: '(tối đa không quá 3 tỷ đồng/xe/vụ)',
          icon: <IconIntro2Svg
                  width={width1}
                  height={(width1 * 46) / 87} />,
        },
      ],
    },
    {
      label: 'Bảo hiểm vật chất xe',
      product: [
        {
          title: 'BS02. Bảo hiểm thay thế mới',
          sub:
            'Được bồi thường các bộ phận bị hư hỏng cần phải thay thế thuộc phạm vi bảo hiểm mà không trừ phần hao mòn (khấu hao) sử dụng.',
          icon: <IconIntro3Svg
                  width={width1}
                  height={(width1 * 55) / 87} />,
        },
        {
          title: 'BS04. Bảo hiểm xe bị mất trộm, cướp bộ phận ',
          sub:
            'Được thanh toán chi phí thực tế, hợp lý để thay thế bộ phận bị tổn thất.',
          icon: <IconIntro4Svg
                  width={width1 - 10}
                  height={((width1 - 10) * 58) / 65} />,
        },
        {
          title: 'BS05. Bảo hiểm lựa chọn cơ sở sửa chữa',
          sub:
            'Được lựa chọn cơ sở sửa chữa (gara) ở thời điểm ký kết Hợp đồng bảo hiểm.',
          icon: <IconIntro5Svg
                  width={width1}
                  height={(width1 * 64) / 90} />,
        },
        {
          title:
            'BS06. Bảo hiểm tổn thất về động cơ khi xe hoạt động trong khu vực bị ngập nước',
          sub:
            'Được bồi thường chi phí sửa chữa, thay thế những thiệt hại thực tế của xe khi hoạt động trong vùng ngập nước.',
          icon: <IconIntro6Svg
                  width={width1}
                  height={(width1 * 49) / 88} />,
        },
        {
          title: 'BS13. Bảo hiểm cho thiết bị lắp thêm',
          sub:
            'a. Phạm vi bảo hiểm: Tổn thất của các thiết bị, bạt phủ lắp thêm trên xe ngoài các thiết bị của Nhà sản xuất đã lắp ráp.\nb. Quyền lợi bảo hiểm: PTI chịu trách nhiệm thanh toán chi phí thực tế, hợp lý để thay thế bộ phận bị tổn thất hoặc trả tiền cho Chủ xe cơ giới để bù đắp tổn thất thuộc phạm vị bảo hiểm trên cơ sở xác định được chi phí khắc phục tổn thất có thể phải trả.',
          icon: <IconIntro7Svg
                  width={width1}
                  height={(width1 * 49) / 88} />,
        },
        {
          title: 'Miễn thường khấu trừ 500,000 đồng/vụ tổn thất',
          sub: '',
          icon: <IconIntro8Svg
                  width={width1}
                  height={(width1 * 60) / 89} />,
        },
      ],
    },
  ];

function IntroductionCarInsurance({permissionUser, setTokenInsur}) {

    const offset = useRef(new Animated.Value(0)).current;
    const [routes,setRoutes] = useState([
        {key: 'first', title: 'Giới thiệu'},
        {key: 'second', title: 'Quyền lợi'},
        {key: 'third', title: 'Phí bảo hiểm'},
    ])

    const [index,setIndex] = useState(0)
    const [modalPermission, setModalPermission] = useState(false);
    const [modalAgent, setModalAgent] = useState(false);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
      new Store().getSession(Const.TOKEN).then(token => {
        let url = `${URL}/api/insured-object/v1/products/C2/channel-agents`;
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
                  routes?.map((item,idx) => {
                      return (
                          <TouchableOpacity onPress={()=>setIndex(idx)} style={styles.styleTab}>
                              <Text style={{
                                  color: Number(idx) === index ? Color : '#8D8C8D',
                                  fontSize: 14,
                                  paddingBottom: 12,
                                  fontWeight: 'bold',
                              }}>{item?.title}</Text>
                              <View style={{ width: '100%', height: 2, backgroundColor: Number(idx) === index ? Color : 'white' }} />
                          </TouchableOpacity>
                      )
                  })
              }
            </View>
        </View>
    )

    const FirstRoute = () => (
        <View style={{paddingHorizontal:24}}>
            <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor}}>1. Phạm vi bảo hiểm</Text>
            <Text style={{marginTop: 7,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
              PTI bồi thường cho Chủ xe những thiệt hại vật chất xe xảy ra do tai nạn bất ngờ, ngoài sự kiểm soát của Chủ xe, Lái xe trong những trường hợp sau đây:
            </Text>
            <Text style={{marginTop: 4,fontSize:14,color:TxtColor, lineHeight: 17.5}}>
              - Đâm, va, lật, đổ.{'\n'}
              - Hoả hoạn, cháy, nổ.{'\n'}
              - Những tai nạn bất khả kháng do thiên nhiên: Bão, lũ lụt, sét đánh, động đất, mưa đá, sạt lở.{'\n'}
              - Vật thể từ bên ngoài tác động lên xe.{'\n'}
              - Mất cắp, mất cướp toàn bộ xe.{'\n'}
              - Tai nạn do rủi ro bất ngờ khác gây nên ngoài những điểm loại trừ.{'\n'}
              - Ngoài ra PTI còn thanh toán những chi phí cần thiết và hợp lý nhằm:{'\n'}
              - Ngăn ngừa, hạn chế tổn thất phát sinh thêm;{'\n'}
              - Chi phí đưa xe thiệt hại tới nơi sửa chữa gần nhất;{'\n'}
              - Giám định tổn thất.
            </Text>
            <Text style={{marginTop: 4,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
              Trong mọi trường hợp tổng số tiền bồi thường của PTI (bao gồm các chi phí) không vượt quá số tiền bảo hiểm đã ghi trên Giấy chứng nhận bảo hiểm.
            </Text>
            <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor, marginTop: 12}}>2. Không thuộc phạm vi trách nhiệm bảo hiểm</Text>
            <Text style={{marginTop: 7,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
              PTI không chịu trách nhiệm bồi thường những trường hợp sau:{'\n'}
              a. Đối với những thiệt hại vật chất của xe gây ra do các nguyên nhân:{'\n'}
              - Hao mòn, hư hỏng tự nhiên phát sinh từ việc hoạt động bình thường của chiếc xe gây ra.{'\n'}
              - Hư hỏng do khuyết tật, ẩn tỳ, mất giá trị, giảm dần chất lượng cho dù có Giấy chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường phương tiện giao thông cơ giới đường bộ.{'\n'}
              - Hư hỏng hoặc tổn thất thêm do quá trình sửa chữa và do vật thể trong xe tác động lên mà không phải do xe đâm va, lật đổ.{'\n'}
              - Hư hỏng về điện hoặc bộ phận máy móc, thiết bị (âm thanh, hình ảnh, điều hoà nhiệt độ, thiết bị định vị).{'\n'}
              - Xe bị thiệt hại, sau khi sửa chữa phải đăng kiểm lại theo quy định của Nhà nước mà chưa đi đăng kiểm lại.{'\n'}
              - Tổn thất động cơ xe do đi vào vùng ngập nước hay do nước lọt vào động cơ xe gây hiện tượng thủy kích phá hỏng động cơ xe (trừ khi có thỏa thuận khác bằng văn bản).{'\n'}
              b. Đối với những tổn thất:{'\n'}
              - Mất cắp bộ phận xe (trừ khi có thỏa thuận khác bằng văn bản).{'\n'}
              - Săm lốp, chụp lốp, mark, đề can xe bị hư hỏng trừ trường hợp thiệt hại xảy ra do cùng một nguyên nhân và đồng thời với các bộ phận khác của xe trong cùng một vụ tai nạn.{'\n'}
              - Bạt phủ, các thiết bị lắp thêm trên xe ngoài các thiết bị của nhà sản xuất đã lắp ráp (không tính các thiết bị mang tính chất bảo vệ cho xe như hệ thống báo động, cảm biến báo lùi, cản trước, cản sau).
            </Text>
            <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor, marginTop: 12}}>3. Giá trị bảo hiểm và số tiền bảo hiểm</Text>
            <Text style={{marginTop: 7,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
              Giá trị bảo hiểm: do PTI và Chủ xe thỏa thuận theo giá trị thực tế trên thị trường tại thời điểm tham gia bảo hiểm.{'\n'}
              Số tiền bảo hiểm: là số tiền mà Chủ xe yêu cầu PTI bảo hiểm cho xe của mình và được ghi trên Giấy chứng nhận bảo hiểm.
            </Text>
            <Text style={{
              marginTop: 16,
              fontSize: 14,
              color: TxtColor,
              fontWeight: 'bold'
            }}>
              Quyết định ban hành Quy tắc bảo hiểm ô tô tự nguyện:
            </Text>
            <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() => Linking.openURL('https://media.pti.com.vn/default-pti/files/1%20-%20Quyet%20dinh%20ban%20hanh%20Quy%20tac%20bao%20hiem%20XCG%202019_1546587803.pdf')}
            >
              <Text style={{
                fontSize: 14,
                color: TxtColor,
                textDecorationLine: 'underline'
              }}>
                https://media.pti.com.vn/default-pti/files/1%20-%20Quyet%20dinh%20ban%20hanh%20Quy%20tac%20bao%20hiem%20XCG%202019_1546587803.pdf
              </Text>
            </TouchableOpacity>
            <Text style={{
              marginTop: 16,
              fontSize: 14,
              color: TxtColor,
              fontWeight: 'bold'
            }}>
              Quy tắc bảo hiểm:
            </Text>
            <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() => Linking.openURL('https://media.pti.com.vn/default-pti/files/1.Quy%20tac%20bao%20hiem%20XCG%202019%20(full)_1546587803.pdf')}
            >
              <Text style={{
                fontSize: 14,
                color: TxtColor,
                textDecorationLine: 'underline'
              }}>
                https://media.pti.com.vn/default-pti/files/1.Quy%20tac%20bao%20hiem%20XCG%202019%20(full)_1546587803.pdf
              </Text>
            </TouchableOpacity>
            <Text style={{
              marginTop: 16,
              fontSize: 14,
              color: TxtColor,
              fontWeight: 'bold'
            }}>
              Bảng quy định chi trả tiền bồi thường thiệt hại về người:
            </Text>
            <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() => Linking.openURL('https://media.pti.com.vn/default-pti/files/1.1Phu%20luc%2001%20-%20Bang%20tra%20tien%20thuong%20tat%20(full)_1546587803.pdf')}
            >
              <Text style={{
                fontSize: 14,
                color: TxtColor,
                textDecorationLine: 'underline'
              }}>
                https://media.pti.com.vn/default-pti/files/1.1Phu%20luc%2001%20-%20Bang%20tra%20tien%20thuong%20tat%20(full)_1546587803.pdf
              </Text>
            </TouchableOpacity>
            <Text style={{
              marginTop: 16,
              fontSize: 14,
              color: TxtColor,
              fontWeight: 'bold'
            }}>
              Hệ thống gara liên kết:
            </Text>
            <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() => Linking.openURL('https://www.pti.com.vn/ve-pti/mang-luoi-phuc-vu/he-thong-gara-lien-ket.html')}
            >
              <Text style={{
                fontSize: 14,
                color: TxtColor,
                textDecorationLine: 'underline'
              }}>
                https://www.pti.com.vn/ve-pti/mang-luoi-phuc-vu/he-thong-gara-lien-ket.html
              </Text>
            </TouchableOpacity>
        </View>
    )
    const SecondRoute = () => (
        <View style={{paddingHorizontal:24}}>
            {rights.map((item, index) => {
                return (
                  <View key={index} style={{paddingBottom: 16}}>
                    <AppText style={styles.sub1}>
                      {index + 1}. {item.label}
                    </AppText>
                    {item.product.map((product, i) => {
                      return (
                        <View style={[styles.ctItemRight, {paddingTop: i === 0 ? 7 : 12}]} key={i}>
                          <View
                            style={{width: width1 + 25, alignItems: 'center'}}>
                            {product.icon}
                          </View>
                          <View style={{flex: 1}}>
                              <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor,textAlign: 'justify'}}>{product.title}</Text>
                            {product.sub !== '' && (
                                <Text style={{fontSize:14,color:TxtColor,textAlign: 'justify'}}>{product.sub}</Text>
                            )}
                            {product.sub1 && (

                                <Text style={{fontSize:14,color:TxtColor,textAlign: 'justify'}}>{product.sub1}</Text>

                                )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
        </View>
    );
    const ThirdRoute = () => (
        <View style={{paddingHorizontal:24}}>
          <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor}}>1. Bồi thường tổn thất</Text>
          <Text style={{marginTop: 7,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
            Theo sự lựa chọn của mình, PTI thanh toán chi phí thực tế để khôi phục xe hoặc bộ phận bị tổn thất trở về tình trạng như trước khi xảy ra tổn thất tại đơn vị sửa chữa do PTI chỉ định/chấp nhận hoặc trả tiền cho Chủ xe để bù đắp tổn thất trên cơ sở xác định được chi phí sửa chữa, khắc phục tổn thất thuộc phạm vi trách nhiệm của PTI.
          </Text>
          <Text style={{marginTop: 3,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>Trong quá trình sửa chữa xe được bảo hiểm, trường hợp bộ phận hư hỏng không thể sửa chữa được thì số tiền bồi thường cho việc thay mới bộ phận đó sẽ được khấu trừ một tỷ lệ khấu hao tương ứng với mức độ hao mòn của bộ phận đó vào ngay trước thời điểm xảy ra sự kiện bảo hiểm (trừ khi có thỏa thuận khác bằng văn bản).</Text>
          <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor, marginTop: 12}}>a.	Bồi thường tổn thất bộ phận:</Text>
          <Text style={{marginTop: 3,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
            -	Trường hợp xe tham gia bảo hiểm toàn bộ:
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
                Nếu xe tham gia bảo hiểm đúng hoặc cao hơn giá trị thực tế của xe tại thời điểm tham gia bảo hiểm thì bồi thường đúng bằng giá sửa chữa, khôi phục.
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
                Nếu xe tham gia bảo hiểm dưới giá trị thực tế của xe tại thời điểm tham gia bảo hiểm thì số tiền bồi thường được tính theo tỷ lệ giữa số tiền tham gia bảo hiểm với giá trị thực tế của xe tại thời điểm tham gia bảo hiểm.
              </Text>
          </View>
          <Text style={{marginTop: 4,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
            -	Trường hợp xe tham gia bảo hiểm theo tổng thành thân vỏ:
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
                Nếu xe tham gia bảo hiểm đúng hoặc cao hơn giá trị thực tế của tổng thành thân vỏ tại thời điểm tham gia bảo hiểm thì bồi thường đúng bằng giá sửa chữa, khôi phục tổng thành thân vỏ.
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
                Nếu xe tham gia bảo hiểm thấp hơn giá trị thực tế của tổng thành thân vỏ tại thời điểm tham gia bảo hiểm thì số tiền bồi thường được tính theo tỷ lệ giữa số tiền tham gia bảo hiểm với giá trị thực tế của tổng thành thân vỏ tại thời điểm tham gia bảo hiểm.
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
                PTI bồi thường toàn bộ chi phí sơn lại xe nếu trên 50% diện tích sơn của xe bị hư hỏng do tai nạn gây ra.
              </Text>
          </View>
          <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor, marginTop: 12}}>b. Bồi thường tổn thất toàn bộ:</Text>
          <Text style={{marginTop: 4,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
            PTI chỉ chấp thuận bồi thường tổn thất toàn bộ thực tế hoặc tổn thất toàn bộ ước tính khi giá trị sửa chữa, khôi phục xe bị tai nạn vượt quá 75% giá trị thực tế của xe.
          </Text>
          <Text style={{marginTop: 4,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
            -	Nếu xe tham gia bảo hiểm cao hơn giá trị thực tế của xe tại thời điểm tham gia bảo hiểm thì bồi thường bằng giá trị thực tế của xe khi xảy ra tai nạn.{'\n'}
            -	Nếu xe tham gia bảo hiểm bằng hoặc thấp hơn giá trị thực tế của xe tại thời điểm tham gia bảo hiểm thì bồi thường toàn bộ số tiền ghi trên Giấy chứng nhận bảo hiểm.{'\n'}
            -	Khi PTI đã bồi thường tổn thất toàn bộ xe được bảo hiểm cho Chủ xe, PTI có quyền thu hồi hoặc định đoạt chiếc xe đó. Nếu xe tham gia bảo hiểm thấp hơn giá trị thực tế của xe, PTI sẽ thu hồi giá trị còn lại (xác xe) theo tỷ lệ phần trăm giữa số tiền tham gia bảo hiểm với giá trị thực tế của xe tại thời điểm xảy ra tai nạn.
          </Text>
          <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor, marginTop: 12}}>c.	Trường hợp xe bị mất cắp, mất cướp toàn bộ xe</Text>
          <Text style={{marginTop: 4,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
            Chủ xe và/hoặc Lái xe báo ngay cho cơ quan công an, PTI nơi gần nhất và chính quyền địa phương nơi xe bị mất cắp, mất cướp để lập biên bản và có kế hoạch điều tra xử lý vụ việc. Trong vòng hai mươi tư (24) giờ kể từ khi xe bị mất cắp, bị cướp Chủ xe và/hoặc Lái xe phải xác nhận lại việc đó bằng văn bản cho PTI. Sau sáu mươi (60) ngày mà xe bị mất cắp, mất cướp không tìm được:{'\n'}
            -	PTI sẽ bồi thường cho Chủ xe toàn bộ số tiền bảo hiểm ghi trên Giấy chứng nhận bảo hiểm, nếu xe tham gia bảo hiểm với số tiền bảo hiểm bằng hoặc thấp hơn giá trị thực tế của xe tại thời điểm tham gia bảo hiểm.{'\n'}
            -	PTI sẽ bồi thường cho Chủ xe giá trị thực tế của xe, nếu xe tham gia bảo hiểm với số tiền bảo hiểm cao hơn giá trị thực tế của xe tại thời điểm tham gia bảo hiểm.{'\n'}
            -	Nếu tìm lại được xe sau khi bồi thường, PTI có quyền định đoạt xe đó. Trường hợp xe tham gia bảo hiểm dưới giá trị PTI sẽ thu hồi giá trị còn lại (sau khi đã trừ đi các khoản chi phí thu hồi xe) theo tỷ lệ giữa số tiền tham gia bảo hiểm với giá trị thực tế của xe tại thời điểm tham gia bảo hiểm.
          </Text>
          <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor, marginTop: 12}}>2. Mức miễn thường</Text>
          <Text style={{marginTop: 4,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
            -	PTI áp dụng mức miễn thường có khấu trừ là 500.000 đồng/vụ (trừ trường hợp có thoả thuận khác bằng văn bản).
          </Text>
        </View>
    )
    const getBack = () => {
      if (nameApp.includes('IAGENT') || nameApp.includes('INSO')) {
        Actions.tab();
      } else {
        Actions.InsuranceType();
      }
    }

    const checkPermission = () => {
      if (nameApp.includes('IAGENT')) {
        if (channels.length === 0) {
          setModalPermission(true);
        } else if (channels.length === 1 && channels[0]?.agents?.length === 1) {
          Actions.InfomationCarPhysical();
        } else setModalAgent(true);
      } else {
        Actions.InfomationCarPhysical();
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
                    setTokenInsur('C2', {
                        token: res?.data,
                        channelId: channelId,
                        orgId: orgId,
                    })
                    Actions.InfomationCarPhysical();
                } else {
                    setModalAgent(false);
                    Actions.InfomationCarPhysical();
                }
            })
            .catch((error) => {
                console.log(error)
            })
    })
}

  const headerZIndex = offset.interpolate(
    {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [999, 1001, 1002],
        extrapolate: 'clamp'
    });

    return (
        <View style={styles.container}>
          <Animated.View style={{zIndex: headerZIndex}}>
              <ImageHeaderScroll code={'C2'} offset={offset} />
          </Animated.View>
          <View style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2012
          }}>
              <TouchableOpacity
                  onPress={() => getBack()}
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
              <HeaderScroll code={'C2'} offset={offset} />
          </View>
            <ScrollView
                style={{ zIndex: 1000 }}
                contentContainerStyle={{
                    paddingTop: HEADER_MAX_HEIGHT,
                }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                )}>
                  <View style={styles.contentContainer}>
                    <TabView
                        navigationState={{index,routes}}
                        renderScene={SceneMap({
                            first: FirstRoute,
                            second: SecondRoute,
                            third: ThirdRoute
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
                        codeInsur={'C2'}
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
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
    },
    styleTab:{
        flex:1.5,justifyContent:'center',alignItems:'center'
    },
    sub: {
        color: TxtColor,
        fontWeight: 'bold',
        fontSize: 16,
      },
      sub1: {
        color: TxtColor,
        fontWeight: 'bold',
        fontSize: 14,
      },
      label: {
        color: TxtColor,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
      },
      ctItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
      },
});

const mapStateToProps = state => {
  return {
      permissionUser: state.insurance.permissionUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      setTokenInsur: (code, obj) => dispatch(setTokenInsur(code, obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroductionCarInsurance);
