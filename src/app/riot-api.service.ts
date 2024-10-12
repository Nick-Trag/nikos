import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RankedStats } from "./rankedStats";

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {
  private baseUrl: string = 'https://eun1.api.riotgames.com';
  private endPointUrl: string = '/lol/league/v4/entries/by-summoner/';
  private encryptedSummonerId = 'Hu8FVOEICrjmBhAhint4ToIf1mSyWwNPiAUK5nuz6ZZ1O6Q'; // The encrypted summoner ID for FNC Nick #EUNE (my account)
  // THIS IS A DEVELOPMENT KEY, THAT STOPS WORKING EVERY 24 HOURS. WHEN LAUNCHING, THE PRODUCTION KEY WILL ONLY EXIST ON THE BACKEND
  private apiKey: string = 'RGAPI-c3a4e1f8-f7bb-493a-a8fe-6e7f2216bf9e';
  private http = inject(HttpClient);
  constructor() { }

  getRankedStats(): Observable<RankedStats[]> {
    return this.http.get<RankedStats[]>(this.baseUrl + this.endPointUrl + this.encryptedSummonerId, {
      params: {
        "api_key": this.apiKey,
      },
    });
  }
}
