import Link from 'next/link'
import styles from './styles.module.scss'
import SignInButton from '@/components/SignInButton'
import Image from 'next/image'

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/" legacyBehavior>
          <Image src="/images/logo.svg" width={72} height={76} alt="logo" />
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