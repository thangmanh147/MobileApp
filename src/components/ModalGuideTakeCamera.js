
import React from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';
import { screen } from '../config/System';
import { ScaledSheet } from 'react-native-size-matters';
let { width, height } = Dimensions.get('window');

const ModalGuideTakeCamera = ({
	onClosed,
	open,
	dataTakeCamera,
	actionWhere
}) => (
		<Modal
			isOpen={open}
			entry={'top'}
			onClosed={onClosed}
			style={{ backgroundColor: 'ababab', width: screen.width - 20, justifyContent: 'center', alignItems: 'center' }}
		>
			{actionWhere == 'FORM_IMAGE_CAR'
				? <ImageBackground
					resizeMode='contain'
					style={{
						position: 'relative',
						transform: [{ rotate: '90deg' }],
						height: screen.width - 50,
						width: (screen.width - 50) * (1572 / 902),
						zIndex: 999,
					}}
					source={dataTakeCamera.ImageGuideCamera}
				>
					<View style={styles.containText}>
						<View style={{ flexDirection: 'row', alignItems: 'space-around' }}>
							<Text style={styles.txt1}>{dataTakeCamera.txt1}</Text>
						</View>
						<TouchableOpacity onPress={() => onClosed()} style={styles.containImage}>
							<Image style={styles.ic_close_guide_camera} source={require('../config/images/public/icons/ic_Close.png')} />
						</TouchableOpacity>

						{dataTakeCamera.txt5 ?
							<Text style={styles.txt2}>Tư thế chụp: <Text style={[styles.txt2, { fontWeight: 'bold' }]}>{dataTakeCamera.subTxt2}</Text></Text>
							:
							<Text style={styles.txt2}>{dataTakeCamera.subTxt2}</Text>
						}
						{dataTakeCamera.txt5 ?
							<Text style={styles.txt3}>Hình ảnh cần thể hiện đủ: <Text style={[styles.txt3, { fontWeight: 'bold' }]}>{dataTakeCamera.subTxt3}</Text></Text>
							:
							<Text style={styles.txt3}>{dataTakeCamera.subTxt3}</Text>
						}
						{dataTakeCamera.txt4 ?
							<Text style={styles.txt4}>{dataTakeCamera.txt4}</Text>
							:
							null
						}
					</View>
					<Text style={styles.txt5}>{dataTakeCamera.txt5}</Text>
					<Text style={styles.txt6}>{dataTakeCamera.txt6}</Text>
				</ImageBackground>
				: actionWhere == 'FORM_REGISTRATION_CERTIFICATE_CAR' ?
					<ImageBackground
						resizeMode='cover'
						borderRadius={20}
						style={{
							position: 'relative',
							transform: [{ rotate: '90deg' }],
							height: screen.width - 50,
							width: screen.height - 170
						}}
						source={require('../icons/img_background_takecamera.png')}
					>
						<View style={styles.containText}>
							<View style={styles.containTitle}>
								<Text style={styles.txt1}>Ảnh giấy đăng ký</Text>
							</View>
							<TouchableOpacity onPress={() => onClosed()} style={styles.containImage}>
								<Image style={styles.ic_close_guide_camera} source={require('../config/images/public/icons/ic_Close.png')} />
							</TouchableOpacity>
							<Image
								resizeMode={'contain'}
								borderRadius={5}
								style={{ alignSelf: 'center', height: screen.width - 110,
									width: screen.height - 240 }} source={require('../icons/img_background_registry_1.png')} />
						</View>
					</ImageBackground>
					: actionWhere == 'FORM_SALES_INVOICE_CAR' ?
					<ImageBackground
						resizeMode={'cover'}
						borderRadius={20}
						style={{
							position: 'relative',
							transform: [{ rotate: '90deg' }],
							height: screen.width - 50,
							width: screen.height - 170
						}}
						source={require('../icons/img_background_takecamera.png')}
					>
						<View style={styles.containText}>
							<View style={styles.containTitle}>
								<Text style={styles.txt1}>Biên bản bàn giao xe</Text>
							</View>
							<TouchableOpacity onPress={() => onClosed()} style={styles.containImage}>
								<Image style={styles.ic_close_guide_camera} source={require('../config/images/public/icons/ic_Close.png')} />
							</TouchableOpacity>
							<Image
								resizeMode={'contain'}
								borderRadius={5}
								style={{ alignSelf: 'center', height: screen.width - 120, width: screen.width - 180 }} source={require('../icons/img_background_registry_3.png')} />
						</View>
					</ImageBackground>
						:
						<ImageBackground
							resizeMode={'cover'}
							borderRadius={20}
							style={{
								position: 'relative',
								transform: [{ rotate: '90deg' }],
								height: screen.width - 50,
								width: screen.height - 170
							}}
							source={require('../icons/img_background_takecamera.png')}
						>
							<View style={styles.containText}>
								<View style={styles.containTitle}>
									<Text style={styles.txt1}>
									{
										actionWhere == 'ADD_ID_NUMBER_FRONT_IMAGE' ? 'CHỤP ẢNH CĂN CƯỚC MẶT TRƯỚC' :
										actionWhere == 'ADD_ID_NUMBER_BEHIND_IMAGE' ? 'CHỤP ẢNH CĂN CƯỚC MẶT SAU' :
										actionWhere == "ADD_PASS_PORT_IMAGE" ? 'CHỤP ẢNH THÔNG TIN HỘ CHIẾU' :  'Ảnh giấy đăng kiểm'
									}
									</Text>
								</View>
								<TouchableOpacity onPress={() => onClosed()} style={styles.containImage}>
									<Image style={styles.ic_close_guide_camera} source={require('../config/images/public/icons/ic_Close.png')} />
								</TouchableOpacity>
								<Image
									resizeMode={'contain'}
									borderRadius={5}
									style={{ alignSelf: 'center', height: screen.width - 110,
									width: screen.height - 240 }}
									source={
										actionWhere == 'ADD_ID_NUMBER_FRONT_IMAGE' ?
										require('../icons/guide_id_number_front.png') :
										actionWhere == 'ADD_ID_NUMBER_BEHIND_IMAGE' ?
										require('../icons/guide_id_number_behind.png') :
										actionWhere == "ADD_PASS_PORT_IMAGE" ?
										require('../icons/guide_pass_port.png') :
										require('../icons/img_background_registry_2.png')
										} />
							</View></ImageBackground>
			}

		</Modal>
	);
const styles = ScaledSheet.create({
	containText: {
		marginTop: '10@vs',
		marginLeft: '10@s',
		marginRight: '10@s',
		position:'relative'
	},
	containTitle: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: '10@vs'
	},
	txt1: {
		flex: 1,
		fontSize: '20@s',
		color: 'white',
		textAlign: 'center',
	},
	txt2: {
		color: 'white',
		paddingTop: '8@vs',
		fontSize: '14@s'
	},
	txt3: {
		color: 'white',
		paddingTop: '8@vs',
		fontSize: '14@s'
	},
	txt4: {
		color: 'white'
	},
	txt5: {
		color: 'white',
		position: 'absolute',
		bottom: 40,
		left: 20,
		fontSize: '16@s'
	},
	txt6: {
		color: 'white',
		position: 'absolute',
		bottom: 40,
		right: 20,
		fontSize: '16@s'
	},
	ic_close_guide_camera: {
		height: 15,
		width: 15
	},
	containImage: {
		position:'absolute',
		padding: 10,
		right: 0,
		top:0,
		zIndex: 1000,
	}

})

export default ModalGuideTakeCamera;
