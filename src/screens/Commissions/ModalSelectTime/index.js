import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image'
import { Color, colorNote, contractsFilter, errValidColor, nameApp, NewColor, NewColorDisable, textDisable, TxtColor } from '../../../config/System';
import DateFill from '../../../components/dateTimeFill/DateFill';
import moment from 'moment';
import { connect } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import IconFilterSvg from '../../../config/images/icons/IconFilterSvg';
import IconCheckedBoxSvg from '../../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../../config/images/icons/IconBoxSvg';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';
import { ERROR_DATE_CURRENT } from '../../../config/ErrorMessage';

const listFilter = [
    {
        name: 'Ngày cấp đơn',
        code: 'createdAt'
    },
    {
        name: 'Ngày thanh toán',
        code: 'paidAt'
    },
    {
        name: 'Ngày hiệu lực',
        code: 'effectiveAt'
    },
];

class ModalSelectTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateType: props.options.dateType || '',
            insureSelected: props.options.insureSelected || [],
            startDateString: props.options.startDateStr || '',
            endDateString: props.options.endDateStr || '',
            showModal: false,
            errStartDate: false,
            errEndDate: false,
            errStartDateString: '',
            errEndDateString: '',
            orgSelected: props.options.orgSelected || [],
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {options} = this.props;
        if(options.dateType !== prevProps.options.dateType) {
            this.setState({dateType: options.dateType});
        }
        if(options.insureSelected?.length !== prevProps.options.insureSelected?.length) {
            this.setState({insureSelected: options.insureSelected});
        }
        if(options.orgSelected?.length !== prevProps.options.orgSelected?.length) {
            this.setState({orgSelected: options.orgSelected});
        }
        if(options.startDateStr !== prevProps.options.startDateStr) {
            this.setState({startDateString: options.startDateStr});
        }
        if(options.endDateStr !== prevProps.options.endDateStr) {
            this.setState({endDateString: options.endDateStr});
        }
    }

    onShowOptionTypes = () => {
        this.setState({ showModal: true });
    };

    onHideOptionTypes = () => {
        this.setState({ showModal: false });
    };

    onSelectInsure = (index, value) => {
        const { insureSelected } = this.state;
        if (index === 0) {
            const arr = insureSelected.map((item) => {
                item.status = value;
                return item;
            })
            this.setState({ insureSelected: arr });
        } else {
            if (value === '') {
                insureSelected[0].status = '';
            } else {
                const arr = insureSelected.filter((item) => item.status === '');
                if (arr.length === 2) {
                    insureSelected[0].status = 'active';
                }
            }
            insureSelected[index].status = value;
            this.setState({ insureSelected: insureSelected });
        }
    };

    onPickerStart = (text, err) => {
        const { endDateString, errStartDateString, errEndDate } = this.state;
        this.setState({
            startDateString: text,
            errStartDate: err,
        })
        if (errStartDateString.length > 0 && err) {
            this.setState({
                errStartDateString: '',
            })
        } else if (endDateString.length > 0 && !err && !errEndDate) {
            const days = moment(endDateString, 'DD/MM/YYYY').diff(moment(text, 'DD/MM/YYYY'), 'days');
            if (days + 1 <= 0) {
                this.setState({
                    errStartDateString: 'Phải nhỏ hơn hoặc bằng ngày kết thúc',
                })
            } else {
                this.setState({
                    errStartDateString: '',
                    errEndDateString: '',
                })
            }
        }
    };

    onPickerEnd = (text, err) => {
        const { startDateString, errEndDateString, errStartDate } = this.state;
        this.setState({
            endDateString: text,
            errEndDate: err,
        })
        if (errEndDateString.length > 0 && err) {
            this.setState({
                errEndDateString: '',
            })
        } else if (startDateString.length > 0 && !err && !errStartDate) {
            const days = moment(text, 'DD/MM/YYYY').diff(moment(startDateString, 'DD/MM/YYYY'), 'days');
            if (days + 1 <= 0) {
                this.setState({
                    errEndDateString: 'Phải lớn hơn hoặc bằng ngày bắt đầu',
                })
            } else {
                this.setState({
                    errStartDateString: '',
                    errEndDateString: '',
                })
            }
        }
    };

    onSelectOrg = (index, value) => {
        const {orgSelected} = this.state;
        if (index === 0) {
            const arr = orgSelected.map((item) => {
                item.status = value;
                return item;
            })
            this.setState({orgSelected: arr});
        } else {
            if(value === '') {
                orgSelected[0].status = '';
            } else {
                const arr = orgSelected.filter((item) => item.status === '');
                if(arr.length === 2) {
                    orgSelected[0].status = 'active';
                }
            }
            orgSelected[index].status = value;
            this.setState({orgSelected: orgSelected});
        }
    };

    handleSet = () => {
        const {
            startDateString,
            endDateString,
            insureSelected,
            dateType,
            orgSelected,
        } = this.state;
        const {onSet} = this.props;
        let productCode = '', startDateStr = startDateString, endDateStr = endDateString, orgId = '';
        this.onHideOptionTypes();
        if (startDateString.length === 0 && endDateString.length === 0) {
            startDateStr = moment().startOf('week').format('DD/MM/YYYY');
            endDateStr = moment().startOf('week').add(6, 'days').format('DD/MM/YYYY');
            this.setState({
                startDateString: startDateStr,
                endDateString: endDateStr,
            });
        }
        const objInsure = insureSelected.filter((item) => item.id !== '1' && item.status === 'active');
        const _objInsure = objInsure.map((item) => item.codes ? `${item.code},${item.codes}` : item.code);
        productCode = _objInsure.toString();
        const objOrg = orgSelected.filter((item) => item?._id !== '1' && item?.status === 'active');
        const _objOrg = objOrg.map((item) => item?._id);
        orgId = _objOrg.toString();
        onSet({startDateStr, endDateStr, dateType, productCode, insureSelected, orgSelected, orgId});
    };

    render() {
        const { fillInsure, fillGroup } = this.props;
        const {
            startDateString,
            endDateString,
            insureSelected,
            showModal,
            dateType,
            errStartDate,
            errEndDate,
            errStartDateString,
            errEndDateString,
            orgSelected,
        } = this.state;
        return (
            <>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.onShowOptionTypes}>
                    <Text style={{ color: '#8D8C8D', fontSize: 14, marginRight: 8 }}>Bộ lọc</Text>
                    <IconFilterSvg width={20} height={20} color={'#8D8C8D'} />
                </TouchableOpacity>
                <Modal
                    isVisible={showModal}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    onBackButtonPress={this.onHideOptionTypes}
                    onBackdropPress={this.onHideOptionTypes}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                >
                    <View
                        style={styles.container}>
                        <ScrollView style={{ marginBottom: 10 }} contentContainerStyle={{ paddingBottom: 24 }}>
                            {
                                orgSelected && orgSelected.length > 0 ? (
                                    <View>
                                        <View style={styles.title}>
                                            <Text style={{fontSize: 16, fontWeight: 'bold', color: TxtColor}}>Lọc theo đại lý</Text>
                                        </View>
                                        {
                                            orgSelected && orgSelected.map((item, index) => {
                                                return (
                                                    <>
                                                        <TouchableOpacity
                                                            style={styles.itemStyle}
                                                            onPress={() => this.onSelectOrg(index, item.status === 'active' ? '' : 'active')}
                                                            key={index}>
                                                            {
                                                                item.status === 'active'
                                                                    ? <IconCheckedBoxSvg width={15} height={15} color={NewColor} />
                                                                    : <IconBoxSvg width={15} height={15} color={NewColor} />
                                                            }
                                                            <Text
                                                                style={[styles.textStyle, {marginLeft: 8}]}
                                                            >
                                                                {item.name}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        {/* <View style={styles.lineStyle} /> */}
                                                    </>
                                                );
                                            })
                                        }
                                    </View>
                                ) : null
                            }
                            <View>
                                <View style={[styles.title, { marginBottom: 4 }, orgSelected && orgSelected.length > 0 ? {borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 18} : null]}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Lọc theo thời gian</Text>
                                </View>
                                {
                                    listFilter.map((item, index) => {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    style={styles.itemStyle}
                                                    onPress={() => this.setState({ dateType: item.code })}
                                                    key={index}>
                                                    {
                                                        dateType === item.code
                                                            ? <IconRadioBtnActiveSvg width={15} height={15} />
                                                            : <IconRadioBtnSvg width={15} height={15} />
                                                    }
                                                    <Text
                                                        style={[styles.textStyle, { marginLeft: 8 }]}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={styles.lineStyle} />
                                            </>
                                        );
                                    })
                                }
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: 40, marginTop: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <DateFill
                                        value={startDateString}
                                        onChange={(text, err) => {
                                            this.onPickerStart(text, err);
                                        }}
                                        hideLine
                                        requireFill
                                        colorHolder={'#B3B2B3'}
                                        showTitle={'Từ'}
                                    />
                                    {
                                        errStartDateString.length > 0 ?
                                            <Text style={{ color: errValidColor, fontSize: 14, marginTop: -12 }}>
                                                {errStartDateString}
                                            </Text>
                                            : null
                                    }
                                </View>
                                <View style={{ width: 16 }} />
                                <View style={{ flex: 1 }}>
                                    <DateFill
                                        value={endDateString}
                                        onChange={(text, err) => {
                                            this.onPickerEnd(text, err);
                                        }}
                                        hideLine
                                        requireFill
                                        colorHolder={'#B3B2B3'}
                                        showTitle={'Đến'}
                                    />
                                    {
                                        errEndDateString.length > 0 ?
                                            <Text style={{ color: errValidColor, fontSize: 14, marginTop: -12 }}>
                                                {errEndDateString}
                                            </Text>
                                            : null
                                    }
                                </View>
                            </View>
                            <View>
                                <View style={[styles.title, { borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 12, marginBottom: 16 }]}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>Lọc theo loại bảo hiểm</Text>
                                </View>
                                {
                                    insureSelected && insureSelected.map((item, index) => {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    style={[styles.itemStyle, { paddingTop: 0, paddingBottom: 16 }]}
                                                    onPress={() => this.onSelectInsure(index, item.status === 'active' ? '' : 'active')}
                                                    key={index}>
                                                    {
                                                        item.status === 'active'
                                                            ? <IconCheckedBoxSvg width={20} height={20} color={NewColor} />
                                                            : <IconBoxSvg width={20} height={20} color={NewColor} />
                                                    }
                                                    <Text
                                                        style={[styles.textStyle, { marginLeft: 8 }]}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            </>
                                        );
                                    })
                                }
                            </View>
                        </ScrollView>
                        <View style={styles.containerSubmit}>
                            <TouchableOpacity style={[styles.butSubmit, { backgroundColor: 'white' }]} onPress={this.onHideOptionTypes}>
                                <Text style={[styles.titleSubmit, { color: TxtColor }]}>BỎ CHỌN</Text>
                            </TouchableOpacity>
                            <View style={{ width: 12 }} />
                            <TouchableOpacity
                                disabled={
                                    errStartDate ||
                                    errEndDate ||
                                    errEndDateString.length > 0 ||
                                    errStartDateString.length > 0
                                }
                                style={[
                                    styles.butSubmit,
                                    {
                                        backgroundColor:
                                            errStartDate ||
                                            errEndDate ||
                                            errEndDateString.length > 0 ||
                                            errStartDateString.length > 0 ?
                                            NewColorDisable :
                                            NewColor
                                    }
                                ]}
                                onPress={this.handleSet}>
                                <Text style={styles.titleSubmit}>ÁP DỤNG</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        backgroundColor: '#fff',
        maxHeight: '86%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    title: {
        backgroundColor: '#F4F5F6',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        paddingLeft: 40,
        paddingVertical: 12,
    },
    itemStyle: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 40,
        paddingRight: 24,
    },
    lineStyle: {
        height: 1,
        backgroundColor: '#F6F5F6',
        marginHorizontal: 24,
    },
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.5,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
    },
    itemTime: {
        flex: 1,
    },
    textStyle: {
        color: TxtColor,
        fontSize: 14,
        flex: 1,
    },
    textTime: {
        color: '#B3B2B3',
        fontSize: 14,
    },
    containerSubmit: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingBottom: 32,
    },
    butSubmit: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 10,
        backgroundColor: NewColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleSubmit: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

const mapStateToProps = (state, ownProps) => {
    const obj = state.commissions.dataCommission[ownProps.idRoute] ? state.commissions.dataCommission[ownProps.idRoute].options : {};
    return {
        options: obj,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModalSelectTime);
