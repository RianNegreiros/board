import { signIn, signOut, useSession } from 'next-auth/client'

import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import Image from 'next/image'

export default function SignInButton() {
  const [session] = useSession()

  const userImage = session?.user?.image ? session.user.image : 'https://avatars.githubusercontent.com/u/59899998?v=4'

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <Image src={userImage} alt="user" width={35} height={35} />
      Hi, {session.user?.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#FFB800" />
      Sign in with Github
    </button>
  )
}