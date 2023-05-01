import { useState, FormEvent } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'

import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'
import { SupportButton } from '@/components/SupportButton'

import firebase from '@/services/firebaseConnection'

interface BoardProps {
  user: {
    id: string
    nome: string
  }
}

export default function Board({ user }: BoardProps) {
  const [input, setInput] = useState('')

  async function handleAddTask(e: FormEvent) {
    e.preventDefault()

    if (input === '') {
      alert('Type a task')
      return
    }

    await firebase.firestore().collection('tasks')
      .add({
        created: new Date(),
        tarefa: input,
        userId: user.id,
        nome: user.nome
      })
      .then((doc) => {
        console.log('Success: ', doc)
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }

  return (
    <>
      <Head>
        <title>My tasks - Board</title>
      </Head>
      <main className={styles.container}>
        <form onSubmit={handleAddTask} >
          <input
            type="text"
            placeholder="Type a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <FiPlus size={25} color="#17181f" />
          </button>
        </form>

        <h1>You have 2 tasks</h1>

        <section>
          <article className={styles.taskList}>
            <p>Learn</p>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color="#FFB800" />
                  <time>July 17 2021</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="#FFF" />
                  <span>Edit</span>
                </button>
              </div>

              <button>
                <FiTrash size={20} color="#FF3636" />
                <span>Delete</span>
              </button>
            </div>
          </article>
        </section>

      </main>

      <div className={styles.vipContainer}>
        <h3>Thank you for supporting</h3>
        <div>
          <FiClock size={28} color="#FFF" />
          <time>
            Last donation 3 days ago
          </time>
        </div>
      </div>

      <SupportButton />

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
    nome: session?.user!.name,
    id: session?.id
  }

  return {
    props: {
      user
    }
  }
}
