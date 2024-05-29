import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    ScrollView,
    Linking
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import jwt_decode from "jwt-decode";
import { setTokenInsur } from '../../screens/Agent/actions';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import {Color, errValidColor, nameApp, TxtColor, URL} from '../../config/System';
import {SceneMap, TabView} from 'react-native-tab-view';
import Store from '../../services/Store';
import Const from '../../services/Const';
import SelectCompany from '../../components/listCompanySelect/SelectCompany';
import Modal from 'react-native-modal';
import moment from 'moment';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT} from '../../utils/Util';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import ModalSelectAgent from '../../components/modalSelectAgent/ModalSelectAgent';

function IntroductionTNDSCar({permissionUser, setTokenInsur}) {
    const offset = useRef(new Animated.Value(0)).current;
    const [routes,setRoutes] = useState([
        {key: 'first', title: 'Giới thiệu'},
        {key: 'second', title: 'Quyền lợi'},
        {key: 'third', title: 'Phí bảo hiểm'},
    ])

    const [index,setIndex] = useState(0);
    const [modalPermission, setModalPermission] = useState(false);
    const [modalAgent, setModalAgent] = useState(false);
    const [channels, setChannels] = useState([]);
    
    useEffect(() => {
        new Store().getSession(Const.TOKEN).then(token => {
          let url = `${URL}/api/insured-object/v1/products/C1/channel-agents`;
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
            <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor, textAlign: 'justify'}}>1. Bảo hiểm Trách nhiệm dân sự bắt buộc xe ô tô</Text>
            <Text style={{marginTop: 7.24,fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
            - Tham gia bảo hiểm Bắt buộc trách nhiệm dân sự của chủ xe cơ giới là bạn đã chấp hành theo Nghị định số 03/2021/NĐ-CP ngày 15 tháng 01 năm 2021.
            </Text>
            <Text style={{fontSize:14,color:TxtColor,textAlign: 'justify', lineHeight: 17.5}}>
            - Nếu bạn không tham gia bảo hiểm Bắt buộc trách nhiệm dân sự:{'\n'}
            Phạt tiền từ 400.000 đồng đến 600.000 đồng đối với Người điều khiển xe ô tô, máy kéo và các loại xe tương tự xe ô tô không có hoặc không mang theo Giấy chứng nhận bảo hiểm trách nhiệm dân sự của chủ xe cơ giới còn hiệu lực.{'\n'}
            Trích điểm b - khoản 4 - Điều 21 Nghị định 100/2019/ NĐ-CP ngày 30 tháng 12 năm 2019.
            </Text>
            <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor,marginTop:12}}>2. Đối tượng bảo hiểm</Text>
            <Text style={{fontSize:14,color:TxtColor,marginTop:7,textAlign: 'justify', lineHeight: 17.5}}>
                - Chủ xe cơ giới tham gia giao thông trên lãnh thổ nước Cộng hòa xã hội chủ nghĩa Việt Nam.{'\n'}
                - Doanh nghiệp bảo hiểm được phép triển khai bảo hiểm bắt buộc trách nhiệm dân sự của chủ xe cơ giới theo quy định của pháp luật.{'\n'}
                - Các cơ quan tổ chức, cá nhân khác có liên quan đến bảo hiểm bắt buộc trách nhiệm dân sự của chủ xe cơ giới.
            </Text>
            <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor,marginTop:12}}>3. Phạm vi bảo hiểm</Text>
            <Text style={{fontSize:14,color:TxtColor,marginTop:7,textAlign: 'justify', lineHeight: 17.5}}>
                - Thiệt hại ngoài hợp đồng về sức khỏe, tính mạng và tài sản đối với bên thứ ba do xe cơ giới gây ra.{'\n'}
                - Thiệt hại về sức khỏe và tính mạng của hành khách do xe cơ giới gây ra.
            </Text>
            <Text style={{
              marginTop: 16,
              fontSize: 14,
              color: TxtColor,
              fontWeight: 'bold'
            }}>
              Thông tư 04:
            </Text>
            <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() => Linking.openURL('https://media.pti.com.vn/default-pti/files/thong-tu-04-2021-huong-dan-ve-bao-hiem-trach-nhiem-dan-su-bat-buoc.pdf')}
            >
              <Text style={{
                fontSize: 14,
                color: TxtColor,
                textDecorationLine: 'underline'
              }}>
                https://media.pti.com.vn/default-pti/files/thong-tu-04-2021-huong-dan-ve-bao-hiem-trach-nhiem-dan-su-bat-buoc.pdf
              </Text>
            </TouchableOpacity>
            <Text style={{
              marginTop: 16,
              fontSize: 14,
              color: TxtColor,
              fontWeight: 'bold'
            }}>
              Nghị định 03:
            </Text>
            <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() => Linking.openURL('https://media.pti.com.vn/default-pti/files/nghi-dinh-03-2021-bao-hiem-bat-buoc-trach-nhiem-dan-su-cua-chu-xe-co-gioi.pdf')}
            >
              <Text style={{
                fontSize: 14,
                color: TxtColor,
                textDecorationLine: 'underline'
              }}>
                https://media.pti.com.vn/default-pti/files/nghi-dinh-03-2021-bao-hiem-bat-buoc-trach-nhiem-dan-su-cua-chu-xe-co-gioi.pdf
              </Text>
            </TouchableOpacity>
        </View>
    )
    const SecondRoute = () => (
        <View style={{paddingHorizontal:24}}>
            <Text style={{fontSize:14,color: TxtColor, lineHeight: 17.5,textAlign: 'justify'}}>
                - Khi tai nạn xảy ra, trong phạm vi mức trách nhiệm bảo hiểm, doanh nghiệp bảo hiểm phải bồi thường cho chủ xe cơ giới số tiền mà chủ xe cơ giới đã bồi thường hoặc sẽ phải bồi thường cho người bị thiệt hại.
            </Text>
            <Text style={{fontSize:14,color: TxtColor, lineHeight: 17.5,textAlign: 'justify', marginTop: 4}}>
                - Trường hợp chủ xe cơ giới chết hoặc bị thương tật toàn bộ vĩnh viễn, doanh nghiệp bảo hiểm bồi thường trực tiếp cho người bị thiệt hại.
            </Text>
            <Text style={{fontSize:14,color: TxtColor, lineHeight: 17.5,textAlign: 'justify', marginTop: 4}}>
                - Trường hợp cần thiết, doanh nghiệp bảo hiểm phải tạm ứng ngay những chi phí cần thiết và hợp lý trong phạm vi trách nhiệm bảo hiểm nhằm khắc phục hậu quả tai nạn.
            </Text>
            <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor,marginTop:12}}>Bảo hiểm về người</Text>
            <View style={{flexDirection:'row',backgroundColor:'#F6F5F6',marginTop:7}}>
                <View style={{justifyContent:'center', padding: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor, fontWeight:'bold'}}>Quyền lợi bảo hiểm</Text>
                </View>
                <View style={{justifyContent:'center',alignItems: 'center', padding: 8, flex:1.2}}>
                    <Text style={{fontSize: 14, color: TxtColor, fontWeight: 'bold'}}>Mức bồi thường tối đa</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',borderBottomWidth: 1,borderColor:'#D9D9D9'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Tử vong</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Trả tối đa 150 triệu/người/vụ</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',borderBottomWidth: 1,borderColor:'#D9D9D9'}}>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8, borderRightWidth:2,borderColor:'#fff',flex:1}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Thương tật bộ phận do tai nạn</Text>
                </View>
                <View style={{justifyContent:'center', paddingHorizontal: 12, paddingVertical: 8,flex:1.2}}>
                    <Text style={{fontSize:14,color: TxtColor}}>Trả theo “Bảng quy định trả tiền bồi thường thiệt hại về người”</Text>
                </View>
            </View>

            <Text style={{fontWeight: 'bold',fontSize:14,color:TxtColor,marginTop:12}}>Bảo hiểm với tài sản:</Text>
            <Text style={{marginTop: 7,fontSize:14,color: TxtColor, lineHeight: 17.5, textAlign: 'justify'}}>Chi trả theo mức độ lỗi của Chủ xe cơ giới và theo tổn thất thực tế, tối đa 100 triệu/vụ.</Text>
        </View>
    );
    const ThirdRoute = () => (
        <View style={{paddingHorizontal:24}}>
            <Text style={{fontSize:14,color: TxtColor, lineHeight: 17.5, textAlign: 'justify'}}>
                Chi tiết tại Phụ lục 1: “Phí bảo hiểm bắt buộc trách nhiệm dân sự của chủ xe cơ giới” Quy định tại Thông tư số 04/2021/TT-BTC ngày 15 tháng 01 năm 2021 của Bộ trưởng Bộ Tài chính.
            </Text>
        </View>
    )
    const getBack = ()=>{
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
                Actions.InfomationCar();
            } else setModalAgent(true);
        } else {
            Actions.InfomationCar();
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
                        setTokenInsur('C1', {
                            token: res?.data,
                            channelId: channelId,
                            orgId: orgId,
                        })
                        Actions.InfomationCar();
                    } else {
                        setModalAgent(false);
                        Actions.InfomationCar();
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
                <ImageHeaderScroll code={'C1'} offset={offset} />
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
                <HeaderScroll code={'C1'} offset={offset} />
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
                        codeInsur={'C1'}
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
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(IntroductionTNDSCar);
