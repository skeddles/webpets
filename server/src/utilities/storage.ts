import AWS from 'aws-sdk';
import mimetype from 'mime-types';

const DO_SPACES_SUBDIRECTORY = process.env.DO_SPACES_SUBDIRECTORY || (() => { throw new Error("DO_SPACES_SUBDIRECTORY is not defined in environment variables"); })();
const DO_SPACES_KEY = process.env.DO_SPACES_KEY || (() => { throw new Error("DO_SPACES_KEY is not defined in environment variables"); })();
const DO_SPACES_SECRET = process.env.DO_SPACES_SECRET || (() => { throw new Error("DO_SPACES_SECRET is not defined in environment variables"); })();	
const DO_SPACES_ENDPOINT = process.env.DO_SPACES_ENDPOINT || (() => { throw new Error("DO_SPACES_ENDPOINT is not defined in environment variables"); })();
const DO_SPACES_BUCKET = process.env.DO_SPACES_BUCKET || (() => { throw new Error("DO_SPACES_BUCKET is not defined in environment variables"); })();

const s3 = new AWS.S3({
    endpoint: DO_SPACES_ENDPOINT,
    accessKeyId: DO_SPACES_KEY,
    secretAccessKey: DO_SPACES_SECRET
});

export async function uploadFile (filepath:string, data:any, publiclyAccessible:boolean) {
	let destinationPath = DO_SPACES_SUBDIRECTORY + '/' + filepath;

	await s3.putObject({
		Bucket: DO_SPACES_BUCKET,
		Key: destinationPath,
		Body: data,
		ACL: publiclyAccessible ? 'public-read' : 'private',
		ContentType: mimetype.lookup(filepath) || 'application/octet-stream',
	}).promise();
}

export async function getPresignedUrl (filepath:string) {
	let destinationPath = DO_SPACES_SUBDIRECTORY + '/' + filepath;

	return await s3.getSignedUrlPromise('getObject', {
		Bucket: DO_SPACES_BUCKET,
		Key: destinationPath,
		Expires: 300, // 5 minutes
	});
}