import { Navbar, Info, Profile, Feed, Ad } from '../components'



const HomePage = () => {


  return (
    <div className=' bg-gray-100 dark:bg-gray-950 font-[Rubik]'>
      <Navbar />
      <div className='lg:flex pt-[7rem] pb-9 md:px-[5rem] gap-[3vw] min-h-screen'>
        <div className='basis-1/4 flex flex-col gap-8 px-7'>
          <Profile />
          <Info />
        </div>
        <div className='mt-10 lg:mt-0 basis-2/4 px-8'>
          <Feed />
        </div>
        <div className='hidden lg:block mt-10 lg:mt-0 basis-1/4 px-8'>
          <Ad />
        </div>
      </div>
    </div>
  )
}

export default HomePage
