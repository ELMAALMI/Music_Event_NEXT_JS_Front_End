import Link from 'next/link'
import styles from '@/styles/DashEvent.module.css'

export default function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>
          <a>{evt.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`}>
        <a className={styles.edit}>
          <i className='fa fa-edit'></i> <span>Edit Event</span>
        </a>
      </Link>
      <a
        href='#'
        className={styles.delete}
        onClick={() => handleDelete(evt.id)}
      >
        <i className="fa fa-trash"></i> <span>Delete</span>
      </a>
    </div>
  )
}