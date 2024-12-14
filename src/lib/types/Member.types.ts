import Decimal from 'decimal.js';

export interface Member {
	id: number;
	email: string;
	name: string;
	address: string;
	zip: string;
	city: string;
	phone: string;
	bank: string;
	amount: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface SearchMembersParams {
	page?: string;
	take?: string;
	query?: string;
	orderBy?: string;
	order?: string;
}

export interface AddMember {
	email: string;
	name: string;
	address: string;
	zip: string;
	city: string;
	phone: string;
	bank: string;
	amount: Decimal;
}

export type EditMember = Partial<AddMember>;
