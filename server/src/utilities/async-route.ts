import { Request, Response, NextFunction } from 'express';
import sendDiscordWebhook from './send-discord-webhook.js';

interface AsyncRouteFunction {
	(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default (fn: AsyncRouteFunction) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch((error) => {
		console.error('Internal Route Error: ', error)
		if (!error.message) console.warn('Warning: A route threw an error without a message. You probably threw a string instead of new Error() - you should avoid this.');
		if (error.message === 'Not Found') 
			return res.status(418).json({ error: "Not Found" });
		else {
			sendDiscordWebhook('ERROR', error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	});
};
