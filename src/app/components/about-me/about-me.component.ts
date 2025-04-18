import { Component, signal } from '@angular/core';
import { ObserverDirective } from "../../directives/observer.directive";
import { RouterLink } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    ObserverDirective,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  protected inView = signal(false);
  protected threshold = window.innerWidth > 768 ? 0.4 : 0.2; // A smaller threshold for smaller screens (smaller than md)
}
