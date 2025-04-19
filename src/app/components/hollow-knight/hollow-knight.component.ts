import { Component, inject, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { VideoGamesService } from "../../services/video-games.service";
import { HollowKnightProfile } from "../../models/hollow-knight-profile";
import { transition, trigger, useAnimation } from "@angular/animations";
import { videoGamesAnimation } from "../../animations/video-games.animation";

@Component({
  selector: 'app-hollow-knight',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './hollow-knight.component.html',
  styleUrl: './hollow-knight.component.scss',
  animations: [
    trigger('dropIn', [
      transition(':enter', [
        useAnimation(videoGamesAnimation),
      ]),
    ]),
  ],
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
