import { Navbar, Info, Profile, Feed } from '../components'
import { ColorRing } from 'react-loader-spinner'



const HomePage = () => {

  const token = localStorage.getItem('auth')
  
  if (!token) return (
    <div className='bg-gray-100 dark:bg-gray-950 h-[100%] font-[Rubik]'>
      <Navbar />
      <div className='flex justify-center items-center h-[100vh]'>
      <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />  
      </div>
    </div>
  )


  return (
    <div className='bg-gray-100 dark:bg-gray-950 h-[100%] font-[Rubik]'>
      <Navbar />
      <div className='lg:flex pt-[7rem] pb-9  md:px-[5rem] gap-[3vw]'>
        <div className='basis-[30%] flex flex-col gap-8 px-7'>
          <Profile />
          <Info />
        </div>
        <div className='mt-10 lg:mt-0 basis-[70%] px-8'>
          <Feed />
        </div>
      </div>
    </div>
  )
}

export default HomePage
