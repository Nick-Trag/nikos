import { Component, signal } from '@angular/core';
import { ObserverDirective } from "../observer.directive";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    ObserverDirective
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected inView = signal(false);
}
