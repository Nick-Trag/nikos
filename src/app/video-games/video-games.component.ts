import { Component, OnInit } from '@angular/core';

const tierImages = new Map([
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

@Component({
  selector: 'app-video-games',
  standalone: true,
  imports: [],
  templateUrl: './video-games.component.html',
  styleUrl: './video-games.component.scss'
})
export class VideoGamesComponent implements OnInit {
  season2024rank = 'EMERALD';

  ngOnInit(): void {

  }
}
