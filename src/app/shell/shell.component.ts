import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../shared/components/header/header.component";
import {Router, RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent implements OnInit {
  constructor(private router:Router,) {}

  ngOnInit() {
    this.router.navigate(['/client/products'])
  }
}
