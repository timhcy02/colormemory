import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import key from 'Key';

const initStore = require('Redux').init;
const App = require('./App.js');
import { Loading } from 'Page';

class Root extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		key().then(k => {
			this.setState({
				store: initStore(k),
				loading: false
			});
		});
	}

	render() {
		let {store,loading } = this.state;

		if (loading) {
			return <Loading />;
		}

		if (store)
			return (
				<Provider store={store}>
					<App />
				</Provider>
			);
		else
			return <View/>
	}
}

module.exports = Root;