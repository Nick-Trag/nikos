import { Component, signal } from '@angular/core';
import { ObserverDirective } from "../../directives/observer.directive";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-education',
  imports: [
    ObserverDirective,
    NgOptimizedImage
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  protected inView = signal(false);
  protected threshold = window.innerWidth > 850 ? 0.4 : 0.2; // A smaller threshold for smaller screens (smaller than almost-lg)
}
