import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ImageLoaderService } from "./services/image-loader.service";
import { NgOptimizedImage } from "@angular/common";
import { LoadingScreenService } from "./services/loading-screen.service";
import { environment } from "../environments/environment";
import { AnimationsService } from "./services/animations.service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  loading = environment.showLoadingScreen; // Do not show loading screen in dev mode, unless specifically needed, as it slows me down too much
  enterAnimationEnded = false;
  loadingScreenClosing = false; // Used to remove the two halves of the logo from the DOM, triggering the leave animation
  private loadingScreenService = inject(LoadingScreenService);
  private loaderService = inject(ImageLoaderService);
  private animationsService = inject(AnimationsService);

  constructor() {
  }

  ngOnInit(): void {
    this.loaderService.loadImages();
  }

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
    this.loading = false;
    this.loadingScreenService.markLoadingScreenAsShown();
  }
}
