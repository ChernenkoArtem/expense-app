import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ExpenseService } from '../_data/expense.service';
import { category, transactionType, FiltersOptions } from '../_data/expense.interfaces';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-filters-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  providers: [],
  templateUrl: './filters-form.component.html',
  styleUrl: './filters-form.component.scss',
})
export class FiltersFormComponent implements OnInit {
  protected readonly transactionType = transactionType;
  protected readonly category = category;
  private fb: FormBuilder = inject(FormBuilder);
  private expenseService = inject(ExpenseService);
  filterForm = this.createForm();

  ngOnInit() {
    this.filterForm.valueChanges.pipe(distinctUntilChanged()).subscribe((value: FiltersOptions) => {
      this.expenseService.updateTransactionList(value);
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      transactionType: [this.expenseService.filtersOptions.transactionType],
      category: [this.expenseService.filtersOptions.category],
    });
  }
}
