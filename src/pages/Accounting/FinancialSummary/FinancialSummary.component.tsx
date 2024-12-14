import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { FinancialBalanceLastYear, FinancialDifference, FinancialTotalAmount } from './FinancialSummaryCard.component';

export const FinancialSummary = ({ totalIncome, totalExpenses }: { totalIncome: number; totalExpenses: number }) => {
	const difference = totalIncome - totalExpenses;
	const balance = totalIncome + 12544 - totalExpenses;

	return (
		<Paper elevation={0} sx={{ p: 2 }}>
			<Grid container spacing={3}>
				<Grid size={4}>
					<FinancialDifference amount={difference} />
				</Grid>
				<Grid size={4}>
					<FinancialBalanceLastYear amount={12544} />
				</Grid>
				<Grid size={4}>
					<FinancialTotalAmount amount={balance} />
				</Grid>
			</Grid>
		</Paper>
	);
};
