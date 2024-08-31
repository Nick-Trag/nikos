import { Component, inject } from '@angular/core';
import { LoadingScreenService } from "../loading-screen.service";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-under-construction',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.scss'
})
export class UnderConstructionComponent {
  private loadingScreenService = inject(LoadingScreenService);
  protected loadingScreenShown = this.loadingScreenService.hasLoadingScreenBeenShown();
}
