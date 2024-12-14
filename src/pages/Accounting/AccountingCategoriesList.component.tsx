import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { CategoriesList } from './Categories';
import { FinancialSummary } from './FinancialSummary';
import { PageTitle } from '@/components/Typography/Typography.component';
import { useTranslation } from 'react-i18next';
import { AccountingCategoryType } from '@/lib/types/AccountingCategory';
import { useGetAccountingCategories } from '@/lib/hooks/useAccounting';

export const AccountingCategoriesList = () => {
	const { t } = useTranslation();
	const { data } = useGetAccountingCategories();

	const incomes = data?.incomes ?? [];
	const totalIncomes = data?.totalIncomes ?? 0;
	const expenses = data?.expenses ?? [];
	const totalExpenses = data?.totalExpenses ?? 0;

	return (
		<Stack gap={2} height='100%'>
			<PageTitle>{t('drawer.accounting')}</PageTitle>
			<FinancialSummary totalIncome={totalIncomes} totalExpenses={totalExpenses} />
			<Grid container spacing={3}>
				<Grid size={{ xs: 12, lg: 6 }}>
					<CategoriesList
						type={AccountingCategoryType.INCOME}
						header={t('labels.incomes')}
						categories={incomes}
					/>
				</Grid>
				<Grid size={{ xs: 12, lg: 6 }}>
					<CategoriesList
						type={AccountingCategoryType.EXPENSE}
						header={t('labels.expenses')}
						categories={expenses}
					/>
				</Grid>
			</Grid>
		</Stack>
	);
};
