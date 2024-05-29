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
import { statusAcc } from '../ListNotify/assets';
import SimpleToast from 'react-native-simple-toast';
import IconCopySvg from '../../config/images/icons/IconCopySvg';
import IconBuyerSvg from '../../config/images/icons/IconBuyerSvg';
import IconInfoSvg from '../../config/images/icons/IconInfoSvg';
import Modal from 'react-native-modal';
import IconWarningSvg from '../../config/images/icons/IconWarningSvg';

class ItemContract extends Component {
    constructor(props) {
        super(props);
        this.flexItem = new Animated.Value(0);
        this.state = {
            selected: '',
            showModal: false,
            errMess: '',
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

    render() {
        const {item} = this.props;
        const {showModal, errMess} = this.state;
        const statusItem = statusAcc[item?.status] || statusAcc.default;
        return (
            <View>
                <View
                    style={styles.contractItem}>
                    <View style={{ paddingVertical: 16, alignItems: 'center' }}>
                        <FastImage style={{width: 38, height: 38}} source={require('../Agent/SelectInsuranceType/TPBank.jpeg')} />
                        <View style={{ width: 50, marginTop: 8 }}>
                            <Text style={{ fontSize: 14, color: TxtColor }}>
                                TPBank
                            </Text>
                        </View>
                    </View>
                    <View style={{ paddingLeft: 24, paddingRight: 10, flex: 1, paddingVertical: 16 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <IconBuyerSvg height={15} width={15} color={colorNote2} />
                            <Text style={[styles.title, { marginLeft: 4 }]}>Họ và tên: {item?.fullName}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 8, marginBottom: 6 }}>
                            <Text numberOfLines={1} style={styles.text}>Số điện thoại: {item?.phoneNumber}</Text>
                            <TouchableOpacity style={{ paddingLeft: 5 }} onPress={() => this.onCopy(item?.phoneNumber)}>
                                <IconCopySvg height={15} width={15} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text numberOfLines={1} style={styles.text}>
                                Trạng thái:
                            </Text>
                            <TouchableOpacity
                                style={{ flexDirection: 'row' }}
                                disabled={item?.status !== 'error'}
                                onPress={() => {
                                    this.setState({showModal: true, errMess: item?.message})
                                }}
                            >
                                <View style={{ backgroundColor: statusItem.background, marginLeft: 2, borderRadius: 5, paddingHorizontal: 8 }}>
                                    <Text style={{ color: statusItem.color }}>{statusItem.name}</Text>
                                </View>
                                {
                                    item?.status === 'error' ? (
                                        <IconInfoSvg width={15} height={15} color={Color} style={{ marginLeft: 5 }} />
                                    ) : null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Modal
                    isVisible={showModal}
                    style={{ margin: 40, justifyContent: 'center' }}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 20,
                            padding: 24,
                            alignItems: 'center'
                        }}>
                        <IconWarningSvg width={60} height={60} color={errValidColor} />
                        <Text style={{ marginVertical: 24, fontSize: 14, color: errValidColor, textAlign: 'center' }}>
                            {errMess}
                        </Text>
                        <View style={{ width: '100%' }}>
                            <TouchableOpacity
                                onPress={() => this.setState({showModal: false, errMess: ''})}
                                style={{
                                    paddingVertical: 16,
                                    backgroundColor: Color,
                                    borderRadius: 10,
                                    alignItems: 'center'
                                }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                                    OK
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
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
        flex: 1,
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
