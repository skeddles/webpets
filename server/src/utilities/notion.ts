import { Client } from '@notionhq/client';

const API_KEY = process.env.NOTION_API_KEY || (() => { throw new Error("NOTION_API_KEY is not defined in environment variables"); })();
const DATABASE_ID = process.env.NOTION_ARTICLES_DATABASE_ID || (() => { throw new Error("NOTION_ARTICLES_DATABASE_ID is not defined in environment variables"); })();
const DO_SPACES_CDN_URL = process.env.DO_SPACES_CDN_URL || (() => { throw new Error("DO_SPACES_CDN_URL is not defined in environment variables"); })();
const DO_SPACES_SUBDIRECTORY = process.env.DO_SPACES_SUBDIRECTORY || (() => { throw new Error("DO_SPACES_SUBDIRECTORY is not defined in environment variables"); })();
const CDN_PATH = DO_SPACES_CDN_URL + DO_SPACES_SUBDIRECTORY + '/';


const notion = new Client({auth: API_KEY});

export async function getLessonList() { 
	const pages = await notion.databases.query({ database_id: DATABASE_ID });
	return pages.results;
}

export async function getPageBlocks (blockId:string) { console.log('getting page blocks for', blockId);
	let request = await notion.blocks.children.list({block_id: blockId});
	const blocks = Array.from(request.results);
	console.log('got', blocks.length, 'blocks');

	while (request.has_more) { 
		request = await notion.blocks.children.list({block_id: blockId, start_cursor: request.next_cursor || undefined});
		blocks.push(...Array.from(request.results));
		console.log('got', blocks.length, 'more blocks');
	}

	return blocks;
}

export async function getLessonHtml(pageId:string) {
	const pageBlocks = await getPageBlocks(pageId);
	
	let html = '';
	const files = [] as BlockFileData[];

	for (const block of pageBlocks) {
		if (!('type' in block)) 
			console.warn('Block has no type');
		else if (!converter[block.type]) 
			console.warn('No converter for block type "'+ block.type +'"');
		else {
			const convertedPageData = await converter[block.type](block,pageId);
			html += convertedPageData.html;
			if (convertedPageData.files) files.push(...convertedPageData.files);
		}
	}

	return { html, files };
}


const converter: Record<string, (block: any,pageId:string) => Promise<{ files: BlockFileData[]; html: string; }>> = {
	'image': async (block:any,pageId:string) => {
		return {
			files: [{id: block.id, url: block.image.file.url}],
			html: `<img src="${CDN_PATH+'lessons/'+pageId+'/'+block.id}" alt="${block.image.caption}" />`
		}
	}
}