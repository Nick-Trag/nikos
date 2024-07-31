import { Component, signal, WritableSignal } from '@angular/core';
import { Project, projects } from "../projects";
import { ObserverDirective } from "../observer.directive";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ObserverDirective
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = projects;
  inView: WritableSignal<boolean>[] = Array.from(this.projects, () => signal(false));
}
