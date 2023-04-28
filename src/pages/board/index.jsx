import Head from 'next/head';
import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'
import { SupportButton } from '../../components/SupportButton';

export default function Board() {
  return (
    <>
      <Head>
        <title>My tasks - Board</title>
      </Head>
      <main className={styles.container}>
        <form>
          <input
            type="text"
            placeholder="Type your task here"
          />
          <button type="submit">
            <FiPlus size={25} color="#17181f" />
          </button>
        </form>

        <h1>You got 2 tasks</h1>

        <section>
          <article className={styles.taskList}>
            <p>Learn Next.Js</p>
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
        <h3>Thank you for supoorting this project.</h3>
        <div>
          <FiClock size={28} color="#FFF" />
          <time>
            Last donation on <strong>July 17 2021</strong>
          </time>
        </div>
      </div>

      <SupportButton />
    </>
  )
}