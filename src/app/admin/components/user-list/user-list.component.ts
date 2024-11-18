import {Component, OnInit} from '@angular/core';

import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {LocalStorageUser} from "../../../models/local-storage-user";
import {UsersApi} from "../../../models/api-user";
import {MergeUserService} from "../../../services/merge-user.service";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: (LocalStorageUser | UsersApi)[]|undefined;
  searchValue: string = '';
  searchedUser: any;
  constructor(private combinedService:MergeUserService,private router:Router) {}

  ngOnInit(): void {
    this.showUsers();
  }

  showUsers(): void {
    this.combinedService.getCombinedUsers().subscribe(response => {
      this.users = response;
      this.searchedUser = response
    }, error => {
      console.error('Error fetching users', error);
    });
  }

  onSearch(event: Event): void {
    event.preventDefault();

    (this.searchValue) ? this.router.navigate(['user-list'], {queryParams: {name: this.searchValue}}) : this.router.navigate(['user-list'])


    if (this.searchValue) {
      this.searchedUser = this.users?.filter((user:any) =>
        user.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else {
      this.searchedUser = this.users;
    }
  }
}
