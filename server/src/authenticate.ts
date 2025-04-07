import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

const JWT_SECRET:string = process.env.JWT_SECRET || (() => { throw new Error("JWT_SECRET is not defined in environment variables"); })();

export default async function authenticate(req:Request, res:Response, next:NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error("Authorization header not found or invalid");
        const token = authHeader.split(' ')[1];
		const decodedToken = jwt.verify(token, JWT_SECRET, 
			{ ignoreExpiration: true } // until we implement a refresh token system
		);

		if (typeof decodedToken == 'string') throw new Error("Invalid Token");

        req.userId = decodedToken.user.id;
        next();
    } catch (error) {
        if (error instanceof Error && error.name === 'TokenExpiredError') console.log("token expired");
		else console.log("unauthorized", error);

        res.status(401).json({ error: "Unauthorized" });
        return;
    }
}
