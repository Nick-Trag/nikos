import { AfterViewInit, Component } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { EducationComponent } from "../education/education.component";
import { ExperienceComponent } from "../experience/experience.component";
import { ProjectsComponent } from "../projects/projects.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    EducationComponent,
    ExperienceComponent,
    ProjectsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('inView', [
      state('false', style({ translate: '0 -5%', opacity: 0 })),
      state('true', style({ translate: '0 0', opacity: 1 })),
      transition('false => true', [animate('1s ease-out')]),
      // query('h1, div > div', [
      //   state('false', style({ translate: '0 -5%', opacity: 0 })),
      //   state('true', style({ translate: '0 0', opacity: 1 })),
      //   transition('false => true', [
      //     stagger(100, [
      //       animate('1s ease-out'),
      //     ]),
      //   ]),
      // ], {optional: true}),
    ]), // TODO: Stagger the animations
  ],
})
export class HomeComponent implements AfterViewInit {
  // private element = inject(ElementRef);
  // protected educationInView = signal(false);
  // protected experienceInView = signal(false);
  // protected projectsInView = signal(false);
  // @ViewChild('educationDiv') educationDiv: ElementRef | undefined;
  // @ViewChild('experienceDiv') experienceDiv: ElementRef | undefined;
  // @ViewChild('projectsDiv') projectsDiv: ElementRef | undefined;

  constructor() {

  }

  // private registerIntersectionObserver(element: ElementRef | undefined, inViewSignal: WritableSignal<boolean>, threshold: number): void {
  //   if (element !== undefined) {
  //     const intersectionObserver = new IntersectionObserver((entries, observer) => {
  //       if (entries[0].isIntersecting) {
  //         inViewSignal.set(true);
  //         observer.unobserve(entries[0].target);
  //       }
  //     }, {threshold: threshold}); // TODO: Check threshold for small screens
  //     intersectionObserver.observe(element.nativeElement);
  //   }
  //   else {
  //     inViewSignal.set(true);
  //   }
  // }

  ngAfterViewInit(): void {
    // this.registerIntersectionObserver(this.educationDiv, this.educationInView, 0.4);
    // this.registerIntersectionObserver(this.experienceDiv, this.experienceInView, 0.4);
    // this.registerIntersectionObserver(this.projectsDiv, this.projectsInView, 0.2);
  }
}
