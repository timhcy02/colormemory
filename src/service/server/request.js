import { SERVER_URL, DEBUG, OFFLINE_MODE, API_KEY } from '../../config/config.js';
import { NativeModules, DeviceEventEmitter, Platform, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
var accessToken;

var RNUploader = NativeModules.RNUploader;

function _getHeaders() {
	return {
		'x-pm-api-key': API_KEY,
		'x-pm-access-token': accessToken,
		'Authorization': 'Bearer ' + accessToken
	}
}

function _getServerUrl() {
	let serverUrl = SERVER_URL;
	if (!serverUrl.endsWith('/'))
		serverUrl = serverUrl+'/';

	return serverUrl;
}

function _getImagePath() {
	return _getServerUrl() + "blob_image/";
}

function _getPdfPath() {
	return _getServerUrl() + "blob_pdf/";
}

async function _fetch(path, option, specialTimeout){
	return new Promise((resolver, rejector)=>{
		var xhttp = new XMLHttpRequest();
		if(specialTimeout) {		
			xhttp.timeout = specialTimeout;
		}else {
			xhttp.timeout = 30000;
		}
		
		xhttp.ontimeout = function () { rejector("Timed out!!!"); }
		
		xhttp.open(option.method, path, true);	

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				resolver(xhttp.responseText);
			}else if (this.readyState === 4){
				rejector(xhttp.responseText);
			}
		};	

		Object.keys(option.headers).forEach(header => {
			xhttp.setRequestHeader(header, option.headers[header]);			
		})

		xhttp.send(option.body);
	});
}


async function _req(method, path, body, specialTimeout, ignoreToken) {

	return NetInfo.isConnected.fetch().then(isConnected => {
		if(isConnected) {
			let headers = {
				'x-pm-api-key': API_KEY,
				'Content-Type': "application/json"
			};

			if (accessToken && !ignoreToken) {
				headers['x-pm-access-token'] = accessToken;
				headers['Authorization'] = 'Bearer ' + accessToken;
			}

			let option = { method, headers };
			console.log("option", option)

			if (method !== 'GET'){
				// if (!body) {
				// 	body = {_limit: -1};
				// } else if (!('_limit' in body)) {
				// 	body._limit = -1;
				// }
				option.body = JSON.stringify(body);
			}

			let serverUrl = _getServerUrl();

			// console.logTime('start', serverUrl, path);
			// if (OFFLINE_MODE)
			// 	return delay(3000).then(() => ({}));
			// else
			return _fetch(serverUrl+path, option, specialTimeout)
			// .then(resp => resp.text())
			.then(resp=>{
				// console.logTime('end', serverUrl, path);
				let json;
				try {
					json = JSON.parse(resp);
				}catch(err){
					return resp;
				}

				if (json.error){
					if (json.error === 'Forbidden')
						_setUser(null);
					throw json;
				}
				return json;
			})
			.catch((err) => {
				if (DEBUG) {
					console.log("fetch err", err);
					if (err.message) {
						return err;
					} else if (typeof err !== 'string') {
						return {
							message: JSON.stringify(err)
						};
					} else {
						return {
							message: err
						};
					}
				} else {
					if (err.message) {
						return err;
					} else {
						return false;
					}
				}
			});

		}else {
			return { internetError: true };
		}
	})
}

async function _get(path, params,  specialTimeout = false, ignoreToken = false) {
	// if (checkParam(params, 'object'))
	// 	path = path + '?' + Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
	return _req('GET', path, false, specialTimeout, ignoreToken);
}

async function _post(path, body, specialTimeout = false, ignoreToken = false) {
	return _req('POST', path, body, specialTimeout, ignoreToken);
}

async function _put(path, body,  specialTimeout = false, ignoreToken = false,) {
	return _req('PUT', path, body, specialTimeout, ignoreToken);
}

async function _delete(path, body,  specialTimeout = false, ignoreToken = false) {
	return _req('DELETE', path, body, specialTimeout, ignoreToken);
}

async function _setUser(user){
	if (user && user.api_token){
		accessToken = user.api_token;
		AsyncStorage.setItem('accessToken', '123v', () => {

		})
		
	}

	if(user && !user.api_token) {
		AsyncStorage.getItem("accessToken").then((value) => {
			accessToken == value
		})
	}

	
}


async function _upload(path, file, progress){
	progress = progress? progress : ()=>{};

	console.log("filelog", file)
	
	let ext = file.fileName.split('.');
	ext = ext[ext.length-1];
	ext = ext.toLowerCase();
	
	let requestPath = path;
	if (requestPath.indexOf('http') != 0) {
		let serverUrl = _getServerUrl();
		requestPath = serverUrl + path;
	}

	if (Platform.OS == 'ios') {
		DeviceEventEmitter.addListener('RNUploaderProgress', progress);
	
		let files = [{
			name: 'file',
			filename: file.fileName,
			filepath: file.origURL,
			filetype: 'image/'+ext,
		}];

		if (ext == 'pdf') {
			files[0].filetype = "application/pdf";
		}
	
		let opts = {
			url: requestPath,
			files: files, 
			method: 'POST',
			headers: { 
				'x-pm-api-key': API_KEY,
				'x-pm-access-token': accessToken,
				'Authorization': 'Bearer ' + accessToken,
				'Accept': 'application/json'
			 },
		};

		console.log("opts", opts)
		console.log("NativeModules", NativeModules)

		console.log("RNUploader", RNUploader)
	
		return new Promise((resolver, rejector)=>{
			RNUploader.upload( opts, (err, response) => {
				DeviceEventEmitter.removeListener('RNUploaderProgress',progress);
				if( err ){
					console.log("err", err)
					rejector(err);
				} else{
					try {
						let json = response.data;
						if (response.status === 200)
							resolver(json);
						else
							rejector(json);
					}catch(err){
						console.log("err2", err)
						rejector(err);
					}
				}
			});
		})
	} else {
		// var fileTransfer = new FileTransfer();
		// fileTransfer.onprogress = progress;

		// var fileURL = file.origURL;
		// var options = {};
        // options.fileKey = 'file';
        // options.fileName = file.fileName;
		// options.mimeType = 'image/'+ext;
		// if (ext == 'pdf') {
		// 	options.mimeType = "application/pdf";
		// }

		// options.headers = { 
		// 	'x-pm-api-key': API_KEY,
		// 	'x-pm-access-token': accessToken,
		// 	'Authorization': 'Bearer ' + accessToken,
		// 	'Accept': 'application/json'
		// };
		// return new Promise((resolver, rejector)=>{
		// 	fileTransfer.upload(
		// 		fileURL, 
		// 		requestPath,
		// 		(response)=>{
		// 			console.log("fileTransfer.upload", response);
		// 			try {
		// 				let json = response;
		// 				if (response.responseCode === 200)
		// 					resolver(json.response);
		// 				else
		// 					rejector(json);
		// 			}catch(err){
		// 				rejector(err);
		// 			}
		// 		}, 
		// 		(error)=>{
		// 			console.log("fileTransfer.upload", error);
		// 			rejector(error);
		// 		}, 
		// 		options
		// 	);
		// });
	}
}

module.exports = {
	_get,
	_post,  
	_put,
	_delete,
	_setUser,
	_upload,
	_getHeaders,
	_getServerUrl,
	_getImagePath,
	_getPdfPath
}