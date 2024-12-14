import Tooltip from '@mui/material/Tooltip';
import { IconProps } from './Icon.types';
import { icons } from '@/lib/icons';

export const Icon = ({ spacingLeft, spacingRight, icon, tooltip, ...props }: IconProps) => {
	const IconComponent = icons[icon as keyof typeof icons];

	return (
		<Tooltip title={tooltip}>
			<IconComponent
				{...props}
				sx={{
					...props.sx,
					ml: spacingLeft ? 0.5 : 0,
					mr: spacingRight ? 0.5 : 0
				}}
			/>
		</Tooltip>
	);
};
