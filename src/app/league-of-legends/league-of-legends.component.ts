import { Component, inject, OnInit } from '@angular/core';
import { NgOptimizedImage, TitleCasePipe } from "@angular/common";
import { VideoGamesService } from "../video-games.service";
import { RankedStats } from "../rankedStats";

const tierImages: Map<string, string> = new Map([
  ['IRON', 'Rank=Iron.png'],
  ['BRONZE', 'Rank=Bronze.png'],
  ['SILVER', 'Rank=Silver.png'],
  ['GOLD', 'Rank=Gold.png'],
  ['PLATINUM', 'Rank=Platinum.png'],
  ['EMERALD', 'Rank=Emerald.png'],
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

interface TierRankAndLp {
  tier: string;
  rank: string;
  lp: number;
}

@Component({
  selector: 'app-league-of-legends',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TitleCasePipe
  ],
  templateUrl: './league-of-legends.component.html',
  styleUrl: './league-of-legends.component.scss'
})
export class LeagueOfLegendsComponent implements OnInit {
  season2024tier = 'EMERALD';

  maxTier = this.season2024tier;
  maxTierNumber: number = tierOrder.get(this.season2024tier)!;
  maxTierImageUrl = '';

  currentFlexRanking: TierRankAndLp | null = null;
  currentSoloRanking: TierRankAndLp | null = null;
  currentFlexImageUrl: string = '';
  currentSoloImageUrl: string = '';

  favoriteChampions: string[] = [ // TODO: Dynamic
    'Xayah',
    'Ezreal',
    'Ahri',
    'Senna',
    'Jinx',
  ];

  private videoGamesService = inject(VideoGamesService);

  statsLoaded: boolean = false;

  ngOnInit(): void {
    this.videoGamesService.getRankedStats().subscribe({
      next: (data: RankedStats[]) => {
        for (let queueStats of data) {
          // get the tier for every queue (solo/duo, flex) and check if it is higher than my highest past tier
          const queueTier = queueStats.tier;
          const queueTierRanking = tierOrder.get(queueTier);
          if (queueTierRanking !== undefined && queueTierRanking > this.maxTierNumber) {
            this.maxTierNumber = queueTierRanking;
            this.maxTier = queueTier;
          }

          // save the stats for solo and flex
          if (queueStats.queueType.includes('FLEX')) { // currently is 'RANKED_FLEX_SR', but Riot often changes the name without documenting, so I'll just be safe and not check the exact value
            this.currentFlexRanking = {
              tier: queueStats.tier,
              rank: queueStats.rank,
              lp: queueStats.leaguePoints,
            };
          }
          else if (queueStats.queueType.includes('SOLO')) { // currently 'RANKED_SOLO_5x5'
            this.currentSoloRanking = {
              tier: queueStats.tier,
              rank: queueStats.rank,
              lp: queueStats.leaguePoints,
            };
          }
        }

        this.maxTierImageUrl = 'images/ranked_emblems_2024/' + tierImages.get(this.maxTier)!;
        if (this.currentSoloRanking !== null) {
          const imageUrl = tierImages.get(this.currentSoloRanking.tier);
          if (imageUrl !== undefined) {
            this.currentSoloImageUrl = 'images/ranked_emblems_2024/' + imageUrl;
          }
        }
        if (this.currentFlexRanking !== null) {
          const imageUrl = tierImages.get(this.currentFlexRanking.tier);
          if (imageUrl !== undefined) {
            this.currentFlexImageUrl = 'images/ranked_emblems_2024/' + imageUrl;
          }
        }
        this.statsLoaded = true;
      },
      error: (err) => {
        this.maxTierImageUrl = 'images/ranked_emblems_2024/' + tierImages.get(this.season2024tier)!; // Fallback to default (emerald)
        this.statsLoaded = true;
        console.log(err);
      },
    });
  }
}
