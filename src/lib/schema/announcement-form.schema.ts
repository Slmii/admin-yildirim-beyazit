import { Language } from '@/lib/types/Language.types';
import { z } from 'zod';

const content = z.object({
	content: z.string().min(1, { message: 'Minimale lengte is 1' })
});

export const announcementFormSchema = z.object({
	announcements: z.object({
		[Language.TR]: z.array(content),
		[Language.NL]: z.array(content),
		[Language.AR]: z.array(content)
	})
});
