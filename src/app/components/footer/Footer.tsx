import GithubIcon from '@/app/assets/icons/Github'
import { Hash } from 'lucide-react'

export default function Footer() {
  const longVer = import.meta.env.VITE_PACKAGE_VERSION

  return (
    <footer className='container mx-auto rounded-t-md bg-accent px-8 py-6 text-accent-content shadow-md'>
      <div className='flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
        <div className='flex items-center gap-2'>
          <Hash className='size-6 fill-current' />
          <span>© 2023 All right reserved</span>
        </div>
        <div className='flex flex-row-reverse items-center gap-2 md:flex-row'>
          <span>Version {longVer}</span>
          <a href='https://github.com/nader-eloshaiker/screen-geometry-app'>
            <GithubIcon className='size-6 fill-current' />
          </a>
        </div>
      </div>
    </footer>
  )
}
