import { EmpresaAuth } from './../../models/EmpresaAuth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  loading: boolean = false;
  submitSuccess: boolean = false;
  submitError: boolean = false;
  currentCompany: EmpresaAuth = {};
  returnUrl: string = '';

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router,
    private route: ActivatedRoute, public dialogRef: MatDialogRef<LoginComponent>) {
    this.auth.currentCompany.subscribe(x => this.currentCompany = x);
  }

  ngOnInit(): void {
    if (this.currentCompany && this.currentCompany.companyManagerMail) {
      this.router.navigate(["admin/product"]);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/product';
  }

  get userName() { return this.loginForm.get('userName')?.invalid && this.loginForm.get('userName')?.touched }

  get password() { return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched; }

  onSubmit() {
    this.submitError = false;
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => {
            control.markAsDirty();
            control.markAsTouched();
          });
        } else {
          control.markAsDirty();
          control.markAsTouched();
        }
      });
    }
    this.loading = true;
    this.auth.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe(response => {
      this.submitSuccess = true;
      setTimeout(() => {
        this.router.navigate([this.returnUrl]);
        this.dialogRef.close();
      }, 1000);
    }, error => {
      this.submitError = true;
      this.loading = false;
    });
  }

  openDialogRegister(): void {
    this.dialogRef.close('openRegister');
  }
}
