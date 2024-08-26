import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";

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
      if (event instanceof NavigationEnd) {
        this.firstLoadedPage = false;
      }
    });
  }

  // Detects if this page is the first page that has been loaded in this session
  isFirstLoadedPage(): boolean {
    return this.firstLoadedPage;
  }
}
