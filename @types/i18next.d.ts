import nl from '../public/locales/nl/translation.json';
import tr from '../public/locales/tr/translation.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'nl';
		resources: {
			nl: typeof nl;
			tr: typeof tr;
		};
	}
}
