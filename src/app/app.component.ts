import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { RoutedService } from "./routed.service";
import { LoadingComponent } from "./loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  loading = true;
  private routedService = inject(RoutedService); // We need to start the service from here, so that it starts tracking from the start

  constructor() {
    this.routedService.isFirstLoadedPage(); // Doesn't actually do anything, just forces Angular to use the service
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
