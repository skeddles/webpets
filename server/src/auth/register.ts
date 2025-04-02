import bcrypt from 'bcrypt';
import { createRouter, is } from '../utilities/create-router.js';
import createToken from '../utilities/create-token.js';
import { insertUser } from '../queries/user/insert.js';

const SALT_ROUNDS = 10;

const schema = {
	username: is.string().min(4).max(32).regex(/^[a-zA-Z0-9_]+$/),
	password: is.string().min(8).max(1024),
};

export default createRouter(schema, async (req, res, _next) => {
	const { username, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const user = await insertUser(username, hashedPassword);
		const token = await createToken(user._id);
		res.status(201).json({ token, user });
	} catch (err) {
		if ((err as any).code === 11000) {
			res.status(409).json({ error: "Username is unavailable" });
			return;
		}
		else throw err;
	}
});

