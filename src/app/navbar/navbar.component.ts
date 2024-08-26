import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  protected navOpen = false;

  toggleNav() {
    this.navOpen = !this.navOpen;
    document.body.style.overflowY = this.navOpen ? 'hidden' : '';
    document.documentElement.style.overflowY = this.navOpen ? 'hidden' : '';
  }

  closeNav() {
    this.navOpen = false;
    document.body.style.overflowY = '';
    document.documentElement.style.overflowY = '';
  }
}
