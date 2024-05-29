
import React from 'react';
import { Text, View, Image, Modal } from 'react-native';
// import Modal from 'react-native-modalbox';
import Button from '../../components/buy/Button';
import ButtonNoColor from '../../components/ButtonNoColor'
import { screen, TxtBlack, primaryColor, } from '../../config/System';
import AppText from '../../components/AppText';

const ModalFlightNew = ({
                       onClosed,
                       open,
                        buttonOK=true,
                       text,
                       onPress,
                       onPressButtonNo,
                       label='Đồng ý',
                       labelButtonNo='Đóng',
                       label2,
                       sub,
                       forceUpdate,
                       title,
                       AlignText,
                       button=false,
                       pathImage
                   }) => (
    <Modal

        visible={open}
        animationType="slide"
        transparent={true}
        onRequestClose={onClosed}

        // isOpen={open}
        // entry={'top'}
        // buttonClode={false}
        // backdropPressToClose={false}
        // swipeToClose={false}
        // onClosed={onClosed}
        // style={{backgroundColor: 'ababab', width: screen.width-140, justifyContent: 'center' }}
    >
    <View  style={{flex:1,backgroundColor: 'rgba(52, 52, 52, 0.8)', width: screen.width, justifyContent: 'center', alignItems:'center' }}>
        <View style={{backgroundColor: '#fff', alignItems: 'center',width: screen.width-120, justifyContent: 'center', borderRadius: 15, paddingBottom: 20}}>
            <Image style={{height: 63, width: 80,marginTop: 20, marginBottom: 25}} resizeMode={'contain'} source={pathImage ? pathImage : require('../../icons/iconAgent/ic_noty.png')} />
            <Text style={{color: '#000000', fontSize: 20, marginBottom: 10}}>{title ? title : 'Thông báo'}</Text>
            <AppText style={{textAlign: AlignText ? AlignText  : 'center', fontSize: 15,lineHeight: 21, marginLeft: 30, marginRight: 30, color: '#333333', marginVertical:10}}>{text}</AppText>
            {/* <Text style={{color: '#30cecb', fontWeight: 'bold'}}> đ</Text> */}
            {
                sub ? <AppText style={{textAlign: AlignText ? AlignText  : 'center', fontSize: 16,lineHeight: 21, marginLeft: 30, marginRight: 30, color: '#333'}}>{sub}</AppText> : null
            }
            {buttonOK &&
            <Button
                label={label ? label : 'Đồng ý'}
                width={screen.width / 2.5}
                marginTop={25}
                borderRadius={30}
                onPress={onPress}
            />
            }
            {button &&
            <ButtonNoColor
                label={label2 ? label2 : 'Đóng'}
                backgroundColor={'#ccc'}
                width={screen.width/2.5}
                borderRadius={20}
                color='#fff'
                onPress = {onPressButtonNo}
            />
            }
        </View>
    </View>
    </Modal>
);

export default ModalFlightNew;
