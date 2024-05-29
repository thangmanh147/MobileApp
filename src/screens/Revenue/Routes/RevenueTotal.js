import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';
import jwt_decode from "jwt-decode";
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import {Color, TxtColor, contractsFilter} from '../../../config/System';
import {connect} from 'react-redux';
import ModalSelectTime from '../ModalSelectTime';
import { formatVND } from '../../../components/Functions';
import moment from 'moment';
import { getListTotal } from '../actions';
import { dateImages } from '../assets';

class RevenueTotal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        new Store().getSession(Const.TOKEN).then(token => {
            const {listRevenue, options, insuranceInfo} = this.props;
            if(listRevenue.length === 0 && !options.dateType) {
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
                const objInsure = _arrInsur.filter((item) => item.id !== '1' && item.status === 'active');
                const _objInsure = objInsure.map((item) => item.codes ? `${item.code},${item.codes}` : item.code);
                this.onSet({
                    startDateStr: moment().startOf('week').format('DD/MM/YYYY'),
                    endDateStr: moment().startOf('week').add(6, 'days').format('DD/MM/YYYY'),
                    dateType: 'createdAt',
                    productCode: _objInsure.toString(),
                    insureSelected: JSON.parse(JSON.stringify(_arrInsur)),
                    orgSelected: JSON.parse(JSON.stringify(_arr)),
                    orgId: _arr.filter((item) => item?._id !== '1' && item?.status === 'active').map((item) => item?._id).toString()
                });
            }
        })
    }

    onSet = (objModal) => {
        const { getListTotal } = this.props;
        getListTotal(objModal);
    };

    renderTitle = () => {
        const {options} = this.props;
        if (options?.dateType === 'createdAt') {
            return 'Theo ngày cấp';
        } else if (options?.dateType === 'effectiveAt') {
            return 'Theo ngày hiệu lực';
        } else if (options?.dateType === 'paidAt') {
            return 'Theo ngày thanh toán';
        }
    };

    renderDate = () => {
        const {options} = this.props;
        if (options?.startDateStr?.slice(5) === options?.endDateStr?.slice(5)) {
            return `từ ${options?.startDateStr?.slice(0, 5)} - ${options?.endDateStr}`;
        } else {
            return `từ ${options?.startDateStr} - ${options?.endDateStr}`;
        }
    };

    renderToTal = () => {
        const {listRevenue} = this.props;
        const arr = listRevenue && listRevenue.map(item => item?.revenue);
        return arr?.reduce((a, b) => a + b, 0);
    };

    render() {
        const {listRevenue, options} = this.props;
        return (
            <ScrollView style={{flex: 1}} contentContainerStyle={{marginHorizontal: 24}}>
                <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', marginVertical: 16, justifyContent: 'flex-end'}}>
                    <ModalSelectTime onSet={this.onSet} idRoute={'3'} />
                </View>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: TxtColor, textAlign: 'center'}}>DOANH THU</Text>
                <View style={{flexDirection: 'row', marginTop: 4}}>
                    <View style={{flex: 1}}>
                        <Text style={{color: Color, fontSize: 14}}>{this.renderTitle()}</Text>
                    </View>
                    <View style={{flex: 1.2}}>
                        <Text style={{color: Color, fontSize: 14, textAlign: 'right'}}>{this.renderDate()}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 12}}>
                    <View style={{flex: 1}}>
                        <Text style={{color: TxtColor, fontSize: 14, fontWeight: 'bold'}}>Tổng cộng</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{color: TxtColor, fontSize: 14, textAlign: 'right', fontWeight: 'bold'}}>{formatVND(this.renderToTal())}đ</Text>
                    </View>
                </View>
                {
                    listRevenue && listRevenue.map((item, index) => (
                        <View style={{
                            flexDirection: 'row',
                            paddingVertical: 12,
                            borderTopWidth: index === 0 ? 1 : 0,
                            borderColor: '#F6F5F6',
                            borderBottomWidth: 1,
                        }}>
                            <View style={{flex: 1.3, flexDirection: 'row'}}>
                                {dateImages[item?.product] ? dateImages[item?.product].icon : dateImages.default.icon}
                                <Text style={{color: TxtColor, fontSize: 14, marginLeft: 8}}>
                                    {dateImages[item?.product] ? dateImages[item?.product].name : dateImages.default.name}
                                </Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{color: TxtColor, fontSize: 14, textAlign: 'right'}}>{formatVND(item?.revenue)}đ</Text>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
});

const mapStateToProps = (state) => {
    const arr = state.revenues.dataRevenue['3'] ? state.revenues.dataRevenue['3'].list : [];
    const obj = state.revenues.dataRevenue['3'] ? state.revenues.dataRevenue['3'].options : {};
    return {
        listRevenue: arr,
        options: obj,
        insuranceInfo: state.insurance.insuranceInfo,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTotal: (body) =>  dispatch(getListTotal(body)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RevenueTotal);
