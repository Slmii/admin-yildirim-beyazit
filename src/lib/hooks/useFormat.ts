import { useTranslation } from 'react-i18next';

export const useFormat = () => {
	const { i18n } = useTranslation();

	const locale = `${i18n.language}-${i18n.language.toUpperCase()}`;
	console.log(i18n.language);

	const toReadableCurrency = (value: string | number) => {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: 'EUR'
		}).format(Number(value));
	};

	const toReadableDate = (value: string | Date) => {
		return new Intl.DateTimeFormat(locale, {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		}).format(new Date(value));
	};

	return {
		toReadableCurrency,
		toReadableDate
	};
};
