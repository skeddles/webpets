import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	//add a timestamp to the request
	req.timestamp = Date.now();
	res.on('finish', () => {
		const elapsed = Date.now() - req.timestamp;
		console.log(`${req.method} ${res.statusCode} ${req.originalUrl} ${elapsed}ms`);
	});
	next();
});

app.use(routes);

app.use((_req, res) => {
	res.status(404).json({ error: 'Page Not found' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error('Route Error:', err);
	res.status(500).json({ error: 'Internal Server Error' });
});

app.on('close', () => {
	console.log('server is shutting down...');
});

export default app;
