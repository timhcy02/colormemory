const Root = require('Component').Root;

module.exports = ()=>{

	require('ArrayPolyfill');
	require('ObjectPolyfill');
	require('StringPolyfill');
	require('ConsolePolyfill');
	require('PromisePolyfill');
	require('DatePolyfill');
	
	console.disableYellowBox = true;
	
	return Root;
}