import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useFormat } from '@/lib/hooks/useFormat';
import { Header } from '@/components/Typography/Typography.component';

export const FinancialDifference = ({ amount }: { amount: number }) => {
	const { toReadableCurrency } = useFormat();

	const isPositive = amount > 0;
	const color = isPositive ? 'success.dark' : 'error.dark';

	return (
		<Stack p={2} borderRadius={1} bgcolor={isPositive ? '#ECFDF5' : '#FFF0F2'}>
			<Typography variant='body2' color={color} noWrap>
				Difference Income & Expenses
			</Typography>
			<Header color={color}>{toReadableCurrency(amount)}</Header>
		</Stack>
	);
};

export const FinancialBalanceLastYear = ({ amount }: { amount: number }) => {
	const { toReadableCurrency } = useFormat();

	const isPositive = amount > 0;
	const color = isPositive ? 'success.dark' : 'error.dark';

	return (
		<Stack p={2} borderRadius={1} bgcolor={isPositive ? '#ECFDF5' : '#FFF0F2'}>
			<Typography variant='body2' color={color} noWrap>
				Balance Last Year
			</Typography>
			<Header color={color}>{toReadableCurrency(amount)}</Header>
		</Stack>
	);
};

export const FinancialTotalAmount = ({ amount }: { amount: number }) => {
	const { toReadableCurrency } = useFormat();

	const isPositive = amount > 0;
	const color = isPositive ? 'success.dark' : 'error.dark';

	return (
		<Stack p={2} borderRadius={1} bgcolor={isPositive ? '#ECFDF5' : '#FFF0F2'}>
			<Typography variant='body2' color={color} noWrap>
				Balance This Year
			</Typography>
			<Header color={color}>{toReadableCurrency(amount)}</Header>
		</Stack>
	);
};
