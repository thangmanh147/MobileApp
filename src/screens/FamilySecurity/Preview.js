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
import { Color, URL, NewColor, NewColorDisable, colorTitle, TxtColor, colorBackground, textDisable, nameApp, colorNote } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { formatVND } from '../../components/Functions';
import Store from '../../services/Store';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT } from '../../utils/Util';
import analytics from '@react-native-firebase/analytics';
import { saveLogContract } from '../../actions/logContract';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconDownItemSvg from '../../config/images/icons/IconDownItemSvg';
import IconUpItemSvg from '../../config/images/icons/IconUpItemSvg';
import IconEditSvg from '../../config/images/icons/IconEditSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconReviewSvg from '../../config/images/icons/IconReviewSvg';

class AccidentPreviewInfo extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            isChecked: false,
            insurancePrintsAddress: {},
            insuredCustomerInfo: [],
            buyerInfomation: {},
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
        return update;
    }

    onChangeHide = (index) => {
        const { insuredCustomerInfo } = this.state;
        insuredCustomerInfo[index].hide = !insuredCustomerInfo[index].hide;
        this.setState({ insuredCustomerInfo: insuredCustomerInfo });
    };
    // render ds người được bảo hiểm
    renderCustomerInfo = ({ item, index }) => {
        const { insuredCustomerInfo } = this.state;
        const isLine = (index === 0 && insuredCustomerInfo.length === 1) || (insuredCustomerInfo.length - 1 === index)
        return (
            <View
                style={{
                    paddingBottom: isLine ? 0 : 12,
                    borderBottomWidth: isLine ? 0 : 1,
                    borderBottomColor: textDisable,
                }}>
                <View style={styles.tourInfo}>
                    <Text style={styles.titleInfo}>{index + 1}. Người được bảo hiểm {index + 1}</Text>
                    <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => this.onChangeHide(index)}>
                        {
                            !item.hide ?
                                <IconUpItemSvg width={17} height={17} /> :
                                <IconDownItemSvg width={17} height={17} />
                        }
                    </TouchableOpacity>
                </View>
                {
                    !item.hide ? (
                        <>
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.titleInfo}>Mối quan hệ</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{item.relationFamily}</Text>
                                </View>
                            </View>
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.titleInfo}>Họ và tên</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>
                                        {item.fullName}
                                    </Text>
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
                                <View style={{ flex: 0.6 }}>
                                    <Text style={styles.titleInfo}>CMND/CCCD/Hộ chiếu</Text>
                                </View>
                                <View style={{ flex: 0.4 }}>
                                    <Text style={styles.contentInfo}>{item.identityNumber}</Text>
                                </View>
                            </View>
                            {
                                item.phone?.trim()?.length > 0 ? (
                                    <View style={styles.tourInfo}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={styles.titleInfo}>Số điện thoại</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={styles.contentInfo}>{item.phone}</Text>
                                        </View>
                                    </View>
                                ) : null
                            }
                            {
                                item.address?.trim()?.length > 0 ? (
                                    <View style={styles.tourInfo}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={styles.titleInfo}>Địa chỉ</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={styles.contentInfo}>{item.address}</Text>
                                        </View>
                                    </View>
                                ) : null
                            }
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
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Họ và tên người mua</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item.fullName}</Text>
                        </View>
                    </View>
                    {
                        item.gender?.length > 0 ? (
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.titleInfo}>Giới tính</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{item.gender}</Text>
                                </View>
                            </View>
                        ) : null
                    }
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Ngày sinh</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item.birthday}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.6 }}>
                            <Text style={styles.titleInfo}>CMND/CCCD/Hộ chiếu</Text>
                        </View>
                        <View style={{ flex: 0.4 }}>
                            <Text style={styles.contentInfo}>{item.cardId}</Text>
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
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Địa chỉ</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {item.address}, {item.districtName}, {item.cityName}
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
                        <Text style={styles.contentInfo}>{item.receiverName}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Số điện thoại</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{item.receiverPhone}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Email</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{item.receiverEmail}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>Địa chỉ</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {item.receiverAddress}, {item.receiverDistrict},{' '}
                            {item.receiverProvince}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };
    // render bảng phí
    renderFee = () => {
        const { chosenPackage, promotionPrice } = this.props;
        const { insuredCustomerInfo } = this.state;
        const totalPrice = (chosenPackage?.priceByMonth[chosenPackage?.duration?.value] || 0) * insuredCustomerInfo.length;
        const payPrice = promotionPrice?.price ? totalPrice - promotionPrice?.price : totalPrice;
        return (
            <View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.titleInfo}>{chosenPackage?.name} {chosenPackage?.duration?.name}</Text>
                        <Text style={{ fontWeight: 'normal' }}>(Không chịu thuế VAT)</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={[styles.contentInfo, { fontWeight: 'bold' }]}>
                            {formatVND(chosenPackage?.priceByMonth[chosenPackage?.duration?.value], '.')}VNĐ
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={[styles.titleInfo, { fontWeight: 'normal' }]}>Thời hạn bảo hiểm</Text>
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
                    <View style={{ flex: 0.5 }}>
                        <Text style={[styles.titleInfo, { fontWeight: 'normal' }]}>Số người được bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {
                                insuredCustomerInfo.length
                            }
                        </Text>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.6 }}>
                        <Text style={[styles.titleInfo, { fontWeight: 'bold' }]}>Thanh toán</Text>
                    </View>
                    <View style={{ flex: 0.4 }}>
                        <Text style={[styles.contentInfo, { fontWeight: 'bold', color: Color }]}>
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
                <Text style={styles.titleStyle}>Hình thức giao nhận</Text>
                <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5 }}>
                        - Giấy chứng nhận bảo hiểm điện tử gửi tới email của quý khách.
                    </Text>
                    {this.state.receiveType == 'EMS' ? (
                        <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5 }}>
                            - Giấy chứng nhận bảo hiểm sẽ được gửi qua đường chuyển phát nhanh (EMS) đến địa chỉ quý khách đã cung cấp.
                        </Text>
                    ) : null}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <TouchableOpacity
                        onPress={() => this.setState({ isChecked: !this.state.isChecked })}>
                        {
                          this.state.isChecked
                            ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                            : <IconBoxSvg width={20} height={20} color={NewColor} />
                        }
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor, flex: 1 }}>
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
                                onPress={() => Linking.openURL('https://epti-documents.s3.ap-southeast-1.amazonaws.com/Quy+tac+TN-V+(1).pdf')}
                            >
                                Quy tắc bảo hiểm
                            </Text>
                        }
                        " đi kèm sản phẩm này của PTI.
                    </Text>
                </View>
            </View>
        );
    };
    onPay = async () => {
        const { chosenPackage, saveOrderInfomation, saveParamsContract, promotionPrice, insurProductCode, saveLogContract, contractLog, idComSelected, codeSelected } = this.props;
        const {
            insuredCustomerInfo,
            buyerInfomation,
            insurancePrintsAddress,
            receiveType,
        } = this.state;
        const arrCus = [];
        insuredCustomerInfo.map((item, index) => {
            arrCus.push({
                fullName: item.fullName,
                cardId: item.identityNumber,
                birthday: item.birthday,
                phone: item.phone,
                address: item.address,
                relation: 
                    item.relationFamily?.toUpperCase() === 'ANH CHỊ EM RUỘT' ?
                        'ANH/CHỊ/EM' :
                        item.relationFamily?.toUpperCase(),
            });
        });
        const totalPrice = (chosenPackage?.priceByMonth[chosenPackage?.duration?.value] || 0) * insuredCustomerInfo.length;
        const payPrice = promotionPrice?.price ? totalPrice - promotionPrice?.price : totalPrice;
        let url = `${URL}/api/contract/v1/asgd-contracts`;
        let body = {
            packageId: chosenPackage?.id || 0,
            buyer: {
                fullName: buyerInfomation.fullName || '',
                birthday: buyerInfomation.birthday || '',
                gender: buyerInfomation.gender === 'Nam' ? 1 : 2,
                cardId: buyerInfomation.cardId || '',
                phone: buyerInfomation.phone || '',
                email: buyerInfomation.email || '',
                provinceId: buyerInfomation.provinceId || 0,
                districtId: buyerInfomation.districtId || 0,
                address: buyerInfomation.address || '',
            },
            insuredCustomers: arrCus,
            receiveType: "EMAIL",
            isVat: buyerInfomation?.isVat ? 'Y' : 'N',
            effectiveAt: chosenPackage?.startDateString || '',
            companyName: buyerInfomation?.vatCompanyName || '',
            companyTaxCode: buyerInfomation?.vatCompanyTaxCode || '',
            companyEmail: buyerInfomation?.vatCompanyEmail || '',
            companyAddress: buyerInfomation?.vatCompanyAddress || '',
            insurStartTime: chosenPackage?.startDateString || '',
            insurEndTime: chosenPackage?.endDateString || '',
            insurPeriodMonth: chosenPackage?.duration?.value || '',
            promotionCode: promotionPrice?.code || '',
            productCode: 'A8',
            supplierId: idComSelected || '',
            supplierCode: codeSelected || '',
        };
        console.log('bodyVTA', body)
        console.log('urlVTA', url)
        contractLog.key = 'PreviewFaSecure';
        saveLogContract('A8', contractLog);
        saveParamsContract({ body, url });
        const array = {
            orderPrice: payPrice - buyerInfomation.valueCom,
            priceFull: payPrice,
            orderDescription: `Thanh toan bao hiem Vung Tam An`,
            buyer: {
                fullName: buyerInfomation.fullName,
                email: buyerInfomation.email,
                phone: buyerInfomation.phone,
                address: `${buyerInfomation.address?.trim()?.length > 0 ? `${buyerInfomation.address}, ` : ''}${buyerInfomation.districtName ? `${buyerInfomation.districtName}, ` : ''}${buyerInfomation.cityName || ''}`,
            },
        };
        saveOrderInfomation(array);
        Actions.Pay({ insurProductCode: 'A8' });
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
                    <ImageHeaderScroll code={'A8'} offset={this.scrollYAnimatedValue} />
                </Animated.View>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2012
                }}>
                    <TouchableOpacity
                        onPress={() => Actions.BuyerFaSecure()}
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
                    <HeaderScroll code={'A8'} offset={this.scrollYAnimatedValue} />
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
                        [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
                    )}>
                    <View style={{
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        marginTop: -20,
                    }}>
                        <View style={[styles.titleContainer, { marginHorizontal: 24, marginTop: 24 }]}>
                            <IconReviewSvg width={15} height={15} />
                            <Text style={styles.titlePreview}>
                                Xem lại thông tin
                            </Text>
                        </View>
                        <View style={[styles.contentContainer, { marginTop: 18 }]}>
                            <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                <Text style={styles.titleStyle}>Thông tin bên mua bảo hiểm</Text>
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
                        <View style={[styles.contentContainer, { marginTop: 24 }]}>
                            <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                <Text style={styles.titleStyle}>Danh sách người được bảo hiểm</Text>
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
                        <View style={{
                            marginHorizontal: 24,
                            paddingVertical: 16,
                            paddingHorizontal: 12,
                            borderRadius: 10,
                            backgroundColor: colorBackground,
                            marginTop: 24
                        }}>
                            <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                <Text style={styles.titleStyle}>Gói bảo hiểm</Text>
                                <TouchableOpacity onPress={() => Actions.PackageFaSecure()}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            {/* render bảng phí  */}
                            {this.renderFee()}
                        </View>
                        {
                            buyerInfomation?.isVat && (
                                <View style={[styles.contentContainer, { marginTop: 24 }]}>
                                    <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                        <Text style={styles.titleStyle}>Thông tin xuất hóa đơn VAT</Text>
                                        <TouchableOpacity onPress={() => Actions.pop()}>
                                            <IconEditSvg width={16} height={15} />
                                        </TouchableOpacity>
                                    </View>
                                    {/* thông tin địa chỉ nhận ấn chỉ  */}
                                    <View style={styles.tourInfo}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={styles.titleInfo}>Tên doanh nghiệp</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={styles.contentInfo}>{buyerInfomation?.vatCompanyName}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tourInfo}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={styles.titleInfo}>Mã số thuế</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={styles.contentInfo}>{buyerInfomation?.vatCompanyTaxCode}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tourInfo}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={styles.titleInfo}>Email</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={styles.contentInfo}>{buyerInfomation?.vatCompanyEmail}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tourInfo}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={styles.titleInfo}>Địa chỉ</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={styles.contentInfo}>{buyerInfomation?.vatCompanyAddress}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
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
        borderRadius: 10,
        backgroundColor: colorBackground,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTitle,
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
    const listCompany = state.selectCompany.listCompany['A8'];
    const idComSelected = state.selectCompany.idComSelected['A8'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        idComSelected,
        codeSelected: obj?.insurOrg?.code || '',
        chosenPackage: state.VTAContract.chosenPackage,
        buyerInfomation: state.VTAContract.buyerInfomation,
        insurancePrintsAddress: state.VTAContract.insurancePrintsAddress,
        insuredCustomerInfo: state.VTAContract.insuredCustomerInfo,
        promotionPrice: state.promotion.promotionPrice['A8'],
        contractLog: state.logContract.logContract['A8'] || {},
    };
};
const mapDispatchToProps = dispatch => {
    return {
        saveOrderInfomation: (body) => dispatch(saveOrderInfomation(body)),
        saveParamsContract: (body) => dispatch(saveParamsContract(body)),
        saveLogContract: (id, data) => dispatch(saveLogContract(id, data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccidentPreviewInfo);
