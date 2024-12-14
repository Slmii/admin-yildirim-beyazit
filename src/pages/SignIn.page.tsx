import { SignIn as SignInClerk } from '@clerk/clerk-react';
import Paper from '@mui/material/Paper';

export const SignInPage = () => {
	return (
		<Paper
			elevation={0}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				borderRadius: 0
			}}
		>
			<SignInClerk />
		</Paper>
	);
};
