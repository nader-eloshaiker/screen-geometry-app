import { TranslateMessage } from '@/app/stores/translation'
import { NavigationLink } from '@screengeometry/lib-ui/navigationlink'

export const HomePage = () => {
  return (
    <div className='h-full'>
      <h1 className='mb-4 text-3xl'>
        <TranslateMessage id='home.content.heading' />
      </h1>
      <p className='mb-4'>
        <TranslateMessage id='home.content.solutation' />
      </p>
      <p className='mb-4'>
        <TranslateMessage id='home.content.p1' />
      </p>
      <p className='mb-4'>
        <TranslateMessage id='home.content.p2' />
      </p>
      <p className='mb-4'>
        <TranslateMessage
          id='home.content.callToAction'
          values={{
            cta: (children) => (
              <span className='mx-2'>
                <NavigationLink
                  data-testid='home-screen-link'
                  className='text-base font-semibold'
                  // mode='ghost'
                  to='/myscreens'
                >
                  {children}
                </NavigationLink>
              </span>
            ),
          }}
        />
      </p>
      <div className='flex flex-col items-center gap-4 md:flex-row'>
        <img
          id='demo-image'
          className='border-mono-border h-auto max-w-full rounded-md border object-scale-down shadow-lg'
          src='./media/demo.png'
          width={384}
          height={431}
          alt='Demo Screen Capture'
        />
        {/* <label className='my-2 text-xs' htmlFor='demo-image'>
          <TranslateMessage id='home.demo-image.caption' defaultMessage='Screens Page' />
        </label> */}
        <div>
          <p className='mb-4'>
            <TranslateMessage id='home.content.p3' />
          </p>
          <p className='mb-4'>
            <TranslateMessage id='home.content.p4' />
            <span className='mx-2'>
              <a className='underline' href='https://github.com/nader-eloshaiker/screen-geometry-app'>
                Github
              </a>
            </span>
          </p>
          <div>
            <div className='mb-4 mt-10 flex flex-col items-end'>
              <p>
                <TranslateMessage id='home.sign-off.l1' />
              </p>
              <p className='italic'>
                <TranslateMessage id='home.sign-off.l2' />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
