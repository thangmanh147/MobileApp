

import React, { Component } from 'react';
import { View, Text, NetInfo} from 'react-native';
import Store from '../services/Store';
import Const from '../services/Const';
import moment from 'moment'
moment.locale('vi')

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentDidMount = () => {
		if (nameApp.includes('INSO')) {
			new Store().getSession(Const.TOKEN).then(async (token) => {
				if (!token) {
					await new Store().storeSession(Const.TOKEN, tokenDefault)
					await new Store().storeSession(Const.IS_LOGIN, true)
					await new Store().storeSession(Const.PASS_WORD, 'inso@2022')
				}
				await this.props.checkLogin();
			})
		} else {
			this.props.checkLogin();
		}
	};


	// componentWillMount = () => {
	// 	this.props.checkLogin();
	// 	// NetInfo.isConnected.fetch().then(isConnected => {
	// 	// 	this.handleIsConnected(isConnected);
	// 	// });
	// 	// NetInfo.isConnected.addEventListener(
	// 	// 	'connectionChange',
	// 	// 	this.handleIsConnected
	// 	// );


	// }

	// handleIsConnected = (isConnected) => {
	// 	this.setState({ isConnected });
	// 	if(isConnected) {
	// 		this.props.checkLogin();
	// 	}
	// }

	render() {
        console.disableYellowBox = true;

        return (
		<View style={{flex: 1, justifyContent: 'center',}}>

		</View>
		);
	}
}

import {connect} from 'react-redux';
import {checkLogin} from '../actions/auth';
import { nameApp, tokenDefault } from '../config/System';

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		checkLogin: () => dispatch(checkLogin()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
