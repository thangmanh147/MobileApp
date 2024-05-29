import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import Modal from 'react-native-modal';
import IconCheckboxBlurSvg from '../../config/images/icons/IconCheckboxBlurSvg';
import IconBoxSvg from '../../config/images/icons/IconBoxSvg';
import IconCheckedBoxSvg from '../../config/images/icons/IconCheckedBoxSvg';
import ShowPassSvg from '../../config/images/login/ShowPassSvg';
import IconPlusSvg from '../../config/images/icons/IconPlusSvg';
import { Color, colorBoxBorder, NewColor, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import { formatVND } from '../../components/Functions';
import IconRadioBtnActiveSvg from '../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../config/images/icons/IconRadioBtnSvg';

class RenderPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            arrCus: [],
        };
    }

    // componentDidMount() {
    //     const { arrFee } = this.props;
    //     if (arrFee?.length > 0) {
    //         const arr = [];
    //         arrFee.map((item) => {
    //             arr.push({
    //                 fullName: item?.fullName,
    //                 fee: item?.fee,
    //                 status: '',
    //             });
    //         });
    //         this.setState({ arrCus: arr });
    //     }
    // }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {arrFee} = this.props;
        if(
            (arrFee?.length > 0 && arrFee?.length !== prevProps.arrFee?.length) ||
            (arrFee?.length > 0 && prevProps.arrFee?.length > 0 && arrFee[0]?.fee !== prevProps.arrFee[0]?.fee)
        ) {
            const arr = [];
            arrFee.map((item) => {
                arr.push({
                    fullName: item?.fullName,
                    fee: item?.fee,
                    status: item?.status || '',
                });
            });
            this.setState({ arrCus: arr });
        }
    }

    setSelect = (index, value) => {
        const { arrCus } = this.state;
        arrCus[index].status = value;
        this.setState({ arrCus: arrCus });
    }

    onSet = () => {
        const { codePkg, onSetPkg } = this.props
        const { arrCus } = this.state;
        this.setState({ showModal: false }, () => {
            if (codePkg) {
                onSetPkg(codePkg, arrCus);
            }
        });
    };

    render() {
        const { name, disabled, value, checked, viewDetail } = this.props;
        const { showModal, arrCus } = this.state;
        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                }}>
                    <TouchableOpacity disabled={disabled} onPress={() => this.setState({ showModal: true })} style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        {
                            disabled ? <IconCheckboxBlurSvg width={20} height={20} /> :
                                checked ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} /> : <IconBoxSvg width={20} height={20} color={colorBoxBorder} />
                        }
                        <Text style={{
                            color: TxtColor,
                            fontSize: 14,
                            marginLeft: 10,
                        }}>{name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({ showModal: true })}
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{
                            color: TxtColor,
                            fontSize: 14,
                            marginRight: 5
                        }}>
                            {`${formatVND(value, '.')}VNĐ`}
                        </Text>
                        {
                            viewDetail ? (
                                <ShowPassSvg width={16} height={16} color={Color} />
                            ) : (
                                <IconPlusSvg width={16} height={16} color={Color} />
                            )
                        }
                    </TouchableOpacity>
                </View>
                <Modal
                    isVisible={showModal}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    onBackButtonPress={this.onSet}
                    onBackdropPress={this.onSet}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            maxHeight: '86%',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20
                        }}>
                        <ScrollView style={{ marginBottom: 10 }} contentContainerStyle={{ paddingBottom: 24 }}>
                            <View>
                                <View style={{
                                    marginBottom: 4,
                                    backgroundColor: '#F4F5F6',
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    justifyContent: 'center',
                                    paddingLeft: 40,
                                    paddingRight: 24,
                                    paddingVertical: 12,
                                }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>{name}</Text>
                                </View>
                                {
                                    arrCus && arrCus.map((item, index) => {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    style={{
                                                        backgroundColor: 'white',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        paddingVertical: 12,
                                                        paddingLeft: 40,
                                                        paddingRight: 24,
                                                    }}
                                                    onPress={() => this.setSelect(index, item.status === 'active' ? '' : 'active')}
                                                    disabled={viewDetail}
                                                    key={index}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        {
                                                            viewDetail ? null : (
                                                                item.status === 'active'
                                                                    ? <IconRadioBtnActiveSvg width={15} height={15} />
                                                                    : <IconRadioBtnSvg width={15} height={15} />
                                                            )
                                                        }
                                                        <Text
                                                            style={{
                                                                marginLeft: viewDetail ? 0 : 8,
                                                                color: TxtColor,
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {item.fullName}
                                                        </Text>
                                                    </View>
                                                    <Text
                                                        style={{
                                                            color: TxtColor,
                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        {formatVND(item.fee)}VNĐ
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={{
                                                    height: 1,
                                                    backgroundColor: '#F6F5F6',
                                                    marginHorizontal: 24,
                                                }} />
                                            </>
                                        );
                                    })
                                }
                            </View>
                        </ScrollView>
                        <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 24,
                            paddingBottom: 32,
                        }}>
                            {
                                arrCus?.length > 0 ? (
                                    <TouchableOpacity
                                        style={[
                                            {
                                                flex: 1,
                                                paddingVertical: 16,
                                                borderRadius: 10,
                                                backgroundColor: NewColor,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }
                                        ]}
                                        onPress={this.onSet}>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                        }}>XÁC NHẬN</Text>
                                    </TouchableOpacity>
                                ) : null
                            }
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    animatedHeaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctBack: {
        zIndex: 1002,
    },
    icBack: {
        height: 15,
        width: (15 * 21) / 39,
    },
    title: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        height: 38,
        marginLeft: 30,
        marginBottom: 40,
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#ffff',
    },
    viewTable: {
        shadowColor: '#F4F4F4',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 7.00,

        elevation: 3, backgroundColor: '#F6F5F6', borderTopLeftRadius: 10, borderTopRightRadius: 10,
    },
});

const mapStateToProps = (state, ownProps) => {
    return ({

    })
};

export default connect(mapStateToProps, {

})(RenderPackage);
