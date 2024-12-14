import { nlNL, trTR } from '@clerk/localizations';
import { dark } from '@clerk/themes';
import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { env } from '@/lib/env';
import { useTranslation } from 'react-i18next';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { i18n } = useTranslation();

	return (
		<ClerkProvider
			publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}
			localization={i18n.language === 'nl' ? nlNL : trTR}
			afterSignOutUrl='/sign-in'
			appearance={{
				baseTheme: dark,
				userProfile: {
					variables: {
						colorPrimary: '#ED1B25',
						colorText: '#FFFFFF',
						colorTextSecondary: '#B0BEC5',
						colorBackground: '#121212',
						colorDanger: '#FF5252',
						colorSuccess: '#81C784',
						colorWarning: '#FFB74D'
					}
				},
				variables: {
					colorPrimary: '#ED1B25',
					colorText: '#FFFFFF',
					colorTextSecondary: '#B0BEC5',
					colorBackground: '#121212',
					colorDanger: '#FF5252',
					colorSuccess: '#81C784',
					colorWarning: '#FFB74D',
					fontFamily: '"JetBrains Mono", monospace',
					fontWeight: {
						bold: 700,
						medium: 500,
						normal: 400
					}
				}
			}}
		>
			{children}
		</ClerkProvider>
	);
};
