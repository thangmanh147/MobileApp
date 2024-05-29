import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import Lottie from 'lottie-react-native';
import {
    widthPercentageToDP,
} from '../../../config/ConfigResponsive';
import { Actions } from 'react-native-router-flux';
import { Color, dataContracts, NewColor, TxtColor, URL } from '../../../config/System';
import { connect } from 'react-redux';
import { isIPhoneX } from '../../../utils/Util';
import { setPermissionUser } from '../actions';
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import jwt_decode from "jwt-decode";
import { infoOrg } from '../../../components/assets';
import MotorIconSvg from '../../../config/images/icon_contracts/MotorIconSvg';
import CarPhysicalIconSvg from '../../../config/images/icon_contracts/CarPhysicalIconSvg';
import CarIconSvg from '../../../config/images/icon_contracts/CarIconSvg';
import AccidentIconSvg from '../../../config/images/icon_contracts/AccidentIconSvg';
import Icon24hSvg from '../../../config/images/icon_contracts/Icon24hSvg';
import HomeIconSvg from '../../../config/images/icon_contracts/HomeIconSvg';
import TravelIconSvg from '../../../config/images/icon_contracts/TravelIconSvg';
import FlightIconSvg from '../../../config/images/icon_contracts/FlightIconSvg';
import IconPayMoneySvg from '../../../config/images/icons/IconPayMoneySvg';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('window');

class SelectInsuranceType extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
            listInsurance: dataContracts,
            orgCode: ''
        };
    }

    componentDidMount() {
        new Store().getSession(Const.TOKEN).then(token => {
            if (token) {
                const decode = jwt_decode(token);
                this.setState({orgCode: decode?.organizationCode});
            }
        })
    }

    onChooseInsurance = (code) => {
        const {setPermissionUser, permissionUser} = this.props;
        new Store().getSession(Const.PASS_WORD).then(pass => {
            if (!pass || pass.length === 0) {
                Actions.LoginNew();
            } else {
                // if (!permissionUser) {
                //     new Store().getSession(Const.TOKEN).then(token => {
                //         const dataToken = jwt_decode(token);
                //         const url = `${URL}/api/permission/v2/user-permissions/${dataToken?.userId || ''}?permission=add&org=${dataToken?.organizationId || ''}&channel=${dataToken?.channelId || ''}&group=MODULE_CONTRACT`;
                //         console.log('URLLL :: ', url);
                //         fetch(url, {
                //             method: 'GET',
                //             headers: {
                //                 'Content-Type': 'application/json',
                //             },
                //         })
                //             .then((res) => {
                //                 if(res.status === 200) {
                //                     return res.json().then(data => {
                //                         console.log('ORGG :: ', data);
                //                         setPermissionUser({permissionContract: 'add'});
                //                         this.onNext(code);
                //                     });
                //                 } else {
                //                     setPermissionUser({permissionContract: ''});
                //                     this.onNext(code);
                //                 }
                //             })
                //             .catch(error => {
                //                 console.log(error)
                //                 setPermissionUser({permissionContract: ''});
                //                 this.onNext(code);
                //             })
                //     })
                // } else 
                this.onNext(code);
            }
        })
    }

    onNext = (code) => {
        switch (code) {
            case 'C1':
                return Actions.IntroductionTNDSCar({ insurProductCode: 'C1' });
            case 'M1':
                return Actions.Introduction({ insurProductCode: 'M1' });
            case 'A1':
                return Actions.AccidentIntroScreen({ insurProductCode: ['A1', 'A2'] });
            case 'C2':
                return Actions.IntroductionCarPhysical();
            case 'M3':
                return Actions.IntroductionMotorPhysical();
            case 'H1':
                return Actions.IntroductionHouse();
            case 'T1':
                return Actions.IntroductionTravel();
            case 'DF1':
                return Actions.IntroductionDelayFlight();
            case 'A3':
                return Actions.IntroScreen24h();
            case 'A4':
                return Actions.IntroScreenVTA();
            case 'A8':
                return Actions.IntroScreenFaSecure();
            case 'HC10':
                return Actions.ACareIntro();
            default:
                return;
        }
    }

    renderImage = (code) => {
        const {orgCode} = this.state;
        switch (code) {
            case 'C1':
                return <CarIconSvg color={infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon} height={40} width={40} />;
            case 'C2':
                return <CarPhysicalIconSvg color={infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon} height={40} width={40} />;
            case 'M1':
                return <MotorIconSvg color={infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon} height={40} width={40} />;
            case 'A1':
                return <AccidentIconSvg color={infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon} height={40} width={40} />;
            case 'A3':
                return <Icon24hSvg color={infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon} height={40} width={40} />;
            case 'A4':
                return <AccidentIconSvg color={infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon} height={40} width={40} />;
            case 'A8':
                return <Icon24hSvg color={infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon} height={40} width={40} />;
            case 'M3':
                return <MotorIconSvg color={infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon} height={40} width={40} />;
            case 'H1':
                return <HomeIconSvg color={infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon} height={40} width={40} />;
            case 'T1':
                return <TravelIconSvg color={infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon} height={40} width={40} />;
            case 'DF1':
                return <FlightIconSvg color={infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon} height={40} width={40} />;
            case 'TP':
                return <IconPayMoneySvg width={40} height={40} color={Color} />;
            case 'HC10':
                return <Icon24hSvg color={infoOrg[orgCode] ? infoOrg[orgCode].colorIcon : infoOrg.default.colorIcon} height={40} width={40} />;
            default:
                return;
        }
    }

    render() {
        // const {insuranceInfo} = this.props;
        const { listInsurance, orgCode } = this.state;
        // const arr = listInsurance.filter(item => insuranceInfo && insuranceInfo.find(obj => obj?.code === item.code || obj.code === item.codes));
        // const _arr = insuranceInfo?.length > 0 ? (arr.length > 0 ? arr : []) : listInsurance;
        const _arr = dataContracts;
        // console.log('WIDTH :: ', ((width - 100 * 3 - 24 * 2) / 2));
        // const arr1 = [
        //     {
        //         code: 'C1',
        //         title: 'BH Trách nhiệm\ndân sự ô tô',
        //         title2: 'Test SDK TNDS\nô tô'
        //     },
        //     {
        //         code: 'C2',
        //         title: 'BH Vật chất\nxe ô tô',
        //         title2: 'Test SDK Vật chất\nxe ô tô'
        //     },
        //     {
        //         code: 'M1',
        //         title: 'BH Trách nhiệm\ndân sự xe máy',
        //         title2: 'Test SDK TNDS\nxe máy'
        //     },
        // ];
        // const listSDK = arr1.map((obj, index) => (
        //     <TouchableOpacity
        //         key={index}
        //         style={[{
        //             width: (width - 80) / 3,
        //             marginHorizontal: (index === 1 || index === 4 || index === 7) ? 15 : 0,
        //             marginBottom: 12,
        //         },]}
        //         onPress={() => this.onChooseInsurance(obj.code)}>
        //         <View
        //             style={{
        //                 borderRadius: 10,
        //                 paddingHorizontal: 10,
        //                 paddingVertical: 12,
        //                 alignItems: 'center',
        //                 backgroundColor: '#FFFFFF',
        //                 shadowColor: "#000",
        //                 shadowOffset: {
        //                     width: 0,
        //                     height: 2,
        //                 },
        //                 shadowOpacity: 0.25,
        //                 shadowRadius: 3.84,

        //                 elevation: 5,
        //             }}
        //         >
        //             {this.renderImage(obj.code)}
        //             <Text style={{
        //                 marginTop: 6,
        //                 fontSize: 14,
        //                 color: TxtColor,
        //                 textAlign: 'center',
        //             }}>
        //                 {obj.title2}
        //             </Text>
        //         </View>
        //     </TouchableOpacity>
        // ));
        const listData = _arr.map((obj, index) => (
            <TouchableOpacity
                key={index}
                style={[{
                    width: ((width - 100 * 3 - 24 * 2) / 2) > 15 ? (width - 80) / 3 : 100,
                    marginHorizontal: ((width - 100 * 3 - 24 * 2) / 2) > 0 ? ((index === 1 || index === 4 || index === 7) ? ((width - 100 * 3 - 24 * 2) / 2) > 15 ? 15 : ((width - 100 * 3 - 24 * 2) / 2 - 2) : 0) : 20,
                    marginBottom: 12,
                },]}
                onPress={() => this.onChooseInsurance(obj.code)}>
                <View
                    style={{
                        borderRadius: 10,
                        paddingHorizontal: 8,
                        paddingVertical: 12,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}
                >
                    {this.renderImage(obj.code)}
                    <Text style={{
                        marginTop: 6,
                        fontSize: 13,
                        color: TxtColor,
                        textAlign: 'center',
                    }}>
                        {obj.title2}
                    </Text>
                    {
                        ((orgCode === 'KAT' || orgCode === 'LVY' || orgCode === 'YCHI' || orgCode === 'KNN') && obj.code !== 'HC10' && obj.code !== 'M3' && obj.code !== 'DF1') ? (
                            <View style={{position: 'absolute', right: 5, top: 5}}>
                                <Lottie source={require('./money.json')} autoPlay loop style={{width: 30, height: 30}} />
                                {/* <FastImage style={{width: 30, height: 30}} source={require('./money.png')} /> */}
                            </View>
                        ) : (
                            (((obj.code === 'M3') && orgCode && orgCode !== 'INSO' && orgCode !== 'TEST') || (orgCode && orgCode === 'CME' && obj.code !== 'C1' && obj.code !== 'M1')) ? (
                                <View style={{position: 'absolute', right: 5, top: 5}}>
                                    <FastImage style={{width: 30, height: 30}} source={require('./lock.jpg')} />
                                </View>
                            ) : null
                        )
                    }
                </View>
            </TouchableOpacity>
        ));
        return (
            <>
                <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 24 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: TxtColor }}>Cấp đơn bảo hiểm</Text>
                    </View>
                </View>
                <View style={[styles.infoContainer]}>
                    {/* {
                        ((insuranceInfo?.length > 0) || !orgCode) ?
                            listData : (
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                                    <ActivityIndicator
                                    size="large"
                                    color={Color}
                                    />
                                </View>
                            )
                    } */}
                    {listData}
                </View>
                {/* <View style={[styles.infoContainer]}>
                    {listSDK}
                </View> */}
                {
                    orgCode && orgCode === 'TEST' ? (
                        <>
                            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 24 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: TxtColor }}>Mở tài khoản</Text>
                                </View>
                            </View>
                            <View style={[styles.infoContainer]}>
                                <TouchableOpacity
                                    key={0}
                                    style={[{
                                        width: ((width - 100 * 3 - 24 * 2) / 2) > 15 ? (width - 80) / 3 : 100,
                                        marginHorizontal: 0,
                                        marginBottom: 12,
                                    },]}
                                    onPress={() => Actions.TPBankIntro()}>
                                    <View
                                        style={{
                                            borderRadius: 10,
                                            paddingHorizontal: 8,
                                            paddingVertical: 12,
                                            alignItems: 'center',
                                            backgroundColor: '#FFFFFF',
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
            
                                            elevation: 5,
                                        }}
                                    >
                                        <FastImage style={{width: 35, height: 35}} source={require('./TPBank.jpeg')} />
                                        <Text style={{
                                            marginTop: 6,
                                            fontSize: 13,
                                            color: TxtColor,
                                            textAlign: 'center',
                                        }}>
                                            TPBank{'\n'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
            
                                <TouchableOpacity
                                    key={0}
                                    style={[{
                                        width: ((width - 100 * 3 - 24 * 2) / 2) > 15 ? (width - 80) / 3 : 100,
                                        marginHorizontal: 15,
                                        marginBottom: 12,
                                    },]}
                                    onPress={() => Actions.FmarketIntro()}>
                                    <View
                                        style={{
                                            borderRadius: 10,
                                            paddingHorizontal: 8,
                                            paddingVertical: 12,
                                            alignItems: 'center',
                                            backgroundColor: '#FFFFFF',
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
            
                                            elevation: 5,
                                        }}
                                    >
                                        <FastImage style={{width: 35, height: 35}} source={require('./Fmarket.png')} />
                                        <Text style={{
                                            marginTop: 6,
                                            fontSize: 13,
                                            color: TxtColor,
                                            textAlign: 'center',
                                        }}>
                                            Fmarket{'\n'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : null
                }
            </>
        );
    }
}
const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 10,
        marginHorizontal: 24,
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
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
    },
});

const mapStateToProps = (state) => {
    return {
        permissionUser: state.insurance.permissionUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setPermissionUser: (body) => dispatch(setPermissionUser(body)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectInsuranceType);
