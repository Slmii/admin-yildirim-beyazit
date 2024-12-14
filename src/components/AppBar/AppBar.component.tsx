import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Drawer, DrawerHeader, Main, StyledAppBar } from './AppBarStyled.component';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon/Icon.component';
import { IconButton } from '@/components/IconButton/IconButton.component';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs.component';
import { Icon as IIcon } from '@/lib/icons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { ClerkLoading, RedirectToSignIn, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { useDevice } from '@/lib/hooks/useDevice';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { FLAG_URL } from '@/lib/constants/shared.constants';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

export const AppBar = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();
	const { isMdDown } = useDevice();

	useEffect(() => {
		document.documentElement.style.setProperty('--header-height', '64px');
	}, [location.pathname]);

	useEffect(() => {
		if (isMdDown) {
			setIsOpen(false);
		}
	}, [isMdDown]);

	const drawerMenu: { label: string; href: string; icon: IIcon; active: boolean }[] = [
		{
			label: t('drawer.members'),
			icon: 'users',
			href: `/members`,
			active: location.pathname.includes('members')
		},
		{
			label: t('drawer.accounting'),
			icon: 'invoice',
			href: `/accounting`,
			active: location.pathname.includes('accounting')
		},
		{
			label: t('drawer.ayahs'),
			icon: 'book',
			href: `/quran-ayahs`,
			active: location.pathname.includes('ayahs')
		},
		{
			label: t('drawer.announcements'),
			icon: 'speaker',
			href: `/announcements`,
			active: location.pathname.includes('announcements')
		}
	];

	return (
		<Box sx={{ display: 'flex', minHeight: '100vh' }}>
			<CssBaseline />
			<StyledAppBar position='fixed' open={isOpen}>
				<Toolbar sx={{ marginLeft: !isOpen ? `64px` : 0, justifyContent: 'space-between', height: 64 }}>
					<Breadcrumbs isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
					<Stack direction='row' gap={2} alignItems='center'>
						<ClerkLoading>
							<Skeleton width={28} height={28} variant='circular' />
						</ClerkLoading>
						<SignedIn>
							<UserButton />
						</SignedIn>
						<SignedOut>
							<RedirectToSignIn redirectUrl='/' />
						</SignedOut>
						<LanguageSwitcher />
					</Stack>
				</Toolbar>
			</StyledAppBar>
			<Drawer variant='permanent' open={isOpen}>
				<DrawerHeader>
					<Box
						loading='lazy'
						component='img'
						src='/logo.png'
						alt='Logo'
						width={isOpen ? 75 : 30}
						height={isOpen ? 75 : 30}
						sx={{
							transition: 'width 0.3s, height 0.3s'
						}}
					/>
				</DrawerHeader>
				<Divider />
				<List>
					{drawerMenu.map(item => (
						<Tooltip
							title={isOpen ? undefined : item.label}
							key={item.label}
							placement={isOpen ? undefined : 'right'}
						>
							<ListItem
								disablePadding
								aria-selected={item.active}
								sx={{
									display: 'block',
									px: 2
								}}
							>
								<ListItemButton
									onClick={() => navigate(item.href)}
									selected={item.active}
									sx={{
										justifyContent: !isOpen ? 'center' : 'flex-start',
										py: 0,
										minHeight: 40,
										borderRadius: 2,
										mb: 1
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											justifyContent: 'center',
											mr: isOpen ? 3 : 0,
											transition: 'margin-right 0.3s'
										}}
									>
										<Icon icon={item.icon} fontSize='small' />
									</ListItemIcon>
									{isOpen && <ListItemText primary={item.label} />}
								</ListItemButton>
							</ListItem>
						</Tooltip>
					))}
				</List>
			</Drawer>
			<Main open={isOpen}>
				<DrawerHeader />
				<Paper
					sx={{
						p: 3,
						display: 'flex',
						flexDirection: 'column',
						height: 'calc(100vh - 128px)',
						overflowY: 'auto',
						boxShadow:
							'rgb(145 158 171 / 30%) 0px 0px 2px 0px,rgb(145 158 171 / 12%) 0px 12px 24px -4px!important'
					}}
				>
					{children}
				</Paper>
			</Main>
		</Box>
	);
};

const LanguageSwitcher = () => {
	const { t, i18n } = useTranslation();
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOnLanguageChange = (locale: string) => {
		i18n.changeLanguage(locale);
		handleClose();
	};

	return (
		<>
			<IconButton
				icon='language'
				onClick={handleClick}
				aria-controls={open ? 'language-switcher-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				title={t('labels.language')}
				color='primary'
			/>
			<Menu
				anchorEl={anchorEl}
				id='language-switcher-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={() => handleOnLanguageChange('nl')}>
					<ListItemIcon>
						<Box
							component='img'
							loading='lazy'
							src={`${FLAG_URL}/nl.png`}
							alt='Nederlands'
							width={24}
							height={24}
							sx={{ borderRadius: '50%', border: `1px solid ${theme.palette.divider}` }}
						/>
					</ListItemIcon>
					<ListItemText>Nederlands</ListItemText>
				</MenuItem>
				<MenuItem onClick={() => handleOnLanguageChange('tr')}>
					<ListItemIcon>
						<Box
							component='img'
							loading='lazy'
							src={`${FLAG_URL}/tr.png`}
							alt='Türkçe'
							width={24}
							height={24}
							style={{ borderRadius: '50%', border: `1px solid ${theme.palette.divider}` }}
						/>
					</ListItemIcon>
					<ListItemText>Türkçe</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
};
