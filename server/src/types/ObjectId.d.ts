import mongodb from "mongodb";

declare global {
	type ObjectId = mongodb.ObjectId;
}