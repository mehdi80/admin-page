import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  currentUserName: string | null = null;
  isLoggedIn: boolean = false;
  private subscription!: Subscription;

  constructor(private authService: AuthService , private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.currentUserName = this.authService.getCurrentUsername();
      } else {
        this.currentUserName = null;
      }
    });
    this.getRouteParams()
  }


  getRouteParams(): void {
    const ruteParam = this.activatedRoute.snapshot.params;
    console.log(ruteParam)
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
