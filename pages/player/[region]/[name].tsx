import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { Summoner, SummonerParams, PlayerInfo, League } from '../../../types/types' 
import { GetProfileIcon } from '../../../utils/methods'
import styles from '../../../styles/Profile.module.scss'
import { convertToObject } from 'typescript'


// import { useRouter } from 'next/router'
const endpoint = 'http://localhost:3000/api/profile'
const importAll = function(r: __WebpackModuleApi.RequireContext) {
  let images: {[key: string]: any} = {}
  r.keys().forEach((item, index) => { 
    images[item.replace('./', '')] = r(item) 
  })
	return images
} 
	
 const rankedImages = importAll(require.context('../../../assets/ranked-emblems/', false, /\.\/.*\.(png|jpe?g|svg)$/))
//  const tftImages = importAll(require.context('../../../assets/TFT_Assets', false, /\.(png|jpe?g|svg)$/))

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  let {name, region}= query as {name: string; region: string}
  name = name.toLowerCase()
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
  const placementHistory = data.placements
  const stats = data.stats
  console.log(placementHistory)
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
        <>
          <p className='text-base'>{ranked.tier} {ranked.rank}</p>
          <img src={rankedImages[`${ranked.tier}.png`].default.src} alt={`${ranked.tier} emblem`} height={80} width={80}/>
        </>
      )
    }
  }

  const placementsDisplay = placementHistory.map((place) => {
          return <div className={styles.place}>{place}</div>
    })

  return (
    <>
      <div className={styles['side-bar']}>
        <img className={styles.pfp} src={pfpLink} alt='player profile icon'></img>
        <h1 className='text-xl'>{name}</h1>
        <h3 className='text-base'>Level: {summonerLevel}</h3>
        {rankInfo(ranked)}
      </div>
      <div className={styles.stats}>
        {placementHistory && 
        <div>
          <div className='text-lg'>
            Recent 20 Matches
          </div>
          <div className={styles.matchhistory}>
            {placementsDisplay}
          </div>
        </div>}
        {stats && 
        <div className={styles.matchstats}>
          <div className='m-4'>
            <p>{stats.avg.toFixed(2)}</p>
            <p>Avg</p>
          </div>
          <div className='m-4'>
            <p>{stats.top4}</p>
            <p>Top 4</p>
          </div>
          <div className='m-4'>
            <p>{stats.won}</p>
            <p>Won</p>
          </div>
        </div>}
        
      </div>
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
  
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   return context
// };