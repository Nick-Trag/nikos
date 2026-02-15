import { Component, inject, output } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { LoadingScreenService } from "../../services/loading-screen.service";
import { AnimationsService } from "../../services/animations.service";

@Component({
  selector: 'app-loading-screen',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss',
})
export class LoadingScreenComponent {
  enterAnimationEnded = false;
  loadingScreenClosing = false; // Used to remove the two halves of the logo from the DOM, triggering the leave animation

  private loadingScreenService = inject(LoadingScreenService);
  private animationsService = inject(AnimationsService);

  loadingFinished = output<void>();

  finishEnterAnimation(): void {
    if (this.animationsService.areAnimationsDisabled()) {
      this.finishLeaveAnimation(); // Immediately hide the loading screen if animations are disabled
    }
    this.enterAnimationEnded = true;
    // 1 second after the enter animation finishes, start the leave animation to exit the loading screen
    setTimeout(() => {
      this.loadingScreenClosing = true;
    }, 1000);
  }

  finishLeaveAnimation(): void {
    this.loadingFinished.emit();
    this.loadingScreenService.markLoadingScreenAsShown();
  }
}
