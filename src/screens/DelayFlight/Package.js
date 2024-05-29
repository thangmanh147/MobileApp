import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform, Animated,
    ScrollView,
    Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import {
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { Color, colorTitle, NewColor, URL, TxtColor, nameApp } from '../../config/System';
import {
    formatHours,
    formatVND,
} from '../../components/Functions';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX, roundNumber } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from './utils/animation';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Promotion from '../../components/promotion/Promotion';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconDownSvg from '../../config/images/icons/IconDownSvg';
import IconUpSvg from '../../config/images/icons/IconUpSvg';
import IconDiamondSvg from '../../config/images/icons/IconDiamondSvg';
import IconPlaneSvg from '../../config/images/icons/IconPlaneSvg';
import SelectCompany from '../../components/listCompanySelect/SelectCompany';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.93);

class Package extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            packList: [],
            chosenPack: '',
            insuredCustomerInfo: [],
            valueCom: 0,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let update = {};
        if (
            nextProps.insuredCustomerInfo && nextProps.insuredCustomerInfo.length > 0 &&
            nextProps.insuredCustomerInfo !== prevState.insuredCustomerInfo
        ) {
            update.insuredCustomerInfo = nextProps.insuredCustomerInfo;
        }
        return update;
    }

    componentDidMount() {
        const { delayFlightPackages } = this.props;
        new Store().getSession(Const.TOKEN).then(token => {
            let url = `${URL}/api/contract/v1/insurance-packages?type=FLIGHT_DELAY&sort[priority]=1`
            axios.get(url, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {
                    if (res.status == 200) {
                        this.setState({
                            packList: res?.data?.data,
                            chosenPack: delayFlightPackages?.id || res?.data?.data[0].id,
                        }, () => {
                            this.getValueCom(delayFlightPackages?.id || res?.data?.data[0].id);
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {idComSelected} = this.props;
        const { chosenPack } = this.state;
        if(idComSelected !== prevProps.idComSelected) {
            this.getValueCom(chosenPack);
        }
    }

    getValueCom = (chosenPack) => {
        if (!nameApp.includes('EPTI') && !nameApp.includes('INSO')) {
            const { delayFlight, orgCodeUser, idComSelected } = this.props;
            const { packList, insuredCustomerInfo } = this.state;
            const numberFlight = delayFlight?.info?.flightType === 'Khứ hồi' ? 2 : 1;
            const data = packList && packList.find((item) => item.id === chosenPack);
            const fee = data?.price * numberFlight * insuredCustomerInfo?.length;
            new Store().getSession(Const.TOKEN).then(token => {
                const dataToken = jwt_decode(token);
                let url;
                if (nameApp.includes('MAILINH') || nameApp.includes('YCHI') || orgCodeUser === 'INSO' || orgCodeUser === 'DLJSC') {
                    url = `${URL}/api/commission/v2/commissions/value`;
                } else {
                    url = `${URL}/api/commission/v3/commissions/saler`;
                }
                let body = {
                    "channelId": dataToken?.channelId || '',
                    "supplierId": idComSelected || '',
                    "agentId": dataToken?.organizationId || '',
                    "userId": dataToken?.userId || '',
                    "contractValue": fee || 0,
                    "product": 'DF1',
                    "B": `${(fee || 0) / 1.1}`,
                    "V": `${(fee || 0) / 1.1 * 0.1}`,
                    "D": "0"
                }
                console.log('======URL', url)
                console.log('======BODY', body)
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify(body),
                })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log('======res', res)
                        if (res.status == 200 || res.status == 'success') {
                            this.setState({ valueCom: res?.data?.commission || 0 });
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            });
        }
    };

    onChangeShow = (index) => {
        const { insuredCustomerInfo } = this.state;
        insuredCustomerInfo[index].show = !insuredCustomerInfo[index].show;
        this.setState({ insuredCustomerInfo: insuredCustomerInfo });
    };

    // render ds người được bảo hiểm
    renderCustomerInfo = (item, index) => {
        const { insuredCustomerInfo } = this.state;
        const isLine = (index === 0 && insuredCustomerInfo.length === 1) || (insuredCustomerInfo.length - 1 === index)
        return (
            <View
                style={{
                    borderBottomWidth: 0.65,
                    borderBottomColor: isLine ? '#fff' : '#404142B5',
                    zIndex: 1,
                    paddingBottom: isLine ? 0 : 16,
                }}>
                <View style={{
                    flexDirection: 'row',
                    marginTop: index === 0 ? 0 : 16
                }}>
                    <TouchableOpacity
                        style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', zIndex: 99 }}
                        onPress={() => this.onChangeShow(index)}
                    >
                        <View style={{ marginRight: 3 }}>
                            {
                                item.show ?
                                    <IconUpSvg width={12} height={12} /> :
                                    <IconDownSvg width={12} height={12} />
                            }
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: TxtColor }}>
                            {index + 1}. Họ và tên
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flex: 0.5 }}>
                        <Text style={{ color: '#414042', fontWeight: 'bold', textAlign: 'right' }}>
                            {item.fullName}
                        </Text>
                    </View>
                </View>
                {
                    item.show ? (
                        <>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 16
                            }}>
                                <View style={{ flex: 0.6 }}>
                                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>
                                        CMND/CCCD/Hộ chiếu
                                    </Text>
                                </View>
                                <View style={{ flex: 0.4 }}>
                                    <Text style={{ color: '#414042', textAlign: 'right' }}>
                                        {item.identityNumber}
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 16
                            }}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>
                                        Ngày sinh
                                    </Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={{ color: '#414042', textAlign: 'right' }}>
                                        {item.birthday}
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 16
                            }}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>
                                        Số điện thoại
                                    </Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={{ color: '#414042', textAlign: 'right' }}>
                                        {item.phone}
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 16
                            }}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={{ fontSize: 14, color: '#8D8C8D' }}>
                                        Email
                                    </Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={{ color: '#414042', textAlign: 'right' }}>
                                        {item.email}
                                    </Text>
                                </View>
                            </View>
                        </>
                    ) : null
                }
            </View>
        );
    };

    _renderItem = ({ item }) => {
        return (
            <View
                style={[styles.itemContainer]}>
                <FastImage
                    source={{ uri: item.image }}
                    style={{
                        borderRadius: 10,
                        width: '100%',
                        height: 230,
                    }}
                />
                <View style={{ alignItems: 'center', marginTop: -30, marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: Color, textTransform: 'uppercase' }}>{item.name}</Text>
                    <View style={{ marginTop: 5, height: 3, width: 140, borderRadius: 35, backgroundColor: NewColor }} />
                    <Text style={{ marginTop: 5, fontSize: 12, fontWeight: '400', color: '#000' }}>Phí bảo hiểm</Text>
                    <Text style={{ marginTop: 3, fontSize: 12, fontWeight: 'bold', color: '#000' }}>
                        {formatVND(item.price, '.')}VNĐ/người/lượt
                    </Text>
                    <Text style={{ marginTop: 3, fontSize: 12, fontWeight: '400', color: '#000' }}>Số tiền bảo hiểm</Text>
                    <Text style={{ marginTop: 3, fontSize: 20, fontWeight: 'bold', color: NewColor }}>
                        {formatVND(item.insuranceValue, '.')}VNĐ
                    </Text>
                </View>
            </View>
        );
    };

    setItem = (index) => {
        const { packList } = this.state;
        this.setState({ chosenPack: packList[index].id }, () => this.getValueCom(packList[index].id));
    };

    storeInfomation = () => {
        const { chosenPack, packList, valueCom } = this.state;
        if (!chosenPack) {
            SimpleToast.show('Vui lòng chọn một gói bảo hiểm');
        } else {
            const data = packList.find((item) => item.id === chosenPack);
            data.index = data.id - 1;
            data.valueCom = valueCom;
            this.props.saveDelayFlightPackages(data);
            this.onNext();
        }
    };

    renderFormInputInfomation = () => {
        const { delayFlight, buyerInfomation, delayFlightPackages, codeNumber } = this.props;
        const { insuredCustomerInfo, packList, valueCom } = this.state;
        return (
            <View>
                <View style={{ marginTop: 16 }}>
                    <View style={styles.formContainer}>
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 16
                        }}>
                            <View style={{ flex: 0.6 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: TxtColor }}>
                                    1. Số hiệu chuyến bay
                                </Text>
                            </View>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ color: '#414042', textAlign: 'right', fontWeight: 'bold' }}>
                                    {
                                        delayFlight?.info?.showDepartCreate ?
                                            delayFlight?.info?.numberDepart :
                                            delayFlight?.info?.departFlight?.flightNumber
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 16
                        }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Mã đặt chỗ</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ color: '#414042', textAlign: 'right' }}>
                                    {
                                        codeNumber?.codeDepart
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 16
                        }}>
                            <View style={{ flex: 0.5, paddingRight: 5 }}>
                                <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Thời gian đi</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ color: '#414042', textAlign: 'right' }}>
                                    {
                                        delayFlight?.info?.showDepartCreate ?
                                            `${delayFlight?.info?.hourDepart} - ${delayFlight?.info?.startDateString}` :
                                            `${moment(delayFlight?.info?.departFlight?.estimateDepartTime).format('HH:mm')} - ${moment(delayFlight?.info?.departFlight?.estimateDepartTime).format('DD/MM/YYYY')}`
                                    }
                                </Text>
                                <Text style={{ color: '#414042', textAlign: 'right' }}>
                                    {delayFlight?.info?.fromPlace}
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 16
                        }}>
                            <View style={{ flex: 0.5, paddingRight: 5 }}>
                                <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Thời gian đến</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ color: '#414042', textAlign: 'right' }}>
                                    {
                                        delayFlight?.info?.showDepartCreate ?
                                            `${delayFlight?.info?.hourDepartArrive} - ${delayFlight?.info?.endDateDepart}` :
                                            `${moment(delayFlight?.info?.departFlight?.estimateArriveTime).format('HH:mm')} - ${moment(delayFlight?.info?.departFlight?.estimateArriveTime).format('DD/MM/YYYY')}`
                                    }
                                </Text>
                                <Text style={{ color: '#414042', textAlign: 'right' }}>
                                    {delayFlight?.info?.toPlace}
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 16
                        }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Thời gian bay</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ color: '#414042', textAlign: 'right' }}>
                                    {
                                        delayFlight?.info?.showDepartCreate ?
                                            `${formatHours(moment(`${delayFlight?.info?.endDateDepart} ${delayFlight?.info?.hourDepartArrive}`, 'DD/MM/YYYY HH:mm').diff(moment(`${delayFlight?.info?.startDateString} ${delayFlight?.info?.hourDepart}`, 'DD/MM/YYYY HH:mm'), 'minutes'))}` :
                                            `${formatHours(delayFlight?.info?.departFlight?.estimateDurationMinutes)}`
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    delayFlight?.info?.flightType === 'Khứ hồi' ? (

                        <View style={{ marginTop: 16 }}>
                            <View style={styles.formContainer}>
                                <View style={{
                                    flexDirection: 'row',
                                    marginBottom: 16
                                }}>
                                    <View style={{ flex: 0.6 }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: TxtColor }}>
                                            2. Số hiệu chuyến bay
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.4 }}>
                                        <Text style={{ color: '#414042', textAlign: 'right', fontWeight: 'bold' }}>
                                            {
                                                delayFlight?.info?.showReturnCreate ?
                                                    delayFlight?.info?.numberReturn :
                                                    delayFlight?.info?.returnFlight?.flightNumber
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 16
                                }}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Mã đặt chỗ</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={{ color: '#414042', textAlign: 'right' }}>
                                            {
                                                codeNumber?.codeReturn
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginBottom: 16
                                }}>
                                    <View style={{ flex: 0.5, paddingRight: 5 }}>
                                        <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Thời gian đi</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={{ color: '#414042', textAlign: 'right' }}>
                                            {
                                                delayFlight?.info?.showReturnCreate ?
                                                    `${delayFlight?.info?.hourReturn} - ${delayFlight?.info?.endDateString}` :
                                                    `${moment(delayFlight?.info?.returnFlight?.estimateDepartTime).format('HH:mm')} - ${moment(delayFlight?.info?.returnFlight?.estimateDepartTime).format('DD/MM/YYYY')}`
                                            }
                                        </Text>
                                        <Text style={{ color: '#414042', textAlign: 'right' }}>
                                            {delayFlight?.info?.toPlace}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginBottom: 16
                                }}>
                                    <View style={{ flex: 0.5, paddingRight: 5 }}>
                                        <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Thời gian đến</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={{ color: '#414042', textAlign: 'right' }}>
                                            {
                                                delayFlight?.info?.showReturnCreate ?
                                                    `${delayFlight?.info?.hourReturnArrive} - ${delayFlight?.info?.endDateReturn}` :
                                                    `${moment(delayFlight?.info?.returnFlight?.estimateArriveTime).format('HH:mm')} - ${moment(delayFlight?.info?.returnFlight?.estimateArriveTime).format('DD/MM/YYYY')}`
                                            }
                                        </Text>
                                        <Text style={{ color: '#414042', textAlign: 'right' }}>
                                            {delayFlight?.info?.fromPlace}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginBottom: 16
                                }}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Thời gian bay</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={{ color: '#414042', textAlign: 'right' }}>
                                            {
                                                delayFlight?.info?.showReturnCreate ?
                                                    `${formatHours(moment(`${delayFlight?.info?.endDateReturn} ${delayFlight?.info?.hourReturnArrive}`, 'DD/MM/YYYY HH:mm').diff(moment(`${delayFlight?.info?.endDateString} ${delayFlight?.info?.hourReturn}`, 'DD/MM/YYYY HH:mm'), 'minutes'))}` :
                                                    `${formatHours(delayFlight?.info?.returnFlight?.estimateDurationMinutes)}`
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : null
                }
                <View style={[{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }]}>
                    <IconBuyerSvg height={15} width={15} color={Color} />
                    <Text style={styles.titleStyle}>
                        Người được bảo hiểm:
                    </Text>
                </View>
                <View style={{ marginTop: 16 }}>
                    <View style={styles.formContainer}>
                        {
                            insuredCustomerInfo.map((item, index) => this.renderCustomerInfo(item, index))
                        }
                    </View>
                </View>
                {
                    buyerInfomation?.isVat ? (
                        <>
                            <View style={[{ marginTop: 26 }]}>
                                <Text style={[styles.titleStyle, { marginLeft: 0 }]}>
                                    Thông tin xuất hóa đơn VAT:
                                </Text>
                            </View>
                            <View style={{ marginTop: 16 }}>
                                <View style={styles.formContainer}>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginBottom: 16
                                    }}>
                                        <View style={{ flex: 0.6 }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: TxtColor }}>
                                                Tên doanh nghiệp
                                            </Text>
                                        </View>
                                        <View style={{ flex: 0.4 }}>
                                            <Text style={{ color: '#414042', textAlign: 'right', fontWeight: 'bold' }}>
                                                {
                                                    buyerInfomation?.companyName
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 16
                                    }}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Mã số thuế</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={{ color: '#414042', textAlign: 'right' }}>
                                                {
                                                    buyerInfomation?.companyTaxCode
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginBottom: 16
                                    }}>
                                        <View style={{ flex: 0.5, paddingRight: 5 }}>
                                            <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Email nhận hóa đơn</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={{ color: '#414042', textAlign: 'right' }}>
                                                {
                                                    buyerInfomation?.companyEmail
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <View style={{ flex: 0.5, paddingRight: 5 }}>
                                            <Text style={{ fontSize: 14, color: '#8D8C8D' }}>Địa chỉ doanh nghiệp</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={{ color: '#414042', textAlign: 'right' }}>
                                                {
                                                    buyerInfomation?.companyAddress
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </>
                    ) : null
                }
                <Promotion
                    totalPrice={0}
                    insurProductCode={'DF1'}
                />
                <View style={[{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }]}>
                    <IconDiamondSvg height={13} width={13 * 25 / 19} />
                    <Text style={styles.titleStyle}>
                        Chọn gói bảo hiểm:
                    </Text>
                </View>
                {
                    packList.length > 0 ? (
                        <View style={{ marginTop: 12, marginHorizontal: -24 }}>
                            <Carousel
                                ref={(c) => this.carousel = c}
                                data={packList}
                                renderItem={this._renderItem}
                                sliderWidth={SLIDER_WIDTH}
                                itemWidth={ITEM_WIDTH}
                                inactiveSlideShift={0}
                                firstItem={delayFlightPackages?.index || 0}
                                onSnapToItem={(index) => this.setItem(index)}
                                scrollInterpolator={scrollInterpolator}
                                slideInterpolatedStyle={animatedStyles}
                                useScrollView={true}
                            />
                        </View>
                    ) : null
                }
                {
                    !nameApp.includes('EPTI') && !nameApp.includes('INSO') ? (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 16,
                            paddingHorizontal: 12,
                            marginTop: 16,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#D9D9D9',
                            borderStyle: 'dashed',
                        }}>
                            <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>Điểm</Text>
                            <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold' }}>{roundNumber(valueCom) / 1000}</Text>
                        </View>
                    ) : null
                }
            </View>
        );
    };

    setScrollViewRef = element => {
        this.listRef = element;
    };

    onNext = () => {
        this.listRef.scrollTo({ x: 0, y: 0, animated: true });
        Actions.PreviewDelayFlight();
    };

    render() {
        const headerZIndex = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [999, 1001, 1002],
                extrapolate: 'clamp'
            });

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={{ flex: 1 }}>
                    <Animated.View style={{ zIndex: headerZIndex }}>
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
                    <View style={{ zIndex: 2011 }}>
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
                        <View style={styles.contentContainer}>
                            <SelectCompany productCode={'DF1'} valueMargin />
                            <View style={styles.titleContainer}>
                                <IconPlaneSvg width={16} height={16} />
                                <Text style={styles.titleStyle}>
                                    Chuyến bay mua bảo hiểm:
                                </Text>
                            </View>
                            {this.renderFormInputInfomation()}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={{ marginHorizontal: 24, marginBottom: 4 }}>
                    <FooterButton>
                        <Button
                            label={'TIẾP TỤC'}
                            marginTop={16}
                            width={'100%'}
                            onPress={this.storeInfomation}
                        />
                    </FooterButton>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: NewColor,
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
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTitle,
        marginLeft: 8,
    },
    insuredCutomerFormContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    formContainer: {
        alignSelf: 'center',
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        padding: 16,
        width: widthPercentageToDP('87'),
    },
    inputRow: {
        marginTop: -5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noteTextStyle: {
        fontStyle: 'italic',
        color: Color,
        marginVertical: 12,
    },
});

import { connect } from 'react-redux';
import { saveDelayFlightPackages } from './actions/actions';
import moment from 'moment';

const mapStateToProps = (state) => {
    const idComSelected = state.selectCompany.idComSelected['DF1'];
    return {
        idComSelected,
        buyerInfomation: state.delayFlight.delayFlightBuyer?.buyerInfomation,
        insuredCustomerInfo: state.delayFlight.delayFlightBuyer?.insuredCustomers,
        delayFlightPackages: state.delayFlight.delayFlightPackages,
        delayFlight: state.delayFlight.delayFlightInfo,
        codeNumber: state.delayFlight.codeNumber,
        orgCodeUser: state.userInfo.orgCodeUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        saveDelayFlightPackages: body => dispatch(saveDelayFlightPackages(body)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Package);
