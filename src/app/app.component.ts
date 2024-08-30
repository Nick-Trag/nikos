import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { ImageLoaderService } from "./image-loader.service";
import { NgOptimizedImage } from "@angular/common";
import { animate, group, query, style, transition, trigger, AnimationEvent } from "@angular/animations";
import { LoadingScreenService } from "./loading-screen.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('loading', [
      transition(':enter', [
        query('.logo',  [
          style({ opacity: 0 }),
          animate('1.5s ease-out', style({ opacity: 1 })),
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
  loading = true;
  animationEnded = false;
  private loadingScreenService = inject(LoadingScreenService);
  private loaderService = inject(ImageLoaderService);

  constructor() {
  }

  ngOnInit(): void {
    // TODO: Check if 3 seconds is good for slow connections and no cache
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    this.loaderService.loadImages();
  }

  finishAnimation(event: AnimationEvent): void {
    this.animationEnded = true;
    if (event.toState === "void") { // There are two animations, the second and last one has toState === "void", the first has toState === null
      this.loadingScreenService.markLoadingScreenAsShown();
    }
  }
}
