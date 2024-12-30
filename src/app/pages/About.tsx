import { RouteSchema } from '@/app/routes/RouteSchema'
import { NavigationLink } from '@/lib/ui/components/navigationlink/NavigationLink'
import { Helmet } from 'react-helmet-async'

export const About = () => {
  return (
    <>
      <Helmet>
        <title>About - Screen Geometry</title>
        <meta name='description' content='About this app and where to get started' />
      </Helmet>

      <div className='flex h-full flex-col justify-between'>
        <div>
          <h1 className='mb-4 text-3xl font-bold'>Welcome to Screen Geometry</h1>
          <p className='mb-4'>Hey there, I&apos;m Nader!</p>
          <p className='mb-4'>
            I know choosing a monitor, phone or even a tablet, based on the LCD screen information can be a real
            head-scratcher because we have so much choice. Well I&apos;ve cooked up a handy tool that lets you compare
            screen sizes and resolutions to help you decide.
          </p>
          <p className='mb-4'>
            Whether you&apos;re a gamer on the hunt for the perfect screen to level up your gaming experience or a
            design enthusiast in need of pixel-perfect clarity, this tool will help you find the right screen.
          </p>
          <p className='mb-4'>
            <span>Click</span>
            <span className='mx-2'>
              <NavigationLink
                id='home-screen-link'
                className='w-24 text-base font-semibold'
                // mode='ghost'
                to={RouteSchema.screens.path}
              >
                Screens
              </NavigationLink>
            </span>
            <span>to start your journey into finding the right screen.</span>
          </p>
          <div className='my-6 flex flex-col items-center'>
            <label className='my-6 text-lg'>Demo</label>
            <img
              className='h-auto max-w-full rounded-md border border-base-300 object-scale-down shadow-lg'
              src='./media/demo.webp'
              width={384}
              height={431}
              alt='Demo Screen Capture'
            />
          </div>
          <p className='mb-4'>
            No corporate marketing here! I show you the differences and focus on what matters - finding the ideal
            monitor for you. Say goodbye to endless scrolling and hello to informed choices.
          </p>
          <p className='mb-4'>
            P.S. Have questions or feedback? I&apos;m all ears. Feel free to reach out and let me know how I can make
            this experience even better for you. Go to the contact page for details on how to get in touch. Also, show
            your support by starring the project on{' '}
            <a className='link' href='https://github.com/nader-eloshaiker/screen-geometry-app'>
              Github
            </a>
          </p>
        </div>
        <div>
          <p className='mb-1 mt-10 text-right'>The choice is yours</p>
          <p className='mb-4 text-right italic'>Happy Shopping</p>
        </div>
      </div>
    </>
  )
}
