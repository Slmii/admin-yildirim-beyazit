import { ThemeProvider } from '@mui/material/styles';
import theme from '@/lib/theme';
import { SnackbarProvider } from './Snackbar.provider';
import { AuthProvider } from './Auth.provider';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<SnackbarProvider>
						<CssBaseline />
						{children}
					</SnackbarProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</AuthProvider>
	);
};
