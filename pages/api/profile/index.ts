// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Summoner, SummonerParams, MatchHistory, MatchHistoryParams } from "../../../types/types" 
import { GetSummoner } from '../../../utils/methods'
type Data = {
  name: string
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const name = "CleMiroh"
  const region = "NA"
  const sumRes = await GetSummoner({name, region})
  res.send(sumRes)
}
