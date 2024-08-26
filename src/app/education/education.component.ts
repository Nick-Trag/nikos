import { Component, signal } from '@angular/core';
import { ObserverDirective } from "../observer.directive";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    ObserverDirective
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
  animations: [
    // This is no longer needed, as I found a better way, but I'm leaving the comment here for reference
    // Hacky, but necessary solution. I cannot tell it to apply this state by default in the query function. I need to apply it to every child directly
    // Reference: https://github.com/angular/angular/issues/18775
    // trigger('child', [
    //   state('false', style({ translate: '0 -10%', opacity: 0 })),
    //   // state('true', style({ translate: '0 0', opacity: 1 })),
    // ]),
    // trigger('inView', [
    //   transition('false => true', [
    //     query('h1, div > .school-card', [
    //       style({ translate: '0 -10%', opacity: 0 }),
    //       stagger(200, [
    //         animate('1s ease-out', style({ translate: '0 0', opacity: 1 }))
    //       ])
    //     ])
    //   ]),
    // ]),
  ]
})
export class EducationComponent {
  protected inView = signal(false);
  protected threshold = window.innerWidth > 768 ? 0.4 : 0.2; // A smaller threshold for smaller screens (smaller than md)
}
