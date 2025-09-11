import GithubIcon from '@/app/assets/icons/Github'
import LinkedInIcon from '@/app/assets/icons/LinkedIn'
import TwitterIcon from '@/app/assets/icons/Twitter'
import XIcon from '@/app/assets/icons/X'
import { type ReactNode } from 'react'
import { FormattedMessage } from 'react-intl'

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

export const Contact = () => {
  return (
    <div className='h-full'>
      <h1 className='mb-4 text-3xl'>
        <FormattedMessage id='contact.content.heading' defaultMessage='How to engage with me or this app' />
      </h1>
      <p className='mb-8'>
        <FormattedMessage
          id='contact.content.p1'
          defaultMessage="Hey there! I'm always happy to hear from you. Whether you've got a question, feedback, or just want
          to say hi, I'm all ears."
        />
      </p>

      <h2 className='mb-4 text-xl font-bold'>A Note from me the developer</h2>
      <p className='mb-8'>
        <FormattedMessage
          id='contact.content.p2'
          defaultMessage='I built this web app as a project to experience the full productionisation of an idea, from API design, to
          development, to continous integration / conitnous deployment and finally, hosting.'
        />
      </p>

      <h2 className='mb-4 text-xl font-bold'>Open Source</h2>
      <p>
        <FormattedMessage
          id='contact.opensource.p1'
          defaultMessage='This app is open source and you can find the code on Github.'
        />
      </p>
      <div className='mb-8 flex flex-col gap-4 p-4'>
        <ListItem
          href='https://github.com/nader-eloshaiker/screen-geometry-app'
          icon={<GithubIcon className='size-6 fill-current' />}
          text={<FormattedMessage id='contact.opensource.l1' defaultMessage='Github Code Repository' />}
        />
      </div>

      <h2 className='mb-4 text-xl font-bold'>Community</h2>
      <p>
        <FormattedMessage
          id='contact.platform.p1'
          defaultMessage="I'm active on a few communities. Feel free to reach out to me on any of these platforms:"
        />
      </p>
      <div className='mb-8 flex flex-col gap-4 p-4'>
        <ListItem
          href='https://github.com/nader-eloshaiker/screen-geometry-app/discussions/80'
          icon={<GithubIcon className='size-6 fill-current' />}
          text={<FormattedMessage id='contact.platform.l1' defaultMessage='Github Discussions' />}
        />
      </div>

      <h2 className='mb-4 text-xl font-bold'>Features / Bugs</h2>
      <p>
        <FormattedMessage
          id='contact.feedback.p1'
          defaultMessage="If you have any ideas for new features or find any bugs, please let me know. I'll do my best to get back
          to you."
        />
      </p>
      <div className='mb-8 flex flex-col gap-4 p-4'>
        <ListItem
          href='https://github.com/nader-eloshaiker/screen-geometry-app/issues'
          icon={<GithubIcon className='size-6 fill-current' />}
          text={<FormattedMessage id='contact.feedback.l1' defaultMessage='Github Issues' />}
        />
        <ListItem
          href='https://docs.github.com/en/get-started/quickstart/contributing-to-projects'
          icon={<GithubIcon className='size-6 fill-current' />}
          text={<FormattedMessage id='contact.feedback.l2' defaultMessage='Contributing' />}
        />
      </div>

      <h2 className='mb-4 text-xl font-bold'>Socials</h2>
      <p>
        <FormattedMessage
          id='contact.socials.p1'
          defaultMessage="You can reach me on any of the socials below. I'll get back to you as soon as I can. Looking forward to
          hearing from you!"
        />
      </p>
      <div className='mb-8 flex flex-col gap-4 p-4'>
        <ListItem href='https://x.com/nadereloshaiker' icon={<XIcon className='size-6 fill-current' />} text='X' />
        <ListItem
          href='https://twitter.com/nadereloshaiker'
          icon={<TwitterIcon className='size-6 fill-current' />}
          text={<FormattedMessage id='contact.socials.l1' defaultMessage='Twitter / X' />}
        />
        <ListItem
          href='https://www.linkedin.com/in/nadereloshaiker'
          icon={<LinkedInIcon className='size-6 fill-current' />}
          text={<FormattedMessage id='contact.socials.l2' defaultMessage='LinkedIn' />}
        />
      </div>
    </div>
  )
}
