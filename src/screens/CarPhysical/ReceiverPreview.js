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


function ReceiverPreview({buyerInfo}) {
    let address = []

    if (buyerInfo?.receiverAddress) {
        address.push(buyerInfo?.receiverAddress)
    }
    if (buyerInfo?.receiverDistrict) {
        address.push(buyerInfo?.receiverDistrict)
    }
    if (buyerInfo?.receiverProvince) {
        address.push(buyerInfo?.receiverProvince)
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer1}>
                <View style={{flex:2.5}}>
                    <Text style={{fontSize: 16,fontWeight: 'bold', color: TxtColor}}>
                        Địa chỉ nhận ấn chỉ bảo hiểm
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Actions.BuyerCarPhysical()} style={{flex:0.5, alignItems:'flex-end'}}>
                    <IconEditSvg width={16} height={15} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        Họ và tên người nhận
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                        {buyerInfo?.receiverName}
                    </Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        Số điện thoại
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                        {buyerInfo?.receiverPhone}
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
                    <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                        {buyerInfo?.receiverEmail}
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
                    <Text style={[styles.dataStyle,{textAlign: 'right'}]}>
                        {address.join(', ')}
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
        alignItems: 'flex-start',
        paddingTop:12
    },
    textStyle: {
        fontSize:14,
        fontWeight: 'bold',
        color: TxtColor
    },
    dataStyle: {
        fontSize:14,
        color: TxtColor
    }

});


const mapStateToProps = state => ({
    buyerInfo:state?.carPhysical?.buyerPhysical?.infoBuyer,
});

export default connect(mapStateToProps, {})(ReceiverPreview);

