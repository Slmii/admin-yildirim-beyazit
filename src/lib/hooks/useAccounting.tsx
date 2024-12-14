import { ErrorSnackbar } from '@/components/Snackbar/ErrorSnackbar.component';
import { env } from '@/lib/env';
import { useSnackbar } from '@/lib/providers/Snackbar.provider';
import { AccountingCategory, AddAccountingCategory, EditAccountingCategory } from '@/lib/types/AccountingCategory';
import { responseHandling } from '@/lib/utils/fetch-response-handling';
import { useClerk } from '@clerk/clerk-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const accountingKeys = {
	categories: () => ['categories']
};

export const useGetAccountingCategories = () => {
	const { session } = useClerk();

	return useQuery({
		queryKey: accountingKeys.categories(),
		enabled: !!session,
		queryFn: async () => {
			const response = await fetch(`${env.VITE_API_URL}/accounting`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await session?.getToken()}`
				}
			});

			return responseHandling<{
				incomes: AccountingCategory[];
				expenses: AccountingCategory[];
				totalIncomes: number;
				totalExpenses: number;
			}>(response);
		}
	});
};

export const useEditAccountingCategory = () => {
	const { session } = useClerk();
	const queryClient = useQueryClient();
	const { errorSnackbar, successSnackbar } = useSnackbar();
	const { t } = useTranslation();

	return useMutation({
		mutationFn: async ({ id, data }: { id: number; data: EditAccountingCategory }) => {
			const response = await fetch(`${env.VITE_API_URL}/accounting/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await session?.getToken()}`
				},
				body: JSON.stringify(data)
			});

			return responseHandling(response);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: accountingKeys.categories() });

			successSnackbar(t('snackbar.success'));
		},
		onError: error => {
			errorSnackbar(<ErrorSnackbar message={error.message} />, true);
		}
	});
};

export const useAddAccountingCategory = () => {
	const { session } = useClerk();
	const queryClient = useQueryClient();
	const { errorSnackbar, successSnackbar } = useSnackbar();
	const { t } = useTranslation();

	return useMutation({
		mutationFn: async (data: AddAccountingCategory) => {
			const response = await fetch(`${env.VITE_API_URL}/accounting`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await session?.getToken()}`
				},
				body: JSON.stringify(data)
			});

			return responseHandling<AccountingCategory>(response);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: accountingKeys.categories() });

			successSnackbar(t('snackbar.success'));
		},
		onError: error => {
			errorSnackbar(<ErrorSnackbar message={error.message} />, true);
		}
	});
};
