import { Component, inject } from '@angular/core';
import { NgClass } from "@angular/common";
import { LoadingScreenService } from "../../services/loading-screen.service";

@Component({
  selector: 'app-page-not-found',
  imports: [
    NgClass
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  private loadingScreenService = inject(LoadingScreenService);
  protected loadingScreenShown = this.loadingScreenService.hasLoadingScreenBeenShown();
}
