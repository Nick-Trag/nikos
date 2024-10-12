import { Component, inject, OnInit } from '@angular/core';
import { RiotApiService } from "../riot-api.service";
import { RankedStats } from "../rankedStats";

const tierImages: Map<string, string> = new Map([
  ['IRON', 'Rank=Iron.png'],
  ['BRONZE', 'Rank=Bronze.png'],
  ['SILVER', 'Rank=Silver.png'],
  ['GOLD', 'Rank=Gold.png'],
  ['PLATINUM', 'Rank=Platinum.png'],
  ['DIAMOND', 'Rank=Diamond.png'],
  ['MASTER', 'Rank=Master.png'],
  ['GRANDMASTER', 'Rank=Grandmaster.png'],
  ['CHALLENGER', 'Rank=Challenger.png'],
]);

const tierOrder: Map<string, number> = new Map([
  ['IRON', 0],
  ['BRONZE', 1],
  ['SILVER', 2],
  ['GOLD', 3],
  ['PLATINUM', 4],
  ['EMERALD', 5],
  ['DIAMOND', 6],
  ['MASTER', 7],
  ['GRANDMASTER', 8],
  ['CHALLENGER', 9],
]);

@Component({
  selector: 'app-video-games',
  standalone: true,
  imports: [],
  templateUrl: './video-games.component.html',
  styleUrl: './video-games.component.scss'
})
export class VideoGamesComponent implements OnInit {
  season2024tier = 'EMERALD';
  maxTier: number = tierOrder.get(this.season2024tier)!;
  private riotApiService = inject(RiotApiService);

  ngOnInit(): void {
    this.riotApiService.getRankedStats().subscribe({
      next: (data: RankedStats[]) => {
        for (let queueStats of data) {
          console.log(queueStats);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
