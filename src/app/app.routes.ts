import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PhotographyComponent } from "./photography/photography.component";

export const routes: Routes = [
  {
    path: 'photography',
    component: PhotographyComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];
