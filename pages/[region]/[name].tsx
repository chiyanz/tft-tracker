import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'


export default function Player() {
  const router = useRouter()
  const name = router.query.name as string
  const region = router.query.region as string

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