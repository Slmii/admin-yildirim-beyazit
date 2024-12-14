import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import { Controller } from 'react-hook-form';
import ButtonGroup from '@mui/material/ButtonGroup';
import TableFooter from '@mui/material/TableFooter';
import { hover } from '@/lib/theme';
import { IconButton } from '@/components/IconButton/IconButton.component';
import { EnhancedTableProps, EnhancedTableToolbarProps, HeadCell, Order } from '@/lib/types/Table.types';
import { PageTitle } from '@/components/Typography/Typography.component';
import { Icon } from '@/components/Icon/Icon.component';
import { useCopyToClipboard } from '@/lib/hooks/useCopyToClipboard';
import { ORDER, MEMBER_ORDER_BY, ROWS_PER_PAGE } from '@/lib/constants/table.constants';
import { Form } from '@/components/Form/Form.component';
import { Button, LinkButton } from '@/components/Button/Button.component';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Field, StandaloneField } from '@/components/Form/Field/Field.component';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { useDeleteMember, useEditMember, useGetMembers } from '@/lib/hooks/useMembers';
import { Member } from '@/lib/types/Member.types';
import { useFormat } from '@/lib/hooks/useFormat';
import Popover from '@mui/material/Popover';
import { inlineMemberFormSchema } from '@/lib/schema/member-form.schema';

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, px: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label='first page'
				icon='chevron-left-pipe'
			/>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label='previous page'
				icon='chevron-left'
			/>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='next page'
				icon='chevron-right'
			/>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='last page'
				icon='chevron-right-pipe'
			/>
		</Box>
	);
}

function EnhancedTableHead(props: EnhancedTableProps<Member>) {
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = (property: keyof Member) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead
			sx={{
				position: 'sticky',
				top: 0,
				zIndex: 1,
				backgroundColor: '#623333'
			}}
		>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						color='secondary'
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						checkedIcon={<Icon icon='checked' fontSize='small' color='secondary' />}
						size='small'
						inputProps={{
							'aria-label': 'select all desserts'
						}}
					/>
				</TableCell>
				{props.headCells.map(headCell => {
					const isOrderdBy = orderBy === headCell.id;

					return (
						<TableCell
							key={headCell.id}
							align={headCell.numeric ? 'right' : 'left'}
							sortDirection={isOrderdBy ? order : false}
							sx={{
								borderBottom: isOrderdBy
									? theme => `2px solid ${theme.palette.primary.main}`
									: undefined,
								width: headCell.width
							}}
						>
							<TableSortLabel
								active={isOrderdBy}
								direction={isOrderdBy ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
							>
								{headCell.label}
								{isOrderdBy ? (
									<Box component='span' sx={visuallyHidden}>
										{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						</TableCell>
					);
				})}
				<TableCell sx={{ width: 100 }}>Acties</TableCell>
			</TableRow>
		</TableHead>
	);
}

function TableToolbar(props: EnhancedTableToolbarProps) {
	const { t } = useTranslation();
	const { numSelected, onDelete } = props;

	return (
		<Toolbar
			sx={[
				{
					px: numSelected > 0 ? undefined : '0 !important',
					flexGrow: 1,
					minHeight: '36.5px !important',
					height: '36.5px !important',
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 }
				},
				numSelected > 0 && {
					borderRadius: 1,
					bgcolor: hover()
				}
			]}
		>
			{numSelected > 0 ? (
				<Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
					{numSelected} {t('labels.selected').toLowerCase()}
				</Typography>
			) : (
				<PageTitle>{t('labels.list')}</PageTitle>
			)}
			{numSelected > 0 ? (
				<IconButton icon='delete' onClick={onDelete} title={t('labels.delete')} color='error' />
			) : null}
		</Toolbar>
	);
}

export function MembersList() {
	const [selected, setSelected] = useState<number[]>([]);
	const [resetSelected, setResetSelected] = useState(false);
	const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	const { t } = useTranslation();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [searchParams] = useSearchParams();
	const { copy } = useCopyToClipboard();
	const formRef = useRef<HTMLFormElement>(null);

	const [page, setPage] = useState(searchParams.get('page') ? Number(searchParams.get('page')) - 1 : 0);
	const [order, setOrder] = useState<Order>((searchParams.get('order') as 'asc' | 'desc') ?? ORDER);
	const [orderBy, setOrderBy] = useState<keyof Member>(
		(searchParams.get('orderBy') as keyof Member) ?? MEMBER_ORDER_BY
	);

	const { data } = useGetMembers();
	const members = data?.members ?? [];
	const count = data?.count ?? 0;

	const { mutateAsync: editMember, isPending: isEditMemberPending } = useEditMember();
	const { mutateAsync: deleteMember, isPending: isDeleteMemberPending } = useDeleteMember();

	// Reset page when query changes
	const querySearchParam = searchParams.get('query');
	useEffect(() => setPage(0), [querySearchParam]);

	const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof Member) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);

		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.set('orderBy', property);
		currentParams.set('order', isAsc ? 'desc' : 'asc');

		navigate(`${pathname}?${currentParams.toString()}`);
	};

	const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelectedRows = members.slice(0, 25).map(r => r.id);
			setSelected(newSelectedRows);
			return;
		}

		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		if (event.shiftKey && lastSelectedIndex !== null) {
			// Shift-click behavior: select range between last selected index and current index
			const start = Math.min(lastSelectedIndex, id);
			const end = Math.max(lastSelectedIndex, id);
			const newSelectedRange = Array.from({ length: end - start + 1 }, (_, i) => i + start);

			// Merge the new range with the current selected items
			setSelected(prevSelected => {
				const combinedSelection = new Set([...prevSelected, ...newSelectedRange]);
				return Array.from(combinedSelection);
			});
		} else {
			// Single click behavior: toggle the clicked item
			setSelected(prevSelected =>
				prevSelected.includes(id) ? prevSelected.filter(item => item !== id) : [...prevSelected, id]
			);
			setLastSelectedIndex(id);
		}
	};

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);

		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.set('page', (newPage + 1).toString());

		navigate(`${pathname}?${currentParams.toString()}`);
	};

	const headCells: HeadCell<Member>[] = [
		{
			id: 'name',
			numeric: false,
			label: t('columns.name')
		},
		{
			id: 'email',
			numeric: false,
			label: t('columns.email')
		},
		{
			id: 'address',
			numeric: false,
			label: t('columns.address')
		},
		{
			id: 'zip',
			numeric: false,
			label: t('columns.zip'),
			width: 50
		},
		{
			id: 'city',
			numeric: false,
			label: t('columns.city'),
			width: 50
		},
		{
			id: 'phone',
			numeric: false,
			label: t('columns.phone')
		},
		{
			id: 'bank',
			numeric: false,
			label: t('columns.bank')
		},
		{
			id: 'amount',
			numeric: true,
			label: t('columns.amount'),
			width: 50
		}
	];

	return (
		<Stack gap={2} height='100%'>
			<Stack direction='row' alignItems='center' gap={2}>
				<TableToolbar numSelected={selected.length} onDelete={() => setIsDeleteOpen(true)} />
				<Form<{ file: File[] }>
					onAction={_ => {
						// setIsMemberUploadPending(true);
						// const formData = new FormData();
						// formData.append('file', form.getValues().file[0]);
						// await importMembers(formData);
						// setIsMemberUploadPending(false);
					}}
					defaultValues={{
						file: []
					}}
					formRef={formRef}
					sx={{ width: 'unset' }}
					render={({ setValue, watch }) => (
						<Controller
							name='file'
							render={({ field }) => (
								<ButtonGroup variant='outlined' aria-label='Import members'>
									<Button
										role='undefined'
										component='label'
										color='secondary'
										variant='outlined'
										startIcon='import'
										// disabled={isMemberUploadPending}
									>
										{watch('file')[0]?.name ?? t('labels.importMembers')}
										<input
											name={field.name}
											accept='.xlsx'
											type='file'
											onChange={e => {
												const files = e.target.files ? Array.from(e.target.files) : [];
												setValue(field.name, files);

												e.target.value = '';
											}}
											multiple
											hidden
										/>
									</Button>
									{watch('file')[0] && (
										<Button
											color='success'
											variant='contained'
											title={t('labels.upload')}
											startIcon='upload'
											type='submit'
											// loading={isMemberUploadPending}
										/>
									)}
								</ButtonGroup>
							)}
						/>
					)}
				/>
				<LinkButton color='secondary' startIcon='add-user' to='/members/add'>
					{t('labels.addMember')}
				</LinkButton>
			</Stack>
			<MembersSearch />
			<TableContainer sx={{ minWidth: 750, mx: -3, mb: -3, width: 'unset' }}>
				<Table aria-labelledby={t('labels.members')} sx={{ borderCollapse: 'separate' }} size='small'>
					<EnhancedTableHead
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={members.length}
						headCells={headCells}
					/>
					<TableBody>
						{members.map((row, index) => {
							const isItemSelected = selected.includes(row.id);
							const labelId = `enhanced-table-checkbox-${index}`;

							return (
								<TableRow
									hover
									role='checkbox'
									aria-checked={isItemSelected}
									tabIndex={-1}
									key={row.id}
									selected={isItemSelected}
								>
									<TableCell padding='checkbox'>
										<Checkbox
											onClick={event => handleClick(event, row.id)}
											color='secondary'
											checked={isItemSelected}
											size='small'
											checkedIcon={<Icon icon='checked' fontSize='small' color='secondary' />}
											inputProps={{
												'aria-labelledby': labelId
											}}
										/>
									</TableCell>
									{headCells.map(headCell => {
										const value = row[headCell.id] as string;

										return (
											<CellValue<Member>
												key={headCell.id}
												headCell={headCell}
												value={value}
												onCopy={() => copy(value)}
												isPending={isEditMemberPending}
												onInlineEdit={async value => {
													await editMember({
														data: {
															[headCell.id]: value
														},
														id: row.id
													});
												}}
											/>
										);
									})}
									<TableCell align='right'>
										<IconButton
											icon='edit'
											size='small'
											title={t('labels.edit')}
											onClick={e => {
												e.stopPropagation();
												navigate(`/members/edit/${row.id}`);
											}}
										/>
										<IconButton
											icon='delete'
											color='error'
											size='small'
											title={t('labels.delete')}
											onClick={e => {
												e.stopPropagation();

												setSelected([row.id]);
												setIsDeleteOpen(true);
												setResetSelected(true);
											}}
										/>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
					<TableFooter
						sx={{
							position: 'sticky',
							bottom: 0,
							zIndex: 1,
							backgroundColor: 'background.paper'
						}}
					>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[]}
								colSpan={11}
								count={count}
								rowsPerPage={ROWS_PER_PAGE}
								page={page}
								slotProps={{
									select: {
										inputProps: {
											'aria-label': 'rows per page'
										},
										native: true
									}
								}}
								onPageChange={handleChangePage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
			<Dialog
				open={isDeleteOpen}
				fullWidth
				maxWidth='xs'
				onClose={() => {
					if (isDeleteMemberPending) {
						return;
					}

					setIsDeleteOpen(false);

					if (resetSelected) {
						setSelected([]);
						setResetSelected(false);
					}
				}}
			>
				<DialogTitle>{t('labels.deleteSelected')}</DialogTitle>
				<DialogContent>
					<DialogContentText>{t('labels.irreversibleAction')}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						disabled={isDeleteMemberPending}
						color='secondary'
						variant='outlined'
						onClick={() => setIsDeleteOpen(false)}
					>
						{t('labels.cancel')}
					</Button>
					<Button
						loading={isDeleteMemberPending}
						color='error'
						onClick={async () => {
							await deleteMember(selected);

							setIsDeleteOpen(false);
							setSelected([]);
						}}
					>
						{t('labels.delete')}
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
}

export const MembersSearch = () => {
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const [query, setQuery] = useState(searchParams.get('query') || '');
	const debouncedQuery = useDebounce(query, 500);

	const handleOnSearch = (query: string) => {
		const params = new URLSearchParams(searchParams);

		if (query) {
			params.set('query', query);
			params.set('page', '1');
		} else {
			params.delete('query');
		}

		navigate(`${pathname}?${params.toString()}`);
	};

	useEffect(() => {
		handleOnSearch(debouncedQuery);
	}, [debouncedQuery]);

	return (
		<StandaloneField
			name='search'
			placeholder={t('placeholders.search')}
			value={query}
			onChange={e => setQuery(e.target.value)}
			fullWidth
			size='small'
		/>
	);
};

function CellValue<T = unknown>({
	value,
	headCell,
	isPending,
	onCopy,
	onInlineEdit
}: {
	value: string;
	headCell: HeadCell<T>;
	isPending: boolean;
	onCopy: () => void;
	onInlineEdit: (value: string) => Promise<void>;
}) {
	const [anchor, setAnchor] = useState<HTMLElement | null>(null);
	const [isEditMode, setIsEditMode] = useState(false);

	const { t } = useTranslation();
	const { toReadableCurrency } = useFormat();

	const handleOnClose = () => {
		setAnchor(null);
		setIsEditMode(false);
	};

	const cellValue = headCell.id === 'amount' ? toReadableCurrency(value) : value;

	return (
		<>
			<TableCell
				align={headCell.numeric ? 'right' : 'left'}
				onClick={e => {
					e.preventDefault();
					setAnchor(e.currentTarget);
				}}
				sx={{
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					maxWidth: 0,
					userSelect: 'none',
					borderRight: theme => `1px solid ${theme.palette.divider}`,
					'&:hover': {
						cursor: 'pointer',
						backgroundColor: hover()
					}
				}}
			>
				{cellValue}
			</TableCell>
			<Popover
				open={Boolean(anchor)}
				anchorEl={anchor}
				slotProps={{
					paper: {
						sx: {
							minWidth: 200,
							backgroundColor: 'primary.dark'
						}
					}
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				onClose={handleOnClose}
				disableRestoreFocus
			>
				<Stack direction='row' gap={2} alignItems='center' py={1} px={2}>
					{isEditMode ? (
						<Form
							onAction={async data => {
								await onInlineEdit(data[headCell.id as string]);
								handleOnClose();
							}}
							defaultValues={{
								[headCell.id]: value
							}}
							schema={inlineMemberFormSchema}
						>
							<Stack direction='row' alignItems='flex-start' gap={1}>
								<Field
									startIcon={headCell.id === 'amount' ? 'euro' : undefined}
									size='small'
									name={headCell.id as string}
									autoFocus
									sx={{
										color: 'error.contrastText',
										'& input': {
											py: '3.5px'
										},
										'& .MuiFormHelperText-root.Mui-error': {
											color: 'error.contrastText'
										}
									}}
								/>
								<Stack direction='row' alignItems='center'>
									<IconButton
										icon='check'
										size='small'
										title={t('labels.save')}
										isLoading={isPending}
										type='submit'
									/>
									<IconButton
										icon='close'
										size='small'
										title={t('labels.cancel')}
										onClick={e => {
											e.stopPropagation();
											handleOnClose();
										}}
										disabled={isPending}
										type='reset'
									/>
								</Stack>
							</Stack>
						</Form>
					) : (
						<Stack direction='row' alignItems='center' width='100%' gap={2}>
							{value && <Typography variant='body2'>{cellValue}</Typography>}
							<Stack direction='row' gap={0.5} ml='auto'>
								<IconButton
									icon='edit'
									size='small'
									title={t('labels.edit')}
									onClick={e => {
										e.stopPropagation();
										setIsEditMode(true);
									}}
								/>
								{value ? (
									<IconButton
										icon='copy'
										size='small'
										title={t('labels.copy')}
										onClick={e => {
											e.stopPropagation();
											onCopy();
										}}
									/>
								) : undefined}
							</Stack>
						</Stack>
					)}
				</Stack>
			</Popover>
		</>
	);
}
