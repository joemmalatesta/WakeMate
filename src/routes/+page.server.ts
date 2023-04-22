import twilio from 'twilio';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { TWILIO_ACCOUNT_SID } from '$env/static/private';
import { TWILIO_AUTH_TOKEN } from '$env/static/private';
import { MONGO_USER_PASSWORD, MONGO_USERNAME } from '$env/static/private';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { createUser } from '../lib/server/mongo/mongo';

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// THING WE NEED!
let validationNumber: number;
let phoneNumber: number | any;
let time: string | any;

export const actions: Actions = {
	sendValidation: async ({ request }) => {
		const formData = await request.formData();
		phoneNumber = formData.get('phone');
		if (!phoneNumber.match(/^\+?[0-9]\d{1,20}$|^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)) {
			return {
				output: 'number failure'
			};
		}
		time = formData.get('time');
		if (!time) {
			return {
				output: 'time failure'
			};
		}
		console.log(time, phoneNumber);
		const min = 100000; // minimum value (inclusive)
		const max = 999999; // maximum value (inclusive)
		validationNumber = Math.floor(Math.random() * (max - min + 1)) + min;

		try {
			const sendMessage = await twilioClient.messages
				.create({
					body: `Your wake up call code is: ${validationNumber}`,
					to: phoneNumber,
					from: '+18335197545'
				})
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

	// After phone number is validated
	validate: async ({ request }) => {
		const formData = await request.formData();
		let inputNumber: number | any = formData.get('code');

		// Stop if the numbers don't match. let them retry
		if (inputNumber != validationNumber) {
			return {
				output: 'validation failure'
			};
		}
		if (!await createUser(phoneNumber, time)) {
			return
		}

		try {
			const sendMessage = await twilioClient.messages
				.create({
					body: `Welcome to your most productive self.\nYou'll get 7 free wake up calls starting tomorrow at ${time}`,
					to: phoneNumber,
					from: '+18335197545'
				}).then(message => console.log(message.sid))
		} catch (error) {
			console.error(error);
			return fail(500, {
				output: 'validation failure'
			});
		}

		return {
			output: 'validation success'
		};
	}
};
