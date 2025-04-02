import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export default async function createToken(userId:ObjectId) {
    const payload:UserTokenPayload = {user: {id: userId.toString()}};
	return await signedToken(payload);
}

async function signedToken(payload:UserTokenPayload) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, JWT_SECRET, {}, (err, token) => {
			if (err) reject(err);
			else resolve(token);
		});
	});
}