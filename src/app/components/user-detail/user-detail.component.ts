import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MergeUserService} from "../../services/merge-user.service";
import {NgIf} from "@angular/common";
import {LocalStorageUser} from "../../models/local-storage-user";
import {UsersApi} from "../../models/api-user";
import {SharedUserService} from "../../services/shared-user.service";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  private users:(UsersApi|LocalStorageUser)[]|undefined;
  public selectedUser: any;
  constructor(
    private route: ActivatedRoute,
    private combinedService:MergeUserService,
    private sharedUser:SharedUserService
    ) {}


  ngOnInit(): void {
    this.combinedService.getCombinedUsers().subscribe(response => {
      this.users = response;
      this.findUser()
      this.sharedUser.setSharedUser(this.selectedUser)
    }, error => {
      console.error('Error fetching users', error);
    });
  }

  findUser() {
    this.route.params.subscribe((params) => {
      const userId: number = +params['id'];
      this.selectedUser = this.users?.find((user: any) => user.id === userId);
    })
  }
}



