import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PhotographyComponent } from "./photography/photography.component";
import { UnderConstructionComponent } from "./under-construction/under-construction.component";

export const routes: Routes = [ // TODO: Route animations
  {
    path: 'photography',
    component: PhotographyComponent,
  },
  {
    path: 'coding',
    component: UnderConstructionComponent,
  },
  {
    path: 'video-games',
    component: UnderConstructionComponent,
  },
  {
    path: 'travel',
    component: UnderConstructionComponent,
  },
  {
    path: 'gym',
    component: UnderConstructionComponent,
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
