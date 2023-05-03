import Link from 'next/link'
import styles from './styles.module.scss'

export default function SupportButton() {
  return (
    <div className={styles.doanteContainer}>
      <Link href="/donate">
        <button>Support</button>
      </Link>
    </div>
  )
}