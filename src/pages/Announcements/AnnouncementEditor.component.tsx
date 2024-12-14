import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Editor } from '@tinymce/tinymce-react';
import { useTranslation } from 'react-i18next';

export const AnnouncementEditor = ({
	value,
	error,
	onChange
}: {
	value: string;
	error?: string;
	onChange: (value: string) => void;
}) => {
	const { i18n } = useTranslation();

	return (
		<FormControl error={!!error} fullWidth sx={{ height: '100%' }}>
			<Box
				sx={{
					borderRadius: 1,
					height: '100%',
					border: !!error ? theme => `1px solid ${theme.palette.error.main}` : undefined
				}}
			>
				<Editor
					apiKey='9maccmakvcpb7anzalvltp8phjo0tbjnnyonbymj5ndidqo9'
					value={value}
					onEditorChange={onChange}
					init={{
						min_height: 400,
						height: '100%',
						skin: 'material-classic',
						icons: 'material',
						language: i18n.language,
						width: '100%',
						menubar: true,
						plugins: ['image', 'code', 'table', 'link', 'media', 'codesample'],
						toolbar:
							'undo redo | formatselect | ' +
							'bold italic backcolor | alignleft aligncenter ' +
							'alignright alignjustify | bullist numlist outdent indent | ' +
							'removeformat | help',
						content_style: 'overflow: auto; box-sizing: border-box;'
					}}
				/>
			</Box>
			{error ? <FormHelperText>{error}</FormHelperText> : null}
		</FormControl>
	);
};
