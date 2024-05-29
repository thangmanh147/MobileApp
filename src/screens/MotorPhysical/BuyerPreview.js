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
import {Color, TxtColor} from '../../config/System';
import {connect} from 'react-redux';
import IconEditSvg from '../../config/images/icons/IconEditSvg';

function BuyerPreview({buyerInfo}) {
    let address = []

    if (buyerInfo?.buyerAddress) {
        address.push(buyerInfo?.buyerAddress)
    }
    if (buyerInfo?.buyerDistrict) {
        address.push(buyerInfo?.buyerDistrict)
    }
    if (buyerInfo?.buyerProvince) {
        address.push(buyerInfo?.buyerProvince)
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer1}>
                <View style={{flex:2.5}}>
                    <Text style={{fontSize: 16,fontWeight: 'bold', color: Color}}>
                        Thông tin bên mua bảo hiểm:
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>Actions.pop()} style={{flex:0.5, alignItems:'flex-end'}}>
                    <IconEditSvg width={16} height={15} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        Họ và tên người mua
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        {buyerInfo?.buyerName}
                    </Text>
                </View>
            </View>
            {buyerInfo?.buyerGender ? <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        Giới tính
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        {buyerInfo?.buyerGender}
                    </Text>
                </View>
            </View> : null}
            {buyerInfo?.buyerBirthday ? <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        Ngày sinh
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        {buyerInfo?.buyerBirthday}
                    </Text>
                </View>
            </View> : null}
            {buyerInfo?.buyerIdentity ? <View style={styles.titleContainer}>
                <View style={{flex: 0.6}}>
                    <Text style={styles.textStyle}>
                        CMND/CCCD/Hộ chiếu
                    </Text>
                </View>
                <View style={{flex: 0.4, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        {buyerInfo?.buyerIdentity}
                    </Text>
                </View>
            </View> : null}
            <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        Số điện thoại
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        {buyerInfo?.buyerPhone}
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
                        {buyerInfo?.buyerEmail}
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
                        {buyerInfo?.buyerAddress}, {buyerInfo?.buyerDistrict}, {buyerInfo?.buyerProvince}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
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
        paddingTop:12,
        justifyContent:'space-between'
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
    }

});


const mapStateToProps = state => ({
    buyerInfo:state?.motorPhysical?.buyer?.infoBuyer,
});

export default connect(mapStateToProps, {})(BuyerPreview);

