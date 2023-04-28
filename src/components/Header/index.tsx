import Link from 'next/link'
import styles from './styles.module.scss'
import SignInButton from '@/components/SignInButton'

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

        <SignInButton />
      </div>
    </header>
  )
}