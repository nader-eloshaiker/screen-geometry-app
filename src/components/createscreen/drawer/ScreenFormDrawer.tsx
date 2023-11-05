import { useFormDrawerContext } from '../../../contexts/FormDrawer/useFormDrawaerContext'
import { CreateScreen } from '../CreateScreen'
import './ScreenFormDrawer.css'

type Props = TReactChildren

export const ScreenFormDrawer = ({ children }: Props) => {
  const { state } = useFormDrawerContext()
  return (
    <div className='drawer h-full grow'>
      <div id='drawer-content' className='drawer-content'>
        {children}
      </div>
      <input id='screenFormDrawer' type='checkbox' className='drawer-toggle' checked={state.open} />
      <div className='drawer-side absolute h-fit w-auto'>
        <CreateScreen />
      </div>
    </div>
  )
}
