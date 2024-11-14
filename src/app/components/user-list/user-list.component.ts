import {Component, OnInit} from '@angular/core';
import {LocalStorageUser} from "../../models/local-storage-user";
import {UsersApi} from "../../models/api-user";
import {MergeUserService} from "../../services/merge-user.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: (LocalStorageUser | UsersApi)[] | undefined;

  constructor(private combinedService:MergeUserService) {}

  ngOnInit(): void {
    this.combinedService.getCombinedUsers().subscribe(response => {
      this.users = response;
    }, error => {
      console.error('Error fetching users', error);
    });
  }
}
