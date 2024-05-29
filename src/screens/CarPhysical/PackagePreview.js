import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import { Color, colorNote, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import { formatVND } from '../../components/Functions';
import IconEditSvg from '../../config/images/icons/IconEditSvg';

function PackagePreview({ fee, dataStep2, infoCar, promotionPrice, codeSelected }) {
    const dataPackage = dataStep2?.dataPackage
    // const renderTotalVc = () => {
    //     let dataPackage = dataStep2?.dataPackage
    //     let fee = dataPackage?.vc + (dataPackage?.bs02 || 0) + (dataPackage?.bs04 || 0) + (dataPackage?.bs05 || 0) + (dataPackage?.bs06 || 0) + (dataPackage?.bs13 || 0)

    //     return fee
    // }

    const renderAfterDisCount = () => {
        let fee = renderTotal()
        let tru = 0

        if (dataStep2?.moneyDiscount > 0) {
            tru = dataStep2?.moneyDiscount
            if (dataStep2?.moneyDiscount > 100) {
                tru = dataStep2?.moneyDiscount
            } else {
                tru = fee - dataStep2?.moneyDiscount
            }
        }
        // if(tru < 6500000 && purpose_car.value === 'N' && seat < 9) {
        //     tru = 6500000;
        // }
        return tru
    }

    const renderTotal = () => {
        return dataPackage?.fee + (dataStep2?.checkTNDS ? dataStep2?.feeTNDS?.feeVat : 0) + ((dataStep2?.checkTNLX && dataStep2?.insuranceMoney) ? dataStep2?.insuranceMoney?.feeVat : 0)
    }

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer1}>
                <View style={{ flex: 2.5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: TxtColor }}>
                        Gói bảo hiểm
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Actions.PackageCarPhysical()} style={{ flex: 0.5, alignItems: 'flex-end' }}>
                    <IconEditSvg width={16} height={15} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', paddingBottom: 12, marginTop: 12 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>1.BH vật chất xe</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{formatVND((dataPackage?.feeBase || dataPackage?.fee), '.')}VNĐ</Text>
                </View>
            </View>
            {dataPackage?.vc && (
                <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: TxtColor, fontSize: 14 }}>- Phí cơ bản</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(dataPackage?.vc, '.')}VNĐ</Text>
                    </View>
                </View>
            )}
            {
                codeSelected === 'VNI' && dataStep2?.listPkgsVNI && dataStep2?.listPkgsVNI.filter(item => item?.isSelect).map((item) => (
                    <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: TxtColor, fontSize: 14 }}>- {item?.NAME}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{item?.PHI_DKBS == 0 ? 'Miễn phí' : `${formatVND(item?.PHI_DKBS)}VNĐ`}</Text>
                        </View>
                    </View>
                ))
            }
            {
                codeSelected !== 'VNI' ? (
                    <>
                        {dataPackage?.bs02 >= 0 && (
                            <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14 }}>- BS02 - BH thay thế mới</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{dataPackage?.bs02 == 0 ? 'Miễn phí' : `${formatVND(dataPackage?.bs02, '.')}VNĐ`}</Text>
                                </View>
                            </View>
                        )}
                        {(dataPackage?.bs04 >= 0) && (
                            <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14 }}>- BS04 - BH xe bị mất trộm cướp bộ phận</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{dataPackage?.bs04 == 0 ? 'Miễn phí' : `${formatVND(dataPackage?.bs04, '.')}VNĐ`}</Text>
                                </View>
                            </View>
                        )}
                        {(dataPackage?.bs05 >= 0) && (
                            <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14 }}>- BS05 - BH lựa chọn cơ sở sửa chữa</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{dataPackage?.bs05 == 0 ? 'Miễn phí' : `${formatVND(dataPackage?.bs05, '.')}VNĐ`}</Text>
                                </View>
                            </View>
                        )}
                        {(dataPackage?.bs06 >= 0) && (
                            <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14 }}>- BS06 - BH tổn thất về động cơ khi xe hoạt động trong khu vực bị ngập nước</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{dataPackage?.bs06 == 0 ? 'Miễn phí' : `${formatVND(dataPackage?.bs06, '.')}VNĐ`}</Text>
                                </View>
                            </View>
                        )}
                        {(dataPackage?.bs13 >= 0) && (
                            <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14 }}>- BS13 - BH cho thiết bị lắp thêm</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{dataPackage?.bs13 == 0 ? 'Miễn phí' : `${formatVND(dataPackage?.bs13, '.')}VNĐ`}</Text>
                                </View>
                            </View>
                        )}
                        {(dataPackage?.discountValue) && (
                            <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14 }}>Khuyến mãi ({dataPackage?.discountPercent}%)</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>- {formatVND(dataPackage?.discountValue, '.')}VNĐ</Text>
                                </View>
                            </View>
                        )}
                        {(dataPackage?.discountValue) && (
                            <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14 }}>Phí sau giảm</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(dataPackage?.fee, '.')}VNĐ</Text>
                                </View>
                            </View>
                        )}
                    </>
                ) : null
            }
            <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: TxtColor, fontSize: 14 }}>VAT (10%)</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND((dataPackage?.fee - Math.round(dataPackage?.fee / 1.1)), '.')}VNĐ</Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.dataStyle}>
                        Thời hạn bảo hiểm
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.dataStyle}>
                        Từ {dataStep2?.dateFrom}
                    </Text>
                    <Text style={styles.dataStyle}>
                        đến {dataStep2?.dateTo}
                    </Text>
                </View>
            </View>
            {dataStep2?.checkTNDS && (
                <View>
                    <View style={{ height: 1, backgroundColor: '#D9D9D9', marginBottom: 12 }} />
                    <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>2.BH TNDS bắt buộc</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{formatVND(dataStep2?.feeTNDS.feeVat, '.')}VNĐ</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: TxtColor, fontSize: 14 }}>VAT (10%)</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND((dataStep2?.feeTNDS.feeVat - dataStep2?.feeTNDS.fee), '.')}VNĐ</Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.dataStyle}>Thời hạn bảo hiểm</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                Từ {dataStep2?.dateFromTNDS}
                            </Text>
                            <Text style={styles.dataStyle}>
                                đến {dataStep2?.dateToTNDS}
                            </Text>
                        </View>
                    </View>
                </View>
            )}
            {dataStep2?.checkTNLX && (
                <View>
                    <View style={{ height: 1, backgroundColor: '#D9D9D9', marginBottom: 12 }} />
                    <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{dataStep2?.checkTNDS ? '3' : "2"}.BH TNLXPX và người ngồi trên xe (không chịu thuế VAT)</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{formatVND(dataStep2?.insuranceMoney.feeVat, '.')}VNĐ</Text>
                        </View>
                    </View>
                    {
                        infoCar?.typeCar?.value?.toUpperCase()?.includes('TAXI') ? (
                            <View style={styles.titleContainer}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.dataStyle}>Số chỗ ngồi được bảo hiểm</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={styles.dataStyle}>
                                        {dataStep2?.seatParent}
                                    </Text>
                                </View>
                            </View>
                        ) : null
                    }
                    <View style={styles.titleContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.dataStyle}>Thời hạn bảo hiểm</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.dataStyle}>
                                Từ {dataStep2?.dateFrom}
                            </Text>
                            <Text style={styles.dataStyle}>
                                đến {dataStep2?.dateTo}
                            </Text>
                        </View>
                    </View>
                </View>
            )}
            <View style={{ height: 1, backgroundColor: '#D9D9D9', marginBottom: 12 }} />
            <View style={styles.titleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: TxtColor, fontSize: 14 }}>
                        Tổng phí (gồm VAT)
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 14, color: TxtColor, fontWeight: 'bold', textAlign: 'right' }}>
                        {formatVND(renderTotal(), '.')}VNĐ
                    </Text>
                </View>
            </View>
            {infoCar?.moneyDiscount > 0 ? (
                <View style={styles.titleContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: TxtColor, fontWeight: 'bold', fontSize: 14 }}>
                            Khuyến mãi
                    </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        {promotionPrice?.price > 100 ?
                            <Text style={{ fontSize: 14, color: Color, textAlign: 'right' }}>
                                -{formatVND(promotionPrice?.price, '.')}VNĐ
                        </Text>
                            :
                            <Text style={{ fontSize: 14, color: Color, textAlign: 'right' }}>
                                -{formatVND(infoCar?.moneyDiscount, '.')}VNĐ
                        </Text>
                        }

                    </View>
                </View>
            ) : null
            }

            <View style={{ height: 1, backgroundColor: '#D9D9D9', marginBottom: 12 }} />
            <View style={[styles.titleContainer, {paddingBottom: 0}]}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: TxtColor, fontWeight: 'bold', fontSize: 14 }}>
                        Thanh toán
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: colorNote, textAlign: 'right' }}>
                        {infoCar?.moneyDiscount > 0 ? formatVND(renderAfterDisCount(), '.') : formatVND(renderTotal(), '.')}VNĐ
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
        // alignItems: 'center',
        paddingBottom: 12
    },
    textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TxtColor
    },
    dataStyle: {
        fontSize: 14,
        color: TxtColor
    }

});


const mapStateToProps = state => ({
    fee: state?.carPhysical?.feeCar,
    durationCar: state?.carPhysical?.durationCar,
    promotionPrice: state?.promotion?.promotionPrice['C2'],
});

export default connect(mapStateToProps, {})(PackagePreview);

