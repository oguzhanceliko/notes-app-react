import HomePage from '@/pages/home-page'
import LoginPage from '@/pages/login-page'
import { createBrowserRouter, Navigate } from 'react-router'
import App from '../App'
import ProtectedRoute from './protected-route'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App children={<ProtectedRoute />} />,
    children: [
      { path: '/', element: <HomePage /> },
    //   { path: '/notlar', element: <Notlar /> }
    ]
  },
  {
    path: '/login',
   element: localStorage.getItem('token')
    ? <Navigate to="/" replace />
    : <App children={<LoginPage />} />
  },
//   { path: '*', element: <Navigate to="/" /> }
])

export default router
