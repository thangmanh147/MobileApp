import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Animated,
    Clipboard,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { Color, TxtColor, NewColor, colorNote, colorNote2, errValidColor, nameApp } from '../../config/System';
import { formatVND } from '../../components/Functions';
import { dateImages } from './assets';
import { infoInsur, statusCustomer, statusImg } from '../ListNotify/assets';
import SimpleToast from 'react-native-simple-toast';
import IconCopySvg from '../../config/images/icons/IconCopySvg';
import IconBuildingSvg from '../../config/images/icons/IconBuildingSvg';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';

class ItemContract extends Component {
    constructor(props) {
        super(props);
        this.flexItem = new Animated.Value(0);
        this.state = {
            selected: ''
        };
    }

    componentDidMount() {
        this.flexItem.setValue(0.1);
    }

    animateBar = (value) => {
        Animated.timing(this.flexItem, {
            toValue: value,
            duration: 200,
        }).start();
    };

    showOption = () => {
        this.setState({ selected: 'active' }, () => this.animateBar(5));
    };

    hideOption = () => {
        this.setState({ selected: '' }, () => this.animateBar(0.1));
    };

    onCopy = (value) => {
        SimpleToast.show('Đã sao chép', 0.5);
        Clipboard.setString(value);
    };

    onSelect = () => {
        const { item, onSelectContract } = this.props;
        onSelectContract(item);
    };

    render() {
        const { item } = this.props;
        if (item?.key?.length > 0) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        Actions.DetailContract({ itemContractLog: item });
                    }}
                    style={styles.contractItem}>
                    <View style={{ paddingVertical: 16 }}>
                        {dateImages[item?.code] ? dateImages[item?.code].icon : dateImages.default.icon}
                        <View style={{width: 50, marginTop: 4}}>
                            <Text style={{fontSize: 14, color: TxtColor}}>
                                {dateImages[item?.code] ? dateImages[item?.code].name : dateImages.default.name}
                            </Text>
                        </View>
                    </View>
                    <View style={{ paddingLeft: 24, paddingRight: 10, flex: 1, paddingVertical: 16 }}>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                item?.buyerType === 2 ?
                                    <IconBuildingSvg height={15} width={15} color={colorNote2} /> :
                                    <IconBuyerSvg height={15} width={15} color={colorNote2} />
                            }
                            <Text numberOfLines={1} style={[styles.title, {marginLeft: 4}]}>Mã ĐH: {item?.idLog}</Text>
                        </View>
                        <Text numberOfLines={2} style={styles.text}>Bên mua BH: {item?.buyerName}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text numberOfLines={1} style={styles.text}>Số điện thoại: {item?.buyerPhone}</Text>
                            {
                                item?.buyerPhone ? (
                                    <TouchableOpacity style={{paddingLeft: 5}} onPress={() => this.onCopy(item?.buyerPhone)}>
                                        <IconCopySvg height={15} width={15} />
                                    </TouchableOpacity>
                                ) : null
                            }
                        </View>
                        {
                            item?.chassisNumber ? (
                                <Text numberOfLines={1} style={styles.text}>Số khung: {item?.chassisNumber}</Text>
                            ) : null
                        }
                        {
                            item?.machineNumber ? (
                                <Text numberOfLines={1} style={styles.text}>Số máy: {item?.machineNumber}</Text>
                            ) : null
                        }
                        {
                            item?.licenseNumber ? (
                                <Text numberOfLines={1} style={styles.text}>Biển số xe: {item?.licenseNumber}</Text>
                            ) : null
                        }
                        {
                            item.ContractAccident ? (
                                <Text numberOfLines={1} style={styles.text}>NĐBH: {item?.ContractAccident}</Text>
                            ) : null
                        }
                        <Text numberOfLines={1} style={styles.text}>Phí bảo hiểm: {item?.priceInsur ? `${formatVND(item.priceInsur)}đ` : ''}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text numberOfLines={1} style={styles.text}>
                                Trạng thái:
                            </Text>
                            <View style={{ backgroundColor: '#FFCC00', marginLeft: 2, borderRadius: 5, paddingHorizontal: 8 }}>
                                <Text style={{ color: TxtColor }}>Chưa thanh toán</Text>
                            </View>
                        </View>
                        {
                            !nameApp.includes('EPTI') && !nameApp.includes('INSO') ? (
                                <>
                                    <Text numberOfLines={1} style={[styles.text, {marginTop: 2, marginBottom: 0}]}>
                                        Hoa hồng: {formatVND(Math.round(item?.commission))}đ
                                    </Text>
                                    <TouchableOpacity
                                        onPress={this.onSelect}
                                        style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
                                        <FastImage
                                            source={require('../../config/images/public/icons/ic_Subtract.png')}
                                            style={{ height: 20, width: 20 }}
                                            resizeMode={'contain'}
                                        />
                                        <Text style={{color: errValidColor, fontSize: 14, marginLeft: 8}}>
                                            Xóa đơn
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            ) : null
                        }
                    </View>
                </TouchableOpacity>
            );
        }
        // const { selected } = this.state;
        const statusItem = statusCustomer[item.customerStatus] || statusCustomer.default;
        const imgStatus = statusImg[item?.contract_car?.imageStatus] || null;
        const contractCode = item?.code?.split('.');
        const codeInsur = contractCode ? contractCode.filter(i => infoInsur[i]).toString() : '';
        return (
            <TouchableOpacity
                onPress={() => {
                    Actions.DetailContract({ contractId: item?.id, codeContract: item?.code, insurCode: codeInsur });
                }}
                style={styles.contractItem}>
                <View style={{ paddingVertical: 16 }}>
                    {dateImages[codeInsur] ? dateImages[codeInsur].icon : dateImages.default.icon}
                    <View style={{width: 50, marginTop: 4}}>
                        <Text style={{fontSize: 14, color: TxtColor}}>
                            {dateImages[codeInsur] ? dateImages[codeInsur].name : dateImages.default.name}
                        </Text>
                    </View>
                </View>
                <View style={{ paddingLeft: 24, paddingRight: 10, flex: 1, paddingVertical: 16 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            item?.buyerType === 2 ?
                                <IconBuildingSvg height={15} width={15} color={colorNote2} /> :
                                <IconBuyerSvg height={15} width={15} color={colorNote2} />
                        }
                        <Text numberOfLines={1} style={[styles.title, {marginLeft: 4}]}>Số HĐ:</Text>
                    </View>
                    <Text numberOfLines={1} style={[styles.title, { marginBottom: 4 }]}>{item?.code}</Text>
                    <Text numberOfLines={2} style={styles.text}>Bên mua BH: {item.buyerFullName}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={1} style={styles.text}>Số điện thoại: {item.buyerPhone}</Text>
                        <TouchableOpacity style={{paddingLeft: 5}} onPress={() => this.onCopy(item.buyerPhone)}>
                            <IconCopySvg height={15} width={15} />
                        </TouchableOpacity>
                    </View>
                    {
                        item.contract_car ? (
                            <>
                                {
                                    item.contract_car?.chassisNumber ? (
                                        <Text numberOfLines={1} style={styles.text}>Số khung: {item.contract_car?.chassisNumber}</Text>
                                    ) : null
                                }
                                {
                                    item.contract_car?.machineNumber ? (
                                        <Text numberOfLines={1} style={styles.text}>Số máy: {item.contract_car?.machineNumber}</Text>
                                    ) : null
                                }
                                {
                                    item.contract_car?.licenseNumber ? (
                                        <Text numberOfLines={1} style={styles.text}>Biển số xe: {item.contract_car?.licenseNumber}</Text>
                                    ) : null
                                }
                            </>
                        ) : null
                    }
                    {
                        item.contract_motobike ? (
                            <>
                                {
                                    item.contract_motobike?.chassisNumber ? (
                                        <Text numberOfLines={1} style={styles.text}>Số khung: {item.contract_motobike?.chassisNumber}</Text>
                                    ) : null
                                }
                                {
                                    item.contract_motobike?.machineNumber ? (
                                        <Text numberOfLines={1} style={styles.text}>Số máy: {item.contract_motobike?.machineNumber}</Text>
                                    ) : null
                                }
                                {
                                    item.contract_motobike?.licenseNumber ? (
                                        <Text numberOfLines={1} style={styles.text}>Biển số xe: {item.contract_motobike?.licenseNumber}</Text>
                                    ) : null
                                }
                            </>
                        ) : null
                    }
                    {
                        item.ContractAccident ? (
                            <Text numberOfLines={1} style={styles.text}>NĐBH: {item.ContractAccident?.insured_customer?.fullName}</Text>
                        ) : null
                    }
                    <Text numberOfLines={1} style={styles.text}>Phí bảo hiểm: {formatVND(item.value)}đ</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={1} style={styles.text}>
                            Trạng thái:
                        </Text>
                        {
                            nameApp.includes('IAGENT') && codeInsur === 'C2' && statusItem.code === 'chua-thanh-toan' && imgStatus ? (
                                <View style={{ backgroundColor: imgStatus.background, marginLeft: 2, borderRadius: 5, paddingHorizontal: 8 }}>
                                    <Text style={{ color: imgStatus.color }}>{imgStatus.name}</Text>
                                </View>
                            ) : (
                                <View style={{ backgroundColor: statusItem.background, marginLeft: 2, borderRadius: 5, paddingHorizontal: 8 }}>
                                    <Text style={{ color: statusItem.color }}>{item.customerStatusName}</Text>
                                </View>
                            )
                        }
                    </View>
                    {
                        !nameApp.includes('EPTI') && !nameApp.includes('INSO') ? (
                            <>
                                <Text numberOfLines={1} style={[styles.text, {marginTop: 2, marginBottom: 0}]}>
                                    Hoa hồng: {formatVND(Math.round(item?.feeData?.commissionValue))}đ
                                </Text>
                                {
                                    (nameApp.includes('IAGENT') && codeInsur === 'C2') ? null : (
                                        item.customerStatusName === 'Chưa thanh toán' ? (
                                            <TouchableOpacity
                                                onPress={this.onSelect}
                                                style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
                                                <FastImage
                                                    source={require('../../config/images/public/icons/ic_Subtract.png')}
                                                    style={{ height: 20, width: 20 }}
                                                    resizeMode={'contain'}
                                                />
                                                <Text style={{color: errValidColor, fontSize: 14, marginLeft: 8}}>
                                                    Xóa đơn
                                                </Text>
                                            </TouchableOpacity>
                                        ) : null)
                                }
                            </>
                        ) : null
                    }
                </View>
                {/* <Animated.View style={{ flex: this.flexItem }}>
                    {
                        // selected === 'active' ? (
                            false ? (
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <TouchableOpacity
                                    style={{ justifyContent: 'center', paddingRight: 12 }}
                                    onPress={this.hideOption}>
                                    <FastImage
                                        source={require('../../config/images/public/icons/ic_forward.png')}
                                        style={{ height: 14, width: 8.75 }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        backgroundColor: Color,
                                        paddingHorizontal: 6
                                    }}
                                    onPress={() => {
                                        Actions.BenefitInsurance({ idContract: item.id, status: item.status });
                                    }}
                                >
                                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 40 }}>
                                        <FastImage
                                            source={require('../../config/images/public/icons/ic_detail.png')}
                                            style={{ height: 20, width: 20 }} />
                                    </View>
                                    <View>
                                        <View style={{
                                            position: 'absolute',
                                            left: 8,
                                        }}>
                                            <Text style={{
                                                position: 'absolute',
                                                color: 'white',
                                                fontSize: 13,
                                                textAlign: 'center'
                                            }}>
                                                Chi tiết{'\n'}hợp đồng
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: 1, backgroundColor: 'white' }} />
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        paddingHorizontal: 6,
                                        backgroundColor: Color,
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10
                                    }}
                                    onPress={() => {
                                        Actions.AddCompensation({ itemContract: item });
                                    }}
                                >
                                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 40 }}>
                                        <FastImage
                                            source={require('../../config/images/public/icons/ic_claim.png')}
                                            style={{ height: 20, width: 20 }} />
                                    </View>
                                    <View>
                                        <View style={{
                                            position: 'absolute',
                                            left: 4,
                                        }}>
                                            <Text style={{
                                                position: 'absolute',
                                                color: 'white',
                                                fontSize: 13,
                                                textAlign: 'center'
                                            }}>
                                                Yêu cầu{'\n'}bồi thường
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                // onPress={this.showOption}
                                onPress={() => Actions.BenefitInsurance({ idContract: item.id, status: item.status })}
                                style={{flex: 1, justifyContent: 'center'}}
                            >
                                <FastImage
                                    source={require('../../config/images/public/icons/ic_chevron.png')}
                                    style={{ height: 14, width: 8.75 }} />
                            </TouchableOpacity>
                        )
                    }
                </Animated.View> */}
            </TouchableOpacity>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    textBox: {
        zIndex: 2201,
        marginTop: -30,
        marginHorizontal: 24,
        paddingHorizontal: 15,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    },
    fullName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        marginHorizontal: 8,
        paddingVertical: 5,
        flex: 1,
        color: TxtColor,
        fontSize: 14,
    },
    contractItem: {
        flexDirection: 'row',
        // paddingVertical: 16,
        paddingLeft: 24,
        // paddingRight: 18,
        marginBottom: 16,
        alignItems: 'center',
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
    },
    title: {
        fontSize: 14,
        color: TxtColor,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        color: TxtColor,
        marginBottom: 2,
    },
    itemStyle: {
        // backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 40,
    },
    lineStyle: {
        height: 1,
        backgroundColor: '#efefef',
        marginHorizontal: 24,
    },
    textStyle: {
        color: '#414042',
        fontSize: 14,
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ItemContract);
