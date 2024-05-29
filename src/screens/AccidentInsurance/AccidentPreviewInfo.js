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
    heightPercentageToDP,
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import Button from '../../components/buy/Button';
import FooterButton from '../../components/FooterButton';
import FastImage from 'react-native-fast-image';
import { Color, URL, NewColor, NewColorDisable, colorTitle, TxtColor, colorNote } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { formatVND } from '../../components/Functions';
import Store from '../../services/Store';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconEditSvg from '../../config/images/icons/IconEditSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconDownSvg from '../../config/images/icons/IconDownSvg';
import IconUpSvg from '../../config/images/icons/IconUpSvg';
import IconReviewSvg from '../../config/images/icons/IconReviewSvg';

class AccidentPreviewInfo extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            organizationCode: '',
            isChecked: false,
            insurancePrintsAddress: {},
            insuredCustomerInfo: [],
            buyerInfomation: {},
            chosenPackage: {},
            receiveType: '',
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let update = {};
        if (
            nextProps.insurancePrintsAddress &&
            nextProps.insurancePrintsAddress !== prevState.insurancePrintsAddress
        ) {
            update.insurancePrintsAddress = nextProps.insurancePrintsAddress;
            update.receiveType = nextProps.insurancePrintsAddress.receiveType;
        }
        if (
            nextProps.buyerInfomation &&
            nextProps.buyerInfomation !== prevState.buyerInfomation
        ) {
            update.buyerInfomation = nextProps.buyerInfomation;
        }
        if (
            nextProps.chosenPackage &&
            nextProps.chosenPackage !== prevState.chosenPackage
        ) {
            update.chosenPackage = nextProps.chosenPackage;
        }
        if (
            nextProps.insuredCustomerInfo &&
            nextProps.insuredCustomerInfo !== prevState.insuredCustomerInfo
        ) {
            update.insuredCustomerInfo = nextProps.insuredCustomerInfo;
        }
        return update;
    }

    componentDidMount = () => {
        const {dataTokenInsur} = this.props;
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(dataTokenInsur?.token || token);
            this.setState({ organizationCode: dataToken?.organizationCode });
        })
    };

    onChangeShow = (index) => {
        const { insuredCustomerInfo } = this.state;
        insuredCustomerInfo[index].show = !insuredCustomerInfo[index].show;
        this.setState({ insuredCustomerInfo: insuredCustomerInfo });
    };
    // render ds người được bảo hiểm
    renderCustomerInfo = ({ item, index }) => {
        const { insuredCustomerInfo, chosenPackage } = this.state;
        const isLine = (index === 0 && insuredCustomerInfo.length === 1) || (insuredCustomerInfo.length - 1 === index)
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
                        style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center', zIndex: 99 }}
                        onPress={() => this.onChangeShow(index)}
                    >
                        <View style={{marginRight: 3, marginLeft: -15}}>
                            {
                                item?.show ?
                                    <IconUpSvg width={12} height={12} /> :
                                    <IconDownSvg width={12} height={12} /> 
                            }
                        </View>
                        <Text style={styles.titleInfo}>{index + 1}. Họ và tên</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {item?.fullName}
                        </Text>
                    </View>
                </View>
                {
                    item?.show ? (
                        <>
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.4 }}>
                                    <Text style={styles.titleInfo}>CMND/CCCD/Hộ chiếu</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{item?.identityNumber}</Text>
                                </View>
                            </View>
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.4 }}>
                                    <Text style={styles.titleInfo}>Ngày sinh</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{item?.birthday}</Text>
                                </View>
                            </View>
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.4 }}>
                                    <Text style={styles.titleInfo}>Mối quan hệ</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{chosenPackage?.typeInsure === 2 ? item?.relation : item?.relationFamily}</Text>
                                </View>
                            </View>
                        </>
                    ) : null
                }
            </View>
        );
    };
    // render thông tin người mua
    renderBuyerInfomation = ({ item }) => {
        return (
            (
                <View>
                    {
                        item?.type === 2 ? (
                            <>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.4 }}>
                                        <Text style={styles.titleInfo}>Tên doanh nghiệp</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.companyName}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.4 }}>
                                        <Text style={styles.titleInfo}>Mã số thuế doanh nghiệp</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.companyTaxCode}</Text>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.4 }}>
                                        <Text style={styles.titleInfo}>Họ và tên người mua</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.fullName}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.4 }}>
                                        <Text style={styles.titleInfo}>Giới tính</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.gender}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.4 }}>
                                        <Text style={styles.titleInfo}>Ngày sinh</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.birthday}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.4 }}>
                                        <Text style={styles.titleInfo}>CMND/CCCD/Hộ chiếu</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.cardId}</Text>
                                    </View>
                                </View>
                            </>
                        )
                    }
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={styles.titleInfo}>Số điện thoại</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item?.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={styles.titleInfo}>Email</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item?.email}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={styles.titleInfo}>Địa chỉ</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {item?.address}, {item?.districtName}, {item?.cityName}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        );
    };
    renderVATInfomation = ({ item }) => {
        return (
            (
                <View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={styles.titleInfo}>Tên doanh nghiệp</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item?.vatCompanyName}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={styles.titleInfo}>Mã số thuế</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item?.vatCompanyTaxCode}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={styles.titleInfo}>Email</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item?.vatCompanyEmail}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={styles.titleInfo}>Địa chỉ</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {item?.vatCompanyAddress}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        );
    };
    // render thông tin địa chỉ nhận ấn chỉ
    renderBillExport = ({ item }) => {
        return (
            <View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Họ và tên người nhận</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{item?.receiverName}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Số điện thoại</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{item?.receiverPhone}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Email</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{item?.receiverEmail}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Địa chỉ</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {item?.receiverAddress}, {item?.receiverDistrict},{' '}
                            {item?.receiverProvince}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };
    // render bảng phí
    renderFee = () => {
        const { promotionPrice } = this.props;
        const { chosenPackage, insuredCustomerInfo, buyerInfomation } = this.state;
        const totalPrice = chosenPackage?.typeInsure === 2 && buyerInfomation.type === 1 ?
            (chosenPackage?.price || 0) :
            (chosenPackage?.price || 0) * insuredCustomerInfo.length;
        const payPrice = promotionPrice?.price ? totalPrice - promotionPrice?.price : totalPrice;
        return (
            <View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Gói bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {chosenPackage?.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Thời hạn bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            Từ {chosenPackage?.startDateString}
                        </Text>
                        <Text style={styles.contentInfo}>
                            đến {chosenPackage?.endDateString}
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Phí bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {formatVND(chosenPackage?.price, '.')}VNĐ
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Số người được bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {
                                chosenPackage?.typeInsure === 2 && buyerInfomation.type === 1 ? '1' :
                                    insuredCustomerInfo.length
                            }
                        </Text>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Thanh toán</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={[styles.contentInfo, { fontWeight: 'bold' }]}>
                            {formatVND(payPrice, '.')}VNĐ
                        </Text>
                    </View>
                </View>
            </View>
        );
    };
    // render hình thức giao nhận
    renderType = () => {
        return (
            <View style={{ marginHorizontal: 24, marginTop: 24 }}>
                <Text style={[styles.titleStyle, { color: colorTitle }]}>Hình thức giao nhận:</Text>
                <View style={{ marginTop: 8 }}>
                    <Text style={{color: TxtColor}}>
                        - Giấy chứng nhận bảo hiểm điện tử gửi tới email của quý khách
                    </Text>
                    {this.state.receiveType == 'EMS' ? (
                        <Text style={{color: TxtColor}}>
                            - Giấy chứng nhận bảo hiểm sẽ được gửi qua đường chuyển phát nhanh (EMS) đến địa chỉ quý khách đã cung cấp
                        </Text>
                    ) : null}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 16, paddingRight: 24 }}>
                    <TouchableOpacity
                        onPress={() => this.setState({ isChecked: !this.state.isChecked })}>
                        {
                          this.state.isChecked
                            ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                            : <IconBoxSvg width={20} height={20} color={NewColor} />
                        }
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 8, color: TxtColor }}>
                        Tôi đã đọc, hiểu và đồng ý với "
                        {
                            <Text
                                style={{ color: colorNote, textDecorationLine: 'underline' }}
                                onPress={() => Linking.openURL('https://epti.vn/dieu-khoan-su-dung-website')}
                            >
                                Điều khoản sử dụng
                            </Text>
                        }
                        " và "
                        {
                            <Text
                                style={{ color: colorNote, textDecorationLine: 'underline' }}
                                onPress={() => Linking.openURL('https://epti-documents.s3-ap-southeast-1.amazonaws.com/Thong+tu+04.2021.TT.BTC_ngay+15012021.pdf')}
                            >
                                Quy tắc bảo hiểm
                            </Text>
                        }
                        " đi kèm sản phẩm này của PTI
                    </Text>
                </View>
            </View>
        );
    };
    onPay = () => {
        const { saveOrderInfomation, saveParamsContract, promotionPrice, insurProductCode, idComSelected, codeSelected } = this.props;
        const {
            chosenPackage,
            insuredCustomerInfo,
            buyerInfomation,
            insurancePrintsAddress,
            receiveType,
        } = this.state;
        const totalPrice = chosenPackage?.typeInsure === 2 && buyerInfomation.type === 1 ?
            (chosenPackage?.price || 0) :
            (chosenPackage?.price || 0) * insuredCustomerInfo.length;
        const payPrice = promotionPrice?.price ? totalPrice - promotionPrice?.price : totalPrice;
        if (chosenPackage?.typeInsure === 2) {
            let url = `${URL}/api/contract/v1/family-accident-contracts`;
            let body = {
                packageId: chosenPackage?.id || 0,
                buyer: {
                    type: buyerInfomation.type || 0,
                    fullName: buyerInfomation.fullName || '',
                    birthday: buyerInfomation.birthday || '',
                    gender: buyerInfomation.gender === 'Nam' ? 1 : 2,
                    cardId: buyerInfomation.cardId || '',
                    phone: buyerInfomation.phone || '',
                    email: buyerInfomation.email || '',
                    cityId: buyerInfomation.provinceId || 0,
                    cityName: buyerInfomation.cityName || '',
                    districtId: buyerInfomation.districtId || 0,
                    districtName: buyerInfomation.districtName || '',
                    address: buyerInfomation.address || '',
                    companyTaxCode: buyerInfomation.companyTaxCode || '',
                    companyName: buyerInfomation.companyName || '',
                    companyBuyerName: buyerInfomation.fullName || '',
                },
                insurancePrintsAddress: {
                    fullName: insurancePrintsAddress.receiverName || '',
                    phone: insurancePrintsAddress.receiverPhone || '',
                    email: insurancePrintsAddress.receiverEmail || '',
                    cityId: insurancePrintsAddress.receiverProvinceId || 0,
                    cityName: insurancePrintsAddress.receiverProvince || '',
                    districtId: insurancePrintsAddress.receiverDistrictId || 0,
                    districtName: insurancePrintsAddress.receiverDistrict || '',
                    address: insurancePrintsAddress.receiverAddress || '',
                },
                insuredCustomers: insuredCustomerInfo,
                receiveType: receiveType === 'EMS' ? "BOTH" : "EMAIL",
                isVat: buyerInfomation.isVat ? 1 : 0,
                vatCompanyName: buyerInfomation.vatCompanyName || '',
                vatCompanyTaxCode: buyerInfomation.vatCompanyTaxCode || '',
                vatCompanyAddress: buyerInfomation.vatCompanyAddress || '',
                vatCompanyEmail: buyerInfomation.vatCompanyEmail || '',
                insurStartTime: chosenPackage?.startDateString || '',
                insurEndTime: chosenPackage?.endDateString || '',
                insurPeriodMonth: 12,
                productCode: insurProductCode || '',
                supplierId: idComSelected || '',
                supplierCode: codeSelected || '',
            };
            console.log('body', body)
            console.log('url', url)
            saveParamsContract({ body, url });
            const array = {
                orderPrice: payPrice - buyerInfomation.valueCom,
                priceFull: payPrice,
                orderDescription: `Thanh toan bao hiem tai nan ho gia dinh`,
                buyer: {
                    fullName: buyerInfomation.fullName,
                    email: buyerInfomation.email,
                    phone: buyerInfomation.phone,
                    address: `${buyerInfomation.address?.trim()?.length > 0 ? `${buyerInfomation.address}, ` : ''}${buyerInfomation.districtName ? `${buyerInfomation.districtName}, ` : ''}${buyerInfomation.cityName || ''}`,
                },
            };
            saveOrderInfomation(array);
        } else {
            let _url = `${URL}/api/contract/v1/individual-accident-contracts`;
            let _body = {
                packageId: chosenPackage?.id || 0,
                buyer: {
                    type: buyerInfomation.type || 0,
                    fullName: buyerInfomation.fullName || '',
                    birthday: buyerInfomation.birthday || '',
                    gender: buyerInfomation.gender === 'Nam' ? 1 : 2,
                    identityNumber: buyerInfomation.cardId || '',
                    phone: buyerInfomation.phone || '',
                    email: buyerInfomation.email || '',
                    provinceId: buyerInfomation.provinceId || 0,
                    districtId: buyerInfomation.districtId || 0,
                    address: buyerInfomation.address || '',
                    taxCode: buyerInfomation.companyTaxCode || '',
                    companyName: buyerInfomation.companyName || '',
                },
                insurancePrintFullName: insurancePrintsAddress.receiverName || '',
                insurancePrintPhone: insurancePrintsAddress.receiverPhone || '',
                insurancePrintEmail: insurancePrintsAddress.receiverEmail || '',
                insurancePrintCityId: insurancePrintsAddress.receiverProvinceId || 0,
                insurancePrintDistrictId: insurancePrintsAddress.receiverDistrictId || 0,
                insurancePrintAddress: insurancePrintsAddress.receiverAddress || '',
                insuredCustomer: buyerInfomation.type === 1 ?
                    insuredCustomerInfo.map((item) => {
                        item.relation = item?.relationFamily;
                        return item;
                    }) :
                    insuredCustomerInfo,
                receiveType: receiveType === 'EMS' ? "BOTH" : "EMAIL",
                isVat: buyerInfomation.isVat,
                vatCompanyName: buyerInfomation.vatCompanyName || '',
                vatCompanyTaxCode: buyerInfomation.vatCompanyTaxCode || '',
                vatCompanyAddress: buyerInfomation.vatCompanyAddress || '',
                vatCompanyEmail: buyerInfomation.vatCompanyEmail || '',
                effectiveAt: chosenPackage?.startDateString || '',
                duration: 12,
                productCode: insurProductCode || '',
                supplierId: idComSelected || '',
                supplierCode: codeSelected || '',
            };
            console.log('body', _body)
            console.log('url', _url)
            saveParamsContract({ body: _body, url: _url });
            const _array = {
                orderPrice: payPrice - buyerInfomation.valueCom,
                priceFull: payPrice,
                orderDescription: `Thanh toan bao hiem tai nan ca nhan`,
                buyer: {
                    fullName: buyerInfomation.fullName,
                    email: buyerInfomation.email,
                    phone: buyerInfomation.phone,
                    address: `${buyerInfomation.address?.trim()?.length > 0 ? `${buyerInfomation.address}, ` : ''}${buyerInfomation.districtName ? `${buyerInfomation.districtName}, ` : ''}${buyerInfomation.cityName || ''}`,
                },
            };
            saveOrderInfomation(_array);
        }
        Actions.Pay({ insurProductCode: insurProductCode, codeInsur: 'A1' });
    };
    render() {
        const headerZIndex = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [999, 1001, 1002],
                extrapolate: 'clamp'
            });
    
        const {
            insuredCustomerInfo,
            insurancePrintsAddress,
            buyerInfomation,
            receiveType,
            chosenPackage,
            organizationCode,
        } = this.state;
        return (
            <View style={styles.container}>
                <Animated.View style={{zIndex: headerZIndex}}>
                    <ImageHeaderScroll code={'A2'} offset={this.scrollYAnimatedValue} />
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
                    <HeaderScroll code={'A2'} offset={this.scrollYAnimatedValue} secondName={organizationCode === 'SVFC'} />
                </View>
                <ScrollView
                    style={{ zIndex: 1000 }}
                    contentContainerStyle={{
                        paddingTop: HEADER_MAX_HEIGHT,
                        paddingBottom: 24,
                    }}
                    ref={this.setScrollViewRef}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }],
                        { useNativeDriver: false }
                    )}>
                    <View style={{
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        marginTop: -20,
                    }}>
                        <View style={[styles.titleContainer, { marginHorizontal: 24, marginTop: 20 }]}>
                            <IconReviewSvg width={15} height={15} />
                            <Text style={styles.titlePreview}>
                                Xem lại thông tin
                            </Text>
                        </View>
                        {
                            chosenPackage?.typeInsure === 1 || (chosenPackage?.typeInsure === 2 && buyerInfomation.type === 2) ? (
                                <View style={[styles.contentContainer, { marginTop: 24 }]}>
                                    <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                        <Text style={styles.titleStyle}>Người được bảo hiểm:</Text>
                                        <TouchableOpacity onPress={() => Actions.pop()}>
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
                            ) : null
                        }
                        {
                            chosenPackage?.typeInsure === 2 ? (
                                <View style={[styles.contentContainer, { marginTop: 24 }]}>
                                    <View style={styles.titleContainer}>
                                        <Text style={styles.titleStyle}>Người được bảo hiểm:</Text>
                                    </View>
                                    <Text style={{ marginTop: 12 }}>
                                        Người được bảo hiểm gồm Tất cả những người có tên trong SỔ HỘ KHẨU (tối đa 8 người) của Bên mua bảo hiểm tại thời điểm tham gia bảo hiểm và không thuộc đối tượng bị loại trừ.
                                    </Text>
                                </View>
                            ) : null
                        }
                        <View style={[styles.contentContainer, { marginTop: 24 }]}>
                            <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                <Text style={styles.titleStyle}>Thông tin bên mua bảo hiểm:</Text>
                                <TouchableOpacity onPress={() => Actions.pop()}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            {/* thông tin người mua  */}
                            <FlatList
                                data={[buyerInfomation]}
                                renderItem={this.renderBuyerInfomation}
                                keyExtractor={index => index.toString()}
                            />
                        </View>
                        {
                            buyerInfomation.type === 2 && buyerInfomation.isVat ? (
                                <View style={[styles.contentContainer, { marginTop: 24 }]}>
                                    <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                        <Text style={styles.titleStyle}>Thông tin xuất hóa đơn VAT</Text>
                                        <TouchableOpacity onPress={() => Actions.pop()}>
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
                        {
                            receiveType === 'EMS' ? (
                                <View style={[styles.contentContainer, { marginTop: 24 }]}>
                                    <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                        <Text style={styles.titleStyle}>Địa chỉ nhận ấn chỉ bảo hiểm:</Text>
                                        <TouchableOpacity onPress={() => Actions.pop()}>
                                            <IconEditSvg width={16} height={15} />
                                        </TouchableOpacity>
                                    </View>
                                    {/* thông tin địa chỉ nhận ấn chỉ  */}
                                    <FlatList
                                        data={[insurancePrintsAddress]}
                                        renderItem={this.renderBillExport}
                                        keyExtractor={index => index.toString()}
                                    />
                                </View>
                            ) : null
                        }
                        <View style={[styles.contentContainer, { marginTop: 24 }]}>
                            <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                <Text style={styles.titleStyle}>Gói bảo hiểm</Text>
                                <TouchableOpacity onPress={() => Actions.AccidentPackage()}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            {/* render bảng phí  */}
                            {this.renderFee()}
                        </View>
                        {/* render hình thức giao nhận  */}
                        {this.renderType()}
                    </View>
                </ScrollView>
                <FooterButton>
                    <Button
                        color={this.state.isChecked ? NewColor : NewColorDisable}
                        label={'THANH TOÁN'}
                        onPress={this.onPay}
                        disable={!this.state.isChecked}
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
const mapStateToProps = (state, ownProps) => {
    const listCompany = state.selectCompany.listCompany[ownProps.insurProductCode];
    const idComSelected = state.selectCompany.idComSelected[ownProps.insurProductCode];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        idComSelected,
        codeSelected: obj?.insurOrg?.code || '',
        chosenPackage: state.accidentBuy.chosenPackage,
        buyerInfomation: state.accidentBuy.buyerInfomation,
        insurancePrintsAddress: state.accidentBuy.insurancePrintsAddress,
        insuredCustomerInfo: state.accidentBuy.insuredCustomerInfo,
        promotionPrice: state.promotion.promotionPrice[ownProps.insurProductCode],
        dataTokenInsur: state.insurance.tokenInsur['A1'],
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
)(AccidentPreviewInfo);
