import { z } from 'zod';
import IBAN from 'iban';

const name = z.string().min(2, { message: 'Minimale lengte is 2' });
const address = z.string().min(2, { message: 'Minimale lengte is 2' });
const zip = z.string().regex(/^\d{4}\s?[a-zA-Z]{2}$/, { message: 'Geef een geldige postcode op' });
const city = z.string().min(2, { message: 'Minimale lengte is 2' });
const email = z.string().email({
	message: 'Geef een geldig email adres op'
});
const phone = z.string();
const bank = z.string().refine(value => IBAN.isValid(value), { message: 'Geef een geldig IBAN nummer op' });
const amount = z.coerce.number().min(1, { message: 'Minimale waarde is 1' });

export const memberFormSchema = z.object({
	name,
	address,
	zip,
	city,
	email,
	phone: phone.default(''),
	bank,
	amount
});

export const inlineMemberFormSchema = z.object({
	name: name.optional(),
	address: address.optional(),
	zip: zip.optional(),
	city: city.optional(),
	email: email.optional(),
	phone: phone.optional(),
	bank: bank.optional(),
	amount: amount.optional()
});
