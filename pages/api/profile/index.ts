// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Summoner, SummonerParams, MatchHistory, MatchHistoryParams } from "../../../types/types" 
import { GetLeague, GetProfileIcon, GetSummoner } from '../../../utils/methods'
type Data = {
  name: string
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = "CleMiroh"
  const region = "NA"
  const sumRes = await GetSummoner({name, region})
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

  const leagueRes = await GetLeague({name: sumRes.id, region})
  console.log(GetProfileIcon(sumRes.profileIconId))
  res.send(leagueRes)
}
