import GithubIcon from '@/app/assets/icons/Github'
import LinkedInIcon from '@/app/assets/icons/LinkedIn'
import TwitterIcon from '@/app/assets/icons/Twitter'
import XIcon from '@/app/assets/icons/X'
import { TranslateMessage } from '@/app/stores/translation'
import { type ReactNode } from 'react'

type ListItemProps = TRestProps & {
  href: string
  icon: ReactNode
  text: string | ReactNode
}

const ListItem = ({ href, icon, text }: ListItemProps) => {
  return (
    <a className='flex gap-4 underline' target='_blank' href={href} rel='noreferrer'>
      {icon}
      <span>{text}</span>
    </a>
  )
}

export const ContactPage = () => {
  return (
    <div className='h-full'>
      <h1 className='mb-4 text-3xl'>
        <TranslateMessage id='contact.content.heading' />
      </h1>
      <p className='mb-8'>
        <TranslateMessage id='contact.content.p1' />
      </p>

      <h2 className='mb-4 text-xl font-bold'>A Note from me the developer</h2>
      <p className='mb-8'>
        <TranslateMessage id='contact.content.p2' />
      </p>

      <h2 className='mb-4 text-xl font-bold'>Open Source</h2>
      <p>
        <TranslateMessage id='contact.opensource.p1' />
      </p>
      <div className='mb-8 flex flex-col gap-4 p-4'>
        <ListItem
          href='https://github.com/nader-eloshaiker/screen-geometry-app'
          icon={<GithubIcon className='size-6 fill-current' />}
          text={<TranslateMessage id='contact.opensource.l1' />}
        />
      </div>

      <h2 className='mb-4 text-xl font-bold'>Community</h2>
      <p>
        <TranslateMessage id='contact.platform.p1' />
      </p>
      <div className='mb-8 flex flex-col gap-4 p-4'>
        <ListItem
          href='https://github.com/nader-eloshaiker/screen-geometry-app/discussions/80'
          icon={<GithubIcon className='size-6 fill-current' />}
          text={<TranslateMessage id='contact.platform.l1' />}
        />
      </div>

      <h2 className='mb-4 text-xl font-bold'>Features / Bugs</h2>
      <p>
        <TranslateMessage id='contact.feedback.p1' />
      </p>
      <div className='mb-8 flex flex-col gap-4 p-4'>
        <ListItem
          href='https://github.com/nader-eloshaiker/screen-geometry-app/issues'
          icon={<GithubIcon className='size-6 fill-current' />}
          text={<TranslateMessage id='contact.feedback.l1' />}
        />
        <ListItem
          href='https://docs.github.com/en/get-started/quickstart/contributing-to-projects'
          icon={<GithubIcon className='size-6 fill-current' />}
          text={<TranslateMessage id='contact.feedback.l2' />}
        />
      </div>

      <h2 className='mb-4 text-xl font-bold'>Socials</h2>
      <p>
        <TranslateMessage id='contact.socials.p1' />
      </p>
      <div className='mb-8 flex flex-col gap-4 p-4'>
        <ListItem href='https://x.com/nadereloshaiker' icon={<XIcon className='size-6 fill-current' />} text='X' />
        <ListItem
          href='https://twitter.com/nadereloshaiker'
          icon={<TwitterIcon className='size-6 fill-current' />}
          text={<TranslateMessage id='contact.socials.l1' />}
        />
        <ListItem
          href='https://www.linkedin.com/in/nadereloshaiker'
          icon={<LinkedInIcon className='size-6 fill-current' />}
          text={<TranslateMessage id='contact.socials.l2' />}
        />
      </div>
    </div>
  )
}
