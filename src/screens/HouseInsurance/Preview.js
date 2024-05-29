import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Linking,
    Animated,
    ScrollView
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { widthPercentageToDP } from '../../config/ConfigResponsive';
import { Color, URL, NewColor, colorTitle } from '../../config/System';
import { connect } from 'react-redux';
import HouseInfoPreview from './HouseInfoPreview';
import BuyerPreview from './BuyerPreview';
import ReceiverPreview from './ReceiverPreview';
import PackagePreview from './PackagePreview';
import CustomerPreview from './CustomerPreview';
import VATPreview from './VATPreview';
import { saveOrderInfomation } from '../../actions/buy';
import { saveParamsContract } from '../../actions/paramsContractAction';
import DeviceInfo from 'react-native-device-info';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconReviewSvg from '../../config/images/icons/IconReviewSvg';

function Preview({ buyer, infoHouse, receiveType, buyerTypeId, saveOrderInfomation, saveParamsContract, idComSelected, codeSelected }) {
    const offset = useRef(new Animated.Value(0)).current;
    const [acceptFirst, setAcceptFirst] = useState(false);
    const [acceptSecond, setAcceptSecond] = useState(false);
    const [acceptThird, setAcceptThird] = useState(false);

    const handleNext = () => {
        const fee = infoHouse?.info?.check ?
            (infoHouse?.feeHouse + infoHouse?.feeInHouse - infoHouse?.valueCom - infoHouse?.valueComInHouse) :
            (infoHouse?.feeHouse - infoHouse?.valueCom);
        const feeFull = infoHouse?.info?.check ?
            (infoHouse?.feeHouse + infoHouse?.feeInHouse) :
            infoHouse?.feeHouse;
        let body = {
            "purposeUsesHouse": infoHouse?.info?.dataPackHouseType?.code || "",
            "insurObjectTypeId": infoHouse?.info?.dataPackHouseType?.id || "",
            "completeYear": parseInt(infoHouse?.info?.finishYear) || 0,
            "periodUse": "",
            "housePrice": infoHouse?.info?.valueHouse || 0,
            "feeRate": infoHouse?.info?.dataPackHouseType?.feeRate || 0,
            "deductibleValue": infoHouse?.unitHouse || 0,
            "inHousePackageId": infoHouse?.info?.dataInHouseType?.id || 0,
            "inHouseDeductibleValue": infoHouse?.unitInHouse || 0,
            "cityId": infoHouse?.info?.packProvinceId || 0,
            "cityName": infoHouse?.info?.packProvince || "",
            "districtId": infoHouse?.info?.packDistrictId || 0,
            "districtName": infoHouse?.info?.packDistrict || "",
            "address": infoHouse?.info?.packAddress || "",
            "buyer": {
                "type": buyerTypeId || 1,
                "fullName": buyer?.buyerName || "",
                "gender": buyer?.buyerGender === 'Nam' ? 1 : 2,
                "cardId": buyer?.buyerIdentity || "",
                "phone": buyer?.buyerPhone || "",
                "email": buyer?.buyerEmail || "",
                "cityId": buyer?.buyerProvinceId || 0,
                "cityName": buyer?.buyerProvince || "",
                "districtId": buyer?.buyerDistrictId || 0,
                "districtName": buyer?.buyerDistrict || "",
                "address": buyer?.buyerAddress || "",
                "companyTaxCode": buyer?.companyTaxCode || "",
                "companyName": buyer?.companyName || "",
                "companyBuyerName": buyer?.buyerName || "",
                "companyBuyerRole": ""
            },
            "insurancePrintsAddress": {
                "fullName": buyer?.receiverName || "",
                "phone": buyer?.receiverPhone || "",
                "email": buyer?.receiverEmail || "",
                "cityId": buyer?.receiverProvinceId || 0,
                "cityName": buyer?.receiverProvince || "",
                "districtId": buyer?.receiverDistrictId || 0,
                "districtName": buyer?.receiverDistrict || "",
                "address": buyer?.receiverAddress || "",
            },
            "insuredCustomers": [
                {
                    "fullName": buyer?.customerName || "",
                    "cardId": buyer?.customerIdentity || "",
                    "birthday": "",
                    "gender": 0,
                    "phone": buyer?.customerPhone || "",
                    "relation": ""
                }
            ],
            "receiveType": receiveType ? "BOTH" : "EMAIL",
            "isVat": buyer?.isVat ? 1 : 0,
            "vatCompanyName": buyer?.vatCompanyName || "",
            "vatCompanyTaxCode": buyer?.vatCompanyTaxCode || "",
            "vatCompanyAddress": buyer?.vatCompanyAddress || "",
            "vatCompanyEmail": buyer?.vatCompanyEmail || "",
            "insurStartTime": infoHouse?.info?.dateFrom || "",
            "insurEndTime": infoHouse?.dateTo || "",
            "insurPeriodMonth": infoHouse?.duration?.value || 0,
            "supplierId": idComSelected || '',
            "supplierCode": codeSelected || '',
        }
        if (buyer?.buyerBirthday) {
            body.buyer.birthday = buyer?.buyerBirthday;
        }
        console.log('body', body)
        let url = `${URL}/api/contract/v1/house-contracts`
        console.log('url', url)
        saveParamsContract({ body, url })
        const array = {
            orderPrice: fee || 0,
            priceFull: feeFull || 0,
            orderDescription: `Thanh toan bao hiem nha tu nhan`,
            buyer: {
                fullName: buyer.buyerName,
                email: buyer.buyerEmail,
                phone: buyer.buyerPhone,
                address: `${buyer.buyerAddress?.trim()?.length > 0 ? `${buyer.buyerAddress}, ` : ''}${buyer.buyerDistrict ? `${buyer.buyerDistrict}, ` : ''}${buyer.buyerProvince || ''}`,
            },
        };
        saveOrderInfomation(array)
        Actions.Pay({ insurProductCode: 'H1', codeInsur: 'H1' });
    }

    const renderHeight = () => {
        let a = DeviceInfo.getDeviceId()
        if (a.indexOf('iPhone') > -1) {
            let b = a.split('')
            b.splice(0, 6)
            let c = b.join('')
            if (c >= '10,6') {
                return 30
            } else {

                return 15
            }
        } else {

            return 15
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
                <ImageHeaderScroll code={'H1'} offset={offset} />
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
                <HeaderScroll code={'H1'} offset={offset} />
            </View>
            <ScrollView
                style={{ zIndex: 1000 }}
                contentContainerStyle={{
                    paddingTop: HEADER_MAX_HEIGHT,
                }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                )}>
                <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <IconReviewSvg width={15} height={15} />
                        <Text style={styles.titleStyle}>
                            Xem lại thông tin
                        </Text>
                    </View>
                    <View style={styles.boxStyle}>
                        <HouseInfoPreview />
                    </View>
                    <View style={styles.boxStyle}>
                        <CustomerPreview />
                    </View>
                    <View style={styles.boxStyle}>
                        <BuyerPreview />
                    </View>
                    {
                        buyer?.isVat && buyerTypeId === 2 ?
                            <View style={styles.boxStyle}>
                                <VATPreview />
                            </View> : null
                    }
                    {
                        receiveType ?
                            <View style={styles.boxStyle}>
                                <ReceiverPreview />
                            </View> : null
                    }
                    <View style={[styles.boxStyle, { paddingBottom: 15 }]}>
                        <PackagePreview />
                    </View>
                    <View style={[styles.boxStyle, { paddingBottom: 10 }]}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', marginBottom: 10 }}
                            onPress={() => setAcceptFirst(!acceptFirst)}
                        >
                            {
                                acceptFirst
                                    ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                    : <IconBoxSvg width={20} height={20} color={NewColor} />
                            }
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ marginTop: -3 }}>
                                    Tôi đã đọc và hiểu nội dung, điều kiện, điều khoản, quy tắc bảo hiểm đi kèm (
                                    <Text
                                        style={{ color: NewColor }}
                                        onPress={() => Linking.openURL('https://epti-documents.s3-ap-southeast-1.amazonaws.com/Quy+tac+bao+hiem+nha+tu+nhan+Quyet+dinh+199.pdf')}
                                    >
                                        Bảo hiểm nhà tư nhân, Bảo hiểm cháy nổ bắt buộc
                                    </Text>)
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', marginBottom: 10 }}
                            onPress={() => setAcceptSecond(!acceptSecond)}
                        >
                            {
                                acceptSecond
                                    ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                    : <IconBoxSvg width={20} height={20} color={NewColor} />
                            }
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ marginTop: -3 }}>
                                    Đến thời điểm khai báo yêu cầu bảo hiểm này, không có bất kỳ tổn thất nào xảy ra đối với tài sản tham gia bảo hiểm.
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', marginBottom: 0 }}
                            onPress={() => setAcceptThird(!acceptThird)}
                        >
                            {
                                acceptThird
                                    ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                    : <IconBoxSvg width={20} height={20} color={NewColor} />
                            }
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ marginTop: -3 }}>
                                    Bằng việc ấn "Đồng ý" và thanh toán đầy đủ phí bảo hiểm, tôi xác nhận nội dung yêu cầu bảo hiểm của tôi đối với đơn này là tự nguyên, chính xác và chịu hoàn toàn trách nhiệm trước pháp luật.
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <FooterButton >
                        <Button
                            disabled={!acceptFirst || !acceptSecond || !acceptThird}
                            label={'THANH TOÁN'}
                            marginTop={10}
                            marginBottom={10}
                            onPress={() => handleNext()}
                        />
                    </FooterButton>
                </View>
            </ScrollView>
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
        paddingHorizontal: 24,
        paddingTop: 15,
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
        fontWeight: 'bold',
        color: colorTitle,
        marginLeft: 8,
    },
    boxStyle: {
        paddingVertical: 10
    }
});


const mapStateToProps = state => {
    const listCompany = state.selectCompany.listCompany['H1'];
    const idComSelected = state.selectCompany.idComSelected['H1'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        idComSelected,
        codeSelected: obj?.insurOrg?.code,
        infoHouse: state.houseInsurance.infoHouse,
        buyer: state.houseInsurance.buyer?.infoBuyer,
        receiveType: state.houseInsurance.buyer?.receiveType,
        buyerTypeId: state.houseInsurance.buyer?.buyerTypeId,
    }
};

export default connect(mapStateToProps, {
    saveOrderInfomation, saveParamsContract
})(Preview);

