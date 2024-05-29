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
import { Color, NewColor } from '../../../config/System';
import ModalTimePicker from '../../../components/datepicker/ModalTimePicker';
import moment from 'moment';
import {connect} from 'react-redux';
import {getKPIInfo} from '../actions/kpiAction';
import SimpleToast from 'react-native-simple-toast';
import IconFilterSvg from '../../../config/images/icons/IconFilterSvg';
import IconCheckedBoxSvg from '../../../config/images/icons/IconCheckedBoxSvg';
import IconBoxSvg from '../../../config/images/icons/IconBoxSvg';
import IconRadioBtnActiveSvg from '../../../config/images/icons/IconRadioBtnActiveSvg';
import IconRadioBtnSvg from '../../../config/images/icons/IconRadioBtnSvg';

const listFilter = [
    {
        statusFilter: 'Tuần này',
    },
    {
        statusFilter: 'Tuần trước',
    },
    {
        statusFilter: 'Tháng trước',
    },
    {
        statusFilter: 'Tùy chọn',
    },
];

const listInsure = [
    {
        name: 'Tất cả',
    },
    {
        name: 'BH TNDS Ô TÔ',
    },
    {
        name: 'BH TNDS XE MÁY',
    },
    {
        name: 'BH Tai nạn',
    },
    {
        name: 'BH Vật chất Xe',
    },
];

const listGroup = [
    {
        name: 'Tất cả',
    },
    {
        name: 'Nhóm 1',
    },
    {
        name: 'Nhóm 2',
    },
];
class ModalSelectTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemSelected: props.objTimer.itemSelected,
            insureSelected: props.objTimer.insureSelected,
            // groupSelected: [0, 1, 2],
            startDate: props.objTimer.startDate,
            startDateString: props.objTimer.startDateString || '',
            endDate: props.objTimer.endDate,
            endDateString: props.objTimer.endDateString || '',
            showModal: false,
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {objTimer} = this.props;
        if(objTimer.itemSelected !== prevProps.objTimer.itemSelected) {
            this.setState({itemSelected: objTimer.itemSelected});
        }
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

    // onSelectGroup = (index) => {
    //     const {groupSelected} = this.state;
    //     if (index === 0) {
    //         this.setState({groupSelected: [0, 1, 2]});
    //     } else if (groupSelected.length === 3) {
    //         this.setState({groupSelected: [index]});
    //     } else if (!groupSelected.includes(index)) {
    //         const arr = groupSelected.concat([index]);
    //         this.setState({groupSelected: arr.length === 2 ? [0, 1, 2] : arr});
    //     }
    // };

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
            // groupSelected,
        } = this.state;
        const {idRoute, onSet, onClosed} = this.props;
        if(itemSelected === 3 && (startDateString === '' || endDateString === '')) {
            SimpleToast.show('Bạn chưa chọn thời gian');
            return null;
        }
        if(itemSelected === 3 && (moment(endDateString, 'DD/MM/YYYY').diff(moment(startDateString, 'DD/MM/YYYY'), 'days') + 1 <= 1)) {
            SimpleToast.show('Ngày đến phải lớn hơn ngày đi');
            return null;
        }
        if(insureSelected && insureSelected.filter(item => item.status === 'active').length === 0) {
            SimpleToast.show('Bạn chưa chọn loại bảo hiểm');
            return null;
        }
        this.onHideOptionTypes();
        if (itemSelected === 0) {
            const arr = [0, 1, 2, 3, 4, 5, 6];
            const _arr = arr.map((i) =>
                moment().startOf('week').add(i, 'days').format('DD/MM'));
            const fromDate = moment().startOf('week').format('DD/MM');
            const toDate = moment().startOf('week').add(6, 'days').format('DD/MM/YYYY');

            onSet(idRoute, {
                type: 'day',
                nameTitle: 'tuần',
                nameLabelX: 'Ngày',
                arrX: _arr,
                arrY: _arr.map((item, index) => index * 6 + 80).reverse(),
                long: 7,
                from: fromDate,
                to: toDate,
                startDateString,
                endDateString,
                startStr: moment().startOf('week').format('DD/MM/YYYY'),
                endStr: toDate,
                startDate,
                endDate,
                itemSelected: itemSelected,
                insureSelected: insureSelected,
                // groupSelected: groupSelected,
            });
        } else if (itemSelected === 1) {
            // const arr = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
            // const fromDate = moment().startOf('month').subtract(1, 'months').format('MM/YYYY');

            // onSet(idRoute, {
            //     type: 'week',
            //     nameTitle: 'tháng',
            //     nameLabelX: 'Tuần',
            //     arrX: arr,
            //     arrY: arr.map((item, index) => index * 6 + 80).reverse(),
            //     long: 4,
            //     from: fromDate,
            //     startDateString,
            //     endDateString,
            //     startStr: moment().startOf('month').subtract(1, 'months').format('DD/MM/YYYY'),
            //     endStr: moment().startOf('month').subtract(1, 'days').format('DD/MM/YYYY'),
            //     startDate,
            //     endDate,
            //     itemSelected: itemSelected,
            //     insureSelected: insureSelected,
            //     // groupSelected: groupSelected,
            // });
            const arr = [7, 6, 5, 4, 3, 2, 1];
            const _arr = arr.map((i) =>
                moment().startOf('week').subtract(i, 'days').format('DD/MM'));
            const fromDate = moment().startOf('week').subtract(7, 'days').format('DD/MM');
            const toDate = moment().startOf('week').subtract(1, 'days').format('DD/MM/YYYY');

            onSet(idRoute, {
                type: 'day',
                nameTitle: 'tuần',
                nameLabelX: 'Ngày',
                arrX: _arr,
                arrY: _arr.map((item, index) => index * 6 + 80).reverse(),
                long: 7,
                from: fromDate,
                to: toDate,
                startDateString,
                endDateString,
                startStr: moment().startOf('week').subtract(7, 'days').format('DD/MM/YYYY'),
                endStr: toDate,
                startDate,
                endDate,
                itemSelected: itemSelected,
                insureSelected: insureSelected,
                // groupSelected: groupSelected,
            });
        } else if (itemSelected === 2) {
            // const arr = [0, 1, 2];
            // const _arr = arr.map((i) =>
            //     'T' + moment().startOf('quarter').subtract(1, 'quarters').add(i, 'months').format('M'));
            // const fromDate = moment().startOf('quarter').subtract(1, 'quarters').format('Q/YYYY');

            // onSet(idRoute, {
            //     type: 'month',
            //     nameTitle: 'quý',
            //     nameLabelX: 'Tháng',
            //     arrX: _arr,
            //     arrY: _arr.map((item, index) => index * 6 + 80).reverse(),
            //     long: 3,
            //     from: fromDate,
            //     startDateString,
            //     endDateString,
            //     startStr: moment().startOf('quarter').subtract(1, 'quarters').format('DD/MM/YYYY'),
            //     endStr: moment().startOf('quarter').subtract(1, 'days').format('DD/MM/YYYY'),
            //     startDate,
            //     endDate,
            //     itemSelected: itemSelected,
            //     insureSelected: insureSelected,
            //     // groupSelected: groupSelected,
            // });
            const arr = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
            const fromDate = moment().startOf('month').subtract(1, 'months').format('MM/YYYY');

            onSet(idRoute, {
                type: 'week',
                nameTitle: 'tháng',
                nameLabelX: 'Tuần',
                arrX: arr,
                arrY: arr.map((item, index) => index * 6 + 80).reverse(),
                long: 4,
                from: fromDate,
                startDateString,
                endDateString,
                startStr: moment().startOf('month').subtract(1, 'months').format('DD/MM/YYYY'),
                endStr: moment().startOf('month').subtract(1, 'days').format('DD/MM/YYYY'),
                startDate,
                endDate,
                itemSelected: itemSelected,
                insureSelected: insureSelected,
                // groupSelected: groupSelected,
            });
        } else if (itemSelected === 3) {
            const from = [moment(startDate).year(), moment(startDate).month(), moment(startDate).date()];
            const to = [moment(endDate).year(), moment(endDate).month(), moment(endDate).date()];
            const longDays = moment(to).diff(moment(from), 'days');
            if (longDays + 1 <= 7) {
                const arr = [];
                const fromDateStr = moment(startDate).format('DD/MM');
                for(i = 0; i <= longDays; i++) {
                    arr.push(moment(startDate).add(i, 'days').format('DD/MM'));
                }

                onSet(idRoute, {
                    type: 'day',
                    nameTitle: 'ngày',
                    nameLabelX: 'Ngày',
                    arrX: arr,
                    arrY: arr.map((item, index) => index * 6 + 80).reverse(),
                    long: longDays + 1,
                    from: fromDateStr,
                    to: endDateString,
                    startDateString,
                    endDateString,
                    startStr: startDateString,
                    endStr: endDateString,
                    startDate,
                    endDate,
                    itemSelected: itemSelected,
                    insureSelected: insureSelected,
                    // groupSelected: groupSelected,
                });
            } else if (7 < longDays + 1 && longDays + 1 <= 30) {
                const arr = [];
                const fromDateStr = moment(startDate).format('DD/MM');
                for(i = 1; i <= ((longDays + 1) % 7 > 0 ? Math.floor((longDays + 1) / 7) + 1 : Math.floor((longDays + 1) / 7)); i++) {
                    arr.push(`Tuần ${i}`);
                }

                onSet(idRoute, {
                    type: 'week',
                    nameTitle: 'tuần',
                    nameLabelX: 'Tuần',
                    arrX: arr,
                    arrY: arr.map((item, index) => index * 6 + 80).reverse(),
                    long: longDays + 1,
                    from: fromDateStr,
                    to: endDateString,
                    startDateString,
                    endDateString,
                    startStr: startDateString,
                    endStr: endDateString,
                    startDate,
                    endDate,
                    itemSelected: itemSelected,
                    insureSelected: insureSelected,
                    // groupSelected: groupSelected,
                });
            } else if (30 < longDays + 1 && longDays + 1 <= 90) {
                const arr = [];
                const from = moment(startDate).format('M');
                const end = moment(endDate).format('M');
                for(i = from; i <= end; i++) {
                    arr.push(`T${i}`);
                }

                onSet(idRoute, {
                    type: 'month',
                    nameTitle: 'tháng',
                    nameLabelX: 'Tháng',
                    arrX: arr,
                    arrY: arr.map((item, index) => index * 6 + 80).reverse(),
                    long: longDays + 1,
                    from: moment(startDate).format('MM/YYYY'),
                    to: moment(endDate).format('MM/YYYY'),
                    startDateString,
                    endDateString,
                    startStr: startDateString,
                    endStr: endDateString,
                    startDate,
                    endDate,
                    itemSelected: itemSelected,
                    insureSelected: insureSelected,
                    // groupSelected: groupSelected,
                });
            } else if (90 < longDays + 1 && longDays + 1 <= 366) {
                const arr = [];
                const from = moment(startDate).format('Q');
                const end = moment(endDate).format('Q');
                for(i = from; i <= end; i++) {
                    arr.push(`Quý ${i}`);
                }

                onSet(idRoute, {
                    type: 'quarter',
                    nameTitle: 'quý',
                    nameLabelX: 'Quý',
                    arrX: arr,
                    arrY: arr.map((item, index) => index * 6 + 80).reverse(),
                    long: longDays + 1,
                    from: moment(startDate).format('Q/YYYY'),
                    to: moment(endDate).format('Q/YYYY'),
                    startDateString,
                    endDateString,
                    startStr: startDateString,
                    endStr: endDateString,
                    startDate,
                    endDate,
                    itemSelected: itemSelected,
                    insureSelected: insureSelected,
                    // groupSelected: groupSelected,
                });
            }
        }
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
            // groupSelected,
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
                    onBackButtonPress={this.handleSet}
                    onBackdropPress={this.handleSet}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropTransitionInTiming={0}
                    backdropTransitionOutTiming={0}
                >
                    <View
                        style={styles.container}>
                        <ScrollView contentContainerStyle={{paddingBottom: 24}}>
                            <View style={styles.title}>
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#414042'}}>Lọc theo thời gian</Text>
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
                                                            maximumDate={new Date(moment(endDate).subtract(1, 'days').valueOf())}
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
                                                            minimumDate={new Date(moment(startDate).add(1, 'days').valueOf())}
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
                            }
                            {
                                fillInsure ? (
                                    <>
                                        <View style={[styles.title, {borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 15}]}>
                                            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#414042'}}>Lọc theo loại bảo hiểm</Text>
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
                                                                style={[styles.textStyle, {marginLeft: 8}, item.status === 'active' && {color: Color}]}
                                                            >
                                                                {item.name}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <View style={styles.lineStyle} />
                                                    </>
                                                );
                                            })
                                        }
                                    </>
                                ) : null
                            }
                            {/*{*/}
                            {/*    fillGroup ? (*/}
                            {/*        <>*/}
                            {/*            <View style={[styles.title, {borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 15}]}>*/}
                            {/*                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Lọc theo nhóm</Text>*/}
                            {/*            </View>*/}
                            {/*            {*/}
                            {/*                listGroup.map((item, index) => {*/}
                            {/*                    return (*/}
                            {/*                        <>*/}
                            {/*                            <TouchableOpacity*/}
                            {/*                                style={styles.itemStyle}*/}
                            {/*                                onPress={() => this.onSelectGroup(index)}*/}
                            {/*                                key={index}>*/}
                            {/*                                <FastImage*/}
                            {/*                                    source={*/}
                            {/*                                        groupSelected.includes(index) ?*/}
                            {/*                                            require('../../../icons/iconAgent/icon_check_active.png') :*/}
                            {/*                                            require('../../../icons/iconAgent/icon_check.png')*/}
                            {/*                                    }*/}
                            {/*                                    style={{height:15, width:15, marginRight: 12}}*/}
                            {/*                                />*/}
                            {/*                                <Text*/}
                            {/*                                    style={[styles.textStyle, groupSelected === index && {color: Color}]}*/}
                            {/*                                >*/}
                            {/*                                    {item.name}*/}
                            {/*                                </Text>*/}
                            {/*                            </TouchableOpacity>*/}
                            {/*                            <View style={styles.lineStyle} />*/}
                            {/*                        </>*/}
                            {/*                    );*/}
                            {/*                })*/}
                            {/*            }*/}
                            {/*        </>*/}
                            {/*    ) : null*/}
                            {/*}*/}
                        </ScrollView>
                        <View style={styles.containerSubmit}>
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
        paddingVertical: 15,
    },
    itemStyle: {
        backgroundColor: 'white',
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
    ctModal: {
        backgroundColor: '#fff',
        flex: 0.5,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
    },
    itemTime: {
        flex: 1,
    },
    textStyle: {
        color: '#414042',
        fontSize: 14,
    },
    textTime: {
        color: '#B3B2B3',
        fontSize: 14,
    },
    containerSubmit: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    butSubmit: {
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
        objTimer: state.kpi.kpiInfo[ownProps.idRoute],
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onSet: (id, data) => dispatch(getKPIInfo(id, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModalSelectTime);
