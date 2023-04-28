import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export default function SignInButton() {

  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <button
    type="button"
    className={styles.signInButton}
    onClick={() => { }}
  >
    <img src='https://placehold.co/150x150' alt="User photo" />
    Hi, User
    <FiX color="#737380" className={styles.closeIcon} />
  </button>
  ) : (
    <button
    type="button"
    className={styles.signInButton}
    onClick={() => { }}
  >
    <FaGithub color="#ffb800" />
    Sign In With Github
  </button>
  )
}