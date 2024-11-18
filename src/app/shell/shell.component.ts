import { Component } from '@angular/core';
import {HeaderComponent} from "../shared/components/header/header.component";
import {RouterOutlet} from "@angular/router";

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
export class ShellComponent {

}
