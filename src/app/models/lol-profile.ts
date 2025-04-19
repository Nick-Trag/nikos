export interface RankedStats {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

export interface MasteryStats {
  championId: number;
  championLevel: number;
  championPoints: number;
  championName: string | null; // Should pretty much never be null, but it is technically possible
}

export interface LolProfile {
  gameName: string;
  tagLine: string;
  profileIconId: number;
  summonerLevel: number;
  ranked: RankedStats[];
  mastery: MasteryStats[];
}
