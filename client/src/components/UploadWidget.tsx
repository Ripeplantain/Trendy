import { useEffect, useRef } from 'react'


const UploadWidget = () => {
    
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current?.createUploadWidget({
            cloudName: 'dnv6frl63',
            uploadPreset: 'bp4hjemb',
        }, function(error, result) {
            console.log('result: ',result)
            console.log('error; ',error)
        })
        console.log(cloudinaryRef.current)
    },[])

  return (
    <button
        className='w-full bg-gray-500 hover:bg-gray-700 text-white border-dashed border-2 border-gray-200 hover:border-gray-100
                        font-bold py-6 px-4 rounded tracking-wider text-xl'
        onClick={()=>widgetRef.current?.open()}
    >
        Upload Image
    </button>
  )
}

export default UploadWidget
