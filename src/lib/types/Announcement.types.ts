import { Language } from '@/lib/types/Language.types';

export interface Announcement {
	id: number;
	content: string;
	langauge: Language;
	createdAt: Date;
	updatedAt: Date;
}

export interface AddAnnouncement {
	content: string;
	language: Language;
}
