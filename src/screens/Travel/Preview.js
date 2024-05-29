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
import moment from 'moment';
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
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconEditSvg from '../../config/images/icons/IconEditSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconUpSvg from '../../config/images/icons/IconUpSvg';
import IconDownSvg from '../../config/images/icons/IconDownSvg';
import IconReviewSvg from '../../config/images/icons/IconReviewSvg';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            isChecked: false,
            insurancePrintsAddress: {},
            insuredCustomerInfo: [],
            buyerInfomation: {},
            travelInfo: {},
            travelPackages: {},
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
            nextProps.insuredCustomerInfo &&
            nextProps.insuredCustomerInfo !== prevState.insuredCustomerInfo
        ) {
            update.insuredCustomerInfo = nextProps.insuredCustomerInfo;
        }
        if (
            nextProps.travelInfo &&
            nextProps.travelInfo !== prevState.travelInfo
        ) {
            update.travelInfo = nextProps.travelInfo;
        }
        if (
            nextProps.travelPackages &&
            nextProps.travelPackages !== prevState.travelPackages
        ) {
            update.travelPackages = nextProps.travelPackages;
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
        const { insuredCustomerInfo, buyerInfomation } = this.state;
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
                                <View style={{ flex: 0.6 }}>
                                    <Text style={styles.titleInfo}>CMND/CCCD/Hộ chiếu</Text>
                                </View>
                                <View style={{ flex: 0.4 }}>
                                    <Text style={styles.contentInfo}>{item?.identityNumber}</Text>
                                </View>
                            </View>
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.titleInfo}>Ngày sinh</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{item?.birthday}</Text>
                                </View>
                            </View>
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.titleInfo}>Số điện thoại</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{item?.phone}</Text>
                                </View>
                            </View>
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.titleInfo}>Mối quan hệ</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{buyerInfomation?.type === 2 ? item?.relationCompany : item?.relationFamily}</Text>
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
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>Tên doanh nghiệp</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.companyName}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>Mã số thuế</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.companyTaxCode}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>Họ và tên người mua</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.fullName}</Text>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>Họ và tên người mua</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.fullName}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>Giới tính</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.gender}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.titleInfo}>Ngày sinh</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.contentInfo}>{item?.birthday}</Text>
                                    </View>
                                </View>
                                <View style={styles.tourInfo}>
                                    <View style={{ flex: 0.6 }}>
                                        <Text style={styles.titleInfo}>CMND/CCCD/Hộ chiếu</Text>
                                    </View>
                                    <View style={{ flex: 0.4 }}>
                                        <Text style={styles.contentInfo}>{item?.cardId}</Text>
                                    </View>
                                </View>
                            </>
                        )
                    }
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Số điện thoại</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item?.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Email</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item?.email}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>{item?.type === 2 ? 'Địa chỉ doanh nghiệp' : 'Địa chỉ'}</Text>
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
    renderTravelInfo = () => {
        const { travelInfo } = this.state;
        return (
            (
                <View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>
                                {travelInfo?.info?.dataAreaType?.id === 1 ? 'Điểm đến' : 'Tên nước đến'}
                            </Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {
                                    travelInfo?.info?.dataAreaType?.id === 1 ?
                                        travelInfo?.info?.provinceType :
                                        travelInfo?.info?.nationType
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>
                                Loại tiền tệ
                            </Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {travelInfo?.info?.dataAreaType?.id === 1 ? 'VNĐ' : 'USD'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Ngày đi</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{travelInfo?.info?.startDateString}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Ngày về</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {travelInfo?.info?.endDateString}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Số ngày du lịch</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {travelInfo?.info?.longDays}
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
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Tên doanh nghiệp</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item?.vatCompanyName}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Mã số thuế</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item?.vatCompanyTaxCode}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Email</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item?.vatCompanyEmail}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Địa chỉ doanh nghiệp</Text>
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
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Họ và tên người nhận</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{item?.receiverName}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Số điện thoại</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{item?.receiverPhone}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Email</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{item?.receiverEmail}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
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
        const { travelInfo, travelPackages } = this.state;
        return (
            <View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Gói bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.6 }}>
                        <Text style={styles.contentInfo}>
                            {
                                travelInfo?.info?.dataAreaType?.id === 1 ?
                                    'Bảo hiểm du lịch Trong nước' :
                                    `Bảo hiểm du lịch Quốc tế - ${travelPackages?.pack?.dataInsuranceType?.subType === 'ALL' ? 'Gói kim cương' : 'Gói vàng'}`
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Số tiền bảo hiểm/người</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {
                                travelInfo?.info?.dataAreaType?.id === 1 ? (
                                    <Text style={{ color: TxtColor, fontSize: 14, textAlign: 'right' }}>
                                        {formatVND(travelPackages?.pack?.dataInsuranceType?.insuranceValue)}VNĐ
                                    </Text>
                                ) : (
                                    <Text style={{ color: TxtColor, fontSize: 14, textAlign: 'right' }}>
                                        ${formatVND(travelPackages?.pack?.dataInsuranceType?.insuranceValue)}
                                    </Text>
                                )
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Thời hạn bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            Từ {travelInfo?.info?.startDateString}
                        </Text>
                        <Text style={styles.contentInfo}>
                            đến {travelInfo?.info?.endDateString}
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Phí bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {
                                travelInfo?.info?.dataAreaType?.id === 1 ? (
                                    `${formatVND(travelPackages?.feeTravel)}VNĐ`
                                ) : (
                                    `$${formatVND(travelPackages?.originalFee)}`
                                )
                            }
                        </Text>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Thanh toán</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={[styles.contentInfo, { fontWeight: 'bold' }]}>
                            {formatVND(travelPackages?.feeTravel)}VNĐ
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
                <Text style={[styles.titleStyle, { fontSize: 18, color: colorTitle }]}>Hình thức giao nhận:</Text>
                <View style={{ marginTop: 8 }}>
                    <Text style={{color: TxtColor}}>
                        - Giấy chứng nhận bảo hiểm điện tử gửi tới email của quý khách
                    </Text>
                    {this.state.receiveType == 'EMS' ? (
                        <Text style={{color: TxtColor}}>
                            - Giấy chứng nhận bảo hiểm sẽ được gửi qua đường chuyển phát nhanh (EMS) đến địa chỉ quý khách đã cung cấp
                        </Text>
                    ) : null}
                    <Text style={{ color: Color, fontStyle: 'italic' }}>
                        Lưu ý:
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            width: 4,
                            height: 4,
                            borderRadius: 50,
                            backgroundColor: Color,
                            marginLeft: 2,
                            marginRight: 4,
                            marginTop: 7,
                        }} />
                        <Text style={{ flex: 1, color: Color, fontStyle: 'italic' }}>
                            Trong mọi trường hợp tổng số tiền bồi thường thiệt hại không vượt quá Số tiền bảo hiểm ghi trên Giấy chứng nhận bảo hiểm
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            width: 4,
                            height: 4,
                            borderRadius: 50,
                            backgroundColor: Color,
                            marginLeft: 2,
                            marginRight: 4,
                            marginTop: 7,
                        }} />
                        <Text style={{ flex: 1, color: Color, fontStyle: 'italic' }}>
                            Thể thao có tính chất chuyên nghiệp, khảo sát, thám hiểm, biểu diễn nguy hiểm,.. chỉ được bảo hiểm với điều kiện được PTI chấp nhận và nộp thêm phụ phí bảo hiểm.
                        </Text>
                    </View>
                    <Text style={{ color: Color, fontStyle: 'italic' }}>
                        Liên hệ hotline <Text style={{ fontWeight: 'bold' }}>1900545475</Text> để được hỗ trợ.
                    </Text>
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
        const { saveOrderInfomation, saveParamsContract, idComSelected, codeSelected } = this.props;
        const {
            insuredCustomerInfo,
            buyerInfomation,
            insurancePrintsAddress,
            receiveType,
            travelInfo,
            travelPackages,
        } = this.state;
        const arrCus = [];
        insuredCustomerInfo.map((item) => {
            arrCus.push({
                fullName: item.fullName,
                cardId: item.identityNumber,
                birthday: item.birthday,
                gender: 0,
                phone: item.phone,
                relation: buyerInfomation?.type === 1 ? item.relationFamily : item.relationCompany,
            });
        });
        let _url = `${URL}/api/contract/v1/travel-contracts`;
        let _body = {
            type: travelInfo?.info?.dataAreaType?.id === 1 ? 'DOMESTIC' : 'INTERNATIONAL',
            areaId: travelInfo?.info?.dataAreaType?.id || 0,
            areaName: travelInfo?.info?.areaType || '',
            countryCode: travelInfo?.info?.dataAreaType?.id === 1 ? 'VN' : travelInfo?.info?.dataNationType?.countryCode,
            countryName: travelInfo?.info?.dataAreaType?.id === 1 ? 'Việt Nam' : travelInfo?.info?.nationType,
            countryId: travelInfo?.info?.dataAreaType?.id === 1 ? 0 : travelInfo?.info?.dataNationType?.id,
            arrivalIdCity: travelInfo?.info?.dataProvinceType?.id || 0,
            arrivalCityName: travelInfo?.info?.provinceType || '',
            currency: travelInfo?.info?.dataAreaType?.id === 1 ? 'VND' : 'USD',
            departTime: travelInfo?.info?.startDateString || '',
            returnTime: travelInfo?.info?.endDateString || '',
            dayNumber: parseInt(travelInfo?.info?.longDays) || 0,
            packageId: travelPackages?.pack?.dataInsuranceType?.id || 0,
            buyer: {
                type: buyerInfomation?.type.toString() || 1,
                fullName: buyerInfomation?.fullName || '',
                birthday: buyerInfomation?.birthday || moment().format('DD/MM/YYYY'),
                gender: buyerInfomation?.gender === 'Nam' ? 1 : 2,
                cardId: buyerInfomation?.cardId || '',
                phone: buyerInfomation?.phone || '',
                email: buyerInfomation?.email || '',
                cityId: buyerInfomation?.provinceId || 0,
                cityName: buyerInfomation?.cityName || '',
                districtId: buyerInfomation?.districtId || 0,
                districtName: buyerInfomation?.districtName || '',
                address: buyerInfomation?.address || '',
                companyTaxCode: buyerInfomation?.companyTaxCode || '',
                companyName: buyerInfomation?.companyName || '',
                companyBuyerName: '',
                companyBuyerRole: ''
            },
            insurancePrintsAddress: {
                fullName: insurancePrintsAddress?.receiverName || '',
                phone: insurancePrintsAddress?.receiverPhone || '',
                email: insurancePrintsAddress?.receiverEmail || '',
                cityId: insurancePrintsAddress?.receiverProvinceId || 0,
                cityName: insurancePrintsAddress?.receiverProvince || '',
                districtId: insurancePrintsAddress?.receiverDistrictId || 0,
                districtName: insurancePrintsAddress?.receiverDistrict || '',
                address: insurancePrintsAddress?.receiverAddress || '',
            },
            insuredCustomers: arrCus,
            receiveType: receiveType === 'EMS' ? "BOTH" : "EMAIL",
            isVat: buyerInfomation?.isVat ? 1 : 0,
            vatCompanyName: buyerInfomation?.vatCompanyName || '',
            vatCompanyTaxCode: buyerInfomation?.vatCompanyTaxCode || '',
            vatCompanyAddress: buyerInfomation?.vatCompanyAddress || '',
            vatCompanyEmail: buyerInfomation?.vatCompanyEmail || '',
            productCode: travelInfo?.info?.dataAreaType?.id === 1 ? 'T1' : 'T2',
            supplierId: idComSelected || '',
            supplierCode: codeSelected || '',
        };
        console.log('BODY du lich: ', _body);
        saveParamsContract({ body: _body, url: _url });
        const _array = {
            orderPrice: travelPackages?.feeTravel - buyerInfomation.valueCom,
            priceFull: travelPackages?.feeTravel,
            orderDescription: `Thanh toan bao hiem du lich`,
            buyer: {
                fullName: buyerInfomation?.fullName,
                email: buyerInfomation?.email,
                phone: buyerInfomation?.phone,
                address: `${buyerInfomation?.address?.trim()?.length > 0 ? `${buyerInfomation?.address}, ` : ''}${buyerInfomation?.districtName ? `${buyerInfomation?.districtName}, ` : ''}${buyerInfomation?.cityName || ''}`,
            },
        };
        saveOrderInfomation(_array);
        Actions.Pay({ insurProductCode: travelInfo?.info?.dataAreaType?.id === 1 ? 'T1' : 'T2', codeInsur: 'T1' });
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
        } = this.state;
        return (
            <View style={styles.container}>
                <Animated.View style={{zIndex: headerZIndex}}>
                    <ImageHeaderScroll code={'T1'} offset={this.scrollYAnimatedValue} />
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
                    <HeaderScroll code={'T1'} offset={this.scrollYAnimatedValue} />
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
                        [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }],
                        { useNativeDriver: false }
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
                                <Text style={styles.titleStyle}>Thông tin chuyến du lịch:</Text>
                                <TouchableOpacity onPress={() => Actions.InfoScreen()}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            {
                                this.renderTravelInfo()
                            }
                        </View>
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
                            buyerInfomation?.type === 2 && buyerInfomation?.isVat ? (
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
                                <Text style={styles.titleStyle}>Gói bảo hiểm:</Text>
                                <TouchableOpacity onPress={() => Actions.TravelPackage()}>
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
const mapStateToProps = (state) => {
    const listCompany = state.selectCompany.listCompany['T1'];
    const idComSelected = state.selectCompany.idComSelected['T1'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        codeSelected: obj?.insurOrg?.code,
        buyerInfomation: state.travelInsurance.travelBuyer?.buyerInfomation,
        insurancePrintsAddress: state.travelInsurance.travelBuyer?.printAddress,
        insuredCustomerInfo: state.travelInsurance.travelBuyer?.insuredCustomers,
        travelInfo: state.travelInsurance.travelInfo,
        travelPackages: state.travelInsurance.travelPackages,
        idComSelected,
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
