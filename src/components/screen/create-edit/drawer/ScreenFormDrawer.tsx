import { useFormDrawerContext } from '../../../../contexts/FormDrawer/useFormDrawaerContext'
import { ScreenForm } from '../form/ScreenForm'
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
        <div className='sidebar flex-1 rounded-xl p-2 md:w-96'>
          <div className='p-2'>
            <ScreenForm />
          </div>
        </div>
      </div>
    </div>
  )
}
