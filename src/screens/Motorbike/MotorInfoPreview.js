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

function MotorInfoPreview({infoMotor}) {

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer1}>
                <View style={{flex:2.5}}>
                    <Text style={{fontSize: 16,fontWeight: 'bold', color: TxtColor}}>
                        Thông tin xe mua bảo hiểm
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Actions.Package()} style={{flex:0.5, alignItems:'flex-end'}}>
                    <IconEditSvg width={16} height={15} />
                </TouchableOpacity>
            </View>
            {/* <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        Họ và tên chủ xe
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        {infoMotor?.info?.fullName}
                    </Text>
                </View>
            </View> */}
            <View style={styles.titleContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.textStyle}>
                        Loại xe
                    </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        {infoMotor?.info?.motorType}
                    </Text>
                </View>
            </View>
            {/* {
                infoMotor?.type == 1 ? <View style={styles.titleContainer}>
                    <View style={{flex:1}}>
                        <Text style={styles.textStyle}>
                            Biển số xe
                        </Text>
                    </View>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                        <Text style={styles.dataStyle}>
                            {infoMotor?.info?.licensePlate}
                        </Text>
                    </View>
                </View> : <View>
                    <View style={styles.titleContainer}>
                        <View style={{flex:1}}>
                            <Text style={styles.textStyle}>
                                Số khung
                            </Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={styles.dataStyle}>
                                {infoMotor?.info?.frameNumber}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={{flex:1}}>
                            <Text style={styles.textStyle}>
                                Số máy
                            </Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={styles.dataStyle}>
                                {infoMotor?.info?.vehicleNumber}
                            </Text>
                        </View>
                    </View>
                </View>
            } */}
            {
                infoMotor?.info?.frameNumber?.length > 0 ? (
                    <View style={styles.titleContainer}>
                        <View style={{flex:1}}>
                            <Text style={styles.textStyle}>
                                Số khung
                            </Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={styles.dataStyle}>
                                {infoMotor?.info?.frameNumber}
                            </Text>
                        </View>
                    </View>
                ) : null
            }
            {
                infoMotor?.info?.vehicleNumber?.length > 0 ? (
                    <View style={styles.titleContainer}>
                        <View style={{flex:1}}>
                            <Text style={styles.textStyle}>
                                Số máy
                            </Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={styles.dataStyle}>
                                {infoMotor?.info?.vehicleNumber}
                            </Text>
                        </View>
                    </View>
                ) : null
            }
            {
                infoMotor?.info?.licensePlate?.length > 0 ? (
                    <View style={styles.titleContainer}>
                        <View style={{flex:1}}>
                            <Text style={styles.textStyle}>
                                Biển số xe
                            </Text>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={styles.dataStyle}>
                                {infoMotor?.info?.licensePlate}
                            </Text>
                        </View>
                    </View>
                ) : null
            }

            {/* <View style={styles.titleContainer}>
                <View style={{flex:0.6}}>
                    <Text style={styles.textStyle}>
                        Địa chỉ theo đăng ký xe
                    </Text>
                </View>
                <View style={{flex:0.4, alignItems:'flex-end'}}>
                    <Text style={styles.dataStyle}>
                        {infoMotor?.info?.ownerAddress}, {infoMotor?.info?.ownerDistrict}, {infoMotor?.info?.ownerProvince}
                    </Text>
                </View>
            </View> */}
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
        textAlign:'right'
    }

});


const mapStateToProps = state => ({
    infoMotor:state?.motor?.infoMotor
});

export default connect(mapStateToProps, {})(MotorInfoPreview);

