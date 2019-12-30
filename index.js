/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import "react-native-gesture-handler";


global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

AppRegistry.registerComponent(appName, require('./src'));



// *  Code Push related
// *  code-push login --accessKey 383a2253b5fee672da0e5dcfbd33e1b92f3c72d0

// *  ==== iOS ====
// *  code-push app add PacificCoffeeRN-iOS ios react-native
// ┌────────────┬───────────────────────────────────────┐
// │ Name       │ Key                                   │
// ├────────────┼───────────────────────────────────────┤
// │ Staging    │ cqpulDiAJ3CtLC75QzwjJyghh4GRSkvkoQUuN │
// ├────────────┼───────────────────────────────────────┤
// │ Production │ 1voNd_L9zuvYqWxTz5B2Eosfv3t3rk4lj78OV │
// └────────────┴───────────────────────────────────────┘
// code-push release-react PacificCoffeeRN-iOS ios

// *  ==== Android ====
// *  code-push app add PacificCoffeeRN-Android Android react-native
// ┌────────────┬───────────────────────────────────────┐
// │ Name       │ Key                                   │
// ├────────────┼───────────────────────────────────────┤
// │ Staging    │ kvkW8CROPATrN_bbzy-Tu_AB65roHy_Zi78uV │
// ├────────────┼───────────────────────────────────────┤
// │ Production │ KfcW7ARwexMcth5mCM9HS27o0uKGrykboXIuE │
// └────────────┴───────────────────────────────────────┘
// code-push release-react PacificCoffeeRN-Android Android
