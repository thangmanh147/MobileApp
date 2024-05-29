import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image, Linking, ScrollView,
    Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, nameApp, TxtColor, URL, errValidColor } from '../../config/System';
import { SceneMap, TabView } from 'react-native-tab-view';
import { set } from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info';
import Store from '../../services/Store';
import Const from '../../services/Const';
import SelectCompany from '../../components/listCompanySelect/SelectCompany';
import jwt_decode from "jwt-decode";
import { setTokenInsur } from '../../screens/Agent/actions';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import ModalSelectAgent from '../../components/modalSelectAgent/ModalSelectAgent';

function AccidentIntroScreen({setTokenInsur}) {
    const offset = useRef(new Animated.Value(0)).current;
    const [routes, setRoutes] = useState([
        { key: 'first', title: 'Giới thiệu' },
        { key: 'second', title: 'Quyền lợi' },
        { key: 'third', title: 'Phí bảo hiểm' },
    ]);

    const [index, setIndex] = useState(0);
    const [modalAgent, setModalAgent] = useState(false);
    const [channels, setChannels] = useState([]);
    const [modalPermission, setModalPermission] = useState(false);
    
    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
          let url = `${URL}/api/insured-object/v1/products/T1/channel-agents`;
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
            <Text style={styles.titleContentIntro}>
                Bảo hiểm du lịch trong nước của PTI là sản phẩm bảo hiểm dành cho các đối tượng khách du lịch là người Việt Nam hoặc người nước ngoài đang cư trú tại Việt Nam đi du lịch, tham quan các địa điểm du lịch trong lãnh thổ nước Việt Nam.{'\n'}
                Sản phẩm này hỗ trợ cho khách du lịch không may gặp phải các rủi ro trong suốt hành trình du lịch như  tai nạn trong quá trình đi lại, tham gia các hoạt động tại địa điểm du lịch gây thương tật về thân thể, thậm chí có thể ảnh hưởng tới tính mạng. Hãy tận hưởng chuyến đi du lịch thú vị và yên tâm với sản phẩm Bảo hiểm du lịch trong nước của chúng tôi.{'\n'}
                Lưu ý: Trường hợp Người được bảo hiểm khảo sát, thám hiểm, đua xe, đua ngựa, đua thuyền, thi đấu có tính chất chuyên nghiệp các môn: bóng đá, đấm bốc, leo núi, lướt ván… chỉ được bảo hiểm với điều kiện đã nộp thuế phụ phí bảo hiểm theo quy định và được PTI chấp nhận bảo hiểm.
            </Text>
        </View>
    );
    const SecondRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>Phạm vi bảo hiểm:</Text>
            <Text style={styles.titleContentIntro}>
                PTI bảo hiểm cho các rủi ro liên quan đến tai nạn hoặc tử vong do ốm đau, bệnh tật bất ngờ trong quá trình đi du lịch thuộc thời hạn bảo hiểm.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>Quyền lợi bảo hiểm:</Text>
            <Text style={styles.titleContentIntro}>
                - Tử vong do tai nạn: PTI chi trả toàn bộ Số tiền bảo hiểm{'\n'}
                - Thương tật thân thể:
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
                    Số tiền bảo hiểm từ dưới 20 triệu đồng: Chi trả theo bảng tỷ lệ thương tật đính kèm Quy tắc.
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
                    Số tiền bảo hiểm trên 20 triệu đồng đến 100 triệu đồng: Chi trả theo chi phí y tế thực tế, hợp lý theo chỉ định của bác sĩ nhưng không vượt quá tỷ lệ.
                </Text>
            </View>
            <Text style={styles.titleContentIntro}>
                - Tử vong do ốm đau, bệnh tật bất ngờ (không phải là bệnh tật phát sinh từ trước khi bảo hiểm có hiệu lực hoặc không phải các bệnh thuộc điểm loại trừ): Chi trả 50% Số tiền bảo hiểm;{'\n'}
                Trong mọi trường hợp, tổng số tiền bồi thường thiệt hại bảo hiểm du lịch trong nước của PTI không vượt quá Số tiền bảo hiểm đã ghi trên Giấy chứng nhận bảo hiểm.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>Thông báo tai nạn</Text>
            <Text style={styles.titleContentIntro}>
                Khi phát sinh tai nạn gây tổn thất về người cho những người tham gia bảo hiểm, Quý khách vui lòng thông báo ngay trong vòng 24h cho PTI qua số tổng đài dịch vụ khách hàng 24/7: 1900 545475 hoặc các chỉ dẫn của PTI.
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>Hồ sơ bồi thường</Text>
            <Text style={styles.titleContentIntro}>
                Khi yêu cầu PTI trả tiền bảo hiểm, Người được bảo hiểm hoặc người đại diện của Người được bảo hiểm hoặc người thừa kế hợp pháp phải gửi cho PTI các chứng từ sau đây trong vòng 30 ngày kể từ ngày tử vong hoặc điều trị khỏi thương tật:
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: TxtColor }}>Giấy đề nghị trả tiền bảo hiểm;</Text>
            <Text style={styles.titleContentIntro}>
                Hợp đồng bảo hiểm và bản sao (trích) danh sách Người được bảo hiểm, hoặc Giấy chứng nhận bảo hiểm hoặc vé vào cửa có bảo hiểm của Người được bảo hiểm bị tai nạn;{'\n'}
                Biên bản tai nạn có xác nhận của cơ quan du lịch, chính quyền địa phương hoặc công an nơi Người được bảo hiểm bị tai nạn;{'\n'}
                Xác nhận điều trị của cơ quan y tế (giấy ra viện, phiếu điều trị và các giấy tờ liên quan đến việc điều trị tai nạn);{'\n'}
                Giấy chứng tử và giấy xác nhận quyền thừa kế hợp pháp (trường hợp chết).{'\n'}
                Trường hợp Người được bảo hiểm uỷ quyền cho người khác nhận tiền bảo hiểm, phải có giấy uỷ quyền hợp pháp.{'\n'}
                Thời gian giải quyết hồ sơ: Thời hạn giải quyết bồi thường trong vòng 05 - 15 ngày làm việc kể từ ngày PTI nhận đầy đủ hồ sơ bồi thường hợp lệ.
            </Text>
        </View>
    );
    const ThirdRoute = () => (
        <View style={{ paddingHorizontal: 24 }}>
            <Text style={styles.titleContentIntro}>
                Số tiền bảo hiểm sẽ có định mức từ 1.000.000 đồng đến 100.000.000 đồng.{'\n'}
                Phí bảo hiểm sẽ thay đổi tương ứng với mức giá trị bảo hiểm mà khách hàng lựa chọn.
            </Text>
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
                    Actions.InfoScreen();
                } else setModalAgent(true);
            } else {
                Actions.InfoScreen();
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
                            setTokenInsur('T1', {
                                token: res?.data,
                                channelId: channelId,
                                orgId: orgId,
                            })
                            Actions.InfoScreen();
                        } else {
                            setModalAgent(false);
                            Actions.InfoScreen();
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
                <ImageHeaderScroll code={'T1'} offset={offset} />
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
                <HeaderScroll code={'T1'} offset={offset} />
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
                        codeInsur={'T1'}
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
