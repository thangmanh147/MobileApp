import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import jwt_decode from "jwt-decode";
import Modal from 'react-native-modal';
import { setTokenInsur } from '../../screens/Agent/actions';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { widthPercentageToDP } from '../../config/ConfigResponsive';
import { Color, TxtColor, URL, nameApp, errValidColor } from '../../config/System';
import { SceneMap, TabView } from 'react-native-tab-view';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import ModalSelectAgent from '../../components/modalSelectAgent/ModalSelectAgent';

function IntroScreenDelayFlight({setTokenInsur}) {
    const offset = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef();
    const [routes, setRoutes] = useState([
        { key: 'first', title: 'Giới thiệu' },
        { key: 'second', title: 'Quyền lợi' },
        { key: 'third', title: 'Điểm loại trừ' },
    ]);

    const [index, setIndex] = useState(0);
    const [modalAgent, setModalAgent] = useState(false);
    const [channels, setChannels] = useState([]);
    const [modalPermission, setModalPermission] = useState(false);

    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
          let url = `${URL}/api/insured-object/v1/products/DF1/channel-agents`;
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
            <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor}}>1. Bảo hiểm trễ chuyến bay</Text>
            <Text style={{marginTop: 5, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                Gói bảo hiểm trễ chuyến bay đầu tiên và duy nhất được phát hành bởi Tổng công ty cổ phần bảo hiểm Bưu Điện - PTI và phân bối bởi INSO.
            </Text>
            <Text style={{marginTop: 12, fontWeight: 'bold',fontSize:14,color:TxtColor}}>Mức phí bảo hiểm</Text>
            <Text style={{marginTop: 4, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                Chỉ từ 40.000đ đến 100.000đ tùy thuộc vào hãng bay và gói bảo hiểm bạn chọn.
            </Text>
            <Text style={{marginTop: 12, fontWeight: 'bold',fontSize:14,color:TxtColor}}>Điều kiện bảo hiểm</Text>
            <Text style={{marginTop: 4, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                Chuyến bay bị Trễ, Hủy, Quay đầu hoặc Đáp xuống sân bay khác.
            </Text>
            <Text style={{marginTop: 12, fontWeight: 'bold',fontSize:14,color:TxtColor}}>Thời gian mua bảo hiểm</Text>
            <Text style={{marginTop: 4, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                Bạn cần mua bảo hiểm và thanh toán tối thiểu 6 tiếng trước giờ cất cánh dự kiến.
            </Text>
            <Text style={{marginTop: 12, fontWeight: 'bold',fontSize:14,color:TxtColor}}>Thời gian tính bảo hiểm</Text>
            <Text style={{marginTop: 4, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                Thời gian hạ cánh dự kiến là thời gian đến ghi trên chứng nhận bảo hiểm, và được xác định lần cuối 6 tiếng trước giờ bay dự kiến theo cập nhật từ hãng hàng không.
            </Text>
            <Text style={{marginTop: 12, fontWeight: 'bold',fontSize:14,color:TxtColor}}>Thời gian nhận bồi thường</Text>
            <Text style={{marginTop: 4, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                Bạn sẽ nhận được tiền bồi thường trong vòng 30 phút từ khi bạn yêu cầu.
            </Text>
        </View>
    );
    const SecondRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor}}>1. Gói đường bay kim cương</Text>
            <View style={{flexDirection: 'row', marginTop: 12}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{
                            width: 6,
                            height: 6,
                            borderRadius: 50,
                            backgroundColor: TxtColor,
                            marginLeft: 1,
                            marginRight: 7,
                            marginTop: 6,
                        }} />
                        <Text style={{fontSize:14, color:TxtColor}}>
                            Trễ 60 - 119 phút:
                        </Text>
                    </View>
                </View>
                <View style={{width: 16}} />
                <View style={{flex: 1}}>
                    <Text style={{fontSize:14, color: Color, textAlign: 'right'}}>
                        Nhận 350.000đ
                    </Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 12}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{
                            width: 6,
                            height: 6,
                            borderRadius: 50,
                            backgroundColor: TxtColor,
                            marginLeft: 1,
                            marginRight: 7,
                            marginTop: 6,
                        }} />
                        <Text style={{fontSize:14, color:TxtColor}}>
                            Trễ 120 - 179 phút:
                        </Text>
                    </View>
                </View>
                <View style={{width: 16}} />
                <View style={{flex: 1}}>
                    <Text style={{fontSize:14, color: Color, textAlign: 'right'}}>
                        Nhận 800.000đ
                    </Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 12}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{
                            width: 6,
                            height: 6,
                            borderRadius: 50,
                            backgroundColor: TxtColor,
                            marginLeft: 1,
                            marginRight: 7,
                            marginTop: 6,
                        }} />
                        <Text style={{fontSize:14, color:TxtColor}}>
                            Trễ 180 phút trở lên:
                        </Text>
                    </View>
                </View>
                <View style={{width: 16}} />
                <View style={{flex: 1}}>
                    <Text style={{fontSize:14, color: Color, textAlign: 'right'}}>
                        Nhận 1.600.000đ
                    </Text>
                </View>
            </View>

            <Text style={{marginTop: 24, fontWeight: 'bold',fontSize:14,color:TxtColor}}>2. Gói đường bay vàng</Text>
            <View style={{flexDirection: 'row', marginTop: 12}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{
                            width: 6,
                            height: 6,
                            borderRadius: 50,
                            backgroundColor: TxtColor,
                            marginLeft: 1,
                            marginRight: 7,
                            marginTop: 6,
                        }} />
                        <Text style={{fontSize:14, color:TxtColor}}>
                            Trễ 60 - 119 phút:
                        </Text>
                    </View>
                </View>
                <View style={{width: 16}} />
                <View style={{flex: 1}}>
                    <Text style={{fontSize:14, color: Color, textAlign: 'right'}}>
                        Nhận 260.000đ
                    </Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 12}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{
                            width: 6,
                            height: 6,
                            borderRadius: 50,
                            backgroundColor: TxtColor,
                            marginLeft: 1,
                            marginRight: 7,
                            marginTop: 6,
                        }} />
                        <Text style={{fontSize:14, color:TxtColor}}>
                            Trễ 120 - 179 phút:
                        </Text>
                    </View>
                </View>
                <View style={{width: 16}} />
                <View style={{flex: 1}}>
                    <Text style={{fontSize:14, color: Color, textAlign: 'right'}}>
                        Nhận 500.000đ
                    </Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 12}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{
                            width: 6,
                            height: 6,
                            borderRadius: 50,
                            backgroundColor: TxtColor,
                            marginLeft: 1,
                            marginRight: 7,
                            marginTop: 6,
                        }} />
                        <Text style={{fontSize:14, color:TxtColor}}>
                            Trễ 180 phút trở lên:
                        </Text>
                    </View>
                </View>
                <View style={{width: 16}} />
                <View style={{flex: 1}}>
                    <Text style={{fontSize:14, color: Color, textAlign: 'right'}}>
                        Nhận 1.000.000đ
                    </Text>
                </View>
            </View>

            <Text style={{marginTop: 24, fontWeight: 'bold',fontSize:14,color:TxtColor}}>3. Gói đường bay bạc</Text>
            <View style={{flexDirection: 'row', marginTop: 12}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{
                            width: 6,
                            height: 6,
                            borderRadius: 50,
                            backgroundColor: TxtColor,
                            marginLeft: 1,
                            marginRight: 7,
                            marginTop: 6,
                        }} />
                        <Text style={{fontSize:14, color:TxtColor}}>
                            Trễ 60 - 119 phút:
                        </Text>
                    </View>
                </View>
                <View style={{width: 16}} />
                <View style={{flex: 1}}>
                    <Text style={{fontSize:14, color: Color, textAlign: 'right'}}>
                        Nhận 150.000đ
                    </Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 12}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{
                            width: 6,
                            height: 6,
                            borderRadius: 50,
                            backgroundColor: TxtColor,
                            marginLeft: 1,
                            marginRight: 7,
                            marginTop: 6,
                        }} />
                        <Text style={{fontSize:14, color:TxtColor}}>
                            Trễ 120 - 179 phút:
                        </Text>
                    </View>
                </View>
                <View style={{width: 16}} />
                <View style={{flex: 1}}>
                    <Text style={{fontSize:14, color: Color, textAlign: 'right'}}>
                        Nhận 300.000đ
                    </Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 12}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{
                            width: 6,
                            height: 6,
                            borderRadius: 50,
                            backgroundColor: TxtColor,
                            marginLeft: 1,
                            marginRight: 7,
                            marginTop: 6,
                        }} />
                        <Text style={{fontSize:14, color:TxtColor}}>
                            Trễ 180 phút trở lên:
                        </Text>
                    </View>
                </View>
                <View style={{width: 16}} />
                <View style={{flex: 1}}>
                    <Text style={{fontSize:14, color: Color, textAlign: 'right'}}>
                        Nhận 600.000đ
                    </Text>
                </View>
            </View>
        </View>
    );
    const ThirdRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor}}>Bạn sẽ không nhận được bồi thường bảo hiểm nếu:</Text>
            <Text style={{marginTop: 8, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                - Người được bảo hiểm đáp chuyến bay không phải với danh nghĩa là hành khách;
            </Text>
            <Text style={{marginTop: 8, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                - Thẻ lên máy bay đã bị tẩy xóa, nhàu nát không đọc rõ thông tin, rách rời hoặc mất hiệu lực vì bất kỳ lí do gì;
            </Text>
            <Text style={{marginTop: 8, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                - Trong trường hợp xảy ra trễ chuyến bay, hủy chuyến bay, quay đầu hoặc đáp xuống sân bay khác mà Người được bảo hiểm chưa làm các thủ tục đăng ký  lên máy bay (bao gồm cả thẻ lên máy bay điện tử) đối với chuyến bay được ghi rõ trong Chứng nhận bảo hiểm;
            </Text>
            <Text style={{marginTop: 8, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                - Chiến tranh, hoạt động quân sự, máy bay bị tấn công, bãi công, hỗn loạn, bạo động hoặc các hoạt động khủng bố;
            </Text>
            <Text style={{marginTop: 8, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                - Chuyến bay mà Người được bảo hiểm đặt trước đã bị thông báo hủy chuyến trước giờ bay đã đặt;
            </Text>
            <Text style={{marginTop: 8, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                - Việc trễ chuyến bay, hủy chuyến bay, quay đầu hoặc đáp xuống sân bay khác được thực hiện theo yêu cầu của các cơ quan thi hành pháp luật;
            </Text>
            <Text style={{marginTop: 8, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                - Công ty hàng không thực hiện chuyến bay bị phá sản;
            </Text>
            <Text style={{marginTop: 8, fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
                - Quy tắc này không chịu trách nhiệm bảo hiểm cho những chuyến bay đến các khu vực chiến tranh hoặc các khu vực đã được tuyên bố trong trạng thái nguy hiểm, trừ khi có những quy định riêng được Bên bảo hiểm chấp nhận.
            </Text>
        </View>
    );
    
    const backToInsuranceType = () => {
        Actions.pop()
    }

    const scrollToBeginning = () => {
        scrollViewRef.current.scrollTo({ x: 0, animated: true });
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
                    Actions.InfoScreenDelayFlight();
                } else setModalAgent(true);
            } else {
                Actions.InfoScreenDelayFlight();
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
                            setTokenInsur('DF1', {
                                token: res?.data,
                                channelId: channelId,
                                orgId: orgId,
                            })
                            Actions.InfoScreenDelayFlight();
                        } else {
                            setModalAgent(false);
                            Actions.InfoScreenDelayFlight();
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
                <ImageHeaderScroll code={'DF1'} offset={offset} />
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
                <HeaderScroll code={'DF1'} offset={offset} />
            </View>
            <ScrollView
                ref={scrollViewRef}
                style={{ zIndex: 1000 }}
                contentContainerStyle={{
                    paddingTop: HEADER_MAX_HEIGHT,
                    paddingBottom: 14,
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
                        codeInsur={'DF1'}
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

export default connect(null, mapDispatchToProps)(IntroScreenDelayFlight);
