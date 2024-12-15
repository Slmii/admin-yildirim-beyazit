import { AppBar } from '@/components/AppBar/AppBar.component';
import { RequiredAuth } from '@/components/RequiredAuth.component';
import { Providers } from '@/lib/providers/Providers';
import { AccountingCategoriesList } from '@/pages/Accounting/AccountingCategoriesList.component';
import { AnnouncementsTabs } from '@/pages/Announcements/AnnouncementsTabs.component';
import { MemberForm } from '@/pages/Members/MemberForm.component';
import { MembersList } from '@/pages/Members/MembersList.component';
import { QuranArayhsList } from '@/pages/QuranAyahs/QuranAyahsList.component';
import { SignInPage } from '@/pages/SignIn.page';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';

function App() {
	const { i18n } = useTranslation();

	useEffect(() => {
		// Set HTML language
		document.documentElement.lang = i18n.language;
	}, [i18n.language]);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={
						<Providers>
							<Outlet />
						</Providers>
					}
				>
					<Route path='/' element={<Navigate to='/members' replace />} />
					<Route
						element={
							<RequiredAuth>
								<AppBar>
									<Outlet />
								</AppBar>
							</RequiredAuth>
						}
					>
						<Route path='members' element={<MembersList />} />
						<Route path='members/:action/:id?' element={<MemberForm />} />
						<Route path='accounting' element={<AccountingCategoriesList />} />
						<Route path='quran-ayahs' element={<QuranArayhsList />} />
						<Route path='announcements' element={<AnnouncementsTabs />} />
					</Route>
					<Route path='sign-in' element={<SignInPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
