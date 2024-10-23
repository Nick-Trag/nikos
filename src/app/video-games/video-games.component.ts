import { Component } from '@angular/core';
import { LeagueOfLegendsComponent } from "../league-of-legends/league-of-legends.component";
import { PokemonComponent } from "../pokemon/pokemon.component";
import { HollowKnightComponent } from "../hollow-knight/hollow-knight.component";
import { OtherGamesComponent } from "../other-games/other-games.component";

@Component({
  selector: 'app-video-games',
  standalone: true,
  imports: [
    LeagueOfLegendsComponent,
    PokemonComponent,
    HollowKnightComponent,
    OtherGamesComponent
  ],
  templateUrl: './video-games.component.html',
  styleUrl: './video-games.component.scss'
})
export class VideoGamesComponent {

}
