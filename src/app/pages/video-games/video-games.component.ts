import { Component } from '@angular/core';
import { LeagueOfLegendsComponent } from "../../components/league-of-legends/league-of-legends.component";
import { PokemonComponent } from "../../components/pokemon/pokemon.component";
import { HollowKnightComponent } from "../../components/hollow-knight/hollow-knight.component";
import { OtherGamesComponent } from "../../components/other-games/other-games.component";

@Component({
  selector: 'app-video-games',
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
