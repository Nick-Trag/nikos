import { Component } from '@angular/core';
import { NgOptimizedImage, TitleCasePipe } from "@angular/common";
import { LeagueOfLegendsComponent } from "../league-of-legends/league-of-legends.component";

@Component({
  selector: 'app-video-games',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TitleCasePipe,
    LeagueOfLegendsComponent
  ],
  templateUrl: './video-games.component.html',
  styleUrl: './video-games.component.scss'
})
export class VideoGamesComponent {

}
