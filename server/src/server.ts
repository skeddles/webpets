import app from './app.js';
import sendDiscordWebhook from './utilities/send-discord-webhook.js';
import CONFIG from '../config.json' assert {type: 'json'};

const port = parseInt(CONFIG.port, 10);

const host = process.argv.includes('--host') ? '0.0.0.0' : 'localhost';

app.listen(port, host, () => {
	console.log(`\nServer started at http://${host}:${port}...\n`);
	sendDiscordWebhook('ERROR', `Server started at http://${host}:${port}`);
});

process.on('SIGINT', logCrash);
process.on('uncaughtException', logCrash);
process.on('unhandledRejection', logCrash);

process.on('exit', (code) => {
    console.log(`Process exited with code: ${code}`);
    sendDiscordWebhook('ERROR', `Server exited with code: ${code}`);
});

function logCrash(error: any) {
    console.error('Uncaught error:', error);
    sendDiscordWebhook('ERROR', error);
    process.exit(1); // Use a non-zero exit code to indicate an error
}