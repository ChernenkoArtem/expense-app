export const transactionType = {
  income: 'income',
  expense: 'expense',
} as const;

export const category = {
  groceries: 'groceries',
  salary: 'salary',
  entertainment: 'entertainment',
} as const;

export type TransactionType = keyof typeof transactionType;
export type CategoryType = keyof typeof category;

export interface Expense {
  name: string;
  amount: number;
  transactionType: TransactionType;
  category: CategoryType;
  transactionDate: Date | string;
}

export interface FiltersOptions {
  transactionType: TransactionType | 'all';
  category: CategoryType | 'all';
}
