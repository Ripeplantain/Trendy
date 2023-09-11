import { Outlet, Navigate } from 'react-router-dom'


const PrivateRoute = () => {
    
      const token = localStorage.getItem('auth')
    
      return (
     <>
        {token ? <Outlet /> : <Navigate to="/" />}
     </>
      )
    }

export default PrivateRoute