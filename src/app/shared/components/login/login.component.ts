import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username:string = '';
  password:string = '';

  constructor(private authService: AuthService) {}

  onSubmit():void {
    this.authService.login(this.username, this.password);
  }
}
