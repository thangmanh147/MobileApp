
import React from 'react';
import { Text, View, Image, Modal } from 'react-native';
// import Modal from 'react-native-modalbox';
import Button from '../components/Button';
import ButtonNoColor from '../components/ButtonNoColor'
import { screen, TxtBlack, primaryColor, fontNormal, fontBold} from '../config/System';
import AppText from '../components/AppText';
import NotifyRingSvg from '../config/images/login/NotifyRingSvg';

const BaseModal = ({
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
            <View style={{backgroundColor: '#fff', alignItems: 'center',width: screen.width-65, justifyContent: 'center', borderRadius: 15, paddingBottom: 20}}>
                <View style={{marginTop: 20, marginBottom: 25}}>
                    <NotifyRingSvg width={53} height={60} />
                </View>
                <Text style={{fontWeight: 'bold',color: '#000000', fontSize: 14, marginBottom: 10}}>{title ? title : 'Thông báo'}</Text>
                <AppText style={{textAlign: AlignText ? AlignText  : 'center', fontSize: 15,lineHeight: 21, marginHorizontal:25, color: '#333333', marginVertical:10}}>{text}</AppText>
                {/* <Text style={{color: '#30cecb', fontWeight: 'bold'}}> đ</Text> */}
                {
                    sub ? <AppText style={{textAlign: AlignText ? AlignText  : 'center', fontSize: 16,lineHeight: 21, marginHorizontal:25, color: '#333'}}>{sub}</AppText> : null
                }
                {buttonOK &&
                <Button
                    label={label ? label : 'Đồng ý'}
                    width={screen.width / 1.5}
                    marginTop={15}
                    borderRadius={10}
                    onPress={onPress}
                />
                }
                {button &&
                <ButtonNoColor
                    label={label2 ? label2 : 'Đóng'}
                    backgroundColor={'#ccc'}
                    width={screen.width/1.5}
                    borderRadius={10}
                    color='#fff'
                    onPress = {onPressButtonNo}
                />
                }
            </View>
        </View>
    </Modal>
);

export default BaseModal;
