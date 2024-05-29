import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Animated,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';
import {
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { Color, colorTitle, NewColor, URL, nameApp, TxtColor } from '../../config/System';
import FastImage from 'react-native-fast-image';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import { formatVND } from '../../components/Functions';
import { saveTravelPackages, getSellInfo } from './actions/travelActions';
import Store from '../../services/Store';
import Const from '../../services/Const';
import axios from 'axios';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import Input from '../CarInsurance/components/Input';
import InputSelect from '../../components/buy/InputSelect';
import ModalNational from './components/ModalNational';
import ModalInternational from './components/ModalInternational';
import TotalFee from './TotalFee';
import CheckInfoTravel from './CheckInfoTravel';
import SelectCompany from '../../components/listCompanySelect/SelectCompany';
import { convertToNumber } from '../CarPhysical/helpers';
import IconDiamondSvg from '../../config/images/icons/IconDiamondSvg';

import { scrollInterpolator, animatedStyles } from './utils/animation';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.93);

const dataInsur = {
    'Hạng D - $70.000': { 'first': 'Tối đa $3.500', 'second': 'Tối đa $4.000', 'third': 'Tối đa $5.000' },
    'Hạng C - $50.000': { 'first': 'Tối đa $2.500', 'second': 'Tối đa $3.500', 'third': 'Tối đa $4.000' },
    'Hạng B - $30.000': { 'first': 'Tối đa $1.500', 'second': 'Tối đa $2.500', 'third': 'Tối đa $3.000' },
    'Hạng A - $20.000': { 'first': 'Tối đa $1.000', 'second': 'Tối đa $2.000', 'third': 'Tối đa $2.000' },
};

class AccidentPackage extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            modalNational: null,
            modalInternational: null,
            feeTravel: props.travelPackages?.feeTravel || 0,
            originalFee: props.travelPackages?.originalFee || 0,
        };
    }

    componentDidMount = () => {
        const { travelInfo, travelPackages, getSellInfo } = this.props;
        getSellInfo();
        if (travelPackages?.idArea > 0 && travelInfo?.info?.dataAreaType?.id !== travelPackages?.idArea) {
            this.setState({ feeTravel: 0 });
        }
        if (
            (travelPackages?.dayNumber > 0 && travelInfo?.info?.longDays !== travelPackages?.dayNumber) ||
            (travelPackages?.codeCountry > 0 && travelInfo?.info?.dataNationType?.countryCode !== travelPackages?.codeCountry)
        ) {
            if (travelInfo?.info?.dataAreaType?.id === 1) {
                this.getFeeTravel(
                    'DOMESTIC',
                    travelInfo?.info?.longDays,
                    travelPackages?.pack?.dataInsuranceType?.insuranceValue,
                    travelPackages?.pack?.peopleNumber,
                );
            } else {
                this.getFeeTravel(
                    'INTERNATIONAL',
                    travelInfo?.info?.longDays,
                    travelPackages?.pack?.dataInsuranceType?.insuranceValue,
                    travelPackages?.pack?.peopleNumber,
                    travelPackages?.pack?.dataInsuranceType.id,
                    travelInfo?.info?.dataNationType?.countryCode
                );
            }
        }
    };

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {codeSelected, travelInfo, travelPackages} = this.props;
        if(travelInfo && travelPackages && codeSelected !== prevProps.codeSelected) {
            if (travelInfo?.info?.dataAreaType?.id === 1) {
                this.getFeeTravel(
                    'DOMESTIC',
                    travelInfo?.info?.longDays,
                    travelPackages?.pack?.dataInsuranceType?.insuranceValue,
                    travelPackages?.pack?.peopleNumber,
                );
            } else {
                this.getFeeTravel(
                    'INTERNATIONAL',
                    travelInfo?.info?.longDays,
                    travelPackages?.pack?.dataInsuranceType?.insuranceValue,
                    travelPackages?.pack?.peopleNumber,
                    travelPackages?.pack?.dataInsuranceType.id,
                    travelInfo?.info?.dataNationType?.countryCode
                );
            }
        }
        if(travelPackages && prevProps.travelPackages && travelPackages.feeTravel !== prevProps.travelPackages.feeTravel) {
            this.setState({feeTravel: travelPackages.feeTravel});
        }
        if(travelPackages && prevProps.travelPackages && travelPackages.originalFee !== prevProps.travelPackages.originalFee) {
            this.setState({originalFee: travelPackages.originalFee});
        }
    }

    renderTravelPackage = () => {
        const { travelInfo, travelPackages } = this.props;
        if (travelPackages?.idArea > 0 && travelInfo?.info?.dataAreaType?.id !== travelPackages?.idArea) {
            return '';
        } else return travelPackages?.pack?.insuranceType;
    };

    renderDataTravelPackage = () => {
        const { travelInfo, travelPackages } = this.props;
        if (travelPackages?.idArea > 0 && travelInfo?.info?.dataAreaType?.id !== travelPackages?.idArea) {
            return {};
        } else return travelPackages?.pack?.dataInsuranceType;
    };

    getFeeTravel = (type, dayNumber, insuranceValue, peopleNumber, packageId, countryCode) => {
        const {codeSelected, dataTokenInsur} = this.props;
        new Store().getSession(Const.TOKEN).then(token => {
            let url = `${URL}/api/contract/v1/travel-contracts-fee?type=${type || ''}&dayNumber=${dayNumber || ''}&insuranceValue=${insuranceValue || ''}&peopleNumber=${peopleNumber || ''}&packageId=${packageId || ''}&countryCode=${countryCode || ''}&supplierCode=${codeSelected || ''}`;
            console.log('Url du lich: ', url);
            axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': dataTokenInsur?.token || token,
                },
            })
                .then((res) => {
                    console.log('Gia du lich: ', res?.data?.data);
                    if (res?.status === 200) {
                        this.setState({
                            feeTravel: res?.data?.data,
                            originalFee: res?.data?.extraData?.originalFee || 0,
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
    };

    setModalNational = (value) => {
        this.setState({ modalNational: value });
    };

    setInsuranceType = (data, props, currency) => {
        const { travelInfo } = this.props;
        props.setFieldValue('insuranceType', `${data.name}${currency || ''}`);
        props.setFieldValue('dataInsuranceType', data);
        if (travelInfo?.info?.dataAreaType?.id === 1) {
            this.getFeeTravel(
                'DOMESTIC',
                travelInfo?.info?.longDays,
                data.insuranceValue,
                props.values.peopleNumber,
            );
        } else {
            this.getFeeTravel(
                'INTERNATIONAL',
                travelInfo?.info?.longDays,
                data.insuranceValue,
                props.values.peopleNumber,
                data.id,
                travelInfo?.info?.dataNationType?.countryCode
            );
        }
    };

    changePeopleNumber = (txt, props) => {
        props.setFieldValue('peopleNumber', convertToNumber(txt)?.toString());
    };

    handleBlurPeopleNumber = (props) => {
        const { travelInfo } = this.props;
        if (travelInfo?.info?.dataAreaType?.id === 1) {
            this.getFeeTravel(
                'DOMESTIC',
                travelInfo?.info?.longDays,
                props.values.dataInsuranceType.insuranceValue,
                props.values.peopleNumber,
            );
        } else {
            this.getFeeTravel(
                'INTERNATIONAL',
                travelInfo?.info?.longDays,
                props.values.dataInsuranceType.insuranceValue,
                props.values.peopleNumber,
                props.values.dataInsuranceType.id,
                travelInfo?.info?.dataNationType?.countryCode
            );
        }
    };

    setModalInternational = (value) => {
        this.setState({ modalInternational: value });
    };

    setItem = (index, props) => {
        props.setFieldValue('selectedInsur', index);
    };

    _renderItem = (props) => {
        const benefits = [
            { label: 'Quyền lợi tử vong/Thương tật toàn bộ vĩnh viễn do tai nạn', value: `${formatVND(props.values.dataInsuranceType.insuranceValue)}VNĐ` },
            { label: 'Thương tật do tai nạn', value: 'Chi trả theo chi phí y tế thực tế, hợp lý nhưng không vượt quá tỷ lệ quy định trong Bảng tỷ lệ thương tật' },
            { label: 'Quyền lợi tử vong do ốm đau, bệnh tật bất ngờ trong thời hạn bảo hiểm', value: `${formatVND(props.values.dataInsuranceType.insuranceValue / 2)}VNĐ` },
        ];
        return (
            <View
                style={[styles.itemContainer]}>
                <FastImage
                    source={require('../../config/images/public/travel/bannerNational.jpg')}
                    style={{
                        borderRadius: 10,
                        width: '100%',
                        height: 230,
                    }}
                />
                <View style={{ alignItems: 'center', marginTop: -30, marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: Color, textTransform: 'uppercase' }}>Quyền lợi bảo hiểm</Text>
                    <View style={{ marginTop: 5, height: 3, width: '50%', borderRadius: 35, backgroundColor: NewColor }} />
                </View>
                {
                    benefits.map((obj, index) => (
                        <View style={{ flexDirection: 'row', marginBottom: index === 2 ? 16 : 8, paddingHorizontal: 5 }}>
                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <Text style={{ fontSize: 12, fontWeight: '400', color: '#8D8C8D', textAlign: 'right' }}>
                                    {obj.label}
                                </Text>
                            </View>
                            <View style={{ width: 15 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: index === 1 ? 15 : 16, fontWeight: 'bold', color: TxtColor }}>
                                    {obj.value}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        );
    };

    renderItem = (item, props) => {
        let benefits;
        if (item === '1') {
            benefits = [
                { label: 'Chi phí y tế tại nước ngoài', value: `Tối đa $${formatVND(props.values.dataInsuranceType.insuranceValue)}` },
                { label: 'Bảo hiểm tai nạn cá nhân', value: `Tối đa $${formatVND(props.values.dataInsuranceType.insuranceValue)}` },
                { label: 'Dịch vụ hỗ trợ y tế toàn cầu và hỗ trợ du lịch IPA', value: `Tối đa $${formatVND(props.values.dataInsuranceType.insuranceValue)}` },
            ];
        } else {
            benefits = [
                { label: 'Chi phí điều trị tiếp tục ở VN', value: dataInsur[props.values.insuranceType]?.first || 'Tối đa $0' },
                { label: 'Chi phí chăm sóc trẻ em', value: dataInsur[props.values.insuranceType]?.second || 'Tối đa $0' },
                { label: 'Bồi thường rủi ro liên quan tới hành trình', value: dataInsur[props.values.insuranceType]?.third || 'Tối đa $0' },
            ];
        }
        return (
            <View
                style={[styles.itemContainer, item === '1' ? { paddingBottom: 45 } : {}]}>
                <FastImage
                    source={item === '1' ? require('../../config/images/public/travel/bannerInternalBasic.jpg') : require('../../config/images/public/travel/bannerInternalAll.jpg')}
                    style={{
                        borderRadius: 10,
                        width: '100%',
                        height: 230,
                    }}
                />
                <View style={{ alignItems: 'center', marginTop: -30, marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: Color, textTransform: 'uppercase' }}>{item === '1' ? 'GÓI BẢO HIỂM VÀNG' : 'GÓI BẢO HIỂM KIM CƯƠNG'}</Text>
                    <View style={{ marginTop: 5, height: 3, width: '50%', borderRadius: 35, backgroundColor: NewColor }} />
                    {
                        item === '2' ? (
                            <>
                                <Text style={{ marginTop: 10, fontSize: 12, fontWeight: 'bold', color: NewColor }}>
                                    GỒM TẤT CẢ QUYỀN LỢI CỦA GÓI VÀNG
                                </Text>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: NewColor }}>
                                    và
                                </Text>
                            </>
                        ) : null
                    }
                </View>
                {
                    benefits.map((obj, index) => (
                        <View style={{ flexDirection: 'row', marginBottom: index === 2 ? 16 : 8, paddingHorizontal: 5 }}>
                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <Text style={{ fontSize: 12, fontWeight: '400', color: '#8D8C8D', textAlign: 'right' }}>
                                    {obj.label}
                                </Text>
                            </View>
                            <View style={{ width: 15 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>
                                    {obj.value}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        );
    };

    handleNext = (props) => {
        const { saveTravelPackages, travelInfo } = this.props;
        const { feeTravel, originalFee } = this.state;
        let params = {
            pack: props?.values,
            feeTravel,
            originalFee,
            idArea: travelInfo?.info?.dataAreaType?.id,
            dayNumber: travelInfo?.info?.longDays,
            codeCountry: travelInfo?.info?.dataNationType?.countryCode,
            isValidPackage: true,
        };
        Actions.BuyerTravel();
        saveTravelPackages(params);
    };

    validation = Yup.object().shape({
        insuranceType: Yup.string().required('Không được bỏ trống'),
        peopleNumber: Yup.string()
            .required('Không được bỏ trống')
            .test('peopleNumber', 'Số người trong đoàn phải lớn hơn 0', (
                values,
            ) => values > 0),
    });

    render() {
        const headerZIndex = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [999, 1001, 1002],
                extrapolate: 'clamp'
            });
        
        const { travelInfo, travelPackages } = this.props;
        const {
            feeTravel,
            originalFee,
            modalNational,
            modalInternational
        } = this.state;
        const FormikInput = handleTextInput(Input);
        const FormikSelect = handleTextInput(InputSelect);
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={{ flex: 1 }}>
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
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }],
                            { useNativeDriver: false }
                        )}>
                        <View style={styles.contentContainer}>
                            <SelectCompany productCode={'T1'} />
                            <CheckInfoTravel horizontal={24} />
                            <View style={styles.titleContainer}>
                                <IconDiamondSvg height={13} width={13 * 25 / 19} />
                                <Text style={styles.titleStyle}>
                                    Chọn gói bảo hiểm
                                </Text>
                            </View>

                            <Formik
                                initialValues={{
                                    insuranceType: this.renderTravelPackage() || '',
                                    dataInsuranceType: this.renderDataTravelPackage() || {},
                                    peopleNumber: travelPackages?.pack?.peopleNumber || '',
                                    selectedInsur: travelPackages?.pack?.selectedInsur || 0,
                                }}
                                enableReinitialize={true}
                                validationSchema={this.validation}
                                isInitialValid={travelPackages?.isValidPackage || false}>
                                {props => {
                                    return (
                                        <View style={{ marginHorizontal: 24 }}>
                                            <ModalNational
                                                open={modalNational}
                                                onClosed={() => this.setModalNational(null)}
                                                setSex={(data) => this.setInsuranceType(data, props, 'VNĐ')}
                                                onOpened={() => this.setModalNational(true)}
                                            />
                                            <ModalInternational
                                                open={modalInternational}
                                                onClosed={() => this.setModalInternational(null)}
                                                setSex={(data) => this.setInsuranceType(data, props)}
                                                onOpened={() => this.setModalInternational(true)}
                                                selectedInsur={props.values.selectedInsur}
                                                dataSelected={props.values.dataInsuranceType}
                                            />
                                            {
                                                travelInfo?.info?.dataAreaType?.id === 1 ? (
                                                    <FormikSelect
                                                        label={'Số tiền bảo hiểm *'}
                                                        name={'insuranceType'}
                                                        openModal={() => this.setModalNational(true)}
                                                    />
                                                ) : (
                                                    <FormikSelect
                                                        label={'Số tiền bảo hiểm *'}
                                                        name={'insuranceType'}
                                                        openModal={() => this.setModalInternational(true)}
                                                    />
                                                )
                                            }
                                            <FormikInput
                                                label={'Số người trong đoàn *'}
                                                name={'peopleNumber'}
                                                value={formatVND(props.values.peopleNumber?.toString())}
                                                onChangeText={(e) => this.changePeopleNumber(e, props)}
                                                keyboardType={'number-pad'}
                                                maxLength={10}
                                                onBlur={() => this.handleBlurPeopleNumber(props)}
                                            />
                                            <View style={{ marginTop: 20, marginHorizontal: -24 }}>
                                                {
                                                    travelInfo?.info?.dataAreaType?.id === 1 ? (
                                                        <Carousel
                                                            data={['1']}
                                                            renderItem={() => this._renderItem(props)}
                                                            sliderWidth={SLIDER_WIDTH}
                                                            itemWidth={ITEM_WIDTH}
                                                            inactiveSlideShift={0}
                                                            scrollInterpolator={scrollInterpolator}
                                                            slideInterpolatedStyle={animatedStyles}
                                                            useScrollView={true}
                                                        />
                                                    ) : (
                                                        <Carousel
                                                            data={['1', '2']}
                                                            renderItem={({ item }) => this.renderItem(item, props)}
                                                            sliderWidth={SLIDER_WIDTH}
                                                            itemWidth={ITEM_WIDTH}
                                                            inactiveSlideShift={0}
                                                            firstItem={props.values.selectedInsur}
                                                            onSnapToItem={(index) => this.setItem(index, props)}
                                                            scrollInterpolator={scrollInterpolator}
                                                            slideInterpolatedStyle={animatedStyles}
                                                            useScrollView={true}
                                                        />
                                                    )
                                                }
                                            </View>
                                            <View style={{ paddingBottom: 18 }}>
                                                <TotalFee
                                                    insuranceValue={props.values.dataInsuranceType?.insuranceValue}
                                                    peopleNumber={props.values.peopleNumber}
                                                    longDays={travelInfo?.info?.longDays}
                                                    areaId={travelInfo?.info?.dataAreaType?.id}
                                                    feeTravel={feeTravel}
                                                    originalFee={originalFee}
                                                />
                                            </View>
                                            <FooterButton>
                                                <Button
                                                    label={'TIẾP TỤC'}
                                                    marginTop={26}
                                                    width={'100%'}
                                                    onPress={() => this.handleNext(props)}
                                                    disabled={
                                                        props.values.insuranceType?.length === 0 ||
                                                        props.values.peopleNumber?.length === 0 ||
                                                        (feeTravel === 0)
                                                    }
                                                />
                                            </FooterButton>
                                        </View>
                                    );
                                }}
                            </Formik>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        marginTop: 15,
        marginHorizontal: 24,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderRadius: 10,
        padding: 16,
    },
    titleInfo: {
        flexDirection: 'row',
        paddingTop: 12
    },
    textStyle: {
        fontSize: 14,
        color: '#8D8C8D'
    },
    dataStyle: {
        fontSize: 14,
        color: TxtColor,
        textAlign: 'right'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    itemContainer: {
        marginHorizontal: 8,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: NewColor,
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
    lineTime: {
        marginTop: 4,
        height: 1,
        backgroundColor: '#8D8C8D',
    },
    contentTime: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: '400',
        color: '#8D8C8D',
    },
    titleTime: {
        fontSize: 12,
        fontWeight: '400',
        color: '#8D8C8D',
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
    titleHeader: {
        paddingHorizontal: 8,
        marginTop: 100,
    },
    formInputContainer: {
        alignSelf: 'center',
        padding: 20,
        width: widthPercentageToDP('85'),
        backgroundColor: Color,

        borderRadius: 8,
        elevation: 5,
    },
    containerItem: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    icCategory: {
        height: 40,
        width: 40,
    },
    formTitleStyle: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleSelect: {
        fontSize: 12,
        fontWeight: '400',
        color: '#fff',
        marginTop: 16,
    },
    titleItem: {
        fontSize: 14,
        fontWeight: '400',
        color: TxtColor,
    },
    titleDetail: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: '400',
        color: TxtColor,
        textDecorationLine: 'underline',
    },
    buttonStyle: {
        width: '90%',
        backgroundColor: '#F37A15',
        marginTop: 15,
    },
    selectedButtonStyle: {
        width: '90%',
        backgroundColor: 'white',
        marginTop: 15,
        borderColor: '#F37A15',
        borderWidth: 1,
    },
    titleContainer: {
        paddingHorizontal: 24,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTitle,
        marginLeft: 10,
    },
    table: {
        flex: 1,
        alignSelf: 'center',
        width: widthPercentageToDP('87'),
        backgroundColor: '#F6F5F6',
        borderRadius: 10,
        marginVertical: 16,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        shadowColor: 'rgba(0, 107, 153, 0.1)',
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
    feeStyle: {
        fontSize: 20,
        color: '#F37A15',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    packDetailStyle: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#CCE8F9',
    },
    animatedHeaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
        paddingTop: 24,
    },
});

const mapStateToProps = state => {
    const listCompany = state.selectCompany.listCompany['T1'];
    const idComSelected = state.selectCompany.idComSelected['T1'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        codeSelected: obj?.insurOrg?.code || '',
        travelInfo: state.travelInsurance.travelInfo,
        travelPackages: state.travelInsurance.travelPackages,
        dataTokenInsur: state.insurance.tokenInsur['T1'],
    };
};
const mapDispatchToProps = dispatch => {
    return {
        saveTravelPackages: body => dispatch(saveTravelPackages(body)),
        getSellInfo: () => dispatch(getSellInfo()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccidentPackage);
