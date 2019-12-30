import React, { Component } from 'react';
import { View, StyleSheet, Platform, Text, BackHandler, Alert, AppState, SafeAreaView,StatusBar,AsyncStorage,PushNotificationIOS } from 'react-native';
import { connect } from 'react-redux';

import { Loading } from 'Page';
import { DEBUG } from 'Config';
import i18 from 'i18';
import AppNavigator from "../config/navigation";

const Actions = require('Redux').Action;
import globalVal from '../../src/globalVal.js';
import { Background } from 'Item'

import SplashScreen from 'react-native-splash-screen'

import { getHorizontalResp } from 'Responsive';
import RNFetchBlob from 'rn-fetch-blob';
import { StackActions, NavigationActions } from 'react-navigation';

class App extends Component {

	constructor(props) {
		super(props);
		if (Text.defaultProps == null) Text.defaultProps = {};
		Text.defaultProps.allowFontScaling = false;
		this.state = {
			loading: true,
			appState: AppState.currentState,
			locked: false,
			
		};
	}

	componentDidMount() {
		let { props } = this;
		let {navigation} = props

		if (Platform.OS == 'android') {
			BackHandler.addEventListener('hardwareBackPress', function() {
	
				console.log("hardware Back Press");
				return true;
			});
		
				// SplashScreen.hide();
				setTimeout(() => SplashScreen.hide(), 2000);
	
		}
		AppState.addEventListener('change', this._handleAppStateChange);
		
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	_handleAppStateChange = (nextAppState) => {
		let { props } = this;
		let { user } = props;
		this.setState({appState: nextAppState});
	}

	render() {
		let { props } = this;
		let { loading, passcode,colorSet } = this.props;
		return (
			<SafeAreaView style={{ flex: 1,}}>
				<AppNavigator />
			</SafeAreaView>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {

	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {

	}
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(App);