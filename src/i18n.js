import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next) // bind react-i18next to the instance
	// init i18next
	.init({
		lng: 'tr',
		debug: true,
		locales: ['nl', 'tr'],
		backend: {
			loadPath: '/locales/{{lng}}/translation.json'
		},
		interpolation: {
			escapeValue: false // React already escapes values
		}
	});

export default i18n;
