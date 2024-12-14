import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Form } from '@/components/Form/Form.component';
import { categoryFormSchema } from '@/lib/schema/category-form.schema';
import { Field } from '@/components/Form/Field/Field.component';
import { IconButton } from '@/components/IconButton/IconButton.component';
import { Button } from '@/components/Button/Button.component';
import { useAddAccountingCategory } from '@/lib/hooks/useAccounting';
import { useTranslation } from 'react-i18next';
import { AccountingCategoryType } from '@/lib/types/AccountingCategory';

interface AccountingCategoryFormData {
	category: string;
	type: AccountingCategoryType;
}

export const CategoryAddButton = ({ type }: { type: AccountingCategoryType }) => {
	const [isAdd, setIsAdd] = useState(false);

	const { t } = useTranslation();
	const { mutateAsync, isPending } = useAddAccountingCategory();

	const handleOnAction = async (data: AccountingCategoryFormData) => {
		await mutateAsync({ name: data.category, type });
		setIsAdd(false);
	};

	if (isAdd) {
		return (
			<Form<AccountingCategoryFormData>
				onAction={handleOnAction}
				defaultValues={{
					category: '',
					type
				}}
				schema={categoryFormSchema}
				mode='onSubmit'
			>
				<Stack direction='row' alignItems='center' gap={1}>
					<Field fullWidth size='small' name='category' label='Category' autoFocus />
					<IconButton isLoading={isPending} type='submit' icon='check' title={t('labels.save')} />
					<IconButton
						disabled={isPending}
						icon='close'
						type='reset'
						onClick={() => setIsAdd(false)}
						title={t('labels.cancel')}
					/>
				</Stack>
			</Form>
		);
	}

	return (
		<Button startIcon='add' variant='outlined' onClick={() => setIsAdd(true)} sx={{ minHeight: 40 }}>
			{t('labels.addCategory')}
		</Button>
	);
};
