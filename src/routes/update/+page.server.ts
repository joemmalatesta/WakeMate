import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import twilio from 'twilio';
import { TWILIO_ACCOUNT_SID } from '$env/static/private';
import { TWILIO_AUTH_TOKEN } from '$env/static/private';
import { getUserDetails, checkDuplicate } from '../../lib/server/mongo/mongo';
// ******
//USING THE OUTPUT VALUES AS FRONT END INDICATORS SO DON'T CHANGE THESE
// ******

//Initialize Twilio Client. Maybe should do this per request but whatever.
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// THINGS WE NEED!
let validationNumber: number;
let phoneNumber: number | any;

/**
 *
 *
 * @param phoneNumber - raw phone number
 * @returns formats phone number into (xxx) xxx-xxxx
 *
 */
function formatPhoneNumber(phoneNumber: string): string {
	// Remove all non-numeric characters from the phone number string
	const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

	// Apply the (xxx) xxx-xxxx format
	const formattedPhoneNumber = numericPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

	return formattedPhoneNumber;
}

export const actions: Actions = {
	sendUpdateValidation: async ({ request }) => {
		console.log('getting request');
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
		console.log(phoneNumber);

		//Check if phone number already in the database
		if (await checkDuplicate(phoneNumber)) {
			console.log('what');
			return {
				output: 'not duplicate'
			};
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
		// Stop if the numbers don't match. let them retry
		if (inputNumber != validationNumber) {
			return {
				output: 'validation failure'
			};
		}

		let user: any = await getUserDetails(phoneNumber);
		const { userPhoneNumber = user.phoneNumber, wakeUpTime, signUpUTC, signUpLocal, offset } = user;
		console.log(user)

		return {
			output: 'validation success',
			user: user
		};
	}
};
