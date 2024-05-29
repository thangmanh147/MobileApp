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
import jwt_decode from "jwt-decode";
import { setTokenInsur } from '../../screens/Agent/actions';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { Color, NewColor, TxtColor, nameApp, URL, errValidColor } from '../../config/System';
import { SceneMap, TabView } from 'react-native-tab-view';
import Store from '../../services/Store';
import Const from '../../services/Const';
import Modal from 'react-native-modal';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX} from '../../utils/Util';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import ModalSelectAgent from '../../components/modalSelectAgent/ModalSelectAgent';

function IntroScreen({setTokenInsur}) {
    const offset = useRef(new Animated.Value(0)).current;
    const [routes, setRoutes] = useState([
        { key: 'first', title: 'Đối tượng' },
        { key: 'second', title: 'Phạm vi bảo hiểm' },
        { key: 'third', title: 'Lợi ích' },
    ]);

    const [index, setIndex] = useState(0);
    const [modalPermission, setModalPermission] = useState(false);
    const [modalAgent, setModalAgent] = useState(false);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
          let url = `${URL}/api/insured-object/v1/products/HC10/channel-agents`;
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
                                <View style={{ width: '80%', height: 2, backgroundColor: Number(idx) === index ? Color : 'white' }} />
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </View>
    );

    const FirstRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor,
                textAlign: 'justify', }}>Những ai có thể tham gia bảo hiểm A-Care?</Text>
            <Text style={{ marginTop: 6.24, fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                a. Công dân Việt Nam hoặc người nước ngoài sinh sống và làm viêc tại Việt Nam, không rời Việt Nam quá 180 ngày liên tục; và
            </Text>
            <Text style={{ marginTop: 6.24, fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                b. Có độ tuổi tại ngày bắt đầu thời hạn bảo hiểm từ đủ 60 ngày tuổi đến 65 tuổi; và
            </Text>
            <Text style={{ marginTop: 6.24, fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                c. Không thuộc một trong các đối tượng sau (không áp dụng với người được bảo hiểm tái tục liên tục tại VBI):
            </Text>
            <Text style={{
                marginTop: 4,
                fontSize: 14,
                color: TxtColor, lineHeight: 17.5,
                textAlign: 'justify',
            }}>
                - Người đã, đang mắc phải một trong các bệnh hoặc tình trạng: Parkinson, Alzheimer, Bệnh tế bào thần kinh vận động, Xơ cứng rải rác, Đa xơ cứng, Loạn dưỡng cơ, Nhược cơ, Động kinh, Não úng thủy, Bại não, Hội chứng liệt, Tâm thần phân liệt, Rối loạn loại phân liệt, Rối loạn hoang tưởng, Rối loạn tâm thần, Sa sút trí tuệ, Thiểu năng trí tuệ, Hội chứng Down, Bệnh Phong.{'\n'}
                - Người đã, đang mắc phải một trong các bệnh lý nghiêm trọng sau:{'\n'}
                    Ung thư;{'\n'}
                    Phẫu thuật não;{'\n'}
                    Đột quỵ, Xuất huyết não, Xơ cứng động mạch;{'\n'}
                    Bệnh phổi tắc nghẽn mãn tính (COPD), Phẫu thuật cắt bỏ một bên phổi, Tâm phế mạn;{'\n'}
                    Nhồi máu cơ tim, Phẫu thuật động mạch chủ, Phẫu thuật van tim, Ghép tim;{'\n'}
                    Xơ gan mất bù, Suy gan, Suy thận giai đoạn cuối, Nang ở tủy thận;{'\n'}
                    Ghép tủy xương, Suy tủy xương;{'\n'}
                    Đang trong tình trạng hôn mê hoặc sống thực vật.{'\n'}
                - Người đã, đang trong tình trạng thương tật vĩnh viễn trên 50%. Tỷ lệ thương tật xác định theo Thông tư số 28/2013/TTLT-BYT-BLĐTBXH và các văn bản sửa đổi thay thế/ bổ sung (nếu có).{'\n'}
                - Người đang trong thời gian điều trị nội trú do bệnh hoặc tai nạn.
            </Text>
        </View>
    );
    const SecondRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor,
                textAlign: 'justify', }}>Bạn sẽ được bảo hiểm trong những trường hợp nào?</Text>
            <Text style={{ marginTop: 6.24, fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                - Gồm quyền lợi bảo hiểm chính như: Điều trị Nội trú, Tử vong, thương tật vĩnh viễn do tai nạn và ốm đau, bệnh tật. Có thể mua thêm các quyền lợi bổ sung: Ngoại trú, Nha khoa, Thai sản, Trợ cấp nằm viện.{'\n'}
                - Quyền lợi bảo hiểm thai sản toàn diện: Sinh thường, sinh mổ, bất thường trong quá trình mang thai và các quyền lợi bệnh lý phát sinh trong thai kỳ, tai biến sản khoa.{'\n'}
                - Trẻ em từ 03 tuổi trở xuống áp dụng đồng chi trả 50/50 chi phí y tế thuộc phạm vi tại tất cả các cơ sở y tế đối với các sự kiện bảo hiểm phát sinh do nguyên nhân bệnh viêm phổi các loại, viêm phế quản, tiểu phế quản trong thời gian 30-90 ngày kể từ ngày bắt đầu thời hạn bảo hiểm.
            </Text>
        </View>
    );
    const ThirdRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor,
                textAlign: 'justify', }}>Vì sao bạn nên chọn mua bảo hiểm A-Care? </Text>
            <Text style={{ marginTop: 6.24, fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                - A-Care không yêu cầu khám sức khỏe trước khi đăng ký và được khám chữa bệnh tại tất cả các cơ sở y tế hợp pháp tại Việt Nam sẽ mang tới cho khách hàng dịch vụ khám chữa bệnh hiện đại, uy tín và chất lượng.{'\n'}
                - Dịch vụ bảo lãnh viện phí ưu việt 24/7 với hơn 250 cơ sở y tế trên cả nước và thường xuyên được cập nhật trên app/website.{'\n'}
                - Bồi thường trực tuyến qua app My VBI với tốc độ xử lý từ 3-5 ngày làm việc.{'\n'}
                - Phục vụ tư vấn và cấp giấy chứng nhận bảo hiểm điện tử, hóa đơn mọi lúc, mọi nơi.{'\n'}
                - Tổng đài chăm sóc khách hàng 19001566 hỗ trợ giải đáp khách hàng 24/7.{'\n'}
            </Text>
        </View>
    );

    const backToInsuranceType = () => {
        Actions.tab()
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
                Actions.ACareBuyer();
            } else setModalAgent(true);
        } else {
            Actions.ACareBuyer();
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
                        setTokenInsur('HC10', {
                            token: res?.data,
                            channelId: channelId,
                            orgId: orgId,
                        })
                        Actions.ACareBuyer();
                    } else {
                        setModalAgent(false);
                        Actions.ACareBuyer();
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
                <ImageHeaderScroll code={'HC10'} offset={offset} />
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
                <HeaderScroll code={'HC10'} offset={offset} />
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
                        codeInsur={'HC10'}
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

const mapDispatchToProps = dispatch => {
    return {
        setTokenInsur: (code, obj) => dispatch(setTokenInsur(code, obj)),
    };
};

export default connect(null, mapDispatchToProps)(IntroScreen);
