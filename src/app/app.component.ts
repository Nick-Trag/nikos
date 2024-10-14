import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { ImageLoaderService } from "./image-loader.service";
import { NgOptimizedImage } from "@angular/common";
import { animate, group, query, style, transition, trigger, AnimationEvent } from "@angular/animations";
import { LoadingScreenService } from "./loading-screen.service";
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('loading', [
      transition(':enter', [
        query('.logo', [
          style({ opacity: 0 }),
          animate('1.5s ease-in-out', style({ opacity: 1 })),
        ]),
      ]),
      transition(':leave', [
        group([
          query('.top-half', [
            animate('0.5s cubic-bezier(.73,.04,.85,.76)', style({ translate: '0 -700px' })),
          ]),
          query('.bottom-half', [
            animate('0.5s cubic-bezier(.73,.04,.85,.76)', style({ translate: '0 700px' })),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  loading = environment.showLoadingScreen; // Do not show loading screen in dev mode, unless specifically needed, as it slows me down too much
  animation1Ended = false;
  private loadingScreenService = inject(LoadingScreenService);
  private loaderService = inject(ImageLoaderService);

  constructor() {
  }

  ngOnInit(): void {
    this.loaderService.loadImages();
  }

  finishAnimation(event: AnimationEvent): void {
    this.animation1Ended = true;
    if (event.toState === null) { // There are two animations. The first has toState === null, the second and last one has toState === "void"
      // 1 second after the first animation finishes, exit the loading screen
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
    else if (event.toState === "void") {
      this.loadingScreenService.markLoadingScreenAsShown();
    }
  }
}
