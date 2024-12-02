import { Component, forwardRef, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { category, Expense, transactionType } from '../_data/expense.interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AmountDirectiveDirective } from './directives/amount-directive.directive';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-expense-addition-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    AmountDirectiveDirective,
    MatButton,
    MatDatepickerModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExpenseAdditionFormComponent),
      multi: true,
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './expense-addition-form.component.html',
  styleUrl: './expense-addition-form.component.scss',
})
export class ExpenseAdditionFormComponent implements ControlValueAccessor {
  protected readonly transactionType = transactionType;
  protected readonly category = category;
  private fb: FormBuilder = inject(FormBuilder);
  expenseForm: FormGroup = this.createForm();
  expenseValue!: Expense;

  onChange: any = () => {};
  onTouched: any = () => {};

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      amount: ['', { validators: [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')] }],
      transactionType: ['', Validators.required],
      category: ['', Validators.required],
      transactionDate: [new Date()],
    });
  }

  writeValue(value: Expense) {
    if (value) {
      this.expenseValue = value;
    }
    if (value === null) {
      this.expenseForm.reset();
    }
  }
  registerOnChange(fn: any) {
    this.onChange = fn;

    this.expenseForm = this.createForm();
    this.onChange(this.expenseForm.value);

    this.expenseForm.valueChanges.pipe(distinctUntilChanged(), takeUntilDestroyed()).subscribe((value: Expense) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
