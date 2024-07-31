import { Component, signal } from '@angular/core';
import { ObserverDirective } from "../observer.directive";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    ObserverDirective
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  protected inView = signal(false);
}
