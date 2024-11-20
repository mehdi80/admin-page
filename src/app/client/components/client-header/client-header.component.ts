import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-client-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.scss'
})
export class ClientHeaderComponent {

}
