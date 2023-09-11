import data from '../utils/ads'
import { DefaultImage, AddIcon } from '../utils/constants'

import { useState, useEffect } from 'react'



const Info = () => {
  const [ currentIndex, setCurrentIndex ] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === data.length - 1) {
        setCurrentIndex(0)
      } else {
        setCurrentIndex(currentIndex + 1)
      }
    }, 5000)
    return () => clearInterval(interval)
  })

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 px-8 py-5 h-fit rounded-2xl dark:text-white">
        <div className='flex justify-between'>
          <h3>Sponsored</h3>
          <span className='capitalize'>create ad</span>
        </div>
        <div className='mt-5'>
          <div>
            <img 
                className='w-full h-[300px] object-cover rounded-xl'
                src={data[currentIndex].image} alt="slider image" />
          </div>
          <div className='flex flex-col justify-between items-start'>
            <h3 className='font-medium mt-3'>{data[currentIndex].name}</h3>
            <p className='text-sm text-gray-500 mt-2 underline'>{data[currentIndex].url}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500 mt-2'>{data[currentIndex].description}</p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 px-8 py-5 h-fit rounded-2xl dark:text-white mt-8">
        <span className='font-medium text-lg'>Gain a new follower</span>
        <div className='mt-5'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-5'>
              <div>
                <img src={DefaultImage} alt="profile image" className='w-[70px] rounded-full' />
              </div>
              <div>
                <h3 className='font-medium mt-3 text-sm'>John Doe</h3>
                <p className='text-[14px] text-gray-500 mt-2'>fake job</p>
              </div>
            </div>
            <div className='cursor-pointer'>
              <AddIcon className='text-3xl text-[#3c6382] delay-100 hover:text-orange-600 dark:hover:text-white' />
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default Info
