import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { 
        HomePage, LoginPage
     } from './pages'


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
