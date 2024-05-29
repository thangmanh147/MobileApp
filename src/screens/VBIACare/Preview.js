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
import { Color, URL, NewColor, NewColorDisable, colorTitle, TxtColor, colorNote, textDisable } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { formatVND } from '../../components/Functions';
import Store from '../../services/Store';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import PreviewItemCustomer from './PreviewItemCustomer';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconEditSvg from '../../config/images/icons/IconEditSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconDownSvg from '../../config/images/icons/IconDownSvg';
import IconUpSvg from '../../config/images/icons/IconUpSvg';
import IconReviewSvg from '../../config/images/icons/IconReviewSvg';
import IconDownItemSvg from '../../config/images/icons/IconDownItemSvg';
import IconUpItemSvg from '../../config/images/icons/IconUpItemSvg';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
        };
    }

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
                            <Text style={styles.contentInfo}>{item?.companyName}</Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={styles.titleInfo}>Mã số thuế</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{item?.companyTaxCode}</Text>
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

    renderTotal = () => {
        const {
            packageInfo,
        } = this.props;
        const totalFeeBase = packageInfo?.arrFeeBase.map(item => item?.fee)?.reduce((a, b) => a + b, 0);
        const totalFeeA53 = packageInfo?.arrFeeA53.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0);
        const totalFeeB3 = packageInfo?.arrFeeB3.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0);
        const totalFeeC = packageInfo?.arrFeeC.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0);
        const totalFeeD = packageInfo?.arrFeeD.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0);
        return totalFeeBase + totalFeeA53 + totalFeeB3 + totalFeeC + totalFeeD;
    };

    // render bảng phí
    renderFee = () => {
        const { packageInfo, customerInfo } = this.props;
        return (
            <View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Gói bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {packageInfo?.packageCus?.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={{ color: TxtColor, fontSize: 14 }}>- Phí cơ bản</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {formatVND(packageInfo?.arrFeeBase.map(item => item?.fee)?.reduce((a, b) => a + b, 0))}VNĐ
                        </Text>
                    </View>
                </View>
                {
                    packageInfo?.arrFeeA53.find(item => item?.status === 'active') ? (
                        <View style={styles.tourInfo}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ color: TxtColor, fontSize: 14 }}>- Trợ cấp nằm viện điều trị tai nạn</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.contentInfo}>
                                    {formatVND(packageInfo?.arrFeeA53.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0))}VNĐ
                                </Text>
                            </View>
                        </View>
                    ) : null
                }
                {
                    packageInfo?.arrFeeB3.find(item => item?.status === 'active') ? (
                        <View style={styles.tourInfo}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ color: TxtColor, fontSize: 14 }}>- Điều trị ngoại trú</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.contentInfo}>
                                    {formatVND(packageInfo?.arrFeeB3.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0))}VNĐ
                                </Text>
                            </View>
                        </View>
                    ) : null
                }
                {
                    packageInfo?.arrFeeC.find(item => item?.status === 'active') ? (
                        <View style={styles.tourInfo}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ color: TxtColor, fontSize: 14 }}>- Chăm sóc thai sản (không bao gồm chi phí khám thai định kỳ)</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.contentInfo}>
                                    {formatVND(packageInfo?.arrFeeC.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0))}VNĐ
                                </Text>
                            </View>
                        </View>
                    ) : null
                }
                {
                    packageInfo?.arrFeeD.find(item => item?.status === 'active') ? (
                        <View style={styles.tourInfo}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ color: TxtColor, fontSize: 14 }}>- Chăm sóc và điều trị răng</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.contentInfo}>
                                    {formatVND(packageInfo?.arrFeeD.filter(item => item?.status === 'active').map(item => item?.fee)?.reduce((a, b) => a + b, 0))}VNĐ
                                </Text>
                            </View>
                        </View>
                    ) : null
                }
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Thời hạn bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            Từ {packageInfo?.dateFrom}
                        </Text>
                        <Text style={styles.contentInfo}>
                            đến {packageInfo?.dateTo}
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Số người được bảo hiểm</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {customerInfo?.length}
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
                            {formatVND(this.renderTotal())}VNĐ
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    renderListCus = () => {
        const { customerInfo } = this.props;
        return customerInfo && customerInfo.map((item, index) => (
            <PreviewItemCustomer item={item} index={index} isLast={index === customerInfo.length - 1} />
        ));
    }

    onPay = () => {
        const { saveOrderInfomation, saveParamsContract, idComSelected, codeSelected } = this.props;
        const {
            packageInfo,
            customerInfo,
            buyerInfomation,
        } = this.props;
        const arrCus = [];
        customerInfo && customerInfo.map((item) => {
            let extention = '';
            if (packageInfo?.arrFeeA53.filter(item => item?.status === 'active').find(i => i?.fullName === item?.fullName)) {
                extention = 'A53';
            }
            if (packageInfo?.arrFeeB3.filter(item => item?.status === 'active').find(i => i?.fullName === item?.fullName)) {
                extention = extention + ',B3';
            }
            if (packageInfo?.arrFeeC.filter(item => item?.status === 'active').find(i => i?.fullName === item?.fullName)) {
                extention = extention + ',C';
            }
            if (packageInfo?.arrFeeD.filter(item => item?.status === 'active').find(i => i?.fullName === item?.fullName)) {
                extention = extention + ',D';
            }
            arrCus.push({
                "insureCode": packageInfo?.packageCus?.code || '',
                "fullName": item?.fullName || '',
                "address": `${item?.address}, ${item?.district}, ${item?.province}`,
                "birthday": moment(item?.birthday, 'DD/MM/YYYY').format('YYYYMMDD'),
                "gender": item?.gender === 'Nam' ? "NAM" : "NU",
                "identityNumber": item?.identity || '',
                "effectiveAt": moment(packageInfo?.dateFrom, 'DD/MM/YYYY').format('YYYYMMDD'),
                "expiredAt": moment(packageInfo?.dateTo, 'DD/MM/YYYY').format('YYYYMMDD'),
                "phone": item?.phone || '',
                "email": item?.email || '',
                "relation": item?.dataRelation?.code || '',
                "extention": extention,
            });
        });
        let url = `${URL}/api/contract/v1/vbi/acare`;
        let body = {
            "insureType": "CN.20",
            "buyerFullName": buyerInfomation?.type === 2 ? buyerInfomation?.companyName : buyerInfomation?.fullName,
            "buyerAddress": `${buyerInfomation?.address}, ${buyerInfomation?.districtName}, ${buyerInfomation?.cityName}`,
            "buyerBirthday": buyerInfomation?.birthday ?
                moment(buyerInfomation?.birthday, 'DD/MM/YYYY').format('YYYYMMDD') :
                arrCus[0]?.birthday,
            "buyerGender": buyerInfomation?.gender ?
                (buyerInfomation?.gender === 'Nam' ? "NAM" : "NU") :
                arrCus[0]?.gender,
            "buyerIdentityNumber": buyerInfomation?.cardId || arrCus[0]?.identityNumber,
            "buyerPhone": buyerInfomation?.phone || '',
            "buyerEmail": buyerInfomation?.email || '',
            "companyTaxCode": buyerInfomation?.type == 2 ?  buyerInfomation?.companyTaxCode : "",
            "companyBuyerName":buyerInfomation?.type == 2 ?  buyerInfomation?.companyName : "",
            "companyName":buyerInfomation?.type == 2 ?  buyerInfomation?.companyName : "",
            "isVat": buyerInfomation.isVat ? 1 : 0,
            "insuredCustomers": arrCus,
            "fee": this.renderTotal(),
            "productCode": 'HC10',
            "supplierId": idComSelected || '',
            "supplierCode": codeSelected || '',
        };
        console.log('body', body)
        console.log('url', url)
        saveParamsContract({ body, url });
        const array = {
            orderPrice: this.renderTotal() - (packageInfo?.valueCom || 0),
            priceFull: this.renderTotal(),
            orderDescription: `Thanh toan bao hiem ACare`,
            buyer: {
                fullName: buyerInfomation?.fullName,
                email: buyerInfomation?.email,
                phone: buyerInfomation?.phone,
                address: `${buyerInfomation?.address?.trim()?.length > 0 ? `${buyerInfomation?.address}, ` : ''}${buyerInfomation?.districtName ? `${buyerInfomation?.districtName}, ` : ''}${buyerInfomation?.cityName || ''}`,
            },
        };
        saveOrderInfomation(array);

        Actions.Pay({ insurProductCode: 'HC10', codeInsur: 'HC10' });
    };
    render() {
        const headerZIndex = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [999, 1001, 1002],
                extrapolate: 'clamp'
            });
        const { buyerInfomation, customerInfo } = this.props;
        return (
            <View style={styles.container}>
                <Animated.View style={{ zIndex: headerZIndex }}>
                    <ImageHeaderScroll code={'HC10'} offset={this.scrollYAnimatedValue} />
                </Animated.View>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2012
                }}>
                    <TouchableOpacity
                        onPress={() => Actions.ACarePackage()}
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
                    <HeaderScroll code={'A2'} offset={this.scrollYAnimatedValue} title={'BẢO HIỂM ACARE'} />
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
                        <View style={[styles.titleContainer, { marginHorizontal: 24, marginTop: 24 }]}>
                            <IconReviewSvg width={15} height={15} />
                            <Text style={styles.titlePreview}>
                                Xem lại thông tin
                            </Text>
                        </View>
                        <View style={[styles.contentContainer, { marginTop: 24 }]}>
                            <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                <Text style={styles.titleStyle}>Thông tin bên mua bảo hiểm</Text>
                                <TouchableOpacity onPress={() => Actions.ACareBuyer()}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            {/* thông tin người mua  */}
                            <FlatList
                                data={[buyerInfomation]}
                                renderItem={this.renderBuyerInfomation}
                                keyExtractor={index => index?.toString()}
                            />
                        </View>
                        <View style={[styles.contentContainer, { marginTop: 24 }]}>
                            <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                <Text style={styles.titleStyle}>Danh sách người được bảo hiểm</Text>
                                <TouchableOpacity onPress={() => Actions.ACareListCustomer()}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            {/* danh sách người được bảo hiểm  */}
                            {this.renderListCus()}
                        </View>
                        {
                            buyerInfomation?.type === 2 && buyerInfomation?.isVat ? (
                                <View style={[styles.contentContainer, { marginTop: 24 }]}>
                                    <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                        <Text style={styles.titleStyle}>Thông tin xuất hóa đơn VAT</Text>
                                        <TouchableOpacity onPress={() => Actions.ACareBuyer()}>
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
                                <Text style={styles.titleStyle}>Gói bảo hiểm</Text>
                                <TouchableOpacity onPress={() => Actions.ACarePackage()}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            {/* render bảng phí  */}
                            {this.renderFee()}
                        </View>
                    </View>
                </ScrollView>
                <FooterButton>
                    <Button
                        color={NewColor}
                        label={'THANH TOÁN'}
                        onPress={this.onPay}
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
        color: TxtColor,
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
    const listCompany = state.selectCompany.listCompany['HC10'];
    const idComSelected = state.selectCompany.idComSelected['HC10'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        idComSelected,
        codeSelected: obj?.insurOrg?.code,
        buyerInfomation: state.acare.buyerInfomation,
        customerInfo: state.acare.customerInfo,
        packageInfo: state.acare.packageInfo,
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
