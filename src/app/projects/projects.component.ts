import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Project, projects } from "../projects";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [
    trigger('inView', [
      state('false', style({ translate: '0 -5%', opacity: 0 })),
      state('true', style({ translate: '0 0', opacity: 1 })),
      transition('false => true', [
        animate('1s ease-out'),
      ]),
    ]),
  ],
})
export class ProjectsComponent implements AfterViewInit {
  projects: Project[] = projects;
  inView: boolean[] = Array(projects.length).fill(false);

  @ViewChildren('projectCard') projectCards: QueryList<ElementRef> | undefined;

  ngAfterViewInit(): void {
    if (this.projectCards === undefined) {
      this.inView.fill(true);
      return;
    }

    const projectCards = this.projectCards.toArray();

    for (let i = 0; i < this.projects.length; i++) {
      if (i >= this.projectCards.length || projectCards[i] === undefined) {
        this.inView.fill(true);
        return;
      }

      if (projectCards[i] !== undefined) {
        const intersectionObserver = new IntersectionObserver((entries, observer) => {
          if (entries[0].isIntersecting) {
            this.inView[i] = true;
            observer.unobserve(entries[0].target);
          }
        }, {threshold: 0.4}); // TODO: Check threshold for small screens
        intersectionObserver.observe(projectCards[i].nativeElement);
      }
      else {
        this.inView[i] = true;
      }
    }
  }
}
