import {useRouter} from 'next/router'
import styles from '@/styles/Search.module.css'
import {useState} from 'react'
const Search = ()=>{
    const [term,setTerm] = useState('');
    const route = useRouter();
    const handleSubmit = (e)=>{
        e.preventDefault();
        route.push(`/events/search?term=${term}`)
    }
    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input type="text" value={term} placeholder="Search" onChange={e=>setTerm(e.target.value)} />
            </form>
        </div>
    )
}
export default Search;