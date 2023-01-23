// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Summoner, SummonerParams, MatchHistory, MatchHistoryParams, MatchHistoryIds, MatchInfo, Participant } from "../../../types/types" 
import { GetLeague, GetMatchHistoryIds, GetMatchHistory, GetProfileIcon, GetSummoner } from '../../../utils/methods'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {name, region} = req.body as {name: string, region: string}
  const sumRes = await GetSummoner({name, region})  /* 
    contains the following info:
    id:            string;
    accountId:     string;
    puuid:         string;
    name:          string;
    profileIconId: number;
    revisionDate:  number;
    summonerLevel: number;
   */
  const leagueRes = await GetLeague({name: sumRes.id, region})
  const recentMatchIds = await GetMatchHistoryIds(region, sumRes.puuid)
  const matchPromises = recentMatchIds.map(async (matchId) => {
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

  res.json({summoner: sumRes, league: leagueRes, placements: placeHistory})
}
