import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Animated, Text } from 'react-native';

class Loading extends Component {

	constructor(props) {
		super(props);
		this.anim = new Animated.Value(0);
	}

	render() {

		return (
			<View style={styles.container}>
				<ActivityIndicator
					animating={true}
					style={[styles.centering, {transform: [{scale: 1.3}]}]}
					size="large"
					color="#ffffff"
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.3)',
		position: 'absolute',
		top: 0, left: 0,
		right: 0, bottom: 0,
	},
});

module.exports = Loading;