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

// Pets
export const Pets = database.collection("pets");
await Pets.createIndex({ "userId": 1 },{ name:"userId_index" });
await Pets.createIndex({ "slug": 1 },{ name:"slug_index", unique: true, collation: {locale: 'en',strength: 2}});

// Items
export const Items = database.collection("items");
await Items.createIndex({ "userId": 1 },{ name:"userId_index" });

export default database;