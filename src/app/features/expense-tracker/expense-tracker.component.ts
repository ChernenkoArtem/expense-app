import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ExpenseAdditionFormComponent } from './expense-addition-form/expense-addition-form.component';
import { MatButton } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from './_data/expense.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Expense } from './_data/expense.interfaces';
import { MatError, MatFormField } from '@angular/material/form-field';
import { FiltersFormComponent } from './filters-form/filters-form.component';

@Component({
  selector: 'app-expense-tracker',
  standalone: true,
  imports: [
    ExpenseAdditionFormComponent,
    MatButton,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatError,
    MatFormField,
    FiltersFormComponent,
  ],
  templateUrl: './expense-tracker.component.html',
  styleUrl: './expense-tracker.component.scss',
})
export class ExpenseTrackerComponent implements OnInit, AfterViewInit {
  @ViewChild(ExpenseAdditionFormComponent, { static: true })
  expenseAdditionFormComponent!: ExpenseAdditionFormComponent;
  displayedColumns: string[] = ['name', 'amount', 'transactionType', 'category', 'transactionDate'];
  transactionList!: MatTableDataSource<Expense>;
  constructor(private expenseService: ExpenseService) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.transactionList.sort = this.sort;
  }

  ngOnInit(): void {
    this.expenseService.transactionList.subscribe((transactionList) => {
      this.transactionList = new MatTableDataSource(transactionList);
      if (this.sort) {
        this.transactionList.sort = this.sort;
      }
    });
  }

  addExpenseTransaction() {
    const form = this.expenseAdditionFormComponent.expenseForm;

    if (form.invalid) {
      return;
    }
    this.expenseService.setNewExpense(form.value);
  }
}
