import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// Used to tell if the loading screen has already been shown. This is useful so that components can adjust their animations and everything to not get hidden by the loading screen
export class LoadingScreenService {
  // If the loading screen has already been shown
  private loadingScreenShown = false;

  constructor() { }

  hasLoadingScreenBeenShown(): boolean {
    return this.loadingScreenShown;
  }

  markLoadingScreenAsShown(): void {
    this.loadingScreenShown = true;
  }
}
