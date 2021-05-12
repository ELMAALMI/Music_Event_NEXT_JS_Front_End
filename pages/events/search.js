import Layout from '@/components/Layout'
import { API_URL } from '@/config/index';
import Link from 'next/link'
import EventItem from '@/components/EventItem'
import {useRouter} from 'next/router'
import qs from 'qs'
const Search = ({events}) => {
    const route = useRouter();
    return (
        <Layout title='Events | search' description='events all event list for today'>
            <h1 style={{textAlign:'center'}}>Search Result : {route.query.term} </h1>
            { events && events.map(item=>(<EventItem key={item.id} evt={item} />)) }
            <Link href='/'>
                <a>back home</a>
            </Link>
        </Layout>
    )
}
export async  function getServerSideProps ({query:{term}}) {
    const query = qs.stringify({
        _where: {
            _or:[
                {name_contains:term},
                {description_contains:term},
                {performers_contains:term},
            ]
        }
    })

    const res = await fetch(`${API_URL}events?${query}`);
    const events = await res.json();
    console.log(events)
    return {
      props:{ events }
    }
}
export default Search
