import https from 'https';
import FormData from 'form-data';

export default function sendDiscordWebhook(webhookID: DiscordWebhookIds, data: any) {
	const url = process.env[webhookID + '_DISCORD_WEBHOOK'];
	if (!webhookID || !url) return console.error('Not sending webhook, URL not found');

	let payload: DiscordWebhookPayload = {};
	let useForm = false;

	if (typeof data === 'string') {
		sendNormalWebhook(url, {content: data});
	}
	else if (data instanceof Error) {
		payload.content = 'An error occurred:';
		useForm = true;
		sendFileWebhook(url, Buffer.from(data.stack || ''));
	}
	else if (typeof data === 'object') {
		sendNormalWebhook(url, data);
	}
	else {
		sendNormalWebhook(url, {content: String(data)});
	}
}

function sendNormalWebhook (url:string, webhookPayload: DiscordWebhookPayload) {
	webhookPayload.username = 'Pixel School';
	
	const body = JSON.stringify(webhookPayload);
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	};
	const req = https.request(url, options);
	req.on('error', logWebookError);
	req.write(body);
	req.end();
}

function sendFileWebhook (url:string, file:Buffer) {
	const form = new FormData();

	form.append('payload_json', JSON.stringify({
		username: 'Pixel School',
		content: 'An error occurred: '
	}));

	form.append('file1', file, { filename: 'error.txt', contentType: 'text/plain' });
	
	const headers = form.getHeaders();
	const req = https.request(url, { method: 'POST', headers });
	req.on('error', logWebookError);
	form.pipe(req);
}

function logWebookError (error: any) {
	console.error('webhook error:', error);
}