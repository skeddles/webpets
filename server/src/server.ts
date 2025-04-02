import app from './app.js';

const port = parseInt(process.env.PORT || '3064');
const host = process.argv.includes('--host') ? '0.0.0.0' : 'localhost';

app.listen(port, host, () => {
	console.log(`\nServer started at http://${host}:${port}...\n`);
});