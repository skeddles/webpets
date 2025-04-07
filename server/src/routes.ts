import { Dirent, promises as fsp } from 'fs';
import express from 'express';
import { dirname, join, relative } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routesDir = join(__dirname, 'routes'); 

let routeTree = '';
await loadRoutes();

async function loadRoutes(dir = routesDir, basePath = '') {
    const entries = await fsp.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        const relativePath = join(basePath, entry.name);

        if (entry.isDirectory()) 
			await loadRoutes(fullPath, relativePath);

        if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.ts'))) {

			const fileSystemPath = pathToFileURL(fullPath).href;
			const routePath = getRoutePath(fullPath, entry);
			const route = await import(fileSystemPath);
            router.use(routePath, route.default);

            routeTree += `➤  ${routePath}\n`;
        }
    }
}

function getRoutePath (fullPath:string, entry: Dirent) {

	let routePath = '/' + relative(routesDir, fullPath);	// Get relative path from routesDir
	routePath = routePath.replace(/\\/g, '/'); 				// Normalize Windows path slashes
	routePath = routePath.replace(/\.(js|ts)$/, ''); 		// Remove file extension

	const folderName = routePath.split('/').slice(-2, -1)[0];
	const fileNameWithoutExt = entry.name.replace(/\.(js|ts)$/, '');

	if (folderName === fileNameWithoutExt)
		routePath = routePath.replace(new RegExp(`/${folderName}$`), '');

	return routePath;
}

console.log('\nRoutes loaded:\n' + routeTree);

export default router;