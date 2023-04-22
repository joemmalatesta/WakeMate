import { MONGO_USER_PASSWORD, MONGO_USERNAME } from '$env/static/private';
import { MongoClient, ServerApiVersion } from 'mongodb';
const currentTime = new Date().toLocaleString();

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_USER_PASSWORD}@wake-up-call.lyukuu3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
});

async function createUser(phoneNumber: string, wakeUpTime: string) {
	
	try {
		await client.connect();
		const database = client.db('wake-up-call');
		const collection = database.collection('users');
		await collection.insertOne({ phoneNumber, wakeUpTime, singUpTime: currentTime }).then(() => {
			console.log(`Added ${phoneNumber} to DB at ${currentTime}.`);
		});
	} catch (err) {
		console.log(err);
		return false;
	}
	return true;
}


// false is there is a duplicate number found in the DB, else false
async function checkDuplicate(phoneNumber: string) {
	await client.connect();
	const database = client.db('wake-up-call');
	const collection = database.collection('users');
	const existingUser = await collection.findOne({ phoneNumber });
	if (existingUser) {
		console.log(`Phone number ${phoneNumber} already exists in the database.`);
		return false;
	}
	return true
}




export { createUser, checkDuplicate };
