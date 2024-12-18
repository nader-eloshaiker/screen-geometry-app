import GithubIcon from '@/app/assets/icons/Github'
import { Copyright } from 'lucide-react'

export default function Footer() {
  const longVer = import.meta.env.VITE_PACKAGE_VERSION

  return (
    <footer className='bg-card px-8 py-6 text-card-foreground'>
      <div className='container mx-auto flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
        <div className='flex items-center gap-2'>
          <Copyright className='size-6' />
          <span>2023 All right reserved</span>
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
