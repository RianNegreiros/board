
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import styles from './styles.module.scss'
import Head from 'next/head'
import { getSession } from 'next-auth/client'
import firebase from '@/services/firebaseConnection'

import { PayPalButtons } from '@paypal/react-paypal-js'

import Image from 'next/image'

interface DonatePorps {
  user: {
    name: string
    id: string
    image: string
  }
}

export default function Donate({ user }: DonatePorps) {
  const [vip, setVip] = useState(false)

  async function handleSaveDonate() {
    await firebase.firestore().collection('users')
      .doc(user.id)
      .set({
        donate: true,
        lastDonate: new Date(),
        image: user.image
      })
      .then(() => {
        setVip(true)
      })
  }

  return (
    <>
      <Head>
        <title>Help this project!</title>
      </Head>
      <main className={styles.container}>
        <Image src="/images/rocket.svg" alt="Support this project" />

        {vip && (
          <div className={styles.vip}>
            <Image width={50} height={50} src={user.image} alt="User" />
            <span>Thank you for supporting!</span>
          </div>
        )}

        <h1>Support this project 🏆</h1>
        <h3>With only <span>R$ 1,00</span></h3>
        <strong>Get excluvise fuctionalities.</strong>

        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '1'
                }
              }]
            })
          }}
          onApprove={(data, actions) => {
            return actions.order!.capture().then(function (details) {
              console.log('Success purchase: ' + details.payer.name!.given_name)
              handleSaveDonate()
            })
          }}

        />

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
    name: session?.user?.name,
    id: session?.id,
    image: session?.user?.image
  }

  return {
    props: {
      user
    }
  }
}