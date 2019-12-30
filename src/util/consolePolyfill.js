import { DEBUG } from 'Config';

if (!DEBUG) console.log = function(){}
if (DEBUG){
	var time = function(){};
	time.toString = () => (new Date).toISOString().substr(11);
	console.logTime = console.log.bind(console, `%c%s`, `color:#bbb; font-weight:light;`, time);
}else
	console.logTime = function(){}