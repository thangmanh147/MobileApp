import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, URL, colorText, NewColor, colorTitle, screen, nameApp, TxtColor, errValidColor, textDisable, NewColorDisable } from '../../config/System';
import { connect } from 'react-redux';
// import CarInfoPreview from './CarInfoPreview';
// import BuyerPreview from './BuyerPreview';
// import ReceiverPreview from './ReceiverPreview';
// import PackagePreview from './PackagePreview';
// import VatPreview from './VatPreview';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { isIPhoneX } from '../../utils/Util';
import Modal from 'react-native-modal';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import { formatVND } from '../../components/Functions';
import axios from 'axios';
import { infoInsur } from '../ListNotify/assets';
import DateFill from '../../components/dateTimeFill/DateFill';
import { ERROR_DATE_CURRENT, ERROR_NEXT_DATE } from '../../config/ErrorMessage';
import Input from '../CarInsurance/components/Input';
import { ScrollView } from 'react-native';
import IconWarningSvg from '../../config/images/icons/IconWarningSvg';
import IconEditSvg from '../../config/images/icons/IconEditSvg';
import IconReviewSvg from '../../config/images/icons/IconReviewSvg';
import IconCloseSvg from '../../config/images/icons/IconCloseSvg';

const HEADER_MIN_HEIGHT = isIPhoneX ? 85 : 75;
const HEADER_MAX_HEIGHT = 267;

function PreviewLog({ detailInfo }) {
    const offset = useRef(new Animated.Value(0)).current;
    const [startDateString, setStartDateString] = useState('');
    const [errStartDate, setErrStartDate] = useState(false);
    const [carTypeName, setCarTypeName] = useState('');
    const [carBrandName, setCarBrandName] = useState('');
    const [carModelName, setCarModelName] = useState('');

    const contractCode = detailInfo?.code?.split('.');
    const codeInsur = contractCode ? contractCode.filter(i => infoInsur[i]).toString() : '';
    useEffect(() => {
        if (!startDateString) {
            setStartDateString(moment(detailInfo?.effectiveAt).format('DD/MM/YYYY'));
        }
        if (!carTypeName && (codeInsur === 'C1' || codeInsur === 'C2' || codeInsur === 'C3')) {
            let url = `${URL}/api/attribute/v1/car-types/${detailInfo?.contract_car?.carType}`
            axios.get(url)
                .then((res) => {
                    if (res.status == 200) {
                        setCarTypeName(res?.data?.data?.value);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        if (!carBrandName && (codeInsur === 'C1' || codeInsur === 'C2' || codeInsur === 'C3')) {
            let url = `${URL}/api/master-data/v1/cars/brands/${detailInfo?.contract_car?.carBrand}`
            axios.get(url)
                .then((res) => {
                    if (res.status == 200) {
                        setCarBrandName(res?.data?.data?.name);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        if (!carModelName && (codeInsur === 'C1' || codeInsur === 'C2' || codeInsur === 'C3')) {
            let url = `${URL}/api/master-data/v1/cars/models/${detailInfo?.contract_car?.carModel}`
            axios.get(url)
                .then((res) => {
                    if (res.status == 200) {
                        setCarModelName(res?.data?.data?.name);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, []);

    const headerHeight = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [HEADER_MAX_HEIGHT, (HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT) / 2, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });

    const opacityTitle = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });

    const marginTitle = offset.interpolate(
        {
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [isIPhoneX ? 122 : 132, -19],
            extrapolate: 'clamp',
        });

    const paddingTitle = offset.interpolate(
        {
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [8, 18],
            extrapolate: 'clamp',
        });

    const headerZIndex = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [1000, 1],
            extrapolate: 'clamp'
        });

    const marginTopHeader = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [0, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <TouchableOpacity
                    onPress={() => Actions.pop()}
                    style={styles.ctBack}>
                    <FastImage
                        style={[styles.icBack]}
                        source={require('../../icons/ic_back.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <Animated.View style={[{ marginTop: marginTitle, paddingHorizontal: paddingTitle }]}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#ffff',
                            textAlign: 'left',
                        }}>
                        {infoInsur[codeInsur] ? infoInsur[codeInsur].nameHeader : infoInsur.default.nameHeader}
                    </Text>
                    <Animated.View style={[{ opacity: opacityTitle }]}>
                        <View
                            style={{
                                backgroundColor: Color,
                                width: 103,
                                height: 4,
                                borderRadius: 35,
                                marginTop: 4,
                            }}
                        />
                    </Animated.View>
                </Animated.View>
            </View>
            <Animated.View style={[styles.animatedHeaderContainer, { height: HEADER_MAX_HEIGHT, zIndex: 999 }]}>
                <Animated.Image
                    source={infoInsur[codeInsur] ? infoInsur[codeInsur].icon : infoInsur.default.icon}
                    style={{ width: widthPercentageToDP('100'), height: HEADER_MAX_HEIGHT }}
                />
            </Animated.View>
            <Animated.ScrollView
                style={{ zIndex: 2011, marginTop: marginTopHeader }}
                contentContainerStyle={{
                    paddingTop: HEADER_MAX_HEIGHT,
                }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }]
                )}>
                <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <IconReviewSvg width={15} height={15} />
                        <Text style={[styles.titleStyle, { marginLeft: 10 }]}>
                            Xem lại thông tin
                        </Text>
                    </View>
                    <View style={styles.boxStyle}>
                        <View style={styles.container1}>
                            <View style={styles.titleContainer2}>
                                <View style={{ flex: 2.5 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>
                                        Thông tin xe mua bảo hiểm
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        Mục đích sử dụng
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {detailInfo?.purpose === 'N' ? 'Không kinh doanh' : 'Kinh doanh'}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        Loại xe
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {carTypeName}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        Hãng xe
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {carBrandName}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        Dòng xe
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {carModelName}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        Năm sản xuất
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {detailInfo?.contract_car?.manufactureYear}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        Số chỗ ngồi
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {detailInfo?.contract_car?.numberSeat}
                                    </Text>
                                </View>
                            </View>
                            {detailInfo?.purpose === 'Y' ?
                                <View style={styles.titleContainer1}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.textStyle}>
                                            Biển số xe
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                            {detailInfo?.contract_car?.licenseNumber}
                                        </Text>
                                    </View>
                                </View> : null
                            }
                            {detailInfo?.purpose === 'N' ?
                                <View style={styles.titleContainer1}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.textStyle}>
                                            Số khung
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                            {detailInfo?.contract_car?.chassisNumber}
                                        </Text>
                                    </View>
                                </View> : null
                            }
                            {detailInfo?.purpose === 'N' ?
                                <View style={styles.titleContainer1}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.textStyle}>
                                            Số máy
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                            {detailInfo?.contract_car?.machineNumber}
                                        </Text>
                                    </View>
                                </View> : null
                            }
                            {detailInfo?.loadCapacity ?
                                <View style={styles.titleContainer1}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.textStyle}>
                                            Trọng tải
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                            {detailInfo?.contract_car?.loadCapacity} tấn
                                        </Text>
                                    </View>
                                </View> : null
                            }
                            {
                                detailInfo?.regisExpiredAt ? (
                                    <View style={styles.titleContainer1}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.textStyle}>
                                                Ngày hết hạn đăng kiểm
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                {detailInfo?.contract_car?.regisExpiredAt}
                                            </Text>
                                        </View>
                                    </View>
                                ) : null
                            }
                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        Giá trị xe
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {detailInfo?.contract_car?.declarationPrice ? formatVND(detailInfo?.contract_car?.declarationPrice) : ''}VNĐ
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        Số tiền bảo hiểm
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {detailInfo?.contract_car?.insuredValue ? formatVND(detailInfo?.contract_car?.insuredValue) : ''}VNĐ
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.boxStyle}>
                        <View style={styles.container1}>
                            <View style={styles.titleContainer2}>
                                <View style={{ flex: 2.5 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>
                                        Thông tin bên mua bảo hiểm
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        {
                                            detailInfo?.buyer?.type === 1 ?
                                                'Họ và tên chủ xe' :
                                                'Tên doanh nghiệp'
                                        }
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {detailInfo?.buyer?.type === 1 ? detailInfo?.buyer?.fullName : detailInfo?.buyer?.companyBuyerName}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        Số điện thoại
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {detailInfo?.buyer?.phone}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        Email
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {detailInfo?.buyer?.email}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
            <View style={{ marginBottom: 12 }}>
                <FooterButton >
                    <Button
                        disabled={true}
                        label={'THANH TOÁN'}
                        marginTop={10}
                        marginBottom={10}
                    />
                </FooterButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        paddingTop: 24,
        paddingHorizontal: 24,
    },
    styleTab: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center',
    },
    viewTable: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1, backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 16,
        color: colorTitle,
        fontWeight: 'bold',
    },
    boxStyle: {
        paddingVertical: 10
    },
    container1: {
        flex: 1,
        backgroundColor: '#F6F5F6',
        borderRadius: 10,
        paddingVertical: 16,
        paddingHorizontal: 12
    },
    titleContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer1: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 12
    },
    textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TxtColor
    },
    dataStyle: {
        fontSize: 14,
        color: TxtColor
    },
    contentTime: {
        marginTop: 2,
        fontSize: 14,
        fontWeight: '400',
        color: textDisable,
    },
    titleTime: {
        fontSize: 12,
        fontWeight: '400',
        color: textDisable,
    },
    lineTime: {
        marginTop: 4,
        height: 1,
        backgroundColor: textDisable,
    },
});


const mapStateToProps = (state, ownProps) => ({
    detailInfo: state.contracts.detailContract[ownProps.contractId],
});

export default connect(mapStateToProps)(PreviewLog);

