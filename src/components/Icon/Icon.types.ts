import { Icon } from '@/lib/icons';
import { SvgIconProps } from '@mui/material/SvgIcon';

export interface IconProps extends SvgIconProps {
	icon: Icon;
	spacingLeft?: boolean;
	spacingRight?: boolean;
	tooltip?: string;
}
