import GithubIcon from '@/app/assets/icons/Github'
import { LanguageSwitcher } from '@/app/components/language/LanguageSwitcher'
import { Copyright } from 'lucide-react'
import { FormattedMessage, FormattedNumber } from 'react-intl'

export default function Footer() {
  const longVer = import.meta.env.VITE_PACKAGE_VERSION
  const majorVer = parseInt(longVer.split('.')[0])
  const minorVer = parseInt(longVer.split('.')[1])
  const patchVer = parseInt(longVer.split('.')[2])

  return (
    <footer className='bg-header text-header-foreground px-8 py-6'>
      <div className='container mx-auto flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-2'>
            <Copyright className='size-6' />
            <span>
              <FormattedMessage id='footer.copyright.title' defaultMessage='2023 All right reserved' />
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <a href='https://github.com/nader-eloshaiker/screen-geometry-app'>
              <GithubIcon className='size-6 fill-current' />
            </a>
            <span>
              <FormattedMessage id='footer.version.title' defaultMessage='Version' />{' '}
              <FormattedNumber value={majorVer} />
              .<FormattedNumber value={minorVer} />.<FormattedNumber value={patchVer} />
            </span>
          </div>
        </div>
        <div className='flex flex-row-reverse items-center gap-2 md:flex-row'>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  )
}
