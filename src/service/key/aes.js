import aesjs from 'aes-js';

const KEY = [186, 150, 13, 56, 78, 195, 232, 127, 223, 173, 178, 161, 35, 64, 161, 4];

function encrypt(text){
	var textBytes = aesjs.utils.utf8.toBytes(text);
	var aesCtr = new aesjs.ModeOfOperation.ctr(KEY, new aesjs.Counter(5));
	var encryptedBytes = aesCtr.encrypt(textBytes);
	var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
	return encryptedHex;
}

function decrypt(encryptedHex){
	var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
	var aesCtr = new aesjs.ModeOfOperation.ctr(KEY, new aesjs.Counter(5));
	var decryptedBytes = aesCtr.decrypt(encryptedBytes);
	var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
	return decryptedText;
}

function test(){
	let TEST = "test string for AES encrypting";
	let encrypted = encrypt(TEST);
	let decrypted = decrypt(encrypted);

	if ( encrypted === TEST || TEST !== decrypted)
		console.warn('AES encryption test fail !!');
}
test();

module.exports = {encrypt, decrypt};