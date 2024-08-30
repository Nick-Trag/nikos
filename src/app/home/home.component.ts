import { Component, inject } from '@angular/core';
import { EducationComponent } from "../education/education.component";
import { ExperienceComponent } from "../experience/experience.component";
import { ProjectsComponent } from "../projects/projects.component";
import { AboutMeComponent } from "../about-me/about-me.component";
import { NgClass } from "@angular/common";
import { LoadingScreenService } from "../loading-screen.service";

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
