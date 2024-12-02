import { Injectable } from '@angular/core';
import { Expense, FiltersOptions } from './expense.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  transactionList = new BehaviorSubject<Expense[]>(this.getExpenseListLS());
  filtersOptions: FiltersOptions = {
    category: 'all',
    transactionType: 'all',
  };

  setNewExpense(expense: Expense) {
    const expenseList = this.getExpenseListLS();
    const updatedList = [...expenseList, expense];
    localStorage.setItem('expenses', JSON.stringify(updatedList));
    this.transactionList.next(this.dataFilter(updatedList, this.filtersOptions));
  }

  private getExpenseListLS(): Expense[] {
    const expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
  }

  dataFilter(list: Expense[], filterOptions: FiltersOptions) {
    const filterKeys = Object.keys(filterOptions);
    return list.filter((expenseTransaction: Expense) =>
      (filterKeys as (keyof FiltersOptions)[]).every(
        (filterFieldName) =>
          expenseTransaction[filterFieldName] === filterOptions[filterFieldName] ||
          filterOptions[filterFieldName] === 'all',
      ),
    );
  }

  updateTransactionList(filterOptions: FiltersOptions) {
    const expenseList = this.getExpenseListLS();
    this.filtersOptions = filterOptions;
    this.transactionList.next(this.dataFilter(expenseList, filterOptions));
  }
}
