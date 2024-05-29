import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Linking,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import {
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import {
    isCodeSeatNumber,
} from '../../components/Functions';
import { Color, NewColor, ErrTxtColor, URL, TxtColor, ColorSelect, colorTitle } from '../../config/System';
import FastImage from 'react-native-fast-image';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import ModalFlightType from './components/ModalFlightType';
import ModalToPlace from './components/ModalToPlace';
import ModalFromPlace from './components/ModalFromPlace';
import ModalDepartFlight from './components/ModalDepartFlight';
import ModalReturnFlight from './components/ModalReturnFlight';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import DateFill from '../../components/dateTimeFill/DateFill';
import ModalControlTimer from './components/ModalControlTimer';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX } from '../../utils/Util';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import Input from './components/Input';
import InputSelect from './components/InputSelect';
import { saveInfoDelayFlight, saveCodeNumber } from './actions/actions';
import Store from '../../services/Store';
import Const from '../../services/Const';
import axios from 'axios';
import SvgUri from 'react-native-svg-uri';
import { formatHours } from '../../components/Functions';
import { ERROR_6_HOURS, ERROR_NEXT_DATE } from '../../config/ErrorMessage';

class AccidentPackage extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            modalFlightType: null,
            modalToPlace: null,
            modalFromPlace: null,
            modalDepartFlight: null,
            modalReturnFlight: null,
            isLoading: false,
        };
    }

    backToInsuranceType = () => {
        Actions.pop();
    };

    setModalFlightType = (value) => {
        this.setState({ modalFlightType: value });
    };

    setFlightType = (data, props) => {
        if (data.name === 'Một chiều') {
            props.setFieldValue('endDateString', '');
        }
        props.setFieldValue('flightType', data.name);

        if (props.values.showFormFlight) {
            props.setFieldValue('departFlight', {});
            props.setFieldValue('returnFlight', {});
            props.setFieldValue('showFormFlight', false);
            props.setFieldValue('showDepartCreate', false);
            props.setFieldValue('numberDepart', '');
            props.setFieldValue('codeDepart', '');
            props.setFieldValue('hourDepart', '');
            props.setFieldValue('endDateDepart', '');
            props.setFieldValue('hourDepartArrive', '');
            props.setFieldValue('showReturnCreate', false);
            props.setFieldValue('numberReturn', '');
            props.setFieldValue('codeReturn', '');
            props.setFieldValue('hourReturn', '');
            props.setFieldValue('endDateReturn', '');
            props.setFieldValue('hourReturnArrive', '');
            props.setFieldValue('listDepart', []);
            props.setFieldValue('listReturn', []);
            props.setFieldValue('errHourDepart', '');
            props.setFieldValue('errHourDepartArrive', '');
            props.setFieldValue('errHourReturn', '');
            props.setFieldValue('errHourReturnArrive', '');
        }
    };

    setModalToPlace = (value) => {
        this.setState({ modalToPlace: value });
    };

    setToPlace = (data, props) => {
        props.setFieldValue('toPlace', `${data.name} ${data.iata}, ${data.nation.name === 'Viet Nam' ? 'Việt Nam' : data.nation.name}`);
        props.setFieldValue('dataToPlace', data);

        if (props.values.showFormFlight) {
            props.setFieldValue('departFlight', {});
            props.setFieldValue('returnFlight', {});
            props.setFieldValue('showFormFlight', false);
            props.setFieldValue('showDepartCreate', false);
            props.setFieldValue('numberDepart', '');
            props.setFieldValue('codeDepart', '');
            props.setFieldValue('hourDepart', '');
            props.setFieldValue('endDateDepart', '');
            props.setFieldValue('hourDepartArrive', '');
            props.setFieldValue('showReturnCreate', false);
            props.setFieldValue('numberReturn', '');
            props.setFieldValue('codeReturn', '');
            props.setFieldValue('hourReturn', '');
            props.setFieldValue('endDateReturn', '');
            props.setFieldValue('hourReturnArrive', '');
            props.setFieldValue('listDepart', []);
            props.setFieldValue('listReturn', []);
            props.setFieldValue('errHourDepart', '');
            props.setFieldValue('errHourDepartArrive', '');
            props.setFieldValue('errHourReturn', '');
            props.setFieldValue('errHourReturnArrive', '');
        }
    };

    setModalFromPlace = (value) => {
        this.setState({ modalFromPlace: value });
    };

    setFromPlace = (data, props) => {
        props.setFieldValue('fromPlace', `${data.name} ${data.iata}, ${data.nation.name === 'Viet Nam' ? 'Việt Nam' : data.nation.name}`);
        props.setFieldValue('dataFromPlace', data);

        if (props.values.showFormFlight) {
            props.setFieldValue('departFlight', {});
            props.setFieldValue('returnFlight', {});
            props.setFieldValue('showFormFlight', false);
            props.setFieldValue('showDepartCreate', false);
            props.setFieldValue('numberDepart', '');
            props.setFieldValue('codeDepart', '');
            props.setFieldValue('hourDepart', '');
            props.setFieldValue('endDateDepart', '');
            props.setFieldValue('hourDepartArrive', '');
            props.setFieldValue('showReturnCreate', false);
            props.setFieldValue('numberReturn', '');
            props.setFieldValue('codeReturn', '');
            props.setFieldValue('hourReturn', '');
            props.setFieldValue('endDateReturn', '');
            props.setFieldValue('hourReturnArrive', '');
            props.setFieldValue('listDepart', []);
            props.setFieldValue('listReturn', []);
            props.setFieldValue('errHourDepart', '');
            props.setFieldValue('errHourDepartArrive', '');
            props.setFieldValue('errHourReturn', '');
            props.setFieldValue('errHourReturnArrive', '');
        }
    };

    setModalDepartFlight = (value) => {
        this.setState({ modalDepartFlight: value });
    };

    setDepartFlight = (data, props) => {
        props.setFieldValue('departFlight', data);
        if (props.values.showDepartCreate) {
            props.setFieldValue('showDepartCreate', false);
            props.setFieldValue('numberDepart', '');
            props.setFieldValue('codeDepart', '');
            props.setFieldValue('hourDepart', '');
            props.setFieldValue('endDateDepart', '');
            props.setFieldValue('hourDepartArrive', '');
            props.setFieldValue('errHourDepart', '');
            props.setFieldValue('errHourDepartArrive', '');
        }
        if (props.values.hourReturn?.length > 0) {
            if (moment(`${props.values.endDateString} ${props.values.hourReturn}`, 'DD/MM/YYYY HH:mm').diff(moment(data.estimateArriveTime), 'minutes') <= 0) {
                props.setFieldValue('errHourReturn', 'Phải lớn hớn giờ đến chiều đi');
            } else {
                props.setFieldValue('errHourReturn', '');
            }
        }
    };

    setModalReturnFlight = (value) => {
        this.setState({ modalReturnFlight: value });
    };

    setReturnFlight = (data, props) => {
        props.setFieldValue('returnFlight', data);
        if (props.values.showReturnCreate) {
            props.setFieldValue('showReturnCreate', false);
            props.setFieldValue('numberReturn', '');
            props.setFieldValue('codeReturn', '');
            props.setFieldValue('hourReturn', '');
            props.setFieldValue('endDateReturn', '');
            props.setFieldValue('hourReturnArrive', '');
            props.setFieldValue('errHourReturn', '');
            props.setFieldValue('errHourReturnArrive', '');
        }
    };

    onPickerStart = (text, err, props) => {
        props.setFieldValue('startDateString', text);
        props.setFieldValue('errStartDateString', err);

        if (props.values.showFormFlight) {
            props.setFieldValue('departFlight', {});
            props.setFieldValue('returnFlight', {});
            props.setFieldValue('showFormFlight', false);
            props.setFieldValue('showDepartCreate', false);
            props.setFieldValue('numberDepart', '');
            props.setFieldValue('codeDepart', '');
            props.setFieldValue('hourDepart', '');
            props.setFieldValue('endDateDepart', '');
            props.setFieldValue('hourDepartArrive', '');
            props.setFieldValue('showReturnCreate', false);
            props.setFieldValue('numberReturn', '');
            props.setFieldValue('codeReturn', '');
            props.setFieldValue('hourReturn', '');
            props.setFieldValue('endDateReturn', '');
            props.setFieldValue('hourReturnArrive', '');
            props.setFieldValue('listDepart', []);
            props.setFieldValue('listReturn', []);
            props.setFieldValue('errHourDepart', '');
            props.setFieldValue('errHourDepartArrive', '');
            props.setFieldValue('errHourReturn', '');
            props.setFieldValue('errHourReturnArrive', '');
        }
    };

    onPickerHourDepart = (text, props) => {
        props.setFieldValue('hourDepart', text);
        if (moment(`${props.values.startDateString} ${text}`, 'DD/MM/YYYY HH:mm').diff(moment(), 'hours') < 6) {
            props.setFieldValue('errHourDepart', 'Giờ đi phải lớn hơn hiện tại 6 giờ');
        } else {
            props.setFieldValue('errHourDepart', '');
        }
        if (props.values.endDateDepart?.length > 0 && props.values.hourDepartArrive?.length > 0) {
            if (moment(`${props.values.endDateDepart} ${props.values.hourDepartArrive}`, 'DD/MM/YYYY HH:mm').diff(moment(`${props.values.startDateString} ${text}`, 'DD/MM/YYYY HH:mm'), 'minutes') <= 0) {
                props.setFieldValue('errHourDepartArrive', 'Thời gian đến phải lớn hơn thời gian đi');
            } else {
                props.setFieldValue('errHourDepartArrive', '');
            }
        }
    };

    onPickerHourDepartArrive = (text, props) => {
        props.setFieldValue('hourDepartArrive', text);
        if (moment(`${props.values.endDateDepart} ${text}`, 'DD/MM/YYYY HH:mm').diff(moment(`${props.values.startDateString} ${props.values.hourDepart}`, 'DD/MM/YYYY HH:mm'), 'minutes') <= 0) {
            props.setFieldValue('errHourDepartArrive', 'Thời gian đến phải lớn hơn thời gian đi');
        } else {
            props.setFieldValue('errHourDepartArrive', '');
        }
        if (props.values.hourReturn?.length > 0) {
            if (moment(`${props.values.endDateString} ${props.values.hourReturn}`, 'DD/MM/YYYY HH:mm').diff(moment(`${props.values.endDateDepart} ${text}`, 'DD/MM/YYYY HH:mm'), 'minutes') <= 0) {
                props.setFieldValue('errHourReturn', 'Phải lớn hớn giờ đến chiều đi');
            } else {
                props.setFieldValue('errHourReturn', '');
            }
        }
    };

    onPickerHourReturn = (text, props) => {
        props.setFieldValue('hourReturn', text);
        const timer = props.values.showDepartCreate ?
            moment(`${props.values.endDateDepart} ${props.values.hourDepartArrive}`, 'DD/MM/YYYY HH:mm') :
            moment(props.values.departFlight?.estimateArriveTime);
        if (moment(`${props.values.endDateString} ${text}`, 'DD/MM/YYYY HH:mm').diff(timer, 'minutes') <= 0) {
            props.setFieldValue('errHourReturn', 'Phải lớn hớn giờ đến chiều đi');
        } else {
            props.setFieldValue('errHourReturn', '');
        }
        if (props.values.endDateReturn?.length > 0 && props.values.hourReturnArrive?.length > 0) {
            if (moment(`${props.values.endDateReturn} ${props.values.hourReturnArrive}`, 'DD/MM/YYYY HH:mm').diff(moment(`${props.values.endDateString} ${text}`, 'DD/MM/YYYY HH:mm'), 'minutes') <= 0) {
                props.setFieldValue('errHourReturnArrive', 'Thời gian đến phải lớn hơn thời gian đi');
            } else {
                props.setFieldValue('errHourReturnArrive', '');
            }
        }
    };

    onPickerHourReturnArrive = (text, props) => {
        props.setFieldValue('hourReturnArrive', text);
        if (moment(`${props.values.endDateReturn} ${text}`, 'DD/MM/YYYY HH:mm').diff(moment(`${props.values.endDateString} ${props.values.hourReturn}`, 'DD/MM/YYYY HH:mm'), 'minutes') <= 0) {
            props.setFieldValue('errHourReturnArrive', 'Thời gian đến phải lớn hơn thời gian đi');
        } else {
            props.setFieldValue('errHourReturnArrive', '');
        }
    };

    onPickerEnd = (text, err, props) => {
        props.setFieldValue('endDateString', text);
        props.setFieldValue('errEndDateString', err);

        if (props.values.showFormFlight) {
            props.setFieldValue('departFlight', {});
            props.setFieldValue('returnFlight', {});
            props.setFieldValue('showFormFlight', false);
            props.setFieldValue('showDepartCreate', false);
            props.setFieldValue('numberDepart', '');
            props.setFieldValue('codeDepart', '');
            props.setFieldValue('hourDepart', '');
            props.setFieldValue('endDateDepart', '');
            props.setFieldValue('hourDepartArrive', '');
            props.setFieldValue('showReturnCreate', false);
            props.setFieldValue('numberReturn', '');
            props.setFieldValue('codeReturn', '');
            props.setFieldValue('hourReturn', '');
            props.setFieldValue('endDateReturn', '');
            props.setFieldValue('hourReturnArrive', '');
            props.setFieldValue('listDepart', []);
            props.setFieldValue('listReturn', []);
            props.setFieldValue('errHourDepart', '');
            props.setFieldValue('errHourDepartArrive', '');
            props.setFieldValue('errHourReturn', '');
            props.setFieldValue('errHourReturnArrive', '');
        }
    };

    onPickerEndDepart = (text, err, props) => {
        props.setFieldValue('endDateDepart', text);
        props.setFieldValue('errEndDateDepart', err);
        if (props.values.hourDepartArrive?.length > 0 && !err) {
            if (moment(`${text} ${props.values.hourDepartArrive}`, 'DD/MM/YYYY HH:mm').diff(moment(`${props.values.startDateString} ${props.values.hourDepart}`, 'DD/MM/YYYY HH:mm'), 'minutes') <= 0) {
                props.setFieldValue('errHourDepartArrive', 'Thời gian đến phải lớn hơn thời gian đi');
            } else {
                props.setFieldValue('errHourDepartArrive', '');
            }
        }
    };

    onPickerEndReturn = (text, err, props) => {
        props.setFieldValue('endDateReturn', text);
        props.setFieldValue('errEndDateReturn', err);
        if (props.values.hourReturnArrive?.length > 0 && !err) {
            if (moment(`${text} ${props.values.hourReturnArrive}`, 'DD/MM/YYYY HH:mm').diff(moment(`${props.values.endDateString} ${props.values.hourReturn}`, 'DD/MM/YYYY HH:mm'), 'minutes') <= 0) {
                props.setFieldValue('errHourReturnArrive', 'Thời gian đến phải lớn hơn thời gian đi');
            } else {
                props.setFieldValue('errHourReturnArrive', '');
            }
        }
    };

    validation = Yup.object().shape({
        numberDepart: Yup.string().when('showDepartCreate', {
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .required('Không được bỏ trống')
                .test(
                    'numberDepart',
                    'Sai định dạng',
                    values => isCodeSeatNumber(values), // check validate ký tự đặc biệt
                ),
        }),
        codeDepart: Yup.string().when('showDepartCreate', {
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .required('Không được bỏ trống')
                .test(
                    'codeDepart',
                    'Sai định dạng',
                    values => isCodeSeatNumber(values), // check validate ký tự đặc biệt
                ),
        }),
        hourDepart: Yup.string().when('showDepartCreate', {
            is: true,
            then: Yup.string().required('Không được bỏ trống'),
        }),
        endDateDepart: Yup.string().when('showDepartCreate', {
            is: true,
            then: Yup.string().required('Không được bỏ trống'),
        }),
        hourDepartArrive: Yup.string().when('showDepartCreate', {
            is: true,
            then: Yup.string().required('Không được bỏ trống'),
        }),
        numberReturn: Yup.string().when('showReturnCreate', {
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .required('Không được bỏ trống')
                .test(
                    'numberReturn',
                    'Sai định dạng',
                    values => isCodeSeatNumber(values), // check validate ký tự đặc biệt
                ),
        }),
        codeReturn: Yup.string().when('showReturnCreate', {
            is: true,
            then: Yup.string()
                .strict(false)
                .trim()
                .required('Không được bỏ trống')
                .test(
                    'codeReturn',
                    'Sai định dạng',
                    values => isCodeSeatNumber(values), // check validate ký tự đặc biệt
                ),
        }),
        hourReturn: Yup.string().when('showReturnCreate', {
            is: true,
            then: Yup.string().required('Không được bỏ trống'),
        }),
        endDateReturn: Yup.string().when('showReturnCreate', {
            is: true,
            then: Yup.string().required('Không được bỏ trống'),
        }),
        hourReturnArrive: Yup.string().when('showReturnCreate', {
            is: true,
            then: Yup.string().required('Không được bỏ trống'),
        }),
    });

    onSend = (props) => {
        if (!props.values.showFormFlight) {
            this.listRef.scrollToEnd({ animated: true });
            this.setState({ isLoading: true });
            this.handleNext(props);
        }
    }

    handleNext = (props) => {
        new Store().getSession(Const.TOKEN).then(token => {
            let url = `${URL}/api/vj-flight/v1/flights/schedules?departureAirportCode=${props.values.dataFromPlace.iata}&arrivalAirportCode=${props.values.dataToPlace.iata}&departDate=${props.values.startDateString}&returnDepartDate=${props.values.endDateString}&minHours=6`;
            console.log('URL chuyen bay: ', url);
            axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
                .then((res) => {
                    console.log('List chuyen bay: ', res?.data?.data);
                    if (res?.status === 200) {
                        if (props.values.flightType === 'Khứ hồi') {
                            props.setFieldValue('listDepart', res?.data?.data?.depart);
                            props.setFieldValue('listReturn', res?.data?.data?.return);
                        } else {
                            props.setFieldValue('listDepart', res?.data?.data);
                        }
                        props.setFieldValue('showFormFlight', true);
                        this.setState({ isLoading: false });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
    };

    setShowDepartCreate = (props) => {
        props.setFieldValue('showDepartCreate', true);
        props.setFieldValue('departFlight', {});
    };

    setShowReturnCreate = (props) => {
        props.setFieldValue('showReturnCreate', true);
        props.setFieldValue('returnFlight', {});
    };

    handleSubmit = (props) => {
        const { saveInfoDelayFlight, saveCodeNumber } = this.props;
        let params = {
            info: props?.values,
            isValidPackage: true,
        };
        params.info.numberDepart = props.values.numberDepart.toUpperCase();
        params.info.numberReturn = props.values.numberReturn.toUpperCase();
        saveInfoDelayFlight(params);
        saveCodeNumber({
            codeDepart: props.values.codeDepart.toUpperCase(),
            codeReturn: props.values.codeReturn.toUpperCase(),
        });
        Actions.BuyerDelayFlight();
    };

    setScrollViewRef = element => {
        this.listRef = element;
    };

    render() {
        const { delayFlightInfo, codeNumber } = this.props;
        const { modalFlightType, modalToPlace, modalFromPlace, modalDepartFlight, modalReturnFlight, isLoading } = this.state;

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
                        <ImageHeaderScroll code={'DF1'} offset={this.scrollYAnimatedValue} />
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
                        <HeaderScroll code={'DF1'} offset={this.scrollYAnimatedValue} marginDiff />
                    </View>
                    <ScrollView
                        style={{ zIndex: 1000 }}
                        contentContainerStyle={{
                            paddingBottom: 20,
                            paddingTop: HEADER_MAX_HEIGHT
                        }}
                        ref={this.setScrollViewRef}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
                        )}>
                        <Formik
                            initialValues={{
                                flightType: delayFlightInfo?.info?.flightType || '',
                                fromPlace: delayFlightInfo?.info?.fromPlace || '',
                                dataFromPlace: delayFlightInfo?.info?.dataFromPlace || {},
                                departFlight: delayFlightInfo?.info?.departFlight || {},
                                returnFlight: delayFlightInfo?.info?.returnFlight || {},
                                toPlace: delayFlightInfo?.info?.toPlace || '',
                                dataToPlace: delayFlightInfo?.info?.dataToPlace || {},
                                startDateString: delayFlightInfo?.info?.startDateString || '',
                                endDateString: delayFlightInfo?.info?.endDateString || '',
                                showFormFlight: delayFlightInfo?.info?.showFormFlight || false,
                                showDepartCreate: delayFlightInfo?.info?.showDepartCreate || false,
                                numberDepart: delayFlightInfo?.info?.numberDepart || '',
                                codeDepart: codeNumber?.codeDepart || '',
                                hourDepart: delayFlightInfo?.info?.hourDepart || '',
                                endDateDepart: delayFlightInfo?.info?.endDateDepart || '',
                                hourDepartArrive: delayFlightInfo?.info?.hourDepartArrive || '',
                                showReturnCreate: delayFlightInfo?.info?.showReturnCreate || false,
                                numberReturn: delayFlightInfo?.info?.numberReturn || '',
                                codeReturn: codeNumber?.codeReturn || '',
                                hourReturn: delayFlightInfo?.info?.hourReturn || '',
                                endDateReturn: delayFlightInfo?.info?.endDateReturn || '',
                                hourReturnArrive: delayFlightInfo?.info?.hourReturnArrive || '',
                                listDepart: delayFlightInfo?.info?.listDepart || [],
                                listReturn: delayFlightInfo?.info?.listReturn || [],
                                errHourDepart: '',
                                errHourDepartArrive: '',
                                errHourReturn: '',
                                errHourReturnArrive: '',
                            }}
                            enableReinitialize={true}
                            validationSchema={this.validation}
                            isInitialValid={delayFlightInfo?.isValidPackage || false}>
                            {props => {
                                return (
                                    <View>
                                        <View style={styles.formInputContainer}>
                                            <View>
                                                <Text style={[styles.formTitleStyle, { marginHorizontal: -16 }]}>
                                                    MUA BẢO HIỂM TRỄ CHUYẾN BAY
                                                </Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 6 }}>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        Linking.openURL('https://quytacbaohiem.pti.com.vn/Quy_Tac_NG/Quy_Tac_Delay_Flight.pdf')
                                                    }
                                                >
                                                    <Text style={[styles.titleDetail, { textDecorationLine: 'underline' }]}>
                                                        Thông tin chi tiết
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <ModalFlightType
                                                    open={modalFlightType}
                                                    onClosed={() => this.setModalFlightType(null)}
                                                    setSex={(data) => this.setFlightType(data, props)}
                                                    onOpened={() => this.setModalFlightType(true)}
                                                />
                                                <ModalToPlace
                                                    open={modalToPlace}
                                                    onClosed={() => this.setModalToPlace(null)}
                                                    setSex={(data) => this.setToPlace(data, props)}
                                                    onOpened={() => this.setModalToPlace(true)}
                                                />
                                                <ModalFromPlace
                                                    open={modalFromPlace}
                                                    onClosed={() => this.setModalFromPlace(null)}
                                                    setSex={(data) => this.setFromPlace(data, props)}
                                                    onOpened={() => this.setModalFromPlace(true)}
                                                />
                                                <ModalDepartFlight
                                                    open={modalDepartFlight}
                                                    onClosed={() => this.setModalDepartFlight(null)}
                                                    setDepartFlight={(data) => this.setDepartFlight(data, props)}
                                                    onOpened={() => this.setModalDepartFlight(true)}
                                                    listDepart={props.values.listDepart}
                                                    departSelected={props.values.departFlight}
                                                />
                                                <ModalReturnFlight
                                                    open={modalReturnFlight}
                                                    onClosed={() => this.setModalReturnFlight(null)}
                                                    setReturnFlight={(data) => this.setReturnFlight(data, props)}
                                                    onOpened={() => this.setModalReturnFlight(true)}
                                                    listReturn={props.values.listReturn}
                                                    returnSelected={props.values.returnFlight}
                                                />
                                                <View style={styles.itemStyle}>
                                                    <FormikSelect
                                                        label={'Loại chuyến bay *'}
                                                        name={'flightType'}
                                                        openModal={() => this.setModalFlightType(true)}
                                                        marginTop={props.values.flightType.length > 0 ? 0 : -15}
                                                    />
                                                </View>
                                                <View style={styles.itemStyle}>
                                                    <FormikSelect
                                                        label={'Từ *'}
                                                        name={'fromPlace'}
                                                        openModal={() => this.setModalFromPlace(true)}
                                                        marginTop={props.values.fromPlace.length > 0 ? 0 : -15}
                                                    />
                                                </View>
                                                {
                                                    props.values.fromPlace.length > 0 &&
                                                        props.values.toPlace.length > 0 &&
                                                        props.values.fromPlace === props.values.toPlace ?
                                                        <Text style={{ color: ErrTxtColor, fontSize: 13, fontWeight: '600', marginTop: 5 }}>
                                                            Điểm đi phải khác điểm đến
                                                        </Text>
                                                        : null
                                                }
                                                <View style={styles.itemStyle}>
                                                    <FormikSelect
                                                        label={'Đến *'}
                                                        name={'toPlace'}
                                                        openModal={() => this.setModalToPlace(true)}
                                                        marginTop={props.values.toPlace.length > 0 ? 0 : -15}
                                                    />
                                                </View>
                                                {
                                                    props.values.fromPlace.length > 0 &&
                                                        props.values.toPlace.length > 0 &&
                                                        props.values.fromPlace === props.values.toPlace ?
                                                        <Text style={{ color: ErrTxtColor, fontSize: 13, fontWeight: '600', marginTop: 5 }}>
                                                            Điểm đến phải khác điểm đi
                                                        </Text>
                                                        : null
                                                }
                                                <View style={styles.itemStyle}>
                                                    {/* <ModalTimePicker
                                                        dateDefault={new Date(moment().add(6, 'hours'))}
                                                        minimumDate={new Date(moment().add(6, 'hours'))}
                                                        onPicker={(text) => this.onPickerStart(text, props)}
                                                    >
                                                        <FormikInput
                                                            label={'Ngày đi chiều đi *'}
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
                                                        label={'Ngày đi chiều đi *'}
                                                        minimumDate={moment().add(6, 'hours').format('DD/MM/YYYY')}
                                                        errMinimum={ERROR_6_HOURS}
                                                        requireFill
                                                        hideLine
                                                    />
                                                </View>
                                                {
                                                    props.values.startDateString.length > 0 &&
                                                        props.values.endDateString.length > 0 &&
                                                        moment(props.values.endDateString, 'DD/MM/YYYY').diff(moment(props.values.startDateString, 'DD/MM/YYYY'), 'days') + 1 <= 0 ?
                                                        <Text style={{ color: ErrTxtColor, fontSize: 13, fontWeight: '600', marginTop: 5 }}>
                                                            Ngày đi phải nhỏ hơn hoặc bằng ngày về
                                                        </Text>
                                                        : null
                                                }
                                                {
                                                    props.values.flightType === 'Khứ hồi' ? (
                                                        <>
                                                            <View style={styles.itemStyle}>
                                                                {/* <ModalTimePicker
                                                                    dateDefault={new Date(moment().add(6, 'hours'))}
                                                                    minimumDate={new Date(moment().add(6, 'hours'))}
                                                                    onPicker={(text) => this.onPickerEnd(text, props)}
                                                                >
                                                                    <FormikInput
                                                                        label={'Ngày đi chiều về *'}
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
                                                                    label={'Ngày đi chiều về *'}
                                                                    minimumDate={moment().add(6, 'hours').format('DD/MM/YYYY')}
                                                                    errMinimum={ERROR_6_HOURS}
                                                                    requireFill
                                                                    hideLine
                                                                />
                                                            </View>
                                                            {
                                                                props.values.startDateString.length > 0 &&
                                                                    props.values.endDateString.length > 0 &&
                                                                    moment(props.values.endDateString, 'DD/MM/YYYY').diff(moment(props.values.startDateString, 'DD/MM/YYYY'), 'days') + 1 <= 0 ?
                                                                    <Text style={{ color: ErrTxtColor, fontSize: 13, fontWeight: '600', marginTop: 5 }}>
                                                                        Ngày về phải lớn hơn hoặc bằng ngày đi
                                                                    </Text>
                                                                    : null
                                                            }
                                                        </>
                                                    ) : null
                                                }
                                                <FooterButton background={Color}>
                                                    <Button
                                                        label={'GỬI THÔNG TIN'}
                                                        marginTop={26}
                                                        width={'100%'}
                                                        backgroundColor={ColorSelect}
                                                        onPress={() => this.onSend(props)}
                                                        disabled={
                                                            props.values.flightType.length === 0 ||
                                                            props.values.fromPlace.length === 0 ||
                                                            props.values.toPlace.length === 0 ||
                                                            props.values.startDateString.length === 0 ||
                                                            (props.values.flightType === 'Khứ hồi' && props.values.endDateString.length === 0) ||
                                                            props.values.errStartDateString ||
                                                            (props.values.flightType === 'Khứ hồi' && props.values.errEndDateString) ||
                                                            (
                                                                props.values.fromPlace.length > 0 &&
                                                                props.values.toPlace.length > 0 &&
                                                                props.values.fromPlace === props.values.toPlace
                                                            ) ||
                                                            (
                                                                props.values.startDateString.length > 0 &&
                                                                props.values.endDateString.length > 0 &&
                                                                moment(props.values.endDateString, 'DD/MM/YYYY').diff(moment(props.values.startDateString, 'DD/MM/YYYY'), 'days') + 1 <= 0
                                                            )
                                                        }
                                                    />
                                                </FooterButton>
                                            </View>
                                        </View>
                                        {
                                            props.values.showFormFlight ? (
                                                <>
                                                    <View style={styles.titleContainer}>
                                                        <Text style={styles.titleStyle}>
                                                            Chọn chuyến bay mua bảo hiểm:
                                                        </Text>
                                                    </View>
                                                    <View style={{ marginHorizontal: 24 }}>
                                                        {
                                                            props.values.flightType === 'Khứ hồi' ? (
                                                                <Text style={[styles.titleStyle, { fontSize: 14, marginTop: 5 }]}>
                                                                    Chiều đi
                                                                </Text>
                                                            ) : null
                                                        }
                                                        <Text style={[styles.titleItem]}>
                                                            Bạn vui lòng chọn chuyến bay cần mua bảo hiểm (Điền thông tin nếu không tìm thấy chuyến bay trong danh sách)
                                                        </Text>
                                                    </View>
                                                    <View style={styles.formFlight}>
                                                        <View style={styles.titleForm}>
                                                            <View style={styles.itemTitle}>
                                                                <View style={{ flex: 1 }}>
                                                                    <Text style={styles.textTitle}>{props.values.fromPlace}</Text>
                                                                </View>
                                                                <View style={{ width: 35, paddingTop: 5, alignItems: 'center' }}>
                                                                    <FastImage source={require('../../config/images/public/icons/ic_arrow.png')} style={{ width: 30, height: 8 }} />
                                                                </View>
                                                                <View style={{ flex: 1 }}>
                                                                    <Text style={[styles.textTitle, { textAlign: 'right' }]}>{props.values.toPlace}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.itemTitle}>
                                                                <View style={{ flex: 1 }}>
                                                                    <Text style={styles.textTitle}>{props.values.startDateString}</Text>
                                                                </View>
                                                                <View style={{ flex: 1 }}>
                                                                    <Text style={[styles.textTitle, { textAlign: 'right' }]}>Tổng số: {props.values.listDepart?.length} chuyến bay</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        {
                                                            props.values.departFlight?.flightNumber?.length > 0 ? (
                                                                <View style={styles.contentForm}>
                                                                    <View style={{ flex: 1 }}>
                                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                            {
                                                                                props.values.departFlight?.airline?.logo?.length > 0 ? (
                                                                                    <SvgUri
                                                                                        width="130"
                                                                                        height="30"
                                                                                        source={{ uri: props.values.departFlight?.airline?.logo }}
                                                                                    />
                                                                                ) : null
                                                                            }
                                                                            <Text style={{ fontSize: 13, color: TxtColor, fontWeight: 'bold', textAlign: 'right' }}>{props.values.departFlight?.flightNumber}</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                            <Text style={{ fontSize: 13, color: TxtColor, fontWeight: 'bold' }}>{moment(props.values.departFlight?.estimateDepartTime).format('HH:mm')}</Text>
                                                                            <Text style={{ fontSize: 13, color: TxtColor, fontWeight: 'bold' }}>{moment(props.values.departFlight?.estimateArriveTime).format('HH:mm')}</Text>
                                                                        </View>
                                                                        <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                            <Text style={{ fontSize: 13, color: TxtColor }}>{props.values.departFlight?.estimateDepartAirPort}</Text>
                                                                            <Text style={{ fontSize: 13, color: TxtColor }}>{props.values.departFlight?.estimateArriveAirPort}</Text>
                                                                        </View>
                                                                        <View style={{ marginTop: 5 }}>
                                                                            <Text style={{ fontSize: 13, color: TxtColor, fontWeight: 'bold' }}>{formatHours(props.values.departFlight?.estimateDurationMinutes)}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            ) : props.values.listDepart?.length === 0 ? (
                                                                <View style={styles.contentForm}>
                                                                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
                                                                        <Text style={{ color: Color, fontSize: 14, fontWeight: '600' }}>Không có chuyến bay nào!</Text>
                                                                    </View>
                                                                </View>
                                                            ) : null
                                                        }
                                                        {
                                                            props.values.listDepart?.length > 0 ? (
                                                                <View style={styles.selectPlane}>
                                                                    <TouchableOpacity onPress={() => {
                                                                        props.setFieldValue('showDepartCreate', false);
                                                                        this.setModalDepartFlight(true);
                                                                    }}>
                                                                        <Text style={{ color: Color, fontSize: 14, fontWeight: '600' }}>Chọn{props.values.showDepartCreate || props.values.departFlight?.flightNumber?.length > 0 ? ' lại ' : ' '}chuyến bay</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            ) : null
                                                        }
                                                        {
                                                            !props.values.showDepartCreate ? (
                                                                <Text style={[styles.titleItem, { color: Color, textAlign: 'center', marginTop: 20 }]}>
                                                                    Trong trường hợp bạn không tìm thấy chuyến bay, vui lòng <Text onPress={() => this.setShowDepartCreate(props)} style={{ textDecorationLine: 'underline' }}>click vào đây</Text> để điền thông tin
                                                                </Text>
                                                            ) : (
                                                                <View style={{
                                                                    marginTop: 20,
                                                                    borderRadius: 10,
                                                                    backgroundColor: '#fff',
                                                                    shadowColor: "#000",
                                                                    shadowOffset: {
                                                                        width: 0,
                                                                        height: 1,
                                                                    },
                                                                    shadowOpacity: 0.22,
                                                                    shadowRadius: 2.22,
                                                                    elevation: 3,
                                                                    padding: 10
                                                                }}>
                                                                    <View style={styles.inputRow}>
                                                                        <View style={{ width: '46%' }}>
                                                                            <FormikInput
                                                                                label={'Số hiệu chuyến bay *'}
                                                                                name={'numberDepart'}
                                                                                autoCapitalize={"characters"}
                                                                                onBlur={() => {
                                                                                    props.setFieldValue('numberDepart', props.values.numberDepart.toUpperCase());
                                                                                }}
                                                                                keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                                                                maxLength={12}
                                                                                lineWidth={0.5}
                                                                            />
                                                                        </View>
                                                                        <View style={{ width: '46%' }}>
                                                                            <FormikInput
                                                                                label={'Mã đặt chỗ *'}
                                                                                name={'codeDepart'}
                                                                                autoCapitalize={"characters"}
                                                                                onBlur={() => {
                                                                                    props.setFieldValue('codeDepart', props.values.codeDepart.toUpperCase());
                                                                                }}
                                                                                keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                                                                maxLength={12}
                                                                                lineWidth={0.5}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    <View style={styles.inputRow}>
                                                                        <View style={{ width: '46%' }}>
                                                                            <FormikInput
                                                                                label={'Ngày đi'}
                                                                                value={props.values.startDateString}
                                                                                editable={false}
                                                                                lineWidth={0.5}
                                                                            />
                                                                        </View>
                                                                        <View style={{ width: '46%' }}>
                                                                            <ModalControlTimer
                                                                                onPickerTime={(text) => this.onPickerHourDepart(text, props)}
                                                                            >
                                                                                <FormikInput
                                                                                    label={'Giờ đi *'}
                                                                                    name={'hourDepart'}
                                                                                    lineWidth={0.5}
                                                                                    editable={false}
                                                                                />
                                                                                <Text style={{ color: 'rgb(213, 0, 0)', fontSize: 12 }}>
                                                                                    {props.values.errHourDepart}
                                                                                </Text>
                                                                            </ModalControlTimer>
                                                                        </View>
                                                                    </View>
                                                                    <View style={styles.inputRow}>
                                                                        <View style={{ width: '46%' }}>
                                                                            {/* <ModalTimePicker
                                                                                dateDefault={new Date(moment(props.values.startDateString, 'DD/MM/YYYY').valueOf())}
                                                                                minimumDate={new Date(moment(props.values.startDateString, 'DD/MM/YYYY').valueOf())}
                                                                                maximumDate={props.values.flightType === 'Khứ hồi' ? new Date(moment(props.values.endDateString, 'DD/MM/YYYY').valueOf()) : null}
                                                                                onPicker={(text) => this.onPickerEndDepart(text, props)}
                                                                            >
                                                                                <FormikInput
                                                                                    label={'Ngày đến *'}
                                                                                    name={'endDateDepart'}
                                                                                    editable={false}
                                                                                    lineWidth={0.5}
                                                                                />
                                                                            </ModalTimePicker> */}
                                                                            <DateFill
                                                                                value={props.values.endDateDepart}
                                                                                onChange={(text, err) => {
                                                                                    this.onPickerEndDepart(text, err, props);
                                                                                }}
                                                                                label={'Ngày đến *'}
                                                                                minimumDate={moment(props.values.startDateString, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                                                                                errMinimum={'Phải lớn hơn ngày đi chiều đi'}
                                                                                maximumDate={props.values.flightType === 'Khứ hồi' ? moment(props.values.endDateString, 'DD/MM/YYYY').format('DD/MM/YYYY') : null}
                                                                                errMaximum={props.values.flightType === 'Khứ hồi' ? 'Phải nhỏ hơn ngày đi chiều về' : null}
                                                                                requireFill
                                                                            />
                                                                        </View>
                                                                        <View style={{ width: '46%' }}>
                                                                            <ModalControlTimer
                                                                                onPickerTime={(text) => this.onPickerHourDepartArrive(text, props)}
                                                                            >
                                                                                <FormikInput
                                                                                    label={'Giờ đến *'}
                                                                                    name={'hourDepartArrive'}
                                                                                    lineWidth={0.5}
                                                                                    editable={false}
                                                                                />
                                                                                <Text style={{ color: 'rgb(213, 0, 0)', fontSize: 12 }}>
                                                                                    {props.values.errHourDepartArrive}
                                                                                </Text>
                                                                            </ModalControlTimer>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            )
                                                        }
                                                    </View>
                                                    {
                                                        props.values.flightType === 'Khứ hồi' ? (
                                                            <>
                                                                <View style={{ marginHorizontal: 24, marginTop: 30 }}>
                                                                    <Text style={[styles.titleStyle, { fontSize: 14 }]}>
                                                                        Chiều về
                                                                    </Text>
                                                                    <Text style={[styles.titleItem]}>
                                                                        Bạn vui lòng chọn chuyến bay cần mua bảo hiểm (Điền thông tin nếu không tìm thấy chuyến bay trong danh sách)
                                                                    </Text>
                                                                </View>
                                                                <View style={styles.formFlight}>
                                                                    <View style={styles.titleForm}>
                                                                        <View style={styles.itemTitle}>
                                                                            <View style={{ flex: 1 }}>
                                                                                <Text style={styles.textTitle}>{props.values.toPlace}</Text>
                                                                            </View>
                                                                            <View style={{ width: 35, paddingTop: 5, alignItems: 'center' }}>
                                                                                <FastImage source={require('../../config/images/public/icons/ic_arrow.png')} style={{ width: 30, height: 8 }} />
                                                                            </View>
                                                                            <View style={{ flex: 1 }}>
                                                                                <Text style={[styles.textTitle, { textAlign: 'right' }]}>{props.values.fromPlace}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={styles.itemTitle}>
                                                                            <View style={{ flex: 1 }}>
                                                                                <Text style={styles.textTitle}>{props.values.endDateString}</Text>
                                                                            </View>
                                                                            <View style={{ flex: 1 }}>
                                                                                <Text style={[styles.textTitle, { textAlign: 'right' }]}>Tổng số: {props.values.listReturn?.length} chuyến bay</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    {
                                                                        props.values.returnFlight?.flightNumber?.length > 0 ? (
                                                                            <View style={styles.contentForm}>
                                                                                <View style={{ flex: 1 }}>
                                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                        {
                                                                                            props.values.returnFlight?.airline?.logo?.length > 0 ? (
                                                                                                <SvgUri
                                                                                                    width="130"
                                                                                                    height="30"
                                                                                                    source={{ uri: props.values.returnFlight?.airline?.logo }}
                                                                                                />
                                                                                            ) : null
                                                                                        }
                                                                                        <Text style={{ fontSize: 13, color: TxtColor, fontWeight: 'bold', textAlign: 'right' }}>{props.values.returnFlight?.flightNumber}</Text>
                                                                                    </View>
                                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                        <Text style={{ fontSize: 13, color: TxtColor, fontWeight: 'bold' }}>{moment(props.values.returnFlight?.estimateDepartTime).format('HH:mm')}</Text>
                                                                                        <Text style={{ fontSize: 13, color: TxtColor, fontWeight: 'bold' }}>{moment(props.values.returnFlight?.estimateArriveTime).format('HH:mm')}</Text>
                                                                                    </View>
                                                                                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                        <Text style={{ fontSize: 13, color: TxtColor }}>{props.values.returnFlight?.estimateDepartAirPort}</Text>
                                                                                        <Text style={{ fontSize: 13, color: TxtColor }}>{props.values.returnFlight?.estimateArriveAirPort}</Text>
                                                                                    </View>
                                                                                    <View style={{ marginTop: 5 }}>
                                                                                        <Text style={{ fontSize: 13, color: TxtColor, fontWeight: 'bold' }}>{formatHours(props.values.returnFlight?.estimateDurationMinutes)}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                        ) : props.values.listReturn?.length === 0 ? (
                                                                            <View style={styles.contentForm}>
                                                                                <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
                                                                                    <Text style={{ color: Color, fontSize: 14, fontWeight: '600' }}>Không có chuyến bay nào!</Text>
                                                                                </View>
                                                                            </View>
                                                                        ) : null
                                                                    }
                                                                    {
                                                                        props.values.listReturn?.length > 0 ? (
                                                                            <View style={styles.selectPlane}>
                                                                                <TouchableOpacity onPress={() => {
                                                                                    props.setFieldValue('showReturnCreate', false);
                                                                                    this.setModalReturnFlight(true);
                                                                                }}>
                                                                                    <Text style={{ color: Color, fontSize: 14, fontWeight: '600' }}>Chọn{props.values.showReturnCreate || props.values.returnFlight?.flightNumber?.length > 0 ? ' lại ' : ' '}chuyến bay</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        ) : null
                                                                    }
                                                                    {
                                                                        !props.values.showReturnCreate ? (
                                                                            <Text style={[styles.titleItem, { color: Color, textAlign: 'center', marginTop: 20 }]}>
                                                                                Trong trường hợp bạn không tìm thấy chuyến bay, vui lòng <Text onPress={() => this.setShowReturnCreate(props)} style={{ textDecorationLine: 'underline' }}>click vào đây</Text> để điền thông tin
                                                                            </Text>
                                                                        ) : (
                                                                            <View style={{
                                                                                marginTop: 20,
                                                                                borderRadius: 10,
                                                                                backgroundColor: '#fff',
                                                                                shadowColor: "#000",
                                                                                shadowOffset: {
                                                                                    width: 0,
                                                                                    height: 1,
                                                                                },
                                                                                shadowOpacity: 0.22,
                                                                                shadowRadius: 2.22,
                                                                                elevation: 3,
                                                                                padding: 10
                                                                            }}>
                                                                                <View style={styles.inputRow}>
                                                                                    <View style={{ width: '46%' }}>
                                                                                        <FormikInput
                                                                                            label={'Số hiệu chuyến bay *'}
                                                                                            name={'numberReturn'}
                                                                                            autoCapitalize={"characters"}
                                                                                            onBlur={() => {
                                                                                                props.setFieldValue('numberReturn', props.values.numberReturn.toUpperCase());
                                                                                            }}
                                                                                            keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                                                                            maxLength={12}
                                                                                            lineWidth={0.5}
                                                                                        />
                                                                                    </View>
                                                                                    <View style={{ width: '46%' }}>
                                                                                        <FormikInput
                                                                                            label={'Mã đặt chỗ *'}
                                                                                            name={'codeReturn'}
                                                                                            autoCapitalize={"characters"}
                                                                                            onBlur={() => {
                                                                                                props.setFieldValue('codeReturn', props.values.codeReturn.toUpperCase());
                                                                                            }}
                                                                                            keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                                                                                            maxLength={12}
                                                                                            lineWidth={0.5}
                                                                                        />
                                                                                    </View>
                                                                                </View>
                                                                                <View style={styles.inputRow}>
                                                                                    <View style={{ width: '46%' }}>
                                                                                        <FormikInput
                                                                                            label={'Ngày đi'}
                                                                                            value={props.values.endDateString}
                                                                                            editable={false}
                                                                                            lineWidth={0.5}
                                                                                        />
                                                                                    </View>
                                                                                    <View style={{ width: '46%' }}>
                                                                                        <ModalControlTimer
                                                                                            onPickerTime={(text) => this.onPickerHourReturn(text, props)}
                                                                                        >
                                                                                            <FormikInput
                                                                                                label={'Giờ đi *'}
                                                                                                name={'hourReturn'}
                                                                                                lineWidth={0.5}
                                                                                                editable={false}
                                                                                            />
                                                                                            <Text style={{ color: 'rgb(213, 0, 0)', fontSize: 12 }}>
                                                                                                {props.values.errHourReturn}
                                                                                            </Text>
                                                                                        </ModalControlTimer>
                                                                                    </View>
                                                                                </View>
                                                                                <View style={styles.inputRow}>
                                                                                    <View style={{ width: '46%' }}>
                                                                                        {/* <ModalTimePicker
                                                                                            dateDefault={new Date(moment(props.values.endDateString, 'DD/MM/YYYY').valueOf())}
                                                                                            minimumDate={new Date(moment(props.values.endDateString, 'DD/MM/YYYY').valueOf())}
                                                                                            onPicker={(text) => this.onPickerEndReturn(text, props)}
                                                                                        >
                                                                                            <FormikInput
                                                                                                label={'Ngày đến *'}
                                                                                                name={'endDateReturn'}
                                                                                                editable={false}
                                                                                                lineWidth={0.5}
                                                                                            />
                                                                                        </ModalTimePicker> */}
                                                                                        <DateFill
                                                                                            value={props.values.endDateReturn}
                                                                                            onChange={(text, err) => {
                                                                                                this.onPickerEndReturn(text, err, props);
                                                                                            }}
                                                                                            label={'Ngày đến *'}
                                                                                            minimumDate={moment(props.values.endDateString, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                                                                                            errMinimum={'Phải lớn hơn ngày đi chiều về'}
                                                                                            requireFill
                                                                                        />
                                                                                    </View>
                                                                                    <View style={{ width: '46%' }}>
                                                                                        <ModalControlTimer
                                                                                            onPickerTime={(text) => this.onPickerHourReturnArrive(text, props)}
                                                                                        >
                                                                                            <FormikInput
                                                                                                label={'Giờ đến *'}
                                                                                                name={'hourReturnArrive'}
                                                                                                lineWidth={0.5}
                                                                                                editable={false}
                                                                                            />
                                                                                            <Text style={{ color: 'rgb(213, 0, 0)', fontSize: 12 }}>
                                                                                                {props.values.errHourReturnArrive}
                                                                                            </Text>
                                                                                        </ModalControlTimer>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                        )
                                                                    }
                                                                </View>
                                                            </>
                                                        ) : null
                                                    }
                                                    <View style={{ flex: 1, marginHorizontal: 24, marginTop: 20 }}>
                                                        <FooterButton>
                                                            <Button
                                                                label={'TIẾP TỤC'}
                                                                marginTop={26}
                                                                width={'100%'}
                                                                onPress={() => this.handleSubmit(props)}
                                                                disabled={
                                                                    !props.isValid ||
                                                                    (props.values.showDepartCreate && props.values.errHourDepart?.length > 0) ||
                                                                    (props.values.showDepartCreate && props.values.errHourDepartArrive?.length > 0) ||
                                                                    (props.values.showReturnCreate && props.values.errHourReturn?.length > 0) ||
                                                                    (props.values.showReturnCreate && props.values.errHourReturnArrive?.length > 0) ||
                                                                    (props.values.showDepartCreate && props.values.errEndDateDepart) ||
                                                                    (props.values.showReturnCreate && props.values.errEndDateReturn) ||
                                                                    (
                                                                        props.values.flightType === 'Khứ hồi' ?
                                                                            (!props.values.showReturnCreate && !(props.values.returnFlight?.flightNumber?.length > 0)) :
                                                                            (!props.values.showDepartCreate && !(props.values.departFlight?.flightNumber?.length > 0))
                                                                    )
                                                                }
                                                            />
                                                        </FooterButton>
                                                    </View>
                                                </>
                                            ) : null
                                        }
                                    </View>
                                );
                            }}
                        </Formik>
                    </ScrollView>
                </KeyboardAvoidingView>
                {
                    isLoading ? (
                        <View style={{
                            flex: 1,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            backgroundColor: '#e8e8e8',
                            justifyContent: 'center',
                            opacity: 0.3,
                            zIndex: 2200,
                        }}>
                            <ActivityIndicator
                                size="large"
                                color={Color}
                            />
                        </View>
                    ) : null
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    selectPlane: {
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        paddingVertical: 10,
        alignItems: 'center', justifyContent: 'center', marginTop: 15
    },
    inputRow: {
        marginTop: -5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleForm: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        padding: 10,
        backgroundColor: Color
    },
    itemTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textTitle: {
        color: 'white',
        fontSize: 13
    },
    contentForm: {
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 0.65,
        borderColor: '#D9D9D9'
    },
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
    formFlight: {
        marginTop: 16,
        marginHorizontal: 24,
        borderRadius: 8,
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
        marginTop: 5,
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
        marginTop: 12,
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTitle,
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
        delayFlightInfo: state.delayFlight.delayFlightInfo,
        codeNumber: state.delayFlight.codeNumber,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        saveInfoDelayFlight: body => dispatch(saveInfoDelayFlight(body)),
        saveCodeNumber: body => dispatch(saveCodeNumber(body)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccidentPackage);
