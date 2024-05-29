
import React from 'react';
import { Text, View, Image } from 'react-native';
import Modal from 'react-native-modalbox';
import Button from '../components/Button';
import ButtonNoColor from './ButtonNoColor'
import { screen, TxtBlack, primaryColor} from '../config/System';
import AppText from './AppText';

const ModalNoti = ({
	onClosed,
	open,
	text,
	onPress,
	label='Đồng ý',
	sub = '',
	forceUpdate
}) => (
	<Modal
		isOpen={open}
		entry={'top'}
		backdropPressToClose={forceUpdate ? false : true}
		swipeToClose={forceUpdate ? false : true}
		onClosed={onClosed}
		style={{backgroundColor: 'ababab', width: screen.width-80, justifyContent: 'center' }}
		>
		<View style={{backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderRadius: 15, paddingBottom: 20}}>
			<Image style={{height: 70, width: 70,marginVertical: 40}} resizeMode={'contain'} source={require('../icons/all/ic_noti_bell.png')} />
			<AppText style={{color: TxtBlack, fontSize: 20}}>Thông báo</AppText>
			<AppText style={{textAlign: 'center', fontSize: 16,lineHeight: 20, marginLeft: 30, marginRight: 30, color: '#333', marginTop:5}}>{text}</AppText>
			{/* <Text style={{color: '#30cecb', fontWeight: 'bold'}}> đ</Text> */}
			{
				sub !== '' && <AppText style={{textAlign: 'center', fontWeight: 'bold', marginTop: 3, color: primaryColor}}>{sub}</AppText>
			}
			<Button
				label={forceUpdate ? 'Tải app' : label}
				width={screen.width/2.5}
				marginTop={25}
				borderRadius={30}
				onPress={onPress}
			/>
			{/* <ButtonNoColor
				label='Không đồng ý'
				backgroundColor={'#ccc'}
				width={screen.width/2}
				borderRadius={20}
				color='#fff'
				onPress = {() => Actions.tab({type: 'reset'})}
			/> */}
		</View>
	</Modal>
);

export default ModalNoti;
