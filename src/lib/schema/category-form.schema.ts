import { AccountingCategoryType } from '@/lib/types/AccountingCategory';
import { z } from 'zod';

export const categoryFormSchema = z.object({
	category: z.string(),
	type: z.enum([AccountingCategoryType.INCOME, AccountingCategoryType.EXPENSE])
});
