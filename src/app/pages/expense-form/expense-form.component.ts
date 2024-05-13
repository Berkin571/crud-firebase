import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExpenseService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { IExpense } from '../../models';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent implements OnInit {
  expenseForm!: FormGroup;
  expenseId = '';

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.expenseForm = this.fb.group({
      date: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.expenseId = params['id'];
        this.getExpense(this.expenseId);
        console.log(this.expenseId, '##');
      },
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      if (this.expenseId !== undefined || '') {
        this.expenseService.updateExpense(
          this.expenseId,
          this.expenseForm.value
        );
      } else {
        this.expenseService.addExpense(this.expenseForm.value);
        console.log(this.expenseForm.value);
      }

      this.router.navigate(['/']);
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.expenseForm.get(controlName);
    return (control?.touched && control.hasError(errorType)) ?? false;
  }

  getExpense(key: string) {
    this.expenseService
      .getExpense(key)
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          let expense = data.payload.toJSON() as IExpense;
          this.expenseForm.setValue(expense);
        },
      });
  }
}
