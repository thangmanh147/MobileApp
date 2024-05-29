import React, {useState, useEffect} from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import {Color, colorBackground, TxtColor} from '../../config/System';
import {connect} from 'react-redux';
import IconEditSvg from '../../config/images/icons/IconEditSvg';

function VatPreview({buyerInfo}) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer1}>
                <View style={{flex:2.5}}>
                    <Text style={{fontSize: 16,fontWeight: 'bold', color: TxtColor}}>
                        Thông tin xuất hóa đơn VAT
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>Actions.pop()} style={{flex:0.5, alignItems:'flex-end'}}>
                    <IconEditSvg width={16} height={15} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        Tên doanh nghiệp
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        {buyerInfo?.vatCompanyName}
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        Mã số thuế
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        {buyerInfo?.vatCompanyTaxCode}
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        Email
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        {buyerInfo?.vatCompanyEmail}
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        Địa chỉ
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        {buyerInfo?.vatCompanyAddress}
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
        textAlign: 'right'
    }

});


const mapStateToProps = state => ({
    buyerInfo: state?.motor?.buyer?.infoBuyer,
});

export default connect(mapStateToProps, {})(VatPreview);

