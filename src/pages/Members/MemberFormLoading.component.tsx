import { PageTitle } from '@/components/Typography/Typography.component';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const MemberFormLoading = () => {
	return (
		<Stack gap={3}>
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<PageTitle>
					<Skeleton variant='text' width={200} height={36.5} />
				</PageTitle>
				<Stack direction='row' gap={1} alignItems='center'>
					<Skeleton variant='rounded' width={108} height={36.5} />
					<Skeleton variant='rounded' width={91} height={36.5} />
				</Stack>
			</Stack>
			{Array.from({ length: 7 }).map((_, i) => (
				<Skeleton key={i} height={56} width='100%' variant='rounded' />
			))}
		</Stack>
	);
};
