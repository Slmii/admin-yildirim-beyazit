import { CSSObject, styled, Theme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { DRAWER_WIDTH } from '@/lib/constants/drawer.constants';

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

export const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
	open?: boolean;
}>(({ theme }) => ({
	flexGrow: 1,
	padding: theme.spacing(4),
	variants: [
		{
			props: ({ open }) => open,
			style: {
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen
				}),
				marginLeft: 0
			}
		}
	]
}));

const openedMixin = (theme: Theme): CSSObject => ({
	width: DRAWER_WIDTH,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`
	}
});

export const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
	justifyContent: 'center',
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme }) => ({
	width: DRAWER_WIDTH,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	variants: [
		{
			props: ({ open }) => open,
			style: {
				...openedMixin(theme),
				'& .MuiDrawer-paper': openedMixin(theme)
			}
		},
		{
			props: ({ open }) => !open,
			style: {
				...closedMixin(theme),
				'& .MuiDrawer-paper': closedMixin(theme)
			}
		}
	]
}));

export const StyledAppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme }) => ({
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	boxShadow: 'none',
	variants: [
		{
			props: ({ open }) => open,
			style: {
				marginLeft: `${DRAWER_WIDTH}px`,
				width: `calc(100% - ${DRAWER_WIDTH}px)`,
				transition: theme.transitions.create(['width', 'margin'], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen
				})
			}
		}
	]
}));
