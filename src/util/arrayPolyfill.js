/**
 * check if they are equal
 * 
 * @example [2,3].equalTo([1,2])  ->  false 
 * @example [2,3].equalTo([3,2])  ->  false 
 * @example [1,2,1,3].equalTo([1,2,1,3])  ->  true 
 * @example [2,3].equalTo([3,2],true)  		->  true 
 * @example [1,1,2,2].equalTo([2,1,2,1],true)  ->  true
 * @example [1,1,2,2].equalTo([2,1,1,1],true)  ->  false  
 * 
 * @param {Array} array - the comparing array
 * @param {boolean} ignoreOrdering - if ignore the ordering
 * @return {boolean} - if they are equal
 */
function equalTo(array, ignoreOrdering) {
	
	if (this == null)
		throw new TypeError('Array.prototype.equalTo called on null or undefined');
	if (!(array instanceof Array))
		throw new TypeError('Array.prototype.equalTo parameter 1 must be an array');
	if (ignoreOrdering === undefined)
		ignoreOrdering = false;
	if (typeof ignoreOrdering !== 'boolean')
		throw new TypeError('Array.prototype.equalTo parameter 2 must be a boolean');

	if (this.length !== array.length)
		return false;

	if (ignoreOrdering){
		var a = {}, b = {};

		for (var i=0; i<this.length; i++){
			if (a[this[i]])	a[this[i]]++;
			else						a[this[i]] = 1;
			if (b[array[i]])	b[array[i]]++;
			else							b[array[i]] = 1;
		}

		var aKey = Object.keys(a), bKey = Object.keys(b);

		if (aKey.length !== bKey.length)
			return false;

		for (var i=0; i<aKey.length; i++){
			if (a[aKey[i]] !== b[bKey[i]])
				return false;
		}
		return true;

	}else{
		for (var i=0; i<this.length; i++)
			if (this[i] !== array[i])
				return false;
		return true;
	}
};
Array.prototype.equalTo = equalTo;

/**
 * insert element to a sorted array, and ignore if already exist
 * 
 * @example [].insertIfNotExist(3)  ->  [3] 
 * @example [3].insertIfNotExist(5)  ->  [3,5] 
 * @example [3,5].insertIfNotExist(4)  ->  [3,4,5] 
 * @example [3,5,7].insertIfNotExist(5)  ->  [3,5,7] 
 * @example [{s:1},{s:2},{s:3}].insertIfNotExist({s:2},(a,b)=>a.s-b.s)  ->  [{s:1},{s:2},{s:3}] 
 * 
 * @param {*} element - the inserting element
 * @param {function} comparator - the comparator for sorting
 * @return {Array} - the orignal array with inserted element
 */
function insertIfNotExist(element, comparator) {
	
	if (this == null)
		throw new TypeError('Array.prototype.insertIfNotExist called on null or undefined');
	if (comparator === undefined)
		comparator = (a,b) => a-b;
	if (typeof comparator !== 'function')
		throw new TypeError('Array.prototype.insertIfNotExist parameter 2 must be a function');

	if (this.length === 0)
		this.push( element );

	else if (this.length === 1){
		if (comparator(this[0], element) < 0)
			this.push( element );
		else
			this.unshift( element ); 
	}

	else{
		var isAsc = (comparator(this[0], this[this.length - 1]) < 0);

		for (var i=0; i<this.length; i++){
			if (comparator(element, this[i]) === 0)
				break;

			if (isAsc){
				if (comparator(element, this[i]) < 0){
					this.splice(i, 0, element);
					break;
				}
				if (i === this.length - 1){
					this.push(element);
					break;
				}
			}else{

				if (comparator(element, this[i]) > 0){
					this.splice(i, 0, element);
					break;
				}
				if (i === this.length - 1){
					this.push(element);
					break;
				}
			}
		}
	}

	return this;
};
Array.prototype.insertIfNotExist = insertIfNotExist;

/**
 * insert element to a sorted array
 * 
 * @example [].insert(3)  ->  [3] 
 * @example [3].insert(5)  ->  [3,5] 
 * @example [3,5].insert(4)  ->  [3,4,5] 
 * @example [3,5].insert(7)  ->  [3,5,7] 
 * @example [5,3].insert(7)  ->  [7,5,3] 
 * @example [{s:1},{s:3}].insert({s:2},(a,b)=>a.s-b.s)  ->  [{s:1},{s:2},{s:3}] 
 * 
 * @param {*} element - the inserting element
 * @param {function} comparator - the comparator for sorting
 * @return {Array} - the orignal array with inserted element
 */
function insert(element, comparator) {

	if (this == null)
		throw new TypeError('Array.prototype.insert called on null or undefined');
	if (comparator === undefined)
		comparator = (a,b) => a-b;
	if (typeof comparator !== 'function')
		throw new TypeError('Array.prototype.insert parameter 2 must be a function');

	if (this.length === 0)
		this.push( element );

	else if (this.length === 1){
		if (comparator(this[0], element) < 0)
			this.push( element );
		else
			this.unshift( element ); 
	}

	else{
		var isAsc = (comparator(this[0], this[this.length - 1]) < 0);

		for (var i=0; i<this.length; i++){
			if (isAsc){
				if (comparator(element, this[i]) < 0){
					this.splice(i, 0, element);
					break;
				}
				if (i === this.length - 1){
					this.push(element);
					break;
				}
			}else{
				if (comparator(element, this[i]) > 0){
					this.splice(i, 0, element);
					break;
				}
				if (i === this.length - 1){
					this.push(element);
					break;
				}
			}
		}
	}

	return this;
};
Array.prototype.insert = insert;

/**  
 * find the index of max item by a comparator
 * @example  [1,3,5,7].max((a,b)=>b-a)	-->  1
 * @example  [{v:1},{v:3},{v:5},{v:7}].max((a,b)=>a.v-b.v) 		-->  {v:7}
 * @example  [{v:'b'},{v:'a'},{v:'d'},{v:'c'}].max((a,b)=>a.v.localeCompare(b.v)) 		-->  {v:'d'}
 * 
 * @param {function} comparator - the comparator for selecting the max/min item
 * @return {any} - the max/min item, null if not found
 */
function max(comparator) {

	if (this == null)
		throw new TypeError('Array.prototype.maxIndex called on null or undefined');
	else if (this.length === 0)
		return null;
	else if (this.length === 1)
		return this[ 0 ];
	else if (typeof comparator !== 'function')
		throw new TypeError('Array.prototype.max parameter 1 must be a function');
	else
		return this[ this.maxIndex(comparator) ];
};
Array.prototype.max = max;

/**  
 * find the index of max item by a comparator
 * @example  [1,3,5,7].maxIndex((a,b)=>b-a)	-->  0
 * @example  [{v:1},{v:3},{v:5},{v:7}].maxIndex((a,b)=>b.v-a.v) 		-->  3
 * @example  [{v:'b'},{v:'a'},{v:'d'},{v:'c'}].maxIndex((a,b)=>a.v.localeCompare(b.v)) 		-->  2
 * 
 * @param {function} comparator - the comparator for selecting the max/min item
 * @return {number} - the index of max/min item, -1 if not found
 */
function maxIndex(comparator) {
	'use strict';
	if (this == null)
		throw new TypeError('Array.prototype.maxIndex called on null or undefined');
	else if (this.length === 0)
		return -1;
	else if (this.length === 1)
		return 0;
	else if (typeof comparator !== 'function')
		throw new TypeError('Array.prototype.maxIndex parameter 1 must be a function');
	else {
		var max = 0;
		for (var i=1; i<this.length; i++){
			if (comparator(this[i],this[max]) > 0)
				max = i;
		}
		return max;
	}
};
Array.prototype.maxIndex = maxIndex;

/**  
 * leftpad element if the size is not enough
 * @example  [1,2,3,4,5,6].leftpad(9,0) --> [0,0,0,1,2,3,4,5,6]
 * @example  [1,2,3,4,5].leftpad(3) 	--> 	[1,2,3,4,5]
 * 
 * @param {int} size - the column size of each row
 * @param {*} element - add this element if not enough
 * 
 * @return {Array} - a new array
 */
function leftpad(size, element) {
	'use strict';
	if (this == null)
		throw new TypeError('Array.prototype.leftpad called on null or undefined');
	else if (!Number.isInteger(size) || size <= 0)
		throw new TypeError('Array.prototype.leftpad parameter 1 must be a positive integer');

	var newArray = this.slice(0);

	while(newArray.length < size)
		newArray.unshift(element)

	return newArray;
};
Array.prototype.leftpad = leftpad;

/**  
 * rightpad element if the size is not enough
 * @example  [1,2,3,4,5,6].rightpad(9,0) --> [1,2,3,4,5,6,0,0,0]
 * @example  [1,2,3,4,5].rightpad(3) 	--> 	[1,2,3,4,5]
 * 
 * @param {int} size - the column size of each row
 * @param {*} element - add this element if not enough
 * 
 * @return {Array} - a new array
 */
function rightpad(size, element) {
	'use strict';
	if (this == null)
		throw new TypeError('Array.prototype.rightpad called on null or undefined');
	else if (!Number.isInteger(size) || size <= 0)
		throw new TypeError('Array.prototype.rightpad parameter 1 must be a positive integer');

	var newArray = this.slice(0);

	while(newArray.length < size)
		newArray.push(element)

	return newArray;
};
Array.prototype.rightpad = rightpad;

/**  
 * mapping a 2D array to 1D array
 * @example  [[1,2], [3,4], [5,6]].to1DArray()	--> [1,2,3,4,5,6]
 * @example  [[1,2,3], [4,5]].to1DArray() 			--> [1,2,3,4,5]
 * 
 * @return {Array} - a new flatten array
 */
function to1DArray() {
	'use strict';
	if (this == null)
		throw new TypeError('Array.prototype.to1DArray called on null or undefined');

	var newArray = [];
	this.forEach( function(subArray){
		if (subArray instanceof Array && typeof subArray === 'object')
			newArray = newArray.concat(subArray);
		else
			throw new TypeError('Array.prototype.to1DArray called on non-2D array')
	})

	return newArray;
};
Array.prototype.to1DArray = to1DArray;

/**  
 * mapping a 1D array to 2D array
 * @example  [1,2,3,4,5,6].to2DArray(2) --> [[1,2], [3,4], [5,6]]
 * @example  [1,2,3,4,5].to2DArray(3) 	--> [[1,2,3], [4,5]]
 * @example  [1,2,3,4,5].to2DArray(3, -1) 	--> [[1,2,3], [4,5,-1]]
 * 
 * @param {int} size - the column size of each row
 * @param {*} fillIfNotEnough - add this elem if not enough
 * 
 * @return {Array} - a new 2D array
 */
function to2DArray(size, fillIfNotEnough) {
	'use strict';
	if (this == null)
		throw new TypeError('Array.prototype.to2DArray called on null or undefined');
	else if (!Number.isInteger(size) || size <= 0)
		throw new TypeError('Array.prototype.to2DArray parameter 1 must be a positive integer');

	var missing;
	if (fillIfNotEnough !== undefined && this.length % size !== 0){
		var missingSize = size - this.length % size;
		missing = [];
		
		if (typeof fillIfNotEnough === 'function'){
			for (var i=0; i<missingSize; i++)
				missing.push(fillIfNotEnough(i));
		}else{
			for (var i=0; i<missingSize; i++)
				missing.push(fillIfNotEnough);
		}
	}
	
	var newArray = [];
	for (var idx = 0; idx<this.length; idx += size){
		if (idx+size >= this.length && missing){
			newArray.push( this.slice(idx, idx+size).concat(missing) );			
		}else{
			newArray.push( this.slice(idx, idx+size) );
		}
	}
	return newArray;
};
Array.prototype.to2DArray = to2DArray;

/**  
 * shuffle / random sorting
 * 
 * @return {Array} - the original array with random ordering
 */
Array.prototype.shuffle = function() {
	'use strict';
	if (this == null)
		throw new TypeError('Array.prototype.shuffle called on null or undefined');
	for (let i=0;i<10;i++) 
		this.sort((a,b)=>Math.floor(Math.random()*3)-1);
	return this;
};

/**  
 * create an array with size
 * @example	Array.create(3)				-->		[0,1,2]
 * @example	[].create(3)				-->		[0,1,2]
 * @example	[].create(5,a=>a+2)			-->		[2, 3, 4, 5, 6]
 * @example	[].create(5,a=>'a')			-->		['a', 'a', 'a', 'a', 'a']
 * @example	[].create(5,(a,s)=>s-a)		-->		[5, 4, 3, 2, 1]
 *
 * @param {int} size - size of array 
 * @param {function} fun - function for creating array
 * @return {Array} - a new array with size required
 */
Array.create = function(size,fun) {
	'use strict';
	if (!Number.isInteger(size) || size < 0)
		throw new TypeError('Array.create parameter 1 must be a positive integer');
	if (fun === undefined || fun === null)
		fun = (i)=>(i);
	if (typeof fun !== 'function')
		throw new TypeError('Array.create parameter 2 must be a function');

	let output = [];
	for (let k=0; k<size; k++)
		output.push(fun(k,size));
	return output;
};

/**  
 * create an array with size
 * @example	Array.create(3)				-->		[0,1,2]
 * @example	[].create(3)				-->		[0,1,2]
 * @example	[].create(5,a=>a+2)			-->		[2, 3, 4, 5, 6]
 * @example	[].create(5,a=>'a')			-->		['a', 'a', 'a', 'a', 'a']
 * @example	[].create(5,(a,s)=>s-a)		-->		[5, 4, 3, 2, 1]
 *
 * @param {int} size - size of array 
 * @param {function} fun - function for creating array
 * @return {Array} - a new array with size required
 */
Array.prototype.create = function(fun,size) {
	'use strict';
  return Array.create(fun,size);
};

/**  
 * let the array become distinct, unique
 * @example	[1,2,3,2,1].distinct() 		-->		[1,2,3]
 * @example	[{a:1},{a:2},{a:3},{a:2},{a:1}].distinct();			-->		[{a:1},{a:2},{a:3},{a:2},{a:1}]
 * @example	[{a:1},{a:2},{a:3},{a:2},{a:1}].distinct(b=>b.a);	-->		[{a:1},{a:2},{a:3}]
 * 
 * @param {function} fun - function for determine which should be unique in the array
 * @return {Array} - a new distinct array
 */
Array.prototype.distinct = function(fun) {
	'use strict';
	if (this == null)
		throw new TypeError('Array.prototype.distinct called on null or undefined');

	if (fun === undefined && Set)
    	return Array.from(new Set(this));
	else{
		if (fun === undefined)
			fun = a => a;
		if (typeof fun !== 'function')
			throw new TypeError('Array.prototype.distinct paramter must be a function');

		let output = [];
		this.forEach(value=>{
			let fVal = fun(value);
			if (!output.some(v=> fun(v)===fVal))
				output.push(value);
		})
		return output;
	}
};


/**  
 * filter function by array, this may be expensive.
 * @example	[1,2,3].notInArray([2,3,4])							-->		[1]
 * @example	[{a:1},{a:2},{a:3}].notInArray([2,3,4])				-->		[{a:1},{a:2},{a:3}]
 * 
 * @param {Array} array - array for comparing
 * @return {Array} - a new filtered array
 */
Array.prototype.notInArray = function(fun,array){
	'use strict';
	if (this == null) 
		throw new TypeError('Array.prototype.notInArray called on null or undefined');

	if (array === undefined){
		if (fun === undefined)
			throw new TypeError('Array.prototype.notInArray parameter cannot be null or undefined');
		array = fun;
		fun = undefined;
	}else{
		console.warn('Array.prototype.notInArray(fun, array) is deprecated, use Array.prototype.notInArray(array). Eg: [{a:1},{a:2},{a:3}].notInArray(b=>b.a, [2,3,4]) === [{a:1},{a:2},{a:3}].map(b=>b.a).notInArray([2,3,4])');
	}

	if (!(array instanceof Array))
		throw new TypeError('Array.prototype.notInArray parameter must be an array');

	if (typeof fun === 'function')
		array = array.map(fun);
	else if (fun !== undefined)
		throw new TypeError('Array.prototype.notInArray parameter 1 must be a function');

	return this.filter( item =>
		 !array.some( a => a === item )
	);
}


/**  
 * filter function by array, this may be expensive.
 * @example	[1,2,3].inArray([2,3,4])							-->		[2, 3]
 * @example	[{a:1},{a:2},{a:3}].inArray([2,3,4])				-->		[]
 * 
 * @param {Array} array - array for comparing
 * @return {Array} - a new filtered array
 */
Array.prototype.inArray = function(fun,array){
	'use strict';
	if (this == null) 
		throw new TypeError('Array.prototype.inArray called on null or undefined');

	if (array === undefined){
		if (fun === undefined)
			throw new TypeError('parameter cannot be null or undefined');
		array = fun;
		fun = undefined;
	}else{
		console.warn('Array.prototype.inArray(fun, array) is deprecated, use Array.prototype.inArray(array). Eg: [{a:1},{a:2},{a:3}].inArray(b=>b.a, [2,3,4]) === [{a:1},{a:2},{a:3}].map(b=>b.a).inArray([2,3,4])');
	}

	if (!(array instanceof Array))
		throw new TypeError('Array.prototype.inArray parameter must be an array');

	if (typeof fun === 'function')
		array = array.map(fun);
	else if (fun !== undefined)
		throw new TypeError('Array.prototype.inArray parameter 1 must be a function');

	return this.filter( item =>
		 array.some( a => a === item )
	);
}

/**  
 * join function by array
 * @example	[1,2,3].joinArray(['a','b'])	-->		[1,'a','b',2,'a','b',3]
 * 
 * @param {Array} array - an array that as a separator
 * @return {Array} - a new joined array
 */
Array.prototype.joinArray = function(array){
	'use strict';
	if (this == null) 
		throw new TypeError('Array.prototype.joinArray called on null or undefined');
	else if (!(array instanceof Array)) 
		throw new TypeError('parameter must be an array');

	var output = [];
	var input = this.slice();
	while (input.length>0){
		output.push( input.shift() );
		if (input.length>0)
			output = output.concat(array);
	}
	return output;
}

/**  
 * search function in a sorted array
 * @example	[1,2,3,4,5,6,7].binarySearch(2)	-->		1
 * @example	[7,6,5,4,3,2,1].binarySearch(2)	-->		5
 * @example	[1,2,3,4,5,6,7].binarySearch(2.5)	-->	-1
 * 
 * @param {*} target - the target value
 * @return {int} - index of the search target, or -1 if not found
 */
Array.prototype.binarySearch = function(target) {
	'use strict';
	if (this == null)
		throw new TypeError('Array.prototype.binarySearch called on null or undefined');

	var length = this.length;

	if (length === 0)
		return -1;
	else if (length === 1)
		return this[0] === target ? 0 : -1;
	else{
		var minIdx = 0;
		var maxIdx = length - 1;
		var curIdx, curElem;
		var isAsc = this[minIdx] < this[maxIdx];

		while (minIdx <= maxIdx){
			curIdx = (minIdx + maxIdx) / 2;
			curElem = this[curIdx];

			if (curElem < target) {
				if (isAsc) 	minIdx = curIdx + 1;
				else 				maxIdx = curIdx - 1;
			}else if (curElem > target) {
				if (isAsc) 	maxIdx = curIdx - 1;
				else 				minIdx = curIdx + 1;
			}else {
				return curIdx;
			}
		}
		return -1;
	}
};

/**  
 * find function in a sorted array
 * @example	[{a:1},{a:2},{a:3},{a:4},{a:5},{a:6},{a:7}].binaryFindIdx(elm => elm.a > 6 ? 0 : 1)		-->		6
 * @example	[{a:7},{a:6},{a:5},{a:4},{a:3},{a:2},{a:1}].binaryFindIdx(elm => elm.a < 2 ? 0 : -1)	-->		-1
 * @example	[{a:7},{a:6},{a:5},{a:4},{a:3},{a:2},{a:1}].binaryFindIdx(elm => elm.a <= 2 ? 0 : 1)	-->		5
 * @example	[{a:7},{a:6},{a:5},{a:4},{a:3},{a:2},{a:1}].binaryFindIdx(elm => elm.a < 3.5 ? 0 : 1)	-->		5
 * @example	[{a:7},{a:6},{a:5},{a:4},{a:3},{a:2},{a:1}].binaryFindIdx(elm => elm.a > 3 ? 1 : elm.a < 3 ? -1 : 0)	-->		4
 * 
 * @param {function} predicate - a function to compare element, negative to shift left, positive to shift right, 0 to find the element 
 * @return {int} - index of the search target, or -1 if not found
 */
Array.prototype.binaryFindIdx = function(predicate) {
	'use strict';
	if (this == null)
		throw new TypeError('Array.prototype.binaryFindIdx called on null or undefined');
	if (typeof predicate !== 'function')
		throw new TypeError('Array.prototype.binaryFindIdx predicate must be a function');

	var length = this.length;

	if (length === 0)
		return -1;
	else if (length === 1)
		return predicate(this[0]) === 0 ? 0 : -1;
	else{
		var minIdx = 0;
		var maxIdx = length - 1;

		while (minIdx <= maxIdx){
			var curIdx = (minIdx + maxIdx) / 2;
			var operation = predicate(this[curIdx]);

			if (operation > 0) {
				minIdx = curIdx + 1;
			}else if (operation < 0) {
				maxIdx = curIdx - 1;
			}else {
				return curIdx;
			}
		}
		return -1;
	}
};

/**  
 * find function in a sorted array
 * @example	[{a:1},{a:2},{a:3},{a:4},{a:5},{a:6},{a:7}].binaryFind(elm => elm.a > 6 ? 0 : 1)			-->		{a:7}
 * @example	[{a:7},{a:6},{a:5},{a:4},{a:3},{a:2},{a:1}].binaryFind(elm => elm.a < 2 ? 0 : -1)			-->		undefined
 * @example	[{a:7},{a:6},{a:5},{a:4},{a:3},{a:2},{a:1}].binaryFind(elm => elm.a <= 2 ? 0 : 1)			-->		{a:2}
 * @example	[{a:7},{a:6},{a:5},{a:4},{a:3},{a:2},{a:1}].binaryFind(elm => elm.a < 3.5 ? 0 : 1)		-->		{a:2}
 * @example	[{a:7},{a:6},{a:5},{a:4},{a:3},{a:2},{a:1}].binaryFind(elm => elm.a > 3 ? 1 : elm.a < 3 ? -1 : 0)		-->		{a:3}
 * 
 * @param {function} predicate - a function to compare element, negative to shift left, positive to shift right, 0 to find the element 
 * @return {*} - the element
 */
Array.prototype.binaryFind = function(predicate) {
	if (this == null)
		throw new TypeError('Array.prototype.binaryFind called on null or undefined');
	if (typeof predicate !== 'function')
		throw new TypeError('Array.prototype.binaryFind predicate must be a function');

	var idx = this.binaryFindIdx(predicate);
	if (idx >= 0)	return this[idx];
	else	return undefined
};

/////////////////     Self - Extension    ///////////////// 

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    'use strict';
    if (this == null)
      throw new TypeError('Array.prototype.find called on null or undefined');
    if (typeof predicate !== 'function')
      throw new TypeError('Array.prototype.binary predicate must be a function');
    
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;
    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    var T, k;
    if (this === null) 
      throw new TypeError(' this is null or not defined');
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") 
      throw new TypeError(callback + ' is not a function');
    if (arguments.length > 1)
			T = thisArg;
		
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}

if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    var T, A, k;
    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    A = new Array(len);
    k = 0;
    while (k < len) {
      var kValue, mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

if (!Array.prototype.every) {
  Array.prototype.every = function(callbackfn, thisArg) {
    'use strict';
    var T, k;
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callbackfn !== 'function') {
      throw new TypeError();
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        var testResult = callbackfn.call(T, kValue, k, O);
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}

if (!Array.prototype.some) {
  Array.prototype.some = function(fun/*, thisArg*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.some called on null or undefined');
    }
    if (typeof fun !== 'function') {
      throw new TypeError();
    }
    var t = Object(this);
    var len = t.length >>> 0;
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t)) {
        return true;
      }
    }
    return false;
  };
}

if (!Array.prototype.fill) {
  Array.prototype.fill = function(value) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    var start = arguments[1];
    var relativeStart = start >> 0;
    var k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);
    var end = arguments[2];
    var relativeEnd = end === undefined ?
      len : end >> 0;
    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len);
    while (k < final) {
      O[k] = value;
      k++;
    }
    return O;
  };
}

if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }
    return res;
  };
}

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;
    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }
    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}


if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    var k;
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = +fromIndex || 0;
    if (Math.abs(n) === Infinity) {
      n = 0;
    }
    if (n >= len) {
      return -1;
    }
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (k < len) {
      if (k in o && o[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
    'use strict';
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    var n, k,
      t = Object(this),
      len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }
    n = len - 1;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) {
        n = 0;
      }
      else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }
    for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback /*, initialValue*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    var t = Object(this), len = t.length >>> 0, k = 0, value;
    if (arguments.length == 2) {
      value = arguments[1];
    } else {
      while (k < len && !(k in t)) {
        k++; 
      }
      if (k >= len) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      value = t[k++];
    }
    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}

if ('function' !== typeof Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function(callback /*, initialValue*/) {
    'use strict';
    if (null === this || 'undefined' === typeof this) {
      throw new TypeError('Array.prototype.reduce called on null or undefined' );
    }
    if ('function' !== typeof callback) {
      throw new TypeError(callback + ' is not a function');
    }
    var t = Object(this), len = t.length >>> 0, k = len - 1, value;
    if (arguments.length >= 2) {
      value = arguments[1];
    } else {
      while (k >= 0 && !(k in t)) {
        k--;
      }
      if (k < 0) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      value = t[k--];
    }
    for (; k >= 0; k--) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}