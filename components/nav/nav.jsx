import styles from './nav.module.css'
import Link from 'next/link'

export default function Nav(){
    return(
        <div className={styles.nav}>
            <div className={styles.nav__companyName}><Link href="/">Food Recordy</Link></div>
            <div className={styles.nav__user}>
                <div className={styles.nav__signIn}>EDIT YOUR COLLECTION</div>
                <div className={styles.nav__signUp}>BECOME A COLLECTOR</div>
            </div>
        </div>
    )
}