import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LoadingScreenService } from "../../services/loading-screen.service";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-under-construction',
  imports: [
    NgClass
  ],
  templateUrl: './under-construction.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './under-construction.component.scss'
})
export class UnderConstructionComponent {
  private loadingScreenService = inject(LoadingScreenService);
  protected loadingScreenShown = this.loadingScreenService.hasLoadingScreenBeenShown();
}
