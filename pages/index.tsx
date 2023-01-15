import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const inter = Inter({ subsets: ['latin'] })
const regions: string[] = ['NA', "EU", "EUNE", "EUW", "JP", "KR", "LAN", "LAS", "OCE", "TR", "RU", "PH", "SG", "TH"
, "TW", "VN"]

export default function Home() {
  return (
    <>
      <main>
        <div className={styles['input-form']}>
            <Dropdown className={styles['region-select']} options={regions} onChange={() => {}} value={regions[0]} placeholder="Select an option" />
            <input className={styles['name-input']}/>
        </div>
      </main>
    </>
  )
}
