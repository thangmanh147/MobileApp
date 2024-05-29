import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Dimensions,
    Animated,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Carousel from 'react-native-snap-carousel';
import {Actions} from 'react-native-router-flux';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import {Color, NewColor, ColorSelect, colorText, colorTitle, TxtColor, textDisable, NewColorDisable, nameApp} from '../../config/System';
import FastImage from 'react-native-fast-image';
import FooterButton from '../../components/FooterButton';
import ModalTimePicker from '../../components/datepicker/ModalTimePicker';
import Button from '../../components/buy/Button';
import {connect} from 'react-redux';
import {getAccidentPackages, getAccident} from '../AccidentInsurance/actions/accident_buy';
import {formatVND} from '../../components/Functions';
import {saveChosenPackage} from './actions/accident_buy';
import SimpleToast from 'react-native-simple-toast';
import Store from '../../services/Store';
import Const from '../../services/Const';
import jwt_decode from "jwt-decode";
import {HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, isIPhoneX} from '../../utils/Util';
import DateFill from '../../components/dateTimeFill/DateFill';
import IconCalendarSvg from '../../config/images/icons/IconCalendarSvg';
import Input from '../CarInsurance/components/Input';
import IconDiamondSvg from '../../config/images//icons/IconDiamondSvg';
import SelectCompany from '../../components/listCompanySelect/SelectCompany';
import HeaderScroll from '../../components/header/HeaderScroll';
import ImageHeaderScroll from '../../components/header/ImageHeaderScroll';

import { scrollInterpolator, animatedStyles } from './utils/animation';
import { ERROR_NEXT_DATE } from '../../config/ErrorMessage';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.90);

class AccidentPackage extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            type: 'personal',
            openedList: [],
            packList: [],
            chosenPack: '',
            typeInsure: props.chosenPackage?.typeInsure || props.insurProductCode,
            organizationCode: '',
            startDateString: props.chosenPackage?.startDateString || moment().add(1, 'days').format('DD/MM/YYYY'),
            endDateString: props.chosenPackage?.endDateString || moment().add(1, 'days').add(1, 'years').format('DD/MM/YYYY'),
            disableBtn: false
        };
    }
    componentDidMount = () => {
        const {dataTokenInsur, codeSelected} = this.props;
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(dataTokenInsur?.token || token);
            this.setState({organizationCode: dataToken?.organizationCode});
            this.props.getAccidentPackages(dataToken?.organizationCode === 'SVFC' ? dataToken?.organizationId : null, codeSelected);
        })
    };
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {packagesInfo, packages, codeSelected, getAccidentPackages} = this.props;
        const {typeInsure} = this.state;
        if(packagesInfo && packagesInfo !== prevProps.packagesInfo && typeInsure === 2) {
            this.setState({packList: packagesInfo, chosenPack: packagesInfo[0]?.id});
        }
        if(packages && packages !== prevProps.packages && typeInsure === 1) {
            this.setState({packList: packages, chosenPack: packages[0]?.id});
        }
        if(codeSelected !== prevProps.codeSelected) {
            getAccidentPackages(null, codeSelected);
        }
    }
    // Show chi tiết gói bảo hiểm
    showDetail = item => {
        const {openedList} = this.state;
        if (openedList.indexOf(item.id) == -1) {
            openedList.push(item.id);
            this.setState({openedList: openedList});
        } else {
            openedList.splice(openedList.indexOf(item.id), 1);
            this.setState({openedList: openedList});
        }
    };
    // Chọn package
    handleChosenPack = item => {
        const {chosenPack} = this.state;
        if (chosenPack !== item.id) {
            this.setState({chosenPack: item.id});
        }
    };
    // lưu thông tin vào redux
    storeInfomation = () => {
        const {chosenPack, packList, startDateString, endDateString, typeInsure} = this.state;
        if (!chosenPack) {
            SimpleToast.show('Vui lòng chọn một gói bảo hiểm');
        } else {
            const data = packList.filter((item) => item.id === chosenPack);
            const chosen = data[0];
            chosen.startDateString = startDateString;
            chosen.endDateString = endDateString;
            chosen.typeInsure = typeInsure;
            this.props.saveChosenPackage(chosen);
            this.onNext();
        }
    };

    backToInsuranceType = () => {
        Actions.pop();
    };

    confirmPicker = (date, err) => {
        const { endDateString } = this.state;
        this.setState({
            startDateString: date,
            endDateString: !err ?
                moment(date, 'DD/MM/YYYY').add(1, 'years').format('DD/MM/YYYY') :
                endDateString,
            disableBtn: err,
        });
    };

    setItem = (index) => {
        const {packList} = this.state;
        this.setState({chosenPack: packList[index].id});
    };

    _renderItem = ({ item }) => {
        const insuranceValue = item.insuranceValue.toString();
        const {codeSelected} = this.props;
        return (
            <View
                style={[styles.itemContainer]}>
                <FastImage
                    source={{uri: item.image}}
                    style={{
                        borderRadius: 10,
                        width: '100%',
                        height: 230,
                    }}
                />
                <View style={{alignItems: 'center', marginTop: -30, marginBottom: 12}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold', color: Color, textTransform: 'uppercase'}}>{item.name}</Text>
                    <View style={{marginTop: 5, height: 3, width: 140, borderRadius: 35, backgroundColor: NewColor}} />
                    <Text style={{marginTop: 5, fontSize: 12, fontWeight: '400', color: '#000'}}>Số tiền bảo hiểm</Text>
                    <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold', color: NewColor}}>
                        {formatVND(item.insuranceValue, '.')}VNĐ
                    </Text>
                </View>
                {
                    codeSelected !== 'AAA' && item.benefits.map((obj) => (
                        <View style={{flexDirection: 'row', marginBottom: 8}}>
                            <View style={{flex: 1, paddingLeft: 10}}>
                                {
                                    obj.label === 'Thương tật bộ phận vĩnh viễn' ? (
                                        <>
                                            <Text style={{fontSize: 12, fontWeight: '400', color: '#8D8C8D', textAlign: 'right'}}>Thương tật bộ phận</Text>
                                            <Text style={{fontSize: 12, fontWeight: '400', color: '#8D8C8D', textAlign: 'right'}}>vĩnh viễn</Text>
                                        </>
                                    ) : (
                                        obj.label === 'Trợ cấp nằm viện' ?
                                        <Text style={{fontSize: 12, fontWeight: 'bold', color: NewColor, textAlign: 'right'}}>{obj.label}</Text> :
                                        <Text style={{fontSize: 12, fontWeight: '400', color: '#8D8C8D', textAlign: 'right'}}>{obj.label}</Text>
                                    )
                                }
                            </View>
                            <View style={{width: 15}} />
                            <View style={{flex: 1}}>
                                {
                                    obj.value && obj.unit ? (
                                        <>
                                            <Text style={{fontSize: 16, fontWeight: 'bold', color: TxtColor}}>
                                                {formatVND(obj.value, '.')}VNĐ
                                            </Text>
                                            <Text style={{fontSize: 12, fontWeight: '400', color: '#8D8C8D'}}>/{obj.unit}</Text>
                                        </>
                                    ) : (
                                        <FastImage
                                            style={{width: 15, height: 15}}
                                            source={require('../../icons/collaborator/icon_success.jpg')}
                                            resizeMode="contain"
                                        />
                                    )
                                }
                            </View>
                        </View>
                    ))
                }
                <View style={{flexDirection: 'row', marginBottom: 35, marginTop: 5}}>
                    <View style={{flex: 1, alignItems: 'flex-end', paddingTop: 5}}>
                        <Text style={{fontSize: 13, fontWeight: 'bold', color: TxtColor}}>Phí bảo hiểm</Text>
                    </View>
                    <View style={{width: 10}} />
                    <View style={{flex: 1}}>
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                padding: 5,
                                backgroundColor: Color,
                                borderRadius: 5,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#fff',
                                }}>
                                <Text style={{fontWeight: 'bold'}}>
                                    {formatVND(item.price, '.')}VNĐ
                                </Text>
                                <Text style={{fontSize: 13}}>/{item.unit}</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    setScrollViewRef = element => {
        this.listRef = element;
    };

    onNext = () => {
        const {codeSelected} = this.props;
        const {typeInsure} = this.state;
        const insurProductCode = typeInsure === 1 ? 'A1' : 'A2';
        this.listRef.scrollTo({x: 0, y: 0, animated: true});
        if (codeSelected === 'AAA') {
            Actions.BuyerAAA();
        } else {
            Actions.AccidentBuyerInfo({insurProductCode: insurProductCode});
        }
    };

    onSetTypeInsure = (value) => {
        const {packagesInfo, packages} = this.props;
        const {typeInsure} = this.state;
        if(value === 2) {
            this.setState({packList: packagesInfo, chosenPack: packagesInfo[0]?.id, typeInsure: value});
        }
        if(value === 1) {
            this.setState({packList: packages, chosenPack: packages[0]?.id, typeInsure: value});
        }
    };

    render() {
        const headerZIndex = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [999, 1001, 1002],
                extrapolate: 'clamp'
            });
        
        const {insuranceInfo} = this.props;
        const arrA1 = insuranceInfo && insuranceInfo.filter(obj => obj.code === 'A1');
        const arrA2 = insuranceInfo && insuranceInfo.filter(obj => obj.code === 'A2');    
        
        const {
            packList,
            startDateString,
            endDateString,
            typeInsure,
            organizationCode,
            disableBtn
        } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={{ flex: 1 }}>
                    <Animated.View style={{zIndex: headerZIndex}}>
                        <ImageHeaderScroll code={'A2'} offset={this.scrollYAnimatedValue} />
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
                        <HeaderScroll code={'A2'} offset={this.scrollYAnimatedValue} secondName={organizationCode === 'SVFC'} marginDiff />
                    </View>
                    <ScrollView
                        style={{zIndex: 1000}}
                        contentContainerStyle={{
                            paddingTop: HEADER_MAX_HEIGHT,
                            marginTop: -50,
                        }}
                        ref={this.setScrollViewRef}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }],
                            { useNativeDriver: false }
                        )}>
                        {
                            arrA1?.length > 0 && arrA2?.length > 0 ? (
                                <View style={styles.formInputContainer}>
                                    <View>
                                        <Text style={styles.formTitleStyle}>MUA BẢO HIỂM TAI NẠN</Text>
                                    </View>
                                    <Text style={styles.titleSelect}>
                                        Chọn loại bảo hiểm *
                                    </Text>
                                    <TouchableOpacity
                                        style={[styles.containerItem, {marginTop: 12, marginBottom: 16}, typeInsure === 1 && {backgroundColor: ColorSelect}]}
                                        onPress={() => this.onSetTypeInsure(1)}
                                    >
                                        <View>
                                            <Text style={[styles.titleItem, typeInsure === 1  && {color: 'white'}]}>
                                                Bảo hiểm tai nạn cá nhân 24/7
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => Linking.openURL('https://quytacbaohiem.pti.com.vn/Quy_Tac_NG/Quy_Tac_TNCN_253.pdf')}
                                                style={{width: '65%'}}
                                            >
                                                <Text style={[styles.titleDetail, typeInsure === 1  && {color: 'white'}]}>
                                                    Xem chi tiết thông tin
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <FastImage
                                            style={styles.icCategory}
                                            source={typeInsure === 1 ? require('../../config/images/public/icons/personal_active.png') : require('../../config/images/public/icons/personal.png')}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.containerItem, typeInsure === 2 && {backgroundColor: ColorSelect}]}
                                        onPress={() => this.onSetTypeInsure(2)}
                                    >
                                        <View>
                                            <Text style={[styles.titleItem, typeInsure === 2 && {color: 'white'}]}>
                                                Bảo hiểm tai nạn gia đình 24/7
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => Linking.openURL('https://quytacbaohiem.pti.com.vn/Quy_Tac_NG/Quy_Tac_TNCN_253.pdf')}
                                                style={{width: '65%'}}
                                            >
                                                <Text style={[styles.titleDetail, typeInsure === 2 && {color: 'white'}]}>
                                                    Xem chi tiết thông tin
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <FastImage
                                            style={styles.icCategory}
                                            source={typeInsure === 2 ? require('../../config/images/public/icons/family_active.png') : require('../../config/images/public/icons/family.png')}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.formInputContainer}>
                                    <View>
                                        <Text style={styles.formTitleStyle}>
                                            {
                                                organizationCode === 'SVFC' ? 'MUA BẢO HIỂM GIA ĐÌNH\nYÊU THƯƠNG' : 'MUA BẢO HIỂM TAI NẠN'
                                            }
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL('https://quytacbaohiem.pti.com.vn/Quy_Tac_NG/Quy_Tac_TNCN_253.pdf')}
                                        style={{alignItems: 'center', marginTop: 10}}
                                    >
                                        <Text style={[styles.titleDetail, {color: 'white'}]}>
                                            Xem chi tiết thông tin
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        <View style={{backgroundColor: '#FFFFFF', marginTop: 20}}>
                            <SelectCompany productCode={typeInsure === 1 ? 'A1' : 'A2'} />
                            <View style={[styles.titleContainer, {marginTop: 0}]}>
                                <IconCalendarSvg width={15} height={15} />
                                <Text style={styles.titleStyle}>
                                    Chọn thời hạn bảo hiểm:
                                </Text>
                            </View>
                            <View style={{paddingHorizontal: 24}}>
                                <View style={{flex: 1}}>
                                    <Input
                                        label={'Hiệu lực'}
                                        value={'12 tháng'}
                                        editable={false}
                                        baseColor={textDisable}
                                    />
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 1}}>
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
                                    <View style={{flex: 1}}>
                                        <Input
                                            label={'Thời hạn đến'}
                                            value={endDateString}
                                            editable={false}
                                            baseColor={textDisable}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.titleContainer}>
                                <IconDiamondSvg height={13} width={13 * 25 / 19} />
                                <Text style={styles.titleStyle}>
                                    Chọn gói bảo hiểm:
                                </Text>
                            </View>
                            <View style={{marginTop: 12}}>
                                <Carousel
                                    ref={(c) => this.carousel = c}
                                    data={packList}
                                    // loop
                                    // loopClonesPerSide={10}
                                    renderItem={this._renderItem}
                                    sliderWidth={SLIDER_WIDTH}
                                    itemWidth={ITEM_WIDTH}
                                    inactiveSlideShift={0}
                                    onSnapToItem={(index) => this.setItem(index)}
                                    scrollInterpolator={scrollInterpolator}
                                    slideInterpolatedStyle={animatedStyles}
                                    useScrollView={true}
                                />
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
});

const mapStateToProps = state => {
    const listCompany = state.selectCompany.listCompany['A1'];
    const idComSelected = state.selectCompany.idComSelected['A1'];
    const obj = listCompany && listCompany.find(item => item.insurOrg._id === idComSelected);
    return {
        codeSelected: obj?.insurOrg?.code || '',
        insuranceInfo: state.insurance.insuranceInfo,
        chosenPackage: state.accidentBuy.chosenPackage,
        packagesInfo: state.accidentBuy.packagesInfo,
        packages: state.accidentBuy.packages,
        dataTokenInsur: state.insurance.tokenInsur['A1'],
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAccidentPackages: (orgId, codeSelected) => {
            dispatch(getAccidentPackages(orgId));
            dispatch(getAccident(codeSelected));
        },
        saveChosenPackage: body => dispatch(saveChosenPackage(body)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccidentPackage);
