import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Icon } from '@/components/Icon/Icon.component';
import { IconButton } from '@/components/IconButton/IconButton.component';
import Box from '@mui/material/Box';
import { hover } from '@/lib/theme';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Language } from '@/lib/types/Language.types';
import { a11yProps, AddAnnouncementForm } from './AnnouncementsTabs.component';
import { AnnouncementEditor } from './AnnouncementEditor.component';
import { useTranslation } from 'react-i18next';

interface TabPanelProps {
	index: number;
	value: number;
}

export const TabPanel = ({ value, index, language, ...rest }: TabPanelProps & { language: Language }) => {
	const [tabIndex, setTabIndex] = useState(0);

	const { fields, append, remove } = useFieldArray<AddAnnouncementForm>({ name: `announcements.${language}` });
	const { t } = useTranslation();

	const handleChange = (_e: React.SyntheticEvent, index: number) => {
		// Ignore the last tab
		if (index === fields.length) {
			return;
		}

		setTabIndex(index);
	};

	return (
		<Box
			role='tabpanel'
			hidden={value !== index}
			id={`announcement-tabpanel-${index}`}
			aria-labelledby={`announcement-tab-${index}`}
			{...rest}
			width='100%'
		>
			{value === index && (
				<Stack direction='row' flexGrow={1} height='calc(100vh - 234px)'>
					<Tabs
						orientation='vertical'
						variant='scrollable'
						value={tabIndex}
						onChange={handleChange}
						aria-label='Accouncement slide tabs'
						sx={{ borderRight: 1, borderColor: 'divider' }}
					>
						{fields.map((field, index) => {
							const announcementIndex = index + 1;

							return (
								<Tab
									key={field.id}
									sx={{
										height: 54,
										'&.Mui-selected': {
											color: 'primary.contrastText',
											backgroundColor: hover()
										}
									}}
									label={
										<Stack
											direction='row'
											alignItems='center'
											justifyContent='space-between'
											gap={2}
											width='100%'
										>
											<Typography textTransform='initial'>
												{t('labels.slide')} {announcementIndex}
											</Typography>
											<IconButton
												component='div'
												icon='delete'
												color='error'
												sx={{ p: 0 }}
												size='small'
												onClick={e => {
													e.stopPropagation();
													if (tabIndex === index) {
														setTabIndex(0);
													}

													remove(index);
												}}
											/>
										</Stack>
									}
									{...a11yProps('announcement-slide', announcementIndex)}
								/>
							);
						})}
						<Tab
							label={<Icon icon='add' />}
							{...a11yProps('announcement-slide', fields.length + 1)}
							onClick={() => append({ content: '' })}
						/>
					</Tabs>
					{fields.map((field, index) => (
						<NestedTabPanel
							key={field.id}
							value={tabIndex}
							index={index}
							language={language}
							onError={index => setTabIndex(index)}
						/>
					))}
				</Stack>
			)}
		</Box>
	);
};

const NestedTabPanel = ({
	value,
	index,
	language,
	onError
}: {
	index: number;
	value: number;
	language: Language;
	onError: (index: number) => void;
}) => {
	const {
		formState: { errors }
	} = useFormContext<AddAnnouncementForm>();

	useEffect(() => {
		const errorIndex = Object.keys(errors.announcements?.[language] ?? {})[0];
		if (errorIndex) {
			onError(Number(errorIndex));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errors.announcements]);

	return (
		<Box
			role='tabpanel'
			hidden={value !== index}
			id={`announcement-slide-tabpanel-${index}`}
			aria-labelledby={`announcement-slide-tab-${index}`}
			sx={{
				p: 2,
				flexGrow: 1,
				overflow: 'auto',
				maxHeight: '100%'
			}}
		>
			{value === index && (
				<Controller
					name={`announcements.${language}.${index}.content`}
					rules={{
						required: true
					}}
					render={({ field, fieldState }) => (
						<AnnouncementEditor
							value={field.value}
							onChange={content => field.onChange(content)}
							error={fieldState.error?.message}
						/>
					)}
				/>
			)}
		</Box>
	);
};
