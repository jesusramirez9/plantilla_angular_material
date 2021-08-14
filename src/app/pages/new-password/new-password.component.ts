import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  recoverForm = this.fb.group({
    codeRecover: ['', [Validators.required]]
  });

  passwordForm = this.fb.group({
    newPassword: ['', [Validators.required]],
    newPasswordReply: ['', [Validators.required]]
  });

  password1: string = '';
  password2: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.recoverForm);
    if (this.recoverForm.invalid) {
      return Object.values(this.recoverForm.controls).forEach(control => {
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
    console.log(this.recoverForm.value.codeRecover);

  }

  onSubmitPassword() {
    console.log(this.recoverForm);
    if (this.recoverForm.invalid) {
      return Object.values(this.recoverForm.controls).forEach(control => {
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
    console.log(this.recoverForm.value.codeRecover);

  }

}
