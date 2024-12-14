import MuiIconButton from '@mui/material/IconButton';
import { IconButtonProps } from './IconButton.types';
import { forwardRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import { Icon } from '@/components/Icon/Icon.component';

const AdjustedIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ icon, isLoading, color = 'default', disabled, ...props }, ref) => {
		// Rendering a div instead of a button when disabled to enable Tooltip appearance
		const adjustedButtonProps = {
			component: disabled ? 'div' : undefined,
			onClick: disabled ? undefined : props.onClick
		};

		return (
			<MuiIconButton {...adjustedButtonProps} color={color} disabled={disabled || isLoading} ref={ref} {...props}>
				{isLoading ? (
					<CircularProgress size={20} color='inherit' />
				) : (
					<Icon icon={icon} fontSize={props.size} />
				)}
			</MuiIconButton>
		);
	}
);

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ icon, title, isLoading, ...props }, ref) => {
		if (!title) {
			return <AdjustedIconButton ref={ref} {...props} icon={icon} isLoading={isLoading} />;
		}

		return (
			<Tooltip title={title}>
				<MuiIconButton
					onClick={e => !props.disabled && props.onClick?.(e)}
					color={props.color}
					disabled={props.disabled || isLoading}
					ref={ref}
					{...props}
				>
					{isLoading ? (
						<CircularProgress size={20} color='inherit' />
					) : (
						<Icon icon={icon} fontSize={props.size} />
					)}
				</MuiIconButton>
			</Tooltip>
		);
	}
);

IconButton.displayName = 'IconButton';
AdjustedIconButton.displayName = 'AdjustedIconButton';
