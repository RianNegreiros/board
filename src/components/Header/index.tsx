import Link from 'next/link'
import styles from './styles.module.scss'

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/" legacyBehavior>
          <img src="/images/logo.svg" alt="logo" />
        </Link>

        <nav>
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
          <Link href="/board" legacyBehavior>
            <a>My Board</a>
          </Link>
        </nav>

        <button>
          Sign In With Github
        </button>
      </div>
    </header>
  )
}