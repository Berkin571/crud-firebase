import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ExpenseService } from '../../services';
import { IExpense } from '../../models';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
})
export class ExpenseComponent implements OnInit {
  expenses: IExpense[] = [];
  totalExpenses: number = 0;
  currentMonth: Date = new Date();

  constructor(private expenseService: ExpenseService, private router: Router) {}

  ngOnInit(): void {
    this.fetchExpensesForMonth(this.currentMonth);
  }

  fetchExpensesForMonth(date: Date) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.expenseService
      .getAllExpenses()
      ?.snapshotChanges()
      .subscribe((data) => {
        this.expenses = [];
        this.totalExpenses = 0;

        data.forEach((item) => {
          let expense = item.payload.toJSON() as IExpense & { date: string };
          const expenseDate = new Date(expense.date);

          if (expenseDate >= startOfMonth && expenseDate <= endOfMonth) {
            this.expenses.push({
              key: item.key ?? '',
              price: expense.price,
              title: expense.title,
              description: expense.description,
              date: expense.date,
            });
            this.totalExpenses += parseFloat(expense.price);
          }
        });
      });
  }

  editExpense(key: string) {
    this.router.navigate(['/expense-form/' + key]);
  }

  deleteExpense(key: string) {
    this.expenseService.deleteExpense(key)?.then(() => {
      this.fetchExpensesForMonth(this.currentMonth);
    });
  }

  changeMonth(offset: number) {
    const newDate = new Date(this.currentMonth);
    newDate.setMonth(this.currentMonth.getMonth() + offset);

    this.currentMonth = newDate;

    this.fetchExpensesForMonth(this.currentMonth);
  }
}
