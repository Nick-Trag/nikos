import { Component, signal, WritableSignal } from '@angular/core';
import { Project, projects } from "../../constants/projects";
import { ObserverDirective } from "../../directives/observer.directive";
import { NgOptimizedImage } from "@angular/common";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-projects',
  imports: [
    ObserverDirective,
    NgOptimizedImage
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [
    trigger('recursion', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.5s ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ProjectsComponent {
  projects: Project[] = projects;
  inView: WritableSignal<boolean>[] = Array.from(this.projects, () => signal(false));
  protected threshold = window.innerWidth > 768 ? 0.4 : 0.2; // A smaller threshold for smaller screens (smaller than md)
  showRecursion = false;

  linkClicked(event: MouseEvent, link: string) {
    if (link === "#") {
      event.preventDefault();
      this.recurse();
    }
    event.stopPropagation();
  }

  recurse(): void {
    window.scrollTo({top: 0, behavior: "smooth"});
    this.showRecursion = true;
    setTimeout(() => {
      this.showRecursion = false;
    }, 2000);
  }
}
