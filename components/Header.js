import Link from 'next/link'
import style from '@/styles/Header.module.css';
import Search from '@/components/search';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
const Header = () => {
    const {user,logout} = useContext(AuthContext);
    return (
        <header className={style.header}>
            <div className={style.logo}>
                <Link href="/">
                    <a>events</a>
                </Link>
            </div>
            <Search />
            <nav>
                <ul>
                    <li>
                        <Link href='/events'>
                            <a>Events</a>
                        </Link>
                    </li>
                    {
                        user?(
                            <>
                                <li>
                                    <Link href='/events/add'>
                                        <a><i className="fa fa-plus"></i> AddEvent</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/account/dashboard'>
                                        <a><i className="fa fa-plus"></i> Dashboard</a>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={()=>logout()} className="btn-secondary">
                                        LOGOUT <i className="fa fa-sign-in-alt"></i> 
                                    </button>
                                </li>
                            </>
                        ):(
                            <li>
                                <Link href='/account/login'>
                                    <a className="btn-secondary">
                                        <i className="fa fa-sign-in-alt"></i>   Login
                                    </a>
                                </Link>
                            </li>
                        )
                    }
                    
                    
                </ul>
            </nav>
        </header>
    )
}
export default Header
