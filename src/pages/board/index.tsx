import { useState, FormEvent } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import Link from 'next/link'

import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'
import { SupportButton } from '@/components/SupportButton'
import { format } from 'date-fns'

import firebase from '@/services/firebaseConnection'

type Task = {
  id: string
  created: Date
  createdFormated: string
  task: string
  userId: string
  name: string
}

interface BoardProps {
  user: {
    id: string
    name: string
  }
}

export default function Board({ user }: BoardProps) {
  const [input, setInput] = useState('')
  const [taskList, setTaskList] = useState<Task[]>([])

  async function handleAddTask(e: FormEvent) {
    e.preventDefault()

    if (input === '') {
      alert('Type something!')
      return
    }

    await firebase.firestore().collection('tasks')
      .add({
        created: new Date(),
        task: input,
        userId: user.id,
        name: user.name
      })
      .then((doc) => {
        console.log('SUCCESS: ', doc)
        let data = {
          id: doc.id,
          created: new Date(),
          createdFormated: format(new Date(), 'dd MMMM yyyy'),
          task: input,
          userId: user.id,
          name: user.name
        }

        setTaskList([...taskList, data])
        setInput('')

      })
      .catch((err) => {
        console.log('ERROR: ', err)
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
            placeholder="Type your task here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <FiPlus size={25} color="#17181f" />
          </button>
        </form>

        <h1>You have 2 tasks!</h1>

        <section>
          {taskList.map(task => (
            <article className={styles.taskList}>
              <Link href={`/board/${task.id}`}>
                <p>{task.task}</p>
              </Link>
              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color="#FFB800" />
                    <time>{task.createdFormated}</time>
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
          ))}
        </section>

      </main>

      <div className={styles.vipContainer}>
        <h3>Thank you for supporting this project</h3>
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
    name: session?.user!.name,
    id: session?.id
  }

  return {
    props: {
      user
    }
  }
}
