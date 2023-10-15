import { useInputReferenceContext } from '../../../contexts/reference/useInputReferenceContext'
import { CreateScreen } from '../CreateScreen'
import './ScreenFormDrawer.css'

type Props = TReactChildren

export const ScreenFormDrawer = ({ children }: Props) => {
  const drawerRef = useInputReferenceContext()
  return (
    <div className='drawer grow'>
      <input id='screenFormDrawer' type='checkbox' className='drawer-toggle' ref={drawerRef} />
      <div id='drawer-content' className='drawer-content h-full'>
        {children}
      </div>
      <div className='drawer-side absolute h-full w-auto'>
        <label htmlFor='screenFormDrawer' className='drawer-overlay'></label>
        <CreateScreen />
      </div>
    </div>
  )
}
