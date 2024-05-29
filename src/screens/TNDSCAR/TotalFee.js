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
import { Color, colorBackground, colorNote, textDisable, TxtColor } from '../../config/System';
import { connect } from 'react-redux';
import Input from './components/Input';
import { validationPackage } from './components/Validate';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { handleTextInput } from 'react-native-formik';
import InputSelect from './components/InputSelect';
import { formatVND } from '../../components/Functions';
import Promotion from '../../components/promotion/Promotion';


function TotalFee({ feeTNDS, promotionPrice, insuranceMoney, check }) {
    console.log(feeTNDS)
    const [type, setType] = useState(1);

    const validation = Yup.object().shape({
        fullName: Yup.string().required('Không được để trống'),
    });
    const FormikInput = handleTextInput(Input);
    const renderTotal = () => {
        let a = feeTNDS?.feeVat
        let b = insuranceMoney?.feeVat
        if (check == true && insuranceMoney) {
            return a + b
        } else {
            return a
        }
    }

    return (
        <View style={styles.container}>
            <Promotion
                totalPrice={renderTotal()}
                insurProductCode={'C1'}
            />
            <View style={styles.viewTable}>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 8,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    backgroundColor: Color,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>TÍNH PHÍ BẢO HIỂM</Text>
                </View>
                <View style={{ backgroundColor: colorBackground, paddingBottom: 12 }}>
                    <View style={{ paddingHorizontal: 12, flexDirection: 'row', marginTop: 16 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>1. Bảo hiểm TNDS bắt buộc</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>{formatVND(feeTNDS.fee, '.')}VNĐ</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 12, marginTop: 12, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: TxtColor, fontSize: 14 }}>VAT (10%)</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ color: TxtColor, fontSize: 14, textAlign: 'right' }}>{formatVND((feeTNDS.feeVat) - (feeTNDS.fee), '.')}VNĐ</Text>
                        </View>
                    </View>
                    {
                        check == true ? <View>
                            <View style={{ marginTop: 12, paddingHorizontal: 12, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold' }}>
                                        2.Bảo hiểm tai nạn lái xe phụ xe và người ngồi trên xe <Text style={{fontWeight: 'normal'}}>(Không chịu thuế VAT)</Text>
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ color: TxtColor, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>{formatVND(insuranceMoney?.feeVat, '.')}VNĐ</Text>
                                </View>
                            </View>
                        </View> : null
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
        marginTop: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
});


const mapStateToProps = state => ({
    promotionPrice: state.promotion.promotionPrice['C1'],
});

export default connect(mapStateToProps, {})(TotalFee);

