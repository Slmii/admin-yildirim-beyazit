import { SelectAutocomplete } from '@/components/Form/SelectAutocomplete/SelectAutocomplete.component';
import { useMemo, useState } from 'react';
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
import { useGetAyahPreview, useGetSurahPreview } from '@/lib/hooks/useQuranAyahs';
import { Checkbox } from '@/components/Form/Checkbox/Checkbox';

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
	const { setValue, control } = useFormContext<AddQuranAyahForm>();

	const { surah, completeSurah } = useWatch({ control, name: `ayahs.${index}` }) as {
		ayah: string;
		surah: string;
		completeSurah: boolean;
	};
	const selectedSurah = surahs.find(s => s.number.toString() === surah);
	const ayahs = Array.from({ length: selectedSurah?.numberOfAyahs ?? 0 }, (_, i) => i + 1);

	return (
		<Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>
			<Stack gap={2}>
				<Checkbox
					label={t('labels.completeSurah')}
					name={`ayahs.${index}.completeSurah`}
					onChange={() => setValue(`ayahs.${index}.ayah`, '')}
				/>
				<Stack direction={{ xs: 'column', lg: 'row' }} alignItems='flex-start' gap={3}>
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
						onChange={() => setValue(`ayahs.${index}.ayah`, '')}
					/>
					{!completeSurah && (
						<SelectAutocomplete
							fullWidth
							size='small'
							name={`ayahs.${index}.ayah`}
							options={ayahs.map(ayah => ({ id: ayah.toString(), label: ayah.toString() }))}
							label={t('labels.ayah')}
							disabled={!surah}
						/>
					)}
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
			</Stack>
			<Preview index={index} />
		</Paper>
	);
};

const Preview = ({ index }: { index: number }) => {
	const [surah, ayah, completeSurah] = useWatch<AddQuranAyahForm>({
		name: [`ayahs.${index}.surah`, `ayahs.${index}.ayah`, `ayahs.${index}.completeSurah`]
	}) as [string, string, boolean];

	const [previewLanguage, setPreviewLanguage] = useState<QuranAyahPreviewLanguageEnum>(
		QuranAyahPreviewLanguageEnum.TR
	);

	const { t } = useTranslation();

	const isAyahEnabled = !completeSurah && !!surah && !!ayah;
	const { data: ayahData, isPending: isAyahPending } = useGetAyahPreview(
		{ surah: Number(surah), ayah: Number(ayah), previewLanguage },
		{ enabled: isAyahEnabled }
	);

	const isSurahEnabled = completeSurah && !!surah;
	const { data: surahData, isPending: isSurahPending } = useGetSurahPreview(
		{ surah: Number(surah), previewLanguage },
		{ enabled: isSurahEnabled }
	);

	// Memo for name, ayahs and verse number
	const data = useMemo(() => {
		if (!completeSurah && ayahData) {
			return {
				name: ayahData.surah.englishName,
				text: ayahData.text,
				verse: `${ayahData.surah.number}:${ayah}`
			};
		}

		if (completeSurah && surahData) {
			return {
				name: surahData.englishName,
				text: surahData.ayahs.map(ayah => ayah.text).join(' '),
				verse: surahData.number
			};
		}

		return null;
	}, [surahData, ayahData, completeSurah]);

	if (!completeSurah && (!ayahData || !ayahData.surah)) {
		return null;
	}

	if (completeSurah && !surahData) {
		return null;
	}

	const isPending = (isAyahEnabled ? isAyahPending : false) || (isSurahEnabled ? isSurahPending : false);

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
				<Header>{isPending ? <Skeleton variant='text' width={200} /> : data?.name}</Header>
				<Typography variant='body1'>
					{isPending ? (
						<>
							<Skeleton variant='text' width='100%' />
							<Skeleton variant='text' width='80%' />
						</>
					) : (
						data?.text
					)}
				</Typography>
				<Typography variant='caption' color='textDisabled'>
					{isPending ? <Skeleton variant='text' width={25} /> : <>{data?.verse}</>}
				</Typography>
			</Stack>
		</Stack>
	);
};
