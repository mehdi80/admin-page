import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ClientAuthService} from "../../../services/client-auth.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-client-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './client-login.component.html',
  styleUrl: './client-login.component.scss'
})
export class ClientLoginComponent {
  loginForm: FormGroup;
  constructor(private clientAuthService: ClientAuthService,private fb: FormBuilder,) {
    this.loginForm = this.fb.group({
      phone: [
        null,
        [Validators.required, Validators.pattern(/^(\+98|0)?9\d{9}$/)],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  onSubmit():void {
    if (this.loginForm.valid) {
      const { phone, password } = this.loginForm.value;

      this.clientAuthService.login(phone, password);
    } else {
      if (this.loginForm.get('phone')?.invalid) {
        if (this.loginForm.get('phone')?.hasError('required')) {
          alert('شماره تلفن وارد نشده است.');
        } else if (this.loginForm.get('phone')?.hasError('pattern')) {
          alert('شماره تلفن معتبر نیست.');
        }
      }

      if (this.loginForm.get('password')?.invalid) {
        if (this.loginForm.get('password')?.hasError('required')) {
          alert('رمز عبور وارد نشده است.');
        } else if (this.loginForm.get('password')?.hasError('minlength')) {
          alert('رمز عبور باید حداقل ۶ کاراکتر باشد.');
        }
      }
    }

  }
}
