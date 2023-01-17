import React from "react";
import styles from "../styles/Layout.module.scss"
import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>TFT Tracker</title>
        <meta name="description" content="TFT player stat tracker using Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <nav className={styles['nav-bar']}>
          <Link href="/" className={styles['nav-link']}>HOME</Link>
        </nav>
        <div className={styles.content}>
          {children}
        </div>
        <footer className={styles.footer}>
          <p>TFT Tracker is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc</p>

        </footer>
      </div>
    </>
  );
}