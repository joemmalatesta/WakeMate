import twilio from 'twilio';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

const accountSid = 'AC2fe4e7d6a110de275db95313acb6c299';
const authToken = '4dd54669056c375fdb84a0e4aada0023';
const twilioClient = twilio(accountSid, authToken);

let validationNumber: number;
let phoneNumber: number | any;
let time: string | any;




async function setCall(phoneNumber: string, time: string) {	
	try{
		await prisma.user.create({
			data: {
				phoneNumber,
				time
			}
		})
	} catch (err){
		console.log(err)
		return fail(500, {output: "failed to add to prisma"})
	}

	console.log("Success ADDED!")
	return {
		output: "successfully added to DB"
	}
  }




export const actions: Actions = {
	sendValidation: async ({ request }) => {
		const formData = await request.formData();
		phoneNumber = formData.get('phone');
		time = formData.get('time');
		setCall(phoneNumber, time)
		// if (!time) {
		// 	return {
		// 		output: 'time failure'
		// 	};
		// }
		// console.log(time, phoneNumber);
		// const min = 100000; // minimum value (inclusive)
		// const max = 999999; // maximum value (inclusive)
		// validationNumber = Math.floor(Math.random() * (max - min + 1)) + min;

		// try {
		// 	const sendMessage = await twilioClient.messages
		// 		.create({
		// 			body: `Your wake up call code is: ${validationNumber}`,
		// 			to: phoneNumber,
		// 			from: '+18335197545'
		// 		})
		// 		.then((message) => console.log(message.sid));
		// } catch (error) {
		// 	console.error(error);
		// 	return fail(500, {
		// 		output: 'number failure'
		// 	});
		// }

		// return {
		// 	output: 'success'
		// };
	},

	// After 
	validate: async ({ request }) => {
		const formData = await request.formData();
		let inputNumber: number | any = formData.get('code');
		console.log(inputNumber, validationNumber);

		// Stop if the numbers don't match. let them retry
		if (inputNumber != validationNumber) {
			console.log("numbers don't match");
			return {
				output: 'validation failure'
			};
		}

		try {
			console.log("trying")
			const sendMessage = await twilioClient.messages
				.create({
					body: `Welcome to your most productive self.\nYou'll get 7 free wake up calls starting tomorrow at ${time}`,
					to: phoneNumber,
					from: '+18335197545'
				})
				.then(() => {setCall(phoneNumber, time)});
		} catch (error) {
			console.error(error);
			return fail(500,{
				output: 'validation failure'
			});
		}
		

		return {
			output: 'validation success'
		};
	}
};



