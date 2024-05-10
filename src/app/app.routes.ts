import { Routes } from '@angular/router';
import { ExpenseComponent, ExpenseFormComponent } from './pages';

export const routes: Routes = [
  { path: '', component: ExpenseComponent },
  {
    path: 'expense',
    component: ExpenseComponent,
  },
  {
    path: 'expense-form',
    component: ExpenseFormComponent,
  },
];
