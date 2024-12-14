import ButtonBase from '@mui/material/ButtonBase';
import { hover } from '@/lib/theme';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { useFormat } from '@/lib/hooks/useFormat';
import { Form } from '@/components/Form/Form.component';
import { categoryFormSchema } from '@/lib/schema/category-form.schema';
import { Field } from '@/components/Form/Field/Field.component';
import { IconButton } from '@/components/IconButton/IconButton.component';
import { AccountingCategory, AccountingCategoryType } from '@/lib/types/AccountingCategory';
import { useTranslation } from 'react-i18next';
import { useEditAccountingCategory } from '@/lib/hooks/useAccounting';

interface AccountingCategoryFormData {
	category: string;
	type: AccountingCategoryType;
}

export const CategoryCard = ({ category }: { category: AccountingCategory }) => {
	const [isEdit, setIsEdit] = useState(false);

	const { toReadableCurrency } = useFormat();
	const { t } = useTranslation();
	const { mutateAsync, isPending } = useEditAccountingCategory();

	const handleOnAction = async (data: AccountingCategoryFormData) => {
		await mutateAsync({ id: category.id, data: { name: data.category } });
		setIsEdit(false);
	};

	return (
		<ButtonBase
			key={category.id}
			onClick={() => !isEdit && alert('Category clicked')}
			component='div'
			disableRipple={!!isEdit}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-start',
				textAlign: 'left',
				py: isEdit ? 1 : '13px',
				px: 2,
				gap: 1,
				borderRadius: 1,
				backgroundColor: 'background.default',
				'&:hover': {
					backgroundColor: hover(),
					color: 'primary.contrastText',
					'& .category-name': {
						textDecoration: 'underline'
					}
				}
			}}
		>
			{isEdit ? (
				<Form<AccountingCategoryFormData>
					onAction={handleOnAction}
					defaultValues={{
						category: category.name,
						type: category.type
					}}
					schema={categoryFormSchema}
					mode='onSubmit'
				>
					<Stack direction='row' alignItems='center' gap={1}>
						<Field fullWidth size='small' name='category' label='Category' autoFocus />
						<IconButton
							isLoading={isPending}
							size='small'
							type='submit'
							icon='check'
							title={t('labels.save')}
						/>
						<IconButton
							disabled={isPending}
							size='small'
							icon='close'
							type='reset'
							onClick={() => setIsEdit(false)}
							title={t('labels.cancel')}
						/>
					</Stack>
				</Form>
			) : (
				<>
					<IconButton
						icon='edit'
						size='small'
						title={t('labels.edit')}
						onClick={e => {
							e.stopPropagation();
							setIsEdit(true);
						}}
					/>
					<Typography variant='body1' noWrap className='category-name' flexGrow={1}>
						{category.name}
					</Typography>
					<Typography variant='body1'>{toReadableCurrency(category.total)}</Typography>
				</>
			)}
		</ButtonBase>
	);
};
