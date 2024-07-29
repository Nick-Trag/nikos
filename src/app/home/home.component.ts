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
    ]) // TODO: Stagger the animations
  ],
})
export class HomeComponent implements AfterViewInit {
  // private element = inject(ElementRef);
  protected educationInView: boolean = false;
  protected experienceInView: boolean = false;
  protected projectsInView: boolean = false;
  @ViewChild('educationDiv') educationDiv: ElementRef | undefined;
  @ViewChild('experienceDiv') experienceDiv: ElementRef | undefined;
  @ViewChild('projectsDiv') projectsDiv: ElementRef | undefined;

  constructor() {

  }

  private registerIntersectionObserver(element: ElementRef | undefined): void {
    if (element !== undefined) {
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          // TODO: Set the correct inView to true
          observer.unobserve(entries[0].target);
        }
      }, {threshold: 0.1}); // TODO: Proper threshold for every item
      intersectionObserver.observe(element.nativeElement);
    }
  }

  ngAfterViewInit(): void {
    if (this.educationDiv !== undefined) {
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          this.educationInView = true;
          observer.unobserve(entries[0].target);
        }
      }, { threshold: 0.4}); // TODO: Check threshold for small screens
      intersectionObserver.observe(this.educationDiv.nativeElement);
    }
  }
}
