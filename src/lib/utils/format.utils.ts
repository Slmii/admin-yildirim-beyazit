import { FormState } from '@/lib/types/FormAction.types';
import { SafeParseError } from 'zod';

export const capitalize = (value: string) => {
	return value.charAt(0).toUpperCase() + value.slice(1);
};

export function getZodErrors<T, E extends object>(result: SafeParseError<T>, entries: E): FormState;
export function getZodErrors<T>(result: SafeParseError<T>, entries: { [k: string]: FormDataEntryValue }): FormState {
	const fields: Record<string, unknown> = {};

	// Normalize the entries to ensure type consistency
	Object.entries(entries).forEach(([key, value]) => {
		fields[key] = value;
	});

	return {
		success: false,
		message: 'Form data is invalid',
		fields,
		issues: result.error.issues.map(issue => {
			const fieldName = Array.isArray(issue.path) && issue.path.length > 0 ? issue.path[0] : 'Unknown field';
			return `${capitalize(fieldName as string)}: ${issue.message}`;
		})
	};
}

export const cleanObject = <T extends object>(obj: T): Partial<T> => {
	const cleanedObject: Partial<T> = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const value = obj[key];
			if (value !== undefined && value !== null && value !== '') {
				cleanedObject[key] = value;
			}
		}
	}

	return cleanedObject;
};
