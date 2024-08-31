import { Component, inject, signal } from '@angular/core';
import { ObserverDirective } from "../observer.directive";
import { Platform } from "@angular/cdk/platform";

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
  private platform = inject(Platform);
  protected inView = signal(false);
  protected threshold = this.platform.FIREFOX ? 0.1 : 0.5; // Firefox mobile has some issues, so we use a smaller threshold for it
}
