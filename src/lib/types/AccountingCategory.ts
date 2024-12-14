export enum AccountingCategoryType {
	INCOME = 'INCOME',
	EXPENSE = 'EXPENSE'
}

export interface AccountingCategory {
	id: number;
	name: string;
	type: AccountingCategoryType;
	total: number;
	order: number;
	createdAt: string;
	updatedAt: string;
}

export interface EditAccountingCategory {
	name: string;
}

export interface AddAccountingCategory {
	name: string;
	type: AccountingCategoryType;
}
