import { Member } from '@/lib/types/Member.types';

export const ROWS_PER_PAGE = 50;
export const MEMBER_ORDER_BY: keyof Member = 'name';
export const ORDER: 'asc' | 'desc' = 'asc';
