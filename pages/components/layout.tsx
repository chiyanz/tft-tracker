import React from "react";
import styles from "../../styles/Layout.module.scss"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <nav>
        <li className={styles['nav-link']}>Home</li>
      </nav>
      <div className={styles.content}>
        {children}
      </div>
      <footer className={styles.footer}>
        TFT Tracker is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc
      </footer>
    </div>
  );
}