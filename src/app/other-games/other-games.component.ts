import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from "@angular/common";
import { SteamGame } from "../steam-game";
import { VideoGamesService } from "../video-games.service";

@Component({
  selector: 'app-other-games',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DecimalPipe
  ],
  templateUrl: './other-games.component.html',
  styleUrl: './other-games.component.scss',
})
export class OtherGamesComponent implements OnInit {
  steamGames: SteamGame[] = [];

  gamesLoaded: boolean = false;

  private videoGameService = inject(VideoGamesService);

  ngOnInit() {
    this.videoGameService.getSteamGames().subscribe({
      next: (data) => {
        this.steamGames = data;
        this.gamesLoaded = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
