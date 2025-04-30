import dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ServerApiVersion, Db, ObjectId } from 'mongodb';

if (!process.env.MONGO_DB_CONNECTION_STRING) 
	throw new Error('MONGO_DB_CONNECTION_STRING is not defined');

const client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING, {
	serverApi: ServerApiVersion.v1
});

await client.connect();
	console.log('connecting to database...');
const database:Db = client.db(process.env.MONGO_DB_DATABASE_NAME);
	

if (!database) {
	console.error('failed to connect to database');
	process.exit(1);
} else console.log('connected to database');

export function id (id:IdOrString) {
	if (typeof id === 'string') return ObjectId.createFromHexString(id);
	else return id as ObjectId;
}

// Users
export const Users = database.collection("users");
await Users.createIndex({ "username": 1 },{ name:"username_lowercase_index", unique: true, collation: {locale: 'en',strength: 2}});

// Lessons
export const Lessons = database.collection("lessons");
await Lessons.createIndex({ "slug": 1 }, { name:"slug_lowercase_index", unique: true });
await Lessons.createIndex({ "pageId": 1 }, { name:"pageId_lowercase_index", unique: true });

// Assignments
export const Assignments = database.collection("assignments");

// Completions
export const Completions = database.collection("completions");
await Completions.createIndex({ "userId": 1, "type": 1 }, { name:"userId_type_index" });
await Completions.createIndex({ "userId": 1, "contentId": 1, "type": 1 }, { name:"userId_contentId_type_index" });

export default database;