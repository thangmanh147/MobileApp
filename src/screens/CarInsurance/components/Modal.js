
import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import { screen } from '../../../config/System';
import {heightPercentageToDP, widthPercentageToDP} from "../../../config/ConfigResponsive";

const ModalCustom = ({
                          children,
                         closeModal,
    heightTopOutside,
    heightMainContent,

                      }) => (

    <View  style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        flex:1,
    }}>

        <TouchableOpacity style={{
            width: widthPercentageToDP('100'),//paddingtop modal
            height: heightTopOutside,
            backgroundColor:'rgba(52, 52, 52, 0.2)'
        }} onPress={()=>  closeModal()}>
        </TouchableOpacity>
        <View style={{
            width: widthPercentageToDP('100'),//paddingleft modal
            height: heightMainContent,
            flexDirection:'row',
        }}>
            <TouchableOpacity style={{
                width: widthPercentageToDP('8'),
                height: heightMainContent,
                flexDirection:'row',
            }} onPress={()=>  closeModal()}  />
            <View style={{
                width: widthPercentageToDP('84'),//main content modal
                height:heightMainContent,
                flexDirection:'row',
            }}>
                {children}
            </View>
            <TouchableOpacity style={{
                width: widthPercentageToDP('8'),//paddingbottom modal
                height:heightMainContent,
                flexDirection:'row',
            }} onPress={()=>  closeModal()} />



        </View>
        <TouchableOpacity style={{
            width: widthPercentageToDP('100'),//paddingtop modal
            height: heightPercentageToDP('7.5'),
            backgroundColor:'rgba(52, 52, 52, 0.2)'

        }}  onPress={()=>  closeModal()} />
    </View>

);

export default ModalCustom;
