import { Forms } from '../../components'


const LoginPage = () => {
  return (
    <div className='font-[Lora] overflow-hidden h-fit'>
      <header className='text-center py-6 border-b dark:border-white bg-white dark:bg-gray-950 dark:text-white'>
        <h1 className='tracking-wider text-4xl md:text-3xl font-bold text-orange-700'>Monty Gram</h1>
      </header>
      <Forms />
    </div>
  )
}

export default LoginPage
