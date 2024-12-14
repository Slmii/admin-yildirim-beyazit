import { useUser } from '@clerk/clerk-react';
import { ReactNode } from 'react';
import { Navigate } from 'react-router';

export const RequiredAuth = ({ children }: { children: ReactNode }) => {
	const { user, isLoaded } = useUser();

	if (!isLoaded) {
		return null;
	}

	if (!user) {
		return <Navigate to='/sign-in' replace />;
	}

	return <>{children}</>;
};
