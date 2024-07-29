import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
  animations: [
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
