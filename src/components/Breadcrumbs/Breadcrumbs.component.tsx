import { capitalize } from '@/lib/utils/format.utils';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { IconButton } from '@/components/IconButton/IconButton.component';
import Stack from '@mui/material/Stack';
import { NavLink, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

export const Breadcrumbs = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
	const { t } = useTranslation();
	const { pathname } = useLocation();
	const segments = pathname.split('/').filter(item => item !== '' && item !== 'tr' && item !== 'nl');

	return (
		<Stack direction='row' alignItems='center' role='presentation' gap={1}>
			<IconButton
				icon={isOpen ? 'sidebar-close' : 'sidebar-open'}
				aria-label={isOpen ? 'close drawer' : 'open drawer'}
				onClick={onToggle}
				title={isOpen ? t('labels.closeMenu') : t('labels.openMenu')}
			/>
			<MuiBreadcrumbs aria-label='breadcrumb'>
				{segments.map((segment, index) => (
					<Link
						component={NavLink}
						key={segment}
						to={`/${segments.slice(0, index + 1).join('/')}`}
						underline='hover'
						color='text.primary'
						aria-current='page'
						sx={{
							fontSize: 14,
							opacity: index === segments.length - 1 ? 1 : 0.5
						}}
					>
						{capitalize(segment)}
					</Link>
				))}
			</MuiBreadcrumbs>
		</Stack>
	);
};
