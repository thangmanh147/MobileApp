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
import { logEventContract } from '../../actions/logContract';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import { colorNote } from '../../app-mailinh/config/mailinh';
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
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, textAlign: 'justify' }}>
                1. Đối tượng bảo hiểm
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify', marginTop: 4 }}>Là người Việt Nam hoặc nước ngoài không quá 70 tuổi đang sinh sống, làm việc tại Việt Nam và thỏa mãn đồng thời hai điều kiện sau:</Text>
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
                    Không bị động kinh, tâm thần;
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
                    Không bị thương tật vĩnh viễn từ 80% trở lên.
                </Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 12, textAlign: 'justify' }}>
                2. Phạm vi bảo hiểm
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify', marginTop: 4 }}>
                - Mở rộng phạm vi địa lý: theo điều khoản này PTI đồng ý mở rộng bảo hiểm ra phạm vi địa lý toàn thế giới.{'\n'}
                - Bảo hiểm các trường hợp ngộ độc: theo điều khoản này, PTI đồng ý mở rộng bảo hiểm sự kiện ngộ độc (bao gồm và không giới hạn ngộ độc thức ăn, thức uống hoặc hít phải hơi độc, khí độc, chất độc).{'\n'}
                - Bồi thường trong trường hợp Tử vong và Chi phí y tế điều trị do tai nạn phát sinh trong thời hạn bảo hiểm.{'\n'}
                - Phạm vi của Quỹ hỗ trợ: lãnh thổ Việt Nam.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 12 }}>
                3. Quy tắc áp dụng
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, marginTop: 4, textAlign: 'justify' }}>
                Quy tắc bảo hiểm Tai nạn ban hành kèm theo Quyết định số 270/QĐ-PTI-BHCN ngày 26/09/2012 của Tổng Giám đốc Tổng công ty Cổ phần Bảo hiểm Bưu điện.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 12 }}>
                4. Thời hạn bảo hiểm
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, marginTop: 4, textAlign: 'justify' }}>
                - Tối thiểu từ: 00h00 ngày T+1 của ngày đăng ký tham gia bảo hiểm.
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
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Gói Kim Cương</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Tử vong do tai nạn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        120.000.000VNĐ/{'\n'}người/thời hạn bảo hiểm
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Chi phí y tế điều trị tai nạn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        60.000.000VNĐ/{'\n'}người/thời hạn bảo hiểm
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6' }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Quỹ hỗ trợ</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Số tiền</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingTop: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>
                        - Quỹ hỗ trợ dịch bệnh
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        1. NĐBH tử vong sau 07 ngày từ ngày bắt đầu BH do dịch bệnh
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        120.000.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        2. Quỹ trợ cấp nằm viện điều trị dịch bệnh tại các cơ sở y tế khi NĐBH nhập viện sau 07 ngày kể từ ngày bắt đầu BH
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        12.000.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        3. Quỹ trợ cấp điều trị dịch bệnh tại nhà theo xác nhận của cơ quan có thẩm quyền khi NĐBH nhiễm dịch bệnh sau 14 ngày kể từ ngày bắt đầu bảo hiểm
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        500.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingTop: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>
                        - Quỹ hỗ trợ sốc phản vệ/phản vệ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        1. NĐBH tử vong do sốc phản vệ/phản vệ
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        120.000.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        2. Nằm viện điều trị sốc phản vệ/phản vệ tại các cơ sở y tế
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingBottom: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        12.000.000VNĐ
                    </Text>
                </View>
            </View>

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
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Gói Vàng</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Tử vong do tai nạn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        80.000.000VNĐ/{'\n'}người/thời hạn bảo hiểm
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Chi phí y tế điều trị tai nạn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        40.000.000VNĐ/{'\n'}người/thời hạn bảo hiểm
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6' }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Quỹ hỗ trợ</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Số tiền</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingTop: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>
                        - Quỹ hỗ trợ dịch bệnh
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        1. NĐBH tử vong sau 07 ngày từ ngày bắt đầu BH do dịch bệnh
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        80.000.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        2. Quỹ trợ cấp nằm viện điều trị dịch bệnh tại các cơ sở y tế khi NĐBH nhập viện sau 07 ngày kể từ ngày bắt đầu BH
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        8.000.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        3. Quỹ trợ cấp điều trị dịch bệnh tại nhà theo xác nhận của cơ quan có thẩm quyền khi NĐBH nhiễm dịch bệnh sau 14 ngày kể từ ngày bắt đầu bảo hiểm
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        400.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingTop: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>
                        - Quỹ hỗ trợ sốc phản vệ/phản vệ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        1. NĐBH tử vong do sốc phản vệ/phản vệ
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        80.000.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingBottom: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        2. Nằm viện điều trị sốc phản vệ/phản vệ tại các cơ sở y tế
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingBottom: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        8.000.000VNĐ
                    </Text>
                </View>
            </View>

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
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Gói Bạc</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Tử vong do tai nạn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        50.000.000VNĐ/{'\n'}người/thời hạn bảo hiểm
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Chi phí y tế điều trị tai nạn
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        20.000.000VNĐ/{'\n'}người/thời hạn bảo hiểm
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#F6F5F6' }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    borderRightWidth: 2,
                    borderColor: '#fff',
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Quỹ hỗ trợ</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'center' }}>Số tiền</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingTop: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>
                        - Quỹ hỗ trợ dịch bệnh
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        1. NĐBH tử vong sau 07 ngày từ ngày bắt đầu BH do dịch bệnh
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        40.000.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        2. Quỹ trợ cấp nằm viện điều trị dịch bệnh tại các cơ sở y tế khi NĐBH nhập viện sau 07 ngày kể từ ngày bắt đầu BH
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        4.000.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        3. Quỹ trợ cấp điều trị dịch bệnh tại nhà theo xác nhận của cơ quan có thẩm quyền khi NĐBH nhiễm dịch bệnh sau 14 ngày kể từ ngày bắt đầu bảo hiểm
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        300.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingTop: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>
                        - Quỹ hỗ trợ sốc phản vệ/phản vệ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        1. NĐBH tử vong do sốc phản vệ/phản vệ
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        40.000.000VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                        2. Nằm viện điều trị sốc phản vệ/phản vệ tại các cơ sở y tế
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 8, paddingHorizontal: 12, paddingBottom: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        4.000.000VNĐ
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
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>03 tháng</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Gói Kim Cương
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        820.000
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        620.000
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        410.000
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Gói Vàng
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        510.000
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        380.000
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        260.000
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D9D9D9' }}>
                <View
                    style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth: 2, borderColor: '#fff', flex: 1.1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor }}>
                        Gói Bạc
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        300.000
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        230.000
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'right' }}>
                        150.000
                    </Text>
                </View>
            </View>
        </View>
    );
    const ThirdRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                Những hạng mục, hoạt động sau đây và các chi phí phát sinh liên quan hay chi phí hậu quả của chúng bị loại trừ và PTI không chịu trách nhiệm đối với:{'\n'}
                1. Người được bảo hiểm vi phạm luật giao thông gồm: xe đi vào đường cấm, khu vực cấm; rẽ, quay đầu tại nơi bị cấm; đi ngược chiều; vượt đèn đỏ hoặc không chấp hành theo hiệu lệnh của người điều khiển giao thông.{'\n'}
                2. Người được bảo hiểm bị tác động bởi chất kích thích, chất gây nghiện, thuốc cai nghiện, thuốc không được bác sĩ chuyên môn kê toa, rượu, bia hoặc các chất có cồn.{'\n'}
                3. Các điểm loại trừ khác quy định trong "
                <Text
                    style={{ color: colorNote, textDecorationLine: 'underline' }}
                    onPress={() => Linking.openURL('https://epti-documents.s3.ap-southeast-1.amazonaws.com/Quy+tac+TN-V+(1).pdf')}
                >
                    Quy tắc bảo hiểm
                </Text>
                " đính kèm.
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
        Actions.InsuranceType()
    }

    const checkPermission = () => {
        if (permissionUser?.permissionContract === 'add') {
            logging('ADD_CONTRACT');
            Actions.PackageVTA();
        } else {
            logging('VIEW_CONTRACT');
            setModalPermission(true);
        }
    }

    const logging = (permis) => {
        const timeEnd = moment().valueOf();
        const count = moment(timeEnd).diff(moment(timerCount), 'milliseconds');
        logEventContract(
            `${nameApp}_VUNG_TAM_AN_EVENT_GIOI_THIEU`,
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
            <Animated.View style={{ zIndex: headerZIndex }}>
                <ImageHeaderScroll code={'A4'} offset={offset} />
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
                <HeaderScroll code={'A4'} offset={offset} />
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

export default connect(mapStateToProps, { logEventContract })(AccidentIntroScreen);
