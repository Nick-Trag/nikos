import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgClass } from "@angular/common";
import { animate, style, transition, trigger } from "@angular/animations";

const open = { 'clip-path': 'ellipse(1100px 1100px at 0% 0%)' };
const closed = { 'clip-path': 'ellipse(0px 0px at -100px -100px)' };
const timing: string = '0.3s ease-in-out';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('toggleNav', [
      transition(':enter', [
        style(closed),
        animate(timing, style(open)),
      ]),
      transition(':leave', [
        style(open),
        animate(timing, style(closed)),
      ]),
    ]),
  ],
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
