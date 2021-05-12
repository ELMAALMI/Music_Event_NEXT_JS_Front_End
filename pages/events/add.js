import {useState} from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '@/styles/AddEvent.module.css'
const AddEvent = () => {
    const [values,setEvent] = useState({
        name:'',
        adresse: "",
        date: "",
        venue: "",
        performers: "",
        time: "",
        description: ""
    });
    const route = useRouter();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const hasEmptyFields = Object.values(values).some((item) => item === '')
        if (hasEmptyFields) {
            toast.error('Please fill in all fields')
            return;
        }
        console.table(values)
        const res = await fetch(`${API_URL}events`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
              toast.error('No token included')
              return
            }
            toast.error('Something Went Wrong')
        } else {
            const evt = await res.json()
            route.push(`/events/${evt.id}`)
        }
    }
    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setEvent({...values,[name]:value});
    }
  return (
    <Layout title="Add Event">
      <Link href='/'>
        <a>Back to Events</a>
      </Link>
      <ToastContainer />
      <h1 style={{textAlign:'center'}}>Add New Event</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='adresse'>Address</label>
            <input
              type='text'
              name='adresse'
              id='adresse'
              value={values.adresse}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Add Event' className='btn' />
      </form>
    </Layout>
  )
}

export default AddEvent

