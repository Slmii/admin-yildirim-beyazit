import { ErrorSnackbar } from '@/components/Snackbar/ErrorSnackbar.component';
import { env } from '@/lib/env';
import { useSnackbar } from '@/lib/providers/Snackbar.provider';
import { AddQuranAyah, ApiAyah, ApiSurah, QuranAyah, QuranAyahPreviewLanguageEnum } from '@/lib/types/Ayah.types';
import { CustomUseQueryOptions } from '@/lib/types/Query';
import { responseHandling } from '@/lib/utils/fetch-response-handling';
import { useClerk } from '@clerk/clerk-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const quranAyahKeys = {
	ayahs: () => ['ayahs'],
	surahs: () => ['surahs'],
	preview: (surah: number, ayah: number, language: QuranAyahPreviewLanguageEnum) => [
		...quranAyahKeys.surahs(),
		surah,
		ayah,
		language
	],
	add: () => [...quranAyahKeys.ayahs(), 'add']
};

export const useGetQuranAyahs = () => {
	const { session } = useClerk();

	return useQuery({
		queryKey: quranAyahKeys.ayahs(),
		enabled: !!session,
		queryFn: async () => {
			const response = await fetch(`${env.VITE_API_URL}/ayahs/admin`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await session?.getToken()}`
				}
			});

			return responseHandling<QuranAyah[]>(response);
		}
	});
};

export const useGetSurahs = () => {
	const { session } = useClerk();

	return useQuery({
		queryKey: quranAyahKeys.surahs(),
		enabled: !!session,
		queryFn: async () => {
			const response = await fetch('https://api.alquran.cloud/v1/surah');
			return (await response.json()).data as ApiSurah[];
		}
	});
};

export const useGetAyahPreview = (
	{
		surah,
		ayah,
		previewLanguage
	}: {
		surah: number;
		ayah: number;
		previewLanguage: QuranAyahPreviewLanguageEnum;
	},
	options?: CustomUseQueryOptions<ApiAyah>
) => {
	const { session } = useClerk();

	return useQuery({
		queryKey: quranAyahKeys.preview(surah, ayah, previewLanguage),
		enabled: !!session,
		queryFn: async () => {
			const response = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/${previewLanguage}`);
			return (await response.json()).data as ApiAyah;
		},
		...options
	});
};

export const useAddQuranAyahs = () => {
	const { session } = useClerk();
	const queryClient = useQueryClient();
	const { errorSnackbar, successSnackbar } = useSnackbar();
	const { t } = useTranslation();

	return useMutation({
		mutationKey: quranAyahKeys.add(),
		mutationFn: async (ayahs: AddQuranAyah[]) => {
			const response = await fetch(`${env.VITE_API_URL}/ayahs`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await session?.getToken()}`
				},
				body: JSON.stringify(ayahs)
			});

			return responseHandling<{ count: number }>(response);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: quranAyahKeys.ayahs() });

			successSnackbar(t('snackbar.success'));
		},
		onError: error => {
			errorSnackbar(<ErrorSnackbar message={error.message} />, true);
		}
	});
};
