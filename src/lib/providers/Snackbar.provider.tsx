import { IconButton } from '@/components/IconButton/IconButton.component';
import {
	SnackbarProvider as NotistackProvider,
	SnackbarKey,
	useSnackbar as useNotistackSnackbar,
	closeSnackbar,
	SnackbarMessage
} from 'notistack';
import { ReactNode } from 'react';

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
	return (
		<NotistackProvider
			maxSnack={3}
			action={id => <IconButton icon='close' size='small' onClick={() => closeSnackbar(id)} />}
		>
			{children}
		</NotistackProvider>
	);
};

export const useSnackbar = () => {
	const { enqueueSnackbar, closeSnackbar } = useNotistackSnackbar();

	return {
		errorSnackbar: (message: SnackbarMessage, persist = false) =>
			enqueueSnackbar(message, { variant: 'error', persist }),
		successSnackbar: (message: SnackbarMessage, persist = false) =>
			enqueueSnackbar(message, { variant: 'success', persist }),
		infoSnackbar: (message: SnackbarMessage, persist = false) =>
			enqueueSnackbar(message, { variant: 'info', persist }),
		/**
		 * Close snackbar. If no key is provided, all snackbars will be closed.
		 */
		closeSnackbar: (key?: SnackbarKey) => closeSnackbar(key)
	};
};
