import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>TFT Tracker</title>
        <meta name="description" content="TFT player stat tracker using Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          
        </nav>
      </header>
      <main>
        <div>
         <h1>TFT Tracker</h1>
        </div>
      </main>
    </>
  )
}
