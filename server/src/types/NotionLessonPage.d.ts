import { Client } from '@notionhq/client';
import type {
	PageObjectResponse,
	PartialPageObjectResponse,
	DatabaseObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

type RichTextProperty = Extract<PageObjectResponse['properties'][string],{ type: 'rich_text' }>;
type NumberProperty = Extract<PageObjectResponse['properties'][string],{ type: 'number' }>;
type SelectProperty = Extract<PageObjectResponse['properties'][string],{ type: 'select' }>;
type TitleProperty = Extract<PageObjectResponse['properties'][string],{ type: 'title' }>;

type NotionLessonPage = PageObjectResponse & {
	properties: {
		Name: TitleProperty;
		Description: RichTextProperty;
		Images: NumberProperty;
		Words: NumberProperty;
		Level: NotionSelectProperty;
		Category: NotionSelectProperty;
		Course: NotionSelectProperty;
		Status: NotionSelectProperty;
	};
}
