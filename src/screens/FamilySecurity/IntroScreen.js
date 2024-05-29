import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Animated,
    Linking,
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, errValidColor, nameApp, NewColor, TxtColor } from '../../config/System';
import { SceneMap, TabView } from 'react-native-tab-view';
import { set } from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { checkExpToken } from '../../config/decodeToken';
import BaseModal from '../../components/BaseModal';
import jwt_decode from "jwt-decode";
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT } from '../../utils/Util';
import Modal from 'react-native-modal';
import moment from 'moment';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import { colorNote } from '../../app-mailinh/config/mailinh';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';

function AccidentIntroScreen({ permissionUser }) {
    const offset = useRef(new Animated.Value(0)).current;
    const [routes, setRoutes] = useState([
        { key: 'first', title: 'Giới thiệu' },
        { key: 'second', title: 'Quyền lợi và phí' },
        { key: 'third', title: 'Loại trừ BH' },
    ]);

    const [index, setIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [modalPermission, setModalPermission] = useState(false);
    const [timerCount, setTimerCount] = useState(moment().valueOf());

    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
            if (checkExpToken(token) == false) {
                setOpenModal(true);
            }
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
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, textAlign: 'justify' }}>
                1. Bên bảo hiểm
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify', marginTop: 4 }}>
                Tổng Công ty Cổ phần Bảo hiểm Bưu điện (PTI).
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 12, textAlign: 'justify' }}>
                2. Bên mua bảo hiểm/Người được bảo hiểm (NĐBH)
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify', marginTop: 4 }}>
                Là công dân Việt Nam, người nước ngoài đang cư trú tại Việt Nam có yêu cầu bảo hiểm và được PTI cấp GCNBH đáp ứng các thông tin sau:{'\n'}
                - Độ tuổi từ 18 đến tối đa 70 tuổi tại thời điểm tham gia bảo hiểm;{'\n'}
                - Không bị động kinh, tâm thần, phong;{'\n'}
                - Không bị tàn phế hoặc thương tật vĩnh viễn từ 50% trở lên.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 12, textAlign: 'justify' }}>
                3. Quy tắc bảo hiểm
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify', marginTop: 4 }}>
                Quy tắc BH tai nạn con người theo quyết định 255/QĐ-PTI ngày 26/09/2012.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 12 }}>
                4. Thời hạn bảo hiểm
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, marginTop: 4, textAlign: 'justify' }}>
                01 năm trong đó ngày bắt đầu bảo hiểm tối thiểu từ 24h ngày tiếp theo ngày PTI nhận được yêu cầu bảo hiểm hoặc ngày nào khác tùy thời điểm nào đến sau.{'\n'}
                Ví dụ:{'\n'}
                - TH1: PTI nhận được yêu cầu bảo hiểm từ 10h ngày 01/06/2022 thì THBH là 24h ngày 02/06/2022 đến 24h ngày 02/06/2023{'\n'}
                - TH2: PTI nhận được yêu cầu bảo hiểm từ 10h ngày 01/06/2022, yêu cầu thời hạn bảo hiểm từ ngày 10/6/2022 thì THBH chính của NĐBH từ 00h ngày 10/6/2022 đến 00h ngày 10/06/2023{'\n'}
                Ghi chú: Ngày yêu cầu bảo hiểm là ngày PTI nhận được thông tin yêu cầu bảo hiểm trên hệ thống cấp đơn online của PTI. Ngày bắt đầu bảo hiểm trong mọi trường hợp không được trước ngày hiện tại.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 12 }}>
                5. Phạm vi bảo hiểm
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, marginTop: 4, textAlign: 'justify' }}>
                Bảo hiểm cho những rủi ro Tai Nạn đối với NĐBH làm cho NĐBH phải điều trị tại các Cơ Sở Y Tế trong thời hạn bảo hiểm trong lãnh thổ Việt Nam.
            </Text>
            <Text style={{
              marginTop: 16,
              fontSize: 14,
              color: TxtColor,
              fontWeight: 'bold'
            }}>
              Quy tắc Bảo hiểm tại nạn mức trách nhiệm cao:
            </Text>
            <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() => Linking.openURL('https://media.pti.com.vn/default-pti/files/BH%20tai%20n%e1%ba%a1n%20m%e1%bb%a9c%20TNC%20255-trang-1-14.pdf')}
            >
              <Text style={{
                fontSize: 14,
                color: TxtColor,
                textDecorationLine: 'underline'
              }}>
                https://media.pti.com.vn/default-pti/files/BH%20tai%20n%e1%ba%a1n%20m%e1%bb%a9c%20TNC%20255-trang-1-14.pdf
              </Text>
            </TouchableOpacity>
        </View>
    );
    const SecondRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>1. Quyền lợi bảo hiểm</Text>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 8 }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Quyền lợi bảo hiểm</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    flex: 1.4,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Gói Bạc</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Tử vong/thương tật toàn bộ vĩnh viễn do tai nạn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        100.000.000VNĐ{'\n'}
                        (Trả 100% Số tiền bảo hiểm)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Thương tật bộ phận vĩnh viễn do tai nạn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        100.000.000VNĐ{'\n'}
                        (Trả theo tỷ lệ thương tật vĩnh viễn với STBH)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Chi phí y tế khi điều trị Thương tật do tai nạn tại các Cơ sở y tế
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        5.000.000VNĐ{'\n'}
                        (Chi trả chi phí y tế thực tế hợp lý đến giới hạn tham gia)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Trợ cấp nằm viện điều trị nội trú khi Thương tật do Tai Nạn tại các Cơ sở y tế
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        100.000VNĐ/ngày{'\n'}
                        (Trợ cấp khi nằm viện nội trú, tối đa 180 ngày/năm)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Trợ cấp giáo dục khi NĐBH tử vong do tai nạn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        10.000.000VNĐ{'\n'}
                        (Trợ cấp 1 lần đến STBH)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 16 }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Quyền lợi bảo hiểm</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    flex: 1.4,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Gói Vàng</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Tử vong/thương tật toàn bộ vĩnh viễn do tai nạn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        200.000.000VNĐ{'\n'}
                        (Trả 100% Số tiền bảo hiểm)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Thương tật bộ phận vĩnh viễn do tai nạn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        200.000.000VNĐ{'\n'}
                        (Trả theo tỷ lệ thương tật vĩnh viễn với STBH)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Chi phí y tế khi điều trị Thương tật do tai nạn tại các Cơ sở y tế
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        5.000.000VNĐ{'\n'}
                        (Chi trả chi phí y tế thực tế hợp lý đến giới hạn tham gia)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Trợ cấp nằm viện điều trị nội trú khi Thương tật do Tai Nạn tại các Cơ sở y tế
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        200.000VNĐ/ngày{'\n'}
                        (Trợ cấp khi nằm viện nội trú, tối đa 180 ngày/năm)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Trợ cấp giáo dục khi NĐBH tử vong do tai nạn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        10.000.000VNĐ{'\n'}
                        (Trợ cấp 1 lần đến STBH)
                    </Text>
                </View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 16 }}>2. Phí bảo hiểm <Text style={{ fontWeight: 'normal' }}>(đơn vị: VNĐ)</Text></Text>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 8 }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>Gói BH</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    flex: 1,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>12 tháng</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    flex: 1,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>06 tháng</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Gói Bạc
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        360.000
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        216.000
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Gói Vàng
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        560.000
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        336.000
                    </Text>
                </View>
            </View>
        </View>
    );
    const ThirdRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, textAlign: 'justify' }}>
                1. Điểm loại trừ
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify', marginTop: 4 }}>
                PTI không chịu trách nhiệm bảo hiểm cho các trường hợp sau:{'\n'}
                - Hành động cố ý của Người được bảo hiểm hoặc của Người thụ hưởng của Người được bảo hiểm;{'\n'}
                - NĐBH vi phạm pháp luật, vi phạm nghiêm trọng nội quy của cơ quan, vi phạm luật giao thông bao gồm điều khiển phương tiện giao thông không có giấy phép lái xe hợp lệ (đối với loại xe bắt buộc phải có giấy phép lái xe); đua xe (hợp pháp hoặc bất hợp pháp); xe đi vào đường cấm, khu vực cấm hoặc vượt xe trong đường cấm vượt; đi ngược chiều của đường một chiều; vượt đèn đỏ hoặc không chấp hành theo hiệu lệnh của người điều khiển giao thông; xe đi đêm không có đèn chiếu sáng theo quy định;{'\n'}
                - Người được bảo hiểm trong tình trạng sử dụng rượu, bia hoặc có nồng độ cồn trong máu/khí thở, trong cơ thể có chất ma túy hoặc các chất kích thích khác mà Pháp luật cấm sử dụng;{'\n'}
                - Người được bảo hiểm tham gia đánh nhau, trừ khi chứng minh được hành động đánh nhau đó chỉ với mục đích tự vệ;{'\n'}
                - Cảm đột ngột, trúng gió, bệnh tật, sẩy thai, bệnh nghề nghiệp, những tai biến trong quá trình điều trị bệnh và thai sản;{'\n'}
                - Ngộ độc thức ăn, đồ uống, hoặc hít phải hơi độc, khí độc, chất độc;{'\n'}
                - Điều trị hoặc sử dụng thuốc không theo chỉ dẫn của cơ quan y tế hoặc theo yêu cầu của Người được bảo hiểm;{'\n'}
                - Các thương tật do côn trùng/bò sát/súc vật cắn, các vết thương phần mềm như rách da, bầm tím, bong gân, sai khớp… không bó bột hoặc không phẫu thuật và không có phim X-Quang/MRI/CT;{'\n'}
                - Người được bảo hiểm điều trị thương tật do tai nạn xảy ra trước ngày bắt đầu bảo hiểm;{'\n'}
                - Người không phải là Người được bảo hiểm được quy định tại chương trình này;{'\n'}
                - Tử vong do tai nạn nhưng không cung cấp được hồ sơ bồi thường theo quy định mục 2 dưới đây.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 12, textAlign: 'justify' }}>
                2. Hồ sơ yêu cầu bồi thường
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify', marginTop: 4 }}>Người được bảo hiểm/người thụ hưởng nộp hồ sơ bồi thường cho PTI trong vòng 90 ngày kể từ khi kết thúc điều trị hoặc tử vong gồm các thông tin sau:</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    width: 4.3,
                    height: 4.3,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 10,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Giấy yêu cầu trả tiền bảo hiểm (bản gốc theo mẫu)
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    width: 4.3,
                    height: 4.3,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 10,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Chứng minh nhân dân/CCCD (photo)
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    width: 4.3,
                    height: 4.3,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 10,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Giấy ủy quyền hợp pháp trường hợp ủy quyền cho người khác yêu cầu bồi thường trừ trường hợp là bố/mẹ/vợ/chồng/con trên 18 tuổi của NĐBH
                </Text>
            </View>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify', marginTop: 4 }}>(1). Trường hợp thương tật</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    width: 4.3,
                    height: 4.3,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 10,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Các chứng từ liên quan đến việc điều trị tai nạn: Giấy ra viện hoặc giấy chứng thương và phim chụp (XQ…) kèm kết luận của Bác sỹ, hóa đơn điều trị y tế, Bảng kê chi tiết viện phí.
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    width: 4.3,
                    height: 4.3,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 10,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Giấy phép lái xe (trường hợp tai nạn khi đi xe cơ giới).
                </Text>
            </View>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify', marginTop: 4 }}>(2). Trường hợp tử vong/thương tật toàn bộ vĩnh viễn</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    width: 4.3,
                    height: 4.3,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 10,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Giấy ra viện hoặc giấy chứng thương và phim chụp (XQ…) kèm kết luận của Bác sỹ, hóa đơn điều trị y tế, Bảng kê chi tiết viện phí.
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    width: 4.3,
                    height: 4.3,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 10,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Biên bản kết luận nguyên nhân tai nạn của Công an điều tra hoặc Biên bản kết luận nguyên nhân tai nạn của công an giao thông. Đây là chứng từ bắt buộc khi giải quyết quyền lợi tử vong/thương tật toàn bộ vĩnh viễn.
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    width: 4.3,
                    height: 4.3,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 10,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Giấy phép lái xe (trường hợp tai nạn khi đi xe cơ giới).
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    width: 4.3,
                    height: 4.3,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 10,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Giấy chứng tử, Giấy xác nhận quyền thừa kế hợp pháp.
                </Text>
            </View>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify', marginTop: 4 }}>(3). Các chứng từ, bằng chứng chứng minh rủi ro khác theo yêu cầu của PTI</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: TxtColor, lineHeight: 17.5, textAlign: 'justify', marginTop: 4 }}>PTI tiếp nhận hồ sơ bản gốc hoặc bản sao công chứng trước khi chuyển tiền bồi thường</Text>
        </View>
    );
    const gotoLogin = () => {
        setOpenModal(false);
        new Store().storeSession(Const.TOKEN, null);
        new Store().storeSession(Const.IS_LOGIN, null);
        Actions.LoginNew();
    };
    const backToInsuranceType = () => {
        Actions.InsuranceType()
    }

    const checkPermission = () => {
        if (permissionUser?.permissionContract === 'add') {
            Actions.PackageFaSecure();
        } else {
            setModalPermission(true);
        }
    }

    const headerZIndex = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [999, 1001, 1002],
            extrapolate: 'clamp'
        });

    return (
        <View style={styles.container}>
            <Animated.View style={{ zIndex: headerZIndex }}>
                <ImageHeaderScroll code={'A8'} offset={offset} />
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
            <View style={{ zIndex: 2011 }}>
                <HeaderScroll code={'A8'} offset={offset} />
            </View>
            <ScrollView
                style={{ zIndex: 1000 }}
                contentContainerStyle={{
                    paddingTop: HEADER_MAX_HEIGHT,
                    paddingBottom: 24,
                }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }]
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
            <BaseModal
                open={openModal}
                forceUpdate={true}
                onPress={() => gotoLogin()}
                label={'ĐỒNG Ý'}
                text="Phiên bản đăng nhập đã hết hạn. Mời bạn đăng nhập lại."
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    titleContentIntro: {
        fontSize: 14,
        color: '#676667',
        textAlign: 'justify',
    },
    dotContentIntro: {
        width: 5,
        height: 5,
        borderRadius: 50,
        backgroundColor: '#676667',
        marginRight: 8,
        marginLeft: 13,
        marginTop: 11,
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
        permissionUser: state.insurance.permissionUser,
    };
};

export default connect(mapStateToProps)(AccidentIntroScreen);
