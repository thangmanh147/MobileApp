import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Clipboard,
} from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { Color, TxtColor, NewColor, errValidColor, nameApp, colorNote } from '../../config/System';
import { connect } from 'react-redux';
import { infoInsur, statusContract } from './assets';
import SimpleToast from 'react-native-simple-toast';
import { updateStatusNotify } from './actions';
import IconArrowRightSvg from '../../config/images/icons/IconArrowRightSvg';

class ItemNotify extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onCopy = (value) => {
        SimpleToast.show('Đã sao chép', 0.5);
        Clipboard.setString(value);
    };

    handleItem = () => {
        const { item, updateNotify, notifyInfo } = this.props;
        if (!item.isReading) {
            const arr = notifyInfo?.data?.map(obj => {
                if (obj._id === item._id) {
                    obj.isReading = true;
                    return obj;
                }
                return obj;

            });
            const total = notifyInfo?.totalLength;
            const notRead = notifyInfo?.notRead - 1;
            updateNotify(item?._id, arr, total, notRead);
        }
        if (!item?.content?.createdBy && item?.content?.type !== 'ACCOUNT') {
            const contractCode = item?.content?.contractCode?.split('.');
            const codeInsur = contractCode ? contractCode.filter(i => infoInsur[i]).toString() : '';
            Actions.DetailNotify({ contractId: item?.content?.contractId, codeContract: item?.content?.contractCode, insurCode: codeInsur });
        }
    };

    render() {
        const { item } = this.props;
        const statusItem = statusContract[item?.content?.status] || statusContract.default;
        return (
            <TouchableOpacity
                onPress={this.handleItem}
                style={[styles.contractItem,
                    !item?.isReading && nameApp.includes('YCHI') ?  {
                        backgroundColor: '#E9EFFD'
                    } : {}
                ]}>
                {statusItem}
                <View style={{ paddingLeft: 24, paddingRight: 10, flex: 1, paddingVertical: 16 }}>
                    <Text
                        style={[
                            styles.text,
                            {
                                marginBottom: 4,
                                fontWeight: !item?.isReading ? 'bold' : 'normal',
                            }
                        ]}>
                        {item?.content?.title}
                    </Text>
                    <Text style={[styles.text, { marginBottom: 4 }]}>{item?.content?.message}</Text>
                    {
                        item?.content?.createdBy ? (
                            <Text style={[styles.text, { marginBottom: 4 }]}>Cấp bởi: {item?.content?.createdBy}</Text>
                        ) : null
                    }
                    <Text numberOfLines={1} style={styles.text}>
                        {moment(item?.content?.createdAt).format('HH:mm - DD/MM/YYYY')}
                    </Text>
                </View>
                {
                    !item?.isReading && !nameApp.includes('YCHI') ? (
                        <View
                            style={{
                                height: 8,
                                width: 8,
                                backgroundColor: errValidColor,
                                borderRadius: 50,
                                position: 'absolute',
                                right: 17,
                                top: 21
                            }} />
                    ) : null
                }
                {
                    (item?.content?.createdBy || item?.content?.type === 'ACCOUNT') ? null : (
                        <View style={{ justifyContent: 'center' }}>
                            <IconArrowRightSvg width={15} height={15} color={colorNote} />
                        </View>
                    )
                }
            </TouchableOpacity>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        marginHorizontal: 24,
        paddingLeft: 24,
        paddingRight: 14,
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
    text: {
        fontSize: 14,
        color: TxtColor,
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
        notifyInfo: state.notifyInfo.notifyInfo,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateNotify: (id, arr, total, notRead) =>
            dispatch(updateStatusNotify(id, arr, total, notRead)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ItemNotify);
