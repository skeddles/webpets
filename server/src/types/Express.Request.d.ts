declare namespace Express {
	interface Request {
		userId: ObjectId;
		timestamp: number;
	}
}