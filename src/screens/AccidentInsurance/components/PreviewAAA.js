import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    ScrollView,
} from 'react-native';
import { saveOrderInfomation } from '../../../actions/buy';
import { saveParamsContract } from '../../../actions/paramsContractAction';
import {
    widthPercentageToDP,
} from '../../../config/ConfigResponsive';
import Button from '../../../components/buy/Button';
import FooterButton from '../../../components/FooterButton';
import FastImage from 'react-native-fast-image';
import { Color, URL, NewColor, NewColorDisable, colorTitle, TxtColor, colorNote } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { formatVND } from '../../../components/Functions';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../../utils/Util';
import HeaderScroll from '../../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../../components/header/ImageHeaderScroll';
import IconEditSvg from '../../../config/images/icons/IconEditSvg';
import IconCheckedBoxSvg from '../../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../../config/images/icons/IconBoxSvg';
import IconReviewSvg from '../../../config/images/icons/IconReviewSvg';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            isChecked: false,
        };
    }

    renderBuyer = () => {
        const { buyerAAA } = this.props;
        return (
            <View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Họ và tên</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{buyerAAA?.buyerName}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Giới tính</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{buyerAAA?.buyerGender}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Ngày sinh</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{buyerAAA?.buyerBirthday}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>CMND/CCCD/Hộ chiếu</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{buyerAAA?.buyerIdentity}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Số điện thoại</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{buyerAAA?.buyerPhone}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Email</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{buyerAAA?.buyerEmail}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Địa chỉ</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {buyerAAA?.buyerAddress}, {buyerAAA?.buyerDistrict}, {buyerAAA?.buyerProvince}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    renderCustomerInfo = () => {
        const { customerAAA } = this.props;
        return (
            <View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Họ và tên</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{customerAAA?.info?.customerName}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Giới tính</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{customerAAA?.info?.customerGender}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Ngày sinh</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{customerAAA?.info?.customerBirthday}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>CMND/CCCD/Hộ chiếu</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{customerAAA?.info?.customerIdentity}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Số điện thoại</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{customerAAA?.info?.customerPhone}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Email</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{customerAAA?.info?.customerEmail}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Địa chỉ</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {customerAAA?.info?.customerAddress}, {customerAAA?.info?.customerDistrict}, {customerAAA?.info?.customerProvince}
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Ngành nghề</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {
                                customerAAA?.info?.customerCareerId === '0016' ? customerAAA?.info?.customerCareerDesc : customerAAA?.info?.customerCareer
                            }
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    renderRequestInfo = () => {
        const { customerAAA } = this.props;
        return (
            <View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Họ và tên</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{customerAAA?.info?.requestName}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Ngày sinh</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{customerAAA?.info?.requestBirthday}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>CMND/CCCD/Hộ chiếu</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{customerAAA?.info?.requestIdentity}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Số điện thoại</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{customerAAA?.info?.requestPhone}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Email</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>{customerAAA?.info?.requestEmail}</Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Địa chỉ</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {customerAAA?.info?.requestAddress}, {customerAAA?.info?.requestDistrict}, {customerAAA?.info?.requestProvince}
                        </Text>
                    </View>
                </View>
                <View style={styles.tourInfo}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.titleInfo}>Mối quan hệ</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentInfo}>
                            {
                                customerAAA?.info?.requestRelation
                            }
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    renderFee = () => {
        const { chosenPackage } = this.props;
        const totalPrice = chosenPackage?.price || 0;
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
                            1
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
                            {formatVND(totalPrice, '.')}VNĐ
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    renderType = () => {
        return (
            <View style={{ marginHorizontal: 24, marginTop: 24 }}>
                <View style={{ flexDirection: 'row', paddingRight: 24 }}>
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
                            >
                                Điều khoản sử dụng
                            </Text>
                        }
                        " và "
                        {
                            <Text
                                style={{ color: colorNote, textDecorationLine: 'underline' }}
                            >
                                Quy tắc bảo hiểm
                            </Text>
                        }
                        " đi kèm sản phẩm này của AAA
                    </Text>
                </View>
            </View>
        );
    };
    onPay = () => {
        const {
            chosenPackage,
            saveOrderInfomation,
            saveParamsContract,
            idComSelected,
            codeSelected,
            buyerAAA,
            customerAAA,
        } = this.props;
        const totalPrice = chosenPackage?.price || 0;
        let _url = `${URL}/api/contract/v1/aaa/individual-accident-contracts`;
        let _body = {
            "buyer": {
                "address": buyerAAA?.buyerAddress || '',
                "birthday": buyerAAA?.buyerBirthday || '',
                "companyName": '',
                "districtId": buyerAAA?.districtId || 0,
                "email": buyerAAA?.buyerEmail || '',
                "fullName": buyerAAA?.buyerName || '',
                "gender": buyerAAA?.buyerGender === 'Nam' ? 1 : 2,
                "identityNumber": buyerAAA?.buyerIdentity || '',
                "phone": buyerAAA?.buyerPhone || '',
                "provinceId": buyerAAA?.provinceId || 0,
                "taxCode": '',
                "type": 1
            },
            "duration": 12,
            "effectiveAt": chosenPackage?.startDateString || '',
            "insurancePrintAddress": "",
            "insurancePrintCityId": 0,
            "insurancePrintDistrictId": 0,
            "insurancePrintEmail": "",
            "insurancePrintFullName": "",
            "insurancePrintPhone": "",
            "requestInsuranceCustomer": {
                "isInsuredPerson": !customerAAA?.info?.isNotSame,
                "birthday": customerAAA?.info?.isNotSame ? customerAAA?.info?.requestBirthday : '',
                "fullName": customerAAA?.info?.isNotSame ? customerAAA?.info?.requestName : '',
                "identityNumber": customerAAA?.info?.isNotSame ? customerAAA?.info?.requestIdentity : '',
                "phone": customerAAA?.info?.isNotSame ? customerAAA?.info?.requestPhone : '',
                "email": customerAAA?.info?.isNotSame ? customerAAA?.info?.requestEmail : '',
                "gender": customerAAA?.info?.isNotSame ? (customerAAA?.info?.requestGender === 'Nam' ? 1 : 2) : '',
                "address": customerAAA?.info?.isNotSame ? customerAAA?.info?.requestAddress : '',
                "districtId": customerAAA?.info?.isNotSame ? customerAAA?.info?.requestDistrictId : '',
                "districtName": customerAAA?.info?.isNotSame ? customerAAA?.info?.requestDistrict : '',
                "provinceId": customerAAA?.info?.isNotSame ? customerAAA?.info?.requestProvinceId : '',
                "provinceName": customerAAA?.info?.isNotSame ? customerAAA?.info?.requestProvince : '',
                "relationCode": customerAAA?.info?.isNotSame ? customerAAA?.info?.requestRelationId : '',
                "relationDesc": customerAAA?.info?.isNotSame ? customerAAA?.info?.requestRelation : ''
            },
            "insuredCustomer":{
                "birthday": customerAAA?.info?.customerBirthday || '',
                "fullName": customerAAA?.info?.customerName || '',
                "identityNumber": customerAAA?.info?.customerIdentity || '',
                "phone": customerAAA?.info?.customerPhone || '',
                "email": customerAAA?.info?.customerEmail || '',
                "gender": customerAAA?.info?.customerGender === 'Nam' ? 1 : 2,
                "address": customerAAA?.info?.customerAddress || '',
                "districtId": customerAAA?.info?.districtId || 0,
                "districtName": customerAAA?.info?.customerDistrict || '',
                "provinceId": customerAAA?.info?.provinceId || 0,
                "provinceName": customerAAA?.info?.customerProvince || '',
                "careerCode": customerAAA?.info?.customerCareerId || '',
                "careerDesc": customerAAA?.info?.customerCareerId === '0016' ? customerAAA?.info?.customerCareerDesc : customerAAA?.info?.customerCareer
            },
            "packageId": chosenPackage?.id || 0,
            "productCode": "A1",
            "receiveType": "EMAIL",
            "supplierCode": codeSelected,
            "supplierId": idComSelected,
        };
        console.log('body', _body)
        console.log('url', _url)
        saveParamsContract({ body: _body, url: _url });
        const _array = {
            orderPrice: totalPrice - customerAAA?.valueCom,
            priceFull: totalPrice,
            orderDescription: `Thanh toan bao hiem tai nan AAA`,
            buyer: {
                fullName: buyerAAA.buyerName,
                email: buyerAAA.buyerEmail,
                phone: buyerAAA.phone,
                address: `${buyerAAA.buyerAddress?.trim()?.length > 0 ? `${buyerAAA.buyerAddress}, ` : ''}${buyerAAA.buyerDistrict ? `${buyerAAA.buyerDistrict}, ` : ''}${buyerAAA.buyerProvince || ''}`,
            },
        };
        saveOrderInfomation(_array);
        Actions.Pay({ insurProductCode: 'A1', codeInsur: 'A1' });
    };
    render() {
        const headerZIndex = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [999, 1001, 1002],
                extrapolate: 'clamp'
            });
        const {customerAAA} = this.props;
        return (
            <View style={styles.container}>
                <Animated.View style={{ zIndex: headerZIndex }}>
                    <ImageHeaderScroll code={'A1'} offset={this.scrollYAnimatedValue} />
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
                            source={require('../../../icons/ic_back.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ zIndex: 2011 }}>
                    <HeaderScroll code={'A1'} offset={this.scrollYAnimatedValue} />
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
                        <View style={[styles.contentContainer, { marginTop: 20 }]}>
                            <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                <Text style={styles.titleStyle}>Thông tin bên mua bảo hiểm:</Text>
                                <TouchableOpacity onPress={() => Actions.BuyerAAA()}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            {this.renderBuyer()}
                        </View>
                        <View style={[styles.contentContainer, { marginTop: 24 }]}>
                            <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                <Text style={styles.titleStyle}>Thông tin người được bảo hiểm:</Text>
                                <TouchableOpacity onPress={() => Actions.pop()}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            {this.renderCustomerInfo()}
                        </View>
                        {
                            customerAAA?.info?.isNotSame ? (
                                <View style={[styles.contentContainer, { marginTop: 24 }]}>
                                    <View style={[styles.titleContainer, { justifyContent: 'space-between' }]}>
                                        <Text style={styles.titleStyle}>Người yêu cầu bảo hiểm:</Text>
                                        <TouchableOpacity onPress={() => Actions.pop()}>
                                            <IconEditSvg width={16} height={15} />
                                        </TouchableOpacity>
                                    </View>
                                    {this.renderRequestInfo()}
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
                            {this.renderFee()}
                        </View>
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
    const listCompany = state.selectCompany.listCompany['A1'];
    const idComSelected = state.selectCompany.idComSelected['A1'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        idComSelected,
        codeSelected: obj?.insurOrg?.code || '',
        chosenPackage: state.accidentBuy.chosenPackage,
        dataTokenInsur: state.insurance.tokenInsur['A1'],
        buyerAAA: state.accidentBuy.buyerAAA,
        customerAAA: state.accidentBuy.customerAAA,
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
