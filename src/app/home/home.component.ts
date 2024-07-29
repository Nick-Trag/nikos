import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('inView', [
      state('false', style({ translate: '0 -5%', opacity: 0 })),
      state('true', style({ translate: '0 0', opacity: 1 })),
      transition('false => true', [animate('1s ease-out')]),
    ])
  ],
})
export class HomeComponent implements AfterViewInit {
  // private element = inject(ElementRef);
  protected inView: boolean = false;
  @ViewChild('educationDiv') educationDiv: ElementRef | undefined;

  constructor() {

  }

  ngAfterViewInit(): void {
    if (this.educationDiv !== undefined) {
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          this.inView = true;
          observer.unobserve(entries[0].target);
        }
      }, { threshold: 0.6});
      intersectionObserver.observe(this.educationDiv.nativeElement);
    }
  }
}
