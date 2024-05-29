import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, URL, colorText, NewColor, colorTitle, screen, nameApp, TxtColor, errValidColor, textDisable, NewColorDisable } from '../../config/System';
import { connect } from 'react-redux';
// import CarInfoPreview from './CarInfoPreview';
// import BuyerPreview from './BuyerPreview';
// import ReceiverPreview from './ReceiverPreview';
// import PackagePreview from './PackagePreview';
// import VatPreview from './VatPreview';
import Store from '../../services/Store';
import Const from '../../services/Const';
import { isIPhoneX } from '../../utils/Util';
import { putContract } from './actions';
import Modal from 'react-native-modal';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import { formatVND } from '../../components/Functions';
import axios from 'axios';
import { infoInsur } from '../ListNotify/assets';
import DateFill from '../../components/dateTimeFill/DateFill';
import { ERROR_DATE_CURRENT, ERROR_NEXT_DATE } from '../../config/ErrorMessage';
import Input from '../CarInsurance/components/Input';
import { ScrollView } from 'react-native';
import IconWarningSvg from '../../config/images/icons/IconWarningSvg';
import IconEditSvg from '../../config/images/icons/IconEditSvg';
import IconReviewSvg from '../../config/images/icons/IconReviewSvg';
import IconCloseSvg from '../../config/images/icons/IconCloseSvg';

const HEADER_MIN_HEIGHT = isIPhoneX ? 85 : 75;
const HEADER_MAX_HEIGHT = 267;

function PreviewLog({ putContract, detailInfo, contractId }) {
    const offset = useRef(new Animated.Value(0)).current;
    const [openModal, setOpenModal] = useState(true);
    const [startDateString, setStartDateString] = useState('');
    const [errStartDate, setErrStartDate] = useState(false);
    const [carTypeName, setCarTypeName] = useState('');
    const [carBrandName, setCarBrandName] = useState('');
    const [carModelName, setCarModelName] = useState('');

    const contractCode = detailInfo?.code?.split('.');
    const codeInsur = contractCode ? contractCode.filter(i => infoInsur[i]).toString() : '';
    useEffect(() => {
        if (!startDateString) {
            setStartDateString(moment(detailInfo?.effectiveAt).format('DD/MM/YYYY'));
        }
        if (!carTypeName && (codeInsur === 'C1' || codeInsur === 'C2' || codeInsur === 'C3')) {
            let url = `${URL}/api/attribute/v1/car-types/${detailInfo?.contract_car?.carType}`
            axios.get(url)
                .then((res) => {
                    if (res.status == 200) {
                        setCarTypeName(res?.data?.data?.value);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        if (!carBrandName && (codeInsur === 'C1' || codeInsur === 'C2' || codeInsur === 'C3')) {
            let url = `${URL}/api/master-data/v1/cars/brands/${detailInfo?.contract_car?.carBrand}`
            axios.get(url)
                .then((res) => {
                    if (res.status == 200) {
                        setCarBrandName(res?.data?.data?.name);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        if (!carModelName && (codeInsur === 'C1' || codeInsur === 'C2' || codeInsur === 'C3')) {
            let url = `${URL}/api/master-data/v1/cars/models/${detailInfo?.contract_car?.carModel}`
            axios.get(url)
                .then((res) => {
                    if (res.status == 200) {
                        setCarModelName(res?.data?.data?.name);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, []);

    const headerHeight = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [HEADER_MAX_HEIGHT, (HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT) / 2, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });

    const opacityTitle = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });

    const marginTitle = offset.interpolate(
        {
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [isIPhoneX ? 122 : 132, -19],
            extrapolate: 'clamp',
        });

    const paddingTitle = offset.interpolate(
        {
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [8, 18],
            extrapolate: 'clamp',
        });

    const headerZIndex = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [1000, 1],
            extrapolate: 'clamp'
        });

    const marginTopHeader = offset.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [0, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });

    const confirmPicker = (date, err) => {
        setStartDateString(date);
        setErrStartDate(err);
    };
    const checkButton = () => {
        const timerCurrent = moment().format('DD/MM/YYYY');
        const days = moment(startDateString, 'DD/MM/YYYY').diff(moment(timerCurrent, 'DD/MM/YYYY'), 'days');
        if (days >= 0 && !errStartDate) {
            return false
        }
        return true;
    };
    const dataDate = () => {
        if (codeInsur.includes('A')) {
            return new Date(moment().add(1, 'days').valueOf());
        } else {
            return new Date();
        }
    };
    const endDate = () => {
        if (codeInsur === 'A3') {
            if (detailInfo?.packageName === 'Gói 12 tháng') {
                return moment(startDateString, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY');
            } else if (detailInfo?.packageName === 'Gói 06 tháng') {
                return moment(startDateString, 'DD/MM/YYYY').add(6, 'months').format('DD/MM/YYYY');
            } else if (detailInfo?.packageName === 'Gói 03 tháng') {
                return moment(startDateString, 'DD/MM/YYYY').add(3, 'months').format('DD/MM/YYYY');
            } else if (detailInfo?.packageName === 'Gói tháng') {
                return moment(startDateString, 'DD/MM/YYYY').add(1, 'months').format('DD/MM/YYYY');
            } else if (detailInfo?.packageName === 'Gói tuần') {
                return moment(startDateString, 'DD/MM/YYYY').add(7, 'days').format('DD/MM/YYYY');
            } else if (detailInfo?.packageName === 'Gói ngày') {
                return moment(startDateString, 'DD/MM/YYYY').add(1, 'days').format('DD/MM/YYYY');
            }
        } else {
            return moment(startDateString, 'DD/MM/YYYY').add(detailInfo?.duration > 0 ? detailInfo?.duration : 12, 'months').format('DD/MM/YYYY');
        }
    }
    const nameInsur = () => {
        if (codeInsur === 'C1') {
            return 'Bảo hiểm TNDS ô tô';
        } else if (codeInsur === 'C2') {
            return 'Bảo hiểm vật chất xe ô tô';
        } else if (codeInsur === 'C3') {
            return 'TNDS bắt buộc (kèm TNLXPX và NNTX)';
        } else if (codeInsur === 'A3') {
            return nameApp.includes('YCHI') ? 'Bảo Hiểm An Sinh Y Chi' : 'An Sinh Mai Linh';
        } else if (codeInsur === 'A4') {
            return 'Bảo hiểm Vững Tâm An';
        } else if (codeInsur === 'A1' || codeInsur === 'A2') {
            return 'Bảo hiểm Tai nạn';
        } else if (codeInsur === 'M1') {
            return 'Bảo hiểm TNDS xe máy';
        } else if (codeInsur === 'M2') {
            return 'TNDS bắt buộc (kèm người ngồi trên xe)';
        } else if (codeInsur === 'A8') {
            return 'Bảo hiểm An Sinh Gia Đình';
        } else if (codeInsur === 'HC10') {
            return 'Bảo hiểm ACare';
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <TouchableOpacity
                    onPress={() => Actions.pop()}
                    style={styles.ctBack}>
                    <FastImage
                        style={[styles.icBack]}
                        source={require('../../icons/ic_back.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <Animated.View style={[{ marginTop: marginTitle, paddingHorizontal: paddingTitle }]}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#ffff',
                            textAlign: 'left',
                        }}>
                        {infoInsur[codeInsur] ? infoInsur[codeInsur].nameHeader : infoInsur.default.nameHeader}
                    </Text>
                    <Animated.View style={[{ opacity: opacityTitle }]}>
                        <View
                            style={{
                                backgroundColor: Color,
                                width: 103,
                                height: 4,
                                borderRadius: 35,
                                marginTop: 4,
                            }}
                        />
                    </Animated.View>
                </Animated.View>
            </View>
            <Animated.View style={[styles.animatedHeaderContainer, { height: HEADER_MAX_HEIGHT, zIndex: 999 }]}>
                <Animated.Image
                    source={infoInsur[codeInsur] ? infoInsur[codeInsur].icon : infoInsur.default.icon}
                    style={{ width: widthPercentageToDP('100'), height: HEADER_MAX_HEIGHT }}
                />
            </Animated.View>
            <Animated.ScrollView
                style={{ zIndex: 2011, marginTop: marginTopHeader }}
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
                        <Text style={[styles.titleStyle, {marginLeft: 10}]}>
                            Xem lại thông tin
                        </Text>
                    </View>
                    {
                        !codeInsur.includes('A') ? (
                            <View style={styles.boxStyle}>
                                <View style={styles.container1}>
                                    <View style={styles.titleContainer2}>
                                        <View style={{ flex: 2.5 }}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>
                                                Thông tin xe mua bảo hiểm
                                            </Text>
                                        </View>
                                        <TouchableOpacity style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                            <IconEditSvg width={16} height={15} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.titleContainer1}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.textStyle}>
                                                Mục đích sử dụng
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                {detailInfo?.purpose === 'N' ? 'Không kinh doanh' : 'Kinh doanh'}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.titleContainer1}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.textStyle}>
                                                Loại xe
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                {carTypeName}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.titleContainer1}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.textStyle}>
                                                Hãng xe
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                {carBrandName}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.titleContainer1}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.textStyle}>
                                                Dòng xe
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                {carModelName}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.titleContainer1}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.textStyle}>
                                                Năm sản xuất
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                {detailInfo?.contract_car?.manufactureYear}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.titleContainer1}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.textStyle}>
                                                Số chỗ ngồi
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                {detailInfo?.contract_car?.numberSeat}
                                            </Text>
                                        </View>
                                    </View>
                                    {detailInfo?.purpose === 'Y' ?
                                        <View style={styles.titleContainer1}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>
                                                    Biển số xe
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                    {detailInfo?.contract_car?.licenseNumber}
                                                </Text>
                                            </View>
                                        </View> : null
                                    }
                                    {detailInfo?.purpose === 'N' ?
                                        <View style={styles.titleContainer1}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>
                                                    Số khung
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                    {detailInfo?.contract_car?.chassisNumber}
                                                </Text>
                                            </View>
                                        </View> : null
                                    }
                                    {detailInfo?.purpose === 'N' ?
                                        <View style={styles.titleContainer1}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>
                                                    Số máy
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                    {detailInfo?.contract_car?.machineNumber}
                                                </Text>
                                            </View>
                                        </View> : null
                                    }
                                    {detailInfo?.loadCapacity ?
                                        <View style={styles.titleContainer1}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>
                                                    Trọng tải
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                    {detailInfo?.contract_car?.loadCapacity} tấn
                                                </Text>
                                            </View>
                                        </View> : null
                                    }
                                    {
                                        detailInfo?.regisExpiredAt ? (
                                            <View style={styles.titleContainer1}>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={styles.textStyle}>
                                                        Ngày hết hạn đăng kiểm
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                        {detailInfo?.contract_car?.regisExpiredAt}
                                                    </Text>
                                                </View>
                                            </View>
                                        ) : null
                                    }
                                    <View style={styles.titleContainer1}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.textStyle}>
                                                Giá trị xe
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                {detailInfo?.contract_car?.declarationPrice ? formatVND(detailInfo?.contract_car?.declarationPrice) : ''}VNĐ
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.titleContainer1}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.textStyle}>
                                                Số tiền bảo hiểm
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                                {detailInfo?.contract_car?.insuredValue ? formatVND(detailInfo?.contract_car?.insuredValue) : ''}VNĐ
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ) : null
                    }
                    <View style={styles.boxStyle}>
                        <View style={styles.container1}>
                            <View style={styles.titleContainer2}>
                                <View style={{ flex: 2.5 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>
                                        Thông tin bên mua bảo hiểm
                                    </Text>
                                </View>
                                <TouchableOpacity style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                    <IconEditSvg width={16} height={15} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        {
                                            codeInsur.includes('A') ?
                                                'Họ và tên người mua' :
                                                detailInfo?.buyer?.type === 1 ?
                                                    'Họ và tên chủ xe' :
                                                    'Tên doanh nghiệp'
                                        }
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {detailInfo?.buyer?.type === 1 ? detailInfo?.buyer?.fullName : detailInfo?.buyer?.companyBuyerName}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        Số điện thoại
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {detailInfo?.buyer?.phone}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.titleContainer1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                        Email
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[styles.dataStyle, { textAlign: 'right' }]}>
                                        {detailInfo?.buyer?.email}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
            <Modal
                isVisible={openModal}
                style={{ margin: 0, justifyContent: 'flex-end' }}
                // onBackButtonPress={() => setOpenModal(false)}
                // onBackdropPress={() => setOpenModal(false)}
                animationInTiming={200}
                animationOutTiming={200}
                backdropTransitionInTiming={0}
                backdropTransitionOutTiming={0}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View
                        style={{
                            // height: '60%',
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}>
                        <ScrollView contentContainerStyle={{
                            paddingTop: 24,
                            paddingHorizontal: 24,
                        }}>
                            <IconWarningSvg width={60} height={60} style={{alignSelf: 'center'}} />
                            <Text style={{ marginTop: 14, fontSize: 16, fontWeight: 'bold', color: TxtColor, textAlign: 'center' }}>
                                Chọn lại thời hạn bảo hiểm
                            </Text>
                            <Text style={{ marginTop: 8, fontSize: 14, color: TxtColor }}>
                                Thời hạn bảo hiểm phải là ngày{!codeInsur.includes('A') ? ' hiện tại hoặc ' : ' '}tương lai
                            </Text>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: TxtColor }}>
                                    {nameInsur()}
                                </Text>
                            </View>
                            <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    {/* <ModalTimePicker
                                        dateDefault={dataDate()}
                                        minimumDate={dataDate()}
                                        onPicker={(date) => confirmPicker(date, false)}
                                    >
                                        <Input
                                            label={'Thời hạn từ *'}
                                            value={startDateString}
                                            editable={false}
                                            textUnableColor={TxtColor}
                                        />
                                    </ModalTimePicker> */}
                                    <DateFill
                                        value={startDateString}
                                        onChange={(text, err) => {
                                            confirmPicker(text, err);
                                        }}
                                        label={'Thời hạn từ *'}
                                        minimumDate={
                                            codeInsur.includes('A') ?
                                                moment().add(1, 'days').format('DD/MM/YYYY') :
                                                moment().format('DD/MM/YYYY')
                                        }
                                        errMinimum={
                                            codeInsur.includes('A') ?
                                                ERROR_NEXT_DATE :
                                                ERROR_DATE_CURRENT
                                        }
                                        requireFill
                                    />
                                </View>
                                <View style={{ width: 24 }} />
                                <View style={{ flex: 1 }}>
                                    <Input
                                        label={'Thời hạn đến'}
                                        value={endDate()}
                                        editable={false}
                                        baseColor={textDisable}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                        <TouchableOpacity
                            style={{position: 'absolute', top: 24, right: 24}}
                            onPress={() => {
                                setOpenModal(false);
                                Actions.pop();
                            }}
                        >
                            <IconCloseSvg width={16} height={16} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <View style={{backgroundColor: 'white', paddingHorizontal: 24, paddingTop: 10, paddingBottom: 32}}>
                    <TouchableOpacity
                        disabled={checkButton()}
                        onPress={() => {
                            setOpenModal(false);
                            putContract(contractId, startDateString);
                            Actions.execute('replace', 'Pay', {
                                priceInsur: detailInfo?.feeData?.commissionValue ? (detailInfo?.value - detailInfo?.feeData?.commissionValue) : detailInfo?.value,
                                priceInsurFull: detailInfo?.value,
                                insurProductCode: codeInsur,
                                idContract: contractId,
                                fullNameLog: detailInfo?.buyer?.fullName,
                                phoneLog: detailInfo?.buyer?.phone,
                                emailLog: detailInfo?.buyer?.email,
                                addressLog: detailInfo?.buyer?.address,
                            });
                        }}
                        style={{
                            width: '100%',
                            paddingVertical: 16,
                            backgroundColor: checkButton() ? NewColorDisable : Color,
                            borderRadius: 10,
                            alignItems: 'center'
                        }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                            HOÀN THÀNH
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={{ marginBottom: 12 }}>
                <FooterButton >
                    <Button
                        disabled={true}
                        label={'THANH TOÁN'}
                        marginTop={10}
                        marginBottom={10}
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
    },
    container1: {
        flex: 1,
        backgroundColor: '#F6F5F6',
        borderRadius: 10,
        paddingVertical: 16,
        paddingHorizontal: 12
    },
    titleContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer1: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 12
    },
    textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TxtColor
    },
    dataStyle: {
        fontSize: 14,
        color: TxtColor
    },
    contentTime: {
        marginTop: 2,
        fontSize: 14,
        fontWeight: '400',
        color: textDisable,
    },
    titleTime: {
        fontSize: 12,
        fontWeight: '400',
        color: textDisable,
    },
    lineTime: {
        marginTop: 4,
        height: 1,
        backgroundColor: textDisable,
    },
});


const mapStateToProps = (state, ownProps) => ({
    detailInfo: state.contracts.detailContract[ownProps.contractId],
});

export default connect(mapStateToProps, {
    putContract
})(PreviewLog);

