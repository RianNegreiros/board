
import styles from './styles.module.scss'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'


interface DonatePorps {
  user: {
    nome: string
    id: string
    image: string
  }
}

export default function Donate({ user }: DonatePorps) {
  return (
    <>
      <Head>
        <title>Help this project with $1,00 donation</title>
      </Head>
      <main className={styles.container}>
        <img src="/images/rocket.svg" alt="Support this project" />

        <div className={styles.vip}>
          <img src={user.image} alt="User profile image" />
          <span>Thank you for supporting this project</span>
        </div>

        <h1>Support this project 🏆</h1>
        <h3>Support with only: <span>$ 1,00</span></h3>
        <strong>Get exclusive fuctionalities</strong>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const user = {
    nome: session?.user?.name,
    id: session?.id,
    image: session?.user?.image
  }

  return {
    props: {
      user
    }
  }
}