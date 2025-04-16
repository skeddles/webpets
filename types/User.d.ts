type User = {
	_id: ObjectId | string;
	username: string;
	password: string;
	admin: boolean;
	purchasedLessons: ObjectId[];
	purchasedCourses: ObjectId[];
};
