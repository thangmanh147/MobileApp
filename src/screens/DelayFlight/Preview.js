import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Animated, Linking,
    ScrollView,
} from 'react-native';
import { saveOrderInfomation } from '../../actions/buy';
import { saveParamsContract } from '../../actions/paramsContractAction';
import {
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import Button from '../../components/buy/Button';
import FooterButton from '../../components/FooterButton';
import FastImage from 'react-native-fast-image';
import { Color, URL, NewColor, colorTitle, TxtColor, NewColorDisable, colorNote } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { formatVND, formatHours } from '../../components/Functions';
import Store from '../../services/Store';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";
import moment from 'moment';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconEditSvg from '../../config/images/icons/IconEditSvg';
import IconDownSvg from '../../config/images/icons/IconDownSvg';
import IconUpSvg from '../../config/images/icons/IconUpSvg';
import IconReviewSvg from '../../config/images/icons/IconReviewSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            insuredCustomerInfo: [],
            isChecked: false
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let update = {};
        if (
            nextProps.insuredCustomerInfo &&
            nextProps.insuredCustomerInfo !== prevState.insuredCustomerInfo
        ) {
            update.insuredCustomerInfo = nextProps.insuredCustomerInfo;
        }
        return update;
    }

    onChangeShow = (index) => {
        const { insuredCustomerInfo } = this.state;
        insuredCustomerInfo[index].show = !insuredCustomerInfo[index].show;
        this.setState({ insuredCustomerInfo: insuredCustomerInfo });
    };
    // render ds người được bảo hiểm
    renderCustomerInfo = ({ item, index }) => {
        const { insuredCustomerInfo } = this.state;
        const isLine = (index === 0 && insuredCustomerInfo?.length === 1) || (insuredCustomerInfo?.length - 1 === index)
        return (
            <View
                style={{
                    paddingLeft: 16,
                    paddingBottom: 16,
                    borderBottomWidth: 0.65,
                    borderBottomColor: isLine ? '#fff' : '#404142B5',
                    zIndex: 1,
                }}>
                <View style={styles.tourInfo}>
                    <TouchableOpacity
                        style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', zIndex: 99 }}
                        onPress={() => this.onChangeShow(index)}
                    >
                        <View style={{marginRight: 3, marginLeft: -15}}>
                            {
                                item.show ?
                                    <IconUpSvg width={12} height={12} /> :
                                    <IconDownSvg width={12} height={12} />
                            }
                        </View>
                        <Text style={styles.titleInfo}>{index + 1}. Họ và tên</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {item.fullName}
                        </Text>
                    </View>
                </View>
                {
                    item.show ? (
                        <>
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.6 }}>
                                    <Text style={styles.titleInfo}>CMND/CCCD/Hộ chiếu</Text>
                                </View>
                                <View style={{ flex: 0.4 }}>
                                    <Text style={styles.contentInfo}>{item.identityNumber}</Text>
                                </View>
                            </View>
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.titleInfo}>Ngày sinh</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{item.birthday}</Text>
                                </View>
                            </View>
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.titleInfo}>Số điện thoại</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{item.phone}</Text>
                                </View>
                            </View>
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.titleInfo}>Email</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{item.email}</Text>
                                </View>
                            </View>
                        </>
                    ) : null
                }
            </View>
        );
    };
    renderDelayFlightInfo = () => {
        const { delayFlight, codeNumber } = this.props;
        return (
            (
                <View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>
                                1. Số hiệu chuyến bay
                            </Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={[styles.contentInfo, { fontWeight: 'bold' }]}>
                                {
                                    delayFlight?.info?.showDepartCreate ?
                                        delayFlight?.info?.numberDepart :
                                        delayFlight?.info?.departFlight?.flightNumber
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={[styles.titleInfo, { fontWeight: 'normal' }]}>
                                Mã đặt chỗ
                            </Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {
                                    codeNumber?.codeDepart
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={[styles.titleInfo, { fontWeight: 'normal' }]}>
                                Thời gian đi
                            </Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {
                                    delayFlight?.info?.showDepartCreate ?
                                        `${delayFlight?.info?.hourDepart} - ${delayFlight?.info?.startDateString}` :
                                        `${moment(delayFlight?.info?.departFlight?.estimateDepartTime).format('HH:mm')} - ${moment(delayFlight?.info?.departFlight?.estimateDepartTime).format('DD/MM/YYYY')}`
                                }
                            </Text>
                            <Text style={styles.contentInfo}>
                                {delayFlight?.info?.fromPlace}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={[styles.titleInfo, { fontWeight: 'normal' }]}>
                                Thời gian đến
                            </Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {
                                    delayFlight?.info?.showDepartCreate ?
                                        `${delayFlight?.info?.hourDepartArrive} - ${delayFlight?.info?.endDateDepart}` :
                                        `${moment(delayFlight?.info?.departFlight?.estimateArriveTime).format('HH:mm')} - ${moment(delayFlight?.info?.departFlight?.estimateArriveTime).format('DD/MM/YYYY')}`
                                }
                            </Text>
                            <Text style={styles.contentInfo}>
                                {delayFlight?.info?.toPlace}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={[styles.titleInfo, { fontWeight: 'normal' }]}>
                                Thời gian bay
                            </Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {
                                    delayFlight?.info?.showDepartCreate ?
                                        `${formatHours(moment(`${delayFlight?.info?.endDateDepart} ${delayFlight?.info?.hourDepartArrive}`, 'DD/MM/YYYY HH:mm').diff(moment(`${delayFlight?.info?.startDateString} ${delayFlight?.info?.hourDepart}`, 'DD/MM/YYYY HH:mm'), 'minutes'))}` :
                                        `${formatHours(delayFlight?.info?.departFlight?.estimateDurationMinutes)}`
                                }
                            </Text>
                        </View>
                    </View>
                    {
                        delayFlight?.info?.flightType === 'Khứ hồi' ? (
                            <>
                                <View style={{ height: 1, backgroundColor: '#404142B5', marginTop: 12 }} />
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>
                                            2. Số hiệu chuyến bay
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={[styles.contentInfo, { fontWeight: 'bold' }]}>
                                            {
                                                delayFlight?.info?.showReturnCreate ?
                                                    delayFlight?.info?.numberReturn :
                                                    delayFlight?.info?.returnFlight?.flightNumber
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={[styles.titleInfo, { fontWeight: 'normal' }]}>
                                            Mã đặt chỗ
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>
                                            {
                                                codeNumber?.codeReturn
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={[styles.titleInfo, { fontWeight: 'normal' }]}>
                                            Thời gian đi
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>
                                            {
                                                delayFlight?.info?.showReturnCreate ?
                                                    `${delayFlight?.info?.hourReturn} - ${delayFlight?.info?.endDateString}` :
                                                    `${moment(delayFlight?.info?.returnFlight?.estimateDepartTime).format('HH:mm')} - ${moment(delayFlight?.info?.returnFlight?.estimateDepartTime).format('DD/MM/YYYY')}`
                                            }
                                        </Text>
                                        <Text style={styles.contentInfo}>
                                            {delayFlight?.info?.toPlace}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={[styles.titleInfo, { fontWeight: 'normal' }]}>
                                            Thời gian đến
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>
                                            {
                                                delayFlight?.info?.showReturnCreate ?
                                                    `${delayFlight?.info?.hourReturnArrive} - ${delayFlight?.info?.endDateReturn}` :
                                                    `${moment(delayFlight?.info?.returnFlight?.estimateArriveTime).format('HH:mm')} - ${moment(delayFlight?.info?.returnFlight?.estimateArriveTime).format('DD/MM/YYYY')}`
                                            }
                                        </Text>
                                        <Text style={styles.contentInfo}>
                                            {delayFlight?.info?.fromPlace}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={[styles.titleInfo, { fontWeight: 'normal' }]}>
                                            Thời gian bay
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>
                                            {
                                                delayFlight?.info?.showReturnCreate ?
                                                    `${formatHours(moment(`${delayFlight?.info?.endDateReturn} ${delayFlight?.info?.hourReturnArrive}`, 'DD/MM/YYYY HH:mm').diff(moment(`${delayFlight?.info?.endDateString} ${delayFlight?.info?.hourReturn}`, 'DD/MM/YYYY HH:mm'), 'minutes'))}` :
                                                    `${formatHours(delayFlight?.info?.returnFlight?.estimateDurationMinutes)}`
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </>
                        ) : null
                    }
                </View>
            )
        );
    };
    renderVATInfomation = ({ item }) => {
        return (
            (
                <View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Tên doanh nghiệp</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item.companyName}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Mã số thuế</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item.companyTaxCode}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Email nhận hóa đơn</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item.companyEmail}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Địa chỉ doanh nghiệp</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {item.companyAddress}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        );
    };
    // render bảng phí
    renderFee = () => {
        const { delayFlightPackages, insuredCustomerInfo, delayFlight } = this.props;
        const numberFlight = delayFlight?.info?.flightType === 'Khứ hồi' ? 2 : 1;
        return (
            <View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Gói bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.6 }}>
                        <Text style={styles.contentInfo}>
                            {
                                delayFlightPackages?.name
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Phí bảo hiểm/người/chuyến</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {formatVND(delayFlightPackages?.price)}VNĐ
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Chuyến bay</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {numberFlight}
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Số người được bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {
                                insuredCustomerInfo?.length
                            }
                        </Text>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Phí bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={[styles.contentInfo, { fontWeight: 'bold' }]}>
                            {formatVND(delayFlightPackages?.price * numberFlight * insuredCustomerInfo?.length)}VNĐ
                        </Text>
                    </View>
                </View>
            </View>
        );
    };
    onPay = () => {
        const {
            saveOrderInfomation,
            saveParamsContract,
            delayFlightPackages,
            delayFlight,
            buyerInfomation,
            codeNumber,
            idComSelected,
            codeSelected
        } = this.props;
        const { insuredCustomerInfo } = this.state;
        const numberFlight = delayFlight?.info?.flightType === 'Khứ hồi' ? 2 : 1;
        const arrCus = [];
        insuredCustomerInfo?.map((item) => {
            const dates = item.birthday.split('/');
            arrCus.push({
                fullName: item.fullName,
                identityNumber: item.identityNumber,
                birthday: `${dates[2]}-${dates[1]}-${dates[0]}`,
                phone: item.phone,
                email: item.email,
            });
        });
        let _url = `${URL}/api/contract/v1/flight-delay-contracts`;
        const departDates = delayFlight?.info?.startDateString?.split('/');
        const arrivalDates = delayFlight?.info?.endDateDepart?.split('/');
        const returnDates = delayFlight?.info?.endDateString?.split('/');
        const arrivalReturnDates = delayFlight?.info?.endDateReturn?.split('/');
        let _body = {
            "twoWay": delayFlight?.info?.flightType === 'Khứ hồi' ? true : false,
            "departAirport": delayFlight?.info?.dataFromPlace?.iata || "",
            "arrivalAirport": delayFlight?.info?.dataToPlace?.iata || "",
            "departBookingNumber": codeNumber?.codeDepart || "",
            "departFlightId": delayFlight?.info?.departFlight?._id || "",
            "returnBookingNumber": codeNumber?.codeReturn || "",
            "returnFlightId": delayFlight?.info?.returnFlight?._id || "",
            "customDepartFlight": {
                "airlineId": 1,
                "flightNumber": delayFlight?.info?.showDepartCreate ?
                    delayFlight?.info?.numberDepart :
                    '',
                "departDate": delayFlight?.info?.showDepartCreate ?
                    `${departDates[2]}-${departDates[1]}-${departDates[0]}` :
                    '',
                "departTime": delayFlight?.info?.showDepartCreate ?
                    delayFlight?.info?.hourDepart :
                    '',
                "arrivalDate": delayFlight?.info?.showDepartCreate ?
                    `${arrivalDates[2]}-${arrivalDates[1]}-${arrivalDates[0]}` :
                    '',
                "arrivalTime": delayFlight?.info?.showDepartCreate ?
                    delayFlight?.info?.hourDepartArrive :
                    '',
            },
            "customReturnFlight": {
                "airlineId": 1,
                "flightNumber": delayFlight?.info?.showReturnCreate ?
                    delayFlight?.info?.numberReturn :
                    '',
                "departDate": delayFlight?.info?.showReturnCreate ?
                    `${returnDates[2]}-${returnDates[1]}-${returnDates[0]}` :
                    '',
                "departTime": delayFlight?.info?.showReturnCreate ?
                    delayFlight?.info?.hourReturn :
                    '',
                "arrivalDate": delayFlight?.info?.showReturnCreate ?
                    `${arrivalReturnDates[2]}-${arrivalReturnDates[1]}-${arrivalReturnDates[0]}` :
                    '',
                "arrivalTime": delayFlight?.info?.showReturnCreate ?
                    delayFlight?.info?.hourReturnArrive :
                    '',
            },
            "packageId": delayFlightPackages?.id || 0,
            "insuredCustomers": arrCus,
            "isVat": buyerInfomation?.isVat,
            "companyName": buyerInfomation?.companyName || "",
            "companyTax": buyerInfomation?.companyTaxCode || "",
            "companyEmail": buyerInfomation?.companyEmail || "",
            "companyAddress": buyerInfomation?.companyAddress || "",
            "productCode": 'DF1',
            "supplierId": idComSelected || '',
            "supplierCode": codeSelected || '',
        };
        console.log('insuredCustomerInfo tre chuyen bay: ', arrCus);
        console.log('BODY tre chuyen bay: ', _body);
        saveParamsContract({ body: _body, url: _url });
        const _array = {
            orderPrice: delayFlightPackages?.price * numberFlight * insuredCustomerInfo?.length - delayFlightPackages?.valueCom,
            priceFull: delayFlightPackages?.price * numberFlight * insuredCustomerInfo?.length,
            orderDescription: `Thanh toan bao hiem tre chuyen bay`,
            buyer: {
                fullName: '',
                email: '',
                phone: '',
                address: '',
            },
        };
        saveOrderInfomation(_array);
        Actions.Pay({ insurProductCode: 'DF1', codeInsur: 'DF1' });
    };
    render() {
        const headerZIndex = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [999, 1001, 1002],
                extrapolate: 'clamp'
            });
        
        const {
            buyerInfomation,
        } = this.props;
        const {
            insuredCustomerInfo,
            isChecked
        } = this.state;
        return (
            <View style={styles.container}>
                <Animated.View style={{zIndex: headerZIndex}}>
                    <ImageHeaderScroll code={'DF1'} offset={this.scrollYAnimatedValue} />
                </Animated.View>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2012
                }}>
                    <TouchableOpacity
                        onPress={() => Actions.pop()}
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
                    <HeaderScroll code={'DF1'} offset={this.scrollYAnimatedValue} />
                </View>
                <ScrollView
                    style={{ zIndex: 1000 }}
                    contentContainerStyle={{
                        paddingBottom: 20,
                        paddingTop: HEADER_MAX_HEIGHT
                    }}
                    ref={this.setScrollViewRef}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
                    )}>
                    <View style={{
                        flex: 1,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        marginTop: -20,
                        backgroundColor: '#ffff',
                    }}>
                        <View style={[styles.titleContainer, { marginHorizontal: 24, marginTop: 20 }]}>
                            <IconReviewSvg width={15} height={15} />
                            <Text style={styles.titlePreview}>
                                Xem lại thông tin
                            </Text>
                        </View>
                        <View style={[styles.contentContainer, { marginTop: 24 }]}>
                            <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                <Text style={styles.titleStyle}>Chuyến bay mua bảo hiểm:</Text>
                                <TouchableOpacity onPress={() => Actions.InfoScreenDelayFlight()}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            {
                                this.renderDelayFlightInfo()
                            }
                        </View>
                        <View style={[styles.contentContainer, { marginTop: 24 }]}>
                            <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                <Text style={styles.titleStyle}>Người được bảo hiểm:</Text>
                                <TouchableOpacity onPress={() => Actions.BuyerDelayFlight()}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            {/* danh sách người được bảo hiểm  */}
                            <FlatList
                                data={insuredCustomerInfo}
                                renderItem={this.renderCustomerInfo}
                                keyExtractor={index => index.toString()}
                            />
                        </View>
                        {
                            buyerInfomation?.isVat ? (
                                <View style={[styles.contentContainer, { marginTop: 24 }]}>
                                    <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                        <Text style={styles.titleStyle}>Thông tin xuất hóa đơn VAT:</Text>
                                        <TouchableOpacity onPress={() => Actions.BuyerDelayFlight()}>
                                            <IconEditSvg width={16} height={15} />
                                        </TouchableOpacity>
                                    </View>
                                    <FlatList
                                        data={[buyerInfomation]}
                                        renderItem={this.renderVATInfomation}
                                        keyExtractor={index => index.toString()}
                                    />
                                </View>
                            ) : null
                        }
                        <View style={[styles.contentContainer, { marginTop: 24 }]}>
                            <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                <Text style={styles.titleStyle}>Gói bảo hiểm:</Text>
                                <TouchableOpacity onPress={() => Actions.PackageDelayFlight()}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            {/* render bảng phí  */}
                            {this.renderFee()}
                        </View>
                        <View style={{ marginBottom: 8, marginTop: 24, marginHorizontal: 24 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({isChecked: !isChecked})}>
                                    {
                                        isChecked
                                            ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                            : <IconBoxSvg width={20} height={20} color={NewColor} />
                                    }
                                </TouchableOpacity>
                                <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor, flex: 1 }}>
                                    Tôi đã đọc, hiểu và đồng ý với "
                                    {
                                        <Text
                                            style={{ color: colorNote, textDecorationLine: 'underline' }}
                                            onPress={() => {
                                                Linking.openURL('https://epti.vn/dieu-khoan-su-dung-website');
                                            }}
                                        >
                                            Điều khoản sử dụng
                                        </Text>
                                    }
                                    " và "
                                    {
                                        <Text
                                            style={{ color: colorNote, textDecorationLine: 'underline' }}
                                            onPress={() => {
                                                Linking.openURL('https://quytacbaohiem.pti.com.vn/Quy_Tac_NG/Quy_Tac_Delay_Flight.pdf')
                                            }}
                                        >
                                            Quy tắc bảo hiểm
                                        </Text>
                                    }
                                    " đi kèm sản phẩm này của PTI.
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <FooterButton>
                    <Button
                        color={isChecked ? NewColor : NewColorDisable}
                        label={'THANH TOÁN'}
                        onPress={this.onPay}
                        disable={!isChecked}
                    />
                </FooterButton>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ctBack: {
        zIndex: 1002,
    },
    icBack: {
        height: 15,
        width: (15 * 21) / 39,
    },
    headerContent: {
        marginTop: isIPhoneX ? 15 : 5,
        padding: 24,
        position: 'absolute',
        left: 0,
        zIndex: 2012,
    },
    animatedHeaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleHeader: {
        paddingHorizontal: 8,
        marginTop: 100,
    },
    titlePreview: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTitle,
        marginLeft: 8,
    },
    titleInfo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TxtColor,
    },
    contentInfo: {
        fontSize: 14,
        fontWeight: '400',
        color: TxtColor,
        textAlign: 'right',
    },
    contentContainer: {
        marginHorizontal: 24,
        paddingVertical: 16,
        paddingHorizontal: 12,
        marginTop: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color,
    },
    tourInfoContainer: {
        alignSelf: 'center',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 1,
        elevation: 5,
        shadowColor: 'rgba(0, 107, 153, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 14,
        width: widthPercentageToDP('87'),
        marginTop: 16,
    },
    tourInfo: {
        flexDirection: 'row',
        paddingTop: 12,
        justifyContent: 'space-between',
        paddingHorizontal: 0,
    },
    table: {
        flex: 1,
        alignSelf: 'center',
        width: widthPercentageToDP('87'),
        backgroundColor: '#F6F5F6',
        borderRadius: 10,
        marginTop: 16,
    },
    tableTitleContainer: {
        height: 45,
        backgroundColor: Color,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    tableTitle: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    hr: {
        borderWidth: 0.5,
        borderColor: '#676667',
        borderRadius: 1,
    },
    textError: {
        color: '#F97C7C',
    },
    txtErrorCode: {
        color: '#F97C7C',
        fontSize: 12,
        marginTop: 5,
    },
});
const mapStateToProps = (state) => {
    const listCompany = state.selectCompany.listCompany['DF1'];
    const idComSelected = state.selectCompany.idComSelected['DF1'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        idComSelected,
        codeSelected: obj?.insurOrg?.code,
        buyerInfomation: state.delayFlight.delayFlightBuyer?.buyerInfomation,
        insuredCustomerInfo: state.delayFlight.delayFlightBuyer?.insuredCustomers,
        delayFlightPackages: state.delayFlight.delayFlightPackages,
        delayFlight: state.delayFlight.delayFlightInfo,
        codeNumber: state.delayFlight.codeNumber,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        saveOrderInfomation: (body) => dispatch(saveOrderInfomation(body)),
        saveParamsContract: (body) => dispatch(saveParamsContract(body)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Preview);
