import { SummonerParams,  Summoner, League} from "../types/types"

const apiKey = process.env.NEXT_PUBLIC_API_KEY
const regionMap: any = {
  na: "na1",
   br: "br1",
   eu: "europe",
   eune: "euw1", 
   euw: "euw1",
   jp: "jp1",
   kr: "kr",
   lan: "la1",
   las: "la2",
   oce: "oc1",
   tr: "tr1",
   ru: "ru",
   ph: "ph2",
   sg: "sg2",
   th: "th2",
   tw: "tw2",
   vn: "vn2",
}

export const GetSummoner = async function(info: SummonerParams): Promise<Summoner> {
  const {name, region} = info as {name: string; region: string}
  const reqStr = `https://${regionMap[region]}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`
  const res = await fetch(reqStr)
  const data = await res.json()
  return data
}

export const GetProfileIcon = function(info: number): string {
  return `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${info}.png`
}

export const GetLeague = async function(info: SummonerParams): Promise<League> {
  const {name, region}= info as {name: string; region: string}
  const reqStr = `https://${regionMap[region]}.api.riotgames.com/tft/league/v1/entries/by-summoner/${name}?api_key=${apiKey}`
  const res = await fetch(reqStr)
  const data = await res.json()
  return data[0]
}