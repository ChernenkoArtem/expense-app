import { Routes } from '@angular/router';
import { ExpenseTrackerComponent } from './features/expense-tracker/expense-tracker.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ExpenseTrackerComponent,
  },
];
