// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Summoner, SummonerParams, MatchHistory, MatchHistoryParams, MatchHistoryIds, MatchInfo, Participant } from "../../../types/types" 
import { GetLeague, GetMatchHistoryIds, GetMatchHistory, GetProfileIcon, GetSummoner } from '../../../utils/methods'

const delay = (ms : number) => new Promise(res => setTimeout(res, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const { name, region } = req.body as { name: string; region: string };
  console.log(`Received info: ${name}, ${region}`);
  const sumRes = await GetSummoner({ name, region });
  /* 
    contains the following info:
    id:            string;
    accountId:     string;
    puuid:         string;
    name:          string;
    profileIconId: number;
    revisionDate:  number;
    summonerLevel: number;
   */
  const leagueRes = await GetLeague({ name: sumRes.id, region });
  const recentMatchIds = await GetMatchHistoryIds(region, sumRes.puuid);
  console.log("matchids:", recentMatchIds);
  const matchPromises = recentMatchIds.map(async (matchId) => {
    await delay(1000)
    return GetMatchHistory(region, matchId)
  })
  const recentMatches : MatchHistory = await Promise.all(matchPromises)
    /*
    match history info:
     win/lose ratio and count 
   */
  let placeHistory: number[] = [];
  recentMatches.forEach((matchInfo) => {
    if(!matchInfo.info) {
      console.log('matchinfo undefined')
      console.log(matchInfo.metadata)
    }
    const {participants} = matchInfo.info
    participants.forEach((participant: Participant) => {
      // if it is current player
      if(participant.puuid === sumRes.puuid) {
        placeHistory.push(participant.placement)
      }
    })
  })

  let avg = 0, top4 = 0, won = 0
  for(const place of placeHistory) {
    avg += place
    if(place <= 4) {
      top4 += 1
      if(place === 1) {
        won += 1
      }
    }
  }
  // calculate stats from past 20 games
  const pastStats = {
    avg: avg / placeHistory.length,
    top4,
    won,
  }



  res.json({summoner: sumRes, league: leagueRes, placements: placeHistory, stats: pastStats})
}
