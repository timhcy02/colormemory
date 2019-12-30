import LocalizedStrings from 'react-native-localization';

let i18 = new LocalizedStrings({
	en: require('./en'),
	tc: require('./zh_hk'),
});

module.exports = i18;