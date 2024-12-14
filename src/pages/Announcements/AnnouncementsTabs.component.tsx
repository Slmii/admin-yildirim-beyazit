import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { FLAG_URL } from '@/lib/constants/shared.constants';
import { TabPanel } from './AccouncementTabPanel.component';
import { useEffect, useState } from 'react';
import { hover } from '@/lib/theme';
import { Form } from '@/components/Form/Form.component';
import Stack from '@mui/material/Stack';
import { PageTitle } from '@/components/Typography/Typography.component';
import { Button } from '@/components/Button/Button.component';
import { announcementFormSchema } from '@/lib/schema/announcement-form.schema';
import { useFormContext } from 'react-hook-form';
import { Language } from '@/lib/types/Language.types';
import { useTranslation } from 'react-i18next';
import { useAddAnnouncements, useGetAnnouncements } from '@/lib/hooks/useAnnouncements';

type KeyOfLanguageMap = keyof typeof Language;
const LANGUAGE_MAP: Record<keyof typeof Language, string> = {
	AR: 'sa',
	TR: 'tr',
	NL: 'nl'
};

export interface AddAnnouncementForm {
	announcements: {
		[Language.TR]: { content: string }[];
		[Language.NL]: { content: string }[];
		[Language.AR]: { content: string }[];
	};
}

export const AnnouncementsTabs = () => {
	const [tabIndex, setTabIndex] = useState(0);

	const { t } = useTranslation();
	const { mutateAsync, isPending } = useAddAnnouncements();
	const { data, isLoading } = useGetAnnouncements();

	const isLoaded = !!data && !isLoading;
	if (!isLoaded) {
		return null;
	}

	const trAnnouncements = data?.[Language.TR] ?? [];
	const nlAnnouncements = data?.[Language.NL] ?? [];
	const arAnnouncements = data?.[Language.AR] ?? [];

	const handleChange = (_e: React.SyntheticEvent, index: number) => {
		setTabIndex(index);
	};

	const handleOnAction = async (data: AddAnnouncementForm) => {
		const announcements = Object.entries(data.announcements)
			.map(([language, announcements]) =>
				announcements.map(announcement => {
					let annLanguage = Language.NL;
					if (language === Language.TR) {
						annLanguage = Language.TR;
					} else if (language === Language.AR) {
						annLanguage = Language.AR;
					}

					return { content: announcement.content, language: annLanguage };
				})
			)
			.flat();

		// Convert to NL, TR, AR language
		await mutateAsync(announcements);
	};

	return (
		<Form<AddAnnouncementForm>
			onAction={handleOnAction}
			defaultValues={{
				announcements: {
					[Language.TR]: trAnnouncements.map(a => ({ content: a.content })),
					[Language.NL]: nlAnnouncements.map(a => ({ content: a.content })),
					[Language.AR]: arAnnouncements.map(a => ({ content: a.content }))
				}
			}}
			schema={announcementFormSchema}
		>
			<ErrorHandler
				onError={language => {
					if (language === Language.TR) {
						setTabIndex(0);
					} else if (language === Language.NL) {
						setTabIndex(1);
					} else {
						setTabIndex(2);
					}
				}}
			/>
			<Stack direction='row' alignItems='center' justifyContent='space-between' gap={2}>
				<PageTitle>{t('drawer.announcements')}</PageTitle>
				<Button loading={isPending} type='submit' startIcon='save' color='secondary'>
					{t('labels.save')}
				</Button>
			</Stack>
			<Box sx={{ flexGrow: 1, borderRadius: 1, bgcolor: 'background.paper', display: 'flex' }}>
				<Tabs
					orientation='vertical'
					value={tabIndex}
					onChange={handleChange}
					aria-label='Accouncement tabs'
					sx={{ borderRight: 1, borderColor: 'divider' }}
				>
					{Object.keys(Language).map((language, index) => (
						<Tab
							key={language}
							sx={{
								height: 54,
								'&.Mui-selected': {
									color: 'primary.contrastText',
									backgroundColor: hover()
								}
							}}
							label={
								<Box
									component='img'
									src={`${FLAG_URL}/${LANGUAGE_MAP[language as KeyOfLanguageMap].toLowerCase()}.png`}
									alt={language}
									width={30}
									height={30}
									sx={{ borderRadius: '50%' }}
								/>
							}
							{...a11yProps('announcement', index + 1)}
						/>
					))}
				</Tabs>
				<TabPanel value={tabIndex} index={0} language={Language.TR} />
				<TabPanel value={tabIndex} index={1} language={Language.NL} />
				<TabPanel value={tabIndex} index={2} language={Language.AR} />
			</Box>
		</Form>
	);
};

const ErrorHandler = ({ onError }: { onError: (language: Language) => void }) => {
	const {
		formState: { errors }
	} = useFormContext<AddAnnouncementForm>();

	useEffect(() => {
		const errorLanguage = Object.keys(errors.announcements ?? {})[0];
		if (errorLanguage) {
			onError(errorLanguage as Language);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errors.announcements]);

	return null;
};

export function a11yProps(name: string, index: number) {
	return {
		id: `${name}-tab-${index}`,
		'aria-controls': `${name}-tabpanel-${index}`
	};
}
