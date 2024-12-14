import { SelectChangeEvent } from '@mui/material/Select';

export interface SelectProps {
	options: Option[];
	name: string;
	label?: string;
	fullWidth?: boolean;
	onChange?: (value: string) => void;
	required?: boolean;
	disabled?: boolean;
	helperText?: string;
}

export interface Option {
	id: string | number;
	label: string;
	disabled?: boolean;
}

export interface StandaloneSelectProps extends Omit<SelectProps, 'onChange'> {
	value: string;
	error?: string;
	onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
}
