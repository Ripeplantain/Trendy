import {
    DarkMode, LightMode,
    MessageIcon, NotificationIcon, FaqIcon,
    LightNav, DarkNav, CloseIcon
} from '../utils/constants'
import { logoutUser } from '../services/auth'
import { AuthState } from '../utils/types/stateTypes'


import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMode, selectDarkMode, setLogout } from '../state/features/userSlice'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const [ showMenu, setShowMenu ] = useState(false)
    const dispatch = useDispatch()
    const darkMode = useSelector(selectDarkMode)
    const navigate = useNavigate()

    const handleLogout = () => {
        const authString: string | null = localStorage.getItem('auth')
        if (authString) {
            const auth: AuthState = JSON.parse(authString)
            const refreshForm = new FormData()
            refreshForm.append('refresh', auth.refresh)
            logoutUser(refreshForm)
                .then(() => {
                    dispatch(setLogout())
                    navigate('/')
                })
                .catch(err => console.error(err))
        }
    }

  return (
        <header className="fixed top-0 w-full bg-white dark:bg-gray-900">
            <nav className='flex justify-between items-center w-[100%] px-8 md:px-[3vw] py-3'>
                <div className='flex gap-[2vw]'>
                    <h1 className='font-[Lora] tracking-wider text-4xl md:text-3xl font-semibold text-orange-600'>Trendy</h1>
                    <input type="search" placeholder='Search...' 
                            className='bg-gray-100 dark:bg-[#333333]
                                            rounded-2xl hidden md:block ps-11' />
                </div>
                <div className='md:hidden'>
                <div 
                    onClick={() => setShowMenu(!showMenu)}
                    className='md:hidden'>
                    {!showMenu ? (
                        darkMode ? (
                            <img src={LightNav} alt="light nav" width={40} />
                        ) : (
                            <img src={DarkNav} alt="dark nav" width={40} />
                        )
                    ) : (
                        <CloseIcon className="dark:text-white text-4xl text-gray-700"/>
                    )}
                </div>

                </div>
                <div className='hidden md:block'>
                    <ul className='flex justify-center items-center gap-[3vw] text-[20px]'>
                        <li
                            onClick={() => dispatch(setMode())}
                        >
                            {darkMode ? <LightMode 
                                            className="dark:text-white hover:text-4xl" /> 
                                        : <DarkMode
                                            className="dark:text-white hover:text-4xl" />}
                        </li>
                        <li>
                            <MessageIcon className="dark:text-white hover:text-4xl" />
                        </li>
                        <li>
                            <NotificationIcon className="dark:text-white hover:text-4xl"  />
                        </li>
                        <li>
                            <FaqIcon className="dark:text-white hover:text-4xl" />
                        </li>
                        <li>
                            <button 
                                    onClick={() => handleLogout()   }
                                    className='
                                        bg-orange-600 font-medium
                                        rounded-lg px-4 py-2 text-sm tracking-wider uppercase
                                         text-white dark:text-[#FFFFFF]
                                         hover:bg-black hover:text-white delay-100
                                         dark:hover:bg-[#F2F2F2] dark:hover:text-black'>
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
                {/* drop down menu */}
                {showMenu && (
                    <div className='md:hidden absolute top-16 left-0 right-0 bg-white
                                    dark:bg-gray-900 py-2 border-b border-gray-200 dark:border-gray-700'>
                            <ul className='flex flex-col items-center justify-center text-2xl gap-4'>
                                <li>
                                    <input type="search" placeholder='Search...' 
                                        className='text-sm bg-gray-100 dark:bg-[#333333]
                                                        rounded-2xl lg:hidden p-2' />
                                </li>
                                <li
                                    onClick={() => dispatch(setMode())}
                                >
                                {darkMode ? <LightMode 
                                                className="dark:text-white hover:text-4xl" /> 
                                            : <DarkMode
                                                className="dark:text-white hover:text-4xl" />}
                                 </li>
                                 <li>
                                     <MessageIcon className="dark:text-white hover:text-4xl" />
                                 </li>
                                 <li>
                                     <NotificationIcon className="dark:text-white hover:text-4xl"  />
                                 </li>
                                 <li>
                                     <FaqIcon className="dark:text-white hover:text-4xl" />
                                 </li>
                                 <li>
                                    <button 
                                        onClick={() => handleLogout()}
                                        className='
                                        bg-orange-600 font-medium
                                        rounded-lg px-4 py-2 text-sm tracking-wider uppercase
                                         text-white dark:text-[#FFFFFF]
                                         hover:bg-black hover:text-white
                                         dark:hover:bg-[#F2F2F2] dark:hover:text-black'>
                                                Sign Out
                                    </button>
                                 </li>
                            </ul>
                    </div>
                )}
            </nav>
        </header>
  )
}

export default Navbar
