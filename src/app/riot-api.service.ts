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
  private apiKey: string = 'RGAPI-e74a0e0f-1cc3-4ded-85cd-c4c33ddb5480';
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
