import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Animated, Linking,
    ScrollView,
    Clipboard,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from '../../config/ConfigResponsive';
import Button from '../../components/buy/Button';
import FooterButton from '../../components/FooterButton';
import FastImage from 'react-native-fast-image';
import { nameApp, Color, URL, NewColor, NewColorDisable, colorTitle, TxtColor, colorBackground, textDisable, colorNote, colorNote2 } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { infoInsur, statusCustomer } from './assets';
import { getDetailContract, getEditContract } from '../CustomerContract/actions';
import { formatVND } from '../../components/Functions';
import Share from 'react-native-share';
import IconCopySvg from '../../config/images/icons/IconCopySvg';
import IconBuildingSvg from '../../config/images/icons/IconBuildingSvg';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconShareSvg from '../../config/images/icons/IconShareSvg';

const HEADER_MIN_HEIGHT = 90;
const HEADER_MAX_HEIGHT = 205;

class DetailNotify extends Component {
    constructor(props) {
        super(props);
        this.scrollYAnimatedValue = new Animated.Value(0);
        this.state = {
        };
    }

    componentDidMount() {
        const { contractId, getDetailContract, getEditContract, codeContract, insurCode } = this.props;
        getDetailContract(contractId);
        if (codeContract && insurCode) {
            getEditContract(contractId, insurCode, codeContract);
        }
    }

    onCopy = (value) => {
        SimpleToast.show('Đã sao chép', 0.5);
        Clipboard.setString(value);
    };

    onShare = (link) => {
        Share.open({message: link})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    };

    renderContract = () => {
        const { detailInfo, editContract } = this.props;
        const statusItem = statusCustomer[detailInfo?.customerStatus] || statusCustomer.default;
        return (
            (
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ fontSize: 14, color: TxtColor }}>Số HĐBH</Text>
                        </View>
                        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    detailInfo?.buyer?.type === 2 ?
                                        <IconBuildingSvg height={15} width={15} color={colorNote2} /> :
                                        <IconBuyerSvg height={15} width={15} color={colorNote2} />
                                }
                                <Text style={[styles.contentInfo, { fontWeight: 'bold', marginLeft: 4 }]}>
                                    {detailInfo?.code}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flex: 0.5, paddingTop: 10, paddingBottom: 5 }}>
                            <Text style={{ fontSize: 14, color: TxtColor }}>Giấy chứng nhận</Text>
                        </View>
                        {
                            detailInfo?.status === 'da-ky-so' ? (
                                <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={{paddingLeft: 16, paddingTop: 10, paddingBottom: 5}}
                                            onPress={() => Linking.openURL(detailInfo?.signatureImage)}
                                        >
                                            <Text
                                                style={[
                                                    styles.contentInfo,
                                                    { color: colorNote2, textDecorationLine: 'underline' }
                                                ]}>
                                                Link
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        style={{ marginLeft: 8, paddingLeft: 8, paddingTop: 10, paddingBottom: 5 }}
                                            onPress={() => this.onShare(detailInfo?.signatureImage)}
                                        >
                                            <IconShareSvg height={15} width={15} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : null
                        }
                    </View>
                    {
                        editContract?.signStatus === 'da-ky-so' && editContract?.signatureImage ? (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 0.5, paddingTop: 5, paddingBottom: 10 }}>
                                    <Text style={{ fontSize: 14, color: TxtColor }}>Giấy chứng nhận SDBS</Text>
                                </View>
                                <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={{paddingLeft: 16, paddingTop: 5, paddingBottom: 10}}
                                            onPress={() => Linking.openURL(editContract?.signatureImage)}
                                        >
                                            <Text
                                                style={[
                                                    styles.contentInfo,
                                                    { color: colorNote2, textDecorationLine: 'underline' }
                                                ]}>
                                                Link
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ marginLeft: 8, paddingLeft: 8, paddingTop: 5, paddingBottom: 10 }}
                                            onPress={() => this.onShare(editContract?.signatureImage)}
                                        >
                                            <IconShareSvg height={15} width={15} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ) : null
                    }
                    <View style={{ flexDirection: 'row', marginTop: 4 }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ fontSize: 14, color: TxtColor }}>Trạng thái</Text>
                        </View>
                        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                            <View style={{ backgroundColor: statusItem.background, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 1 }}>
                                <Text style={[styles.contentInfo, { color: statusItem.color }]}>
                                    {detailInfo?.customerStatusName}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        );
    };

    renderInfoContract = (code) => {
        const { detailInfo } = this.props;
        return (
            (
                <View>
                    <View style={[styles.tourInfo, { paddingTop: 0 }]}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Bên mua BH</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {detailInfo?.buyer?.type === 1 ? detailInfo?.buyer?.fullName : detailInfo?.buyer?.companyBuyerName}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Số điện thoại</Text>
                        </View>
                        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.contentInfo}>
                                    {detailInfo?.buyer?.phone}
                                </Text>
                                <TouchableOpacity style={{paddingLeft: 5}} onPress={() => this.onCopy(detailInfo?.buyer?.phone)}>
                                    <IconCopySvg height={15} width={15} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Loại BH</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>
                                {infoInsur[code] ? infoInsur[code].name : infoInsur.default.name}
                            </Text>
                        </View>
                    </View>
                    {
                        detailInfo?.contract_car ? (
                            <>
                                {
                                    detailInfo?.contract_car?.chassisNumber ? (
                                        <View style={styles.tourInfo}>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.titleInfo}>Số khung</Text>
                                            </View>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.contentInfo}>{detailInfo?.contract_car?.chassisNumber}</Text>
                                            </View>
                                        </View>
                                    ) : null
                                }
                                {
                                    detailInfo?.contract_car?.machineNumber ? (
                                        <View style={styles.tourInfo}>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.titleInfo}>Số máy</Text>
                                            </View>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.contentInfo}>{detailInfo?.contract_car?.machineNumber}</Text>
                                            </View>
                                        </View>
                                    ) : null
                                }
                                {
                                    detailInfo?.contract_car?.licenseNumber ? (
                                        <View style={styles.tourInfo}>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.titleInfo}>Biển số xe</Text>
                                            </View>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.contentInfo}>{detailInfo?.contract_car?.licenseNumber}</Text>
                                            </View>
                                        </View>
                                    ) : null
                                }
                            </>
                        ) : null
                    }
                    {
                        detailInfo?.contract_motobike ? (
                            <>
                                {
                                    detailInfo?.contract_motobike?.chassisNumber ? (
                                        <View style={styles.tourInfo}>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.titleInfo}>Số khung</Text>
                                            </View>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.contentInfo}>{detailInfo?.contract_motobike?.chassisNumber}</Text>
                                            </View>
                                        </View>
                                    ) : null
                                }
                                {
                                    detailInfo?.contract_motobike?.machineNumber ? (
                                        <View style={styles.tourInfo}>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.titleInfo}>Số máy</Text>
                                            </View>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.contentInfo}>{detailInfo?.contract_motobike?.machineNumber}</Text>
                                            </View>
                                        </View>
                                    ) : null
                                }
                                {
                                    detailInfo?.contract_motobike?.licenseNumber ? (
                                        <View style={styles.tourInfo}>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.titleInfo}>Biển số xe</Text>
                                            </View>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={styles.contentInfo}>{detailInfo?.contract_motobike?.licenseNumber}</Text>
                                            </View>
                                        </View>
                                    ) : null
                                }
                            </>
                        ) : null
                    }
                    {
                        detailInfo?.ContractAccident ? (
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.titleInfo}>NĐBH</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{detailInfo?.ContractAccident?.insured_customer?.fullName}</Text>
                                </View>
                            </View>
                        ) : null
                    }
                    <View style={styles.tourInfo}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.titleInfo}>Phí BH</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.contentInfo}>{formatVND(detailInfo?.value)}VNĐ</Text>
                        </View>
                    </View>
                    {
                        !nameApp.includes('EPTI') && !nameApp.includes('INSO') ? (
                            <View style={styles.tourInfo}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.titleInfo}>Hoa hồng</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.contentInfo}>{formatVND(Math.round(detailInfo?.feeData?.commissionValue))}đ</Text>
                                </View>
                            </View>
                        ) : null
                    }
                </View>
            )
        );
    };

    render() {
        const { detailInfo } = this.props;
        const contractCode = detailInfo?.code?.split('.');
        const codeInsur = contractCode ? contractCode.filter(i => infoInsur[i]).toString() : '';
        const numberLine = infoInsur[codeInsur] ? infoInsur[codeInsur].numberLine : infoInsur.default.numberLine
        const headerHeight = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
                outputRange: [HEADER_MAX_HEIGHT, (HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT) / 2, HEADER_MIN_HEIGHT],
                extrapolate: 'clamp'
            });

        const opacityTitle = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [1, 1, 0],
                extrapolate: 'clamp',
            });

        const marginTitle = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [numberLine === 1 ? 83 : 63, -17],
                extrapolate: 'clamp',
            });

        const paddingTitle = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [4, 18],
                extrapolate: 'clamp',
            });

        const headerZIndex = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 2, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
                outputRange: [999, 1001, 1002],
                extrapolate: 'clamp'
            });

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
                    <Animated.View
                        style={[{
                            marginHorizontal: 24,
                            marginTop: marginTitle,
                            paddingLeft: paddingTitle
                        }]}>
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#ffff',
                                textAlign: 'left',
                                textTransform: 'uppercase'
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
                <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight, zIndex: headerZIndex }]}>
                    <Animated.Image
                        source={infoInsur[codeInsur] ? infoInsur[codeInsur].icon : infoInsur.default.icon}
                        style={{ width: widthPercentageToDP('100'), height: headerHeight }}
                    />
                </Animated.View>
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
                    <View style={{
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        marginTop: -20,
                    }}>
                        {
                            detailInfo ? (
                                <>
                                    <View style={{ marginHorizontal: 24, marginTop: 24 }}>
                                        {this.renderContract()}
                                    </View>
                                    <View style={[styles.contentContainer, { marginTop: 18 }]}>
                                        {this.renderInfoContract(codeInsur)}
                                    </View>
                                </>
                            ) : (
                                <View style={{ marginHorizontal: 24, marginTop: 24 }} />
                            )
                        }
                    </View>
                </ScrollView>
                <View style={{ alignItems: 'center' }}>
                    {
                        detailInfo ? (
                            <Button
                                color={NewColor}
                                label={'ĐÓNG'}
                                marginBottom={32}
                                marginTop={10}
                                onPress={() => Actions.pop()}
                            />
                        ) : null
                    }
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ctBack: {
        paddingHorizontal: 24,
        paddingTop: 43,
        zIndex: 1002,
    },
    icBack: {
        height: 15,
        width: (15 * 21) / 39,
    },
    headerContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2012,
    },
    animatedHeaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleHeader: {
        paddingHorizontal: 8,
        marginTop: 100,
    },
    titlePreview: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTitle,
        marginLeft: 8,
    },
    titleInfo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TxtColor,
    },
    contentInfo: {
        fontSize: 14,
        fontWeight: '400',
        color: TxtColor,
        textAlign: 'right',
    },
    contentContainer: {
        marginHorizontal: 24,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: colorBackground,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTitle,
    },
    tourInfoContainer: {
        alignSelf: 'center',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 1,
        elevation: 5,
        shadowColor: 'rgba(0, 107, 153, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 14,
        width: widthPercentageToDP('87'),
        marginTop: 16,
    },
    tourInfo: {
        flexDirection: 'row',
        paddingTop: 12,
        justifyContent: 'space-between',
        paddingHorizontal: 0,
    },
    table: {
        flex: 1,
        alignSelf: 'center',
        width: widthPercentageToDP('87'),
        backgroundColor: '#F6F5F6',
        borderRadius: 10,
        marginTop: 16,
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
    hr: {
        borderWidth: 0.5,
        borderColor: '#676667',
        borderRadius: 1,
    },
    textError: {
        color: '#F97C7C',
    },
    txtErrorCode: {
        color: '#F97C7C',
        fontSize: 12,
        marginTop: 5,
    },
});
const mapStateToProps = (state, ownProps) => {
    return {
        detailInfo: state.contracts.detailContract[ownProps.contractId],
        editContract: state.contracts.editContract[ownProps.contractId],
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDetailContract: (id) => dispatch(getDetailContract(id)),
        getEditContract: (contractId, insurCode, codeContract) => dispatch(getEditContract(contractId, insurCode, codeContract)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailNotify);
