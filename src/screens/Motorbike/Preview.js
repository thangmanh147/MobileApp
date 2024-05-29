import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Linking,
    Animated,
    ScrollView,
} from 'react-native';
import moment from 'moment';
import jwt_decode from "jwt-decode";
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { Color, URL, NewColor, NewColorDisable, colorTitle, TxtColor, nameApp, colorNote } from '../../config/System';
import { connect } from 'react-redux';
import MotorInfoPreview from './MotorInfoPreview';
import BuyerPreview from './BuyerPreview';
import ReceiverPreview from './ReceiverPreview';
import PackagePreview from './PackagePreview';
import { saveOrderInfomation } from '../../actions/buy';
import { saveParamsContract } from '../../actions/paramsContractAction';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT } from '../../utils/Util';
import VatPreview from './VatPreview';
import { saveLogContract } from '../../actions/logContract';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconReviewSvg from '../../config/images/icons/IconReviewSvg';

function Preview({ saveLogContract, contractLog, idComSelected, buyer, fee, infoMotor, receiveType, buyerAddress, saveOrderInfomation, saveParamsContract, codeSelected, promotionPrice }) {
    const offset = useRef(new Animated.Value(0)).current;
    const [isChecked, setIsChecked] = useState(false);

    const renderTotal = () => {
        let a = fee?.feeVat - promotionPrice?.price || 0
        let b = infoMotor?.insuranceMoney?.price * infoMotor?.duration?.id
        if (infoMotor?.check == true) {
            return a + b - (infoMotor?.valueCom + infoMotor?.valueComM2)
        } else {
            return a - infoMotor?.valueCom
        }
    }

    const renderTotalFull = () => {
        let a = fee?.feeVat - promotionPrice?.price || 0
        let b = infoMotor?.insuranceMoney?.price * infoMotor?.duration?.id
        if (infoMotor?.check == true) {
            return a + b
        } else {
            return a
        }
    }

    const handleNext = async () => {
        let body;
        if (codeSelected === 'VNI') {
            body = {
                "buyAccident": infoMotor?.check ? 'Y' : 'N',
                "expiredAt": infoMotor?.dateTo || '',
                "feeNotVAT": infoMotor?.feeTNDS?.fee || 0,
                "feeNotVatAccident": infoMotor?.check ? infoMotor?.insuranceMoney?.price * infoMotor?.duration?.id : 0,
                "feeVat": infoMotor?.feeTNDS?.feeVat || 0,
                "feeVatAccident": infoMotor?.check ? infoMotor?.insuranceMoney?.price * infoMotor?.duration?.id : 0,
                "insuranceAccidentValue": infoMotor?.check ? 10000000 : 0,
                "insuredValue": infoMotor?.check ? 10000000 : 0,
                "paymentDate": moment().format('DD/MM/YYYY'),
                "rateOfChange": infoMotor?.feeTNDS?.tyle || 0,
                "rateOfChangeAccident": infoMotor?.insuranceMoney?.tyle || 0,
                "vat": infoMotor?.feeTNDS?.vatTyle || 0,
                "vatAccident": infoMotor?.insuranceMoney?.vatTyle || 0,
                "timeEnd": moment().add(8, 'minutes').format('HH:mm'),
                "timeStart": moment().add(5, 'minutes').format('HH:mm'),
                "brandId": 0,
                "buyerAddress": buyer?.buyerAddress || '',
                "buyerBirthday": buyer?.buyerBirthday || '',
                "buyerDistrictId": buyerAddress?.dataDistrict?.id || 0,
                "buyerDistrictName": buyer?.buyerDistrict || '',
                "buyerEmail": buyer?.buyerEmail || '',
                "buyerFullName": buyer?.buyerName || '',
                "buyerGender": buyerAddress?.gender?.id || 0,
                "buyerIdentityNumber": buyer?.buyerIdentity || '',
                "buyerPhone": buyer?.buyerPhone || '',
                "buyerProvinceId": buyerAddress?.dataProvince?.id || 0,
                "buyerProvinceName": buyer?.buyerProvince || '',
                "chassisNumber": infoMotor?.info?.frameNumber || '',
                "duration": infoMotor?.duration?.value || '',
                "effectiveAt": infoMotor?.info?.dateFrom || '',
                "insurancePrintAddress": buyer?.receiverAddress || '',
                "insurancePrintDistrictId": buyerAddress?.dataDistrictReceiver?.id || '',
                "insurancePrintEmail": buyer?.receiverEmail || '',
                "insurancePrintFullName": buyer?.receiverName || '',
                "insurancePrintPhone": buyer?.receiverPhone || '',
                "insurancePrintProvinceId": buyerAddress?.dataProvinceReceiver?.id || '',
                "licenseNumber": infoMotor?.info?.licensePlate || '',
                "licenseStatus": "",
                "machineNumber": infoMotor?.info?.vehicleNumber || '',
                "modelId": 0,
                "motorType": infoMotor?.motorType?.code || '',
                "ownerAddress": `${buyer.buyerAddress?.trim()?.length > 0 ? `${buyer.buyerAddress}, ` : ''}${buyer.buyerDistrict ? `${buyer.buyerDistrict}, ` : ''}${buyer.buyerProvince || ''}` || '',
                "ownerFullName": buyer?.buyerName || '',
                "packageId": infoMotor?.check ? 119 : '',
                "productCode": infoMotor?.check ? 'M2' : 'M1',
                "receiveType": receiveType == true ? "BOTH" : "EMAIL",
                "supplierCode": codeSelected || '',
                "supplierId": idComSelected || '',
                "numberSeat": 2,
                "range": infoMotor?.check ? 'MVA' : 'MVH',
                "value":  infoMotor?.check ? 10000000 : 0,
                "promotionCode": promotionPrice?.code || '',
                "promotionValue": promotionPrice?.price || '0'
            }
        } else {
            body = {
                "buyerPhone": buyer?.buyerPhone || '',
                "buyerFullName": buyer?.buyerName || '',
                "buyerEmail": buyer?.buyerEmail || '',
                "buyerProvinceId": buyerAddress?.dataProvince?.id || 0,
                "buyerDistrictId": buyerAddress?.dataDistrict?.id || 0,
                "buyerAddress": buyer?.buyerAddress || '',
                "buyerIdentityNumber": buyer?.buyerIdentity || '',
                "ownerFullName": buyer?.buyerName,
                "ownerAddress": `${buyer.buyerAddress?.trim()?.length > 0 ? `${buyer.buyerAddress}, ` : ''}${buyer.buyerDistrict ? `${buyer.buyerDistrict}, ` : ''}${buyer.buyerProvince || ''}` || '',
                "motorType": infoMotor?.motorType?.code || '',
                "buyerGender": buyerAddress?.gender?.id || 0,
                "buyerBirthday": buyer?.buyerBirthday || '',
                "brandId": 0,
                "modelId": 0,
                "licenseStatus": '',
                "licenseNumber": infoMotor?.info?.licensePlate || '',
                "chassisNumber": infoMotor?.info?.frameNumber || '',
                "machineNumber": infoMotor?.info?.vehicleNumber || '',
                "effectiveAt": infoMotor?.info?.dateFrom || '',
                "duration": infoMotor?.duration?.value || '',
                "packageId": infoMotor?.check == true ? infoMotor?.insuranceMoney?.id : '',
                "receiveType": receiveType == true ? "BOTH" : "EMAIL",
                "insurancePrintFullName": buyer?.receiverName || '',
                "insurancePrintEmail": buyer?.receiverEmail || '',
                "insurancePrintPhone": buyer?.receiverPhone || '',
                "insurancePrintProvinceId": buyerAddress?.dataProvinceReceiver?.id || '',
                "insurancePrintDistrictId": buyerAddress?.dataDistrictReceiver?.id || '',
                "insurancePrintAddress": buyer?.receiverAddress || '',
                "productCode": infoMotor?.check ? 'M2' : 'M1',
                "supplierId": idComSelected || '',
                "supplierCode": codeSelected || '',
                "promotionCode": promotionPrice?.code || '',
                "promotionValue": promotionPrice?.price || '0'
            }
        }

        if (buyer?.isVat) {
            body.isVat = 'Y';
            body.buyerTaxCode = buyer?.vatCompanyTaxCode || '';
            body.buyerCompanyName = buyer?.vatCompanyName || '';
            body.companyAddress = buyer?.vatCompanyAddress || '';
            body.companyEmail = buyer?.vatCompanyEmail || '';
            body.companyName = buyer?.vatCompanyName || '';
            body.companyTaxCode = buyer?.vatCompanyTaxCode || '';
        }
        console.log('body', body)
        contractLog.key = 'Preview';
        saveLogContract('M1', contractLog);
        let url;
        if (codeSelected === 'VNI') {
            url = `${URL}/api/contract/v1/vni/motor-contract/create`;
        } else if (codeSelected === 'AAA') {
            url = `${URL}/api/contract/v1/aaa/motorbike-contracts/create`
        } else {
            url = `${URL}/api/contract/v1/motorbike-contracts`
        }
        console.log('url', url)
        const objLog = {...body};
        onLogging(objLog, url, `${nameApp}_PAY_TNDS_XE_MAY`);
        saveParamsContract({ body, url })
        const array = {
            orderPrice: renderTotal(),
            priceFull: renderTotalFull(),
            promotionId: promotionPrice?.id,
            orderDescription: `Thanh toan bao hiem trach nhiem dan su xe may`,
            buyer: {
                fullName: buyer.buyerName,
                email: buyer.buyerEmail,
                phone: buyer.buyerPhone,
                address: `${buyer.buyerAddress?.trim()?.length > 0 ? `${buyer.buyerAddress}, ` : ''}${buyer.buyerDistrict ? `${buyer.buyerDistrict}, ` : ''}${buyer.buyerProvince || ''}`,
            },
        };
        saveOrderInfomation(array)
        Actions.Pay({ insurProductCode: infoMotor?.check ? 'M2' : 'M1', codeInsur: 'M1' });
    }

    const onLogging = (objLog, url, nameLog) => {
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(token);
            objLog.userInfo = {
                userName: dataToken?.preferred_username || '',
                userId: dataToken?.userId || '',
                organizationId: dataToken?.organizationId || '',
            };
            let _body = {
                "serviceName": nameLog,
                "extraData": objLog,
                "headers": { "Content-Type": "application/json" },
                "method": "POST",
                "params": {},
                "response": {},
                "statusCode": 200,
                "time": moment().format(),
                "url": url
            }
            console.log('BODY-LOG: :', objLog)
            let _url = `https://logging.capdon.vn/v1/logging/InsoAPI`
            fetch(_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(_body),
            })
                .then((res) => res.json())
                .then(async (res) => {
                    console.log('======res', res)
                    if (res.status == 200 || res.status == 'success') {
                    } else {
                    }
                })
                .catch(async (error) => {
                    console.log(error)
                })
        });
    }

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
    
    const headerZIndex = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [999, 1001, 1002],
            extrapolate: 'clamp'
        });

    return (
        <View style={styles.container}>
            <Animated.View style={{zIndex: headerZIndex}}>
                <ImageHeaderScroll code={'M1'} offset={offset} />
            </Animated.View>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2012
            }}>
                <TouchableOpacity
                    onPress={() => Actions.Buyer()}
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
                <HeaderScroll code={'M1'} offset={offset} />
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
                        <MotorInfoPreview />
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
                        <PackagePreview promotionPrice={promotionPrice} />
                    </View>
                    {
                        buyer?.isVat ? <View style={styles.boxStyle}>
                            <VatPreview />
                        </View> : null
                    }

                    {/* render hình thức giao nhận  */}
                    <View style={{ marginBottom: 14, marginTop: 12 }}>
                        <Text style={[styles.titleStyle, { marginLeft: 0 }]}>Hình thức giao nhận</Text>
                        <View style={{ marginTop: 12 }}>
                            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5 }}>
                                - Giấy chứng nhận bảo hiểm điện tử gửi tới email của quý khách.
                            </Text>
                            {receiveType ? (
                                <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5 }}>
                                    - Giấy chứng nhận bảo hiểm sẽ được gửi qua đường chuyển phát nhanh (EMS) đến địa chỉ quý khách đã cung cấp.
                                </Text>
                            ) : null}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                            <TouchableOpacity
                                onPress={() => setIsChecked(!isChecked)}>
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
        paddingHorizontal: 24,
        paddingTop: 24
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
        paddingVertical: 12
    }
});


const mapStateToProps = state => {
    const listCompany = state.selectCompany.listCompany['M1'];
    const idComSelected = state.selectCompany.idComSelected['M1'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        codeSelected: obj?.insurOrg?.code,
        buyer: state?.motor?.buyer?.infoBuyer,
        receiveType: state?.motor?.buyer?.receiveType,
        fee: state?.motor?.fee,
        infoMotor: state?.motor?.infoMotor,
        buyerAddress: state?.motor?.buyer,
        idComSelected,
        contractLog: state.logContract.logContract['M1'] || {},
        promotionPrice: state.promotion.promotionPrice['M1'],
    };
};

export default connect(mapStateToProps, {
    saveOrderInfomation, saveParamsContract, saveLogContract
})(Preview);

