import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import Link from 'next/link'
import styles from '@/styles/Event.module.css'
import {useRouter} from 'next/router'
const EventsById = ({event}) => {
    const route = useRouter();
    const deleteEvent = async (e)=>{
        if(window.confirm('Are you sure you want to delete')){
            const res = await fetch(`${API_URL}events/${event.id}`, {method: 'DELETE'})
            if (!res.ok) {
                if (res.status === 403 || res.status === 401) {
                  toast.error('No token included')
                  return
                }
                toast.error('Something Went Wrong')
            } else {
                const evt = await res.json()
                route.push(`/events`)
            }
        }
    }
    return (
        <Layout title='Events|Info' description='information about event'>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${event.id}`}>
                        <a className={styles.edit}><i className="fa fa-edit"></i> Edit</a>
                    </Link>
                    <a className={styles.delete} href='#' onClick={deleteEvent}>
                        <i className="fa fa-trash-alt"></i>delete
                    </a>
                </div>
                <h1 className='event_title'>events Information</h1>
                <h1 className='event_subtitle'> {event.name} </h1>
                {event.image && <img className={styles.image} src={event.image.formats.large.url} width='100%'/>}
                <hr/>
                <h2> Information :</h2>
                <ul>
                    <li>Name : {event.name} </li>
                    <li>Adresse : {event.adresse} </li>
                    <li>Date : {event.date} </li>
                    <li>Venue : {event.venue} </li>
                    <li>Performers : {event.performers} </li>
                    <li>Time : {event.time} </li>
                    <li>Description : {event.description} </li>
                </ul>
                <Link href='/'>
                    <a> <i className="fa fa-arrow-left"></i> back home</a>
                </Link>
            </div>
        </Layout>
    )
}

export default EventsById

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}events/`);
    const events = await res.json();
    const paths = events.map(item=>({params:{id : String(item.id)}}))
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({params:{id}}) {
    const res = await fetch(`${API_URL}events/${id}`);
    const event = await res.json()
    return {
      props: {
        event
      },
       revalidate:3// will be passed to the page component as props
    }
  }