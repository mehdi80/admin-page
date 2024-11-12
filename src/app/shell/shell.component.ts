import { Component } from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {

}
