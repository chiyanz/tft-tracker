// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Summoner, GetSummoner, MatchHistory, GetMatchHistory } from "../../../types/types" 
type Data = {
  name: string
}

const regionMap = {
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const summonerName = req.query.player
  const region = req.query.region
  res.status(200).json({ name: 'John Doe' })
}
