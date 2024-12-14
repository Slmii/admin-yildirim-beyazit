export interface FormState {
	success: boolean;
	message: string;
	data?: Record<string, unknown>;
	fields?: Record<string, unknown>;
	issues?: string[];
}

export const initialFormState: FormState = {
	success: false,
	message: ''
};
