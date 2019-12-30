import { DEBUG, OFFLINE_MODE, RELEASE_VERSION } from '../../config/config.js';
import { _get, _post, _put, _delete, _setUser, _upload } from './request.js';

import { Platform } from 'react-native';

import DeviceInfo from 'react-native-device-info';

const uniqueId = DeviceInfo.getUniqueID();

let fcmToken = '';

export async function autoLogin(user){
	return _setUser(user);
}
	
async function login(data){
	let platform = Platform.OS === 'ios' ? 'iOS': 'Android';
	let app_version = RELEASE_VERSION;
	let token = fcmToken ? fcmToken : 'fKwtJ8GIw_8:APA91bF3-owLzQIXw1LGvpFYLjhNMPqkw6M5S_pZWA7UAjPhSE6mJI0OPRTkDHw_4Umlbwu7Cp371EmuDbGaw75SsT9F05teOYiNiCHbbwHpL4mzdsfOii7kECZVrMpW1hIZ6Jplf3Cy'

	let card_num = data.number1 ? data.number1 + data.number2 + data.number3 + data.number4 : null
	return _post('user_login.php', 
	{
		'name': data.loginId,
		'card_num': card_num,
		'password': data.password,
		'device_id': token,
		'platform': platform,
		'app_version': app_version,
		'real_device_id': uniqueId
	}).then(resp => {
		return resp;
	});
}


async function fetchAccountInfo(user){
	return _post('account_info.php', user).then(resp => {
		return resp;
	});
}

async function sendPushToken(token){
	fcmToken = token
	return _post('device_settings.php', 
	{
		'platform': Platform.OS === 'ios' ? 'iOS': 'Android',
		'registration_id': token,
		'real_device_id': uniqueId
	}).then(resp => {
		return resp;
	});
}



module.exports = {
	login,
	fetchAccountInfo,
	sendPushToken,

}