import { MONGO_USER_PASSWORD, MONGO_USERNAME } from '$env/static/private';
import { MongoClient, ServerApiVersion } from 'mongodb';
const currentTime = new Date().toUTCString();

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_USER_PASSWORD}@wake-up-call.lyukuu3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
});

/**
 *
 *
 * @param phoneNumber - formatted phone number
 * @param wakeUpTime - selected wake up time.
 * @param offset - time offset from GMT to local time e.g (GMT-4)
 * @param localTime - time from clients local computer
 *
 * @returns True if the user was successfully created, false if there was an error
 *
 */
async function createUser(
	phoneNumber: string,
	wakeUpTime: string,
	offset: string,
	localTime: string,
	weekends: boolean,
) {
	try {
		await client.connect();
		const database = client.db('wake-up-call');
		const collection = database.collection('users');
		// Double check if number already exists. Just to be sure. Don't call function so as not to have multiple connections
		const existingUser = await collection.findOne({ phoneNumber });
		if (existingUser) {
			console.log(`Phone number ${phoneNumber} already exists in the database.`);
			return false;
		}
		// Create new user in DB :)
		await collection
			.insertOne({
				phoneNumber,
				wakeUpTime,
				signUpUTC: currentTime,
				lastUpdated: currentTime,
				signUpLocal: localTime,
				offset,
				status: "free",
				weekends,
				active: true
			})
			.then(() => {
				console.log(`Added ${phoneNumber} to DB at ${currentTime}.`);
			});
		return true;
	} catch (err) {
		console.log(err);
		return false;
	} finally {
		await client.close();
	}
}

/**
 *
 *
 * @param phoneNumber - formatted phone number
 * @returns True if the phone number is not a duplicate, False if it is.
 *
 */
async function checkDuplicate(phoneNumber: string) {
	try {
		await client.connect();
		const database = client.db('wake-up-call');
		const collection = database.collection('users');
		const existingUser = await collection.findOne({ phoneNumber });
		if (existingUser) {
			console.log(`Phone number ${phoneNumber} already exists in the database.`);
			return false;
		}
		return true;
	} catch (err) {
		console.log(err);
		return false;
	} finally {
		await client.close();
	}
}
/**
 *
 *
 * @param phoneNumber - formatted phone number
 * @returns returns all information about a specific User
 *
 */
async function getUserDetails(phoneNumber: string) {
	try {
		await client.connect();
		const database = client.db('wake-up-call');
		const collection = database.collection('users');
		const existingUser = await collection.findOne({ phoneNumber });
		if (!existingUser) {
			console.log(`Phone number ${phoneNumber} doesn't exist in the database.`);
			return false;
		}
		// TAKE HIM FOR ALL HES GOT! - id
		const { _id, ...user } = existingUser;
		return user;
	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
	}
}

export { createUser, checkDuplicate, getUserDetails };
