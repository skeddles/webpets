import { uploadFile } from './storage.js';

export default async function downloadAllFiles(folderPath:string, files:BlockFileData[]) {
	for (const file of files) {
		try {
			//download the files data from the url
			const response = await fetch(file.url);
			if (!response.ok) throw new Error('Failed to download file: ' + response.statusText);
			const fileData = Buffer.from(await response.arrayBuffer());
			const path = `${folderPath}/${file.id}`
			await uploadFile(path, fileData, true);
			console.log('File uploaded:', path);
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	}
}