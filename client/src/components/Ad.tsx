import { useState, useEffect } from 'react'
import data from '../utils/ads'


const Ad = () => {

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
      }, [currentIndex])

  return (
    <section className="bg-white dark:bg-gray-900 px-8 py-5 mt-8 h-fit rounded-2xl dark:text-white">
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
  )
}

export default Ad
