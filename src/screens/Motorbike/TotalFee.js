import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {Color, colorBackground, TxtColor} from '../../config/System';
import {formatVND} from '../../components/Functions';
import Promotion from '../../components/promotion/Promotion';


function TotalFee({duration,insuranceMoney,feeTNDS,check, promotionPrice}) {

    return (
        <View style={styles.container}>
            <Promotion
                totalPrice={feeTNDS?.feeVat}
                insurProductCode={'M1'}
            />
            <View style={styles.viewTable}>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 8,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    backgroundColor: Color,
                    justifyContent:'center',alignItems: 'center'
                }}>
                    <Text style={{color:'#fff',fontSize:16,fontWeight: 'bold'}}>TÍNH PHÍ BẢO HIỂM</Text>
                </View>
                <View style={{backgroundColor: colorBackground, paddingBottom: 12}}>
                    <View style={{ paddingHorizontal: 12, flexDirection: 'row', marginTop: 16 }}>
                        <View style={{flex:1}}>
                            <Text style={{color:TxtColor,fontSize:14,fontWeight:'bold'}}>1. Bảo hiểm TNDS bắt buộc</Text>
                        </View>
                        <View style={{flex:1,alignItems:'flex-end'}}>
                            <Text style={{color:TxtColor,fontSize:14,fontWeight:'bold', textAlign: 'right'}}>{formatVND(feeTNDS?.fee)}VNĐ</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 12, marginTop: 12, flexDirection: 'row' }}>
                        <View style={{flex:1}}>
                            <Text style={{color:TxtColor,fontSize:14}}>VAT(10%)</Text>
                        </View>
                        <View style={{flex:1,alignItems:'flex-end'}}>
                            <Text style={{color:TxtColor,fontSize:14, textAlign: 'right'}}>{formatVND(feeTNDS?.feeVat - feeTNDS?.fee)}VNĐ</Text>
                        </View>
                    </View>
                    {
                        promotionPrice?.price ? (
                            <>
                                <View style={{ paddingHorizontal: 12, marginTop: 12, flexDirection: 'row' }}>
                                    <View style={{flex:1}}>
                                        <Text style={{color:TxtColor,fontSize:14}}>Khuyến mãi</Text>
                                    </View>
                                    <View style={{flex:1,alignItems:'flex-end'}}>
                                        <Text style={{color:TxtColor,fontSize:14, textAlign: 'right'}}>- {formatVND(promotionPrice?.price)}VNĐ</Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 12, marginTop: 12, flexDirection: 'row' }}>
                                    <View style={{flex:1}}>
                                        <Text style={{color:TxtColor,fontSize:14}}>Phí sau giảm</Text>
                                    </View>
                                    <View style={{flex:1,alignItems:'flex-end'}}>
                                        <Text style={{color:TxtColor,fontSize:14, textAlign: 'right'}}>{formatVND(feeTNDS?.feeVat - promotionPrice?.price)}VNĐ</Text>
                                    </View>
                                </View>
                            </>
                        ) : null
                    }
                    {
                        check == true ? <View>
                            <View style={{ marginTop: 12, paddingHorizontal: 12, flexDirection: 'row' }}>
                                <View style={{flex:1}}>
                                    <Text style={{color:TxtColor,fontSize:14,fontWeight:'bold'}}>2. Bảo hiểm tai nạn người ngồi trên xe <Text style={{fontWeight: 'normal'}}>(Không chịu thuế VAT)</Text></Text>
                                </View>
                                <View style={{flex:1,alignItems:'flex-end'}}>
                                    <Text style={{color:TxtColor,fontSize:14,fontWeight:'bold', textAlign: 'right'}}>{formatVND(insuranceMoney?.price*duration?.id,'.')}VNĐ</Text>
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
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
});

export default TotalFee;

