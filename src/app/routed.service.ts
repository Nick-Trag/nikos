import { inject, Injectable } from '@angular/core';
import { NavigationStart, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
// Used for detecting if the current route is the first route that has been loaded in this session
export class RoutedService {
  private router = inject(Router);
  // Detects if this page is the first page that has been loaded in this session
  firstLoadedPage: boolean = true;

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const currentUrl = this.router.url; // Get the current URL, before navigation
        if (currentUrl !== event.url) { // If the target URL is different
          // Note: As I am redirecting 404s to the homepage, this does not work then. However, I will create a dedicated 404 page, so no need to worry
          this.firstLoadedPage = false;
        }
      }
    });
  }

  // Detects if this page is the first page that has been loaded in this session
  isFirstLoadedPage(): boolean {
    return this.firstLoadedPage;
  }
}
