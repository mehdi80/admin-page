import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClientAuthService} from "../../../services/client-auth.service";

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss'
})
export class ClientRegisterComponent {
  firstName: string = '';
  lastName: string = '';
  phoneNumber: number|undefined;
  password: string = '';

  constructor(private clientAuthService: ClientAuthService) {
  }

  onSubmit(): void {
    this.clientAuthService.register(
      this.firstName,
      this.lastName,
      this.phoneNumber!,
      this.password
    );
  }
}
