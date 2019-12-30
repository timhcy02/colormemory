function leftPad(text){
	text = text+"";
	while (text.length < 2)
		text = '0' + text;
	return text;
}

/**  
 * add days from this Date
 * @example  (new Date('2017-03-30T08:00:00.000Z')).format()	--> "30/03/2017, 04:00:00 PM"
 * @example  (new Date('2017-03-30T08:00:00.000Z')).format("DD/MM/YYYY, hh:mm:ss A")	-->  "30/03/2017, 04:00:00 PM"
 * @example  (new Date('2017-03-30T08:00:00.000Z')).format("D/M/YY, HH:mm a")	-->  "30/3/17, 16:00 pm"
 * @example  (new Date('2017-03-06T08:00:00.000Z')).format("ddd D, MMMM YY")	-->  "Mon 6, March 17"
 * 
 * @param {string} - input the format of output, Format: YYYY=2017, YY=17, MMMM=February, MMM=Feb, MM=02, M=2, DD=05, D=5, dddd=Monday, ddd=Mon, dd=Mo, d=2, HH=16, H=16, hh=04, h=4, mm=09, m=9, ss=32, s=32, A=PM, a=pm 
 * @return {Date} - a new Date after calculation
 */
Date.prototype.format = function (input) {

	'use strict';
	if (this == null)
		throw new TypeError('Date.prototype.format called on null or undefined');

	var MONTH = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var WEEK_DAY = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var str = input || "DD/MM/YYYY, hh:mm:ss A";
	var date = this;

	var hr = date.getHours();
	var isPm = hr > 12;
	
	str = str.replace(/Y/g,'`Y`');
	str = str.replace(/M/g,'`M`');
	str = str.replace(/D/g,'`D`');
	str = str.replace(/d/g,'`d`');
	str = str.replace(/H/g,'`H`');
	str = str.replace(/h/g,'`h`');
	str = str.replace(/m/g,'`m`');
	str = str.replace(/s/g,'`s`');
	str = str.replace(/A/g,'`A`');
	str = str.replace(/a/g,'`a`');

	str = str.replace(/`Y``Y``Y``Y`/g,date.getFullYear());		
	str = str.replace(/`Y``Y`/g,(date.getFullYear()+'').substr(2));
	str = str.replace(/`Y`/g,'Y');
	str = str.replace(/`M``M``M``M`/g,MONTH[date.getMonth()]);
	str = str.replace(/`M``M``M`/g,MONTH[date.getMonth()].substr(0,3));
	str = str.replace(/`M``M`/g,leftPad(date.getMonth()+1));	
	str = str.replace(/`M`/g,(date.getMonth()+1));
	str = str.replace(/`D``D`/g,leftPad(date.getDate()));	
	str = str.replace(/`D`/g,date.getDate());

	str = str.replace(/`d``d``d``d`/g,WEEK_DAY[date.getDay()]);
	str = str.replace(/`d``d``d`/g,WEEK_DAY[date.getDay()].substr(0,3));	
	str = str.replace(/`d``d`/g,WEEK_DAY[date.getDay()].substr(0,2));	
	str = str.replace(/`d`/g,(date.getDay()+1));	

	str = str.replace(/`H``H`/g,leftPad(hr));	
	str = str.replace(/`H`/g,(hr));
	str = str.replace(/`h``h`/g,leftPad(isPm?hr-12:(hr==0?12:hr)));	
	str = str.replace(/`h`/g,(isPm?hr-12:(hr==0?12:hr)));
	str = str.replace(/`m``m`/g,leftPad(date.getMinutes()));	
	str = str.replace(/`m`/g,(date.getMinutes()));
	str = str.replace(/`s``s`/g,leftPad(date.getSeconds()));	
	str = str.replace(/`s`/g,(date.getSeconds()));

	str = str.replace(/`A`/g,isPm?'PM':'AM');
	str = str.replace(/`a`/g,isPm?'pm':'am');

	return str;
};

/**  
 * add days from this Date
 * @example  (new Date('2017-03-30T08:00:00.000Z')).addDays(1)	-->  Fri Mar 31 2017 16:00:00 GMT+0800 (HKT)
 * @example  (new Date('2017-03-30T08:00:00.000Z')).addDays(3)	-->  Sun Apr 02 2017 16:00:00 GMT+0800 (HKT)
 * @example  (new Date('2017-03-30T08:00:00.000Z')).addDays(-2)	-->  Tue Mar 28 2017 16:00:00 GMT+0800 (HKT)
 * 
 * @param {int} num - the number of days
 * @return {Date} - a new Date after calculation
 */
Date.prototype.addDays = function (num) {
	var value = this.valueOf();
	value += 86400000 * num;
	return new Date(value);
}

/**  
 * add seconds from this Date
 * @example  (new Date('2017-03-30T08:00:00.000Z')).addSeconds(20)	-->  Thu Mar 30 2017 16:00:20 GMT+0800 (HKT)
 * @example  (new Date('2017-03-30T08:00:00.000Z')).addSeconds(80)	-->  Thu Mar 30 2017 16:01:20 GMT+0800 (HKT)
 * @example  (new Date('2017-03-30T08:00:00.000Z')).addSeconds(-20)	-->  Thu Mar 30 2017 15:59:40 GMT+0800 (HKT)
 * 
 * @param {int} num - the number of seconds
 * @return {Date} - a new Date after calculation
 */
Date.prototype.addSeconds = function (num) {
	var value = this.valueOf();
	value += 1000 * num;
	return new Date(value);
}

/**  
 * add minutes from this Date
 * @example  (new Date('2017-03-30T08:00:00.000Z')).addMinutes(20)	-->  Thu Mar 30 2017 16:20:00 GMT+0800 (HKT)
 * @example  (new Date('2017-03-30T08:00:00.000Z')).addMinutes(60)	-->  Thu Mar 30 2017 17:00:00 GMT+0800 (HKT)
 * @example  (new Date('2017-03-30T08:00:00.000Z')).addMinutes(-20)	-->  Thu Mar 30 2017 15:40:00 GMT+0800 (HKT)
 * 
 * @param {int} num - the number of minutes
 * @return {Date} - a new Date after calculation
 */
Date.prototype.addMinutes = function (num) {
	var value = this.valueOf();
	value += 60000 * num;
	return new Date(value);
}

/**  
 * add hours from this Date
 * @example  (new Date('2017-03-30T00:00:00.000Z')).addHours(14)	-->  Thu Mar 30 2017 22:00:00 GMT+0800 (HKT)
 * @example  (new Date('2017-03-30T00:00:00.000Z')).addHours(26)	-->  Fri Mar 31 2017 10:00:00 GMT+0800 (HKT)
 * @example  (new Date('2017-03-30T00:00:00.000Z')).addHours(-2)	-->  Thu Mar 30 2017 06:00:00 GMT+0800 (HKT)
 * 
 * @param {int} num - the number of hours
 * @return {Date} - a new Date after calculation
 */
Date.prototype.addHours = function (num) {
	var value = this.valueOf();
	value += 3600000 * num;
	return new Date(value);
}

/**  
 * check if this is leap year
 * @example  Date.isLeapYear(2016)	-->  true
 * @example  Date.isLeapYear(2017)	-->  false
 * 
 * @param {int} year - year
 * @return {boolean} - if it is leap year
 */
Date.isLeapYear = function (year) { 
	return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

/**  
 * check if this is leap year
 * @example  (new Date('2016-02-01T00:00:00.000Z')).isLeapYear()	-->  true
 * @example  (new Date('2017-02-01T00:00:00.000Z')).isLeapYear()	-->  false
 * 
 * @return {boolean} - if it is leap year
 */
Date.prototype.isLeapYear = function () { 
	return Date.isLeapYear(this.getFullYear()); 
};

/**  
 * get the days for specific month and year
 * @example  Date.getDaysInMonth(2016,2)	-->  29
 * @example  Date.getDaysInMonth(2017,2)	-->  28
 * 
 * @param {int} year - year
 * @param {int} month - month
 * @return {int} - the days of this month
 */
Date.getDaysInMonth = function (year, month) {
	if (month < 1 || month > 12)
		throw new TypeError('Date.getDaysInMonth called with invalid month'); 
  return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month-1];
};

/**  
 * get the days for specific month and year
 * @example  (new Date('2016-02-01T00:00:00.000Z')).getDaysInMonth()	-->  29
 * @example  (new Date('2016-02-01T00:00:00.000Z')).getDaysInMonth()	-->  28
 * 
 * @return {int} - the days of this month
 */
Date.prototype.getDaysInMonth = function () { 
	return Date.getDaysInMonth(this.getFullYear(), this.getMonth()+1);
};

/**  
 * add hours from this Date
 * @example  (new Date('2017-03-31T08:00:00.000Z')).addMonths(1)	-->  Sun Apr 30 2017 16:00:00 GMT+0800 (HKT)
 * @example  (new Date('2017-03-11T08:00:00.000Z')).addMonths(14)	-->  Fri May 11 2018 16:00:00 GMT+0800 (HKT)
 * @example  (new Date('2017-03-31T08:00:00.000Z')).addMonths(-1)	-->  Tue Feb 28 2017 16:00:00 GMT+0800 (HKT)
 * 
 * @param {int} num - the number of hours
 * @return {Date} - a new Date after calculation
 */
Date.prototype.addMonths = function (value) {
	var n = this.getDate();
	var date = new Date(this.valueOf());

	date.setDate(1);
	date.setMonth(this.getMonth() + value);
	date.setDate(Math.min(n, date.getDaysInMonth()));
	return date;
};