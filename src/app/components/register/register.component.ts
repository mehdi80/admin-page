import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name = '';
  lastName = '';
  username = '';
  email = '';
  phoneNumber = +'';
  password = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(
      this.name,
      this.lastName,
      this.username,
      this.email,
      this.phoneNumber,
      this.password
    );
  }
}
