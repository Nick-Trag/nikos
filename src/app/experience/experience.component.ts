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
}
