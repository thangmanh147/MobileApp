import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Dimensions,
    Animated,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import moment from 'moment';
import Carousel from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { Color, NewColor, ColorSelect, colorText, colorTitle, TxtColor, textDisable, nameApp, NewColorDisable } from '../../config/System';
import FastImage from 'react-native-fast-image';
import FooterButton from '../../components/FooterButton';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import Button from '../../components/buy/Button';
import { connect } from 'react-redux';
import { getAccidentPackages } from './actions/accident_buy';
import { formatVND } from '../../components/Functions';
import { saveChosenPackage } from './actions/accident_buy';
import SimpleToast from 'react-native-simple-toast';
import { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, makeId } from '../../utils/Util';
import { saveLogContract, logEventContract } from '../../actions/logContract';
import DateFill from '../../components/dateTimeFill/DateFill';

import { scrollInterpolator, animatedStyles } from './utils/animation';
import { ERROR_NEXT_DATE } from '../../config/ErrorMessage';
import Input from '../CarInsurance/components/Input';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';
import IconSlideLeftSvg from '../../config/images/icons/IconSlideLeftSvg';
import IconSlideRightSvg from '../../config/images/icons/IconSlideRightSvg';
import IconCalculatorSvg from '../../config/images/icons/IconCalculatorSvg';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.90);

class AccidentPackage extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            packList: [],
            chosenPack: props.chosenPackage?.chosenPack || 0,
            value: props.chosenPackage?.value || 12,
            typeDate: props.chosenPackage?.typeDate || 'months',
            startDateString: props.chosenPackage?.startDateString || moment().add(1, 'days').format('DD/MM/YYYY'),
            endDateString: props.chosenPackage?.endDateString || moment().add(1, 'days').add(12, 'months').format('DD/MM/YYYY'),
            timerCount: moment().valueOf(),
            disableBtn: false
        };
    }
    componentDidMount = () => {
        this.props.getAccidentPackages();
    };
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const { packagesInfo } = this.props;
        if (packagesInfo && packagesInfo !== prevProps.packagesInfo) {
            this.setState({ packList: packagesInfo });
        }
    }
    // lưu thông tin vào redux
    storeInfomation = () => {
        const { saveLogContract, contractLog } = this.props;
        const { chosenPack, packList, startDateString, endDateString, value, typeDate } = this.state;
        const chosen = packList[chosenPack];
        chosen.startDateString = startDateString;
        chosen.endDateString = endDateString;
        chosen.value = value;
        chosen.typeDate = typeDate;
        chosen.chosenPack = chosenPack;
        this.props.saveChosenPackage(chosen);
        contractLog.key = 'Buyer24h';
        contractLog.idLog = makeId(15);
        contractLog.code = 'A3';
        contractLog.priceInsur = chosen.price;
        saveLogContract('A3', contractLog);
        this.logging(
            {
                "code": chosen.code,
                "createdAt": chosen.createdAt,
                "currency": chosen.currency,
                "endDateString": chosen.endDateString,
                "id": chosen.id,
                "image": chosen.image,
                "insuranceValue": chosen.insuranceValue,
                "name": chosen.name,
                "price": chosen.price,
                "priority": chosen.priority,
                "startDateString": chosen.startDateString,
                "type": chosen.type,
                "unit": chosen.unit,
                "updatedAt": chosen.updatedAt,
            }
        );
        this.onNext();
    };

    logging = (chosen) => {
        const timeEnd = moment().valueOf();
        const count = moment(timeEnd).diff(moment(this.state.timerCount), 'milliseconds');
        this.props.logEventContract(
            nameApp.includes('YCHI') ? `${nameApp}_AN_SINH_Y_CHI_EVENT_GOI_BAO_HIEM` : `${nameApp}_AN_SINH_MAI_LINH_EVENT_GOI_BAO_HIEM`,
            {
                packageInsurance: chosen,
                timerCounting: count / 1000,
            }
        );
    }

    backToInsuranceType = () => {
        Actions.IntroScreen24h();
    };

    confirmPicker = (date, err) => {
        const { value, endDateString, typeDate } = this.state;
        this.setState({
            startDateString: date,
            endDateString: !err ?
                moment(date, 'DD/MM/YYYY').add(value, typeDate).format('DD/MM/YYYY') :
                endDateString,
            disableBtn: err,
        });
    };

    setItem = (index) => {
        const { packList, startDateString } = this.state;
        this.setState({ chosenPack: index });
        if (packList[index].code === '12MONTHS') {
            this.setState({
                value: 12,
                typeDate: 'months',
                endDateString: moment(startDateString, 'DD/MM/YYYY').add(12, 'months').format('DD/MM/YYYY'),
            });
        } else if (packList[index].code === '06MONTHS') {
            this.setState({
                value: 6,
                typeDate: 'months',
                endDateString: moment(startDateString, 'DD/MM/YYYY').add(6, 'months').format('DD/MM/YYYY'),
            });
        } else if (packList[index].code === '03MONTHS') {
            this.setState({
                value: 3,
                typeDate: 'months',
                endDateString: moment(startDateString, 'DD/MM/YYYY').add(3, 'months').format('DD/MM/YYYY'),
            });
        } else if (packList[index].code === 'MONTHLY') {
            this.setState({
                value: 1,
                typeDate: 'months',
                endDateString: moment(startDateString, 'DD/MM/YYYY').add(1, 'months').format('DD/MM/YYYY'),
            });
        } else if (packList[index].code === 'WEEKLY') {
            this.setState({
                value: 7,
                typeDate: 'days',
                endDateString: moment(startDateString, 'DD/MM/YYYY').add(7, 'days').format('DD/MM/YYYY'),
            });
        } else if (packList[index].code === 'DAILY') {
            this.setState({
                value: 1,
                typeDate: 'days',
                endDateString: moment(startDateString, 'DD/MM/YYYY').add(1, 'days').format('DD/MM/YYYY'),
            });
        }
    };

    _renderItem = ({ item, index }) => {
        const { chosenPack, packList } = this.state;
        return (
            <View
                style={[
                    styles.itemContainer,
                    index === 0 && { marginLeft: 5 },
                    index === packList?.length - 1 && { marginRight: 5 },
                    chosenPack === index && { borderColor: Color, borderWidth: 1.85 },
                    chosenPack !== index && {
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    },
                ]}>
                <FastImage
                    source={{ uri: item.image }}
                    style={{
                        borderRadius: 10,
                        width: '100%',
                        height: 320,
                    }}
                    cacheControl={FastImage.cacheControl.immutable}
                />
                <View style={{ alignItems: 'center', marginTop: -30, marginBottom: 28 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor, textTransform: 'uppercase' }}>{item.name}</Text>
                    <View style={{ marginTop: 4, height: 3, width: 131, borderRadius: 35, backgroundColor: NewColor }} />
                    <Text style={{ marginTop: 12, fontSize: 20, fontWeight: 'bold', color: TxtColor, textTransform: 'uppercase' }}>
                        {formatVND(item.price, '.')}VNĐ/{item.unit}
                    </Text>
                </View>
            </View>
        );
    };

    setScrollViewRef = element => {
        this.listRef = element;
    };

    onNext = () => {
        this.listRef.scrollTo({ x: 0, y: 0, animated: true });
        Actions.Buyer24h();
    };

    render() {
        const headerZIndex = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [999, 1001, 1002],
                extrapolate: 'clamp'
            });
    
        const {
            packList,
            startDateString,
            endDateString,
            chosenPack,
            disableBtn
        } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={{ flex: 1 }}>
                    <Animated.View style={{zIndex: headerZIndex}}>
                        <ImageHeaderScroll code={'A3'} offset={this.scrollYAnimatedValue} />
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
                        <HeaderScroll code={'A3'} offset={this.scrollYAnimatedValue} />
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
                            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
                        )}>
                        <View style={styles.contentContainer}>
                            <View style={styles.titleContainer}>
                                <IconCalculatorSvg width={15} height={15} />
                                <Text style={styles.titleStyle}>
                                    Chọn gói bảo hiểm
                                </Text>
                            </View>
                            <View style={{ marginTop: 12 }}>
                                {
                                    chosenPack !== 0 ? (
                                        <View style={{
                                            position: 'absolute',
                                            top: 170,
                                            left: 15,
                                            alignItems: 'center'
                                        }}>
                                            <IconSlideLeftSvg width={14} height={14} />
                                        </View>
                                    ) : null
                                }
                                {
                                    chosenPack !== packList?.length - 1 ? (
                                        <View style={{
                                            position: 'absolute',
                                            top: 170,
                                            right: 15,
                                            alignItems: 'center'
                                        }}>
                                            <IconSlideRightSvg width={14} height={14} />
                                        </View>
                                    ) : null
                                }
                                <Carousel
                                    ref={(c) => this.carousel = c}
                                    data={packList}
                                    // loop
                                    // loopClonesPerSide={10}
                                    renderItem={this._renderItem}
                                    firstItem={chosenPack}
                                    sliderWidth={SLIDER_WIDTH}
                                    itemWidth={ITEM_WIDTH}
                                    inactiveSlideShift={0}
                                    onBeforeSnapToItem={(index) => this.setItem(index)}
                                    scrollInterpolator={scrollInterpolator}
                                    slideInterpolatedStyle={animatedStyles}
                                    useScrollView={true}
                                />
                            </View>
                            <View style={{ paddingHorizontal: 24 }}>
                                <View style={{ paddingTop: 8 }}>
                                    <View style={{ flex: 1 }}>
                                        <Input
                                            label={'Ngày mua bảo hiểm'}
                                            value={moment().format('DD/MM/YYYY')}
                                            editable={false}
                                            baseColor={textDisable}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        {/* <ModalTimePicker
                                            dateDefault={new Date(moment().add(1, 'days').valueOf())}
                                            minimumDate={new Date(moment().add(1, 'days').valueOf())}
                                            onPicker={(date) => this.confirmPicker(date, false)}
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
                                                this.confirmPicker(text, err);
                                            }}
                                            label={'Thời hạn từ *'}
                                            minimumDate={moment().add(1, 'days').format('DD/MM/YYYY')}
                                            errMinimum={ERROR_NEXT_DATE}
                                            requireFill
                                        />
                                    </View>
                                    <View style={{ width: 24 }} />
                                    <View style={{ flex: 1 }}>
                                        <Input
                                            label={'Thời hạn đến'}
                                            value={endDateString}
                                            editable={false}
                                            baseColor={textDisable}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <FooterButton>
                    <Button
                        label={'TIẾP TỤC'}
                        disable={disableBtn}
                        color={disableBtn ? NewColorDisable : NewColor}
                        onPress={() => this.storeInfomation()}
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
    itemContainer: {
        marginHorizontal: 15,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    lineTime: {
        marginTop: 4,
        height: 0.5,
        backgroundColor: textDisable,
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
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTitle,
        marginLeft: 8,
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
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
    },
});

const mapStateToProps = state => {
    return {
        chosenPackage: state.insurance24h.chosenPackage,
        packagesInfo: state.insurance24h.packagesInfo,
        contractLog: state.logContract.logContract['A3'] || {},
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAccidentPackages: () => {
            dispatch(getAccidentPackages());
        },
        saveChosenPackage: body => dispatch(saveChosenPackage(body)),
        saveLogContract: (id, data) => dispatch(saveLogContract(id, data)),
        logEventContract: (name, data) => dispatch(logEventContract(name, data))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccidentPackage);
