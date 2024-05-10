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

  constructor(private expenseService: ExpenseService, private router: Router) {}

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses() {
    this.expenseService
      .getAllExpenses()
      ?.snapshotChanges()
      .subscribe({
        next: (data) => {
          this.expenses = [];

          data.forEach((item) => {
            let expense = item.payload.toJSON() as IExpense;
            this.totalExpenses = parseInt(expense.price);

            this.expenses.push({
              key: item.key || '',
              price: expense.price,
              title: expense.title,
              description: expense.description,
            });
          });
        },
      });
  }

  editExpense(key: string) {
    this.router.navigate(['/expense-form/' + key]);
  }
}
