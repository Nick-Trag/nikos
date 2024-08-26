import { Component, signal } from '@angular/core';
import { ObserverDirective } from "../observer.directive";

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    ObserverDirective
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  protected inView = signal(false);
  protected threshold = window.innerWidth > 768 ? 0.4 : 0.1; // A smaller threshold for smaller screens (smaller than md)
}
