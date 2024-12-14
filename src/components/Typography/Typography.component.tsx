import Typography, { TypographyProps } from '@mui/material/Typography';

export const PageTitle = ({ children, ...props }: TypographyProps) => {
	return (
		<Typography variant='h1' color='text.primary' fontWeight='bold' fontSize={36} {...props}>
			{children}
		</Typography>
	);
};

export const Header = ({ children, ...props }: TypographyProps) => {
	return (
		<Typography variant='h6' color='text.primary' {...props}>
			{children}
		</Typography>
	);
};
