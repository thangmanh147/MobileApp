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
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { Color, errValidColor, NewColor, TxtColor } from '../../config/System';
import { SceneMap, TabView } from 'react-native-tab-view';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX} from '../../utils/Util';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';
import IconInfoSvg from '../../config/images/icons/IconInfoSvg';
import NotifyRingSvg from '../../config/images/login/NotifyRingSvg';
import IconCloseThinSvg from '../../config/images/icons/IconCloseThinSvg';

function Survey({index, customerInfo}) {
    const offset = useRef(new Animated.Value(0)).current;

    const [survey1, setSurvey1] = useState(false);
    const [survey2, setSurvey2] = useState(false);
    const [survey3, setSurvey3] = useState(false);
    const [survey4, setSurvey4] = useState(false);
    const [survey5, setSurvey5] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [nameContent, setNameContent] = useState('');
    const [contentModal, setContentModal] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const checkPermission = () => {
        if (!survey1 && !survey2 && !survey3 && !survey4 && !survey5) {
            Actions.ACareItemCustomer({index: index});
        } else {
            setShowAlert(true);
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
                    onPress={() => {
                        if (customerInfo?.length > 0) {
                            Actions.ACareListCustomer();
                        } else {
                            Actions.ACareBuyer();
                        }
                    }}
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
                    <View style={{ marginTop: 24 }}>
                        <Text style={{ fontSize: 16, color: TxtColor, fontWeight: 'bold' }}>
                            Khảo sát tình trạng sức khỏe của NĐBH {index + 1  > 9 ? index + 1 : `0${index + 1}`}
                        </Text>
                        <Text
                            onPress={() => {
                                setNameContent('“Bệnh tâm thần, thần kinh”');
                                setContentModal(' là một trong các bệnh hoặc tình trạng sau: Parkinson, Alzheimer, Bệnh tế bào thần kinh vận động, Xơ cứng rải rác, Đa xơ cứng, Loạn dưỡng cơ, Nhược cơ, Động kinh, Não úng thủy, Bại não và các hội chứng liệt khác; Tâm thần phân liệt, rối loạn loại phân liệt và các rối loạn hoang tưởng; Hội chứng Down.');
                                setShowModal(true);
                            }}
                            style={{ marginTop: 16, fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                            1. Người được bảo hiểm đã, đang mắc phải bệnh tâm thần, thần kinh(*), bệnh phong không?
                            <Text>
                                {' '}<IconInfoSvg width={15} height={15} />
                            </Text>
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <TouchableOpacity
                                onPress={() => setSurvey1(false)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1
                                }}>
                                {
                                    !survey1 ? (
                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                    ) : (
                                        <IconRadioBtnSvg width={15} height={15} />
                                    )
                                }
                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Không</Text>
                            </TouchableOpacity>
                            <View style={{width: 16}} />
                            <TouchableOpacity
                                onPress={() => setSurvey1(true)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1
                                }}>
                                {
                                    survey1 ? (
                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                    ) : (
                                        <IconRadioBtnSvg width={15} height={15} />
                                    )
                                }
                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Có</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{ marginTop: 16 }}>
                        <Text
                            onPress={() => {
                                setNameContent('“Bệnh lý nghiêm trọng”');
                                setContentModal(
                                    ' là một trong các bệnh hoặc tình trạng sau:\n' +
                                    '- Phẫu thuật não;\n' +
                                    '- Đột quỵ, Xuất huyết não, Xơ cứng động mạch;\n' +
                                    '- Bệnh phổi tắc nghẽn mãn tính, Phẫu thuật cắt bỏ một bên phổi, Suy hô hấp mạn tính, Suy phổi;\n' +
                                    '- Nhồi máu cơ tim; Phẫu thuật động mạch chủ/van tim/ghép tim;\n' +
                                    '- Xơ gan, Suy gan, Suy thận, Nang ở tủy thận;\n' +
                                    '- Ghép tủy xương, Suy tủy xương, Bệnh loãng xương có chỉ số mật độ xương nhỏ hơn 2,5;\n' +
                                    '- Đang trong tình trạng hôn mê.'
                                );
                                setShowModal(true)
                            }}
                            style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                            2. Người được bảo hiểm đã, đang mắc phải "Bệnh lý nghiêm trọng"(**) không?
                            <Text>
                                {' '}<IconInfoSvg width={15} height={15} />
                            </Text>
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <TouchableOpacity
                                onPress={() => setSurvey2(false)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1
                                }}>
                                {
                                    !survey2 ? (
                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                    ) : (
                                        <IconRadioBtnSvg width={15} height={15} />
                                    )
                                }
                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Không</Text>
                            </TouchableOpacity>
                            <View style={{width: 16}} />
                            <TouchableOpacity
                                onPress={() => setSurvey2(true)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1
                                }}>
                                {
                                    survey2 ? (
                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                    ) : (
                                        <IconRadioBtnSvg width={15} height={15} />
                                    )
                                }
                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Có</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{ marginTop: 16 }}>
                        <Text
                            onPress={() => {
                                setNameContent('“Thương tật vĩnh viễn trên 50%”');
                                setContentModal(' là tình trạng Người được bảo hiểm bị mất một phần cơ thể hoặc thương tật sau khi điều trị vẫn kéo dài từ 12 tháng liên tục trở lên. Các thương tật này cản trở hoàn toàn Người được bảo hiểm thực hiện bất kỳ công việc nào của mình, không có khả năng phục hồi và có tỷ lệ trên 50%.');
                                setShowModal(true)
                            }}
                            style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                            3. Người được bảo hiểm đã, đang trong tình trạng thương tật vĩnh viễn trên 50%(***) không?
                            <Text>
                                {' '}<IconInfoSvg width={15} height={15} />
                            </Text>
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <TouchableOpacity
                                onPress={() => setSurvey3(false)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1
                                }}>
                                {
                                    !survey3 ? (
                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                    ) : (
                                        <IconRadioBtnSvg width={15} height={15} />
                                    )
                                }
                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Không</Text>
                            </TouchableOpacity>
                            <View style={{width: 16}} />
                            <TouchableOpacity
                                onPress={() => setSurvey3(true)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1
                                }}>
                                {
                                    survey3 ? (
                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                    ) : (
                                        <IconRadioBtnSvg width={15} height={15} />
                                    )
                                }
                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Có</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{ marginTop: 16 }}>
                        <Text
                            onPress={() => {
                                setNameContent('“Điều trị nội trú”');
                                setContentModal(' là việc Người được bảo hiểm nhập viện và lưu viện từ 24 giờ trở lên để phẫu thuật hoặc điều trị.');
                                setShowModal(true)
                            }}
                            style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                            4. Người được bảo hiểm có đang trong thời gian điều trị nội trú(****) do bệnh hoặc tai nạn không?
                            <Text>
                                {' '}<IconInfoSvg width={15} height={15} />
                            </Text>
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <TouchableOpacity
                                onPress={() => setSurvey4(false)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1
                                }}>
                                {
                                    !survey4 ? (
                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                    ) : (
                                        <IconRadioBtnSvg width={15} height={15} />
                                    )
                                }
                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Không</Text>
                            </TouchableOpacity>
                            <View style={{width: 16}} />
                            <TouchableOpacity
                                onPress={() => setSurvey4(true)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1
                                }}>
                                {
                                    survey4 ? (
                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                    ) : (
                                        <IconRadioBtnSvg width={15} height={15} />
                                    )
                                }
                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Có</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{ marginTop: 16 }}>
                        <Text
                            onPress={() => {
                                setNameContent('Thông tin về bệnh ung thư')
                                setContentModal('')
                                setShowModal(true)
                            }}
                            style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, textAlign: 'justify' }}>
                            5. Người được bảo hiểm đã, đang mắc phải bệnh ung thư không?
                            <Text>
                                {' '}<IconInfoSvg width={15} height={15} />
                            </Text>
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <TouchableOpacity
                                onPress={() => setSurvey5(false)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1
                                }}>
                                {
                                    !survey5 ? (
                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                    ) : (
                                        <IconRadioBtnSvg width={15} height={15} />
                                    )
                                }
                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Không</Text>
                            </TouchableOpacity>
                            <View style={{width: 16}} />
                            <TouchableOpacity
                                onPress={() => setSurvey5(true)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1
                                }}>
                                {
                                    survey5 ? (
                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                    ) : (
                                        <IconRadioBtnSvg width={15} height={15} />
                                    )
                                }
                                <Text style={{ marginLeft: 8, color: TxtColor, fontSize: 14, flex: 1 }}>Có</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{ marginTop: 24 }}>
                        <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5 }}>
                            (*)Bệnh tâm thần, thần kinh
                        </Text>
                        <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, marginTop: 16 }}>
                            (**)Bệnh lý nghiêm trọng
                        </Text>
                        <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, marginTop: 16 }}>
                            (**)Thương tật vĩnh viễn trên 50%
                        </Text>
                        <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5, marginTop: 16 }}>
                            (****)Điều trị nội trú
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <FooterButton>
                <Button
                    label={'TIẾP TỤC'}
                    marginTop={10}
                    onPress={() => checkPermission()}
                />
            </FooterButton>
            <Modal
                isVisible={showModal}
                style={{ margin: 40, justifyContent: 'center' }}
                onBackButtonPress={() => setShowModal(false)}
                onBackdropPress={() => setShowModal(false)}
                animationInTiming={200}
                animationOutTiming={200}
                backdropTransitionInTiming={0}
                backdropTransitionOutTiming={0}
                >
                <View
                    style={{
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    padding: 24,
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}>
                    <View style={{ position: 'absolute', top: 5, right: 5 }}>
                        <TouchableOpacity
                            onPress={() => setShowModal(false)}
                        >
                            <IconCloseThinSvg width={22} height={22} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 14, color: TxtColor, textAlign: 'justify', lineHeight: 18 }}>
                        <Text style={{fontWeight: 'bold'}}>{nameContent}</Text>{contentModal}
                    </Text>
                </View>
            </Modal>
            <Modal
                isVisible={showAlert}
                style={{ margin: 0, justifyContent: 'flex-end' }}
                onBackButtonPress={() => setShowAlert(false)}
                onBackdropPress={() => setShowAlert(false)}
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
                        NĐBH {index + 1  > 9 ? index + 1 : `0${index + 1}`} không đủ điều kiện để tham gia bảo hiểm.
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setShowAlert(false);
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
        paddingHorizontal: 24,
    },
    styleTab: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center',
    },
});

const mapStateToProps = (state) => {
    return {
      customerInfo: state.acare.customerInfo,
    };
};

export default connect(mapStateToProps)(Survey);
