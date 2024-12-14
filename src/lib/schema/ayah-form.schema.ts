import { z } from 'zod';

export const ayahFormSchema = z.object({
	ayahs: z.array(
		z.object({
			surah: z.string({ required_error: 'Selecteer een Surah' }),
			ayah: z.string({ required_error: 'Selecteer een Ayah' })
		})
	)
});
