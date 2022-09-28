import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className='bg-gray-900 text-gray-100 shadow w-full'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <Link href='/'>
          <a className='flex title-font font-medium items-center mb-4 md:justify-start md:w-1/5 md:mb-0'>
            <Image src='/images/logo.png' alt='' width={40} height={40} />
            <span className='ml-3 text-xl'>DevSpace</span>
          </a>
        </Link>
        <nav className='flex flex-wrap md:w-4/5 space-x-5 items-center justify-end text-base md:ml-auto'>
          <Link href='/blog'>
            <a className='cursor-pointer uppercase hover:text-indigo-300'>
              Blog
            </a>
          </Link>
          <Link href='/about'>
            <a className='cursor-pointer uppercase hover:text-indigo-300'>
              About
            </a>
          </Link>
        </nav>
      </div>
    </header>
  )
}
