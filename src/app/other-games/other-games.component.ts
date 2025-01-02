import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { SteamGame } from "../steam-game";

@Component({
  selector: 'app-other-games',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './other-games.component.html',
  styleUrl: './other-games.component.scss'
})
export class OtherGamesComponent {
  mockGames: SteamGame[] = [
    {
      name: 'The Witcher 3: Wild Hunt',
      hoursPlayed: 178.6,
      appId: 292030,
    },
    {
      name: 'Elden Ring',
      hoursPlayed: 134.4,
      appId: 1245620,
    },
    {
      name: 'Hollow Knight',
      hoursPlayed: 126.4,
      appId: 367520,
    },
    {
      name: 'Hogwarts Legacy',
      hoursPlayed: 100.5,
      appId: 990080,
    },
    {
      name: 'Ruined King: A League of Legends Story™',
      hoursPlayed: 40,
      appId: 1276790,
    },
  ];

}
