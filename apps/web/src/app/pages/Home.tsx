import { NavigationLink } from '@screengeometry/lib-ui/navigationlink'
import { Helmet } from 'react-helmet-async'

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Screen Geometry: Home</title>
        <meta
          name='description'
          content='Introduction into this tool. Compare multiple monitor sizes and resolutions simultaneously. Get clear insights into size, resolution, and aspect ratio differences. Perfect for tech enthusiasts and professionals!'
        />
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
                to='/screens'
              >
                Screens
              </NavigationLink>
            </span>
            <span>to start your journey into finding the right screen.</span>
          </p>
          <div className='float-right ml-6 flex flex-col items-center'>
            <img
              id='demo-image'
              className='h-auto max-w-full rounded-md border border-mono-border object-scale-down shadow-lg'
              src='./media/demo.webp'
              width={384}
              height={431}
              alt='Demo Screen Capture'
            />
            <label className='my-2 text-lg' htmlFor='demo-image'>
              Demo
            </label>
          </div>
          <p className='mb-4'>
            No corporate marketing here! I show you the differences and focus on what matters - finding the ideal
            monitor for you. Say goodbye to endless scrolling and hello to informed choices.
          </p>
          <p className='mb-4'>
            P.S. Have questions or feedback? I&apos;m all ears. Feel free to reach out and let me know how I can make
            this experience even better for you. Go to the contact page for details on how to get in touch. Also, show
            your support by starring the project on{' '}
            <a className='underline' href='https://github.com/nader-eloshaiker/screen-geometry-app'>
              Github
            </a>
          </p>
          <div>
            <div className='mb-4 mt-10 flex flex-col items-end'>
              <p>The choice is yours</p>
              <p className='italic'>Happy Shopping</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
