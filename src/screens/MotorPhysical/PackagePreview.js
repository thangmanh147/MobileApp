import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import { widthPercentageToDP, heightPercentageToDP } from '../../config/ConfigResponsive';
import { Color, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import Input from './components/Input';
import { validationPackage } from './components/Validate';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import InputSelect from './components/InputSelect';
import TotalFee from './TotalFee';
import { formatVND } from '../../components/Functions';
import IconEditSvg from '../../config/images/icons/IconEditSvg';

function PackagePreview({ infoMotor }) {

    const arr = [
        { name: 'Cháy nổ', status: infoMotor?.info?.dataFee?.fee01Status, fee: infoMotor?.info?.dataFee?.fee01Vat },
        { name: 'Mất cắp, mất cướp\ntoàn bộ xe', status: infoMotor?.info?.dataFee?.fee02Status, fee: infoMotor?.info?.dataFee?.fee02Vat },
        { name: 'Do các nguyên nhân khác', status: infoMotor?.info?.dataFee?.fee03Status, fee: infoMotor?.info?.dataFee?.fee03Vat },
    ];
    const _arr = arr.filter(item => item.status === 'active');

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer1}>
                <View style={{ flex: 2.5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: Color }}>
                        Gói bảo hiểm
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Actions.MotorPhysicalPackage()} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                    <IconEditSvg width={16} height={15} />
                </TouchableOpacity>
            </View>
            {
                _arr?.map((item, index) => (
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.textStyle}>
                                {index + 1}.{item.name}
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[styles.dataStyle, { color: Color }]}>
                                {formatVND(item.fee, '.')}VNĐ
                            </Text>
                        </View>
                    </View>
                ))
            }
            <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.dataStyle1}>
                        Thời hạn bảo hiểm
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        Từ {infoMotor?.info?.dateFrom}
                    </Text>
                    <Text style={styles.dataStyle}>
                        đến {infoMotor?.dateTo}
                    </Text>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />

            <View style={[styles.titleContainer, { alignItems: 'center' }]}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: TxtColor, fontWeight: 'bold', fontSize: 14 }}>
                        Tổng phí (gồm VAT)
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>
                        {formatVND(infoMotor?.info?.dataFee?.feeVat, '.')}VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />
            <View style={[styles.titleContainer, { alignItems: 'center' }]}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: TxtColor, fontWeight: 'bold', fontSize: 14 }}>
                        Thanh toán
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>
                        {formatVND(infoMotor?.info?.dataFee?.feeVat, '.')}VNĐ
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F5F6',
        borderRadius: 10,
        paddingVertical: 16,
        paddingHorizontal: 12
    },
    titleContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        paddingTop: 12
    },
    textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TxtColor
    },
    dataStyle: {
        fontSize: 14,
        color: TxtColor,
        textAlign: 'right'
    },
    dataStyle1: {
        fontSize: 14,
        color: TxtColor,
    }

});


const mapStateToProps = state => ({
    infoMotor: state?.motorPhysical?.infoMotor
});

export default connect(mapStateToProps, {})(PackagePreview);

