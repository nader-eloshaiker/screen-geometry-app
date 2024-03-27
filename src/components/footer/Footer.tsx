import GithubIcon from '@local/assets/icons/Github'
import HashTagIcon from '@local/assets/icons/HashTag'

export default function Footer() {
  const longVer = import.meta.env.VITE_PACKAGE_VERSION
  const semVer = longVer.split('.')
  const shortVer = `${semVer[0]}.${semVer[1]}`

  return (
    <footer className='footer rounded-t-xl p-4 pb-2'>
      <div className='container mx-auto'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-2 2xs:gap-3'>
            <HashTagIcon className='size-6 fill-current' />
            <span className='text-xs'>© 2023 All right reserved</span>
          </div>
          <div className='flex items-center gap-2 2xs:gap-3'>
            <span className='text-xs 2xs:hidden'>v{shortVer}</span>
            <span className='hidden text-xs 2xs:block'>Version {longVer}</span>
            <a href='https://github.com/nader-eloshaiker/screen-geometry-app'>
              <GithubIcon className='size-6 fill-current' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
