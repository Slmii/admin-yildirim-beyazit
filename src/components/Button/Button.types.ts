import { Icon } from '@/lib/icons';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export interface ButtonProps extends MuiButtonProps {
	title?: string;
	loading?: boolean;
	startIcon?: Icon;
	endIcon?: Icon;
	startImage?: string;
	endImage?: string;
}
