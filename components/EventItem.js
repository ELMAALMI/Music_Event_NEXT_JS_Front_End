import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/EventItem.module.css'
const EventItem = ({evt}) => {
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                {
                    evt.image && (
                        <Image
                        src={`${evt.image.url}`}
                        width={170}
                        height={100}
                        />
                    )
                }
            </div>
            <div className={styles.info}>
                <span>
                { new Date(evt.date).toLocaleDateString('en-US') } at {evt.time}
                </span>
                <h3>{evt.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`/events/${evt.id}`}>
                <a className='btn'> <i className="fa fa-info-circle"></i> Details</a>
                </Link>
            </div>
        </div>
    )
}

export default EventItem
