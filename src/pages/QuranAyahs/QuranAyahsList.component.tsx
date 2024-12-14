import Stack from '@mui/material/Stack';
import { useFieldArray } from 'react-hook-form';
import { Form } from '@/components/Form/Form.component';
import { Button } from '@/components/Button/Button.component';
import { PageTitle } from '@/components/Typography/Typography.component';
import { QuranAyahCard } from './QuranAyahCard.component';
import { ayahFormSchema } from '@/lib/schema/ayah-form.schema';
import { useTranslation } from 'react-i18next';
import { quranAyahKeys, useAddQuranAyahs, useGetQuranAyahs, useGetSurahs } from '@/lib/hooks/useQuranAyahs';
import { useIsMutating } from '@tanstack/react-query';

export interface AddQuranAyahForm {
	ayahs: { ayah: string; surah: string }[];
}

export const QuranArayhsList = () => {
	const { data, isLoading } = useGetQuranAyahs();
	const { mutateAsync } = useAddQuranAyahs();

	const handleOnAction = async (data: AddQuranAyahForm) => {
		await mutateAsync(data.ayahs.map(ayah => ({ ayah: Number(ayah.ayah), surah: Number(ayah.surah) })));
	};

	const isLoaded = !!data && !isLoading;
	if (!isLoaded) {
		return null;
	}

	return (
		<Form<AddQuranAyahForm>
			onAction={handleOnAction}
			defaultValues={{
				ayahs: data?.length
					? data.map(quranAyah => ({ ayah: quranAyah.ayah.toString(), surah: quranAyah.surah.toString() }))
					: [{ ayah: '', surah: '' }]
			}}
			schema={ayahFormSchema}
		>
			<Surahs />
		</Form>
	);
};

const Surahs = () => {
	const { t } = useTranslation();

	const isMutatingQuranAyahs = useIsMutating({ mutationKey: quranAyahKeys.add() });
	const { data } = useGetSurahs();
	const surahs = data ?? [];

	const { fields, append, remove } = useFieldArray<AddQuranAyahForm>({ name: 'ayahs' });

	return (
		<>
			<Stack direction='row' alignItems='center' gap={2}>
				<PageTitle>{t('drawer.ayahs')}</PageTitle>
				<Button
					startIcon='add'
					color='secondary'
					sx={{ ml: 'auto' }}
					onClick={() => append({ ayah: '', surah: '' })}
					disabled={!!isMutatingQuranAyahs}
				>
					{t('labels.addAyah')}
				</Button>
				<Button loading={!!isMutatingQuranAyahs} type='submit' startIcon='save' color='secondary'>
					{t('labels.save')}
				</Button>
			</Stack>
			{fields.map((field, index) => (
				<QuranAyahCard
					key={field.id}
					index={index}
					surahs={surahs}
					isPending={!!isMutatingQuranAyahs}
					onRemove={() => {
						remove(index);

						if (fields.length === 1) {
							append({ ayah: '', surah: '' });
						}
					}}
				/>
			))}
		</>
	);
};
