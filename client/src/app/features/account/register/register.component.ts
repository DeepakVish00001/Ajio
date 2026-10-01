import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AccountServices } from '../../../core/services/account.services';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatCard,
    JsonPipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountServices);
  private router = inject(Router);

  validationErrors?:string[];


  registerForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    password: [''],
  });

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/account/login');
      },
      error:errors=>{
        console.log(errors);
        this.validationErrors=errors;
      }
      
    })
  }
}
