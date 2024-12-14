import { Icon } from '@/lib/icons';
import { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

export interface IconButtonProps extends MuiIconButtonProps {
	icon: Icon;
	isLoading?: boolean;
}
