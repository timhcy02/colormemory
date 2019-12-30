/**
 * leftpad add the char if the length is not long enough
 * 
 * @param {string} text - the original string
 * @param {integer} length
 * @param {string} char - the char for insert
 * @return {string} 
 * 
 * @example "3".leftpad(3,'0')  ->  "003"
 */
String.prototype.leftpad = function (length, char = ' '){
	if (this == null) 
		throw new TypeError('String.prototype.leftpad called on null or undefined');
	
	var text = this+"";
	while (text.length < length)
		text = char + text;
	return text;
}

/**
 * rightpad add the char if the length is not long enough
 * 
 * @param {string} text - the original string
 * @param {integer} length
 * @param {string} char - the char for insert
 * @return {string} 
 * 
 * @example "3".rightpad(3,'0')  ->  "300"
 */
String.prototype.rightpad = function (length, char = ' '){
	if (this == null) 
		throw new TypeError('String.prototype.rightpad called on null or undefined');
	
	var text = this+"";
	while (text.length < length)
		text = text+char;
	return text;
}

/**
 * randome type matching and compulsory 
 * 
 * @param {number} [length=30] - the length of the random string
 * @return {string}
 * 
 * @example randomString(20)  ->  'b5j85najbrigh1nc00an4'
 */
String.random = function (length = 30)  {
	var CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var str = "";
	for (var i=0;i<length;i++)
		str += CHAR_SET[ Math.floor(Math.random()*62) ];
	return str;
}


/**  
 * insert substring in the string
 * Eg:	"1245".insert(2,"3")		-->		"12345"
 *
 * @param cursor position to insert substring
 * @param str the substring should be inserted
 * @return {String} - a new string with inserted substring
 */
String.prototype.insert = function(cursor,str){
	'use strict';
    if (this == null) {
      	throw new TypeError('String.prototype.insert called on null or undefined');
    }
    if (str instanceof Object) {
      	throw new TypeError('parameter 2 must be a string');
    }else if (!Number.isInteger(cursor)){
		throw new TypeError('parameter 1 must be a integer');
	}else{
		str = str.toString();
		cursor = parseInt(cursor);
		if (cursor<0)
			throw new TypeError('parameter 1 must be positive');
	}
	var input = this.slice();
	return input.substr(0,cursor)+str+input.substr(cursor);
}

/**  
 * cut and return substring in the string
 * Eg:	"12345".cut(2)		-->		"345"
 * Eg:	"12345".cut(-2)		-->		"123"
 *
 * @param length position to cut from start; negative to cut from end
 * @return {String} - a new string which is cut
 */
String.prototype.cut = function(length){
	'use strict';
  if (this == null) {
      	throw new TypeError('String.prototype.cut called on null or undefined');
  }
  if (!Number.isInteger(length)){
		throw new TypeError('parameter 1 must be a integer');
	}else{
		length = parseInt(length);
	}

	if (length >= 0)
		return this.substr(length);
	else if (length < 0)
		return this.substr(0, this.length + length);	
}

/////////////////     Self - Extension    ///////////////// 

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.lastIndexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}