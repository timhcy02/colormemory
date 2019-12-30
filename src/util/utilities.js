import { DEBUG } from 'Config';

/**
 * checkParam type matching and compulsory 
 * 
 * @param {string} tag - warning display tag
 * @param {*} param - any value
 * @param {string | string[]} types - required types, valid types: undefined | null | any | boolean | string | emptyString | object | emptyObject | array | emptyArray | date | integer | float | number | http | https | ftp | email | uri | base64 
 * @return {bool}
 * 
 * @example checkParam("function.js > myFunction",shouldBeStringOrUndefined,['string','undefined])  ->  true | false
 * @example checkParam("function.js > myFunction",shouldBeBooleanAndCompulsory,'boolean')  ->  true | false
 * @example checkParam("function.js > myFunction",compulsoryOnly,'any')  ->  true | false
 */
function checkParam(tag,param,types) {
	if (types === undefined && (typeof param === 'string' || param instanceof Array)){
		types = param;
		param = tag;
		tag = undefined;
	}

	if (types instanceof Array){
	}else if(typeof types === 'string'){
		types = [types];
	}else{
		DEBUG && console.warn("checkParam(): types must be a string or an array of string");
	}

	let paramType = "any";
	if (param === null){
		paramType = "null";
	}else if (param === undefined){
		paramType = "undefined";
	}else if (param instanceof Array){
		paramType = param.length === 0? 'emptyArray' : 'array';
	}else if (param instanceof Date){
		paramType = "date";
	}else if (typeof param === 'number'){
		if (Number.isInteger(param))	paramType = "integer";
		else	paramType = "float";
	}else if (typeof param ==='string' && !!param.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)){
		paramType = 'email';
	}else if (typeof param ==='string' && !!param.match(/^http:\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)){
		paramType = 'http';
	}else if (typeof param ==='string' && !!param.match(/^https:\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)){
		paramType = 'https';
	}else if (typeof param ==='string' && !!param.match(/^ftp:\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)){
		paramType = 'ftp';
	}else if (typeof param ==='string' && !!param.match(/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/)){
		paramType = 'base64';
	}else if (typeof param ==='string' && param.length === 0){
		paramType = 'emptyString';
	}else if (typeof param ==='object' && Object.keys(param).length === 0){
		paramType = 'emptyObject';
	}else{
		paramType = typeof param;
	}

	if (types.some(t=>t==='any') && paramType!=='null' && paramType!=='undefined'){
		return true;
	}else if (types.some(t=>t==='number') && (paramType==='integer' || paramType==='float')){
		return true;
	}else if (types.some(t=>t==='uri') && (paramType==='http' || paramType==='https' || paramType==='ftp' || paramType==='base64')){
		return true;
	}else if (types.some(t=>t==='string') && (paramType==='email' || paramType==='http' || paramType==='https' || paramType==='ftp' || paramType==='base64')){
		return true;
	}else{
		result = types.some(t=>t===paramType);
		if (!result){
			DEBUG && tag && console.warn(tag+"(): Err: Invalid param, vaild params include: ["+types.join()+"], but got '"+paramType+"'");
			return false;
		}
	}
	return true;
}

/**
 * checkParam value matching the data 
 * 
 * @param {type} tag - warning display tag
 * @param {*} param - any value
 * @param {* | *[]} values - required values
 * @return {bool} 
 * 
 * @example checkParamValue("function.js > myFunction",myStringValue,['myStringValue','yourStringValue])  ->  true
 * @example checkParamValue("function.js > myFunction",thisIsTrue,[true,false])  ->  true
 * @example checkParamValue("function.js > myFunction",aRandomNumber,[0,1,2,3,4,5])  ->  true
 */
function checkParamValue(tag,param,values){
	if (values === undefined && (typeof param === 'string' || param instanceof Array)){
		values = param;
		param = tag;
		tag = undefined;
	}

	if (!(values instanceof Array)){
		values = [values];
	}

	if (values.some(v => v === param)){
		return true;
	}else{
		DEBUG && tag && console.warn(tag+"(): Err: Invalid value, vaild values include: ["+values.join()+"], but got '"+param+"'");
		return false;
	}
	
}

const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
/**
 * randome type matching and compulsory 
 * 
 * @param {number} [length=30] - the length of the random string
 * @return {string}
 * 
 * @example randomString(20)  ->  'b5j85najbrigh1nc00an4'
 */
function randomString(length = 30)  {
	let str = "";
	for (let i=0;i<length;i++)
		str += CHAR_SET[ Math.floor(Math.random()*62) ];
	return str;
}

/**
 * leftpad add the char if the length is not long enough
 * 
 * @param {string} text - the original string
 * @param {integer} length
 * @param {string} char - the char for insert
 * @return {string} 
 * 
 * @example leftpad("3",3,'0')  ->  "003"
 */
function leftpad(text,length,char = ' '){
	text = text+"";
	while (text.length < length)
		text = char + text;
	return text;
}


/**
 * amount add comman to display number
 * 
 * @param {number} number - the original number
 * @return {string} 
 * 
 * @example amount(120.5) ->  "120.5"
 * @example amount(1200)  ->  "1,200"
 */
function amount(number){
	if (number === null || number === undefined)
		return '';

	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
}


/**
 * delay millisecond
 * 
 * @param {integer} time
 * 
 * @example await delay(1000)
 */
async function delay(time=0){
	return new Promise(resolver=>{
		setTimeout(resolver,time);
	});
}




module.exports = {
	checkParam,
	checkParamValue,
	randomString,
	leftpad,
	amount,
	delay,
}