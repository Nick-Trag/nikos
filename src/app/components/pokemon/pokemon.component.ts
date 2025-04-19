import { Component, inject, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { VideoGamesService } from "../../services/video-games.service";
import { PokemonProfile } from "../../models/pokemon-profile";
import { transition, trigger, useAnimation } from "@angular/animations";
import { videoGamesAnimation } from "../../animations/video-games.animation";

@Component({
  selector: 'app-pokemon',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
  animations: [
    trigger('dropIn', [
      transition(':enter', [
        useAnimation(videoGamesAnimation),
      ]),
    ]),
  ],
})
export class PokemonComponent implements OnInit {
  private videoGamesService = inject(VideoGamesService);

  pokemonProfile!: PokemonProfile;

  profileLoaded: boolean = false;

  ngOnInit() {
    this.videoGamesService.getPokemonProfile().subscribe({
      next: (data) => {
        this.pokemonProfile = data;
        this.profileLoaded = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
