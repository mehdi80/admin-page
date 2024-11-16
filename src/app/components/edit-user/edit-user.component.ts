import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedUserService} from "../../services/shared-user.service";
import {ApiUserService} from "../../services/api-user.service";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;
  userShared: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiUser:ApiUserService,
    private sharedUser: SharedUserService
  ) {


    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  ngOnInit(): void {
    this.setDefaultFormValue();
  }

  setDefaultFormValue() {
    this.sharedUser.getSharedUser().subscribe(res => this.userShared = res);
    this.editForm.get('name')?.setValue(this.userShared.name);
    this.editForm.get('userName')?.setValue(this.userShared.username);
    this.editForm.get('email')?.setValue(this.userShared.email);
    this.editForm.get('phone')?.setValue(this.userShared.phone);
    this.editForm.get('address')?.setValue(this.userShared.address.street);
  }

  submit():void {
    const sendData:string = JSON.stringify(this.editForm.value);
    const userId = this.userShared.id;

    this.apiUser.updateUser(sendData,userId).subscribe(
      response => {
        console.log('Post updated successfully', response);
      },
      error => {
        console.error('Error updating post', error);
      }
    );
    this.editForm.reset();
  }

}
