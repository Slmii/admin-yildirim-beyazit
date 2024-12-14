import { Header } from '@/components/Typography/Typography.component';
import { useFormat } from '@/lib/hooks/useFormat';
import { AccountingCategoryType } from '@/lib/types/AccountingCategory';
import Stack from '@mui/material/Stack';

export const CategoryHeader = ({
	title,
	total,
	type
}: {
	title: string;
	total: number;
	type: AccountingCategoryType;
}) => {
	const { toReadableCurrency } = useFormat();
	const isIncome = type === AccountingCategoryType.INCOME;

	return (
		<Stack direction='row' alignItems='center' justifyContent='space-between' gap={1}>
			<Header>{title}</Header>
			<Header color={isIncome ? 'success.main' : 'error.main'}>
				{isIncome ? '+' : '-'} {toReadableCurrency(total)}
			</Header>
		</Stack>
	);
};
