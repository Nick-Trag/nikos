import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ImageLoaderService } from "./services/image-loader.service";
import { environment } from "../environments/environment";
import { LoadingScreenComponent } from "./components/loading-screen/loading-screen.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoadingScreenComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  loading = environment.showLoadingScreen; // Do not show loading screen in dev mode, unless specifically needed, as it slows me down too much
  private loaderService = inject(ImageLoaderService);

  constructor() {
  }

  ngOnInit(): void {
    this.loaderService.loadImages();
  }
}
