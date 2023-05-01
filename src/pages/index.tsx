import Head from 'next/head'

import styles from '@/styles/styles.module.scss'
import { GetStaticProps } from 'next'

export default function Home() {
  return (
    <>
      <Head>
        <title>Organize your life</title>
        <meta name="description" content="A tool for your everyday life Write, plan and organize yourself" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.contentContainer}>

        <img src="/images/board-user.svg" alt="hero" />

        <section className={styles.callToAction}>
          <h1>A tool for your everyday life. Write, plan and organize yourself...</h1>
          <p>
            <span>100% free</span>
          </p>
        </section>

        <div className={styles.donaters}>
          <img src='https://placehold.co/150x150' alt="User photo" />
          <img src='https://placehold.co/150x150' alt="User photo" />
          <img src='https://placehold.co/150x150' alt="User photo" />
          <img src='https://placehold.co/150x150' alt="User photo" />
          <img src='https://placehold.co/150x150' alt="User photo" />
        </div>

      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }

}
