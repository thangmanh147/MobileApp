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
import { Color, colorBackground, colorNote, NewColor, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import Input from './components/Input';
import { validationPackage } from './components/Validate';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import InputSelect from './components/InputSelect';
import { formatVND } from '../../components/Functions';


function TotalFee({ codeSelected, listPkgsVNI, feeTNDS, duration, insuranceMoney, checkTNDS, checkTNLX, dataPackage, moneyDiscount, promotionPrice, listBs, seat }) {
    const bs02 = listBs.find(bs => bs == 'bs02')
    const bs04 = listBs.find(bs => bs == 'bs04')
    const bs05 = listBs.find(bs => bs == 'bs05')
    const bs06 = listBs.find(bs => bs == 'bs06')
    const bs13 = listBs.find(bs => bs == 'bs13')
    const renderTotalVc = () => {
        let fee = dataPackage?.vc
        if (bs02) {
            fee = dataPackage?.vc + (dataPackage?.bs02 || 0)
        }
        if (bs04) {
            fee = dataPackage?.vc + (dataPackage?.bs04 || 0)
        }
        if (bs05) {
            fee = dataPackage?.vc + (dataPackage?.bs05 || 0)
        }
        if (bs06) {
            fee = dataPackage?.vc + (dataPackage?.bs06 || 0)
        }
        if (bs13) {
            fee = dataPackage?.vc + (dataPackage?.bs13 || 0)
        }
        // let fee = dataPackage?.vc + (dataPackage?.bs02 || 0) + (dataPackage?.bs04 || 0) + (dataPackage?.bs05 || 0) + (dataPackage?.bs06 || 0) + (dataPackage?.bs13 || 0)
        return fee
    }

    const renderAfterDisCount = () => {
        let fee = renderTotal()
        let tru = 0

        if (moneyDiscount > 0) {
            tru = moneyDiscount
            if (moneyDiscount > 100) {
                tru = moneyDiscount
            } else {
                tru = fee - moneyDiscount
            }
        }
        // if(tru < 6500000 && purpose_car.value === 'N' && seat < 9) {
        //     tru = 6500000;
        // }
        return tru
    }

    const renderTotal = () => {
        return dataPackage?.fee + (checkTNDS ? feeTNDS?.feeVat : 0) + ((checkTNLX && insuranceMoney) ? insuranceMoney?.feeVat : 0)
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewTable}>
                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingVertical: 15,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    backgroundColor: Color,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>TÍNH PHÍ BẢO HIỂM</Text>
                </View>
                <View style={{ backgroundColor: colorBackground }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12, marginTop: 16 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>1.BH vật chất xe</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{formatVND((dataPackage?.feeBase || dataPackage?.fee), '.')}VNĐ</Text>
                        </View>
                    </View>
                    {dataPackage?.vc && (
                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: TxtColor, fontSize: 14 }}>- Phí cơ bản</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND(dataPackage?.vc, '.')}VNĐ</Text>
                            </View>
                        </View>
                    )}
                    {
                        codeSelected === 'VNI' && listPkgsVNI.filter(item => item?.isSelect).map((item) => (
                            <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
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
                                {((dataPackage?.bs02 >= 0) && bs02) && (
                                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: TxtColor, fontSize: 14 }}>- BS02 - BH thay thế mới</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{dataPackage?.bs02 == 0 ? 'Miễn phí' : `${formatVND(dataPackage?.bs02, '.')}VNĐ`}</Text>
                                        </View>
                                    </View>
                                )}
                                {bs04 && (
                                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: TxtColor, fontSize: 14 }}>- BS04 - BH xe bị mất trộm cướp bộ phận</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{dataPackage?.bs04 == 0 ? 'Miễn phí' : `${formatVND(dataPackage?.bs04, '.')}VNĐ`}</Text>
                                        </View>
                                    </View>
                                )}
                                {bs05 && (
                                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: TxtColor, fontSize: 14 }}>- BS05 - BH lựa chọn cơ sở sửa chữa</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{dataPackage?.bs05 == 0 ? 'Miễn phí' : `${formatVND(dataPackage?.bs05, '.')}VNĐ`}</Text>
                                        </View>
                                    </View>
                                )}
                                {bs06 && (
                                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: TxtColor, fontSize: 14 }}>- BS06 - BH tổn thất về động cơ khi xe hoạt động trong khu vực bị ngập nước</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{dataPackage?.bs06 == 0 ? 'Miễn phí' : `${formatVND(dataPackage?.bs06, '.')}VNĐ`}</Text>
                                        </View>
                                    </View>
                                )}
                                {bs13 && (
                                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: TxtColor, fontSize: 14 }}>- BS13 - BH cho thiết bị lắp thêm</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{dataPackage?.bs13 == 0 ? 'Miễn phí' : `${formatVND(dataPackage?.bs13, '.')}VNĐ`}</Text>
                                        </View>
                                    </View>
                                )}
                                {dataPackage?.discountValue && (
                                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: TxtColor, fontSize: 14 }}>Khuyến mãi ({dataPackage?.discountPercent}%)</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>- {formatVND(dataPackage?.discountValue, '.')}VNĐ</Text>
                                        </View>
                                    </View>
                                )}
                                {dataPackage?.discountValue && (
                                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
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
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: TxtColor, fontSize: 14 }}>VAT (10%)</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND((dataPackage?.fee - Math.round(dataPackage?.fee / 1.1)), '.')}VNĐ</Text>
                        </View>
                    </View>
                    {checkTNDS && (
                        <View>
                            <View style={{ borderBottomWidth: 1, flex: 1, borderColor: '#D9D9D9', marginBottom: 12, marginHorizontal: 10 }}></View>
                            <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>2.BH TNDS bắt buộc</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{formatVND(feeTNDS.feeVat, '.')}VNĐ</Text>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14 }}>VAT (10%)</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14 }}>{formatVND((feeTNDS.feeVat - feeTNDS.fee), '.')}VNĐ</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    {checkTNLX && (
                        <View>
                            <View style={{ borderBottomWidth: 1, flex: 1, borderColor: '#D9D9D9', marginBottom: 12, marginHorizontal: 10 }}></View>
                            <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{checkTNDS ? '3' : "2"}.BH TNLXPX và người ngồi trên xe (không chịu thuế VAT)</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>{formatVND(insuranceMoney.feeVat, '.')}VNĐ</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    {moneyDiscount > 0 ?
                        (<>
                            <View style={{ marginVertical: 10, marginRight: 3 }}>
                                <View style={{
                                    zIndex: 1,
                                    flex: 1,
                                    backgroundColor: colorBackground,
                                    height: 5,
                                    marginBottom: -3,
                                    marginHorizontal: 10,
                                }} />
                                <View style={{
                                    flex: 1,
                                    borderColor: Color,
                                    borderStyle: 'dashed',
                                    borderWidth: 2.1,
                                    marginHorizontal: 10,
                                    borderRadius: 1,
                                }} />
                            </View>
                            <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingTop: 6, paddingBottom: 6 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#404142', fontSize: 14 }}>Tổng phí:</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', color: '#404142', fontSize: 14, fontWeight: 'bold' }}>
                                        {formatVND(renderTotal(), '.')}VNĐ
                                    </Text>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 10, flexDirection: 'row', paddingTop: 6, paddingBottom: 6 }}>
                                <View style={{ flex: 1 }}>
                                    {promotionPrice?.price > 100 ?
                                        <Text style={{ color: '#404142', fontSize: 14 }}>Khuyến mãi:</Text>
                                        :
                                        <Text style={{ color: '#404142', fontSize: 14 }}>Khuyến mãi (-{promotionPrice?.price}%):</Text>
                                    }
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    {!promotionPrice?.price > 100 ?
                                        <Text style={{ textAlign: 'right', color: '#404142', fontSize: 14 }}>-{formatVND(moneyDiscount, '.')}VNĐ</Text>
                                        :
                                        <Text style={{ textAlign: 'right', color: '#404142', fontSize: 14 }}>-{formatVND(promotionPrice?.price, '.')}VNĐ</Text>
                                    }

                                </View>
                            </View>
                        </>
                        ) : null
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ctBack: {
        marginTop: 25,
        padding: 24,
        position: 'absolute',
        left: 0,
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
    styleTab: {
        flex: 1.5, justifyContent: 'center', alignItems: 'center',
    },
    viewTable: {
        borderTopLeftRadius: 10, borderTopRightRadius: 10
    },
});


const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps, {})(TotalFee);

