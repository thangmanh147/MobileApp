import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../../components/FooterButton';
import Button from '../../../components/Button';
import { Color, errValidColor, nameApp, NewColor, TxtColor } from '../../../config/System';
import { SceneMap, TabView } from 'react-native-tab-view';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT } from '../../../utils/Util';
import HeaderScroll from '../../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../../components/header/ImageHeaderScroll';

function TPBankIntro() {
    const offset = useRef(new Animated.Value(0)).current;
    const [routes, setRoutes] = useState([
        { key: 'first', title: 'Giới thiệu' },
        { key: 'second', title: 'Khuyến mãi' },
        { key: 'third', title: 'Đăng ký' },
    ]);

    const [index, setIndex] = useState(0);

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
                        )
                    })
                }
            </View>
        </View>
    )

    const FirstRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                Chỉ mất 5 giây để đăng ký online và sử dụng ngay <Text style={{ fontWeight: 'bold' }}>Tài khoản TPBank!</Text> Khách hàng có thể tận hưởng các tiện ích vượt trội từ nhà bank tím:
            </Text>
            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - <Text style={{ fontWeight: 'bold' }}>Nộp tiền/Rút tiền, mở thẻ nhận ngay</Text> và <Text style={{ fontWeight: 'bold' }}>thanh toán hóa đơn</Text> tại hơn 400 điểm giao dịch Ngân hàng tự động LiveBank 24/7
            </Text>
            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - Trải nghiệm không giới hạn các tính năng trên App TPBank Mobile:
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Mở <Text style={{ fontWeight: 'bold' }}>Tài khoản Nickname</Text> - Nhận tiền bằng tên riêng, nickname thay số tài khoản. Cực tiện lợi!
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    <Text style={{ fontWeight: 'bold' }}>Gửi tiết kiệm</Text> linh hoạt, lãi suất <Text style={{ fontWeight: 'bold' }}>lên tới 6,35%</Text>
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Phát hành <Text style={{ fontWeight: 'bold' }}>thẻ tín dụng online, KHÔNG</Text> cần chứng minh thu nhập
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    <Text style={{ fontWeight: 'bold' }}>Thanh toán dịch vụ</Text> nhanh chóng: Hóa đơn, đặt vé máy bay, phòng khách sạn, combo du lịch, dịch vụ giải trí, nộp học phí
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    <Text style={{ fontWeight: 'bold' }}>Đầu tư tiện lợi:</Text> Nạp tiền chứng khoán, vàng, bất động sản
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Chuyển tiền bằng <Text style={{ fontWeight: 'bold' }}>khuôn mặt, giọng nói</Text>
                </Text>
            </View>
        </View>
    );
    const SecondRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                Tận hưởng gói ưu đãi làm quen lên đến <Text style={{ fontWeight: 'bold' }}>2 TRIỆU ĐỒNG</Text> dành cho khách hàng mở Tài khoản mới! Chỉ có tại TPBank:
            </Text>
            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - <Text style={{ fontWeight: 'bold' }}>MIỄN 60+</Text> loại phí, <Text style={{ fontWeight: 'bold' }}>KHÔNG PHÍ</Text> ngầm
            </Text>
            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - <Text style={{ fontWeight: 'bold' }}>TẶNG</Text> Tài khoản mang tên Nickname/Shopname trị giá <Text style={{ fontWeight: 'bold' }}>500.000 VNĐ</Text>
            </Text>
            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - <Text style={{ fontWeight: 'bold' }}>TẶNG TIỀN TÀI LỘC 36.888 VNĐ</Text> ngay khi mở Tài khoản Shopname
            </Text>
            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - <Text style={{ fontWeight: 'bold' }}>HOÀN TIỀN 50%</Text> giá trị giao dịch, tối đa 20.000 VNĐ cho giao dịch đầu tiên trên App TPBank
            </Text>
            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - <Text style={{ fontWeight: 'bold' }}>NHẬN NGAY 50.000 VNĐ</Text> khi giao dịch chuyển tiền Thứ 4 hàng tuần (với Tài khoản Shopname)
            </Text>
            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - <Text style={{ fontWeight: 'bold' }}>HOÀN TIỀN 50%</Text> giá trị giao dịch, tối đa 20.000 VNĐ khi thanh toán bằng khuôn mặt tại GS25 trên toàn quốc
            </Text>
            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - <Text style={{ fontWeight: 'bold' }}>TẶNG NGAY</Text> Thẻ Visa Debit, lấy ngay 5 phút tại LiveBank 24/7
            </Text>
            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - <Text style={{ fontWeight: 'bold' }}>GIAO DỊCH</Text> bằng vân tay và khuôn mặt tại LiveBank 24/7
            </Text>
            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - <Text style={{ fontWeight: 'bold' }}>GIAO DỊCH 24/7</Text> mọi tiện ích trên App TPBank
            </Text>
            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                Lưu ý:
            </Text>
            <Text style={{ marginTop: 4, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                (*) Mọi thắc mắc vui lòng liên hệ Tổng đài hỗ trợ 1900 6036 hoặc 1900 585 885 để được giải đáp về chương trình
            </Text>
            <Text style={{ marginTop: 4, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                (*) Shopname là Tài khoản có số tài khoản là tên shop tùy chọn
            </Text>
            <Text style={{ marginTop: 4, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                (*) Nickname là Tài khoản có số tài khoản là nickname tùy chọn
            </Text>
        </View>
    );
    const ThirdRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - Khách hàng cần đáp ứng các điều kiện sau:
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Là công dân Việt Nam có đủ năng lực hành vi dân sự; và
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Đủ 18 tuổi trở lên; và
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Có thể cung cấp bản gốc CMND/CCCD còn hiệu lực.
                </Text>
            </View>
            <Text style={{ marginTop: 12, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                - Các lưu ý khi cung cấp thông tin:
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    CMND/CCCD không bị mất góc, đục lỗ, mờ, lóa sáng.
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Khi chụp ảnh selfie, khách hàng không đeo khẩu trang hay đeo kính, và cần chụp ở môi trường đủ sáng.
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                    backgroundColor: TxtColor,
                    marginRight: 7,
                    marginLeft: 12,
                    marginTop: 7,
                }} />
                <Text style={{ flex: 1, fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 17.5 }}>
                    Ảnh selfie cần đảm bảo khuôn mặt khách hàng chiếm tối thiểu 70% khung hình.
                </Text>
            </View>
        </View>
    );

    const headerZIndex = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [999, 1001, 1002],
            extrapolate: 'clamp'
        });

    return (
        <View style={styles.container}>
            <Animated.View style={{ zIndex: headerZIndex }}>
                <ImageHeaderScroll code={'A3'} offset={offset} uri={require('../../../config/images/public/banner/bannerTPB.jpg')} />
            </Animated.View>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2012
            }}>
                <TouchableOpacity
                    onPress={() => Actions.tab()}
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
                        source={require('../../../icons/ic_back.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={{ zIndex: 2011 }}>
                <HeaderScroll code={'A3'} offset={offset} title={'GIỚI THIỆU TPBANK'} />
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
                            third: ThirdRoute
                        })}
                        onIndexChange={setIndex}
                        renderTabBar={renderTabbar}
                    />
                </View>
            </ScrollView>
            <FooterButton>
                <Button
                    label={'TIẾP TỤC'}
                    marginTop={10}
                    onPress={() => Actions.TPBankAcc()}
                />
            </FooterButton>
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

export default TPBankIntro;
