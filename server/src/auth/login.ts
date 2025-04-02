import bcrypt from 'bcrypt';
import { createRouter, is } from '../utilities/create-router';
import createToken from '../utilities/create-token';
import { getUserByUsername } from '../queries/user/get-by-username';

const schema = {
	username: is.string().min(4).max(32).regex(/^[a-zA-Z0-9_]+$/),
	password: is.string().min(8).max(1024),
};

export default createRouter(schema, async (req, res, _next) => {
	const { username, password } = req.body;

	const user = await getUserByUsername(username.trim());
	const passwordMatch = await bcrypt.compare(password, user.password);
	if (!passwordMatch) {
		res.status(401).json({ error: "Invalid username or password" });
		return;
	}

	const token = await createToken(user._id);
	res.status(201).json({ token });
});