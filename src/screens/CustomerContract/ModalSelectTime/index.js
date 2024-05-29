import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image'
import { Color, colorNote, contractsFilter, nameApp, NewColor, textDisable, TxtColor } from '../../../config/System';
import ModalTimePicker from '../../../components/datepicker/ModalTimePicker';
import moment from 'moment';
import {connect} from 'react-redux';
import jwt_decode from "jwt-decode";
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import SimpleToast from 'react-native-simple-toast';
import IconFilterSvg from '../../../config/images/icons/IconFilterSvg';
import IconCheckedBoxSvg from '../../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../../config/images/icons/IconBoxSvg';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

const listFilter = [
    {
        statusFilter: 'Tuần trước',
    },
    {
        statusFilter: 'Tháng trước',
    },
    {
        statusFilter: 'Quý trước',
    },
    {
        statusFilter: 'Tùy chọn',
    },
];

class ModalSelectTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemSelected: 3,
            insureSelected: [],
            orgSelected: [],
            statusContracts: [
                {
                    id: '1',
                    status: 'active',
                    name: 'Tất cả',
                },
                {
                    id: '2',
                    status: 'active',
                    name: 'Chưa thanh toán',
                    code: 'chua-thanh-toan'
                },
                {
                    id: '3',
                    status: 'active',
                    name: 'Đã thanh toán',
                    code: 'da-thanh-toan'
                },
                {
                    id: '4',
                    status: 'active',
                    name: 'Đang hiệu lực',
                    code: 'dang-hieu-luc'
                },
                {
                    id: '5',
                    status: 'active',
                    name: 'Hết hiệu lực',
                    code: 'het-hieu-luc'
                },
                {
                    id: '6',
                    status: 'active',
                    name: 'Hủy',
                    code: 'huy'
                },
            ],
            startDate: null,
            startDateString: '',
            endDate: null,
            endDateString: '',
            showModal: false,
        };
    }

    componentDidMount() {
        new Store().getSession(Const.TOKEN).then(token => {
            const {insuranceInfo} = this.props;
            const dataToken = jwt_decode(token);
            let _arr = [];
            const arr = dataToken?.organizations && dataToken?.organizations.filter((item) => item?.type === 'AGENT');
            if (arr?.length > 1) {
                const itemFull = [{_id: '1', name: 'Tất cả', status: 'active'}]
                _arr = itemFull.concat(arr.map((item) => {
                    item.status = 'active';
                    return item;
                }))
            }
            const arrInsur = contractsFilter;
            const _arrInsur = arrInsur.filter(item => {
                if (item.id === '1' || (insuranceInfo && insuranceInfo.find(i => i.code === item.code))) {
                    return true;
                }
                return false;
            });
            this.setState({
                insureSelected: _arrInsur,
                orgSelected: _arr,
            }, () => this.handleSet());
        })
    }

    onShowOptionTypes = () => {
        this.setState({showModal: true});
    };

    onHideOptionTypes = () => {
        this.setState({showModal: false});
    };

    onSelect = (index) => {
        this.setState({itemSelected: index});
    };

    onSelectInsure = (index, value) => {
        const {insureSelected} = this.state;
        if (index === 0) {
            const arr = insureSelected.map((item) => {
                item.status = value;
                return item;
            })
            this.setState({insureSelected: arr});
        } else {
            if(value === '') {
                insureSelected[0].status = '';
            } else {
                const arr = insureSelected.filter((item) => item.status === '');
                if(arr.length === 2) {
                    insureSelected[0].status = 'active';
                }
            }
            insureSelected[index].status = value;
            this.setState({insureSelected: insureSelected});
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

    onSelectStatus = (index, value) => {
        const {statusContracts} = this.state;
        if (index === 0) {
            const arr = statusContracts.map((item) => {
                item.status = value;
                return item;
            })
            this.setState({statusContracts: arr});
        } else {
            if(value === '') {
                statusContracts[0].status = '';
            } else {
                const arr = statusContracts.filter((item) => item.status === '');
                if(arr.length === 2) {
                    statusContracts[0].status = 'active';
                }
            }
            statusContracts[index].status = value;
            this.setState({statusContracts: statusContracts});
        }
    };

    onPickerStart = (text, dataDate) => {
        this.setState({startDateString: text, startDate: dataDate});
    };

    onPickerEnd = (text, dataDate) => {
        this.setState({endDateString: text, endDate: dataDate});
    };

    handleSet = () => {
        const {
            startDateString,
            endDateString,
            startDate,
            endDate,
            itemSelected,
            insureSelected,
            orgSelected,
            statusContracts,
        } = this.state;
        const {onSet} = this.props;
        let fromDate = '', toDate = '', status = '', expiredAt = '', productCode = '', type = '', orgId = '';
        // if(statusContracts && statusContracts.filter(item => item.status === 'active').length === 0) {
        //     SimpleToast.show('Bạn chưa chọn trạng thái hợp đồng');
        //     return null;
        // }
        // if(insureSelected && insureSelected.filter(item => item.status === 'active').length === 0) {
        //     SimpleToast.show('Bạn chưa chọn loại bảo hiểm');
        //     return null;
        // }
        // if(itemSelected === 3 && (startDateString === '' || endDateString === '')) {
        //     SimpleToast.show('Bạn chưa chọn thời gian');
        //     return null;
        // }
        this.onHideOptionTypes();
        if (statusContracts[0].status !== 'active') {
            const objStatus = statusContracts.filter((item) => item.id !== '1' && item.status === 'active');
            const _objStatus = objStatus.map((item) => item.code);
            status = _objStatus.toString();
        }
        const objInsure = insureSelected.filter((item) => item.id !== '1' && item.status === 'active');
        const _objInsure = objInsure.map((item) => item.codes ? `${item.code},${item.codes}` : item.code);
        productCode = _objInsure.toString();
        const objOrg = orgSelected.filter((item) => item?._id !== '1' && item?.status === 'active');
        const _objOrg = objOrg.map((item) => item?._id);
        orgId = _objOrg.toString();
        if (itemSelected === 0) {
            fromDate = moment().startOf('week').subtract(7, 'days').format('DD/MM/YYYY');
            toDate = moment().startOf('week').subtract(1, 'days').format('DD/MM/YYYY');
        } else if (itemSelected === 1) {
            fromDate = moment().startOf('month').subtract(1, 'months').format('DD/MM/YYYY');
            toDate = moment().startOf('month').format('DD/MM/YYYY');
        } else if (itemSelected === 2) {
            fromDate = moment().startOf('quarter').subtract(1, 'quarters').format('DD/MM/YYYY');
            toDate = moment().startOf('quarter').format('DD/MM/YYYY');
        } else if (itemSelected === 3) {
            fromDate = startDateString;
            toDate = endDateString;
        }
        onSet({fromDate, toDate, status, expiredAt, productCode, type, orgId});
    };

    render() {
        const {fillInsure, fillGroup} = this.props;
        const {
            startDateString,
            endDateString,
            startDate,
            endDate,
            itemSelected,
            insureSelected,
            orgSelected,
            statusContracts,
            isOpen,
            showModal,
        } = this.state;
        return (
            <>
                <TouchableOpacity onPress={this.onShowOptionTypes}>
                    <IconFilterSvg width={20} height={20} />
                </TouchableOpacity>
                <Modal
                    isVisible={showModal}
                    style={{margin: 0, justifyContent: 'flex-end'}}
                    onBackButtonPress={this.onHideOptionTypes}
                    onBackdropPress={this.onHideOptionTypes}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                >
                    <View
                        style={styles.container}>
                        <ScrollView style={{marginBottom: 10}} contentContainerStyle={{paddingBottom: 24}}>
                            {
                                orgSelected.length > 0 ? (
                                    <View>
                                        <View style={styles.title}>
                                            <Text style={{fontSize: 16, fontWeight: 'bold', color: TxtColor}}>Lọc theo đại lý</Text>
                                        </View>
                                        {
                                            orgSelected.map((item, index) => {
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
                                <View style={[styles.title, orgSelected.length > 0 ? {borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 18} : null]}>
                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: TxtColor}}>Lọc theo trạng thái hợp đồng</Text>
                                </View>
                                {
                                    statusContracts.map((item, index) => {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    style={styles.itemStyle}
                                                    onPress={() => this.onSelectStatus(index, item.status === 'active' ? '' : 'active')}
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
                            <View>
                                <View style={[styles.title, {borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 18}]}>
                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: TxtColor}}>Lọc theo loại bảo hiểm</Text>
                                </View>
                                {
                                    insureSelected.map((item, index) => {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    style={styles.itemStyle}
                                                    onPress={() => this.onSelectInsure(index, item.status === 'active' ? '' : 'active')}
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
                            {/* <View style={[styles.title, {borderTopLeftRadius: 0, borderTopRightRadius: 0}]}>
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: TxtColor}}>Lọc theo thời gian</Text>
                            </View>
                            {
                                listFilter.map((item, index) => {
                                    if(index === 3) {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    style={styles.itemStyle}
                                                    onPress={() => this.onSelect(index)}
                                                    key={index}>
                                                    {
                                                        itemSelected === index ? (
                                                            <IconRadioBtnActiveSvg width={15} height={15} />
                                                        ) : (
                                                            <IconRadioBtnSvg width={15} height={15} />
                                                        )
                                                    }
                                                    <Text
                                                        style={[styles.textStyle, {marginLeft: 12}, itemSelected === index && {color: Color}]}
                                                    >
                                                        {item.statusFilter}
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={styles.itemTime}>
                                                        <ModalTimePicker
                                                            maximumDate={endDate}
                                                            editable={itemSelected === index}
                                                            checkDate
                                                            onPicker={this.onPickerStart}
                                                        >
                                                            <Text
                                                                style={[styles.textTime, {marginLeft: 67}]}>
                                                                {'Từ '}
                                                                {
                                                                    startDateString.length > 0 ? (
                                                                        <Text style={styles.textStyle}>{startDateString}</Text>
                                                                    ) : 'dd/mm/yyyy'
                                                                }
                                                            </Text>
                                                        </ModalTimePicker>
                                                    </View>
                                                    <View style={[styles.itemTime, {alignItems: 'center'}]}>
                                                        <ModalTimePicker
                                                            minimumDate={startDate}
                                                            editable={itemSelected === index}
                                                            checkDate
                                                            onPicker={this.onPickerEnd}
                                                        >
                                                            <Text
                                                                style={styles.textTime}>
                                                                {'Đến '}
                                                                {
                                                                    endDateString.length > 0 ? (
                                                                        <Text style={styles.textStyle}>{endDateString}</Text>
                                                                    ) : 'dd/mm/yyyy'
                                                                }
                                                            </Text>
                                                        </ModalTimePicker>
                                                    </View>
                                                </View>
                                            </>
                                        );
                                    }
                                    return (
                                        <>
                                            <TouchableOpacity
                                                style={styles.itemStyle}
                                                onPress={() => this.onSelect(index)}
                                                key={index}>
                                                {
                                                    itemSelected === index ? (
                                                        <IconRadioBtnActiveSvg width={15} height={15} />
                                                    ) : (
                                                        <IconRadioBtnSvg width={15} height={15} />
                                                    )
                                                }
                                                <Text
                                                    style={[styles.textStyle, {marginLeft: 12}, itemSelected === index && {color: Color}]}
                                                >
                                                    {item.statusFilter}
                                                </Text>
                                            </TouchableOpacity>
                                            <View style={styles.lineStyle} />
                                        </>
                                    );
                                })
                            } */}
                        </ScrollView>
                        <View style={styles.containerSubmit}>
                            <TouchableOpacity style={[styles.butSubmit, {backgroundColor: 'white'}]} onPress={this.onHideOptionTypes}>
                                <Text style={[styles.titleSubmit, {color: colorNote}]}>BỎ CHỌN</Text>
                            </TouchableOpacity>
                            <View style={{width: 12}} />
                            <TouchableOpacity style={styles.butSubmit} onPress={this.handleSet}>
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
        paddingTop: 18,
        paddingLeft: 40,
        paddingRight: 24,
    },
    lineStyle: {
        height: 1,
        backgroundColor: textDisable,
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
    return {
        insuranceInfo: state.insurance.insuranceInfo,
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
