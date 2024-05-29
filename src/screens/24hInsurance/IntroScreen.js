import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Animated,
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
import { logEventContract } from '../../actions/logContract';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';

function AccidentIntroScreen({ permissionUser, logEventContract }) {
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
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                {nameApp.includes('YCHI') ? 'Bảo hiểm An Sinh Y Chi' : 'An Sinh Mai Linh'} là sản phẩm bảo hiểm độc quyền triển khai bởi Bảo hiểm Bưu điện PTI và {nameApp.includes('YCHI') ? 'Y Chi Việt Nam' : 'Tập đoàn Mai Linh'}.{'\n'}
                Chỉ từ 3.000 VNĐ, khách hàng tham gia {nameApp.includes('YCHI') ? 'Bảo hiểm An Sinh Y Chi' : 'An Sinh Mai Linh'} sẽ được bảo vệ quyền lợi lên tới 1 tỉ đồng.{'\n'}
                Bên cạnh quyền lợi bảo hiểm hấp dẫn, khách hàng còn nhận được hỗ trợ lên tới 110 triệu VNĐ {nameApp.includes('YCHI') ? '' : 'từ Mai Linh'} với sự bảo trợ của Y Chi Việt Nam.
            </Text>
            <Text style={{ marginTop: 16, fontWeight: 'bold', fontSize: 14, color: TxtColor, textAlign: 'justify' }}>
                1. Đối tượng bảo hiểm: <Text style={{ fontWeight: 'normal' }}>
                    Là người Việt Nam hoặc người nước ngoài cư trú tại Việt Nam đáp ứng đầy đủ các điều kiện sau:{'\n'}
                    - Độ tuổi từ 30 ngày tuổi đến 70 tuổi;{'\n'}
                    - Không bị các bệnh động kinh, tâm thần, phong;{'\n'}
                    - Không bị thương tật tại thời điểm tham gia bảo hiểm;{'\n'}
                    - Không bị tàn phế hoặc thương tật vĩnh viễn từ 80% trở lên.
                </Text>
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 16, textAlign: 'justify' }}>
                2. Phạm vi bảo hiểm: <Text style={{ fontWeight: 'normal' }}>
                    {nameApp.includes('YCHI') ? 'Bảo hiểm' : 'An Sinh Mai Linh bảo hiểm'} cho người bị thương tật hoặc tử vong do tai nạn giao thông trong thời hạn bảo hiểm, trong toàn bộ lãnh thổ Việt Nam, bao gồm tai nạn giao thông đường bộ, đường sắt, đường thủy, đường hàng không.
                </Text>
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 16, textAlign: 'justify' }}>
                3. Thời hạn bảo hiểm: <Text style={{ fontWeight: 'normal' }}>
                    linh hoạt theo Ngày/Tuần/Tháng và bắt đầu sau 01 ngày kể từ ngày mua bảo hiểm.
                </Text>
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 16 }}>
                4. Điều kiện bảo hiểm
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, marginTop: 4, textAlign: 'justify' }}>
                - Quy tắc bảo hiểm tai nạn con người ban hành theo Quyết định số 253/QĐ-PTI-BHCN ngày 26/09/2012 của Tổng Giám đốc Tổng Công ty Cổ phẩn Bảo hiểm Bưu điện.{'\n'}
                - Trong trường hợp có sự khác nhau trong cùng một nội dung trên Giấy chứng nhận và Quy tắc bảo hiểm thì áp dụng nội dung trên Giấy chứng nhận của chương trình bảo hiểm này.
            </Text>
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
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Số tiền bảo hiểm{'\n'}<Text style={{ fontWeight: 'normal' }}>(Giới hạn bồi thường/thời hạn bảo hiểm/năm)</Text></Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Tử vong
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        1.000.000.000VNĐ{'\n'}
                        (Chi trả toàn bộ Số tiền bảo hiểm)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Thương tật toàn bộ vĩnh viễn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        1.000.000.000VNĐ{'\n'}
                        (Chi trả toàn bộ Số tiền bảo hiểm)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Thương tật bộ phận vĩnh viễn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        50.000.000VNĐ{'\n'}
                        (Chi trả theo tỷ lệ thương tật bộ phận vĩnh viễn quy định trong Bảng tỷ lệ thương tật)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Thương tật tạm thời
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        30.000.000VNĐ{'\n'}
                        (Chi trả chi phí y tế thực tế, hợp lý điều trị thương tật đến giới hạn tỷ lệ thương tật và số tiền bảo hiểm)
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Trợ cấp nằm viện do thương tật gãy xương
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1.4 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        15.000.000VNĐ{'\n'}
                        (Trợ cấp nằm viện 500.000VNĐ/ngày, tối đa 30 ngày/năm)
                    </Text>
                </View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 16, textAlign: 'justify' }}>
                Quyền lợi hỗ trợ khác của {nameApp.includes('YCHI') ? 'Y Chi Việt Nam' : 'Mai Linh (được bảo trợ bởi Y Chi Việt Nam)'} ngoài Quyền lợi bảo hiểm
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                Trường hợp NĐBH bị tử vong hoặc thương tật toàn bộ vĩnh viễn do tai nạn giao thông và thuộc phạm vi bảo hiểm được chi trả quyền lợi bảo hiểm, {nameApp.includes('YCHI') ? 'Y Chi Việt Nam' : 'Mai Linh'} sẽ hỗ trợ NĐBH chi phí như sau:{'\n'}
                - Chi phí mai táng: 10.000.000VNĐ/NĐBH{'\n'}
                - Chi phí bằng tiền mặt: 100.000.000VNĐ/NĐBH
            </Text>

            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 16 }}>2. Phí bảo hiểm</Text>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6', marginTop: 8 }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                    flex: 1.2,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>Loại bảo hiểm</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>Phí bảo hiểm</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Ngày
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        3.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Tuần
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        15.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Tháng
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        55.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        03 tháng
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        165.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        06 tháng
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        320.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1.2 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        12 tháng
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        610.000VNĐ
                    </Text>
                </View>
            </View>
        </View>
    );
    const ThirdRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
            Các điểm loại trừ khác được quy định tại Quy tắc bảo hiểm:{'\n'}
            - NĐBH tự tử hoặc hành động cố ý gây thương tích của Người được bảo hiểm;{'\n'}
            - Người được bảo hiểm vi phạm pháp luật, vi phạm nghiêm trọng nội quy của cơ quan, vi phạm luật giao thông bao gồm điều khiển phương tiện giao thông không có giấy phép lái xe hợp lệ (đối với loại xe bắt buộc phải có Giấy phép lái xe), đua xe (hợp pháp hoặc bất hợp pháp), xe đi vào đường cấm, khu vực cấm hoặc vượt xe trong đường cấm vượt, đi ngược chiều của đường một chiều, vượt đèn đỏ hoặc không chấp hành theo hiệu lệnh của người điều khiển giao thông, xe đi đêm không có đèn chiếu sáng theo quy định;{'\n'}
            - Người được bảo hiểm trong tình trạng sử dụng rượu, bia  hoặc có nồng độ cồn trong máu/khí thở, trong cơ thể có chất ma túy hoặc các chất kích thích khác mà Pháp luật cấm sử dụng;{'\n'}
            - Người được bảo hiểm tham gia đánh nhau, trừ phi chứng minh được hành động đánh nhau đó chỉ với mục đích tự vệ;{'\n'}
            - Cảm đột ngột, trúng gió, bệnh tật, sẩy thai, bệnh nghề nghiệp, những tai biến trong quá trình điều trị bệnh và thai sản;{'\n'}
            - Ngộ độc thức ăn, đồ uống hoặc hít phải hơi độc, khí độc, chất độc;{'\n'}
            - Điều trị hoặc sử dụng thuốc không theo chỉ dẫn của cơ quan y tế hoặc theo yêu cầu của Người được bảo hiểm;{'\n'}
            - Các hoạt động hàng không (trừ khi với tư cách là hành khách có vé), các cuộc diễn tập, huấn luyện quân sự, tham gia chiến đấu của các lực lượng vũ trang;{'\n'}
            - Động đất, núi lửa, nhiễm phóng xạ, chiến tranh, đình công, nội chiến;{'\n'}
            - Các rủi ro mang tính đại dịch theo công bố của cơ quan có thẩm quyền (bao gồm nhưng không giới hạn: SARS, H5N1, Covid…);{'\n'}
            - Người được bảo hiểm điều trị thương tật do tai nạn xảy ra trước ngày bắt đầu bảo hiểm hoặc trường hợp mất răng, điều trị răng bệnh lý, gãy/vỡ răng không gắn liền với tai nạn, súc vật/rắn/côn trùng cắn và các vết thường phần mềm không phải gẫy xương, bong gân, sai khớp, phẫu thuật nối dây chằng;{'\n'}
            - Tạo hình thẩm mỹ, chỉnh hình, phục hồi chức năng, làm giả các bộ phận của cơ thể (bao gồm nhưng không giới hạn tay giả, chân giả, mắt giả…) và các bộ phận giả được cấy ghép vào bên trong cơ thể;{'\n'}
            - Tử vong không rõ nguyên nhân, đột tử;{'\n'}
            - Nằm viện điều trị do tai nạn tại các nơi không phải là Cơ sở y tế hoặc tai nạn không thuộc phạm vi bảo hiểm;{'\n'}
            - NĐBH là đối tượng bị loại trừ khi tham gia bảo hiểm.
            </Text>
        </View>
    );
    const gotoLogin = () => {
        setOpenModal(false);
        new Store().storeSession(Const.TOKEN, null);
        new Store().storeSession(Const.IS_LOGIN, null);
        Actions.LoginNew();
    };
    const backToInsuranceType = () => {
        Actions.InsuranceType();
        // Actions.tab();
    }

    const checkPermission = () => {
        if (permissionUser?.permissionContract === 'add') {
            logging('ADD_CONTRACT');
            Actions.Package24h();
        } else {
            logging('VIEW_CONTRACT');
            setModalPermission(true);
        }
    }

    const logging = (permis) => {
        const timeEnd = moment().valueOf();
        const count = moment(timeEnd).diff(moment(timerCount), 'milliseconds');
        logEventContract(
            nameApp.includes('YCHI') ? `${nameApp}_AN_SINH_Y_CHI_EVENT_GIOI_THIEU` : `${nameApp}_AN_SINH_MAI_LINH_EVENT_GIOI_THIEU`,
            {
                permissionContract: permis,
                timerCounting: count / 1000,
            }
        );
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
                <ImageHeaderScroll code={'A3'} offset={offset} />
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
                <HeaderScroll code={'A3'} offset={offset} />
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

export default connect(mapStateToProps, {logEventContract})(AccidentIntroScreen);
