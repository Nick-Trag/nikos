import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { animate, query, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('3s linear', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        query(':self .top-half', [
          style({ translate: '0 0'}),
          animate('1s linear', style({ translate: '0 -100px' })),
        ]),
        query(':self .bottom-half', [
          style({ translate: '0 0'}),
          animate('1s linear', style({ translate: '0 100px' })),
        ]),
      ]),
    ]),
  ],
})
export class LoadingComponent {

}
