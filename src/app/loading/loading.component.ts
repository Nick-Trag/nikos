import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { animate, style, transition, trigger } from "@angular/animations";

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
    ]),
    trigger('topLeave', [
      transition(':leave', [
        style({ translate: '0 0'}),
        animate('1s linear', style({ translate: '0 -1000px' })),
      ]),
    ]),
    trigger('bottomLeave', [
      transition(':leave', [
        style({ translate: '0 0'}),
        animate('1s linear', style({ translate: '0 1000px' })),
      ]),
    ]),
  ],
})
export class LoadingComponent {

}
