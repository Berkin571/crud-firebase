import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

import { IExpense } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private dbPath = '/expenses';

  expenseRef: AngularFireList<any> | undefined;

  constructor(private db: AngularFireDatabase) {
    this.expenseRef = db.list(this.dbPath);
  }

  getAllExpenses() {
    return this.expenseRef;
  }

  getExpense(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }

  addExpense(expense: IExpense) {
    return this.expenseRef?.push(expense);
  }

  updateExpense(key: string, expense: IExpense) {
    return this.expenseRef?.update(key, expense);
  }

  deleteExpense(key: string) {
    return this.expenseRef?.remove(key);
  }
}
