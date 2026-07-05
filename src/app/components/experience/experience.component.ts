import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ObserverDirective } from "../../directives/observer.directive";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-experience',
  imports: [
    ObserverDirective,
    NgOptimizedImage
  ],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  protected inView = signal(false);
  protected threshold = window.innerWidth > 768 ? 0.4 : 0.1; // A smaller threshold for smaller screens (smaller than md)
}
