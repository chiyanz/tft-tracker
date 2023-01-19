import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { Summoner, SummonerParams, PlayerInfo, League } from '../../../types/types' 
import { GetProfileIcon } from '../../../utils/methods'
import styles from '../../../styles/Profile.module.scss'
// import { useRouter } from 'next/router'

const endpoint = 'http://localhost:3000/api/profile'

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {name, region}= query as {name: string; region: string}
  const info: SummonerParams = {name, region}
  const response = await fetch(endpoint, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(info) // body data type must match "Content-Type" header
  })
  const data = await response.json()
  return {
    props: {
      data
    }
  }
}


export default function Player({ data }: {data: PlayerInfo}) {
  const { name,  summonerLevel, profileIconId} = data.summoner
  const ranked = data.league ?? null
  const pfpLink = GetProfileIcon(profileIconId)

  const rankInfo = function(ranked: League) {
    // if player is unranked
    if(!ranked) {
      return (
        <>
        <p>Unranked</p>
        </>
      )
    }
    else {
      return (
        <p>{ranked.tier} {ranked.rank}</p>
      )
    }
  }

  return (
    <>
      <div className={styles['side-bar']}>
        <img className={styles.pfp} src={pfpLink} alt='player profile icon'></img>
        <h1>{name}</h1>
        <h3>Level: {summonerLevel}</h3>
        {rankInfo(ranked)}
      </div>
      <></>
      
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
  
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   return context
// };