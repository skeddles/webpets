import { Client } from '@notionhq/client';

const API_KEY = process.env.NOTION_API_KEY || (() => { throw new Error("NOTION_API_KEY is not defined in environment variables"); })();
const ARTICLES_DATABASE_ID = process.env.NOTION_ARTICLES_DATABASE_ID || (() => { throw new Error("NOTION_ARTICLES_DATABASE_ID is not defined in environment variables"); })();
const ASSIGNMENTS_DATABASE_ID = process.env.NOTION_ASSIGNMENTS_DATABASE_ID || (() => { throw new Error("NOTION_ASSIGNMENTS_DATABASE_ID is not defined in environment variables"); })();
const DO_SPACES_CDN_URL = process.env.DO_SPACES_CDN_URL || (() => { throw new Error("DO_SPACES_CDN_URL is not defined in environment variables"); })();
const DO_SPACES_SUBDIRECTORY = process.env.DO_SPACES_SUBDIRECTORY || (() => { throw new Error("DO_SPACES_SUBDIRECTORY is not defined in environment variables"); })();
const CDN_PATH = DO_SPACES_CDN_URL + DO_SPACES_SUBDIRECTORY + '/';


const notion = new Client({auth: API_KEY});

export async function getLessonList() { 
	const pages = await notion.databases.query({ database_id: ARTICLES_DATABASE_ID });
	return pages.results;
}

export async function getAssignments() {
	const query = await notion.databases.query({ database_id: ASSIGNMENTS_DATABASE_ID });
	return query.results;
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
	let currentGroup = null as string | null;

	for (const block of pageBlocks) {
		if (!('type' in block)) 
			console.warn('Block has no type');
		else if (!converter[block.type]) 
			console.warn('No converter for block type "'+ block.type +'"');
		else {
			const convertedPageData = await converter[block.type](block,pageId);

			if (currentGroup && convertedPageData.group && convertedPageData.group != currentGroup) 
				html += `</${currentGroup}><${convertedPageData.group}>`;
			else if (currentGroup && !convertedPageData.group)
				html += `</${currentGroup}>`;
			else if (!currentGroup && convertedPageData.group) 
				html += `<${convertedPageData.group}>`;

			currentGroup = convertedPageData.group || null;
			
			html += convertedPageData.html;

			if (convertedPageData.files) files.push(...convertedPageData.files);
		}
	}

	if (currentGroup) html += `</${currentGroup}>`;

	return { html, files };
}


const converter: Record<string, (block: any,pageId:string) => Promise<{ html: string; files?: BlockFileData[]; group?: string }>> = {
	'paragraph': async (block:any) => {
		return {
			html: `<p>${richTextToHtml(block.paragraph.rich_text)}</p>`
		}
	},
	'heading_1': async (block:any) => {
		return {
			html: `<h1>${richTextToHtml(block.heading_1.rich_text)}</h1>`
		}
	},
	'heading_2': async (block:any) => {
		return {
			html: `<h2>${richTextToHtml(block.heading_2.rich_text)}</h2>`
		}
	},
	'heading_3': async (block:any) => {
		return {
			html: `<h3>${richTextToHtml(block.heading_3.rich_text)}</h3>`
		}
	},
	'image': async (block:any,pageId:string) => {
		return {
			files: [{id: block.id, url: block.image.file.url}],
			html: `<figure class="image"><img src="${CDN_PATH+'lessons/'+pageId+'/'+block.id}" alt="${block.image.caption}" /></figure>`
		}
	},
	'callout': async (block:any) => {
		const icon = block.callout.icon?.emoji ? block.callout.icon?.emoji + ' ' : '';
		return {
			html: `<figure>${icon + richTextToHtml(block.callout.rich_text)}</figure>`
		}
	},
	'quote': async (block:any) => {
		return {
			html: `<blockquote>${richTextToHtml(block.quote.rich_text)}</blockquote>`
		}
	},
	'numbered_list_item': async (block:any) => {
		return {
			group: 'ol',
			html: `<li>${richTextToHtml(block.numbered_list_item.rich_text)}</li>`
		}
	}
}

interface RichText {
	plain_text: string;
	href?: string;
	annotations: {
		bold?: boolean;
		italic?: boolean;
		strikethrough?: boolean;
		code?: boolean;
	};
}

function richTextToHtml(richTextArray: RichText[]): string {
	return richTextArray.map((rt: RichText) => {
		let text = rt.plain_text;
		if (rt.href) text = '<' + text + '>';
		if (rt.annotations.bold) text = '<b>' + text + '</b>';
		if (rt.annotations.italic) text = '<i>' + text + '</i>';
		if (rt.annotations.strikethrough) text = '<s>' + text + '</s>';
		if (rt.annotations.code) text = '<code>' + text + '</code>';
		return text;
	}).join('');
}