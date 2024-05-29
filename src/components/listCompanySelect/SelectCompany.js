import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated,
} from 'react-native';
import Lottie from 'lottie-react-native';
import {
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import { Color, colorTitle, NewColor, TxtColor, nameApp } from '../../config/System';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { getListCompany, setIdSelected } from './actions/selectComAction';
import { isIPhoneX } from '../../utils/Util';
import IconBuildingSvg from '../../config/images/icons/IconBuildingSvg';
import Svg, { LinearGradient, Defs, Stop, Rect } from 'react-native-svg';

class SelectCompany extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
        };
    }

    componentDidMount = () => {
        const { listCompany, getListCompany, insuranceProductId, productCode } = this.props;
        if (!listCompany || listCompany.length === 0) {
            getListCompany(productCode, insuranceProductId);
        }
    };

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const { listCompany, setIdSelected, productCode } = this.props;
        if (listCompany?.length > 0 && listCompany?.length !== prevProps.listCompany?.length) {
            const obj = listCompany.length === 1 ?
                listCompany[0] :
                listCompany.find(item => item.insurOrg.code === 'PTI45');
            setIdSelected(productCode, obj?.insurOrg?._id);
        }
    }

    renderImg = (code) => {
        if (code === 'PJICO') {
            return (
                <FastImage
                    source={require('../../config/images/public/selectCompany/pjico.png')}
                    style={{ width: '100%', height: 82 }}
                    resizeMode={'contain'}
                />
            ); 
        } else if (code === 'PVI') {
            return (
                <FastImage
                    source={require('../../config/images/public/selectCompany/PVI.png')}
                    style={{ width: '100%', height: 82 }}
                    resizeMode={'contain'}
                />
            ); 
        } else if (code === 'VNI') {
            return (
                <FastImage
                    source={require('../../config/images/public/selectCompany/VNI.png')}
                    style={{ width: '100%', height: 82 }}
                    resizeMode={'contain'}
                />
            ); 
        } else if (code.includes('PTI')) {
            return (
                <FastImage
                    source={require('../../config/images/public/selectCompany/pti.png')}
                    style={{ width: '100%', height: 82 }}
                    resizeMode={'contain'}
                />
            ); 
        } else if (code.includes('VNPT')) {
            return (
                <FastImage
                    source={require('../../config/images/public/selectCompany/VNPT.png')}
                    style={{ width: '100%', height: 82 }}
                    resizeMode={'contain'}
                />
            ); 
        } else if (code.includes('VBI')) {
            return (
                <FastImage
                    source={require('../../config/images/public/selectCompany/VBI.png')}
                    style={{ width: '100%', height: 82 }}
                    resizeMode={'contain'}
                />
            ); 
        } else if (code.includes('AAA')) {
            return (
                <FastImage
                    source={require('../../config/images/public/selectCompany/AAA.png')}
                    style={{ width: '100%', height: 82 }}
                    resizeMode={'contain'}
                />
            ); 
        } else {
            return <View style={{ width: '100%', height: 82 }} />
        }
    }

    renderName = (code, name) => {
        if (code === 'VNI') {
            return 'BH Hàng Không';
        } else if (code.includes('PTI')) {
            return 'BH Bưu Điện';
        } else if (code.includes('VNPT')) {
            return 'VNPT';
        } else if (code.includes('VBI')) {
            return 'BH VietinBank';
        } else if (code.includes('AAA')) {
            return 'BH AAA';
        } else {
            return name;
        }
    }

    onSet = (id) => {
        const { setIdSelected, productCode } = this.props;
        setIdSelected(productCode, id);
    };

    render() {
        const { listCompany, idComSelected, valueMargin, showShadow, orgCodeUser, productCode } = this.props;
        if (nameApp !== 'IAGENT' && nameApp !== 'INSO') {
            return <View />
        }
        const listData = listCompany && listCompany.map((obj, index) => {
            if (obj?.status !== 'ACTIVE') return null;
            return (
                <TouchableOpacity
                    key={index}
                    style={[{
                        width: 110,
                    }, (listCompany.length === 1 || listCompany.length === 2) ? {marginHorizontal: 10} : {marginRight: 20}]}
                    onPress={() => this.onSet(obj?.insurOrg?._id)}>
                    <View
                        style={{
                            borderRadius: 10,
                            borderWidth: 1.5,
                            borderColor: idComSelected === obj?.insurOrg?._id ? NewColor : 'white',
                            padding: 10,
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
                        {obj?.insurOrg?.code && this.renderImg(obj?.insurOrg?.code)}
                        {
                            ((orgCodeUser === 'KAT' || orgCodeUser === 'LVY' || orgCodeUser === 'YCHI' || orgCodeUser === 'KNN') && obj?.insurOrg?.code?.includes('PTI')) && productCode !== 'DF1' ? (
                                <View style={{position: 'absolute', right: 2, top: 2}}>
                                    <Lottie source={require('../../screens/Agent/SelectInsuranceType/money.json')} autoPlay loop style={{width: 30, height: 30}} />
                                    {/* <FastImage style={{width: 30, height: 30}} source={require('../../screens/Agent/SelectInsuranceType/money.png')} /> */}
                                </View>
                            ) : null
                        }
                    </View>
                    <Text style={{
                        fontSize: 13,
                        color: TxtColor,
                        fontWeight: 'bold',
                        marginTop: 10,
                        textAlign: 'center',
                        marginHorizontal: 5
                    }}>
                        {obj?.insurOrg?.code && this.renderName(obj?.insurOrg?.code, obj?.insurOrg?.name)}
                    </Text>
                </TouchableOpacity>
            );
        });
        return (
            <View style={{marginBottom: showShadow ? 0 : 15}}>
                <View style={[styles.titleContainer, valueMargin && { paddingHorizontal: 0 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconBuildingSvg width={16} height={16} color={Color} />
                        <Text style={styles.titleStyle}>
                            Chọn công ty bảo hiểm
                        </Text>
                    </View>
                </View>
                <View style={[styles.infoContainer, valueMargin && { marginHorizontal: -24 }]}>
                    {
                        listCompany && (listCompany.length === 1 || listCompany.length === 2) ? (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    paddingTop: 12,
                                }}>
                                {listData}
                            </View>
                        ) : (
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingTop: 12,
                                    paddingHorizontal: 24,
                                }}
                            >
                                {listData}
                            </ScrollView>
                        )
                    }
                </View>
                {
                    showShadow ? (
                        <Svg height="8" width="100%" style={{ zIndex: 1, marginTop: 12 }}>
                            <Defs>
                                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0" stopColor="#e6e6e6" stopOpacity="1" />
                                    <Stop offset="1" stopColor="#e6e6e6" stopOpacity="0.01" />
                                </LinearGradient>
                            </Defs>
                            <Rect height="8" width="100%" fill="url(#grad)" />
                        </Svg>
                    ) : null
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
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

const mapStateToProps = (state, ownProps) => {
    const insuranceInfo = state.insurance.insuranceInfo;
    const obj = insuranceInfo?.find(item => item.code === ownProps.productCode);
    const insuranceProductId = obj ? obj.insurance_product_id : '';
    return {
        insuranceProductId,
        listCompany: state.selectCompany.listCompany[ownProps.productCode],
        idComSelected: state.selectCompany.idComSelected[ownProps.productCode],
        orgCodeUser: state.userInfo.orgCodeUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListCompany: (code, id) => dispatch(getListCompany(code, id)),
        setIdSelected: (code, id) => dispatch(setIdSelected(code, id)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectCompany);
