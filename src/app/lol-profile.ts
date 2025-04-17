export interface RankedStats {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number; // TODO: These three might be optional, not sure
  wins: number;
  losses: number;
}

export interface MasteryStats {
  championId: number;
  championLevel: number;
  championPoints: number;
  championName: string;
}

export interface LolProfile {
  gameName: string;
  tagLine: string;
  profileIconId: number;
  summonerLevel: number;
  ranked: RankedStats[];
  mastery: MasteryStats[];
}
