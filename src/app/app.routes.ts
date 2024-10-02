import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PhotographyComponent } from "./photography/photography.component";
import { UnderConstructionComponent } from "./under-construction/under-construction.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { TravelComponent } from "./travel/travel.component";
import { CodingComponent } from "./coding/coding.component";

export const routes: Routes = [ // TODO: Route animations
  {
    path: 'photography',
    component: PhotographyComponent,
  },
  {
    path: 'coding',
    component: CodingComponent,
  },
  {
    path: 'video-games',
    component: UnderConstructionComponent,
  },
  {
    path: 'travel',
    component: TravelComponent,
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
    component: PageNotFoundComponent,
  }
];
