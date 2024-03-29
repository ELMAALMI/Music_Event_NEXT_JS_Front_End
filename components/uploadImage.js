import { useState } from "react"
import { API_URL } from "@/config/index"
import styles from '@/styles/AddEvent.module.css'
const uploadImage = ({ evtId, imageUploaded }) => {
    const [image, setImage] = useState(null)
    const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('files', image)
      formData.append('ref', 'events')
      formData.append('refId', evtId)
      formData.append('field', 'image')
  
      const res = await fetch(`${API_URL}upload`, {
        method: 'POST',
        body: formData,
      })
  
      if (!res.ok) {
          console.log(res)
      }else{
          imageUploaded()
      }
    }
  
    const handleFileChange = (e) => {
      setImage(e.target.files[0])
      console.log(e.target.files[0])
    }
    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type='file' onChange={handleFileChange} />
                </div>
                <input type='submit' value='Upload' className='btn' />
            </form>
        </div>
    )
}

export default uploadImage
