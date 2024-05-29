import React, {useState, useEffect, useRef} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated, Linking,
} from 'react-native';
import moment from 'moment';
import jwt_decode from "jwt-decode";
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import {Color, colorTitle, NewColor, NewColorDisable, URL, TxtColor, nameApp, colorNote} from '../../config/System';
import {connect} from 'react-redux';
import CarInfoPreview from './CarInfoPreview';
import BuyerPreview from './BuyerPreview';
import ReceiverPreview from './ReceiverPreview';
import PackagePreview from './PackagePreview';
import axios from 'axios';
import {saveOrderInfomation} from '../../actions/buy';
import VatPreview from './VatPreview';
import SimpleToast from 'react-native-simple-toast';
import Store from '../../services/Store';
import Const from '../../services/Const';
import {saveParamsContract} from '../../actions/paramsContractAction';
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT} from '../../utils/Util';
import analytics from '@react-native-firebase/analytics';
import { saveLogContract } from '../../actions/logContract';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconReviewSvg from '../../config/images/icons/IconReviewSvg';

function PreviewCar({dataTokenInsur, saveLogContract, contractLog, isVat,buyerInfo,fee,infoCar,receiveType,buyerAddress,saveOrderInfomation,durationCar,state,saveParamsContract, idComSelected, codeSelected }) {
    const offset = useRef(new Animated.Value(0)).current;
    const [isChecked, setIsChecked] = useState(false);
    
    const renderTotal = () => {
        if (durationCar?.check) {
            return durationCar?.feeTNDS?.feeVat + durationCar?.insuranceMoney?.feeVat - (durationCar?.valueCom + durationCar?.valueComC3);
        } else {
            return fee?.feeVat - durationCar?.valueCom;
        }
    }

    const renderTotalFull = () => {
        if (durationCar?.check) {
            return durationCar?.feeTNDS?.feeVat + durationCar?.insuranceMoney?.feeVat;
        } else {
            return fee?.feeVat;
        }
    }

    const handleNext = async () => {
        let body;
        if (codeSelected === 'VNI') {
            body = {
                buyAccident:durationCar?.check ?  "Y" : "N",
                buyerAddress:buyerInfo?.buyerAddress || '',
                buyerBirthday: buyerInfo?.buyerBirthday || '',
                buyerDistrictId: buyerAddress?.dataDistrict?.id || '',
                buyerDistrictName: buyerInfo?.buyerDistrict || '',
                buyerEmail:  buyerInfo?.buyerEmail || '',
                buyerFullName: buyerInfo?.buyerName || '',
                buyerGender:buyerInfo?.buyerGender == 'Nam' ?  "1" : "2",
                buyerIdentityNumber: buyerInfo?.buyerIdentity || '',
                buyerPhone: buyerInfo?.buyerPhone || '',
                buyerProvinceId: buyerAddress?.dataProvince?.id || '',
                buyerProvinceName:buyerInfo?.buyerProvince || '',
                buyerType: buyerAddress?.buyerTypeId || 1,
                buyerTaxCode:buyerAddress?.buyerTypeId == 2 ?  buyerInfo?.companyTaxCode : "",
                buyerCompanyName:buyerAddress?.buyerTypeId == 2 ?  buyerInfo?.companyName : "",
                carBrand: infoCar?.carBrand?.id || "",
                carModel: infoCar?.carModel?.id || "",
                carType: infoCar?.typeCar?.code || "",
                carTonage: infoCar?.loadCapacity ? parseFloat(infoCar?.loadCapacity) : 0,
                chassisNumber: infoCar?.frameNumber || "",
                machineNumber: infoCar?.vehicleNumber || "",
                licenseNumber: infoCar?.licensePlate || "",
                effectiveAt:durationCar?.info?.dateFrom || "",
                expiredAt:durationCar?.info?.dateTo || "",
                regisExpiredAt:infoCar?.registrationExp || "",
                insurancePrintAddress: buyerInfo?.receiverAddress || "",
                insurancePrintDistrictId: buyerAddress?.dataDistrictReceiver?.id || "",
                insurancePrintDistrictName:  buyerInfo?.receiverDistrict || "",
                insurancePrintEmail: buyerInfo?.receiverEmail || "",
                insurancePrintFullName: buyerInfo?.receiverName || "",
                insurancePrintPhone: buyerInfo?.receiverPhone || "",
                insurancePrintProvinceId: buyerAddress?.dataProvinceReceiver?.id || '',
                insurancePrintProvinceName: buyerInfo?.receiverProvince || "",
                insuranceValue: durationCar?.check ? durationCar?.insuranceMoneyTNLXPX : 0,
                insuredValue: durationCar?.check ? durationCar?.insuranceMoneyTNLXPX : 0,
                rateOfChangeAccident: durationCar?.insuranceMoney?.tyle || 0,
                feeVatAccident: durationCar?.insuranceMoney?.feeVat || 0,
                feeNotVatAccident: durationCar?.insuranceMoney?.fee || 0,
                numberInsuredSeat: durationCar?.check ? (infoCar?.typeCar?.value?.toUpperCase()?.includes('TAXI') ? parseInt(durationCar?.seatParent) : 0) : 0,
                licenseStatus: "",
                manufactureYear: parseInt(infoCar?.year),
                numberSeat:  parseInt(infoCar?.seat),
                purpose: infoCar?.purpose_car?.value,
                receiveType:buyerAddress?.receiveType == true ? "BOTH" : "EMAIL",
                ownerFullName: buyerInfo?.buyerName || '',
                ownerAddress: `${buyerInfo?.buyerAddress}, ${buyerInfo?.buyerDistrict}, ${buyerInfo?.buyerProvince}` || '',
                productCode: durationCar?.check ? 'C3' : 'C1',
                supplierId: idComSelected || '',
                supplierCode: codeSelected || '',
                carTypeCode: durationCar?.feeTNDS?.carTypeCode,
                feeNotVAT: durationCar?.feeTNDS?.fee,
                feeVat: durationCar?.feeTNDS?.feeVat,
                insuranceAccidentValue: durationCar?.check ? durationCar?.insuranceMoneyTNLXPX : 0,
                paymentDate: moment().format('DD/MM/YYYY'),
                rateOfChange: durationCar?.feeTNDS?.tyle,
                timeEnd: moment().add(8, 'minutes').format('HH:mm'),
                timeStart: moment().add(5, 'minutes').format('HH:mm'),
                vat: durationCar?.feeTNDS?.vatTyle,
                duration: 12,
                vatAccident: 0
            }
        } else {
            body = {
                buyAccident:durationCar?.check ?  "Y" : "N",
                buyerAddress:buyerInfo?.buyerAddress || '',
                buyerBirthday: buyerInfo?.buyerBirthday || '',
                buyerDistrictId: buyerAddress?.dataDistrict?.id || '',
                buyerDistrictName: buyerInfo?.buyerDistrict || '',
                buyerEmail:  buyerInfo?.buyerEmail || '',
                buyerFullName: buyerInfo?.buyerName || '',
                buyerGender:buyerInfo?.buyerGender == 'Nam' ?  "1" : "2",
                buyerIdentityNumber: buyerInfo?.buyerIdentity || '',
                buyerPhone: buyerInfo?.buyerPhone || '',
                buyerProvinceId: buyerAddress?.dataProvince?.id || '',
                buyerProvinceName:buyerInfo?.buyerProvince || '',
                buyerType: buyerAddress?.buyerTypeId || 1,
                buyerTaxCode:buyerAddress?.buyerTypeId == 2 ?  buyerInfo?.companyTaxCode : "",
                buyerCompanyName:buyerAddress?.buyerTypeId == 2 ?  buyerInfo?.companyName : "",
                carBrand: infoCar?.carBrand?.id || "",
                carModel: infoCar?.carModel?.id || "",
                carType: infoCar?.typeCar?.code || "",
                loadCapacity: infoCar?.loadCapacity ? parseFloat(infoCar?.loadCapacity) : 0,
                chassisNumber: infoCar?.frameNumber || "",
                machineNumber: infoCar?.vehicleNumber || "",
                licenseNumber: infoCar?.licensePlate || "",
                // duration: durationCar?.duration?.value,
                effectiveAt:durationCar?.info?.dateFrom || "",
                expiredAt:durationCar?.info?.dateTo || "",
                regisExpiredAt:infoCar?.registrationExp || "",
                insurancePrintAddress: buyerInfo?.receiverAddress || "",
                insurancePrintDistrictId: buyerAddress?.dataDistrictReceiver?.id || "",
                insurancePrintDistrictName:  buyerInfo?.receiverDistrict || "",
                insurancePrintEmail: buyerInfo?.receiverEmail || "",
                insurancePrintFullName: buyerInfo?.receiverName || "",
                insurancePrintPhone: buyerInfo?.receiverPhone || "",
                insurancePrintProvinceId: buyerAddress?.dataProvinceReceiver?.id || '',
                insurancePrintProvinceName: buyerInfo?.receiverProvince || "",
                // insuredValue: durationCar?.check  ? (durationCar?.feeTNDS?.feeVat * durationCar?.duration?.id) + (durationCar?.insuranceMoney?.feeVat*durationCar?.duration?.id) : (durationCar?.feeTNDS?.feeVat * durationCar?.duration?.id),
                insuredValue: durationCar?.check ? (durationCar?.insuranceMoneyTNLXPX || 10000000) : '',
                numberInsuredSeat: durationCar?.check ? (infoCar?.typeCar?.value?.toUpperCase()?.includes('TAXI') ? parseInt(durationCar?.seatParent) : 0) : 0,
                licenseStatus: "",
                manufactureYear: parseInt(infoCar?.year),
                numberSeat:  parseInt(infoCar?.seat),
                purpose: infoCar?.purpose_car?.value,
                receiveType:buyerAddress?.receiveType == true ? "BOTH" : "EMAIL",
                ownerFullName: buyerInfo?.buyerName || '',
                ownerAddress: `${buyerInfo?.buyerAddress}, ${buyerInfo?.buyerDistrict}, ${buyerInfo?.buyerProvince}` || '',
                productCode: durationCar?.check ? 'C3' : 'C1',
                supplierId: idComSelected || '',
                supplierCode: codeSelected || '',
            }
        }

        contractLog.key = 'PreviewCar';
        saveLogContract('C1', contractLog);
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(dataTokenInsur?.token || token);
            let url;
            if (codeSelected === 'VNI') {
                url = `${URL}/api/contract/v1/car-contracts/create?type=liability`;
            } else if (codeSelected === 'AAA') {
                url = `${URL}/api/contract/v1/car-contracts/aaa/liability`;
            } else {
                url = `${URL}/api/contract/v1/car-contracts/liability`;
            }
            body.organizationId = dataToken?.organizationId || '';
            if (isVat) {
                body.isVat = isVat ? 'Y' : 'N';
                body.companyAddress = buyerInfo?.vatCompanyAddress || '';
                body.companyEmail = buyerInfo?.vatCompanyEmail || '';
                body.companyName = buyerInfo?.vatCompanyName || '';
                body.companyTaxCode = buyerInfo?.vatCompanyTaxCode || '';
            }
            console.log('url',url)
            console.log('body',body)
            saveParamsContract({body,url});
        })
        const array = {
            orderPrice: renderTotal(),
            priceFull: renderTotalFull(),
            orderDescription: `Thanh toan bao hiem trach nhiem dan su oto`,
            buyer: {
                fullName: buyerInfo?.buyerName,
                email: buyerInfo?.buyerEmail,
                phone: buyerInfo?.buyerPhone,
                address: `${buyerInfo?.buyerAddress?.trim()?.length > 0 ? `${buyerInfo?.buyerAddress}, ` : ''}${buyerInfo?.buyerDistrict ? `${buyerInfo?.buyerDistrict}, ` : ''}${buyerInfo?.buyerProvince || ''}`,
            },
        };
        saveOrderInfomation(array)
        Actions.Pay({insurProductCode: durationCar?.check ? 'C3' : 'C1', codeInsur: 'C1'});
    }

    const headerZIndex = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [999, 1001, 1002],
            extrapolate: 'clamp'
        });

    const renderCom = (code) => {
        if (code?.includes('PTI')) {
            return 'PTI';
        } else {
            return code;
        }
    }
    
    const renderLink = (code) => {
        if (code?.includes('PTI')) {
            Linking.openURL('https://epti-documents.s3-ap-southeast-1.amazonaws.com/Thong+tu+04.2021.TT.BTC_ngay+15012021.pdf');
        } else if (codeSelected === 'VNI') {
            Linking.openURL('https://bhhk.com.vn/Data/upload/images/ND%2003.pdf');
        }
    }
    
    return (

        <View style={styles.container}>
            <Animated.View style={{zIndex: headerZIndex}}>
                <ImageHeaderScroll code={'C1'} offset={offset} />
            </Animated.View>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2012
            }}>
                <TouchableOpacity
                    onPress={() => Actions.BuyerCar()}
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
                <HeaderScroll code={'C1'} offset={offset} />
            </View>
            <ScrollView
                style={{ zIndex: 1000 }}
                contentContainerStyle={{
                    paddingTop: HEADER_MAX_HEIGHT,
                    paddingBottom: 20,
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
                        <CarInfoPreview />
                    </View>
                    <View style={styles.boxStyle}>
                        <BuyerPreview />
                    </View>
                    {
                        receiveType == true ? <View style={styles.boxStyle}>
                            <ReceiverPreview />
                        </View> : null
                    }
                    <View style={[styles.boxStyle]}>
                        <PackagePreview />
                    </View>
                    {
                        isVat == true ? <View style={styles.boxStyle}>
                            <VatPreview />
                        </View> : null
                    }
                </View>
                {/* render hình thức giao nhận  */}
                <View style={{marginHorizontal: 24, marginTop: 12}}>
                    <Text style={[styles.titleStyle, {marginLeft: 0}]}>Hình thức giao nhận</Text>
                    <View style={{marginTop: 12}}>
                        <Text style={{fontSize: 14, color: TxtColor, lineHeight: 17.5}}>
                            - Giấy chứng nhận bảo hiểm điện tử gửi tới email của quý khách.
                        </Text>
                        {receiveType ? (
                            <Text style={{fontSize: 14, color: TxtColor, lineHeight: 17.5}}>
                                - Giấy chứng nhận bảo hiểm sẽ được gửi qua đường chuyển phát nhanh (EMS) đến địa chỉ quý khách đã cung cấp.
                            </Text>
                        ) : null}
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                        <TouchableOpacity
                            onPress={() => setIsChecked(!isChecked)}>
                            {
                                isChecked
                                    ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                    : <IconBoxSvg width={20} height={20} color={NewColor} />
                            }
                        </TouchableOpacity>
                        <Text style={{marginLeft: 8, fontSize: 14, color: TxtColor, flex: 1}}>
                            Tôi đã đọc, hiểu và đồng ý với "
                            {
                                <Text
                                    style={{ color: colorNote, textDecorationLine: 'underline' }}
                                    onPress={() => {
                                        codeSelected?.includes('PTI') && Linking.openURL('https://epti.vn/dieu-khoan-su-dung-website');
                                    }}
                                >
                                    Điều khoản sử dụng
                                </Text>
                            }
                            " và "
                            {
                                <Text
                                    style={{ color: colorNote, textDecorationLine: 'underline' }}
                                    onPress={() => renderLink(codeSelected)}
                                >
                                    Quy tắc bảo hiểm
                                </Text>
                            }
                            " đi kèm sản phẩm này của {renderCom(codeSelected)}.
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <FooterButton >
                <Button
                    backgroundColor={isChecked ? NewColor : NewColorDisable}
                    label={'THANH TOÁN'}
                    marginTop={10}
                    marginBottom={10}
                    onPress={() => handleNext()}
                    disabled={!isChecked}
                />
            </FooterButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        fontWeight: 'bold',
        color: colorTitle,
        marginLeft: 8,
    },
    boxStyle:{
        paddingVertical: 12,
    }
});


const mapStateToProps = (state) => {
    const listCompany = state.selectCompany.listCompany['C1'];
    const idComSelected = state.selectCompany.idComSelected['C1'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        codeSelected: obj?.insurOrg?.code,
        buyerInfo:state?.tndsCar?.buyer?.infoBuyer,
        receiveType:state?.tndsCar?.buyer?.receiveType,
        isVat:state?.tndsCar?.buyer?.infoBuyer?.isVat,
        fee:state?.tndsCar?.feeCar,
        buyerAddress: state?.tndsCar?.buyer,
        durationCar:state?.tndsCar?.durationCar,
        infoCar:state?.tndsCar?.infoCar,
        idComSelected,
        promotionPrice: state.promotion.promotionPrice['C1'],
        contractLog: state.logContract.logContract['C1'] || {},
        dataTokenInsur: state.insurance.tokenInsur['C1'],
    };
};

export default connect(mapStateToProps, {
    saveOrderInfomation,saveParamsContract, saveLogContract
})(PreviewCar);

