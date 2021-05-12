import {useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Modal from '@/components/modal'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '@/styles/AddEvent.module.css'
import ImageUploade from '@/components/uploadImage'
const EditEvent = ({event}) => {
    const [values,setEvent] = useState({
        name:event.name,
        adresse: event.adresse,
        date: event.date,
        venue: event.venue,
        performers: event.performers,
        time:event.time,
        description: event.description
    });
    const [imagePreview, setImagePreview] = useState(event.image ? event.image.formats.thumbnail.url : null)
    const [showModal, setShowModal] = useState(false)
    const route = useRouter();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const hasEmptyFields = Object.values(values).some((item) => item === '')
        if (hasEmptyFields) {
            toast.error('Please fill in all fields')
            return;
        }
        console.table(values)
        const res = await fetch(`${API_URL}events/${event.id}`, {
            method: 'PUT',
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
      const {name,value} = e.target; setEvent({...values,[name]:value}); 
    }
    const imageUploaded = async (e) => {
      const res = await fetch(`${API_URL}events/${event.id}`)
      const data = await res.json()
      setImagePreview(data.image.formats.thumbnail.url)
      setShowModal(false)
    }
  return (
    <Layout title="Add Event">
      <Link href='/'>
        <a>Back to Events</a>
      </Link>
      <ToastContainer />
      <h1 style={{textAlign:'center'}}>Update Event</h1>
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
        
        <input type='submit' value='Update Event' className='btn' />
      </form>
      <h2>Event Image</h2>
        {imagePreview ? (<Image src={imagePreview} height={100} width={170} />) 
                      : (<div><p>No image uploaded</p></div>)
        }
        <div>
        <button
          onClick={() => setShowModal(true)}
          className='btn-secondary btn-icon'
        >
          Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUploade evtId={event.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  )
}
export async  function getServerSideProps ({params:{id},req}) {
    const res = await fetch(`${API_URL}events/${id}`);
    const event = await res.json();
    console.log(req.headers.cookie)
    return {
      props:{ event }
    }
}

export default EditEvent

