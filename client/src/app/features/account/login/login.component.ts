import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/select';
import { AccountServices } from '../../../core/services/account.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatButton,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountServices);
  private router = inject(Router);
  private activatedRoute=inject(ActivatedRoute);
  returnUrl='/shop';

  constructor() {
    const url=this.activatedRoute.snapshot.queryParams['returnUrl'];
    if(url){
      this.returnUrl=url;
    }
  }

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => {
       this.accountService.getUserInfo().subscribe();
        this.router.navigateByUrl(this.returnUrl)
      }
    });
  }

}
