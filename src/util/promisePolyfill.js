/**  
 * run promise one by one
 *
 * @param {function[]} promises - array of async-function or sync-function
 * @param {handler} progress - callback for each promise end, it will
 * @param {object} option - option for the sequence
 * @param {boolean} option.skipIfError - true / false if skip when error occur
 * @param {object} option.cancelable - pointer for cancel the promise.sequence, set cancelable.canceled = ture whenever to cancel it.
 * 
 * @return {Array} - the result / error of all promise
 */
Promise.sequence = function(promises, progress, option){

	if (!(promises instanceof Array))
		throw Error('1st paramaeter must be an array of async-function');

	if (!progress || typeof progress !== 'function') progress = function(){};
	var step = 0;
	var skip = option && option.skipIfError === true? true : false;
	var cancelable = option && option.cancelable || {};

	progress(null, 0, promises.length);

	return promises.reduce((promise, asyncFun) => {
		return promise.then(result=>{

			if (cancelable && cancelable.canceled){

				// canceled
				result.push({_canceled:true});	
				return result;

			}else if (typeof asyncFun !== 'function'){

				////  handle if it is value
				progress(asyncFun, ++step, promises.length);
				result.push(asyncFun);	
				return result;

			}else{

				////  handle if it is sync-function
				var resp;
				try{
					resp = asyncFun();
					if (!(resp instanceof Promise)){
						progress(resp, ++step, promises.length);				
						result.push(resp);
						return result;
					}
				}catch(err){
					if (skip){
						progress(err, ++step, promises.length);										
						result.push(err);
						return result;
					}else{
						throw err;
					}
				}

				////  handle if it is async-function				
				if (resp instanceof Promise)
					return resp.then(subResult=>{
						progress(subResult, ++step, promises.length);				
						result.push(subResult);
						return result;
					}).catch(function(err){
						if (skip){
							progress(err, ++step, promises.length);	
							result.push(err);
							return result;
						}else{
							throw err;
						}
					});

			}
		});
	}, Promise.resolve([]));

};

/**
 * delay millisecond
 * 
 * @param {integer} time
 * 
 * @example await delay(1000)
 */
Promise.delay = function(time=100){
	return new Promise(resolver=>{
		setTimeout(resolver,time);
	});
}

/**
 * For handling progress
 * 
 * @callback handler
 * @param {*} subResult - reture from the promise
 * @param {int} step - the step just finish
 * @param {int} total - the total step
 * 
 */