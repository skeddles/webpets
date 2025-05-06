
type DiscordWebhookPayload = {
	username?: string;
	avatar_url?: string;
	content?: string;
	embeds?: {
		color?: number;
		author?: {
			name?: string;
			url?: string;
			icon_url?: string;
		};
		title?: string;
		url?: string;
		description?: string;
		fields?: {
			name: string;
			value: string;
			inline?: boolean;
		}[];
		thumbnail?: {
			url: string;
		};
		image?: {
			url: string;
		};
		footer?: {
			text: string;
			icon_url: string;
		};
		timestamp?: string;
	}[];
	files?: {
		name: string;
		description: string;
		content_type: string;
		data: Buffer;
	}[];
	tts?: boolean;
	allowed_mentions?: {
		parse?: ('roles' | 'users' | 'everyone')[];
		roles?: string[];
		users?: string[];
	};
};