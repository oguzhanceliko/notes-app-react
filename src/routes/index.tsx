import HomePage from '@/pages/home-page'
import LoginPage from '@/pages/login-page'
import AddNotePage from '@/pages/note/add-note-page'
import EditNotePage from '@/pages/note/edit-note-page'
import { createBrowserRouter } from 'react-router'
import App from '../App'
import ProtectedRoute from './protected-route'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App children={<ProtectedRoute />} />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/not-ekle", element: <AddNotePage /> },
      { path: "/not/:id/guncelle", element: <EditNotePage /> },
    ],
  },
  {
    path: "/login",
    element: <App children={<LoginPage />} />,
  },
]);


export default router
