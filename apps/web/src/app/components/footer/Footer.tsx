import GithubIcon from '@/app/assets/icons/Github'
import { Copyright } from 'lucide-react'
import { FormattedMessage } from 'react-intl'

export default function Footer() {
  const longVer = import.meta.env.VITE_PACKAGE_VERSION

  return (
    <footer className='bg-header px-8 py-6 text-header-foreground'>
      <div className='container mx-auto flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
        <div className='flex items-center gap-2'>
          <Copyright className='size-6' />
          <FormattedMessage id='footer.copyright.title' defaultMessage='2023 All right reserved' />
        </div>
        <div className='flex flex-row-reverse items-center gap-2 md:flex-row'>
          <span>
            <FormattedMessage id='footer.version.title' defaultMessage='Version' /> {longVer}
          </span>
          <a href='https://github.com/nader-eloshaiker/screen-geometry-app'>
            <GithubIcon className='size-6 fill-current' />
          </a>
        </div>
      </div>
    </footer>
  )
}
