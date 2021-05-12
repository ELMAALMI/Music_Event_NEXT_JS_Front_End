import { useState,useContext,useEffect } from "react";
import Link from 'next/link'
import Layout from "@/components/Layout"
import { API_URL } from '@/config/index';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '@/styles/Login.module.css'
import AuthContext from "@/context/AuthContext";
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {login,error} = useContext(AuthContext);

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(email === '' || password === ''){
            toast.error('Please fill in all fields')
            return;
        }
        login({email,password});
    }
    useEffect(()=>error&&toast.error(error));
    return (
        <Layout title="Login|^_^">
            <div className={styles.auth}>
                <h1 className="text-center"> <i className="fa fa-user"></i> <br/> LOG IN</h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email Address</label>
                        <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                     <input type='submit' value='Login' className='btn' />
                </form>
                <p> Don't have an account? <Link href='/account/register'>Register</Link> </p>
            </div>
        </Layout>
    )
}
export default Login
