import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Animated,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import { SceneMap, TabView } from 'react-native-tab-view';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { Color, errValidColor, nameApp, NewColor, TxtColor } from '../../config/System';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { checkExpToken } from '../../config/decodeToken';
import BaseModal from '../../components/BaseModal';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT } from '../../utils/Util';
import Modal from 'react-native-modal';
import moment from 'moment';
import { logEventContract } from '../../actions/logContract';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import { NewColorDisable } from '../../app-iagent/config/iagent';

function AccidentIntroScreen({ permissionUser, logEventContract }) {
    const offset = useRef(new Animated.Value(0)).current;
    const [routes, setRoutes] = useState([
        { key: 'first', title: 'GIỚI THIỆU' },
        { key: 'second', title: 'QUỸ MỞ LÀ GÌ' },
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
                Fmarket là nền tảng phân phối chứng chỉ quỹ đã được Ủy ban Chứng khoán Nhà nước cấp phép năm 2018. Tại Fmarket, người mua có thể sở hữu trực tiếp chứng chỉ quỹ được phát hành bởi các Quỹ đầu tư hàng đầu Việt Nam.
            </Text>
            {/* <TouchableOpacity
                style={{ marginVertical: 4 }}
                onPress={() => Linking.openURL('https://fmarket.vn')}
            >
                <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify', marginTop: 8 }}>
                    Website: <Text style={{textDecorationLine: 'underline'}}>https://fmarket.vn</Text>
                </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                Hotline: 1900 571 299
            </Text> */}
        </View>
    );
    const SecondRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>Quỹ mở là gì?</Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                Quỹ mở được thành lập và quản lý chuyên nghiệp bởi các các công ty quản lý quỹ, dưới sự giám sát của Ủy ban Chứng khoán Nhà nước. Các chuyên gia tại Quỹ sẽ đầu tư vào các cổ phiếu, trái phiếu nhằm mang lại lợi nhuận cho Nhà đầu tư.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 12 }}>Lợi ích khi tham gia Quỹ mở</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 4 }}>Tính thanh khoản cao</Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                Nhà đầu tư có thể bán chứng chỉ quỹ bất cứ khi nào cần, công ty quản lý quỹ có trách nhiệm mua lại chứng chỉ quỹ của nhà đầu tư theo giá NAV của ngày duyệt giao dịch.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 8 }}>Đa dạng hóa danh mục đầu tư</Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                Quỹ mở phân bổ tiền đầu tư vào nhiều loại tài sản khác nhau nhằm giảm thiểu rủi ro và tăng khả năng sinh lời cho Nhà đầu tư.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 8 }}>Phù hợp với khả năng tài chính</Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                Bất cứ ai cũng có thể bắt đầu tham gia đầu tư vào Quỹ mở chỉ từ 100.000 đồng.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 8 }}>Minh bạch, an toàn</Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                Các thông tin về danh mục đầu tư, hiệu suất đầu tư của quỹ đều sẽ được công khai minh bạch trên website chính thức của quỹ.
            </Text>
            {/* <Text style={{ fontSize: 14, color: TxtColor, marginTop: 8 }}>LƯU Ý:</Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                Sau khi đã hoàn tất đăng ký cần có thông tin sau:
            </Text>
            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                "Tải ứng dụng Fmarket dành cho iOS hoặc Android để đầu tư ngay hôm nay."
            </Text>
            <TouchableOpacity disabled style={{padding: 5, borderRadius: 5, backgroundColor: NewColorDisable, marginTop: 8, alignSelf: 'baseline'}} onPress={() => Linking.openURL('http://onelink.to/8g2mhu')}>
                <Text style={{fontSize: 14, color: 'white'}}>Tải ứng dụng</Text>
            </TouchableOpacity> */}
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
                <ImageHeaderScroll code={'A3'} offset={offset} uri={require('../../config/images/public/banner/bannerFmarket.jpg')} />
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
                        source={require('../../icons/ic_back.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={{zIndex: 2011}}>
                <HeaderScroll code={'A3'} offset={offset} title={'GIỚI THIỆU FMARKET'} />
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
                    onPress={() => Actions.FmarketAcc()}
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
