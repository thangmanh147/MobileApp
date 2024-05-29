import React, { useState, useEffect, useRef } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image, Linking, ScrollView,
    Animated,
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import jwt_decode from "jwt-decode";
import Modal from 'react-native-modal';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { setTokenInsur } from '../../screens/Agent/actions';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { Color, TxtColor, URL, nameApp, errValidColor } from '../../config/System';
import { SceneMap, TabView } from 'react-native-tab-view';
import DeviceInfo from 'react-native-device-info';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import ModalSelectAgent from '../../components/modalSelectAgent/ModalSelectAgent';

function AccidentIntroScreen({setTokenInsur}) {
    const offset = useRef(new Animated.Value(0)).current;
    const [routes, setRoutes] = useState([
        { key: 'first', title: 'Giới thiệu' },
        { key: 'second', title: 'Phạm vi bảo hiểm' },
        { key: 'third', title: 'Phí bảo hiểm' },
    ]);

    const [index, setIndex] = useState(0);
    const [modalAgent, setModalAgent] = useState(false);
    const [channels, setChannels] = useState([]);
    const [modalPermission, setModalPermission] = useState(false);
    
    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
          let url = `${URL}/api/insured-object/v1/products/M3/channel-agents`;
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
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>1. Bảo hiểm Vật chất xe máy</Text>
            <Text style={styles.titleContentIntro}>
                Bảo hiểm vật chất xe máy của PTI là gói sản phẩm bảo hiểm rất cần thiết để bảo vệ chiếc xế yêu của bạn, giúp bạn chủ động hơn về tài chính và yên tâm trong việc sử dụng xe.
            </Text>
            <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() => Linking.openURL('https://epti-documents.s3.ap-southeast-1.amazonaws.com/Quy+tac+08+vat+chat+mo+to+-++xe+may_01.pdf')}
            >
                <Text style={[styles.titleContentIntro, { textDecorationLine: 'underline' }]}>
                    Quy tắc sản phẩm bảo hiểm Vật chất xe máy
                </Text>
            </TouchableOpacity>
        </View>
    );
    const SecondRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>A. Bảo hiểm cháy nổ</Text>
            <Text style={styles.titleContentIntro}>
                PTI bồi thường cho Chủ xe những thiệt hại vật chất xe xảy ra do hỏa hoạn, cháy, nổ.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 5 }}>B. Bảo hiểm mất cắp, mất cướp toàn bộ xe</Text>
            <Text style={styles.titleContentIntro}>
                PTI bồi thường cho Chủ xe những thiệt hại vật chất xe xảy ra do mất cắp, mất cướp trong các trường hợp sau:{'\n'}
                1. Mất cắp tại các điểm trông giữ xe của trường học, bệnh viện, cơ quan nhà nước và tòa nhà, bãi giữ xe công cộng có giấy phép do cơ quan nhà nước có thẩm quyền cấp phép đồng thời có phát phiếu giữ xe.{'\n'}
                2. Nhà, nơi cư trú bị trộm cướp đột nhập, cạy phá có dấu vết để lại và/hoặc bị tấn công hoặc đe dọa tấn công bằng vũ lực.{'\n'}
                3. Bị cướp.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 5 }}>C. Bảo hiểm do các nguyên nhân khác</Text>
            <Text style={styles.titleContentIntro}>
                PTI bồi thường cho Chủ xe những thiệt hại vật chất xe xảy ra do tai nạn bất ngờ, ngoài sự kiểm soát của Chủ xe, Lái xe trong những trường hợp sau đây:{'\n'}
                1.  Đâm, va, lật, đổ.{'\n'}
                2. Những tai nạn bất khả kháng do thiên nhiên: Bão, lũ lụt, sét đánh, động đất, mưa đá, sụt lở.{'\n'}
                3.  Vật thể khác tác động lên xe.{'\n'}
                4. Tai nạn do rủi ro bất ngờ khác gây nên (không bao gồm nguyên nhân hỏa hoạn, cháy, nổ; mất cắp, mất cướp toàn bộ xe) ngoài những điểm loại trừ chung được quy định chi tiết tại{' '}
                <Text onPress={() => Linking.openURL('https://epti-documents.s3.ap-southeast-1.amazonaws.com/Quy+tac+08+vat+chat+mo+to+-++xe+may_01.pdf')} style={{ textDecorationLine: 'underline' }}>Quy tắc sản phẩm</Text>.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 5, textAlign: 'justify' }}>
                Trong mọi trường hợp, tổng số tiền bồi thường của PTI không vượt quá số tiền bảo hiểm và/hoặc giá trị bảo hiểm đã ghi trên Giấy chứng nhận bảo hiểm.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor, marginTop: 5 }}>D. Điểm loại trừ chung</Text>
            <Text style={styles.titleContentIntro}>
                PTI không chịu trách nhiệm bồi thường thiệt hại trong các trường hợp sau:{'\n'}
                1.  Hành động cố ý gây tai nạn của Chủ xe, Lái xe, những người được giao sử dụng xe.{'\n'}
                2. Nguyên nhân chiến tranh, các lý do tương tự chiến tranh như nội chiến, đình công, bạo động dân sự, khủng bố.{'\n'}
                3. Tai nạn xảy ra ngoài lãnh thổ nước Cộng hoà xã hội chủ nghĩa Việt Nam (trừ trường hợp có thỏa thuận khác bằng văn bản).{'\n'}
                Và những điểm loại trừ riêng theo từng quyền lợi bảo hiểm chi tiết tại{' '}
                <Text onPress={() => Linking.openURL('https://epti-documents.s3.ap-southeast-1.amazonaws.com/Quy+tac+08+vat+chat+mo+to+-++xe+may_01.pdf')} style={{ textDecorationLine: 'underline' }}>Quy tắc bảo hiểm</Text>.
            </Text>
        </View>
    );
    const ThirdRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>Phí bảo hiểm (đã bao gồm VAT):</Text>
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
                    Bảo hiểm cháy nổ: 0,3% Số tiền bảo hiểm.
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
                    Bảo hiểm mất cắp, mất cướp toàn bộ: 0.5% Số tiền bảo hiểm.
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
                    Bảo hiểm do các nguyên nhân khác: 1.2% Số tiền bảo hiểm.
                </Text>
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
                    Actions.MotorPhysicalPackage();
                } else setModalAgent(true);
            } else {
                Actions.MotorPhysicalPackage();
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
                            setTokenInsur('M3', {
                                token: res?.data,
                                channelId: channelId,
                                orgId: orgId,
                            })
                            Actions.MotorPhysicalPackage();
                        } else {
                            setModalAgent(false);
                            Actions.MotorPhysicalPackage();
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
                <ImageHeaderScroll code={'M3'} offset={offset} />
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
                <HeaderScroll code={'M3'} offset={offset} />
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
                        codeInsur={'M3'}
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

export default connect(null, mapDispatchToProps)(AccidentIntroScreen);
