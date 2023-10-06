import { useEffect, useRef } from 'react'


const UploadWidget = () => {
    
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
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
        onClick={()=>widgetRef.current.open()}
    >
        Upload
    </button>
  )
}

export default UploadWidget
