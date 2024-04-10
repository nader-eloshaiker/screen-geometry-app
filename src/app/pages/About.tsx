import { RouteSchema } from '@app/routes/RouteSchema'
import { Helmet } from 'react-helmet-async'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router-dom'

export const About = () => {
  const navigate = useNavigate()
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
            Click{' '}
            <button
              id='cancelButton'
              type='button'
              className='btn btn-primary mx-2 w-24 shadow-lg'
              onClick={() => {
                navigate(RouteSchema.screens.path)
              }}
            >
              Screens
            </button>{' '}
            to start your journey into finding the right screen.
          </p>
          <div className='my-6 flex flex-col items-center'>
            <label className='my-6 text-lg'>Checkout this Demo</label>
            <LazyLoadImage
              className='h-auto max-w-full rounded-md border-2 border-base-300 shadow-lg'
              src='./media/demo-anim.webp'
              placeholderSrc='./media/demo.webp'
              width={508}
              height={528}
              alt='Demo Animation'
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
