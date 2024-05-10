import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent {
  expenseForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      price: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      desc: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      console.log(this.expenseForm.value);
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.expenseForm.get(controlName);
    return (control?.touched && control.hasError(errorType)) ?? false;
  }
}
