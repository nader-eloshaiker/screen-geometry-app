import GithubIcon from '@app/assets/icons/Github'
import LinkedInIcon from '@app/assets/icons/LinkedIn'
import TwitterIcon from '@app/assets/icons/Twitter'
import XIcon from '@app/assets/icons/X'
import { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

type ListItemProps = TRestProps & {
  href: string
  icon: ReactNode
  text: string
}

const ListItem = ({ href, icon, text }: ListItemProps) => {
  return (
    <a className='link-hover link flex gap-4' target='_blank' href={href} rel='noreferrer'>
      {icon}
      <span>{text}</span>
    </a>
  )
}

export const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact - Screen Geometry</title>
        <meta name='description' content='How to engage with me or this app' />
      </Helmet>

      <div className='h-full'>
        <h1 className='mb-4 text-3xl font-bold'>How to engage with me or this app</h1>
        <p className='mb-8'>
          Hey there! I&apos;m always happy to hear from you. Whether you&apos;ve got a question, feedback, or just want
          to say hi, I&apos;m all ears.
        </p>

        <h2 className='mb-4 text-xl font-bold'>A Note from me the developer</h2>
        <p className='mb-8'>
          I built this web app as a project to experience the full productionisation of an idea, from API design, to
          development, to continous integration / conitnous deployment and finally, hosting.
        </p>

        <h2 className='mb-4 text-xl font-bold'>Open Source</h2>
        <p>This app is open source and you can find the code on Github.</p>
        <div className='mb-8 flex flex-col gap-4 p-4'>
          <ListItem
            href='https://github.com/nader-eloshaiker/screen-geometry-app'
            icon={<GithubIcon className='size-6 fill-current' />}
            text='Github Code Repository'
          />
        </div>

        <h2 className='mb-4 text-xl font-bold'>Community</h2>
        <p>I&apos;m active on a few communities. Feel free to reach out to me on any of these platforms:</p>
        <div className='mb-8 flex flex-col gap-4 p-4'>
          <ListItem
            href='https://github.com/nader-eloshaiker/screen-geometry-app/discussions/80'
            icon={<GithubIcon className='size-6 fill-current' />}
            text='Github Discussions'
          />
        </div>

        <h2 className='mb-4 text-xl font-bold'>Features / Bugs</h2>
        <p>
          If you have any ideas for new features or find any bugs, please let me know. I&apos;ll do my best to get back
          to you.
        </p>
        <div className='mb-8 flex flex-col gap-4 p-4'>
          <ListItem
            href='https://github.com/nader-eloshaiker/screen-geometry-app/issues'
            icon={<GithubIcon className='size-6 fill-current' />}
            text='Github Issues'
          />
          <ListItem
            href='https://docs.github.com/en/get-started/quickstart/contributing-to-projects'
            icon={<GithubIcon className='size-6 fill-current' />}
            text='Contributing'
          />
        </div>

        <h2 className='mb-4 text-xl font-bold'>Socials</h2>
        <p>
          You can reach me on any of the socials below. I&apos;ll get back to you as soon as I can. Looking forward to
          hearing from you!
        </p>
        <div className='mb-8 flex flex-col gap-4 p-4'>
          <ListItem href='https://x.com/nadereloshaiker' icon={<XIcon className='size-6 fill-current' />} text='X' />
          <ListItem
            href='https://twitter.com/nadereloshaiker'
            icon={<TwitterIcon className='size-6 fill-current' />}
            text='Twitter'
          />
          <ListItem
            href='https://www.linkedin.com/in/nadereloshaiker'
            icon={<LinkedInIcon className='size-6 fill-current' />}
            text='LinkedIn'
          />
        </div>
      </div>
    </>
  )
}
