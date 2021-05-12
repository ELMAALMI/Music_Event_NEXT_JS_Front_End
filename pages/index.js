import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
const Home = ({events}) => {
  return (
    <Layout>
      <h1 style={{textAlign:'center'}}>home page</h1>
        { events.map(item=>(<EventItem key={item.id} evt={item} />)) }
    </Layout>
  )
}

export default Home

export async  function getStaticProps() {
    const res = await fetch(`${API_URL}events/`);
    const events = await res.json();
    return {
      props:{
        events
      },
      revalidate:3
    }
}
