import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { selectDarkMode } from './state/features/userSlice'

import PrivateRoute from './utils/PrivateRoute'

import { 
        HomePage, LoginPage
     } from './pages'


const App = () => {

  const darkMode = useSelector(selectDarkMode)

  useEffect(() => {
      if (darkMode) {
          document.body.classList.add('dark')
      } else {
          document.body.classList.remove('dark')
      }
  },[darkMode])

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
