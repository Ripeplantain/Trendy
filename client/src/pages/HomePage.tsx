import { Navbar, Info, Profile, Feed } from '../components'

const HomePage = () => {
  return (
    <div className='bg-gray-100 dark:bg-gray-950 h-screen font-[Rubik]'>
      <Navbar />
      <div className='flex justify-between px-[10rem] pt-9 '>
        <Profile />
        <Feed />
        <Info />
      </div>
    </div>
  )
}

export default HomePage
