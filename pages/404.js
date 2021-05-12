import style from '@/styles/404.module.css'
import Layout from '@/components/Layout'
import Link from 'next/link'
const notFound = () => {
    return (
        <Layout title="404 error">
            <div className={style.error}>
                <h1> 404 </h1>
                <h4>Sorry, there is nothing here</h4>
                <Link href='/'>Go Back Home</Link>
            </div>
        </Layout>
    )
}
export default notFound
