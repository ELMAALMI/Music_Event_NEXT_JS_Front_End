import Layout from '@/components/Layout'
import { API_URL } from '@/config/index';
import Link from 'next/link'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/pagination';
import { PER_PAGE } from "@/config/index"
const Events = ({events,eventTotale,page}) => {
    return (
        <Layout title='Events | list' description='events all event list for today'>
            <h1 style={{textAlign:'center'}}>Events List</h1>
            <h1 style={{textAlign:'center'}}> {page} </h1>
            { events.length === 0 && (<h3>no event to show</h3>) }
            { events.map(item=>(<EventItem key={item.id} evt={item} />))}
            <Pagination page={page} eventTotale={eventTotale} />    
            <br></br>
            <Link href='/'>
                <a>back home</a>
            </Link>
        </Layout>
    )
}
export async  function getServerSideProps({query:{page = 1}}) {
    // limit of events by page
    page = Math.abs(page)
    let start = +page === 1 ? 0 : (+page-1)*PER_PAGE;
    const res = await fetch(`${API_URL}events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
    const totaleEvent = await fetch(`${API_URL}events/count`);
    const events = await res.json();
    const eventTotale = await totaleEvent.json();
    return {
      props:{ events,eventTotale,page:+page }
    }
}
export default Events
