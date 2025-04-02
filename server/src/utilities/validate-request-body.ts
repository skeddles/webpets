import { Request, Response, NextFunction } from 'express';
import {z, ZodRawShape} from 'zod';

export default function validateRequestBody(schemaDefinition:ZodRawShape) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const schema = z.object(schemaDefinition);
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof z.ZodError) console.log('invalid request body:', error.errors);
			else console.log('validation error:', error);
			res.status(400).json({ error: "Invalid Request Body" });
		}
	};
}