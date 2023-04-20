import twilio from 'twilio';
import type { Actions } from '@sveltejs/kit';

const accountSid = 'AC2fe4e7d6a110de275db95313acb6c299';
const authToken = '4dd54669056c375fdb84a0e4aada0023';
const twilioClient = twilio(accountSid, authToken);


let validationNumber: number
let phoneNumber: number | any
let time: string | any



export const actions: Actions = {
	sendValidation: async ({request}) => {
		const formData = await request.formData();
		phoneNumber = formData.get('phone')
		time = formData.get('time')
		if (!time) {
			return {
				output: "time failure"
			}
		}
		console.log(time, phoneNumber)
		validationNumber = Math.floor(Math.random() * 1000000);


		try {
			console.log("trying")
			const sendMessage = await twilioClient.messages.create({
				body: `Your wake up call code is: ${validationNumber}`,
				to: phoneNumber,
				from: '+18335197545'
			}).then(message => console.log(message.sid))
		} catch (error) {
			console.error(error);
            return{
                output : "number failure"
            }
            
		}

		return {
			output: 'success'
		};
	},





	validate: async ({request}) => {
		console.log("now trying this")
		const formData = await request.formData();
		let inputNumber: number | any = formData.get('code')
		console.log(inputNumber, validationNumber)

		// Stop if the numbers don't match. let them retry
		if (inputNumber != validationNumber) {
			console.log("numbers don't match")
			return {
				output: "validation failure"
			}
		}


		try {
			const sendMessage = await twilioClient.messages.create({
				body: `Welcome to your most productive self.\nYou'll get 7 free wake up calls starting tomorrow at ${time}`,
				to: phoneNumber,
				from: '+18335197545'
			}).then(message => console.log(message.sid))
		} catch (error) {
			console.error(error);
            return{
                output : "validation failure"
            }
            
		}



		// Send to DB here. Prisma?

		return {
			output: 'validation success'
		};
	}
};
