import { Component, HostBinding } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { animate, group, query, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  animations: [
    trigger('enterLeave', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('3s linear', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        group([
          query('.top-half', [
            animate('0.5s ease-out', style({ translate: '0 -400px' })),
          ]),
          query('.bottom-half', [
            animate('0.5s ease-out', style({ translate: '0 400px' })),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class LoadingComponent {
  @HostBinding('@enterLeave') animate = true;
}
