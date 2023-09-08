import { Navbar, Info, Profile, Feed } from '../components'

const HomePage = () => {
  return (
    <div className='bg-gray-100 dark:bg-gray-950 h-screen font-[Rubik]'>
      <Navbar />
      <div className='grid lg:grid-cols-3 pt-9 gap-[3vw] px-8 md:px-[5rem]'>
        <Profile />
        <Feed />
        <Info />
      </div>
    </div>
  )
}

export default HomePage
