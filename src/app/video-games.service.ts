import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { LolProfile } from "./lol-profile";
import { PokemonProfile } from "./pokemon-profile";
import { HollowKnightProfile } from "./hollow-knight-profile";
import { SteamGame } from "./steam-game";

@Injectable({
  providedIn: 'root'
})
export class VideoGamesService {
  private baseUrl: string = 'https://api.nikostragkas.eu';
  private http = inject(HttpClient);

  constructor() { }

  getLolProfile(): Observable<LolProfile> {
    return this.http.get<LolProfile>(this.baseUrl + "/lol-profile");
  }

  getPokemonProfile(): Observable<PokemonProfile> {
    return this.http.get<PokemonProfile>(this.baseUrl + "/pokemon-profile");
  }

  getHollowKnightProfile(): Observable<HollowKnightProfile> {
    return this.http.get<HollowKnightProfile>(this.baseUrl + "/hollow-knight-profile");
  }

  getSteamGames(count?: number): Observable<SteamGame[]> {
    let params = new HttpParams();
    if (count !== undefined) {
      params = params.set("count", count);
    }
    return this.http.get<SteamGame[]>(this.baseUrl + "/steam-games", { params: params });
  }
}
