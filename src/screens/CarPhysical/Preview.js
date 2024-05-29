import React, { useState, useEffect, useRef } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image,
    Linking,
    Animated,
} from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, URL, colorText, NewColor, colorTitle, screen, nameApp, colorNote, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import CarInfoPreview from './CarInfoPreview';
import BuyerPreview from './BuyerPreview';
import ReceiverPreview from './ReceiverPreview';
import PackagePreview from './PackagePreview';
import { saveOrderInfomation } from '../../actions/buy';
import VatPreview from './VatPreview';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { saveParamsContract } from '../../actions/paramsContractAction';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT } from '../../utils/Util';
import { dataSubmitCarPhysical, dataSubmitTNDS, dataSubmitTNDSVNI, dataLogCarPhysical } from './helpers';
import jwt_decode from "jwt-decode";
import analytics from '@react-native-firebase/analytics';
import ViewImageCar from './components/ViewImageCar';
import { saveLogContract } from '../../actions/logContract';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconEditSvg from '../../config/images/icons/IconEditSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconReviewSvg from '../../config/images/icons/IconReviewSvg';

function PreviewCar({ dataTokenInsur, contractCarId, saveLogContract, contractLog, idComSelected, codeSelected, isVat, buyerInfo, dataStep2, infoCar, receiveType, buyerAddress, saveOrderInfomation, durationCar, saveParamsContract, arrayCarImg }) {
    const offset = useRef(new Animated.Value(0)).current;
    const [receiveTypeLast, setreceiveTypeLast] = useState(false);
    
    const handleChangeReceiveTypeLast = () => {
        if (receiveTypeLast) {
            setreceiveTypeLast(false)
        } else {
            setreceiveTypeLast(true)
        }
    }

    const renderTotalVc = () => {
        
        let fee = dataStep2?.dataPackage?.vc + (dataStep2?.dataPackage?.bs02 || 0) + (dataStep2?.dataPackage?.bs04 || 0) + (dataStep2?.dataPackage?.bs05 || 0) + (dataStep2?.dataPackage?.bs06 || 0) + (dataStep2?.dataPackage?.bs13 || 0)

        return fee
    }

    const renderAfterDisCount = () => {
        let fee = renderTotal()
        let tru = 0

        if (dataStep2?.moneyDiscount > 0) {
            tru = dataStep2?.moneyDiscount
            if (dataStep2?.moneyDiscount > 100) {
                tru = dataStep2?.moneyDiscount
            } else {
                tru = fee - dataStep2?.moneyDiscount
            }
        }
        // if(tru < 6500000 && purpose_car.value === 'N' && seat < 9) {
        //     tru = 6500000;
        // }
        return tru
    }

    const renderTotal = () => {
        return (dataStep2?.dataPackage?.fee - dataStep2?.valueCom)
            + (dataStep2?.checkTNDS ? dataStep2?.feeTNDS?.feeVat - dataStep2?.valueComC1 : 0) +
            ((dataStep2?.checkTNLX && dataStep2?.insuranceMoney) ? dataStep2?.insuranceMoney?.feeVat - dataStep2?.valueComC3 : 0)
    }

    const renderTotalFull = () => {
        return dataStep2?.dataPackage?.fee
            + (dataStep2?.checkTNDS ? dataStep2?.feeTNDS?.feeVat : 0) +
            ((dataStep2?.checkTNLX && dataStep2?.insuranceMoney) ? dataStep2?.insuranceMoney?.feeVat : 0)
    }

    const handleNext = async () => {
        // await analytics().logEvent(
        //     'PAY_VCX_O_TO',
        //     dataLogCarPhysical({ ...infoCar, ...dataStep2, ...buyerInfo, ...buyerAddress, ...arrayCarImg[0], amount: renderTotalVc() }),
        // );
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(dataTokenInsur?.token || token);
            let url, urlTNDS, bodyTNDS;
            if (codeSelected === 'VNI') {
                url = `${URL}/api/contract/v1/car-contracts/create?type=physical`;
                urlTNDS = `${URL}/api/contract/v1/car-contracts/create?type=liability`;
                bodyTNDS = dataSubmitTNDSVNI({ ...infoCar, ...dataStep2, ...buyerInfo, ...buyerAddress, organizationId: dataToken?.organizationId || '', codeSelected, idComSelected });
            } else {
                url = `${URL}/api/contract/v1/car-contracts/physical`;
                urlTNDS = `${URL}/api/contract/v1/car-contracts/liability`;
                bodyTNDS = dataSubmitTNDS({ ...infoCar, ...dataStep2, ...buyerInfo, ...buyerAddress, organizationId: dataToken?.organizationId || '', codeSelected, idComSelected });
            }
            let body = dataSubmitCarPhysical({ ...infoCar, ...dataStep2, ...buyerInfo, ...buyerAddress, ...arrayCarImg[0], amount: dataStep2?.dataPackage?.fee, codeSelected, idComSelected })
            console.log('URllll VCX -:', url)
            console.log('Bodyyyyy VCX -:', body)
            saveParamsContract({ url, urlTNDS: dataStep2?.checkTNDS ? urlTNDS : '', body, bodyTNDS })
        })
        const array = {
            orderPrice: infoCar?.moneyDiscount > 0 ? renderAfterDisCount() : renderTotal(),
            priceFull: renderTotalFull(),
            orderDescription: `Thanh toan bao hiem vat chat oto`,
            buyer: {
                fullName: buyerInfo?.buyerName,
                email: buyerInfo?.buyerEmail,
                phone: buyerInfo?.buyerPhone,
                address: `${buyerInfo?.buyerAddress?.trim()?.length > 0 ? `${buyerInfo?.buyerAddress}, ` : ''}${buyerInfo?.buyerDistrict ? `${buyerInfo?.buyerDistrict}, ` : ''}${buyerInfo?.buyerProvince || ''}`,
            },
        };
        saveOrderInfomation(array)
        if (!contractCarId) {
            contractLog.key = 'PreviewCarPhysical';
            saveLogContract('C2', contractLog);
        }
        Actions.Pay({ insurProductCode: 'C2', codeInsur: 'C2' });
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
                <ImageHeaderScroll code={'C2'} offset={offset} />
            </Animated.View>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2012
            }}>
                <TouchableOpacity
                    onPress={() => {
                        infoCar?.licensePlate?.length > 0 || codeSelected === 'VNI' ?
                        Actions.PhotoCarY() : 
                        Actions.PhotoCar()
                    }}
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
                <HeaderScroll
                    code={'C2'}
                    offset={offset}
                />
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
                        <Text style={[styles.titleStyle, {marginLeft: 10}]}>
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
                    <View style={[styles.boxStyle, { paddingBottom: 10 }]}>
                        <PackagePreview infoCar={infoCar} dataStep2={dataStep2} codeSelected={codeSelected} />

                    </View>
                    {
                        isVat == true ? <View style={styles.boxStyle}>
                            <VatPreview />
                        </View> : null
                    }
                    {(infoCar?.licensePlate?.length > 0 || codeSelected === 'VNI') ? (
                        <View style={[styles.boxStyle, { flexDirection: 'row' }]}>
                            <View style={{ flex: 2.5 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#404142' }}>Ảnh xe:</Text>
                            </View>
                            <TouchableOpacity onPress={() => Actions.PhotoCarY()} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                <IconEditSvg width={16} height={15} />
                            </TouchableOpacity>
                        </View>
                    ) : null}
                    {!(infoCar?.licensePlate?.length > 0) && codeSelected !== 'VNI' ? (
                        <View style={[styles.boxStyle, { flexDirection: 'row' }]}>
                            <View style={{ flex: 2.5 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#404142' }}>Giấy bàn giao xe:</Text>
                            </View>
                            <TouchableOpacity onPress={() => Actions.PhotoCar()} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                <IconEditSvg width={16} height={15} />
                            </TouchableOpacity>
                        </View>
                    ) : null}
                    {(infoCar?.licensePlate?.length > 0 || codeSelected === 'VNI') ? (
                        <View style={[styles.boxStyle, { paddingTop: 0 }]}>
                            <ViewImageCar
                                title={'Góc trước ghế phụ'}
                                address={arrayCarImg[0]?.extraSeatInfo?.location?.address}
                                longitude={arrayCarImg[0]?.extraSeatInfo?.location?.longitude}
                                latitude={arrayCarImg[0]?.extraSeatInfo?.location?.latitude}
                                timePhoto={arrayCarImg[0]?.extraSeatInfo?.timePhoto}
                                uri={arrayCarImg[0]?.extraSeat}
                            />
                            <ViewImageCar
                                title={'Góc chính diện đầu xe'}
                                address={arrayCarImg[0]?.frontCarImgInfo?.location?.address}
                                longitude={arrayCarImg[0]?.frontCarImgInfo?.location?.longitude}
                                latitude={arrayCarImg[0]?.frontCarImgInfo?.location?.latitude}
                                timePhoto={arrayCarImg[0]?.frontCarImgInfo?.timePhoto}
                                uri={arrayCarImg[0]?.frontCarImg}
                                top={16}
                            />
                            <ViewImageCar
                                title={'Góc trước ghế lái'}
                                address={arrayCarImg[0]?.driverSeatInfo?.location?.address}
                                longitude={arrayCarImg[0]?.driverSeatInfo?.location?.longitude}
                                latitude={arrayCarImg[0]?.driverSeatInfo?.location?.latitude}
                                timePhoto={arrayCarImg[0]?.driverSeatInfo?.timePhoto}
                                uri={arrayCarImg[0]?.driverSeat}
                                top={16}
                            />
                            <ViewImageCar
                                title={'Góc sau ghế phụ'}
                                address={arrayCarImg[0]?.behindExtraSeatInfo?.location?.address}
                                longitude={arrayCarImg[0]?.behindExtraSeatInfo?.location?.longitude}
                                latitude={arrayCarImg[0]?.behindExtraSeatInfo?.location?.latitude}
                                timePhoto={arrayCarImg[0]?.behindExtraSeatInfo?.timePhoto}
                                uri={arrayCarImg[0]?.behindExtraSeat}
                                top={16}
                            />
                            <ViewImageCar
                                title={'Góc chính diện đuôi xe'}
                                address={arrayCarImg[0]?.backCarImgInfo?.location?.address}
                                longitude={arrayCarImg[0]?.backCarImgInfo?.location?.longitude}
                                latitude={arrayCarImg[0]?.backCarImgInfo?.location?.latitude}
                                timePhoto={arrayCarImg[0]?.backCarImgInfo?.timePhoto}
                                uri={arrayCarImg[0]?.backCarImg}
                                top={16}
                            />
                            <ViewImageCar
                                title={'Góc sau ghế lái'}
                                address={arrayCarImg[0]?.behindDriverSeatInfo?.location?.address}
                                longitude={arrayCarImg[0]?.behindDriverSeatInfo?.location?.longitude}
                                latitude={arrayCarImg[0]?.behindDriverSeatInfo?.location?.latitude}
                                timePhoto={arrayCarImg[0]?.behindDriverSeatInfo?.timePhoto}
                                uri={arrayCarImg[0]?.behindDriverSeat}
                                top={16}
                            />
                            <ViewImageCar
                                title={'Tem đăng kiểm'}
                                address={arrayCarImg[0]?.registrationStampInfo?.location?.address}
                                longitude={arrayCarImg[0]?.registrationStampInfo?.location?.longitude}
                                latitude={arrayCarImg[0]?.registrationStampInfo?.location?.latitude}
                                timePhoto={arrayCarImg[0]?.registrationStampInfo?.timePhoto}
                                uri={arrayCarImg[0]?.registrationStamp}
                                top={16}
                            />
                        </View>
                    ) : null}
                    {(infoCar?.licensePlate?.length > 0 || codeSelected === 'VNI') ? (
                        <View style={[styles.boxStyle, { flexDirection: 'row' }]}>
                            <View style={{ flex: 2.5 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#404142' }}>Ảnh giấy đăng kiểm</Text>
                            </View>
                            <TouchableOpacity onPress={() => Actions.PhotoCarY()} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                <IconEditSvg width={16} height={15} />
                            </TouchableOpacity>
                        </View>
                    ): null}
                    {(infoCar?.licensePlate?.length > 0 || codeSelected === 'VNI') ? (
                        <View style={[styles.boxStyle, { paddingTop: 0 }]}>
                            <ViewImageCar
                                title={'Ảnh giấy đăng kiểm'}
                                address={arrayCarImg[0]?.cetificateCarInfo?.location?.address}
                                longitude={arrayCarImg[0]?.cetificateCarInfo?.location?.longitude}
                                latitude={arrayCarImg[0]?.cetificateCarInfo?.location?.latitude}
                                timePhoto={arrayCarImg[0]?.cetificateCarInfo?.timePhoto}
                                uri={arrayCarImg[0]?.cetificateCar}
                            />
                        </View>
                    ) : null}
                    {(infoCar?.licensePlate?.length > 0 || codeSelected === 'VNI') ? (
                        <View style={[styles.boxStyle, { flexDirection: 'row' }]}>
                            <View style={{ flex: 2.5 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#404142' }}>Ảnh đăng ký xe</Text>
                            </View>
                            <TouchableOpacity onPress={() => Actions.PhotoCarY()} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                <IconEditSvg width={16} height={15} />
                            </TouchableOpacity>
                        </View>
                    ) : null}
                    {(infoCar?.licensePlate?.length > 0 || codeSelected === 'VNI') ? (
                        <View style={[styles.boxStyle, { paddingTop: 0 }]}>
                            <ViewImageCar
                                title={'Đăng ký xe'}
                                address={arrayCarImg[0]?.regisCertificateCarInfo?.location?.address}
                                longitude={arrayCarImg[0]?.regisCertificateCarInfo?.location?.longitude}
                                latitude={arrayCarImg[0]?.regisCertificateCarInfo?.location?.latitude}
                                timePhoto={arrayCarImg[0]?.regisCertificateCarInfo?.timePhoto}
                                uri={arrayCarImg[0]?.regisCertificateCar}
                            />
                        </View>
                    ) : null}
                    {!(infoCar?.licensePlate?.length > 0) && codeSelected !== 'VNI' ? (
                        <View style={[styles.boxStyle, { paddingTop: 0 }]}>
                            <ViewImageCar
                                title={'Giấy bàn giao xe'}
                                address={arrayCarImg[0]?.saleAvoidPaperInfo?.location?.address}
                                longitude={arrayCarImg[0]?.saleAvoidPaperInfo?.location?.longitude}
                                latitude={arrayCarImg[0]?.saleAvoidPaperInfo?.location?.latitude}
                                timePhoto={arrayCarImg[0]?.saleAvoidPaperInfo?.timePhoto}
                                uri={arrayCarImg[0]?.saleAvoidPaper}
                            />
                        </View>
                    ) : null}
                    <View style={[styles.boxStyle, { paddingBottom: 20, paddingTop: 10 }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleStyle}>Hình thức giao nhận</Text>
                        </View>
                        <View style={{ paddingVertical: 10, }}>
                            <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5 }}>
                                - Giấy chứng nhận bảo hiểm điện tử gửi tới email của quý khách.
                                </Text>
                            {receiveType == true ?
                                <Text style={{ fontSize: 14, color: TxtColor, lineHeight: 17.5 }}>
                                    - Giấy chứng nhận bảo hiểm sẽ được gửi qua đường chuyển phát nhanh (EMS) đến địa chỉ quý khách đã cung cấp.
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
                            <Text style={{ marginLeft: 8, fontSize: 14, color: TxtColor, flex: 1 }}>
                                Tôi đã đọc, hiểu và đồng ý với "
                                {
                                    <Text
                                        style={{ color: colorNote, textDecorationLine: 'underline' }}
                                        onPress={() => {
                                            codeSelected !== 'VNI' && Linking.openURL('https://epti.vn/dieu-khoan-su-dung-website');
                                        }}
                                    >
                                        Điều khoản sử dụng
                                    </Text>
                                }
                                " và "
                                {
                                    <Text
                                        style={{ color: colorNote, textDecorationLine: 'underline' }}
                                        onPress={() => {
                                            codeSelected === 'VNI' ?
                                                Linking.openURL('https://bhhk.com.vn/Data/upload/images/QD%20187%20-%20Quy%20tac%20bao%20hiem%20ket%20hop%20xe%20co%20gioi%202019.pdf') :
                                                Linking.openURL('https://epti-documents.s3-ap-southeast-1.amazonaws.com/Thong+tu+04.2021.TT.BTC_ngay+15012021.pdf')
                                        }}
                                    >
                                        Quy tắc bảo hiểm
                                    </Text>
                                }
                                " đi kèm sản phẩm này của {codeSelected === 'VNI' ? 'VNI' : 'PTI'}.
                            </Text>
                        </TouchableOpacity>
                        <View style={{ paddingBottom: 10 }}></View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ marginBottom: 12 }}>
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
        color: colorTitle,
        fontWeight: 'bold',
    },
    boxStyle: {
        paddingVertical: 10
    }
});


const mapStateToProps = (state) => {
    const listCompany = state.selectCompany.listCompany['C2'];
    const idComSelected = state.selectCompany.idComSelected['C2'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return ({
        idComSelected,
        codeSelected: obj?.insurOrg?.code || '',
        buyerInfo: state?.carPhysical?.buyerPhysical?.infoBuyer,
        receiveType: state?.carPhysical?.buyerPhysical?.receiveType,
        isVat: state?.carPhysical?.buyerPhysical?.infoBuyer?.isVat,
        fee: state?.carPhysical?.feeCar,
        buyerAddress: state?.carPhysical?.buyerPhysical,
        durationCar: state?.carPhysical?.durationCar,
        infoCar: state?.carPhysical?.infoCarPhysical,
        dataStep2: state?.carPhysical?.dataPackage,
        arrayCarImg: state.carBuy.arrayCarImg,
        contractLog: state.logContract.logContract['C2'] || {},
        contractCarId: state?.carPhysical?.contractCarId,
        dataTokenInsur: state.insurance.tokenInsur['C2'],
    })
};

export default connect(mapStateToProps, {
    saveOrderInfomation, saveParamsContract, saveLogContract
})(PreviewCar);

