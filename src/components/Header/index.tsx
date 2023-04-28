import Link from 'next/link'
import styles from './styles.module.scss'

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <img src="/images/logo.svg" alt="logo" />
        </Link>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/board">
          <a>My Board</a>
        </Link>

        <button>
          Sign In With Github
        </button>
      </div>
    </header>
  )
}