import React, { useState, useEffect, useRef } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Linking,
    Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, URL, NewColor, colorTitle, colorNote, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import Input from './components/Input';
import { validationPackage } from './components/Validate';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import InputSelect from './components/InputSelect';
import TotalFee from './TotalFee';
import MotorInfoPreview from './MotorInfoPreview';
import BuyerPreview from './BuyerPreview';
import ReceiverPreview from './ReceiverPreview';
import PackagePreview from './PackagePreview';
import CustomerPreview from './CustomerPreview';
import axios from 'axios';
import { saveOrderInfomation } from '../../actions/buy';
import { saveParamsContract } from '../../actions/paramsContractAction';
import DeviceInfo from 'react-native-device-info';
import Store from '../../services/Store';
import Const from '../../services/Const';
import BaseModal from '../../components/BaseModal';
import SimpleToast from 'react-native-simple-toast';
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX} from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconReviewSvg from '../../config/images/icons/IconReviewSvg';

function Preview({ buyer, infoMotor, receiveType, buyerAddress, saveOrderInfomation, saveParamsContract, idComSelected, codeSelected }) {
    const offset = useRef(new Animated.Value(0)).current;
    const [openModal, setOpenModal] = useState(false);
    const [receiveTypeLast, setreceiveTypeLast] = useState(false);

    const gotoLogin = () => {
        setOpenModal(false)
        new Store().storeSession(Const.TOKEN, null)
        new Store().storeSession(Const.IS_LOGIN, null)

        Actions.LoginNew()
    }

    const handleChangeReceiveTypeLast = () => {
        if (receiveTypeLast) {
            setreceiveTypeLast(false)
        } else {
            setreceiveTypeLast(true)
        }
    }

    const handleNext = () => {
        const arr = [
            { code: '01', status: infoMotor?.info?.dataFee?.fee01Status },
            { code: '02', status: infoMotor?.info?.dataFee?.fee02Status },
            { code: '03', status: infoMotor?.info?.dataFee?.fee03Status },
        ];
        const _arr = arr.filter(item => item.status === 'active').map(item => item.code);
        let body = {
            "brandId": infoMotor?.info?.motorBrandId || 0,
            "buyerAddress": buyer?.buyerAddress || '',
            "buyerBirthday": buyer?.buyerBirthday || '',
            "buyerDistrictId": buyerAddress?.dataDistrict?.id || 0,
            "buyerEmail": buyer?.buyerEmail || '',
            "buyerFullName": buyer?.buyerName || '',
            "buyerGender": buyerAddress?.gender?.id || 0,
            "buyerIdentityNumber": buyer?.buyerIdentity || '',
            "buyerPhone": buyer?.buyerPhone || '',
            "buyerProvinceId": buyerAddress?.dataProvince?.id || 0,
            "chassisNumber": infoMotor?.info?.frameNumber || '',
            "duration": infoMotor?.duration?.value || '',
            "effectiveAt": infoMotor?.info?.dateFrom || '',
            "insurancePrintAddress": buyer?.receiverAddress || '',
            "insurancePrintDistrictId": buyerAddress?.dataDistrictReceiver?.id || 0,
            "insurancePrintEmail": buyer?.receiverEmail || '',
            "insurancePrintFullName": buyer?.receiverName || '',
            "insurancePrintPhone": buyer?.receiverPhone || '',
            "insurancePrintProvinceId": buyerAddress?.dataProvinceReceiver?.id || 0,
            "licenseNumber": infoMotor?.info?.licensePlate || '',
            "licenseStatus": infoMotor?.type == 1 ? 'Y' : 'N',
            "machineNumber": infoMotor?.info?.vehicleNumber || '',
            "modelId": infoMotor?.info?.motorModelId || 0,
            "motorType": infoMotor?.motorType?.code || '',
            "ownerFullName": infoMotor?.info?.fullName || '',
            "ownerAddress": `${infoMotor?.info?.ownerAddress}, ${infoMotor?.info?.ownerDistrict}, ${infoMotor?.info?.ownerProvince}` || '',
            "regisYear": parseInt(infoMotor?.info?.firstYearRegister) || 0,
            "packages": _arr.toString() || '',
            "motorValue": infoMotor?.info?.valueMotor || 0,
            "insuranceValue": infoMotor?.info?.valueInsurMotor || 0,
            "receiveType": receiveType ? "BOTH" : "EMAIL",
            "productCode": 'M3',
            "supplierId": idComSelected || '',
            "supplierCode": codeSelected || '',
        }
        console.log('body', body)
        let url = `${URL}/api/contract/v1/phymotor-contracts`
        console.log('url', url)
        saveParamsContract({ body, url })
        const array = {
            orderPrice: infoMotor?.info?.dataFee?.feeVat - infoMotor?.valueCom,
            priceFull: infoMotor?.info?.dataFee?.feeVat,
            orderDescription: `Thanh toan bao hiem vat chat xe may`,
            buyer: {
                fullName: buyer.buyerName,
                email: buyer.buyerEmail,
                phone: buyer.buyerPhone,
                address: `${buyer.buyerAddress?.trim()?.length > 0 ? `${buyer.buyerAddress}, ` : ''}${buyer.buyerDistrict ? `${buyer.buyerDistrict}, ` : ''}${buyer.buyerProvince || ''}`,
            },
        };
        saveOrderInfomation(array)
        Actions.Pay({ insurProductCode: 'M3', codeInsur: 'M3' });
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
                <ImageHeaderScroll code={'M3'} offset={offset} />
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
                <HeaderScroll code={'M3'} offset={offset} />
            </View>
            <ScrollView
                style={{ zIndex: 1000 }}
                contentContainerStyle={{
                    paddingTop: HEADER_MAX_HEIGHT,
                }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }]
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
                        <CustomerPreview />
                    </View>
                    <View style={styles.boxStyle}>
                        <BuyerPreview />
                    </View>
                    {
                        receiveType == true ? <View style={styles.boxStyle}>
                            <ReceiverPreview />
                        </View> : null
                    }
                    <View style={[styles.boxStyle, { paddingBottom: 20 }]}>
                        <PackagePreview />
                    </View>
                    <View style={[styles.boxStyle, { paddingBottom: 20 }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleStyle}>Hình thức giao nhận</Text>
                        </View>
                        <View style={{ paddingVertical: 10, }}>
                            <Text style={{ marginLeft: 10, marginRight: 20, color: TxtColor }}>
                                - Giấy chứng nhận bảo hiểm điện tử gửi tới email của quý khách
                            </Text>
                            {receiveType == true ?
                                <Text style={{ marginLeft: 10, marginRight: 20, marginTop: 4, color: TxtColor }}>
                                    - Giấy chứng nhận bảo hiểm sẽ được gửi qua đường chuyển phát nhanh (EMS) đến địa chỉ quý khách đã cung cấp
                                </Text>
                                : null
                            }
                        </View>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', paddingVertical: 5 }}
                            onPress={handleChangeReceiveTypeLast}
                        >
                            {
                                receiveTypeLast
                                    ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                    : <IconBoxSvg width={20} height={20} color={NewColor} />
                            }
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ marginTop: -3, color: TxtColor }}>Tôi đã đọc,hiểu và đồng ý với "<Text style={{ color: colorNote, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://epti.vn/dieu-khoan-su-dung-website')}>Điều khoản sử dụng</Text>" và "<Text style={{ color: colorNote, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://epti-documents.s3-ap-southeast-1.amazonaws.com/Thong+tu+04.2021.TT.BTC_ngay+15012021.pdf')}>Quy tắc bảo hiểm</Text>" đi kèm sản phẩm này của PTI </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ paddingBottom: 10 }}></View>
                    </View>
                    <FooterButton >
                        <Button
                            disabled={!receiveTypeLast}
                            label={'THANH TOÁN'}
                            marginTop={10}
                            marginBottom={10}
                            onPress={() => handleNext()}
                        />
                    </FooterButton>
                </View>
            </ScrollView>
            <BaseModal
                open={openModal}
                forceUpdate={true}
                onPress={() => gotoLogin()}
                label={'ĐỒNG Ý'}
                text="Phiên bản đăng nhập đã hết hạn. Mời bạn đăng nhập lại."
            />
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
    const listCompany = state.selectCompany.listCompany['M3'];
    const idComSelected = state.selectCompany.idComSelected['M3'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        idComSelected,
        codeSelected: obj?.insurOrg?.code,
        buyer: state?.motorPhysical?.buyer?.infoBuyer,
        receiveType: state?.motorPhysical?.buyer?.receiveType,
        infoMotor: state?.motorPhysical?.infoMotor,
        buyerAddress: state?.motorPhysical?.buyer
    }
};

export default connect(mapStateToProps, {
    saveOrderInfomation, saveParamsContract
})(Preview);

