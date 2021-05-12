import {useRouter} from 'next/router'
import { useEffect } from 'react'
const Index = () => {
    const route = useRouter()
    useEffect(()=>route.push('/account/login'))
    return null;
}

export default Index
