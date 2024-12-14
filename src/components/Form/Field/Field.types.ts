import { Icon } from '@/lib/icons';
import { SxProps, Theme } from '@mui/material/styles';
import { JSX } from 'react';

export interface FieldProps {
	name: string;
	label?: string;
	type?: string;
	size?: 'small' | 'medium';
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	fullWidth?: boolean;
	readOnly?: boolean;
	onChange?: (value: string) => void;
	startIcon?: Icon;
	endIcon?: Icon;
	autoFocus?: boolean;
	helperText?: string;
	multiline?: boolean;
	multilineRows?: number;
	maxLength?: number;
	sx?: SxProps<Theme>;
	onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export interface UploadFieldProps {
	name: string;
	label: JSX.Element;
	accept?: string;
	multiple?: boolean;
	disabled?: boolean;
	required?: boolean;
	fullWidth?: boolean;
	onChange?: (files: Array<File>) => void;
}

export interface StandaloneFieldProps extends Omit<FieldProps, 'onChange'> {
	value: string;
	error?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}
