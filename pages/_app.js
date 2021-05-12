import '../styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
const Myapp = ({ Component, pageProps }) =>(
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
)

export default Myapp
