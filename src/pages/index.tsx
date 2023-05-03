import Head from 'next/head'
import styles from '@/styles/styles.module.scss'
import { GetStaticProps } from 'next'

import firebase from '@/services/firebaseConnection'
import { useState } from 'react'
import Image from 'next/image'

type Data = {
  id: string
  donate: boolean
  lastDonate: Date
  image: string
}

interface HomeProps {
  data: string
}

export default function Home({ data }: HomeProps) {
  const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data))

  return (
    <>
      <Head>
        <title>Organize your life</title>
        <meta name="description" content="A tool for your everyday life Write, plan and organize yourself" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.contentContainer}>

        <Image src="/images/board-user.svg" width={553} height={384} alt="hero" />

        <section className={styles.callToAction}>
          <h1>A tool for your everyday life. Write, plan and organize yourself...</h1>
          <p>
            <span>100% free</span>
          </p>
        </section>

        {donaters.length !== 0 && <h3>Donaters:</h3>}
        <div className={styles.donaters}>
          {donaters.map(item => (
            <Image key={item.image} src={item.image} alt="user" />
          ))}
        </div>

      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const donaters = await firebase.firestore().collection('users').get()

  const data = JSON.stringify(donaters.docs.map(u => {
    return {
      id: u.id,
      ...u.data(),
    }
  }))

  return {
    props: {
      data
    },
    revalidate: 60 * 60
  }
}
