
import React from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	StyleSheet,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { screen, TxtBlack, Color } from '../../config/System';
import { Actions } from 'react-native-router-flux';

class ModalCity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cities: [],
		};
	}

	// componentWillMount = () => {
	// 	var body = {
	// 		function: 'InsoClaimApi_getListCity',
	// 			params: {
	// 			},
	// 		}
	// 	this.props.getListCity(body)
	// };

	// componentWillReceiveProps = (nextProps) => {
	// 	if(nextProps.carClaim.cities && this.props.carClaim.cities !== nextProps.carClaim.cities) {
	// 		this.setState({
	// 			cities: nextProps.carClaim.cities
	// 		})
	// 	}
	// };

	render() {
		const {cities} = this.state
		const {onClosed, open, city} = this.props;
		return (
		<ModalBox
			isOpen={open}
			entry={'top'}
			onClosed={onClosed}
			style={css.ctModal}
		>
			<View style={{backgroundColor: '#fff',flex: 1}}>
				<View style={{alignItems: 'flex-end'}}>
					<TouchableOpacity style={{padding: 10}} onPress={onClosed}>
						{/*<Image style={{width: 20, height: 20}} source={require('../../../icons/ic_close_black.png')}/>*/}
					</TouchableOpacity>
				</View>
				<ScrollView keyboardShouldPersistTaps='always'>
					{
						cities.map((item, index) => {
							return (
								<TouchableOpacity onPress={() => this.props.setCity(item)} style={{flexDirection: 'row',borderBottomWidth: 1,borderTopWidth: 0, borderColor: '#ccc',alignItems: 'center', padding: 10, paddingLeft: 15}} key={index}>
									<Text style={{flex: 1, color: '#333'}}>{item.name}</Text>
									{
										item.id === city.id ?
											{/*<Image style={{width: 20, height: 20}} source={require('../../../icons/ic_check_black.png')}/>*/}
										: null
									}
								</TouchableOpacity>
							)
						})
					}
				</ScrollView>
			</View>
		</ModalBox>
		)
	}
}

const css = StyleSheet.create({
	ctModal: {
		backgroundColor: '#ababab',
		maxHeight: screen.height - 200,
		width: screen.width - 80
	},
	ctInput: {
		borderWidth: 1,
		borderColor: Color
	},
})

import {connect} from 'react-redux';
import {getListCity} from '../../actions/claim'
const mapStateToProps = (state) => {
	return {
		carClaim: state.carClaim
	}
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
  }
export default(ModalCity);
