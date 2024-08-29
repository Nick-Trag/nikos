import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { RoutedService } from "./routed.service";
import { ImageLoaderService } from "./image-loader.service";
import { NgOptimizedImage } from "@angular/common";
import { animate, group, query, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [ // TODO: Make the animations a bit smoother
    trigger('enterLeave', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        group([
          query('.top-half', [
            animate('0.5s ease-in', style({ translate: '0 -700px' })),
          ]),
          query('.bottom-half', [
            animate('0.5s ease-in', style({ translate: '0 700px' })),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  loading = true;
  private routedService = inject(RoutedService); // We need to start the service from here, so that it starts tracking from the start
  private loaderService = inject(ImageLoaderService);

  constructor() {
    this.routedService.isFirstLoadedPage(); // Doesn't actually do anything, just forces Angular to use the service
  }

  ngOnInit(): void {
    // TODO: Preferably not hardcoded to 5 seconds (either less, or dynamic, probably just less)
    setTimeout(() => {
      this.loading = false;
    }, 5000);
    this.loaderService.loadImages();
  }
}
