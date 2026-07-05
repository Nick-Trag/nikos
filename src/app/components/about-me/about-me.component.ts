import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ObserverDirective } from "../../directives/observer.directive";
import { RouterLink } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-about-me',
  imports: [
    ObserverDirective,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './about-me.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  protected inView = signal(false);
  protected threshold = window.innerWidth > 768 ? 0.4 : 0.2; // A smaller threshold for smaller screens (smaller than md)
}
