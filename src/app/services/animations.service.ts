import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// Used to check if the user has specified that they prefer reduced motion, meaning that most animations will be disabled
export class AnimationsService {
  constructor() {
  }

  areAnimationsDisabled(): boolean {
    // Reference: https://stackoverflow.com/a/77286479/7400287
    return window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }
}
