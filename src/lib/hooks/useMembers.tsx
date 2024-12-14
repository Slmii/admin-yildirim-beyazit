import { ErrorSnackbar } from '@/components/Snackbar/ErrorSnackbar.component';
import { ORDER, MEMBER_ORDER_BY, ROWS_PER_PAGE } from '@/lib/constants/table.constants';
import { env } from '@/lib/env';
import { useSnackbar } from '@/lib/providers/Snackbar.provider';
import { AddMember, EditMember, Member, SearchMembersParams } from '@/lib/types/Member.types';
import { CustomUseQueryOptions } from '@/lib/types/Query';
import { responseHandling } from '@/lib/utils/fetch-response-handling';
import { cleanObject } from '@/lib/utils/format.utils';
import { useClerk } from '@clerk/clerk-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

const memberKeys = {
	members: () => ['members'],
	searchMembers: (queryString: string) => [...memberKeys.members(), queryString],
	member: (id: number) => [...memberKeys.members(), id]
};

export const useGetMember = (id: number, options?: CustomUseQueryOptions<Member>) => {
	const { session } = useClerk();

	return useQuery({
		queryKey: memberKeys.member(id),
		enabled: !!session,
		queryFn: async () => {
			const response = await fetch(`${env.VITE_API_URL}/members/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await session?.getToken()}`
				}
			});

			return responseHandling<Member>(response);
		},
		...options
	});
};

export const useGetMembers = () => {
	const { session } = useClerk();
	const [searchParams] = useSearchParams();

	const queryString = useMemo((): string => {
		const params: SearchMembersParams = {
			page: searchParams.get('page') || '1',
			query: searchParams.get('query') ?? undefined,
			orderBy: searchParams.get('orderBy') ?? MEMBER_ORDER_BY,
			order: searchParams.get('order') ?? ORDER,
			take: ROWS_PER_PAGE.toString()
		};

		return new URLSearchParams(cleanObject(params)).toString();
	}, [searchParams]);

	return useQuery({
		queryKey: memberKeys.searchMembers(queryString),
		queryFn: async () => {
			const response = await fetch(`${env.VITE_API_URL}/members?${queryString}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await session?.getToken()}`
				}
			});

			return responseHandling<{ members: Member[]; count: number }>(response);
		}
	});
};

export const useAddMembers = () => {
	const { session } = useClerk();
	const queryClient = useQueryClient();
	const { errorSnackbar, successSnackbar } = useSnackbar();
	const { t } = useTranslation();

	return useMutation({
		mutationFn: async (members: AddMember[]) => {
			const response = await fetch(`${env.VITE_API_URL}/members`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await session?.getToken()}`
				},
				body: JSON.stringify(members)
			});

			return responseHandling<Member[]>(response);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: memberKeys.members() });

			successSnackbar(t('snackbar.success'));
		},
		onError: error => {
			errorSnackbar(<ErrorSnackbar message={error.message} />, true);
		}
	});
};

export const useEditMember = () => {
	const { session } = useClerk();
	const queryClient = useQueryClient();
	const { errorSnackbar, successSnackbar } = useSnackbar();
	const { t } = useTranslation();

	return useMutation({
		mutationFn: async ({ id, data }: { id: number; data: EditMember }) => {
			const response = await fetch(`${env.VITE_API_URL}/members/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await session?.getToken()}`
				},
				body: JSON.stringify(data)
			});

			return responseHandling(response);
		},
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: memberKeys.members() });
			queryClient.invalidateQueries({ queryKey: memberKeys.member(id) });

			successSnackbar(t('snackbar.success'));
		},
		onError: error => {
			errorSnackbar(<ErrorSnackbar message={error.message} />, true);
		}
	});
};

export const useDeleteMember = () => {
	const { session } = useClerk();
	const queryClient = useQueryClient();
	const { errorSnackbar, successSnackbar } = useSnackbar();
	const { t } = useTranslation();

	return useMutation({
		mutationFn: async (ids: number[]) => {
			const response = await fetch(`${env.VITE_API_URL}/members`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await session?.getToken()}`
				},
				body: JSON.stringify(ids)
			});

			return responseHandling<{ count: number }>(response);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: memberKeys.members() });

			successSnackbar(t('snackbar.success'));
		},
		onError: error => {
			errorSnackbar(<ErrorSnackbar message={error.message} />, true);
		}
	});
};
