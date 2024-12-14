import { ErrorSnackbar } from '@/components/Snackbar/ErrorSnackbar.component';
import { env } from '@/lib/env';
import { useSnackbar } from '@/lib/providers/Snackbar.provider';
import { AddAnnouncement, Announcement } from '@/lib/types/Announcement.types';
import { Language } from '@/lib/types/Language.types';
import { responseHandling } from '@/lib/utils/fetch-response-handling';
import { useClerk } from '@clerk/clerk-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const announcementKeys = {
	announcements: () => ['announcements']
};

export const useGetAnnouncements = () => {
	const { session } = useClerk();

	return useQuery({
		queryKey: announcementKeys.announcements(),
		queryFn: async () => {
			const response = await fetch(`${env.VITE_API_URL}/announcements`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await session?.getToken()}`
				}
			});

			return responseHandling<{
				[Language.TR]: Announcement[];
				[Language.NL]: Announcement[];
				[Language.AR]: Announcement[];
			}>(response);
		}
	});
};

export const useAddAnnouncements = () => {
	const { session } = useClerk();
	const queryClient = useQueryClient();
	const { errorSnackbar, successSnackbar } = useSnackbar();
	const { t } = useTranslation();

	return useMutation({
		mutationFn: async (announcements: AddAnnouncement[]) => {
			const response = await fetch(`${env.VITE_API_URL}/announcements`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await session?.getToken()}`
				},
				body: JSON.stringify(announcements)
			});

			return responseHandling<Announcement[]>(response);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: announcementKeys.announcements() });

			successSnackbar(t('snackbar.success'));
		},
		onError: error => {
			errorSnackbar(<ErrorSnackbar message={error.message} />, true);
		}
	});
};
