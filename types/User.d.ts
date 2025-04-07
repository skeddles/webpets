type User = {
	_id: ObjectId;
	username: string;
	password: string;
	admin: boolean;
};

type ClientUser = Omit<User, "_id" | "password"> & {
	id: string;
	token: string;
	lessons: Lesson[];
};

