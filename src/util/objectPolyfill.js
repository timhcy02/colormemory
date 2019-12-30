/**  
 * path of a object
 * @example Object.path(chatrooms,`[0].messages[1].sender.id`)		-->		chatrooms && chatrooms[0] && chatrooms[0].messages && chatrooms[0].messages[1] && chatrooms[0].messages[1].sender && chatrooms[0].messages[1].sender.id
 *
 * @param {Object} object - the object
 * @param {string} path - the path to the field
 * @return {*} - the value from the path
 */
if (Object.path === undefined){
	Object.path = function(object, path){

		if (object === undefined || object === null)
			return undefined;

		if (!(object instanceof Object))
			throw new TypeError('Object.path parameter 2 must be a object');
		if (typeof path !== 'string')
			throw new TypeError('Object.path parameter 2 must be a string');

		path = path.split('.').filter(s => s.length > 0);
		var key = [];
		for (var i=0; i<path.length; i++){
			var p = path[i].match(/\w+|\[\d+\]/g);
			if (p instanceof Array)
				key = key.concat(p);
		}

		var ptr = object;

		while (key.length > 0){
			if (!(ptr instanceof Object) || ptr === null || ptr === undefined)
				return undefined;

			var k = key.shift();

			if (k[0] === '[' && k[k.length-1] === ']')
				k = k.substr(1,k.length-2);

			ptr = ptr[k];
		}
		return ptr;
	}
} 

/**  
 * deep clone an object
 * @example ({a:1}).deepClone()		-->		{a:1}
 * @example ({a:1}).deepClone({b:2})		-->		{a:1,b:2}
 *
 * @param {Object} extraField - add extra field for the object
 * @return {Object} - a new object cloned
 */
Object.defineProperty(Object.prototype, 'deepClone', {
  value : function(extraField){
		'use strict';
		if (this == null) 
			throw new TypeError('Object.prototype.deepClone called on null or undefined');
		
		extraField = extraField || {};
		var output = JSON.parse(JSON.stringify(this));
		return Object.assign({},output,extraField);
	}
});


/**  
 * trim an object by specific fields and return a new object
 * @example	({a:1,b:2,c:3,d:4}).trim(['a','b'])				-->		{a:1,b:2}
 * @example	({a:1,b:2,c:3,d:4}).trim(['a','b'],true)	-->		{c:3,d:4}
 * @example	({a:1,b:2,c:3,d:4}).trim('a',true)				-->		{b:2,c:3,d:4}
 *
 * @param {array} fields - the fields of the object
 * @param {boolean} isRemove - remove those fields or only retain those fields
 * @return {Object} - a new trimed object
 */
Object.defineProperty(Object.prototype, 'trim', {
  value : function(fields, isRemove){
		'use strict';
		if (this == null) 
			throw new TypeError('Object.prototype.trim called on null or undefined');
		
		if (typeof fields === 'string')
			fields = [fields];

		if (!(fields instanceof Array))
			throw new TypeError('parameter 1 must be a string or array of string');

		for (var i = 0; i<fields.length; i++)
			if ( typeof fields[i] !== 'string')
				throw new TypeError('parameter 1 must be a string or array of string');

		if (isRemove === null || isRemove === undefined)
			isRemove = false;

		if (isRemove !== true && isRemove !== false)
			throw new TypeError('parameter 2 must be a boolean');

		var output = {};

		if (isRemove){
			output = JSON.parse(JSON.stringify(this));
			for (var i = 0; i<fields.length; i++)
				delete output[fields[i]];
		}else{
			for (var i = 0; i<fields.length; i++)
				if (this[fields[i]] !== undefined)
					output[fields[i]] = this[fields[i]];
		}
		return output;
	}
});

/**  
 * trim an object by the difference and return a new object
 * @example	({a:1,b:2,c:3,d:4}).different({a:1,b:3,c:4,d:4})			-->		{b:3,c:4}
 * @example	({a:1,b:2,c:3,d:4}).different({a:1,b:3,c:4})					-->		{d:4}
 *
 * @param {object} comparator - the other object as comparator
 * @return {object} - a new trimed object
 */
Object.defineProperty(Object.prototype, 'different', {
  value : function(comparator){
		'use strict';
		if (this == null) 
			throw new TypeError('Object.prototype.different called on null or undefined');
		
		if (!(comparator instanceof Object))
			throw new TypeError('parameter 1 must be an object');

		var output = {};		
		Object.keys(this).forEach(key => {
			if (this[key] !== comparator[key])
				output[key] = this[key];
		});

		return output;
	}
});


/**  
 * compare two object and check if they are equal
 * @example	Object.equal({a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4})			-->		true
 * @example	Object.equal({a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:5})			-->		false
 * @example	Object.equal({a:1,b:2,c:3},{a:1,b:2,c:3,d:5})					-->		false
 * @example	Object.equal({a:1,b:2,c:{c1:1,c2:2}},{a:1,b:2,c:{c1:1,c2:2}})			-->		true
 *
 * @param {object} comparator - the other object as comparator
 * @return {boolean} - if they are equal
 */
if (Object.equal === undefined){
	Object.equal = function(object, comparator){
		'use strict';
		if (object == null || !(object instanceof Object)) 
			throw new TypeError('Object.equal parameter 1 must be an object');
		
		if (!(comparator instanceof Object))
			throw new TypeError('parameter 2 must be an object');

		var keys = Object.keys(object);
		var c_keys = Object.keys(comparator);

		if (keys.length !== c_keys.length)
			return false;

		for (var i=0; i<keys.length; i++){
			var key = keys[i];

			if (object[key] !== comparator[key]){
				if (typeof object[key] === typeof comparator[key] && typeof object[key] === 'object'){
					if (!(object[key]).equal(comparator[key]))
						return false
				}else
					return false;
			}
		}
		return true;
	}
}



/////////////////     Self - Extension    ///////////////// 