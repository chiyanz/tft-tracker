import { SummonerParams,  Summoner, League} from "../types/types"

const apiKey = process.env.NEXT_PUBLIC_API_KEY
const regionMap: any = {
  NA: "na1",
   BR: "br1",
   EU: "europe",
   EUNE: "euw1", 
   EUW: "euw1",
   JP: "jp1",
   KR: "kr",
   LAN: "la1",
   LAS: "la2",
   OCE: "oc1",
   TR: "tr1",
   RU: "ru",
   PH: "ph2",
   SG: "sg2",
   TH: "th2",
   TW: "tw2",
   VN: "vn2",
}

export const GetSummoner = async function(info: SummonerParams): Promise<Summoner> {
  const {name, region}= info as {name: string; region: string}
  const reqStr = `https://${regionMap[region]}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`
  const res = await fetch(reqStr)
  return res.json()
}

export const GetProfileIcon = function(info: number): string {
  return `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${info}.png`
}

export const GetLeague = async function(info: SummonerParams): Promise<League> {
  const {name, region}= info as {name: string; region: string}
  const reqStr = `https://${regionMap[region]}.api.riotgames.com/tft/league/v1/entries/by-summoner/${name}?api_key=${apiKey}`
  const res = await fetch(reqStr)
  return res.json()
}