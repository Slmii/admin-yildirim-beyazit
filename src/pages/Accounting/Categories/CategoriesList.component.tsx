import Stack from '@mui/material/Stack';
import { CategoryCard } from './CategoryCard.component';
import { CategoryHeader } from './CategoryHeader.component';
import Paper from '@mui/material/Paper';
import { CategoryAddButton } from './CategoryAdd.component';
import { AccountingCategory, AccountingCategoryType } from '@/lib/types/AccountingCategory';

export const CategoriesList = ({
	header,
	type,
	categories
}: {
	header: string;
	type: AccountingCategoryType;
	categories: AccountingCategory[];
}) => {
	const totalCosts = categories.reduce((acc, category) => acc + Number(category.total), 0);

	return (
		<Paper elevation={0} sx={{ p: 2 }}>
			<Stack gap={2}>
				<CategoryHeader title={header} total={totalCosts} type={type} />
				<Stack gap={0.5} sx={{ height: { xs: 'unset', lg: 'calc(100vh - 500px)' }, overflowY: 'auto' }}>
					{categories.map(category => (
						<CategoryCard key={category.id} category={category} />
					))}
				</Stack>
				<CategoryAddButton type={type} />
			</Stack>
		</Paper>
	);
};
