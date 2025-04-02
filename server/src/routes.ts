import {promises as fsp} from 'fs';
import express from 'express';
// import authenticate from './authenticate.js';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.use('/status', (_req, res) => {
	res.status(200).json({ message: 'Server is running' });
});

// await loadRoutes('auth');
// router.use(authenticate);
await loadRoutes('api');

async function loadRoutes(subFolder:string) {
	const files = await fsp.readdir(`${__dirname}/${subFolder}`);
	const jsFiles = files.filter((file) => file.endsWith('.js'));

	for (const jsFile of jsFiles) {
		const route = await import(`./${subFolder}/${jsFile}`);
		const name = jsFile.replace('.js', '');
		const path = `/${subFolder}/${name}`;
		router.use(path, route.default);
		console.log(' ➤ ', path);
	}
}

export default router;
