

import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { screen, TxtBlack, ColorLoginNow, TxtGrey } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import Gradient from '../../../components/Gradient';

class ItemRequirement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	// componentWillMount = () => {
	// 	var body = {
	// 	"function": "InsoContractApi_getFormProfileData",
	// 	"params": {
	// 		"contract_id": this.props.contract_id,
	// 		"form_code": this.props.data.code
	// 	},
	// 	}
	// 	this.props.getProfile(body)
	// };

	onPress = (data, contract_id) => {
		switch (data.code) {
			case 'FORM_SALES_INVOICE_CAR':
				// if(this.props.carBuy.profile.salesInvoiceCar.IMAGE.value == '') {
				// 	Actions.TakePhoto({action: 'FORM_SALES_INVOICE_CAR', contract_id})
				// }else {
				// 	Actions.CarNoPlate({image: this.props.carBuy.profile.salesInvoiceCar.IMAGE.value, contract_id})
				// }
				// return;
				Actions.TakePhoto({ action: 'FORM_SALES_INVOICE_CAR', contract_id })
			case 'FORM_IMAGE_CAR':
				Actions.CarPhoto()
				return;
			case 'FORM_REGISTRATION_CERTIFICATE_CAR':
				// if(data.validate) {
				//   Actions.carRegistration({contract_id: contract_id,});
				//   return
				// }
				// if(this.props.carBuy.profile.registration.IMAGE.value == '') {
				// 	Actions.takePhoto({action: 'FORM_REGISTRATION_CERTIFICATE_CAR', contract_id})
				// }else{
				// 	Actions.carRegistration({image: this.props.carBuy.profile.registration.IMAGE.value, contract_id})
				// }
				Actions.TakePhoto({ action: 'FORM_REGISTRATION_CERTIFICATE_CAR', contract_id })
				// Actions.carRegistration({contract_id: contract_id, form_code: data.code})
				return;
			case 'FORM_CERTIFICATE_CAR':
				// if(this.props.carBuy.profile.certificate.IMAGE.value == '') {
				// 	Actions.takePhoto({action: 'FORM_CERTIFICATE_CAR', contract_id})
				// }else {
				// 	Actions.carCertificate({image: this.props.carBuy.profile.certificate.IMAGE.value, contract_id})
				// }
				Actions.TakePhoto({ action: 'FORM_CERTIFICATE_CAR' })
				// Actions.carCertificate({contract_id: contract_id, form_code: data.code})
				return;
			default:
				return;
		}
	}

	renderImage = (code) => {
		switch (code) {
			// case 'FORM_SALES_INVOICE_CAR':
			// 	return <Image style={css.icon} source={require('../../../icons/add.png')} />
			// case 'FORM_REGISTRATION_CERTIFICATE_CAR':
			// 	return <Image style={css.icon} source={require('../../../icons/ic_registration.png')} />
			case 'FORM_IMAGE_CAR':
				return <Image style={css.iconCar} source={require('../../../icons/iconAgent/ic_car.png')} resizeMode={'cover'} />
			case 'FORM_CERTIFICATE_CAR':
				return <Image style={css.iconCar} source={require('../../../icons/iconAgent/ic_certificate.png')} resizeMode={'cover'} />
			case 'FORM_REGISTRATION_CERTIFICATE_CAR':
				return <Image style={css.iconCar} source={require('../../../icons/iconAgent/ic_car_registration.png')} resizeMode={'cover'} />
			default:
				return;
		}
	}

	render() {
		const { data, contract_id } = this.props;
		return (
			<View style={{
				height: 110, marginVertical: 5
			}}>
				{/* <Shadow
			height={70}
			width={screen.width -40}
			x={0}
			y={10}
		> */}
				<TouchableOpacity onPress={() => this.onPress(data, contract_id)} style={css.ct}>
					{/* <Gradient> */}
					{/*	<View style={{borderRadius:25, backgroundColor: '#30BEBC'}}>*/}

					{this.renderImage(data.code)}

					{/*</View>*/}
					{/* </Gradient> */}
					<View style={{ marginLeft: 10, flex: 0.7 }}>
						<Text style={css.name}>{data.name}</Text>
						{/* <Text style={{ color: data.validate ? '#30BEBC' : '#BE3030', fontSize: 12 }}>{data.message}</Text> */}
						{
							data.validate == true ?
								<Text style={{ color: '#30cecb', fontSize: 12 }}>Đã đủ thông tin</Text>
								:
								<Text style={{ color: '#f97c7c', fontSize: 12 }}>Chưa đủ thông tin</Text>
						}
					</View>
					{/*<Image style={{height: 15, width: 15*24/39}} source={require('../../../icons/iconAgent/ic_arrow_right.png')}/>*/}
				</TouchableOpacity>
				{/* </Shadow> */}
			</View>
		)
	}
}

const css = StyleSheet.create({
	name: {
		color: '#333',
		fontWeight: '700'
	},
	icon: {
		height: 25,
		resizeMode: 'contain'
	},
	iconCar: {
		flex: 0.4,
		height: '100%',
		width: '100%',
	},
	ctIcon: {
		flex: 0.35,
		height: '100%',
		//width: 50,
		borderRadius: 25,
		//alignItems: 'center',
		justifyContent: 'center',
	},
	ct: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#fff',
		height: 100,
		//paddingLeft: 15,
		paddingRight: 15,
		alignItems: 'center',
		borderRadius: 10,
		shadowColor: '#999',
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 5,
		shadowOpacity: 0.2,
		elevation: 3,
		marginTop: 5,
	},
})

import { connect } from 'react-redux';

const mapStateToProps = (state) => {

}
const mapDispatchToProps = (dispatch) => {

}

export default (ItemRequirement);
