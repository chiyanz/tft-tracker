import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { SummonerParams } from '../../../types/types' 
// import { useRouter } from 'next/router'

const endpoint = 'http://localhost:3000/api/profile'
export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {name, region}= query as {name: string; region: string}
  const data: SummonerParams = {name, region}
  
  return {
    props: {
      data
    }
  }
}


export default function Player({ data }: {data: SummonerParams}) {
  const { name, region } = data

  return (
    <>
      <h1>Summoner Name: {name} from: {region}</h1>
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
  
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   return context
// };