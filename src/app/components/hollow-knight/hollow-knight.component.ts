import { Component, inject, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { VideoGamesService } from "../../services/video-games.service";
import { HollowKnightProfile } from "../../models/hollow-knight-profile";

@Component({
  selector: 'app-hollow-knight',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './hollow-knight.component.html',
  styleUrl: './hollow-knight.component.scss'
})
export class HollowKnightComponent implements OnInit {
  private videoGamesService = inject(VideoGamesService);

  hollowKnightProfile!: HollowKnightProfile;

  profileLoaded: boolean = false;

  ngOnInit() {
    this.videoGamesService.getHollowKnightProfile().subscribe({
      next: (data) => {
        this.hollowKnightProfile = data;
        this.profileLoaded = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
