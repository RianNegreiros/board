import { useState, FormEvent } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import Link from 'next/link'

import styles from './styles.module.scss'
import { FiX, FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'
import { SupportButton } from '@/components/SupportButton'
import { format } from 'date-fns'

import firebase from '@/services/firebaseConnection'


type TaskList = {
  id: string
  created: string | Date
  createdFormated?: string
  task: string
  userId: string
  name: string
}

interface BoardProps {
  user: {
    id: string
    name: string
  }
  data: string
}

export default function Board({ user, data }: BoardProps) {
  const [input, setInput] = useState('')
  const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data))

  const [taskEdit, setTaskEdit] = useState<TaskList | null>(null)

  async function handleAddTask(e: FormEvent) {
    e.preventDefault()

    if (input === '') {
      alert('Type a task!')
      return
    }

    if (taskEdit) {

      await firebase.firestore().collection('tasks')
        .doc(taskEdit.id)
        .update({
          task: input
        })
        .then(() => {
          let data = taskList
          let taskIndex = taskList.findIndex(item => item.id === taskEdit.id)
          data[taskIndex].task = input

          setTaskList(data)
          setTaskEdit(null)
          setInput('')

        })

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
        console.log(err)
      })

  }


  async function handleDelete(id: string) {

    await firebase.firestore().collection('tasks').doc(id)
      .delete()
      .then(() => {
        let taskDeleted = taskList.filter(item => {
          return (item.id !== id)
        })

        setTaskList(taskDeleted)

      })
      .catch((err) => {
        console.log(err)
      })

  }


  function handleEditTask(task: TaskList) {
    setTaskEdit(task)
    setInput(task.task)
  }

  function handleCancelEdit() {
    setInput('')
    setTaskEdit(null)
  }

  return (
    <>
      <Head>
        <title>My tasks - Board</title>
      </Head>
      <main className={styles.container}>

        {taskEdit && (
          <span className={styles.warnText}>
            <button onClick={handleCancelEdit}>
              <FiX size={30} color="#FF3636" />
            </button>
            You are editing a task!
          </span>
        )}


        <form onSubmit={handleAddTask} >
          <input
            type="text"
            placeholder="Type a task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <FiPlus size={25} color="#17181f" />
          </button>
        </form>

        <h1>You have {taskList.length} {taskList.length === 1 ? 'task' : 'tasks'}!</h1>

        <section>
          {taskList.map(task => (
            <article key={task.id} className={styles.taskList}>
              <Link href={`/board/${task.id}`}>
                <p>{task.task}</p>
              </Link>
              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color="#FFB800" />
                    <time>{task.createdFormated}</time>
                  </div>
                  <button onClick={() => handleEditTask(task)} >
                    <FiEdit2 size={20} color="#FFF" />
                    <span>Edit</span>
                  </button>
                </div>

                <button onClick={() => handleDelete(task.id)}>
                  <FiTrash size={20} color="#FF3636" />
                  <span>Delete</span>
                </button>
              </div>
            </article>
          ))}
        </section>

      </main>

      <div className={styles.vipContainer}>
        <h3>Thank you for supporting this project.</h3>
        <div>
          <FiClock size={28} color="#FFF" />
          <time>
            Last donation was 3 days ago
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

  const tasks = await firebase.firestore().collection('tasks')
    .where('userId', '==', session?.id)
    .orderBy('created', 'asc').get()

  const data = JSON.stringify(tasks.docs.map(u => {
    return {
      id: u.id,
      createdFormated: format(u.data().created.toDate(), 'dd MMMM yyyy'),
      ...u.data(),
    }
  }))

  const user = {
    name: session?.user!.name,
    id: session?.id
  }

  return {
    props: {
      user,
      data
    }
  }

}
