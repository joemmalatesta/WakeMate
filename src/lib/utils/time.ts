// Here just worry about converting the time
export const convertTime = (time: string, offset: string) => {
	let convertedTime: string;
	time = time.replace('am', ''); // Splits at the word boundary after a digit

	// Extract hours and minutes from the time string
	const [hoursString, minutesString] = time.split(':');

	// Convert hours and minutes to integers
	let hours = parseInt(hoursString);
	let minutes = parseInt(minutesString);

	const sign = offset.slice(3, 4); // Extracts the sign character (+ or -)
	const [offsetHourString, offsetMinuteString] = offset.slice(4).split(':'); // Extracts the time portion
	const offsetHours = parseInt(offsetHourString);
	const offsetMinutes = parseInt(offsetMinuteString);
	if (sign === '-') {
		if (minutes === 30 && offsetMinutes === 30) {
			hours += 1;
			minutes = 0;
		}
		hours += offsetHours;
		if (hours >= 24) {
			hours -= 24;
		}
	} else {
		if (minutes === 30 && offsetMinutes === 30) {
			minutes = 0;
		}
		hours -= offsetHours;
		if (hours < 0){
			hours += 24
		}
	}

	return assembleString(hours, minutes);
};

const assembleString = (hours: number, minutes: number) => {
	console.log(hours, minutes);
	const formattedHours = hours.toString().padStart(2, '0');
	const formattedMinutes = minutes.toString().padStart(2, '0');
	return `${formattedHours}:${formattedMinutes}`;
};
