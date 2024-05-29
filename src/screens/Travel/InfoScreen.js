import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Linking,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import {
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { Color, NewColor, ErrTxtColor, colorText, ColorSelect, TxtColor, textDisable } from '../../config/System';
import FastImage from 'react-native-fast-image';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import ModalArea from './components/ModalArea';
import ModalNation from './components/ModalNation';
import ModalProvince from './components/ModalProvince';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import Input from './components/Input';
import InputSelect from './components/InputSelect';
import { saveInfoTravel } from './actions/travelActions';
import DateFill from '../../components/dateTimeFill/DateFill';
import { ERROR_NEXT_DATE } from '../../config/ErrorMessage';

class AccidentPackage extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            modalArea: null,
            modalNation: null,
            modalProvince: null,
        };
    }

    backToInsuranceType = () => {
        Actions.pop();
    };

    setModalArea = (value) => {
        this.setState({ modalArea: value });
    };

    setArea = (data, props) => {
        props.setFieldValue('areaType', data.name);
        props.setFieldValue('moneyType', data.id === 1 ? 'VNĐ' : 'USD');
        props.setFieldValue('dataAreaType', data);
        props.setFieldValue('nationType', '');
        props.setFieldValue('dataNationType', {});
        props.setFieldValue('provinceType', '');
        props.setFieldValue('dataProvinceType', {});
    };

    setModalNation = (value) => {
        this.setState({ modalNation: value });
    };

    setNation = (data, props) => {
        props.setFieldValue('nationType', data.name);
        props.setFieldValue('dataNationType', data);
    };

    setModalProvince = (value) => {
        this.setState({ modalProvince: value });
    };

    setProvince = (data, props) => {
        props.setFieldValue('provinceType', data._name);
        props.setFieldValue('dataProvinceType', data);
    };

    onPickerStart = (text, err, props) => {
        props.setFieldValue('startDateString', text);
        props.setFieldValue('errStartDateString', err);
        if (props.values.endDateString.length > 0 && !err) {
            const days = moment(props.values.endDateString, 'DD/MM/YYYY').diff(moment(text, 'DD/MM/YYYY'), 'days');
            if (days + 1 <= 0) {
                props.setFieldValue('errToDate', 'Phải lớn hơn hoặc bằng ngày đi');
            } else if (days + 1 > 180) {
                props.setFieldValue('longDays', (days + 1).toString());
                props.setFieldValue('errToDate', 'Số ngày du lịch không được lớn hơn 180 ngày');
            } else {
                props.setFieldValue('longDays', (days + 1).toString());
                props.setFieldValue('errToDate', '');
            }
        }
    };

    onPickerEnd = (text, err, props) => {
        props.setFieldValue('endDateString', text);
        props.setFieldValue('errEndDateString', err);
        if (props.values.startDateString.length > 0 && !err) {
            const days = moment(text, 'DD/MM/YYYY').diff(moment(props.values.startDateString, 'DD/MM/YYYY'), 'days');
            if (days + 1 <= 0) {
                props.setFieldValue('longDays', '0');
                props.setFieldValue('errToDate', 'Phải lớn hơn hoặc bằng ngày đi');
            } else if (days + 1 > 180) {
                props.setFieldValue('longDays', (days + 1).toString());
                props.setFieldValue('errToDate', 'Số ngày du lịch không được lớn hơn 180 ngày');
            } else {
                props.setFieldValue('longDays', (days + 1).toString());
                props.setFieldValue('errToDate', '');
            }
        }
    };

    validation = Yup.object().shape({
        areaType: Yup.string().required('Không được bỏ trống'),
        startDateString: Yup.string().required('Không được bỏ trống'),
        endDateString: Yup.string().required('Không được bỏ trống'),
    });

    handleNext = (props) => {
        const { saveInfoTravel } = this.props;
        let params = {
            info: props?.values,
            isValidPackage: true,
        };
        Actions.TravelPackage();
        saveInfoTravel(params);
    };

    render() {
        const { travelInfo } = this.props;
        const { modalArea, modalNation, modalProvince } = this.state;

        const headerZIndex = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [999, 1001, 1002],
                extrapolate: 'clamp'
            });
        
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
                            onPress={this.backToInsuranceType}
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
                        <HeaderScroll code={'T1'} offset={this.scrollYAnimatedValue} marginDiff />
                    </View>
                    <ScrollView
                        style={{ zIndex: 1000 }}
                        contentContainerStyle={{
                            paddingBottom: 20,
                            paddingTop: HEADER_MAX_HEIGHT
                        }}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }],
                            { useNativeDriver: false }
                        )}>
                        <View style={styles.formInputContainer}>
                            <View>
                                <Text style={styles.formTitleStyle}>
                                    MUA BẢO HIỂM DU LỊCH
                                </Text>
                            </View>
                            <Text style={[styles.titleDetail, { textAlign: 'center', marginTop: 6 }]}>
                                Xem chi tiết quyền lợi:
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 6 }}>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL('https://epti-documents.s3-ap-southeast-1.amazonaws.com/Quy+tac+du+lich+trong+nuoc-V.pdf')}
                                >
                                    <Text style={[styles.titleDetail, { textDecorationLine: 'underline' }]}>
                                        Trong nước
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ width: 1.5, height: 15, backgroundColor: 'white', marginHorizontal: 10 }} />
                                <TouchableOpacity
                                    onPress={() => Linking.openURL('https://epti-documents.s3-ap-southeast-1.amazonaws.com/BH+du+l%E1%BB%8Bch+qu%E1%BB%91c+t%E1%BA%BF+262.pdf')}
                                >
                                    <Text style={[styles.titleDetail, { textDecorationLine: 'underline' }]}>
                                        Quốc tế
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Formik
                                initialValues={{
                                    areaType: travelInfo?.info?.areaType || '',
                                    nationType: travelInfo?.info?.nationType || '',
                                    provinceType: travelInfo?.info?.provinceType || '',
                                    dataAreaType: travelInfo?.info?.dataAreaType || {},
                                    dataNationType: travelInfo?.info?.dataNationType || {},
                                    dataProvinceType: travelInfo?.info?.dataProvinceType || {},
                                    startDateString: travelInfo?.info?.startDateString || '',
                                    endDateString: travelInfo?.info?.endDateString || '',
                                    errToDate: travelInfo?.info?.errToDate || '',
                                    longDays: travelInfo?.info?.longDays || '',
                                    moneyType: travelInfo?.info?.moneyType || '',
                                }}
                                enableReinitialize={true}
                                validationSchema={this.validation}
                                isInitialValid={travelInfo?.isValidPackage || false}>
                                {props => {
                                    return (
                                        <View>
                                            <ModalArea
                                                open={modalArea}
                                                onClosed={() => this.setModalArea(null)}
                                                setSex={(data) => this.setArea(data, props)}
                                                onOpened={() => this.setModalArea(true)}
                                            />
                                            <ModalNation
                                                open={modalNation}
                                                onClosed={() => this.setModalNation(null)}
                                                setSex={(data) => this.setNation(data, props)}
                                                onOpened={() => this.setModalNation(true)}
                                                areaId={props.values.dataAreaType.id}
                                            />
                                            <ModalProvince
                                                open={modalProvince}
                                                onClosed={() => this.setModalProvince(null)}
                                                setSex={(data) => this.setProvince(data, props)}
                                                onOpened={() => this.setModalProvince(true)}
                                            />
                                            <View style={styles.itemStyle}>
                                                <FormikSelect
                                                    label={'Điểm đến *'}
                                                    name={'areaType'}
                                                    openModal={() => this.setModalArea(true)}
                                                    marginTop={props.values.areaType.length > 0 ? 0 : -15}
                                                />
                                            </View>
                                            <View style={styles.itemStyle}>
                                                {
                                                    props.values.dataAreaType.id === 1 ? (
                                                        <FormikSelect
                                                            label={'Tỉnh/Thành phố *'}
                                                            name={'provinceType'}
                                                            openModal={() => this.setModalProvince(true)}
                                                            marginTop={props.values.provinceType.length > 0 ? 0 : -15}
                                                            checkDisabled={!props.values.areaType}
                                                            hideIcon={!props.values.areaType}
                                                            baseColor={props.values.areaType ? colorText : textDisable}
                                                        />
                                                    ) : (
                                                        <FormikSelect
                                                            label={`Tên nước đến${props.values.areaType ? ' *' : ''}`}
                                                            name={'nationType'}
                                                            openModal={() => this.setModalNation(true)}
                                                            areaId={props.values.dataAreaType.id}
                                                            marginTop={props.values.nationType.length > 0 ? 0 : -15}
                                                            checkDisabled={!props.values.areaType}
                                                            hideIcon={!props.values.areaType}
                                                            baseColor={props.values.areaType ? colorText : textDisable}
                                                        />
                                                    )
                                                }
                                            </View>
                                            <View style={styles.itemStyle}>
                                                <FormikInput
                                                    label={'Loại tiền tệ'}
                                                    name={'moneyType'}
                                                    marginTop={props.values.areaType.length > 0 ? 0 : -15}
                                                    editable={false}
                                                    baseColor={textDisable}
                                                    textColor={textDisable}
                                                />
                                            </View>
                                            <View style={styles.itemStyle}>
                                                {/* <ModalTimePicker
                                                    dateDefault={new Date(moment().add(1, 'days').valueOf())}
                                                    minimumDate={new Date(moment().add(1, 'days').valueOf())}
                                                    onPicker={(text, dataDate) => this.onPickerStart(text, dataDate, props)}
                                                >
                                                    <FormikInput
                                                        label={'Ngày đi *'}
                                                        name={'startDateString'}
                                                        marginTop={props.values.startDateString.length > 0 ? 0 : -15}
                                                        editable={false}
                                                    />
                                                </ModalTimePicker> */}
                                                <DateFill
                                                    value={props.values.startDateString}
                                                    onChange={(text, err) => {
                                                        this.onPickerStart(text, err, props);
                                                    }}
                                                    label={'Ngày đi *'}
                                                    minimumDate={moment().add(1, 'days').format('DD/MM/YYYY')}
                                                    errMinimum={ERROR_NEXT_DATE}
                                                    requireFill
                                                    hideLine
                                                />
                                            </View>
                                            <View style={styles.itemStyle}>
                                                {/* <ModalTimePicker
                                                    dateDefault={new Date(moment().add(1, 'days').valueOf())}
                                                    minimumDate={new Date(moment().add(1, 'days').valueOf())}
                                                    onPicker={(text, dataDate) => this.onPickerEnd(text, dataDate, props)}
                                                >
                                                    <FormikInput
                                                        label={'Ngày về *'}
                                                        name={'endDateString'}
                                                        marginTop={props.values.endDateString.length > 0 ? 0 : -15}
                                                        editable={false}
                                                    />
                                                </ModalTimePicker> */}
                                                <DateFill
                                                    value={props.values.endDateString}
                                                    onChange={(text, err) => {
                                                        this.onPickerEnd(text, err, props);
                                                    }}
                                                    label={'Ngày về *'}
                                                    minimumDate={moment().add(1, 'days').format('DD/MM/YYYY')}
                                                    errMinimum={ERROR_NEXT_DATE}
                                                    requireFill
                                                    hideLine
                                                />
                                            </View>
                                            {
                                                props.values.errToDate.length > 0 ?
                                                    <Text style={{ color: ErrTxtColor, fontSize: 13, fontWeight: '600', marginTop: 5 }}>
                                                        {props.values.errToDate}
                                                    </Text>
                                                    : null
                                            }
                                            <View style={styles.itemStyle}>
                                                <FormikInput
                                                    label={'Số ngày du lịch'}
                                                    name={'longDays'}
                                                    marginTop={props.values.longDays.length > 0 ? 0 : -15}
                                                    editable={false}
                                                    baseColor={textDisable}
                                                    textColor={textDisable}
                                                />
                                            </View>
                                            <FooterButton background={Color}>
                                                <Button
                                                    label={'GỬI THÔNG TIN'}
                                                    backgroundColor={ColorSelect}
                                                    marginTop={26}
                                                    width={'100%'}
                                                    onPress={() => this.handleNext(props)}
                                                    disabled={
                                                        !props.isValid ||
                                                        props.values.errToDate.length > 0 ||
                                                        props.values.errStartDateString ||
                                                        props.values.errEndDateString ||
                                                        (props.values.dataAreaType.id === 1 ? props.values.provinceType.length === 0 : props.values.nationType.length === 0)
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
    itemStyle: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginTop: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    itemContainer: {
        marginHorizontal: 15,
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
        marginTop: -50,
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
        fontSize: 16,
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
        fontSize: 14,
        color: 'white',
        fontWeight: '600',
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
        fontSize: 18,
        fontWeight: 'bold',
        color: Color,
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
});

const mapStateToProps = state => {
    return {
        travelInfo: state.travelInsurance.travelInfo,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        saveInfoTravel: body => dispatch(saveInfoTravel(body)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccidentPackage);
