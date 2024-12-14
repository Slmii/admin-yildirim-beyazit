import { SelectAutocomplete } from '@/components/Form/SelectAutocomplete/SelectAutocomplete.component';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { Button } from '@/components/Button/Button.component';
import { Header } from '@/components/Typography/Typography.component';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { FLAG_URL } from '@/lib/constants/shared.constants';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import { ApiSurah, QuranAyahPreviewLanguageEnum } from '@/lib/types/Ayah.types';
import { AddQuranAyahForm } from './QuranAyahsList.component';
import { useGetAyahPreview } from '@/lib/hooks/useQuranAyahs';

export const QuranAyahCard = ({
	index,
	surahs,
	isPending,
	onRemove
}: {
	index: number;
	surahs: ApiSurah[];
	isPending: boolean;
	onRemove: () => void;
}) => {
	const { t } = useTranslation();
	const { resetField, control } = useFormContext<AddQuranAyahForm>();

	const surah = useWatch({ control, name: `ayahs.${index}.surah` }) as string;
	const selectedSurah = surahs.find(s => s.number.toString() === surah);
	const ayahs = Array.from({ length: selectedSurah?.numberOfAyahs ?? 0 }, (_, i) => i + 1);

	return (
		<Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>
			<Stack direction={{ xs: 'column', lg: 'row' }} alignItems='center' gap={3}>
				<SelectAutocomplete
					fullWidth
					size='small'
					name={`ayahs.${index}.surah`}
					options={surahs.map(surah => ({
						id: surah.number.toString(),
						label: `${surah.number}: ${surah.englishName}`,
						secondaryLabel: surah.name
					}))}
					label={t('labels.surah')}
					onChange={() => resetField(`ayahs.${index}.ayah`)}
				/>
				<SelectAutocomplete
					fullWidth
					size='small'
					name={`ayahs.${index}.ayah`}
					options={ayahs.map(ayah => ({ id: ayah.toString(), label: ayah.toString() }))}
					label={t('labels.ayah')}
					disabled={!surah}
				/>
				<Button
					startIcon='delete'
					color='error'
					onClick={onRemove}
					sx={{ height: 40, minWidth: { xs: '100%', lg: 'fit-content' } }}
					disabled={isPending}
				>
					{t('labels.delete')}
				</Button>
			</Stack>
			<Preview index={index} />
		</Paper>
	);
};

const Preview = ({ index }: { index: number }) => {
	const [surah, ayah] = useWatch<AddQuranAyahForm>({ name: [`ayahs.${index}.surah`, `ayahs.${index}.ayah`] }) as [
		string,
		string
	];
	const [previewLanguage, setPreviewLanguage] = useState<QuranAyahPreviewLanguageEnum>(
		QuranAyahPreviewLanguageEnum.TR
	);

	const { t } = useTranslation();
	const { data, isPending } = useGetAyahPreview(
		{ surah: Number(surah), ayah: Number(ayah), previewLanguage },
		{ enabled: !!surah && !!ayah }
	);

	if (!data || !data.surah) {
		return null;
	}

	return (
		<Stack gap={2}>
			<Stack direction='row' gap={2} alignItems='center'>
				<Typography variant='body1'>{t('labels.preview')}:</Typography>
				<Button
					color='secondary'
					onClick={() => setPreviewLanguage(QuranAyahPreviewLanguageEnum.TR)}
					startImage={`${FLAG_URL}/tr.png`}
				>
					{t('labels.turkish')}
				</Button>
				<Button
					color='secondary'
					onClick={() => setPreviewLanguage(QuranAyahPreviewLanguageEnum.NL)}
					startImage={`${FLAG_URL}/nl.png`}
				>
					{t('labels.dutch')}
				</Button>
				<Button
					color='secondary'
					onClick={() => setPreviewLanguage(QuranAyahPreviewLanguageEnum.AR)}
					startImage={`${FLAG_URL}/sa.png`}
				>
					{t('labels.arabic')}
				</Button>
			</Stack>
			<Divider />
			<Stack gap={1}>
				<Header>{isPending ? <Skeleton variant='text' width={200} /> : data.surah?.englishName}</Header>
				<Typography variant='body1'>
					{isPending ? (
						<>
							<Skeleton variant='text' width='100%' />
							<Skeleton variant='text' width='80%' />
						</>
					) : (
						data.text
					)}
				</Typography>
				<Typography variant='caption' color='textDisabled'>
					{isPending ? (
						<Skeleton variant='text' width={25} />
					) : (
						<>
							{data.surah.number}:{ayah}
						</>
					)}
				</Typography>
			</Stack>
		</Stack>
	);
};
