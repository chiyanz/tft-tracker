import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { Summoner, SummonerParams } from '../../../types/types' 
// import { useRouter } from 'next/router'

const endpoint = 'http://localhost:3000/api/profile'

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {name, region}= query as {name: string; region: string}
  const info: SummonerParams = {name, region}
  const response = await fetch(endpoint, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
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


export default function Player({ data }: {data: Summoner}) {
  const { name,  summonerLevel} = data

  return (
    <>
      <h1>Summoner Name: {name} Level: {summonerLevel}</h1>
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
  
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   return context
// };