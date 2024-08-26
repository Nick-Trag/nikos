import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideNoopAnimations } from "@angular/platform-browser/animations";

// Reference: https://stackoverflow.com/a/77286479/7400287
const disableAnimations: boolean = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), disableAnimations ? provideNoopAnimations() : provideAnimationsAsync()]
};
