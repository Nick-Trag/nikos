import { Component, inject } from '@angular/core';
import { EducationComponent } from "../../components/education/education.component";
import { ExperienceComponent } from "../../components/experience/experience.component";
import { ProjectsComponent } from "../../components/projects/projects.component";
import { AboutMeComponent } from "../../components/about-me/about-me.component";
import { NgClass } from "@angular/common";
import { LoadingScreenService } from "../../services/loading-screen.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    EducationComponent,
    ExperienceComponent,
    ProjectsComponent,
    AboutMeComponent,
    NgClass,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private loadingScreenService = inject(LoadingScreenService);
  protected loadingScreenShown = this.loadingScreenService.hasLoadingScreenBeenShown();

}
