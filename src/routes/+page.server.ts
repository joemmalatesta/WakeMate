import twilio from 'twilio';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { TWILIO_ACCOUNT_SID } from '$env/static/private';
import { TWILIO_AUTH_TOKEN } from '$env/static/private';
import { createUser, checkDuplicate } from '../lib/server/mongo/mongo';
// ******
//USING THE OUTPUT VALUES AS FRONT END INDICATORS SO DON'T CHANGE THESE
// ******



//Initalize Twilio Client. Maybe should do this per request but whatever.
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);



// THINGS WE NEED!
let validationNumber: number;
let phoneNumber: number | any;
let wakeUpTime: string | any;
let weekends: boolean | any

function formatPhoneNumber(phoneNumber: string): string {
	// Remove all non-numeric characters from the phone number string
	const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

	// Apply the (xxx) xxx-xxxx format
	const formattedPhoneNumber = numericPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

	return formattedPhoneNumber;
}

export const actions: Actions = {
	sendValidation: async ({ request }) => {
		const formData = await request.formData();
		//Store, Validate, and Format Phone Number
		phoneNumber = formData.get('phone');
		if (
			!phoneNumber.match(/^\+?[0-9]\d{1,20}$|^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
		) {
			return {
				output: 'number failure'
			};
		}
		phoneNumber = formatPhoneNumber(phoneNumber);

		// Make sure there is a time
		wakeUpTime = formData.get('time');
		if (!wakeUpTime) {
			return {
				output: 'time failure'
			};
		}
		weekends = formData.get("weekends")
		console.log(weekends)
		if (!weekends) {
			return{
				output: "weekends failure"
			}
		}

		console.log(wakeUpTime, phoneNumber);

		//Check if phone number already in the database
		if (!(await checkDuplicate(phoneNumber))) {
			return {
				output: "duplicate"
			}
		}

		//Create 6 digit Verification number for the code
		const min = 100000;
		const max = 999999;
		validationNumber = Math.floor(Math.random() * (max - min + 1)) + min;



		//Send verification number first. 
		try {
			const sendMessage = await twilioClient.messages.create({
				body: `Your wake up call code is: ${validationNumber}`,
				to: phoneNumber,
				from: '+18335197545'
			});
		} catch (error) {
			console.error(error);
			return fail(500, {
				output: 'number failure'
			});
		}

		return {
			output: 'success'
		};
	},



	// After phone number is validated, 
	validate: async ({ request }) => {
		const formData = await request.formData();
		let inputNumber: number | any = formData.get('code');
		let offset: string | any = formData.get('offset')
		let localTime: string | any = formData.get('localTime')
		console.log(offset)
		// Stop if the numbers don't match. let them retry
		if (inputNumber != validationNumber) {
			return {
				output: 'validation failure'
			};
		}
		if (!(await createUser(phoneNumber, wakeUpTime, offset, localTime, weekends))) {
			return;
		}

		try {
			const sendMessage = await twilioClient.messages
				.create({
					body: `Welcome to your most productive self.\nYou'll get 7 free wake up calls starting tomorrow at ${wakeUpTime}`,
					to: phoneNumber,
					from: '+18335197545'
				})
				.then((message) => console.log(message.sid));
		} catch (error) {
			console.error(error);
			return fail(500, {
				output: 'validation failure'
			});
		}

		return {
			output: 'validation success',
			time: wakeUpTime
		};
	}
};
