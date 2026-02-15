import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    A11yModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
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
