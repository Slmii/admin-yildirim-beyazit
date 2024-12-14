import MuiButton from '@mui/material/Button';
import { ButtonProps } from './Button.types';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import { Icon } from '@/components/Icon/Icon.component';
import Box from '@mui/material/Box';
import { NavLink, NavLinkProps } from 'react-router';

export const Button = ({
	title,
	startIcon,
	endIcon,
	startImage,
	endImage,
	loading,
	children,
	...props
}: ButtonProps) => {
	const button = (
		<MuiButton
			{...props}
			disabled={props.disabled || loading}
			startIcon={
				!loading ? (
					startIcon ? (
						<Icon icon={startIcon} />
					) : startImage ? (
						<Box
							component='img'
							sx={{ borderRadius: '50%' }}
							src={startImage}
							alt=''
							height={20}
							width={20}
						/>
					) : undefined
				) : undefined
			}
			endIcon={
				endIcon ? (
					endIcon
				) : endImage ? (
					<Box component='img' sx={{ borderRadius: '50%' }} src={endImage} alt='' height={20} width={20} />
				) : undefined
			}
			sx={{
				...props.sx,
				...(!children && {
					'& .MuiButton-startIcon': { mr: 0 },
					'& .MuiButton-endIcon': { ml: 0 }
				})
			}}
		>
			{loading ? (
				<CircularProgress
					color='inherit'
					size={20}
					sx={{
						mr: 1
					}}
				/>
			) : null}
			{children}
		</MuiButton>
	);

	return (
		<>
			{title ? <Tooltip title={title}>{props.disabled ? <span>{button}</span> : button}</Tooltip> : <>{button}</>}
		</>
	);
};

export const LinkButton = (props: ButtonProps & NavLinkProps) => {
	return (
		<Button {...props} component={NavLink}>
			{props.children}
		</Button>
	);
};
