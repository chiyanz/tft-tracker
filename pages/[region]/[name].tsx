import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { GetSummoner } from '../../types/types' 
// import { useRouter } from 'next/router'


export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {name, region}= query as {name: string; region: string}
  const data: GetSummoner = {name, region}
  
  return {
    props: {
      data
    }
  }
}


export default function Player({ data }: {data: GetSummoner}) {
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