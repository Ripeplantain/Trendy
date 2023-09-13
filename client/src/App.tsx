import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { selectDarkMode, selectNotifications, setNotifications } from './state/features/userSlice'

import PrivateRoute from './utils/PrivateRoute'

import { 
        HomePage, LoginPage
     } from './pages'


const App = () => {

  const darkMode = useSelector(selectDarkMode)
  const notifications = useSelector(selectNotifications)

  useEffect(() => {
    if(notifications.length > 0) {
      notifications.forEach((notification: string) => {
        toast(notification, {
          onClose: () => {
            setNotifications([])
          }
        })
      })
    }
  },[notifications])

  useEffect(() => {
      if (darkMode) {
          document.body.classList.add('dark')
      } else {
          document.body.classList.remove('dark')
      }
  },[darkMode])

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
