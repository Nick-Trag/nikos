import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LolProfile } from "./lol-profile";

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
}
