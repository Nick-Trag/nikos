import { Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { PhotographyComponent } from "./pages/photography/photography.component";
import { UnderConstructionComponent } from "./pages/under-construction/under-construction.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { TravelComponent } from "./pages/travel/travel.component";
import { CodingComponent } from "./pages/coding/coding.component";
import { VideoGamesComponent } from "./pages/video-games/video-games.component";

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
    component: VideoGamesComponent,
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
