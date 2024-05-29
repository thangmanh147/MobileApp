import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Color, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import { formatVND } from '../../components/Functions';
import IconEditSvg from '../../config/images/icons/IconEditSvg';

function PackagePreview({ infoHouse }) {
    const fee = infoHouse?.info?.check ? (infoHouse?.feeHouse + infoHouse?.feeInHouse) : infoHouse?.feeHouse;
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer1}>
                <View style={{ flex: 2.5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: Color }}>
                        Gói bảo hiểm:
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Actions.HousePackage()} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                    <IconEditSvg width={16} height={15} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Loại bảo hiểm
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={[styles.dataStyle]}>
                        Bảo hiểm căn nhà (gồm VAT)
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Mức khấu trừ/vụ
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={[styles.dataStyle]}>
                        {formatVND(infoHouse?.unitHouse)}VNĐ/vụ
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Số tiền bảo hiểm
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={[styles.dataStyle, { color: Color }]}>
                        {formatVND(infoHouse?.info?.valueHouse)}VNĐ
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Phí bảo hiểm
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={[styles.dataStyle, { color: Color }]}>
                        {formatVND(Math.ceil(infoHouse?.feeHouse / 1.1))}VNĐ
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        VAT
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={[styles.dataStyle, { color: Color }]}>
                        {formatVND(Math.ceil(infoHouse?.feeHouse / 1.1 * 0.1))}VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />
            {
                infoHouse?.info?.check ? (
                    <>
                        <View style={styles.titleContainer}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>
                                    Loại bảo hiểm
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={[styles.dataStyle]}>
                                    Bảo hiểm tài sản bên trong nhà (gồm VAT)
                                </Text>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>
                                    Mức khấu trừ/vụ
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={[styles.dataStyle]}>
                                    {formatVND(infoHouse?.unitInHouse)}VNĐ/vụ
                                </Text>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>
                                    Số tiền bảo hiểm
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={[styles.dataStyle, { color: Color }]}>
                                    {infoHouse?.info?.inHouseType}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>
                                    Phí bảo hiểm
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={[styles.dataStyle, { color: Color }]}>
                                    {formatVND(infoHouse?.feeInHouse)}VNĐ
                                </Text>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />
                    </>
                ) : null
            }

            <View style={[styles.titleContainer, { alignItems: 'center' }]}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: TxtColor, fontWeight: 'bold', fontSize: 14 }}>
                        Tổng phí (gồm VAT)
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={{ color: Color, fontSize: 14, fontWeight: 'bold' }}>
                        {formatVND(fee)}VNĐ
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
    infoHouse: state.houseInsurance.infoHouse
});

export default connect(mapStateToProps)(PackagePreview);

