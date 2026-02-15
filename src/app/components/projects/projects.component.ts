import { Component, signal, WritableSignal } from '@angular/core';
import { Project, projects } from "../../constants/projects";
import { ObserverDirective } from "../../directives/observer.directive";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-projects',
  imports: [
    ObserverDirective,
    NgOptimizedImage
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
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
