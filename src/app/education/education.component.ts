import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { animate, query, stagger, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
  animations: [
    // Hacky, but necessary solution. I cannot tell it to apply this state by default in the query function. I need to apply it to every child directly
    // Reference: https://github.com/angular/angular/issues/18775
    trigger('child', [
      state('false', style({ translate: '0 -10%', opacity: 0 })),
      // state('true', style({ translate: '0 0', opacity: 1 })),
    ]), // TODO: I might actually be able to do this semi-easily, using style or class-bindings on the inView variable. And CSS animation delays. Check it for experience
    trigger('inView', [
      transition('false => true', [
        query('h1, div > .school-card', [
          style({ translate: '0 -10%', opacity: 0 }),
          stagger(200, [
            animate('1s ease-out', style({ translate: '0 0', opacity: 1 }))
          ])
        ])
      ]),
    ]),
  ]
})
export class EducationComponent implements AfterViewInit {
  protected inView = false;

  @ViewChild('container') container: ElementRef | undefined;

  ngAfterViewInit(): void {
    // TODO: Can use an intersection observer service
    if (this.container !== undefined) {
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          this.inView = true;
          observer.unobserve(entries[0].target);
        }
      }, {threshold: 0.4}); // TODO: Check threshold for small screens
      intersectionObserver.observe(this.container.nativeElement);
    }
    else {
      this.inView = true;
    }
  }
}
