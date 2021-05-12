import {Fragment} from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import style from '@/styles/Layout.module.css'
import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase';

const Layout = ({ title, keywords, description, children }) => {
    const {pathname} = useRouter();
    return (
        <Fragment>
            <Head>
                <title> {title} </title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
            </Head>
            <Header />
            { pathname==='/'&&<Showcase /> }
            <div className={style.container}>
                {children}
            </div>
            <Footer />
        </Fragment>
    )
}

export default Layout

Layout.defaultProps = {
    title: 'DJ Events | Find the hottest parties',
    description: 'Find the latest DJ and other musical events',
    keywords: 'music, dj, edm, events',
}
