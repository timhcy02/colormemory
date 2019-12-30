import {  Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createLogger } from 'redux-logger'
import createEncryptor from 'redux-persist-transform-encrypt';
import FilesystemStorage from 'redux-persist-filesystem-storage';
import reduxReset from 'redux-reset';

import { DEBUG } from 'Config';
import Types from './types';

// const IGNORE_ACTION = [
// 	...Object.keys(Types.loading),
// ]

const Reducers = require('./reducer');
import thunk from 'redux-thunk';

function logger(){
	// if (!DEBUG) return null;

	// return createLogger({
	// 	collapsed: true,
	// 	predicate: (getState, action) => IGNORE_ACTION.every(a => a !== action.type),
	// 	stateTransformer: (state) => "(skipped)"
	// });
	return null
}

function setupPersist(store, secretKey){

	let persistor = persistStore(store, {
		storage: (Platform.OS == 'ios') ? AsyncStorage : FilesystemStorage,
		transforms: [createEncryptor({secretKey})],		
		whitelist: ['setting','auth','main'],
		// blacklist: ['loading','root'],
	});

	// added to store such that can clear the local storage when user logged out
	store.persistor = persistor;
}

module.exports = function init(key){


	const shareStateMiddleware = store => next => action => {
		next({ ...action, sharedState: store.getState });
	}

	const middleware = [
		logger(),
		thunk,
		shareStateMiddleware
	].filter(m => m);

	let store = createStore(
		combineReducers({ ...Reducers }),
		undefined, // init state
		compose(
			applyMiddleware(...middleware),
			autoRehydrate(),
			reduxReset('DF_APP_RESET')
		)
	);

	setupPersist(store, key);

	return store;
}