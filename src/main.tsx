import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Entries } from 'type-fest';
import App from './App.tsx';

declare global {
	interface ObjectConstructor {
		entries<T extends object>(o: T): Entries<T>;
	}
}

import './i18n.js';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
