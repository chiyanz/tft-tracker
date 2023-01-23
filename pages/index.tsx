import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import {useState, MouseEvent} from 'react'
import {useRouter} from 'next/router'

const inter = Inter({ subsets: ['latin'] })
const regions: string[] = ['NA', "EU", "EUNE", "EUW", "JP", "KR", "LAN", "LAS", "OCE", "TR", "RU", "PH", "SG", "TH"
, "TW", "VN"]


export default function Home() {
  const router = useRouter()
  const [region, setRegion] = useState("NA")
  const [summonerName, setSummonerName] = useState("")

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    console.log(`submitted with region:${region} and summoner name ${summonerName}`)
    router.push(`player/${region.toLowerCase()}/${summonerName}`)
  }

  return (
    <>
      <main>
        <div className={styles['input-form']}>
            <Dropdown className={styles['region-select']} options={regions} onChange={(val) => {setRegion(val.value)}} value={regions[0]} placeholder="Select an option" />
            <input className={styles['name-input']} onChange={(val) => {setSummonerName(val.currentTarget.value)}}/>
            <button className={styles['submit-btn']} type='submit' onClick={onSubmit}>SEARCH</button>
        </div>
      </main>
    </>
  )
}
