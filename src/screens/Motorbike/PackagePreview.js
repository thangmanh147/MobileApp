import React, {useState, useEffect} from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import {widthPercentageToDP, heightPercentageToDP} from '../../config/ConfigResponsive';
import {Color, colorBackground, colorNote, TxtColor} from '../../config/System';
import {connect} from 'react-redux';
import Input from './components/Input';
import {validationPackage} from './components/Validate';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {handleTextInput} from 'react-native-formik';
import InputSelect from './components/InputSelect';
import TotalFee from './TotalFee';
import {formatVND} from '../../components/Functions';
import IconEditSvg from '../../config/images/icons/IconEditSvg';

function PackagePreview({fee, infoMotor, promotionPrice}) {


    const renderTotal = () => {
        let a = fee?.feeVat - promotionPrice?.price || 0
        let b = infoMotor?.insuranceMoney?.price*infoMotor?.duration?.id
        if (infoMotor?.check == true) {
            return a + b
        }else {
            return a
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer1}>
                <View style={{flex:2.5}}>
                    <Text style={{fontSize: 16,fontWeight: 'bold', color: TxtColor}}>
                        Gói bảo hiểm
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>Actions.Package()} style={{flex:0.5, alignItems:'flex-end'}}>
                    <IconEditSvg width={16} height={15} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        1.Bảo hiểm TNDS bắt buộc
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={[styles.dataStyle,{color:TxtColor, fontWeight: 'bold'}]}>
                        {formatVND(fee?.fee,'.')}VNĐ
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.dataStyle1}>
                        VAT (10%)
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={[styles.dataStyle,{color:TxtColor}]}>
                        {formatVND(fee?.feeVat - fee?.fee,'.')}VNĐ
                    </Text>
                </View>
            </View>
            {
                promotionPrice?.price ? (
                    <>
                        <View style={styles.titleContainer}>
                            <View style={{flex:1}}>
                                <Text style={styles.dataStyle1}>
                                    Khuyến mãi
                                </Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <Text style={[styles.dataStyle,{color:TxtColor}]}>
                                    - {formatVND(promotionPrice?.price)}VNĐ
                                </Text>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={{flex:1}}>
                                <Text style={styles.dataStyle1}>
                                    Phí sau giảm
                                </Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <Text style={[styles.dataStyle,{color:TxtColor}]}>
                                    {formatVND(fee?.feeVat - promotionPrice?.price)}VNĐ
                                </Text>
                            </View>
                        </View>
                    </>
                ) : null
            }
            <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.dataStyle1}>
                        Thời hạn bảo hiểm
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        Từ {infoMotor?.info?.dateFrom}
                    </Text>
                    <Text style={styles.dataStyle}>
                        đến {infoMotor?.dateTo}
                    </Text>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />

            {
                infoMotor?.check == true ? <View>
                    <View style={styles.titleContainer}>
                        <View style={{flex:1}}>
                            <Text style={styles.textStyle}>
                                2.Bảo hiểm tai nạn người ngồi trên xe <Text style={{fontWeight: 'normal'}}>(Không chịu thuế VAT)</Text>
                            </Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={[styles.dataStyle,{color:TxtColor, fontWeight: 'bold'}]}>
                                {formatVND(infoMotor?.insuranceMoney?.price*infoMotor?.duration?.id,'.')}VNĐ
                            </Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={{flex:1}}>
                            <Text style={styles.dataStyle1}>
                                Số tiền bảo hiểm
                            </Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={[styles.dataStyle, {color: TxtColor}]}>
                                {formatVND(infoMotor?.insuranceMoney?.insuranceValue,'.')}VNĐ
                            </Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={{flex:1}}>
                            <Text style={styles.dataStyle1}>
                                Thời hạn bảo hiểm
                            </Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={styles.dataStyle}>
                                Từ {infoMotor?.info?.dateFrom}
                            </Text>
                            <Text style={styles.dataStyle}>
                                đến {infoMotor?.dateTo}
                            </Text>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />
                </View> : null
            }

            <View style={[styles.titleContainer, {alignItems: 'center'}]}>
                <View style={{flex:1}}>
                    <Text style={{color:TxtColor,fontWeight:'bold',fontSize:14}}>
                        Thanh toán
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={{color:colorNote,fontSize:14,fontWeight:'bold'}}>
                        {formatVND(renderTotal(),'.')}VNĐ
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorBackground,
        borderRadius:10,
        paddingVertical:16,
        paddingHorizontal:12
    },
    titleContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        paddingTop:12
    },
    textStyle: {
        fontSize:14,
        fontWeight: 'bold',
        color: TxtColor
    },
    dataStyle: {
        fontSize:14,
        color: TxtColor,
        textAlign:'right'
    },
    dataStyle1: {
        fontSize:14,
        color: TxtColor,
    }

});


const mapStateToProps = state => ({
    fee:state?.motor?.fee,
    infoMotor:state?.motor?.infoMotor
});

export default connect(mapStateToProps, {})(PackagePreview);

