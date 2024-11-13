import {Component, OnInit} from '@angular/core';
import {LocalStorageUser} from "../../models/local-storage-user";
import {UsersApi} from "../../models/api-user";
import {MergeUserService} from "../../services/merge-user.service";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: (LocalStorageUser | UsersApi)[] | undefined;

  constructor(private combinedService:MergeUserService) {}

  ngOnInit(): void {
    this.combinedService.getCombinedUsers().subscribe(response => {
      this.users = response;
      console.log(this.users);
    }, error => {
      console.error('Error fetching users', error);
    });

  }
}
