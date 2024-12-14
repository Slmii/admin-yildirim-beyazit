import { Member } from '@/lib/types/Member.types';

export interface HeadCell<T = unknown> {
	id: keyof T;
	label: string;
	numeric: boolean;
	width?: number;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps<T = unknown> {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Member) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
	headCells: HeadCell<T>[];
}

export interface EnhancedTableToolbarProps {
	numSelected: number;
	onDelete: () => void;
}
