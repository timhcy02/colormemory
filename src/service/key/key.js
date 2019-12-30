import SInfo from 'react-native-sensitive-info';
import { randomString } from 'Utilities';

import {encrypt, decrypt} from './aes.js';

var _key;

function key(){
	return Promise.resolve()
		.then(()=>{
			if (_key)	return _key;
			return SInfo.getItem('key',{}).then(value => {
				if (!_key){
					if (!value){
						_key = randomString(64);
						value = encrypt(_key);
						SInfo.setItem('key',value,{});
					}else{
						_key = decrypt(value);
					}
				}
				return _key;
			})
		})
} 

module.exports = key;