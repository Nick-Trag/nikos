import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { VideoGamesService } from "../../services/video-games.service";
import { PokemonProfile } from "../../models/pokemon-profile";

@Component({
  selector: 'app-pokemon',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './pokemon.component.scss',
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
