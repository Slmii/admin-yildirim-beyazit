import { Icon } from '@/lib/icons';
import { JSX } from 'react';

export interface SelectAutocompleteProps {
	name: string;
	label?: string;
	options: SelectAutocompleteOption[];
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	fullWidth?: boolean;
	autoFocus?: boolean;
	isLoading?: boolean;
	startIcon?: Icon;
	endIcon?: Icon;
	startElement?: JSX.Element;
	endElement?: JSX.Element;
	size?: 'small' | 'medium';
	onChange?: (value: SelectAutocompleteOption | null) => void;
}

export interface SelectAutocompleteOption {
	id: string;
	label: string;
	groupBy?: string;
	secondaryLabel?: string;
	avatar?: string;
}
