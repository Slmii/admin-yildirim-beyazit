import Stack from '@mui/material/Stack';
import { Form } from '@/components/Form/Form.component';
import { memberFormSchema } from '@/lib/schema/member-form.schema';
import { PageTitle } from '@/components/Typography/Typography.component';
import { Field, IBANInput, TelField } from '@/components/Form/Field/Field.component';
import { Button } from '@/components/Button/Button.component';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { useAddMembers, useEditMember, useGetMember } from '@/lib/hooks/useMembers';
import { MemberFormLoading } from './MemberFormLoading.component';
import Decimal from 'decimal.js';

interface MemberFormData {
	name: string;
	address: string;
	zip: string;
	city: string;
	email: string;
	phone: string;
	bank: string;
	amount: number;
}

export const MemberForm = () => {
	const { action, id } = useParams();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { data: member, isLoading: isMemberLoading } = useGetMember(Number(id ?? 0), { enabled: !!id });
	const { mutateAsync: editMember, isPending: isEditMemberPending } = useEditMember();
	const { mutateAsync: addMembers, isPending: isAddMembersPending } = useAddMembers();

	if (isMemberLoading) {
		return <MemberFormLoading />;
	}

	const handleOnAction = async (data: MemberFormData) => {
		if (!!id) {
			await editMember({
				data: {
					...data,
					amount: new Decimal(data.amount)
				},
				id: Number(id)
			});
		} else {
			await addMembers([{ ...data, amount: new Decimal(data.amount) }]);
		}

		navigate(-1);
	};

	const isEdit = action === 'edit';

	return (
		<Form<MemberFormData>
			onAction={handleOnAction}
			defaultValues={{
				name: member?.name ?? '',
				address: member?.address ?? '',
				zip: member?.zip ?? '',
				city: member?.city ?? '',
				email: member?.email ?? '',
				phone: member?.phone ?? '',
				bank: member?.bank ?? '',
				amount: member?.amount ?? 0
			}}
			schema={memberFormSchema}
		>
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<PageTitle>{isEdit ? t('labels.edit') : t('labels.add')}</PageTitle>
				<Stack direction='row' gap={1} alignItems='center'>
					<Button
						disabled={isEditMemberPending || isAddMembersPending}
						color='secondary'
						variant='outlined'
						onClick={() => navigate(-1)}
						type='reset'
					>
						{t('labels.cancel')}
					</Button>
					<Button
						loading={isEditMemberPending || isAddMembersPending}
						variant='contained'
						color='secondary'
						type='submit'
						startIcon='save'
					>
						{t('labels.save')}
					</Button>
				</Stack>
			</Stack>
			<Field required name='name' label={t('labels.name')} />
			<Field required fullWidth name='address' label={t('labels.address')} />
			<Field required fullWidth name='zip' label={t('labels.zip')} />
			<Field required fullWidth name='city' label={t('labels.city')} />
			<Field required name='email' label={t('labels.email')} />
			<TelField name='phone' label={t('labels.phone')} />
			<IBANInput required fullWidth name='bank' label='IBAN' placeholder='NL00 BANK 0000 0000 00' />
			<Field
				required
				startIcon='euro'
				type='number'
				name='amount'
				label={t('labels.subscriptionAmount')}
				placeholder='0.00'
			/>
		</Form>
	);
};
