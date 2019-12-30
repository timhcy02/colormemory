import React, { Component } from 'react';
import { createBottomTabNavigator, createDrawerNavigator, createStackNavigator,createAppContainer,DrawerActions  } from "react-navigation";

import { View, Text, Image, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';

import { RightDrawerContent, LeftDrawerContent } from "Item";
import { getHorizontalResp } from 'Responsive';
import { connect } from 'react-redux';
import { Action } from 'Redux';
import i18 from 'i18';
import { NavigationActions } from 'react-navigation'

import {HomePage } from 'Page';


import { themeRed, themeBlack, themeWhite } from 'Theme';

class _Empty extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		let { props } = this;
		props.setNavigation(props.navigation);
	}

	render(){
		return (
			<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
				<Loading />
			</View>
		);
	}
}

export const Stack = createStackNavigator({

	HomePage: {
		screen: HomePage,
		navigationOptions: ({ navigation }) => ({
			header: null,
		}),
	},

},{
	initialRouteName: 'HomePage',
	defaultNavigationOptions: {
		gesturesEnabled: false
	  }
})



const AppContainer = createAppContainer(Stack);

class AppNavigator extends Component { 

	onNavigationStateChange = (preState,nextState,action)=>{
		let {props} = this;
	}

	render(){
		let {user, loading} = this.props;
		return (
			<AppContainer onNavigationStateChange={this.onNavigationStateChange}/>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
	  //user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AppNavigator);