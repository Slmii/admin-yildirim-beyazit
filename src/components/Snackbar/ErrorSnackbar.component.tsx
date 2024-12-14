import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const ErrorSnackbar = ({ message, issues }: { message: string; issues?: string[] }) => {
	return (
		<Stack>
			<Typography variant='subtitle2'>{message}</Typography>
			{issues?.map(issue => (
				<Typography key={issue} variant='caption'>
					{issue}
				</Typography>
			))}
		</Stack>
	);
};
