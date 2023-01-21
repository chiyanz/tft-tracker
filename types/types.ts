// summoner info
export interface Summoner {
  id:            string;
  accountId:     string;
  puuid:         string;
  name:          string;
  profileIconId: number;
  revisionDate:  number;
  summonerLevel: number;
}

export interface SummonerParams {
  name: string;
  region: string;
}

export interface MatchHistoryIds {
  matchHistory: string[];
}

export interface MatchHistory {
  matchHistory: MatchInfo[];
}

export interface MatchHistoryParams {
  puuid: string;
  result: MatchHistory;
}

// league interface and required info
export interface League {
  leagueId:     string;
  queueType:    string;
  tier:         string;
  rank:         string;
  summonerId:   string;
  summonerName: string;
  leaguePoints: number;
  wins:         number;
  losses:       number;
  veteran:      boolean;
  inactive:     boolean;
  freshBlood:   boolean;
  hotStreak:    boolean;
}

export interface PlayerInfo {
  summoner: Summoner;
  league: League;
}


// match info
export interface MatchInfo {
  metadata: Metadata;
  info:     Info;
}

export interface Info {
  game_datetime:     number;
  game_length:       number;
  game_version:      string;
  participants:      Participant[];
  queue_id:          number;
  tft_game_type:     string;
  tft_set_core_name: string;
  tft_set_number:    number;
}

export interface Participant {
  augments:                string[];
  companion:               Companion;
  gold_left:               number;
  last_round:              number;
  level:                   number;
  placement:               number;
  players_eliminated:      number;
  puuid:                   string;
  time_eliminated:         number;
  total_damage_to_players: number;
  traits:                  Trait[];
  units:                   Unit[];
}

export interface Companion {
  content_ID: string;
  item_ID:    number;
  skin_ID:    number;
  species:    string;
}

export interface Trait {
  name:         string;
  num_units:    number;
  style:        number;
  tier_current: number;
  tier_total:   number;
}

export interface Unit {
  character_id: string;
  itemNames:    string[];
  items:        number[];
  name:         string;
  rarity:       number;
  tier:         number;
}

export interface Metadata {
  data_version: string;
  match_id:     string;
  participants: string[];
}

