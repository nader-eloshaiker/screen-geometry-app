import { RefObject } from 'react'
import { CreateScreen } from '../CreateScreen'
import './ScreenFormDrawer.css'

type Props = TReactChildren & { drawerRef: RefObject<HTMLInputElement> }

export const ScreenFormDrawer = ({ drawerRef, children }: Props) => {
  return (
    <div className='drawer grow'>
      <input id='screenFormDrawer' type='checkbox' className='drawer-toggle' ref={drawerRef} />
      <div id='drawer-content' className='drawer-content h-full'>
        {children}
      </div>
      <div className='drawer-side absolute mx-4 h-full w-auto'>
        <label htmlFor='screenFormDrawer' className='drawer-overlay'></label>
        <CreateScreen />
      </div>
    </div>
  )
}
